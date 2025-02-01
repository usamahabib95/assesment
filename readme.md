# Real-Time Chatroom Microservice

## Overview

This project implements a real-time chatroom microservice using **Socket.io** for WebSocket communication and **In-Memory Storage** for storing chat history and active users. It supports:

- **Joining and leaving chatrooms**
- **Sending and receiving messages in real-time**
- **Retrieving active users and chat history**

## Installation

### Prerequisites

- Node.js (v14+ recommended)

### Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server:
   ```sh
   npm run start
   ```

The server will run on **http://localhost:3000**.

## WebSocket Usage (Using Postman)

### **Step 1: Connect to WebSocket**

1. Open **Postman**.
2. Select Socket.IO Request from the request type dropdown.
3. Enter the URL:
   ```
   http://localhost:3000
   ```
4. Click **Connect**.

5. Navigate to the Events tab in Postman and manually add event listeners for join, message and leave events to receive real-time updates.

### **Step 2: Join a Chatroom**

Once connected, send the following event:

- **Event Type:** `join`
- **Payload:**
  ```json
  {
    "userId": "1",
    "chatRoomId": "1"
  }
  ```

### **Step 3: Send a Message**

Send a `message` event with the following payload:

```json
{
  "userId": "1",
  "chatRoomId": "1",
  "message": "Hello, world!",
  "timestamp": "2024-01-29T12:00:00Z"
}
```

### **Step 4: Leave the Chatroom**

Send a `leave` event with the following payload:

```json
{
  "userId": "1",
  "chatRoomId": "1"
}
```

## API Endpoints

### **Get Active Users**

Returns a list of currently active users in a chatroom.

```http
GET /chat/active-users/:chatRoomId
```

### **Get Chat History**

Returns the last **N** messages from a specific chatroom (default: 50 messages).

```http
GET /chat/chat-history/:chatRoomId?limit=50
```

## Running Tests

Jest is used for testing the service. Run the tests using:

```sh
npm run test
```
