import{b as r,F as u,j as g,A as i,o as t}from"./vue.esm-bundler-3f98aba2.js";import{_}from"./_plugin-vue_export-helper-c27b6911.js";const p={name:"Grid",props:{size:{type:String,default:"sm"}},computed:{gridClass(){return`unnnic-grid-${this.size}`},gridItemClass(){return"unnnic-grid-span-1"},gridNumber(){return this.size==="xs"||this.size==="sm"?4:this.size==="md"?6:(this.size==="lg"||this.size==="xl",12)}}};function f(l,n,y,z,v,s){return t(),r("div",{class:i([s.gridClass,"grid-example-container"])},[(t(!0),r(u,null,g(s.gridNumber,m=>(t(),r("div",{key:m,class:i([s.gridItemClass,"grid-example"])},null,2))),128))],2)}const c=_(p,[["render",f],["__scopeId","data-v-d741e086"]]);p.__docgenInfo={displayName:"Grid",exportName:"default",description:"",tags:{},props:[{name:"size",type:{name:"string"},defaultValue:{func:!1,value:"'sm'"}}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/grid/Grid.vue"]};const h={title:"Example/Grid",component:c,argTypes:{size:{control:{type:"select",options:["xs","sm","md","lg","xl","giant"]}}}},x=(l,{argTypes:n})=>({props:Object.keys(n),components:{Grid:c},template:'<grid v-bind="$props" />'}),e=x.bind({});e.args={size:"xs"};var a,o,d;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    Grid
  },
  template: '<grid v-bind="$props" />'
})`,...(d=(o=e.parameters)==null?void 0:o.docs)==null?void 0:d.source}}};const C=["grid"];export{C as __namedExportsOrder,h as default,e as grid};
//# sourceMappingURL=Grid.stories-dad2ecac.js.map
