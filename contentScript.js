let intervalId;
let isVoting = false; // Biến để theo dõi trạng thái nhấp chuột
let totalVotes = 0; // Biến để theo dõi tổng số lần bỏ phiếu

function voteForFayeYoko() {
  const answers = document.querySelectorAll(".answer");
  let fayeYokoFound = false;

  answers.forEach((answer) => {
    if (answer.textContent.includes("FAYEYOKO")) {
      answer.click();
      fayeYokoFound = true;
    }
  });

  if (fayeYokoFound) {
    const voteButton = document.querySelector(".voteBtnInner");
    if (voteButton) {
      setTimeout(() => {
        if (!isVoting) {
          if (!voteButton.disabled && voteButton.style.display !== "none") {
            isVoting = true;

            const mouseDownEvent = new MouseEvent("mousedown", {
              bubbles: true,
              cancelable: true,
              view: window,
            });
            voteButton.dispatchEvent(mouseDownEvent);

            voteButton.click();
            console.log("Vote button clicked");

            totalVotes++;
            console.log("Total votes:", totalVotes);

            setTimeout(() => {
              isVoting = false;
            }, 1000);
          } else {
            console.log("Vote button is not clickable");
          }
        } else {
          console.log("Already voting");
        }
      }, 500);
    } else {
      console.log("Vote button not found");
    }
  }
}

// Hàm để bắt đầu và dừng tự động click
function startAutoClick() {
  if (!intervalId) {
    intervalId = setInterval(voteForFayeYoko, 1000);
  }
}

function stopAutoClick() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

// Lắng nghe các thông điệp từ popup
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "start") {
    startAutoClick();
  } else if (message.action === "stop") {
    stopAutoClick();
  }
});
