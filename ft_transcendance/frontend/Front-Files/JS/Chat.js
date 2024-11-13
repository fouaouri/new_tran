// document.addEventListener('DOMContentLoaded', () => {



console.log("chat.js is work : wewe")
let currentUsername = null;
let roomName = null;
let recipientUsername = null;
let chatSocket = null;

const userListContainer = document.getElementById('user-list');
const chatBox = document.getElementById('chat-box');
const recipientUsernameElement = document.getElementById('recipient-username');
const chatContainer = document.getElementById('chat-container');
const profileContainer = document.getElementById('profile-container');
const searchInput = document.getElementById('search-input');
const blockUserLink = document.getElementById('block-user');
const inviteGameLink = document.getElementById('invite-game');

let isBlocked = false;
let recipientBlocked = false;
let chatCleared = false;

// Fetch current user data
async function fetchCurrentUser() {
    try {
        const response = await fetch('http://localhost:8000/api/user/', { credentials: 'include' });
        const userData = await response.json();
        currentUsername = userData.username;
        if (currentUsername) {
            chatContainer.setAttribute('data-username', currentUsername);
            const chatPath = `http://127.0.0.1:8001/chat/${encodeURIComponent(currentUsername)}/`;
            fetchUserList(chatPath);
        } else {
            console.error("Username not found");
        }
    } catch (error) {
        console.error('Error fetching current user:', error);
    }
}

    // Fetch user list and display
    async function fetchUserList(chatPath) {
        try {
            const response = await fetch('http://localhost:8000/api/users/', { credentials: 'include' });
            const data = await response.json();
            if (data) {
                populateUserList(data);
            } else {
                console.error("Error: User data not found");
            }
        } catch (error) {
            console.error('Error fetching user list:', error);
        }
    }
    // In your script.js file, add the necessary code to trigger fadeIn animation for the user list
    function populateUserList(users) {
        const userListContainer = document.getElementById('user-list');
        userListContainer.innerHTML = ''; // Clear the current list

        users.forEach(user => {
            if (user.username === currentUsername) return; // Skip the current user

            // Create a list item for each user
            const userItem = document.createElement('li');
            userItem.classList.add('user-item', 'list-group-item', 'fadeIn'); // Add 'user-item' and animation class
            userItem.textContent = user.username; // Display the username

            // Add event listener to start chat when clicked
            userItem.addEventListener('click', () => startChatWithUser(user.username));

            userListContainer.appendChild(userItem);
        });

        // Optional: Implement search functionality
        setupSearchFunctionality(users);
    }



// Set up search functionality
function setupSearchFunctionality(users) {
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const userItems = document.querySelectorAll('li.list-group-item');
        userItems.forEach(userItem => {
            const username = userItem.textContent.toLowerCase();
            userItem.style.display = username.includes(searchTerm) ? '' : 'none';
        });
    });
}

// Start chat with selected user
async function startChatWithUser(username) {
    recipientUsername = username;
    recipientUsernameElement.textContent = `${recipientUsername}`;
    chatBox.innerHTML = '';

    try {
        const response = await fetch(`http://localhost:8001/chat/${encodeURIComponent(currentUsername)}/${encodeURIComponent(recipientUsername)}/`, { credentials: 'include' });
        const data = await response.json();
        if (data.room_name) {
            roomName = data.room_name;
            chatCleared = localStorage.getItem(`chat_cleared_${roomName}`) === 'true';
            isBlocked = localStorage.getItem(`blocked_${roomName}`) === 'true';
            recipientBlocked = localStorage.getItem(`blocked_${roomName}_by_${currentUsername}`) === 'true';

            chatContainer.setAttribute('data-roomname', roomName);
            chatContainer.classList.remove('d-none');
            profileContainer.classList.add('d-none');

            if (chatCleared) chatBox.innerHTML = '';
            initializeWebSocket();
            updateBlockButton();
        } else {
            console.error("Room name not found in response.");
        }
    } catch (error) {
        console.error('Error fetching chat room:', error);
    }
}

// Initialize WebSocket connection
function initializeWebSocket() {
    if (chatSocket) chatSocket.close();

    const wsProtocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    chatSocket = new WebSocket(wsProtocol + 'localhost:8001/ws/chat/' + roomName + '/');

    chatSocket.onopen = () => {
        console.log("WebSocket connection established for room:", roomName);
    };

    chatSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const message = data.message;
        const timestamp = data.timestamp;
        const senderUsername = data.username;

        if (data.type === 'game_invite') {
            displayGameInvite(data);
            return;
        }

        if ((isBlocked && senderUsername === recipientUsername) || 
            (recipientBlocked && senderUsername === currentUsername)) {
            console.log(`Blocked message from: ${senderUsername}`);
            return;
        }

        const messageClass = senderUsername === currentUsername ? 'sent-message' : 'received-message';
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('message-wrapper', messageClass);

        const messageElement = document.createElement('div');
        messageElement.classList.add('message-text');
        messageElement.textContent = message;

        const timestampElement = document.createElement('div');
        timestampElement.classList.add('timestamp');
        timestampElement.textContent = timestamp;

        messageWrapper.appendChild(messageElement);
        messageWrapper.appendChild(timestampElement);
        chatBox.appendChild(messageWrapper);

        chatBox.scrollTop = chatBox.scrollHeight;
    };

    chatSocket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    chatSocket.onclose = () => {
        console.log('WebSocket connection closed');
    };
}

// Update block/unblock button state
function updateBlockButton() {
    blockUserLink.textContent = isBlocked ? 'Unblock User' : 'Block User';
}

function sendMessage(messageInput) {
    const message = messageInput.value.trim();

    if (isBlocked || recipientBlocked) {
        console.log('Cannot send message, user is blocked.');
        messageInput.value = '';
        return;
    }

    if (message) {
        chatSocket.send(JSON.stringify({
            'message': message,
            'username': currentUsername,
            'room_name': roomName
        }));
        messageInput.value = '';
    }
}

// Event listeners for sending messages
document.getElementById('send-button').addEventListener('click', () => {
    const messageInput = document.getElementById('chat-input');
    sendMessage(messageInput);
});

document.getElementById('chat-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const messageInput = document.getElementById('chat-input');
        sendMessage(messageInput);
    }
});

// Event listener for block/unblock user
blockUserLink.addEventListener('click', () => {
    const action = blockUserLink.textContent === 'Block User' ? 'Block User' : 'Unblock User';
    isBlocked = action === 'Block User';
    localStorage.setItem(`blocked_${roomName}`, isBlocked);

    updateBlockButton();

    chatSocket.send(JSON.stringify({
        'message': `${action} ${recipientUsername}`,
        'username': currentUsername
    }));
});

// Function to invite the recipient to a game
function inviteToGame() {
    if (!recipientUsername) {
        console.error("No recipient selected for game invite.");
        return;
    }

    const inviteMessage = `Game invitation sent to ${recipientUsername}`;
    chatSocket.send(JSON.stringify({
        'type': 'game_invite',
        'message': inviteMessage,
        'username': currentUsername,
        'room_name': roomName
    }));

    const inviteElement = document.createElement('div');
    inviteElement.classList.add('message-wrapper', 'invite-message');
    inviteElement.textContent = `You invited ${recipientUsername} to a game.`;
    chatBox.appendChild(inviteElement);

    chatBox.scrollTop = chatBox.scrollHeight;
}

function displayGameInvite(data) {
    const inviteElement = document.createElement('div');
    inviteElement.classList.add('message-wrapper', 'invite-message');
    inviteElement.innerHTML = `${data.username} invited you to a game. <button id="accept-game">Accept</button> <button id="decline-game">Decline</button>`;
    chatBox.appendChild(inviteElement);
    
    document.getElementById('accept-game').addEventListener('click', () => {
        chatSocket.send(JSON.stringify({
            'type': 'game_response',
            'message': `${currentUsername} accepted the game invitation.`,
            'username': currentUsername,
            'response': 'accepted',
            'room_name': roomName
        }));
        inviteElement.innerHTML = 'You accepted the game invitation.';
    });

    document.getElementById('decline-game').addEventListener('click', () => {
        chatSocket.send(JSON.stringify({
            'type': 'game_response',
            'message': `${currentUsername} declined the game invitation.`,
            'username': currentUsername,
            'response': 'declined',
            'room_name': roomName
        }));
        inviteElement.innerHTML = 'You declined the game invitation.';
    });
}

inviteGameLink.addEventListener('click', inviteToGame);

fetchCurrentUser();
// });
