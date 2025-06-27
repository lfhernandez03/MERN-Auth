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
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            res.status(400).json({ message: "Por favor rellene todos los campos" });
            return;
        }
        const user = yield user_1.default.findOne({ email });
        if (!user || !(yield user.matchPassword(password))) {
            res.status(400).json({ message: "Credenciales invalidas" });
            return;
        }
        const token = (0, generateJWT_1.default)({ id: user.id });
        res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            token,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message || "Error en el servidor al iniciar sesion" });
    }
}));
exports.default = router;
