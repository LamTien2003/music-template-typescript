



interface Payload {
    username: String;
    password: String;
}

export default class LoginForm {
    private formElement: HTMLFormElement;
    private userNameInput: HTMLInputElement;
    private passwordInput: HTMLInputElement;

    constructor() {
        this.formElement = document.querySelector('form')! as HTMLFormElement;
        this.userNameInput = document.querySelector('input[name="username"]')! as HTMLInputElement;
        this.passwordInput = document.querySelector('input[name="password"]')! as HTMLInputElement;
        this.configEvent();
    }

    configEvent() {
        
        this.formElement.addEventListener('submit', async (e: Event) => {
            try {
                e.preventDefault();
                const payload: Payload = {
                    username: this.userNameInput.value,
                    password: this.passwordInput.value
                }
                const response = await fetch(`http://localhost:3030/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                    body: JSON.stringify(payload),
                });
                const result = await response.json();
                if(!response.ok || result.status === 'failed') {
                    return alert(result.message)
                }
                sessionStorage.setItem('token',result.token)
                alert("Đăng nhập thành công")
                window.location.href = '/Client/src/views/index.html'
            }catch(err) {
                alert(err)
            }
        });
    }
}
