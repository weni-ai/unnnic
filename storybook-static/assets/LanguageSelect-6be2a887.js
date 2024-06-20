import{v as F}from"./index-913e4039.js";import{U as y}from"./Icon-6670ffc4.js";import{e as m,o as l,k as L,u as _,d as c,f as o,m as u,F as d,n as f,x as h,p as w,t as p,g as k,M as I}from"./vue.esm-bundler-fb65849e.js";import{_ as C}from"./_plugin-vue_export-helper-c27b6911.js";import{u as N}from"./config-28154cde.js";const z={name:"Flag",components:{UnnnicIconSvg:y},props:{code:{type:String,default:null},size:{type:String,default:"md",validator(n){return["nano","xs","sm","md","lg"].indexOf(n)!==-1}}},computed:{name(){return{"pt-br":"Brazil",en:"USA",es:"Spain"}[this.code]}}};function V(n,i,a,b,t,e){const r=m("unnnic-icon-svg");return l(),L(r,{icon:e.name,size:a.size},null,8,["icon","size"])}const O=C(z,[["render",V]]);z.__docgenInfo={displayName:"Flag",exportName:"default",description:"",tags:{},props:[{name:"code",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"size",type:{name:"string"},defaultValue:{func:!1,value:"'md'"},values:["nano","xs","sm","md","lg"]}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Flag.vue"]};const S={name:"LanguageSelect",components:{unnnicFlag:O,UnnnicIcon:y},props:{value:{type:String,default:""},position:{type:String,default:"top-right"},contracted:{type:Boolean,default:!1},supportedLanguages:{type:Array,default:()=>["pt-br","en"]}},directives:{onClickOutside:F},methods:{onClickTrigger(){this.open=!this.open},onClickOutside(){this.open&&(this.open=!1)}},data(){return{open:!1,val:this.value,unnnicFontSize:N}},watch:{val(){this.$emit("input",this.val)},value(){this.val=this.value}},computed:{languages(){const n={"pt-br":"Português - Brasil",en:"English",es:"Español"};return this.supportedLanguages.reduce((i,a)=>({...i,[a]:n[a]}),{})},otherLanguages(){return this.languageList.filter(({id:n})=>n!==this.val)},languageList(){return Object.entries(this.languages).map(([n,i])=>({id:n,name:i}))},dropdownIcon(){let n="";return this.position==="bottom"?n=this.open?"up":"down":n=this.open?"down":"up",`arrow-button-${n}-1`}}},B={key:0,class:"unnnic-language-select contracted"},D={class:"option"},U=["onClick"],E={key:1,class:"unnnic-language-select normal"},T={class:"option"},A={class:"label"},W=o("div",{class:"divider"},null,-1),j=["onClick"],M={class:"label"},P=o("div",{class:"divider"},null,-1),q={class:"option"},G={class:"label"};function H(n,i,a,b,t,e){const r=m("unnnic-flag"),g=m("unnnic-icon"),v=I("on-click-outside");return a.contracted?_((l(),c("div",B,[o("div",{class:h(["container contracted",{open:t.open}]),onClick:i[0]||(i[0]=(...s)=>e.onClickTrigger&&e.onClickTrigger(...s))},[o("div",D,[u(r,{size:"sm",code:t.val},null,8,["code"])]),(l(!0),c(d,null,f(e.otherLanguages,s=>(l(),c("div",{key:s.id,class:"option",onClick:x=>t.val=s.id},[u(r,{size:"sm",code:s.id},null,8,["code"])],8,U))),128))],2)])),[[v,e.onClickOutside]]):_((l(),c("div",E,[o("div",{class:h(["container normal",{open:t.open}]),onClick:i[1]||(i[1]=(...s)=>e.onClickTrigger&&e.onClickTrigger(...s))},[o("div",{style:w({position:"absolute",[a.position==="bottom"?"top":"bottom"]:-.125*t.unnnicFontSize+"px",width:"100%",padding:.0625*t.unnnicFontSize+"px",left:-.0625*t.unnnicFontSize+"px"}),class:"all"},[a.position==="bottom"?(l(),c(d,{key:0},[o("div",T,[u(r,{size:"sm",code:t.val},null,8,["code"]),o("div",A,p(e.languages[t.val]),1),u(g,{size:"xs",icon:e.dropdownIcon,scheme:"neutral-clean"},null,8,["icon"])]),W],64)):k("",!0),(l(!0),c(d,null,f(e.otherLanguages,s=>(l(),c("div",{class:"option",key:s.id,onClick:x=>t.val=s.id},[u(r,{size:"sm",code:s.id},null,8,["code"]),o("div",M,p(e.languages[s.id]),1)],8,j))),128)),a.position!=="bottom"?(l(),c(d,{key:1},[P,o("div",q,[u(r,{size:"sm",code:t.val},null,8,["code"]),o("div",G,p(e.languages[t.val]),1),u(g,{size:"xs",icon:e.dropdownIcon,scheme:"neutral-clean"},null,8,["icon"])])],64)):k("",!0)],4)],2)])),[[v,e.onClickOutside]])}const Y=C(S,[["render",H]]);S.__docgenInfo={displayName:"LanguageSelect",exportName:"default",description:"",tags:{},props:[{name:"value",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"position",type:{name:"string"},defaultValue:{func:!1,value:"'top-right'"}},{name:"contracted",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"supportedLanguages",type:{name:"array"},defaultValue:{func:!1,value:"['pt-br', 'en']"}}],events:[{name:"input",type:{names:["undefined"]}}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Dropdown/LanguageSelect.vue"]};export{Y as l};