document.addEventListener('DOMContentLoaded', () => {
    const roomName = document.getElementById('chat-container').getAttribute('data-roomname');
    const currentUsername = document.getElementById('chat-container').getAttribute('data-username');

    // WebSocket connection setup
    if (roomName && currentUsername) {
        const wsProtocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
        const chatSocket = new WebSocket(
            wsProtocol + window.location.host + '/ws/chat/' + roomName + '/'
        );

        chatSocket.onopen = function(e) {
            console.log('WebSocket connection opened');
        };

        chatSocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            const message = data.message;
            const timestamp = data.timestamp;
        
            const chatBox = document.querySelector('#chat-box');
            if (!chatBox) {
                console.error('Chat box element not found');
                return;
            }
        
            const messageClass = data.username === currentUsername ? 'sent-message' : 'received-message';
        
            // Create the message wrapper
            const messageWrapper = document.createElement('div');
            messageWrapper.classList.add('message-wrapper', messageClass);
        
            // Add the message text
            const messageElement = document.createElement('div');
            messageElement.classList.add('message-text');
            messageElement.textContent = message;
        
            // Add the timestamp (outside the message block)
            const timestampElement = document.createElement('div');
            timestampElement.classList.add('timestamp');
            timestampElement.textContent = timestamp;
        
            // Append message and timestamp to the wrapper
            messageWrapper.appendChild(messageElement);
            messageWrapper.appendChild(timestampElement);
        
            // Append the entire wrapper to the chat box
            chatBox.appendChild(messageWrapper);
        
            chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
        };

        chatSocket.onerror = function(e) {
            console.error('WebSocket error:', e);
        };

        chatSocket.onclose = function(e) {
            console.error('Chat socket closed unexpectedly');
        };

        document.querySelector('#send-button').onclick = function(e) {
            const messageInput = document.querySelector('#chat-input');
            sendMessage(messageInput);
        };

        document.querySelector('#chat-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault(); // Prevent the default action (e.g., form submission)
                const messageInput = document.querySelector('#chat-input');
                sendMessage(messageInput);
            }
        });

        function sendMessage(messageInput) {
            const message = messageInput.value.trim();
            if (message) {
                chatSocket.send(JSON.stringify({
                    'message': message,
                    'username': currentUsername
                }));
                messageInput.value = '';
            }
        }

        window.onbeforeunload = function() {
            chatSocket.close();
        };

        // Functionality for menu items
        document.querySelector('.settings-menu .menu-options').addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                const action = e.target.textContent;

                if (action === 'Invite to Game') {
                    const inviteMessage = `${currentUsername} has invited you to a game!`;
                    chatSocket.send(JSON.stringify({
                        'message': inviteMessage,
                        'username': currentUsername
                    }));
                    console.log('Invite to Game message sent');
                } else if (action === 'Clear Chat') {
                    // Clear all messages from the chat box
                    const chatBox = document.querySelector('#chat-box');
                    if (chatBox) {
                        chatBox.innerHTML = ''; // Remove all child elements
                        console.log('Chat cleared');
                    } else {
                        console.error('Chat box element not found');
                    }
                } else if (action === 'Block User') {
                    // Implement block user logic here
                    console.log('Block User clicked');
                } else if (action === 'View Profile') {

                }
            }
        });

        // Functionality for search input
        document.querySelector('#search-input').addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            const userListItems = document.querySelectorAll('#user-list .friend-drawer');
            userListItems.forEach(item => {
                const username = item.querySelector('.text h6').textContent.toLowerCase();
                if (username.includes(query)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    } else {
        console.error('No room name or username provided. WebSocket not initialized.');
    }
});
