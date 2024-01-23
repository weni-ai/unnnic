import{C as p}from"./CardStatusesContainer-99feb125.js";import{u as m}from"./config-28154cde.js";import{g as l,a as f,o as _}from"./vue.esm-bundler-3f98aba2.js";import{_ as g}from"./_plugin-vue_export-helper-c27b6911.js";import"./AvatarIcon-6b8edf9b.js";import"./Icon-b41b8868.js";import"./ToolTip-b379b431.js";const s={components:{CardStatusesContainer:p},props:{name:{type:String,default:""},subtitle:{type:String,default:""},description:{type:String,default:""},descriptionRow:{type:String,default:""},descriptionRowInfo:{type:String,default:""},statuses:{type:Array}},data(){return{unnnicFontSize:m}}};function y(c,e,n,C,u,I){const d=f("card-statuses-container");return _(),l(d,{class:"unnnic-card-information",name:n.name,subtitle:n.subtitle,description:n.description,"description-row":n.descriptionRow,"description-row-info":n.descriptionRowInfo,statuses:n.statuses,"min-status-width":8.75*u.unnnicFontSize+"px"},null,8,["name","subtitle","description","description-row","description-row-info","statuses","min-status-width"])}const r=g(s,[["render",y],["__scopeId","data-v-72181c6c"]]);s.__docgenInfo={exportName:"default",displayName:"CardInformation",description:"",tags:{},props:[{name:"name",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"subtitle",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"description",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"descriptionRow",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"descriptionRowInfo",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"statuses",type:{name:"array"}}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/CardInformation/CardInformation.vue"]};const F={title:"Card/CardInformation",component:r,argTypes:{}},w=(c,{argTypes:e})=>({props:Object.keys(e),components:{unnnicCardInformation:r},data(){return{}},template:`
    <div>
      <unnnic-card-information v-bind="$props">
      </unnnic-card-information>
    </div>
  `,methods:{}}),t=w.bind({});t.args={name:"Title Card",subtitle:"Subtitle",description:"Description",descriptionRow:"Description Row",descriptionRowInfo:"Description Row Info",statuses:[{title:"AI",icon:"science-fiction-robot-2",scheme:"aux-blue",count:1},{title:"Flows",icon:"hierarchy-3-2",scheme:"aux-purple",count:2},{title:"Contatos",icon:"single-neutral-actions-1",scheme:"aux-lemon",count:3},{title:"Contatos",icon:"single-neutral-actions-1",scheme:"aux-lemon",count:3}]};var o,a,i;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicCardInformation
  },
  data() {
    return {};
  },
  template: \`
    <div>
      <unnnic-card-information v-bind="$props">
      </unnnic-card-information>
    </div>
  \`,
  methods: {}
})`,...(i=(a=t.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};const T=["Default"];export{t as Default,T as __namedExportsOrder,F as default};
//# sourceMappingURL=CardInformation.stories-4e928f9b.js.map
