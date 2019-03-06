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
      <a class="pointer" @click="editModule()"><i class="fa fa-pencil" /> Edit module</a> &nbsp;&nbsp;
          
          <b-button v-b-modal.modal1 variant="primary">Add
            <i class="fa fa-plus"/>
          </b-button>
        </div>
      </div>
    </div>

    <br>
    <b-modal :title="'Add new ' +menu" ref="myModalRef" size="lg" id="modal1" hide-footer>
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          v-for="col of tableFields"
          :key="col.name"
          :label="col.label"
          label-for="exampleInput2"
        >
          <div v-if="col.type.indexOf('String') > -1 ">
            <b-form-textarea
              type="text"
              v-model="form[col.name]"
              :placeholder="'Enter '+ col.name"
            />
          </div>
          <div v-else-if="col.type.indexOf('Int') > -1 ">
            <b-form-input :id="'id_'+col.name" type="number" v-model="form[col.name]" :placeholder="'Enter '+ col.name"/>
          </div>
          <div v-else>
            <b-form-input :id="'id_'+col.name" type="text" v-model="form[col.name]" :placeholder="'Enter '+ col.name"/>
          </div>
        </b-form-group>
        <div class="text-right">
          <b-button type="button" variant="outline-basic" @click="hideModal">Close</b-button>&nbsp;
          <b-button type="submit" variant="primary">Submit</b-button>&nbsp;
          <b-button type="reset" variant="outline-danger">Reset</b-button>
        </div>
      </b-form>
    </b-modal>
    <div class="table-outner">
      <div v-if="loading" class="loading">
        <img src="https://loading.io/assets/img/css/sunny.svg" />
      </div>
      <table class="table">
        <tr>
          <th class="text-center">Action</th>
          <th
            :style="{width: col.name == 'id' ||  col.name == 'createdAt'  || col.name == 'updatedAt' ? '50px' : ''}"
            v-for="col of tableFields"
            :key="col.name"
            :class="'class-header-'+col.name"
          >{{col.name}}</th>
        </tr>
        <tr v-for="row of tableItems" :key="row.id">
          <td style="width: 100px; white-space: nowrap">
            <button class="btn btn-primary" v-b-modal.modal1 @click="edit(row)">Edit</button>&nbsp;
            <button class="btn btn-danger">Delete</button>
          </td>
          <td
            v-for="col of tableFields"
            :class="'class-cell-'+col.name"
            :key="col.name"
          >
          <p>{{row[col.name] && row[col.name].id ? row[col.name].name : row[col.name]}}</p></td>
          
        </tr>
      </table>
    </div>
    <div class="text-right" style="padding: 5px">
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
      openAdd: false,
      form: {},
      menu: "",
      schema: [],
      tableItems: [],
      tableFields: [],
      loading: false
    };
  },
  methods: {
    editModule(){

    },
    hideModal() {
      this.$refs.myModalRef.hide();
    },
    edit(data) {
      this.form = JSON.parse(JSON.stringify(data));
      Object.keys(this.form).map(key => {
        if (this.form[key] && this.form[key].__typename) {
          this.form[key] = this.form[key].id;
        }
      });
      this.openAdd = true;
      console.log(data);
    },
    onSubmit(evt) {
      evt.preventDefault();
      const that = this;
      this.form.updatedAt = Math.floor(new Date().getTime() / 1000);
      if (!this.form.createdAt) {
        this.form.createdAt = Math.floor(new Date().getTime() / 1000);
      }
      this.$apollo
        .mutate({
          mutation: gql`
        mutation($model : String, $data: Json){
          ${
            this.form.id ? "updateOne" : "createOne"
          }(model: $model, data: $data){
            message
            success
          }
        }
        `,
          variables: {
            model: this.menu.toLowerCase(),
            data: this.form
          }
        })
        .then(res => {
          that.getData(that.menu);
          that.form = {};
          that.openAdd = false;
          that.hideModal();
        });
    },
    onReset(evt) {
      evt.preventDefault();
      this.form = {};
    },
    getData(menu) {
      const that = this;
      this.form = {};
      this.loading = true;
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
              list{
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
          }
        `,
          fetchPolicy: "network-only"
        })
        .then(res => {
          that.loading = false;
          that.tableItems = res.data.data.list;
        });
    }
  },
  watch: {
    $route() {
      this.menu = this.$route.params.id;
      this.tableItems = [];
      this.getData(this.menu);
    }
  },
  created() {
    const that = this;
    axios
      .get("https://us-central1-vienvu-7e64f.cloudfunctions.net/getSchema")
      .then(data => {
        const nav = [];
        data = data.data;
        Object.keys(data).map(key => {
          const children = [];
          Object.keys(data[key]).map(item => {
            children.push({
              label: item.toUpperCase(),
              name: item,
              type: data[key][item]
            });
          });
          nav.push({
            name: key,
            url: "/" + key,
            children: children
          });
        });
        that.schema = nav;
        that.menu = that.$route.params.id;
        that.getData(that.menu);
      });
  }
};
</script>
<style lang="scss">
.table-outner{
  overflow: auto;
  background: white;
  border: 1px solid #c8ced3;
  border-radius: 5px;
  position: relative;
  min-height: 300px;
}
.class-cell-id {
  white-space: nowrap;
}
td {
  p {
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 300px;
    overflow: hidden;
  }
}
.loading {
  position: absolute;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.3;
  padding: 50px 0;
  text-align: center;
}
</style>
