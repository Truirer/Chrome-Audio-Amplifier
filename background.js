chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){

});

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

chrome.runtime.onInstalled.addListener(async () => {
  console.log(await getCurrentTab())
  chrome.scripting.executeScript({
      target: {tabId: (await getCurrentTab()).id},
      files: ['inject.js','inject.css']
    });
});