import{U as m,i as d}from"./Icon-777631f3.js";import{b as _,i as y,H as g,I as f,a as I,o as b}from"./vue.esm-bundler-afa73d68.js";import{_ as v}from"./_plugin-vue_export-helper-c27b6911.js";const a={components:{UnnnicIcon:m},props:{type:{type:String,default:"secondary"},size:{type:String,required:!0,validator(n){return["small","large"].includes(n)}},icon:{type:String,required:!0}},computed:{iconScheme(){return this.type==="primary"?"neutral-snow":"neutral-darkest"}}};function B(n,o,t,k,z,u){const l=I("unnnic-icon");return b(),_("button",g({class:["button-icon",t.size,t.type]},f(n.$listeners,!0)),[y(l,{icon:t.icon,scheme:u.iconScheme,size:"ant"},null,8,["icon","scheme"])],16)}const i=v(a,[["render",B],["__scopeId","data-v-5e2c8e10"]]);a.__docgenInfo={exportName:"default",displayName:"ButtonIcon",description:"",tags:{},props:[{name:"type",type:{name:"string"},defaultValue:{func:!1,value:"'secondary'"}},{name:"size",type:{name:"string"},required:!0,values:["small","large"]},{name:"icon",type:{name:"string"},required:!0}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Button/ButtonIcon.vue"]};const p=Object.keys(d),O={title:"Form/ButtonIcon",component:i,argTypes:{size:{control:{type:"select",options:["small","large"]}},icon:{control:{type:"select",options:p}}}},h=(n,{argTypes:o})=>({props:Object.keys(o),components:{unnnicButtonIcon:i},template:`
    <unnnic-button-icon v-bind="$props" />
  `}),e=h.bind({});e.args={size:"small",icon:p[0]};var s,r,c;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicButtonIcon
  },
  template: \`
    <unnnic-button-icon v-bind="$props" />
  \`
})`,...(c=(r=e.parameters)==null?void 0:r.docs)==null?void 0:c.source}}};const q=["Normal"];export{e as Normal,q as __namedExportsOrder,O as default};
//# sourceMappingURL=ButtonIcon.stories-cbaaf3d0.js.map
