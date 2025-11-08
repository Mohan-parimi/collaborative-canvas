# Collaborative Canvas - System Architecture

Collaborative Canvas is a real-time multi-user drawing application built using Node.js, Express, and Socket.io. It allows multiple users to draw, erase, undo, redo, clear, and collaborate on a shared canvas simultaneously.

The system is divided into two main parts: the client and the server. The client handles user interaction and canvas rendering, while the server manages real-time synchronization between all connected clients using WebSockets (Socket.io).

## Folder Structure
collaborative-canvas/
│
├── client/
│   ├── index.html          # Frontend structure
│   ├── style.css           # Styling and layout
│   └── main.js             # Client-side drawing and socket logic
│
├── server/
│   ├── server.js           # Node + Express + Socket.io server
│   ├── drawing-state.js    # Manages drawing actions and undo/redo stacks
│   └── rooms.js            # Handles multiple user rooms and states
│
├── package.json            # Project dependencies
├── architecture.md         # Architectural overview
└── README.md               # Project summary and usage guide

## Technology Stack
- Frontend: HTML, CSS, JavaScript
- Real-time Communication: Socket.io
- Backend: Node.js + Express
- State Management: Custom JavaScript Classes for drawing state and undo/redo

## Workflow
1. When a user opens the app, index.html loads the canvas and toolbar UI.
2. The client establishes a WebSocket connection to the Node.js server via Socket.io.
3. When a drawing, erase, undo, redo, or clear action occurs, the client emits the action to the server.
4. The server receives this event and broadcasts it to all other connected users.
5. All connected clients render the update instantly, maintaining real-time synchronization.

## Key Features
- Real-time collaborative drawing.
- Adjustable brush color and size.
- Eraser tool for live removal of strokes.
- Undo and redo functionality synchronized across users.
- Clear canvas for all users simultaneously.
- Active user list showing connected participants.
- Supports multiple users drawing together with minimal latency.

## Data Flow
User Action → Socket Emit (client) → Server (Socket.io) → Broadcast → Other Clients (update canvas)

## Scalability
The application can support multiple collaborative rooms by extending the current room management system. Each room maintains its own drawing state and history, allowing independent sessions. The architecture can be deployed on scalable platforms like AWS, Vercel, or Render with WebSocket clustering.

## Summary
The Collaborative Canvas project demonstrates an efficient full-duplex communication model using Socket.io for live data transmission. It is lightweight, modular, and scalable for future enhancements such as saving canvas states, adding more shapes, or integrating authentication for personalized sessions.
