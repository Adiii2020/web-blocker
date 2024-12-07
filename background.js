let blockDate = new Date("January 20, 2025 00:00:00");

chrome.runtime.onInstalled.addListener(() => {
  // Set the default background image
  chrome.storage.sync.set({ backgroundImage: 'background.jpg' });
  chrome.storage.sync.set({ blockDate: blockDate });
});
