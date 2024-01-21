const socket = io();
const form = document.getElementById("form-chat");
const input = document.getElementById("input-chat");
const messages = document.getElementById("messages");

form.addEventListener('submit', function(e){
    e.preventDefault();
    if(input.value){
        const user = currentUser; // Utiliza la variable currentUser
        //socket.emit('setUsername', currentUser);             // user:user:hola
        //socket.emit("chat", `${user}: ${input.value}`);      // user:user:hola
        socket.emit("chat", input.value); // Send only the message content
        input.value = "";
    }
});;
socket.on('connect', () => {
    socket.emit('setUsername', currentUser);
});
socket.on("chat", (msg) => {
    displayMessage(msg);
});

function displayMessage(msg) {
    const messageElement = document.createElement("li");
    messageElement.classList.add("message");

    if (msg.startsWith(currentUser)) {
        messageElement.classList.add("current-user-message");
    } else {
        messageElement.classList.add("user-message");
    }

    messageElement.textContent = msg;
    messages.appendChild(messageElement);

    window.scrollTo(0, document.body.scrollHeight);
}