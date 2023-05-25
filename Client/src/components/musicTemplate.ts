import { formatTime } from './../utils/format';
import { getAllSong } from '../services/api';

import Component from './component';
import MusicItem from './musicItem';
import Autobind from '../decorator/autobind';

interface SongData {
    nameSong: string;
    author: string;
    view: number;
    time: string;
    image: string;
    music: string;
}

export default class MusicTemplate extends Component<HTMLDivElement> {
    private listMusic: MusicItem[] = [];
    private currentMusicIndex: number;
    private playerMusic: HTMLDivElement;
    private progressBar: HTMLInputElement;
    private volumeElement: HTMLInputElement;
    private audio: HTMLAudioElement;
    private isPlaying: boolean;
    private isTimeUpdate: boolean;

    constructor(className: string, classHostElement: string,listSong: SongData[] = []) {
        super(className, classHostElement);
        this.playerMusic = document.querySelector('.player-music')! as HTMLDivElement;
        this.audio = document.querySelector('audio')! as HTMLAudioElement;
        this.progressBar = this.playerMusic.querySelector('.progress-range')! as HTMLInputElement;
        this.volumeElement = this.playerMusic.querySelector('.volumn-range')! as HTMLInputElement;
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
            newSong.renderToHostElement()
        })

        this.renderContent();
        this.renderCurrentSong(this.currentMusicIndex);
        this.configure();
       

    }
    public addSongToList(song: MusicItem) {
        this.listMusic.push(song);
        song.renderToHostElement();
    }

    @Autobind
    configure(): void {
        const playIcon = this.playerMusic.querySelector('.fa-play')! as HTMLDivElement;
        const pauseIcon = this.playerMusic.querySelector('.fa-pause')! as HTMLDivElement;
        const nextButton = this.playerMusic.querySelector('.next-button')! as HTMLDivElement;
        const previousButton = this.playerMusic.querySelector(
            '.previous-button'
        )! as HTMLDivElement;

        this.audio.ontimeupdate = () => {
            const timeStart = this.playerMusic.querySelector(
                '.progress-box .time-start'
            )! as HTMLSpanElement;
            const timeEnd = this.playerMusic.querySelector(
                '.progress-box .time-end'
            )! as HTMLSpanElement;
            timeEnd.innerHTML = formatTime(this.audio.duration || 0);
            timeStart.innerHTML = formatTime(this.audio.currentTime);
            // ĐỂ TRÁNH VIỆC LẦN ĐẦU TIÊN PLAY AUDIO DURATION SẼ = NAN , isTimeUpdate = true mới chạy
            if (this.audio.duration && this.isTimeUpdate) {
                const progressPercent = Math.floor(
                    (this.audio.currentTime / this.audio.duration) * 100
                );
                this.progressBar.value = progressPercent.toString();
                this.progressBar.style.background =
                    'linear-gradient(to right, #2c3e50 0%, #2c3e50 ' +
                    progressPercent +
                    '%, #d7dcdf ' +
                    progressPercent +
                    '%, #d7dcdf 100%)';
            }
        };
        this.progressBar.onpointerdown = (e: Event) => {
            this.isTimeUpdate = false;
        };
        this.progressBar.onchange = (e: Event) => {
            // value ở đây là %
            const onchangePercent = +(e.target as HTMLInputElement).value;
            //  từ % tính ngược ra giây vì currentTime tính = giây
            const onchangeSecond = (onchangePercent * this.audio.duration) / 100;
            this.audio.currentTime = onchangeSecond;
            // sau khi set value sau khi đổi thì set lại isTimeUpdate = true để input chạy tiếp theo thời gian bài hát
            this.isTimeUpdate = true;
        };

        this.audio.onended = this.nextSong;
        this.volumeElement.addEventListener('input', (e: Event) => {
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

    @Autobind
    nextSong() {
        if (this.currentMusicIndex >= this.listMusic.length - 1) {
            this.currentMusicIndex = 0;
        } else {
            this.currentMusicIndex++;
        }
        this.renderCurrentSong(this.currentMusicIndex);
        this.playSong();
        this.renderIcon();
    }

    @Autobind
    previousSong() {
        if (this.currentMusicIndex <= 0) {
            this.currentMusicIndex = this.listMusic.length - 1;
        } else {
            this.currentMusicIndex--;
        }
        this.renderCurrentSong(this.currentMusicIndex);
        this.playSong();
        this.renderIcon();
    }

    @Autobind
    playSong() {
        this.isPlaying = true;
        this.isTimeUpdate = true;
        this.audio.play();
    }

    @Autobind
    pauseSong() {
        this.isPlaying = false;
        this.isTimeUpdate = false;
        this.audio.pause();
    }

    renderIcon() {
        const playIcon = this.playerMusic.querySelector('.fa-play')! as HTMLDivElement;
        const pauseIcon = this.playerMusic.querySelector('.fa-pause')! as HTMLDivElement;

        if (this.isPlaying) {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    }

    @Autobind
    onClickBtn(idSong: number, isActive: boolean) {
        if (isActive && this.isPlaying) {
            this.pauseSong();
            this.renderIcon();
            return;
        } else if (isActive && this.isPlaying === false) {
            this.playSong();
            this.renderIcon();
            return;
        } else {
            this.renderCurrentSong(idSong);
            this.playSong();
            this.renderIcon();
            return;
        }
    }

    renderContent(): void {
        this.listMusic.forEach((item) => {
            const playIcon = item.playBtn.querySelector('.fa-play')! as HTMLDivElement;
            const pauseIcon = item.playBtn.querySelector('.fa-pause')! as HTMLDivElement;

            item.element.classList.remove('active');
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';

            if (item.nameSong === this.listMusic[this.currentMusicIndex]?.nameSong) {
                item.element.classList.add('active');
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
            }

            item.renderToHostElement();
        });
        this.hostElement.appendChild(this.element);
    }

    @Autobind
    renderCurrentSong(idSong: number): void {
        this.currentMusicIndex = idSong;
        const newList: MusicItem[] = this.listMusic.map((item) => {
            if (item.nameSong === this.listMusic[this.currentMusicIndex]?.nameSong) {
                item.active = true;
            } else {
                item.active = false;
            }
            return item;
        });
        this.listMusic = newList;
        this.renderContent();
        const img = this.playerMusic.querySelector('.title-box img')! as HTMLImageElement;
        const title = this.playerMusic.querySelector(
            '.title-box .player-title'
        )! as HTMLParagraphElement;
        const author = this.playerMusic.querySelector(
            '.title-box .player-subtitle'
        )! as HTMLParagraphElement;

        const iconBox = this.playerMusic.querySelector('.button-box .play')! as HTMLSpanElement;
        this.audio.src = `../public/music/${this.listMusic[this.currentMusicIndex]?.music}`;
        img.src = `../public/images/${this.listMusic[this.currentMusicIndex]?.image}`;
        title.innerText = this.listMusic[this.currentMusicIndex]?.nameSong;
        author.innerText = this.listMusic[this.currentMusicIndex]?.author;
    }
}
