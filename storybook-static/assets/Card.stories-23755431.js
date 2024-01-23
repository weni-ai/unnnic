import{U as Y}from"./AvatarIcon-6b8edf9b.js";import{U as y}from"./Icon-b41b8868.js";import{a as d,o,b as s,d as e,i as u,t as a,A as r,e as x,g as Z,w as nn,f as en,K as mn,j as fn,F as _n}from"./vue.esm-bundler-3f98aba2.js";import{_ as p}from"./_plugin-vue_export-helper-c27b6911.js";import{u as gn}from"./ToolTip-b379b431.js";import{i as yn}from"./iconList-d1dd560b.js";import{u as vn}from"./Button-5e6ad622.js";import{u as bn,a as hn}from"./DropdownItem-0edd430d.js";import"./index-39f25d77.js";const tn={name:"unnnic-card",components:{UnnnicIcon:y,UnnnicAvatarIcon:Y},props:{title:{type:String,default:null},value:{type:Number,default:null},icon:{type:String,default:null},percent:{type:Number,default:0},invertedPercentage:{type:Boolean,default:!1},scheme:{type:String,default:null}},computed:{color(){return this.invertedPercentage?this.percent<0?"green":"red":this.percent<0?"red":"green"}}},Cn={class:"unnnic-card-dash"},kn={class:"header"},wn={class:"label"},Sn={class:"content"},Vn={class:"value"},xn={class:"label"};function In(t,l,n,m,f,i){const c=d("unnnic-avatar-icon"),_=d("unnnic-icon");return o(),s("div",Cn,[e("div",kn,[u(c,{size:"sm",scheme:n.scheme,icon:n.icon},null,8,["scheme","icon"]),e("div",wn,a(n.title),1)]),e("div",Sn,[e("div",Vn,a(n.value),1),n.percent?(o(),s("div",{key:0,class:r(["percent",`unnnic-card-scheme--feedback-${i.color}`])},[u(_,{icon:`graph-stats-${n.percent>=0?"ascend":"descend"}-2`,scheme:`feedback-${i.color}`,size:"sm",class:"icon"},null,8,["icon","scheme"]),e("div",xn,a(n.percent>=0?`+${n.percent}%`:`${n.percent}%`),1)],2)):x("",!0)])])}const Tn=p(tn,[["render",In],["__scopeId","data-v-459410be"]]);tn.__docgenInfo={displayName:"unnnic-card",exportName:"default",description:"",tags:{},props:[{name:"title",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"value",type:{name:"number"},defaultValue:{func:!1,value:"null"}},{name:"icon",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"percent",type:{name:"number"},defaultValue:{func:!1,value:"0"}},{name:"invertedPercentage",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"scheme",type:{name:"string"},defaultValue:{func:!1,value:"null"}}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Card/DashCard.vue"]};const an={name:"unnnic-card",components:{ToolTip:gn,UnnnicIcon:y},props:{title:{type:String,default:null},info:{type:String,default:null},icon:{type:String,default:null},infoPosition:{type:String,default:"right"},scheme:{type:String,default:null},hasInformationIcon:{type:Boolean,default:!0},enabled:{type:Boolean,default:!0}}},Dn={class:"unnnic-card-title"},Nn={class:"title"};function Bn(t,l,n,m,f,i){const c=d("unnnic-icon"),_=d("tool-tip");return o(),s("div",Dn,[e("div",{class:r(["avatar-icon",`unnnic-card-scheme--${n.scheme}`])},[u(c,{icon:n.icon,scheme:n.scheme,size:"md"},null,8,["icon","scheme"])],2),e("div",Nn,a(n.title),1),n.hasInformationIcon?(o(),Z(_,{key:0,class:"information",side:n.infoPosition,text:n.info,enabled:n.enabled},{default:nn(()=>[u(c,{icon:"information-circle-4",class:"unnnic-card-title__content_info",size:"sm",scheme:"neutral-soft"})],void 0),_:1},8,["side","text","enabled"])):x("",!0)])}const I=p(an,[["render",Bn],["__scopeId","data-v-be8c0743"]]);an.__docgenInfo={displayName:"unnnic-card",exportName:"default",description:"",tags:{},props:[{name:"title",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"info",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"icon",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"infoPosition",type:{name:"string"},defaultValue:{func:!1,value:"'right'"}},{name:"scheme",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"hasInformationIcon",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"enabled",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Card/TitleCard.vue"]};const cn={name:"unnnic-card",components:{UnnnicIcon:y},props:{title:{type:String,default:null},description:{type:String,default:null},icon:{type:String,default:null},status:{type:String,default:null},scheme:{type:String,default:null}}},$n={class:"header"},An={class:"label"},Fn={class:"content"},zn={class:"title-container"},Un={class:"title"},On={class:"description"};function Mn(t,l,n,m,f,i){const c=d("unnnic-icon");return o(),s("div",{class:r(["unnnic-card-status",`unnnic-card-scheme--${n.scheme}--border`])},[e("div",$n,[u(c,{icon:n.icon,scheme:"neutral-dark",size:"md",class:"icon"},null,8,["icon"]),e("div",An,a(n.title),1)]),e("div",Fn,[e("div",zn,[u(c,{icon:"indicator",scheme:n.scheme,size:"sm"},null,8,["scheme"]),e("div",Un,a(n.status),1)]),e("div",On,a(n.description),1)])],2)}const Pn=p(cn,[["render",Mn],["__scopeId","data-v-20d9bc92"]]);cn.__docgenInfo={displayName:"unnnic-card",exportName:"default",description:"",tags:{},props:[{name:"title",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"description",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"icon",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"status",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"scheme",type:{name:"string"},defaultValue:{func:!1,value:"null"}}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Card/StatusCard.vue"]};const on={name:"unnnic-card",components:{UnnnicAvatarIcon:Y},props:{title:{type:String,default:null},description:{type:String,default:null},icon:{type:String,default:null},enabled:{type:Boolean,default:!0},scheme:{type:String,default:null}}},En={class:"icon"},jn={class:"content"},Rn={class:"title"},Wn={class:"description"};function Ln(t,l,n,m,f,i){const c=d("unnnic-avatar-icon");return o(),s("div",{class:r({"unnnic-card-account":!0,enabled:n.enabled})},[e("div",En,[u(c,{size:"xs",scheme:n.scheme,icon:n.icon,enabled:n.enabled},null,8,["scheme","icon","enabled"])]),e("div",jn,[e("div",Rn,a(n.title),1),e("div",Wn,a(n.description),1)])],2)}const Kn=p(on,[["render",Ln],["__scopeId","data-v-239ffa21"]]);on.__docgenInfo={displayName:"unnnic-card",exportName:"default",description:"",tags:{},props:[{name:"title",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"description",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"icon",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"enabled",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"scheme",type:{name:"string"},defaultValue:{func:!1,value:"null"}}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Card/AccountCard.vue"]};const ln={name:"unnnic-card",props:{title:{type:String,default:null},description:{type:String,default:null},clickable:{type:Boolean,default:!1}}},qn={class:"unnnic-card-default__content"},Gn={class:"unnnic-card-default__title"},Hn=["title"];function Jn(t,l,n,m,f,i){return o(),s("div",{class:r({"unnnic-card-default":!0,"unnnic-card-default__clickable":n.clickable})},[e("div",qn,[e("div",Gn,a(n.title),1),e("p",{class:"unnnic-card-default__description",title:n.description},a(n.description),9,Hn)])],2)}const Qn=p(ln,[["render",Jn]]);ln.__docgenInfo={displayName:"unnnic-card",exportName:"default",description:"",tags:{},props:[{name:"title",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"description",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"clickable",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Card/DefaultCard.vue"]};const sn={name:"unnnic-card",components:{UnnnicIconSvg:y},props:{text:{type:String,default:null},icon:{type:String,default:null},clickable:{type:Boolean,default:!1}}},Xn={class:"unnnic-card-blank__content"},Yn={class:"unnnic-card-blank__content__text"};function Zn(t,l,n,m,f,i){const c=d("unnnic-icon-svg");return o(),s("div",{class:r({"unnnic-card-blank":!0,"unnnic-card-blank__clickable":n.clickable})},[e("div",Xn,[u(c,{icon:n.icon,scheme:"neutral-clean",class:"unnnic-card-blank__content__icon",size:"xl"},null,8,["icon"]),e("div",Yn,a(n.text),1)])],2)}const ne=p(sn,[["render",Zn]]);sn.__docgenInfo={displayName:"unnnic-card",exportName:"default",description:"",tags:{},props:[{name:"text",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"icon",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"clickable",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Card/BlankCard.vue"]};const un={name:"unnnic-card",components:{UnnnicIconSvg:y},props:{title:{type:String,default:null},description:{type:String,default:null},icon:{type:String,default:null},enabled:{type:Boolean,default:!1},clickable:{type:Boolean,default:!1}}},ee={class:"unnnic-card-content__content"},te={class:"unnnic-card-content__content__title"},ae={class:"unnnic-card-content__content__description"};function ce(t,l,n,m,f,i){const c=d("unnnic-icon-svg");return o(),s("div",{class:r({"unnnic-card-content":!0,"unnnic-card-content--disabled":!n.enabled,"unnnic-card-content__clickable":n.clickable})},[e("div",{class:r(["unnnic-card-content__icon",n.enabled&&"unnnic-card-content__icon--disabled"])},[u(c,{icon:n.icon,scheme:"neutral-cloudy",size:"sm"},null,8,["icon"])],2),e("div",ee,[e("div",te,a(n.title),1),e("div",ae,a(n.description),1)])],2)}const ie=p(un,[["render",ce]]);un.__docgenInfo={displayName:"unnnic-card",exportName:"default",description:"",tags:{},props:[{name:"title",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"description",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"icon",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"enabled",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"clickable",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Card/ContentCard.vue"]};const rn={name:"unnnic-card",components:{UnnnicIconSvg:y},props:{title:{type:String,default:null},description:{type:String,default:null},comments:{type:String,default:null},clickable:{type:Boolean,default:!1},iconSrc:{type:String,default:null},rating:{type:Number,default:0},typeAction:{type:String,default:null}},methods:{cardClick(){this.$emit("openModal")}}},oe={class:r(["unnnic-card-marketplace__icons"])},le=["src"],se={class:"unnnic-card-marketplace__content"},ue={class:"unnnic-card-marketplace__content__title"},re=["title"],de={key:0,class:"unnnic-card-marketplace__content__rating"},pe={class:"unnnic-card-marketplace__content__rating__value"},me={class:"unnnic-card-marketplace__content__rating__comments"};function fe(t,l,n,m,f,i){const c=d("unnnic-icon-svg");return o(),s("div",{class:r({"unnnic-card-marketplace":!0,"unnnic-card-marketplace__clickable":n.clickable,"unnnic-card-marketplace__add":n.typeAction==="add","unnnic-card-marketplace__config":n.typeAction==="config","unnnic-card-marketplace__edit":n.typeAction==="edit"}),onClick:l[0]||(l[0]=(..._)=>i.cardClick&&i.cardClick(..._))},[e("div",oe,[e("img",{class:"unnnic-card-marketplace__icons__app",src:n.iconSrc},null,8,le),en(t.$slots,"actions")]),e("div",se,[e("div",ue,a(n.title),1),e("div",{class:"unnnic-card-marketplace__content__description",title:n.description},a(n.description),9,re),n.typeAction==="add"?(o(),s("div",de,[u(c,{class:"unnnic-card-marketplace__content__rating__star",scheme:"feedback-yellow",icon:"rating-star-1",size:"ant"}),e("div",pe,a(n.rating),1),e("div",me,"("+a(n.comments)+")",1)])):x("",!0)])],2)}const _e=p(rn,[["render",fe]]);rn.__docgenInfo={displayName:"unnnic-card",exportName:"default",description:"",tags:{},props:[{name:"title",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"description",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"comments",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"clickable",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"iconSrc",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"rating",type:{name:"number"},defaultValue:{func:!1,value:"0"}},{name:"typeAction",type:{name:"string"},defaultValue:{func:!1,value:"null"}}],events:[{name:"openModal"}],slots:[{name:"actions"}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Card/MarketplaceCard.vue"]};const dn={name:"unnnic-card",props:{type:{type:String,default:"title",validator(t){return["title","status","dash","account","default","blank","content","marketplace"].indexOf(t)!==-1}},title:{type:String,default:null},description:{type:String,default:null},status:{type:String,default:null},info:{type:String,default:null},text:{type:String,default:null},value:{type:Number,default:null},percent:{type:Number,default:0},invertedPercentage:{type:Boolean,default:!1},rating:{type:Number,default:0},comments:{type:String,default:null},enabled:{type:Boolean,default:!0},icon:{type:String,default:null},iconSrc:{type:String,default:null},infoPosition:{type:String,default:"right"},hasInformationIcon:{type:Boolean,default:!0},scheme:{type:String,default:"aux-blue",validator(t){return["feedback-red","feedback-green","feedback-yellow","feedback-blue","feedback-grey","aux-blue","aux-purple","aux-orange","aux-lemon","aux-pink","brand-weni-soft"].indexOf(t)!==-1}},clickable:{type:Boolean,default:!1},typeAction:{type:String,default:null,validator(t){return["add","config","edit"].indexOf(t)!==-1}},buttonAction:{type:Function,default:()=>{}}},computed:{currentTypeIcon(){return this.icon?this.icon:this.type==="title"?"graph-stats-1":this.type==="dash"?"messages-bubble-1":this.type==="status"?"science-fiction-robot-2":this.type==="account"?"single-neutral-2":null},currentComponent(){return this.type==="title"?I:this.type==="dash"?Tn:this.type==="status"?Pn:this.type==="account"?Kn:this.type==="default"?Qn:this.type==="blank"?ne:this.type==="content"?ie:this.type==="marketplace"?_e:I}},methods:{openModal(){this.$emit("openModal")}}};function ge(t,l,n,m,f,i){return o(),Z(mn(i.currentComponent),{class:"unnnic-card-component","v-bind":t.$attrs,title:n.title,text:n.text,info:n.info,icon:i.currentTypeIcon,"icon-src":n.iconSrc,rating:n.rating,comments:n.comments,"type-action":n.typeAction,"button-action":n.buttonAction,value:n.value,percent:n.percent,"inverted-percentage":n.invertedPercentage,status:n.status,description:n.description,"info-position":n.infoPosition,enabled:n.enabled,scheme:n.scheme,clickable:n.clickable,"has-information-icon":n.hasInformationIcon,onOpenModal:i.openModal},{default:nn(()=>[(o(!0),s(_n,null,fn(t.$slots,(c,_)=>en(t.$slots,_,{slot:_})),256))],void 0),_:3},40,["v-bind","title","text","info","icon","icon-src","rating","comments","type-action","button-action","value","percent","inverted-percentage","status","description","info-position","enabled","scheme","clickable","has-information-icon","onOpenModal"])}const pn=p(dn,[["render",ge]]);dn.__docgenInfo={displayName:"unnnic-card",exportName:"default",description:"",tags:{},props:[{name:"type",type:{name:"string"},defaultValue:{func:!1,value:"'title'"},values:["title","status","dash","account","default","blank","content","marketplace"]},{name:"title",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"description",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"status",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"info",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"text",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"value",type:{name:"number"},defaultValue:{func:!1,value:"null"}},{name:"percent",type:{name:"number"},defaultValue:{func:!1,value:"0"}},{name:"invertedPercentage",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"rating",type:{name:"number"},defaultValue:{func:!1,value:"0"}},{name:"comments",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"enabled",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"icon",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"iconSrc",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"infoPosition",type:{name:"string"},defaultValue:{func:!1,value:"'right'"}},{name:"hasInformationIcon",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"scheme",type:{name:"string"},defaultValue:{func:!1,value:"'aux-blue'"},values:["feedback-red","feedback-green","feedback-yellow","feedback-blue","feedback-grey","aux-blue","aux-purple","aux-orange","aux-lemon","aux-pink","brand-weni-soft"]},{name:"clickable",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"typeAction",type:{name:"string"},defaultValue:{func:!1,value:"null"},values:["add","config","edit"]},{name:"buttonAction",type:{name:"func"},defaultValue:{func:!0,value:"() => {}"}}],events:[{name:"openModal"}],slots:[{name:"name",scoped:!0,bindings:[{name:"name",title:"binding"},{name:"slot",title:"binding"}]}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Card/Card.vue"]};const xe={title:"Card/Card",component:pn,argTypes:{enabled:{control:{type:"select",options:[!0,!1]}},infoPosition:{control:{type:"select",options:["top","right","bottom","left"]}},type:{control:{type:"select",options:["title","dash","account","status","default","blank","content","marketplace"]}},icon:{control:{type:"select",options:yn}},scheme:{control:{type:"select",options:["feedback-red","feedback-green","feedback-yellow","feedback-blue","feedback-grey","aux-blue","aux-purple","aux-orange","aux-lemon","aux-pink","brand-weni-soft"]}},typeAction:{control:{type:"select",options:["add","config","edit"]}}}},g=(t,{argTypes:l})=>({props:Object.keys(l),components:{Card:pn,unnnicButton:vn,unnnicDropdown:bn,unnnicDropdownItem:hn},template:`
    <Card v-bind="$props">
      <unnnic-dropdown slot="actions">
        <unnnic-button
          slot="trigger"
          size="small"
          type="secondary"
          iconCenter="cog-1"
        />
        <unnnic-dropdown-item>
          Configure
        </unnnic-dropdown-item>
        <unnnic-dropdown-item>
          Remove
        </unnnic-dropdown-item>
      </unnnic-dropdown>
    </Card>
  `}),v=g.bind({});v.args={type:"title",title:"This is the title",info:"This is the info",hasInformationIcon:!0};const b=g.bind({});b.args={type:"dash",title:"This is the title",value:12345,percent:15};const h=g.bind({});h.args={type:"status",title:"This is the title",description:"This is the description",status:"This is the status"};const C=g.bind({});C.args={type:"account",title:"This is the title",description:"This is the description"};const k=g.bind({});k.args={type:"default",title:"This is the title",description:"This is the description"};const w=g.bind({});w.args={type:"blank",text:"This is the text"};const S=g.bind({});S.args={type:"content",title:"This is the title",description:"This is the description",enabled:!1,icon:"view-1-1"};const V=g.bind({});V.args={type:"marketplace",title:"This is the title",description:"This is the description",rating:4.9,comments:"3 comments",iconSrc:"https://api.iconify.design/grommet-icons:slack.svg",enabled:!1,typeAction:"add",clickable:!0};var T,D,N;v.parameters={...v.parameters,docs:{...(T=v.parameters)==null?void 0:T.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    Card,
    unnnicButton,
    unnnicDropdown,
    unnnicDropdownItem
  },
  template: \`
    <Card v-bind="$props">
      <unnnic-dropdown slot="actions">
        <unnnic-button
          slot="trigger"
          size="small"
          type="secondary"
          iconCenter="cog-1"
        />
        <unnnic-dropdown-item>
          Configure
        </unnnic-dropdown-item>
        <unnnic-dropdown-item>
          Remove
        </unnnic-dropdown-item>
      </unnnic-dropdown>
    </Card>
  \`
})`,...(N=(D=v.parameters)==null?void 0:D.docs)==null?void 0:N.source}}};var B,$,A;b.parameters={...b.parameters,docs:{...(B=b.parameters)==null?void 0:B.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    Card,
    unnnicButton,
    unnnicDropdown,
    unnnicDropdownItem
  },
  template: \`
    <Card v-bind="$props">
      <unnnic-dropdown slot="actions">
        <unnnic-button
          slot="trigger"
          size="small"
          type="secondary"
          iconCenter="cog-1"
        />
        <unnnic-dropdown-item>
          Configure
        </unnnic-dropdown-item>
        <unnnic-dropdown-item>
          Remove
        </unnnic-dropdown-item>
      </unnnic-dropdown>
    </Card>
  \`
})`,...(A=($=b.parameters)==null?void 0:$.docs)==null?void 0:A.source}}};var F,z,U;h.parameters={...h.parameters,docs:{...(F=h.parameters)==null?void 0:F.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    Card,
    unnnicButton,
    unnnicDropdown,
    unnnicDropdownItem
  },
  template: \`
    <Card v-bind="$props">
      <unnnic-dropdown slot="actions">
        <unnnic-button
          slot="trigger"
          size="small"
          type="secondary"
          iconCenter="cog-1"
        />
        <unnnic-dropdown-item>
          Configure
        </unnnic-dropdown-item>
        <unnnic-dropdown-item>
          Remove
        </unnnic-dropdown-item>
      </unnnic-dropdown>
    </Card>
  \`
})`,...(U=(z=h.parameters)==null?void 0:z.docs)==null?void 0:U.source}}};var O,M,P;C.parameters={...C.parameters,docs:{...(O=C.parameters)==null?void 0:O.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    Card,
    unnnicButton,
    unnnicDropdown,
    unnnicDropdownItem
  },
  template: \`
    <Card v-bind="$props">
      <unnnic-dropdown slot="actions">
        <unnnic-button
          slot="trigger"
          size="small"
          type="secondary"
          iconCenter="cog-1"
        />
        <unnnic-dropdown-item>
          Configure
        </unnnic-dropdown-item>
        <unnnic-dropdown-item>
          Remove
        </unnnic-dropdown-item>
      </unnnic-dropdown>
    </Card>
  \`
})`,...(P=(M=C.parameters)==null?void 0:M.docs)==null?void 0:P.source}}};var E,j,R;k.parameters={...k.parameters,docs:{...(E=k.parameters)==null?void 0:E.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    Card,
    unnnicButton,
    unnnicDropdown,
    unnnicDropdownItem
  },
  template: \`
    <Card v-bind="$props">
      <unnnic-dropdown slot="actions">
        <unnnic-button
          slot="trigger"
          size="small"
          type="secondary"
          iconCenter="cog-1"
        />
        <unnnic-dropdown-item>
          Configure
        </unnnic-dropdown-item>
        <unnnic-dropdown-item>
          Remove
        </unnnic-dropdown-item>
      </unnnic-dropdown>
    </Card>
  \`
})`,...(R=(j=k.parameters)==null?void 0:j.docs)==null?void 0:R.source}}};var W,L,K;w.parameters={...w.parameters,docs:{...(W=w.parameters)==null?void 0:W.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    Card,
    unnnicButton,
    unnnicDropdown,
    unnnicDropdownItem
  },
  template: \`
    <Card v-bind="$props">
      <unnnic-dropdown slot="actions">
        <unnnic-button
          slot="trigger"
          size="small"
          type="secondary"
          iconCenter="cog-1"
        />
        <unnnic-dropdown-item>
          Configure
        </unnnic-dropdown-item>
        <unnnic-dropdown-item>
          Remove
        </unnnic-dropdown-item>
      </unnnic-dropdown>
    </Card>
  \`
})`,...(K=(L=w.parameters)==null?void 0:L.docs)==null?void 0:K.source}}};var q,G,H;S.parameters={...S.parameters,docs:{...(q=S.parameters)==null?void 0:q.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    Card,
    unnnicButton,
    unnnicDropdown,
    unnnicDropdownItem
  },
  template: \`
    <Card v-bind="$props">
      <unnnic-dropdown slot="actions">
        <unnnic-button
          slot="trigger"
          size="small"
          type="secondary"
          iconCenter="cog-1"
        />
        <unnnic-dropdown-item>
          Configure
        </unnnic-dropdown-item>
        <unnnic-dropdown-item>
          Remove
        </unnnic-dropdown-item>
      </unnnic-dropdown>
    </Card>
  \`
})`,...(H=(G=S.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};var J,Q,X;V.parameters={...V.parameters,docs:{...(J=V.parameters)==null?void 0:J.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    Card,
    unnnicButton,
    unnnicDropdown,
    unnnicDropdownItem
  },
  template: \`
    <Card v-bind="$props">
      <unnnic-dropdown slot="actions">
        <unnnic-button
          slot="trigger"
          size="small"
          type="secondary"
          iconCenter="cog-1"
        />
        <unnnic-dropdown-item>
          Configure
        </unnnic-dropdown-item>
        <unnnic-dropdown-item>
          Remove
        </unnnic-dropdown-item>
      </unnnic-dropdown>
    </Card>
  \`
})`,...(X=(Q=V.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};const Ie=["Title","Dash","Status","Account","Default","Blank","Content","Marketplace"];export{C as Account,w as Blank,S as Content,b as Dash,k as Default,V as Marketplace,h as Status,v as Title,Ie as __namedExportsOrder,xe as default};
//# sourceMappingURL=Card.stories-23755431.js.map
