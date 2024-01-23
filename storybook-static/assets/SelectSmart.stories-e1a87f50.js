import"./chunk-PCJTTTQV-82292596.js";import{M as Q,e as F,f as v,g as y}from"./index-dbbef785.js";import{v as Z}from"./index-39f25d77.js";import{u as $}from"./Checkbox-5e7d0d69.js";import{a as g,o,b as d,g as j,e as f,d as S,A as _,t as O,F as L,j as R,i as A,f as U,n as H,J as ee,B as te,w as W,I as le}from"./vue.esm-bundler-3f98aba2.js";import{_ as V}from"./_plugin-vue_export-helper-c27b6911.js";import{u as ne}from"./Tag-d8ebe4d1.js";import{U as ae}from"./Icon-b41b8868.js";import{U as P}from"./i18n-896e07dd.js";import{T as ie}from"./TextInput-5ab46ce6.js";import{j as t}from"./jsx-runtime-1e06b37d.js";import{u as K}from"./index-def7438a.js";import"./iframe-57e9b485.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-725317a4.js";import"./index-d37d4223.js";import"./index-cba466d5.js";import"./index-356e4a49.js";import"./ToolTip-b379b431.js";const J={name:"UnnnicSelectSmartOption",components:{UnnnicCheckbox:$},props:{label:{type:String,default:"Option",required:!0},description:{type:String,default:"",required:!1},size:{type:String,default:""},selectable:{type:Boolean,default:!0},focused:{type:Boolean,default:!1},active:{type:Boolean,default:null},allowCheckbox:{type:Boolean,default:!1}}},se=["title"];function oe(l,e,n,i,s,a){const p=g("unnnic-checkbox");return o(),d("div",{class:_({"unnnic-select-smart-option":!0,"unnnic-select-smart-option--focused":n.focused,"unnnic-select-smart-option--active":n.active,"unnnic--clickable":n.selectable,"unnnic-select-smart-option--selectable":n.selectable,"unnnic-select-smart-option--with-checkbox":n.allowCheckbox}),title:n.label},[n.allowCheckbox?(o(),j(p,{key:0,ref:"checkbox",modelValue:n.active,size:n.size},null,8,["modelValue","size"])):f("",!0),S("div",null,[S("span",{class:_(["unnnic-select-smart-option__label",`unnnic-select-smart-option__label--${n.size}`])},O(n.label),3),n.description?(o(),d("p",{key:0,class:_(["unnnic-select-smart-option__description",`unnnic-select-smart-option__description--${n.size}`])},O(n.description),3)):f("",!0)])],10,se)}const re=V(J,[["render",oe]]);J.__docgenInfo={displayName:"UnnnicSelectSmartOption",exportName:"default",description:"",tags:{},props:[{name:"label",type:{name:"string"},required:!0,defaultValue:{func:!1,value:"'Option'"}},{name:"description",type:{name:"string"},required:!1,defaultValue:{func:!1,value:"''"}},{name:"size",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"selectable",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"focused",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"active",type:{name:"boolean"},defaultValue:{func:!1,value:"null"}},{name:"allowCheckbox",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/SelectSmart/SelectSmartOption.vue"]};const X={name:"UnnnicSelectSmartMultipleHeader",mixins:[P],components:{Tag:ne,IconSvg:ae},props:{selectedOptions:{type:Array,required:!0},withoutSelectsMessage:{type:String,default:""}},data(){return{multipleSelectedsTags:2,defaultTranslations:{without_multiple_selected:{"pt-br":"Nenhuma opção selecionada",en:"No option selected",es:"Ninguna opción seleccionada"}}}},computed:{firstMultipleSelecteds(){const{selectedOptions:l,multipleSelectedsTags:e}=this,n=[];for(let i=0;i<e;i+=1)n.push(l==null?void 0:l[i]);return n.filter(i=>i!==void 0)}},methods:{clearSelectedOptions(){this.$emit("clear-selected-options")},unselectOption(l){this.$emit("unselect-option",l)}}},ce={class:"unnnic-select-smart__options__multiple"},ue={key:0,class:"unnnic-select-smart__options__multiple__selecteds__container"},de={class:"unnnic-select-smart__options__multiple__selecteds"},pe={key:0,class:"unnnic-select-smart__options__multiple__selecteds__remaining"},he={key:1,class:"unnnic-select-smart__options__multiple--without-multiples"};function me(l,e,n,i,s,a){const p=g("tag"),r=g("icon-svg");return o(),d("div",ce,[n.selectedOptions[0]?(o(),d("div",ue,[S("div",de,[(o(!0),d(L,null,R(a.firstMultipleSelecteds,u=>(o(),j(p,{class:"unnnic-select-smart__options__multiple__selecteds__option",key:u.value,text:u.label,hasCloseIcon:"",onClose:b=>a.unselectOption(u)},null,8,["text","onClose"]))),128)),n.selectedOptions.length>s.multipleSelectedsTags?(o(),d("p",pe," +"+O(n.selectedOptions.length-s.multipleSelectedsTags),1)):f("",!0)]),A(r,{class:"unnnic-select-smart__options__multiple__selecteds__clear",icon:"close-1",size:"xs",clickable:"",onClick:a.clearSelectedOptions},null,8,["onClick"])])):f("",!0),n.selectedOptions[0]?f("",!0):(o(),d("p",he,O(n.withoutSelectsMessage||l.i18n("without_multiple_selected")),1))])}const fe=V(X,[["render",me],["__scopeId","data-v-2748a8a2"]]);X.__docgenInfo={exportName:"default",displayName:"UnnnicSelectSmartMultipleHeader",description:"",tags:{},props:[{name:"locale",mixin:{name:"i18n",path:"..\\..\\mixins\\i18n.js"},type:{name:"string"}},{name:"translations",mixin:{name:"i18n",path:"..\\..\\mixins\\i18n.js"},type:{name:"object"}},{name:"selectedOptions",type:{name:"array"},required:!0},{name:"withoutSelectsMessage",type:{name:"string"},defaultValue:{func:!1,value:"''"}}],events:[{name:"clear-selected-options"},{name:"unselect-option",type:{names:["undefined"]}}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/SelectSmart/SelectSmartMultipleHeader.vue","C:\\Users\\anacl\\Documents\\WENI\\Front\\unnnic\\src\\mixins\\i18n.js"]};const Y={props:{type:{type:String,default:"automatic"},modelValue:Boolean,position:{type:String,default:"bottom-left"}},data(){return{clientHeight:0,clientWidth:0,x:0,y:0,width:0,height:0,data:{x:0,y:0,width:0,height:0}}},computed:{active(){return this.type==="manual"?this.modelValue:!1},positions(){let l,e;return this.position.startsWith("bottom")?(l=this.y+this.height,l+this.data.height>this.clientHeight&&(l=this.clientHeight-this.data.height,this.y>=this.data.height&&(l=this.y-this.data.height))):this.position.startsWith("top")&&(l=this.y-this.data.height,l<0&&(l=0,this.y+this.height+this.data.height<=this.clientHeight&&(l=this.y+this.height))),this.position.endsWith("right")?(e=this.x+this.width,e+this.data.width>this.clientWidth&&(e=this.clientWidth-this.data.width,this.x>=this.data.width&&(e=this.x-this.data.width))):this.position.endsWith("left")&&(e=this.x-this.data.width,e<0&&(e=0,this.x+this.width+this.data.width<=this.clientWidth&&(e=this.x+this.width))),{left:`${e}px`,top:`${l}px`}}},mounted(){this.calculatePosition(),window.addEventListener("scroll",this.calculatePosition),window.addEventListener("resize",this.calculatePosition)},beforeUnmount(){window.removeEventListener("scroll",this.calculatePosition),window.removeEventListener("resize",this.calculatePosition)},methods:{calculatePosition(){const l=this.$refs.dropdown.getBoundingClientRect(),e=this.$refs["dropdown-data"].getBoundingClientRect();this.clientHeight=document.documentElement.clientHeight,this.clientWidth=document.documentElement.clientWidth,this.x=l.x,this.y=l.y,this.width=l.width,this.height=l.height,this.data.x=e.x,this.data.y=e.y,this.data.width=e.width,this.data.height=e.height}}};function be(l,e,n,i,s,a){return o(),d("span",{class:_(["dropdown",{active:a.active}]),ref:"dropdown"},[U(l.$slots,"default",{},void 0,!0),S("div",{class:"dropdown-data",style:H({position:"fixed",...a.positions}),ref:"dropdown-data"},[U(l.$slots,"inside",{width:`${s.width}px`,height:`${s.height}px`},void 0,!0)],4)],2)}const ve=V(Y,[["render",be],["__scopeId","data-v-7bea8665"]]);Y.__docgenInfo={exportName:"default",displayName:"DropdownSkeleton",description:"",tags:{},props:[{name:"type",type:{name:"string"},defaultValue:{func:!1,value:"'automatic'"}},{name:"modelValue",type:{name:"boolean"}},{name:"position",type:{name:"string"},defaultValue:{func:!1,value:"'bottom-left'"}}],slots:[{name:"default"},{name:"inside",scoped:!0,bindings:[{name:"width",title:"binding"},{name:"height",title:"binding"}]}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Dropdown/DropdownSkeleton.vue"]};const G={name:"UnnnicSelectSmart",mixins:[P],components:{TextInput:ie,SelectSmartOption:re,SelectSmartMultipleHeader:fe,DropdownSkeleton:ve},props:{options:{type:Array,required:!0,default:()=>[{value:"",label:"Initial value"},{value:"option1",label:"Option1"}]},modelValue:{type:Array,default:()=>[]},size:{type:String,default:"md"},type:{type:String,default:"normal",validator(l){return["normal","error"].indexOf(l)!==-1}},disabled:{type:Boolean,default:null},orderedByIndex:{type:Boolean,default:!1},multiple:{type:Boolean,default:!1},multipleWithoutSelectsMessage:{type:String,default:""},autocomplete:{type:Boolean,default:!1},autocompleteIconLeft:{type:Boolean,default:!1},autocompleteClearOnFocus:{type:Boolean,default:!1}},data(){return{active:!1,status:"not-mounted",focusedOption:null,searchValue:"",isAutocompleteAllowed:!1,multipleSelectedsTags:2,defaultTranslations:{without_results:{"pt-br":"Nenhum resultado encontrado",en:"No results found",es:"Ningún resultado encontrado"}}}},mounted(){var l,e,n,i,s;this.status="mounted",(this.multiple||this.autocomplete)&&(this.isAutocompleteAllowed=!0),(l=this.modelValue)!=null&&l[0]&&((e=this.modelValue)!=null&&e[0].value)?(this.modelValue.forEach(a=>this.selectOption(a)),this.isAutocompleteAllowed&&this.$nextTick(()=>{this.searchValue=this.selectedLabel})):(n=this.options)!=null&&n[0]&&((i=this.options)!=null&&i[0].value)&&this.selectOption((s=this.options)==null?void 0:s[0])},watch:{active(l){this.$refs["dropdown-skeleton"].calculatePosition(),this.$nextTick(()=>{if(l&&!this.multiple){const e=this.getOptionIndex("active");e!==-1&&this.scrollToOption(e,"center")}})},searchValue(l,e){this.focusedOption=null,!this.active&&e&&(this.active=!0)},modelValue:{deep:!0,handler(l){this.$emit("onChange",l),this.$emit("update:modelValue",l),this.onSelectOption(l.at(-1))}},autocomplete(l){this.multiple||(this.isAutocompleteAllowed=l)}},computed:{selectedLabel(){var n;if(this.status!=="mounted")return"";const l=this.options.find(i=>{const s=i.value===this.modelValue;return this.isAutocompleteAllowed?s&&i.value!=="":i.value===""&&this.modelValue.length===0||s});return l?l.label:this.multiple?this.modelValue.map(s=>s.label).join(", "):((n=this.modelValue.at(-1))==null?void 0:n.label)||""},hasDescriptionOptions(){return this.options.some(l=>typeof l.description<"u")},autocompletePlaceholder(){if(this.isAutocompleteAllowed){const l=this.options.find(e=>e.value==="");if(l)return l.label}return""},inputValue(){const{isAutocompleteAllowed:l,searchValue:e,multiple:n,modelValue:i}=this;return l||n?e:!n&&i.length!==0?i==null?void 0:i[0].label:""}},directives:{onClickOutside:Z},methods:{optionIsSelected(l){return this.modelValue.some(e=>e.value===l.value)},clearSelectedOptions(){this.$emit("update:modelValue",[])},handleSelect(l){if(l){if(this.multiple&&this.optionIsSelected(l)){this.unselectOption(l);return}this.selectOption(l)}},handleClickInput(){if(this.isAutocompleteAllowed){if(this.active)return;(this.autocompleteClearOnFocus||this.multiple)&&(this.searchValue="")}this.active=!this.active},filterOptions(l){const n=this.searchValue.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").split(" "),i=r=>r.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,""),s=r=>{var u;return parseInt((u=r.match(/\d+/))==null?void 0:u[0],10)||0},a=l.filter(({value:r,label:u},b,x)=>{const m=i(u),h=x.findIndex(w=>w.value===r)===b,C=n.every(w=>m.includes(w));return h&&C&&r});return this.orderedByIndex?a:a.sort((r,u)=>{const b=i(r.label),x=i(u.label),m=s(b),h=s(x);return m-h||b.localeCompare(x)})},onClickOutside(){this.active&&(this.isAutocompleteAllowed&&(this.searchValue=this.selectedLabel),this.$nextTick(()=>{this.active=!1}))},getOptionIndex(l){var i,s,a,p;const e=this.filterOptions(this.options);let n="";return l==="active"&&(n=(s=(i=this.modelValue)==null?void 0:i[0])==null?void 0:s.value),l==="focused"&&(n=((a=this.focusedOption)==null?void 0:a.value)||((p=this.modelValue.at(-1))==null?void 0:p.value)),e.findIndex(r=>r.value===n)},scrollToOption(l,e="nearest"){const n=this.$refs.selectSmartOptionsScrollArea;if(n&&l>=0&&l<n.childNodes.length){const i=n.childNodes[l];i instanceof HTMLElement&&i.scrollIntoView({block:e})}},selectOption(l){const e=l.value===null||l.value.length===0?null:l;this.$emit("update:modelValue",this.multiple?[...this.modelValue,e]:[e])},unselectOption(l){const e=this.modelValue.findIndex(n=>n.value===l.value);e!==-1&&this.modelValue.splice(e,1),this.multiple&&(this.searchValue="")},onSelectOption(l){if(this.$nextTick(()=>{this.multiple||(this.active=!1)}),this.isAutocompleteAllowed&&!this.multiple){this.searchValue=l.label;return}this.multiple&&(this.searchValue="")},async onKeyDownSelect(l){const{key:e}=l;if(["Escape","Enter","ArrowUp","ArrowDown"].includes(e)){l.preventDefault();const i=this.filterOptions(this.options),s=this.getOptionIndex("focused");let a;switch(e){case"Escape":this.active=!1,this.searchValue="";break;case"Enter":this.focusedOption&&this.active&&this.handleSelect(this.focusedOption),this.active||(this.active=!0);break;case"ArrowUp":case"ArrowDown":this.multiple&&!this.active&&(this.active=!0,await this.$nextTick()),a=e==="ArrowUp"?Math.max(s-1,0):Math.min(s+1,i.length-1),this.active||this.handleSelect(i[a]);break}a!==void 0&&this.active&&this.scrollToOption(a);const p=i[a===void 0?s:a];this.focusedOption=p}}}},ye={style:{overflow:"auto"}},ge={key:0,class:"unnnic-select-smart__options--no-results"};function xe(l,e,n,i,s,a){const p=g("text-input"),r=g("select-smart-multiple-header"),u=g("select-smart-option"),b=g("dropdown-skeleton"),x=ee("on-click-outside");return te((o(),d("div",{onKeydown:e[1]||(e[1]=(...m)=>a.onKeyDownSelect&&a.onKeyDownSelect(...m)),class:"unnnic-select-smart"},[A(b,{type:"manual",modelValue:s.active||null,position:"bottom",ref:"dropdown-skeleton"},{inside:W(m=>[s.active?(o(),d("div",{key:0,style:H({width:m.width}),class:_({"unnnic-select-smart__options":!0,active:s.active,inactive:!s.active})},[S("div",ye,[n.multiple?(o(),j(r,{key:0,selectedOptions:n.modelValue,withoutSelectsMessage:n.multipleWithoutSelectsMessage,onClearSelectedOptions:a.clearSelectedOptions,onUnselectOption:a.unselectOption,locale:l.locale,translations:l.translations},null,8,["selectedOptions","withoutSelectsMessage","onClearSelectedOptions","onUnselectOption","locale","translations"])):f("",!0),S("div",{ref:"selectSmartOptionsScrollArea",class:_(["unnnic-select-smart__options__scroll-area",`size-${n.size}`,{"with-descriptions":a.hasDescriptionOptions}])},[(o(!0),d(L,null,R(a.filterOptions(n.options),(h,C)=>(o(),j(u,{key:h.value,label:h.label,description:h.description,tabindex:C,size:n.size,active:h.value===n.modelValue||a.optionIsSelected(h),focused:s.focusedOption&&s.focusedOption.value===h.value,allowCheckbox:!!n.multiple,onClick:w=>a.handleSelect(h)},null,8,["label","description","tabindex","size","active","focused","allowCheckbox","onClick"]))),128)),a.filterOptions(n.options).length===0?(o(),d("p",ge,O(l.i18n("without_results")),1)):f("",!0)],2)])],6)):f("",!0)]),default:W(()=>[A(p,{class:"unnnic-select-smart__input",ref:"selectSmartInput",modelValue:a.inputValue,placeholder:a.autocompletePlaceholder||a.selectedLabel,type:n.type,size:n.size,disabled:n.disabled,readonly:!s.isAutocompleteAllowed,"icon-left":s.isAutocompleteAllowed&&n.autocompleteIconLeft?"search-1":"","icon-right":s.active?"arrow-button-up-1":"arrow-button-down-1","icon-right-clickable":!n.disabled,onIconRightClick:a.handleClickInput,onClick:le(a.handleClickInput,["stop"]),"onUpdate:modelValue":e[0]||(e[0]=m=>s.searchValue=m)},null,8,["modelValue","placeholder","type","size","disabled","readonly","icon-left","icon-right","icon-right-clickable","onIconRightClick","onClick"])],void 0),_:1},8,["modelValue"])],32)),[[x,a.onClickOutside]])}const I=V(G,[["render",xe]]);G.__docgenInfo={exportName:"default",displayName:"UnnnicSelectSmart",description:"",tags:{},props:[{name:"locale",mixin:{name:"i18n",path:"..\\..\\mixins\\i18n.js"},type:{name:"string"}},{name:"translations",mixin:{name:"i18n",path:"..\\..\\mixins\\i18n.js"},type:{name:"object"}},{name:"options",type:{name:"array"},required:!0,defaultValue:{func:!1,value:`[\r
  {\r
    value: '',\r
    label: 'Initial value',\r
  },\r
  {\r
    value: 'option1',\r
    label: 'Option1',\r
  },\r
]`}},{name:"modelValue",type:{name:"array"},defaultValue:{func:!1,value:"[]"}},{name:"size",type:{name:"string"},defaultValue:{func:!1,value:"'md'"}},{name:"type",type:{name:"string"},defaultValue:{func:!1,value:"'normal'"},values:["normal","error"]},{name:"disabled",type:{name:"boolean"},defaultValue:{func:!1,value:"null"}},{name:"orderedByIndex",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"multiple",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"multipleWithoutSelectsMessage",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"autocomplete",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"autocompleteIconLeft",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"autocompleteClearOnFocus",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"onChange",type:{names:["undefined"]}},{name:"update:modelValue",type:{names:["undefined"]}}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/SelectSmart/SelectSmart.vue","C:\\Users\\anacl\\Documents\\WENI\\Front\\unnnic\\src\\mixins\\i18n.js"]};const c=(l,{argTypes:e})=>({props:Object.keys(e),components:{unnnicSelectSmart:I},data(){return{exampleValue:[]}},template:'<unnnic-select-smart v-bind="$props" v-model="exampleValue" />'});function q(l){const e=Object.assign({h1:"h1",p:"p",blockquote:"blockquote",em:"em",code:"code",hr:"hr",h4:"h4",strong:"strong",h2:"h2"},K(),l.components);return t.jsxs(t.Fragment,{children:[t.jsx(Q,{title:"Select/SelectSmart",component:I,decorators:[()=>({template:'<div style="marginBottom: 200px"><story /></div>'})]}),`
`,`
`,t.jsx(e.h1,{id:"selectsmart",children:"SelectSmart"}),`
`,t.jsx(e.p,{children:`SelectSmart is designed to solve common problems related to option selection.\r
It combines three elements: Select, Autocomplete, and AutocompleteSelect, which\r
originally didn't follow a consistent pattern and had some bugs. With SelectSmart,\r
these components have been unified and improved and it also brings a new design.`}),`
`,t.jsxs(e.blockquote,{children:[`
`,t.jsxs(e.p,{children:["It is a ",t.jsx(e.em,{children:"self-closing"})," component, which means it does not support child elements."]}),`
`]}),`
`,t.jsxs(e.blockquote,{children:[`
`,t.jsxs(e.p,{children:[`Available in small and medium versions, which can be toggled through the\r
`,t.jsx(e.code,{children:"size"}),' property, accepting the strings "sm" or "md".']}),`
`]}),`
`,t.jsx(F,{language:"html",dark:!0,code:`
<unnnic-select-smart v-model="exampleValue" :options="exampleArray" />
  `}),`
`,t.jsx(e.hr,{}),`
`,t.jsx(e.h4,{id:"important",children:t.jsx(e.strong,{children:"IMPORTANT:"})}),`
`,t.jsxs(e.p,{children:["To ensure proper functioning of the component, it is fundamental to provide the ",t.jsx(e.code,{children:"v-model"}),`\r
(or `,t.jsx(e.code,{children:"value"})," and ",t.jsx(e.code,{children:"@input"}),"), even if it is empty (",t.jsx(e.code,{children:"[]"}),`), since it is through this property\r
that the selected options are controlled.`]}),`
`,t.jsxs(e.p,{children:["The other one required property is ",t.jsx(e.code,{children:"options"}),", which requires an array of objects in the following format:"]}),`
`,t.jsxs(e.p,{children:[`| Key         | Description                                                                                                                               | Type   |\r
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------ |\r
| value       | `,t.jsx(e.strong,{children:"Required."}),t.jsx("br",{}),"Sets the option value. If it is empty, the ",t.jsx(e.em,{children:"label"})," of this object will be used as the ",t.jsx(e.em,{children:"placeholder"}),` of the SelectSmart. | string |\r
| label       | `,t.jsx(e.strong,{children:"Required."}),t.jsx("br",{}),`Provides user-friendly text that represents the option to the user.                                                     | string |\r
| description | `,t.jsx(e.em,{children:"Not required."}),t.jsx("br",{}),"Provides an additional description for the option.                                                                    | string |"]}),`
`,t.jsx(F,{language:"json",dark:!0,code:`
[
  {
    "value": "",
    "label": "Select some option"  <---- Since the value of this object is empty, this will be the placeholder
  },
  {
    "value": "1",
    "label": "Option 1",
  },
  {
    "value": "2",
    "label": "Option 2",
    "description": "This is the first option"
  },
]
  `}),`
`,t.jsxs(e.blockquote,{children:[`
`,t.jsxs(e.p,{children:["The options will be presented in alphabetical order, following the value of each ",t.jsx(e.code,{children:"label"}),`,\r
regardless of the sequence in which the objects are supplied to the `,t.jsx(e.code,{children:":options"}),` property.\r
However, if the `,t.jsx(e.code,{children:"orderedByIndex"}),` property is included, the options will be sorted\r
according to the arrangement given to `,t.jsx(e.code,{children:":options"}),"."]}),`
`]}),`
`,t.jsx(e.hr,{}),`
`,t.jsx("br",{}),`
`,t.jsx(e.h2,{id:"default",children:"Default"}),`
`,t.jsx(e.p,{children:"Allows you to choose from a list."}),`
`,t.jsx(v,{children:t.jsx(y,{name:"Default",args:{options:[{value:"",label:"Select some option"},{value:"5",label:"Option 5"},{value:"3",label:"Option 3"},{value:"1",label:"Option 1"},{value:"4",label:"Option 4"},{value:"2",label:"Option 2"},{value:"6",label:"Option 6"},{value:"7",label:"Option 7"}]},children:c.bind({})})}),`
`,t.jsx(e.h2,{id:"default-option-selected",children:"Default option selected"}),`
`,t.jsxs(e.p,{children:[`For the first option to be selected by default, it is essential that\r
there is no object with its `,t.jsx(e.code,{children:"value"})," field empty."]}),`
`,t.jsxs(e.p,{children:[`If your intention is to set a specific option as the default, you can\r
accomplish this using the `,t.jsx(e.code,{children:"value"})," (or ",t.jsx(e.code,{children:"v-model"}),`) property. Make sure that this\r
value is passed as an array, and that the object is structured according to the\r
pattern of the other options.`]}),`
`,t.jsx(v,{children:t.jsx(y,{name:"FirstSelected",args:{options:[{value:"1",label:"Option 1"},{value:"2",label:"Option 2"},{value:"3",label:"Option 3"},{value:"4",label:"Option 4"},{value:"5",label:"Option 5"}]},children:c.bind({})})}),`
`,t.jsx(e.h2,{id:"ordered-by-index",children:"Ordered by index"}),`
`,t.jsxs(e.p,{children:["If the ",t.jsx(e.code,{children:"orderedByIndex"}),` property is included, the options will\r
be ordered according to the arrangement given to `,t.jsx(e.code,{children:":options"}),"."]}),`
`,t.jsx(v,{children:t.jsx(y,{name:"OrderedByIndex",args:{options:[{value:"5",label:"Option 5"},{value:"3",label:"Option 3"},{value:"1",label:"Option 1"},{value:"4",label:"Option 4"},{value:"2",label:"Option 2"}],orderedByIndex:!0},children:c.bind({})})}),`
`,t.jsx(e.h2,{id:"disabled",children:"Disabled"}),`
`,t.jsxs(e.p,{children:["SelectSmart will respond to the value passed to the ",t.jsx(e.code,{children:"disabled"}),` property,\r
becoming disabled when set to `,t.jsx(e.em,{children:"true"})," and remaining enabled when set to ",t.jsx(e.em,{children:"false"}),"."]}),`
`,t.jsx(v,{children:t.jsx(y,{name:"Disabled",args:{options:[{value:"",label:"Select some option"}],disabled:!0},children:c.bind({})})}),`
`,t.jsx(e.h2,{id:"with-descriptions",children:"With descriptions"}),`
`,t.jsxs(e.p,{children:[`If you want a more detailed description for your options, you can include the\r
`,t.jsx(e.code,{children:"description"})," key inside the object corresponding to each option."]}),`
`,t.jsx(v,{children:t.jsx(y,{name:"WithDescriptions",args:{options:[{value:"",label:"Select some option"},{value:"1",label:"Option 1",description:"This is the first option"},{value:"2",label:"Option 2",description:"Another alternative you can consider"},{value:"3",label:"Option 3",description:"A third option for your consideration"},{value:"4",label:"Option 4",description:"Yet another choice among the options"},{value:"5",label:"Option 5",description:"The last option available for selection"}]},children:c.bind({})})}),`
`,t.jsx(e.h2,{id:"autocomplete",children:"Autocomplete"}),`
`,t.jsxs(e.p,{children:["To activate the search functionality, just include the ",t.jsx(e.code,{children:"autocomplete"}),` property.\r
The search takes place based on the text of the `,t.jsx(e.code,{children:"label"}),`, without distinction\r
between uppercase and lowercase, spaces and accents.`]}),`
`,t.jsxs(e.p,{children:[`If you want the search bar to be emptied when focusing on the component, use\r
the `,t.jsx(e.code,{children:"autocompleteClearOnFocus"})," property."]}),`
`,t.jsxs(e.p,{children:[`Furthermore, it is possible to incorporate the magnifying glass icon on the side (left) of\r
the search bar by using the `,t.jsx(e.code,{children:"autocompleteIconLeft"})," property."]}),`
`,t.jsx(v,{children:t.jsx(y,{name:"Autocomplete",args:{options:[{value:"",label:"Select some option"},{value:"united_states",label:"Estados Unidos"},{value:"brazil",label:"Brasil"},{value:"china",label:"China"},{value:"india",label:"Índia"},{value:"russia",label:"Rússia"},{value:"japan",label:"Japão"},{value:"germany",label:"Alemanha"},{value:"france",label:"França"},{value:"canada",label:"Canadá"},{value:"australia",label:"Austrália"},{value:"south_korea",label:"Coreia do Sul"},{value:"mexico",label:"México"},{value:"egypt",label:"Egito"},{value:"south_africa",label:"África do Sul"},{value:"turkey",label:"Turquia"},{value:"nigeria",label:"Nigéria"},{value:"argentina",label:"Argentina"},{value:"italy",label:"Itália"},{value:"spain",label:"Espanha"},{value:"saudi_arabia",label:"Arábia Saudita"}],autocomplete:!0,autocompleteClearOnFocus:!0,autocompleteIconLeft:!0},children:c.bind({})})}),`
`,t.jsx(e.h2,{id:"multiple",children:"Multiple"}),`
`,t.jsxs(e.p,{children:[`To use the component version that allows the selection of\r
several options, just pass the `,t.jsx(e.code,{children:"multiple"})," property."]}),`
`,t.jsxs(e.p,{children:[`You also have the freedom to customize the message that signals\r
when no option has been selected, through the `,t.jsx(e.code,{children:"multipleWithoutSelectsMessage"})," property."]}),`
`,t.jsxs(e.p,{children:[`Typically, components involving multiple options offer a considerable range\r
of choices. So, in order to improve the user experience, the `,t.jsx(e.code,{children:"multiple"}),` option\r
automatically activates the `,t.jsx(e.code,{children:"autocomplete"})," feature, it cannot be deactivated."]}),`
`,t.jsx(v,{children:t.jsx(y,{name:"Multiple",args:{options:[{value:"",label:"Select some countries"},{value:"united_states",label:"Estados Unidos"},{value:"brazil",label:"Brasil"},{value:"china",label:"China"},{value:"india",label:"Índia"},{value:"russia",label:"Rússia"},{value:"japan",label:"Japão"},{value:"germany",label:"Alemanha"},{value:"france",label:"França"},{value:"canada",label:"Canadá"},{value:"australia",label:"Austrália"},{value:"south_korea",label:"Coreia do Sul"},{value:"mexico",label:"México"},{value:"egypt",label:"Egito"},{value:"south_africa",label:"África do Sul"},{value:"turkey",label:"Turquia"},{value:"nigeria",label:"Nigéria"},{value:"argentina",label:"Argentina"},{value:"italy",label:"Itália"},{value:"spain",label:"Espanha"},{value:"saudi_arabia",label:"Arábia Saudita"}],multiple:!0,multipleWithoutSelectsMessage:"No country selected yet :("},children:c.bind({})})})]})}function _e(l={}){const{wrapper:e}=Object.assign({},K(),l.components);return e?t.jsx(e,{...l,children:t.jsx(q,{...l})}):q(l)}const T=c.bind({});T.storyName="Default";T.args={options:[{value:"",label:"Select some option"},{value:"5",label:"Option 5"},{value:"3",label:"Option 3"},{value:"1",label:"Option 1"},{value:"4",label:"Option 4"},{value:"2",label:"Option 2"},{value:"6",label:"Option 6"},{value:"7",label:"Option 7"}]};T.parameters={storySource:{source:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicSelectSmart
  },
  data() {
    return {
      exampleValue: []
    };
  },
  template: "<unnnic-select-smart v-bind=\\"$props\\" v-model=\\"exampleValue\\" />"
})`}};const E=c.bind({});E.storyName="FirstSelected";E.args={options:[{value:"1",label:"Option 1"},{value:"2",label:"Option 2"},{value:"3",label:"Option 3"},{value:"4",label:"Option 4"},{value:"5",label:"Option 5"}]};E.parameters={storySource:{source:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicSelectSmart
  },
  data() {
    return {
      exampleValue: []
    };
  },
  template: "<unnnic-select-smart v-bind=\\"$props\\" v-model=\\"exampleValue\\" />"
})`}};const N=c.bind({});N.storyName="OrderedByIndex";N.args={options:[{value:"5",label:"Option 5"},{value:"3",label:"Option 3"},{value:"1",label:"Option 1"},{value:"4",label:"Option 4"},{value:"2",label:"Option 2"}],orderedByIndex:!0};N.parameters={storySource:{source:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicSelectSmart
  },
  data() {
    return {
      exampleValue: []
    };
  },
  template: "<unnnic-select-smart v-bind=\\"$props\\" v-model=\\"exampleValue\\" />"
})`}};const D=c.bind({});D.storyName="Disabled";D.args={options:[{value:"",label:"Select some option"}],disabled:!0};D.parameters={storySource:{source:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicSelectSmart
  },
  data() {
    return {
      exampleValue: []
    };
  },
  template: "<unnnic-select-smart v-bind=\\"$props\\" v-model=\\"exampleValue\\" />"
})`}};const B=c.bind({});B.storyName="WithDescriptions";B.args={options:[{value:"",label:"Select some option"},{value:"1",label:"Option 1",description:"This is the first option"},{value:"2",label:"Option 2",description:"Another alternative you can consider"},{value:"3",label:"Option 3",description:"A third option for your consideration"},{value:"4",label:"Option 4",description:"Yet another choice among the options"},{value:"5",label:"Option 5",description:"The last option available for selection"}]};B.parameters={storySource:{source:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicSelectSmart
  },
  data() {
    return {
      exampleValue: []
    };
  },
  template: "<unnnic-select-smart v-bind=\\"$props\\" v-model=\\"exampleValue\\" />"
})`}};const M=c.bind({});M.storyName="Autocomplete";M.args={options:[{value:"",label:"Select some option"},{value:"united_states",label:"Estados Unidos"},{value:"brazil",label:"Brasil"},{value:"china",label:"China"},{value:"india",label:"Índia"},{value:"russia",label:"Rússia"},{value:"japan",label:"Japão"},{value:"germany",label:"Alemanha"},{value:"france",label:"França"},{value:"canada",label:"Canadá"},{value:"australia",label:"Austrália"},{value:"south_korea",label:"Coreia do Sul"},{value:"mexico",label:"México"},{value:"egypt",label:"Egito"},{value:"south_africa",label:"África do Sul"},{value:"turkey",label:"Turquia"},{value:"nigeria",label:"Nigéria"},{value:"argentina",label:"Argentina"},{value:"italy",label:"Itália"},{value:"spain",label:"Espanha"},{value:"saudi_arabia",label:"Arábia Saudita"}],autocomplete:!0,autocompleteClearOnFocus:!0,autocompleteIconLeft:!0};M.parameters={storySource:{source:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicSelectSmart
  },
  data() {
    return {
      exampleValue: []
    };
  },
  template: "<unnnic-select-smart v-bind=\\"$props\\" v-model=\\"exampleValue\\" />"
})`}};const z=c.bind({});z.storyName="Multiple";z.args={options:[{value:"",label:"Select some countries"},{value:"united_states",label:"Estados Unidos"},{value:"brazil",label:"Brasil"},{value:"china",label:"China"},{value:"india",label:"Índia"},{value:"russia",label:"Rússia"},{value:"japan",label:"Japão"},{value:"germany",label:"Alemanha"},{value:"france",label:"França"},{value:"canada",label:"Canadá"},{value:"australia",label:"Austrália"},{value:"south_korea",label:"Coreia do Sul"},{value:"mexico",label:"México"},{value:"egypt",label:"Egito"},{value:"south_africa",label:"África do Sul"},{value:"turkey",label:"Turquia"},{value:"nigeria",label:"Nigéria"},{value:"argentina",label:"Argentina"},{value:"italy",label:"Itália"},{value:"spain",label:"Espanha"},{value:"saudi_arabia",label:"Arábia Saudita"}],multiple:!0,multipleWithoutSelectsMessage:"No country selected yet :("};z.parameters={storySource:{source:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicSelectSmart
  },
  data() {
    return {
      exampleValue: []
    };
  },
  template: "<unnnic-select-smart v-bind=\\"$props\\" v-model=\\"exampleValue\\" />"
})`}};const k={title:"Select/SelectSmart",decorators:[()=>({template:'<div style="marginBottom: 200px"><story /></div>'})],component:I,tags:["stories-mdx"],includeStories:["defaultStory","firstSelected","orderedByIndex","disabled","withDescriptions","autocomplete","multiple"]};k.parameters=k.parameters||{};k.parameters.docs={...k.parameters.docs||{},page:_e};const qe=["Template","defaultStory","firstSelected","orderedByIndex","disabled","withDescriptions","autocomplete","multiple"];export{c as Template,qe as __namedExportsOrder,M as autocomplete,k as default,T as defaultStory,D as disabled,E as firstSelected,z as multiple,N as orderedByIndex,B as withDescriptions};
//# sourceMappingURL=SelectSmart.stories-e1a87f50.js.map
