import{U as _}from"./Icon-6670ffc4.js";import{d as t,F as g,n as v,f as y,t as h,y as f,g as S,e as b,o as a,m as R}from"./vue.esm-bundler-fb65849e.js";import{_ as x}from"./_plugin-vue_export-helper-c27b6911.js";const l={components:{UnnnicIcon:_},props:{value:{type:Number},showValue:{type:Boolean},readonly:{type:Boolean}},data(){return{}},methods:{starScheme(n){return n<=this.value?"feedback-yellow":"neutral-clean"}}},N={class:"unnnic-star-rating"},V={key:0,class:"rating-title"},k={class:"highlight"};function w(n,s,r,F,T,u){const d=b("unnnic-icon");return a(),t("div",N,[(a(),t(g,null,v(5,o=>R(d,{key:o,scheme:u.starScheme(o),icon:"rating-star-1",size:"ant"},null,8,["scheme"])),64)),r.showValue?(a(),t("div",V,[y("span",k,h(r.value.toFixed(1)),1),f("/5.0 ")])):S("",!0)])}const m=x(l,[["render",w],["__scopeId","data-v-0969762f"]]);l.__docgenInfo={exportName:"default",displayName:"StarRating",description:"",tags:{},props:[{name:"value",type:{name:"number"}},{name:"showValue",type:{name:"boolean"}},{name:"readonly",type:{name:"boolean"}}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/StarRating/StarRating.vue"]};const E={title:"Rating/StarRating",component:m,argTypes:{value:{control:{type:"number",min:0,max:5,step:.1}}}},B=(n,{argTypes:s})=>({props:Object.keys(s),components:{unnnicStarRating:m},template:`
    <div>
      <pre>v-model: {{ value }}</pre>
      <unnnic-star-rating v-bind="$props">
      </unnnic-star-rating>
    </div>
  `,methods:{}}),e=B.bind({});e.args={value:3.6,showValue:!0,readonly:!0};var c,i,p;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicStarRating
  },
  template: \`
    <div>
      <pre>v-model: {{ value }}</pre>
      <unnnic-star-rating v-bind="$props">
      </unnnic-star-rating>
    </div>
  \`,
  methods: {}
})`,...(p=(i=e.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};const O=["Default"];export{e as Default,O as __namedExportsOrder,E as default};
