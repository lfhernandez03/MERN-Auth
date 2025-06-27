import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from "./config/db"
import registerRouter from './routes/auth/registerAuth'
import loginRouter from './routes/auth/loginAuth'

dotenv.config();

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(express.json());

app.use('/api/auth', registerRouter);
app.use('/api/auth/', loginRouter);

app.get('/', (req, res) => {
    res.send("Holaaaaa")
})

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at PORT ${PORT}`);
    });
}).catch((err) => {
    console.error("Error al conectar a la base de datos:", err);
});