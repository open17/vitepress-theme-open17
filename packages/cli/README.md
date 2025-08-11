# create-open17-blog

A CLI tool for quickly setting up VitePress blog with `vitepress-theme-open17`

## Usage

```bash
npm create open17-blog my-blog
# or
yarn create open17-blog my-blog
# or  
pnpm create open17-blog my-blog
# or
bun create open17-blog my-blog
```

You can also run it without arguments to create a blog in current directory:

```bash
npm create open17-blog
```

## Features

- 🚀 Quick scaffolding with minimal setup
- 📁 Generates proper project structure
- 🎨 Preconfigured with open17 theme defaults  
- 📝 Sample blog post included
- ⚙️ Type-safe configuration
- 🔧 Works with npm/yarn/pnpm/bun

## What it creates

```
my-blog/
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts          # VitePress config with theme
│   │   └── theme/
│   │       └── index.ts       # Theme entry
│   ├── posts/
│   │   └── 2024-xx-xx-hello-open17.md  # Sample post
│   ├── index.md               # Homepage with <blog /> component
│   └── public/                # Static assets
├── package.json
└── .gitignore
```

## After scaffolding

```bash
cd my-blog
npm install
npm run dev
```

Your blog will be available at http://localhost:8090

## Options

- `-f, --force` - Overwrite target directory if it exists

## License

Apache-2.0