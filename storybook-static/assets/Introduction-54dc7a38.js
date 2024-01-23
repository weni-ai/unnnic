import{j as e}from"./jsx-runtime-1e06b37d.js";import{M as i}from"./index-dbbef785.js";import{u as n}from"./index-def7438a.js";import"./iframe-57e9b485.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-725317a4.js";import"./index-d37d4223.js";import"./index-cba466d5.js";import"./index-356e4a49.js";function t(r){const s=Object.assign({h1:"h1",p:"p",strong:"strong",code:"code",a:"a"},n(),r.components);return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Example/Introduction"}),`
`,e.jsx("style",{children:`
    .subheading {
      --mediumdark: '#999999';
      font-weight: 700;
      font-size: 13px;
      color: #999;
      letter-spacing: 6px;
      line-height: 24px;
      text-transform: uppercase;
      margin-bottom: 12px;
      margin-top: 40px;
    }

    .link-list {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
      row-gap: 10px;
    }

    @media (min-width: 620px) {
      .link-list {
        row-gap: 20px;
        column-gap: 20px;
        grid-template-columns: 1fr 1fr;
      }
    }

    @media all and (-ms-high-contrast:none) {
    .link-list {
        display: -ms-grid;
        -ms-grid-columns: 1fr 1fr;
        -ms-grid-rows: 1fr 1fr;
      }
    }

    .link-item {
      display: block;
      padding: 20px;
      border: 1px solid #00000010;
      border-radius: 5px;
      transition: background 150ms ease-out, border 150ms ease-out, transform 150ms ease-out;
      color: #333333;
      display: flex;
      align-items: flex-start;
    }

    .link-item:hover {
      border-color: #1EA7FD50;
      transform: translate3d(0, -3px, 0);
      box-shadow: rgba(0, 0, 0, 0.08) 0 3px 10px 0;
    }

    .link-item:active {
      border-color: #1EA7FD;
      transform: translate3d(0, 0, 0);
    }

    .link-item strong {
      font-weight: 700;
      display: block;
      margin-bottom: 2px;
    }

    .link-item img {
      height: 40px;
      width: 40px;
      margin-right: 15px;
      flex: none;
    }

    .link-item span,
    .link-item p {
      margin: 0;
      font-size: 14px;
      line-height: 20px;
    }

    .tip {
      display: inline-block;
      border-radius: 1em;
      font-size: 11px;
      line-height: 12px;
      font-weight: 700;
      background: #E7FDD8;
      color: #66BF3C;
      padding: 4px 12px;
      margin-right: 10px;
      vertical-align: top;
    }

    .tip-wrapper {
      font-size: 13px;
      line-height: 20px;
      margin-top: 40px;
      margin-bottom: 40px;
    }

    .tip-wrapper code {
      font-size: 12px;
      display: inline-block;
    }
  `}),`
`,e.jsx(s.h1,{id:"welcome-to-storybook",children:"Welcome to Storybook"}),`
`,e.jsxs(s.p,{children:[`Storybook helps you build UI components in isolation from your app's business logic, data, and context.\r
That makes it easy to develop hard-to-reach states. Save these UI states as `,e.jsx(s.strong,{children:"stories"})," to revisit during development, testing, or QA."]}),`
`,e.jsxs(s.p,{children:[`Browse example stories now by navigating to them in the sidebar.\r
View their code in the `,e.jsx(s.code,{children:"stories"}),` directory to learn how they work.\r
We recommend building UIs with a `,e.jsx(s.a,{href:"https://componentdriven.org",target:"_blank",rel:"nofollow noopener noreferrer",children:e.jsx(s.strong,{children:"component-driven"})})," process starting with atomic components and ending with pages."]}),`
`,e.jsx("div",{className:"subheading",children:"Configure"}),`
`,e.jsxs("div",{className:"link-list",children:[e.jsx("a",{className:"link-item",href:"https://storybook.js.org/docs/react/addons/addon-types",target:"_blank",children:e.jsx("span",{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Presets for popular tools"}),`\r
Easy setup for TypeScript, SCSS and more.`]})})}),e.jsx("a",{className:"link-item",href:"https://storybook.js.org/docs/react/configure/webpack",target:"_blank",children:e.jsx("span",{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Build configuration"}),`\r
How to customize webpack and Babel`]})})}),e.jsx("a",{className:"link-item",href:"https://storybook.js.org/docs/react/configure/styling-and-css",target:"_blank",children:e.jsx("span",{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Styling"}),`\r
How to load and configure CSS libraries`]})})}),e.jsx("a",{className:"link-item",href:"https://storybook.js.org/docs/react/get-started/setup#configure-storybook-for-your-stack",target:"_blank",children:e.jsx("span",{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Data"}),`\r
Providers and mocking for data libraries`]})})})]}),`
`,e.jsx("div",{className:"subheading",children:"Learn"}),`
`,e.jsxs("div",{className:"link-list",children:[e.jsx("a",{className:"link-item",href:"https://storybook.js.org/docs",target:"_blank",children:e.jsx("span",{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Storybook documentation"}),`\r
Configure, customize, and extend`]})})}),e.jsx("a",{className:"link-item",href:"https://storybook.js.org/tutorials/",target:"_blank",children:e.jsx("span",{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"In-depth guides"}),`\r
Best practices from leading teams`]})})}),e.jsx("a",{className:"link-item",href:"https://github.com/storybookjs/storybook",target:"_blank",children:e.jsx("span",{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"GitHub project"}),`\r
View the source and add issues`]})})}),e.jsx("a",{className:"link-item",href:"https://discord.gg/storybook",target:"_blank",children:e.jsx("span",{children:e.jsxs(s.p,{children:[e.jsx("strong",{children:"Discord chat"}),`\r
Chat with maintainers and the community`]})})})]}),`
`,e.jsx("div",{className:"tip-wrapper",children:e.jsxs(s.p,{children:[e.jsx("span",{className:"tip",children:"Tip"}),"Edit the Markdown in ",e.jsx("code",{children:"stories/Introduction.stories.mdx"})]})})]})}function x(r={}){const{wrapper:s}=Object.assign({},n(),r.components);return s?e.jsx(s,Object.assign({},r,{children:e.jsx(t,r)})):t(r)}export{x as default};
//# sourceMappingURL=Introduction-54dc7a38.js.map
