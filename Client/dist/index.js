/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/component.ts":
/*!*************************************!*\
  !*** ./src/components/component.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Component)
/* harmony export */ });
class Component {
    constructor(elementClass, hostElementClass) {
        const box = document.createElement('div');
        box.className = elementClass;
        this.element = box;
        if (typeof hostElementClass === 'string') {
            this.hostElement = document.querySelector(`.${hostElementClass}`);
        }
        else if (hostElementClass instanceof HTMLElement) {
            this.hostElement = hostElementClass;
        }
    }
}


/***/ }),

/***/ "./src/components/musicItem.ts":
/*!*************************************!*\
  !*** ./src/components/musicItem.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MusicItem)
/* harmony export */ });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component */ "./src/components/component.ts");
/* harmony import */ var _decorator_autobind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../decorator/autobind */ "./src/decorator/autobind.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


class MusicItem extends _component__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
    _decorator_autobind__WEBPACK_IMPORTED_MODULE_1__["default"]
], MusicItem.prototype, "renderContent", null);
__decorate([
    _decorator_autobind__WEBPACK_IMPORTED_MODULE_1__["default"]
], MusicItem.prototype, "renderToHostElement", null);


/***/ }),

/***/ "./src/components/musicTemplate.ts":
/*!*****************************************!*\
  !*** ./src/components/musicTemplate.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MusicTemplate)
/* harmony export */ });
/* harmony import */ var _utils_format__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils/format */ "./src/utils/format.ts");
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component */ "./src/components/component.ts");
/* harmony import */ var _musicItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./musicItem */ "./src/components/musicItem.ts");
/* harmony import */ var _decorator_autobind__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../decorator/autobind */ "./src/decorator/autobind.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




class MusicTemplate extends _component__WEBPACK_IMPORTED_MODULE_1__["default"] {
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
            const newSong = new _musicItem__WEBPACK_IMPORTED_MODULE_2__["default"]({
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
            timeEnd.innerHTML = (0,_utils_format__WEBPACK_IMPORTED_MODULE_0__.formatTime)(this.audio.duration || 0);
            timeStart.innerHTML = (0,_utils_format__WEBPACK_IMPORTED_MODULE_0__.formatTime)(this.audio.currentTime);
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
    _decorator_autobind__WEBPACK_IMPORTED_MODULE_3__["default"]
], MusicTemplate.prototype, "configure", null);
__decorate([
    _decorator_autobind__WEBPACK_IMPORTED_MODULE_3__["default"]
], MusicTemplate.prototype, "nextSong", null);
__decorate([
    _decorator_autobind__WEBPACK_IMPORTED_MODULE_3__["default"]
], MusicTemplate.prototype, "previousSong", null);
__decorate([
    _decorator_autobind__WEBPACK_IMPORTED_MODULE_3__["default"]
], MusicTemplate.prototype, "playSong", null);
__decorate([
    _decorator_autobind__WEBPACK_IMPORTED_MODULE_3__["default"]
], MusicTemplate.prototype, "pauseSong", null);
__decorate([
    _decorator_autobind__WEBPACK_IMPORTED_MODULE_3__["default"]
], MusicTemplate.prototype, "onClickBtn", null);
__decorate([
    _decorator_autobind__WEBPACK_IMPORTED_MODULE_3__["default"]
], MusicTemplate.prototype, "renderCurrentSong", null);


/***/ }),

/***/ "./src/decorator/autobind.ts":
/*!***********************************!*\
  !*** ./src/decorator/autobind.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Autobind)
/* harmony export */ });
function Autobind(target, propertyName, descriptor) {
    // Method gốc
    const originalMethod = descriptor.value;
    const newDescriptor = {
        configurable: true,
        enumerable: false,
        // Thay vì dùng value trong descriptor thì dùng hàm getter, hàm getter return về cái gì thì giá trị
        // khi truy cập vào property (ở đây là hàm showMessage của obj tạo từ class Printer) sẽ là cái đó
        // Hàm getter sẽ nhận this là đối tượng gọi đến nó (ở đây sẽ là một obj được tạo từ class Printer)
        // nên có thể bind this cho method gốc
        get() {
            const bounedFunction = originalMethod.bind(this);
            return bounedFunction;
        },
    };
    return newDescriptor;
}


/***/ }),

/***/ "./src/services/api.ts":
/*!*****************************!*\
  !*** ./src/services/api.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAllMySong": () => (/* binding */ getAllMySong),
/* harmony export */   "getAllShowSong": () => (/* binding */ getAllShowSong),
/* harmony export */   "getAllSong": () => (/* binding */ getAllSong),
/* harmony export */   "getMyInfo": () => (/* binding */ getMyInfo),
/* harmony export */   "getSongById": () => (/* binding */ getSongById)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const getAllSong = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('http://localhost:3030/songs');
    const data = yield response.json();
    return data.data;
});
const getAllShowSong = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('http://localhost:3030/songs/show');
    const data = yield response.json();
    return data.data;
});
const getAllMySong = () => __awaiter(void 0, void 0, void 0, function* () {
    let options = {};
    if (sessionStorage.getItem('token')) {
        options = Object.assign(Object.assign({}, options), { headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            } });
    }
    const response = yield fetch(`http://localhost:3030/songs/mysong`, options);
    const data = yield response.json();
    return data.data;
});
const getSongById = (idSong) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`http://localhost:3030/songs/${idSong}`);
    const data = yield response.json();
    return data.data;
});
const getMyInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    let options = {};
    if (sessionStorage.getItem('token')) {
        options = Object.assign(Object.assign({}, options), { headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            } });
    }
    const response = yield fetch(`http://localhost:3030/user/myInfo`, options);
    const data = yield response.json();
    return data.data;
});


/***/ }),

/***/ "./src/utils/format.ts":
/*!*****************************!*\
  !*** ./src/utils/format.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formatTime": () => (/* binding */ formatTime)
/* harmony export */ });
const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const second = Math.floor(time - minutes * 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${second < 10 ? '0' : ''}${second}`;
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_musicTemplate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/musicTemplate */ "./src/components/musicTemplate.ts");
/* harmony import */ var _services_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/api */ "./src/services/api.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const fetch = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listSong = yield (0,_services_api__WEBPACK_IMPORTED_MODULE_1__.getAllShowSong)();
        const MusicTemplate2 = new _components_musicTemplate__WEBPACK_IMPORTED_MODULE_0__["default"]('content-main-body', 'content-main', listSong);
    }
    catch (err) {
        console.log(err);
    }
});
fetch();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwREFBMEQsaUJBQWlCO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNaQSxrQkFBa0IsU0FBSSxJQUFJLFNBQUk7QUFDOUI7QUFDQTtBQUNBLDZDQUE2QyxRQUFRO0FBQ3JEO0FBQ0E7QUFDb0M7QUFDUztBQUM5Qix3QkFBd0Isa0RBQVM7QUFDaEQ7QUFDQSw2QkFBNkIsZ0JBQWdCLEVBQUUsNEJBQTRCO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsV0FBVztBQUN4RDtBQUNBO0FBQ0Esd0NBQXdDLGNBQWM7QUFDdEQsc0NBQXNDLFlBQVk7QUFDbEQ7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBLGlCQUFpQixVQUFVO0FBQzNCO0FBQ0E7QUFDQSxpQkFBaUIsVUFBVTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSwyREFBUTtBQUNaO0FBQ0E7QUFDQSxJQUFJLDJEQUFRO0FBQ1o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRUEsa0JBQWtCLFNBQUksSUFBSSxTQUFJO0FBQzlCO0FBQ0E7QUFDQSw2Q0FBNkMsUUFBUTtBQUNyRDtBQUNBO0FBQytDO0FBQ1g7QUFDQTtBQUNTO0FBQzlCLDRCQUE0QixrREFBUztBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLGtEQUFTO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyx5REFBVTtBQUMxQyxrQ0FBa0MseURBQVU7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0Qyw0RkFBNEY7QUFDeEksc0NBQXNDLDRGQUE0RjtBQUNsSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSwyREFBUTtBQUNaO0FBQ0E7QUFDQSxJQUFJLDJEQUFRO0FBQ1o7QUFDQTtBQUNBLElBQUksMkRBQVE7QUFDWjtBQUNBO0FBQ0EsSUFBSSwyREFBUTtBQUNaO0FBQ0E7QUFDQSxJQUFJLDJEQUFRO0FBQ1o7QUFDQTtBQUNBLElBQUksMkRBQVE7QUFDWjtBQUNBO0FBQ0EsSUFBSSwyREFBUTtBQUNaOzs7Ozs7Ozs7Ozs7Ozs7QUNsT2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEJBLGlCQUFpQixTQUFJLElBQUksU0FBSTtBQUM3Qiw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNNO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNNO0FBQ1A7QUFDQTtBQUNBLGdEQUFnRCxjQUFjO0FBQzlELHlDQUF5QyxnQ0FBZ0M7QUFDekUsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNNO0FBQ1AsZ0VBQWdFLE9BQU87QUFDdkU7QUFDQTtBQUNBLENBQUM7QUFDTTtBQUNQO0FBQ0E7QUFDQSxnREFBZ0QsY0FBYztBQUM5RCx5Q0FBeUMsZ0NBQWdDO0FBQ3pFLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzdDTTtBQUNQO0FBQ0E7QUFDQSxjQUFjLHdCQUF3QixFQUFFLFFBQVEsR0FBRyx1QkFBdUIsRUFBRSxPQUFPO0FBQ25GOzs7Ozs7O1VDSkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOQSxpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0IsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDdUQ7QUFDUDtBQUNoRDtBQUNBO0FBQ0EsK0JBQStCLDZEQUFjO0FBQzdDLG1DQUFtQyxpRUFBYTtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCIsInNvdXJjZXMiOlsid2VicGFjazovL2xhYi0xLy4vc3JjL2NvbXBvbmVudHMvY29tcG9uZW50LnRzIiwid2VicGFjazovL2xhYi0xLy4vc3JjL2NvbXBvbmVudHMvbXVzaWNJdGVtLnRzIiwid2VicGFjazovL2xhYi0xLy4vc3JjL2NvbXBvbmVudHMvbXVzaWNUZW1wbGF0ZS50cyIsIndlYnBhY2s6Ly9sYWItMS8uL3NyYy9kZWNvcmF0b3IvYXV0b2JpbmQudHMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9zcmMvc2VydmljZXMvYXBpLnRzIiwid2VicGFjazovL2xhYi0xLy4vc3JjL3V0aWxzL2Zvcm1hdC50cyIsIndlYnBhY2s6Ly9sYWItMS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9sYWItMS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbGFiLTEvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sYWItMS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2xhYi0xLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50Q2xhc3MsIGhvc3RFbGVtZW50Q2xhc3MpIHtcclxuICAgICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBib3guY2xhc3NOYW1lID0gZWxlbWVudENsYXNzO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGJveDtcclxuICAgICAgICBpZiAodHlwZW9mIGhvc3RFbGVtZW50Q2xhc3MgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaG9zdEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtob3N0RWxlbWVudENsYXNzfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChob3N0RWxlbWVudENsYXNzIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5ob3N0RWxlbWVudCA9IGhvc3RFbGVtZW50Q2xhc3M7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn07XHJcbmltcG9ydCBDb21wb25lbnQgZnJvbSAnLi9jb21wb25lbnQnO1xyXG5pbXBvcnQgQXV0b2JpbmQgZnJvbSAnLi4vZGVjb3JhdG9yL2F1dG9iaW5kJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXVzaWNJdGVtIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBgJHtkYXRhLmNsYXNzTmFtZX0gJHtkYXRhLmFjdGl2ZSA/ICdhY3RpdmUnIDogJyd9YDtcclxuICAgICAgICBzdXBlcihjbGFzc05hbWUsIGRhdGEuaG9zdEVsZW1lbnQpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5pbm5lclRleHQgPSAndGVzdCB0aOG7rSBuw6gnO1xyXG4gICAgICAgIHRoaXMuaWQgPSBkYXRhLmlkO1xyXG4gICAgICAgIHRoaXMubmFtZVNvbmcgPSBkYXRhLm5hbWVTb25nO1xyXG4gICAgICAgIHRoaXMuYXV0aG9yID0gZGF0YS5hdXRob3I7XHJcbiAgICAgICAgdGhpcy52aWV3ID0gZGF0YS52aWV3O1xyXG4gICAgICAgIHRoaXMudGltZSA9IGRhdGEudGltZTtcclxuICAgICAgICB0aGlzLmltYWdlID0gZGF0YS5pbWFnZTtcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IGRhdGEuYWN0aXZlIHx8IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubXVzaWMgPSBkYXRhLm11c2ljO1xyXG4gICAgICAgIHRoaXMucmVuZGVyQ29udGVudCgpO1xyXG4gICAgICAgIHRoaXMucGxheUJ0biA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuaWNvbicpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2xpY2tQbGF5ID0gZGF0YS5vbkNsaWNrUGxheTtcclxuICAgICAgICB0aGlzLmNvbmZpZ3VyZSgpO1xyXG4gICAgfVxyXG4gICAgY29uZmlndXJlKCkge1xyXG4gICAgICAgIHRoaXMucGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVDbGlja1BsYXkodGhpcy5pZCwgdGhpcy5hY3RpdmUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyQ29udGVudCgpIHtcclxuICAgICAgICBjb25zdCBzdHJpbmcgPSBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXBsYXlcIj48L2k+XHJcbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXBhdXNlXCI+PC9pPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImltYWdlXCI+XHJcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4uL3B1YmxpYy9pbWFnZXMvJHt0aGlzLmltYWdlfVwiIGFsdD1cIlwiPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZm9cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiaW5mby10aXRsZVwiPiR7dGhpcy5uYW1lU29uZ308L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInN1YnRpdGxlXCI+JHt0aGlzLmF1dGhvcn08L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxcIj5cclxuICAgICAgICAgICAgPHA+JHt0aGlzLmF1dGhvcn08L3A+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbFwiPlxyXG4gICAgICAgICAgICA8cD4ke3RoaXMudmlld31LPC9wPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxcIj5cclxuICAgICAgICAgICAgPHA+JHt0aGlzLnRpbWV9PC9wPlxyXG4gICAgICAgIDwvZGl2PmA7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmlubmVySFRNTCA9IHN0cmluZztcclxuICAgIH1cclxuICAgIHJlbmRlclRvSG9zdEVsZW1lbnQoKSB7XHJcbiAgICAgICAgdGhpcy5ob3N0RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xyXG4gICAgfVxyXG59XHJcbl9fZGVjb3JhdGUoW1xyXG4gICAgQXV0b2JpbmRcclxuXSwgTXVzaWNJdGVtLnByb3RvdHlwZSwgXCJyZW5kZXJDb250ZW50XCIsIG51bGwpO1xyXG5fX2RlY29yYXRlKFtcclxuICAgIEF1dG9iaW5kXHJcbl0sIE11c2ljSXRlbS5wcm90b3R5cGUsIFwicmVuZGVyVG9Ib3N0RWxlbWVudFwiLCBudWxsKTtcclxuIiwidmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufTtcclxuaW1wb3J0IHsgZm9ybWF0VGltZSB9IGZyb20gJy4vLi4vdXRpbHMvZm9ybWF0JztcclxuaW1wb3J0IENvbXBvbmVudCBmcm9tICcuL2NvbXBvbmVudCc7XHJcbmltcG9ydCBNdXNpY0l0ZW0gZnJvbSAnLi9tdXNpY0l0ZW0nO1xyXG5pbXBvcnQgQXV0b2JpbmQgZnJvbSAnLi4vZGVjb3JhdG9yL2F1dG9iaW5kJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXVzaWNUZW1wbGF0ZSBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcihjbGFzc05hbWUsIGNsYXNzSG9zdEVsZW1lbnQsIGxpc3RTb25nID0gW10pIHtcclxuICAgICAgICBzdXBlcihjbGFzc05hbWUsIGNsYXNzSG9zdEVsZW1lbnQpO1xyXG4gICAgICAgIHRoaXMubGlzdE11c2ljID0gW107XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJNdXNpYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItbXVzaWMnKTtcclxuICAgICAgICB0aGlzLmF1ZGlvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXVkaW8nKTtcclxuICAgICAgICB0aGlzLnByb2dyZXNzQmFyID0gdGhpcy5wbGF5ZXJNdXNpYy5xdWVyeVNlbGVjdG9yKCcucHJvZ3Jlc3MtcmFuZ2UnKTtcclxuICAgICAgICB0aGlzLnZvbHVtZUVsZW1lbnQgPSB0aGlzLnBsYXllck11c2ljLnF1ZXJ5U2VsZWN0b3IoJy52b2x1bW4tcmFuZ2UnKTtcclxuICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNUaW1lVXBkYXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TXVzaWNJbmRleCA9IDA7XHJcbiAgICAgICAgbGlzdFNvbmcuZm9yRWFjaCgoc29uZywgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmV3U29uZyA9IG5ldyBNdXNpY0l0ZW0oe1xyXG4gICAgICAgICAgICAgICAgaWQ6IGluZGV4LFxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnaXRlbS1ib3gnLFxyXG4gICAgICAgICAgICAgICAgaG9zdEVsZW1lbnQ6IHRoaXMuZWxlbWVudCxcclxuICAgICAgICAgICAgICAgIG5hbWVTb25nOiBzb25nLm5hbWVTb25nLFxyXG4gICAgICAgICAgICAgICAgYXV0aG9yOiBzb25nLmF1dGhvcixcclxuICAgICAgICAgICAgICAgIHZpZXc6IHNvbmcudmlldyxcclxuICAgICAgICAgICAgICAgIHRpbWU6IHNvbmcudGltZSxcclxuICAgICAgICAgICAgICAgIGltYWdlOiBzb25nLmltYWdlLFxyXG4gICAgICAgICAgICAgICAgbXVzaWM6IHNvbmcubXVzaWMsXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrUGxheTogdGhpcy5vbkNsaWNrQnRuLFxyXG4gICAgICAgICAgICAgICAgYWN0aXZlOiBpbmRleCA9PT0gMCA/IHRydWUgOiBmYWxzZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkU29uZ1RvTGlzdChuZXdTb25nKTtcclxuICAgICAgICAgICAgbmV3U29uZy5yZW5kZXJUb0hvc3RFbGVtZW50KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJDb250ZW50KCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJDdXJyZW50U29uZyh0aGlzLmN1cnJlbnRNdXNpY0luZGV4KTtcclxuICAgICAgICB0aGlzLmNvbmZpZ3VyZSgpO1xyXG4gICAgfVxyXG4gICAgYWRkU29uZ1RvTGlzdChzb25nKSB7XHJcbiAgICAgICAgdGhpcy5saXN0TXVzaWMucHVzaChzb25nKTtcclxuICAgICAgICBzb25nLnJlbmRlclRvSG9zdEVsZW1lbnQoKTtcclxuICAgIH1cclxuICAgIGNvbmZpZ3VyZSgpIHtcclxuICAgICAgICBjb25zdCBwbGF5SWNvbiA9IHRoaXMucGxheWVyTXVzaWMucXVlcnlTZWxlY3RvcignLmZhLXBsYXknKTtcclxuICAgICAgICBjb25zdCBwYXVzZUljb24gPSB0aGlzLnBsYXllck11c2ljLnF1ZXJ5U2VsZWN0b3IoJy5mYS1wYXVzZScpO1xyXG4gICAgICAgIGNvbnN0IG5leHRCdXR0b24gPSB0aGlzLnBsYXllck11c2ljLnF1ZXJ5U2VsZWN0b3IoJy5uZXh0LWJ1dHRvbicpO1xyXG4gICAgICAgIGNvbnN0IHByZXZpb3VzQnV0dG9uID0gdGhpcy5wbGF5ZXJNdXNpYy5xdWVyeVNlbGVjdG9yKCcucHJldmlvdXMtYnV0dG9uJyk7XHJcbiAgICAgICAgdGhpcy5hdWRpby5vbnRpbWV1cGRhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpbWVTdGFydCA9IHRoaXMucGxheWVyTXVzaWMucXVlcnlTZWxlY3RvcignLnByb2dyZXNzLWJveCAudGltZS1zdGFydCcpO1xyXG4gICAgICAgICAgICBjb25zdCB0aW1lRW5kID0gdGhpcy5wbGF5ZXJNdXNpYy5xdWVyeVNlbGVjdG9yKCcucHJvZ3Jlc3MtYm94IC50aW1lLWVuZCcpO1xyXG4gICAgICAgICAgICB0aW1lRW5kLmlubmVySFRNTCA9IGZvcm1hdFRpbWUodGhpcy5hdWRpby5kdXJhdGlvbiB8fCAwKTtcclxuICAgICAgICAgICAgdGltZVN0YXJ0LmlubmVySFRNTCA9IGZvcm1hdFRpbWUodGhpcy5hdWRpby5jdXJyZW50VGltZSk7XHJcbiAgICAgICAgICAgIC8vIMSQ4buCIFRSw4FOSCBWSeG7hkMgTOG6pk4gxJDhuqZVIFRJw4pOIFBMQVkgQVVESU8gRFVSQVRJT04gU+G6vCA9IE5BTiAsIGlzVGltZVVwZGF0ZSA9IHRydWUgbeG7m2kgY2jhuqF5XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmF1ZGlvLmR1cmF0aW9uICYmIHRoaXMuaXNUaW1lVXBkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9ncmVzc1BlcmNlbnQgPSBNYXRoLmZsb29yKCh0aGlzLmF1ZGlvLmN1cnJlbnRUaW1lIC8gdGhpcy5hdWRpby5kdXJhdGlvbikgKiAxMDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0Jhci52YWx1ZSA9IHByb2dyZXNzUGVyY2VudC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0Jhci5zdHlsZS5iYWNrZ3JvdW5kID1cclxuICAgICAgICAgICAgICAgICAgICAnbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAjMmMzZTUwIDAlLCAjMmMzZTUwICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc1BlcmNlbnQgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnJSwgI2Q3ZGNkZiAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NQZXJjZW50ICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJyUsICNkN2RjZGYgMTAwJSknO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnByb2dyZXNzQmFyLm9ucG9pbnRlcmRvd24gPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzVGltZVVwZGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc0Jhci5vbmNoYW5nZSA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIHZhbHVlIOG7nyDEkcOieSBsw6AgJVxyXG4gICAgICAgICAgICBjb25zdCBvbmNoYW5nZVBlcmNlbnQgPSArZS50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgIC8vICB04burICUgdMOtbmggbmfGsOG7o2MgcmEgZ2nDonkgdsOsIGN1cnJlbnRUaW1lIHTDrW5oID0gZ2nDonlcclxuICAgICAgICAgICAgY29uc3Qgb25jaGFuZ2VTZWNvbmQgPSAob25jaGFuZ2VQZXJjZW50ICogdGhpcy5hdWRpby5kdXJhdGlvbikgLyAxMDA7XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW8uY3VycmVudFRpbWUgPSBvbmNoYW5nZVNlY29uZDtcclxuICAgICAgICAgICAgLy8gc2F1IGtoaSBzZXQgdmFsdWUgc2F1IGtoaSDEkeG7lWkgdGjDrCBzZXQgbOG6oWkgaXNUaW1lVXBkYXRlID0gdHJ1ZSDEkeG7gyBpbnB1dCBjaOG6oXkgdGnhur9wIHRoZW8gdGjhu51pIGdpYW4gYsOgaSBow6F0XHJcbiAgICAgICAgICAgIHRoaXMuaXNUaW1lVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuYXVkaW8ub25lbmRlZCA9IHRoaXMubmV4dFNvbmc7XHJcbiAgICAgICAgdGhpcy52b2x1bWVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSArdGhpcy52b2x1bWVFbGVtZW50LnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvLnZvbHVtZSA9IHZhbHVlICogMC4wMTtcclxuICAgICAgICAgICAgdGhpcy52b2x1bWVFbGVtZW50LnN0eWxlLmJhY2tncm91bmQgPVxyXG4gICAgICAgICAgICAgICAgJ2xpbmVhci1ncmFkaWVudCh0byByaWdodCwgIzJjM2U1MCAwJSwgIzJjM2U1MCAnICtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSArXHJcbiAgICAgICAgICAgICAgICAgICAgJyUsICNkN2RjZGYgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgK1xyXG4gICAgICAgICAgICAgICAgICAgICclLCAjZDdkY2RmIDEwMCUpJztcclxuICAgICAgICB9KTtcclxuICAgICAgICBwbGF5SWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5U29uZygpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlckljb24oKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBwYXVzZUljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucGF1c2VTb25nKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVySWNvbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG5leHRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm5leHRTb25nKTtcclxuICAgICAgICBwcmV2aW91c0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucHJldmlvdXNTb25nKTtcclxuICAgIH1cclxuICAgIG5leHRTb25nKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRNdXNpY0luZGV4ID49IHRoaXMubGlzdE11c2ljLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50TXVzaWNJbmRleCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNdXNpY0luZGV4Kys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVuZGVyQ3VycmVudFNvbmcodGhpcy5jdXJyZW50TXVzaWNJbmRleCk7XHJcbiAgICAgICAgdGhpcy5wbGF5U29uZygpO1xyXG4gICAgICAgIHRoaXMucmVuZGVySWNvbigpO1xyXG4gICAgfVxyXG4gICAgcHJldmlvdXNTb25nKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRNdXNpY0luZGV4IDw9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50TXVzaWNJbmRleCA9IHRoaXMubGlzdE11c2ljLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNdXNpY0luZGV4LS07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVuZGVyQ3VycmVudFNvbmcodGhpcy5jdXJyZW50TXVzaWNJbmRleCk7XHJcbiAgICAgICAgdGhpcy5wbGF5U29uZygpO1xyXG4gICAgICAgIHRoaXMucmVuZGVySWNvbigpO1xyXG4gICAgfVxyXG4gICAgcGxheVNvbmcoKSB7XHJcbiAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaXNUaW1lVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmF1ZGlvLnBsYXkoKTtcclxuICAgIH1cclxuICAgIHBhdXNlU29uZygpIHtcclxuICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNUaW1lVXBkYXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hdWRpby5wYXVzZSgpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVySWNvbigpIHtcclxuICAgICAgICBjb25zdCBwbGF5SWNvbiA9IHRoaXMucGxheWVyTXVzaWMucXVlcnlTZWxlY3RvcignLmZhLXBsYXknKTtcclxuICAgICAgICBjb25zdCBwYXVzZUljb24gPSB0aGlzLnBsYXllck11c2ljLnF1ZXJ5U2VsZWN0b3IoJy5mYS1wYXVzZScpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzUGxheWluZykge1xyXG4gICAgICAgICAgICBwbGF5SWNvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICBwYXVzZUljb24uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBwbGF5SWNvbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgcGF1c2VJY29uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25DbGlja0J0bihpZFNvbmcsIGlzQWN0aXZlKSB7XHJcbiAgICAgICAgaWYgKGlzQWN0aXZlICYmIHRoaXMuaXNQbGF5aW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGF1c2VTb25nKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVySWNvbigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGlzQWN0aXZlICYmIHRoaXMuaXNQbGF5aW5nID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlTb25nKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVySWNvbigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlckN1cnJlbnRTb25nKGlkU29uZyk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheVNvbmcoKTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJJY29uKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZW5kZXJDb250ZW50KCkge1xyXG4gICAgICAgIHRoaXMubGlzdE11c2ljLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgICAgICBjb25zdCBwbGF5SWNvbiA9IGl0ZW0ucGxheUJ0bi5xdWVyeVNlbGVjdG9yKCcuZmEtcGxheScpO1xyXG4gICAgICAgICAgICBjb25zdCBwYXVzZUljb24gPSBpdGVtLnBsYXlCdG4ucXVlcnlTZWxlY3RvcignLmZhLXBhdXNlJyk7XHJcbiAgICAgICAgICAgIGl0ZW0uZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgcGxheUljb24uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgICAgIHBhdXNlSWNvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5uYW1lU29uZyA9PT0gKChfYSA9IHRoaXMubGlzdE11c2ljW3RoaXMuY3VycmVudE11c2ljSW5kZXhdKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubmFtZVNvbmcpKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBwbGF5SWNvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgcGF1c2VJY29uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGl0ZW0ucmVuZGVyVG9Ib3N0RWxlbWVudCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuaG9zdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcclxuICAgIH1cclxuICAgIHJlbmRlckN1cnJlbnRTb25nKGlkU29uZykge1xyXG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcclxuICAgICAgICB0aGlzLmN1cnJlbnRNdXNpY0luZGV4ID0gaWRTb25nO1xyXG4gICAgICAgIGNvbnN0IG5ld0xpc3QgPSB0aGlzLmxpc3RNdXNpYy5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5uYW1lU29uZyA9PT0gKChfYSA9IHRoaXMubGlzdE11c2ljW3RoaXMuY3VycmVudE11c2ljSW5kZXhdKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubmFtZVNvbmcpKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubGlzdE11c2ljID0gbmV3TGlzdDtcclxuICAgICAgICB0aGlzLnJlbmRlckNvbnRlbnQoKTtcclxuICAgICAgICBjb25zdCBpbWcgPSB0aGlzLnBsYXllck11c2ljLnF1ZXJ5U2VsZWN0b3IoJy50aXRsZS1ib3ggaW1nJyk7XHJcbiAgICAgICAgY29uc3QgdGl0bGUgPSB0aGlzLnBsYXllck11c2ljLnF1ZXJ5U2VsZWN0b3IoJy50aXRsZS1ib3ggLnBsYXllci10aXRsZScpO1xyXG4gICAgICAgIGNvbnN0IGF1dGhvciA9IHRoaXMucGxheWVyTXVzaWMucXVlcnlTZWxlY3RvcignLnRpdGxlLWJveCAucGxheWVyLXN1YnRpdGxlJyk7XHJcbiAgICAgICAgY29uc3QgaWNvbkJveCA9IHRoaXMucGxheWVyTXVzaWMucXVlcnlTZWxlY3RvcignLmJ1dHRvbi1ib3ggLnBsYXknKTtcclxuICAgICAgICB0aGlzLmF1ZGlvLnNyYyA9IGAuLi9wdWJsaWMvbXVzaWMvJHsoX2EgPSB0aGlzLmxpc3RNdXNpY1t0aGlzLmN1cnJlbnRNdXNpY0luZGV4XSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm11c2ljfWA7XHJcbiAgICAgICAgaW1nLnNyYyA9IGAuLi9wdWJsaWMvaW1hZ2VzLyR7KF9iID0gdGhpcy5saXN0TXVzaWNbdGhpcy5jdXJyZW50TXVzaWNJbmRleF0pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5pbWFnZX1gO1xyXG4gICAgICAgIHRpdGxlLmlubmVyVGV4dCA9IChfYyA9IHRoaXMubGlzdE11c2ljW3RoaXMuY3VycmVudE11c2ljSW5kZXhdKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MubmFtZVNvbmc7XHJcbiAgICAgICAgYXV0aG9yLmlubmVyVGV4dCA9IChfZCA9IHRoaXMubGlzdE11c2ljW3RoaXMuY3VycmVudE11c2ljSW5kZXhdKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QuYXV0aG9yO1xyXG4gICAgfVxyXG59XHJcbl9fZGVjb3JhdGUoW1xyXG4gICAgQXV0b2JpbmRcclxuXSwgTXVzaWNUZW1wbGF0ZS5wcm90b3R5cGUsIFwiY29uZmlndXJlXCIsIG51bGwpO1xyXG5fX2RlY29yYXRlKFtcclxuICAgIEF1dG9iaW5kXHJcbl0sIE11c2ljVGVtcGxhdGUucHJvdG90eXBlLCBcIm5leHRTb25nXCIsIG51bGwpO1xyXG5fX2RlY29yYXRlKFtcclxuICAgIEF1dG9iaW5kXHJcbl0sIE11c2ljVGVtcGxhdGUucHJvdG90eXBlLCBcInByZXZpb3VzU29uZ1wiLCBudWxsKTtcclxuX19kZWNvcmF0ZShbXHJcbiAgICBBdXRvYmluZFxyXG5dLCBNdXNpY1RlbXBsYXRlLnByb3RvdHlwZSwgXCJwbGF5U29uZ1wiLCBudWxsKTtcclxuX19kZWNvcmF0ZShbXHJcbiAgICBBdXRvYmluZFxyXG5dLCBNdXNpY1RlbXBsYXRlLnByb3RvdHlwZSwgXCJwYXVzZVNvbmdcIiwgbnVsbCk7XHJcbl9fZGVjb3JhdGUoW1xyXG4gICAgQXV0b2JpbmRcclxuXSwgTXVzaWNUZW1wbGF0ZS5wcm90b3R5cGUsIFwib25DbGlja0J0blwiLCBudWxsKTtcclxuX19kZWNvcmF0ZShbXHJcbiAgICBBdXRvYmluZFxyXG5dLCBNdXNpY1RlbXBsYXRlLnByb3RvdHlwZSwgXCJyZW5kZXJDdXJyZW50U29uZ1wiLCBudWxsKTtcclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXV0b2JpbmQodGFyZ2V0LCBwcm9wZXJ0eU5hbWUsIGRlc2NyaXB0b3IpIHtcclxuICAgIC8vIE1ldGhvZCBn4buRY1xyXG4gICAgY29uc3Qgb3JpZ2luYWxNZXRob2QgPSBkZXNjcmlwdG9yLnZhbHVlO1xyXG4gICAgY29uc3QgbmV3RGVzY3JpcHRvciA9IHtcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgLy8gVGhheSB2w6wgZMO5bmcgdmFsdWUgdHJvbmcgZGVzY3JpcHRvciB0aMOsIGTDuW5nIGjDoG0gZ2V0dGVyLCBow6BtIGdldHRlciByZXR1cm4gduG7gSBjw6FpIGfDrCB0aMOsIGdpw6EgdHLhu4tcclxuICAgICAgICAvLyBraGkgdHJ1eSBj4bqtcCB2w6BvIHByb3BlcnR5ICjhu58gxJHDonkgbMOgIGjDoG0gc2hvd01lc3NhZ2UgY+G7p2Egb2JqIHThuqFvIHThu6sgY2xhc3MgUHJpbnRlcikgc+G6vSBsw6AgY8OhaSDEkcOzXHJcbiAgICAgICAgLy8gSMOgbSBnZXR0ZXIgc+G6vSBuaOG6rW4gdGhpcyBsw6AgxJHhu5FpIHTGsOG7o25nIGfhu41pIMSR4bq/biBuw7MgKOG7nyDEkcOieSBz4bq9IGzDoCBt4buZdCBvYmogxJHGsOG7o2MgdOG6oW8gdOG7qyBjbGFzcyBQcmludGVyKVxyXG4gICAgICAgIC8vIG7Dqm4gY8OzIHRo4buDIGJpbmQgdGhpcyBjaG8gbWV0aG9kIGfhu5FjXHJcbiAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgICBjb25zdCBib3VuZWRGdW5jdGlvbiA9IG9yaWdpbmFsTWV0aG9kLmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBib3VuZWRGdW5jdGlvbjtcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuICAgIHJldHVybiBuZXdEZXNjcmlwdG9yO1xyXG59XHJcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldEFsbFNvbmcgPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAzMC9zb25ncycpO1xyXG4gICAgY29uc3QgZGF0YSA9IHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcclxuICAgIHJldHVybiBkYXRhLmRhdGE7XHJcbn0pO1xyXG5leHBvcnQgY29uc3QgZ2V0QWxsU2hvd1NvbmcgPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAzMC9zb25ncy9zaG93Jyk7XHJcbiAgICBjb25zdCBkYXRhID0geWllbGQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgcmV0dXJuIGRhdGEuZGF0YTtcclxufSk7XHJcbmV4cG9ydCBjb25zdCBnZXRBbGxNeVNvbmcgPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgIGxldCBvcHRpb25zID0ge307XHJcbiAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSkge1xyXG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpLCB7IGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpfWAsXHJcbiAgICAgICAgICAgIH0gfSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjMwMzAvc29uZ3MvbXlzb25nYCwgb3B0aW9ucyk7XHJcbiAgICBjb25zdCBkYXRhID0geWllbGQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgcmV0dXJuIGRhdGEuZGF0YTtcclxufSk7XHJcbmV4cG9ydCBjb25zdCBnZXRTb25nQnlJZCA9IChpZFNvbmcpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDozMDMwL3NvbmdzLyR7aWRTb25nfWApO1xyXG4gICAgY29uc3QgZGF0YSA9IHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcclxuICAgIHJldHVybiBkYXRhLmRhdGE7XHJcbn0pO1xyXG5leHBvcnQgY29uc3QgZ2V0TXlJbmZvID0gKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICBsZXQgb3B0aW9ucyA9IHt9O1xyXG4gICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykpIHtcclxuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKSwgeyBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7c2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKX1gLFxyXG4gICAgICAgICAgICB9IH0pO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDozMDMwL3VzZXIvbXlJbmZvYCwgb3B0aW9ucyk7XHJcbiAgICBjb25zdCBkYXRhID0geWllbGQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgcmV0dXJuIGRhdGEuZGF0YTtcclxufSk7XHJcbiIsImV4cG9ydCBjb25zdCBmb3JtYXRUaW1lID0gKHRpbWUpID0+IHtcclxuICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKHRpbWUgLyA2MCk7XHJcbiAgICBjb25zdCBzZWNvbmQgPSBNYXRoLmZsb29yKHRpbWUgLSBtaW51dGVzICogNjApO1xyXG4gICAgcmV0dXJuIGAke21pbnV0ZXMgPCAxMCA/ICcwJyA6ICcnfSR7bWludXRlc306JHtzZWNvbmQgPCAxMCA/ICcwJyA6ICcnfSR7c2Vjb25kfWA7XHJcbn07XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5pbXBvcnQgTXVzaWNUZW1wbGF0ZSBmcm9tICcuL2NvbXBvbmVudHMvbXVzaWNUZW1wbGF0ZSc7XHJcbmltcG9ydCB7IGdldEFsbFNob3dTb25nIH0gZnJvbSAnLi9zZXJ2aWNlcy9hcGknO1xyXG5jb25zdCBmZXRjaCA9ICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBsaXN0U29uZyA9IHlpZWxkIGdldEFsbFNob3dTb25nKCk7XHJcbiAgICAgICAgY29uc3QgTXVzaWNUZW1wbGF0ZTIgPSBuZXcgTXVzaWNUZW1wbGF0ZSgnY29udGVudC1tYWluLWJvZHknLCAnY29udGVudC1tYWluJywgbGlzdFNvbmcpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICB9XHJcbn0pO1xyXG5mZXRjaCgpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=