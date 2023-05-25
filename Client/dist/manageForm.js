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

/***/ "./src/components/manage-form.ts":
/*!***************************************!*\
  !*** ./src/components/manage-form.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ManageForm": () => (/* binding */ ManageForm)
/* harmony export */ });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component */ "./src/components/component.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class ManageForm extends _component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(data) {
        super('content-main-body', 'content-main');
        this.renderContent(data);
        this.configure();
        this.hostElement.appendChild(this.element);
    }
    configure() {
        const listUpdateShowBtn = this.element.querySelectorAll('.updateShow');
        const listDeleteBtn = this.element.querySelectorAll('.delete-btn');
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
            console.log('updateshow');
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
/*!****************************!*\
  !*** ./src/manage-form.ts ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_manage_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/manage-form */ "./src/components/manage-form.ts");
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
        const listSong = yield (0,_services_api__WEBPACK_IMPORTED_MODULE_1__.getAllSong)();
        const manageForm = new _components_manage_form__WEBPACK_IMPORTED_MODULE_0__.ManageForm(listSong);
    }
    catch (err) {
        console.log(err);
    }
});
fetch();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDc0Q7QUFDVjtBQUM1QztBQUNBO0FBQ0EsK0JBQStCLHlEQUFVO0FBQ3pDLCtCQUErQiwrREFBVTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCIsInNvdXJjZXMiOlsid2VicGFjazovL2xhYi0xLy4vc3JjL2NvbXBvbmVudHMvY29tcG9uZW50LnRzIiwid2VicGFjazovL2xhYi0xLy4vc3JjL2NvbXBvbmVudHMvbWFuYWdlLWZvcm0udHMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9zcmMvc2VydmljZXMvYXBpLnRzIiwid2VicGFjazovL2xhYi0xL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2xhYi0xL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9sYWItMS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2xhYi0xL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9zcmMvbWFuYWdlLWZvcm0udHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRDbGFzcywgaG9zdEVsZW1lbnRDbGFzcykge1xyXG4gICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGJveC5jbGFzc05hbWUgPSBlbGVtZW50Q2xhc3M7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gYm94O1xyXG4gICAgICAgIGlmICh0eXBlb2YgaG9zdEVsZW1lbnRDbGFzcyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdGhpcy5ob3N0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2hvc3RFbGVtZW50Q2xhc3N9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGhvc3RFbGVtZW50Q2xhc3MgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmhvc3RFbGVtZW50ID0gaG9zdEVsZW1lbnRDbGFzcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5pbXBvcnQgQ29tcG9uZW50IGZyb20gJy4vY29tcG9uZW50JztcclxuZXhwb3J0IGNsYXNzIE1hbmFnZUZvcm0gZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgICAgIHN1cGVyKCdjb250ZW50LW1haW4tYm9keScsICdjb250ZW50LW1haW4nKTtcclxuICAgICAgICB0aGlzLnJlbmRlckNvbnRlbnQoZGF0YSk7XHJcbiAgICAgICAgdGhpcy5jb25maWd1cmUoKTtcclxuICAgICAgICB0aGlzLmhvc3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCk7XHJcbiAgICB9XHJcbiAgICBjb25maWd1cmUoKSB7XHJcbiAgICAgICAgY29uc3QgbGlzdFVwZGF0ZVNob3dCdG4gPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVwZGF0ZVNob3cnKTtcclxuICAgICAgICBjb25zdCBsaXN0RGVsZXRlQnRuID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kZWxldGUtYnRuJyk7XHJcbiAgICAgICAgbGlzdERlbGV0ZUJ0bi5mb3JFYWNoKGJ0biA9PiBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBidG5FbGVtZW50ID0gKGUudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlkU29uZyA9IGJ0bkVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNvbmZpcm0oXCJC4bqhbiBjw7MgY2jhuq9jIGNo4bqvbiBtdeG7kW4geMOzYSBiw6BpIGjDoXQgbsOgeSA/XCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpLCB7IGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjMwMzAvc29uZ3MvJHtpZFNvbmd9YCwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB5aWVsZCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLm9rIHx8IHJlc3VsdC5zdGF0dXMgPT09ICdmYWlsZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFsZXJ0KHJlc3VsdC5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiWMOzYSB0aMOgbmggY8O0bmdcIik7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvQ2xpZW50L3NyYy92aWV3cy9pbmRleC5odG1sJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkpKTtcclxuICAgICAgICBsaXN0VXBkYXRlU2hvd0J0bi5mb3JFYWNoKGJ0biA9PiBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1cGRhdGVzaG93Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ0biA9IGUudGFyZ2V0O1xyXG4gICAgICAgICAgICBjb25zdCBpZCA9IGJ0bi5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKTtcclxuICAgICAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQQVRDSCcsXHJcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHNob3c6IHRydWUgfSksXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykpIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpLCB7IGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgfSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjMwMzAvc29uZ3MvdXBkYXRlc2hvdy8ke2lkfWAsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB5aWVsZCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2sgfHwgcmVzdWx0LnN0YXR1cyA9PT0gJ2ZhaWxlZCcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhbGVydChyZXN1bHQubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL0NsaWVudC9zcmMvdmlld3MvaW5kZXguaHRtbCc7XHJcbiAgICAgICAgfSkpKTtcclxuICAgIH1cclxuICAgIHJlbmRlckNvbnRlbnQoZGF0YSkge1xyXG4gICAgICAgIGNvbnN0IGh0bWwgPSBkYXRhXHJcbiAgICAgICAgICAgIC5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiaXRlbS1ib3hcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbWFnZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi4vcHVibGljL2ltYWdlcy8ke2l0ZW0uaW1hZ2V9XCIgYWx0PVwiXCI+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJpbmZvLXRpdGxlXCI+JHtpdGVtLm5hbWVTb25nfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInN1YnRpdGxlXCI+JHtpdGVtLmF1dGhvcn08L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxcIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiYnV0dG9uXCI+PGEgaHJlZj1cIi4vZWRpdC5odG1sP2lkPSR7aXRlbS5faWR9XCIgY2xhc3M9XCJjaGFuZ2UtYnRuXCI+PGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1wZW4tdG8tc3F1YXJlXCI+PC9pPjwvYT48L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlsXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImJ1dHRvbiBkZWxldGUtYnRuXCIgPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtdHJhc2gtY2FuXCIgZGF0YS1pZD0ke2l0ZW0uX2lkfT48L2k+PC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxcIj5cclxuICAgICAgICAgICAgICAgIDxwPiR7aXRlbS5zaG93ID8gXCLEkGFuZyDEkcaw4bujYyBoaeG7g24gdGjhu4tcIiA6IGA8YnV0dG9uIGNsYXNzPSd1cGRhdGVTaG93JyBkYXRhLWlkPSR7aXRlbS5faWR9PiBEdXnhu4d0IGLDoGkgaMOhdCA8L2J1dHRvbj5gfTwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+YDtcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAuam9pbignICcpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5pbm5lckhUTUwgPSBodG1sO1xyXG4gICAgfVxyXG59XHJcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldEFsbFNvbmcgPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAzMC9zb25ncycpO1xyXG4gICAgY29uc3QgZGF0YSA9IHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcclxuICAgIHJldHVybiBkYXRhLmRhdGE7XHJcbn0pO1xyXG5leHBvcnQgY29uc3QgZ2V0QWxsU2hvd1NvbmcgPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAzMC9zb25ncy9zaG93Jyk7XHJcbiAgICBjb25zdCBkYXRhID0geWllbGQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgcmV0dXJuIGRhdGEuZGF0YTtcclxufSk7XHJcbmV4cG9ydCBjb25zdCBnZXRBbGxNeVNvbmcgPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgIGxldCBvcHRpb25zID0ge307XHJcbiAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSkge1xyXG4gICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpLCB7IGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpfWAsXHJcbiAgICAgICAgICAgIH0gfSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjMwMzAvc29uZ3MvbXlzb25nYCwgb3B0aW9ucyk7XHJcbiAgICBjb25zdCBkYXRhID0geWllbGQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgcmV0dXJuIGRhdGEuZGF0YTtcclxufSk7XHJcbmV4cG9ydCBjb25zdCBnZXRTb25nQnlJZCA9IChpZFNvbmcpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDozMDMwL3NvbmdzLyR7aWRTb25nfWApO1xyXG4gICAgY29uc3QgZGF0YSA9IHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcclxuICAgIHJldHVybiBkYXRhLmRhdGE7XHJcbn0pO1xyXG5leHBvcnQgY29uc3QgZ2V0TXlJbmZvID0gKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICBsZXQgb3B0aW9ucyA9IHt9O1xyXG4gICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykpIHtcclxuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKSwgeyBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7c2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKX1gLFxyXG4gICAgICAgICAgICB9IH0pO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDozMDMwL3VzZXIvbXlJbmZvYCwgb3B0aW9ucyk7XHJcbiAgICBjb25zdCBkYXRhID0geWllbGQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgcmV0dXJuIGRhdGEuZGF0YTtcclxufSk7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5pbXBvcnQgeyBNYW5hZ2VGb3JtIH0gZnJvbSAnLi9jb21wb25lbnRzL21hbmFnZS1mb3JtJztcclxuaW1wb3J0IHsgZ2V0QWxsU29uZyB9IGZyb20gJy4vc2VydmljZXMvYXBpJztcclxuY29uc3QgZmV0Y2ggPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgbGlzdFNvbmcgPSB5aWVsZCBnZXRBbGxTb25nKCk7XHJcbiAgICAgICAgY29uc3QgbWFuYWdlRm9ybSA9IG5ldyBNYW5hZ2VGb3JtKGxpc3RTb25nKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgfVxyXG59KTtcclxuZmV0Y2goKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9