const schemaArray = [
    {
        name: 'Author',
        children: [
            {
                name: 'id',
                type: 'String!'
            },
            {
                name: 'firstName',
                type: 'String'
            },
            {
                name: 'lastName',
                type: 'String'
            },
            {
                name: 'post',
                type: '[Post]'
            },

        ]
    },
    {
        name: 'Post',
        children: [
            {
                name: 'id',
                type: 'String!'
            },
            {
                name: 'title',
                type: 'String'
            },
            {
                name: 'votes',
                type: 'Int'
            },
            {
                name: 'author',
                type: 'Author'
            },

        ]
    },
    {
        name: 'News',
        children: [
            {
                name: 'id',
                type: 'String!'
            },
            {
                name: 'title',
                type: 'String'
            },
            {
                name: 'category',
                type: 'Category'
            },
            {
                name: 'author',
                type: 'Author'
            },

        ]
    },

    {
        name: 'Category',
        children: [
            {
                name: 'id',
                type: 'String!'
            },
            {
                name: 'name',
                type: 'String'
            },

        ]
    },

]

export default schemaArray