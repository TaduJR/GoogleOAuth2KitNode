# GoogleOAuth2Kit for Nodejs

## Description

GoogleOAuth2Kit is a Server-Side web app Node library that provides abstractions for simplifying Google API authentication. It handles the entire authentication flow, including generating an authentication URL, retrieving the authorization code, exchanging it for an access token, handling refresh tokens, and managing errors.

## Features

- Generates authentication URL
- Retrieves authorization code
- Exchanges authorization code for access token
- Handles refresh tokens
- Error handling with detailed diagnostics

## Prerequisites

Before using GoogleOAuth2Kit, ensure you have the following prerequisites installed:

- Node (version 18 or higher)

## Usage

- Fill your **clientId, clientSecret, redirectUris** and list of **scopes** obtained from Google
- Fill **accessToken (Optional), refreshToken(Optional)**, and **callback** function that will store your new refreshToken upon expire.

npm i googleoauth2kit

```js
const oauth2client = await authorize(
  {
    clientId,
    clientSecret,
    redirectUris,
    scopes,
    accessToken,
    refreshToken,
  },
  (tokens) => {
    console.log(tokens);
  }
);
```
