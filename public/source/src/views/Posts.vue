<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-7">
        <h4>
          <strong>{{menu}}</strong>
        </h4>
      </div>
      <div class="col-5">
        <div class="text-right">
          <b-button v-b-toggle.collapse1 variant="primary">
            <i class="fa fa-plus"/> Add
            <i class="fa fa-chevron-down"/>
          </b-button>
        </div>
      </div>
    </div>

    <br>
    <b-collapse id="collapse1">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Add new {{menu}}</h5>
          <hr>
          <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group
              v-for="col of tableFields"
              :key="col.name"
              :label="col.name"
              label-for="exampleInput2"
            >
              <b-form-input type="text" v-model="form[col.name]" :placeholder="'Enter '+ col.name"/>
            </b-form-group>
            <hr>
            <div class="text-right">
              <b-button type="submit" variant="primary">Submit</b-button>&nbsp;
              <b-button type="reset" variant="danger">Reset</b-button>
            </div>
          </b-form>
        </div>
      </div>
    </b-collapse>
    <div class="card">
      <table class="table">
        <tr>
          <th
            :style="{width: col.name == 'id' ? '50px' : ''}"
            v-for="col of tableFields"
            :key="col.name"
          >{{col.name}}</th>
          <th class="text-center">Action</th>
        </tr>
        <tr v-for="row of tableItems" :key="row.id">
          <td
            v-for="col of tableFields"
            :key="col.name"
          >{{row[col.name] && row[col.name].id ? row[col.name].name : row[col.name]}}</td>
          <td style="width: 100px; white-space: nowrap">
            <button class="btn btn-primary" @click="edit(row)">Edit</button>&nbsp;
            <button class="btn btn-danger">Delete</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import gql from "graphql-tag";

export default {
  name: "post",
  components: {},
  data: () => {
    return {
      form: {},
      menu: "",
      schema: [],
      tableItems: [],
      tableFields: []
    };
  },
  methods: {
    edit(data) {
      this.form = data;
      console.log(data);
    },
    onSubmit(evt) {
      evt.preventDefault();

      alert(JSON.stringify(this.form));
    },
    onReset(evt) {
      evt.preventDefault();
      this.form = {};
    },
    getData(menu) {
      const that = this;

      this.schema.map(item => {
        if (item.name === this.$route.params.id) {
          this.tableFields = item.children;
        }
      });

      this.$apollo
        .query({
          query: gql`
          {
            data:${menu.toLowerCase() + "s"}{
              id
              ${that.tableFields.map((item, i) => {
                if (
                  item.type !== "Int" &&
                  item.type !== "Int!" &&
                  item.type !== "String!" &&
                  item.type !== "String" &&
                  item.type !== "Float" &&
                  item.type !== "Float!" &&
                  item.type !== "[Int]" &&
                  item.type !== "[Int]!" &&
                  item.type !== "[String]!" &&
                  item.type !== "[String]" &&
                  item.type !== "[Float]" &&
                  item.type !== "[Float]!" &&
                  item.type !== "Boolean" &&
                  item.type !== "Boolean!" &&
                  item.type !== "[Boolean]" &&
                  item.type !== "[Boolean]!"
                ) {
                  return (
                    item.name +
                    `{
                      id 
                      name
                    }`
                  );
                } else {
                  return item.name;
                }
              }).join(`
              `)}
          }
          }
        `
        })
        .then(res => {
          that.tableItems = res.data.data;
          console.log(res.data.data);
        });
    }
  },
  watch: {
    $route() {
      console.log(this.$route.params.id);
      this.menu = this.$route.params.id;

      this.getData(this.menu);
    }
  },
  created() {
    const that = this;
    axios
      .get("https://us-central1-vienvu-7e64f.cloudfunctions.net/schema")
      .then(data => {
        const nav = [];
        data = data.data;
        console.log(data);
        data.map(item => {
          nav.push({
            name: item.name,
            children: item.children,
            url: "/" + item.name
          });
        });
        that.schema = nav;

        that.menu = that.$route.params.id;
        that.getData(that.menu);
      });
  }
};
</script>

<style>
/* IE fix */
#card-chart-01,
#card-chart-02 {
  width: 100% !important;
}
</style>
