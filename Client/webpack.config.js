const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
        sidebar: path.resolve(__dirname, 'src/sidebar.ts'),
        addForm: path.resolve(__dirname, 'src/add-form.ts'),
        editForm: path.resolve(__dirname, 'src/edit-form.ts'),
        manageForm: path.resolve(__dirname, 'src/manage-form.ts'),
        manageUser: path.resolve(__dirname, 'src/manage-user.ts'),
        loginForm: path.resolve(__dirname, 'src/login-form.ts'),
        registerForm: path.resolve(__dirname, 'src/register-form.ts'),
    },

    output: {
        filename: '[name].js',
        sourceMapFilename: '[name].js.map',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.ts', '.js'],
    },
};
