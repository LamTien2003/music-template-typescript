import { RequestHandler } from 'express';

import UserModel  from '../models/user.model';

export const getMyInfo: RequestHandler = async(req, res, next) => {
  try {
    const { _id } = req.body.user;
    
    const user = await UserModel.findOne({_id});
    if (!user) {
        return res.status(403).json({
            status: 'failed',
            message: 'Người dùng không tồn tại',
        });
    }
    res.status(200).json({
        status: 'success',
        message: 'Đăng nhập thành công',
        data: user,
    });
  }catch(err) {
    return res.status(400).json({
      status: 'failed',
      message: "Có lỗi xảy ra khi lấy dữ liệu người dùng " + err
    })
  }
};

