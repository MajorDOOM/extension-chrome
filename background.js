/**
 * Copyright 2024 - Stéphane Kouadio
 * stephan.kouadio@gmail.com
 *
 */
function isGoogleSearchUrl(url) {
  return /^https?:\/\/(?:www\.)?google\.\w+\/search/.test(url);
}

chrome.webNavigation.onBeforeNavigate.addListener(
  function (details) {
    const isDocumentLoaded =
      details.documentLifecycle === undefined /* Firefox, since not using Service worker */ ||
      details.documentLifecycle === "active"  /* Chromium */;

    if (isDocumentLoaded && isGoogleSearchUrl(details.url) && !details.url.includes("gl=ch")) {
      const url = new URL(details.url);
      url.searchParams.set("gl", "ch");

      chrome.tabs.update(details.tabId, { url: url.toString() }, function () {});
    }
  },
  { url: [{ urlMatches: "https://www.google." }] }
);
