import{u as o}from"./TransitionRipple-1566059b.js";import{c as s}from"./colorsList-72763225.js";import"./vue.esm-bundler-3f98aba2.js";import"./_plugin-vue_export-helper-c27b6911.js";const u={title:"Transitions/Ripple",component:o,argTypes:{color:{control:{type:"select",options:s}}}},p=(a,{argTypes:r})=>({props:Object.keys(r),components:{unnnicTransitionRipple:o},template:`
    <div ref="transitionContainer" @mousedown="(event) => this.$refs.transitionRipple.addRipple(event)" style="width: 100%; height: 100px;">
      Click to activate transition

      <unnnic-transition-ripple ref="transitionRipple" v-bind="$props" />
    </div>
  `}),n=p.bind({});n.args={color:"weni-600"};var t,e,i;n.parameters={...n.parameters,docs:{...(t=n.parameters)==null?void 0:t.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicTransitionRipple
  },
  template: \`
    <div ref="transitionContainer" @mousedown="(event) => this.$refs.transitionRipple.addRipple(event)" style="width: 100%; height: 100px;">
      Click to activate transition

      <unnnic-transition-ripple ref="transitionRipple" v-bind="$props" />
    </div>
  \`
})`,...(i=(e=n.parameters)==null?void 0:e.docs)==null?void 0:i.source}}};const v=["Default"];export{n as Default,v as __namedExportsOrder,u as default};
//# sourceMappingURL=TransitionRipple.stories-03a55c22.js.map
