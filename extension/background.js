// Background service worker
chrome.commands.onCommand.addListener((command) => {
  if (command === 'open-replyai') {
    chrome.action.openPopup();
  }
});

console.log('ReplyAI: Background service worker loaded');
