import schemaArray from './config';
import * as GraphQLJSON from 'graphql-type-json';
import * as admin from 'firebase-admin'
import { filter, map } from 'lodash'
// import { makeExecutableSchema } from 'graphql-tools'

admin.initializeApp()


const getDatas = (model) => {
    return new Promise((resolve, reject) => {
        const postData = [];
        const db = admin.firestore();
        db.collection(model).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    const post = doc.data();
                    const postTmp: any = post;
                    // children.map(item => {
                    //     postTmp[item.name] = post[item.name]
                    // })
                    postTmp.id = doc.id


                    postData.push(postTmp);
                });
                console.log(postData);
                resolve(postData);
            })
            .catch(reason => {
                console.log('db.collection("post").get gets err, reason: ' + reason);
                reject(reason);
            });
    });
}

const getData = (model, id) => {
    return new Promise((resolve, reject) => {
        // const postData: any  = {};
        const db = admin.firestore();
        db.collection(model).doc(id).get()
            .then(doc => {
                const post = doc.data();
                const postTmp: any = post;
                // children.map(item => {
                //     postTmp[item.name] = post[item.name]
                // })
                postTmp.id = doc.id

                console.log(postTmp);
                resolve(postTmp);
            })
            .catch(reason => {
                console.log('db.collection("post").get gets err, reason: ' + reason);
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
            console.log('db.collection("post").get gets err, reason: ' + reason);
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
            console.log('db.collection("post").get gets err, reason: ' + reason);
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
            console.log('db.collection("post").get gets err, reason: ' + reason);
            reject(reason);
        });
    });
}



const resolveFunctions = {
    Json: GraphQLJSON,
    Query: {},
    Mutation: {
        async createOne(_, { model, data }) {
            console.log(model, data);
            await createData(model, data).then(() => { console.log(1) });
            return { success: true, message: 'Done!' }
        },
        async updateOne(_, { model, data }) {
            await updateData(model, data).then(() => { console.log(1) });
            console.log(model, data);
            return { success: true, message: 'Done!' }
        },
        async deleteOne(_, { model, id }) {
            await deleteData(model, id).then(() => { console.log(1) });
            console.log(model, id);
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

                    return postData.find(child => child.id === parent[key])
                }
            };
            console.log(temp[item.name]);

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


    temp[item.name.toLowerCase() + 's'] = async () => {
        let postData: any = [];
        await getDatas(item.name.toLowerCase()).then(data => { postData = data; })
        return postData
    };


    resolveFunctions.Query[item.name.toLowerCase()] = temp[item.name.toLowerCase()];
    resolveFunctions.Query[item.name.toLowerCase() + 's'] = temp[item.name.toLowerCase() + 's'];



})

console.log('resolveFunctions', resolveFunctions)

export default resolveFunctions


function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}
