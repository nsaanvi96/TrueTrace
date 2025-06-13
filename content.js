chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'analyzePage') {
    alert('Phishing analysis not implemented yet.');
  }
});