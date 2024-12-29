# The unofficial Dribbble JavaScript SDK

## Introduction

This is the unofficial JavaScript SDK for [Dribbble](https://dribbble.com/), making it easy to communicate with its API in your JavaScript application.

- Read [API Reference](https://developer.dribbble.com/v2/) to understand how the Dribbble API works.
- Visit [Docs](https://hurby24.github.io/dribbble.js/) for function usage.

## Features

- **OAuth 2.0 Integration:** This SDK supports OAuth 2.0, allowing you to authenticate users and interact with the Dribbble API securely.
- **Type-safe: Written in** TypeScript and documented with TSDoc, ensuring that you get proper type checking and code completion.

## Installation

### Install the package

```bash
# bun
bun install @hurby/dribbble.js
```

```bash
# pnpm
pnpm install @hurby/dribbble.js
```

```bash
# npm
npm install @hurby/dribbble.js
```

## Usage

```tsx
import { Dribbble, Users } from "@hurby/dribbble.js";

// Setup Dribbble OAuth client
const dribbbleClient = new Dribbble({
  clientId: process.env.DRIBBBLE_CLIENT_ID,
  clientSecret: process.env.DRIBBBLE_CLIENT_SECRET,
  redirectURI: process.env.DRIBBBLE_REDIRECT_URI,
});

// Generate random state
const state = dribbbleClient.generateState();

// Generate the authorization URL
const authURL = dribbbleClient.createAuthorizationURL(state, [
  "public",
  "upload",
]);

// Redirect the user to the auth URL

// After redirect, use the authorization code to get the access token
const { accessToken, error } = await dribbbleClient.validateAuthorizationCode(
  "authorizationCode"
);
```

For more functions usage, see [Docs](https://hurby24.github.io/dribbble.js/)
