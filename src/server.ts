import express from 'express';

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send(`Aplicação rodando na porta ${port}`)
})

app.listen(port, () => {
    console.log(`Aplicação rodando na porta ${port}`)
})