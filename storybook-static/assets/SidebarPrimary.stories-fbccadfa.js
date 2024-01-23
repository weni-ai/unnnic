import{u as A}from"./ToolTip-7f37fa70.js";import{l as N}from"./LanguageSelect-c865b174.js";import{U as P}from"./Icon-777631f3.js";import{b as i,d as a,f as u,n as z,F as v,j as y,i as o,B as H,C as M,w as _,A as p,a as g,o as r,t as b,G as V,e as F,p as O,k as W}from"./vue.esm-bundler-afa73d68.js";import{_ as L}from"./_plugin-vue_export-helper-c27b6911.js";import"./index-793ecb6f.js";import"./config-28154cde.js";const T={components:{ToolTip:A,iconSvg:P,languageSelect:N},props:{hideExpandButton:{type:Boolean,default:!1},expanded:{type:Boolean,default:!0},items:{type:Array},languages:{type:Array,default:()=>["pt-br","en"]},language:{type:String},hideText:{type:String}},data(){return{hoverTop:0,call:null,blockActiveId:""}},methods:{clickOption(e){e.click&&e.click(e)},toggleExpanded(){this.$emit("toggle-expanded",!this.expanded)},hover(e,s){this.$slots[`block-${s}`]&&(this.hoverTop=e.srcElement.offsetTop,this.blockActiveId=s,clearTimeout(this.call),setTimeout(()=>{this.$refs["sidebar-modal"].classList.add("active","move-transition")},0))},mouseout(){this.$refs["sidebar-modal"].classList.remove("active"),this.call=setTimeout(()=>{this.$refs["sidebar-modal"].classList.remove("move-transition")},300)}}},U=e=>(O("data-v-1db27791"),e=e(),W(),e),j={class:"header"},D={class:"unnnic-sidebar-primary-content"},G={class:"category-label"},q={class:"options"},J=["href","onClick"],K={class:"label"},Q=U(()=>a("div",{class:"divider"},null,-1)),R={class:"footer"},X={class:"category"},Y={class:"options"},Z={class:"option-container"},$={class:"option-container"},ee={class:"label"};function ae(e,s,t,ne,h,d){const m=g("icon-svg"),f=g("tool-tip"),w=g("language-select");return r(),i("div",{class:p(["unnnic-sidebar-primary",{"unnnic-sidebar-primary-expanded":t.expanded}])},[a("div",j,[u(e.$slots,"header",{},void 0,!0)]),a("div",null,[u(e.$slots,"search",{},void 0,!0)]),a("div",D,[a("div",{ref:"sidebar-modal",class:"hover",style:z({top:`${h.hoverTop}px`})},[u(e.$slots,"block-"+h.blockActiveId,{},void 0,!0)],4),(r(!0),i(v,null,y(t.items,(l,E)=>(r(),i("div",{key:E,class:"category"},[a("div",G,b(l.label),1),a("div",q,[(r(!0),i(v,null,y(l.items,(n,B)=>(r(),i("div",{key:B,class:"option-container"},[o(f,{enabled:!t.expanded,text:n.label,side:"right",onMouseenter:C=>d.hover(C,n.id),onMouseleave:d.mouseout},{default:_(()=>[a("a",{href:n.viewUrl,class:p(["option",{selected:n.active,disabled:e.$slots[`block-${n.id}`]}]),onClick:V(()=>{e.$slots[`block-${n.id}`]||d.clickOption(n)},["prevent"])},[o(m,{icon:n.icon,scheme:n.active?"brand-weni-soft":"neutral-cloudy",size:t.expanded?"ant":"md",filled:n.active},null,8,["icon","scheme","size","filled"]),a("span",K,b(n.label),1),n.notify?(r(),i("span",{key:0,class:p(n.notify&&!t.expanded?"notify":"")},[o(m,{icon:"indicator",scheme:"brand-weni-soft",size:"ant"})],2)):F("",!0)],10,J)],void 0),_:2},1032,["enabled","text","onMouseenter","onMouseleave"])]))),128))]),Q]))),128))]),a("div",R,[a("div",X,[a("div",Y,[a("div",Z,[o(w,{class:"language-select",contracted:!t.expanded,value:t.language,"supported-languages":t.languages,onInput:s[0]||(s[0]=l=>e.$emit("change-language",l))},null,8,["contracted","value","supported-languages"])]),H(a("div",$,[o(f,{enabled:!t.expanded,text:t.hideText,side:"right"},{default:_(()=>[a("div",{class:"option",onClick:s[1]||(s[1]=(...l)=>d.toggleExpanded&&d.toggleExpanded(...l))},[o(m,{icon:t.expanded?"close_fullscreen":"open_in_full",scheme:"neutral-cloudy",size:t.expanded?"ant":"md"},null,8,["icon","size"]),a("span",ee,b(t.hideText),1)])],void 0),_:1},8,["enabled","text"])],512),[[M,!t.hideExpandButton]])])])])],2)}const I=L(T,[["render",ae],["__scopeId","data-v-1db27791"]]);T.__docgenInfo={exportName:"default",displayName:"SidebarPrimary",description:"",tags:{},props:[{name:"hideExpandButton",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"expanded",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"items",type:{name:"array"}},{name:"languages",type:{name:"array"},defaultValue:{func:!1,value:"['pt-br', 'en']"}},{name:"language",type:{name:"string"}},{name:"hideText",type:{name:"string"}}],events:[{name:"change-language"},{name:"toggle-expanded",type:{names:["undefined"]}}],slots:[{name:"header"},{name:"search"},{name:"'block-' + blockActiveId",scoped:!0,bindings:[{name:"name",title:"binding"}]}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Sidebar/SidebarPrimary.vue"]};const me={title:"example/SidebarPrimary",component:I,argTypes:{hideExpandButton:{control:{type:"boolean"}},expanded:{control:{type:"boolean"}},items:{control:{type:"array"}},hideText:{control:{type:"text"}},language:{control:{type:"select",options:["pt-br","en"]}}}},te=(e,{argTypes:s})=>({props:Object.keys(s),components:{SidebarPrimary:I},template:`
    <sidebar-primary v-bind="$props" style="min-height: 300px;">
      <template v-slot:header>
        Header
      </template>

      <template #block-chats>
        Hello World!
      </template>

      <template #block-flows>
        Hello World!
      </template>
    </sidebar-primary>
  `}),c=te.bind({});c.args={expanded:!0,language:"pt-br",hideText:"Encolher",items:[{label:"Menu principal",items:[{label:"Início",active:!0,icon:"house-1-1",click(e){e.active=!e.active}}]},{label:"Sistemas",items:[{id:"flows",label:"Fluxos",active:!1,icon:"hierarchy-3-2",click(){}},{id:"ia",label:"Inteligência Artificial",active:!1,icon:"science-fiction-robot-2",click(){}},{id:"chats",label:"Agentes",active:!1,icon:"messaging-we-chat-3",click(){},notify:!0}]},{label:"Perfil",items:[{label:"Conta",active:!1,icon:"single-neutral-actions-1",click(){}}]}]};var x,k,S;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    SidebarPrimary
  },
  template: \`
    <sidebar-primary v-bind="$props" style="min-height: 300px;">
      <template v-slot:header>
        Header
      </template>

      <template #block-chats>
        Hello World!
      </template>

      <template #block-flows>
        Hello World!
      </template>
    </sidebar-primary>
  \`
})`,...(S=(k=c.parameters)==null?void 0:k.docs)==null?void 0:S.source}}};const ue=["Normal"];export{c as Normal,ue as __namedExportsOrder,me as default};
//# sourceMappingURL=SidebarPrimary.stories-fbccadfa.js.map
