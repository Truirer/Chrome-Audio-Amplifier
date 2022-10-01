(function() {
    let eventArray = [];
    let count = true;
    
    chrome.storage.local.get('audioDataArray', function (result) {
    
    });
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            let windowVideos = document.querySelectorAll("video");
            if(count && windowVideos && eventArray.length == 0){
                windowVideos.forEach(function(element){
                    eventArray.push(amplifyMedia(element,request.data));
                })
                count = false;
            }
            else{
                let windowVideos = document.querySelectorAll("video");
                eventArray.forEach(function(element,index){
                    eventArray[index].gain.gain.value = request.data;
                 })
            }

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