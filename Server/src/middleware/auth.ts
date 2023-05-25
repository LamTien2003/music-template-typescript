import { promisify } from "util";
import jwt from 'jsonwebtoken';

import { Request,Response,NextFunction } from "express"
import UserModel from "../models/user.model";


interface JwtResponseData {
    id: string;
}

export const validateToken = async(req: Request,res:Response,next:NextFunction) => {
    try {
        let token;
        if (
          req.headers.authorization &&
          req.headers.authorization.startsWith('Bearer')
        ) {
          token = req.headers.authorization.split(' ')[1];
        }
      
        if (!token) {
            return res.status(403).json({
                status: 'failed',
                message: 'Bạn chưa đăng nhập, vui lòng đăng nhập để tiếp tục',
            })
        }
      
        // 2) Verification token
        const isValid = jwt.verify(token,'lam-thanh-tien') as JwtResponseData || Boolean
        if (!isValid) {
            return res.status(403).json({
                status: 'failed',
                message: 'Thông tin đăng nhập không chính xác, có thể thông tin đã bị sửa đổi ',
            });
        }
        // 3) Check if user still exists
        const currentUser = await UserModel.findById(isValid.id);
        if (!currentUser) {
            return res.status(403).json({
                status: 'failed',
                message: 'Người dùng này không tồn tại ',
            });
        }
        req.body.user = currentUser as any
        next()
    }catch(err) {
        return res.status(403).json({
            status: 'failed',
            message: err,
        })
    }
}
export const validateRole = (...roles: String[]) => {
    return (req: Request,res: Response,next: NextFunction) => {
        try {
            const role = req.body.user.role
            if(!roles.includes(role)) {
                return res.status(403).json({
                    status: 'failed',
                    message: 'Bạn không có quyền truy cập phương thức này ',
                });
            }
            next()
        }catch(err) {
            return res.status(403).json({
                status: 'failed',
                message: err,
            })
        }
    }
}