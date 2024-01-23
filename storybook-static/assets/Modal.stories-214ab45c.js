import{c as y,a as s}from"./call-6be2df36.js";import{o as M,d as k}from"./vue.esm-bundler-fb65849e.js";import{_ as f}from"./_plugin-vue_export-helper-c27b6911.js";import{u as g}from"./Button-c6487f3f.js";import"./Icon-6670ffc4.js";const x={methods:{onClick(){y.callModal({props:{text:"Title",modalIcon:"alert-circle-1",description:"description",alertMessage:"alert message",scheme:"feedback-yellow"}})}}};function T(a,o,A,$,O,C){return M(),k("button",{onClick:o[0]||(o[0]=j=>C.onClick())}," click me ")}const _=f(x,[["render",T]]);x.__docgenInfo={exportName:"default",displayName:"CallModal",description:"",tags:{},sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Modal/CallModal.vue"]};const S={title:"Example/Modal",component:s,argTypes:{modalIcon:{control:{type:"select",options:["check-circle-1-1","alert-circle-1","delete-1"]}},text:{control:{type:"text"}},description:{control:{type:"text"}},scheme:{control:{type:"select",options:["feedback-red","feedback-green","feedback-yellow","feedback-blue","feedback-grey","aux-blue","aux-purple","aux-orange","aux-lemon","aux-pink"]}}}},B=(a,{argTypes:o})=>({props:Object.keys(o),components:{unnnicModal:s,unnnicButton:g},template:'<unnnic-modal v-bind="$props">Conteúdo do modal<br>Conteúdo do modal<br>Conteúdo do modal<br>Conteúdo do modal<br>Conteúdo do modal<br>Conteúdo do modal<br>Conteúdo do modalConteúdo do modal<br></unnnic-modal>'}),F=(a,{argTypes:o})=>({props:Object.keys(o),components:{unnnicModal:s,unnnicButton:g},template:'<unnnicModal v-bind="$props"><unnnic-button slot="options"> Button 1 </unnnic-button> <unnnic-button slot="options"> Button 2 </unnnic-button> </div> </unnnic-modal>'}),n=B.bind({});n.args={text:"Title text",description:"Message body",alertMessage:"Message alert",closeIcon:!0,showModal:!0};const e=F.bind({});e.args={text:"Title text",description:"Message body",alertMessage:"Message alert",closeIcon:!0,showModal:!0};const v=(a,{argTypes:o})=>({props:Object.keys(o),components:{unnnicCallModal:_},template:"<unnnic-call-modal />"}),t=v.bind({});var r,l,c;n.parameters={...n.parameters,docs:{...(r=n.parameters)==null?void 0:r.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicModal,
    unnnicButton
  },
  template: '<unnnic-modal v-bind="$props">Conteúdo do modal<br>Conteúdo do modal<br>Conteúdo do modal<br>Conteúdo do modal<br>Conteúdo do modal<br>Conteúdo do modal<br>Conteúdo do modalConteúdo do modal<br></unnnic-modal>'
})`,...(c=(l=n.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var d,p,i;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicModal,
    unnnicButton
  },
  template: '<unnnicModal v-bind="$props"><unnnic-button slot="options"> Button 1 </unnnic-button> <unnnic-button slot="options"> Button 2 </unnnic-button> </div> </unnnic-modal>'
})`,...(i=(p=e.parameters)==null?void 0:p.docs)==null?void 0:i.source}}};var m,u,b;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicCallModal
  },
  template: '<unnnic-call-modal />'
})`,...(b=(u=t.parameters)==null?void 0:u.docs)==null?void 0:b.source}}};const D=["Normal","Buttons","Call"];export{e as Buttons,t as Call,n as Normal,D as __namedExportsOrder,S as default};
