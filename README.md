<div align="center">

<img src="https://github.com/weni-ai/unnnic/assets/69015179/659e88c0-9e42-4a03-8e64-a35961e6079c" height="100" />


# Unnnic

<img src="https://github.com/Ilhasoft/weni-webapp/raw/main/src/assets/LogoWeniAnimada.svg" height="20" />


*This project is the design system of [Weni](https://github.com/weni-ai)*

[![codecov](https://codecov.io/github/weni-ai/unnnic/graph/badge.svg?token=UR64TB938Z)](https://codecov.io/github/weni-ai/unnnic) [![CI](https://github.com/weni-ai/unnnic/workflows/CI/badge.svg)](https://github.com/weni-ai/unnnic/actions?workflow=CI)

</div>

# Requirements
Before install the lib, make sure you have installed the following tools on your machine:

- [Node.js 20](https://nodejs.org/en)
- [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) (recommended) 

# Set up at projects with Vue 3

1. Install unnnic in your project

```
yarn add @weni/unnnic-system
```

2. Configuration in main.js 

```
import Unnnic from "@weni/unnnic-system";
import "@weni/unnnic-system/dist/style.css";

const app = createApp(App);

app.use(Unnnic, {
  /**
   * Optional: route every teleport-aware layer (dialogs, drawers,
   * popovers, tooltips, toasts, etc) to a specific DOM container instead
   * of falling back to document.body. Accepts a CSS selector or an
   * HTMLElement reference.
   */
  teleportTarget: '#app',
});
```

3. Configuration in vite.config.js

```
css: {
  preprocessorOptions: {
    scss: {
      additionalData: `
        @import '@weni/unnnic-system/src/assets/scss/unnnic.scss';
      `,
    },
  },
},
```

# Open-Source Governance
The Weni Platform open source projects are governed by @weni-ai. Weni opens all its software parts under terms of an open-source license to reach potential users and partners mainly. Secondly, Weni wants to reach developers by building a community for some pieces that are more reusable in other businesses or software projects, such as NLP models or tools. Besides that, the openness of our software is also related to building trust by enabling our external stakeholders to audit the security of our software.

# Community

- Join our [community chat](https://community-chat.weni.ai) to discuss with our internal team
- Join [#dev](https://community-chat.weni.ai/channel/dev) for help from the community to development issues

# Contributing

**We are looking for collaboration from the Open Source community!** There's so much we want to do, 
including but not limited to: enhancing existing applications with new features, 
optimizing the NLP tasks and algorithms involved that boost accuracy, new communication channels and integrations.

* Please read our [contribution guidelines](https://github.com/ilhasoft/weni-platform/blob/main/.github/CONTRIBUTING.md) for details on what and how you can contribute.

* Report a bug by using [this guideline](https://github.com/ilhasoft/weni-platform/blob/main/.github/CONTRIBUTING.md#report-a-bug) 
for details on what and how you can contribute.
