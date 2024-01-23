import{U as r}from"./DatePicker-91acf963.js";import"./Button-5e6ad622.js";import"./Icon-b41b8868.js";import"./vue.esm-bundler-3f98aba2.js";import"./_plugin-vue_export-helper-c27b6911.js";const y={title:"example/DatePicker",component:r,argTypes:{type:{control:{type:"select"},options:["day","month","year"]},size:{control:{type:"select"},options:["small","large"]},months:{control:{type:"array"}},days:{control:{type:"array"}},options:{control:{type:"array"}},clearLabel:{control:{type:"text"}},actionLabel:{control:{type:"text"}}}},i=(s,{argTypes:o})=>({props:Object.keys(o),components:{unnnicDatePicker:r},data(){return{}},template:`
    <div>
      <unnnic-date-picker v-bind="$props" initial-start-date="12-01-2021" initial-end-date="12-31-2021"></unnnic-date-picker>
    </div>
  `,methods:{}}),e=i.bind({});e.args={size:"large",clearLabel:"Limpar",actionLabel:"Filtrar",months:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],days:["D","S","T","Q","Q","S","S"],options:[{name:"Últimos 7 dias",id:"last-7-days"},{name:"Últimos 14 dias",id:"last-14-days"},{name:"Últimos 30 dias",id:"last-30-days"},{name:"Últimos 12 meses",id:"last-12-months"},{name:"Mês Atual",id:"current-month"},{name:"Personalizar",id:"custom"}]};var t,a,n;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicDatePicker
  },
  data() {
    return {};
  },
  template: \`
    <div>
      <unnnic-date-picker v-bind="$props" initial-start-date="12-01-2021" initial-end-date="12-31-2021"></unnnic-date-picker>
    </div>
  \`,
  methods: {}
})`,...(n=(a=e.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};const u=["Default"];export{e as Default,u as __namedExportsOrder,y as default};
//# sourceMappingURL=DatePicker.stories-0b7055b7.js.map
