import{d as a,t as o,g as d,f as g,F as f,n as _,x as v,o as t}from"./vue.esm-bundler-fb65849e.js";import{_ as x}from"./_plugin-vue_export-helper-c27b6911.js";const u={props:{size:{type:String,default:"md"},label:{type:String},placeholder:{type:String},modelValue:{type:String},maxLength:{type:Number},disabled:{type:Boolean},type:{type:String,default:"normal",validator(r){return["normal","error"].indexOf(r)!==-1}},errors:{type:Array,default:()=>[]}},methods:{focus(){this.$refs.textarea.focus()}}},b={key:0,class:"label"},h=["placeholder","maxlength","disabled","value"],T={key:1,class:"helper"},V={key:2,class:"error-list"};function A(r,l,e,L,S,N){return t(),a("div",{class:v(["unnnic-text-area",{disabled:e.disabled},e.size,e.type])},[e.label?(t(),a("div",b,o(e.label),1)):d("",!0),g("textarea",{ref:"textarea",placeholder:e.placeholder,maxlength:e.maxLength,disabled:e.disabled,value:e.modelValue,onInput:l[0]||(l[0]=s=>r.$emit("update:modelValue",s.srcElement.value))},null,40,h),e.maxLength&&e.type==="normal"?(t(),a("div",T,o(e.modelValue.length)+"/"+o(e.maxLength),1)):d("",!0),e.type==="error"?(t(),a("div",V,[(t(!0),a(f,null,_(e.errors,(s,y)=>(t(),a("span",{key:y},o(s),1))),128))])):d("",!0)],2)}const p=x(u,[["render",A],["__scopeId","data-v-0a4a3b45"]]);u.__docgenInfo={exportName:"default",displayName:"TextArea",description:"",tags:{},props:[{name:"size",type:{name:"string"},defaultValue:{func:!1,value:"'md'"}},{name:"label",type:{name:"string"}},{name:"placeholder",type:{name:"string"}},{name:"modelValue",type:{name:"string"}},{name:"maxLength",type:{name:"number"}},{name:"disabled",type:{name:"boolean"}},{name:"type",type:{name:"string"},defaultValue:{func:!1,value:"'normal'"},values:["normal","error"]},{name:"errors",type:{name:"array"},defaultValue:{func:!1,value:"[]"}}],events:[{name:"update:modelValue"}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/TextArea/TextArea.vue"]};const B={title:"Form/TextArea",component:p,argTypes:{"on-update:model-value":{action:"@update:model-value"},size:{control:{type:"select",options:["md","sm"]}},type:{control:{type:"select",options:["normal","error"]}}}},k=(r,{argTypes:l})=>({props:Object.keys(l),components:{unnnicTextArea:p},data(){return{content:""}},template:`
    <div>
      <pre>v-model: {{ content }}</pre>
      <unnnic-text-area v-bind="$props" v-model="content"/>
    </div>
  `,methods:{}}),n=k.bind({});n.args={label:"Label",placeholder:"Placeholder",maxLength:150,disabled:!1,type:"normal",errors:[]};var m,c,i;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicTextArea
  },
  data() {
    return {
      content: ''
    };
  },
  template: \`
    <div>
      <pre>v-model: {{ content }}</pre>
      <unnnic-text-area v-bind="$props" v-model="content"/>
    </div>
  \`,
  methods: {}
})`,...(i=(c=n.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};const D=["Default"];export{n as Default,D as __namedExportsOrder,B as default};
