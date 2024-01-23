import{u as k}from"./ToolTip-b379b431.js";import{U as b}from"./Icon-b41b8868.js";import{b as a,d as s,A as c,D as v,t as x,g as w,w as I,e as l,f as r,a as p,o,i as C}from"./vue.esm-bundler-3f98aba2.js";import{_ as T}from"./_plugin-vue_export-helper-c27b6911.js";import{U as L}from"./ButtonIcon-a0071d40.js";import{c as S}from"./colorsList-72763225.js";const f={components:{UnnnicToolTip:k,UnnnicIcon:b},props:{size:{type:String,default:"normal"},title:{type:String},titleColor:{type:String,default:"brand-weni-soft"},info:{type:String}},data(){return{isScrollable:!1}},mounted(){const e=this.$refs.description.scrollHeight-this.$refs.description.offsetHeight;this.isScrollable=e}},z={class:"header"},N={class:"description",ref:"description"},U={key:0,class:"scrollable-gradient"};function B(e,i,t,D,y,$){const g=p("unnnic-icon"),_=p("unnnic-tool-tip");return o(),a("div",{class:c(["unnnic-chat-text",t.size])},[s("div",z,[s("div",{class:c(["title",t.titleColor])},[v(x(t.title)+" ",1),t.info?(o(),w(_,{key:0,side:"top",class:"info",text:t.info,enabled:""},{default:I(()=>[C(g,{class:"info__icon",icon:"info",size:"sm",scheme:"neutral-clean"})],void 0),_:1},8,["text"])):l("",!0)],2),r(e.$slots,"actions",{},void 0,!0)]),s("div",N,[r(e.$slots,"description",{},void 0,!0),y.isScrollable?(o(),a("div",U)):l("",!0)],512)],2)}const h=T(f,[["render",B],["__scopeId","data-v-7daa2167"]]);f.__docgenInfo={exportName:"default",displayName:"ChatText",description:"",tags:{},props:[{name:"size",type:{name:"string"},defaultValue:{func:!1,value:"'normal'"}},{name:"title",type:{name:"string"}},{name:"titleColor",type:{name:"string"},defaultValue:{func:!1,value:"'brand-weni-soft'"}},{name:"info",type:{name:"string"}}],slots:[{name:"actions"},{name:"description"}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/ChatText/ChatText.vue"]};const M={title:"example/ChatText",component:h,argTypes:{size:{control:{type:"select",options:["normal","small"]}},titleColor:{control:{type:"select",options:S}}}},V=(e,{argTypes:i})=>({props:Object.keys(i),components:{unnnicChatText:h,UnnnicButtonIcon:L},data(){return{}},template:`
    <div>
      <unnnic-chat-text v-bind="$props" @action="click">
        <template slot="actions">
          <unnnic-button-icon
            @click="click"
            type="secondary"
            size="small"
            icon="pencil-write-1"
          ></unnnic-button-icon>
        </template>

        <template slot="description">
          <span class="intent">Lorem</span> Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </template>
      </unnnic-chat-text>
    </div>
  `,methods:{click(){console.log("clicked")}}}),n=V.bind({});n.args={title:"Title",info:"Info",size:"small",titleColor:"brand-weni-soft"};var d,m,u;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicChatText,
    UnnnicButtonIcon
  },
  data() {
    return {};
  },
  template: \`
    <div>
      <unnnic-chat-text v-bind="$props" @action="click">
        <template slot="actions">
          <unnnic-button-icon
            @click="click"
            type="secondary"
            size="small"
            icon="pencil-write-1"
          ></unnnic-button-icon>
        </template>

        <template slot="description">
          <span class="intent">Lorem</span> Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </template>
      </unnnic-chat-text>
    </div>
  \`,
  methods: {
    click() {
      console.log('clicked');
    }
  }
})`,...(u=(m=n.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};const P=["Default"];export{n as Default,P as __namedExportsOrder,M as default};
//# sourceMappingURL=ChatText.stories-f39ba529.js.map
