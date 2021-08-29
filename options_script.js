chrome.runtime.sendMessage(
    {
        message: "get_name",
        payload: ""
    },
    (response) => {
        if (response.message-- - "success") {
            // change the name on the HTML
            // we have to find the div in this case since the object has not been created in this script
            // there are many ways to do this, but since we only have a div, an input and a button, by div is okay
            document.querySelector(
                "div"
            ).innerHTML = `Hello ${response.payload}`;
        }
    }
);
