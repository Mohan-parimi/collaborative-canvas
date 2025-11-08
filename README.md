# Collaborative Canvas 🎨

A real-time collaborative drawing application built with Node.js, Express, and Socket.io. It enables multiple users to draw, erase, undo, redo, and clear a shared canvas simultaneously with instant synchronization.

## 🚀 Features
- ✏️ Draw with adjustable color and brush size
- 🧽 Erase drawings in real-time
- ↶ Undo / ↷ Redo support for all users
- 🧹 Clear entire canvas
- 🖼️ Upload background image
- 🟦 Draw rectangles and add text
- 👥 View active users connected to the session
- ⚡ Instant real-time updates across all connected clients

## 🛠️ Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js + Express
- **Realtime Engine:** Socket.io
- **State Management:** Custom classes for undo/redo and per-room drawing state

## 📂 Folder Structure
collaborative-canvas/
│
├── client/
│   ├── index.html
│   ├── style.css
│   └── main.js
│
├── server/
│   ├── server.js
│   ├── drawing-state.js
│   └── rooms.js
│
├── package.json
├── architecture.md
└── README.md

## ⚙️ Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/collaborative-canvas.git
2. Navigate into the project directory:
   cd collaborative-canvas
3. Install dependencies:
   npm install
4. Start the server:
   node server.js
5. Open your browser and visit:
   http://localhost:3000