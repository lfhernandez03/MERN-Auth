"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const registerAuth_1 = __importDefault(require("./routes/auth/registerAuth"));
const loginAuth_1 = __importDefault(require("./routes/auth/loginAuth"));
dotenv_1.default.config();
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/auth', registerAuth_1.default);
app.use('/api/auth/', loginAuth_1.default);
app.get('/', (req, res) => {
    res.send("Hola Mundo");
});
(0, db_1.connectDB)();
app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`);
});
