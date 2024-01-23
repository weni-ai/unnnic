import{v as U}from"./index-913e4039.js";import{U as x}from"./Icon-6670ffc4.js";import{u as z}from"./Radio-bac75fc8.js";import{d as s,t as i,g as v,f as a,m as R,u as j,F as f,n as _,x as F,e as b,M as A,o as n,k as B,l as w}from"./vue.esm-bundler-fb65849e.js";import{_ as G}from"./_plugin-vue_export-helper-c27b6911.js";const V={name:"UnnnicMultiSelect",components:{UnnnicIcon:x,UnnnicRadio:z},directives:{onClickOutside:U},props:{isOpen:{default:!1},expand:{default:!1},label:{type:String,default:""},modelValue:{type:Array,default:()=>[]},inputTitle:{type:String,default:"Teste"},hideRadio:{type:Boolean,default:!1},hideGroupTitle:{type:Boolean,default:!1},unselectable:{type:Boolean,default:!1}},data(){return{active:!1}},watch:{isOpen(){this.active=this.open}},methods:{handleIsOpenKeyboard(r){document.querySelector(".select-permission:focus-visible")&&r.keyCode===32&&(this.active=!this.active)},onClickOutside(){this.active&&(this.active=!1)},change(r,t){this.$emit("update:model-value",this.modelValue.map((e,y)=>{if(y===r){let l=t;return this.unselectable&&e.selected===t&&(l=-1),{...e,selected:l}}return e}))}}},N={key:0,class:"select-permission-label"},I={class:"title noselect"},D={key:1,class:"select-content",tabindex:"0"},K=["onClick"];function P(r,t,e,y,l,c){const S=b("UnnnicIcon"),O=b("UnnnicRadio"),T=A("on-click-outside");return n(),s("div",{class:F(e.expand?"expand-multiselect":"normal-multiselect"),tabindex:"-1"},[e.label?(n(),s("span",N,i(e.label),1)):v("",!0),a("div",{onKeypress:t[0]||(t[0]=(...o)=>c.handleIsOpenKeyboard&&c.handleIsOpenKeyboard(...o)),onClick:t[1]||(t[1]=o=>l.active=!l.active),class:"select-permission",tabindex:"0"},[a("h6",I,i(e.inputTitle),1),R(S,{icon:l.active?"arrow-button-up-1":"arrow-button-down-1",size:"sm",scheme:"neutral-dark"},null,8,["icon"])],32),l.active?j((n(),s("div",D,[a("div",null,[(n(!0),s(f,null,_(e.modelValue,(o,p)=>(n(),s(f,{key:`group-${p}`},[e.hideGroupTitle?v("",!0):(n(),s("h6",{class:"title",key:`title-${p}`},i(o.title),1)),a("section",null,[(n(!0),s(f,null,_(o.items,(m,u)=>(n(),s(f,{key:`item-${u}`},[e.hideRadio?(n(),s("div",{onClick:g=>c.change(p,u),key:u+"input",class:"unnnic-radio-container unnnic-radio-container--sm",style:{cursor:"pointer"}},[a("strong",null,i(m.title),1),a("span",null,i(m.description),1)],8,K)):(n(),B(O,{name:"","model-value":o.selected,"onUpdate:modelValue":g=>c.change(p,g),value:u,id:"",size:"sm",key:"else"+u+"input",class:""},{default:w(()=>[a("strong",null,i(m.title),1),a("span",null,i(m.description),1)],void 0),_:2},1032,["model-value","onUpdate:modelValue","value"]))],64))),128))])],64))),128))])])),[[T,c.onClickOutside]]):v("",!0)],2)}const M=G(V,[["render",P],["__scopeId","data-v-20d4d8cc"]]);V.__docgenInfo={displayName:"UnnnicMultiSelect",exportName:"default",description:"",tags:{},props:[{name:"isOpen",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"expand",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"label",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"modelValue",type:{name:"array"},defaultValue:{func:!1,value:"[]"}},{name:"inputTitle",type:{name:"string"},defaultValue:{func:!1,value:"'Teste'"}},{name:"hideRadio",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"hideGroupTitle",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"unselectable",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"update:model-value",type:{names:["undefined"]}}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/MultiSelect/MultiSelect.vue"]};const Q={title:"Form/MultiSelect",component:M,argTypes:{}},E=(r,{argTypes:t})=>({props:Object.keys(t),components:{unnnicMultiSelect:M},data(){return{groups:[{title:"Permissões Gerais",selected:0,items:[{title:"Moderador",description:"Gerencia membros do projeto e administra o rocket"},{title:"Contribuidor",description:"Consegue editar o projeto"},{title:"Vizualizador",description:"Apenas vizualiza o projeto"}]},{title:"Permissões do módulo chat",selected:0,items:[{title:"Gerente de Atendimento",description:"Consegue responder mensagens e criar grupos no Rocket"},{title:"Agente",description:"Consegue responder mensagens no Rocket"}]}]}},template:'<div><unnnicMultiSelect v-bind="$props" v-model="groups"></unnnicMultiSelect></div>'}),d=E.bind({});d.args={};var h,k,C;d.parameters={...d.parameters,docs:{...(h=d.parameters)==null?void 0:h.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicMultiSelect
  },
  data() {
    return {
      groups: [{
        title: 'Permissões Gerais',
        selected: 0,
        items: [{
          title: 'Moderador',
          description: 'Gerencia membros do projeto e administra o rocket'
        }, {
          title: 'Contribuidor',
          description: 'Consegue editar o projeto'
        }, {
          title: 'Vizualizador',
          description: 'Apenas vizualiza o projeto'
        }]
      }, {
        title: 'Permissões do módulo chat',
        selected: 0,
        items: [{
          title: 'Gerente de Atendimento',
          description: 'Consegue responder mensagens e criar grupos no Rocket'
        }, {
          title: 'Agente',
          description: 'Consegue responder mensagens no Rocket'
        }]
      }]
    };
  },
  // eslint-disable-next-line no-multi-str
  template: '<div><unnnicMultiSelect v-bind="$props" v-model="groups"></unnnicMultiSelect></div>'
})`,...(C=(k=d.parameters)==null?void 0:k.docs)==null?void 0:C.source}}};const X=["Medium"];export{d as Medium,X as __namedExportsOrder,Q as default};
