const ERROR_TYPES = {
  NO_STORAGE: `No storage system was specified. On the Web, you can use either window.localStorage or window.sessionStorage. In React Native, AsyncStorage must be used.`,
  NO_EXP_DATE: `Expiration date is null. The decoded token object must contain an 'exp' key with a Unix Timestamp (ms)`
}

class ErrorHandler {
  constructor(err) {
    this.err = err;
    ErrorHandler.handleError(this);
  }

  static handleError(err) {
    return console.error(err)
  }
}

module.exports.TYPES = ERROR_TYPES;
module.exports.default = ErrorHandler;
