import{u as _}from"./ToolTip-7d326e2a.js";import{d as m,f as e,t as s,j as l,m as y,l as f,e as v,o as g}from"./vue.esm-bundler-fb65849e.js";import{_ as x}from"./_plugin-vue_export-helper-c27b6911.js";import{u as b}from"./Button-c6487f3f.js";import{u as h}from"./config-28154cde.js";import"./Icon-6670ffc4.js";const d={name:"unnnic-data-area",components:{ToolTip:_},props:{title:{type:String,default:null},text:{type:String,default:null},enableHover:{type:Boolean,default:!1},hoverText:{type:String,default:""}}},k={class:"data-area-container"},S={class:"data-area-container__header"},D={class:"data-area-container__header__title"},T={class:"data-area-container__header__links-slot"},A={class:"data-area-container__content"},C={class:"data-area-container__content__text"},z={class:"data-area-container__content__buttons-slot"};function B(a,o,n,$,N,F){const u=v("tool-tip");return g(),m("div",k,[e("div",S,[e("div",D,s(n.title),1),e("div",T,[l(a.$slots,"links",{},void 0,!0)])]),e("div",A,[y(u,{enabled:n.enableHover,text:n.hoverText},{default:f(()=>[e("div",C,s(n.text),1)],void 0),_:1},8,["enabled","text"]),e("div",z,[l(a.$slots,"buttons",{},void 0,!0)])])])}const p=x(d,[["render",B],["__scopeId","data-v-5da8d8d6"]]);d.__docgenInfo={displayName:"unnnic-data-area",exportName:"default",description:"",tags:{},props:[{name:"title",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"text",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"enableHover",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"hoverText",type:{name:"string"},defaultValue:{func:!1,value:"''"}}],slots:[{name:"links"},{name:"buttons"}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/DataArea/DataArea.vue"]};const O={title:"example/DataArea",component:p,argTypes:{title:{control:{type:"text"}},text:{control:{type:"text"}},enableHover:{control:{type:"boolean"}},hoverText:{control:{type:"text"}}}},V=(a,{argTypes:o})=>({props:Object.keys(o),components:{unnnicDataArea:p,unnnicButton:b},data(){return{slotStyle:{display:"flex",gap:`${.5*h}px`,color:"red"},linkStyle:{color:"DimGray"}}},template:`
    <div>
      <unnnic-data-area v-bind="$props">
        <template v-slot:links>
          <div :style="slotStyle">
            <a href="#" :style="linkStyle">Link1</a>
            <a href="#" :style="linkStyle">Link2</a>
          </div>
        </template>

        <template v-slot:buttons>
          <div :style="slotStyle">
            <unnnic-button
              slot="trigger"
              size="small"
              type="secondary"
              iconCenter="copy-paste-1"
            />
            <unnnic-button
              slot="trigger"
              size="small"
              type="secondary"
              iconCenter="button-refresh-arrows-1"
            />
          </div>
        </template>
      </unnnic-data-area>
    </div>
  `,methods:{click(){console.log("clicked")}}}),t=V.bind({});t.args={title:"Title text",text:"1e65416859c4cdff11cf94a70ce7395eba0f494d"};var r,i,c;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicDataArea,
    unnnicButton
  },
  data() {
    return {
      slotStyle: {
        display: 'flex',
        gap: \`\${0.5 * unnnicFontSize}px\`,
        color: 'red'
      },
      linkStyle: {
        color: 'DimGray'
      }
    };
  },
  template: \`
    <div>
      <unnnic-data-area v-bind="$props">
        <template v-slot:links>
          <div :style="slotStyle">
            <a href="#" :style="linkStyle">Link1</a>
            <a href="#" :style="linkStyle">Link2</a>
          </div>
        </template>

        <template v-slot:buttons>
          <div :style="slotStyle">
            <unnnic-button
              slot="trigger"
              size="small"
              type="secondary"
              iconCenter="copy-paste-1"
            />
            <unnnic-button
              slot="trigger"
              size="small"
              type="secondary"
              iconCenter="button-refresh-arrows-1"
            />
          </div>
        </template>
      </unnnic-data-area>
    </div>
  \`,
  methods: {
    click() {
      console.log('clicked');
    }
  }
})`,...(c=(i=t.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};const G=["Default"];export{t as Default,G as __namedExportsOrder,O as default};
