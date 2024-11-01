document.addEventListener('DOMContentLoaded', () => {
    const roomName = document.getElementById('chat-container').getAttribute('data-roomname');
    const currentUsername = document.getElementById('chat-container').getAttribute('data-username');
    
    // Retrieve block status for both users from local storage
    let isBlocked = localStorage.getItem(`blocked_${roomName}`) === 'true';
    let recipientBlocked = localStorage.getItem(`blocked_${roomName}_by_${currentUsername}`) === 'true'; // Check if the current user is blocked by the recipient
    let chatCleared = localStorage.getItem(`chat_cleared_${roomName}`) === 'true';

    const chatBox = document.querySelector('#chat-box');
    if (chatCleared) {
        chatBox.innerHTML = ''; // Clear chat if it was previously cleared
    }

    // Initialize recipientUsername here
    const recipientUsername = roomName.split('_')[1]; // Adjust if your room naming convention changes

    if (roomName && currentUsername) {
        const wsProtocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
        const chatSocket = new WebSocket(
            wsProtocol + window.location.host + '/ws/chat/' + roomName + '/'
        );

        chatSocket.onopen = function() {
            console.log('WebSocket connection opened');
        };

        chatSocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            const message = data.message;
            const timestamp = data.timestamp;
            const senderUsername = data.username;

            // Check if the sender is blocked by the recipient
            if (isBlocked && senderUsername === recipientUsername) {
                console.log(`Message from ${senderUsername} blocked.`);
                return;
            }

            // Check if the recipient is blocked by the sender
            if (recipientBlocked && senderUsername === currentUsername) {
                console.log(`Message to ${senderUsername} blocked.`);
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

            // Notify in the user list if the recipient is not in the room
            if (!data.isRecipientInRoom && senderUsername !== currentUsername) {
                const userListItem = document.querySelector(`#user-list .friend-drawer[data-username="${senderUsername}"]`);
                if (userListItem) {
                    const notificationElement = userListItem.querySelector('.notification');
                    if (notificationElement) {
                        notificationElement.style.display = 'inline'; // Show the notification
                    }
                }
            }
        };

        chatSocket.onerror = function(e) {
            console.error('WebSocket error:', e);
        };

        chatSocket.onclose = function() {
            console.error('Chat socket closed unexpectedly');
        };

        document.querySelector('#send-button').onclick = function() {
            const messageInput = document.querySelector('#chat-input');
            sendMessage(messageInput);
        };

        document.querySelector('#chat-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const messageInput = document.querySelector('#chat-input');
                sendMessage(messageInput);
            }
        });

        document.querySelector('.settings-menu .menu-options').addEventListener('click', function(e) {
            e.preventDefault();

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
                    const chatBox = document.querySelector('#chat-box');
                    if (chatBox) {
                        chatBox.innerHTML = '';
                        localStorage.setItem(`chat_cleared_${roomName}`, true); // Save chat clear status to local storage
                        console.log('Chat cleared');
                    } else {
                        console.error('Chat box element not found');
                    }
                } else if (action === 'Block User' || action === 'Unblock User') {
                    const blockMessage = action === 'Block User'
                        ? `${currentUsername} has blocked ${recipientUsername}.`
                        : `${currentUsername} has unblocked ${recipientUsername}.`;

                    // Toggle the blocked status
                    isBlocked = action === 'Block User';
                    recipientBlocked = action === 'Unblock User' ? false : recipientBlocked; // If unblock, set recipientBlocked to false

                    localStorage.setItem(`blocked_${roomName}`, isBlocked); // Save block status to local storage
                    localStorage.setItem(`blocked_${roomName}_by_${currentUsername}`, recipientBlocked); // Save the opposite user's block status

                    // Notify the other user about being blocked or unblocked
                    chatSocket.send(JSON.stringify({
                        'message': blockMessage,
                        'username': currentUsername,
                        'blocked': isBlocked
                    }));

                    // Change button text based on the current action
                    const blockUserLink = document.querySelector('#block-user');
                    blockUserLink.textContent = isBlocked ? 'Unblock User' : 'Block User';

                    console.log(`${recipientUsername} has been ${isBlocked ? 'blocked' : 'unblocked'}.`);
                } else if (action === 'View Profile') {
                    console.log('Viewing Profile');
                }
            }
        });

        function sendMessage(messageInput) {
            const message = messageInput.value.trim();

            // Check if both users are blocked
            if (isBlocked || recipientBlocked) {
                console.log('Cannot send message, user is blocked.');
                messageInput.value = ''; // Clear the input after trying to send
                return;
            }

            if (message) {
                chatSocket.send(JSON.stringify({
                    'message': message,
                    'username': currentUsername
                }));

                // Check if the recipient is not in the room before adding a notification
                const isRecipientInRoom = false; // You need to implement this check based on your logic

                // Add notification to the user list if the recipient is not in the room
                if (!isRecipientInRoom) {
                    const userListItem = document.querySelector(`#user-list .friend-drawer[data-username="${recipientUsername}"]`);
                    if (userListItem) {
                        const notificationElement = userListItem.querySelector('.notification');
                        if (notificationElement) {
                            notificationElement.style.display = 'inline'; // Show the notification
                        }
                    }
                }

                messageInput.value = ''; // Clear the input after sending
            }
        }

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

        // Update the block/unblock button state on page load
        const blockUserLink = document.querySelector('#block-user');
        blockUserLink.textContent = isBlocked ? 'Unblock User' : 'Block User';
    } else {
        console.error('No room name or username provided. WebSocket not initialized.');
    }
});
