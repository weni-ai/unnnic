import{U as z}from"./Icon-b41b8868.js";import{b as n,d as r,t as s,e as a,n as E,i as U,A as D,a as F,o as t}from"./vue.esm-bundler-3f98aba2.js";import{_ as w}from"./_plugin-vue_export-helper-c27b6911.js";const I={components:{UnnnicIcon:z},props:{value:{type:Number},type:{type:String,default:"primary"},title:{type:String},subtitle:{type:String},inline:{type:Boolean},canClose:{type:Boolean}},computed:{percentage(){return Math.floor(this.value)}}},A={class:"main"},M={key:0,class:"title"},W={class:"progress-bar-container"},q={class:"progress-container"},G={key:0,class:"percentage"},H={key:0,class:"percentage"},J={key:1,class:"footer"},K={class:"subtitle"},L={class:"percentage"},Q={key:0,class:"close"};function R(g,m,e,X,Y,u){const V=F("unnnic-icon");return t(),n("div",{class:D(["unnnic-progress-bar",e.type,{inline:e.inline,"has-subtitle":e.subtitle,"can-close":e.canClose}])},[r("div",A,[e.title&&!e.subtitle?(t(),n("div",M,s(e.title),1)):a("",!0),r("div",W,[r("div",q,[r("div",{class:"bar",style:E({width:`${e.value}%`})},[e.type==="secondary"&&!e.subtitle?(t(),n("div",G,s(u.percentage)+"% ",1)):a("",!0)],4)]),e.type==="primary"&&!e.subtitle?(t(),n("div",H,s(u.percentage)+"% ",1)):a("",!0)]),e.type==="primary"&&e.subtitle?(t(),n("div",J,[r("div",K,s(e.subtitle),1),r("div",L,s(u.percentage)+"% ",1)])):a("",!0)]),e.type==="primary"&&e.subtitle&&e.canClose?(t(),n("div",Q,[U(V,{icon:"close-1",scheme:"neutral-clean",size:"sm",clickable:"",onClick:m[0]||(m[0]=Z=>g.$emit("close"))})])):a("",!0)],2)}const x=w(I,[["render",R],["__scopeId","data-v-8396cc37"]]);I.__docgenInfo={exportName:"default",displayName:"ProgressBar",description:"",tags:{},props:[{name:"value",type:{name:"number"}},{name:"type",type:{name:"string"},defaultValue:{func:!1,value:"'primary'"}},{name:"title",type:{name:"string"}},{name:"subtitle",type:{name:"string"}},{name:"inline",type:{name:"boolean"}},{name:"canClose",type:{name:"boolean"}}],events:[{name:"close"}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/ProgressBar/ProgressBar.vue"]};const re={title:"Progress/ProgressBar",component:x,argTypes:{type:{control:{type:"select"},options:["primary","secondary"]}}},d=(g,{argTypes:m})=>({props:Object.keys(m),components:{unnnicProgressBar:x},data(){return{percentage:25}},template:`
    <div>
      <pre>v-model: {{ percentage }}</pre>
      <unnnic-progress-bar v-model="percentage" v-bind="$props">
      </unnnic-progress-bar>
    </div>
  `,methods:{}}),o=d.bind({});o.args={title:"Title name"};const c=d.bind({});c.args={title:"Title name",type:"secondary"};const i=d.bind({});i.args={title:"Title name",inline:!0};const p=d.bind({});p.args={title:"test",subtitle:"Subtitle or description"};const l=d.bind({});l.args={title:"test",subtitle:"Subtitle or description",canClose:!0};var y,b,v;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicProgressBar
  },
  data() {
    return {
      percentage: 25
    };
  },
  template: \`
    <div>
      <pre>v-model: {{ percentage }}</pre>
      <unnnic-progress-bar v-model="percentage" v-bind="$props">
      </unnnic-progress-bar>
    </div>
  \`,
  methods: {}
})`,...(v=(b=o.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var _,h,S;c.parameters={...c.parameters,docs:{...(_=c.parameters)==null?void 0:_.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicProgressBar
  },
  data() {
    return {
      percentage: 25
    };
  },
  template: \`
    <div>
      <pre>v-model: {{ percentage }}</pre>
      <unnnic-progress-bar v-model="percentage" v-bind="$props">
      </unnnic-progress-bar>
    </div>
  \`,
  methods: {}
})`,...(S=(h=c.parameters)==null?void 0:h.docs)==null?void 0:S.source}}};var B,f,k;i.parameters={...i.parameters,docs:{...(B=i.parameters)==null?void 0:B.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicProgressBar
  },
  data() {
    return {
      percentage: 25
    };
  },
  template: \`
    <div>
      <pre>v-model: {{ percentage }}</pre>
      <unnnic-progress-bar v-model="percentage" v-bind="$props">
      </unnnic-progress-bar>
    </div>
  \`,
  methods: {}
})`,...(k=(f=i.parameters)==null?void 0:f.docs)==null?void 0:k.source}}};var P,T,C;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicProgressBar
  },
  data() {
    return {
      percentage: 25
    };
  },
  template: \`
    <div>
      <pre>v-model: {{ percentage }}</pre>
      <unnnic-progress-bar v-model="percentage" v-bind="$props">
      </unnnic-progress-bar>
    </div>
  \`,
  methods: {}
})`,...(C=(T=p.parameters)==null?void 0:T.docs)==null?void 0:C.source}}};var N,O,j;l.parameters={...l.parameters,docs:{...(N=l.parameters)==null?void 0:N.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicProgressBar
  },
  data() {
    return {
      percentage: 25
    };
  },
  template: \`
    <div>
      <pre>v-model: {{ percentage }}</pre>
      <unnnic-progress-bar v-model="percentage" v-bind="$props">
      </unnnic-progress-bar>
    </div>
  \`,
  methods: {}
})`,...(j=(O=l.parameters)==null?void 0:O.docs)==null?void 0:j.source}}};const te=["Primary","Secondary","Inline","Subtitle","SubtitleCanClose"];export{i as Inline,o as Primary,c as Secondary,p as Subtitle,l as SubtitleCanClose,te as __namedExportsOrder,re as default};
//# sourceMappingURL=ProgressBar.stories-e90f5ca5.js.map
