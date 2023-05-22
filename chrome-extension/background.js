chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'speak') {
      // Use your text-to-speech API here to convert the request.text into speech.
      // You can make a fetch request or use an SDK to handle the API call.
      // Once you have the speech data, play it using the Web Speech API or any audio library.
      // Here's an example using the Web Speech API:
    }
  });
  