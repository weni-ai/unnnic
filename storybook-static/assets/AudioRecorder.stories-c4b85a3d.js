import{u,A as p}from"./audio-recorder-sample-cd125c22.js";import"./Icon-777631f3.js";import"./vue.esm-bundler-afa73d68.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./ToolTip-7f37fa70.js";const y={title:"Form/AudioRecorder",component:u,argTypes:{}},i=(l,{argTypes:c})=>({props:Object.keys(c),components:{unnnicAudioRecorder:u},data(){return{audio:null,status:""}},template:`
    <div>
      <button @click="$refs['audio-recorder'].record()">Gravar</button>

      <pre>v-model: {{ audio }}</pre>
      <pre>status: {{ status }}</pre>

      <unnnic-audio-recorder v-bind="$props" ref="audio-recorder" v-model="audio" @status="(value) => this.status = value" />
    </div>
  `,methods:{}}),r=i.bind({});r.args={canDiscard:!0};const e=i.bind({});e.args={src:p};var n,o,a;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicAudioRecorder
  },
  data() {
    return {
      audio: null,
      status: ''
    };
  },
  template: \`
    <div>
      <button @click="$refs['audio-recorder'].record()">Gravar</button>

      <pre>v-model: {{ audio }}</pre>
      <pre>status: {{ status }}</pre>

      <unnnic-audio-recorder v-bind="$props" ref="audio-recorder" v-model="audio" @status="(value) => this.status = value" />
    </div>
  \`,
  methods: {}
})`,...(a=(o=r.parameters)==null?void 0:o.docs)==null?void 0:a.source}}};var t,s,d;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicAudioRecorder
  },
  data() {
    return {
      audio: null,
      status: ''
    };
  },
  template: \`
    <div>
      <button @click="$refs['audio-recorder'].record()">Gravar</button>

      <pre>v-model: {{ audio }}</pre>
      <pre>status: {{ status }}</pre>

      <unnnic-audio-recorder v-bind="$props" ref="audio-recorder" v-model="audio" @status="(value) => this.status = value" />
    </div>
  \`,
  methods: {}
})`,...(d=(s=e.parameters)==null?void 0:s.docs)==null?void 0:d.source}}};const A=["Default","Player"];export{r as Default,e as Player,A as __namedExportsOrder,y as default};
//# sourceMappingURL=AudioRecorder.stories-c4b85a3d.js.map
