import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import { config as dotenvConfig } from 'dotenv';
import { connection, connectToDatabase } from './config/database/mySQL';
import { configSession } from './config/configSession';
import route = require('./routers');
import path = require('path');
import fs from 'fs'
const app: Express = express();
const port: number = 3000;

connectToDatabase();

dotenvConfig();

configSession(app);

// Cấu hình máy chủ để phục vụ tệp tĩnh
app.use('/images', express.static(path.join(process.cwd(), 'public/images')));

console.log("dirname: " + process.cwd());



// // Cấu hình máy chủ để phục vụ tệp tĩnh
// const directoryPath = path.join(__dirname, 'src/public/images');

// // Kiểm tra xem thư mục đã tồn tại hay chưa
// if (!fs.existsSync(directoryPath)) {
//   // Nếu thư mục không tồn tại, tạo nó
//   try {
//     fs.mkdirSync(directoryPath, { recursive: true });
//     console.log(`Thư mục ${directoryPath} đã được tạo thành công.`);
//   } catch (err) {
//     console.error(`Không thể tạo thư mục ${directoryPath}:`, err);
//   }
// }

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

