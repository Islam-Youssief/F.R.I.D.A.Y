// Get chatbot elements
const chatbot = document.getElementById('chatbot');
const conversation = document.getElementById('conversation');
const inputForm = document.getElementById('input-form');
const drawButton = document.getElementById('draw-button');
const inputField = document.getElementById('input-field');

// Add event listener to input form
inputForm.addEventListener('submit', function(event) {
    execute_common('/ai/answer')
});

drawButton.addEventListener('click', function(event) {
    execute_common('/ai/draw')
});


function execute_common(url){
    // Prevent form submission
    event.preventDefault();
    // Get user input
    const input = inputField.value;
    // Clear input field
    inputField.value = '';
    // Send user input to server if not empty
    if (!input) return;
    execute(input, url);
}

function execute(input, url) {
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
            userCommand: input
        }),
      headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
      })
        .then((response) => {
            if (!response.ok) {throw new Error(`HTTP error! Status: ${response.status}`);}
            return response.json();
          })
        .then((data) => {updateUI(input, data)})
        .catch((error) => console.error("Error fetching data:", error));
}

function updateUI(input, data) {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });
      // Add user input to conversation
      let message = document.createElement('div');
      message.classList.add('chatbot-message', 'user-message');
      message.innerHTML = `<p class="chatbot-input" sentTime="${currentTime}">${input}</p>`;
      conversation.appendChild(message);
      // Add AI response to conversation
      if (data.result.includes("https")){
            element = '<img src="' + data.result + '" width="300" height="300" />';
      }
      else {
            element = `<p class="chatbot-text" sentTime="${currentTime}">${data.result}</p>`;
      }
      message = document.createElement('div');
      message.classList.add('chatbot-message','chatbot');
      message.innerHTML = element;
      conversation.appendChild(message);
      message.scrollIntoView({behavior: "smooth"});
}