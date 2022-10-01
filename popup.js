
document.addEventListener('DOMContentLoaded', function() {
	document.querySelector("#newPage").addEventListener('click', function() {

		chrome.tabs.create({url:chrome.runtime.getURL("local.html") }, function(tab) {
			
		}); 
	});
	chrome.storage.local.get("audioDataArray", function (result) {
		if(result.audioDataArray){
			document.querySelector("#slider").value = result.audioDataArray;
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

		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {data: audioDataArray/100}, function(response) {
			});
		});
		chrome.storage.local.set({audioDataArray:audioDataArray}, function (result) {
		});

	});



	  
	  
});







