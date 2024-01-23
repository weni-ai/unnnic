import{u as ae}from"./IconLoading-d056e37a.js";import{U as ie}from"./Icon-777631f3.js";import{a as g,o as i,b as p,d as q,g as o,A as C,t as D,e as M,f as me}from"./vue.esm-bundler-afa73d68.js";import{_ as I}from"./_plugin-vue_export-helper-c27b6911.js";import{u as de,A as pe}from"./audio-recorder-sample-cd125c22.js";import"./ToolTip-7f37fa70.js";const te={name:"UnnnicChatsMessageStatusBackdrop",components:{UnnnicIconLoading:ae,UnnnicIcon:ie},props:{status:{type:String,required:!0,default:"sending",validate(e){return["sending","failed"].includes(e)}}}},le={class:"unnnic-chats-message-status-backdrop"};function ge(e,s,a,r,t,n){const u=g("unnnic-icon-loading"),c=g("unnnic-icon");return i(),p("div",{class:"unnnic-chats-message-status-backdrop__container",onClick:s[0]||(s[0]=h=>e.$emit("click"))},[q("div",le,[a.status==="sending"?(i(),o(u,{key:0,scheme:"neutral-white",size:"avatar-sm"})):(i(),o(c,{key:1,icon:"upload",scheme:"neutral-white",size:"avatar-sm",class:C({loading:a.status==="sending"})},null,8,["class"]))])])}const he=I(te,[["render",ge]]);te.__docgenInfo={displayName:"UnnnicChatsMessageStatusBackdrop",exportName:"default",description:"",tags:{},props:[{name:"status",type:{name:"string"},required:!0,defaultValue:{func:!1,value:"'sending'"}}],events:[{name:"click"}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/ChatsMessage/ChatsMessageStatusBackdrop.vue"]};const ce={name:"ChatsMessageText",props:{text:{type:String,required:!0}},computed:{formattedText(){var r;function e(t){const n=/(https?:\/\/[^\s]+)/g;return t.replace(n,'<a href="$1" target="_blank">$1</a>')}function s(t){return t.replace(/<(\/)?([^> ]+)( [^>]+)?>/gi,(n,u="",c,h="")=>{if(["b","i","u","ul","li","br","div"].includes(c)){const v=[];for(const d of h.matchAll(/((?<name1>[^ =]+)="(?<value1>[^"]*)"|(?<name2>[^ =]+)='(?<value2>[^"]*)')/g)){const ue=d.groups.name1||d.groups.name2,oe=d.groups.value1||d.groups.value2;if(ue==="style"){const L=[];for(const S of oe.matchAll(/(?<propertyName>[^:]+):(?<propertyValue>[^;]+);?/g))S.groups.propertyName.toLowerCase().trim()==="text-align"&&L.push(`${S.groups.propertyName.toLowerCase().trim()}: ${S.groups.propertyValue.trim()}`);v.push(`style="${L.join("; ")};"`)}}return`<${u}${c}${v.length?` ${v.join(" ")}`:""}>`}return""})}const a=e((r=s(this.text).trim())==null?void 0:r.replace(/\n/g,"<br/>"));return typeof this.text=="string"?a:""}}},ve=["innerHTML"];function fe(e,s,a,r,t,n){return i(),p("p",{innerHTML:n.formattedText,class:"unnnic-chats-message__text"},null,8,ve)}const ye=I(ce,[["render",fe]]);ce.__docgenInfo={displayName:"ChatsMessageText",exportName:"default",description:"",tags:{},props:[{name:"text",type:{name:"string"},required:!0}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/ChatsMessage/ChatsMessageText.vue"]};const re={name:"UnnnicChatsMessage",components:{UnnnicChatsMessageText:ye,UnnnicChatsMessageStatusBackdrop:he,UnnnicIconLoading:ae,UnnnicIcon:ie},props:{type:{type:String,default:"received",validate(e){return["received","sent"].includes(e)}},time:{type:Date,default:null,required:!0},signature:{type:String,default:"",required:!1},documentName:{type:String,default:""},status:{type:String,default:"sent",validate(e){return["sending","sent","failed"].includes(e)}},mediaType:{type:String,default:"",validate(e){return["audio","image","video"].includes(e)}}},computed:{formattedTime(){const e=new Date(this.time),s=e.getHours();let a=e.getMinutes();return a<10&&(a=`0${a}`),`${s}:${a}`},isMedia(){return!!this.mediaType},isDocument(){return!!this.documentName},isText(){return!this.isMedia&&!this.isDocument},isImage(){return this.isMedia&&this.mediaType==="image"},isVideo(){return this.isMedia&&this.mediaType==="video"},slotText(){var e,s,a,r,t,n,u,c;return((r=(a=(s=(e=this.$slots)==null?void 0:e.default)==null?void 0:s.call(e))==null?void 0:a[0])==null?void 0:r.children)||((c=(u=(n=(t=this.$slots)==null?void 0:t.text)==null?void 0:n.call(t))==null?void 0:u[0])==null?void 0:c.children)||""},sendingMedia(){return this.isMedia&&this.status==="sending"},failedToSendMedia(){return(this.isImage||this.isVideo)&&this.status==="failed"}}},be={key:0,class:"unnnic-chats-message__signature"},_e={key:1,class:"unnnic-chats-message__document"},Te={key:4,class:"unnnic-chats-message__time"};function xe(e,s,a,r,t,n){const u=g("unnnic-chats-message-text"),c=g("unnnic-icon-loading"),h=g("unnnic-icon"),v=g("unnnic-chats-message-status-backdrop");return i(),p("div",{class:C(["unnnic-chats-message",{sent:a.type==="sent",sending:a.status==="sending","is-document":n.isDocument,"is-media":n.isMedia,"is-image":n.isImage,"is-video":n.isVideo}])},[a.signature?(i(),p("p",be,D(a.signature),1)):M("",!0),q("main",{class:C(["unnnic-chats-message__main",{"is-document":n.isDocument,"is-media":n.isMedia,"is-image":n.isImage,"is-video":n.isVideo}])},[n.isText?(i(),o(u,{key:0,text:n.slotText},null,8,["text"])):M("",!0),n.isDocument?(i(),p("div",_e,[a.status==="sending"?(i(),o(c,{key:0,scheme:"neutral-dark",size:"lg"})):a.status==="failed"?(i(),o(h,{key:1,icon:"upload",scheme:"neutral-dark",size:"lg"})):(i(),o(h,{key:2,icon:"article",scheme:"neutral-dark",size:"lg"})),q("p",{class:"unnnic-chats-message__document__text",onClick:s[0]||(s[0]=d=>e.$emit("click"))},D(a.documentName),1)])):n.isMedia?(i(),p("div",{key:2,class:C(["unnnic-chats-message__media__container",{failed:n.failedToSendMedia}]),onClick:s[2]||(s[2]=d=>e.$emit("click-image"))},[me(e.$slots,"default"),(n.sendingMedia||n.failedToSendMedia)&&(n.isImage||n.isVideo)?(i(),o(v,{key:0,status:a.status,onClick:s[1]||(s[1]=d=>a.status==="failed"?e.$emit("click"):()=>{})},null,8,["status"])):M("",!0)],2)):M("",!0),n.sendingMedia?(i(),o(c,{key:3,size:"avatar-nano",scheme:"neutral-dark"})):(i(),p("p",Te,D(n.formattedTime),1))],2)],2)}const l=I(re,[["render",xe]]);re.__docgenInfo={displayName:"UnnnicChatsMessage",exportName:"default",description:"",tags:{},props:[{name:"type",type:{name:"string"},defaultValue:{func:!1,value:"'received'"}},{name:"time",type:{name:"date"},required:!0,defaultValue:{func:!1,value:"null"}},{name:"signature",type:{name:"string"},required:!1,defaultValue:{func:!1,value:"''"}},{name:"documentName",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"status",type:{name:"string"},defaultValue:{func:!1,value:"'sent'"}},{name:"mediaType",type:{name:"string"},defaultValue:{func:!1,value:"''"}}],events:[{name:"click"},{name:"click-image"}],slots:[{name:"default"}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/ChatsMessage/ChatsMessage.vue"]};const $e=""+new URL("un-001564e3.png",import.meta.url).href,ke=""+new URL("unnnic-b1db74a0.png",import.meta.url).href,Me=""+new URL("unnnicPortrait-619d1884.png",import.meta.url).href,Ce=""+new URL("weni-89de0ee7.mp4",import.meta.url).href,Pe={title:"Chats/Message",component:l},N=(e,{argTypes:s})=>({props:Object.keys(s),components:{unnnicChatsMessage:l},template:`
    <unnnic-chats-message v-bind="$props">
      Interdum et malesuada fames ac ante ipsum primis in faucibus.
      Curabitur facilisis congue sagittis.
    </unnnic-chats-message>
  `}),Se=(e,{argTypes:s})=>({props:Object.keys(s),components:{unnnicChatsMessage:l},template:`
    <unnnic-chats-message v-bind="$props">
      A message with link: http://localhost:8080
    </unnnic-chats-message>
  `}),De=(e,{argTypes:s})=>({props:Object.keys(s),components:{unnnicChatsMessage:l},template:`
    <div style="
      display: flex;
    ">
      <unnnic-chats-message v-bind="$props">
        Interdum et malesuada fames ac ante ipsum primis in faucibus.
        Curabitur facilisis congue sagittis.
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props" type="sent">
        Interdum et malesuada fames ac ante ipsum primis in faucibus.
        Curabitur facilisis congue sagittis.
      </unnnic-chats-message>
    </div>
  `}),qe=(e,{argTypes:s})=>({props:Object.keys(s),components:{unnnicChatsMessage:l},template:`
    <div style="
      display: grid;
      gap: 16px;
    ">
      <unnnic-chats-message v-bind="$props">
        Ita.
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props">
        Pashca ovum 😯😉
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props">
        Fusce scelerisque odio sit amet eleifend.
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props">
        In mattis tristique massa, ornare urna porttitor faucibus. Pellentesque habitant morbi.
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props">
        Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        Donec dignissim sapien ac condimentum sagittis. Cras vitae consectetur risus.
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props">
        Aenean vel pharetra ligula. Donec sit amet porttitor dui.
        Suspendisse lacinia mauris egestas, aliquam dui non, tristique augue. Donec at pulvinar
        leo, eget lobortis turpis. Ut hendrerit varius tortor, id mollis justo dictum eget.
        Praesent finibus urna vel lacus pretium consequat. Proin imperdiet ante tempus feugiat
        tristique. Duis in ultrices sem. Cras pharetra eleifend ligula vel commodo.
        Phasellus placerat faucibus est, nec posuere est venenatis sed. Phasellus a quam felis.
        Fusce volutpat sem eget urna sagittis laoreet non maximus quam. Mauris porta posuere commodo.
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props">
        Aenean vel pharetra ligula.
        Donec sit amet porttitor dui.

        Suspendisse lacinia mauris egestas, aliquam dui non, tristique augue.
        Donec at pulvinar leo, eget lobortis turpis.
        Ut hendrerit varius tortor, id mollis justo dictum eget.

        Praesent finibus urna vel lacus pretium consequat. Proin imperdiet ante tempus feugiat
        tristique. Duis in ultrices sem. Cras pharetra eleifend ligula vel commodo.
      </unnnic-chats-message>
    </div>
  `}),Ie=(e,{argTypes:s})=>({props:Object.keys(s),components:{unnnicChatsMessage:l,unnnicAudioRecorder:de},data(){return{audio:pe,image1:$e,image2:ke,image3:Me,video:Ce}},template:`
  <div style="
    display: grid;
    gap: 16px;
  ">
    <div  style="
      display: flex;
      gap: 16px;
    ">
      <unnnic-chats-message v-bind="$props" mediaType="audio">
        <unnnic-audio-recorder class="media" style="padding: 8px; margin: 4px 0;" ref="audio-recorder" :src="audio" :canDiscard="false" />
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props" mediaType="audio" status="sending">
        <unnnic-audio-recorder class="media" reqStatus="sending" style="padding: 8px; margin: 4px 0;" ref="audio-recorder" :src="audio" :canDiscard="false" />
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props" mediaType="audio" status="failed">
        <unnnic-audio-recorder class="media" reqStatus="failed" style="padding: 8px; margin: 4px 0;" ref="audio-recorder" :src="audio" :canDiscard="false" />
      </unnnic-chats-message>
    </div>

    <div  style="
      display: flex;
      gap: 16px;
    ">
      <unnnic-chats-message v-bind="$props" mediaType="video">
      <video class="media" controls>
        <source :src="video" />
      </video>
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props" status="sending" mediaType="video">
        <video class="media" controls>
          <source :src="video" />
        </video>
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props" status="failed" mediaType="video">
        <video class="media" controls>
          <source :src="video" />
        </video>
      </unnnic-chats-message>
    </div>

    <div  style="
      display: flex;
      gap: 16px;
    ">
      <unnnic-chats-message v-bind="$props" mediaType="image">
        <img class="media" :src="image1" />
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props" status="sending" mediaType="image">
        <img class="media" :src="image1" />
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props" status="failed" mediaType="image">
        <img class="media" :src="image1" />
      </unnnic-chats-message>
    </div>

    <unnnic-chats-message v-bind="$props" mediaType="image">
      <img class="media" :src="image2" />
    </unnnic-chats-message>
    <unnnic-chats-message v-bind="$props" mediaType="image">
      <img class="media" :src="image3" />
    </unnnic-chats-message>
  </div>
  `}),Ne=(e,{argTypes:s})=>({props:Object.keys(s),components:{unnnicChatsMessage:l},template:`
    <div  style="
      display: grid;
      gap: 16px;
    ">
      <unnnic-chats-message v-bind="$props" documentName="Lorem.pdf" type="received" />
      <unnnic-chats-message v-bind="$props" documentName="Lorem.pdf" />
      <unnnic-chats-message v-bind="$props" documentName="Lorem Ipsum.pdf" status="sending" />
      <unnnic-chats-message v-bind="$props" documentName="Lorem Ipsum.pdf" status="failed" />
      <unnnic-chats-message v-bind="$props" documentName="Lorem ipsum dolor sit amet consectetur adipiscing elit.docx" />
      <unnnic-chats-message v-bind="$props" documentName="Lorem ipsum dolor sit amet consectetur adipiscing elit fusce iaculis ligula fringilla consectetur tempor ex massa convallis risus ut sagittis est quam non est integer bibendum vehicula.csv" />
    </div>
  `}),m={time:new Date("2023-08-08T11:09:07.876230-03:00")},f=N.bind({});f.args={...m};const y=N.bind({});y.args={...m,status:"sending",type:"sent"};const b=De.bind({});b.args={...m};const _=N.bind({});_.args={...m,type:"sent",signature:"John Doe"};const T=Se.bind({});T.args={...m,type:"sent"};const x=qe.bind({});x.args={...m,type:"sent"};const $=Ie.bind({});$.args={...m,type:"sent"};const k=Ne.bind({});k.args={...m,type:"sent"};var U,j,A;f.parameters={...f.parameters,docs:{...(U=f.parameters)==null?void 0:U.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicChatsMessage
  },
  template: \`
    <unnnic-chats-message v-bind="$props">
      Interdum et malesuada fames ac ante ipsum primis in faucibus.
      Curabitur facilisis congue sagittis.
    </unnnic-chats-message>
  \`
})`,...(A=(j=f.parameters)==null?void 0:j.docs)==null?void 0:A.source}}};var V,O,P;y.parameters={...y.parameters,docs:{...(V=y.parameters)==null?void 0:V.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicChatsMessage
  },
  template: \`
    <unnnic-chats-message v-bind="$props">
      Interdum et malesuada fames ac ante ipsum primis in faucibus.
      Curabitur facilisis congue sagittis.
    </unnnic-chats-message>
  \`
})`,...(P=(O=y.parameters)==null?void 0:O.docs)==null?void 0:P.source}}};var w,F,R;b.parameters={...b.parameters,docs:{...(w=b.parameters)==null?void 0:w.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicChatsMessage
  },
  template: \`
    <div style="
      display: flex;
    ">
      <unnnic-chats-message v-bind="$props">
        Interdum et malesuada fames ac ante ipsum primis in faucibus.
        Curabitur facilisis congue sagittis.
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props" type="sent">
        Interdum et malesuada fames ac ante ipsum primis in faucibus.
        Curabitur facilisis congue sagittis.
      </unnnic-chats-message>
    </div>
  \`
})`,...(R=(F=b.parameters)==null?void 0:F.docs)==null?void 0:R.source}}};var B,W,z;_.parameters={..._.parameters,docs:{...(B=_.parameters)==null?void 0:B.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicChatsMessage
  },
  template: \`
    <unnnic-chats-message v-bind="$props">
      Interdum et malesuada fames ac ante ipsum primis in faucibus.
      Curabitur facilisis congue sagittis.
    </unnnic-chats-message>
  \`
})`,...(z=(W=_.parameters)==null?void 0:W.docs)==null?void 0:z.source}}};var E,H,J;T.parameters={...T.parameters,docs:{...(E=T.parameters)==null?void 0:E.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicChatsMessage
  },
  template: \`
    <unnnic-chats-message v-bind="$props">
      A message with link: http://localhost:8080
    </unnnic-chats-message>
  \`
})`,...(J=(H=T.parameters)==null?void 0:H.docs)==null?void 0:J.source}}};var G,K,Q;x.parameters={...x.parameters,docs:{...(G=x.parameters)==null?void 0:G.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicChatsMessage
  },
  template: \`
    <div style="
      display: grid;
      gap: 16px;
    ">
      <unnnic-chats-message v-bind="$props">
        Ita.
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props">
        Pashca ovum 😯😉
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props">
        Fusce scelerisque odio sit amet eleifend.
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props">
        In mattis tristique massa, ornare urna porttitor faucibus. Pellentesque habitant morbi.
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props">
        Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        Donec dignissim sapien ac condimentum sagittis. Cras vitae consectetur risus.
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props">
        Aenean vel pharetra ligula. Donec sit amet porttitor dui.
        Suspendisse lacinia mauris egestas, aliquam dui non, tristique augue. Donec at pulvinar
        leo, eget lobortis turpis. Ut hendrerit varius tortor, id mollis justo dictum eget.
        Praesent finibus urna vel lacus pretium consequat. Proin imperdiet ante tempus feugiat
        tristique. Duis in ultrices sem. Cras pharetra eleifend ligula vel commodo.
        Phasellus placerat faucibus est, nec posuere est venenatis sed. Phasellus a quam felis.
        Fusce volutpat sem eget urna sagittis laoreet non maximus quam. Mauris porta posuere commodo.
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props">
        Aenean vel pharetra ligula.
        Donec sit amet porttitor dui.

        Suspendisse lacinia mauris egestas, aliquam dui non, tristique augue.
        Donec at pulvinar leo, eget lobortis turpis.
        Ut hendrerit varius tortor, id mollis justo dictum eget.

        Praesent finibus urna vel lacus pretium consequat. Proin imperdiet ante tempus feugiat
        tristique. Duis in ultrices sem. Cras pharetra eleifend ligula vel commodo.
      </unnnic-chats-message>
    </div>
  \`
})`,...(Q=(K=x.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var X,Y,Z;$.parameters={...$.parameters,docs:{...(X=$.parameters)==null?void 0:X.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicChatsMessage,
    unnnicAudioRecorder
  },
  data() {
    return {
      audio: AudioSample,
      image1: ImageSample1,
      image2: ImageSample2,
      image3: ImageSample3,
      video: VideoSample
    };
  },
  template: \`
  <div style="
    display: grid;
    gap: 16px;
  ">
    <div  style="
      display: flex;
      gap: 16px;
    ">
      <unnnic-chats-message v-bind="$props" mediaType="audio">
        <unnnic-audio-recorder class="media" style="padding: 8px; margin: 4px 0;" ref="audio-recorder" :src="audio" :canDiscard="false" />
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props" mediaType="audio" status="sending">
        <unnnic-audio-recorder class="media" reqStatus="sending" style="padding: 8px; margin: 4px 0;" ref="audio-recorder" :src="audio" :canDiscard="false" />
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props" mediaType="audio" status="failed">
        <unnnic-audio-recorder class="media" reqStatus="failed" style="padding: 8px; margin: 4px 0;" ref="audio-recorder" :src="audio" :canDiscard="false" />
      </unnnic-chats-message>
    </div>

    <div  style="
      display: flex;
      gap: 16px;
    ">
      <unnnic-chats-message v-bind="$props" mediaType="video">
      <video class="media" controls>
        <source :src="video" />
      </video>
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props" status="sending" mediaType="video">
        <video class="media" controls>
          <source :src="video" />
        </video>
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props" status="failed" mediaType="video">
        <video class="media" controls>
          <source :src="video" />
        </video>
      </unnnic-chats-message>
    </div>

    <div  style="
      display: flex;
      gap: 16px;
    ">
      <unnnic-chats-message v-bind="$props" mediaType="image">
        <img class="media" :src="image1" />
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props" status="sending" mediaType="image">
        <img class="media" :src="image1" />
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props" status="failed" mediaType="image">
        <img class="media" :src="image1" />
      </unnnic-chats-message>
    </div>

    <unnnic-chats-message v-bind="$props" mediaType="image">
      <img class="media" :src="image2" />
    </unnnic-chats-message>
    <unnnic-chats-message v-bind="$props" mediaType="image">
      <img class="media" :src="image3" />
    </unnnic-chats-message>
  </div>
  \`
})`,...(Z=(Y=$.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var ee,se,ne;k.parameters={...k.parameters,docs:{...(ee=k.parameters)==null?void 0:ee.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicChatsMessage
  },
  template: \`
    <div  style="
      display: grid;
      gap: 16px;
    ">
      <unnnic-chats-message v-bind="$props" documentName="Lorem.pdf" type="received" />
      <unnnic-chats-message v-bind="$props" documentName="Lorem.pdf" />
      <unnnic-chats-message v-bind="$props" documentName="Lorem Ipsum.pdf" status="sending" />
      <unnnic-chats-message v-bind="$props" documentName="Lorem Ipsum.pdf" status="failed" />
      <unnnic-chats-message v-bind="$props" documentName="Lorem ipsum dolor sit amet consectetur adipiscing elit.docx" />
      <unnnic-chats-message v-bind="$props" documentName="Lorem ipsum dolor sit amet consectetur adipiscing elit fusce iaculis ligula fringilla consectetur tempor ex massa convallis risus ut sagittis est quam non est integer bibendum vehicula.csv" />
    </div>
  \`
})`,...(ne=(se=k.parameters)==null?void 0:se.docs)==null?void 0:ne.source}}};const we=["Default","Sending","ReceivedAndSent","WithSignature","WithLink","MultipleMessages","Media","Document"];export{f as Default,k as Document,$ as Media,x as MultipleMessages,b as ReceivedAndSent,y as Sending,T as WithLink,_ as WithSignature,we as __namedExportsOrder,Pe as default};
//# sourceMappingURL=ChatsMessage.stories-fa7b2c59.js.map
