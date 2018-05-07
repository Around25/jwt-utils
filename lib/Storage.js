/**
 * @description Perform local storage operations
 * setItem, getItem, removeItem
 */
class Storage {
  constructor(storageSystem) {
    this.storageSystem = storageSystem;
  }

  /**
   * @description Stores a value at the specified key.
   * Returns true if successful, false otherwise.
   * @param key: String
   * @param value: String
   * @returns Promise (Boolean)
   */
  async setItem(key, value) {
    try {
      await this.storageSystem.setItem(key, value);
      return true
    } catch (err) {
      return false
    }
  }

  /**
   * @description Retrieve a value with the specified key.
   * Returns the value if successful, null otherwise.
   * @param key: String
   * @returns Promise (String)
   */
  async getItem(key) {
    try {
      const value = await this.storageSystem.getItem(key);
      return value
    } catch (err) {
      return null
    }
  }

  /**
   * @description Remove a value with the specified key.
   * Returns true if successful, false otherwise.
   * @param key: String
   * @returns Promise (Boolean)
   */
  async removeItem(key) {
    try {
      await this.storageSystem.removeItem(key);
      return true
    } catch (err) {
      return false
    }
  }
}

module.exports = Storage
