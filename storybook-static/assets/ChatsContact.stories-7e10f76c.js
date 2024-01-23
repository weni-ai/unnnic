import{u as te}from"./ChatsUserAvatar-fb2a7c9e.js";import{U as ae}from"./Icon-6670ffc4.js";import{u as oe}from"./TransitionRipple-c47e6200.js";import{U as ie}from"./i18n-5969dc29.js";import{u as ce}from"./Checkbox-51ba265d.js";import{d as c,m as T,k as x,f as C,x as v,t as b,g as M,K as re,e as h,o as a}from"./vue.esm-bundler-fb65849e.js";import{_ as le}from"./_plugin-vue_export-helper-c27b6911.js";import{i as ue}from"./i18n-60857e98.js";import{s as de}from"./chunk-UXHY756F-1f94a4e4.js";import"./lodash-9252d092.js";import"./_commonjsHelpers-725317a4.js";const X={name:"ChatsContact",mixins:[ie],components:{UserAvatar:te,UnnnicIcon:ae,TransitionRipple:oe,Checkbox:ce},props:{title:{type:String,default:"",required:!0},lastMessage:{type:String,default:""},userPhoto:{type:String,default:""},waitingTime:{type:Number,default:0},unreadMessages:{type:Number,default:0},selected:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},checkboxWhenSelect:{type:Boolean,default:!1},discussionGoal:{type:String,default:""}},data(){return{isHovered:!1,defaultTranslations:{waiting_for:{"pt-br":"Aguardando há 1 minuto | Aguardando há {waitingTime} minutos",en:"1 minute waiting | {waitingTime} minutes waiting",es:"Esperando por un minuto | Esperando por {waitingTime} minutos"},unread_messages:{"pt-br":"{unreadMessages} mensagens não lidas",en:"{unreadMessages} unread messages",es:"{unreadMessages} mensajes no leídos"},discussion_about:{"pt-br":"Discussão sobre {discussionGoal}",en:"Discussion about {discussionGoal}",es:"Discusión sobre {discussionGoal}"}}}},computed:{subtitle(){const{discussionGoal:s,lastMessage:n}=this;return s?this.i18n("discussion_about",s,{discussionGoal:s}):n}}},me={key:0,class:"chats-contact__discussion-icon"},pe={class:"chats-contact__infos"},ge=["title"],fe={key:0,class:"ellipsis"},be=["title"],he=["title"];function ye(s,n,e,Ce,y,_){const $=h("unnnic-icon"),ee=h("user-avatar"),ne=h("checkbox"),se=h("transition-ripple");return a(),c("div",{class:v(["chats-contact",{selected:e.selected,disabled:e.disabled,"unread-messages":e.unreadMessages,waiting:e.waitingTime&&!e.discussionGoal}]),ref:"transitionContainer",onClick:n[0]||(n[0]=i=>s.$emit("click")),onKeypress:n[1]||(n[1]=re(i=>s.$emit("click"),["enter"])),onMouseenter:n[2]||(n[2]=i=>y.isHovered=!0),onMouseleave:n[3]||(n[3]=i=>y.isHovered=!1),onMousedown:n[4]||(n[4]=i=>{this.$refs.transitionRipple.addRipple(i)}),tabindex:0},[e.discussionGoal?(a(),c("div",me,[T($,{icon:"forum",scheme:"weni-50"})])):(a(),x(ee,{key:1,username:e.title,"photo-url":e.userPhoto,active:y.isHovered||e.selected},null,8,["username","photo-url","active"])),C("div",pe,[C("h1",{class:v(["chats-contact__infos__title ellipsis",{bold:e.unreadMessages}]),title:e.title},b(e.title),11,ge),C("div",{class:v(["chats-contact__infos__additional-information",{bold:e.unreadMessages||e.checkboxWhenSelect&&e.selected}])},[e.waitingTime!==0&&!e.discussionGoal?(a(),c("p",fe,b(s.i18n("waiting_for",e.waitingTime,{waitingTime:e.waitingTime})),1)):_.subtitle?(a(),c("p",{key:1,class:"ellipsis",title:_.subtitle},b(_.subtitle),9,be)):M("",!0)],2)]),!e.selected&&e.unreadMessages?(a(),c("span",{key:2,class:"chats-contact__infos__unread-messages",title:s.i18n("unread_messages",e.unreadMessages,{unreadMessages:e.unreadMessages})},b(e.unreadMessages),9,he)):e.selected&&e.checkboxWhenSelect?(a(),x(ne,{key:3,class:"chats-contact__infos__checkbox",modelValue:!0})):M("",!0),T(se,{ref:"transitionRipple",color:"weni-500"},null,512)],34)}const k=le(X,[["render",ye],["__scopeId","data-v-606cf27f"]]);X.__docgenInfo={exportName:"default",displayName:"ChatsContact",description:"",tags:{},props:[{name:"locale",mixin:{name:"i18n",path:"..\\..\\mixins\\i18n.js"},type:{name:"string"}},{name:"translations",mixin:{name:"i18n",path:"..\\..\\mixins\\i18n.js"},type:{name:"object"}},{name:"title",type:{name:"string"},required:!0,defaultValue:{func:!1,value:"''"}},{name:"lastMessage",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"userPhoto",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"waitingTime",type:{name:"number"},defaultValue:{func:!1,value:"0"}},{name:"unreadMessages",type:{name:"number"},defaultValue:{func:!1,value:"0"}},{name:"selected",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"checkboxWhenSelect",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"discussionGoal",type:{name:"string"},defaultValue:{func:!1,value:"''"}}],events:[{name:"click"}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/ChatsContact/ChatsContact.vue","C:\\Users\\anacl\\Documents\\WENI\\Front\\unnnic\\src\\mixins\\i18n.js"]};de(s=>{s.use(ue)});const Oe={title:"Chats/Contact",component:k},o=(s,{argTypes:n})=>({props:Object.keys(n),components:{unnnicChatsContact:k},template:'<unnnic-chats-contact v-bind="$props"/>'}),_e=(s,{argTypes:n})=>({props:Object.keys(n),components:{unnnicChatsContact:k},data(){return{selectedContact:1}},template:`
    <div style="display: grid; gap: 5px;">
      <unnnic-chats-contact v-for="index in 5" v-bind="$props" @click="selectedContact = index" :selected="selectedContact === index"/>
    </div>
  `}),t={title:"John Doe",lastMessage:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel."},Y=5,Z=10,r=o.bind({});r.args={...t,unreadMessages:Y};const l=o.bind({});l.args={...t,selected:!0};const u=o.bind({});u.args={...t,selected:!0,checkboxWhenSelect:!0};const d=o.bind({});d.args={...t};const m=o.bind({});m.args={...t,waitingTime:Z,unreadMessages:Y};const p=o.bind({});p.args={...t,waitingTime:Z};const g=o.bind({});g.args={...t,title:"Lorem ipsum dolor sit amet",discussionGoal:"John Doe"};const f=_e.bind({});f.args={...t};var S,w,j;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicChatsContact
  },
  template: '<unnnic-chats-contact v-bind="$props"/>'
})`,...(j=(w=r.parameters)==null?void 0:w.docs)==null?void 0:j.source}}};var V,W,D;l.parameters={...l.parameters,docs:{...(V=l.parameters)==null?void 0:V.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicChatsContact
  },
  template: '<unnnic-chats-contact v-bind="$props"/>'
})`,...(D=(W=l.parameters)==null?void 0:W.docs)==null?void 0:D.source}}};var O,G,N;u.parameters={...u.parameters,docs:{...(O=u.parameters)==null?void 0:O.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicChatsContact
  },
  template: '<unnnic-chats-contact v-bind="$props"/>'
})`,...(N=(G=u.parameters)==null?void 0:G.docs)==null?void 0:N.source}}};var R,U,B;d.parameters={...d.parameters,docs:{...(R=d.parameters)==null?void 0:R.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicChatsContact
  },
  template: '<unnnic-chats-contact v-bind="$props"/>'
})`,...(B=(U=d.parameters)==null?void 0:U.docs)==null?void 0:B.source}}};var E,I,A;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicChatsContact
  },
  template: '<unnnic-chats-contact v-bind="$props"/>'
})`,...(A=(I=m.parameters)==null?void 0:I.docs)==null?void 0:A.source}}};var L,H,F;p.parameters={...p.parameters,docs:{...(L=p.parameters)==null?void 0:L.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicChatsContact
  },
  template: '<unnnic-chats-contact v-bind="$props"/>'
})`,...(F=(H=p.parameters)==null?void 0:H.docs)==null?void 0:F.source}}};var K,P,q;g.parameters={...g.parameters,docs:{...(K=g.parameters)==null?void 0:K.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicChatsContact
  },
  template: '<unnnic-chats-contact v-bind="$props"/>'
})`,...(q=(P=g.parameters)==null?void 0:P.docs)==null?void 0:q.source}}};var J,z,Q;f.parameters={...f.parameters,docs:{...(J=f.parameters)==null?void 0:J.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicChatsContact
  },
  data() {
    return {
      selectedContact: 1
    };
  },
  template: \`
    <div style="display: grid; gap: 5px;">
      <unnnic-chats-contact v-for="index in 5" v-bind="$props" @click="selectedContact = index" :selected="selectedContact === index"/>
    </div>
  \`
})`,...(Q=(z=f.parameters)==null?void 0:z.docs)==null?void 0:Q.source}}};const Ge=["Default","Selected","SelectedWithCheckbox","Read","Waiting","WaitingRead","Discussion","ContactList"];export{f as ContactList,r as Default,g as Discussion,d as Read,l as Selected,u as SelectedWithCheckbox,m as Waiting,p as WaitingRead,Ge as __namedExportsOrder,Oe as default};
