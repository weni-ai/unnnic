import{b as n,F as f,j as y,o as r,A as o,e as b,d as i,t as S}from"./vue.esm-bundler-afa73d68.js";import{_ as v}from"./_plugin-vue_export-helper-c27b6911.js";const l={name:"unnnic-indicator",props:{numberOfSteps:{type:Number,required:!0},titles:{type:Array,default:()=>[]},currentStep:{type:Number,default:0}},methods:{titleForStep(a){try{return this.titles[a-1]}catch{return null}}}},I={class:"weni-step-indicator"},g={class:"weni-step-indicator__label"};function w(a,s,c,h,x,m){return r(),n("div",I,[(r(!0),n(f,null,y(c.numberOfSteps,e=>(r(),n("div",{class:o({"weni-step-indicator__step__wrapper":!0,"weni-step-indicator--has-separator":e>1}),key:e},[e!==1?(r(),n("div",{key:0,class:o({"weni-step-indicator__step__separator":!0,"weni-step-indicator__step__separator--active":e<=c.currentStep})},null,2)):b("",!0),i("div",{class:o({"weni-step-indicator__step":!0,"weni-step-indicator__step--active":e<=c.currentStep})},[i("span",g,S(m.titleForStep(e)),1)],2)],2))),128))])}const _=v(l,[["render",w],["__scopeId","data-v-b6ca01f7"]]);l.__docgenInfo={displayName:"unnnic-indicator",exportName:"default",description:"",tags:{},props:[{name:"numberOfSteps",type:{name:"number"},required:!0},{name:"titles",type:{name:"array"},defaultValue:{func:!1,value:"[]"}},{name:"currentStep",type:{name:"number"},defaultValue:{func:!1,value:"0"}}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Indicator/Indicator.vue"]};const F={title:"Example/Indicator",component:_,argTypes:{numberOfSteps:{control:{type:"number"}},currentStep:{control:{type:"number"}}}},O=(a,{argTypes:s})=>({props:Object.keys(s),components:{unnnicIndicator:_},template:'<unnnic-indicator v-bind="$props"/>'}),t=O.bind({});t.args={numberOfSteps:3,currentStep:2,titles:["Indicator-1","Indicator-2","Indicator-3"]};var p,u,d;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicIndicator
  },
  template: '<unnnic-indicator v-bind="$props"/>'
})`,...(d=(u=t.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};const D=["Default"];export{t as Default,D as __namedExportsOrder,F as default};
//# sourceMappingURL=Indicator.stories-20dce72e.js.map
