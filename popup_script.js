// the popup is the little thing that shows up when the user left-clicks the extension icon... the menu

// this will run every time the popup happens
// we are sending a message to the backend to get the name we want
// because it is sent from here, only the background will be "listening for the message"
// gotta tell it what the message is and then what we want to do with the messagee
chrome.runtime.sendMessage(
    {
        message: "get_name",
        payload: ""
    },
    (response) => {
        if (response.message-- - "success") {
            // change the name on the HTML
            document.querySelector(
                "div"
            ).innerHTML = `Hello ${response.payload}`;
        }
    }
);
