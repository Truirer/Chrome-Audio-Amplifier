(function() {
    chrome.storage.local.get('audioDataArray', function (result) {
        console.log(audioDataArray)
    });
    document.querySelector("head").append('<link rel="stylesheet" href="inject.css">');
    let windowVideos = document.querySelectorAll("video");
    windowVideos.forEach(function(element){
        let data = amplifyMedia(element,1);
        element.dataset.dataAudio = data;
    })

    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            var evt = document.createEvent("CustomEvent");
            evt.initCustomEvent(request.method, true, true);
            document.dispatchEvent(evt);
    });




})();




function amplifyMedia(mediaElem, multiplier) {
  var context = new (window.AudioContext || window.webkitAudioContext),
      result = {
        context: context,
        source: context.createMediaElementSource(mediaElem),
        gain: context.createGain(),
        media: mediaElem,
        amplify: function(multiplier) { result.gain.gain.value = multiplier; },
        getAmpLevel: function() { return result.gain.gain.value; }
      };
  result.source.connect(result.gain);
  result.gain.connect(context.destination);
  result.amplify(multiplier);
  return result;
}