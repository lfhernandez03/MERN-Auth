"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../../models/user"));
const generateJWT_1 = __importDefault(require("./generateJWT"));
const router = (0, express_1.Router)();
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            res.status(400).json({ message: "Por favor rellene todos los campos" });
            return;
        }
        const userExists = yield user_1.default.findOne({ email });
        if (userExists) {
            res.status(500).json({ message: "El usuario ya existe" });
            return;
        }
        const user = yield user_1.default.create({ username, email, password });
        const token = (0, generateJWT_1.default)(user.id);
        res.status(201).json({
            id: user._id,
            username: user.username,
            email: user.email,
            token,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message || "Error en el servidor" });
    }
}));
exports.default = router;
