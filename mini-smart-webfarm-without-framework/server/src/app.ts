import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import prisma from "./lib/database";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
        optionsSuccessStatus: 200,
    })
)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello TypeScript + Docker!');
});

app.get('/users', async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.json(users);
});



app.listen(PORT, async () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
