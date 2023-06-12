
## Getting Started

1. In the root directory, please run 

```
npm install (or `pnpm install` or `yarn`)
```

2. Run 

```
npm run dev
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## File Structure
```
my-project/
├ src/
│ ├ lib/
│ │ ├ asstes
│ │ └ store
│ ├ params
│ ├ routes/
│ │ └ [project routes]
│ ├ app.html
│ ├ error.html
│ ├ hooks.client.js
│ └ hooks.server.js
├ static/
│ └ [static assets]
├ tests/
│ └ [your tests]
├ package.json
├ svelte.config.js
├ tsconfig.json
└ vite.config.js
└ tailwind.config.cjs
```
