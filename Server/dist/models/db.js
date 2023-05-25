"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connect = async () => {
    try {
        await mongoose_1.default.connect('mongodb://localhost:27017/AsmTypescript', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect successfully!!!');
    }
    catch (error) {
        console.log('Connect failure!!!' + error);
    }
};
exports.default = connect;
