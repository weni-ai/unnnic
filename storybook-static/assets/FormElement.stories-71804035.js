import{b as s,A as f,t as o,e as r,f as p,o as a}from"./vue.esm-bundler-3f98aba2.js";import{_}from"./_plugin-vue_export-helper-c27b6911.js";const i={props:{size:{type:String,default:"md",validator:t=>["md","sm"].includes(t)},label:String,fixedLabel:Boolean,error:[Boolean,String],message:String},data(){return{}}},g={class:"unnnic-form-element"},y={key:1,class:"message unnnic-font secondary body-md color-feedback-red"},b={key:2,class:"message unnnic-font secondary body-md color-neutral-cloudy"};function v(t,m,e,F,x,k){return a(),s("div",g,[e.label?(a(),s("div",{key:0,class:f(["label unnnic-font secondary color-neutral-cloudy",{"body-md":e.size==="sm","body-gt":e.size=="md","label--fixed":e.fixedLabel}])},o(e.label),3)):r("",!0),p(t.$slots,"default",{},void 0,!0),e.error&&e.error!==!0?(a(),s("div",y,o(e.error),1)):r("",!0),e.message?(a(),s("div",b,o(e.message),1)):r("",!0)])}const u=_(i,[["render",v],["__scopeId","data-v-54c07f74"]]);i.__docgenInfo={exportName:"default",displayName:"FormElement",description:"",tags:{},props:[{name:"size",type:{name:"string"},defaultValue:{func:!1,value:"'md'"},values:["md","sm"]},{name:"label",type:{name:"string"}},{name:"fixedLabel",type:{name:"boolean"}},{name:"error",type:{name:"boolean|string"}},{name:"message",type:{name:"string"}}],slots:[{name:"default"}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/FormElement/FormElement.vue"]};const N={title:"Form/FormElement",component:u,argTypes:{size:{control:{type:"select",options:["sm","md"]}}}},E=(t,{argTypes:m})=>({props:Object.keys(m),components:{UnnnicFormElement:u},data(){return{}},template:`
    <unnnic-form-element v-bind="$props">
      <input />
    </unnnic-form-element>
  `}),n=E.bind({});n.args={label:"Name",error:"Error",message:"Message"};var l,c,d;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    UnnnicFormElement
  },
  data() {
    return {};
  },
  template: \`
    <unnnic-form-element v-bind="$props">
      <input />
    </unnnic-form-element>
  \`
})`,...(d=(c=n.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const h=["Default"];export{n as Default,h as __namedExportsOrder,N as default};
//# sourceMappingURL=FormElement.stories-71804035.js.map
