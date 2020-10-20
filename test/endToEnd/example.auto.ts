import { gql } from 'apollo-server-express'
import axios from 'axios'
import { DocumentNode } from 'graphql'

test('check that graphql server is up', async () => {
    const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/graphql',
        data: {
            query: getGqlString(gql`
                query {
                    hello
                }
            `)
        }
    })
    const { data } = response.data
    expect(data).toBeDefined()
    expect(data['hello']).toEqual('hello world')
})

test('get problems', async () => {
    const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/graphql',
        data: {
            query: getGqlString(gql`
                query {
                    problems {
                        id
                        title
                        text
                    }
                }
            `)
        }
    })
    const { data } = response.data
    expect(data).toBeDefined()
    expect(data['problems'][0]).toEqual({
        id: 1,
        title: 'greatest common divisor',
        text: 'Compute the gcd of 32 and 48',
    })
})

const getGqlString = (doc: DocumentNode) =>
    doc.loc && doc.loc.source.body