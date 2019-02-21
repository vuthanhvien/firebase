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
                name: 'posts',
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
                name: 'catrgory',
                type: 'Int'
            },
            {
                name: 'author',
                type: 'Author'
            },

        ]
    },

]

export default schemaArray