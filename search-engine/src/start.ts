import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { ErrorHandlerMiddleware } from './middleware';

(async () => {
   try {
      // load environment vars
      dotenv.config();

      // init app with an websocket server
      const app = express();

      // add middleware
      app.use(cors());
      app.use(express.json());
      app.use(new ErrorHandlerMiddleware().use);

      // routes
      app.post('/search', (req: Request, res: Response) => {
         
      })

      // start server
      const port = process.env.PORT;
      app.listen(port, () => {
         console.log(`App listening on the port ${port}`);
      });

   } catch (err) {
      console.error(err);
   }
})();

