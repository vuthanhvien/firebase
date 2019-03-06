<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="#">
        <img class="navbar-brand-full" src="https://vienvu.com/logo.png"  height="45" alt="CoreUI Logo">
        <img class="navbar-brand-minimized" src="https://vienvu.com/logo.png"   height="30" alt="CoreUI Logo">
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" />
      <b-navbar-nav class="d-md-down-none">
        <b-nav-item class="px-3" to="/file">File manager</b-nav-item>
        <b-nav-item class="px-3" to="/users" exact>Users</b-nav-item>
        <!-- <b-nav-item class="px-3">Settings</b-nav-item> -->
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <!-- <b-nav-item class="d-md-down-none">
          <i class="icon-bell"></i>
          <b-badge pill variant="danger">5</b-badge>
        </b-nav-item>-->
       
        <DefaultHeaderDropdownAccnt/>
        <div style="width: 20px" />
      </b-navbar-nav>
      
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <!-- <SidebarHeader/> -->
        <!-- <SidebarForm/> -->
        <SidebarNav :navItems="nav"></SidebarNav>
        <!-- <SidebarFooter/> -->
        <div style="padding: 10px"  class="text-center">
        <b-button  v-b-modal.modalModel variant="primary">
            <i class="fa fa-plus"></i> Add new module 
          </b-button>
        </div>
        <!-- <SidebarMinimizer/> -->
      </AppSidebar>
      <main class="main">
        <br>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
       
    </div>
    <b-modal title="Add new model" ref="myModalRef" size="lg" id="modalModel" hide-footer>
      <b-form @submit="onSubmit">
        <b-form-group label-for="exampleInput2">
          <div>
            <b-form-input pattern="\S+" required type="text" v-model="form.name" :placeholder="'Enter model name'"/>
          </div>
          
        </b-form-group>
          <hr>
        <p>Fields</p>
        <div class="row" v-for="(field, index) of fields" :key="index">
          <div class="col-4">
            <b-form-group label-for="exampleInput2" >
              <b-form-input  pattern="\S+" required :disabled="field.disabled" type="text" v-model="field.key" :placeholder="'Enter key model'"/>
            </b-form-group>   
          </div>
          <div class="col-7">
            <b-form-group label-for="exampleInput2" >
              <b-form-select required :disabled="field.disabled" v-model="field.type" :options="options"  />
            </b-form-group>   
          </div>
          <div class="col-1" v-if="!field.disabled">
        <button type="button"  @click="removeNewField(index)" class="btn btn-danger"><i class="fa fa-remove"/></button>
          
        </div>
        </div>
          
        <div class="text-center">
        <button type="button" @click="addNewField()" class="btn btn-primary">Add new field</button>
        </div>
        <hr>
        <div class="text-right">
          <b-button type="button" variant="outline-basic" @click="hideModal">Close</b-button>&nbsp;
          <b-button type="submit" variant="primary">Submit</b-button>&nbsp;
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import {
  Header as AppHeader,
  SidebarToggler,
  Sidebar as AppSidebar,
  SidebarFooter,
  SidebarForm,
  SidebarHeader,
  SidebarMinimizer,
  SidebarNav,
  Aside as AppAside,
  AsideToggler,
  Footer as TheFooter,
  Breadcrumb
} from "@coreui/vue";




import DefaultAside from "./DefaultAside";
import gql from "graphql-tag";
import DefaultHeaderDropdownAccnt from "./DefaultHeaderDropdownAccnt";
import axios from "axios";

export default {
  name: "DefaultContainer",
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    Breadcrumb,
    DefaultAside,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer
  },
  data() {
    return {
      nav: [],
      form: {},
      options: ["String", "String!", "Int", "Int!", "Boolean", "Boolean!"],
      fields: [
        {
          key: "id",
          type: "String!",
          disabled: true
        },
        {
          key: "name",
          type: "String!",
          disabled: true
        },
        {
          key: "createdAt",
          type: "Int",
          disabled: true
        },
        {
          key: "updatedAt",
          type: "Int",
          disabled: true
        }
      ]
    };
  },
  methods: {
    hideModal() {
      this.$refs.myModalRef.hide();
    },
    onReset() {
      this.form.name = "";
      this.fields = [
        {
          key: "id",
          type: "String!",
          disabled: true
        },
        {
          key: "name",
          type: "String!",
          disabled: true
        },
        {
          key: "createdAt",
          type: "Int",
          disabled: true
        },
        {
          key: "updatedAt",
          type: "Int",
          disabled: true
        }
      ];
    },
    onSubmit() {
      console.log(this.form.name, this.fields);
      const fields = {};
      this.fields.map(item => {
        fields[item.key] = item.type;
      });
      const that = this;
      const data = {
        name: this.form.name,
        data: JSON.stringify(fields)
      };
      axios
        .get(
          "https://us-central1-vienvu-7e64f.cloudfunctions.net/setSchema?name=" +
            this.form.name +
            "&data=" +
            JSON.stringify(fields)
        )
        .then(data => {
          console.log(data);
          location.reload();
        });
    },
    addNewField() {
      this.fields.push({ id: "", type: "String" });
    },
    removeNewField(index) {
      this.fields.splice(index, 1);
      console.log(index, this.fields);
    }
  },
  created() {
    const that = this;
    axios
      .get("https://us-central1-vienvu-7e64f.cloudfunctions.net/getSchema")
      .then(data => {
        const nav = [];
        data = data.data;
        console.log(data);
        Object.keys(data).map(key => {
          nav.push({
            icon: "icon-calculator",
            name: key,
            url: "/" + key
          });
        });
        console.log(nav);
        that.nav = nav;
        nav.map(item => {
          that.options.push(item.name);
          // that.options.push(item.name + "!");
        });
      });
  },
  computed: {
    name() {
      return this.$route.name;
    },
    list() {
      return this.$route.matched.filter(
        route => route.name || route.meta.label
      );
    }
  }
};
</script>
