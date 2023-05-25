var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class LoginForm {
    constructor() {
        this.formElement = document.querySelector('form');
        this.userNameInput = document.querySelector('input[name="username"]');
        this.passwordInput = document.querySelector('input[name="password"]');
        this.configEvent();
    }
    configEvent() {
        this.formElement.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
            try {
                e.preventDefault();
                const payload = {
                    username: this.userNameInput.value,
                    password: this.passwordInput.value
                };
                const response = yield fetch(`http://localhost:3030/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                    body: JSON.stringify(payload),
                });
                const result = yield response.json();
                if (!response.ok || result.status === 'failed') {
                    return alert(result.message);
                }
                sessionStorage.setItem('token', result.token);
                alert("Đăng nhập thành công");
            }
            catch (err) {
                alert(err);
            }
        }));
    }
}
