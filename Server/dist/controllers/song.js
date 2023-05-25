"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSong = exports.getAllSong = void 0;
const song_model_1 = __importDefault(require("../models/song.model"));
const getAllSong = async (req, res, next) => {
    try {
        const songs = await song_model_1.default.find({});
        res.status(200).json({
            status: 'success',
            message: "Lấy dữ liệu thành công",
            data: songs
        });
    }
    catch (err) {
        return res.status(400).json({
            status: 'failed',
            message: "Có lỗi xảy ra khi lấy dữ liệu bài hát " + err
        });
    }
};
exports.getAllSong = getAllSong;
const createSong = async (req, res, next) => {
    try {
        const song = await song_model_1.default.create(req.body);
        if (!song) {
            return res.status(400).json({
                status: 'failed',
                message: "Có lỗi xảy ra khi tạo bài hát: Dữ liệu nhập đã sai "
            });
        }
        res.status(200).json({
            status: 'success',
            message: "Tạo thành công bài hát mới",
            data: song
        });
    }
    catch (err) {
        return res.status(400).json({
            status: 'failed',
            message: "Có lỗi xảy ra khi tạo bài hát " + err
        });
    }
};
exports.createSong = createSong;
