import{d as r,F as u,n as g,x as i,o as n}from"./vue.esm-bundler-fb65849e.js";import{_}from"./_plugin-vue_export-helper-c27b6911.js";const p={name:"Grid",props:{size:{type:String,default:"sm"}},computed:{gridClass(){return`unnnic-grid-${this.size}`},gridItemClass(){return"unnnic-grid-span-1"},gridNumber(){return this.size==="xs"||this.size==="sm"?4:this.size==="md"?6:(this.size==="lg"||this.size==="xl",12)}}};function f(l,t,y,z,v,s){return n(),r("div",{class:i([s.gridClass,"grid-example-container"])},[(n(!0),r(u,null,g(s.gridNumber,m=>(n(),r("div",{key:m,class:i([s.gridItemClass,"grid-example"])},null,2))),128))],2)}const c=_(p,[["render",f],["__scopeId","data-v-d741e086"]]);p.__docgenInfo={displayName:"Grid",exportName:"default",description:"",tags:{},props:[{name:"size",type:{name:"string"},defaultValue:{func:!1,value:"'sm'"}}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/grid/Grid.vue"]};const h={title:"Example/Grid",component:c,argTypes:{size:{control:{type:"select",options:["xs","sm","md","lg","xl","giant"]}}}},x=(l,{argTypes:t})=>({props:Object.keys(t),components:{Grid:c},template:'<grid v-bind="$props" />'}),e=x.bind({});e.args={size:"xs"};var a,d,o;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    Grid
  },
  template: '<grid v-bind="$props" />'
})`,...(o=(d=e.parameters)==null?void 0:d.docs)==null?void 0:o.source}}};const C=["grid"];export{C as __namedExportsOrder,h as default,e as grid};
