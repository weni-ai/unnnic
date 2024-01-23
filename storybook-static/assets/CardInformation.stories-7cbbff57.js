import{C as p}from"./CardStatusesContainer-153067f3.js";import{u as m}from"./config-28154cde.js";import{k as l,e as f,o as _}from"./vue.esm-bundler-fb65849e.js";import{_ as y}from"./_plugin-vue_export-helper-c27b6911.js";import"./AvatarIcon-333cb133.js";import"./Icon-6670ffc4.js";import"./ToolTip-7d326e2a.js";const s={components:{CardStatusesContainer:p},props:{name:{type:String,default:""},subtitle:{type:String,default:""},description:{type:String,default:""},descriptionRow:{type:String,default:""},descriptionRowInfo:{type:String,default:""},statuses:{type:Array}},data(){return{unnnicFontSize:m}}};function g(c,t,n,C,u,I){const d=f("card-statuses-container");return _(),l(d,{class:"unnnic-card-information",name:n.name,subtitle:n.subtitle,description:n.description,"description-row":n.descriptionRow,"description-row-info":n.descriptionRowInfo,statuses:n.statuses,"min-status-width":8.75*u.unnnicFontSize+"px"},null,8,["name","subtitle","description","description-row","description-row-info","statuses","min-status-width"])}const r=y(s,[["render",g],["__scopeId","data-v-72181c6c"]]);s.__docgenInfo={exportName:"default",displayName:"CardInformation",description:"",tags:{},props:[{name:"name",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"subtitle",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"description",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"descriptionRow",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"descriptionRowInfo",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"statuses",type:{name:"array"}}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/CardInformation/CardInformation.vue"]};const k={title:"Card/CardInformation",component:r,argTypes:{}},w=(c,{argTypes:t})=>({props:Object.keys(t),components:{unnnicCardInformation:r},data(){return{}},template:`
    <div>
      <unnnic-card-information v-bind="$props">
      </unnnic-card-information>
    </div>
  `,methods:{}}),e=w.bind({});e.args={name:"Title Card",subtitle:"Subtitle",description:"Description",descriptionRow:"Description Row",descriptionRowInfo:"Description Row Info",statuses:[{title:"AI",icon:"science-fiction-robot-2",scheme:"aux-blue",count:1},{title:"Flows",icon:"hierarchy-3-2",scheme:"aux-purple",count:2},{title:"Contatos",icon:"single-neutral-actions-1",scheme:"aux-lemon",count:3},{title:"Contatos",icon:"single-neutral-actions-1",scheme:"aux-lemon",count:3}]};var o,a,i;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`(args, {
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
})`,...(i=(a=e.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};const F=["Default"];export{e as Default,F as __namedExportsOrder,k as default};
