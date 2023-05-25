"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const db_1 = __importDefault(require("./models/db"));
const cors_1 = __importDefault(require("cors"));
const song_1 = __importDefault(require("./routes/song"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, cors_1.default)({
    origin: '*',
}));
app.use('/songs', song_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
(0, db_1.default)();
app.listen(3030, () => {
    console.log(`Ung dung dang chay`);
});
