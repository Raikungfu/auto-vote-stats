document.getElementById("start-auto-click").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "start" });
  });
  document.getElementById("start-auto-click").style.display = "none";
  document.getElementById("stop-auto-click").style.display = "block";
});

document.getElementById("stop-auto-click").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "stop" });
  });
  document.getElementById("start-auto-click").style.display = "block";
  document.getElementById("stop-auto-click").style.display = "none";
});
