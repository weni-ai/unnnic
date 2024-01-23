import{u as I}from"./Tag-a10af6c6.js";import{U as V}from"./Icon-777631f3.js";import{a as m,o as u,b as i,d as t,i as d,B as p,C as _,F as N,j as T,g as S,K as L}from"./vue.esm-bundler-afa73d68.js";import{_ as h}from"./_plugin-vue_export-helper-c27b6911.js";import{i as P}from"./iconList-d1dd560b.js";import"./ToolTip-7f37fa70.js";const y={name:"unnnic-tag-carousel",data(){return{hasNext:!0,hasPrev:!1,slides:[]}},components:{UnnnicTag:I,UnnnicIconSvg:V},props:{modelValue:{type:Array,default(){return[]}},tagItems:{type:Array,default:()=>[]}},mounted(){this.slides=this.tagItems},methods:{save(e){let n=this.modelValue;this.checkIsInclude(e)?n=n.filter(a=>a!==e.id):n=[...n,e.id],this.$emit("selected",n)},checkIsInclude(e){return this.modelValue.some(n=>n===e.id)},next(){const e=document.querySelector("#scroll"),n=e.scrollWidth-e.clientWidth;e.scrollLeft+=200,n!==e.scrollLeft?(this.hasNext||(this.hasNext=!0),this.hasPrev=!0):this.hasNext=!1},previous(){const e=document.querySelector("#scroll");e.scrollLeft-=200,e.scrollLeft!==0?(this.hasPrev||(this.hasPrev=!0),this.hasNext=!0):this.hasPrev=!1}}},B={class:"unnnic-card-tag-carousel"},F={class:"unnnic-card-tag-carousel__button unnnic-card-tag-carousel__button--left"},U={class:"unnnic-card-tag-carousel__button__icon"},E={class:"unnnic-card-tag-carousel__button__blur unnnic-card-tag-carousel__button__blur--left"},w={class:"unnnic-card-tag-carousel__container",id:"scroll"},A={class:"unnnic-card-tag-carousel__button unnnic-card-tag-carousel__button--right"},D={class:"unnnic-card-tag-carousel__button__blur unnnic-card-tag-carousel__button__blur--right"},O={class:"unnnic-card-tag-carousel__button__icon"};function W(e,n,a,C,s,l){const o=m("unnnic-icon-svg"),x=m("unnnic-tag");return u(),i("div",B,[t("div",F,[t("div",U,[d(o,{icon:"arrow-left-1-1",size:"sm",onClick:n[0]||(n[0]=c=>l.previous()),scheme:s.hasPrev?"neutral-black":"neutral-cleanest",clickable:""},null,8,["scheme"])]),p(t("span",E,null,512),[[_,s.hasPrev]])]),t("div",w,[(u(!0),i(N,null,T(s.slides,c=>(u(),i("div",{key:c.id,class:"unnnic-card-tag-carousel__container__slide"},[d(x,{text:c.name,clickable:"",type:"brand",disabled:l.checkIsInclude(c),onClick:z=>l.save(c),class:"unnnic-card-tag-carousel__container__slide__item"},null,8,["text","disabled","onClick"])]))),128))]),t("div",A,[p(t("span",D,null,512),[[_,s.hasNext]]),t("div",O,[d(o,{icon:"arrow-right-1-1",onClick:n[1]||(n[1]=c=>l.next()),size:"sm",scheme:s.hasNext?"neutral-black":"neutral-cleanest",clickable:""},null,8,["scheme"])])])])}const $=h(y,[["render",W]]);y.__docgenInfo={displayName:"unnnic-tag-carousel",exportName:"default",description:"",tags:{},props:[{name:"modelValue",type:{name:"array"},defaultValue:{func:!1,value:"[]"}},{name:"tagItems",type:{name:"array"},defaultValue:{func:!1,value:"[]"}}],events:[{name:"selected",type:{names:["undefined"]}}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Carousel/TagCarousel.vue"]};const b={model:{event:"update:model-value"},name:"unnnic-carousel",props:{modelValue:{type:Array,default(){return[]}},type:{type:String,default:"brand",validator(e){return["brand"].indexOf(e)!==-1}},tagItems:{type:Array,default:()=>[]},name:{type:String,default:null},icon:{type:String,default:null},clickable:{type:Boolean,default:!1}},computed:{currentComponent(){return $}}};function j(e,n,a,C,s,l){return u(),S(L(l.currentComponent),{class:"unnnic-carousel-component","v-bind":e.$attrs,name:a.name,clickable:a.clickable,tagItems:a.tagItems,onSelected:n[0]||(n[0]=o=>e.$emit("update:model-value",o)),"model-value":a.modelValue},null,40,["v-bind","name","clickable","tagItems","model-value"])}const k=h(b,[["render",j]]);b.__docgenInfo={displayName:"unnnic-carousel",exportName:"default",description:"",tags:{},props:[{name:"modelValue",type:{name:"array"},defaultValue:{func:!1,value:"[]"}},{name:"type",type:{name:"string"},defaultValue:{func:!1,value:"'brand'"},values:["brand"]},{name:"tagItems",type:{name:"array"},defaultValue:{func:!1,value:"[]"}},{name:"name",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"icon",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"clickable",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"update:model-value"}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Carousel/Carousel.vue"]};const R={title:"Example/Carousel",component:k,argTypes:{type:{control:{type:"select"},options:["brand"]},icon:{control:{type:"select"},options:P}}},q=(e,{argTypes:n})=>({props:Object.keys(n),components:{unnnicCarousel:k},data(){return{selecteds:[1]}},template:'<div><pre>v-model: {{ selecteds }}</pre><unnnic-carousel v-bind="$props" v-model="selecteds" /></div>'}),r=q.bind({});r.args={type:"brand",tagItems:[{id:1,name:"tag - 1"},{id:2,name:"tag - 2"},{id:3,name:"tag - 3"},{id:4,name:"tag - 4"},{id:5,name:"tag - 5"},{id:6,name:"tag - 6"},{id:7,name:"tag - 7"},{id:8,name:"tag - 8"},{id:9,name:"tag - 9"}]};var f,g,v;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicCarousel
  },
  data() {
    return {
      selecteds: [1]
    };
  },
  template: '<div><pre>v-model: {{ selecteds }}</pre><unnnic-carousel v-bind="$props" v-model="selecteds" /></div>'
})`,...(v=(g=r.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};const X=["Tag"];export{r as Tag,X as __namedExportsOrder,R as default};
//# sourceMappingURL=Carousel.stories-9ccf2828.js.map
