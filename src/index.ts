import { ApolloServer, gql } from 'apollo-server-express'
import express from 'express'

console.log('hello world')

const app = express()

const schema = gql`
    type Problem {
        id: Int
        title: String
        text: String
    }

    type Query {
        hello: String
        problems: [Problem]
    }
`

const resolvers = {
    Query: {
        hello: () => 'hello world',
        problems: () => [{
            id: 1,
            title: 'greatest common divisor',
            text: 'Compute the gcd of 32 and 48'
        }]
    }
}

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
})
server.applyMiddleware({app})

app.listen(
    3000,
    () => console.log('listening at http://localhost:3000')
)