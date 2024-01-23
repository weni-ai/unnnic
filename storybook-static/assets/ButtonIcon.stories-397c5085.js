import{U as e}from"./ButtonIcon-60c8efda.js";import{i as p}from"./Icon-6670ffc4.js";import"./vue.esm-bundler-fb65849e.js";import"./_plugin-vue_export-helper-c27b6911.js";const r=Object.keys(p),b={title:"Form/ButtonIcon",component:e,argTypes:{size:{control:{type:"select",options:["small","large"]}},icon:{control:{type:"select",options:r}}}},a=(i,{argTypes:c})=>({props:Object.keys(c),components:{unnnicButtonIcon:e},template:`
    <unnnic-button-icon v-bind="$props" />
  `}),n=a.bind({});n.args={size:"small",icon:r[0]};var o,t,s;n.parameters={...n.parameters,docs:{...(o=n.parameters)==null?void 0:o.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicButtonIcon
  },
  template: \`
    <unnnic-button-icon v-bind="$props" />
  \`
})`,...(s=(t=n.parameters)==null?void 0:t.docs)==null?void 0:s.source}}};const g=["Normal"];export{n as Normal,g as __namedExportsOrder,b as default};
