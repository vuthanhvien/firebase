(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-28918897"],{"15b8":function(t,e,n){t.exports=n("e1b7")},"17c3":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"animated fadeIn"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-7"},[n("h4",[n("strong",[t._v(t._s(t.menu))])])]),n("div",{staticClass:"col-5"},[n("div",{staticClass:"text-right"},[n("a",{staticClass:"pointer",on:{click:function(e){return t.editModule()}}},[n("i",{staticClass:"fa fa-pencil"}),t._v(" Edit module")]),t._v("   \n          \n          "),n("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.modal1",modifiers:{modal1:!0}}],attrs:{variant:"primary"}},[t._v("Add\n            "),n("i",{staticClass:"fa fa-plus"})])],1)])]),n("br"),n("b-modal",{ref:"myModalRef",attrs:{title:"Add new "+t.menu,size:"lg",id:"modal1","hide-footer":""}},[n("b-form",{on:{submit:t.onSubmit,reset:t.onReset}},[t._l(t.tableFields,function(e){return n("b-form-group",{key:e.name,attrs:{label:e.label,"label-for":"exampleInput2"}},[e.type.indexOf("String")>-1?n("div",[n("b-form-textarea",{attrs:{type:"text",placeholder:"Enter "+e.name},model:{value:t.form[e.name],callback:function(n){t.$set(t.form,e.name,n)},expression:"form[col.name]"}})],1):e.type.indexOf("Int")>-1?n("div",[n("b-form-input",{attrs:{id:"id_"+e.name,type:"number",placeholder:"Enter "+e.name},model:{value:t.form[e.name],callback:function(n){t.$set(t.form,e.name,n)},expression:"form[col.name]"}})],1):n("div",[n("b-form-input",{attrs:{id:"id_"+e.name,type:"text",placeholder:"Enter "+e.name},model:{value:t.form[e.name],callback:function(n){t.$set(t.form,e.name,n)},expression:"form[col.name]"}})],1)])}),n("footer",{staticClass:" modal-footer",staticStyle:{margin:"-15px"}},[n("b-button",{attrs:{type:"button",variant:"outline-basic"},on:{click:t.hideModal}},[t._v("Close")]),t._v(" \n          "),n("b-button",{attrs:{type:"submit",variant:"primary"}},[t._v("Submit")]),t._v(" \n          "),n("b-button",{attrs:{type:"reset",variant:"outline-danger"}},[t._v("Reset")])],1)],2)],1),n("div",[n("b-modal",{ref:"deleteModalRef",attrs:{size:"md",id:"modalDelete",title:"Delete: "+t.deleteItem.name,"hide-footer":""}},[n("p",[t._v("Are you sure?")]),n("br"),n("p",[t._v("Id: "),n("strong",[t._v(t._s(t.deleteItem.id))])]),n("p",[t._v("Name: "),n("strong",[t._v(t._s(t.deleteItem.name))])]),n("br"),n("footer",{staticClass:" modal-footer",staticStyle:{margin:"-15px"}},[n("b-button",{attrs:{type:"button",variant:"outline-basic"},on:{click:t.hideModal}},[t._v("Close")]),t._v(" \n          "),n("b-button",{attrs:{type:"reset",variant:"danger"}},[t._v("Delete")])],1)])],1),n("div",{staticClass:"table-outner"},[t.loading?n("div",{staticClass:"loading"},[n("img",{attrs:{src:"https://loading.io/assets/img/css/sunny.svg"}})]):t._e(),n("table",{staticClass:"table"},[n("tr",[n("th",{staticClass:"text-center",staticStyle:{width:"100px","white-space":"nowrap",background:"#8dcde459"}},[t._v("Action")]),t._l(t.tableFields,function(e){return n("th",{key:e.name,class:"class-header-"+e.name,style:{width:"id"==e.name||"createdAt"==e.name||"updatedAt"==e.name?"50px":""}},[t._v(t._s(e.name))])})],2),t._l(t.tableItems,function(e){return n("tr",{key:e.id},[n("td",{staticStyle:{width:"100px","white-space":"nowrap",background:"#8dcde459"}},[n("button",{directives:[{name:"b-modal",rawName:"v-b-modal.modal1",modifiers:{modal1:!0}}],staticClass:"btn btn-primary",on:{click:function(n){return t.edit(e)}}},[t._v("Edit")]),t._v(" \n            "),n("button",{directives:[{name:"b-modal",rawName:"v-b-modal.modalDelete",modifiers:{modalDelete:!0}}],staticClass:"btn btn-danger",on:{click:function(n){return t.deleteRow(e)}}},[t._v("Delete")])]),t._l(t.tableFields,function(a){return n("td",{key:a.name,class:"class-cell-"+a.name},[n("p",[t._v(t._s(e[a.name]&&e[a.name].id?e[a.name].name:e[a.name]))])])})],2)})],2)]),n("div",{staticClass:"text-right",staticStyle:{padding:"5px"}})],1)},i=[],o=(n("7f7f"),n("aede")),r=n("a4bb"),s=n.n(r),l=n("f499"),d=n.n(l),c=n("bc3a"),m=n.n(c),u=n("9530"),f=n.n(u);function p(){var t=Object(o["a"])(["\n          {\n            data:","{\n              list{\n                id\n                ","\n              }\n            }\n          }\n        "]);return p=function(){return t},t}function b(){var t=Object(o["a"])(["\n        mutation($model : String, $data: Json){\n          ","(model: $model, data: $data){\n            message\n            success\n          }\n        }\n        "]);return b=function(){return t},t}var v={name:"post",components:{},data:function(){return{openAdd:!1,form:{},menu:"",schema:[],tableItems:[],tableFields:[],loading:!1,deleteItem:{}}},methods:{deleteRow:function(t){this.deleteItem=t},editModule:function(){},hideModal:function(){this.$refs.myModalRef.hide(),this.$refs.deleteModalRef.hide()},edit:function(t){var e=this;this.form=JSON.parse(d()(t)),s()(this.form).map(function(t){e.form[t]&&e.form[t].__typename&&(e.form[t]=e.form[t].id)}),this.openAdd=!0,console.log(t)},onSubmit:function(t){t.preventDefault();var e=this;this.form.updatedAt=Math.floor((new Date).getTime()/1e3),this.form.createdAt||(this.form.createdAt=Math.floor((new Date).getTime()/1e3)),this.$apollo.mutate({mutation:f()(b(),this.form.id?"updateOne":"createOne"),variables:{model:this.menu.toLowerCase(),data:this.form}}).then(function(t){e.getData(e.menu),e.form={},e.openAdd=!1,e.hideModal()})},onReset:function(t){t.preventDefault(),this.form={}},getData:function(t){var e=this,n=this;this.form={},this.loading=!0,this.schema.map(function(t){t.name===e.$route.params.id&&(e.tableFields=t.children)}),this.$apollo.query({query:f()(p(),t.toLowerCase()+"s",n.tableFields.map(function(t,e){return"Int"!==t.type&&"Int!"!==t.type&&"String!"!==t.type&&"String"!==t.type&&"Float"!==t.type&&"Float!"!==t.type&&"[Int]"!==t.type&&"[Int]!"!==t.type&&"[String]!"!==t.type&&"[String]"!==t.type&&"[Float]"!==t.type&&"[Float]!"!==t.type&&"Boolean"!==t.type&&"Boolean!"!==t.type&&"[Boolean]"!==t.type&&"[Boolean]!"!==t.type?t.name+"{\n                        id \n                        name\n                      }":t.name}).join("\n                ")),fetchPolicy:"network-only"}).then(function(t){n.loading=!1,n.tableItems=t.data.data.list})}},watch:{$route:function(){this.menu=this.$route.params.id,this.tableItems=[],this.getData(this.menu)}},created:function(){var t=this;m.a.get("https://us-central1-vienvu-7e64f.cloudfunctions.net/getSchema").then(function(e){var n=[];e=e.data,s()(e).map(function(t){var a=[];s()(e[t]).map(function(n){a.push({label:n.toUpperCase(),name:n,type:e[t][n]})}),n.push({name:t,url:"/"+t,children:a})}),t.schema=n,console.log(t.schema),t.menu=t.$route.params.id,t.getData(t.menu)})}},h=v,y=(n("34d9"),n("2877")),g=Object(y["a"])(h,a,i,!1,null,null,null);e["default"]=g.exports},"34d9":function(t,e,n){"use strict";var a=n("ace9"),i=n.n(a);i.a},"522e":function(t,e,n){var a=n("f772"),i=n("ebfd").onFreeze;n("ce7e")("freeze",function(t){return function(e){return t&&a(e)?t(i(e)):e}})},"5bba":function(t,e,n){n("9d98");var a=n("584a").Object;t.exports=function(t,e){return a.defineProperties(t,e)}},"9d98":function(t,e,n){var a=n("63b6");a(a.S+a.F*!n("8e60"),"Object",{defineProperties:n("7e90")})},a21f:function(t,e,n){var a=n("584a"),i=a.JSON||(a.JSON={stringify:JSON.stringify});t.exports=function(t){return i.stringify.apply(i,arguments)}},ace9:function(t,e,n){},aede:function(t,e,n){"use strict";n.d(e,"a",function(){return s});var a=n("d847"),i=n.n(a),o=n("15b8"),r=n.n(o);function s(t,e){return e||(e=t.slice(0)),r()(i()(t,{raw:{value:r()(e)}}))}},d847:function(t,e,n){t.exports=n("5bba")},e1b7:function(t,e,n){n("522e"),t.exports=n("584a").Object.freeze},f499:function(t,e,n){t.exports=n("a21f")}}]);
//# sourceMappingURL=chunk-28918897.3c5b655a.js.map