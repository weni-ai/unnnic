import{U as C}from"./Icon-b41b8868.js";import{u as I}from"./Checkbox-5e7d0d69.js";import{U as x}from"./AvatarIcon-6b8edf9b.js";import{u as D,a as U}from"./DropdownItem-0edd430d.js";import{b as t,d as o,t as r,e as d,i as m,g as V,w as u,F as O,j as N,A as S,a as l,o as e,f as B}from"./vue.esm-bundler-3f98aba2.js";import{_ as T}from"./_plugin-vue_export-helper-c27b6911.js";import"./index-39f25d77.js";const v={components:{UnnnicIcon:C,UnnnicCheckbox:I,UnnnicAvatarIcon:x,UnnnicDropdown:D},props:{modelValue:Boolean,title:String,description:String,image:String,data:{type:Array,default(){return[]}}}},F={class:"header"},j={class:"content"},z={key:0,class:"u font secondary body-lg bold color-neutral-darkest"},A={key:1,class:"u font secondary body-md color-neutral-cloudy"},E=["src"],L={key:0,class:"details"},W={class:"u font secondary body-gt color-neutral-dark"},q={class:"value-container"},G={class:"u font secondary body-gt black color-neutral-darkest"};function H(c,i,n,K,M,P){const f=l("unnnic-checkbox"),h=l("unnnic-icon"),b=l("unnnic-dropdown"),k=l("unnnic-avatar-icon");return e(),t("div",{class:S(["unnnic-card-image",{checked:n.modelValue}])},[o("div",F,[o("div",j,[n.title?(e(),t("div",z,r(n.title),1)):d("",!0),n.description?(e(),t("div",A,r(n.description),1)):d("",!0)]),m(f,{modelValue:n.modelValue,onChange:i[0]||(i[0]=a=>c.$emit("update:model-value",a))},null,8,["modelValue"]),c.$slots.actions?(e(),V(b,{key:0,position:"bottom-left"},{trigger:u(()=>[m(h,{icon:"navigation-menu-vertical-1",size:"sm",scheme:"neutral-cleanest",clickable:""})]),default:u(()=>[B(c.$slots,"actions",{},void 0,!0)],void 0),_:3})):d("",!0)]),o("img",{class:"image",src:n.image},null,8,E),n.data.length?(e(),t("div",L,[(e(!0),t(O,null,N(n.data,(a,w)=>(e(),t("div",{class:"data",key:w},[o("div",W,r(a.name),1),o("div",q,[m(k,{icon:a.icon,size:"xs",scheme:a.scheme},null,8,["icon","scheme"]),o("div",G,r(a.value),1)])]))),128))])):d("",!0)],2)}const y=T(v,[["render",H],["__scopeId","data-v-561b41e4"]]);v.__docgenInfo={exportName:"default",displayName:"CardImage",description:"",tags:{},props:[{name:"modelValue",type:{name:"boolean"}},{name:"title",type:{name:"string"}},{name:"description",type:{name:"string"}},{name:"image",type:{name:"string"}},{name:"data",type:{name:"array"},defaultValue:{func:!1,value:"[]"}}],events:[{name:"update:model-value"}],slots:[{name:"actions"}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/CardImage/CardImage.vue"]};const en={title:"card/CardImage",component:y,argTypes:{}},J=(c,{argTypes:i})=>({components:{UnnnicCardImage:y,UnnnicDropdownItem:U},props:Object.keys(i),data(){return{v:!1}},template:`<div><pre>v-model: {{ v }}</pre>
  <unnnic-card-image v-bind="$props" v-model="v">
  <template slot="actions">
    <unnnic-dropdown-item>
      Option 1
    </unnnic-dropdown-item>

    <unnnic-dropdown-item>
      Option 2
    </unnnic-dropdown-item>
  </template>
  </unnnic-card-image>
</div>`}),s=J.bind({});s.args={title:"Title Card",description:"Last edit",image:"https://picsum.photos/300/150",data:[{icon:"graph-stats-1",scheme:"aux-purple",name:"Data",value:"00"},{icon:"graph-stats-1",scheme:"aux-purple",name:"Data",value:"00"}]};var p,_,g;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  components: {
    UnnnicCardImage,
    UnnnicDropdownItem
  },
  props: Object.keys(argTypes),
  data() {
    return {
      v: false
    };
  },
  template: \`<div><pre>v-model: {{ v }}</pre>
  <unnnic-card-image v-bind="$props" v-model="v">
  <template slot="actions">
    <unnnic-dropdown-item>
      Option 1
    </unnnic-dropdown-item>

    <unnnic-dropdown-item>
      Option 2
    </unnnic-dropdown-item>
  </template>
  </unnnic-card-image>
</div>\`
})`,...(g=(_=s.parameters)==null?void 0:_.docs)==null?void 0:g.source}}};const an=["Default"];export{s as Default,an as __namedExportsOrder,en as default};
//# sourceMappingURL=CardImage.stories-49318fcc.js.map
