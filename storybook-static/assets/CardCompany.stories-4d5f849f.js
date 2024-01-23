import{u as K}from"./Tag-c0d051ed.js";import{U as L}from"./Icon-6670ffc4.js";import{u as S,a as I}from"./DropdownItem-14e4d618.js";import{u as T}from"./ToolTip-7d326e2a.js";import{d as i,f as t,t as o,g,F as y,n as b,m as d,l,e as c,o as a,k as h,p as z,y as F,x as N}from"./vue.esm-bundler-fb65849e.js";import{_ as V}from"./_plugin-vue_export-helper-c27b6911.js";import"./index-913e4039.js";const A={components:{UnnnicTag:K,UnnnicIcon:L,UnnnicDropdown:S,UnnnicDropdownItem:I,ToolTip:T},props:{title:{type:String},tag:{type:String},description:{type:String},joinLabel:{type:String},options:{type:Array,default(){return[]}},members:{type:Array,default(){return[]}},membersDescription:{type:String}},data(){return{}},methods:{join(){this.$emit("join")},cutLength(p,s){const e=p.trim();return e.length>s?`${e.slice(0,s).trim()}...`:e}},computed:{membersLimited(){return this.members.slice(0,3)}}},W={class:"unnnic-card-company"},G={class:"content"},M={class:"header"},E=["title"],O={key:0,class:"tag"},U=["title"],H={class:"members"},Q={class:"avatars"},R={class:"avatar__background"},Y={class:"members-description"},Z={class:"join-button"},B={key:0,class:"more-button"};function J(p,s,e,P,X,m){const j=c("tool-tip"),w=c("unnnic-tag"),_=c("unnnic-icon"),D=c("unnnic-dropdown-item"),x=c("unnnic-dropdown");return a(),i("div",W,[t("div",G,[t("div",M,[t("div",{class:"title",title:e.title},o(m.cutLength(e.title,20)),9,E),e.tag?(a(),i("div",O,o(e.tag),1)):g("",!0)]),t("div",{class:"description",title:e.description},o(m.cutLength(e.description,36)),9,U),t("div",H,[t("div",Q,[(a(!0),i(y,null,b(m.membersLimited,(n,u)=>(a(),h(j,{key:u,class:"avatar-container",side:"top",text:n.name,enabled:""},{default:l(()=>[t("div",R,[t("div",{class:"avatar",style:z({backgroundImage:`url(${n.photo})`})},null,4)])],void 0),_:2},1032,["text"]))),128))]),t("div",Y,o(e.membersDescription),1)])]),t("div",Z,[d(w,{onClick:m.join,text:e.joinLabel,scheme:"aux-blue",clickable:""},null,8,["onClick","text"])]),e.options.length?(a(),i("div",B,[d(x,null,{trigger:l(()=>[d(_,{icon:"navigation-menu-vertical-1",scheme:"neutral-cleanest",size:"sm",clickable:""})]),default:l(()=>[(a(!0),i(y,null,b(e.options,(n,u)=>(a(),h(D,{key:u,onClick:()=>{n.click&&n.click()}},{default:l(()=>[t("div",{class:N(["menu-item",{[n.scheme]:n.scheme}])},[d(_,{class:"icon",size:"sm",icon:n.icon,scheme:n.scheme?n.scheme:"neutral-dark"},null,8,["icon","scheme"]),F(" "+o(n.title),1)],2)],void 0,!0),_:2},1032,["onClick"]))),128))],void 0),_:1})])):g("",!0)])}const C=V(A,[["render",J],["__scopeId","data-v-16c31a07"]]);A.__docgenInfo={exportName:"default",displayName:"CardCompany",description:"",tags:{},props:[{name:"title",type:{name:"string"}},{name:"tag",type:{name:"string"}},{name:"description",type:{name:"string"}},{name:"joinLabel",type:{name:"string"}},{name:"options",type:{name:"array"},defaultValue:{func:!1,value:"[]"}},{name:"members",type:{name:"array"},defaultValue:{func:!1,value:"[]"}},{name:"membersDescription",type:{name:"string"}}],events:[{name:"join"}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Card/CardCompany.vue"]};const oe={title:"Card/CardCompany",component:C,argTypes:{join:{action:"join"}}},q=(p,{argTypes:s})=>({props:Object.keys(s),components:{CardCompany:C},template:'<card-company v-bind="$props" @join="join"/>'}),r=q.bind({});r.args={title:"Weni",tag:"Gratuita",description:"Description",joinLabel:"Join",options:[{icon:"view-1-1",title:"View members",click(){console.log("view")}},{icon:"delete-1-1",title:"Delete organization",scheme:"feedback-red",click(){console.log("delete")}}],members:[{name:"Cristian",photo:"https://weni-sp-connect-staging.s3.amazonaws.com/media/user/avatars/av_ef64cdfa-26b9-4896-93ba-098c00724d88.jpg?AWSAccessKeyId=AKIATQ3M7WDGK6GLYL6V&Signature=ka1ANr0Z6MuiRHKkOFbz%2Fr6krA4%3D&Expires=1625729559"},{name:"Cristian",photo:"https://weni-sp-connect-staging.s3.amazonaws.com/media/user/avatars/av_ef64cdfa-26b9-4896-93ba-098c00724d88.jpg?AWSAccessKeyId=AKIATQ3M7WDGK6GLYL6V&Signature=ka1ANr0Z6MuiRHKkOFbz%2Fr6krA4%3D&Expires=1625729559"},{name:"Cristian",photo:"https://weni-sp-connect-staging.s3.amazonaws.com/media/user/avatars/av_ef64cdfa-26b9-4896-93ba-098c00724d88.jpg?AWSAccessKeyId=AKIATQ3M7WDGK6GLYL6V&Signature=ka1ANr0Z6MuiRHKkOFbz%2Fr6krA4%3D&Expires=1625729559"},{name:"Cristian",photo:"https://weni-sp-connect-staging.s3.amazonaws.com/media/user/avatars/av_ef64cdfa-26b9-4896-93ba-098c00724d88.jpg?AWSAccessKeyId=AKIATQ3M7WDGK6GLYL6V&Signature=ka1ANr0Z6MuiRHKkOFbz%2Fr6krA4%3D&Expires=1625729559"},{name:"Cristian",photo:"https://weni-sp-connect-staging.s3.amazonaws.com/media/user/avatars/av_ef64cdfa-26b9-4896-93ba-098c00724d88.jpg?AWSAccessKeyId=AKIATQ3M7WDGK6GLYL6V&Signature=ka1ANr0Z6MuiRHKkOFbz%2Fr6krA4%3D&Expires=1625729559"}],membersDescription:"+24 members"};var v,f,k;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    CardCompany
  },
  template: '<card-company v-bind="$props" @join="join"/>'
})`,...(k=(f=r.parameters)==null?void 0:f.docs)==null?void 0:k.source}}};const ce=["Normal"];export{r as Normal,ce as __namedExportsOrder,oe as default};
