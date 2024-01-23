import{u as te}from"./ChatsUserAvatar-2a4da947.js";import{U as ae}from"./Icon-b41b8868.js";import{u as oe}from"./TransitionRipple-1566059b.js";import{U as ie}from"./i18n-896e07dd.js";import{u as ce}from"./Checkbox-5e7d0d69.js";import{b as c,i as T,g as x,d as C,A as v,t as b,e as M,H as re,a as h,o as a}from"./vue.esm-bundler-3f98aba2.js";import{_ as le}from"./_plugin-vue_export-helper-c27b6911.js";import{i as ue}from"./i18n-3548bec6.js";import{s as de}from"./chunk-2GDW2BFM-a230f71a.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-57e9b485.js";import"../sb-preview/runtime.js";const X={name:"ChatsContact",mixins:[ie],components:{UserAvatar:te,UnnnicIcon:ae,TransitionRipple:oe,Checkbox:ce},props:{title:{type:String,default:"",required:!0},lastMessage:{type:String,default:""},userPhoto:{type:String,default:""},waitingTime:{type:Number,default:0},unreadMessages:{type:Number,default:0},selected:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},checkboxWhenSelect:{type:Boolean,default:!1},discussionGoal:{type:String,default:""}},data(){return{isHovered:!1,defaultTranslations:{waiting_for:{"pt-br":"Aguardando há 1 minuto | Aguardando há {waitingTime} minutos",en:"1 minute waiting | {waitingTime} minutes waiting",es:"Esperando por un minuto | Esperando por {waitingTime} minutos"},unread_messages:{"pt-br":"{unreadMessages} mensagens não lidas",en:"{unreadMessages} unread messages",es:"{unreadMessages} mensajes no leídos"},discussion_about:{"pt-br":"Discussão sobre {discussionGoal}",en:"Discussion about {discussionGoal}",es:"Discusión sobre {discussionGoal}"}}}},computed:{subtitle(){const{discussionGoal:s,lastMessage:n}=this;return s?this.i18n("discussion_about",s,{discussionGoal:s}):n}}},me={key:0,class:"chats-contact__discussion-icon"},pe={class:"chats-contact__infos"},ge=["title"],fe={key:0,class:"ellipsis"},be=["title"],he=["title"];function ye(s,n,e,Ce,y,_){const $=h("unnnic-icon"),ee=h("user-avatar"),ne=h("checkbox"),se=h("transition-ripple");return a(),c("div",{class:v(["chats-contact",{selected:e.selected,disabled:e.disabled,"unread-messages":e.unreadMessages,waiting:e.waitingTime&&!e.discussionGoal}]),ref:"transitionContainer",onClick:n[0]||(n[0]=i=>s.$emit("click")),onKeypress:n[1]||(n[1]=re(i=>s.$emit("click"),["enter"])),onMouseenter:n[2]||(n[2]=i=>y.isHovered=!0),onMouseleave:n[3]||(n[3]=i=>y.isHovered=!1),onMousedown:n[4]||(n[4]=i=>{this.$refs.transitionRipple.addRipple(i)}),tabindex:0},[e.discussionGoal?(a(),c("div",me,[T($,{icon:"forum",scheme:"weni-50"})])):(a(),x(ee,{key:1,username:e.title,"photo-url":e.userPhoto,active:y.isHovered||e.selected},null,8,["username","photo-url","active"])),C("div",pe,[C("h1",{class:v(["chats-contact__infos__title ellipsis",{bold:e.unreadMessages}]),title:e.title},b(e.title),11,ge),C("div",{class:v(["chats-contact__infos__additional-information",{bold:e.unreadMessages||e.checkboxWhenSelect&&e.selected}])},[e.waitingTime!==0&&!e.discussionGoal?(a(),c("p",fe,b(s.i18n("waiting_for",e.waitingTime,{waitingTime:e.waitingTime})),1)):_.subtitle?(a(),c("p",{key:1,class:"ellipsis",title:_.subtitle},b(_.subtitle),9,be)):M("",!0)],2)]),!e.selected&&e.unreadMessages?(a(),c("span",{key:2,class:"chats-contact__infos__unread-messages",title:s.i18n("unread_messages",e.unreadMessages,{unreadMessages:e.unreadMessages})},b(e.unreadMessages),9,he)):e.selected&&e.checkboxWhenSelect?(a(),x(ne,{key:3,class:"chats-contact__infos__checkbox",modelValue:!0})):M("",!0),T(se,{ref:"transitionRipple",color:"weni-500"},null,512)],34)}const k=le(X,[["render",ye],["__scopeId","data-v-606cf27f"]]);X.__docgenInfo={exportName:"default",displayName:"ChatsContact",description:"",tags:{},props:[{name:"locale",mixin:{name:"i18n",path:"..\\..\\mixins\\i18n.js"},type:{name:"string"}},{name:"translations",mixin:{name:"i18n",path:"..\\..\\mixins\\i18n.js"},type:{name:"object"}},{name:"title",type:{name:"string"},required:!0,defaultValue:{func:!1,value:"''"}},{name:"lastMessage",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"userPhoto",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"waitingTime",type:{name:"number"},defaultValue:{func:!1,value:"0"}},{name:"unreadMessages",type:{name:"number"},defaultValue:{func:!1,value:"0"}},{name:"selected",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"checkboxWhenSelect",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"discussionGoal",type:{name:"string"},defaultValue:{func:!1,value:"''"}}],events:[{name:"click"}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/ChatsContact/ChatsContact.vue","C:\\Users\\anacl\\Documents\\WENI\\Front\\unnnic\\src\\mixins\\i18n.js"]};de(s=>{s.use(ue)});const Ge={title:"Chats/Contact",component:k},o=(s,{argTypes:n})=>({props:Object.keys(n),components:{unnnicChatsContact:k},template:'<unnnic-chats-contact v-bind="$props"/>'}),_e=(s,{argTypes:n})=>({props:Object.keys(n),components:{unnnicChatsContact:k},data(){return{selectedContact:1}},template:`
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
})`,...(B=(U=d.parameters)==null?void 0:U.docs)==null?void 0:B.source}}};var A,E,I;m.parameters={...m.parameters,docs:{...(A=m.parameters)==null?void 0:A.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicChatsContact
  },
  template: '<unnnic-chats-contact v-bind="$props"/>'
})`,...(I=(E=m.parameters)==null?void 0:E.docs)==null?void 0:I.source}}};var H,L,F;p.parameters={...p.parameters,docs:{...(H=p.parameters)==null?void 0:H.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicChatsContact
  },
  template: '<unnnic-chats-contact v-bind="$props"/>'
})`,...(F=(L=p.parameters)==null?void 0:L.docs)==null?void 0:F.source}}};var P,q,J;g.parameters={...g.parameters,docs:{...(P=g.parameters)==null?void 0:P.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicChatsContact
  },
  template: '<unnnic-chats-contact v-bind="$props"/>'
})`,...(J=(q=g.parameters)==null?void 0:q.docs)==null?void 0:J.source}}};var K,z,Q;f.parameters={...f.parameters,docs:{...(K=f.parameters)==null?void 0:K.docs,source:{originalSource:`(args, {
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
})`,...(Q=(z=f.parameters)==null?void 0:z.docs)==null?void 0:Q.source}}};const Ne=["Default","Selected","SelectedWithCheckbox","Read","Waiting","WaitingRead","Discussion","ContactList"];export{f as ContactList,r as Default,g as Discussion,d as Read,l as Selected,u as SelectedWithCheckbox,m as Waiting,p as WaitingRead,Ne as __namedExportsOrder,Ge as default};
//# sourceMappingURL=ChatsContact.stories-6842f82d.js.map
