import { RequestHandler } from 'express';

import SongModel  from '../models/song.model';
interface UserData {
  username: string;
  password: string;
  role: string;
  _id: string;
}
export const getAllSong: RequestHandler = async(req, res, next) => {
  try {
    const songs = await SongModel.find({})
    res.status(200).json({
      status: 'success',
      message: "Lấy dữ liệu thành công",
      data: songs
    })
  }catch(err) {
    return res.status(400).json({
      status: 'failed',
      message: "Có lỗi xảy ra khi lấy dữ liệu bài hát " + err
    })
  }
};
export const getShowSongs: RequestHandler = async(req, res, next) => {
  try {
    const songs = await SongModel.find({show:true})
    res.status(200).json({
      status: 'success',
      message: "Lấy dữ liệu thành công",
      data: songs
    })
  }catch(err) {
    return res.status(400).json({
      status: 'failed',
      message: "Có lỗi xảy ra khi lấy dữ liệu bài hát " + err
    })
  }
};

export const getShowSongsOfUser: RequestHandler = async(req, res, next) => {
  try {
    const songs = await SongModel.find({createBy: req.body.user._id})
    res.status(200).json({
      status: 'success',
      message: "Lấy dữ liệu thành công",
      data: songs
    })
  }catch(err) {
    return res.status(400).json({
      status: 'failed',
      message: "Có lỗi xảy ra khi lấy dữ liệu bài hát " + err
    })
  }
};

export const getSongById: RequestHandler = async(req, res, next) => {
  try {
    const song = await SongModel.findOne({_id: req.params.idSong})
    if(!song) {
      return res.status(400).json({
        status: 'failed',
        message: "Không tìm thấy bài hát !!!"
      })
    }
    res.status(200).json({
      status: 'success',
      message: "Lấy dữ liệu thành công",
      data: song
    })
  }catch(err) {
    return res.status(400).json({
      status: 'failed',
      message: "Có lỗi xảy ra khi lấy dữ liệu bài hát " + err
    })
  }
};

export const createSong: RequestHandler = async(req,res,next) => {
  try {
    const user: UserData = req.body.user
    const song = await SongModel.create({
        nameSong: req.body.nameSong,
        author: req.body.author,
        view: req.body.view,
        time: req.body.time,
        image: req.body.image,
        music: req.body.music,
        createBy: user._id
      })
    if(!song) {
      return res.status(400).json({
        status: 'failed',
        message: "Có lỗi xảy ra khi tạo bài hát: Dữ liệu nhập đã sai "
      })
      
    }
    res.status(200).json({
      status: 'success',
      message: "Tạo thành công bài hát mới",
      data: song 
    })
  }catch(err) {
    return res.status(400).json({
      status: 'failed',
      message: "Có lỗi xảy ra khi tạo bài hát " + err
    })
  }
}
export const editSong: RequestHandler = async(req,res,next) => {
  try {
    const song = await SongModel.findByIdAndUpdate(req.params.idSong,req.body)
    if(!song) {
      return res.status(400).json({
        status: 'failed',
        message: "Không tìm thấy bài hát !!!"
      })
    }
    res.status(200).json({
      status: 'success',
      message: "Sửa đổi thông tin bài hát thành công",
      data: song 
    })
  }catch(err) {
    return res.status(400).json({
      status: 'failed',
      message: "Có lỗi xảy ra khi sửa thông tin bài hát " + err
    })
  }
}
export const updateShow: RequestHandler = async(req,res,next) => {
  try {
    const song = await SongModel.findByIdAndUpdate(req.params.idSong,{show: true})
    if(!song) {
      return res.status(400).json({
        status: 'failed',
        message: "Không tìm thấy bài hát !!!"
      })
    }
    res.status(200).json({
      status: 'success',
      message: "Sửa đổi thông tin bài hát thành công",
      data: song 
    })
  }catch(err) {
    return res.status(400).json({
      status: 'failed',
      message: "Có lỗi xảy ra khi sửa thông tin bài hát " + err
    })
  }
}
export const deleteSong: RequestHandler = async(req, res, next) => {
  try {
    const song = await SongModel.findByIdAndDelete({_id: req.params.idSong})
    if(!song) {
      return res.status(400).json({
        status: 'failed',
        message: "Không tìm thấy bài hát !!!"
      })
    }
    res.status(200).json({
      status: 'success',
      message: "Xóa bài hát thành công",
      data: song
    })
  }catch(err) {
    return res.status(400).json({
      status: 'failed',
      message: "Có lỗi xảy ra khi xóa bài hát " + err
    })
  }
};

