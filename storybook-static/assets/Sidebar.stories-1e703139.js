import{d as c,f as r,j as s,x as I,o as d,e as p,m as b,l as B,y as F,t as h}from"./vue.esm-bundler-fb65849e.js";import{_ as l}from"./_plugin-vue_export-helper-c27b6911.js";import{U}from"./Icon-6670ffc4.js";import{u as f}from"./ToolTip-7d326e2a.js";const T={name:"unnnic-sidebar",props:{expanded:{type:Boolean,default:!0}}},j={class:"unnnic-side-bar__header"},D={class:"unnnic-side-bar__footer"};function O(n,t,e,u,m,o){return d(),c("div",{class:I({"unnnic-side-bar":!0,"unnnic-side-bar--contracted":!e.expanded})},[r("div",j,[s(n.$slots,"header")]),s(n.$slots,"default"),r("div",D,[s(n.$slots,"footer")])],2)}const $=l(T,[["render",O]]);T.__docgenInfo={displayName:"unnnic-sidebar",exportName:"default",description:"",tags:{},props:[{name:"expanded",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}}],slots:[{name:"header"},{name:"default"},{name:"footer"}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Sidebar/Sidebar.vue"]};const k={name:"SidebarItem",components:{UIcon:U,ToolTip:f},data(){return{ToolTip:f}},props:{active:{type:Boolean,default:!1},expanded:{type:Boolean,default:!1},icon:{type:String,default:null},text:{type:String,default:null},enableTooltip:{default:!1}},methods:{onClick(){this.$emit("click")}}},W={class:"unnnic-side-bar-item__label"};function w(n,t,e,u,m,o){const V=p("u-icon"),E=p("tool-tip");return d(),c("div",{class:I({"unnnic-side-bar-item":!0,"unnnic-side-bar-item--active":e.active,"unnnic--clickable":!0}),onClick:t[0]||(t[0]=(...M)=>o.onClick&&o.onClick(...M))},[b(E,{enabled:e.enableTooltip,text:e.text,side:"right"},{default:B(()=>[b(V,{class:"unnnic-side-bar-item__icon",scheme:e.active?"brand-weni-soft":"neutral-cloudy",size:"sm",icon:e.icon},null,8,["scheme","icon"]),r("span",W,[F(h(e.text)+" ",1),s(n.$slots,"default")])],void 0),_:3},8,["enabled","text"])],2)}const z=l(k,[["render",w]]);k.__docgenInfo={displayName:"SidebarItem",exportName:"default",description:"",tags:{},props:[{name:"active",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"expanded",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"icon",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"text",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"enableTooltip",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"click"}],slots:[{name:"default"}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Sidebar/SidebarItem.vue"]};const C={name:"unnnicSidebarMenu",props:{text:{type:String,default:null}}},q={class:"unnnic-side-bar-menu"},A={class:"unnnic-side-bar-menu__title"};function G(n,t,e,u,m,o){return d(),c("div",q,[r("p",A,h(e.text),1),s(n.$slots,"default")])}const H=l(C,[["render",G]]);C.__docgenInfo={displayName:"unnnicSidebarMenu",exportName:"default",description:"",tags:{},props:[{name:"text",type:{name:"string"},defaultValue:{func:!1,value:"null"}}],slots:[{name:"default"}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Sidebar/SidebarMenu.vue"]};const Q={title:"Example/Sidebar",component:$,argTypes:{expanded:{control:{type:"boolean"}}}},N=(n,{argTypes:t})=>({props:Object.keys(t),components:{unnnicSidebar:$,unnnicSidebarItem:z,unnnicSidebarMenu:H},template:'<unnnic-sidebar v-bind="$props">                 <p slot="header"> Title </p>                 <unnnic-sidebar-item icon="expand-8-1" text="footer" slot="footer" />                 <unnnic-sidebar-menu text="Submenu">                   <unnnic-sidebar-item :enable-tooltip="!expanded" text="Item1" icon="developer-community-github-1-1" :active="true" />                   <unnnic-sidebar-item :enable-tooltip="!expanded" text="Item2" icon="alarm-bell-2" />                 </unnnic-sidebar-menu>                 <unnnic-sidebar-menu text="Submenu 2">                   <unnnic-sidebar-item :enable-tooltip="!expanded" text="Item3" icon="alarm-bell-2" />                 </unnnic-sidebar-menu>               </unnnic-sidebar>'}),a=N.bind({});a.args={};const i=N.bind({});i.args={expanded:!1};var _,x,v;a.parameters={...a.parameters,docs:{...(_=a.parameters)==null?void 0:_.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicSidebar,
    unnnicSidebarItem,
    unnnicSidebarMenu
  },
  template: '<unnnic-sidebar v-bind="$props"> \\\r
                <p slot="header"> Title </p> \\\r
                <unnnic-sidebar-item icon="expand-8-1" text="footer" slot="footer" /> \\\r
                <unnnic-sidebar-menu text="Submenu"> \\\r
                  <unnnic-sidebar-item :enable-tooltip="!expanded" text="Item1" icon="developer-community-github-1-1" :active="true" /> \\\r
                  <unnnic-sidebar-item :enable-tooltip="!expanded" text="Item2" icon="alarm-bell-2" /> \\\r
                </unnnic-sidebar-menu> \\\r
                <unnnic-sidebar-menu text="Submenu 2"> \\\r
                  <unnnic-sidebar-item :enable-tooltip="!expanded" text="Item3" icon="alarm-bell-2" /> \\\r
                </unnnic-sidebar-menu> \\\r
              </unnnic-sidebar>'
})`,...(v=(x=a.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};var y,S,g;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicSidebar,
    unnnicSidebarItem,
    unnnicSidebarMenu
  },
  template: '<unnnic-sidebar v-bind="$props"> \\\r
                <p slot="header"> Title </p> \\\r
                <unnnic-sidebar-item icon="expand-8-1" text="footer" slot="footer" /> \\\r
                <unnnic-sidebar-menu text="Submenu"> \\\r
                  <unnnic-sidebar-item :enable-tooltip="!expanded" text="Item1" icon="developer-community-github-1-1" :active="true" /> \\\r
                  <unnnic-sidebar-item :enable-tooltip="!expanded" text="Item2" icon="alarm-bell-2" /> \\\r
                </unnnic-sidebar-menu> \\\r
                <unnnic-sidebar-menu text="Submenu 2"> \\\r
                  <unnnic-sidebar-item :enable-tooltip="!expanded" text="Item3" icon="alarm-bell-2" /> \\\r
                </unnnic-sidebar-menu> \\\r
              </unnnic-sidebar>'
})`,...(g=(S=i.parameters)==null?void 0:S.docs)==null?void 0:g.source}}};const R=["Expanded","Contracted"];export{i as Contracted,a as Expanded,R as __namedExportsOrder,Q as default};
