import{U as E}from"./i18n-5969dc29.js";import{u as w}from"./Button-c6487f3f.js";import{U as W}from"./AvatarIcon-333cb133.js";import{u as G}from"./ChatsUserAvatar-fb2a7c9e.js";import{U as K}from"./Breadcrumb-bd89db7e.js";import{d as m,f as s,m as _,k as d,g as c,x as h,t as g,j as M,e as p,o as t}from"./vue.esm-bundler-fb65849e.js";import{_ as P}from"./_plugin-vue_export-helper-c27b6911.js";import{u as Q}from"./ChatsDashboardTagLive-8bdd0992.js";import"./lodash-9252d092.js";import"./_commonjsHelpers-725317a4.js";import"./Icon-6670ffc4.js";const O={name:"UnnnicChatsHeader",mixins:[E],components:{UnnnicButton:w,UnnnicAvatarIcon:W,UnnnicChatsUserAvatar:G,UnnnicBreadcrumb:K},props:{title:{type:String,required:!0,default:""},subtitle:{type:String,default:""},sectionIconScheme:{type:String,default:"aux-purple"},avatarIcon:{type:String,default:""},avatarName:{type:String,default:""},back:{type:Function,required:!1},close:{type:Function,required:!1},avatarClick:{type:Function,required:!1},titleClick:{type:Function,required:!1},crumbs:{type:Array,default:()=>[]},size:{type:String,default:"auto",validator(n){return["auto","small","large"].includes(n)}}}},R={key:0,class:"unnnic-chats-header__topbar"},X={class:"unnnic-chats-header__main"},Y={class:"unnnic-chats-header__infos"},Z={class:"unnnic-chats-header__infos__title"},$={key:0},ee={class:"unnnic-chats-header__slot"};function ae(n,a,e,ce,re,ie){const L=p("unnnic-breadcrumb"),k=p("unnnic-button"),A=p("unnnic-chats-user-avatar"),J=p("unnnic-avatar-icon");return t(),m("div",{class:h(["unnnic-chats-header__container",[e.size]])},[s("header",{class:h(["unnnic-chats-header",{contact:!!e.avatarName}])},[e.avatarName?c("",!0):(t(),m("div",R,[_(L,{crumbs:e.crumbs,onCrumbClick:a[0]||(a[0]=u=>n.$emit("crumbClick",u))},null,8,["crumbs"]),e.close?(t(),d(k,{key:0,onClick:e.close,type:"tertiary",iconCenter:"close-1",size:"small"},null,8,["onClick"])):c("",!0)])),s("main",X,[e.back?(t(),d(k,{key:0,class:"unnnic-chats-header__main__back",type:"tertiary",size:"small",iconCenter:"keyboard-arrow-left-1",onClick:e.back},null,8,["onClick"])):c("",!0),s("section",Y,[e.avatarName?(t(),d(A,{key:0,clickable:!!e.avatarClick,username:e.avatarName,onClick:a[1]||(a[1]=u=>e.avatarClick?e.avatarClick():()=>{})},null,8,["clickable","username"])):(t(),m("div",{key:1,class:h({clickable:!!e.avatarClick}),onClick:a[2]||(a[2]=u=>e.avatarClick?e.avatarClick():()=>{})},[_(J,{scheme:e.sectionIconScheme,class:"unnnic-chats-header__avatar-icon",size:"sm",icon:e.avatarIcon},null,8,["scheme","icon"])],2)),s("hgroup",Z,[s("h1",{class:h({clickable:!!e.titleClick}),onClick:a[3]||(a[3]=u=>e.titleClick?e.titleClick():()=>{})},g(e.title),3),e.subtitle?(t(),m("h2",$,g(e.subtitle),1)):c("",!0)])]),s("div",ee,[M(n.$slots,"default")])]),e.close?(t(),d(k,{key:1,class:"unnnic-chats-header__close--sm",onClick:e.close,type:"tertiary",iconCenter:"close-1",size:"small"},null,8,["onClick"])):c("",!0)],2)],2)}const f=P(O,[["render",ae]]);O.__docgenInfo={exportName:"default",displayName:"UnnnicChatsHeader",description:"",tags:{},props:[{name:"locale",mixin:{name:"i18n",path:"..\\..\\mixins\\i18n.js"},type:{name:"string"}},{name:"translations",mixin:{name:"i18n",path:"..\\..\\mixins\\i18n.js"},type:{name:"object"}},{name:"title",type:{name:"string"},required:!0,defaultValue:{func:!1,value:"''"}},{name:"subtitle",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"sectionIconScheme",type:{name:"string"},defaultValue:{func:!1,value:"'aux-purple'"}},{name:"avatarIcon",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"avatarName",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"back",type:{name:"func"},required:!1},{name:"close",type:{name:"func"},required:!1},{name:"avatarClick",type:{name:"func"},required:!1},{name:"titleClick",type:{name:"func"},required:!1},{name:"crumbs",type:{name:"array"},defaultValue:{func:!1,value:"[]"}},{name:"size",type:{name:"string"},defaultValue:{func:!1,value:"'auto'"},values:["auto","small","large"]}],events:[{name:"crumbClick"}],slots:[{name:"default"}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/ChatsHeader/ChatsHeader.vue","C:\\Users\\anacl\\Documents\\WENI\\Front\\unnnic\\src\\mixins\\i18n.js"]};const ye={title:"Chats/Header",component:f},y=(n,{argTypes:a})=>({props:Object.keys(a),components:{unnnicChatsHeader:f},template:'<unnnic-chats-header v-bind="$props" @crumbClick="crumbClick"/>'}),ne=(n,{argTypes:a})=>({props:Object.keys(a),components:{unnnicChatsHeader:f,unnnicChatsDashboardTagLive:Q},template:`<unnnic-chats-header v-bind="$props" @crumbClick="crumbClick">
      <unnnic-chats-dashboard-tag-live />
    </unnnic-chats-header>`}),te=()=>alert("back"),se=()=>alert("close"),B=()=>alert("titleClick"),F=()=>alert("avatarClick"),v=n=>alert(JSON.stringify(n)),b=window.innerWidth<600?"small":"large",C={back:te,close:se,titleClick:B,avatarClick:F,crumbClick:v},r=y.bind({});r.args={...C,title:"John Doe",titleClick:B,avatarName:"John Doe",avatarClick:F};const i=y.bind({});i.args={...C,title:"Contact information",subtitle:"John Doe",avatarName:"John Doe"};const o=ne.bind({});o.args={...C,title:b==="large"?"Lorem Ipsum Inc.":"Dashboard",subtitle:b==="large"?"Dashboard of project":"Lorem Ipsum Inc.",avatarIcon:"graph-stats-1",crumbClick:v,crumbs:[{name:"Chats",path:"chats"},{name:"Dashboard",path:"dashboard"}]};const l=y.bind({});l.args={...C,title:b==="large"?"Lorem Ipsum Inc.":"History",subtitle:b==="large"?"History of project":"Lorem Ipsum Inc.",avatarIcon:"task-list-clock-1",crumbClick:v,crumbs:[{name:"Chats",path:"chats"},{name:"History",path:"history"}]};var I,H,N;r.parameters={...r.parameters,docs:{...(I=r.parameters)==null?void 0:I.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicChatsHeader
  },
  template: '<unnnic-chats-header v-bind="$props" @crumbClick="crumbClick"/>'
})`,...(N=(H=r.parameters)==null?void 0:H.docs)==null?void 0:N.source}}};var S,D,U;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicChatsHeader
  },
  template: '<unnnic-chats-header v-bind="$props" @crumbClick="crumbClick"/>'
})`,...(U=(D=i.parameters)==null?void 0:D.docs)==null?void 0:U.source}}};var j,x,T;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicChatsHeader,
    unnnicChatsDashboardTagLive
  },
  template: \`<unnnic-chats-header v-bind="$props" @crumbClick="crumbClick">
      <unnnic-chats-dashboard-tag-live />
    </unnnic-chats-header>\`
})`,...(T=(x=o.parameters)==null?void 0:x.docs)==null?void 0:T.source}}};var q,V,z;l.parameters={...l.parameters,docs:{...(q=l.parameters)==null?void 0:q.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicChatsHeader
  },
  template: '<unnnic-chats-header v-bind="$props" @crumbClick="crumbClick"/>'
})`,...(z=(V=l.parameters)==null?void 0:V.docs)==null?void 0:z.source}}};const ve=["Contact","ContactInfos","Dashboard","History"];export{r as Contact,i as ContactInfos,o as Dashboard,l as History,ve as __namedExportsOrder,ye as default};
