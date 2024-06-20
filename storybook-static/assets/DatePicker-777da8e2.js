import{u as M}from"./Button-c6487f3f.js";import{d as h,F as m,n as f,g as S,f as c,m as p,e as b,o,x as g,p as _,L as w,t as D,q as k,s as z}from"./vue.esm-bundler-fb65849e.js";import{_ as Y}from"./_plugin-vue_export-helper-c27b6911.js";const v={components:{unnnicButton:M},props:{initialStartDate:String,initialEndDate:String,type:{type:String,default:"day",validator(e){return["day","month","year"].includes(e)}},size:{type:String,default:"large",validator(e){return["small","large"].includes(e)}},clearLabel:{type:String},actionLabel:{type:String},months:{type:Array,default(){return["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]},validator(e){return e.length===12}},days:{type:Array,default(){return["D","S","T","Q","Q","S","S"]},validator(e){return e.length===7}},options:{type:Array,default(){return[{name:"Últimos 7 dias",id:"last-7-days"},{name:"Últimos 14 dias",id:"last-14-days"},{name:"Últimos 30 dias",id:"last-30-days"},{name:"Últimos 12 meses",id:"last-12-months"},{name:"Mês Atual",id:"current-month"},{name:"Personalizar",id:"custom"}]}}},data(){const e=new Date;return{referenceDate:`${e.getMonth()+1} 1 ${e.getFullYear()}`,startDate:(this.initialStartDate||"").replace(/-/g," "),endDate:(this.initialEndDate||"").replace(/-/g," "),optionSelected:""}},computed:{openMonths(){return[this.referenceDate,this.addMonth(this.referenceDate,1)]},value(){return{startDate:this.startDate.replaceAll(" ","-"),endDate:this.endDate.replaceAll(" ","-")}}},watch:{value({startDate:e,endDate:t}){this.optionSelected=e||t?"custom":"",this.$emit("change",this.value)}},methods:{dateToString(e){return`${e.getMonth()+1} ${e.getDate()} ${e.getFullYear()}`},dateToStringMonth(e){return`${e.getMonth()+1} ${e.getFullYear()}`},dateToStringYear(e){return e.getFullYear()},stringToTime(e){return new Date(e).getTime()},getDate(e){return new Date(e.toString()).getDate()},getMonth(e){return new Date(e).getMonth()},getFullYear(e){return new Date(e).getFullYear()},addMonth(e,t){const s=new Date(e);return s.setMonth(s.getMonth()+t),this.dateToString(s)},isDateBetween(e){if(this.startDate&&this.endDate){if(e>=this.stringToTime(this.startDate)&&e<=this.stringToTime(this.endDate))return!0}else{if(this.startDate&&e>=this.stringToTime(this.startDate))return!0;if(this.endDate&&e<=this.stringToTime(this.endDate))return!0}return!1},isDateBetweenMonth(e){const t=new Date(this.startDate);t.setDate(1);const s=t.getTime();if(this.startDate&&this.endDate){if(e>=s&&e<=this.stringToTime(this.endDate))return!0}else{if(this.startDate&&e>=s)return!0;if(this.endDate&&e<=this.stringToTime(this.endDate))return!0}return!1},isDateBetweenYear(e){const t=new Date(this.startDate);t.setDate(1),t.setMonth(0);const s=t.getTime();if(this.startDate&&this.endDate){if(e>=s&&e<=this.stringToTime(this.endDate))return!0}else{if(this.startDate&&e>=s)return!0;if(this.endDate&&e<=this.stringToTime(this.endDate))return!0}return!1},getDatesOfTheMonth(e){const t=new Date(e),s=t.getMonth(),u=86400;t.setDate(1-t.getDay());const a=[];for(let i=0;i<6*7;i+=1){const d=this.dateToString(t),r=[];if(s===t.getMonth()){r.push("inside month");const n=this.stringToTime(this.dateToString(t)),l=n-u,y=n+u;this.isDateBetween(n)&&(r.push("selected"),this.isDateBetween(l)||r.push("left-highlighted"),this.isDateBetween(y)||r.push("right-highlighted"),(r.includes("left-highlighted")||r.includes("right-highlighted"))&&r.push("highlighted"))}this.dateToString(t)===this.dateToString(new Date)&&r.push("today"),a.push({properties:r,toString:()=>d}),t.setDate(t.getDate()+1)}return a},getMonthsOfTheYear(e){const t=new Date(e);t.setMonth(0);const s=[];for(let u=0;u<3*4;u+=1){const a=this.dateToString(t),i=[];i.push("inside month");const d=this.stringToTime(this.dateToString(t));let r=new Date(d),n=new Date(d);r.setMonth(r.getMonth()-1),n.setMonth(n.getMonth()+1),r=r.getTime(),n=n.getTime(),this.isDateBetweenMonth(d)&&(i.push("selected"),this.isDateBetweenMonth(r)||i.push("left-highlighted"),this.isDateBetweenMonth(n)||i.push("right-highlighted"),(i.includes("left-highlighted")||i.includes("right-highlighted"))&&i.push("highlighted")),this.dateToStringMonth(t)===this.dateToStringMonth(new Date)&&i.push("today"),s.push({properties:i,date:a,toString:()=>a}),t.setMonth(t.getMonth()+1)}return s},getYears(e){const t=new Date(e);t.setMonth(0);const s=[];for(let u=0;u<3*4;u+=1){const a=this.dateToString(t),i=[];i.push("inside month");const d=this.stringToTime(this.dateToString(t));let r=new Date(d),n=new Date(d);r.setMonth(r.getMonth()-12),n.setMonth(n.getMonth()+12),r=r.getTime(),n=n.getTime(),this.isDateBetweenYear(d)&&(i.push("selected"),this.isDateBetweenYear(r)||i.push("left-highlighted"),this.isDateBetweenYear(n)||i.push("right-highlighted"),(i.includes("left-highlighted")||i.includes("right-highlighted"))&&i.push("highlighted")),this.dateToStringYear(t)===this.dateToStringYear(new Date)&&i.push("today"),s.push({properties:i,date:t.getFullYear(),toString:()=>a}),t.setFullYear(t.getFullYear()+1)}return s},selectDate(e){if(!this.startDate||!this.endDate)this.startDate=e.toString(),this.endDate=this.startDate;else{const t=this.stringToTime(e.toString()),s=this.stringToTime(this.startDate),u=this.stringToTime(this.endDate);t>u?this.endDate=e.toString():t<s?this.startDate=e.toString():t===s||t===u?(this.startDate=e.toString(),this.endDate=this.startDate):t-s<u-t?this.startDate=e.toString():this.endDate=e.toString()}},clear(){this.startDate="",this.endDate="",this.optionSelected=""},autoSelect(e){const t=new Date,s=e.match(/^last-(\d+)-days$/),u=e.match(/^last-(\d+)-months$/);if(s){const a=Number(s[1]);this.endDate=this.dateToString(t),t.setDate(t.getDate()-a+1),this.startDate=this.dateToString(t)}else if(u){const a=Number(u[1]);this.endDate=this.dateToString(t),t.setDate(t.getDate()+1),t.setMonth(t.getMonth()-a),this.startDate=this.dateToString(t)}else e==="current-month"&&(t.setDate(1),this.startDate=this.dateToString(t),t.setMonth(t.getMonth()+1),t.setDate(0),this.endDate=this.dateToString(t));if(this.endDate){const a=this.addMonth(this.referenceDate,1),i=`${this.getMonth(this.endDate)+1} 1 ${this.getFullYear(this.endDate)}`;[this.referenceDate,a].includes(i)||(this.referenceDate=i)}this.$nextTick(()=>{this.optionSelected=e})}}},T=e=>(k("data-v-eca3eb88"),e=e(),z(),e),C={class:"unnnic-date-picker"},A={class:"month-container"},B=["onClick"],F=T(()=>c("div",{class:"divider"},null,-1)),I={class:"month-container"},N=["onClick"],x=T(()=>c("div",{class:"divider"},null,-1)),L={class:"month-container"},V=["onClick"],O=T(()=>c("div",{class:"divider"},null,-1)),P={key:3,class:"options-container"},E={class:"options"},J=["onClick"],Q={class:"actions"};function U(e,t,s,u,a,i){const d=b("unnnic-button");return o(),h("div",C,[s.type==="day"?(o(!0),h(m,{key:0},f(i.openMonths,(r,n)=>(o(),h(m,{key:r},[c("div",A,[c("div",{class:g(["header",`header--${s.size}`])},[p(d,{size:"small","icon-center":`arrow-${n===0?"left":"right"}-1-1`,type:s.size==="large"?"secondary":"tertiary",class:"button-space",style:_({gridArea:`${n===0?"left":"right"}-button`}),onClick:w(l=>a.referenceDate=i.addMonth(a.referenceDate,n===0?-1:1),["stop"])},null,8,["icon-center","type","style","onClick"]),c("div",{class:g(["label",`label--${s.size}`])},D(s.months[i.getMonth(r)])+" "+D(i.getFullYear(r)),3)],2),c("div",{class:g(["days",`days--${s.size}`])},[(o(!0),h(m,null,f(s.days,(l,y)=>(o(),h("div",{key:y,class:"name"},D(l),1))),128)),(o(!0),h(m,null,f(i.getDatesOfTheMonth(r),(l,y)=>(o(),h("div",{key:`${r}-${y}`,class:g({disabled:!l.properties.includes("inside month"),selectable:l.properties.includes("inside month"),today:l.properties.includes("today"),selected:l.properties.includes("selected"),highlighted:l.properties.includes("highlighted"),left:l.properties.includes("left-highlighted"),right:l.properties.includes("right-highlighted")}),onClick:q=>l.properties.includes("inside month")&&i.selectDate(l)},D(i.getDate(l)),11,B))),128))],2)]),F],64))),128)):s.type==="month"?(o(!0),h(m,{key:1},f([a.referenceDate],r=>(o(),h(m,{key:r},[c("div",I,[c("div",{class:g(["header",`header--${s.size}`])},[p(d,{size:"small","icon-center":"arrow-left-1-1",type:s.size==="large"?"secondary":"tertiary",class:"button-space",style:{gridArea:"left-button"},onClick:t[0]||(t[0]=n=>a.referenceDate=i.addMonth(a.referenceDate,-12))},null,8,["type"]),c("div",{class:g(["label",`label--${s.size}`])},D(i.getFullYear(r)),3),p(d,{size:"small","icon-center":"arrow-right-1-1",type:s.size==="large"?"secondary":"tertiary",class:"button-space",style:{gridArea:"right-button"},onClick:t[1]||(t[1]=n=>a.referenceDate=i.addMonth(a.referenceDate,12))},null,8,["type"])],2),c("div",{class:g(["days",`months--${s.size}`])},[(o(!0),h(m,null,f(i.getMonthsOfTheYear(r),(n,l)=>(o(),h("div",{key:`${r}-${l}`,class:g({disabled:!n.properties.includes("inside month"),selectable:n.properties.includes("inside month"),today:n.properties.includes("today"),selected:n.properties.includes("selected"),highlighted:n.properties.includes("highlighted"),left:n.properties.includes("left-highlighted"),right:n.properties.includes("right-highlighted")}),onClick:y=>n.properties.includes("inside month")&&i.selectDate(n)},D(s.months[i.getMonth(n)].substr(0,3)),11,N))),128))],2)]),x],64))),128)):s.type==="year"?(o(!0),h(m,{key:2},f([a.referenceDate],r=>(o(),h(m,{key:r},[c("div",L,[c("div",{class:g(["header",`header--${s.size}`])},[p(d,{size:"small","icon-center":"arrow-left-1-1",type:s.size==="large"?"secondary":"tertiary",class:"button-space",style:{gridArea:"left-button"},onClick:t[2]||(t[2]=n=>a.referenceDate=i.addMonth(a.referenceDate,-12*12))},null,8,["type"]),c("div",{class:g(["label",`label--${s.size}`])},D(i.getFullYear(r)),3),p(d,{size:"small","icon-center":"arrow-right-1-1",type:s.size==="large"?"secondary":"tertiary",class:"button-space",style:{gridArea:"right-button"},onClick:t[3]||(t[3]=n=>a.referenceDate=i.addMonth(a.referenceDate,12*12))},null,8,["type"])],2),c("div",{class:g(["days",`months--${s.size}`])},[(o(!0),h(m,null,f(i.getYears(r),(n,l)=>(o(),h("div",{key:`${r}-${l}`,class:g({disabled:!n.properties.includes("inside month"),selectable:n.properties.includes("inside month"),today:n.properties.includes("today"),selected:n.properties.includes("selected"),highlighted:n.properties.includes("highlighted"),left:n.properties.includes("left-highlighted"),right:n.properties.includes("right-highlighted")}),onClick:y=>n.properties.includes("inside month")&&i.selectDate(n)},D(n.date),11,V))),128))],2)]),O],64))),128)):S("",!0),s.size!=="small"?(o(),h("div",P,[c("div",E,[(o(!0),h(m,null,f(s.options,(r,n)=>(o(),h("div",{class:g(["option",{selected:a.optionSelected===r.id}]),key:n,onClick:l=>i.autoSelect(r.id)},D(r.name),11,J))),128))]),c("div",Q,[p(d,{size:"small",text:s.clearLabel,type:"tertiary",onClick:i.clear},null,8,["text","onClick"]),p(d,{size:"small",text:s.actionLabel,type:"secondary",onClick:t[4]||(t[4]=r=>e.$emit("submit",i.value))},null,8,["text"])])])):S("",!0)])}const H=Y(v,[["render",U],["__scopeId","data-v-eca3eb88"]]);v.__docgenInfo={exportName:"default",displayName:"DatePicker",description:"",tags:{},props:[{name:"initialStartDate",type:{name:"string"}},{name:"initialEndDate",type:{name:"string"}},{name:"type",type:{name:"string"},defaultValue:{func:!1,value:"'day'"},values:["day","month","year"]},{name:"size",type:{name:"string"},defaultValue:{func:!1,value:"'large'"},values:["small","large"]},{name:"clearLabel",type:{name:"string"}},{name:"actionLabel",type:{name:"string"}},{name:"months",type:{name:"array"},defaultValue:{func:!1,value:`[\r
  'Janeiro',\r
  'Fevereiro',\r
  'Março',\r
  'Abril',\r
  'Maio',\r
  'Junho',\r
  'Julho',\r
  'Agosto',\r
  'Setembro',\r
  'Outubro',\r
  'Novembro',\r
  'Dezembro',\r
]`}},{name:"days",type:{name:"array"},defaultValue:{func:!1,value:"['D', 'S', 'T', 'Q', 'Q', 'S', 'S']"}},{name:"options",type:{name:"array"},defaultValue:{func:!1,value:`[{\r
  name: 'Últimos 7 dias',\r
  id: 'last-7-days',\r
}, {\r
  name: 'Últimos 14 dias',\r
  id: 'last-14-days',\r
}, {\r
  name: 'Últimos 30 dias',\r
  id: 'last-30-days',\r
}, {\r
  name: 'Últimos 12 meses',\r
  id: 'last-12-months',\r
}, {\r
  name: 'Mês Atual',\r
  id: 'current-month',\r
}, {\r
  name: 'Personalizar',\r
  id: 'custom',\r
}]`}}],events:[{name:"submit"},{name:"change",type:{names:["undefined"]}}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/DatePicker/DatePicker.vue"]};export{H as U};