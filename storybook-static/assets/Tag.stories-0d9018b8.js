import{u}from"./Tag-c0d051ed.js";import{c as d}from"./colorsList-72763225.js";import"./Icon-6670ffc4.js";import"./vue.esm-bundler-fb65849e.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./ToolTip-7d326e2a.js";const h={title:"Example/Tag",component:u,argTypes:{text:{control:{type:"text"}},type:{control:{type:"select",options:["default","indicator","brand"]}},scheme:{control:{type:"select",options:d}}}},t={args:{text:"Label",type:"default"}},e={args:{text:"Tag Name",type:"indicator",count:100,clickable:!0,hasBackButton:!1,enableTooltip:!0,tooltipText:"This is the amount"}},a={args:{text:"Settings",type:"brand"}};var r,o,s;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    text: 'Label',
    type: 'default'
  }
}`,...(s=(o=t.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};var n,c,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    text: 'Tag Name',
    type: 'indicator',
    count: 100,
    clickable: true,
    hasBackButton: false,
    enableTooltip: true,
    tooltipText: 'This is the amount'
  }
}`,...(p=(c=e.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var i,l,m;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    text: 'Settings',
    type: 'brand'
  }
}`,...(m=(l=a.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};const B=["Default","Indicator","Brand"];export{a as Brand,t as Default,e as Indicator,B as __namedExportsOrder,h as default};
