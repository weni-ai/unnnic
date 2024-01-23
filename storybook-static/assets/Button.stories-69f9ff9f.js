import{u as v}from"./Button-c6487f3f.js";import{i as a}from"./iconList-d1dd560b.js";import"./Icon-6670ffc4.js";import"./vue.esm-bundler-fb65849e.js";import"./_plugin-vue_export-helper-c27b6911.js";const _={title:"Form/Button",component:v,argTypes:{type:{control:{type:"select",options:["primary","secondary","tertiary","alternative","warning"]}},size:{control:{type:"select",options:["large","small"]}},text:{control:{type:"text"}},iconLeft:{control:{type:"select",options:[null,...a]}},iconCenter:{control:{type:"select",options:[null,...a]}},iconRight:{control:{type:"select",options:[null,...a]}},disabled:{control:{type:"boolean"}},loading:{control:{type:"boolean"}}}},s=(j,{argTypes:S})=>({props:Object.keys(S),components:{unnnicButton:v},template:'<unnnic-button v-bind="$props" />'}),n=s.bind({});n.args={text:"Button Text",disabled:!1};const e=s.bind({});e.args={type:"secondary",text:"Button Text",disabled:!1};const t=s.bind({});t.args={type:"tertiary",text:"Button Text",disabled:!1};const o=s.bind({});o.args={text:"Button Text",iconLeft:"developer-community-github-1-1"};const r=s.bind({});r.args={iconCenter:"add-1"};var p,c,i;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicButton
  },
  template: '<unnnic-button v-bind="$props" />'
})`,...(i=(c=n.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};var u,l,m;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicButton
  },
  template: '<unnnic-button v-bind="$props" />'
})`,...(m=(l=e.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var d,y,g;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicButton
  },
  template: '<unnnic-button v-bind="$props" />'
})`,...(g=(y=t.parameters)==null?void 0:y.docs)==null?void 0:g.source}}};var b,T,x;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicButton
  },
  template: '<unnnic-button v-bind="$props" />'
})`,...(x=(T=o.parameters)==null?void 0:T.docs)==null?void 0:x.source}}};var B,O,f;r.parameters={...r.parameters,docs:{...(B=r.parameters)==null?void 0:B.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicButton
  },
  template: '<unnnic-button v-bind="$props" />'
})`,...(f=(O=r.parameters)==null?void 0:O.docs)==null?void 0:f.source}}};const C=["Primary","Secondary","Tertiary","WithIcon","OnlyIcon"];export{r as OnlyIcon,n as Primary,e as Secondary,t as Tertiary,o as WithIcon,C as __namedExportsOrder,_ as default};
