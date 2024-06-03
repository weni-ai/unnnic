import{d as l,j as u,u as c,v as m,f,F as d,n as g,x as r,p as x,o as n,y as v,t as y,q as _,s as b}from"./vue.esm-bundler-fb65849e.js";import{_ as P}from"./_plugin-vue_export-helper-c27b6911.js";const h={name:"unnnic-tooltip",mounted(){this.handleResize(),window.addEventListener("scroll",this.handleResize),window.addEventListener("resize",this.handleResize)},unmounted(){window.removeEventListener("scroll",this.handleResize),window.removeEventListener("resize",this.handleResize)},watch:{side(){this.getRightPost(this.$refs.tooltip)}},data(){return{topPos:null,leftPos:null}},props:{text:{type:String,default:null},enabled:{type:Boolean,default:!1},forceOpen:{type:Boolean,default:!1},side:{type:String,default:"right",validator(t){return["top","right","bottom","left"].indexOf(t)!==-1}},maxWidth:{type:String}},methods:{handleResize(){this.getRightPost(this.$refs.tooltip)},getRightPost(t){const e=t.getBoundingClientRect();t&&this.$refs.label&&(this.side==="right"?(this.leftPos=`${e.x+e.width+8}px`,this.topPos=`${e.y+e.height/2-this.$refs.label.offsetHeight/2}px`):this.side==="left"?(this.leftPos=`${e.x-this.$refs.label.offsetWidth-8}px`,this.topPos=`${e.y+e.height/2-this.$refs.label.offsetHeight/2}px`):this.side==="top"?(this.leftPos=`${e.x+e.width/2-this.$refs.label.clientWidth/2}px`,this.topPos=`${e.y-this.$refs.label.offsetHeight-8}px`):this.side==="bottom"&&(this.leftPos=`${e.x+e.width/2-this.$refs.label.clientWidth/2}px`,this.topPos=`${e.y+e.height+8}px`))}}},w=t=>(_("data-v-e930291d"),t=t(),b(),t),$=w(()=>f("br",null,null,-1));function z(t,e,s,R,o,a){return n(),l("div",{ref:"tooltip",class:r({"unnnic-tooltip":s.enabled,"force-open":s.forceOpen}),onMouseover:e[0]||(e[0]=(...i)=>a.handleResize&&a.handleResize(...i))},[u(t.$slots,"default",{},void 0,!0),c(f("span",{ref:"label",class:r(["unnnic-tooltip-label",`unnnic-tooltip-label-${s.side}`]),style:x({maxWidth:s.maxWidth,left:o.leftPos,top:o.topPos})},[(n(!0),l(d,null,g(s.text.split(`
`),(i,p)=>(n(),l(d,{key:p},[v(y(i)+" ",1),$],64))),128))],6),[[m,s.enabled]])],34)}const W=P(h,[["render",z],["__scopeId","data-v-e930291d"]]);h.__docgenInfo={displayName:"unnnic-tooltip",exportName:"default",description:"",tags:{},props:[{name:"text",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"enabled",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"forceOpen",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"side",type:{name:"string"},defaultValue:{func:!1,value:"'right'"},values:["top","right","bottom","left"]},{name:"maxWidth",type:{name:"string"}}],slots:[{name:"default"}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/ToolTip/ToolTip.vue"]};export{W as u};