import{U as f}from"./Icon-6670ffc4.js";import{d as c,f as t,t as o,m as y,g as a,k as g,y as v,e as h,o as s}from"./vue.esm-bundler-fb65849e.js";import{_ as D}from"./_plugin-vue_export-helper-c27b6911.js";const m={components:{unnnicIcon:f},props:{title:{type:String},description:{type:String},score:{type:String},info:{type:String},checked:{type:Boolean,default:!1}}},k={class:"card"},C={class:"header"},x={class:"title"},b={key:0,class:"check"},N={class:"description"},S={key:0,class:"footer"},T={class:"evaluation"},B={class:"info"};function I(u,r,e,E,O,U){const i=h("unnnic-icon");return s(),c("div",k,[t("div",C,[t("div",x,o(e.title),1),e.checked?(s(),c("div",b,[y(i,{size:"md",icon:"check-circle-1-1-1",scheme:"feedback-green"})])):a("",!0)]),t("div",N,o(e.description),1),e.score||e.info?(s(),c("div",S,[t("div",T,[e.score?(s(),g(i,{key:0,size:"sm",icon:"rating-star-1",scheme:"feedback-yellow"})):a("",!0),v(" "+o(e.score)+" ",1),t("span",B,o(e.info),1)])])):a("",!0)])}const _=D(m,[["render",I],["__scopeId","data-v-343d1510"]]);m.__docgenInfo={exportName:"default",displayName:"CardData",description:"",tags:{},props:[{name:"title",type:{name:"string"}},{name:"description",type:{name:"string"}},{name:"score",type:{name:"string"}},{name:"info",type:{name:"string"}},{name:"checked",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Card/CardData.vue"]};const w={title:"Card/CardData",component:_,argTypes:{title:{control:{type:"text"}},description:{control:{type:"text"}},score:{control:{type:"text"}},info:{control:{type:"text"}},checked:{control:{type:"boolean"}}}},V=(u,{argTypes:r})=>({props:Object.keys(r),components:{unnnicCardData:_},data(){return{}},template:`
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
