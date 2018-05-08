/**
 * @description Perform local storage operations
 * setItem, getItem, removeItem
 */
class Storage {
  constructor(storageSystem) {
    this.storageSystem = storageSystem;
  }

  /**
   * @description Stores a value at the specified key
   * @param key: String
   * @param value: String
   */
  setItem(key, value) {
    return this.storageSystem.setItem(key, value)
  }

  /**
   * @description Retrieve a value with the specified key.
   * @param key: String
   * @returns Promise (String)
   */
  getItem(key) {
    return this.storageSystem.getItem(key)
  }

  /**
   * @description Remove a value with the specified key.
   * Returns true if successful, false otherwise.
   * @param key: String
   */
  async removeItem(key) {
    return this.storageSystem.removeItem(key);
  }
}

module.exports = Storage
