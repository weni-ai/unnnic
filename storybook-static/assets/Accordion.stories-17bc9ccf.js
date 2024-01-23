import{U as v}from"./Icon-6670ffc4.js";import{d as h,f as s,m as f,x as a,t as g,u as _,v as y,j as i,p as q,e as b,o as k}from"./vue.esm-bundler-fb65849e.js";import{_ as S}from"./_plugin-vue_export-helper-c27b6911.js";import{u as A}from"./Button-c6487f3f.js";const r={components:{unnnicIconSvg:v},props:{open:{type:Boolean,default:!1},title:{type:String}},data(){return{height:0,setHeightToNull:null}},mounted(){this.open&&(this.height=null)},watch:{open(e){clearTimeout(this.setHeightToNull),e?(this.height=`${this.$refs.content.scrollHeight}px`,this.setHeightToNull=setTimeout(()=>{this.height=null},200)):(this.height=`${this.$refs.content.scrollHeight}px`,setTimeout(()=>{this.height=0},0))}}},N={class:"header"},T={class:"actions"};function x(e,o,n,B,p,C){const m=b("unnnic-icon-svg");return k(),h("div",{onClick:o[0]||(o[0]=D=>e.$emit("update:open",!n.open)),class:"unnnic-accordion"},[s("div",N,[f(m,{icon:n.open?"subtract-circle-1":"add-circle-1",scheme:"neutral-clean",size:"md"},null,8,["icon"]),s("div",{class:a(["title",{open:n.open}])},g(n.title),3),_(s("div",T,[i(e.$slots,"actions",{},void 0,!0)],512),[[y,n.open]])]),s("div",{ref:"content",class:a(["content",{open:n.open}]),style:q({height:p.height})},[i(e.$slots,"default",{},void 0,!0)],6)])}const d=S(r,[["render",x],["__scopeId","data-v-0b99a073"]]);r.__docgenInfo={exportName:"default",displayName:"Accordion",description:"",tags:{},props:[{name:"open",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"title",type:{name:"string"}}],events:[{name:"update:open"}],slots:[{name:"actions"},{name:"default"}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Accordion/Accordion.vue"]};const V={title:"accordion/Accordion",component:d,argTypes:{open:{control:{type:"boolean"}},title:{control:{type:"text"}}}},$=(e,{argTypes:o})=>({props:Object.keys(o),components:{unnnicAccordion:d,unnnicButton:A},data(){return{o:!1}},template:`
    <div>
      <pre>v-model:open {{ o }}</pre>
      <unnnic-accordion v-bind="$props" v-model:open="o">
        <template v-slot:actions>
          <unnnic-button @click.stop="click" type="secondary" size="small" icon-left="button-play-1">Assista ao vídeo</unnnic-button>
        </template>

        Quae assumenda aut non nulla quod ratione odio. Suscipit voluptatem natus a. Cumque et delectus ut. Nostrum ratione eos voluptatem voluptatu quia quod qui. Velit in consequatur corrupti similique. Quae assumenda aut non nulla quod ratione odio. Suscipit voluptatem natus a.
      </unnnic-accordion>
    </div>
  `,methods:{click(){console.log("clicked test 2")}}}),t=$.bind({});t.args={title:"Os valores permanecem os mesmos? O que muda no meu plano contratado?"};var c,u,l;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicAccordion,
    unnnicButton
  },
  data() {
    return {
      o: false
    };
  },
  template: \`
    <div>
      <pre>v-model:open {{ o }}</pre>
      <unnnic-accordion v-bind="$props" v-model:open="o">
        <template v-slot:actions>
          <unnnic-button @click.stop="click" type="secondary" size="small" icon-left="button-play-1">Assista ao vídeo</unnnic-button>
        </template>

        Quae assumenda aut non nulla quod ratione odio. Suscipit voluptatem natus a. Cumque et delectus ut. Nostrum ratione eos voluptatem voluptatu quia quod qui. Velit in consequatur corrupti similique. Quae assumenda aut non nulla quod ratione odio. Suscipit voluptatem natus a.
      </unnnic-accordion>
    </div>
  \`,
  methods: {
    click() {
      console.log('clicked test 2');
    }
  }
})`,...(l=(u=t.parameters)==null?void 0:u.docs)==null?void 0:l.source}}};const E=["Default"];export{t as Default,E as __namedExportsOrder,V as default};
