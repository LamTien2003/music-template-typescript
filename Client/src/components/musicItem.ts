import Component from './component';
import Autobind from '../decorator/autobind';

interface MusicData {
    nameSong: string;
    author: string;
    view: number;
    time: string;
    image: string;
    music: string;
}

interface ArgumentConstructor extends MusicData {
    id: number;
    className: string;
    hostElement: string | HTMLElement;
    onClickPlay: (idSong: number, isActive: boolean) => void;
    active?: boolean;
}

export default class MusicItem extends Component<HTMLDivElement> implements MusicData {
    playBtn: HTMLDivElement;
    id: number;
    nameSong: string;
    author: string;
    view: number;
    time: string;
    image: string;
    music: string;
    active: boolean;
    handleClickPlay: (id: number, isActive: boolean) => void;

    constructor(data: ArgumentConstructor) {
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
        this.playBtn = this.element.querySelector('.icon')! as HTMLDivElement;
        this.handleClickPlay = data.onClickPlay;

        this.configure();
    }

    configure(): void {
        this.playBtn.addEventListener('click', () => {
            this.handleClickPlay(this.id, this.active);
        });
    }

    @Autobind
    renderContent(): void {
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
    @Autobind
    renderToHostElement(): void {
        this.hostElement.appendChild(this.element);
    }
}
