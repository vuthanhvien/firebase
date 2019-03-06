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
          <a class="pointer" @click="editModule()">
            <i class="fa fa-pencil" /> Edit module</a> &nbsp;&nbsp;

          <b-button v-b-modal.modal1 variant="primary">Add
            <i class="fa fa-plus" />
          </b-button>
        </div>
      </div>
    </div>

    <br>
    <b-modal :title="'Add new ' +menu" ref="myModalRef" size="lg" id="modal1" hide-footer>
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group v-for="col of tableFields" :key="col.name" :label="col.label" label-for="exampleInput2">
          <div v-if="col.type.indexOf('String') > -1 ">
            <b-form-textarea type="text" v-model="form[col.name]" :placeholder="'Enter '+ col.name" />
          </div>
          <div v-else-if="col.type.indexOf('Int') > -1 ">
            <b-form-input :id="'id_'+col.name" type="number" v-model="form[col.name]" :placeholder="'Enter '+ col.name" />
          </div>
          <div v-else-if="typeNormals.indexOf(col.type) === -1 ">
            <b-form-select :id="'id_'+col.name"   v-model="form[col.name]" :options="options[col.name]"></b-form-select>
          </div>
          <div v-else>
            <b-form-input :id="'id_'+col.name" type="text" v-model="form[col.name]" :placeholder="'Enter '+ col.name" />
          </div>
        </b-form-group>
        <footer class=" modal-footer" style="margin: -15px">
          <b-button type="button" variant="outline-basic" @click="hideModal">Close</b-button>&nbsp;
          <b-button type="submit" variant="primary">Submit</b-button>&nbsp;
          <b-button type="reset" variant="outline-danger">Reset</b-button>
        </footer>
      </b-form>
    </b-modal>

    <div>

      <!-- Modal Component -->
      <b-modal ref="deleteModalRef" size="md" id="modalDelete" :title="'Delete: '+ deleteItem.name" hide-footer>
        <p>Are you sure?</p>
        <br>
        <p>Id:
          <strong>{{deleteItem.id}}</strong>
        </p>
        <p>Name:
          <strong>{{deleteItem.name}}</strong>
        </p>
        <br>
        <footer class=" modal-footer" style="margin: -15px">
          <b-button type="button" variant="outline-basic" @click="hideModal">Close</b-button>&nbsp;
          <b-button type="reset" variant="danger" @click="confirmDelete">Delete</b-button>
        </footer>
      </b-modal>
    </div>
     <div>
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-end" >
            <li class="page-item " :class="{disabled: currentPage == 1}">
              <a class="page-link pointer" @click="gotoPage(-1)" >Previous</a>
            </li>
            <li class="page-item" v-if="currentPage - 2 > 0 ">
              <a class="page-link pointer" @click="gotoPage(-2)" >{{currentPage - 2}}</a>
            </li>
             <li class="page-item"  v-if="currentPage - 1 > 0 ">
              <a class="page-link pointer" @click="gotoPage(-1)" >{{currentPage - 1}}</a>
            </li>
            <li class="page-item active">
              <a class="page-link pointer " @click="gotoPage(0)" >{{currentPage}}</a>
            </li>
            <li class="page-item"  v-if="currentPage + 1 <= total ">
              <a class="page-link pointer" @click="gotoPage(1)" >{{currentPage + 1}}</a>
            </li>
            <li class="page-item"  v-if="currentPage + 2  <= total ">
              <a class="page-link pointer" @click="gotoPage(2)" >{{currentPage + 2}}</a>
            </li>
            <li class="page-item" :class="{disabled: currentPage == total}">
              <a class="page-link pointer" @click="gotoPage(1)" >Next</a>
            </li>
          </ul>
        </nav>
      </div>
    <div style="position: relative">
      <div v-if="loading" class="loading">
        <img src="https://loading.io/assets/img/css/sunny.svg" />
      </div>
    <div class="table-outner">
     
      <table class="table">
        <thead>
        <tr>
          <th class="text-center" style=" background: #8dcde459; width: 100px">Action</th>
          <th :style="{width: col.name == 'id' ||  col.name == 'createdAt'  || col.name == 'updatedAt' ? '50px' : ''}" v-for="col of tableFields"
            :key="col.name" :class="'class-header-'+col.name">{{col.name}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row of tableItems" :key="row.id">
          <td class="td-action">
            <button class="btn btn-primary btn-sm" v-b-modal.modal1 @click="edit(row)">Edit</button>&nbsp;
            <button class="btn btn-danger btn-sm" v-b-modal.modalDelete @click="deleteRow(row)">
              <i class="fa fa-trash" />
            </button>
          </td>
          <td v-for="col of tableFields" :class="'class-cell-'+col.name" :key="col.name">
            <div  v-if="col.name === 'color'">
              <div style="height: 20px; width: 20px; border-radius: 2px" :style="{background: row[col.name]}"></div>
            </div>
            <p v-else>{{row[col.name] && row[col.name].id ? row[col.name].name : row[col.name]}}</p>
          </td>

        </tr>
        </tbody>
      </table>
      </div>
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
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
      loading: false,
      deleteItem: {},
      currentPage: 1,
      total: 1,
      options: {},
      typeNormals: [
        "Int",
        "Int!",
        "String",
        "String!",
        "Float",
        "Float!",
        "Boolean",
        "Boolean!",
        "[Int]",
        "[Int]!",
        "[String]",
        "[String]!",
        "[Float]",
        "[Float]!",
        "[Boolean]",
        "[Boolean]!"
      ]
    };
  },
  methods: {
    gotoPage(offset) {
      this.$router.push({ query: { page: this.currentPage + offset } });
    },
    deleteRow(item) {
      this.deleteItem = item;
    },
    confirmDelete() {
      console.log(this.deleteItem);
      const that = this;
      this.$apollo
        .mutate({
          mutation: gql`
            mutation deleteOne($model: String, $id: String) {
              deleteOne(model: $model, id: $id) {
                message
                success
              }
            }
          `,
          variables: {
            model: this.menu.toLowerCase(),
            id: this.deleteItem.id
          }
        })
        .then(res => {
          that.getData(that.menu);
          // that.form = {};
          // that.openAdd = false;
          that.hideModal();
        });
    },
    getDataAdd() {
      const arrayKey = [];
      this.tableFields.map(item => {
        if (this.typeNormals.indexOf(item.type) === -1) {
          arrayKey[item.name] = item;
        }
      });
      const that = this;
      Object.keys(arrayKey).map(key => {
        const item = arrayKey[key];
        this.getDataApi(
          item.type.toLowerCase(),
          [
            { name: "value:id", type: "String!" },
            { name: "text:name", type: "String" }
          ],
          {},
          2000,
          0,
          "id_desc"
        ).then(res => {
          that.options[item.name] = res.data.data.list;
        });
      });
    },
    editModule() {},
    hideModal() {
      this.$refs.myModalRef.hide();
      this.$refs.deleteModalRef.hide();
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
    getDataApi(menu, tableFields, where, limit, skip, orderBy) {
      return this.$apollo.query({
        query: gql`
          query getData($where: Json, $limit: Int, $skip: Int, $orderBy: String){
            data:${menu.toLowerCase() +
              "s"}(where: $where, limit: $limit, orderBy: $orderBy, skip: $skip){
              total
              list{
                id
                ${tableFields.map((item, i) => {
                  if (this.typeNormals.indexOf(item.type) === -1) {
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
        variables: { where, limit, skip, orderBy },
        fetchPolicy: "network-only"
      });
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

      const orderBy = "id_desc";
      const page = this.currentPage || 1;
      const skip = (page - 1) * 20;
      const limit = 20;
      const where = {};

      this.getDataApi(menu, this.tableFields, where, limit, skip, orderBy).then(
        res => {
          that.loading = false;
          that.tableItems = res.data.data.list;
          that.total = Math.ceil(res.data.data.total / 20) || 1;
          console.log(that.total);
        }
      );
    }
  },
  watch: {
    $route() {
      this.menu = this.$route.params.id;
      this.tableItems = [];
      this.currentPage = this.$route.query.page || 1;
      this.getData(this.menu);
      this.getDataAdd();
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
        console.log(that.schema);
        that.menu = that.$route.params.id;
        that.getData(that.menu);
        that.getDataAdd();
      });
  }
};
</script>
<style lang="scss" scoped>
.td-action {
  width: 100px;
  white-space: nowrap;
  background: rgba(141, 205, 228, 0.35);
  padding: 11px;
}
.table-outner {
  overflow: auto;
  background: white;
  border: 1px solid #c8ced3;
  border-radius: 5px;
  position: relative;
  // min-height: 300px;
}

.class-cell-id {
  white-space: nowrap;
}

th,
td {
  vertical-align: middle;
}

th {
  text-transform: capitalize;
}
thead {
  background: #21a8d8;
  color: white;
}

td {
  p {
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 200px;
    overflow: hidden;
    margin: 0;
  }
}
.table {
  margin-bottom: 0;
}

.loading {
  position: absolute;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.3;
  padding: 50px 0;
  text-align: center;
  z-index: 1;
  min-height: 300px;
}
</style>