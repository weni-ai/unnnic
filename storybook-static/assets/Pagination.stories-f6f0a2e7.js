import{u as b}from"./Button-5e6ad622.js";import{b as u,i as d,F as x,j as _,a as y,o as l,g as P,x as C}from"./vue.esm-bundler-3f98aba2.js";import{_ as N}from"./_plugin-vue_export-helper-c27b6911.js";import"./Icon-b41b8868.js";const h={components:{unnnicButton:b},props:{value:{type:Number,default:1},max:{type:Number,default:1},show:{type:Number,default:5},disabled:{type:Boolean,default:!1}},data(){return{reference:3}},computed:{pages(){const e=[];for(let a=1;a<=this.max;a+=1)e.push(a);const t=this.show-4,n=this.max-t-3;if(this.reference>3){const a=this.reference-2,s=a>n?n:a;e.splice(1,s,"left-hidden")}if(this.reference<this.max-t-1){const a=this.max-t-this.reference,s=a>n?n:a;e.splice(-(s+1),s,"right-hidden")}return e},canPrevious(){return this.value>1},canNext(){return this.value<this.max}},methods:{selectPage(e){if(e==="left-hidden"){const t=this.pages[this.pages.indexOf("left-hidden")+1]-1;this.$emit("input",t),this.setReference(t)}else if(e==="right-hidden"){const t=this.pages[this.pages.indexOf("right-hidden")-1]+1;this.$emit("input",t),this.pages.includes("left-hidden")?this.setReference(this.pages[this.pages.indexOf("left-hidden")+1]+1):this.setReference(4)}else this.$emit("input",e)},previousPage(){if(this.canPrevious){const e=this.value-1;this.selectPage(e),this.pages.includes(e)||this.setReference(e)}},nextPage(){if(this.canNext){const e=this.value+1;this.selectPage(e),this.pages.includes(e)||this.setReference(e)}},setReference(e){this.reference=e}}},k={class:"pagination"};function R(e,t,n,a,s,i){const c=y("unnnic-button");return l(),u("div",k,[d(c,{type:"terciary",size:"small","icon-center":"arrow-left-1-1",disabled:!i.canPrevious||n.disabled,onClick:i.previousPage},null,8,["disabled","onClick"]),(l(!0),u(x,null,_(i.pages,(o,v)=>(l(),P(c,{key:v,type:o===n.value?"secondary":"terciary",size:"small",text:["left-hidden","right-hidden"].includes(o)?"...":String(o),onClick:w=>i.selectPage(o),disabled:n.disabled},null,8,["type","text","onClick","disabled"]))),128)),d(c,{type:"terciary",size:"small","icon-center":"arrow-right-1-1",disabled:!i.canNext||n.disabled,onClick:i.nextPage},null,8,["disabled","onClick"])])}const g=N(h,[["render",R],["__scopeId","data-v-2a9ea78e"]]);h.__docgenInfo={exportName:"default",displayName:"Pagination",description:"",tags:{},props:[{name:"value",type:{name:"number"},defaultValue:{func:!1,value:"1"}},{name:"max",type:{name:"number"},defaultValue:{func:!1,value:"1"}},{name:"show",type:{name:"number"},defaultValue:{func:!1,value:"5"}},{name:"disabled",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"input",type:{names:["undefined"]}}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Pagination/Pagination.vue"]};const j={title:"example/Pagination",component:g,argTypes:{max:{control:{type:"number",min:1}}},args:{max:10}},O=(e,{argTypes:t})=>({props:Object.keys(t),components:{unnnicPagination:g},setup(){let n=C(1);return{page:n,onChange:s=>{n.value=s}}},template:`
    <div>
      <unnnic-pagination v-bind="$props" :value="page" @input="onChange"/>
    </div>
  `}),r=O.bind({});r.args={};var p,m,f;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicPagination
  },
  setup() {
    let page = ref(1);
    const onChange = value => {
      page.value = value;
    };
    return {
      page,
      onChange
    };
  },
  template: \`
    <div>
      <unnnic-pagination v-bind="$props" :value="page" @input="onChange"/>
    </div>
  \`
})`,...(f=(m=r.parameters)==null?void 0:m.docs)==null?void 0:f.source}}};const z=["Default"];export{r as Default,z as __namedExportsOrder,j as default};
//# sourceMappingURL=Pagination.stories-f6f0a2e7.js.map
