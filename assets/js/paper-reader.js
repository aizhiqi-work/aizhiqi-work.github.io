(function () {
  'use strict';

  var reader = document.getElementById('paper-reader');
  // The Read PDF link remains usable when a browser has no dialog support.
  if (!reader || typeof reader.showModal !== 'function') return;

  var frame = reader.querySelector('.paper-reader__frame');
  var surface = reader.querySelector('.paper-reader__surface');
  var body = reader.querySelector('.paper-reader__body');
  var title = reader.querySelector('#paper-reader-title');
  var openLink = reader.querySelector('[data-reader-open]');
  var closeButton = reader.querySelector('[data-reader-close]');
  var fullscreenButton = reader.querySelector('[data-reader-fullscreen]');
  var status = reader.querySelector('[data-reader-status]');
  var source = reader.querySelector('[data-reader-source]');
  var trigger = null;
  var loadingTimer = null;
  var ownsFullscreen = false;
  var currentPdf = '';
  var pdfLoaded = false;
  var pdfFailed = false;

  function finishLoading() {
    window.clearTimeout(loadingTimer);
    body.setAttribute('aria-busy', 'false');
  }

  function showFallback() {
    finishLoading();
    status.textContent = 'PDF not visible? Choose Open PDF to read it in a new tab.';
    status.hidden = false;
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest('[data-paper-pdf]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    var pdf;
    try { pdf = new URL(link.href, window.location.href); }
    catch (error) { return; }
    if (pdf.protocol !== 'https:' && !(pdf.protocol === 'http:' && pdf.origin === window.location.origin)) return;

    event.preventDefault();
    trigger = link;
    title.textContent = link.getAttribute('data-paper-title') || 'Read PDF';
    frame.title = title.textContent + ' — PDF';
    openLink.href = pdf.href;
    source.textContent = pdf.origin === window.location.origin ? 'PDF · Website copy' : 'PDF · ' + pdf.hostname;
    status.textContent = 'Loading PDF…';
    status.hidden = false;
    body.setAttribute('aria-busy', 'true');
    reader.showModal();
    document.documentElement.classList.add('paper-reader-open');
    closeButton.focus();

    if (navigator.pdfViewerEnabled === false) {
      frame.hidden = true;
      showFallback();
      return;
    }

    frame.hidden = false;
    // Keep the most recently opened paper, including its page and zoom settings.
    // Opening another paper reuses this single iframe rather than retaining all PDFs.
    window.clearTimeout(loadingTimer);
    if (currentPdf === pdf.href && !pdfFailed) {
      if (pdfLoaded) {
        finishLoading();
        status.hidden = true;
      } else loadingTimer = window.setTimeout(showFallback, 15000);
      return;
    }
    currentPdf = pdf.href;
    pdfLoaded = false;
    pdfFailed = false;
    var parameters = new URLSearchParams(pdf.hash.slice(1));
    if (!parameters.has('view')) parameters.set('view', 'FitH');
    if (!parameters.has('pagemode')) parameters.set('pagemode', 'none');
    pdf.hash = parameters.toString();
    loadingTimer = window.setTimeout(showFallback, 15000);
    frame.src = pdf.href;
  });

  frame.addEventListener('load', function () {
    if (!frame.getAttribute('src')) return;
    pdfLoaded = true;
    pdfFailed = false;
    finishLoading();
    status.hidden = true;
  });
  frame.addEventListener('error', function () { pdfFailed = true; showFallback(); });

  closeButton.addEventListener('click', function () { reader.close(); });
  reader.addEventListener('close', function () {
    finishLoading();
    document.documentElement.classList.remove('paper-reader-open');
    if (ownsFullscreen && document.fullscreenElement === surface && document.exitFullscreen) {
      document.exitFullscreen().catch(function () {});
    }
    ownsFullscreen = false;
    if (trigger && trigger.isConnected) trigger.focus();
  });

  // A click on the native backdrop closes the reader; clicks inside do not.
  reader.addEventListener('click', function (event) {
    if (event.target !== reader) return;
    var bounds = reader.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) reader.close();
  });

  if (document.fullscreenEnabled && surface.requestFullscreen) {
    fullscreenButton.hidden = false;
    fullscreenButton.addEventListener('click', function () {
      var entering = !document.fullscreenElement;
      var action = entering ? surface.requestFullscreen() : document.exitFullscreen();
      action.then(function () {
        ownsFullscreen = entering;
        if (entering && !reader.open) document.exitFullscreen().catch(function () {});
      }).catch(function () { fullscreenButton.hidden = true; });
    });
    document.addEventListener('fullscreenchange', function () {
      fullscreenButton.textContent = document.fullscreenElement ? 'Exit full screen' : 'Full screen';
      if (!document.fullscreenElement) ownsFullscreen = false;
    });
  }
}());
