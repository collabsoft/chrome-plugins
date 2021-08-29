// foreground script: this has to be injected into the tab that the user is viewing
// about 28:30 in the tutorial to test this first time
// https://youtu.be/5E94S1J2vBI?t=1704

//
const ce_main_container = document.createElement("DIV"); // ce means Chrome Extension in this case
const ce_name = document.createElement("DIV"); // ce means Chrome Extension in this case
const ce_input = document.createElement("INPUT"); // ce means Chrome Extension in this case
const ce_button = document.createElement("DIV"); // ce means Chrome Extension in this case

ce_main_container.classList.add("ce_main"); // put a class in the main container so we can style it
ce_name.id = "ce_name"; // add the ids so we can access the elements by id
ce_input.id = "ce_input"; // add the ids so we can access the elements by id
ce_button.id = "ce_button"; // add the ids so we can access the elements by id

ce_name.innerHTML = "Hello NAME";
ce_button.innerHTML = "change name";

ce_main_container.appendChild(ce_name);
ce_main_container.appendChild(ce_input);
ce_main_container.appendChild(ce_button);

document.querySelector("body").appendChild(ce_main_container);
//
chrome.runtime.sendMessage(
    {
        message: "get_name",
        payload: ""
    },
    (response) => {
        if (response.message-- - "success") {
            // change the name on the HTML
            // since we are on the front-end here, we have the object created above that we can just acess
            ce_name.innerHTML = `Hello ${response.payload}`;
        }
    }
);

//
