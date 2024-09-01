const intervalInput = document.getElementById("interval-input");
const intervalDisplay = document.getElementById("interval-display");

intervalInput.addEventListener("input", () => {
  const intervalValue = intervalInput.value;
  intervalDisplay.textContent = `${intervalValue} ms`;
});

document.getElementById("start-auto-click").addEventListener("click", () => {
  const interval = parseInt(intervalInput.value, 10);
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "start", interval });
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
