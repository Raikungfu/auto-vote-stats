let intervalStatsId;
let isVoting = false; // Biến để theo dõi trạng thái nhấp chuột
let totalVotes = 0; // Biến để theo dõi tổng số lần bỏ phiếu
let lastVoteTime = 0; // Biến để theo dõi thời gian của lần bỏ phiếu cuối cùng

function voteForFayeYoko() {
  const currentTime = Date.now();

  // Kiểm tra xem đã trôi qua ít nhất 1 giây kể từ lần bỏ phiếu cuối cùng chưa
  if (currentTime - lastVoteTime <= 1000) {
    console.log("Skipping vote due to rate limit");
    return;
  }

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

            lastVoteTime = currentTime; // Cập nhật thời gian của lần bỏ phiếu cuối cùng

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
  if (!intervalStatsId) {
    intervalStatsId = setInterval(voteForFayeYoko, 1000);
  }
}

function stopAutoClick() {
  if (intervalStatsId) {
    clearInterval(intervalStatsId);
    intervalStatsId = null;
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
