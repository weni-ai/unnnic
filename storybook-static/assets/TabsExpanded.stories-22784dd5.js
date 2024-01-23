import{U as h}from"./Icon-6670ffc4.js";import{d as l,f as o,m,F as f,n as k,e as I,o as c,x as T,t as p,L as C,g as E}from"./vue.esm-bundler-fb65849e.js";import{_ as $}from"./_plugin-vue_export-helper-c27b6911.js";const _={components:{UnnnicIcon:h},props:{modelValue:{type:[String,Number]},items:{type:Array}}},N={class:"unnnic-tabs-expanded"},V=["onClick"],U={class:"u font secondary body-sm color-neutral-cloudy"},B={key:0,class:"close-container"};function D(t,n,a,i,r,u){const s=I("unnnic-icon");return c(),l("div",N,[o("div",{class:"back-container",onClick:n[0]||(n[0]=e=>t.$emit("back"))},[m(s,{icon:"keyboard-arrow-left-1",scheme:"neutral-cloudy"})]),(c(!0),l(f,null,k(a.items,e=>(c(),l("div",{class:"tab",key:e.value,onClick:g=>t.$emit("update:model-value",e.value)},[o("div",null,[o("div",{class:T(["u font secondary body-gt bold",e.value===a.modelValue?"color-brand-weni-soft":"color-neutral-cloudy"])},p(e.title),3),o("div",U,p(e.description),1)]),e.value===a.modelValue?(c(),l("div",B,[m(s,{onClick:C(g=>t.$emit("close-tab",e),["stop"]),icon:"close-1",size:"xs",scheme:"neutral-cloudy"},null,8,["onClick"])])):E("",!0)],8,V))),128)),o("div",{class:"add-container",onClick:n[1]||(n[1]=e=>t.$emit("add"))},[m(s,{icon:"add-1",scheme:"neutral-cloudy",size:"sm"})])])}const y=$(_,[["render",D],["__scopeId","data-v-07527936"]]);_.__docgenInfo={exportName:"default",displayName:"TabsExpanded",description:"",tags:{},props:[{name:"modelValue",type:{name:"string|number"}},{name:"items",type:{name:"array"}}],events:[{name:"back"},{name:"update:model-value"},{name:"close-tab"},{name:"add"}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/TabsExpanded/TabsExpanded.vue"]};const z={title:"tabs/TabsExpanded",component:y,argTypes:{"on-update:model-value":{action:"@update:model-value"},"on-back":{action:"@back"},"on-add":{action:"@add"},"on-close-tab":{action:"@close-tab"}}},F=(t,{argTypes:n})=>({components:{UnnnicTabsExpanded:y},props:Object.keys(n),data(){return{v:"uuid2",lItems:[]}},created(){this.lItems=this.items},methods:{lCloseTab(a){var r,u;const i=this.lItems.findIndex(({value:s})=>s===a.value);this.lItems.splice(i,1),this.v=((r=this.lItems[i])==null?void 0:r.value)||((u=this.lItems[i-1])==null?void 0:u.value)}},template:'<div><pre>v-model: {{ v }}</pre><unnnic-tabs-expanded  v-bind="$props" v-model="v" @close-tab="lCloseTab"></unnnic-tabs-expanded></div>'}),d=F.bind({});d.args={items:[{title:"Suporte",description:"Última edição há 5 minutos",value:"uuid1"},{title:"Boas vindas",description:"Última edição agora há pouco",value:"uuid2"},{title:"Atendimento",description:"Última edição em 4 de janeiro",value:"uuid3"},{title:"Texto grande texto grande texto grande",description:"Texto grande texto grande texto grande",value:"uuid4"}]};var v,b,x;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  components: {
    UnnnicTabsExpanded
  },
  props: Object.keys(argTypes),
  data() {
    return {
      v: 'uuid2',
      lItems: []
    };
  },
  created() {
    this.lItems = this.items;
  },
  methods: {
    lCloseTab(tab) {
      const index = this.lItems.findIndex(({
        value
      }) => value === tab.value);
      this.lItems.splice(index, 1);
      this.v = this.lItems[index]?.value || this.lItems[index - 1]?.value;
    }
  },
  template: '<div><pre>v-model: {{ v }}</pre><unnnic-tabs-expanded  v-bind="$props" v-model="v" @close-tab="lCloseTab"></unnnic-tabs-expanded></div>'
})`,...(x=(b=d.parameters)==null?void 0:b.docs)==null?void 0:x.source}}};const O=["Default"];export{d as Default,O as __namedExportsOrder,z as default};
