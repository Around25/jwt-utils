const jwtDecode = require('jwt-decode');

const Storage = require('./Storage');
const ErrorHandler = require('./ErrorHandler').default;
const ERROR = require('./ErrorHandler').TYPES;

/**
 * @description Perform jwt token operations
 */
class Token {
  constructor(options = {}) {
    const { storageSystem } = options;

    if (!storageSystem) {
      return new ErrorHandler(ERROR.NO_STORAGE);
    }

    this.storage = new Storage(storageSystem);
    this.key = 'default_jwt_access_token_key';
  }

  /**
   * @description Stores token. Returns true/false if succeded or not.
   * @param token: String
   * @returns Boolean
   */
  store(token) {
    if (!this.isValid(token)) {
      return false
    }
    return this.storage.setItem(this.key, token);
  }

  /**
   * @description Gets stored token
   * @returns String
   */
  get() {
    return this.storage.getItem(this.key)
  }

  /**
   * @description Decodes a token. A falsy token will return {}.
   * @param token: String
   * @returns Object
   */
  decode(token) {
    if (!this.isValid(token)) {
      return {}
    }

    try {
      return jwtDecode(token);
    } catch (err) {
      return {}
    }
  }

  /**
   * @description Returns expiration date as Unix Timestamp (ms) or null.
   * @param token: String
   * @returns Number || null
   */
  getExpirationDate(token) {
    if (!this.isValid(token)) {
      return null
    }
    const decodedToken = this.decode(token);
    return decodedToken.exp || null;
  }

  /**
   * @description Returns true/false if token is expired or not (with minute precision)
   * @param token: String
   * @returns Boolean
   */
  isExpired(token) {
    if (!this.isValid(token)) {
      return true
    }

    let expirationDate = this.getExpirationDate(token);
    if (!expirationDate) {
      new ErrorHandler(ERROR.NO_EXP_DATE);
      return true
    }

    const exp = new Date(expirationDate).valueOf();
    const now = new Date().valueOf();
    return exp < now
  }

  /**
   * @description Checks if token is valid, by checking its existence.
   * You can optionally use a validation function as a secondary param.
   * @param token: String
   * @param validationFunc: Function
   * @returns Boolean
   */
  isValid(token, validationFunc) {
    if (validationFunc && typeof validationFunc === 'function') {
      return validationFunc(token);
    }
    return !!token
  }

  /**
   * @description Removes token from storage
   * @returns Boolean
   */
  remove() {
    return this.storage.remove(this.key)
  }
}

module.exports = Token
