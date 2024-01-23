import{b as v,d as n,f as s,t as i,o as d}from"./vue.esm-bundler-afa73d68.js";import{_ as p}from"./_plugin-vue_export-helper-c27b6911.js";import{u as y}from"./Button-8f3e170e.js";import{u as _,a as f}from"./DropdownItem-ad2a5953.js";import{U as g}from"./Icon-777631f3.js";import"./index-793ecb6f.js";const l={name:"unnnic-comment",components:{},props:{title:{type:String,default:null},time:{type:String,default:null},text:{type:String,default:null}}},w={class:"unnnic-comment"},h={class:"unnnic-comment__avatar"},x={class:"unnnic-comment__content"},b={class:"unnnic-comment__content__header"},D={class:"unnnic-comment__content__header__title"},T={class:"unnnic-comment__content__header__time"},C={class:"unnnic-comment__content__header__actions"},z={class:"unnnic-comment__content__text"};function I(t,r,o,S,B,H){return d(),v("div",w,[n("div",h,[s(t.$slots,"avatar",{},void 0,!0)]),n("div",x,[n("div",b,[n("div",D,i(o.title),1),n("div",T,i(o.time),1),n("div",C,[s(t.$slots,"actions",{},void 0,!0)])]),n("div",z,i(o.text),1)])])}const u=p(l,[["render",I],["__scopeId","data-v-ebcc19e4"]]);l.__docgenInfo={displayName:"unnnic-comment",exportName:"default",description:"",tags:{},props:[{name:"title",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"time",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"text",type:{name:"string"},defaultValue:{func:!1,value:"null"}}],slots:[{name:"avatar"},{name:"actions"}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Comment/Comment.vue"]};const $={title:"Example/Comment",component:u},N=(t,{argTypes:r})=>({props:Object.keys(r),components:{unnnicComment:u,unnnicButton:y,unnnicDropdown:_,unnnicDropdownItem:f,unnnicIconSvg:g},template:`
  <unnnic-comment v-bind="$props">
    <img slot="avatar" src="https://images.unsplash.com/photo-1568564321589-3e581d074f9b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTl8fGRvZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80" />
    <template v-slot:actions>
    <unnnic-dropdown>
      <template v-slot:trigger>
        <unnnic-icon-svg
          slot="trigger"
          icon="navigation-menu-vertical-1"
          size="sm"
        />
      </template>
      <unnnic-dropdown-item>
        <unnnic-button
          type="tertiary"
          iconLeft="pencil-write-1"
          text="Edit comment"
          size="small"
        />
      </unnnic-dropdown-item>
      <unnnic-dropdown-item>
        <unnnic-button
          type="tertiary"
          iconLeft="delete-1"
          text="Delete Comment"
          size="small"
        />
      </unnnic-dropdown-item>
    </unnnic-dropdown>
    </template>
  </unnnic-comment>
  `}),e=N.bind({});e.args={avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8qiVsOfzasQWdcm81N6WmPicyHp50mMkvgw&usqp=CAU",title:"This is the username",time:"- 2 hours ago",text:"This is a very very very very very very very very very very very long comment This is a very very very very very very very very very very very long comment This is a very very very very very very very very very very very long comment This is a very very very very very very very very very very very long comment This is a very very very very very very very very very very very long comment"};var c,a,m;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicComment,
    unnnicButton,
    unnnicDropdown,
    unnnicDropdownItem,
    unnnicIconSvg
  },
  template: \`
  <unnnic-comment v-bind="$props">
    <img slot="avatar" src="https://images.unsplash.com/photo-1568564321589-3e581d074f9b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTl8fGRvZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80" />
    <template v-slot:actions>
    <unnnic-dropdown>
      <template v-slot:trigger>
        <unnnic-icon-svg
          slot="trigger"
          icon="navigation-menu-vertical-1"
          size="sm"
        />
      </template>
      <unnnic-dropdown-item>
        <unnnic-button
          type="tertiary"
          iconLeft="pencil-write-1"
          text="Edit comment"
          size="small"
        />
      </unnnic-dropdown-item>
      <unnnic-dropdown-item>
        <unnnic-button
          type="tertiary"
          iconLeft="delete-1"
          text="Delete Comment"
          size="small"
        />
      </unnnic-dropdown-item>
    </unnnic-dropdown>
    </template>
  </unnnic-comment>
  \`
})`,...(m=(a=e.parameters)==null?void 0:a.docs)==null?void 0:m.source}}};const j=["Default"];export{e as Default,j as __namedExportsOrder,$ as default};
//# sourceMappingURL=Comment.stories-7efdc8fa.js.map
