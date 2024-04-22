import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import { config as dotenvConfig } from 'dotenv';
import { connection, connectToDatabase } from './config/database/mySQL';
import { configSession } from './config/configSession';
import route = require('./routers');

const app: Express = express();
const port: number = 3000;

connectToDatabase();

dotenvConfig();

configSession(app);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
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
