var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Component from './component';
import Autobind from '../decorator/autobind';
export default class MusicItem extends Component {
    constructor(data) {
        const className = `${data.className} ${data.active ? 'active' : ''}`;
        super(className, data.hostElement);
        this.element.innerText = 'test thử nè';
        this.id = data.id;
        this.nameSong = data.nameSong;
        this.author = data.author;
        this.view = data.view;
        this.time = data.time;
        this.image = data.image;
        this.active = data.active || false;
        this.music = data.music;
        this.renderContent();
        this.playBtn = this.element.querySelector('.icon');
        this.handleClickPlay = data.onClickPlay;
        this.configure();
    }
    configure() {
        this.playBtn.addEventListener('click', () => {
            this.handleClickPlay(this.id, this.active);
        });
    }
    renderContent() {
        const string = `
        <div class="title">
            <div class="icon">
                <i class="fa-solid fa-play"></i>
                <i class="fa-solid fa-pause"></i>
            </div>
            <div class="image">
                <img src="../public/images/${this.image}" alt="">
            </div>
            <div class="info">
                <p class="info-title">${this.nameSong}</p>
                <p class="subtitle">${this.author}</p>
            </div>
        </div>
        <div class="detail">
            <p>${this.author}</p>
        </div>
        <div class="detail">
            <p>${this.view}K</p>
        </div>
        <div class="detail">
            <p>${this.time}</p>
        </div>`;
        this.element.innerHTML = string;
    }
    renderToHostElement() {
        this.hostElement.appendChild(this.element);
    }
}
__decorate([
    Autobind
], MusicItem.prototype, "renderContent", null);
__decorate([
    Autobind
], MusicItem.prototype, "renderToHostElement", null);
