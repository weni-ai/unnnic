import{U as b}from"./Icon-777631f3.js";import{b as i,d,F as v,j as k,a as y,o,A as L,i as N}from"./vue.esm-bundler-afa73d68.js";import{_ as C}from"./_plugin-vue_export-helper-c27b6911.js";const f={name:"unnnic-chats-navbar",components:{UnnnicIcon:b},props:{links:{type:Array,required:!0,default:()=>[{name:"",icon:{default:"",selected:""},action:()=>{}}],validator(e){if(e.length===0)return!1;function a(t){const r=typeof t.name=="string",l=typeof t.icon.default=="string",s=typeof t.action=="function";return r&&l&&s}return e.every(a)}},initialLink:{type:String,required:!1}},data(){return{selectedLink:null}},methods:{selectLink(e){this.selectedLink=e},isSelected(e){return this.selectedLink===e}},mounted(){if(this.initialLink){const e=this.links.find(a=>a.name===this.initialLink);this.selectLink(e)}}},V={class:"unnnic-chats-navbar"},x={class:"unnnic-chats-navbar__list"},S=["onClick"];function T(e,a,t,r,l,s){const _=y("unnnic-icon");return o(),i("nav",V,[d("ol",x,[(o(!0),i(v,null,k(t.links,(n,g)=>(o(),i("li",{key:n.icon+g},[d("a",{class:L(["unnnic-chats-navbar__link","unnnic--clickable",{selected:s.isSelected(n)}]),onClick:()=>{s.selectLink(n),n.action()}},[N(_,{icon:s.isSelected(n)?n.icon.selected:n.icon.default,size:"lg",scheme:"neutral-snow"},null,8,["icon"])],10,S)]))),128))])])}const h=C(f,[["render",T]]);f.__docgenInfo={displayName:"unnnic-chats-navbar",exportName:"default",description:"",tags:{},props:[{name:"links",type:{name:"array"},required:!0,defaultValue:{func:!1,value:`[\r
  {\r
    name: '',\r
    icon: {\r
      default: '',\r
      selected: '',\r
    },\r
    action: () => {},\r
  },\r
]`}},{name:"initialLink",type:{name:"string"},required:!1}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/ChatsNavbar/ChatsNavbar.vue"]};const w={title:"Chats/Navbar",component:h,argTypes:{links:[{icon:"add-1",action:()=>{}}]}},q=(e,{argTypes:a})=>({props:Object.keys(a),components:{unnnicChatsNavbar:h},template:'<unnnic-chats-navbar v-bind="$props"/>'}),c=q.bind({});c.args={links:[{name:"house",icon:{default:"house-1-1",selected:"house-2-2"},action:()=>{}},{name:"messaging",icon:{default:"messaging-we-chat-3",selected:"messaging-we-chat-2"},action:()=>{}},{name:"folder",icon:{default:"folder-1",selected:"folder-2"},action:()=>{}},{name:"gauge",icon:{default:"gauge-dashboard-2",selected:"gauge-dashboard-1"},action:()=>{}},{name:"cog",icon:{default:"cog-1",selected:"cog-2"},action:()=>{}}],initialLink:"house"};var u,m,p;c.parameters={...c.parameters,docs:{...(u=c.parameters)==null?void 0:u.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicChatsNavbar
  },
  template: '<unnnic-chats-navbar v-bind="$props"/>'
})`,...(p=(m=c.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const A=["Default"];export{c as Default,A as __namedExportsOrder,w as default};
//# sourceMappingURL=ChatsNavbar.stories-9eb67515.js.map
