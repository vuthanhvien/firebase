(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-41b4f23e"],{"15b8":function(t,e,a){t.exports=a("e1b7")},"17c3":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"animated fadeIn"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-7"},[a("h4",[a("strong",[t._v(t._s(t.menu))])])]),a("div",{staticClass:"col-5"},[a("div",{staticClass:"text-right"},[a("a",{staticClass:"pointer",on:{click:function(e){return t.editModule()}}},[a("i",{staticClass:"fa fa-pencil"}),t._v(" Edit module")]),t._v("   \n\n        "),a("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.modal1",modifiers:{modal1:!0}}],attrs:{variant:"primary"}},[t._v("Add\n          "),a("i",{staticClass:"fa fa-plus"})])],1)])]),a("br"),a("b-modal",{ref:"myModalRef",attrs:{title:"Add new "+t.menu,size:"lg",id:"modal1","hide-footer":""}},[a("b-form",{on:{submit:t.onSubmit,reset:t.onReset}},[t._l(t.tableFields,function(e){return a("b-form-group",{key:e.name,attrs:{label:e.label,"label-for":"exampleInput2"}},[e.type.indexOf("String")>-1?a("div",[a("b-form-textarea",{attrs:{type:"text",placeholder:"Enter "+e.name},model:{value:t.form[e.name],callback:function(a){t.$set(t.form,e.name,a)},expression:"form[col.name]"}})],1):e.type.indexOf("Int")>-1?a("div",[a("b-form-input",{attrs:{id:"id_"+e.name,type:"number",placeholder:"Enter "+e.name},model:{value:t.form[e.name],callback:function(a){t.$set(t.form,e.name,a)},expression:"form[col.name]"}})],1):-1===t.typeNormals.indexOf(e.type)?a("div",[a("b-form-select",{attrs:{id:"id_"+e.name,options:t.options[e.name]},model:{value:t.form[e.name],callback:function(a){t.$set(t.form,e.name,a)},expression:"form[col.name]"}})],1):a("div",[a("b-form-input",{attrs:{id:"id_"+e.name,type:"text",placeholder:"Enter "+e.name},model:{value:t.form[e.name],callback:function(a){t.$set(t.form,e.name,a)},expression:"form[col.name]"}})],1)])}),a("footer",{staticClass:" modal-footer",staticStyle:{margin:"-15px"}},[a("b-button",{attrs:{type:"button",variant:"outline-basic"},on:{click:t.hideModal}},[t._v("Close")]),t._v(" \n        "),a("b-button",{attrs:{type:"submit",variant:"primary"}},[t._v("Submit")]),t._v(" \n        "),a("b-button",{attrs:{type:"reset",variant:"outline-danger"}},[t._v("Reset")])],1)],2)],1),a("div",[a("b-modal",{ref:"deleteModalRef",attrs:{size:"md",id:"modalDelete",title:"Delete: "+t.deleteItem.name,"hide-footer":""}},[a("p",[t._v("Are you sure?")]),a("br"),a("p",[t._v("Id:\n        "),a("strong",[t._v(t._s(t.deleteItem.id))])]),a("p",[t._v("Name:\n        "),a("strong",[t._v(t._s(t.deleteItem.name))])]),a("br"),a("footer",{staticClass:" modal-footer",staticStyle:{margin:"-15px"}},[a("b-button",{attrs:{type:"button",variant:"outline-basic"},on:{click:t.hideModal}},[t._v("Close")]),t._v(" \n        "),a("b-button",{attrs:{type:"reset",variant:"danger"},on:{click:t.confirmDelete}},[t._v("Delete")])],1)])],1),a("div",[a("nav",{attrs:{"aria-label":"Page navigation example"}},[a("ul",{staticClass:"pagination justify-content-end"},[a("li",{staticClass:"page-item ",class:{disabled:1==t.currentPage}},[a("a",{staticClass:"page-link pointer",on:{click:function(e){return t.gotoPage(-1)}}},[t._v("Previous")])]),t.currentPage-2>0?a("li",{staticClass:"page-item"},[a("a",{staticClass:"page-link pointer",on:{click:function(e){return t.gotoPage(-2)}}},[t._v(t._s(t.currentPage-2))])]):t._e(),t.currentPage-1>0?a("li",{staticClass:"page-item"},[a("a",{staticClass:"page-link pointer",on:{click:function(e){return t.gotoPage(-1)}}},[t._v(t._s(t.currentPage-1))])]):t._e(),a("li",{staticClass:"page-item active"},[a("a",{staticClass:"page-link pointer ",on:{click:function(e){return t.gotoPage(0)}}},[t._v(t._s(t.currentPage))])]),t.currentPage+1<=t.total?a("li",{staticClass:"page-item"},[a("a",{staticClass:"page-link pointer",on:{click:function(e){return t.gotoPage(1)}}},[t._v(t._s(t.currentPage+1))])]):t._e(),t.currentPage+2<=t.total?a("li",{staticClass:"page-item"},[a("a",{staticClass:"page-link pointer",on:{click:function(e){return t.gotoPage(2)}}},[t._v(t._s(t.currentPage+2))])]):t._e(),a("li",{staticClass:"page-item",class:{disabled:t.currentPage==t.total}},[a("a",{staticClass:"page-link pointer",on:{click:function(e){return t.gotoPage(1)}}},[t._v("Next")])])])])]),a("div",{staticStyle:{position:"relative"}},[t.loading?a("div",{staticClass:"loading"},[a("img",{attrs:{src:"https://loading.io/assets/img/css/sunny.svg"}})]):t._e(),a("div",{staticClass:"table-outner"},[a("table",{staticClass:"table"},[a("thead",[a("tr",[a("th",{staticClass:"text-center",staticStyle:{background:"#8dcde459",width:"100px"}},[t._v("Action")]),t._l(t.tableFields,function(e){return a("th",{key:e.name,class:"class-header-"+e.name,style:{width:"id"==e.name||"createdAt"==e.name||"updatedAt"==e.name?"50px":""}},[t._v(t._s(e.name))])})],2)]),a("tbody",t._l(t.tableItems,function(e){return a("tr",{key:e.id},[a("td",{staticClass:"td-action"},[a("button",{directives:[{name:"b-modal",rawName:"v-b-modal.modal1",modifiers:{modal1:!0}}],staticClass:"btn btn-primary btn-sm",on:{click:function(a){return t.edit(e)}}},[t._v("Edit")]),t._v(" \n          "),a("button",{directives:[{name:"b-modal",rawName:"v-b-modal.modalDelete",modifiers:{modalDelete:!0}}],staticClass:"btn btn-danger btn-sm",on:{click:function(a){return t.deleteRow(e)}}},[a("i",{staticClass:"fa fa-trash"})])]),t._l(t.tableFields,function(n){return a("td",{key:n.name,class:"class-cell-"+n.name},["color"===n.name?a("div",[a("div",{staticStyle:{height:"20px",width:"20px","border-radius":"2px"},style:{background:e[n.name]}})]):a("p",[t._v(t._s(e[n.name]&&e[n.name].id?e[n.name].name:e[n.name]))])])})],2)}),0)])])]),a("br"),a("br"),a("br"),a("br"),a("br"),a("br"),a("br")],1)},i=[],o=a("f499"),r=a.n(o),s=a("a4bb"),l=a.n(s),c=(a("7f7f"),a("aede")),d=a("bc3a"),m=a.n(d),u=a("9530"),f=a.n(u);function p(){var t=Object(c["a"])(["\n          query getData($where: Json, $limit: Int, $skip: Int, $orderBy: String){\n            data:","(where: $where, limit: $limit, orderBy: $orderBy, skip: $skip){\n              total\n              list{\n                id\n                ","\n              }\n            }\n          }\n        "]);return p=function(){return t},t}function b(){var t=Object(c["a"])(["\n        mutation($model : String, $data: Json){\n          ","(model: $model, data: $data){\n            message\n            success\n          }\n        }\n        "]);return b=function(){return t},t}function g(){var t=Object(c["a"])(["\n            mutation deleteOne($model: String, $id: String) {\n              deleteOne(model: $model, id: $id) {\n                message\n                success\n              }\n            }\n          "]);return g=function(){return t},t}var h={name:"post",components:{},data:function(){return{openAdd:!1,form:{},menu:"",schema:[],tableItems:[],tableFields:[],loading:!1,deleteItem:{},currentPage:1,total:1,options:{},typeNormals:["Int","Int!","String","String!","Float","Float!","Boolean","Boolean!","[Int]","[Int]!","[String]","[String]!","[Float]","[Float]!","[Boolean]","[Boolean]!"]}},methods:{gotoPage:function(t){this.$router.push({query:{page:this.currentPage+t}})},deleteRow:function(t){this.deleteItem=t},confirmDelete:function(){console.log(this.deleteItem);var t=this;this.$apollo.mutate({mutation:f()(g()),variables:{model:this.menu.toLowerCase(),id:this.deleteItem.id}}).then(function(e){t.getData(t.menu),t.hideModal()})},getDataAdd:function(){var t=this,e=[];this.tableFields.map(function(a){-1===t.typeNormals.indexOf(a.type)&&(e[a.name]=a)});var a=this;l()(e).map(function(n){var i=e[n];t.getDataApi(i.type.toLowerCase(),[{name:"value:id",type:"String!"},{name:"text:name",type:"String"}],{},2e3,0,"id_desc").then(function(t){a.options[i.name]=t.data.data.list})})},editModule:function(){},hideModal:function(){this.$refs.myModalRef.hide(),this.$refs.deleteModalRef.hide()},edit:function(t){var e=this;this.form=JSON.parse(r()(t)),l()(this.form).map(function(t){e.form[t]&&e.form[t].__typename&&(e.form[t]=e.form[t].id)}),this.openAdd=!0,console.log(t)},onSubmit:function(t){t.preventDefault();var e=this;this.form.updatedAt=Math.floor((new Date).getTime()/1e3),this.form.createdAt||(this.form.createdAt=Math.floor((new Date).getTime()/1e3)),this.$apollo.mutate({mutation:f()(b(),this.form.id?"updateOne":"createOne"),variables:{model:this.menu.toLowerCase(),data:this.form}}).then(function(t){e.getData(e.menu),e.form={},e.openAdd=!1,e.hideModal()})},onReset:function(t){t.preventDefault(),this.form={}},getDataApi:function(t,e,a,n,i,o){var r=this;return this.$apollo.query({query:f()(p(),t.toLowerCase()+"s",e.map(function(t,e){return-1===r.typeNormals.indexOf(t.type)?t.name+"{\n                        id \n                        name\n                      }":t.name}).join("\n                ")),variables:{where:a,limit:n,skip:i,orderBy:o},fetchPolicy:"network-only"})},getData:function(t){var e=this,a=this;this.form={},this.loading=!0,this.schema.map(function(t){t.name===e.$route.params.id&&(e.tableFields=t.children)});var n="id_desc",i=this.currentPage||1,o=20*(i-1),r=20,s={};this.getDataApi(t,this.tableFields,s,r,o,n).then(function(t){a.loading=!1,a.tableItems=t.data.data.list,a.total=Math.ceil(t.data.data.total/20)||1,console.log(a.total)})}},watch:{$route:function(){this.menu=this.$route.params.id,this.tableItems=[],this.currentPage=this.$route.query.page||1,this.getData(this.menu),this.getDataAdd()}},created:function(){var t=this;m.a.get("https://us-central1-vienvu-7e64f.cloudfunctions.net/getSchema").then(function(e){var a=[];e=e.data,l()(e).map(function(t){var n=[];l()(e[t]).map(function(a){n.push({label:a.toUpperCase(),name:a,type:e[t][a]})}),a.push({name:t,url:"/"+t,children:n})}),t.schema=a,console.log(t.schema),t.menu=t.$route.params.id,t.getData(t.menu),t.getDataAdd()})}},v=h,_=(a("9dd0"),a("2877")),y=Object(_["a"])(v,n,i,!1,null,"1b8ca581",null);e["default"]=y.exports},"522e":function(t,e,a){var n=a("f772"),i=a("ebfd").onFreeze;a("ce7e")("freeze",function(t){return function(e){return t&&n(e)?t(i(e)):e}})},"5bba":function(t,e,a){a("9d98");var n=a("584a").Object;t.exports=function(t,e){return n.defineProperties(t,e)}},"675e":function(t,e,a){},"9d98":function(t,e,a){var n=a("63b6");n(n.S+n.F*!a("8e60"),"Object",{defineProperties:a("7e90")})},"9dd0":function(t,e,a){"use strict";var n=a("675e"),i=a.n(n);i.a},aede:function(t,e,a){"use strict";a.d(e,"a",function(){return s});var n=a("d847"),i=a.n(n),o=a("15b8"),r=a.n(o);function s(t,e){return e||(e=t.slice(0)),r()(i()(t,{raw:{value:r()(e)}}))}},d847:function(t,e,a){t.exports=a("5bba")},e1b7:function(t,e,a){a("522e"),t.exports=a("584a").Object.freeze}}]);
//# sourceMappingURL=chunk-41b4f23e.5764b5fd.js.map