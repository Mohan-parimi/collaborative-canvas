class DrawingState {
  constructor() {
    this.actions = [];
    this.redoStack = [];
    this.users = {};
  }

  addAction(action) {
    this.actions.push(action);
    this.redoStack = [];
  }

  undo() {
    if (this.actions.length > 0) {
      const last = this.actions.pop();
      this.redoStack.push(last);
    }
  }

  redo() {
    if (this.redoStack.length > 0) {
      const redoAction = this.redoStack.pop();
      this.actions.push(redoAction);
    }
  }

  clear() {
    this.actions = [];
    this.redoStack = [];
  }

  getActions() {
    return this.actions;
  }

  addUser(id, userData) {
    this.users[id] = userData;
  }

  removeUser(id) {
    delete this.users[id];
  }

  getUsers() {
    return this.users;
  }
}

module.exports = DrawingState;
