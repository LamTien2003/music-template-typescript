import validator from 'validator';

export default class AddForm {
    private formElement: HTMLFormElement;
    private nameInput: HTMLInputElement;
    private authorInput: HTMLInputElement;
    private viewInput: HTMLInputElement;
    private timeInput: HTMLInputElement;
    private imageInput: HTMLInputElement;
    private musicInput: HTMLInputElement;

    constructor() {
        this.formElement = document.querySelector('form')! as HTMLFormElement;
        this.nameInput = document.querySelector('input[name="name"]')! as HTMLInputElement;
        this.authorInput = document.querySelector('input[name="author"]')! as HTMLInputElement;
        this.viewInput = document.querySelector('input[name="view"]')! as HTMLInputElement;
        this.timeInput = document.querySelector('input[name="time"]')! as HTMLInputElement;
        this.imageInput = document.querySelector('input[name="image"]')! as HTMLInputElement;
        this.musicInput = document.querySelector('input[name="music"]')! as HTMLInputElement;
        this.configEvent();
    }

    configEvent() {
        this.formElement.addEventListener('submit', async (e: Event) => {
            e.preventDefault();
            const nameSong = this.nameInput.value;
            const author = this.authorInput.value;
            const view = this.viewInput.value;
            const time = this.timeInput.value;
            const image = this.imageInput.value.split('\\')[2];
            const music = this.musicInput.value.split('\\')[2];

            if (!validator.isLength(nameSong, { min: 1, max: 50 })) {
                return alert('Tên bài hát phải có từ 1-50 kí tự');
            }
            if (!validator.isLength(author, { min: 1, max: 30 })) {
                return alert('Tên tác giả phải có từ 1-30 kí tự');
            }
            if (!validator.isInt(view, { min: 0 })) {
                return alert('Lượt xem phải là số !!!');
            }
            if (!image) {
                return alert('Bạn chưa chọn hình ảnh cho bài hát');
            }
            if (!music) {
                return alert('Bạn chưa chọn file nhạc cho bài hát');
            }
            const payload = {
                nameSong,
                author,
                view,
                time,
                image,
                music,
            };

            let options: RequestInit  = {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
            };
            if (sessionStorage.getItem('token')) {
                options = {
                    ...options,
                    headers: {
                        'Content-Type': 'application/json', 
                        Accept: 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    },
                };
            }

            const response = await fetch('http://localhost:3030/songs', options);
            const result = await response.json();
            if(!response.ok || result.status === 'failed') {
                return alert(result.message)
            }
            window.location.href = '/Client/src/views/index.html';
        });
    }
}
