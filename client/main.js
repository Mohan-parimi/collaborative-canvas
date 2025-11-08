const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const socket = io();

// --- Canvas setup ---
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.lineCap = "round";
ctx.lineJoin = "round";

// --- Drawing state ---
let drawing = false;
let brushColor = "#000000";
let brushSize = 4;
let currentTool = "brush"; // brush | eraser
let actions = [];
let redoStack = [];

// --- Helpers ---
function drawLine(x0, y0, x1, y1, color, size) {
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// --- Mouse Events ---
let prevX = 0, prevY = 0;
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  prevX = e.clientX;
  prevY = e.clientY;
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
});

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  const x = e.clientX;
  const y = e.clientY;
  const color = currentTool === "eraser" ? "#ffffff" : brushColor;
  const size = brushSize;

  drawLine(prevX, prevY, x, y, color, size);
  socket.emit("drawing", { x0: prevX, y0: prevY, x1: x, y1: y, color, size });

  actions.push({ x0: prevX, y0: prevY, x1: x, y1: y, color, size });
  prevX = x;
  prevY = y;
});

// --- Socket Sync ---
socket.on("drawing", (data) => {
  drawLine(data.x0, data.y0, data.x1, data.y1, data.color, data.size);
});

socket.on("clearCanvas", () => clearCanvas());

// --- Toolbar Controls ---
document.getElementById("colorPicker")?.addEventListener("change", (e) => {
  brushColor = e.target.value;
});

document.getElementById("sizePicker")?.addEventListener("change", (e) => {
  brushSize = parseInt(e.target.value, 10);
});

document.getElementById("clearBtn")?.addEventListener("click", () => {
  clearCanvas();
  socket.emit("clearCanvas");
  actions = [];
  redoStack = [];
});

document.getElementById("undoBtn")?.addEventListener("click", () => {
  if (actions.length === 0) return;
  redoStack.push(actions.pop());
  redrawCanvas();
  socket.emit("undoAction", actions);
});

document.getElementById("redoBtn")?.addEventListener("click", () => {
  if (redoStack.length === 0) return;
  const redoAction = redoStack.pop();
  actions.push(redoAction);
  drawLine(redoAction.x0, redoAction.y0, redoAction.x1, redoAction.y1, redoAction.color, redoAction.size);
  socket.emit("redoAction", redoAction);
});

document.getElementById("eraserBtn")?.addEventListener("click", () => {
  currentTool = currentTool === "eraser" ? "brush" : "eraser";
});

// --- Redraw Canvas ---
function redrawCanvas() {
  clearCanvas();
  for (const act of actions) {
    drawLine(act.x0, act.y0, act.x1, act.y1, act.color, act.size);
  }
}
