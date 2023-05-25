"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SongSchema = new mongoose_1.default.Schema({
    nameSong: {
        type: String,
        required: [true, 'Tên bài hát bắt buộc phải có'],
        trim: true,
        maxlength: [50, 'Tên bài hát không được vượt quá 50 kí tự'],
    },
    author: {
        type: String,
        required: [true, 'Tên tác giả bắt buộc phải có'],
        trim: true,
        maxlength: [30, 'Tên tác giả không được vượt quá 30 kí tự'],
    },
    view: {
        type: Number,
        default: 0,
    },
    time: {
        type: String,
        default: '00:00'
    },
    image: {
        type: String,
        required: [true, 'Bắt buộc phải có hình ảnh cho sản phẩm'],
    },
    music: {
        type: String,
        required: [true, 'Bắt buộc phải có hình ảnh cho sản phẩm'],
    }
});
const SongModel = mongoose_1.default.model('Songs', SongSchema);
exports.default = SongModel;
