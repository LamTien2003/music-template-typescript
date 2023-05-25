import validator from 'validator';
import { getAllSong, getSongById } from '../services/api';

interface SongData {
    nameSong: string;
    author: string;
    view: number;
    time: string;
    image: string;
    music: string;
}

interface Payload {
    nameSong?: string;
    author?: string;
    view?: number;
    time?: string;
    image?: string;
    music?: string;
}

export default class EditForm {
    private idSong: string;
    private formElement: HTMLFormElement;
    private nameInput: HTMLInputElement;
    private authorInput: HTMLInputElement;
    private viewInput: HTMLInputElement;
    private timeInput: HTMLInputElement;
    private imageInput: HTMLInputElement;
    private musicInput: HTMLInputElement;
    private imagePreview: HTMLImageElement;
    constructor(idSong: string) {
        this.formElement = document.querySelector('form')! as HTMLFormElement;
        this.nameInput = document.querySelector('input[name="name"]')! as HTMLInputElement;
        this.authorInput = document.querySelector('input[name="author"]')! as HTMLInputElement;
        this.viewInput = document.querySelector('input[name="view"]')! as HTMLInputElement;
        this.timeInput = document.querySelector('input[name="time"]')! as HTMLInputElement;
        this.imageInput = document.querySelector('input[name="image"]')! as HTMLInputElement;
        this.musicInput = document.querySelector('input[name="music"]')! as HTMLInputElement;
        this.imagePreview = document.querySelector('.image-preview')! as HTMLImageElement;
        this.idSong = idSong;
        const renderContent = new Promise<SongData>((resolve, reject) => {
            const response = getSongById(this.idSong);
            if (response) {
                resolve(response);
            } else {
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
            const input = e.target as HTMLInputElement;
            const value = input.value.split('\\')[2];
            this.imagePreview.src = `../public/images/${value}`;
        });
        this.formElement.addEventListener('submit', async (e: Event) => {
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
                let payload: Payload = {
                    nameSong,
                    author,
                    view: Number(view),
                    time,
                };
                if (image) {
                    payload = { ...payload, image };
                }

                if (music) {
                    payload = { ...payload, music };
                }

                let options: RequestInit  = {
                    method: 'PATCH',
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
                const response = await fetch(`http://localhost:3030/songs/${this.idSong}`, options);
                const result = await response.json();
                if(!response.ok || result.status === 'failed') {
                    return alert(result.message)
                }
                window.location.href = '/Client/src/views/index.html';
            }catch(err) {
                console.log(err)
            }
        });
    }
}
