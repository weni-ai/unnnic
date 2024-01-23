import{x as b,y as o,b as y,d as r,D as h,t as f,f as u,i as C,B,C as _,A as T,o as x}from"./vue.esm-bundler-afa73d68.js";import{U as k}from"./Icon-777631f3.js";import{_ as V}from"./_plugin-vue_export-helper-c27b6911.js";const q={class:"unnnic-collapse__body"},v={__name:"Collapse",props:{title:String,active:Boolean,borderBottom:Boolean,unspacedIcon:Boolean,size:{type:String,default:"lg",validator(t){return["md","lg"].includes(t)}},modelValue:Boolean},emits:["update:modelValue","change"],setup(t,{emit:a}){const s=t,i=a,e=b(!1);return o(e,n=>{i("change",n),i("update:modelValue",n)}),o(()=>s.active,n=>{e.value=n},{immediate:!0}),o(()=>s.modelValue,n=>{e.value=n},{immediate:!0}),(n,c)=>(x(),y("div",{class:T(["unnnic-collapse",`unnnic-collapse--size-${t.size}`,{"unnnic-collapse--border-bottom":t.borderBottom,"unnnic-collapse--unspaced-icon":t.unspacedIcon,"unnnic-collapse--active":e.value}])},[r("div",{class:"unnnic-collapse__header",onClick:c[0]||(c[0]=I=>e.value=!e.value)},[h(f(t.title),1),u(n.$slots,"header",{},void 0,!0),C(k,{size:"xs",icon:e.value?"arrow-button-up-1":"arrow-button-down-1",scheme:e.value?"neutral-dark":"neutral-cloudy"},null,8,["icon","scheme"])]),B(r("div",q,[u(n.$slots,"default",{},void 0,!0)],512),[[_,e.value]])],2))}},g=V(v,[["__scopeId","data-v-d4d88540"]]);v.__docgenInfo={exportName:"default",displayName:"Collapse",description:"",tags:{},props:[{name:"title",type:{name:"string"}},{name:"active",type:{name:"boolean"}},{name:"borderBottom",type:{name:"boolean"}},{name:"unspacedIcon",type:{name:"boolean"}},{name:"size",type:{name:"string"},defaultValue:{func:!1,value:"'lg'"},values:["md","lg"]},{name:"modelValue",type:{name:"boolean"}}],events:[{name:"update:modelValue"},{name:"change"}],slots:[{name:"header"},{name:"default"}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Collapse/Collapse.vue"]};const N={title:"accordion/Collapse",component:g,argTypes:{"on-update:model-value":{action:"@update:model-value"},size:{control:{type:"select",options:["md","lg"]}},borderBottom:{control:{type:"boolean"}},unspacedIcon:{control:{type:"boolean"}}}},D=(t,{argTypes:a})=>({props:Object.keys(a),components:{unnnicCollapse:g},data(){return{active:!0}},template:`
    <div>
      <button @click="active = !active">External change active</button>

      <pre>v-model: {{ active }}</pre>

      <unnnic-collapse v-bind="$props" v-model="active">
        Default slot
        <br />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </unnnic-collapse>

<pre>

<b>Basic usage:</b>

&lt;unnnic-collapse title="Title"&gt;
  Collapse body
&lt;/unnnic-collapse&gt;


<b>With header slot:</b>

&lt;unnnic-collapse&gt;
  &lt;template slot="header"&gt;Title&lt;/template&gt;

  Collapse body
&lt;/unnnic-collapse&gt;


<b>With v-model:</b>

&lt;unnnic-collapse title="Title" v-model="active"&gt;
  Collapse body
&lt;/unnnic-collapse&gt;


<b>Complete usage:</b>

&lt;unnnic-collapse
  title           String
  border-bottom   Boolean
  unspaced-icon   Boolean
  active          Boolean
  @change         Boolean Event
&gt;
  &lt;template slot="header"&gt;Title&lt;/template&gt;

  Collapse body
&lt;/unnnic-collapse&gt;
</pre>
    </div>
  `,methods:{click(){}}}),l=D.bind({});l.args={title:"Title prop or header slot"};var d,p,m;l.parameters={...l.parameters,docs:{...(d=l.parameters)==null?void 0:d.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicCollapse
  },
  data() {
    return {
      active: true
    };
  },
  template: \`
    <div>
      <button @click="active = !active">External change active</button>

      <pre>v-model: {{ active }}</pre>

      <unnnic-collapse v-bind="$props" v-model="active">
        Default slot
        <br />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </unnnic-collapse>

<pre>

<b>Basic usage:</b>

&lt;unnnic-collapse title="Title"&gt;
  Collapse body
&lt;/unnnic-collapse&gt;


<b>With header slot:</b>

&lt;unnnic-collapse&gt;
  &lt;template slot="header"&gt;Title&lt;/template&gt;

  Collapse body
&lt;/unnnic-collapse&gt;


<b>With v-model:</b>

&lt;unnnic-collapse title="Title" v-model="active"&gt;
  Collapse body
&lt;/unnnic-collapse&gt;


<b>Complete usage:</b>

&lt;unnnic-collapse
  title           String
  border-bottom   Boolean
  unspaced-icon   Boolean
  active          Boolean
  @change         Boolean Event
&gt;
  &lt;template slot="header"&gt;Title&lt;/template&gt;

  Collapse body
&lt;/unnnic-collapse&gt;
</pre>
    </div>
  \`,
  methods: {
    click() {}
  }
})`,...(m=(p=l.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const $=["Default"];export{l as Default,$ as __namedExportsOrder,N as default};
//# sourceMappingURL=Collapse.stories-82186582.js.map
