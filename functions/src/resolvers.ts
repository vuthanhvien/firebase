import * as GraphQLJSON from 'graphql-type-json';

const makeData = (schemaArray, admin) => {

    const getDatas = (model) => {
        return new Promise((resolve, reject) => {
            const postData = [];
            const db = admin.firestore();
            db.collection(model).get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        const post = doc.data();
                        const postTmp: any = post;
                        postTmp.id = doc.id
                        postData.push(postTmp);
                    });
                    resolve(postData);
                })
                .catch(reason => {
                    reject(reason);
                });
        });
    }

    const getData = (model, id) => {
        return new Promise((resolve, reject) => {
            const db = admin.firestore();
            db.collection(model).doc(id).get()
                .then(doc => {
                    const post = doc.data();
                    const postTmp: any = post;
                    postTmp.id = doc.id
                    resolve(postTmp);
                })
                .catch(reason => {
                    reject(reason);
                });
        });
    }

    const updateData = (model, data) => {
        return new Promise((resolve, reject) => {
            const db = admin.firestore();
            db.collection(model).doc(data.id).set(data).then(() => {
                resolve(true);
            }).catch(reason => {
                reject(reason);
            });
        });
    }

    const createData = (model, data) => {
        return new Promise((resolve, reject) => {
            const db = admin.firestore();
            db.collection(model).add(data).then(() => {
                resolve(true);
            }).catch(reason => {
                reject(reason);
            });
        });
    }


    const deleteData = (model, id) => {
        const db = admin.firestore();
        return new Promise((resolve, reject) => {
            db.collection(model).doc(id).delete().then(() => {
                resolve(true);
            }).catch(reason => {
                reject(reason);
            });
        });
    }



    const resolveFunctions = {
        Json: GraphQLJSON,
        Query: {},
        Mutation: {
            async createOne(_, { model, data }) {
                await createData(model, data).then(() => { console.log(1) });
                return { success: true, message: 'Done!' }
            },
            async updateOne(_, { model, data }) {
                await updateData(model, data).then(() => { console.log(1) });
                return { success: true, message: 'Done!' }
            },
            async deleteOne(_, { model, id }) {
                await deleteData(model, id).then(() => { console.log(1) });
                return { success: true, message: 'Done!' }
            },
        },
    }
    schemaArray.map(field => {
        resolveFunctions[toTitleCase(field.name)] = {}
        field.children.map(item => {
            if (item.type !== 'Int'
                && item.type !== 'Int!'
                && item.type !== 'String!'
                && item.type !== 'String'
                && item.type !== 'Float'
                && item.type !== 'Float!'
                && item.type !== '[Int]'
                && item.type !== '[Int]!'
                && item.type !== '[String]!'
                && item.type !== '[String]'
                && item.type !== '[Float]'
                && item.type !== '[Float]!'
                && item.type !== 'Boolean'
                && item.type !== 'Boolean!'
                && item.type !== '[Boolean]'
                && item.type !== '[Boolean]!'

            ) {

                let key = item.type;
                if (item.type.indexOf('[') > -1) {
                    key = item.type.slice(1, -1);
                }
                const temp = {};
                key = key.toLowerCase();

                temp[item.name] = async (parent) => {
                    let postData: any = [];
                    await getDatas(key).then(data => { postData = data; })
                    // return postData;
                    if (item.type.indexOf('[') > -1) {
                        // return postData
                        return postData.filter(child => {
                            return child[field.name.toLowerCase()] === parent.id
                        })
                    } else {
                        console.log(parent, item.name, parent[item.name])
                        return postData.find(child => child.id === parent[item.name])
                    }
                };

                resolveFunctions[toTitleCase(field.name)][item.name] = temp[item.name];

            }
        })
    })



    schemaArray.map(item => {
        const temp = {};
        temp[item.name.toLowerCase()] = async (_, { id }) => {
            let postData: any = [];
            await getData(item.name.toLowerCase(), id).then(data => { postData = data; })
            return postData
        };


        temp[item.name.toLowerCase() + 's'] = async (_, { where, limit, skip, orderBy }) => {


            let postData: any = [];
            await getDatas(item.name.toLowerCase()).then(data => { postData = data; })
            const _limit = limit || 20;
            const _skip = skip || 0;

            let _orderBy = (orderBy && orderBy.indexOf('_') > -1) ? orderBy : 'id_desc';
            _orderBy = _orderBy.split('_');
            const _orderType = _orderBy[0];
            const _orderSort = _orderBy[1] === 'desc' ? -1 : 1;

            postData = postData.sort((a, b) => {
                let first = a;
                let second = b;
                if (!isNaN(a[_orderType])) { first = a[_orderType] * 1 }
                if (!isNaN(b[_orderType])) { second = b[_orderType] * 1 }
                if (first < second) {
                    return _orderSort;
                } else {
                    return _orderSort * -1;
                }
            })
            if (where) {
                postData = postData.filter(d => {
                    let isGet = true;
                    Object.keys(where).map(key => {
                        const keyName = key.split('_')[0];
                        const keyType = key.split('_')[1];
                        if (keyType === 'like') {
                            if (d[keyName] && change_alias(d[keyName].toLowerCase()).indexOf(change_alias(where[key].toLowerCase())) === -1) {
                                isGet = false;
                            }
                        } else if (d[keyName] && d[keyName].toLowerCase() !== where[key].toLowerCase()) {
                            isGet = false;
                        }
                    })
                    return isGet;
                })
            }

            const list = postData.slice(_skip, _limit + _skip);
            const total = postData.length;


            return {
                list: list,
                total: total,
                limit: _limit,
                skip: _skip,
                orderBy: _orderType + '_' + _orderSort,
            }
        };


        resolveFunctions.Query[item.name.toLowerCase()] = temp[item.name.toLowerCase()];
        resolveFunctions.Query[item.name.toLowerCase() + 's'] = temp[item.name.toLowerCase() + 's'];


    })
    return resolveFunctions

}

// const out = makeData(schemaArray)
export default makeData


function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

function change_alias(alias) {
    var str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    str = str.replace(/ + /g," ");
    str = str.trim(); 
    return str;
}
