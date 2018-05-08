A small package to perform [JWT](https://jwt.io/) token operations (store, get, decode, get expiration date, check if expired, validate, remove from storage).

Works in `React` and `React Native`.

## Installation
```
npm install --save jwt-utils
```

## Usage

Initialize the package and then import in wherever you need it. The constructor takes a single config object as parameter. The `storageSystem` property is required.

```js
import TokenService from 'jwt-utils'

const TokenUtils = new TokenService({
  storageSystem: window.localStorage
});

export default TokenUtils
```

In the `React` environment, it can be either [window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) or [window.sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage). And it's totally synchronous.

#### Store
Stores token using the specified storage system. Token must be a `string`.
```js
// Take a properly formatted JWT token
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiSm9obiBEb2UiLCJleHAiOjE1MjU3MDAxNjE1NjJ9.qGB98H-4th9E0yTVHH235A4kCgFyKt5jIVgekk4fcp4'

TokenUtils.store(token);
```

#### Get
Retrieves the stored token if set, `undefined` otherwise.
```js
const token = TokenUtils.get();

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuY...
```

#### Decode
Decodes a token. A falsy token will return `{}`.
```js
const decodedToken = TokenUtils.decode(token);

// {
//   id: 1,
//   name: "John Doe",
//   exp: 1525700161562
// }
```

#### Get expiration date
Returns expiration date as unix timestamp (ms) or null if the `exp` property is not defined in the decoded token.
```js
const expirationDate = TokenUtils.getExpirationDate(token);

// 1525700161562
```

#### Check if expired
Returns a `boolean` value specifying if token is expired or not.
```js
const isExpired = TokenUtils.isExpired(token);
```

#### Check if valid
Checks if token is valid, simply by checking its existence. You can optionally use a validation function as a secondary param. In that case, the validation function should return a `boolean` value.
```js
const isValid = TokenUtils.isValid(token, validationFunc);
```

### Usage with React Native
In the `React Native` environment, `store` and `get` methods return promises (due to the `async` nature of the storage system).
```js
import { AsyncStorage } from 'react-native'
import TokenService from 'jwt-utils'

export default new TokenService({
  storageSystem: AsyncStorage
});
```

```js
const result = await TokenUtils.store(token);
// true

const token = await TokenUtils.get();
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuY...
```

## External dependencies

This package depends on [jwt-decode](https://github.com/auth0/jwt-decode) for token decoding.
