var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import validator from 'validator';
import { getSongById } from '../services/api';
export default class EditForm {
    constructor(idSong) {
        this.formElement = document.querySelector('form');
        this.nameInput = document.querySelector('input[name="name"]');
        this.authorInput = document.querySelector('input[name="author"]');
        this.viewInput = document.querySelector('input[name="view"]');
        this.timeInput = document.querySelector('input[name="time"]');
        this.imageInput = document.querySelector('input[name="image"]');
        this.musicInput = document.querySelector('input[name="music"]');
        this.imagePreview = document.querySelector('.image-preview');
        this.idSong = idSong;
        const renderContent = new Promise((resolve, reject) => {
            const response = getSongById(this.idSong);
            if (response) {
                resolve(response);
            }
            else {
                reject('Có lỗi xảy ra');
            }
        });
        renderContent
            .then((data) => {
            this.nameInput.value = data.nameSong;
            this.authorInput.value = data.author;
            this.viewInput.value = data.view.toString();
            this.timeInput.value = data.time;
            this.imagePreview.src = `../public/images/${data.image}`;
        })
            .catch((err) => console.log(err));
        this.configEvent();
    }
    configEvent() {
        this.imageInput.addEventListener('change', (e) => {
            const input = e.target;
            const value = input.value.split('\\')[2];
            this.imagePreview.src = `../public/images/${value}`;
        });
        this.formElement.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
            try {
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
                let payload = {
                    nameSong,
                    author,
                    view: Number(view),
                    time,
                };
                if (image) {
                    payload = Object.assign(Object.assign({}, payload), { image });
                }
                if (music) {
                    payload = Object.assign(Object.assign({}, payload), { music });
                }
                let options = {
                    method: 'PATCH',
                    body: JSON.stringify(payload),
                    headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
                };
                if (sessionStorage.getItem('token')) {
                    options = Object.assign(Object.assign({}, options), { headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                        } });
                }
                const response = yield fetch(`http://localhost:3030/songs/${this.idSong}`, options);
                const result = yield response.json();
                if (!response.ok || result.status === 'failed') {
                    return alert(result.message);
                }
                window.location.href = '/Client/src/views/index.html';
            }
            catch (err) {
                console.log(err);
            }
        }));
    }
}
