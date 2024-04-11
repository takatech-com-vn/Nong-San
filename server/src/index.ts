import express, {Application, Request, Response} from 'express';
import cors from 'cors';
import { config as dotenvConfig } from 'dotenv';
import { connection, connectToDatabase } from './config/database/mySQL';
import route = require('./routers');

connectToDatabase();

dotenvConfig();

const app: Application = express();
const port: number = 3000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

route(app);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello')
})

app.post('/', (req: Request, res: Response) => {
  const data = req.body;
  console.log("data" + data)
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
