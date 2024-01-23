import{u as r,a as i}from"./DropdownItem-0edd430d.js";import{u as m}from"./Button-5e6ad622.js";import"./index-39f25d77.js";import"./vue.esm-bundler-3f98aba2.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./Icon-b41b8868.js";const b={title:"example/Dropdown",component:r,argTypes:{position:{control:{type:"select",options:["top-left","top-right","bottom-left","bottom-right"]}}}},c=(d,{argTypes:p})=>({props:Object.keys(p),components:{unnnicDropdown:r,unnnicDropdownItem:i,unnnicButton:m},template:'<unnnic-dropdown v-bind="$props"> <template v-slot:trigger><unnnic-button text="click me"/></template> <unnnic-dropdown-item> Item1 </unnnic-dropdown-item> <unnnic-dropdown-item> Item2 </unnnic-dropdown-item> </unnnic-dropdown>'}),n=c.bind({});var o,t,e;n.parameters={...n.parameters,docs:{...(o=n.parameters)==null?void 0:o.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicDropdown,
    unnnicDropdownItem,
    unnnicButton
  },
  template: '<unnnic-dropdown v-bind="$props"> <template v-slot:trigger><unnnic-button text="click me"/></template> <unnnic-dropdown-item> Item1 </unnnic-dropdown-item> <unnnic-dropdown-item> Item2 </unnnic-dropdown-item> </unnnic-dropdown>'
})`,...(e=(t=n.parameters)==null?void 0:t.docs)==null?void 0:e.source}}};const y=["Normal"];export{n as Normal,y as __namedExportsOrder,b as default};
//# sourceMappingURL=Dropdown.stories-d09bb2f1.js.map
