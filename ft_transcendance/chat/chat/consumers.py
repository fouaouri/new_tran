import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from datetime import datetime
from .models import Message

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

        self.accept()

        # Send stored messages to the user who just connected
        self.send_stored_messages()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        username = text_data_json['username']
        blocked = text_data_json.get('blocked', False)
        timestamp = datetime.now().strftime('%H:%M')
        print(f"CHATCONSUMERE : Received message from {username}: {message} to room group: {self.room_group_name}")  # Debug log
                # Check if the users are blocked
        if blocked:
            self.send(text_data=json.dumps({
                'message': "You have been blocked from this conversation."
            }))
            return

        # Store message if recipient is not in the room
        if not self.is_recipient_in_room(username):
            # print(f"Storing message from {username}: {message}")
            self.store_message(username, message)

        # Broadcast message to all users in the room
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {
                "type": "chat.message",
                "message": message,
                "username": username,
                "timestamp": timestamp
            }
        )

    def chat_message(self, event):
        message = event["message"]
        username = event["username"]
        timestamp = event["timestamp"]

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            "message": message,
            "username": username,
            "timestamp": timestamp
        }))

    def is_recipient_in_room(self, recipient):
        # Check if recipient is in the room
        return False  # For testing, this should be modified based on actual room membership

    def store_message(self, username, message):
        room_name = self.room_name
        Message.objects.create(
            value=message,
            user=username,
            room=room_name
        )
        # print(f"Message stored for room {room_name}: {message}")

    def send_stored_messages(self):
        room_name = self.room_name
        stored_messages = Message.objects.filter(room=room_name)

        for msg in stored_messages:
            # print(f"Sending stored message: {msg.value}")
            self.send(text_data=json.dumps({
                "message": msg.value,
                "username": msg.user,
                "timestamp": msg.date.strftime('%H:%M')
            }))