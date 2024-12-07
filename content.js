chrome.storage.local.get(["websites", "globalSettings"], (data) => {
    const websites = data.websites || [];
    const globalSettings = data.globalSettings || {};
    const currentHost = window.location.hostname;
  
    // Check if the current site is blocked
    if (websites.some((site) => currentHost.includes(site))) {
      if (globalSettings.date && new Date(globalSettings.date) > new Date()) {
        // Display the block page with the global settings
        document.body.innerHTML = `
          <div class="block-container">
            <div id="timer" class="timer">
              <span id="days"></span>:<span id="hours"></span>:<span id="minutes"></span>:<span id="seconds"></span>
            </div>
            <p class="message">Not too much time! Go and work for it!</p>
          </div>
        `;
  
        const blockContainer = document.querySelector(".block-container");
  
        // Apply background image
        blockContainer.style.position = "absolute";
        blockContainer.style.top = "0";
        blockContainer.style.left = "0";
        blockContainer.style.width = "100%";
        blockContainer.style.height = "100%";
        blockContainer.style.display = "flex";
        blockContainer.style.flexDirection = "column";
        blockContainer.style.alignItems = "center";
        blockContainer.style.justifyContent = "center";
        blockContainer.style.backgroundImage = `url(${globalSettings.background})`;
        blockContainer.style.backgroundSize = "cover";
        blockContainer.style.backgroundPosition = "center";
        blockContainer.style.color = "white";
  
        // Extract dominant color using Color Thief
        const img = new Image();
        img.src = globalSettings.background;
  
        img.onload = () => {
          const colorThief = new ColorThief();
          const dominantColor = colorThief.getColor(img);
  
          // Apply the dominant color to the timer and message
          document.querySelector(".message").style.color = `rgb(${dominantColor.join(",")})`;
          document.querySelector(".timer").style.color = `rgb(${dominantColor.join(",")})`;
        };
  
        // Countdown timer
        const targetDate = new Date(globalSettings.date);
  
        function updateTimer() {
          const timeLeft = targetDate - new Date();
  
          if (timeLeft <= 0) {
            document.body.innerHTML = "<h1>Time's up! You can access this site now.</h1>";
            return;
          }
  
          const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
          updateFlipStyle("days", days);
          updateFlipStyle("hours", hours);
          updateFlipStyle("minutes", minutes);
          updateFlipStyle("seconds", seconds);
        }
  
        function updateFlipStyle(id, value) {
          const element = document.getElementById(id);
          if (element) {
            const currentValue = element.innerHTML;
            if (currentValue !== value.toString()) {
              element.innerHTML = value;
              element.classList.add("flipping");
              setTimeout(() => {
                element.classList.remove("flipping");
              }, 500); // Time to complete flip animation
            }
          }
        }
  
        setInterval(updateTimer, 1000);
      }
    }
  });
  