import{u as k}from"./ToolTip-7d326e2a.js";import{U as v}from"./Icon-6670ffc4.js";import{d as a,f as s,x as c,y as b,t as x,k as I,l as T,g as r,j as l,e as p,o,m as w}from"./vue.esm-bundler-fb65849e.js";import{_ as C}from"./_plugin-vue_export-helper-c27b6911.js";import{U as L}from"./ButtonIcon-60c8efda.js";import{c as S}from"./colorsList-72763225.js";const f={components:{UnnnicToolTip:k,UnnnicIcon:v},props:{size:{type:String,default:"normal"},title:{type:String},titleColor:{type:String,default:"brand-weni-soft"},info:{type:String}},data(){return{isScrollable:!1}},mounted(){const e=this.$refs.description.scrollHeight-this.$refs.description.offsetHeight;this.isScrollable=e}},z={class:"header"},N={class:"description",ref:"description"},U={key:0,class:"scrollable-gradient"};function B(e,i,t,D,y,$){const g=p("unnnic-icon"),_=p("unnnic-tool-tip");return o(),a("div",{class:c(["unnnic-chat-text",t.size])},[s("div",z,[s("div",{class:c(["title",t.titleColor])},[b(x(t.title)+" ",1),t.info?(o(),I(_,{key:0,side:"top",class:"info",text:t.info,enabled:""},{default:T(()=>[w(g,{class:"info__icon",icon:"info",size:"sm",scheme:"neutral-clean"})],void 0),_:1},8,["text"])):r("",!0)],2),l(e.$slots,"actions",{},void 0,!0)]),s("div",N,[l(e.$slots,"description",{},void 0,!0),y.isScrollable?(o(),a("div",U)):r("",!0)],512)],2)}const h=C(f,[["render",B],["__scopeId","data-v-7daa2167"]]);f.__docgenInfo={exportName:"default",displayName:"ChatText",description:"",tags:{},props:[{name:"size",type:{name:"string"},defaultValue:{func:!1,value:"'normal'"}},{name:"title",type:{name:"string"}},{name:"titleColor",type:{name:"string"},defaultValue:{func:!1,value:"'brand-weni-soft'"}},{name:"info",type:{name:"string"}}],slots:[{name:"actions"},{name:"description"}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/ChatText/ChatText.vue"]};const M={title:"example/ChatText",component:h,argTypes:{size:{control:{type:"select",options:["normal","small"]}},titleColor:{control:{type:"select",options:S}}}},V=(e,{argTypes:i})=>({props:Object.keys(i),components:{unnnicChatText:h,UnnnicButtonIcon:L},data(){return{}},template:`
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
  `,methods:{click(){console.log("clicked")}}}),n=V.bind({});n.args={title:"Title",info:"Info"};var d,m,u;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`(args, {
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
