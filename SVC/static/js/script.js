// Get chatbot elements
const chatbot = document.getElementById('chatbot');
const conversation = document.getElementById('conversation');
const inputForm = document.getElementById('input-form');
const inputField = document.getElementById('input-field');

// Add event listener to input form
inputForm.addEventListener('submit', function(event) {
  // Prevent form submission
  event.preventDefault();
  // Get user input
  const input = inputField.value;
  // Clear input field
  inputField.value = '';
  // Send user input to server if not empty
  if (!input) return;
  execute(input);
});


  function execute(input) {
      fetch("/ai/answer", {
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
      message = document.createElement('div');
      message.classList.add('chatbot-message','chatbot');
      message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${data.result}</p>`;
      conversation.appendChild(message);
      message.scrollIntoView({behavior: "smooth"});
}