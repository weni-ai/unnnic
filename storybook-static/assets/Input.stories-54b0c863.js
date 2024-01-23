import{U as j}from"./Input-651f83bd.js";import{i as a}from"./iconList-d1dd560b.js";import"./TextInput-5ab46ce6.js";import"./_commonjsHelpers-725317a4.js";import"./vue.esm-bundler-3f98aba2.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./Icon-b41b8868.js";const A={title:"Form/Input",component:j,argTypes:{label:{control:{type:"text"}},size:{control:{type:"select"},options:["md","sm"]},type:{control:{type:"select"},options:["normal","error"]},nativeType:{control:{type:"select"},options:["text","password"]},placeholder:{control:{type:"text"}},iconLeft:{control:{type:"select"},options:a},iconRight:{control:{type:"select"},options:a},allowTogglePassword:{control:{type:"boolean"}},hasCloudyColor:{control:{type:"select"},options:[!0,!1]}}},e=($,{argTypes:x})=>({props:Object.keys(x),components:{unnnicInput:j},data(){return{v:""}},template:'<div><pre>v-model: {{ v }}</pre><unnnic-input v-bind="$props" v-model="v" /></div>'}),n=e.bind({});n.args={type:"normal",placeholder:"Placeholder"};const r=e.bind({});r.args={type:"error",placeholder:"Placeholder"};const o=e.bind({});o.args={disabled:!0,placeholder:"Placeholder"};const t=e.bind({});t.args={placeholder:"Password",nativeType:"password",allowTogglePassword:!0};const s=e.bind({});s.args={placeholder:"Text",iconLeft:"read-email-at-1",iconRight:"read-email-at-1"};const p=e.bind({});p.args={label:"CPF or CNPJ",placeholder:"Text",mask:["###.###.###-##","##.###.###/####-##"]};var c,d,i;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicInput
  },
  data() {
    return {
      v: ''
    };
  },
  template: '<div><pre>v-model: {{ v }}</pre><unnnic-input v-bind="$props" v-model="v" /></div>'
})`,...(i=(d=n.parameters)==null?void 0:d.docs)==null?void 0:i.source}}};var l,m,u;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicInput
  },
  data() {
    return {
      v: ''
    };
  },
  template: '<div><pre>v-model: {{ v }}</pre><unnnic-input v-bind="$props" v-model="v" /></div>'
})`,...(u=(m=r.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var v,g,y;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicInput
  },
  data() {
    return {
      v: ''
    };
  },
  template: '<div><pre>v-model: {{ v }}</pre><unnnic-input v-bind="$props" v-model="v" /></div>'
})`,...(y=(g=o.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};var b,T,h;t.parameters={...t.parameters,docs:{...(b=t.parameters)==null?void 0:b.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicInput
  },
  data() {
    return {
      v: ''
    };
  },
  template: '<div><pre>v-model: {{ v }}</pre><unnnic-input v-bind="$props" v-model="v" /></div>'
})`,...(h=(T=t.parameters)==null?void 0:T.docs)==null?void 0:h.source}}};var I,k,P;s.parameters={...s.parameters,docs:{...(I=s.parameters)==null?void 0:I.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicInput
  },
  data() {
    return {
      v: ''
    };
  },
  template: '<div><pre>v-model: {{ v }}</pre><unnnic-input v-bind="$props" v-model="v" /></div>'
})`,...(P=(k=s.parameters)==null?void 0:k.docs)==null?void 0:P.source}}};var w,f,O;p.parameters={...p.parameters,docs:{...(w=p.parameters)==null?void 0:w.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicInput
  },
  data() {
    return {
      v: ''
    };
  },
  template: '<div><pre>v-model: {{ v }}</pre><unnnic-input v-bind="$props" v-model="v" /></div>'
})`,...(O=(f=p.parameters)==null?void 0:f.docs)==null?void 0:O.source}}};const D=["Normal","Error","Disabled","Password","IconLeftAndRight","Mask"];export{o as Disabled,r as Error,s as IconLeftAndRight,p as Mask,n as Normal,t as Password,D as __namedExportsOrder,A as default};
//# sourceMappingURL=Input.stories-54b0c863.js.map
