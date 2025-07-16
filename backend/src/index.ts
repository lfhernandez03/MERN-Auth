import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from "./config/db"
import registerRouter from './routes/auth/registerAuth'
import loginRouter from './routes/auth/loginAuth'
import meRouter from './routes/auth/meAuth'

dotenv.config();

console.log("Environment loaded:");
console.log("PORT:", process.env.PORT);
console.log("MONGO_URI:", process.env.MONGO_URI ? "Set" : "Not set");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "Set" : "Not set");

const PORT = process.env.PORT ?? 3001;
const app = express();

app.use(express.json());

// Middleware de logging para debugging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, req.body);
    next();
});

app.use('/api/auth', registerRouter);
app.use('/api/auth', loginRouter);
app.use('/api/auth', meRouter);

app.get('/', (req, res) => {
    res.send("Holaaaaa")
})

console.log("Attempting to connect to database...");
connectDB().then(() => {
    console.log("Database connected successfully!");
    app.listen(PORT, () => {
        console.log(`Server running at PORT ${PORT}`);
    });
}).catch((err) => {
    console.error("Error al conectar a la base de datos:", err.message);
    console.log("Starting server without database for testing...");
    // Iniciar el servidor aunque falle la BD para debugging
    app.listen(PORT, () => {
        console.log(`Server running at PORT ${PORT} (without database)`);
    });
});