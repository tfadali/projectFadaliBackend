import express from 'express'

console.log('hello world')

const app = express()

app.listen(
    3000,
    () => console.log('listening at http://localhost:3000')
)