var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getAllSong } from '../services/api';
import Component from './component';
export class ManageForm extends Component {
    constructor() {
        super('content-main-body', 'content-main');
        const fetchSongs = new Promise((resolve, reject) => {
            const response = getAllSong();
            if (!response) {
                reject('Có lỗi xảy ra khi call API ');
            }
            resolve(response);
        });
        fetchSongs
            .then((data) => {
            this.renderContent(data);
            this.configure();
        })
            .catch((err) => console.log(err));
        this.hostElement.appendChild(this.element);
    }
    configure() {
        const listUpdateShowBtn = document.querySelectorAll('.updateShow');
        const listDeleteBtn = document.querySelectorAll('.delete-btn');
        listDeleteBtn.forEach(btn => btn.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            try {
                const btnElement = (e.target);
                const idSong = btnElement.getAttribute('data-id');
                if (!confirm("Bạn có chắc chắn muốn xóa bài hát này ?")) {
                    return;
                }
                let options = {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
                };
                if (sessionStorage.getItem('token')) {
                    options = Object.assign(Object.assign({}, options), { headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                        } });
                }
                const response = yield fetch(`http://localhost:3030/songs/${idSong}`, options);
                const result = yield response.json();
                if (!response.ok || result.status === 'failed') {
                    return alert(result.message);
                }
                alert("Xóa thành công");
                window.location.href = '/Client/src/views/index.html';
            }
            catch (err) {
                console.log(err);
            }
        })));
        listUpdateShowBtn.forEach(btn => btn.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            const btn = e.target;
            const id = btn.getAttribute('data-id');
            let options = {
                method: 'PATCH',
                body: JSON.stringify({ show: true }),
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
            };
            if (sessionStorage.getItem('token')) {
                options = Object.assign(Object.assign({}, options), { headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    } });
            }
            const response = yield fetch(`http://localhost:3030/songs/updateshow/${id}`, options);
            const result = yield response.json();
            if (!response.ok || result.status === 'failed') {
                return alert(result.message);
            }
            window.location.href = '/Client/src/views/index.html';
        })));
    }
    renderContent(data) {
        const html = data
            .map((item) => {
            return `<div class="item-box">
            <div class="title">
                
                <div class="image">
                    <img src="../public/images/${item.image}" alt="">
                </div>
                <div class="info">
                    <p class="info-title">${item.nameSong}</p>
                    <p class="subtitle">${item.author}</p>
                </div>
            </div>
            <div class="detail">
                <p class="button"><a href="./edit.html?id=${item._id}" class="change-btn"><i class="fa-solid fa-pen-to-square"></i></a></p>
            </div>
            <div class="detail">
                <p class="button delete-btn" ><i class="fa-solid fa-trash-can" data-id=${item._id}></i></p>
            </div>
            
            <div class="detail">
                <p>${item.show ? "Đang được hiển thị" : `<button class='updateShow' data-id=${item._id}> Duyệt bài hát </button>`}</p>
            </div>
        </div>`;
        })
            .join(' ');
        this.element.innerHTML = html;
    }
}
