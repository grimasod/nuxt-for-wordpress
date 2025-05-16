# Nuxt for WordPress

An example of using Nuxt to generate a static frontend for a WordPress site.

It's cuztomized for a specific site, but many of the techniques can be applied generally.

## Setup

Make sure to install dependencies:

```bash
# yarn
yarn install
```

## Env

```bash
NUXT_PUBLIC_API_BASE=https://example.com/wp-json/wp/v2/
NUXT_API_KEY=ABCDEFGHIJKLMNOP
NUXT_GTAG_CONFIG=G-1234567
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# yarn
yarn generate
```

Locally preview production build:

```bash
# yarn
yarn preview
````
