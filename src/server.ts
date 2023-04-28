import cors from 'cors';
import express from 'express';

import { AppDataSource } from './config/typeorm';

const app = express();
const port = 3000;

app.use(cors());

// eslint-disable-next-line import/no-named-as-default-member
app.use(express.json());

AppDataSource.initialize().then(() => {
  console.log('database up.');
  app.listen(port, () => {
    console.log(`Aplicação rodando na porta ${port}`);
  });
});

app.get('/', (req, res) => {
  res.send(`Aplicação rodando na porta ${port}`);
});
