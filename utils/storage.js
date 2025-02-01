class InMemoryStorage {
  constructor() {
    this.storage = new Map();
  }

  set(key, value) {
    this.storage.set(key, value);
  }

  get(key) {
    return this.storage.get(key);
  }

  delete(key) {
    return this.storage.delete(key);
  }

  clear() {
    this.storage.clear();
  }

  getAll() {
    return Array.from(this.storage.entries());
  }
}

// Create a singleton instance
const chatStorage = new InMemoryStorage();
const activeUsersStorage = new InMemoryStorage();

module.exports = {
  chatStorage,
  activeUsersStorage,
};
