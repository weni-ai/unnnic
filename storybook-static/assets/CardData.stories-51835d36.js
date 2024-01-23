import{U as f}from"./Icon-b41b8868.js";import{b as a,d as t,t as o,i as y,e as c,g,D as v,a as D,o as s}from"./vue.esm-bundler-3f98aba2.js";import{_ as h}from"./_plugin-vue_export-helper-c27b6911.js";const m={components:{unnnicIcon:f},props:{title:{type:String},description:{type:String},score:{type:String},info:{type:String},checked:{type:Boolean,default:!1}}},k={class:"card"},C={class:"header"},x={class:"title"},b={key:0,class:"check"},N={class:"description"},S={key:0,class:"footer"},T={class:"evaluation"},B={class:"info"};function I(u,r,e,E,O,U){const i=D("unnnic-icon");return s(),a("div",k,[t("div",C,[t("div",x,o(e.title),1),e.checked?(s(),a("div",b,[y(i,{size:"md",icon:"check-circle-1-1-1",scheme:"feedback-green"})])):c("",!0)]),t("div",N,o(e.description),1),e.score||e.info?(s(),a("div",S,[t("div",T,[e.score?(s(),g(i,{key:0,size:"sm",icon:"rating-star-1",scheme:"feedback-yellow"})):c("",!0),v(" "+o(e.score)+" ",1),t("span",B,o(e.info),1)])])):c("",!0)])}const _=h(m,[["render",I],["__scopeId","data-v-343d1510"]]);m.__docgenInfo={exportName:"default",displayName:"CardData",description:"",tags:{},props:[{name:"title",type:{name:"string"}},{name:"description",type:{name:"string"}},{name:"score",type:{name:"string"}},{name:"info",type:{name:"string"}},{name:"checked",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Card/CardData.vue"]};const w={title:"Card/CardData",component:_,argTypes:{title:{control:{type:"text"}},description:{control:{type:"text"}},score:{control:{type:"text"}},info:{control:{type:"text"}},checked:{control:{type:"boolean"}}}},V=(u,{argTypes:r})=>({props:Object.keys(r),components:{unnnicCardData:_},data(){return{}},template:`
    <div>
      <unnnic-card-data v-bind="$props"/>
    </div>
  `}),n=V.bind({});n.args={title:"Title Card",description:"Description Description Description Description Description Description Description Description.",score:"4.9",info:"(3 comments)",checked:!0};var d,p,l;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicCardData
  },
  data() {
    return {};
  },
  template: \`
    <div>
      <unnnic-card-data v-bind="$props"/>
    </div>
  \`
})`,...(l=(p=n.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};const W=["Default"];export{n as Default,W as __namedExportsOrder,w as default};
//# sourceMappingURL=CardData.stories-51835d36.js.map
