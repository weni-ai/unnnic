<div align="center">

<img src="https://github.com/weni-ai/unnnic/assets/69015179/659e88c0-9e42-4a03-8e64-a35961e6079c" height="100" />

# Unnnic

<img src="https://github.com/Ilhasoft/weni-webapp/raw/main/src/assets/LogoWeniAnimada.svg" height="20" />

*This project is the design system of [Weni](https://github.com/weni-ai)*

</div>

# Requirements
Before install the lib, make sure you have installed the following tools on your machine:

- [Node.js 18.16.1](https://nodejs.org/en)
- [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) (recommended) 

# Set up at projects with Vue 3 (still in beta)

1. Install unnnic in your project in version `2.0.0-beta.16` or above

```
yarn add @weni/unnnic-system@2.0.0-beta.16
```

2. Configuration in main.js 

```
import Unnnic from "@weni/unnnic-system";
import "@weni/unnnic-system/dist/style.css";

const app = createApp(App);

app.use(Unnnic);
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

# Set up at projects with Vue 2

1. Install unnnic in your project in version `1.24.11` or below `2.0.0`

```
yarn add @weni/unnnic-system@1.24.11
```

2. Configuration in main.js 

```
import Vue from 'vue';
import Unnnic from "@weni/unnnic-system";

Vue.use(Unnnic);
```

3. Configuration in vue.config.js

```
css: {
  loaderOptions: {
    sass: {
      additionalData: `
        @import '~@weni/unnnic-system/dist/unnnic.css';
        @import '~@weni/unnnic-system/src/assets/scss/unnnic.scss';
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

# Contributing
We are looking for collaboration from the Open Source community! There's so much we want to do, including but not limited to: enhancing existing applications with new features, optimizing the NLP tasks and algorithms involved that boost accuracy, new communication channels and integrations.

- Please read our contribution guidelines for details on what and how you can contribute.

- Report a bug by using this guideline for details on what and how you can contribute.
