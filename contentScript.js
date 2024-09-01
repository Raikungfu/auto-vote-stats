let intervalStatsId;
let isVoting = false;
let totalVotes = 0;
let lastVoteTime = 0;
let voteInterval = 1000; // Giá trị mặc định là 1000ms

function voteForFayeYoko() {
  const currentTime = Date.now();

  if (currentTime - lastVoteTime <= voteInterval) {
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

            lastVoteTime = currentTime;

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

function startAutoClick(interval) {
  if (!intervalStatsId) {
    voteInterval = interval; // Cập nhật khoảng thời gian chờ
    intervalStatsId = setInterval(voteForFayeYoko, voteInterval + 100); // Thay đổi thời gian chạy tự động dựa trên thời gian chờ
  }
}

function stopAutoClick() {
  if (intervalStatsId) {
    clearInterval(intervalStatsId);
    intervalStatsId = null;
  }
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "start") {
    startAutoClick(message.interval);
  } else if (message.action === "stop") {
    stopAutoClick();
  }
});
