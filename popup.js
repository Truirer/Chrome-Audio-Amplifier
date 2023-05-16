
document.addEventListener('DOMContentLoaded', function() {

	chrome.storage.local.get("audioDataArray", function (result) {
		if(result.audioDataArray){
			document.querySelector("#slider").value = result.audioDataArray;
			document.querySelector("#sliderText").value = result.audioDataArray/10;

		}
	});

	
	// document.querySelector("#newVideo").addEventListener('click', function() {

	// 	chrome.tabs.create({url:chrome.runtime.getURL("local.html") }, function(tab) {
			
	// 	}); 
	// });

	let slider = document.querySelector("#slider");
	let audioDataArray= 0;
    slider.addEventListener('input', function() {
		audioDataArray = slider.value;
		document.querySelector("#sliderText").value = slider.value/10;
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {data: audioDataArray/100}, function(response) {
			});
		});
		chrome.storage.local.set({audioDataArray:audioDataArray}, function (result) {
		});

	});

	document.querySelector("#sliderText").addEventListener('input', function(){
		document.querySelector("#slider").value = document.querySelector("#sliderText").value*10;
	})

	  
	  
});






