import { RequestHandler } from "express"
import SongModel from "../models/song.model"

export const checkCreateByUser: RequestHandler = async(req,res,next) => {
    try {
        if(req.body.user.role === 'admin') return next()
        const song = await SongModel.findOne({_id: req.params.idSong})
        if(!(req.body.user._id.toString() === song?.createBy)) {
            return res.status(403).json({
                status: 'failed',
                message: 'Bài hát này không phải được tạo bởi bạn, bạn không có quyền sử dụng phương thức này ',
            });
        }
        next()
    }catch(err) {
        return res.status(403).json({
            status: 'failed',
            message: err,
        });
    }
}