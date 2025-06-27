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
exports.protect = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]; //Authorization: [Bearer, <token>]
            const secret = process.env.JWT_SECRET;
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            const user = yield user_1.default.findById(decoded.id).select('-password');
            if (!user) {
                res.status(401).json({ message: "Usuario no encontrado" });
                return;
            }
            req.user = user;
            return next();
        }
        catch (error) {
            console.log(error.message || "Error verificando el token");
            res.status(401).json({ message: "Sin autorizacion, falla en el token" });
            return;
        }
    }
    res.status(401).json({ message: "Sin autorizacion, falla en el token" });
});
exports.protect = protect;
