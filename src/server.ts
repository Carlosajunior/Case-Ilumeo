import cors from 'cors';
import express from 'express';

import { AppDataSource } from './config/typeorm';
import { ClockInService } from './modules/clock-in/services/clock-in.service';
import { UserServices } from './modules/users/services/users.services';

const app = express();
const port = 3000;
const clockInService = new ClockInService();
const userServices = new UserServices();

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

app.post('/clock-in', async (req, res) => {
  try {
    const code: string = req.body.code;
    return res.json(await clockInService.makeClockIn(code));
  } catch (error) {
    return res.json(error);
  }
});

app.get('/worked-hours/:code', async (req, res) => {
  try {
    const code: string = req.params.code;
    return res.json(await clockInService.getHours(code));
  } catch (error) {
    return res.json(error);
  }
});

app.post('/user', async (req, res) => {
  try {
    const code: string = req.body.code;
    return res.json(await userServices.createUser(code));
  } catch (error) {
    return res.json(error);
  }
});
