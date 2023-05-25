import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Tên người dùng bắt buộc phải có'],
            trim: true,
            maxlength: [50, 'Tên người dùng không được vượt quá 50 kí tự'],
        },
        password: {
            type: String,
            required: [true, 'Mật khẩu bắt buộc phải có'],
            trim: true,
            maxlength: [30, 'Mật khẩu không được vượt quá 30 kí tự'],
        },
        passwordConfirm: {
            type: String,
            required: [true, 'Bạn chưa nhập mật khẩu xác nhận'],
            validate: {
                // Only save and create method
                validator: function(value: String) {
                    return value === this.password;
                  },
                  message: "Mật khẩu xác nhận không chính xác"
            }
        },
        role: {
            type: String,
            default: 'user'
        },
    }
);

UserSchema.pre('save', async function(next) {
    this.passwordConfirm = undefined as any;
    next();
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel
