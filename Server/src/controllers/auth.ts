import { RequestHandler } from 'express';
 import jwt from 'jsonwebtoken';
import UserModel  from '../models/user.model';

export const login: RequestHandler = async(req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password ) {
        return res.status(403).json({
            status: 'failed',
            message: 'Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu',
        });
    }
    const user = await UserModel.findOne({username});
    if (!user) {
        return res.status(403).json({
            status: 'failed',
            message: 'Người dùng không tồn tại',
        });
    }
    if (!(password === user.password)) {
        return res.status(403).json({
            status: 'failed',
            message: 'Mật khẩu không đúng',
        });
    }
    const token = jwt.sign({ id: user.id }, 'lam-thanh-tien');
    res.status(200).json({
        status: 'success',
        message: 'Đăng nhập thành công',
        token,
    });
  }catch(err) {
    return res.status(400).json({
      status: 'failed',
      message: "Có lỗi xảy ra khi lấy dữ liệu người dùng " + err
    })
  }
};

export const signUp: RequestHandler = async(req, res, next) => {
  try {
    const { username, password,passwordConfirm } = req.body;
    if (!username || !password || !passwordConfirm) {
        return res.status(403).json({
            status: 'failed',
            message: 'Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu',
        });
    }
    const user = await UserModel.create({username,password,passwordConfirm});
    const token = jwt.sign({ id: user.id }, 'lam-thanh-tien');
    res.status(200).json({
        status: 'success',
        message: 'Đăng nhập thành công',
        token,
    });
  }catch(err) {
    return res.status(400).json({
      status: 'failed',
      message: "Có lỗi xảy ra khi lấy dữ liệu người dùng " + err
    })
  }
};