/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/sidebar.ts":
/*!***********************************!*\
  !*** ./src/components/sidebar.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Sidebar": () => (/* binding */ Sidebar)
/* harmony export */ });
class Sidebar {
    constructor(user) {
        this.sidebarHead = document.querySelector('.sidebar-head');
        this.sidebarMenu = document.querySelector('.sidebar-menu');
        this.sidebarFoot = document.querySelector('.sidebar-foot');
        this.user = user;
        this.renderContent();
        this.config();
    }
    config() {
        const quitBtn = document.querySelector('.quit-btn');
        console.log(quitBtn);
        quitBtn === null || quitBtn === void 0 ? void 0 : quitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('token');
            window.location.href = '/Client/src/views/index.html';
        });
    }
    renderContent() {
        var _a;
        if (this === null || this === void 0 ? void 0 : this.user) {
            if (((_a = this === null || this === void 0 ? void 0 : this.user) === null || _a === void 0 ? void 0 : _a.role) === 'admin') {
                this.sidebarMenu.innerHTML = `
                <a href="./index.html" class="sidebar-menu-item">
                    <span><i class="fa-solid fa-house"></i></span>
                    Trang chủ
                </a>
                <a href="./manageAdmin.html" class="sidebar-menu-item">
                    <span><i class="fa-solid fa-book"></i></span>
                    Quản trị Admin
                </a>
                <a href="./add.html" class="sidebar-menu-item">
                    <span><i class="fa-solid fa-arrow-trend-up"></i></span>
                    Thêm bài hát
                </a>`;
            }
            else {
                this.sidebarMenu.innerHTML = `
                <a href="./index.html" class="sidebar-menu-item">
                    <span><i class="fa-solid fa-house"></i></span>
                    Trang chủ
                </a>
                <a href="./manageUser.html" class="sidebar-menu-item">
                    <span><i class="fa-solid fa-book"></i></span>
                    Quản lý bài hát của tôi
                </a>
                <a href="./add.html" class="sidebar-menu-item">
                    <span><i class="fa-solid fa-arrow-trend-up"></i></span>
                    Thêm bài hát
                </a>`;
            }
            this.sidebarFoot.innerHTML = `
            <a href="#" class="sidebar-menu-item  quit-btn">
                <span><i class="fa-solid fa-right-from-bracket"></i></span>
                Đăng xuất
            </a>`;
        }
        else {
            this.sidebarMenu.innerHTML = `
            <a href="./index.html" class="sidebar-menu-item">
                <span><i class="fa-solid fa-house"></i></span>
                Trang chủ
            </a>
            `;
            this.sidebarFoot.innerHTML = `
            <a href="/Client/src/views/login.html" class="sidebar-menu-item">
                <span><i class="fa-solid fa-right-from-bracket"></i></span>
                Đăng nhập
            </a>
            <a href="/Client/src/views/register.html" class="sidebar-menu-item">
                <span><i class="fa-solid fa-right-from-bracket"></i></span>
                Đăng ký
            </a>
            `;
        }
    }
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
/*!************************!*\
  !*** ./src/sidebar.ts ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_sidebar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/sidebar */ "./src/components/sidebar.ts");
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
        const currentUser = yield (0,_services_api__WEBPACK_IMPORTED_MODULE_1__.getMyInfo)();
        if (currentUser) {
            const sideBar = new _components_sidebar__WEBPACK_IMPORTED_MODULE_0__.Sidebar(currentUser);
            return;
        }
        const sideBar = new _components_sidebar__WEBPACK_IMPORTED_MODULE_0__.Sidebar();
    }
    catch (err) {
        console.log(err);
    }
});
fetch();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVFQSxpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0IsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDTTtBQUNQO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDTTtBQUNQO0FBQ0E7QUFDQSxnREFBZ0QsY0FBYztBQUM5RCx5Q0FBeUMsZ0NBQWdDO0FBQ3pFLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDTTtBQUNQLGdFQUFnRSxPQUFPO0FBQ3ZFO0FBQ0E7QUFDQSxDQUFDO0FBQ007QUFDUDtBQUNBO0FBQ0EsZ0RBQWdELGNBQWM7QUFDOUQseUNBQXlDLGdDQUFnQztBQUN6RSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7O1VDN0NEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTkEsaUJBQWlCLFNBQUksSUFBSSxTQUFJO0FBQzdCLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQytDO0FBQ0o7QUFDM0M7QUFDQTtBQUNBLGtDQUFrQyx3REFBUztBQUMzQztBQUNBLGdDQUFnQyx3REFBTztBQUN2QztBQUNBO0FBQ0EsNEJBQTRCLHdEQUFPO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbGFiLTEvLi9zcmMvY29tcG9uZW50cy9zaWRlYmFyLnRzIiwid2VicGFjazovL2xhYi0xLy4vc3JjL3NlcnZpY2VzL2FwaS50cyIsIndlYnBhY2s6Ly9sYWItMS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9sYWItMS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbGFiLTEvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sYWItMS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2xhYi0xLy4vc3JjL3NpZGViYXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFNpZGViYXIge1xyXG4gICAgY29uc3RydWN0b3IodXNlcikge1xyXG4gICAgICAgIHRoaXMuc2lkZWJhckhlYWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhci1oZWFkJyk7XHJcbiAgICAgICAgdGhpcy5zaWRlYmFyTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyLW1lbnUnKTtcclxuICAgICAgICB0aGlzLnNpZGViYXJGb290ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXItZm9vdCcpO1xyXG4gICAgICAgIHRoaXMudXNlciA9IHVzZXI7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJDb250ZW50KCk7XHJcbiAgICAgICAgdGhpcy5jb25maWcoKTtcclxuICAgIH1cclxuICAgIGNvbmZpZygpIHtcclxuICAgICAgICBjb25zdCBxdWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnF1aXQtYnRuJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocXVpdEJ0bik7XHJcbiAgICAgICAgcXVpdEJ0biA9PT0gbnVsbCB8fCBxdWl0QnRuID09PSB2b2lkIDAgPyB2b2lkIDAgOiBxdWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKCd0b2tlbicpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvQ2xpZW50L3NyYy92aWV3cy9pbmRleC5odG1sJztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJlbmRlckNvbnRlbnQoKSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIGlmICh0aGlzID09PSBudWxsIHx8IHRoaXMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHRoaXMudXNlcikge1xyXG4gICAgICAgICAgICBpZiAoKChfYSA9IHRoaXMgPT09IG51bGwgfHwgdGhpcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdGhpcy51c2VyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eucm9sZSkgPT09ICdhZG1pbicpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2lkZWJhck1lbnUuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIi4vaW5kZXguaHRtbFwiIGNsYXNzPVwic2lkZWJhci1tZW51LWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj48aSBjbGFzcz1cImZhLXNvbGlkIGZhLWhvdXNlXCI+PC9pPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICBUcmFuZyBjaOG7p1xyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIi4vbWFuYWdlQWRtaW4uaHRtbFwiIGNsYXNzPVwic2lkZWJhci1tZW51LWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj48aSBjbGFzcz1cImZhLXNvbGlkIGZhLWJvb2tcIj48L2k+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIFF14bqjbiB0cuG7iyBBZG1pblxyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIi4vYWRkLmh0bWxcIiBjbGFzcz1cInNpZGViYXItbWVudS1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+PGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1hcnJvdy10cmVuZC11cFwiPjwvaT48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgVGjDqm0gYsOgaSBow6F0XHJcbiAgICAgICAgICAgICAgICA8L2E+YDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2lkZWJhck1lbnUuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIi4vaW5kZXguaHRtbFwiIGNsYXNzPVwic2lkZWJhci1tZW51LWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj48aSBjbGFzcz1cImZhLXNvbGlkIGZhLWhvdXNlXCI+PC9pPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICBUcmFuZyBjaOG7p1xyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIi4vbWFuYWdlVXNlci5odG1sXCIgY2xhc3M9XCJzaWRlYmFyLW1lbnUtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtYm9va1wiPjwvaT48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgUXXhuqNuIGzDvSBiw6BpIGjDoXQgY+G7p2EgdMO0aVxyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIi4vYWRkLmh0bWxcIiBjbGFzcz1cInNpZGViYXItbWVudS1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+PGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1hcnJvdy10cmVuZC11cFwiPjwvaT48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgVGjDqm0gYsOgaSBow6F0XHJcbiAgICAgICAgICAgICAgICA8L2E+YDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNpZGViYXJGb290LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cInNpZGViYXItbWVudS1pdGVtICBxdWl0LWJ0blwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4+PGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1yaWdodC1mcm9tLWJyYWNrZXRcIj48L2k+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgxJDEg25nIHh14bqldFxyXG4gICAgICAgICAgICA8L2E+YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2lkZWJhck1lbnUuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8YSBocmVmPVwiLi9pbmRleC5odG1sXCIgY2xhc3M9XCJzaWRlYmFyLW1lbnUtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4+PGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1ob3VzZVwiPjwvaT48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICBUcmFuZyBjaOG7p1xyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgIHRoaXMuc2lkZWJhckZvb3QuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8YSBocmVmPVwiL0NsaWVudC9zcmMvdmlld3MvbG9naW4uaHRtbFwiIGNsYXNzPVwic2lkZWJhci1tZW51LWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtcmlnaHQtZnJvbS1icmFja2V0XCI+PC9pPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIMSQxINuZyBuaOG6rXBcclxuICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICA8YSBocmVmPVwiL0NsaWVudC9zcmMvdmlld3MvcmVnaXN0ZXIuaHRtbFwiIGNsYXNzPVwic2lkZWJhci1tZW51LWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtcmlnaHQtZnJvbS1icmFja2V0XCI+PC9pPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIMSQxINuZyBrw71cclxuICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRBbGxTb25nID0gKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKCdodHRwOi8vbG9jYWxob3N0OjMwMzAvc29uZ3MnKTtcclxuICAgIGNvbnN0IGRhdGEgPSB5aWVsZCByZXNwb25zZS5qc29uKCk7XHJcbiAgICByZXR1cm4gZGF0YS5kYXRhO1xyXG59KTtcclxuZXhwb3J0IGNvbnN0IGdldEFsbFNob3dTb25nID0gKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKCdodHRwOi8vbG9jYWxob3N0OjMwMzAvc29uZ3Mvc2hvdycpO1xyXG4gICAgY29uc3QgZGF0YSA9IHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcclxuICAgIHJldHVybiBkYXRhLmRhdGE7XHJcbn0pO1xyXG5leHBvcnQgY29uc3QgZ2V0QWxsTXlTb25nID0gKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICBsZXQgb3B0aW9ucyA9IHt9O1xyXG4gICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykpIHtcclxuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKSwgeyBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7c2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKX1gLFxyXG4gICAgICAgICAgICB9IH0pO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDozMDMwL3NvbmdzL215c29uZ2AsIG9wdGlvbnMpO1xyXG4gICAgY29uc3QgZGF0YSA9IHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcclxuICAgIHJldHVybiBkYXRhLmRhdGE7XHJcbn0pO1xyXG5leHBvcnQgY29uc3QgZ2V0U29uZ0J5SWQgPSAoaWRTb25nKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6MzAzMC9zb25ncy8ke2lkU29uZ31gKTtcclxuICAgIGNvbnN0IGRhdGEgPSB5aWVsZCByZXNwb25zZS5qc29uKCk7XHJcbiAgICByZXR1cm4gZGF0YS5kYXRhO1xyXG59KTtcclxuZXhwb3J0IGNvbnN0IGdldE15SW5mbyA9ICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgbGV0IG9wdGlvbnMgPSB7fTtcclxuICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpKSB7XHJcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyksIHsgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Nlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJyl9YCxcclxuICAgICAgICAgICAgfSB9KTtcclxuICAgIH1cclxuICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6MzAzMC91c2VyL215SW5mb2AsIG9wdGlvbnMpO1xyXG4gICAgY29uc3QgZGF0YSA9IHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcclxuICAgIHJldHVybiBkYXRhLmRhdGE7XHJcbn0pO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuaW1wb3J0IHsgU2lkZWJhciB9IGZyb20gXCIuL2NvbXBvbmVudHMvc2lkZWJhclwiO1xyXG5pbXBvcnQgeyBnZXRNeUluZm8gfSBmcm9tIFwiLi9zZXJ2aWNlcy9hcGlcIjtcclxuY29uc3QgZmV0Y2ggPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgY3VycmVudFVzZXIgPSB5aWVsZCBnZXRNeUluZm8oKTtcclxuICAgICAgICBpZiAoY3VycmVudFVzZXIpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2lkZUJhciA9IG5ldyBTaWRlYmFyKGN1cnJlbnRVc2VyKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzaWRlQmFyID0gbmV3IFNpZGViYXIoKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgfVxyXG59KTtcclxuZmV0Y2goKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9