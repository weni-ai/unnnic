import{b as l,d as n,F as _,j as g,f as r,A as d,o as i,D as v,t as y}from"./vue.esm-bundler-afa73d68.js";import{_ as T}from"./_plugin-vue_export-helper-c27b6911.js";const b={model:{prop:"activeTab",event:"change"},props:{size:{type:String,default:"md",validator:e=>["md","sm"].includes(e)},activeTab:{type:String},initialTab:{type:String,default:null},tabs:{type:Array,default:null}},data(){return{localValue:""}},created(){const e=this.initialTab||this.activeTab||this.tabs&&this.tabs[0];this.change(e)},computed:{tabPanelSlotName(){return`tab-panel-${this.localValue}`}},watch:{activeTab(){this.localValue=this.activeTab}},methods:{tabHeadSlotName(e){return`tab-head-${e}`},change(e){this.localValue=e,this.$emit("change",this.localValue)}}},S={class:"tab-header"},N={class:"tab-content"},V=["onClick"],F={class:"tab-body"},C={class:"tab-panel"};function k(e,o,c,z,f,s){return i(),l("div",{class:d(["tab",`size-${c.size}`])},[n("header",S,[n("ul",N,[(i(!0),l(_,null,g(c.tabs,t=>(i(),l("li",{class:d(["tab-head",{"tab-head--active":f.localValue===t}]),key:t,onClick:x=>s.change(t)},[r(e.$slots,s.tabHeadSlotName(t),{},()=>[v(y(t),1)],!0)],10,V))),128))])]),n("main",F,[n("div",C,[r(e.$slots,s.tabPanelSlotName,{},void 0,!0)])])],2)}const h=T(b,[["render",k],["__scopeId","data-v-cfeaa8ef"]]);b.__docgenInfo={exportName:"default",displayName:"Tab",description:"",tags:{},props:[{name:"size",type:{name:"string"},defaultValue:{func:!1,value:"'md'"},values:["md","sm"]},{name:"v-model",type:{name:"string"}},{name:"initialTab",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"tabs",type:{name:"array"},defaultValue:{func:!1,value:"null"}}],events:[{name:"change",type:{names:["undefined"]}}],slots:[{name:"tabHeadSlotName(tab)",scoped:!0,bindings:[{name:"name",title:"binding"}]},{name:"tabPanelSlotName",scoped:!0,bindings:[{name:"name",title:"binding"}]}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Tab/Tab.vue"]};const B={title:"tabs/Tab",component:h,argTypes:{size:{control:{type:"select",options:["md","sm"]}}}},$=(e,{argTypes:o})=>({props:Object.keys(o),components:{unnnicTab:h},template:`
  <unnnic-tab v-bind="$props">
      <template slot="tab-head-first">
        First
      </template>
      <template slot="tab-panel-first">
        <h2 class="title">First Content</h2>
        <p class="description">
        First description
        </p>
      </template>
      <template slot="tab-head-second">
        Second
      </template>
      <template slot="tab-panel-second">
        <h2 class="title">Second Content</h2>
        <p class="description">
          Second description
        </p>
      </template>
  </unnnic-tab>
  `}),a=$.bind({});a.args={initialTab:"first",tabs:["first","second"]};var p,m,u;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicTab
  },
  template: \`
  <unnnic-tab v-bind="$props">
      <template slot="tab-head-first">
        First
      </template>
      <template slot="tab-panel-first">
        <h2 class="title">First Content</h2>
        <p class="description">
        First description
        </p>
      </template>
      <template slot="tab-head-second">
        Second
      </template>
      <template slot="tab-panel-second">
        <h2 class="title">Second Content</h2>
        <p class="description">
          Second description
        </p>
      </template>
  </unnnic-tab>
  \`
})`,...(u=(m=a.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};const E=["Default"];export{a as Default,E as __namedExportsOrder,B as default};
//# sourceMappingURL=Tab.stories-c49837fe.js.map
