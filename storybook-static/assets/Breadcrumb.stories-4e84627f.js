import{U as c}from"./Breadcrumb-bd89db7e.js";import"./Icon-6670ffc4.js";import"./vue.esm-bundler-fb65849e.js";import"./_plugin-vue_export-helper-c27b6911.js";const b={title:"Example/Breadcrumb",component:c,argTypes:{"on-crumb-click":{action:"@crumb-click"}}},o=(s,{argTypes:t})=>({props:Object.keys(t),components:{unnnicBreadcrumb:c},template:`
    <unnnic-breadcrumb v-bind="$props"></unnnic-breadcrumb>
  `}),n=o.bind({});n.args={crumbs:[{name:"One",path:"/One"},{name:"Two",path:"/Two"},{name:"Active",path:"/Active"}]};var r,e,a;n.parameters={...n.parameters,docs:{...(r=n.parameters)==null?void 0:r.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicBreadcrumb
  },
  template: \`
    <unnnic-breadcrumb v-bind="$props"></unnnic-breadcrumb>
  \`
})`,...(a=(e=n.parameters)==null?void 0:e.docs)==null?void 0:a.source}}};const d=["Default"];export{n as Default,d as __namedExportsOrder,b as default};
