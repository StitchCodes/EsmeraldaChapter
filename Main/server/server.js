// Require Apollo and Express
const express = require('expresss');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

// Set Database & Model paths
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

// Server details
const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs, resolvers
});

// Create Server Connection
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
});

// Create new Apollo with GraphQL Schemas
const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app});

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on PORT: ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
        })
    })
};

// Start Apollo Server async
startApolloServer(typeDefs, resolvers);