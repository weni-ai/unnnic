import{c as a,u as s}from"./call-6be2df36.js";import{o as p,d}from"./vue.esm-bundler-fb65849e.js";import{_ as f}from"./_plugin-vue_export-helper-c27b6911.js";import"./Icon-6670ffc4.js";const c={props:{title:{type:String,default:null},text:{type:String,default:null},icon:{type:String,default:null},enabled:{type:Boolean,default:!0},scheme:{type:String,default:null},seconds:{type:Number,default:3},closeText:{type:String,default:null},position:{type:String,default:"top-right"}},methods:{callAlert(){a.callAlert({props:this.$props,seconds:this.seconds})}}};function m(i,t,y,k,x,n){return p(),d("button",{onClick:t[0]||(t[0]=(...u)=>n.callAlert&&n.callAlert(...u))}," Launch alert ")}const g=f(c,[["render",m]]);c.__docgenInfo={exportName:"default",displayName:"AlertCaller",description:"",tags:{},props:[{name:"title",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"text",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"icon",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"enabled",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"scheme",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"seconds",type:{name:"number"},defaultValue:{func:!1,value:"3"}},{name:"closeText",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"position",type:{name:"string"},defaultValue:{func:!1,value:"'top-right'"}}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Alert/AlertCaller.vue"]};const _={title:"example/Alert",component:s,argTypes:{text:{control:{type:"text"}},title:{control:{type:"text"}},closeText:{control:{type:"text"}},scheme:{control:{type:"select",options:["feedback-red","feedback-green","feedback-yellow","feedback-blue","feedback-grey","aux-blue","aux-purple","aux-orange","aux-lemon","aux-pink"]}},position:{control:{type:"select",options:["top-left","top-right","bottom-left","bottom-right","bottom-center"]}},icon:{control:{type:"select",options:["check-circle-1-1","check-circle-1-1-1","alert-circle-1-1"]}},seconds:{control:{type:"number"}},version:{control:{type:"select",options:["1.0","1.1"]}}}},h=(i,{argTypes:t})=>({props:Object.keys(t),components:{alertCaller:g,unnnicAlert:s},template:`
<div>
  <button @click="unnnicCallAlert">Click for alert</button>

<h3>Refactoring changes:</h3>

<ul>
  <li>Removed props: title, icon, hide-close-text, close-text, position</li>
  <li>Added props: link-text, link-href, link-target (default: '_blank'), type (default, success, error)</li>
  <li>Avoid using scheme prop, instead use the 'type' prop to change the color variant</li>
  <li>Avoid using on-close prop to listen to close event, instead use the '@close' event</li>
</ul>

<pre>
Recommended use:

&lt;unnnic-alert
  type            String default 'default' ('default', 'success', 'error')
  text            String required
  @close          Event
  link-href       String
   ┠ link-text    String default 'Learn more'
   ┖ link-target  String default '_blank'
/&gt;
</pre>
</div>`,methods:{unnnicCallAlert(){a.callAlert({props:this.$props,seconds:this.$props.seconds})}}}),e=h.bind({});e.args={title:"Title",text:"Text",icon:"check-circle-1-1",scheme:"feedback-green"};var l,r,o;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    alertCaller,
    unnnicAlert
  },
  template: \`
<div>
  <button @click="unnnicCallAlert">Click for alert</button>

<h3>Refactoring changes:</h3>

<ul>
  <li>Removed props: title, icon, hide-close-text, close-text, position</li>
  <li>Added props: link-text, link-href, link-target (default: '_blank'), type (default, success, error)</li>
  <li>Avoid using scheme prop, instead use the 'type' prop to change the color variant</li>
  <li>Avoid using on-close prop to listen to close event, instead use the '@close' event</li>
</ul>

<pre>
Recommended use:

&lt;unnnic-alert
  type            String default 'default' ('default', 'success', 'error')
  text            String required
  @close          Event
  link-href       String
   ┠ link-text    String default 'Learn more'
   ┖ link-target  String default '_blank'
/&gt;
</pre>
</div>\`,
  methods: {
    unnnicCallAlert() {
      alert.callAlert({
        props: this.$props,
        seconds: this.$props.seconds
      });
    }
  }
})`,...(o=(r=e.parameters)==null?void 0:r.docs)==null?void 0:o.source}}};const C=["Normal"];export{e as Normal,C as __namedExportsOrder,_ as default};
