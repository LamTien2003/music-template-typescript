var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { formatTime } from './../utils/format';
import Component from './component';
import MusicItem from './musicItem';
import Autobind from '../decorator/autobind';
export default class MusicTemplate extends Component {
    constructor(className, classHostElement, listSong = []) {
        super(className, classHostElement);
        this.listMusic = [];
        this.playerMusic = document.querySelector('.player-music');
        this.audio = document.querySelector('audio');
        this.progressBar = this.playerMusic.querySelector('.progress-range');
        this.volumeElement = this.playerMusic.querySelector('.volumn-range');
        this.isPlaying = false;
        this.isTimeUpdate = false;
        this.currentMusicIndex = 0;
        listSong.forEach((song, index) => {
            const newSong = new MusicItem({
                id: index,
                className: 'item-box',
                hostElement: this.element,
                nameSong: song.nameSong,
                author: song.author,
                view: song.view,
                time: song.time,
                image: song.image,
                music: song.music,
                onClickPlay: this.onClickBtn,
                active: index === 0 ? true : false,
            });
            this.addSongToList(newSong);
            newSong.renderToHostElement();
        });
        this.renderContent();
        this.renderCurrentSong(this.currentMusicIndex);
        this.configure();
    }
    addSongToList(song) {
        this.listMusic.push(song);
        song.renderToHostElement();
    }
    configure() {
        const playIcon = this.playerMusic.querySelector('.fa-play');
        const pauseIcon = this.playerMusic.querySelector('.fa-pause');
        const nextButton = this.playerMusic.querySelector('.next-button');
        const previousButton = this.playerMusic.querySelector('.previous-button');
        this.audio.ontimeupdate = () => {
            const timeStart = this.playerMusic.querySelector('.progress-box .time-start');
            const timeEnd = this.playerMusic.querySelector('.progress-box .time-end');
            timeEnd.innerHTML = formatTime(this.audio.duration || 0);
            timeStart.innerHTML = formatTime(this.audio.currentTime);
            // ĐỂ TRÁNH VIỆC LẦN ĐẦU TIÊN PLAY AUDIO DURATION SẼ = NAN , isTimeUpdate = true mới chạy
            if (this.audio.duration && this.isTimeUpdate) {
                const progressPercent = Math.floor((this.audio.currentTime / this.audio.duration) * 100);
                this.progressBar.value = progressPercent.toString();
                this.progressBar.style.background =
                    'linear-gradient(to right, #2c3e50 0%, #2c3e50 ' +
                        progressPercent +
                        '%, #d7dcdf ' +
                        progressPercent +
                        '%, #d7dcdf 100%)';
            }
        };
        this.progressBar.onpointerdown = (e) => {
            this.isTimeUpdate = false;
        };
        this.progressBar.onchange = (e) => {
            // value ở đây là %
            const onchangePercent = +e.target.value;
            //  từ % tính ngược ra giây vì currentTime tính = giây
            const onchangeSecond = (onchangePercent * this.audio.duration) / 100;
            this.audio.currentTime = onchangeSecond;
            // sau khi set value sau khi đổi thì set lại isTimeUpdate = true để input chạy tiếp theo thời gian bài hát
            this.isTimeUpdate = true;
        };
        this.audio.onended = this.nextSong;
        this.volumeElement.addEventListener('input', (e) => {
            const value = +this.volumeElement.value;
            this.audio.volume = value * 0.01;
            this.volumeElement.style.background =
                'linear-gradient(to right, #2c3e50 0%, #2c3e50 ' +
                    value +
                    '%, #d7dcdf ' +
                    value +
                    '%, #d7dcdf 100%)';
        });
        playIcon.addEventListener('click', () => {
            this.playSong();
            this.renderIcon();
        });
        pauseIcon.addEventListener('click', () => {
            this.pauseSong();
            this.renderIcon();
        });
        nextButton.addEventListener('click', this.nextSong);
        previousButton.addEventListener('click', this.previousSong);
    }
    nextSong() {
        if (this.currentMusicIndex >= this.listMusic.length - 1) {
            this.currentMusicIndex = 0;
        }
        else {
            this.currentMusicIndex++;
        }
        this.renderCurrentSong(this.currentMusicIndex);
        this.playSong();
        this.renderIcon();
    }
    previousSong() {
        if (this.currentMusicIndex <= 0) {
            this.currentMusicIndex = this.listMusic.length - 1;
        }
        else {
            this.currentMusicIndex--;
        }
        this.renderCurrentSong(this.currentMusicIndex);
        this.playSong();
        this.renderIcon();
    }
    playSong() {
        this.isPlaying = true;
        this.isTimeUpdate = true;
        this.audio.play();
    }
    pauseSong() {
        this.isPlaying = false;
        this.isTimeUpdate = false;
        this.audio.pause();
    }
    renderIcon() {
        const playIcon = this.playerMusic.querySelector('.fa-play');
        const pauseIcon = this.playerMusic.querySelector('.fa-pause');
        if (this.isPlaying) {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        }
        else {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    }
    onClickBtn(idSong, isActive) {
        if (isActive && this.isPlaying) {
            this.pauseSong();
            this.renderIcon();
            return;
        }
        else if (isActive && this.isPlaying === false) {
            this.playSong();
            this.renderIcon();
            return;
        }
        else {
            this.renderCurrentSong(idSong);
            this.playSong();
            this.renderIcon();
            return;
        }
    }
    renderContent() {
        this.listMusic.forEach((item) => {
            var _a;
            const playIcon = item.playBtn.querySelector('.fa-play');
            const pauseIcon = item.playBtn.querySelector('.fa-pause');
            item.element.classList.remove('active');
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
            if (item.nameSong === ((_a = this.listMusic[this.currentMusicIndex]) === null || _a === void 0 ? void 0 : _a.nameSong)) {
                item.element.classList.add('active');
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
            }
            item.renderToHostElement();
        });
        this.hostElement.appendChild(this.element);
    }
    renderCurrentSong(idSong) {
        var _a, _b, _c, _d;
        this.currentMusicIndex = idSong;
        const newList = this.listMusic.map((item) => {
            var _a;
            if (item.nameSong === ((_a = this.listMusic[this.currentMusicIndex]) === null || _a === void 0 ? void 0 : _a.nameSong)) {
                item.active = true;
            }
            else {
                item.active = false;
            }
            return item;
        });
        this.listMusic = newList;
        this.renderContent();
        const img = this.playerMusic.querySelector('.title-box img');
        const title = this.playerMusic.querySelector('.title-box .player-title');
        const author = this.playerMusic.querySelector('.title-box .player-subtitle');
        const iconBox = this.playerMusic.querySelector('.button-box .play');
        this.audio.src = `../public/music/${(_a = this.listMusic[this.currentMusicIndex]) === null || _a === void 0 ? void 0 : _a.music}`;
        img.src = `../public/images/${(_b = this.listMusic[this.currentMusicIndex]) === null || _b === void 0 ? void 0 : _b.image}`;
        title.innerText = (_c = this.listMusic[this.currentMusicIndex]) === null || _c === void 0 ? void 0 : _c.nameSong;
        author.innerText = (_d = this.listMusic[this.currentMusicIndex]) === null || _d === void 0 ? void 0 : _d.author;
    }
}
__decorate([
    Autobind
], MusicTemplate.prototype, "configure", null);
__decorate([
    Autobind
], MusicTemplate.prototype, "nextSong", null);
__decorate([
    Autobind
], MusicTemplate.prototype, "previousSong", null);
__decorate([
    Autobind
], MusicTemplate.prototype, "playSong", null);
__decorate([
    Autobind
], MusicTemplate.prototype, "pauseSong", null);
__decorate([
    Autobind
], MusicTemplate.prototype, "onClickBtn", null);
__decorate([
    Autobind
], MusicTemplate.prototype, "renderCurrentSong", null);
