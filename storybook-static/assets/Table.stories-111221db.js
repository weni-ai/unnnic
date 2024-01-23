import{B as h,b as s,d as a,f as d,F as m,j as v,o as l,p as j,k as T,C as x,t as C,n as $,A as D}from"./vue.esm-bundler-afa73d68.js";import{_}from"./_plugin-vue_export-helper-c27b6911.js";import{u as F}from"./Button-8f3e170e.js";import{u as I}from"./Checkbox-55573dd4.js";import"./Icon-777631f3.js";const f={name:"unnnicTable",components:{},props:{items:{type:Array}},data(){return{value:!1}},computed:{}},N=t=>(j("data-v-609a0eb8"),t=t(),T(),t),S={class:"unnnic-table"},B={class:"header"},R=N(()=>a("div",null,[a("div",{class:"item-spacer"})],-1)),V={class:"scroll"};function A(t,o,e,c,k,w){return h((l(),s("div",S,[a("div",B,[d(t.$slots,"header",{},void 0,!0)]),R,a("div",V,[(l(!0),s(m,null,v(e.items,(n,r)=>(l(),s("div",{key:r,class:"item"},[d(t.$slots,"item",{item:n},void 0,!0)]))),128))])],512)),[[x,!0]])}const g=_(f,[["render",A],["__scopeId","data-v-609a0eb8"]]);f.__docgenInfo={displayName:"unnnicTable",exportName:"default",description:"",tags:{},props:[{name:"items",type:{name:"array"}}],slots:[{name:"header"},{name:"item",scoped:!0,bindings:[{name:"item",title:"binding"}]}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Table/Table.vue"]};const y={name:"unnnicTableRow",props:{headers:{type:Array}},data(){return{}}},E={class:"table-row"},W={class:"break-text"};function z(t,o,e,c,k,w){return l(),s("div",E,[(l(!0),s(m,null,v(e.headers,(n,r)=>(l(),s(m,{key:n.id},[a("div",{class:"col",style:$({width:n.width,flex:n.flex,minWidth:0})},[d(t.$slots,n.id,{},()=>[a("div",W,C(n.text),1)],!0)],4),h(a("div",{class:D(["divider",{condensed:n.condensed}])},null,2),[[x,r+1!==e.headers.length]])],64))),128))])}const G=_(y,[["render",z],["__scopeId","data-v-0aa5fd6f"]]);y.__docgenInfo={displayName:"unnnicTableRow",exportName:"default",description:"",tags:{},props:[{name:"headers",type:{name:"array"}}],slots:[{name:"header.id",scoped:!0,bindings:[{name:"name",title:"binding"}]}],sourceFiles:["C:/Users/anacl/Documents/WENI/Front/unnnic/src/components/Table/TableRow.vue"]};const L={title:"example/Table",component:g,argTypes:{}},H=(t,{argTypes:o})=>({props:Object.keys(o),components:{unnnicTable:g,unnnicTableRow:G,unnnicButton:F,unnnicCheckbox:I},template:`
    <div>
      <unnnic-table
        v-bind="$props"
        :items="table.items"
        :style="{ maxHeight: '280px', maxWidth: '800px', }"
      >
        <template v-slot:header>
          <unnnic-table-row :headers="table.headers">
            <template v-slot:checkarea>
              <unnnic-checkbox :modelValue="generalValue" @change="changeGeneralCheckbox" :style="{margin: '4px'}"/>
            </template>
          </unnnic-table-row>
        </template>

        <template v-slot:item="{ item }">
          <unnnic-table-row :headers="table.headers">
            <template v-slot:checkarea>
              <unnnic-checkbox v-model="item.selected" :style="{margin: '4px'}"/>
            </template>

            <template v-slot:project>
              <div :title="item.project" class="break-text">
                {{ item.project }}
              </div>
            </template>

            <template v-slot:contacts>
              <div :title="item.contacts" class="break-text">
                {{ item.contacts }}
              </div>
            </template>

            <template v-slot:export>
              <div :style="{ textAlign: 'center' }">
                <unnnic-button
                  size="small"
                  type="secondary"
                  iconCenter="upload-bottom-1"
                />
              </div>
            </template>
          </unnnic-table-row>
        </template>
      </unnnic-table>
    </div>
  `,data(){return{table:{headers:[{id:"checkarea",text:"",width:"32px",condensed:!0},{id:"project",text:"Projeto",flex:1},{id:"contacts",text:"Nº Contatos",flex:1},{id:"export",text:"Exportar",width:"55px"}],items:[{selected:!1,project:"Funil de Marketing Digital",contacts:"125.256.325"},{selected:!1,project:"Funil de Marketing Digital",contacts:"125.256.325"},{selected:!1,project:"Juntando vetores",contacts:"35.251"},{selected:!1,project:"Hospital Unimed",contacts:"12.478"}]}}},computed:{generalValue(){return this.table.items.find(e=>e.selected)?this.table.items.find(e=>!e.selected)?"less":!0:!1}},methods:{changeGeneralCheckbox(e){this.table.items=this.table.items.map(c=>({...c,selected:e}))}}}),i=H.bind({});i.args={};var p,u,b;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`(args, {
  argTypes
}) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicTable,
    unnnicTableRow,
    unnnicButton,
    unnnicCheckbox
  },
  template: \`
    <div>
      <unnnic-table
        v-bind="$props"
        :items="table.items"
        :style="{ maxHeight: '280px', maxWidth: '800px', }"
      >
        <template v-slot:header>
          <unnnic-table-row :headers="table.headers">
            <template v-slot:checkarea>
              <unnnic-checkbox :modelValue="generalValue" @change="changeGeneralCheckbox" :style="{margin: '4px'}"/>
            </template>
          </unnnic-table-row>
        </template>

        <template v-slot:item="{ item }">
          <unnnic-table-row :headers="table.headers">
            <template v-slot:checkarea>
              <unnnic-checkbox v-model="item.selected" :style="{margin: '4px'}"/>
            </template>

            <template v-slot:project>
              <div :title="item.project" class="break-text">
                {{ item.project }}
              </div>
            </template>

            <template v-slot:contacts>
              <div :title="item.contacts" class="break-text">
                {{ item.contacts }}
              </div>
            </template>

            <template v-slot:export>
              <div :style="{ textAlign: 'center' }">
                <unnnic-button
                  size="small"
                  type="secondary"
                  iconCenter="upload-bottom-1"
                />
              </div>
            </template>
          </unnnic-table-row>
        </template>
      </unnnic-table>
    </div>
  \`,
  data() {
    return {
      table: {
        headers: [{
          id: 'checkarea',
          text: '',
          width: '32px',
          condensed: true
        }, {
          id: 'project',
          text: 'Projeto',
          flex: 1
        }, {
          id: 'contacts',
          text: 'Nº Contatos',
          flex: 1
        }, {
          id: 'export',
          text: 'Exportar',
          width: '55px'
        }],
        items: [{
          selected: false,
          project: 'Funil de Marketing Digital',
          contacts: '125.256.325'
        }, {
          selected: false,
          project: 'Funil de Marketing Digital',
          contacts: '125.256.325'
        }, {
          selected: false,
          project: 'Juntando vetores',
          contacts: '35.251'
        }, {
          selected: false,
          project: 'Hospital Unimed',
          contacts: '12.478'
        }]
      }
    };
  },
  computed: {
    generalValue() {
      if (!this.table.items.find(item => item.selected)) {
        return false;
      }
      if (!this.table.items.find(item => !item.selected)) {
        return true;
      }
      return 'less';
    }
  },
  methods: {
    changeGeneralCheckbox(value) {
      this.table.items = this.table.items.map(item => ({
        ...item,
        selected: value
      }));
    }
  }
})`,...(b=(u=i.parameters)==null?void 0:u.docs)==null?void 0:b.source}}};const q=["Default"];export{i as Default,q as __namedExportsOrder,L as default};
//# sourceMappingURL=Table.stories-111221db.js.map
