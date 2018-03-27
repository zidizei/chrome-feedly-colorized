chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({
    color: '#5DC249',
    useCustom: false,
    greyRead: true
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  chrome.storage.sync.get(request, function(value) {
    sendResponse({ opts: value });
  });

  return true
});
