// background script... this is a service worker

// this part runs every time the extension is refreshed or re-installed
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        name: "jack",
        age: 42
    });
});

// now get the locally stored information that we put there
chrome.storage.local.get(["name", "age"], (data) => {
    //
});

/* //TEST - and learn
for every state of the http request this script will change.  
So unless I tell it otherwise it will run 4 times.  
I need to be sure the state is what I want before running the log

chrome.tabs.onUpdated((tabId, changeInfo, tab) => {
    console.log(tabId);
    console.log(changeInfo);
    console.log(tab);
});
*/
/*
// this is how it would be done with old callback method in Manifest V2
chrome.tabs.onUpdated((tabId, changeInfo, tab) => {
    chrome.scripting.executeScript(
        {
            target: { tabId: tabId },
            files: ["./foreground.js"]
        },
        () => {
            console.log(tab);
        }
    );
});
*/

// this is how to use promises (not callback) in Manifest V3
chrome.tabs.onUpdated((tabId, changeInfo, tab) => {
    // the following conditional checks for the status of the load to be completed
    // before running what is indise
    // and
    // it uses a regular expression to make sure that we are not
    // trying to apply to anything that is not an actual http page (ie. chrome://)
    if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
        chrome.scripting
            .insertCSS({
                target: { tabId: tabId },
                files: ["./foreground_styles.css"]
            })
            .then(() => {
                // injects 5 times for some reason, so I added the changeInfo.status === 'complete' part
                console.log("INJECTED THE FOREGROUND CSS");
                chrome.scripting
                    .executeScript({
                        target: { tabId: tabId },
                        files: ["./foreground.js"]
                    })
                    .then(() => {
                        // injects 5 times for some reason, so I added the changeInfo.status === 'complete' part
                        console.log("INJECTED THE FOREGROUND SCRIPT");
                    });
            })
            .catch((err) => console.log(err));
    }
});

// ----------- extension API information
//chrome.runtime.sendMessage(); // sends message to background.js,popup_scripts.js, and options_script.js.  Whichever one catches it first deals with it...
//chrome.tabs.sendMessage(); // only sends message to foreground scripts
// -------------------------------------
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "get_name") {
        chrome.storage.local.get("name", (data) => {
            if (chrome.runtime.lastError) {
                sendResponse({
                    message: "fail"
                });
                return;
            }

            sendResponse({
                message: "success",
                payload: data.name
            });
        });
        // by returning true here we have validated that the request has been received
        // and that we are working on it
        // SO, please don't close our connection until you hear back.
        return true;
    }
}); // frontend files and backend files can have listeners
