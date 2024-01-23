import{C as y}from"./CardStatusesContainer-153067f3.js";import{U as p}from"./Icon-6670ffc4.js";import{u as j,a as x}from"./DropdownItem-14e4d618.js";import{u as b}from"./Tag-c0d051ed.js";import{k as s,l as a,e as o,o as r,f as w,m as i,j as h,g as I}from"./vue.esm-bundler-fb65849e.js";import{_ as k}from"./_plugin-vue_export-helper-c27b6911.js";import"./AvatarIcon-333cb133.js";import"./ToolTip-7d326e2a.js";import"./config-28154cde.js";import"./index-913e4039.js";const l={components:{CardStatusesContainer:y,unnnicIcon:p,unnnicDropdown:j,unnnicTag:b},props:{name:{type:String,default:""},statuses:{type:Array},actionText:{type:String}}},P={class:"buttons"};function T(e,t,c,$,D,z){const g=o("unnnic-tag"),f=o("unnnic-icon"),C=o("unnnic-dropdown"),v=o("card-statuses-container");return r(),s(v,{class:"unnnic-card-project",name:c.name,statuses:c.statuses},{"header-buttons":a(()=>[w("div",P,[i(g,{class:"action",onClick:t[0]||(t[0]=E=>e.$emit("action")),clickable:"",text:c.actionText,scheme:"aux-blue"},null,8,["text"]),e.$slots.actions?(r(),s(C,{key:0,position:"bottom-left"},{trigger:a(()=>[i(f,{size:"sm",icon:"navigation-menu-vertical-1",clickable:"",scheme:"neutral-cleanest"})]),default:a(()=>[h(e.$slots,"actions",{},void 0,!0)],void 0,!0),_:3})):I("",!0)])]),_:3},8,["name","statuses"])}const _=k(l,[["render",T],["__scopeId","data-v-9acc7755"]]);l.__docgenInfo={exportName:"default",displayName:"CardProject",description:"",tags:{},props:[{name:"name",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"statuses",type:{name:"array"}},{name:"actionText",type:{name:"string"}}],events:[{name:"action"}],slots:[{name:"actions"}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/CardProject/CardProject.vue"]};const H={title:"Card/CardProject",component:_,argTypes:{}},N=(e,{argTypes:t})=>({props:Object.keys(t),components:{unnnicCardProject:_,unnnicDropdownItem:x,unnnicIcon:p},data(){return{}},template:`
    <div>
      <unnnic-card-project v-bind="$props">
        <template v-slot:actions>
          <unnnic-dropdown-item>
            <unnnic-icon size="sm" icon="cog-1" />
            Configuração
          </unnnic-dropdown-item>

          <unnnic-dropdown-item>
            <unnnic-icon size="sm" icon="single-neutral-actions-1" />
            Gerenciar membros
          </unnnic-dropdown-item>
        </template>
      </unnnic-card-project>
    </div>
  `,methods:{}}),n=N.bind({});n.args={name:"Nome do Projeto",actionText:"Entrar",statuses:[{title:"AI",icon:"science-fiction-robot-2",scheme:"aux-blue",count:1},{title:"Flows",icon:"hierarchy-3-2",scheme:"aux-purple",count:2},{title:"Contatos",icon:"single-neutral-actions-1",scheme:"aux-lemon",count:3}]};var u,m,d;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicCardProject,
    unnnicDropdownItem,
    unnnicIcon
  },
  data() {
    return {};
  },
  template: \`
    <div>
      <unnnic-card-project v-bind="$props">
        <template v-slot:actions>
          <unnnic-dropdown-item>
            <unnnic-icon size="sm" icon="cog-1" />
            Configuração
          </unnnic-dropdown-item>

          <unnnic-dropdown-item>
            <unnnic-icon size="sm" icon="single-neutral-actions-1" />
            Gerenciar membros
          </unnnic-dropdown-item>
        </template>
      </unnnic-card-project>
    </div>
  \`,
  methods: {}
})`,...(d=(m=n.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};const J=["Default"];export{n as Default,J as __namedExportsOrder,H as default};
