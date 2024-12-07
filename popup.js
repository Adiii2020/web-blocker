// Update the list of websites
function updateWebsiteList() {
    chrome.storage.local.get("websites", (data) => {
      const websites = data.websites || [];
      const websiteListElement = document.getElementById("websiteList");
      websiteListElement.innerHTML = "";
  
      websites.forEach((site, index) => {
        const li = document.createElement("li");
        li.textContent = site;
  
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = () => {
          websites.splice(index, 1);
          chrome.storage.local.set({ websites }, updateWebsiteList);
        };
  
        li.appendChild(removeButton);
        websiteListElement.appendChild(li);
      });
    });
  }
  
  // Add a website to the block list
  document.getElementById("addWebsiteBtn").addEventListener("click", () => {
    const websiteInput = document.getElementById("websiteInput").value.trim();
  
    if (!websiteInput) {
      alert("Website is required.");
      return;
    }
  
    chrome.storage.local.get("websites", (data) => {
      const websites = data.websites || [];
      if (!websites.includes(websiteInput)) {
        websites.push(websiteInput);
        chrome.storage.local.set({ websites }, updateWebsiteList);
      } else {
        alert("Website is already in the block list.");
      }
    });
  
    document.getElementById("websiteInput").value = "";
  });
  
  // Set global timer and background
  document.getElementById("setGlobalSettingsBtn").addEventListener("click", () => {
    const dateInput = document.getElementById("dateInput").value;
    const backgroundInput = document.getElementById("backgroundInput").files[0];
  
    if (!dateInput || !backgroundInput) {
      alert("Both date and background are required.");
      return;
    }
  
    const reader = new FileReader();
    reader.onload = function (event) {
      const base64Image = event.target.result;
  
      chrome.storage.local.set({
        globalSettings: {
          date: dateInput,
          background: base64Image,
        },
      });
  
      alert("Global settings saved!");
    };
  
    reader.readAsDataURL(backgroundInput);
  });
  
  // Initial load
  updateWebsiteList();
  