import{u as a}from"./Radio-bac75fc8.js";import"./vue.esm-bundler-fb65849e.js";import"./Icon-6670ffc4.js";import"./_plugin-vue_export-helper-c27b6911.js";const c={title:"Form/Radio",component:a,argTypes:{"on-update:model-value":{action:"@update:model-value"},value:{control:{type:"text"}},disabled:{control:{type:"boolean"}},size:{control:{type:"select",options:["md","sm"]}}}},d=(r,{argTypes:t})=>({props:Object.keys(t).concat(["input"]),components:{unnnicRadio:a},data(){return{insideValue:"option 1"}},template:`
    <div>
      v-model: {{ insideValue }}
      <br>

      <unnnic-radio v-bind="$props" v-model="insideValue" value="option 1">
        Option 1
      </unnnic-radio>

      <unnnic-radio v-bind="$props" v-model="insideValue" value="option 2">
        Option 2
      </unnnic-radio>

      <unnnic-radio v-bind="$props" v-model="insideValue" value="option 3">
        Option 3
      </unnnic-radio>
    </div>
  `}),n=d.bind({});n.args={disabled:!1,size:"md"};var o,i,e;n.parameters={...n.parameters,docs:{...(o=n.parameters)==null?void 0:o.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes).concat(['input']),
  components: {
    unnnicRadio
  },
  data() {
    return {
      insideValue: 'option 1'
    };
  },
  template: \`
    <div>
      v-model: {{ insideValue }}
      <br>

      <unnnic-radio v-bind="$props" v-model="insideValue" value="option 1">
        Option 1
      </unnnic-radio>

      <unnnic-radio v-bind="$props" v-model="insideValue" value="option 2">
        Option 2
      </unnnic-radio>

      <unnnic-radio v-bind="$props" v-model="insideValue" value="option 3">
        Option 3
      </unnnic-radio>
    </div>
  \`
})`,...(e=(i=n.parameters)==null?void 0:i.docs)==null?void 0:e.source}}};const m=["Default"];export{n as Default,m as __namedExportsOrder,c as default};
