const DrawingState = require("./drawing-state");

class Rooms {
  constructor() {
    this.rooms = {};
  }

  hasRoom(id) {
    return !!this.rooms[id];
  }

  createRoom(id) {
    this.rooms[id] = new DrawingState();
  }

  getRoom(id) {
    return this.rooms[id];
  }
}

module.exports = class RoomManager extends Rooms {
  createRoom(id) {
    this.rooms[id] = new DrawingState();
    this.rooms[id].users = {};
  }

  getRoom(id) {
    return this.rooms[id];
  }
};
