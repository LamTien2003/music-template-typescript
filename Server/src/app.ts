import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import connect from './models/db';
import cors from 'cors'
import songRoute from './routes/song';
import authRoute from './routes/auth'
import userRoute from './routes/user'
const app = express();

app.use(json());
app.use( 
  cors({ 
      origin: '*',
  }),
);


app.use('/songs', songRoute);
app.use('/auth', authRoute);
app.use('/user', userRoute);


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});
connect()

app.listen(3030,() => {
  console.log(`Ung dung dang chay`);
});
