import{U as D}from"./Icon-777631f3.js";import{a as T,o as l,b as c,d as e,t as s,F as S,j as V,i as R,A as B,g as x,K as A}from"./vue.esm-bundler-afa73d68.js";import{_}from"./_plugin-vue_export-helper-c27b6911.js";const m={name:"unnnic-banner",components:{UnnnicIconSvg:D},props:{firstTitle:{type:String,default:null},secondTitle:{type:String,default:null},thirdTitle:{type:String,default:null},firstDescription:{type:String,default:null},secondDescription:{type:String,default:null},thirdDescription:{type:String,default:null},subtitle:{type:String,default:null},rating:{type:Number,default:0}},data(){return{tempRating:null,baseRating:this.rating}},methods:{emitRatingAction(t){this.$emit("ratingAction",t)},starScheme(t){return t<=this.baseRating?"feedback-yellow":"neutral-clean"},starOver(t){this.tempRating=this.baseRating,this.baseRating=t},starOut(){this.baseRating=this.tempRating}}},I={class:"unnnic-banner-info"},N={class:"unnnic-banner-info__section"},C={class:"unnnic-banner-info__title"},k={class:"unnnic-banner-info__description"},F=e("div",{class:"unnnic-banner-info__divider"},null,-1),O={class:"unnnic-banner-info__section"},U={class:"unnnic-banner-info__title"},E={class:"unnnic-banner-info__description"},M={class:"unnnic-banner-info__subtitle"},w=e("div",{class:"unnnic-banner-info__divider"},null,-1),z={class:"unnnic-banner-info__section"},W={class:"unnnic-banner-info__title"},j={class:"unnnic-banner-info__description"},K={class:"unnnic-banner-info__rating"};function L(t,y,n,h,o,i){const v=T("unnnic-icon-svg");return l(),c("div",I,[e("section",N,[e("div",C,s(n.firstTitle),1),e("div",k,s(n.firstDescription),1)]),F,e("section",O,[e("div",U,s(n.secondTitle),1),e("div",E,s(n.secondDescription),1),e("div",M,s(n.subtitle),1)]),w,e("section",z,[e("div",W,s(n.thirdTitle),1),e("div",j,s(n.thirdDescription),1),e("div",K,[(l(),c(S,null,V(5,a=>R(v,{key:a,onClick:b=>i.emitRatingAction(a),onMouseover:b=>i.starOver(a),onMouseout:i.starOut,class:B({"unnnic-banner-info__rating__star":!0,"unnnic-banner-info__rating__star__active":a<=o.baseRating}),scheme:i.starScheme(a),icon:"rating-star-1",size:"ant"},null,8,["onClick","onMouseover","onMouseout","class","scheme"])),64))])])])}const u=_(m,[["render",L]]);m.__docgenInfo={displayName:"unnnic-banner",exportName:"default",description:"",tags:{},props:[{name:"firstTitle",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"secondTitle",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"thirdTitle",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"firstDescription",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"secondDescription",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"thirdDescription",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"subtitle",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"rating",type:{name:"number"},defaultValue:{func:!1,value:"0"}}],events:[{name:"ratingAction",type:{names:["undefined"]}}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Banner/InfoBanner.vue"]};const g={name:"unnnic-banner",props:{type:{type:String,default:"info",validator(t){return["info"].indexOf(t)!==-1}},firstTitle:{type:String,default:null},secondTitle:{type:String,default:null},thirdTitle:{type:String,default:null},firstDescription:{type:String,default:null},secondDescription:{type:String,default:null},thirdDescription:{type:String,default:null},subtitle:{type:String,default:null},rating:{type:Number,default:0}},computed:{currentComponent(){return this.type==="info",u}},methods:{emitRatingAction(t){this.$emit("ratingAction",t)}}};function q(t,y,n,h,o,i){return l(),x(A(i.currentComponent),{class:"unnnic-banner-component","v-bind":t.$attrs,firstTitle:n.firstTitle,secondTitle:n.secondTitle,thirdTitle:n.thirdTitle,firstDescription:n.firstDescription,secondDescription:n.secondDescription,thirdDescription:n.thirdDescription,subtitle:n.subtitle,rating:n.rating,onRatingAction:i.emitRatingAction},null,40,["v-bind","firstTitle","secondTitle","thirdTitle","firstDescription","secondDescription","thirdDescription","subtitle","rating","onRatingAction"])}const G=_(g,[["render",q]]);g.__docgenInfo={displayName:"unnnic-banner",exportName:"default",description:"",tags:{},props:[{name:"type",type:{name:"string"},defaultValue:{func:!1,value:"'info'"},values:["info"]},{name:"firstTitle",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"secondTitle",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"thirdTitle",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"firstDescription",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"secondDescription",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"thirdDescription",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"subtitle",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"rating",type:{name:"number"},defaultValue:{func:!1,value:"0"}}],events:[{name:"ratingAction",type:{names:["undefined"]}}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Banner/Banner.vue"]};const Q={title:"example/Banner",component:G,argTypes:{type:{control:{type:"select",options:["info"]}},firstTitle:{control:{type:"text"}},firstDescription:{control:{type:"text"}},secondTitle:{control:{type:"text"}},secondDescription:{control:{type:"text"}},thirdTitle:{control:{type:"text"}},thirdDescription:{control:{type:"text"}},subtitle:{control:{type:"text"}},rating:{control:{type:"number"}},onRatingAction:()=>window.alert(`star: ${star}`)}},r={args:{type:"info",firstTitle:"Title 1",firstDescription:"Description 1",secondTitle:"Title 2",secondDescription:"Description 2",thirdTitle:"Title 3",thirdDescription:"Description 3",subtitle:"Subtitle",rating:3}};var d,f,p;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    type: 'info',
    firstTitle: 'Title 1',
    firstDescription: 'Description 1',
    secondTitle: 'Title 2',
    secondDescription: 'Description 2',
    thirdTitle: 'Title 3',
    thirdDescription: 'Description 3',
    subtitle: 'Subtitle',
    rating: 3
  }
}`,...(p=(f=r.parameters)==null?void 0:f.docs)==null?void 0:p.source}}};const X=["Info"];export{r as Info,X as __namedExportsOrder,Q as default};
//# sourceMappingURL=Banner.stories-8bd1a4d3.js.map
