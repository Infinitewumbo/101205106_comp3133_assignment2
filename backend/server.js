require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@as-integrations/express5');
const mongoose = require('mongoose');
const cors = require('cors'); 
const { json } = require('body-parser');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true, 
});

let serverStarted = false;
async function prepareServer() {
    if (!serverStarted) {
        await server.start();
        serverStarted = true;
    }
}

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://101205106-comp3133-assignment2-fron.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization, Apollo-Require-Preflight');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204); 
    }
    next();
});

app.use(json());

app.use(
    '/graphql',
    async (req, res, next) => {
        await prepareServer(); 
        return expressMiddleware(server, {
            context: async ({ req }) => ({ req }),
        })(req, res, next);
    }
);

module.exports = app; 

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`🚀 Local Server ready at http://localhost:${PORT}/graphql`);
    });
}