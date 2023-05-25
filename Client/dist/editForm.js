/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/edit-form.ts":
/*!*************************************!*\
  !*** ./src/components/edit-form.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EditForm)
/* harmony export */ });
/* harmony import */ var validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! validator */ "./node_modules/validator/index.js");
/* harmony import */ var validator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(validator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _services_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/api */ "./src/services/api.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class EditForm {
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
            const response = (0,_services_api__WEBPACK_IMPORTED_MODULE_0__.getSongById)(this.idSong);
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
                if (!validator__WEBPACK_IMPORTED_MODULE_1___default().isLength(nameSong, { min: 1, max: 50 })) {
                    return alert('Tên bài hát phải có từ 1-50 kí tự');
                }
                if (!validator__WEBPACK_IMPORTED_MODULE_1___default().isLength(author, { min: 1, max: 30 })) {
                    return alert('Tên tác giả phải có từ 1-30 kí tự');
                }
                if (!validator__WEBPACK_IMPORTED_MODULE_1___default().isInt(view, { min: 0 })) {
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

/***/ "./node_modules/validator/index.js":
/*!*****************************************!*\
  !*** ./node_modules/validator/index.js ***!
  \*****************************************/
/***/ ((module, exports, __webpack_require__) => {



function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _toDate = _interopRequireDefault(__webpack_require__(/*! ./lib/toDate */ "./node_modules/validator/lib/toDate.js"));

var _toFloat = _interopRequireDefault(__webpack_require__(/*! ./lib/toFloat */ "./node_modules/validator/lib/toFloat.js"));

var _toInt = _interopRequireDefault(__webpack_require__(/*! ./lib/toInt */ "./node_modules/validator/lib/toInt.js"));

var _toBoolean = _interopRequireDefault(__webpack_require__(/*! ./lib/toBoolean */ "./node_modules/validator/lib/toBoolean.js"));

var _equals = _interopRequireDefault(__webpack_require__(/*! ./lib/equals */ "./node_modules/validator/lib/equals.js"));

var _contains = _interopRequireDefault(__webpack_require__(/*! ./lib/contains */ "./node_modules/validator/lib/contains.js"));

var _matches = _interopRequireDefault(__webpack_require__(/*! ./lib/matches */ "./node_modules/validator/lib/matches.js"));

var _isEmail = _interopRequireDefault(__webpack_require__(/*! ./lib/isEmail */ "./node_modules/validator/lib/isEmail.js"));

var _isURL = _interopRequireDefault(__webpack_require__(/*! ./lib/isURL */ "./node_modules/validator/lib/isURL.js"));

var _isMACAddress = _interopRequireDefault(__webpack_require__(/*! ./lib/isMACAddress */ "./node_modules/validator/lib/isMACAddress.js"));

var _isIP = _interopRequireDefault(__webpack_require__(/*! ./lib/isIP */ "./node_modules/validator/lib/isIP.js"));

var _isIPRange = _interopRequireDefault(__webpack_require__(/*! ./lib/isIPRange */ "./node_modules/validator/lib/isIPRange.js"));

var _isFQDN = _interopRequireDefault(__webpack_require__(/*! ./lib/isFQDN */ "./node_modules/validator/lib/isFQDN.js"));

var _isDate = _interopRequireDefault(__webpack_require__(/*! ./lib/isDate */ "./node_modules/validator/lib/isDate.js"));

var _isTime = _interopRequireDefault(__webpack_require__(/*! ./lib/isTime */ "./node_modules/validator/lib/isTime.js"));

var _isBoolean = _interopRequireDefault(__webpack_require__(/*! ./lib/isBoolean */ "./node_modules/validator/lib/isBoolean.js"));

var _isLocale = _interopRequireDefault(__webpack_require__(/*! ./lib/isLocale */ "./node_modules/validator/lib/isLocale.js"));

var _isAlpha = _interopRequireWildcard(__webpack_require__(/*! ./lib/isAlpha */ "./node_modules/validator/lib/isAlpha.js"));

var _isAlphanumeric = _interopRequireWildcard(__webpack_require__(/*! ./lib/isAlphanumeric */ "./node_modules/validator/lib/isAlphanumeric.js"));

var _isNumeric = _interopRequireDefault(__webpack_require__(/*! ./lib/isNumeric */ "./node_modules/validator/lib/isNumeric.js"));

var _isPassportNumber = _interopRequireDefault(__webpack_require__(/*! ./lib/isPassportNumber */ "./node_modules/validator/lib/isPassportNumber.js"));

var _isPort = _interopRequireDefault(__webpack_require__(/*! ./lib/isPort */ "./node_modules/validator/lib/isPort.js"));

var _isLowercase = _interopRequireDefault(__webpack_require__(/*! ./lib/isLowercase */ "./node_modules/validator/lib/isLowercase.js"));

var _isUppercase = _interopRequireDefault(__webpack_require__(/*! ./lib/isUppercase */ "./node_modules/validator/lib/isUppercase.js"));

var _isIMEI = _interopRequireDefault(__webpack_require__(/*! ./lib/isIMEI */ "./node_modules/validator/lib/isIMEI.js"));

var _isAscii = _interopRequireDefault(__webpack_require__(/*! ./lib/isAscii */ "./node_modules/validator/lib/isAscii.js"));

var _isFullWidth = _interopRequireDefault(__webpack_require__(/*! ./lib/isFullWidth */ "./node_modules/validator/lib/isFullWidth.js"));

var _isHalfWidth = _interopRequireDefault(__webpack_require__(/*! ./lib/isHalfWidth */ "./node_modules/validator/lib/isHalfWidth.js"));

var _isVariableWidth = _interopRequireDefault(__webpack_require__(/*! ./lib/isVariableWidth */ "./node_modules/validator/lib/isVariableWidth.js"));

var _isMultibyte = _interopRequireDefault(__webpack_require__(/*! ./lib/isMultibyte */ "./node_modules/validator/lib/isMultibyte.js"));

var _isSemVer = _interopRequireDefault(__webpack_require__(/*! ./lib/isSemVer */ "./node_modules/validator/lib/isSemVer.js"));

var _isSurrogatePair = _interopRequireDefault(__webpack_require__(/*! ./lib/isSurrogatePair */ "./node_modules/validator/lib/isSurrogatePair.js"));

var _isInt = _interopRequireDefault(__webpack_require__(/*! ./lib/isInt */ "./node_modules/validator/lib/isInt.js"));

var _isFloat = _interopRequireWildcard(__webpack_require__(/*! ./lib/isFloat */ "./node_modules/validator/lib/isFloat.js"));

var _isDecimal = _interopRequireDefault(__webpack_require__(/*! ./lib/isDecimal */ "./node_modules/validator/lib/isDecimal.js"));

var _isHexadecimal = _interopRequireDefault(__webpack_require__(/*! ./lib/isHexadecimal */ "./node_modules/validator/lib/isHexadecimal.js"));

var _isOctal = _interopRequireDefault(__webpack_require__(/*! ./lib/isOctal */ "./node_modules/validator/lib/isOctal.js"));

var _isDivisibleBy = _interopRequireDefault(__webpack_require__(/*! ./lib/isDivisibleBy */ "./node_modules/validator/lib/isDivisibleBy.js"));

var _isHexColor = _interopRequireDefault(__webpack_require__(/*! ./lib/isHexColor */ "./node_modules/validator/lib/isHexColor.js"));

var _isRgbColor = _interopRequireDefault(__webpack_require__(/*! ./lib/isRgbColor */ "./node_modules/validator/lib/isRgbColor.js"));

var _isHSL = _interopRequireDefault(__webpack_require__(/*! ./lib/isHSL */ "./node_modules/validator/lib/isHSL.js"));

var _isISRC = _interopRequireDefault(__webpack_require__(/*! ./lib/isISRC */ "./node_modules/validator/lib/isISRC.js"));

var _isIBAN = _interopRequireWildcard(__webpack_require__(/*! ./lib/isIBAN */ "./node_modules/validator/lib/isIBAN.js"));

var _isBIC = _interopRequireDefault(__webpack_require__(/*! ./lib/isBIC */ "./node_modules/validator/lib/isBIC.js"));

var _isMD = _interopRequireDefault(__webpack_require__(/*! ./lib/isMD5 */ "./node_modules/validator/lib/isMD5.js"));

var _isHash = _interopRequireDefault(__webpack_require__(/*! ./lib/isHash */ "./node_modules/validator/lib/isHash.js"));

var _isJWT = _interopRequireDefault(__webpack_require__(/*! ./lib/isJWT */ "./node_modules/validator/lib/isJWT.js"));

var _isJSON = _interopRequireDefault(__webpack_require__(/*! ./lib/isJSON */ "./node_modules/validator/lib/isJSON.js"));

var _isEmpty = _interopRequireDefault(__webpack_require__(/*! ./lib/isEmpty */ "./node_modules/validator/lib/isEmpty.js"));

var _isLength = _interopRequireDefault(__webpack_require__(/*! ./lib/isLength */ "./node_modules/validator/lib/isLength.js"));

var _isByteLength = _interopRequireDefault(__webpack_require__(/*! ./lib/isByteLength */ "./node_modules/validator/lib/isByteLength.js"));

var _isUUID = _interopRequireDefault(__webpack_require__(/*! ./lib/isUUID */ "./node_modules/validator/lib/isUUID.js"));

var _isMongoId = _interopRequireDefault(__webpack_require__(/*! ./lib/isMongoId */ "./node_modules/validator/lib/isMongoId.js"));

var _isAfter = _interopRequireDefault(__webpack_require__(/*! ./lib/isAfter */ "./node_modules/validator/lib/isAfter.js"));

var _isBefore = _interopRequireDefault(__webpack_require__(/*! ./lib/isBefore */ "./node_modules/validator/lib/isBefore.js"));

var _isIn = _interopRequireDefault(__webpack_require__(/*! ./lib/isIn */ "./node_modules/validator/lib/isIn.js"));

var _isLuhnNumber = _interopRequireDefault(__webpack_require__(/*! ./lib/isLuhnNumber */ "./node_modules/validator/lib/isLuhnNumber.js"));

var _isCreditCard = _interopRequireDefault(__webpack_require__(/*! ./lib/isCreditCard */ "./node_modules/validator/lib/isCreditCard.js"));

var _isIdentityCard = _interopRequireDefault(__webpack_require__(/*! ./lib/isIdentityCard */ "./node_modules/validator/lib/isIdentityCard.js"));

var _isEAN = _interopRequireDefault(__webpack_require__(/*! ./lib/isEAN */ "./node_modules/validator/lib/isEAN.js"));

var _isISIN = _interopRequireDefault(__webpack_require__(/*! ./lib/isISIN */ "./node_modules/validator/lib/isISIN.js"));

var _isISBN = _interopRequireDefault(__webpack_require__(/*! ./lib/isISBN */ "./node_modules/validator/lib/isISBN.js"));

var _isISSN = _interopRequireDefault(__webpack_require__(/*! ./lib/isISSN */ "./node_modules/validator/lib/isISSN.js"));

var _isTaxID = _interopRequireDefault(__webpack_require__(/*! ./lib/isTaxID */ "./node_modules/validator/lib/isTaxID.js"));

var _isMobilePhone = _interopRequireWildcard(__webpack_require__(/*! ./lib/isMobilePhone */ "./node_modules/validator/lib/isMobilePhone.js"));

var _isEthereumAddress = _interopRequireDefault(__webpack_require__(/*! ./lib/isEthereumAddress */ "./node_modules/validator/lib/isEthereumAddress.js"));

var _isCurrency = _interopRequireDefault(__webpack_require__(/*! ./lib/isCurrency */ "./node_modules/validator/lib/isCurrency.js"));

var _isBtcAddress = _interopRequireDefault(__webpack_require__(/*! ./lib/isBtcAddress */ "./node_modules/validator/lib/isBtcAddress.js"));

var _isISO = _interopRequireDefault(__webpack_require__(/*! ./lib/isISO6391 */ "./node_modules/validator/lib/isISO6391.js"));

var _isISO2 = _interopRequireDefault(__webpack_require__(/*! ./lib/isISO8601 */ "./node_modules/validator/lib/isISO8601.js"));

var _isRFC = _interopRequireDefault(__webpack_require__(/*! ./lib/isRFC3339 */ "./node_modules/validator/lib/isRFC3339.js"));

var _isISO31661Alpha = _interopRequireDefault(__webpack_require__(/*! ./lib/isISO31661Alpha2 */ "./node_modules/validator/lib/isISO31661Alpha2.js"));

var _isISO31661Alpha2 = _interopRequireDefault(__webpack_require__(/*! ./lib/isISO31661Alpha3 */ "./node_modules/validator/lib/isISO31661Alpha3.js"));

var _isISO3 = _interopRequireDefault(__webpack_require__(/*! ./lib/isISO4217 */ "./node_modules/validator/lib/isISO4217.js"));

var _isBase = _interopRequireDefault(__webpack_require__(/*! ./lib/isBase32 */ "./node_modules/validator/lib/isBase32.js"));

var _isBase2 = _interopRequireDefault(__webpack_require__(/*! ./lib/isBase58 */ "./node_modules/validator/lib/isBase58.js"));

var _isBase3 = _interopRequireDefault(__webpack_require__(/*! ./lib/isBase64 */ "./node_modules/validator/lib/isBase64.js"));

var _isDataURI = _interopRequireDefault(__webpack_require__(/*! ./lib/isDataURI */ "./node_modules/validator/lib/isDataURI.js"));

var _isMagnetURI = _interopRequireDefault(__webpack_require__(/*! ./lib/isMagnetURI */ "./node_modules/validator/lib/isMagnetURI.js"));

var _isMimeType = _interopRequireDefault(__webpack_require__(/*! ./lib/isMimeType */ "./node_modules/validator/lib/isMimeType.js"));

var _isLatLong = _interopRequireDefault(__webpack_require__(/*! ./lib/isLatLong */ "./node_modules/validator/lib/isLatLong.js"));

var _isPostalCode = _interopRequireWildcard(__webpack_require__(/*! ./lib/isPostalCode */ "./node_modules/validator/lib/isPostalCode.js"));

var _ltrim = _interopRequireDefault(__webpack_require__(/*! ./lib/ltrim */ "./node_modules/validator/lib/ltrim.js"));

var _rtrim = _interopRequireDefault(__webpack_require__(/*! ./lib/rtrim */ "./node_modules/validator/lib/rtrim.js"));

var _trim = _interopRequireDefault(__webpack_require__(/*! ./lib/trim */ "./node_modules/validator/lib/trim.js"));

var _escape = _interopRequireDefault(__webpack_require__(/*! ./lib/escape */ "./node_modules/validator/lib/escape.js"));

var _unescape = _interopRequireDefault(__webpack_require__(/*! ./lib/unescape */ "./node_modules/validator/lib/unescape.js"));

var _stripLow = _interopRequireDefault(__webpack_require__(/*! ./lib/stripLow */ "./node_modules/validator/lib/stripLow.js"));

var _whitelist = _interopRequireDefault(__webpack_require__(/*! ./lib/whitelist */ "./node_modules/validator/lib/whitelist.js"));

var _blacklist = _interopRequireDefault(__webpack_require__(/*! ./lib/blacklist */ "./node_modules/validator/lib/blacklist.js"));

var _isWhitelisted = _interopRequireDefault(__webpack_require__(/*! ./lib/isWhitelisted */ "./node_modules/validator/lib/isWhitelisted.js"));

var _normalizeEmail = _interopRequireDefault(__webpack_require__(/*! ./lib/normalizeEmail */ "./node_modules/validator/lib/normalizeEmail.js"));

var _isSlug = _interopRequireDefault(__webpack_require__(/*! ./lib/isSlug */ "./node_modules/validator/lib/isSlug.js"));

var _isLicensePlate = _interopRequireDefault(__webpack_require__(/*! ./lib/isLicensePlate */ "./node_modules/validator/lib/isLicensePlate.js"));

var _isStrongPassword = _interopRequireDefault(__webpack_require__(/*! ./lib/isStrongPassword */ "./node_modules/validator/lib/isStrongPassword.js"));

var _isVAT = _interopRequireDefault(__webpack_require__(/*! ./lib/isVAT */ "./node_modules/validator/lib/isVAT.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var version = '13.9.0';
var validator = {
  version: version,
  toDate: _toDate.default,
  toFloat: _toFloat.default,
  toInt: _toInt.default,
  toBoolean: _toBoolean.default,
  equals: _equals.default,
  contains: _contains.default,
  matches: _matches.default,
  isEmail: _isEmail.default,
  isURL: _isURL.default,
  isMACAddress: _isMACAddress.default,
  isIP: _isIP.default,
  isIPRange: _isIPRange.default,
  isFQDN: _isFQDN.default,
  isBoolean: _isBoolean.default,
  isIBAN: _isIBAN.default,
  isBIC: _isBIC.default,
  isAlpha: _isAlpha.default,
  isAlphaLocales: _isAlpha.locales,
  isAlphanumeric: _isAlphanumeric.default,
  isAlphanumericLocales: _isAlphanumeric.locales,
  isNumeric: _isNumeric.default,
  isPassportNumber: _isPassportNumber.default,
  isPort: _isPort.default,
  isLowercase: _isLowercase.default,
  isUppercase: _isUppercase.default,
  isAscii: _isAscii.default,
  isFullWidth: _isFullWidth.default,
  isHalfWidth: _isHalfWidth.default,
  isVariableWidth: _isVariableWidth.default,
  isMultibyte: _isMultibyte.default,
  isSemVer: _isSemVer.default,
  isSurrogatePair: _isSurrogatePair.default,
  isInt: _isInt.default,
  isIMEI: _isIMEI.default,
  isFloat: _isFloat.default,
  isFloatLocales: _isFloat.locales,
  isDecimal: _isDecimal.default,
  isHexadecimal: _isHexadecimal.default,
  isOctal: _isOctal.default,
  isDivisibleBy: _isDivisibleBy.default,
  isHexColor: _isHexColor.default,
  isRgbColor: _isRgbColor.default,
  isHSL: _isHSL.default,
  isISRC: _isISRC.default,
  isMD5: _isMD.default,
  isHash: _isHash.default,
  isJWT: _isJWT.default,
  isJSON: _isJSON.default,
  isEmpty: _isEmpty.default,
  isLength: _isLength.default,
  isLocale: _isLocale.default,
  isByteLength: _isByteLength.default,
  isUUID: _isUUID.default,
  isMongoId: _isMongoId.default,
  isAfter: _isAfter.default,
  isBefore: _isBefore.default,
  isIn: _isIn.default,
  isLuhnNumber: _isLuhnNumber.default,
  isCreditCard: _isCreditCard.default,
  isIdentityCard: _isIdentityCard.default,
  isEAN: _isEAN.default,
  isISIN: _isISIN.default,
  isISBN: _isISBN.default,
  isISSN: _isISSN.default,
  isMobilePhone: _isMobilePhone.default,
  isMobilePhoneLocales: _isMobilePhone.locales,
  isPostalCode: _isPostalCode.default,
  isPostalCodeLocales: _isPostalCode.locales,
  isEthereumAddress: _isEthereumAddress.default,
  isCurrency: _isCurrency.default,
  isBtcAddress: _isBtcAddress.default,
  isISO6391: _isISO.default,
  isISO8601: _isISO2.default,
  isRFC3339: _isRFC.default,
  isISO31661Alpha2: _isISO31661Alpha.default,
  isISO31661Alpha3: _isISO31661Alpha2.default,
  isISO4217: _isISO3.default,
  isBase32: _isBase.default,
  isBase58: _isBase2.default,
  isBase64: _isBase3.default,
  isDataURI: _isDataURI.default,
  isMagnetURI: _isMagnetURI.default,
  isMimeType: _isMimeType.default,
  isLatLong: _isLatLong.default,
  ltrim: _ltrim.default,
  rtrim: _rtrim.default,
  trim: _trim.default,
  escape: _escape.default,
  unescape: _unescape.default,
  stripLow: _stripLow.default,
  whitelist: _whitelist.default,
  blacklist: _blacklist.default,
  isWhitelisted: _isWhitelisted.default,
  normalizeEmail: _normalizeEmail.default,
  toString: toString,
  isSlug: _isSlug.default,
  isStrongPassword: _isStrongPassword.default,
  isTaxID: _isTaxID.default,
  isDate: _isDate.default,
  isTime: _isTime.default,
  isLicensePlate: _isLicensePlate.default,
  isVAT: _isVAT.default,
  ibanLocales: _isIBAN.locales
};
var _default = validator;
exports["default"] = _default;
module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/alpha.js":
/*!*********************************************!*\
  !*** ./node_modules/validator/lib/alpha.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.commaDecimal = exports.dotDecimal = exports.bengaliLocales = exports.farsiLocales = exports.arabicLocales = exports.englishLocales = exports.decimal = exports.alphanumeric = exports.alpha = void 0;
var alpha = {
  'en-US': /^[A-Z]+$/i,
  'az-AZ': /^[A-VXYZÇƏĞİıÖŞÜ]+$/i,
  'bg-BG': /^[А-Я]+$/i,
  'cs-CZ': /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
  'da-DK': /^[A-ZÆØÅ]+$/i,
  'de-DE': /^[A-ZÄÖÜß]+$/i,
  'el-GR': /^[Α-ώ]+$/i,
  'es-ES': /^[A-ZÁÉÍÑÓÚÜ]+$/i,
  'fa-IR': /^[ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]+$/i,
  'fi-FI': /^[A-ZÅÄÖ]+$/i,
  'fr-FR': /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
  'it-IT': /^[A-ZÀÉÈÌÎÓÒÙ]+$/i,
  'ja-JP': /^[ぁ-んァ-ヶｦ-ﾟ一-龠ー・。、]+$/i,
  'nb-NO': /^[A-ZÆØÅ]+$/i,
  'nl-NL': /^[A-ZÁÉËÏÓÖÜÚ]+$/i,
  'nn-NO': /^[A-ZÆØÅ]+$/i,
  'hu-HU': /^[A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
  'pl-PL': /^[A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
  'pt-PT': /^[A-ZÃÁÀÂÄÇÉÊËÍÏÕÓÔÖÚÜ]+$/i,
  'ru-RU': /^[А-ЯЁ]+$/i,
  'sl-SI': /^[A-ZČĆĐŠŽ]+$/i,
  'sk-SK': /^[A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,
  'sr-RS@latin': /^[A-ZČĆŽŠĐ]+$/i,
  'sr-RS': /^[А-ЯЂЈЉЊЋЏ]+$/i,
  'sv-SE': /^[A-ZÅÄÖ]+$/i,
  'th-TH': /^[ก-๐\s]+$/i,
  'tr-TR': /^[A-ZÇĞİıÖŞÜ]+$/i,
  'uk-UA': /^[А-ЩЬЮЯЄIЇҐі]+$/i,
  'vi-VN': /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴĐÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸ]+$/i,
  'ko-KR': /^[ㄱ-ㅎㅏ-ㅣ가-힣]*$/,
  'ku-IQ': /^[ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,
  ar: /^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/,
  he: /^[א-ת]+$/,
  fa: /^['آاءأؤئبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهةی']+$/i,
  bn: /^['ঀঁংঃঅআইঈউঊঋঌএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ়ঽািীুূৃৄেৈোৌ্ৎৗড়ঢ়য়ৠৡৢৣৰৱ৲৳৴৵৶৷৸৹৺৻']+$/,
  'hi-IN': /^[\u0900-\u0961]+[\u0972-\u097F]*$/i,
  'si-LK': /^[\u0D80-\u0DFF]+$/
};
exports.alpha = alpha;
var alphanumeric = {
  'en-US': /^[0-9A-Z]+$/i,
  'az-AZ': /^[0-9A-VXYZÇƏĞİıÖŞÜ]+$/i,
  'bg-BG': /^[0-9А-Я]+$/i,
  'cs-CZ': /^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
  'da-DK': /^[0-9A-ZÆØÅ]+$/i,
  'de-DE': /^[0-9A-ZÄÖÜß]+$/i,
  'el-GR': /^[0-9Α-ω]+$/i,
  'es-ES': /^[0-9A-ZÁÉÍÑÓÚÜ]+$/i,
  'fi-FI': /^[0-9A-ZÅÄÖ]+$/i,
  'fr-FR': /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
  'it-IT': /^[0-9A-ZÀÉÈÌÎÓÒÙ]+$/i,
  'ja-JP': /^[0-9０-９ぁ-んァ-ヶｦ-ﾟ一-龠ー・。、]+$/i,
  'hu-HU': /^[0-9A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
  'nb-NO': /^[0-9A-ZÆØÅ]+$/i,
  'nl-NL': /^[0-9A-ZÁÉËÏÓÖÜÚ]+$/i,
  'nn-NO': /^[0-9A-ZÆØÅ]+$/i,
  'pl-PL': /^[0-9A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
  'pt-PT': /^[0-9A-ZÃÁÀÂÄÇÉÊËÍÏÕÓÔÖÚÜ]+$/i,
  'ru-RU': /^[0-9А-ЯЁ]+$/i,
  'sl-SI': /^[0-9A-ZČĆĐŠŽ]+$/i,
  'sk-SK': /^[0-9A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,
  'sr-RS@latin': /^[0-9A-ZČĆŽŠĐ]+$/i,
  'sr-RS': /^[0-9А-ЯЂЈЉЊЋЏ]+$/i,
  'sv-SE': /^[0-9A-ZÅÄÖ]+$/i,
  'th-TH': /^[ก-๙\s]+$/i,
  'tr-TR': /^[0-9A-ZÇĞİıÖŞÜ]+$/i,
  'uk-UA': /^[0-9А-ЩЬЮЯЄIЇҐі]+$/i,
  'ko-KR': /^[0-9ㄱ-ㅎㅏ-ㅣ가-힣]*$/,
  'ku-IQ': /^[٠١٢٣٤٥٦٧٨٩0-9ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,
  'vi-VN': /^[0-9A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴĐÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸ]+$/i,
  ar: /^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/,
  he: /^[0-9א-ת]+$/,
  fa: /^['0-9آاءأؤئبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهةی۱۲۳۴۵۶۷۸۹۰']+$/i,
  bn: /^['ঀঁংঃঅআইঈউঊঋঌএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ়ঽািীুূৃৄেৈোৌ্ৎৗড়ঢ়য়ৠৡৢৣ০১২৩৪৫৬৭৮৯ৰৱ৲৳৴৵৶৷৸৹৺৻']+$/,
  'hi-IN': /^[\u0900-\u0963]+[\u0966-\u097F]*$/i,
  'si-LK': /^[0-9\u0D80-\u0DFF]+$/
};
exports.alphanumeric = alphanumeric;
var decimal = {
  'en-US': '.',
  ar: '٫'
};
exports.decimal = decimal;
var englishLocales = ['AU', 'GB', 'HK', 'IN', 'NZ', 'ZA', 'ZM'];
exports.englishLocales = englishLocales;

for (var locale, i = 0; i < englishLocales.length; i++) {
  locale = "en-".concat(englishLocales[i]);
  alpha[locale] = alpha['en-US'];
  alphanumeric[locale] = alphanumeric['en-US'];
  decimal[locale] = decimal['en-US'];
} // Source: http://www.localeplanet.com/java/


var arabicLocales = ['AE', 'BH', 'DZ', 'EG', 'IQ', 'JO', 'KW', 'LB', 'LY', 'MA', 'QM', 'QA', 'SA', 'SD', 'SY', 'TN', 'YE'];
exports.arabicLocales = arabicLocales;

for (var _locale, _i = 0; _i < arabicLocales.length; _i++) {
  _locale = "ar-".concat(arabicLocales[_i]);
  alpha[_locale] = alpha.ar;
  alphanumeric[_locale] = alphanumeric.ar;
  decimal[_locale] = decimal.ar;
}

var farsiLocales = ['IR', 'AF'];
exports.farsiLocales = farsiLocales;

for (var _locale2, _i2 = 0; _i2 < farsiLocales.length; _i2++) {
  _locale2 = "fa-".concat(farsiLocales[_i2]);
  alphanumeric[_locale2] = alphanumeric.fa;
  decimal[_locale2] = decimal.ar;
}

var bengaliLocales = ['BD', 'IN'];
exports.bengaliLocales = bengaliLocales;

for (var _locale3, _i3 = 0; _i3 < bengaliLocales.length; _i3++) {
  _locale3 = "bn-".concat(bengaliLocales[_i3]);
  alpha[_locale3] = alpha.bn;
  alphanumeric[_locale3] = alphanumeric.bn;
  decimal[_locale3] = decimal['en-US'];
} // Source: https://en.wikipedia.org/wiki/Decimal_mark


var dotDecimal = ['ar-EG', 'ar-LB', 'ar-LY'];
exports.dotDecimal = dotDecimal;
var commaDecimal = ['bg-BG', 'cs-CZ', 'da-DK', 'de-DE', 'el-GR', 'en-ZM', 'es-ES', 'fr-CA', 'fr-FR', 'id-ID', 'it-IT', 'ku-IQ', 'hi-IN', 'hu-HU', 'nb-NO', 'nn-NO', 'nl-NL', 'pl-PL', 'pt-PT', 'ru-RU', 'si-LK', 'sl-SI', 'sr-RS@latin', 'sr-RS', 'sv-SE', 'tr-TR', 'uk-UA', 'vi-VN'];
exports.commaDecimal = commaDecimal;

for (var _i4 = 0; _i4 < dotDecimal.length; _i4++) {
  decimal[dotDecimal[_i4]] = decimal['en-US'];
}

for (var _i5 = 0; _i5 < commaDecimal.length; _i5++) {
  decimal[commaDecimal[_i5]] = ',';
}

alpha['fr-CA'] = alpha['fr-FR'];
alphanumeric['fr-CA'] = alphanumeric['fr-FR'];
alpha['pt-BR'] = alpha['pt-PT'];
alphanumeric['pt-BR'] = alphanumeric['pt-PT'];
decimal['pt-BR'] = decimal['pt-PT']; // see #862

alpha['pl-Pl'] = alpha['pl-PL'];
alphanumeric['pl-Pl'] = alphanumeric['pl-PL'];
decimal['pl-Pl'] = decimal['pl-PL']; // see #1455

alpha['fa-AF'] = alpha.fa;

/***/ }),

/***/ "./node_modules/validator/lib/blacklist.js":
/*!*************************************************!*\
  !*** ./node_modules/validator/lib/blacklist.js ***!
  \*************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = blacklist;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function blacklist(str, chars) {
  (0, _assertString.default)(str);
  return str.replace(new RegExp("[".concat(chars, "]+"), 'g'), '');
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/contains.js":
/*!************************************************!*\
  !*** ./node_modules/validator/lib/contains.js ***!
  \************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = contains;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _toString = _interopRequireDefault(__webpack_require__(/*! ./util/toString */ "./node_modules/validator/lib/util/toString.js"));

var _merge = _interopRequireDefault(__webpack_require__(/*! ./util/merge */ "./node_modules/validator/lib/util/merge.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaulContainsOptions = {
  ignoreCase: false,
  minOccurrences: 1
};

function contains(str, elem, options) {
  (0, _assertString.default)(str);
  options = (0, _merge.default)(options, defaulContainsOptions);

  if (options.ignoreCase) {
    return str.toLowerCase().split((0, _toString.default)(elem).toLowerCase()).length > options.minOccurrences;
  }

  return str.split((0, _toString.default)(elem)).length > options.minOccurrences;
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/equals.js":
/*!**********************************************!*\
  !*** ./node_modules/validator/lib/equals.js ***!
  \**********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = equals;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function equals(str, comparison) {
  (0, _assertString.default)(str);
  return str === comparison;
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/escape.js":
/*!**********************************************!*\
  !*** ./node_modules/validator/lib/escape.js ***!
  \**********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = escape;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function escape(str) {
  (0, _assertString.default)(str);
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\//g, '&#x2F;').replace(/\\/g, '&#x5C;').replace(/`/g, '&#96;');
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isAfter.js":
/*!***********************************************!*\
  !*** ./node_modules/validator/lib/isAfter.js ***!
  \***********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isAfter;

var _toDate = _interopRequireDefault(__webpack_require__(/*! ./toDate */ "./node_modules/validator/lib/toDate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isAfter(date, options) {
  // For backwards compatibility:
  // isAfter(str [, date]), i.e. `options` could be used as argument for the legacy `date`
  var comparisonDate = (options === null || options === void 0 ? void 0 : options.comparisonDate) || options || Date().toString();
  var comparison = (0, _toDate.default)(comparisonDate);
  var original = (0, _toDate.default)(date);
  return !!(original && comparison && original > comparison);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isAlpha.js":
/*!***********************************************!*\
  !*** ./node_modules/validator/lib/isAlpha.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isAlpha;
exports.locales = void 0;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _alpha = __webpack_require__(/*! ./alpha */ "./node_modules/validator/lib/alpha.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isAlpha(_str) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-US';
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  (0, _assertString.default)(_str);
  var str = _str;
  var ignore = options.ignore;

  if (ignore) {
    if (ignore instanceof RegExp) {
      str = str.replace(ignore, '');
    } else if (typeof ignore === 'string') {
      str = str.replace(new RegExp("[".concat(ignore.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, '\\$&'), "]"), 'g'), ''); // escape regex for ignore
    } else {
      throw new Error('ignore should be instance of a String or RegExp');
    }
  }

  if (locale in _alpha.alpha) {
    return _alpha.alpha[locale].test(str);
  }

  throw new Error("Invalid locale '".concat(locale, "'"));
}

var locales = Object.keys(_alpha.alpha);
exports.locales = locales;

/***/ }),

/***/ "./node_modules/validator/lib/isAlphanumeric.js":
/*!******************************************************!*\
  !*** ./node_modules/validator/lib/isAlphanumeric.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isAlphanumeric;
exports.locales = void 0;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _alpha = __webpack_require__(/*! ./alpha */ "./node_modules/validator/lib/alpha.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isAlphanumeric(_str) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-US';
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  (0, _assertString.default)(_str);
  var str = _str;
  var ignore = options.ignore;

  if (ignore) {
    if (ignore instanceof RegExp) {
      str = str.replace(ignore, '');
    } else if (typeof ignore === 'string') {
      str = str.replace(new RegExp("[".concat(ignore.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, '\\$&'), "]"), 'g'), ''); // escape regex for ignore
    } else {
      throw new Error('ignore should be instance of a String or RegExp');
    }
  }

  if (locale in _alpha.alphanumeric) {
    return _alpha.alphanumeric[locale].test(str);
  }

  throw new Error("Invalid locale '".concat(locale, "'"));
}

var locales = Object.keys(_alpha.alphanumeric);
exports.locales = locales;

/***/ }),

/***/ "./node_modules/validator/lib/isAscii.js":
/*!***********************************************!*\
  !*** ./node_modules/validator/lib/isAscii.js ***!
  \***********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isAscii;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-control-regex */
var ascii = /^[\x00-\x7F]+$/;
/* eslint-enable no-control-regex */

function isAscii(str) {
  (0, _assertString.default)(str);
  return ascii.test(str);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isBIC.js":
/*!*********************************************!*\
  !*** ./node_modules/validator/lib/isBIC.js ***!
  \*********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isBIC;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _isISO31661Alpha = __webpack_require__(/*! ./isISO31661Alpha2 */ "./node_modules/validator/lib/isISO31661Alpha2.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://en.wikipedia.org/wiki/ISO_9362
var isBICReg = /^[A-Za-z]{6}[A-Za-z0-9]{2}([A-Za-z0-9]{3})?$/;

function isBIC(str) {
  (0, _assertString.default)(str); // toUpperCase() should be removed when a new major version goes out that changes
  // the regex to [A-Z] (per the spec).

  var countryCode = str.slice(4, 6).toUpperCase();

  if (!_isISO31661Alpha.CountryCodes.has(countryCode) && countryCode !== 'XK') {
    return false;
  }

  return isBICReg.test(str);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isBase32.js":
/*!************************************************!*\
  !*** ./node_modules/validator/lib/isBase32.js ***!
  \************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isBase32;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _merge = _interopRequireDefault(__webpack_require__(/*! ./util/merge */ "./node_modules/validator/lib/util/merge.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var base32 = /^[A-Z2-7]+=*$/;
var crockfordBase32 = /^[A-HJKMNP-TV-Z0-9]+$/;
var defaultBase32Options = {
  crockford: false
};

function isBase32(str, options) {
  (0, _assertString.default)(str);
  options = (0, _merge.default)(options, defaultBase32Options);

  if (options.crockford) {
    return crockfordBase32.test(str);
  }

  var len = str.length;

  if (len % 8 === 0 && base32.test(str)) {
    return true;
  }

  return false;
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isBase58.js":
/*!************************************************!*\
  !*** ./node_modules/validator/lib/isBase58.js ***!
  \************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isBase58;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Accepted chars - 123456789ABCDEFGH JKLMN PQRSTUVWXYZabcdefghijk mnopqrstuvwxyz
var base58Reg = /^[A-HJ-NP-Za-km-z1-9]*$/;

function isBase58(str) {
  (0, _assertString.default)(str);

  if (base58Reg.test(str)) {
    return true;
  }

  return false;
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isBase64.js":
/*!************************************************!*\
  !*** ./node_modules/validator/lib/isBase64.js ***!
  \************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isBase64;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _merge = _interopRequireDefault(__webpack_require__(/*! ./util/merge */ "./node_modules/validator/lib/util/merge.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var notBase64 = /[^A-Z0-9+\/=]/i;
var urlSafeBase64 = /^[A-Z0-9_\-]*$/i;
var defaultBase64Options = {
  urlSafe: false
};

function isBase64(str, options) {
  (0, _assertString.default)(str);
  options = (0, _merge.default)(options, defaultBase64Options);
  var len = str.length;

  if (options.urlSafe) {
    return urlSafeBase64.test(str);
  }

  if (len % 4 !== 0 || notBase64.test(str)) {
    return false;
  }

  var firstPaddingChar = str.indexOf('=');
  return firstPaddingChar === -1 || firstPaddingChar === len - 1 || firstPaddingChar === len - 2 && str[len - 1] === '=';
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isBefore.js":
/*!************************************************!*\
  !*** ./node_modules/validator/lib/isBefore.js ***!
  \************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isBefore;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _toDate = _interopRequireDefault(__webpack_require__(/*! ./toDate */ "./node_modules/validator/lib/toDate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isBefore(str) {
  var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : String(new Date());
  (0, _assertString.default)(str);
  var comparison = (0, _toDate.default)(date);
  var original = (0, _toDate.default)(str);
  return !!(original && comparison && original < comparison);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isBoolean.js":
/*!*************************************************!*\
  !*** ./node_modules/validator/lib/isBoolean.js ***!
  \*************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isBoolean;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = {
  loose: false
};
var strictBooleans = ['true', 'false', '1', '0'];
var looseBooleans = [].concat(strictBooleans, ['yes', 'no']);

function isBoolean(str) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions;
  (0, _assertString.default)(str);

  if (options.loose) {
    return looseBooleans.includes(str.toLowerCase());
  }

  return strictBooleans.includes(str);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isBtcAddress.js":
/*!****************************************************!*\
  !*** ./node_modules/validator/lib/isBtcAddress.js ***!
  \****************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isBtcAddress;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bech32 = /^(bc1)[a-z0-9]{25,39}$/;
var base58 = /^(1|3)[A-HJ-NP-Za-km-z1-9]{25,39}$/;

function isBtcAddress(str) {
  (0, _assertString.default)(str);
  return bech32.test(str) || base58.test(str);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isByteLength.js":
/*!****************************************************!*\
  !*** ./node_modules/validator/lib/isByteLength.js ***!
  \****************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isByteLength;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-disable prefer-rest-params */
function isByteLength(str, options) {
  (0, _assertString.default)(str);
  var min;
  var max;

  if (_typeof(options) === 'object') {
    min = options.min || 0;
    max = options.max;
  } else {
    // backwards compatibility: isByteLength(str, min [, max])
    min = arguments[1];
    max = arguments[2];
  }

  var len = encodeURI(str).split(/%..|./).length - 1;
  return len >= min && (typeof max === 'undefined' || len <= max);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isCreditCard.js":
/*!****************************************************!*\
  !*** ./node_modules/validator/lib/isCreditCard.js ***!
  \****************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isCreditCard;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _isLuhnNumber = _interopRequireDefault(__webpack_require__(/*! ./isLuhnNumber */ "./node_modules/validator/lib/isLuhnNumber.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cards = {
  amex: /^3[47][0-9]{13}$/,
  dinersclub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
  discover: /^6(?:011|5[0-9][0-9])[0-9]{12,15}$/,
  jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
  mastercard: /^5[1-5][0-9]{2}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,
  // /^[25][1-7][0-9]{14}$/;
  unionpay: /^(6[27][0-9]{14}|^(81[0-9]{14,17}))$/,
  visa: /^(?:4[0-9]{12})(?:[0-9]{3,6})?$/
};
/* eslint-disable max-len */

var allCards = /^(?:4[0-9]{12}(?:[0-9]{3,6})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12,15}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|6[27][0-9]{14}|^(81[0-9]{14,17}))$/;
/* eslint-enable max-len */

function isCreditCard(card) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _assertString.default)(card);
  var provider = options.provider;
  var sanitized = card.replace(/[- ]+/g, '');

  if (provider && provider.toLowerCase() in cards) {
    // specific provider in the list
    if (!cards[provider.toLowerCase()].test(sanitized)) {
      return false;
    }
  } else if (provider && !(provider.toLowerCase() in cards)) {
    /* specific provider not in the list */
    throw new Error("".concat(provider, " is not a valid credit card provider."));
  } else if (!allCards.test(sanitized)) {
    // no specific provider
    return false;
  }

  return (0, _isLuhnNumber.default)(card);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isCurrency.js":
/*!**************************************************!*\
  !*** ./node_modules/validator/lib/isCurrency.js ***!
  \**************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isCurrency;

var _merge = _interopRequireDefault(__webpack_require__(/*! ./util/merge */ "./node_modules/validator/lib/util/merge.js"));

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function currencyRegex(options) {
  var decimal_digits = "\\d{".concat(options.digits_after_decimal[0], "}");
  options.digits_after_decimal.forEach(function (digit, index) {
    if (index !== 0) decimal_digits = "".concat(decimal_digits, "|\\d{").concat(digit, "}");
  });
  var symbol = "(".concat(options.symbol.replace(/\W/, function (m) {
    return "\\".concat(m);
  }), ")").concat(options.require_symbol ? '' : '?'),
      negative = '-?',
      whole_dollar_amount_without_sep = '[1-9]\\d*',
      whole_dollar_amount_with_sep = "[1-9]\\d{0,2}(\\".concat(options.thousands_separator, "\\d{3})*"),
      valid_whole_dollar_amounts = ['0', whole_dollar_amount_without_sep, whole_dollar_amount_with_sep],
      whole_dollar_amount = "(".concat(valid_whole_dollar_amounts.join('|'), ")?"),
      decimal_amount = "(\\".concat(options.decimal_separator, "(").concat(decimal_digits, "))").concat(options.require_decimal ? '' : '?');
  var pattern = whole_dollar_amount + (options.allow_decimal || options.require_decimal ? decimal_amount : ''); // default is negative sign before symbol, but there are two other options (besides parens)

  if (options.allow_negatives && !options.parens_for_negatives) {
    if (options.negative_sign_after_digits) {
      pattern += negative;
    } else if (options.negative_sign_before_digits) {
      pattern = negative + pattern;
    }
  } // South African Rand, for example, uses R 123 (space) and R-123 (no space)


  if (options.allow_negative_sign_placeholder) {
    pattern = "( (?!\\-))?".concat(pattern);
  } else if (options.allow_space_after_symbol) {
    pattern = " ?".concat(pattern);
  } else if (options.allow_space_after_digits) {
    pattern += '( (?!$))?';
  }

  if (options.symbol_after_digits) {
    pattern += symbol;
  } else {
    pattern = symbol + pattern;
  }

  if (options.allow_negatives) {
    if (options.parens_for_negatives) {
      pattern = "(\\(".concat(pattern, "\\)|").concat(pattern, ")");
    } else if (!(options.negative_sign_before_digits || options.negative_sign_after_digits)) {
      pattern = negative + pattern;
    }
  } // ensure there's a dollar and/or decimal amount, and that
  // it doesn't start with a space or a negative sign followed by a space


  return new RegExp("^(?!-? )(?=.*\\d)".concat(pattern, "$"));
}

var default_currency_options = {
  symbol: '$',
  require_symbol: false,
  allow_space_after_symbol: false,
  symbol_after_digits: false,
  allow_negatives: true,
  parens_for_negatives: false,
  negative_sign_before_digits: false,
  negative_sign_after_digits: false,
  allow_negative_sign_placeholder: false,
  thousands_separator: ',',
  decimal_separator: '.',
  allow_decimal: true,
  require_decimal: false,
  digits_after_decimal: [2],
  allow_space_after_digits: false
};

function isCurrency(str, options) {
  (0, _assertString.default)(str);
  options = (0, _merge.default)(options, default_currency_options);
  return currencyRegex(options).test(str);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isDataURI.js":
/*!*************************************************!*\
  !*** ./node_modules/validator/lib/isDataURI.js ***!
  \*************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isDataURI;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validMediaType = /^[a-z]+\/[a-z0-9\-\+\._]+$/i;
var validAttribute = /^[a-z\-]+=[a-z0-9\-]+$/i;
var validData = /^[a-z0-9!\$&'\(\)\*\+,;=\-\._~:@\/\?%\s]*$/i;

function isDataURI(str) {
  (0, _assertString.default)(str);
  var data = str.split(',');

  if (data.length < 2) {
    return false;
  }

  var attributes = data.shift().trim().split(';');
  var schemeAndMediaType = attributes.shift();

  if (schemeAndMediaType.slice(0, 5) !== 'data:') {
    return false;
  }

  var mediaType = schemeAndMediaType.slice(5);

  if (mediaType !== '' && !validMediaType.test(mediaType)) {
    return false;
  }

  for (var i = 0; i < attributes.length; i++) {
    if (!(i === attributes.length - 1 && attributes[i].toLowerCase() === 'base64') && !validAttribute.test(attributes[i])) {
      return false;
    }
  }

  for (var _i = 0; _i < data.length; _i++) {
    if (!validData.test(data[_i])) {
      return false;
    }
  }

  return true;
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isDate.js":
/*!**********************************************!*\
  !*** ./node_modules/validator/lib/isDate.js ***!
  \**********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isDate;

var _merge = _interopRequireDefault(__webpack_require__(/*! ./util/merge */ "./node_modules/validator/lib/util/merge.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var default_date_options = {
  format: 'YYYY/MM/DD',
  delimiters: ['/', '-'],
  strictMode: false
};

function isValidFormat(format) {
  return /(^(y{4}|y{2})[.\/-](m{1,2})[.\/-](d{1,2})$)|(^(m{1,2})[.\/-](d{1,2})[.\/-]((y{4}|y{2})$))|(^(d{1,2})[.\/-](m{1,2})[.\/-]((y{4}|y{2})$))/gi.test(format);
}

function zip(date, format) {
  var zippedArr = [],
      len = Math.min(date.length, format.length);

  for (var i = 0; i < len; i++) {
    zippedArr.push([date[i], format[i]]);
  }

  return zippedArr;
}

function isDate(input, options) {
  if (typeof options === 'string') {
    // Allow backward compatbility for old format isDate(input [, format])
    options = (0, _merge.default)({
      format: options
    }, default_date_options);
  } else {
    options = (0, _merge.default)(options, default_date_options);
  }

  if (typeof input === 'string' && isValidFormat(options.format)) {
    var formatDelimiter = options.delimiters.find(function (delimiter) {
      return options.format.indexOf(delimiter) !== -1;
    });
    var dateDelimiter = options.strictMode ? formatDelimiter : options.delimiters.find(function (delimiter) {
      return input.indexOf(delimiter) !== -1;
    });
    var dateAndFormat = zip(input.split(dateDelimiter), options.format.toLowerCase().split(formatDelimiter));
    var dateObj = {};

    var _iterator = _createForOfIteratorHelper(dateAndFormat),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _slicedToArray(_step.value, 2),
            dateWord = _step$value[0],
            formatWord = _step$value[1];

        if (dateWord.length !== formatWord.length) {
          return false;
        }

        dateObj[formatWord.charAt(0)] = dateWord;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return new Date("".concat(dateObj.m, "/").concat(dateObj.d, "/").concat(dateObj.y)).getDate() === +dateObj.d;
  }

  if (!options.strictMode) {
    return Object.prototype.toString.call(input) === '[object Date]' && isFinite(input);
  }

  return false;
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isDecimal.js":
/*!*************************************************!*\
  !*** ./node_modules/validator/lib/isDecimal.js ***!
  \*************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isDecimal;

var _merge = _interopRequireDefault(__webpack_require__(/*! ./util/merge */ "./node_modules/validator/lib/util/merge.js"));

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _includes = _interopRequireDefault(__webpack_require__(/*! ./util/includes */ "./node_modules/validator/lib/util/includes.js"));

var _alpha = __webpack_require__(/*! ./alpha */ "./node_modules/validator/lib/alpha.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function decimalRegExp(options) {
  var regExp = new RegExp("^[-+]?([0-9]+)?(\\".concat(_alpha.decimal[options.locale], "[0-9]{").concat(options.decimal_digits, "})").concat(options.force_decimal ? '' : '?', "$"));
  return regExp;
}

var default_decimal_options = {
  force_decimal: false,
  decimal_digits: '1,',
  locale: 'en-US'
};
var blacklist = ['', '-', '+'];

function isDecimal(str, options) {
  (0, _assertString.default)(str);
  options = (0, _merge.default)(options, default_decimal_options);

  if (options.locale in _alpha.decimal) {
    return !(0, _includes.default)(blacklist, str.replace(/ /g, '')) && decimalRegExp(options).test(str);
  }

  throw new Error("Invalid locale '".concat(options.locale, "'"));
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isDivisibleBy.js":
/*!*****************************************************!*\
  !*** ./node_modules/validator/lib/isDivisibleBy.js ***!
  \*****************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isDivisibleBy;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _toFloat = _interopRequireDefault(__webpack_require__(/*! ./toFloat */ "./node_modules/validator/lib/toFloat.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isDivisibleBy(str, num) {
  (0, _assertString.default)(str);
  return (0, _toFloat.default)(str) % parseInt(num, 10) === 0;
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isEAN.js":
/*!*********************************************!*\
  !*** ./node_modules/validator/lib/isEAN.js ***!
  \*********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isEAN;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The most commonly used EAN standard is
 * the thirteen-digit EAN-13, while the
 * less commonly used 8-digit EAN-8 barcode was
 * introduced for use on small packages.
 * Also EAN/UCC-14 is used for Grouping of individual
 * trade items above unit level(Intermediate, Carton or Pallet).
 * For more info about EAN-14 checkout: https://www.gtin.info/itf-14-barcodes/
 * EAN consists of:
 * GS1 prefix, manufacturer code, product code and check digit
 * Reference: https://en.wikipedia.org/wiki/International_Article_Number
 * Reference: https://www.gtin.info/
 */

/**
 * Define EAN Lenghts; 8 for EAN-8; 13 for EAN-13; 14 for EAN-14
 * and Regular Expression for valid EANs (EAN-8, EAN-13, EAN-14),
 * with exact numberic matching of 8 or 13 or 14 digits [0-9]
 */
var LENGTH_EAN_8 = 8;
var LENGTH_EAN_14 = 14;
var validEanRegex = /^(\d{8}|\d{13}|\d{14})$/;
/**
 * Get position weight given:
 * EAN length and digit index/position
 *
 * @param {number} length
 * @param {number} index
 * @return {number}
 */

function getPositionWeightThroughLengthAndIndex(length, index) {
  if (length === LENGTH_EAN_8 || length === LENGTH_EAN_14) {
    return index % 2 === 0 ? 3 : 1;
  }

  return index % 2 === 0 ? 1 : 3;
}
/**
 * Calculate EAN Check Digit
 * Reference: https://en.wikipedia.org/wiki/International_Article_Number#Calculation_of_checksum_digit
 *
 * @param {string} ean
 * @return {number}
 */


function calculateCheckDigit(ean) {
  var checksum = ean.slice(0, -1).split('').map(function (char, index) {
    return Number(char) * getPositionWeightThroughLengthAndIndex(ean.length, index);
  }).reduce(function (acc, partialSum) {
    return acc + partialSum;
  }, 0);
  var remainder = 10 - checksum % 10;
  return remainder < 10 ? remainder : 0;
}
/**
 * Check if string is valid EAN:
 * Matches EAN-8/EAN-13/EAN-14 regex
 * Has valid check digit.
 *
 * @param {string} str
 * @return {boolean}
 */


function isEAN(str) {
  (0, _assertString.default)(str);
  var actualCheckDigit = Number(str.slice(-1));
  return validEanRegex.test(str) && actualCheckDigit === calculateCheckDigit(str);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isEmail.js":
/*!***********************************************!*\
  !*** ./node_modules/validator/lib/isEmail.js ***!
  \***********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isEmail;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _merge = _interopRequireDefault(__webpack_require__(/*! ./util/merge */ "./node_modules/validator/lib/util/merge.js"));

var _isByteLength = _interopRequireDefault(__webpack_require__(/*! ./isByteLength */ "./node_modules/validator/lib/isByteLength.js"));

var _isFQDN = _interopRequireDefault(__webpack_require__(/*! ./isFQDN */ "./node_modules/validator/lib/isFQDN.js"));

var _isIP = _interopRequireDefault(__webpack_require__(/*! ./isIP */ "./node_modules/validator/lib/isIP.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_email_options = {
  allow_display_name: false,
  require_display_name: false,
  allow_utf8_local_part: true,
  require_tld: true,
  blacklisted_chars: '',
  ignore_max_length: false,
  host_blacklist: [],
  host_whitelist: []
};
/* eslint-disable max-len */

/* eslint-disable no-control-regex */

var splitNameAddress = /^([^\x00-\x1F\x7F-\x9F\cX]+)</i;
var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
var gmailUserPart = /^[a-z\d]+$/;
var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
var defaultMaxEmailLength = 254;
/* eslint-enable max-len */

/* eslint-enable no-control-regex */

/**
 * Validate display name according to the RFC2822: https://tools.ietf.org/html/rfc2822#appendix-A.1.2
 * @param {String} display_name
 */

function validateDisplayName(display_name) {
  var display_name_without_quotes = display_name.replace(/^"(.+)"$/, '$1'); // display name with only spaces is not valid

  if (!display_name_without_quotes.trim()) {
    return false;
  } // check whether display name contains illegal character


  var contains_illegal = /[\.";<>]/.test(display_name_without_quotes);

  if (contains_illegal) {
    // if contains illegal characters,
    // must to be enclosed in double-quotes, otherwise it's not a valid display name
    if (display_name_without_quotes === display_name) {
      return false;
    } // the quotes in display name must start with character symbol \


    var all_start_with_back_slash = display_name_without_quotes.split('"').length === display_name_without_quotes.split('\\"').length;

    if (!all_start_with_back_slash) {
      return false;
    }
  }

  return true;
}

function isEmail(str, options) {
  (0, _assertString.default)(str);
  options = (0, _merge.default)(options, default_email_options);

  if (options.require_display_name || options.allow_display_name) {
    var display_email = str.match(splitNameAddress);

    if (display_email) {
      var display_name = display_email[1]; // Remove display name and angle brackets to get email address
      // Can be done in the regex but will introduce a ReDOS (See  #1597 for more info)

      str = str.replace(display_name, '').replace(/(^<|>$)/g, ''); // sometimes need to trim the last space to get the display name
      // because there may be a space between display name and email address
      // eg. myname <address@gmail.com>
      // the display name is `myname` instead of `myname `, so need to trim the last space

      if (display_name.endsWith(' ')) {
        display_name = display_name.slice(0, -1);
      }

      if (!validateDisplayName(display_name)) {
        return false;
      }
    } else if (options.require_display_name) {
      return false;
    }
  }

  if (!options.ignore_max_length && str.length > defaultMaxEmailLength) {
    return false;
  }

  var parts = str.split('@');
  var domain = parts.pop();
  var lower_domain = domain.toLowerCase();

  if (options.host_blacklist.includes(lower_domain)) {
    return false;
  }

  if (options.host_whitelist.length > 0 && !options.host_whitelist.includes(lower_domain)) {
    return false;
  }

  var user = parts.join('@');

  if (options.domain_specific_validation && (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com')) {
    /*
      Previously we removed dots for gmail addresses before validating.
      This was removed because it allows `multiple..dots@gmail.com`
      to be reported as valid, but it is not.
      Gmail only normalizes single dots, removing them from here is pointless,
      should be done in normalizeEmail
    */
    user = user.toLowerCase(); // Removing sub-address from username before gmail validation

    var username = user.split('+')[0]; // Dots are not included in gmail length restriction

    if (!(0, _isByteLength.default)(username.replace(/\./g, ''), {
      min: 6,
      max: 30
    })) {
      return false;
    }

    var _user_parts = username.split('.');

    for (var i = 0; i < _user_parts.length; i++) {
      if (!gmailUserPart.test(_user_parts[i])) {
        return false;
      }
    }
  }

  if (options.ignore_max_length === false && (!(0, _isByteLength.default)(user, {
    max: 64
  }) || !(0, _isByteLength.default)(domain, {
    max: 254
  }))) {
    return false;
  }

  if (!(0, _isFQDN.default)(domain, {
    require_tld: options.require_tld,
    ignore_max_length: options.ignore_max_length
  })) {
    if (!options.allow_ip_domain) {
      return false;
    }

    if (!(0, _isIP.default)(domain)) {
      if (!domain.startsWith('[') || !domain.endsWith(']')) {
        return false;
      }

      var noBracketdomain = domain.slice(1, -1);

      if (noBracketdomain.length === 0 || !(0, _isIP.default)(noBracketdomain)) {
        return false;
      }
    }
  }

  if (user[0] === '"') {
    user = user.slice(1, user.length - 1);
    return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
  }

  var pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;
  var user_parts = user.split('.');

  for (var _i = 0; _i < user_parts.length; _i++) {
    if (!pattern.test(user_parts[_i])) {
      return false;
    }
  }

  if (options.blacklisted_chars) {
    if (user.search(new RegExp("[".concat(options.blacklisted_chars, "]+"), 'g')) !== -1) return false;
  }

  return true;
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isEmpty.js":
/*!***********************************************!*\
  !*** ./node_modules/validator/lib/isEmpty.js ***!
  \***********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isEmpty;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _merge = _interopRequireDefault(__webpack_require__(/*! ./util/merge */ "./node_modules/validator/lib/util/merge.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_is_empty_options = {
  ignore_whitespace: false
};

function isEmpty(str, options) {
  (0, _assertString.default)(str);
  options = (0, _merge.default)(options, default_is_empty_options);
  return (options.ignore_whitespace ? str.trim().length : str.length) === 0;
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isEthereumAddress.js":
/*!*********************************************************!*\
  !*** ./node_modules/validator/lib/isEthereumAddress.js ***!
  \*********************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isEthereumAddress;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var eth = /^(0x)[0-9a-f]{40}$/i;

function isEthereumAddress(str) {
  (0, _assertString.default)(str);
  return eth.test(str);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isFQDN.js":
/*!**********************************************!*\
  !*** ./node_modules/validator/lib/isFQDN.js ***!
  \**********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isFQDN;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _merge = _interopRequireDefault(__webpack_require__(/*! ./util/merge */ "./node_modules/validator/lib/util/merge.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_fqdn_options = {
  require_tld: true,
  allow_underscores: false,
  allow_trailing_dot: false,
  allow_numeric_tld: false,
  allow_wildcard: false,
  ignore_max_length: false
};

function isFQDN(str, options) {
  (0, _assertString.default)(str);
  options = (0, _merge.default)(options, default_fqdn_options);
  /* Remove the optional trailing dot before checking validity */

  if (options.allow_trailing_dot && str[str.length - 1] === '.') {
    str = str.substring(0, str.length - 1);
  }
  /* Remove the optional wildcard before checking validity */


  if (options.allow_wildcard === true && str.indexOf('*.') === 0) {
    str = str.substring(2);
  }

  var parts = str.split('.');
  var tld = parts[parts.length - 1];

  if (options.require_tld) {
    // disallow fqdns without tld
    if (parts.length < 2) {
      return false;
    }

    if (!options.allow_numeric_tld && !/^([a-z\u00A1-\u00A8\u00AA-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
      return false;
    } // disallow spaces


    if (/\s/.test(tld)) {
      return false;
    }
  } // reject numeric TLDs


  if (!options.allow_numeric_tld && /^\d+$/.test(tld)) {
    return false;
  }

  return parts.every(function (part) {
    if (part.length > 63 && !options.ignore_max_length) {
      return false;
    }

    if (!/^[a-z_\u00a1-\uffff0-9-]+$/i.test(part)) {
      return false;
    } // disallow full-width chars


    if (/[\uff01-\uff5e]/.test(part)) {
      return false;
    } // disallow parts starting or ending with hyphen


    if (/^-|-$/.test(part)) {
      return false;
    }

    if (!options.allow_underscores && /_/.test(part)) {
      return false;
    }

    return true;
  });
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isFloat.js":
/*!***********************************************!*\
  !*** ./node_modules/validator/lib/isFloat.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isFloat;
exports.locales = void 0;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _alpha = __webpack_require__(/*! ./alpha */ "./node_modules/validator/lib/alpha.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isFloat(str, options) {
  (0, _assertString.default)(str);
  options = options || {};
  var float = new RegExp("^(?:[-+])?(?:[0-9]+)?(?:\\".concat(options.locale ? _alpha.decimal[options.locale] : '.', "[0-9]*)?(?:[eE][\\+\\-]?(?:[0-9]+))?$"));

  if (str === '' || str === '.' || str === ',' || str === '-' || str === '+') {
    return false;
  }

  var value = parseFloat(str.replace(',', '.'));
  return float.test(str) && (!options.hasOwnProperty('min') || value >= options.min) && (!options.hasOwnProperty('max') || value <= options.max) && (!options.hasOwnProperty('lt') || value < options.lt) && (!options.hasOwnProperty('gt') || value > options.gt);
}

var locales = Object.keys(_alpha.decimal);
exports.locales = locales;

/***/ }),

/***/ "./node_modules/validator/lib/isFullWidth.js":
/*!***************************************************!*\
  !*** ./node_modules/validator/lib/isFullWidth.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isFullWidth;
exports.fullWidth = void 0;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fullWidth = /[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;
exports.fullWidth = fullWidth;

function isFullWidth(str) {
  (0, _assertString.default)(str);
  return fullWidth.test(str);
}

/***/ }),

/***/ "./node_modules/validator/lib/isHSL.js":
/*!*********************************************!*\
  !*** ./node_modules/validator/lib/isHSL.js ***!
  \*********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isHSL;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hslComma = /^hsla?\(((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?))(deg|grad|rad|turn)?(,(\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%){2}(,((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%?))?\)$/i;
var hslSpace = /^hsla?\(((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?))(deg|grad|rad|turn)?(\s(\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%){2}\s?(\/\s((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%?)\s?)?\)$/i;

function isHSL(str) {
  (0, _assertString.default)(str); // Strip duplicate spaces before calling the validation regex (See  #1598 for more info)

  var strippedStr = str.replace(/\s+/g, ' ').replace(/\s?(hsla?\(|\)|,)\s?/ig, '$1');

  if (strippedStr.indexOf(',') !== -1) {
    return hslComma.test(strippedStr);
  }

  return hslSpace.test(strippedStr);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isHalfWidth.js":
/*!***************************************************!*\
  !*** ./node_modules/validator/lib/isHalfWidth.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isHalfWidth;
exports.halfWidth = void 0;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var halfWidth = /[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;
exports.halfWidth = halfWidth;

function isHalfWidth(str) {
  (0, _assertString.default)(str);
  return halfWidth.test(str);
}

/***/ }),

/***/ "./node_modules/validator/lib/isHash.js":
/*!**********************************************!*\
  !*** ./node_modules/validator/lib/isHash.js ***!
  \**********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isHash;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lengths = {
  md5: 32,
  md4: 32,
  sha1: 40,
  sha256: 64,
  sha384: 96,
  sha512: 128,
  ripemd128: 32,
  ripemd160: 40,
  tiger128: 32,
  tiger160: 40,
  tiger192: 48,
  crc32: 8,
  crc32b: 8
};

function isHash(str, algorithm) {
  (0, _assertString.default)(str);
  var hash = new RegExp("^[a-fA-F0-9]{".concat(lengths[algorithm], "}$"));
  return hash.test(str);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isHexColor.js":
/*!**************************************************!*\
  !*** ./node_modules/validator/lib/isHexColor.js ***!
  \**************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isHexColor;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hexcolor = /^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i;

function isHexColor(str) {
  (0, _assertString.default)(str);
  return hexcolor.test(str);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isHexadecimal.js":
/*!*****************************************************!*\
  !*** ./node_modules/validator/lib/isHexadecimal.js ***!
  \*****************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isHexadecimal;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hexadecimal = /^(0x|0h)?[0-9A-F]+$/i;

function isHexadecimal(str) {
  (0, _assertString.default)(str);
  return hexadecimal.test(str);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isIBAN.js":
/*!**********************************************!*\
  !*** ./node_modules/validator/lib/isIBAN.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isIBAN;
exports.locales = void 0;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * List of country codes with
 * corresponding IBAN regular expression
 * Reference: https://en.wikipedia.org/wiki/International_Bank_Account_Number
 */
var ibanRegexThroughCountryCode = {
  AD: /^(AD[0-9]{2})\d{8}[A-Z0-9]{12}$/,
  AE: /^(AE[0-9]{2})\d{3}\d{16}$/,
  AL: /^(AL[0-9]{2})\d{8}[A-Z0-9]{16}$/,
  AT: /^(AT[0-9]{2})\d{16}$/,
  AZ: /^(AZ[0-9]{2})[A-Z0-9]{4}\d{20}$/,
  BA: /^(BA[0-9]{2})\d{16}$/,
  BE: /^(BE[0-9]{2})\d{12}$/,
  BG: /^(BG[0-9]{2})[A-Z]{4}\d{6}[A-Z0-9]{8}$/,
  BH: /^(BH[0-9]{2})[A-Z]{4}[A-Z0-9]{14}$/,
  BR: /^(BR[0-9]{2})\d{23}[A-Z]{1}[A-Z0-9]{1}$/,
  BY: /^(BY[0-9]{2})[A-Z0-9]{4}\d{20}$/,
  CH: /^(CH[0-9]{2})\d{5}[A-Z0-9]{12}$/,
  CR: /^(CR[0-9]{2})\d{18}$/,
  CY: /^(CY[0-9]{2})\d{8}[A-Z0-9]{16}$/,
  CZ: /^(CZ[0-9]{2})\d{20}$/,
  DE: /^(DE[0-9]{2})\d{18}$/,
  DK: /^(DK[0-9]{2})\d{14}$/,
  DO: /^(DO[0-9]{2})[A-Z]{4}\d{20}$/,
  EE: /^(EE[0-9]{2})\d{16}$/,
  EG: /^(EG[0-9]{2})\d{25}$/,
  ES: /^(ES[0-9]{2})\d{20}$/,
  FI: /^(FI[0-9]{2})\d{14}$/,
  FO: /^(FO[0-9]{2})\d{14}$/,
  FR: /^(FR[0-9]{2})\d{10}[A-Z0-9]{11}\d{2}$/,
  GB: /^(GB[0-9]{2})[A-Z]{4}\d{14}$/,
  GE: /^(GE[0-9]{2})[A-Z0-9]{2}\d{16}$/,
  GI: /^(GI[0-9]{2})[A-Z]{4}[A-Z0-9]{15}$/,
  GL: /^(GL[0-9]{2})\d{14}$/,
  GR: /^(GR[0-9]{2})\d{7}[A-Z0-9]{16}$/,
  GT: /^(GT[0-9]{2})[A-Z0-9]{4}[A-Z0-9]{20}$/,
  HR: /^(HR[0-9]{2})\d{17}$/,
  HU: /^(HU[0-9]{2})\d{24}$/,
  IE: /^(IE[0-9]{2})[A-Z0-9]{4}\d{14}$/,
  IL: /^(IL[0-9]{2})\d{19}$/,
  IQ: /^(IQ[0-9]{2})[A-Z]{4}\d{15}$/,
  IR: /^(IR[0-9]{2})0\d{2}0\d{18}$/,
  IS: /^(IS[0-9]{2})\d{22}$/,
  IT: /^(IT[0-9]{2})[A-Z]{1}\d{10}[A-Z0-9]{12}$/,
  JO: /^(JO[0-9]{2})[A-Z]{4}\d{22}$/,
  KW: /^(KW[0-9]{2})[A-Z]{4}[A-Z0-9]{22}$/,
  KZ: /^(KZ[0-9]{2})\d{3}[A-Z0-9]{13}$/,
  LB: /^(LB[0-9]{2})\d{4}[A-Z0-9]{20}$/,
  LC: /^(LC[0-9]{2})[A-Z]{4}[A-Z0-9]{24}$/,
  LI: /^(LI[0-9]{2})\d{5}[A-Z0-9]{12}$/,
  LT: /^(LT[0-9]{2})\d{16}$/,
  LU: /^(LU[0-9]{2})\d{3}[A-Z0-9]{13}$/,
  LV: /^(LV[0-9]{2})[A-Z]{4}[A-Z0-9]{13}$/,
  MC: /^(MC[0-9]{2})\d{10}[A-Z0-9]{11}\d{2}$/,
  MD: /^(MD[0-9]{2})[A-Z0-9]{20}$/,
  ME: /^(ME[0-9]{2})\d{18}$/,
  MK: /^(MK[0-9]{2})\d{3}[A-Z0-9]{10}\d{2}$/,
  MR: /^(MR[0-9]{2})\d{23}$/,
  MT: /^(MT[0-9]{2})[A-Z]{4}\d{5}[A-Z0-9]{18}$/,
  MU: /^(MU[0-9]{2})[A-Z]{4}\d{19}[A-Z]{3}$/,
  MZ: /^(MZ[0-9]{2})\d{21}$/,
  NL: /^(NL[0-9]{2})[A-Z]{4}\d{10}$/,
  NO: /^(NO[0-9]{2})\d{11}$/,
  PK: /^(PK[0-9]{2})[A-Z0-9]{4}\d{16}$/,
  PL: /^(PL[0-9]{2})\d{24}$/,
  PS: /^(PS[0-9]{2})[A-Z0-9]{4}\d{21}$/,
  PT: /^(PT[0-9]{2})\d{21}$/,
  QA: /^(QA[0-9]{2})[A-Z]{4}[A-Z0-9]{21}$/,
  RO: /^(RO[0-9]{2})[A-Z]{4}[A-Z0-9]{16}$/,
  RS: /^(RS[0-9]{2})\d{18}$/,
  SA: /^(SA[0-9]{2})\d{2}[A-Z0-9]{18}$/,
  SC: /^(SC[0-9]{2})[A-Z]{4}\d{20}[A-Z]{3}$/,
  SE: /^(SE[0-9]{2})\d{20}$/,
  SI: /^(SI[0-9]{2})\d{15}$/,
  SK: /^(SK[0-9]{2})\d{20}$/,
  SM: /^(SM[0-9]{2})[A-Z]{1}\d{10}[A-Z0-9]{12}$/,
  SV: /^(SV[0-9]{2})[A-Z0-9]{4}\d{20}$/,
  TL: /^(TL[0-9]{2})\d{19}$/,
  TN: /^(TN[0-9]{2})\d{20}$/,
  TR: /^(TR[0-9]{2})\d{5}[A-Z0-9]{17}$/,
  UA: /^(UA[0-9]{2})\d{6}[A-Z0-9]{19}$/,
  VA: /^(VA[0-9]{2})\d{18}$/,
  VG: /^(VG[0-9]{2})[A-Z0-9]{4}\d{16}$/,
  XK: /^(XK[0-9]{2})\d{16}$/
};
/**
 * Check whether string has correct universal IBAN format
 * The IBAN consists of up to 34 alphanumeric characters, as follows:
 * Country Code using ISO 3166-1 alpha-2, two letters
 * check digits, two digits and
 * Basic Bank Account Number (BBAN), up to 30 alphanumeric characters.
 * NOTE: Permitted IBAN characters are: digits [0-9] and the 26 latin alphabetic [A-Z]
 *
 * @param {string} str - string under validation
 * @return {boolean}
 */

function hasValidIbanFormat(str) {
  // Strip white spaces and hyphens
  var strippedStr = str.replace(/[\s\-]+/gi, '').toUpperCase();
  var isoCountryCode = strippedStr.slice(0, 2).toUpperCase();
  return isoCountryCode in ibanRegexThroughCountryCode && ibanRegexThroughCountryCode[isoCountryCode].test(strippedStr);
}
/**
   * Check whether string has valid IBAN Checksum
   * by performing basic mod-97 operation and
   * the remainder should equal 1
   * -- Start by rearranging the IBAN by moving the four initial characters to the end of the string
   * -- Replace each letter in the string with two digits, A -> 10, B = 11, Z = 35
   * -- Interpret the string as a decimal integer and
   * -- compute the remainder on division by 97 (mod 97)
   * Reference: https://en.wikipedia.org/wiki/International_Bank_Account_Number
   *
   * @param {string} str
   * @return {boolean}
   */


function hasValidIbanChecksum(str) {
  var strippedStr = str.replace(/[^A-Z0-9]+/gi, '').toUpperCase(); // Keep only digits and A-Z latin alphabetic

  var rearranged = strippedStr.slice(4) + strippedStr.slice(0, 4);
  var alphaCapsReplacedWithDigits = rearranged.replace(/[A-Z]/g, function (char) {
    return char.charCodeAt(0) - 55;
  });
  var remainder = alphaCapsReplacedWithDigits.match(/\d{1,7}/g).reduce(function (acc, value) {
    return Number(acc + value) % 97;
  }, '');
  return remainder === 1;
}

function isIBAN(str) {
  (0, _assertString.default)(str);
  return hasValidIbanFormat(str) && hasValidIbanChecksum(str);
}

var locales = Object.keys(ibanRegexThroughCountryCode);
exports.locales = locales;

/***/ }),

/***/ "./node_modules/validator/lib/isIMEI.js":
/*!**********************************************!*\
  !*** ./node_modules/validator/lib/isIMEI.js ***!
  \**********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isIMEI;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var imeiRegexWithoutHypens = /^[0-9]{15}$/;
var imeiRegexWithHypens = /^\d{2}-\d{6}-\d{6}-\d{1}$/;

function isIMEI(str, options) {
  (0, _assertString.default)(str);
  options = options || {}; // default regex for checking imei is the one without hyphens

  var imeiRegex = imeiRegexWithoutHypens;

  if (options.allow_hyphens) {
    imeiRegex = imeiRegexWithHypens;
  }

  if (!imeiRegex.test(str)) {
    return false;
  }

  str = str.replace(/-/g, '');
  var sum = 0,
      mul = 2,
      l = 14;

  for (var i = 0; i < l; i++) {
    var digit = str.substring(l - i - 1, l - i);
    var tp = parseInt(digit, 10) * mul;

    if (tp >= 10) {
      sum += tp % 10 + 1;
    } else {
      sum += tp;
    }

    if (mul === 1) {
      mul += 1;
    } else {
      mul -= 1;
    }
  }

  var chk = (10 - sum % 10) % 10;

  if (chk !== parseInt(str.substring(14, 15), 10)) {
    return false;
  }

  return true;
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isIP.js":
/*!********************************************!*\
  !*** ./node_modules/validator/lib/isIP.js ***!
  \********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isIP;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
11.3.  Examples

   The following addresses

             fe80::1234 (on the 1st link of the node)
             ff02::5678 (on the 5th link of the node)
             ff08::9abc (on the 10th organization of the node)

   would be represented as follows:

             fe80::1234%1
             ff02::5678%5
             ff08::9abc%10

   (Here we assume a natural translation from a zone index to the
   <zone_id> part, where the Nth zone of any scope is translated into
   "N".)

   If we use interface names as <zone_id>, those addresses could also be
   represented as follows:

            fe80::1234%ne0
            ff02::5678%pvc1.3
            ff08::9abc%interface10

   where the interface "ne0" belongs to the 1st link, "pvc1.3" belongs
   to the 5th link, and "interface10" belongs to the 10th organization.
 * * */
var IPv4SegmentFormat = '(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])';
var IPv4AddressFormat = "(".concat(IPv4SegmentFormat, "[.]){3}").concat(IPv4SegmentFormat);
var IPv4AddressRegExp = new RegExp("^".concat(IPv4AddressFormat, "$"));
var IPv6SegmentFormat = '(?:[0-9a-fA-F]{1,4})';
var IPv6AddressRegExp = new RegExp('^(' + "(?:".concat(IPv6SegmentFormat, ":){7}(?:").concat(IPv6SegmentFormat, "|:)|") + "(?:".concat(IPv6SegmentFormat, ":){6}(?:").concat(IPv4AddressFormat, "|:").concat(IPv6SegmentFormat, "|:)|") + "(?:".concat(IPv6SegmentFormat, ":){5}(?::").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,2}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){4}(?:(:").concat(IPv6SegmentFormat, "){0,1}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,3}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){3}(?:(:").concat(IPv6SegmentFormat, "){0,2}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,4}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){2}(?:(:").concat(IPv6SegmentFormat, "){0,3}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,5}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){1}(?:(:").concat(IPv6SegmentFormat, "){0,4}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,6}|:)|") + "(?::((?::".concat(IPv6SegmentFormat, "){0,5}:").concat(IPv4AddressFormat, "|(?::").concat(IPv6SegmentFormat, "){1,7}|:))") + ')(%[0-9a-zA-Z-.:]{1,})?$');

function isIP(str) {
  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  (0, _assertString.default)(str);
  version = String(version);

  if (!version) {
    return isIP(str, 4) || isIP(str, 6);
  }

  if (version === '4') {
    return IPv4AddressRegExp.test(str);
  }

  if (version === '6') {
    return IPv6AddressRegExp.test(str);
  }

  return false;
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isIPRange.js":
/*!*************************************************!*\
  !*** ./node_modules/validator/lib/isIPRange.js ***!
  \*************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isIPRange;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _isIP = _interopRequireDefault(__webpack_require__(/*! ./isIP */ "./node_modules/validator/lib/isIP.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var subnetMaybe = /^\d{1,3}$/;
var v4Subnet = 32;
var v6Subnet = 128;

function isIPRange(str) {
  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  (0, _assertString.default)(str);
  var parts = str.split('/'); // parts[0] -> ip, parts[1] -> subnet

  if (parts.length !== 2) {
    return false;
  }

  if (!subnetMaybe.test(parts[1])) {
    return false;
  } // Disallow preceding 0 i.e. 01, 02, ...


  if (parts[1].length > 1 && parts[1].startsWith('0')) {
    return false;
  }

  var isValidIP = (0, _isIP.default)(parts[0], version);

  if (!isValidIP) {
    return false;
  } // Define valid subnet according to IP's version


  var expectedSubnet = null;

  switch (String(version)) {
    case '4':
      expectedSubnet = v4Subnet;
      break;

    case '6':
      expectedSubnet = v6Subnet;
      break;

    default:
      expectedSubnet = (0, _isIP.default)(parts[0], '6') ? v6Subnet : v4Subnet;
  }

  return parts[1] <= expectedSubnet && parts[1] >= 0;
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isISBN.js":
/*!**********************************************!*\
  !*** ./node_modules/validator/lib/isISBN.js ***!
  \**********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isISBN;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var possibleIsbn10 = /^(?:[0-9]{9}X|[0-9]{10})$/;
var possibleIsbn13 = /^(?:[0-9]{13})$/;
var factor = [1, 3];

function isISBN(isbn, options) {
  (0, _assertString.default)(isbn); // For backwards compatibility:
  // isISBN(str [, version]), i.e. `options` could be used as argument for the legacy `version`

  var version = String((options === null || options === void 0 ? void 0 : options.version) || options);

  if (!(options !== null && options !== void 0 && options.version || options)) {
    return isISBN(isbn, {
      version: 10
    }) || isISBN(isbn, {
      version: 13
    });
  }

  var sanitizedIsbn = isbn.replace(/[\s-]+/g, '');
  var checksum = 0;

  if (version === '10') {
    if (!possibleIsbn10.test(sanitizedIsbn)) {
      return false;
    }

    for (var i = 0; i < version - 1; i++) {
      checksum += (i + 1) * sanitizedIsbn.charAt(i);
    }

    if (sanitizedIsbn.charAt(9) === 'X') {
      checksum += 10 * 10;
    } else {
      checksum += 10 * sanitizedIsbn.charAt(9);
    }

    if (checksum % 11 === 0) {
      return true;
    }
  } else if (version === '13') {
    if (!possibleIsbn13.test(sanitizedIsbn)) {
      return false;
    }

    for (var _i = 0; _i < 12; _i++) {
      checksum += factor[_i % 2] * sanitizedIsbn.charAt(_i);
    }

    if (sanitizedIsbn.charAt(12) - (10 - checksum % 10) % 10 === 0) {
      return true;
    }
  }

  return false;
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isISIN.js":
/*!**********************************************!*\
  !*** ./node_modules/validator/lib/isISIN.js ***!
  \**********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isISIN;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isin = /^[A-Z]{2}[0-9A-Z]{9}[0-9]$/; // this link details how the check digit is calculated:
// https://www.isin.org/isin-format/. it is a little bit
// odd in that it works with digits, not numbers. in order
// to make only one pass through the ISIN characters, the
// each alpha character is handled as 2 characters within
// the loop.

function isISIN(str) {
  (0, _assertString.default)(str);

  if (!isin.test(str)) {
    return false;
  }

  var double = true;
  var sum = 0; // convert values

  for (var i = str.length - 2; i >= 0; i--) {
    if (str[i] >= 'A' && str[i] <= 'Z') {
      var value = str[i].charCodeAt(0) - 55;
      var lo = value % 10;
      var hi = Math.trunc(value / 10); // letters have two digits, so handle the low order
      // and high order digits separately.

      for (var _i = 0, _arr = [lo, hi]; _i < _arr.length; _i++) {
        var digit = _arr[_i];

        if (double) {
          if (digit >= 5) {
            sum += 1 + (digit - 5) * 2;
          } else {
            sum += digit * 2;
          }
        } else {
          sum += digit;
        }

        double = !double;
      }
    } else {
      var _digit = str[i].charCodeAt(0) - '0'.charCodeAt(0);

      if (double) {
        if (_digit >= 5) {
          sum += 1 + (_digit - 5) * 2;
        } else {
          sum += _digit * 2;
        }
      } else {
        sum += _digit;
      }

      double = !double;
    }
  }

  var check = Math.trunc((sum + 9) / 10) * 10 - sum;
  return +str[str.length - 1] === check;
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isISO31661Alpha2.js":
/*!********************************************************!*\
  !*** ./node_modules/validator/lib/isISO31661Alpha2.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isISO31661Alpha2;
exports.CountryCodes = void 0;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// from https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
var validISO31661Alpha2CountriesCodes = new Set(['AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CC', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'CU', 'CV', 'CW', 'CX', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FM', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HM', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IR', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KP', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MH', 'MK', 'ML', 'MM', 'MN', 'MO', 'MP', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NF', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PW', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SD', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SY', 'SZ', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'UM', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VI', 'VN', 'VU', 'WF', 'WS', 'YE', 'YT', 'ZA', 'ZM', 'ZW']);

function isISO31661Alpha2(str) {
  (0, _assertString.default)(str);
  return validISO31661Alpha2CountriesCodes.has(str.toUpperCase());
}

var CountryCodes = validISO31661Alpha2CountriesCodes;
exports.CountryCodes = CountryCodes;

/***/ }),

/***/ "./node_modules/validator/lib/isISO31661Alpha3.js":
/*!********************************************************!*\
  !*** ./node_modules/validator/lib/isISO31661Alpha3.js ***!
  \********************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isISO31661Alpha3;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// from https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3
var validISO31661Alpha3CountriesCodes = new Set(['AFG', 'ALA', 'ALB', 'DZA', 'ASM', 'AND', 'AGO', 'AIA', 'ATA', 'ATG', 'ARG', 'ARM', 'ABW', 'AUS', 'AUT', 'AZE', 'BHS', 'BHR', 'BGD', 'BRB', 'BLR', 'BEL', 'BLZ', 'BEN', 'BMU', 'BTN', 'BOL', 'BES', 'BIH', 'BWA', 'BVT', 'BRA', 'IOT', 'BRN', 'BGR', 'BFA', 'BDI', 'KHM', 'CMR', 'CAN', 'CPV', 'CYM', 'CAF', 'TCD', 'CHL', 'CHN', 'CXR', 'CCK', 'COL', 'COM', 'COG', 'COD', 'COK', 'CRI', 'CIV', 'HRV', 'CUB', 'CUW', 'CYP', 'CZE', 'DNK', 'DJI', 'DMA', 'DOM', 'ECU', 'EGY', 'SLV', 'GNQ', 'ERI', 'EST', 'ETH', 'FLK', 'FRO', 'FJI', 'FIN', 'FRA', 'GUF', 'PYF', 'ATF', 'GAB', 'GMB', 'GEO', 'DEU', 'GHA', 'GIB', 'GRC', 'GRL', 'GRD', 'GLP', 'GUM', 'GTM', 'GGY', 'GIN', 'GNB', 'GUY', 'HTI', 'HMD', 'VAT', 'HND', 'HKG', 'HUN', 'ISL', 'IND', 'IDN', 'IRN', 'IRQ', 'IRL', 'IMN', 'ISR', 'ITA', 'JAM', 'JPN', 'JEY', 'JOR', 'KAZ', 'KEN', 'KIR', 'PRK', 'KOR', 'KWT', 'KGZ', 'LAO', 'LVA', 'LBN', 'LSO', 'LBR', 'LBY', 'LIE', 'LTU', 'LUX', 'MAC', 'MKD', 'MDG', 'MWI', 'MYS', 'MDV', 'MLI', 'MLT', 'MHL', 'MTQ', 'MRT', 'MUS', 'MYT', 'MEX', 'FSM', 'MDA', 'MCO', 'MNG', 'MNE', 'MSR', 'MAR', 'MOZ', 'MMR', 'NAM', 'NRU', 'NPL', 'NLD', 'NCL', 'NZL', 'NIC', 'NER', 'NGA', 'NIU', 'NFK', 'MNP', 'NOR', 'OMN', 'PAK', 'PLW', 'PSE', 'PAN', 'PNG', 'PRY', 'PER', 'PHL', 'PCN', 'POL', 'PRT', 'PRI', 'QAT', 'REU', 'ROU', 'RUS', 'RWA', 'BLM', 'SHN', 'KNA', 'LCA', 'MAF', 'SPM', 'VCT', 'WSM', 'SMR', 'STP', 'SAU', 'SEN', 'SRB', 'SYC', 'SLE', 'SGP', 'SXM', 'SVK', 'SVN', 'SLB', 'SOM', 'ZAF', 'SGS', 'SSD', 'ESP', 'LKA', 'SDN', 'SUR', 'SJM', 'SWZ', 'SWE', 'CHE', 'SYR', 'TWN', 'TJK', 'TZA', 'THA', 'TLS', 'TGO', 'TKL', 'TON', 'TTO', 'TUN', 'TUR', 'TKM', 'TCA', 'TUV', 'UGA', 'UKR', 'ARE', 'GBR', 'USA', 'UMI', 'URY', 'UZB', 'VUT', 'VEN', 'VNM', 'VGB', 'VIR', 'WLF', 'ESH', 'YEM', 'ZMB', 'ZWE']);

function isISO31661Alpha3(str) {
  (0, _assertString.default)(str);
  return validISO31661Alpha3CountriesCodes.has(str.toUpperCase());
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isISO4217.js":
/*!*************************************************!*\
  !*** ./node_modules/validator/lib/isISO4217.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isISO4217;
exports.CurrencyCodes = void 0;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// from https://en.wikipedia.org/wiki/ISO_4217
var validISO4217CurrencyCodes = new Set(['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BOV', 'BRL', 'BSD', 'BTN', 'BWP', 'BYN', 'BZD', 'CAD', 'CDF', 'CHE', 'CHF', 'CHW', 'CLF', 'CLP', 'CNY', 'COP', 'COU', 'CRC', 'CUC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR', 'IQD', 'IRR', 'ISK', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRU', 'MUR', 'MVR', 'MWK', 'MXN', 'MXV', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SRD', 'SSP', 'STN', 'SVC', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'USN', 'UYI', 'UYU', 'UYW', 'UZS', 'VES', 'VND', 'VUV', 'WST', 'XAF', 'XAG', 'XAU', 'XBA', 'XBB', 'XBC', 'XBD', 'XCD', 'XDR', 'XOF', 'XPD', 'XPF', 'XPT', 'XSU', 'XTS', 'XUA', 'XXX', 'YER', 'ZAR', 'ZMW', 'ZWL']);

function isISO4217(str) {
  (0, _assertString.default)(str);
  return validISO4217CurrencyCodes.has(str.toUpperCase());
}

var CurrencyCodes = validISO4217CurrencyCodes;
exports.CurrencyCodes = CurrencyCodes;

/***/ }),

/***/ "./node_modules/validator/lib/isISO6391.js":
/*!*************************************************!*\
  !*** ./node_modules/validator/lib/isISO6391.js ***!
  \*************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isISO6391;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isISO6391Set = new Set(['aa', 'ab', 'ae', 'af', 'ak', 'am', 'an', 'ar', 'as', 'av', 'ay', 'az', 'az', 'ba', 'be', 'bg', 'bh', 'bi', 'bm', 'bn', 'bo', 'br', 'bs', 'ca', 'ce', 'ch', 'co', 'cr', 'cs', 'cu', 'cv', 'cy', 'da', 'de', 'dv', 'dz', 'ee', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fa', 'ff', 'fi', 'fj', 'fo', 'fr', 'fy', 'ga', 'gd', 'gl', 'gn', 'gu', 'gv', 'ha', 'he', 'hi', 'ho', 'hr', 'ht', 'hu', 'hy', 'hz', 'ia', 'id', 'ie', 'ig', 'ii', 'ik', 'io', 'is', 'it', 'iu', 'ja', 'jv', 'ka', 'kg', 'ki', 'kj', 'kk', 'kl', 'km', 'kn', 'ko', 'kr', 'ks', 'ku', 'kv', 'kw', 'ky', 'la', 'lb', 'lg', 'li', 'ln', 'lo', 'lt', 'lu', 'lv', 'mg', 'mh', 'mi', 'mk', 'ml', 'mn', 'mr', 'ms', 'mt', 'my', 'na', 'nb', 'nd', 'ne', 'ng', 'nl', 'nn', 'no', 'nr', 'nv', 'ny', 'oc', 'oj', 'om', 'or', 'os', 'pa', 'pi', 'pl', 'ps', 'pt', 'qu', 'rm', 'rn', 'ro', 'ru', 'rw', 'sa', 'sc', 'sd', 'se', 'sg', 'si', 'sk', 'sl', 'sm', 'sn', 'so', 'sq', 'sr', 'ss', 'st', 'su', 'sv', 'sw', 'ta', 'te', 'tg', 'th', 'ti', 'tk', 'tl', 'tn', 'to', 'tr', 'ts', 'tt', 'tw', 'ty', 'ug', 'uk', 'ur', 'uz', 've', 'vi', 'vo', 'wa', 'wo', 'xh', 'yi', 'yo', 'za', 'zh', 'zu']);

function isISO6391(str) {
  (0, _assertString.default)(str);
  return isISO6391Set.has(str);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isISO8601.js":
/*!*************************************************!*\
  !*** ./node_modules/validator/lib/isISO8601.js ***!
  \*************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isISO8601;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable max-len */
// from http://goo.gl/0ejHHW
var iso8601 = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-3])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/; // same as above, except with a strict 'T' separator between date and time

var iso8601StrictSeparator = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-3])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
/* eslint-enable max-len */

var isValidDate = function isValidDate(str) {
  // str must have passed the ISO8601 check
  // this check is meant to catch invalid dates
  // like 2009-02-31
  // first check for ordinal dates
  var ordinalMatch = str.match(/^(\d{4})-?(\d{3})([ T]{1}\.*|$)/);

  if (ordinalMatch) {
    var oYear = Number(ordinalMatch[1]);
    var oDay = Number(ordinalMatch[2]); // if is leap year

    if (oYear % 4 === 0 && oYear % 100 !== 0 || oYear % 400 === 0) return oDay <= 366;
    return oDay <= 365;
  }

  var match = str.match(/(\d{4})-?(\d{0,2})-?(\d*)/).map(Number);
  var year = match[1];
  var month = match[2];
  var day = match[3];
  var monthString = month ? "0".concat(month).slice(-2) : month;
  var dayString = day ? "0".concat(day).slice(-2) : day; // create a date object and compare

  var d = new Date("".concat(year, "-").concat(monthString || '01', "-").concat(dayString || '01'));

  if (month && day) {
    return d.getUTCFullYear() === year && d.getUTCMonth() + 1 === month && d.getUTCDate() === day;
  }

  return true;
};

function isISO8601(str) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _assertString.default)(str);
  var check = options.strictSeparator ? iso8601StrictSeparator.test(str) : iso8601.test(str);
  if (check && options.strict) return isValidDate(str);
  return check;
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isISRC.js":
/*!**********************************************!*\
  !*** ./node_modules/validator/lib/isISRC.js ***!
  \**********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isISRC;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// see http://isrc.ifpi.org/en/isrc-standard/code-syntax
var isrc = /^[A-Z]{2}[0-9A-Z]{3}\d{2}\d{5}$/;

function isISRC(str) {
  (0, _assertString.default)(str);
  return isrc.test(str);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isISSN.js":
/*!**********************************************!*\
  !*** ./node_modules/validator/lib/isISSN.js ***!
  \**********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isISSN;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var issn = '^\\d{4}-?\\d{3}[\\dX]$';

function isISSN(str) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _assertString.default)(str);
  var testIssn = issn;
  testIssn = options.require_hyphen ? testIssn.replace('?', '') : testIssn;
  testIssn = options.case_sensitive ? new RegExp(testIssn) : new RegExp(testIssn, 'i');

  if (!testIssn.test(str)) {
    return false;
  }

  var digits = str.replace('-', '').toUpperCase();
  var checksum = 0;

  for (var i = 0; i < digits.length; i++) {
    var digit = digits[i];
    checksum += (digit === 'X' ? 10 : +digit) * (8 - i);
  }

  return checksum % 11 === 0;
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isIdentityCard.js":
/*!******************************************************!*\
  !*** ./node_modules/validator/lib/isIdentityCard.js ***!
  \******************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isIdentityCard;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _isInt = _interopRequireDefault(__webpack_require__(/*! ./isInt */ "./node_modules/validator/lib/isInt.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validators = {
  PL: function PL(str) {
    (0, _assertString.default)(str);
    var weightOfDigits = {
      1: 1,
      2: 3,
      3: 7,
      4: 9,
      5: 1,
      6: 3,
      7: 7,
      8: 9,
      9: 1,
      10: 3,
      11: 0
    };

    if (str != null && str.length === 11 && (0, _isInt.default)(str, {
      allow_leading_zeroes: true
    })) {
      var digits = str.split('').slice(0, -1);
      var sum = digits.reduce(function (acc, digit, index) {
        return acc + Number(digit) * weightOfDigits[index + 1];
      }, 0);
      var modulo = sum % 10;
      var lastDigit = Number(str.charAt(str.length - 1));

      if (modulo === 0 && lastDigit === 0 || lastDigit === 10 - modulo) {
        return true;
      }
    }

    return false;
  },
  ES: function ES(str) {
    (0, _assertString.default)(str);
    var DNI = /^[0-9X-Z][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/;
    var charsValue = {
      X: 0,
      Y: 1,
      Z: 2
    };
    var controlDigits = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E']; // sanitize user input

    var sanitized = str.trim().toUpperCase(); // validate the data structure

    if (!DNI.test(sanitized)) {
      return false;
    } // validate the control digit


    var number = sanitized.slice(0, -1).replace(/[X,Y,Z]/g, function (char) {
      return charsValue[char];
    });
    return sanitized.endsWith(controlDigits[number % 23]);
  },
  FI: function FI(str) {
    // https://dvv.fi/en/personal-identity-code#:~:text=control%20character%20for%20a-,personal,-identity%20code%20calculated
    (0, _assertString.default)(str);

    if (str.length !== 11) {
      return false;
    }

    if (!str.match(/^\d{6}[\-A\+]\d{3}[0-9ABCDEFHJKLMNPRSTUVWXY]{1}$/)) {
      return false;
    }

    var checkDigits = '0123456789ABCDEFHJKLMNPRSTUVWXY';
    var idAsNumber = parseInt(str.slice(0, 6), 10) * 1000 + parseInt(str.slice(7, 10), 10);
    var remainder = idAsNumber % 31;
    var checkDigit = checkDigits[remainder];
    return checkDigit === str.slice(10, 11);
  },
  IN: function IN(str) {
    var DNI = /^[1-9]\d{3}\s?\d{4}\s?\d{4}$/; // multiplication table

    var d = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 0, 6, 7, 8, 9, 5], [2, 3, 4, 0, 1, 7, 8, 9, 5, 6], [3, 4, 0, 1, 2, 8, 9, 5, 6, 7], [4, 0, 1, 2, 3, 9, 5, 6, 7, 8], [5, 9, 8, 7, 6, 0, 4, 3, 2, 1], [6, 5, 9, 8, 7, 1, 0, 4, 3, 2], [7, 6, 5, 9, 8, 2, 1, 0, 4, 3], [8, 7, 6, 5, 9, 3, 2, 1, 0, 4], [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]]; // permutation table

    var p = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 5, 7, 6, 2, 8, 3, 0, 9, 4], [5, 8, 0, 3, 7, 9, 6, 1, 4, 2], [8, 9, 1, 6, 0, 4, 3, 5, 2, 7], [9, 4, 5, 3, 1, 2, 6, 8, 7, 0], [4, 2, 8, 6, 5, 7, 3, 9, 0, 1], [2, 7, 9, 3, 8, 0, 6, 4, 1, 5], [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]]; // sanitize user input

    var sanitized = str.trim(); // validate the data structure

    if (!DNI.test(sanitized)) {
      return false;
    }

    var c = 0;
    var invertedArray = sanitized.replace(/\s/g, '').split('').map(Number).reverse();
    invertedArray.forEach(function (val, i) {
      c = d[c][p[i % 8][val]];
    });
    return c === 0;
  },
  IR: function IR(str) {
    if (!str.match(/^\d{10}$/)) return false;
    str = "0000".concat(str).slice(str.length - 6);
    if (parseInt(str.slice(3, 9), 10) === 0) return false;
    var lastNumber = parseInt(str.slice(9, 10), 10);
    var sum = 0;

    for (var i = 0; i < 9; i++) {
      sum += parseInt(str.slice(i, i + 1), 10) * (10 - i);
    }

    sum %= 11;
    return sum < 2 && lastNumber === sum || sum >= 2 && lastNumber === 11 - sum;
  },
  IT: function IT(str) {
    if (str.length !== 9) return false;
    if (str === 'CA00000AA') return false; // https://it.wikipedia.org/wiki/Carta_d%27identit%C3%A0_elettronica_italiana

    return str.search(/C[A-Z][0-9]{5}[A-Z]{2}/i) > -1;
  },
  NO: function NO(str) {
    var sanitized = str.trim();
    if (isNaN(Number(sanitized))) return false;
    if (sanitized.length !== 11) return false;
    if (sanitized === '00000000000') return false; // https://no.wikipedia.org/wiki/F%C3%B8dselsnummer

    var f = sanitized.split('').map(Number);
    var k1 = (11 - (3 * f[0] + 7 * f[1] + 6 * f[2] + 1 * f[3] + 8 * f[4] + 9 * f[5] + 4 * f[6] + 5 * f[7] + 2 * f[8]) % 11) % 11;
    var k2 = (11 - (5 * f[0] + 4 * f[1] + 3 * f[2] + 2 * f[3] + 7 * f[4] + 6 * f[5] + 5 * f[6] + 4 * f[7] + 3 * f[8] + 2 * k1) % 11) % 11;
    if (k1 !== f[9] || k2 !== f[10]) return false;
    return true;
  },
  TH: function TH(str) {
    if (!str.match(/^[1-8]\d{12}$/)) return false; // validate check digit

    var sum = 0;

    for (var i = 0; i < 12; i++) {
      sum += parseInt(str[i], 10) * (13 - i);
    }

    return str[12] === ((11 - sum % 11) % 10).toString();
  },
  LK: function LK(str) {
    var old_nic = /^[1-9]\d{8}[vx]$/i;
    var new_nic = /^[1-9]\d{11}$/i;
    if (str.length === 10 && old_nic.test(str)) return true;else if (str.length === 12 && new_nic.test(str)) return true;
    return false;
  },
  'he-IL': function heIL(str) {
    var DNI = /^\d{9}$/; // sanitize user input

    var sanitized = str.trim(); // validate the data structure

    if (!DNI.test(sanitized)) {
      return false;
    }

    var id = sanitized;
    var sum = 0,
        incNum;

    for (var i = 0; i < id.length; i++) {
      incNum = Number(id[i]) * (i % 2 + 1); // Multiply number by 1 or 2

      sum += incNum > 9 ? incNum - 9 : incNum; // Sum the digits up and add to total
    }

    return sum % 10 === 0;
  },
  'ar-LY': function arLY(str) {
    // Libya National Identity Number NIN is 12 digits, the first digit is either 1 or 2
    var NIN = /^(1|2)\d{11}$/; // sanitize user input

    var sanitized = str.trim(); // validate the data structure

    if (!NIN.test(sanitized)) {
      return false;
    }

    return true;
  },
  'ar-TN': function arTN(str) {
    var DNI = /^\d{8}$/; // sanitize user input

    var sanitized = str.trim(); // validate the data structure

    if (!DNI.test(sanitized)) {
      return false;
    }

    return true;
  },
  'zh-CN': function zhCN(str) {
    var provincesAndCities = ['11', // 北京
    '12', // 天津
    '13', // 河北
    '14', // 山西
    '15', // 内蒙古
    '21', // 辽宁
    '22', // 吉林
    '23', // 黑龙江
    '31', // 上海
    '32', // 江苏
    '33', // 浙江
    '34', // 安徽
    '35', // 福建
    '36', // 江西
    '37', // 山东
    '41', // 河南
    '42', // 湖北
    '43', // 湖南
    '44', // 广东
    '45', // 广西
    '46', // 海南
    '50', // 重庆
    '51', // 四川
    '52', // 贵州
    '53', // 云南
    '54', // 西藏
    '61', // 陕西
    '62', // 甘肃
    '63', // 青海
    '64', // 宁夏
    '65', // 新疆
    '71', // 台湾
    '81', // 香港
    '82', // 澳门
    '91' // 国外
    ];
    var powers = ['7', '9', '10', '5', '8', '4', '2', '1', '6', '3', '7', '9', '10', '5', '8', '4', '2'];
    var parityBit = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

    var checkAddressCode = function checkAddressCode(addressCode) {
      return provincesAndCities.includes(addressCode);
    };

    var checkBirthDayCode = function checkBirthDayCode(birDayCode) {
      var yyyy = parseInt(birDayCode.substring(0, 4), 10);
      var mm = parseInt(birDayCode.substring(4, 6), 10);
      var dd = parseInt(birDayCode.substring(6), 10);
      var xdata = new Date(yyyy, mm - 1, dd);

      if (xdata > new Date()) {
        return false; // eslint-disable-next-line max-len
      } else if (xdata.getFullYear() === yyyy && xdata.getMonth() === mm - 1 && xdata.getDate() === dd) {
        return true;
      }

      return false;
    };

    var getParityBit = function getParityBit(idCardNo) {
      var id17 = idCardNo.substring(0, 17);
      var power = 0;

      for (var i = 0; i < 17; i++) {
        power += parseInt(id17.charAt(i), 10) * parseInt(powers[i], 10);
      }

      var mod = power % 11;
      return parityBit[mod];
    };

    var checkParityBit = function checkParityBit(idCardNo) {
      return getParityBit(idCardNo) === idCardNo.charAt(17).toUpperCase();
    };

    var check15IdCardNo = function check15IdCardNo(idCardNo) {
      var check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(idCardNo);
      if (!check) return false;
      var addressCode = idCardNo.substring(0, 2);
      check = checkAddressCode(addressCode);
      if (!check) return false;
      var birDayCode = "19".concat(idCardNo.substring(6, 12));
      check = checkBirthDayCode(birDayCode);
      if (!check) return false;
      return true;
    };

    var check18IdCardNo = function check18IdCardNo(idCardNo) {
      var check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(idCardNo);
      if (!check) return false;
      var addressCode = idCardNo.substring(0, 2);
      check = checkAddressCode(addressCode);
      if (!check) return false;
      var birDayCode = idCardNo.substring(6, 14);
      check = checkBirthDayCode(birDayCode);
      if (!check) return false;
      return checkParityBit(idCardNo);
    };

    var checkIdCardNo = function checkIdCardNo(idCardNo) {
      var check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo);
      if (!check) return false;

      if (idCardNo.length === 15) {
        return check15IdCardNo(idCardNo);
      }

      return check18IdCardNo(idCardNo);
    };

    return checkIdCardNo(str);
  },
  'zh-HK': function zhHK(str) {
    // sanitize user input
    str = str.trim(); // HKID number starts with 1 or 2 letters, followed by 6 digits,
    // then a checksum contained in square / round brackets or nothing

    var regexHKID = /^[A-Z]{1,2}[0-9]{6}((\([0-9A]\))|(\[[0-9A]\])|([0-9A]))$/;
    var regexIsDigit = /^[0-9]$/; // convert the user input to all uppercase and apply regex

    str = str.toUpperCase();
    if (!regexHKID.test(str)) return false;
    str = str.replace(/\[|\]|\(|\)/g, '');
    if (str.length === 8) str = "3".concat(str);
    var checkSumVal = 0;

    for (var i = 0; i <= 7; i++) {
      var convertedChar = void 0;
      if (!regexIsDigit.test(str[i])) convertedChar = (str[i].charCodeAt(0) - 55) % 11;else convertedChar = str[i];
      checkSumVal += convertedChar * (9 - i);
    }

    checkSumVal %= 11;
    var checkSumConverted;
    if (checkSumVal === 0) checkSumConverted = '0';else if (checkSumVal === 1) checkSumConverted = 'A';else checkSumConverted = String(11 - checkSumVal);
    if (checkSumConverted === str[str.length - 1]) return true;
    return false;
  },
  'zh-TW': function zhTW(str) {
    var ALPHABET_CODES = {
      A: 10,
      B: 11,
      C: 12,
      D: 13,
      E: 14,
      F: 15,
      G: 16,
      H: 17,
      I: 34,
      J: 18,
      K: 19,
      L: 20,
      M: 21,
      N: 22,
      O: 35,
      P: 23,
      Q: 24,
      R: 25,
      S: 26,
      T: 27,
      U: 28,
      V: 29,
      W: 32,
      X: 30,
      Y: 31,
      Z: 33
    };
    var sanitized = str.trim().toUpperCase();
    if (!/^[A-Z][0-9]{9}$/.test(sanitized)) return false;
    return Array.from(sanitized).reduce(function (sum, number, index) {
      if (index === 0) {
        var code = ALPHABET_CODES[number];
        return code % 10 * 9 + Math.floor(code / 10);
      }

      if (index === 9) {
        return (10 - sum % 10 - Number(number)) % 10 === 0;
      }

      return sum + Number(number) * (9 - index);
    }, 0);
  }
};

function isIdentityCard(str, locale) {
  (0, _assertString.default)(str);

  if (locale in validators) {
    return validators[locale](str);
  } else if (locale === 'any') {
    for (var key in validators) {
      // https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md#ignoring-code-for-coverage-purposes
      // istanbul ignore else
      if (validators.hasOwnProperty(key)) {
        var validator = validators[key];

        if (validator(str)) {
          return true;
        }
      }
    }

    return false;
  }

  throw new Error("Invalid locale '".concat(locale, "'"));
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isIn.js":
/*!********************************************!*\
  !*** ./node_modules/validator/lib/isIn.js ***!
  \********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isIn;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _toString = _interopRequireDefault(__webpack_require__(/*! ./util/toString */ "./node_modules/validator/lib/util/toString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isIn(str, options) {
  (0, _assertString.default)(str);
  var i;

  if (Object.prototype.toString.call(options) === '[object Array]') {
    var array = [];

    for (i in options) {
      // https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md#ignoring-code-for-coverage-purposes
      // istanbul ignore else
      if ({}.hasOwnProperty.call(options, i)) {
        array[i] = (0, _toString.default)(options[i]);
      }
    }

    return array.indexOf(str) >= 0;
  } else if (_typeof(options) === 'object') {
    return options.hasOwnProperty(str);
  } else if (options && typeof options.indexOf === 'function') {
    return options.indexOf(str) >= 0;
  }

  return false;
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isInt.js":
/*!*********************************************!*\
  !*** ./node_modules/validator/lib/isInt.js ***!
  \*********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isInt;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var int = /^(?:[-+]?(?:0|[1-9][0-9]*))$/;
var intLeadingZeroes = /^[-+]?[0-9]+$/;

function isInt(str, options) {
  (0, _assertString.default)(str);
  options = options || {}; // Get the regex to use for testing, based on whether
  // leading zeroes are allowed or not.

  var regex = options.hasOwnProperty('allow_leading_zeroes') && !options.allow_leading_zeroes ? int : intLeadingZeroes; // Check min/max/lt/gt

  var minCheckPassed = !options.hasOwnProperty('min') || str >= options.min;
  var maxCheckPassed = !options.hasOwnProperty('max') || str <= options.max;
  var ltCheckPassed = !options.hasOwnProperty('lt') || str < options.lt;
  var gtCheckPassed = !options.hasOwnProperty('gt') || str > options.gt;
  return regex.test(str) && minCheckPassed && maxCheckPassed && ltCheckPassed && gtCheckPassed;
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isJSON.js":
/*!**********************************************!*\
  !*** ./node_modules/validator/lib/isJSON.js ***!
  \**********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isJSON;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _merge = _interopRequireDefault(__webpack_require__(/*! ./util/merge */ "./node_modules/validator/lib/util/merge.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var default_json_options = {
  allow_primitives: false
};

function isJSON(str, options) {
  (0, _assertString.default)(str);

  try {
    options = (0, _merge.default)(options, default_json_options);
    var primitives = [];

    if (options.allow_primitives) {
      primitives = [null, false, true];
    }

    var obj = JSON.parse(str);
    return primitives.includes(obj) || !!obj && _typeof(obj) === 'object';
  } catch (e) {
    /* ignore */
  }

  return false;
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isJWT.js":
/*!*********************************************!*\
  !*** ./node_modules/validator/lib/isJWT.js ***!
  \*********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isJWT;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _isBase = _interopRequireDefault(__webpack_require__(/*! ./isBase64 */ "./node_modules/validator/lib/isBase64.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isJWT(str) {
  (0, _assertString.default)(str);
  var dotSplit = str.split('.');
  var len = dotSplit.length;

  if (len > 3 || len < 2) {
    return false;
  }

  return dotSplit.reduce(function (acc, currElem) {
    return acc && (0, _isBase.default)(currElem, {
      urlSafe: true
    });
  }, true);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isLatLong.js":
/*!*************************************************!*\
  !*** ./node_modules/validator/lib/isLatLong.js ***!
  \*************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isLatLong;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _merge = _interopRequireDefault(__webpack_require__(/*! ./util/merge */ "./node_modules/validator/lib/util/merge.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lat = /^\(?[+-]?(90(\.0+)?|[1-8]?\d(\.\d+)?)$/;
var long = /^\s?[+-]?(180(\.0+)?|1[0-7]\d(\.\d+)?|\d{1,2}(\.\d+)?)\)?$/;
var latDMS = /^(([1-8]?\d)\D+([1-5]?\d|60)\D+([1-5]?\d|60)(\.\d+)?|90\D+0\D+0)\D+[NSns]?$/i;
var longDMS = /^\s*([1-7]?\d{1,2}\D+([1-5]?\d|60)\D+([1-5]?\d|60)(\.\d+)?|180\D+0\D+0)\D+[EWew]?$/i;
var defaultLatLongOptions = {
  checkDMS: false
};

function isLatLong(str, options) {
  (0, _assertString.default)(str);
  options = (0, _merge.default)(options, defaultLatLongOptions);
  if (!str.includes(',')) return false;
  var pair = str.split(',');
  if (pair[0].startsWith('(') && !pair[1].endsWith(')') || pair[1].endsWith(')') && !pair[0].startsWith('(')) return false;

  if (options.checkDMS) {
    return latDMS.test(pair[0]) && longDMS.test(pair[1]);
  }

  return lat.test(pair[0]) && long.test(pair[1]);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isLength.js":
/*!************************************************!*\
  !*** ./node_modules/validator/lib/isLength.js ***!
  \************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isLength;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-disable prefer-rest-params */
function isLength(str, options) {
  (0, _assertString.default)(str);
  var min;
  var max;

  if (_typeof(options) === 'object') {
    min = options.min || 0;
    max = options.max;
  } else {
    // backwards compatibility: isLength(str, min [, max])
    min = arguments[1] || 0;
    max = arguments[2];
  }

  var presentationSequences = str.match(/(\uFE0F|\uFE0E)/g) || [];
  var surrogatePairs = str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
  var len = str.length - presentationSequences.length - surrogatePairs.length;
  return len >= min && (typeof max === 'undefined' || len <= max);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isLicensePlate.js":
/*!******************************************************!*\
  !*** ./node_modules/validator/lib/isLicensePlate.js ***!
  \******************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isLicensePlate;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validators = {
  'cs-CZ': function csCZ(str) {
    return /^(([ABCDEFHIJKLMNPRSTUVXYZ]|[0-9])-?){5,8}$/.test(str);
  },
  'de-DE': function deDE(str) {
    return /^((A|AA|AB|AC|AE|AH|AK|AM|AN|AÖ|AP|AS|AT|AU|AW|AZ|B|BA|BB|BC|BE|BF|BH|BI|BK|BL|BM|BN|BO|BÖ|BS|BT|BZ|C|CA|CB|CE|CO|CR|CW|D|DA|DD|DE|DH|DI|DL|DM|DN|DO|DU|DW|DZ|E|EA|EB|ED|EE|EF|EG|EH|EI|EL|EM|EN|ER|ES|EU|EW|F|FB|FD|FF|FG|FI|FL|FN|FO|FR|FS|FT|FÜ|FW|FZ|G|GA|GC|GD|GE|GF|GG|GI|GK|GL|GM|GN|GÖ|GP|GR|GS|GT|GÜ|GV|GW|GZ|H|HA|HB|HC|HD|HE|HF|HG|HH|HI|HK|HL|HM|HN|HO|HP|HR|HS|HU|HV|HX|HY|HZ|IK|IL|IN|IZ|J|JE|JL|K|KA|KB|KC|KE|KF|KG|KH|KI|KK|KL|KM|KN|KO|KR|KS|KT|KU|KW|KY|L|LA|LB|LC|LD|LF|LG|LH|LI|LL|LM|LN|LÖ|LP|LR|LU|M|MA|MB|MC|MD|ME|MG|MH|MI|MK|ML|MM|MN|MO|MQ|MR|MS|MÜ|MW|MY|MZ|N|NB|ND|NE|NF|NH|NI|NK|NM|NÖ|NP|NR|NT|NU|NW|NY|NZ|OA|OB|OC|OD|OE|OF|OG|OH|OK|OL|OP|OS|OZ|P|PA|PB|PE|PF|PI|PL|PM|PN|PR|PS|PW|PZ|R|RA|RC|RD|RE|RG|RH|RI|RL|RM|RN|RO|RP|RS|RT|RU|RV|RW|RZ|S|SB|SC|SE|SG|SI|SK|SL|SM|SN|SO|SP|SR|ST|SU|SW|SY|SZ|TE|TF|TG|TO|TP|TR|TS|TT|TÜ|ÜB|UE|UH|UL|UM|UN|V|VB|VG|VK|VR|VS|W|WA|WB|WE|WF|WI|WK|WL|WM|WN|WO|WR|WS|WT|WÜ|WW|WZ|Z|ZE|ZI|ZP|ZR|ZW|ZZ)[- ]?[A-Z]{1,2}[- ]?\d{1,4}|(ABG|ABI|AIB|AIC|ALF|ALZ|ANA|ANG|ANK|APD|ARN|ART|ASL|ASZ|AUR|AZE|BAD|BAR|BBG|BCH|BED|BER|BGD|BGL|BID|BIN|BIR|BIT|BIW|BKS|BLB|BLK|BNA|BOG|BOH|BOR|BOT|BRA|BRB|BRG|BRK|BRL|BRV|BSB|BSK|BTF|BÜD|BUL|BÜR|BÜS|BÜZ|CAS|CHA|CLP|CLZ|COC|COE|CUX|DAH|DAN|DAU|DBR|DEG|DEL|DGF|DIL|DIN|DIZ|DKB|DLG|DON|DUD|DÜW|EBE|EBN|EBS|ECK|EIC|EIL|EIN|EIS|EMD|EMS|ERB|ERH|ERK|ERZ|ESB|ESW|FDB|FDS|FEU|FFB|FKB|FLÖ|FOR|FRG|FRI|FRW|FTL|FÜS|GAN|GAP|GDB|GEL|GEO|GER|GHA|GHC|GLA|GMN|GNT|GOA|GOH|GRA|GRH|GRI|GRM|GRZ|GTH|GUB|GUN|GVM|HAB|HAL|HAM|HAS|HBN|HBS|HCH|HDH|HDL|HEB|HEF|HEI|HER|HET|HGN|HGW|HHM|HIG|HIP|HMÜ|HOG|HOH|HOL|HOM|HOR|HÖS|HOT|HRO|HSK|HST|HVL|HWI|IGB|ILL|JÜL|KEH|KEL|KEM|KIB|KLE|KLZ|KÖN|KÖT|KÖZ|KRU|KÜN|KUS|KYF|LAN|LAU|LBS|LBZ|LDK|LDS|LEO|LER|LEV|LIB|LIF|LIP|LÖB|LOS|LRO|LSZ|LÜN|LUP|LWL|MAB|MAI|MAK|MAL|MED|MEG|MEI|MEK|MEL|MER|MET|MGH|MGN|MHL|MIL|MKK|MOD|MOL|MON|MOS|MSE|MSH|MSP|MST|MTK|MTL|MÜB|MÜR|MYK|MZG|NAB|NAI|NAU|NDH|NEA|NEB|NEC|NEN|NES|NEW|NMB|NMS|NOH|NOL|NOM|NOR|NVP|NWM|OAL|OBB|OBG|OCH|OHA|ÖHR|OHV|OHZ|OPR|OSL|OVI|OVL|OVP|PAF|PAN|PAR|PCH|PEG|PIR|PLÖ|PRÜ|QFT|QLB|RDG|REG|REH|REI|RID|RIE|ROD|ROF|ROK|ROL|ROS|ROT|ROW|RSL|RÜD|RÜG|SAB|SAD|SAN|SAW|SBG|SBK|SCZ|SDH|SDL|SDT|SEB|SEE|SEF|SEL|SFB|SFT|SGH|SHA|SHG|SHK|SHL|SIG|SIM|SLE|SLF|SLK|SLN|SLS|SLÜ|SLZ|SMÜ|SOB|SOG|SOK|SÖM|SON|SPB|SPN|SRB|SRO|STA|STB|STD|STE|STL|SUL|SÜW|SWA|SZB|TBB|TDO|TET|TIR|TÖL|TUT|UEM|UER|UFF|USI|VAI|VEC|VER|VIB|VIE|VIT|VOH|WAF|WAK|WAN|WAR|WAT|WBS|WDA|WEL|WEN|WER|WES|WHV|WIL|WIS|WIT|WIZ|WLG|WMS|WND|WOB|WOH|WOL|WOR|WOS|WRN|WSF|WST|WSW|WTL|WTM|WUG|WÜM|WUN|WUR|WZL|ZEL|ZIG)[- ]?(([A-Z][- ]?\d{1,4})|([A-Z]{2}[- ]?\d{1,3})))[- ]?(E|H)?$/.test(str);
  },
  'de-LI': function deLI(str) {
    return /^FL[- ]?\d{1,5}[UZ]?$/.test(str);
  },
  'en-IN': function enIN(str) {
    return /^[A-Z]{2}[ -]?[0-9]{1,2}(?:[ -]?[A-Z])(?:[ -]?[A-Z]*)?[ -]?[0-9]{4}$/.test(str);
  },
  'es-AR': function esAR(str) {
    return /^(([A-Z]{2} ?[0-9]{3} ?[A-Z]{2})|([A-Z]{3} ?[0-9]{3}))$/.test(str);
  },
  'fi-FI': function fiFI(str) {
    return /^(?=.{4,7})(([A-Z]{1,3}|[0-9]{1,3})[\s-]?([A-Z]{1,3}|[0-9]{1,5}))$/.test(str);
  },
  'hu-HU': function huHU(str) {
    return /^((((?!AAA)(([A-NPRSTVZWXY]{1})([A-PR-Z]{1})([A-HJ-NPR-Z]))|(A[ABC]I)|A[ABC]O|A[A-W]Q|BPI|BPO|UCO|UDO|XAO)-(?!000)\d{3})|(M\d{6})|((CK|DT|CD|HC|H[ABEFIKLMNPRSTVX]|MA|OT|R[A-Z]) \d{2}-\d{2})|(CD \d{3}-\d{3})|(C-(C|X) \d{4})|(X-(A|B|C) \d{4})|(([EPVZ]-\d{5}))|(S A[A-Z]{2} \d{2})|(SP \d{2}-\d{2}))$/.test(str);
  },
  'pt-BR': function ptBR(str) {
    return /^[A-Z]{3}[ -]?[0-9][A-Z][0-9]{2}|[A-Z]{3}[ -]?[0-9]{4}$/.test(str);
  },
  'pt-PT': function ptPT(str) {
    return /^([A-Z]{2}|[0-9]{2})[ -·]?([A-Z]{2}|[0-9]{2})[ -·]?([A-Z]{2}|[0-9]{2})$/.test(str);
  },
  'sq-AL': function sqAL(str) {
    return /^[A-Z]{2}[- ]?((\d{3}[- ]?(([A-Z]{2})|T))|(R[- ]?\d{3}))$/.test(str);
  },
  'sv-SE': function svSE(str) {
    return /^[A-HJ-PR-UW-Z]{3} ?[\d]{2}[A-HJ-PR-UW-Z1-9]$|(^[A-ZÅÄÖ ]{2,7}$)/.test(str.trim());
  }
};

function isLicensePlate(str, locale) {
  (0, _assertString.default)(str);

  if (locale in validators) {
    return validators[locale](str);
  } else if (locale === 'any') {
    for (var key in validators) {
      /* eslint guard-for-in: 0 */
      var validator = validators[key];

      if (validator(str)) {
        return true;
      }
    }

    return false;
  }

  throw new Error("Invalid locale '".concat(locale, "'"));
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isLocale.js":
/*!************************************************!*\
  !*** ./node_modules/validator/lib/isLocale.js ***!
  \************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isLocale;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var localeReg = /^[A-Za-z]{2,4}([_-]([A-Za-z]{4}|[\d]{3}))?([_-]([A-Za-z]{2}|[\d]{3}))?$/;

function isLocale(str) {
  (0, _assertString.default)(str);

  if (str === 'en_US_POSIX' || str === 'ca_ES_VALENCIA') {
    return true;
  }

  return localeReg.test(str);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isLowercase.js":
/*!***************************************************!*\
  !*** ./node_modules/validator/lib/isLowercase.js ***!
  \***************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isLowercase;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isLowercase(str) {
  (0, _assertString.default)(str);
  return str === str.toLowerCase();
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isLuhnNumber.js":
/*!****************************************************!*\
  !*** ./node_modules/validator/lib/isLuhnNumber.js ***!
  \****************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isLuhnNumber;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isLuhnNumber(str) {
  (0, _assertString.default)(str);
  var sanitized = str.replace(/[- ]+/g, '');
  var sum = 0;
  var digit;
  var tmpNum;
  var shouldDouble;

  for (var i = sanitized.length - 1; i >= 0; i--) {
    digit = sanitized.substring(i, i + 1);
    tmpNum = parseInt(digit, 10);

    if (shouldDouble) {
      tmpNum *= 2;

      if (tmpNum >= 10) {
        sum += tmpNum % 10 + 1;
      } else {
        sum += tmpNum;
      }
    } else {
      sum += tmpNum;
    }

    shouldDouble = !shouldDouble;
  }

  return !!(sum % 10 === 0 ? sanitized : false);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isMACAddress.js":
/*!****************************************************!*\
  !*** ./node_modules/validator/lib/isMACAddress.js ***!
  \****************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isMACAddress;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var macAddress48 = /^(?:[0-9a-fA-F]{2}([-:\s]))([0-9a-fA-F]{2}\1){4}([0-9a-fA-F]{2})$/;
var macAddress48NoSeparators = /^([0-9a-fA-F]){12}$/;
var macAddress48WithDots = /^([0-9a-fA-F]{4}\.){2}([0-9a-fA-F]{4})$/;
var macAddress64 = /^(?:[0-9a-fA-F]{2}([-:\s]))([0-9a-fA-F]{2}\1){6}([0-9a-fA-F]{2})$/;
var macAddress64NoSeparators = /^([0-9a-fA-F]){16}$/;
var macAddress64WithDots = /^([0-9a-fA-F]{4}\.){3}([0-9a-fA-F]{4})$/;

function isMACAddress(str, options) {
  (0, _assertString.default)(str);

  if (options !== null && options !== void 0 && options.eui) {
    options.eui = String(options.eui);
  }
  /**
   * @deprecated `no_colons` TODO: remove it in the next major
  */


  if (options !== null && options !== void 0 && options.no_colons || options !== null && options !== void 0 && options.no_separators) {
    if (options.eui === '48') {
      return macAddress48NoSeparators.test(str);
    }

    if (options.eui === '64') {
      return macAddress64NoSeparators.test(str);
    }

    return macAddress48NoSeparators.test(str) || macAddress64NoSeparators.test(str);
  }

  if ((options === null || options === void 0 ? void 0 : options.eui) === '48') {
    return macAddress48.test(str) || macAddress48WithDots.test(str);
  }

  if ((options === null || options === void 0 ? void 0 : options.eui) === '64') {
    return macAddress64.test(str) || macAddress64WithDots.test(str);
  }

  return isMACAddress(str, {
    eui: '48'
  }) || isMACAddress(str, {
    eui: '64'
  });
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isMD5.js":
/*!*********************************************!*\
  !*** ./node_modules/validator/lib/isMD5.js ***!
  \*********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isMD5;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var md5 = /^[a-f0-9]{32}$/;

function isMD5(str) {
  (0, _assertString.default)(str);
  return md5.test(str);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isMagnetURI.js":
/*!***************************************************!*\
  !*** ./node_modules/validator/lib/isMagnetURI.js ***!
  \***************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isMagnetURI;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var magnetURIComponent = /(?:^magnet:\?|[^?&]&)xt(?:\.1)?=urn:(?:(?:aich|bitprint|btih|ed2k|ed2khash|kzhash|md5|sha1|tree:tiger):[a-z0-9]{32}(?:[a-z0-9]{8})?|btmh:1220[a-z0-9]{64})(?:$|&)/i;

function isMagnetURI(url) {
  (0, _assertString.default)(url);

  if (url.indexOf('magnet:?') !== 0) {
    return false;
  }

  return magnetURIComponent.test(url);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isMimeType.js":
/*!**************************************************!*\
  !*** ./node_modules/validator/lib/isMimeType.js ***!
  \**************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isMimeType;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  Checks if the provided string matches to a correct Media type format (MIME type)

  This function only checks is the string format follows the
  etablished rules by the according RFC specifications.
  This function supports 'charset' in textual media types
  (https://tools.ietf.org/html/rfc6657).

  This function does not check against all the media types listed
  by the IANA (https://www.iana.org/assignments/media-types/media-types.xhtml)
  because of lightness purposes : it would require to include
  all these MIME types in this librairy, which would weigh it
  significantly. This kind of effort maybe is not worth for the use that
  this function has in this entire librairy.

  More informations in the RFC specifications :
  - https://tools.ietf.org/html/rfc2045
  - https://tools.ietf.org/html/rfc2046
  - https://tools.ietf.org/html/rfc7231#section-3.1.1.1
  - https://tools.ietf.org/html/rfc7231#section-3.1.1.5
*/
// Match simple MIME types
// NB :
//   Subtype length must not exceed 100 characters.
//   This rule does not comply to the RFC specs (what is the max length ?).
var mimeTypeSimple = /^(application|audio|font|image|message|model|multipart|text|video)\/[a-zA-Z0-9\.\-\+_]{1,100}$/i; // eslint-disable-line max-len
// Handle "charset" in "text/*"

var mimeTypeText = /^text\/[a-zA-Z0-9\.\-\+]{1,100};\s?charset=("[a-zA-Z0-9\.\-\+\s]{0,70}"|[a-zA-Z0-9\.\-\+]{0,70})(\s?\([a-zA-Z0-9\.\-\+\s]{1,20}\))?$/i; // eslint-disable-line max-len
// Handle "boundary" in "multipart/*"

var mimeTypeMultipart = /^multipart\/[a-zA-Z0-9\.\-\+]{1,100}(;\s?(boundary|charset)=("[a-zA-Z0-9\.\-\+\s]{0,70}"|[a-zA-Z0-9\.\-\+]{0,70})(\s?\([a-zA-Z0-9\.\-\+\s]{1,20}\))?){0,2}$/i; // eslint-disable-line max-len

function isMimeType(str) {
  (0, _assertString.default)(str);
  return mimeTypeSimple.test(str) || mimeTypeText.test(str) || mimeTypeMultipart.test(str);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isMobilePhone.js":
/*!*****************************************************!*\
  !*** ./node_modules/validator/lib/isMobilePhone.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isMobilePhone;
exports.locales = void 0;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable max-len */
var phones = {
  'am-AM': /^(\+?374|0)((10|[9|7][0-9])\d{6}$|[2-4]\d{7}$)/,
  'ar-AE': /^((\+?971)|0)?5[024568]\d{7}$/,
  'ar-BH': /^(\+?973)?(3|6)\d{7}$/,
  'ar-DZ': /^(\+?213|0)(5|6|7)\d{8}$/,
  'ar-LB': /^(\+?961)?((3|81)\d{6}|7\d{7})$/,
  'ar-EG': /^((\+?20)|0)?1[0125]\d{8}$/,
  'ar-IQ': /^(\+?964|0)?7[0-9]\d{8}$/,
  'ar-JO': /^(\+?962|0)?7[789]\d{7}$/,
  'ar-KW': /^(\+?965)([569]\d{7}|41\d{6})$/,
  'ar-LY': /^((\+?218)|0)?(9[1-6]\d{7}|[1-8]\d{7,9})$/,
  'ar-MA': /^(?:(?:\+|00)212|0)[5-7]\d{8}$/,
  'ar-OM': /^((\+|00)968)?(9[1-9])\d{6}$/,
  'ar-PS': /^(\+?970|0)5[6|9](\d{7})$/,
  'ar-SA': /^(!?(\+?966)|0)?5\d{8}$/,
  'ar-SY': /^(!?(\+?963)|0)?9\d{8}$/,
  'ar-TN': /^(\+?216)?[2459]\d{7}$/,
  'az-AZ': /^(\+994|0)(10|5[015]|7[07]|99)\d{7}$/,
  'bs-BA': /^((((\+|00)3876)|06))((([0-3]|[5-6])\d{6})|(4\d{7}))$/,
  'be-BY': /^(\+?375)?(24|25|29|33|44)\d{7}$/,
  'bg-BG': /^(\+?359|0)?8[789]\d{7}$/,
  'bn-BD': /^(\+?880|0)1[13456789][0-9]{8}$/,
  'ca-AD': /^(\+376)?[346]\d{5}$/,
  'cs-CZ': /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
  'da-DK': /^(\+?45)?\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/,
  'de-DE': /^((\+49|0)1)(5[0-25-9]\d|6([23]|0\d?)|7([0-57-9]|6\d))\d{7,9}$/,
  'de-AT': /^(\+43|0)\d{1,4}\d{3,12}$/,
  'de-CH': /^(\+41|0)([1-9])\d{1,9}$/,
  'de-LU': /^(\+352)?((6\d1)\d{6})$/,
  'dv-MV': /^(\+?960)?(7[2-9]|9[1-9])\d{5}$/,
  'el-GR': /^(\+?30|0)?6(8[5-9]|9(?![26])[0-9])\d{7}$/,
  'el-CY': /^(\+?357?)?(9(9|6)\d{6})$/,
  'en-AI': /^(\+?1|0)264(?:2(35|92)|4(?:6[1-2]|76|97)|5(?:3[6-9]|8[1-4])|7(?:2(4|9)|72))\d{4}$/,
  'en-AU': /^(\+?61|0)4\d{8}$/,
  'en-AG': /^(?:\+1|1)268(?:464|7(?:1[3-9]|[28]\d|3[0246]|64|7[0-689]))\d{4}$/,
  'en-BM': /^(\+?1)?441(((3|7)\d{6}$)|(5[0-3][0-9]\d{4}$)|(59\d{5}$))/,
  'en-BS': /^(\+?1[-\s]?|0)?\(?242\)?[-\s]?\d{3}[-\s]?\d{4}$/,
  'en-GB': /^(\+?44|0)7\d{9}$/,
  'en-GG': /^(\+?44|0)1481\d{6}$/,
  'en-GH': /^(\+233|0)(20|50|24|54|27|57|26|56|23|28|55|59)\d{7}$/,
  'en-GY': /^(\+592|0)6\d{6}$/,
  'en-HK': /^(\+?852[-\s]?)?[456789]\d{3}[-\s]?\d{4}$/,
  'en-MO': /^(\+?853[-\s]?)?[6]\d{3}[-\s]?\d{4}$/,
  'en-IE': /^(\+?353|0)8[356789]\d{7}$/,
  'en-IN': /^(\+?91|0)?[6789]\d{9}$/,
  'en-JM': /^(\+?876)?\d{7}$/,
  'en-KE': /^(\+?254|0)(7|1)\d{8}$/,
  'en-SS': /^(\+?211|0)(9[1257])\d{7}$/,
  'en-KI': /^((\+686|686)?)?( )?((6|7)(2|3|8)[0-9]{6})$/,
  'en-KN': /^(?:\+1|1)869(?:46\d|48[89]|55[6-8]|66\d|76[02-7])\d{4}$/,
  'en-LS': /^(\+?266)(22|28|57|58|59|27|52)\d{6}$/,
  'en-MT': /^(\+?356|0)?(99|79|77|21|27|22|25)[0-9]{6}$/,
  'en-MU': /^(\+?230|0)?\d{8}$/,
  'en-NA': /^(\+?264|0)(6|8)\d{7}$/,
  'en-NG': /^(\+?234|0)?[789]\d{9}$/,
  'en-NZ': /^(\+?64|0)[28]\d{7,9}$/,
  'en-PG': /^(\+?675|0)?(7\d|8[18])\d{6}$/,
  'en-PK': /^((00|\+)?92|0)3[0-6]\d{8}$/,
  'en-PH': /^(09|\+639)\d{9}$/,
  'en-RW': /^(\+?250|0)?[7]\d{8}$/,
  'en-SG': /^(\+65)?[3689]\d{7}$/,
  'en-SL': /^(\+?232|0)\d{8}$/,
  'en-TZ': /^(\+?255|0)?[67]\d{8}$/,
  'en-UG': /^(\+?256|0)?[7]\d{8}$/,
  'en-US': /^((\+1|1)?( |-)?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})( |-)?([2-9][0-9]{2}( |-)?[0-9]{4})$/,
  'en-ZA': /^(\+?27|0)\d{9}$/,
  'en-ZM': /^(\+?26)?09[567]\d{7}$/,
  'en-ZW': /^(\+263)[0-9]{9}$/,
  'en-BW': /^(\+?267)?(7[1-8]{1})\d{6}$/,
  'es-AR': /^\+?549(11|[2368]\d)\d{8}$/,
  'es-BO': /^(\+?591)?(6|7)\d{7}$/,
  'es-CO': /^(\+?57)?3(0(0|1|2|4|5)|1\d|2[0-4]|5(0|1))\d{7}$/,
  'es-CL': /^(\+?56|0)[2-9]\d{1}\d{7}$/,
  'es-CR': /^(\+506)?[2-8]\d{7}$/,
  'es-CU': /^(\+53|0053)?5\d{7}/,
  'es-DO': /^(\+?1)?8[024]9\d{7}$/,
  'es-HN': /^(\+?504)?[9|8|3|2]\d{7}$/,
  'es-EC': /^(\+?593|0)([2-7]|9[2-9])\d{7}$/,
  'es-ES': /^(\+?34)?[6|7]\d{8}$/,
  'es-PE': /^(\+?51)?9\d{8}$/,
  'es-MX': /^(\+?52)?(1|01)?\d{10,11}$/,
  'es-NI': /^(\+?505)\d{7,8}$/,
  'es-PA': /^(\+?507)\d{7,8}$/,
  'es-PY': /^(\+?595|0)9[9876]\d{7}$/,
  'es-SV': /^(\+?503)?[67]\d{7}$/,
  'es-UY': /^(\+598|0)9[1-9][\d]{6}$/,
  'es-VE': /^(\+?58)?(2|4)\d{9}$/,
  'et-EE': /^(\+?372)?\s?(5|8[1-4])\s?([0-9]\s?){6,7}$/,
  'fa-IR': /^(\+?98[\-\s]?|0)9[0-39]\d[\-\s]?\d{3}[\-\s]?\d{4}$/,
  'fi-FI': /^(\+?358|0)\s?(4[0-6]|50)\s?(\d\s?){4,8}$/,
  'fj-FJ': /^(\+?679)?\s?\d{3}\s?\d{4}$/,
  'fo-FO': /^(\+?298)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
  'fr-BF': /^(\+226|0)[67]\d{7}$/,
  'fr-BJ': /^(\+229)\d{8}$/,
  'fr-CD': /^(\+?243|0)?(8|9)\d{8}$/,
  'fr-CM': /^(\+?237)6[0-9]{8}$/,
  'fr-FR': /^(\+?33|0)[67]\d{8}$/,
  'fr-GF': /^(\+?594|0|00594)[67]\d{8}$/,
  'fr-GP': /^(\+?590|0|00590)[67]\d{8}$/,
  'fr-MQ': /^(\+?596|0|00596)[67]\d{8}$/,
  'fr-PF': /^(\+?689)?8[789]\d{6}$/,
  'fr-RE': /^(\+?262|0|00262)[67]\d{8}$/,
  'he-IL': /^(\+972|0)([23489]|5[012345689]|77)[1-9]\d{6}$/,
  'hu-HU': /^(\+?36|06)(20|30|31|50|70)\d{7}$/,
  'id-ID': /^(\+?62|0)8(1[123456789]|2[1238]|3[1238]|5[12356789]|7[78]|9[56789]|8[123456789])([\s?|\d]{5,11})$/,
  'ir-IR': /^(\+98|0)?9\d{9}$/,
  'it-IT': /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
  'it-SM': /^((\+378)|(0549)|(\+390549)|(\+3780549))?6\d{5,9}$/,
  'ja-JP': /^(\+81[ \-]?(\(0\))?|0)[6789]0[ \-]?\d{4}[ \-]?\d{4}$/,
  'ka-GE': /^(\+?995)?(79\d{7}|5\d{8})$/,
  'kk-KZ': /^(\+?7|8)?7\d{9}$/,
  'kl-GL': /^(\+?299)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
  'ko-KR': /^((\+?82)[ \-]?)?0?1([0|1|6|7|8|9]{1})[ \-]?\d{3,4}[ \-]?\d{4}$/,
  'ky-KG': /^(\+?7\s?\+?7|0)\s?\d{2}\s?\d{3}\s?\d{4}$/,
  'lt-LT': /^(\+370|8)\d{8}$/,
  'lv-LV': /^(\+?371)2\d{7}$/,
  'mg-MG': /^((\+?261|0)(2|3)\d)?\d{7}$/,
  'mn-MN': /^(\+|00|011)?976(77|81|88|91|94|95|96|99)\d{6}$/,
  'my-MM': /^(\+?959|09|9)(2[5-7]|3[1-2]|4[0-5]|6[6-9]|7[5-9]|9[6-9])[0-9]{7}$/,
  'ms-MY': /^(\+?60|0)1(([0145](-|\s)?\d{7,8})|([236-9](-|\s)?\d{7}))$/,
  'mz-MZ': /^(\+?258)?8[234567]\d{7}$/,
  'nb-NO': /^(\+?47)?[49]\d{7}$/,
  'ne-NP': /^(\+?977)?9[78]\d{8}$/,
  'nl-BE': /^(\+?32|0)4\d{8}$/,
  'nl-NL': /^(((\+|00)?31\(0\))|((\+|00)?31)|0)6{1}\d{8}$/,
  'nl-AW': /^(\+)?297(56|59|64|73|74|99)\d{5}$/,
  'nn-NO': /^(\+?47)?[49]\d{7}$/,
  'pl-PL': /^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/,
  'pt-BR': /^((\+?55\ ?[1-9]{2}\ ?)|(\+?55\ ?\([1-9]{2}\)\ ?)|(0[1-9]{2}\ ?)|(\([1-9]{2}\)\ ?)|([1-9]{2}\ ?))((\d{4}\-?\d{4})|(9[1-9]{1}\d{3}\-?\d{4}))$/,
  'pt-PT': /^(\+?351)?9[1236]\d{7}$/,
  'pt-AO': /^(\+244)\d{9}$/,
  'ro-MD': /^(\+?373|0)((6(0|1|2|6|7|8|9))|(7(6|7|8|9)))\d{6}$/,
  'ro-RO': /^(\+?40|0)\s?7\d{2}(\/|\s|\.|-)?\d{3}(\s|\.|-)?\d{3}$/,
  'ru-RU': /^(\+?7|8)?9\d{9}$/,
  'si-LK': /^(?:0|94|\+94)?(7(0|1|2|4|5|6|7|8)( |-)?)\d{7}$/,
  'sl-SI': /^(\+386\s?|0)(\d{1}\s?\d{3}\s?\d{2}\s?\d{2}|\d{2}\s?\d{3}\s?\d{3})$/,
  'sk-SK': /^(\+?421)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
  'sq-AL': /^(\+355|0)6[789]\d{6}$/,
  'sr-RS': /^(\+3816|06)[- \d]{5,9}$/,
  'sv-SE': /^(\+?46|0)[\s\-]?7[\s\-]?[02369]([\s\-]?\d){7}$/,
  'tg-TJ': /^(\+?992)?[5][5]\d{7}$/,
  'th-TH': /^(\+66|66|0)\d{9}$/,
  'tr-TR': /^(\+?90|0)?5\d{9}$/,
  'tk-TM': /^(\+993|993|8)\d{8}$/,
  'uk-UA': /^(\+?38|8)?0\d{9}$/,
  'uz-UZ': /^(\+?998)?(6[125-79]|7[1-69]|88|9\d)\d{7}$/,
  'vi-VN': /^((\+?84)|0)((3([2-9]))|(5([25689]))|(7([0|6-9]))|(8([1-9]))|(9([0-9])))([0-9]{7})$/,
  'zh-CN': /^((\+|00)86)?(1[3-9]|9[28])\d{9}$/,
  'zh-TW': /^(\+?886\-?|0)?9\d{8}$/,
  'dz-BT': /^(\+?975|0)?(17|16|77|02)\d{6}$/,
  'ar-YE': /^(((\+|00)9677|0?7)[0137]\d{7}|((\+|00)967|0)[1-7]\d{6})$/,
  'ar-EH': /^(\+?212|0)[\s\-]?(5288|5289)[\s\-]?\d{5}$/,
  'fa-AF': /^(\+93|0)?(2{1}[0-8]{1}|[3-5]{1}[0-4]{1})(\d{7})$/
};
/* eslint-enable max-len */
// aliases

phones['en-CA'] = phones['en-US'];
phones['fr-CA'] = phones['en-CA'];
phones['fr-BE'] = phones['nl-BE'];
phones['zh-HK'] = phones['en-HK'];
phones['zh-MO'] = phones['en-MO'];
phones['ga-IE'] = phones['en-IE'];
phones['fr-CH'] = phones['de-CH'];
phones['it-CH'] = phones['fr-CH'];

function isMobilePhone(str, locale, options) {
  (0, _assertString.default)(str);

  if (options && options.strictMode && !str.startsWith('+')) {
    return false;
  }

  if (Array.isArray(locale)) {
    return locale.some(function (key) {
      // https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md#ignoring-code-for-coverage-purposes
      // istanbul ignore else
      if (phones.hasOwnProperty(key)) {
        var phone = phones[key];

        if (phone.test(str)) {
          return true;
        }
      }

      return false;
    });
  } else if (locale in phones) {
    return phones[locale].test(str); // alias falsey locale as 'any'
  } else if (!locale || locale === 'any') {
    for (var key in phones) {
      // istanbul ignore else
      if (phones.hasOwnProperty(key)) {
        var phone = phones[key];

        if (phone.test(str)) {
          return true;
        }
      }
    }

    return false;
  }

  throw new Error("Invalid locale '".concat(locale, "'"));
}

var locales = Object.keys(phones);
exports.locales = locales;

/***/ }),

/***/ "./node_modules/validator/lib/isMongoId.js":
/*!*************************************************!*\
  !*** ./node_modules/validator/lib/isMongoId.js ***!
  \*************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isMongoId;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _isHexadecimal = _interopRequireDefault(__webpack_require__(/*! ./isHexadecimal */ "./node_modules/validator/lib/isHexadecimal.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isMongoId(str) {
  (0, _assertString.default)(str);
  return (0, _isHexadecimal.default)(str) && str.length === 24;
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isMultibyte.js":
/*!***************************************************!*\
  !*** ./node_modules/validator/lib/isMultibyte.js ***!
  \***************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isMultibyte;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-control-regex */
var multibyte = /[^\x00-\x7F]/;
/* eslint-enable no-control-regex */

function isMultibyte(str) {
  (0, _assertString.default)(str);
  return multibyte.test(str);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isNumeric.js":
/*!*************************************************!*\
  !*** ./node_modules/validator/lib/isNumeric.js ***!
  \*************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isNumeric;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _alpha = __webpack_require__(/*! ./alpha */ "./node_modules/validator/lib/alpha.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var numericNoSymbols = /^[0-9]+$/;

function isNumeric(str, options) {
  (0, _assertString.default)(str);

  if (options && options.no_symbols) {
    return numericNoSymbols.test(str);
  }

  return new RegExp("^[+-]?([0-9]*[".concat((options || {}).locale ? _alpha.decimal[options.locale] : '.', "])?[0-9]+$")).test(str);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isOctal.js":
/*!***********************************************!*\
  !*** ./node_modules/validator/lib/isOctal.js ***!
  \***********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isOctal;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var octal = /^(0o)?[0-7]+$/i;

function isOctal(str) {
  (0, _assertString.default)(str);
  return octal.test(str);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isPassportNumber.js":
/*!********************************************************!*\
  !*** ./node_modules/validator/lib/isPassportNumber.js ***!
  \********************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isPassportNumber;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Reference:
 * https://en.wikipedia.org/ -- Wikipedia
 * https://docs.microsoft.com/en-us/microsoft-365/compliance/eu-passport-number -- EU Passport Number
 * https://countrycode.org/ -- Country Codes
 */
var passportRegexByCountryCode = {
  AM: /^[A-Z]{2}\d{7}$/,
  // ARMENIA
  AR: /^[A-Z]{3}\d{6}$/,
  // ARGENTINA
  AT: /^[A-Z]\d{7}$/,
  // AUSTRIA
  AU: /^[A-Z]\d{7}$/,
  // AUSTRALIA
  AZ: /^[A-Z]{2,3}\d{7,8}$/,
  // AZERBAIJAN
  BE: /^[A-Z]{2}\d{6}$/,
  // BELGIUM
  BG: /^\d{9}$/,
  // BULGARIA
  BR: /^[A-Z]{2}\d{6}$/,
  // BRAZIL
  BY: /^[A-Z]{2}\d{7}$/,
  // BELARUS
  CA: /^[A-Z]{2}\d{6}$/,
  // CANADA
  CH: /^[A-Z]\d{7}$/,
  // SWITZERLAND
  CN: /^G\d{8}$|^E(?![IO])[A-Z0-9]\d{7}$/,
  // CHINA [G=Ordinary, E=Electronic] followed by 8-digits, or E followed by any UPPERCASE letter (except I and O) followed by 7 digits
  CY: /^[A-Z](\d{6}|\d{8})$/,
  // CYPRUS
  CZ: /^\d{8}$/,
  // CZECH REPUBLIC
  DE: /^[CFGHJKLMNPRTVWXYZ0-9]{9}$/,
  // GERMANY
  DK: /^\d{9}$/,
  // DENMARK
  DZ: /^\d{9}$/,
  // ALGERIA
  EE: /^([A-Z]\d{7}|[A-Z]{2}\d{7})$/,
  // ESTONIA (K followed by 7-digits), e-passports have 2 UPPERCASE followed by 7 digits
  ES: /^[A-Z0-9]{2}([A-Z0-9]?)\d{6}$/,
  // SPAIN
  FI: /^[A-Z]{2}\d{7}$/,
  // FINLAND
  FR: /^\d{2}[A-Z]{2}\d{5}$/,
  // FRANCE
  GB: /^\d{9}$/,
  // UNITED KINGDOM
  GR: /^[A-Z]{2}\d{7}$/,
  // GREECE
  HR: /^\d{9}$/,
  // CROATIA
  HU: /^[A-Z]{2}(\d{6}|\d{7})$/,
  // HUNGARY
  IE: /^[A-Z0-9]{2}\d{7}$/,
  // IRELAND
  IN: /^[A-Z]{1}-?\d{7}$/,
  // INDIA
  ID: /^[A-C]\d{7}$/,
  // INDONESIA
  IR: /^[A-Z]\d{8}$/,
  // IRAN
  IS: /^(A)\d{7}$/,
  // ICELAND
  IT: /^[A-Z0-9]{2}\d{7}$/,
  // ITALY
  JM: /^[Aa]\d{7}$/,
  // JAMAICA
  JP: /^[A-Z]{2}\d{7}$/,
  // JAPAN
  KR: /^[MS]\d{8}$/,
  // SOUTH KOREA, REPUBLIC OF KOREA, [S=PS Passports, M=PM Passports]
  KZ: /^[a-zA-Z]\d{7}$/,
  // KAZAKHSTAN
  LI: /^[a-zA-Z]\d{5}$/,
  // LIECHTENSTEIN
  LT: /^[A-Z0-9]{8}$/,
  // LITHUANIA
  LU: /^[A-Z0-9]{8}$/,
  // LUXEMBURG
  LV: /^[A-Z0-9]{2}\d{7}$/,
  // LATVIA
  LY: /^[A-Z0-9]{8}$/,
  // LIBYA
  MT: /^\d{7}$/,
  // MALTA
  MZ: /^([A-Z]{2}\d{7})|(\d{2}[A-Z]{2}\d{5})$/,
  // MOZAMBIQUE
  MY: /^[AHK]\d{8}$/,
  // MALAYSIA
  MX: /^\d{10,11}$/,
  // MEXICO
  NL: /^[A-Z]{2}[A-Z0-9]{6}\d$/,
  // NETHERLANDS
  NZ: /^([Ll]([Aa]|[Dd]|[Ff]|[Hh])|[Ee]([Aa]|[Pp])|[Nn])\d{6}$/,
  // NEW ZEALAND
  PH: /^([A-Z](\d{6}|\d{7}[A-Z]))|([A-Z]{2}(\d{6}|\d{7}))$/,
  // PHILIPPINES
  PK: /^[A-Z]{2}\d{7}$/,
  // PAKISTAN
  PL: /^[A-Z]{2}\d{7}$/,
  // POLAND
  PT: /^[A-Z]\d{6}$/,
  // PORTUGAL
  RO: /^\d{8,9}$/,
  // ROMANIA
  RU: /^\d{9}$/,
  // RUSSIAN FEDERATION
  SE: /^\d{8}$/,
  // SWEDEN
  SL: /^(P)[A-Z]\d{7}$/,
  // SLOVENIA
  SK: /^[0-9A-Z]\d{7}$/,
  // SLOVAKIA
  TH: /^[A-Z]{1,2}\d{6,7}$/,
  // THAILAND
  TR: /^[A-Z]\d{8}$/,
  // TURKEY
  UA: /^[A-Z]{2}\d{6}$/,
  // UKRAINE
  US: /^\d{9}$/ // UNITED STATES

};
/**
 * Check if str is a valid passport number
 * relative to provided ISO Country Code.
 *
 * @param {string} str
 * @param {string} countryCode
 * @return {boolean}
 */

function isPassportNumber(str, countryCode) {
  (0, _assertString.default)(str);
  /** Remove All Whitespaces, Convert to UPPERCASE */

  var normalizedStr = str.replace(/\s/g, '').toUpperCase();
  return countryCode.toUpperCase() in passportRegexByCountryCode && passportRegexByCountryCode[countryCode].test(normalizedStr);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isPort.js":
/*!**********************************************!*\
  !*** ./node_modules/validator/lib/isPort.js ***!
  \**********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isPort;

var _isInt = _interopRequireDefault(__webpack_require__(/*! ./isInt */ "./node_modules/validator/lib/isInt.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isPort(str) {
  return (0, _isInt.default)(str, {
    min: 0,
    max: 65535
  });
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isPostalCode.js":
/*!****************************************************!*\
  !*** ./node_modules/validator/lib/isPostalCode.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isPostalCode;
exports.locales = void 0;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// common patterns
var threeDigit = /^\d{3}$/;
var fourDigit = /^\d{4}$/;
var fiveDigit = /^\d{5}$/;
var sixDigit = /^\d{6}$/;
var patterns = {
  AD: /^AD\d{3}$/,
  AT: fourDigit,
  AU: fourDigit,
  AZ: /^AZ\d{4}$/,
  BA: /^([7-8]\d{4}$)/,
  BE: fourDigit,
  BG: fourDigit,
  BR: /^\d{5}-\d{3}$/,
  BY: /^2[1-4]\d{4}$/,
  CA: /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][\s\-]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
  CH: fourDigit,
  CN: /^(0[1-7]|1[012356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[1-5]|8[1345]|9[09])\d{4}$/,
  CZ: /^\d{3}\s?\d{2}$/,
  DE: fiveDigit,
  DK: fourDigit,
  DO: fiveDigit,
  DZ: fiveDigit,
  EE: fiveDigit,
  ES: /^(5[0-2]{1}|[0-4]{1}\d{1})\d{3}$/,
  FI: fiveDigit,
  FR: /^\d{2}\s?\d{3}$/,
  GB: /^(gir\s?0aa|[a-z]{1,2}\d[\da-z]?\s?(\d[a-z]{2})?)$/i,
  GR: /^\d{3}\s?\d{2}$/,
  HR: /^([1-5]\d{4}$)/,
  HT: /^HT\d{4}$/,
  HU: fourDigit,
  ID: fiveDigit,
  IE: /^(?!.*(?:o))[A-Za-z]\d[\dw]\s\w{4}$/i,
  IL: /^(\d{5}|\d{7})$/,
  IN: /^((?!10|29|35|54|55|65|66|86|87|88|89)[1-9][0-9]{5})$/,
  IR: /^(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}$/,
  IS: threeDigit,
  IT: fiveDigit,
  JP: /^\d{3}\-\d{4}$/,
  KE: fiveDigit,
  KR: /^(\d{5}|\d{6})$/,
  LI: /^(948[5-9]|949[0-7])$/,
  LT: /^LT\-\d{5}$/,
  LU: fourDigit,
  LV: /^LV\-\d{4}$/,
  LK: fiveDigit,
  MG: threeDigit,
  MX: fiveDigit,
  MT: /^[A-Za-z]{3}\s{0,1}\d{4}$/,
  MY: fiveDigit,
  NL: /^\d{4}\s?[a-z]{2}$/i,
  NO: fourDigit,
  NP: /^(10|21|22|32|33|34|44|45|56|57)\d{3}$|^(977)$/i,
  NZ: fourDigit,
  PL: /^\d{2}\-\d{3}$/,
  PR: /^00[679]\d{2}([ -]\d{4})?$/,
  PT: /^\d{4}\-\d{3}?$/,
  RO: sixDigit,
  RU: sixDigit,
  SA: fiveDigit,
  SE: /^[1-9]\d{2}\s?\d{2}$/,
  SG: sixDigit,
  SI: fourDigit,
  SK: /^\d{3}\s?\d{2}$/,
  TH: fiveDigit,
  TN: fourDigit,
  TW: /^\d{3}(\d{2})?$/,
  UA: fiveDigit,
  US: /^\d{5}(-\d{4})?$/,
  ZA: fourDigit,
  ZM: fiveDigit
};
var locales = Object.keys(patterns);
exports.locales = locales;

function isPostalCode(str, locale) {
  (0, _assertString.default)(str);

  if (locale in patterns) {
    return patterns[locale].test(str);
  } else if (locale === 'any') {
    for (var key in patterns) {
      // https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md#ignoring-code-for-coverage-purposes
      // istanbul ignore else
      if (patterns.hasOwnProperty(key)) {
        var pattern = patterns[key];

        if (pattern.test(str)) {
          return true;
        }
      }
    }

    return false;
  }

  throw new Error("Invalid locale '".concat(locale, "'"));
}

/***/ }),

/***/ "./node_modules/validator/lib/isRFC3339.js":
/*!*************************************************!*\
  !*** ./node_modules/validator/lib/isRFC3339.js ***!
  \*************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isRFC3339;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Based on https://tools.ietf.org/html/rfc3339#section-5.6 */
var dateFullYear = /[0-9]{4}/;
var dateMonth = /(0[1-9]|1[0-2])/;
var dateMDay = /([12]\d|0[1-9]|3[01])/;
var timeHour = /([01][0-9]|2[0-3])/;
var timeMinute = /[0-5][0-9]/;
var timeSecond = /([0-5][0-9]|60)/;
var timeSecFrac = /(\.[0-9]+)?/;
var timeNumOffset = new RegExp("[-+]".concat(timeHour.source, ":").concat(timeMinute.source));
var timeOffset = new RegExp("([zZ]|".concat(timeNumOffset.source, ")"));
var partialTime = new RegExp("".concat(timeHour.source, ":").concat(timeMinute.source, ":").concat(timeSecond.source).concat(timeSecFrac.source));
var fullDate = new RegExp("".concat(dateFullYear.source, "-").concat(dateMonth.source, "-").concat(dateMDay.source));
var fullTime = new RegExp("".concat(partialTime.source).concat(timeOffset.source));
var rfc3339 = new RegExp("^".concat(fullDate.source, "[ tT]").concat(fullTime.source, "$"));

function isRFC3339(str) {
  (0, _assertString.default)(str);
  return rfc3339.test(str);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isRgbColor.js":
/*!**************************************************!*\
  !*** ./node_modules/validator/lib/isRgbColor.js ***!
  \**************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isRgbColor;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rgbColor = /^rgb\((([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]),){2}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\)$/;
var rgbaColor = /^rgba\((([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]),){3}(0?\.\d|1(\.0)?|0(\.0)?)\)$/;
var rgbColorPercent = /^rgb\((([0-9]%|[1-9][0-9]%|100%),){2}([0-9]%|[1-9][0-9]%|100%)\)$/;
var rgbaColorPercent = /^rgba\((([0-9]%|[1-9][0-9]%|100%),){3}(0?\.\d|1(\.0)?|0(\.0)?)\)$/;

function isRgbColor(str) {
  var includePercentValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  (0, _assertString.default)(str);

  if (!includePercentValues) {
    return rgbColor.test(str) || rgbaColor.test(str);
  }

  return rgbColor.test(str) || rgbaColor.test(str) || rgbColorPercent.test(str) || rgbaColorPercent.test(str);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isSemVer.js":
/*!************************************************!*\
  !*** ./node_modules/validator/lib/isSemVer.js ***!
  \************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isSemVer;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _multilineRegex = _interopRequireDefault(__webpack_require__(/*! ./util/multilineRegex */ "./node_modules/validator/lib/util/multilineRegex.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Regular Expression to match
 * semantic versioning (SemVer)
 * built from multi-line, multi-parts regexp
 * Reference: https://semver.org/
 */
var semanticVersioningRegex = (0, _multilineRegex.default)(['^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)', '(?:-((?:0|[1-9]\\d*|\\d*[a-z-][0-9a-z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-z-][0-9a-z-]*))*))', '?(?:\\+([0-9a-z-]+(?:\\.[0-9a-z-]+)*))?$'], 'i');

function isSemVer(str) {
  (0, _assertString.default)(str);
  return semanticVersioningRegex.test(str);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isSlug.js":
/*!**********************************************!*\
  !*** ./node_modules/validator/lib/isSlug.js ***!
  \**********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isSlug;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var charsetRegex = /^[^\s-_](?!.*?[-_]{2,})[a-z0-9-\\][^\s]*[^-_\s]$/;

function isSlug(str) {
  (0, _assertString.default)(str);
  return charsetRegex.test(str);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isStrongPassword.js":
/*!********************************************************!*\
  !*** ./node_modules/validator/lib/isStrongPassword.js ***!
  \********************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isStrongPassword;

var _merge = _interopRequireDefault(__webpack_require__(/*! ./util/merge */ "./node_modules/validator/lib/util/merge.js"));

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var upperCaseRegex = /^[A-Z]$/;
var lowerCaseRegex = /^[a-z]$/;
var numberRegex = /^[0-9]$/;
var symbolRegex = /^[-#!$@£%^&*()_+|~=`{}\[\]:";'<>?,.\/ ]$/;
var defaultOptions = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
  returnScore: false,
  pointsPerUnique: 1,
  pointsPerRepeat: 0.5,
  pointsForContainingLower: 10,
  pointsForContainingUpper: 10,
  pointsForContainingNumber: 10,
  pointsForContainingSymbol: 10
};
/* Counts number of occurrences of each char in a string
 * could be moved to util/ ?
*/

function countChars(str) {
  var result = {};
  Array.from(str).forEach(function (char) {
    var curVal = result[char];

    if (curVal) {
      result[char] += 1;
    } else {
      result[char] = 1;
    }
  });
  return result;
}
/* Return information about a password */


function analyzePassword(password) {
  var charMap = countChars(password);
  var analysis = {
    length: password.length,
    uniqueChars: Object.keys(charMap).length,
    uppercaseCount: 0,
    lowercaseCount: 0,
    numberCount: 0,
    symbolCount: 0
  };
  Object.keys(charMap).forEach(function (char) {
    /* istanbul ignore else */
    if (upperCaseRegex.test(char)) {
      analysis.uppercaseCount += charMap[char];
    } else if (lowerCaseRegex.test(char)) {
      analysis.lowercaseCount += charMap[char];
    } else if (numberRegex.test(char)) {
      analysis.numberCount += charMap[char];
    } else if (symbolRegex.test(char)) {
      analysis.symbolCount += charMap[char];
    }
  });
  return analysis;
}

function scorePassword(analysis, scoringOptions) {
  var points = 0;
  points += analysis.uniqueChars * scoringOptions.pointsPerUnique;
  points += (analysis.length - analysis.uniqueChars) * scoringOptions.pointsPerRepeat;

  if (analysis.lowercaseCount > 0) {
    points += scoringOptions.pointsForContainingLower;
  }

  if (analysis.uppercaseCount > 0) {
    points += scoringOptions.pointsForContainingUpper;
  }

  if (analysis.numberCount > 0) {
    points += scoringOptions.pointsForContainingNumber;
  }

  if (analysis.symbolCount > 0) {
    points += scoringOptions.pointsForContainingSymbol;
  }

  return points;
}

function isStrongPassword(str) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  (0, _assertString.default)(str);
  var analysis = analyzePassword(str);
  options = (0, _merge.default)(options || {}, defaultOptions);

  if (options.returnScore) {
    return scorePassword(analysis, options);
  }

  return analysis.length >= options.minLength && analysis.lowercaseCount >= options.minLowercase && analysis.uppercaseCount >= options.minUppercase && analysis.numberCount >= options.minNumbers && analysis.symbolCount >= options.minSymbols;
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isSurrogatePair.js":
/*!*******************************************************!*\
  !*** ./node_modules/validator/lib/isSurrogatePair.js ***!
  \*******************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isSurrogatePair;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var surrogatePair = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;

function isSurrogatePair(str) {
  (0, _assertString.default)(str);
  return surrogatePair.test(str);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isTaxID.js":
/*!***********************************************!*\
  !*** ./node_modules/validator/lib/isTaxID.js ***!
  \***********************************************/
/***/ ((module, exports, __webpack_require__) => {



function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isTaxID;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var algorithms = _interopRequireWildcard(__webpack_require__(/*! ./util/algorithms */ "./node_modules/validator/lib/util/algorithms.js"));

var _isDate = _interopRequireDefault(__webpack_require__(/*! ./isDate */ "./node_modules/validator/lib/isDate.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * TIN Validation
 * Validates Tax Identification Numbers (TINs) from the US, EU member states and the United Kingdom.
 *
 * EU-UK:
 * National TIN validity is calculated using public algorithms as made available by DG TAXUD.
 *
 * See `https://ec.europa.eu/taxation_customs/tin/specs/FS-TIN%20Algorithms-Public.docx` for more information.
 *
 * US:
 * An Employer Identification Number (EIN), also known as a Federal Tax Identification Number,
 *  is used to identify a business entity.
 *
 * NOTES:
 *  - Prefix 47 is being reserved for future use
 *  - Prefixes 26, 27, 45, 46 and 47 were previously assigned by the Philadelphia campus.
 *
 * See `http://www.irs.gov/Businesses/Small-Businesses-&-Self-Employed/How-EINs-are-Assigned-and-Valid-EIN-Prefixes`
 * for more information.
 */
// Locale functions

/*
 * bg-BG validation function
 * (Edinen graždanski nomer (EGN/ЕГН), persons only)
 * Checks if birth date (first six digits) is valid and calculates check (last) digit
 */
function bgBgCheck(tin) {
  // Extract full year, normalize month and check birth date validity
  var century_year = tin.slice(0, 2);
  var month = parseInt(tin.slice(2, 4), 10);

  if (month > 40) {
    month -= 40;
    century_year = "20".concat(century_year);
  } else if (month > 20) {
    month -= 20;
    century_year = "18".concat(century_year);
  } else {
    century_year = "19".concat(century_year);
  }

  if (month < 10) {
    month = "0".concat(month);
  }

  var date = "".concat(century_year, "/").concat(month, "/").concat(tin.slice(4, 6));

  if (!(0, _isDate.default)(date, 'YYYY/MM/DD')) {
    return false;
  } // split digits into an array for further processing


  var digits = tin.split('').map(function (a) {
    return parseInt(a, 10);
  }); // Calculate checksum by multiplying digits with fixed values

  var multip_lookup = [2, 4, 8, 5, 10, 9, 7, 3, 6];
  var checksum = 0;

  for (var i = 0; i < multip_lookup.length; i++) {
    checksum += digits[i] * multip_lookup[i];
  }

  checksum = checksum % 11 === 10 ? 0 : checksum % 11;
  return checksum === digits[9];
}
/**
 * Check if an input is a valid Canadian SIN (Social Insurance Number)
 *
 * The Social Insurance Number (SIN) is a 9 digit number that
 * you need to work in Canada or to have access to government programs and benefits.
 *
 * https://en.wikipedia.org/wiki/Social_Insurance_Number
 * https://www.canada.ca/en/employment-social-development/services/sin.html
 * https://www.codercrunch.com/challenge/819302488/sin-validator
 *
 * @param {string} input
 * @return {boolean}
 */


function isCanadianSIN(input) {
  var digitsArray = input.split('');
  var even = digitsArray.filter(function (_, idx) {
    return idx % 2;
  }).map(function (i) {
    return Number(i) * 2;
  }).join('').split('');
  var total = digitsArray.filter(function (_, idx) {
    return !(idx % 2);
  }).concat(even).map(function (i) {
    return Number(i);
  }).reduce(function (acc, cur) {
    return acc + cur;
  });
  return total % 10 === 0;
}
/*
 * cs-CZ validation function
 * (Rodné číslo (RČ), persons only)
 * Checks if birth date (first six digits) is valid and divisibility by 11
 * Material not in DG TAXUD document sourced from:
 * -`https://lorenc.info/3MA381/overeni-spravnosti-rodneho-cisla.htm`
 * -`https://www.mvcr.cz/clanek/rady-a-sluzby-dokumenty-rodne-cislo.aspx`
 */


function csCzCheck(tin) {
  tin = tin.replace(/\W/, ''); // Extract full year from TIN length

  var full_year = parseInt(tin.slice(0, 2), 10);

  if (tin.length === 10) {
    if (full_year < 54) {
      full_year = "20".concat(full_year);
    } else {
      full_year = "19".concat(full_year);
    }
  } else {
    if (tin.slice(6) === '000') {
      return false;
    } // Three-zero serial not assigned before 1954


    if (full_year < 54) {
      full_year = "19".concat(full_year);
    } else {
      return false; // No 18XX years seen in any of the resources
    }
  } // Add missing zero if needed


  if (full_year.length === 3) {
    full_year = [full_year.slice(0, 2), '0', full_year.slice(2)].join('');
  } // Extract month from TIN and normalize


  var month = parseInt(tin.slice(2, 4), 10);

  if (month > 50) {
    month -= 50;
  }

  if (month > 20) {
    // Month-plus-twenty was only introduced in 2004
    if (parseInt(full_year, 10) < 2004) {
      return false;
    }

    month -= 20;
  }

  if (month < 10) {
    month = "0".concat(month);
  } // Check date validity


  var date = "".concat(full_year, "/").concat(month, "/").concat(tin.slice(4, 6));

  if (!(0, _isDate.default)(date, 'YYYY/MM/DD')) {
    return false;
  } // Verify divisibility by 11


  if (tin.length === 10) {
    if (parseInt(tin, 10) % 11 !== 0) {
      // Some numbers up to and including 1985 are still valid if
      // check (last) digit equals 0 and modulo of first 9 digits equals 10
      var checkdigit = parseInt(tin.slice(0, 9), 10) % 11;

      if (parseInt(full_year, 10) < 1986 && checkdigit === 10) {
        if (parseInt(tin.slice(9), 10) !== 0) {
          return false;
        }
      } else {
        return false;
      }
    }
  }

  return true;
}
/*
 * de-AT validation function
 * (Abgabenkontonummer, persons/entities)
 * Verify TIN validity by calling luhnCheck()
 */


function deAtCheck(tin) {
  return algorithms.luhnCheck(tin);
}
/*
 * de-DE validation function
 * (Steueridentifikationsnummer (Steuer-IdNr.), persons only)
 * Tests for single duplicate/triplicate value, then calculates ISO 7064 check (last) digit
 * Partial implementation of spec (same result with both algorithms always)
 */


function deDeCheck(tin) {
  // Split digits into an array for further processing
  var digits = tin.split('').map(function (a) {
    return parseInt(a, 10);
  }); // Fill array with strings of number positions

  var occurences = [];

  for (var i = 0; i < digits.length - 1; i++) {
    occurences.push('');

    for (var j = 0; j < digits.length - 1; j++) {
      if (digits[i] === digits[j]) {
        occurences[i] += j;
      }
    }
  } // Remove digits with one occurence and test for only one duplicate/triplicate


  occurences = occurences.filter(function (a) {
    return a.length > 1;
  });

  if (occurences.length !== 2 && occurences.length !== 3) {
    return false;
  } // In case of triplicate value only two digits are allowed next to each other


  if (occurences[0].length === 3) {
    var trip_locations = occurences[0].split('').map(function (a) {
      return parseInt(a, 10);
    });
    var recurrent = 0; // Amount of neighbour occurences

    for (var _i = 0; _i < trip_locations.length - 1; _i++) {
      if (trip_locations[_i] + 1 === trip_locations[_i + 1]) {
        recurrent += 1;
      }
    }

    if (recurrent === 2) {
      return false;
    }
  }

  return algorithms.iso7064Check(tin);
}
/*
 * dk-DK validation function
 * (CPR-nummer (personnummer), persons only)
 * Checks if birth date (first six digits) is valid and assigned to century (seventh) digit,
 * and calculates check (last) digit
 */


function dkDkCheck(tin) {
  tin = tin.replace(/\W/, ''); // Extract year, check if valid for given century digit and add century

  var year = parseInt(tin.slice(4, 6), 10);
  var century_digit = tin.slice(6, 7);

  switch (century_digit) {
    case '0':
    case '1':
    case '2':
    case '3':
      year = "19".concat(year);
      break;

    case '4':
    case '9':
      if (year < 37) {
        year = "20".concat(year);
      } else {
        year = "19".concat(year);
      }

      break;

    default:
      if (year < 37) {
        year = "20".concat(year);
      } else if (year > 58) {
        year = "18".concat(year);
      } else {
        return false;
      }

      break;
  } // Add missing zero if needed


  if (year.length === 3) {
    year = [year.slice(0, 2), '0', year.slice(2)].join('');
  } // Check date validity


  var date = "".concat(year, "/").concat(tin.slice(2, 4), "/").concat(tin.slice(0, 2));

  if (!(0, _isDate.default)(date, 'YYYY/MM/DD')) {
    return false;
  } // Split digits into an array for further processing


  var digits = tin.split('').map(function (a) {
    return parseInt(a, 10);
  });
  var checksum = 0;
  var weight = 4; // Multiply by weight and add to checksum

  for (var i = 0; i < 9; i++) {
    checksum += digits[i] * weight;
    weight -= 1;

    if (weight === 1) {
      weight = 7;
    }
  }

  checksum %= 11;

  if (checksum === 1) {
    return false;
  }

  return checksum === 0 ? digits[9] === 0 : digits[9] === 11 - checksum;
}
/*
 * el-CY validation function
 * (Arithmos Forologikou Mitroou (AFM/ΑΦΜ), persons only)
 * Verify TIN validity by calculating ASCII value of check (last) character
 */


function elCyCheck(tin) {
  // split digits into an array for further processing
  var digits = tin.slice(0, 8).split('').map(function (a) {
    return parseInt(a, 10);
  });
  var checksum = 0; // add digits in even places

  for (var i = 1; i < digits.length; i += 2) {
    checksum += digits[i];
  } // add digits in odd places


  for (var _i2 = 0; _i2 < digits.length; _i2 += 2) {
    if (digits[_i2] < 2) {
      checksum += 1 - digits[_i2];
    } else {
      checksum += 2 * (digits[_i2] - 2) + 5;

      if (digits[_i2] > 4) {
        checksum += 2;
      }
    }
  }

  return String.fromCharCode(checksum % 26 + 65) === tin.charAt(8);
}
/*
 * el-GR validation function
 * (Arithmos Forologikou Mitroou (AFM/ΑΦΜ), persons/entities)
 * Verify TIN validity by calculating check (last) digit
 * Algorithm not in DG TAXUD document- sourced from:
 * - `http://epixeirisi.gr/%CE%9A%CE%A1%CE%99%CE%A3%CE%99%CE%9C%CE%91-%CE%98%CE%95%CE%9C%CE%91%CE%A4%CE%91-%CE%A6%CE%9F%CE%A1%CE%9F%CE%9B%CE%9F%CE%93%CE%99%CE%91%CE%A3-%CE%9A%CE%91%CE%99-%CE%9B%CE%9F%CE%93%CE%99%CE%A3%CE%A4%CE%99%CE%9A%CE%97%CE%A3/23791/%CE%91%CF%81%CE%B9%CE%B8%CE%BC%CF%8C%CF%82-%CE%A6%CE%BF%CF%81%CE%BF%CE%BB%CE%BF%CE%B3%CE%B9%CE%BA%CE%BF%CF%8D-%CE%9C%CE%B7%CF%84%CF%81%CF%8E%CE%BF%CF%85`
 */


function elGrCheck(tin) {
  // split digits into an array for further processing
  var digits = tin.split('').map(function (a) {
    return parseInt(a, 10);
  });
  var checksum = 0;

  for (var i = 0; i < 8; i++) {
    checksum += digits[i] * Math.pow(2, 8 - i);
  }

  return checksum % 11 % 10 === digits[8];
}
/*
 * en-GB validation function (should go here if needed)
 * (National Insurance Number (NINO) or Unique Taxpayer Reference (UTR),
 * persons/entities respectively)
 */

/*
 * en-IE validation function
 * (Personal Public Service Number (PPS No), persons only)
 * Verify TIN validity by calculating check (second to last) character
 */


function enIeCheck(tin) {
  var checksum = algorithms.reverseMultiplyAndSum(tin.split('').slice(0, 7).map(function (a) {
    return parseInt(a, 10);
  }), 8);

  if (tin.length === 9 && tin[8] !== 'W') {
    checksum += (tin[8].charCodeAt(0) - 64) * 9;
  }

  checksum %= 23;

  if (checksum === 0) {
    return tin[7].toUpperCase() === 'W';
  }

  return tin[7].toUpperCase() === String.fromCharCode(64 + checksum);
} // Valid US IRS campus prefixes


var enUsCampusPrefix = {
  andover: ['10', '12'],
  atlanta: ['60', '67'],
  austin: ['50', '53'],
  brookhaven: ['01', '02', '03', '04', '05', '06', '11', '13', '14', '16', '21', '22', '23', '25', '34', '51', '52', '54', '55', '56', '57', '58', '59', '65'],
  cincinnati: ['30', '32', '35', '36', '37', '38', '61'],
  fresno: ['15', '24'],
  internet: ['20', '26', '27', '45', '46', '47'],
  kansas: ['40', '44'],
  memphis: ['94', '95'],
  ogden: ['80', '90'],
  philadelphia: ['33', '39', '41', '42', '43', '46', '48', '62', '63', '64', '66', '68', '71', '72', '73', '74', '75', '76', '77', '81', '82', '83', '84', '85', '86', '87', '88', '91', '92', '93', '98', '99'],
  sba: ['31']
}; // Return an array of all US IRS campus prefixes

function enUsGetPrefixes() {
  var prefixes = [];

  for (var location in enUsCampusPrefix) {
    // https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md#ignoring-code-for-coverage-purposes
    // istanbul ignore else
    if (enUsCampusPrefix.hasOwnProperty(location)) {
      prefixes.push.apply(prefixes, _toConsumableArray(enUsCampusPrefix[location]));
    }
  }

  return prefixes;
}
/*
 * en-US validation function
 * Verify that the TIN starts with a valid IRS campus prefix
 */


function enUsCheck(tin) {
  return enUsGetPrefixes().indexOf(tin.slice(0, 2)) !== -1;
}
/*
 * es-ES validation function
 * (Documento Nacional de Identidad (DNI)
 * or Número de Identificación de Extranjero (NIE), persons only)
 * Verify TIN validity by calculating check (last) character
 */


function esEsCheck(tin) {
  // Split characters into an array for further processing
  var chars = tin.toUpperCase().split(''); // Replace initial letter if needed

  if (isNaN(parseInt(chars[0], 10)) && chars.length > 1) {
    var lead_replace = 0;

    switch (chars[0]) {
      case 'Y':
        lead_replace = 1;
        break;

      case 'Z':
        lead_replace = 2;
        break;

      default:
    }

    chars.splice(0, 1, lead_replace); // Fill with zeros if smaller than proper
  } else {
    while (chars.length < 9) {
      chars.unshift(0);
    }
  } // Calculate checksum and check according to lookup


  var lookup = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];
  chars = chars.join('');
  var checksum = parseInt(chars.slice(0, 8), 10) % 23;
  return chars[8] === lookup[checksum];
}
/*
 * et-EE validation function
 * (Isikukood (IK), persons only)
 * Checks if birth date (century digit and six following) is valid and calculates check (last) digit
 * Material not in DG TAXUD document sourced from:
 * - `https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/Estonia-TIN.pdf`
 */


function etEeCheck(tin) {
  // Extract year and add century
  var full_year = tin.slice(1, 3);
  var century_digit = tin.slice(0, 1);

  switch (century_digit) {
    case '1':
    case '2':
      full_year = "18".concat(full_year);
      break;

    case '3':
    case '4':
      full_year = "19".concat(full_year);
      break;

    default:
      full_year = "20".concat(full_year);
      break;
  } // Check date validity


  var date = "".concat(full_year, "/").concat(tin.slice(3, 5), "/").concat(tin.slice(5, 7));

  if (!(0, _isDate.default)(date, 'YYYY/MM/DD')) {
    return false;
  } // Split digits into an array for further processing


  var digits = tin.split('').map(function (a) {
    return parseInt(a, 10);
  });
  var checksum = 0;
  var weight = 1; // Multiply by weight and add to checksum

  for (var i = 0; i < 10; i++) {
    checksum += digits[i] * weight;
    weight += 1;

    if (weight === 10) {
      weight = 1;
    }
  } // Do again if modulo 11 of checksum is 10


  if (checksum % 11 === 10) {
    checksum = 0;
    weight = 3;

    for (var _i3 = 0; _i3 < 10; _i3++) {
      checksum += digits[_i3] * weight;
      weight += 1;

      if (weight === 10) {
        weight = 1;
      }
    }

    if (checksum % 11 === 10) {
      return digits[10] === 0;
    }
  }

  return checksum % 11 === digits[10];
}
/*
 * fi-FI validation function
 * (Henkilötunnus (HETU), persons only)
 * Checks if birth date (first six digits plus century symbol) is valid
 * and calculates check (last) digit
 */


function fiFiCheck(tin) {
  // Extract year and add century
  var full_year = tin.slice(4, 6);
  var century_symbol = tin.slice(6, 7);

  switch (century_symbol) {
    case '+':
      full_year = "18".concat(full_year);
      break;

    case '-':
      full_year = "19".concat(full_year);
      break;

    default:
      full_year = "20".concat(full_year);
      break;
  } // Check date validity


  var date = "".concat(full_year, "/").concat(tin.slice(2, 4), "/").concat(tin.slice(0, 2));

  if (!(0, _isDate.default)(date, 'YYYY/MM/DD')) {
    return false;
  } // Calculate check character


  var checksum = parseInt(tin.slice(0, 6) + tin.slice(7, 10), 10) % 31;

  if (checksum < 10) {
    return checksum === parseInt(tin.slice(10), 10);
  }

  checksum -= 10;
  var letters_lookup = ['A', 'B', 'C', 'D', 'E', 'F', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y'];
  return letters_lookup[checksum] === tin.slice(10);
}
/*
 * fr/nl-BE validation function
 * (Numéro national (N.N.), persons only)
 * Checks if birth date (first six digits) is valid and calculates check (last two) digits
 */


function frBeCheck(tin) {
  // Zero month/day value is acceptable
  if (tin.slice(2, 4) !== '00' || tin.slice(4, 6) !== '00') {
    // Extract date from first six digits of TIN
    var date = "".concat(tin.slice(0, 2), "/").concat(tin.slice(2, 4), "/").concat(tin.slice(4, 6));

    if (!(0, _isDate.default)(date, 'YY/MM/DD')) {
      return false;
    }
  }

  var checksum = 97 - parseInt(tin.slice(0, 9), 10) % 97;
  var checkdigits = parseInt(tin.slice(9, 11), 10);

  if (checksum !== checkdigits) {
    checksum = 97 - parseInt("2".concat(tin.slice(0, 9)), 10) % 97;

    if (checksum !== checkdigits) {
      return false;
    }
  }

  return true;
}
/*
 * fr-FR validation function
 * (Numéro fiscal de référence (numéro SPI), persons only)
 * Verify TIN validity by calculating check (last three) digits
 */


function frFrCheck(tin) {
  tin = tin.replace(/\s/g, '');
  var checksum = parseInt(tin.slice(0, 10), 10) % 511;
  var checkdigits = parseInt(tin.slice(10, 13), 10);
  return checksum === checkdigits;
}
/*
 * fr/lb-LU validation function
 * (numéro d’identification personnelle, persons only)
 * Verify birth date validity and run Luhn and Verhoeff checks
 */


function frLuCheck(tin) {
  // Extract date and check validity
  var date = "".concat(tin.slice(0, 4), "/").concat(tin.slice(4, 6), "/").concat(tin.slice(6, 8));

  if (!(0, _isDate.default)(date, 'YYYY/MM/DD')) {
    return false;
  } // Run Luhn check


  if (!algorithms.luhnCheck(tin.slice(0, 12))) {
    return false;
  } // Remove Luhn check digit and run Verhoeff check


  return algorithms.verhoeffCheck("".concat(tin.slice(0, 11)).concat(tin[12]));
}
/*
 * hr-HR validation function
 * (Osobni identifikacijski broj (OIB), persons/entities)
 * Verify TIN validity by calling iso7064Check(digits)
 */


function hrHrCheck(tin) {
  return algorithms.iso7064Check(tin);
}
/*
 * hu-HU validation function
 * (Adóazonosító jel, persons only)
 * Verify TIN validity by calculating check (last) digit
 */


function huHuCheck(tin) {
  // split digits into an array for further processing
  var digits = tin.split('').map(function (a) {
    return parseInt(a, 10);
  });
  var checksum = 8;

  for (var i = 1; i < 9; i++) {
    checksum += digits[i] * (i + 1);
  }

  return checksum % 11 === digits[9];
}
/*
 * lt-LT validation function (should go here if needed)
 * (Asmens kodas, persons/entities respectively)
 * Current validation check is alias of etEeCheck- same format applies
 */

/*
 * it-IT first/last name validity check
 * Accepts it-IT TIN-encoded names as a three-element character array and checks their validity
 * Due to lack of clarity between resources ("Are only Italian consonants used?
 * What happens if a person has X in their name?" etc.) only two test conditions
 * have been implemented:
 * Vowels may only be followed by other vowels or an X character
 * and X characters after vowels may only be followed by other X characters.
 */


function itItNameCheck(name) {
  // true at the first occurence of a vowel
  var vowelflag = false; // true at the first occurence of an X AFTER vowel
  // (to properly handle last names with X as consonant)

  var xflag = false;

  for (var i = 0; i < 3; i++) {
    if (!vowelflag && /[AEIOU]/.test(name[i])) {
      vowelflag = true;
    } else if (!xflag && vowelflag && name[i] === 'X') {
      xflag = true;
    } else if (i > 0) {
      if (vowelflag && !xflag) {
        if (!/[AEIOU]/.test(name[i])) {
          return false;
        }
      }

      if (xflag) {
        if (!/X/.test(name[i])) {
          return false;
        }
      }
    }
  }

  return true;
}
/*
 * it-IT validation function
 * (Codice fiscale (TIN-IT), persons only)
 * Verify name, birth date and codice catastale validity
 * and calculate check character.
 * Material not in DG-TAXUD document sourced from:
 * `https://en.wikipedia.org/wiki/Italian_fiscal_code`
 */


function itItCheck(tin) {
  // Capitalize and split characters into an array for further processing
  var chars = tin.toUpperCase().split(''); // Check first and last name validity calling itItNameCheck()

  if (!itItNameCheck(chars.slice(0, 3))) {
    return false;
  }

  if (!itItNameCheck(chars.slice(3, 6))) {
    return false;
  } // Convert letters in number spaces back to numbers if any


  var number_locations = [6, 7, 9, 10, 12, 13, 14];
  var number_replace = {
    L: '0',
    M: '1',
    N: '2',
    P: '3',
    Q: '4',
    R: '5',
    S: '6',
    T: '7',
    U: '8',
    V: '9'
  };

  for (var _i4 = 0, _number_locations = number_locations; _i4 < _number_locations.length; _i4++) {
    var i = _number_locations[_i4];

    if (chars[i] in number_replace) {
      chars.splice(i, 1, number_replace[chars[i]]);
    }
  } // Extract month and day, and check date validity


  var month_replace = {
    A: '01',
    B: '02',
    C: '03',
    D: '04',
    E: '05',
    H: '06',
    L: '07',
    M: '08',
    P: '09',
    R: '10',
    S: '11',
    T: '12'
  };
  var month = month_replace[chars[8]];
  var day = parseInt(chars[9] + chars[10], 10);

  if (day > 40) {
    day -= 40;
  }

  if (day < 10) {
    day = "0".concat(day);
  }

  var date = "".concat(chars[6]).concat(chars[7], "/").concat(month, "/").concat(day);

  if (!(0, _isDate.default)(date, 'YY/MM/DD')) {
    return false;
  } // Calculate check character by adding up even and odd characters as numbers


  var checksum = 0;

  for (var _i5 = 1; _i5 < chars.length - 1; _i5 += 2) {
    var char_to_int = parseInt(chars[_i5], 10);

    if (isNaN(char_to_int)) {
      char_to_int = chars[_i5].charCodeAt(0) - 65;
    }

    checksum += char_to_int;
  }

  var odd_convert = {
    // Maps of characters at odd places
    A: 1,
    B: 0,
    C: 5,
    D: 7,
    E: 9,
    F: 13,
    G: 15,
    H: 17,
    I: 19,
    J: 21,
    K: 2,
    L: 4,
    M: 18,
    N: 20,
    O: 11,
    P: 3,
    Q: 6,
    R: 8,
    S: 12,
    T: 14,
    U: 16,
    V: 10,
    W: 22,
    X: 25,
    Y: 24,
    Z: 23,
    0: 1,
    1: 0
  };

  for (var _i6 = 0; _i6 < chars.length - 1; _i6 += 2) {
    var _char_to_int = 0;

    if (chars[_i6] in odd_convert) {
      _char_to_int = odd_convert[chars[_i6]];
    } else {
      var multiplier = parseInt(chars[_i6], 10);
      _char_to_int = 2 * multiplier + 1;

      if (multiplier > 4) {
        _char_to_int += 2;
      }
    }

    checksum += _char_to_int;
  }

  if (String.fromCharCode(65 + checksum % 26) !== chars[15]) {
    return false;
  }

  return true;
}
/*
 * lv-LV validation function
 * (Personas kods (PK), persons only)
 * Check validity of birth date and calculate check (last) digit
 * Support only for old format numbers (not starting with '32', issued before 2017/07/01)
 * Material not in DG TAXUD document sourced from:
 * `https://boot.ritakafija.lv/forums/index.php?/topic/88314-personas-koda-algoritms-%C4%8Deksumma/`
 */


function lvLvCheck(tin) {
  tin = tin.replace(/\W/, ''); // Extract date from TIN

  var day = tin.slice(0, 2);

  if (day !== '32') {
    // No date/checksum check if new format
    var month = tin.slice(2, 4);

    if (month !== '00') {
      // No date check if unknown month
      var full_year = tin.slice(4, 6);

      switch (tin[6]) {
        case '0':
          full_year = "18".concat(full_year);
          break;

        case '1':
          full_year = "19".concat(full_year);
          break;

        default:
          full_year = "20".concat(full_year);
          break;
      } // Check date validity


      var date = "".concat(full_year, "/").concat(tin.slice(2, 4), "/").concat(day);

      if (!(0, _isDate.default)(date, 'YYYY/MM/DD')) {
        return false;
      }
    } // Calculate check digit


    var checksum = 1101;
    var multip_lookup = [1, 6, 3, 7, 9, 10, 5, 8, 4, 2];

    for (var i = 0; i < tin.length - 1; i++) {
      checksum -= parseInt(tin[i], 10) * multip_lookup[i];
    }

    return parseInt(tin[10], 10) === checksum % 11;
  }

  return true;
}
/*
 * mt-MT validation function
 * (Identity Card Number or Unique Taxpayer Reference, persons/entities)
 * Verify Identity Card Number structure (no other tests found)
 */


function mtMtCheck(tin) {
  if (tin.length !== 9) {
    // No tests for UTR
    var chars = tin.toUpperCase().split(''); // Fill with zeros if smaller than proper

    while (chars.length < 8) {
      chars.unshift(0);
    } // Validate format according to last character


    switch (tin[7]) {
      case 'A':
      case 'P':
        if (parseInt(chars[6], 10) === 0) {
          return false;
        }

        break;

      default:
        {
          var first_part = parseInt(chars.join('').slice(0, 5), 10);

          if (first_part > 32000) {
            return false;
          }

          var second_part = parseInt(chars.join('').slice(5, 7), 10);

          if (first_part === second_part) {
            return false;
          }
        }
    }
  }

  return true;
}
/*
 * nl-NL validation function
 * (Burgerservicenummer (BSN) or Rechtspersonen Samenwerkingsverbanden Informatie Nummer (RSIN),
 * persons/entities respectively)
 * Verify TIN validity by calculating check (last) digit (variant of MOD 11)
 */


function nlNlCheck(tin) {
  return algorithms.reverseMultiplyAndSum(tin.split('').slice(0, 8).map(function (a) {
    return parseInt(a, 10);
  }), 9) % 11 === parseInt(tin[8], 10);
}
/*
 * pl-PL validation function
 * (Powszechny Elektroniczny System Ewidencji Ludności (PESEL)
 * or Numer identyfikacji podatkowej (NIP), persons/entities)
 * Verify TIN validity by validating birth date (PESEL) and calculating check (last) digit
 */


function plPlCheck(tin) {
  // NIP
  if (tin.length === 10) {
    // Calculate last digit by multiplying with lookup
    var lookup = [6, 5, 7, 2, 3, 4, 5, 6, 7];
    var _checksum = 0;

    for (var i = 0; i < lookup.length; i++) {
      _checksum += parseInt(tin[i], 10) * lookup[i];
    }

    _checksum %= 11;

    if (_checksum === 10) {
      return false;
    }

    return _checksum === parseInt(tin[9], 10);
  } // PESEL
  // Extract full year using month


  var full_year = tin.slice(0, 2);
  var month = parseInt(tin.slice(2, 4), 10);

  if (month > 80) {
    full_year = "18".concat(full_year);
    month -= 80;
  } else if (month > 60) {
    full_year = "22".concat(full_year);
    month -= 60;
  } else if (month > 40) {
    full_year = "21".concat(full_year);
    month -= 40;
  } else if (month > 20) {
    full_year = "20".concat(full_year);
    month -= 20;
  } else {
    full_year = "19".concat(full_year);
  } // Add leading zero to month if needed


  if (month < 10) {
    month = "0".concat(month);
  } // Check date validity


  var date = "".concat(full_year, "/").concat(month, "/").concat(tin.slice(4, 6));

  if (!(0, _isDate.default)(date, 'YYYY/MM/DD')) {
    return false;
  } // Calculate last digit by mulitplying with odd one-digit numbers except 5


  var checksum = 0;
  var multiplier = 1;

  for (var _i7 = 0; _i7 < tin.length - 1; _i7++) {
    checksum += parseInt(tin[_i7], 10) * multiplier % 10;
    multiplier += 2;

    if (multiplier > 10) {
      multiplier = 1;
    } else if (multiplier === 5) {
      multiplier += 2;
    }
  }

  checksum = 10 - checksum % 10;
  return checksum === parseInt(tin[10], 10);
}
/*
* pt-BR validation function
* (Cadastro de Pessoas Físicas (CPF, persons)
* Cadastro Nacional de Pessoas Jurídicas (CNPJ, entities)
* Both inputs will be validated
*/


function ptBrCheck(tin) {
  if (tin.length === 11) {
    var _sum;

    var remainder;
    _sum = 0;
    if ( // Reject known invalid CPFs
    tin === '11111111111' || tin === '22222222222' || tin === '33333333333' || tin === '44444444444' || tin === '55555555555' || tin === '66666666666' || tin === '77777777777' || tin === '88888888888' || tin === '99999999999' || tin === '00000000000') return false;

    for (var i = 1; i <= 9; i++) {
      _sum += parseInt(tin.substring(i - 1, i), 10) * (11 - i);
    }

    remainder = _sum * 10 % 11;
    if (remainder === 10) remainder = 0;
    if (remainder !== parseInt(tin.substring(9, 10), 10)) return false;
    _sum = 0;

    for (var _i8 = 1; _i8 <= 10; _i8++) {
      _sum += parseInt(tin.substring(_i8 - 1, _i8), 10) * (12 - _i8);
    }

    remainder = _sum * 10 % 11;
    if (remainder === 10) remainder = 0;
    if (remainder !== parseInt(tin.substring(10, 11), 10)) return false;
    return true;
  }

  if ( // Reject know invalid CNPJs
  tin === '00000000000000' || tin === '11111111111111' || tin === '22222222222222' || tin === '33333333333333' || tin === '44444444444444' || tin === '55555555555555' || tin === '66666666666666' || tin === '77777777777777' || tin === '88888888888888' || tin === '99999999999999') {
    return false;
  }

  var length = tin.length - 2;
  var identifiers = tin.substring(0, length);
  var verificators = tin.substring(length);
  var sum = 0;
  var pos = length - 7;

  for (var _i9 = length; _i9 >= 1; _i9--) {
    sum += identifiers.charAt(length - _i9) * pos;
    pos -= 1;

    if (pos < 2) {
      pos = 9;
    }
  }

  var result = sum % 11 < 2 ? 0 : 11 - sum % 11;

  if (result !== parseInt(verificators.charAt(0), 10)) {
    return false;
  }

  length += 1;
  identifiers = tin.substring(0, length);
  sum = 0;
  pos = length - 7;

  for (var _i10 = length; _i10 >= 1; _i10--) {
    sum += identifiers.charAt(length - _i10) * pos;
    pos -= 1;

    if (pos < 2) {
      pos = 9;
    }
  }

  result = sum % 11 < 2 ? 0 : 11 - sum % 11;

  if (result !== parseInt(verificators.charAt(1), 10)) {
    return false;
  }

  return true;
}
/*
 * pt-PT validation function
 * (Número de identificação fiscal (NIF), persons/entities)
 * Verify TIN validity by calculating check (last) digit (variant of MOD 11)
 */


function ptPtCheck(tin) {
  var checksum = 11 - algorithms.reverseMultiplyAndSum(tin.split('').slice(0, 8).map(function (a) {
    return parseInt(a, 10);
  }), 9) % 11;

  if (checksum > 9) {
    return parseInt(tin[8], 10) === 0;
  }

  return checksum === parseInt(tin[8], 10);
}
/*
 * ro-RO validation function
 * (Cod Numeric Personal (CNP) or Cod de înregistrare fiscală (CIF),
 * persons only)
 * Verify CNP validity by calculating check (last) digit (test not found for CIF)
 * Material not in DG TAXUD document sourced from:
 * `https://en.wikipedia.org/wiki/National_identification_number#Romania`
 */


function roRoCheck(tin) {
  if (tin.slice(0, 4) !== '9000') {
    // No test found for this format
    // Extract full year using century digit if possible
    var full_year = tin.slice(1, 3);

    switch (tin[0]) {
      case '1':
      case '2':
        full_year = "19".concat(full_year);
        break;

      case '3':
      case '4':
        full_year = "18".concat(full_year);
        break;

      case '5':
      case '6':
        full_year = "20".concat(full_year);
        break;

      default:
    } // Check date validity


    var date = "".concat(full_year, "/").concat(tin.slice(3, 5), "/").concat(tin.slice(5, 7));

    if (date.length === 8) {
      if (!(0, _isDate.default)(date, 'YY/MM/DD')) {
        return false;
      }
    } else if (!(0, _isDate.default)(date, 'YYYY/MM/DD')) {
      return false;
    } // Calculate check digit


    var digits = tin.split('').map(function (a) {
      return parseInt(a, 10);
    });
    var multipliers = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9];
    var checksum = 0;

    for (var i = 0; i < multipliers.length; i++) {
      checksum += digits[i] * multipliers[i];
    }

    if (checksum % 11 === 10) {
      return digits[12] === 1;
    }

    return digits[12] === checksum % 11;
  }

  return true;
}
/*
 * sk-SK validation function
 * (Rodné číslo (RČ) or bezvýznamové identifikačné číslo (BIČ), persons only)
 * Checks validity of pre-1954 birth numbers (rodné číslo) only
 * Due to the introduction of the pseudo-random BIČ it is not possible to test
 * post-1954 birth numbers without knowing whether they are BIČ or RČ beforehand
 */


function skSkCheck(tin) {
  if (tin.length === 9) {
    tin = tin.replace(/\W/, '');

    if (tin.slice(6) === '000') {
      return false;
    } // Three-zero serial not assigned before 1954
    // Extract full year from TIN length


    var full_year = parseInt(tin.slice(0, 2), 10);

    if (full_year > 53) {
      return false;
    }

    if (full_year < 10) {
      full_year = "190".concat(full_year);
    } else {
      full_year = "19".concat(full_year);
    } // Extract month from TIN and normalize


    var month = parseInt(tin.slice(2, 4), 10);

    if (month > 50) {
      month -= 50;
    }

    if (month < 10) {
      month = "0".concat(month);
    } // Check date validity


    var date = "".concat(full_year, "/").concat(month, "/").concat(tin.slice(4, 6));

    if (!(0, _isDate.default)(date, 'YYYY/MM/DD')) {
      return false;
    }
  }

  return true;
}
/*
 * sl-SI validation function
 * (Davčna številka, persons/entities)
 * Verify TIN validity by calculating check (last) digit (variant of MOD 11)
 */


function slSiCheck(tin) {
  var checksum = 11 - algorithms.reverseMultiplyAndSum(tin.split('').slice(0, 7).map(function (a) {
    return parseInt(a, 10);
  }), 8) % 11;

  if (checksum === 10) {
    return parseInt(tin[7], 10) === 0;
  }

  return checksum === parseInt(tin[7], 10);
}
/*
 * sv-SE validation function
 * (Personnummer or samordningsnummer, persons only)
 * Checks validity of birth date and calls luhnCheck() to validate check (last) digit
 */


function svSeCheck(tin) {
  // Make copy of TIN and normalize to two-digit year form
  var tin_copy = tin.slice(0);

  if (tin.length > 11) {
    tin_copy = tin_copy.slice(2);
  } // Extract date of birth


  var full_year = '';
  var month = tin_copy.slice(2, 4);
  var day = parseInt(tin_copy.slice(4, 6), 10);

  if (tin.length > 11) {
    full_year = tin.slice(0, 4);
  } else {
    full_year = tin.slice(0, 2);

    if (tin.length === 11 && day < 60) {
      // Extract full year from centenarian symbol
      // Should work just fine until year 10000 or so
      var current_year = new Date().getFullYear().toString();
      var current_century = parseInt(current_year.slice(0, 2), 10);
      current_year = parseInt(current_year, 10);

      if (tin[6] === '-') {
        if (parseInt("".concat(current_century).concat(full_year), 10) > current_year) {
          full_year = "".concat(current_century - 1).concat(full_year);
        } else {
          full_year = "".concat(current_century).concat(full_year);
        }
      } else {
        full_year = "".concat(current_century - 1).concat(full_year);

        if (current_year - parseInt(full_year, 10) < 100) {
          return false;
        }
      }
    }
  } // Normalize day and check date validity


  if (day > 60) {
    day -= 60;
  }

  if (day < 10) {
    day = "0".concat(day);
  }

  var date = "".concat(full_year, "/").concat(month, "/").concat(day);

  if (date.length === 8) {
    if (!(0, _isDate.default)(date, 'YY/MM/DD')) {
      return false;
    }
  } else if (!(0, _isDate.default)(date, 'YYYY/MM/DD')) {
    return false;
  }

  return algorithms.luhnCheck(tin.replace(/\W/, ''));
} // Locale lookup objects

/*
 * Tax id regex formats for various locales
 *
 * Where not explicitly specified in DG-TAXUD document both
 * uppercase and lowercase letters are acceptable.
 */


var taxIdFormat = {
  'bg-BG': /^\d{10}$/,
  'cs-CZ': /^\d{6}\/{0,1}\d{3,4}$/,
  'de-AT': /^\d{9}$/,
  'de-DE': /^[1-9]\d{10}$/,
  'dk-DK': /^\d{6}-{0,1}\d{4}$/,
  'el-CY': /^[09]\d{7}[A-Z]$/,
  'el-GR': /^([0-4]|[7-9])\d{8}$/,
  'en-CA': /^\d{9}$/,
  'en-GB': /^\d{10}$|^(?!GB|NK|TN|ZZ)(?![DFIQUV])[A-Z](?![DFIQUVO])[A-Z]\d{6}[ABCD ]$/i,
  'en-IE': /^\d{7}[A-W][A-IW]{0,1}$/i,
  'en-US': /^\d{2}[- ]{0,1}\d{7}$/,
  'es-ES': /^(\d{0,8}|[XYZKLM]\d{7})[A-HJ-NP-TV-Z]$/i,
  'et-EE': /^[1-6]\d{6}(00[1-9]|0[1-9][0-9]|[1-6][0-9]{2}|70[0-9]|710)\d$/,
  'fi-FI': /^\d{6}[-+A]\d{3}[0-9A-FHJ-NPR-Y]$/i,
  'fr-BE': /^\d{11}$/,
  'fr-FR': /^[0-3]\d{12}$|^[0-3]\d\s\d{2}(\s\d{3}){3}$/,
  // Conforms both to official spec and provided example
  'fr-LU': /^\d{13}$/,
  'hr-HR': /^\d{11}$/,
  'hu-HU': /^8\d{9}$/,
  'it-IT': /^[A-Z]{6}[L-NP-V0-9]{2}[A-EHLMPRST][L-NP-V0-9]{2}[A-ILMZ][L-NP-V0-9]{3}[A-Z]$/i,
  'lv-LV': /^\d{6}-{0,1}\d{5}$/,
  // Conforms both to DG TAXUD spec and original research
  'mt-MT': /^\d{3,7}[APMGLHBZ]$|^([1-8])\1\d{7}$/i,
  'nl-NL': /^\d{9}$/,
  'pl-PL': /^\d{10,11}$/,
  'pt-BR': /(?:^\d{11}$)|(?:^\d{14}$)/,
  'pt-PT': /^\d{9}$/,
  'ro-RO': /^\d{13}$/,
  'sk-SK': /^\d{6}\/{0,1}\d{3,4}$/,
  'sl-SI': /^[1-9]\d{7}$/,
  'sv-SE': /^(\d{6}[-+]{0,1}\d{4}|(18|19|20)\d{6}[-+]{0,1}\d{4})$/
}; // taxIdFormat locale aliases

taxIdFormat['lb-LU'] = taxIdFormat['fr-LU'];
taxIdFormat['lt-LT'] = taxIdFormat['et-EE'];
taxIdFormat['nl-BE'] = taxIdFormat['fr-BE'];
taxIdFormat['fr-CA'] = taxIdFormat['en-CA']; // Algorithmic tax id check functions for various locales

var taxIdCheck = {
  'bg-BG': bgBgCheck,
  'cs-CZ': csCzCheck,
  'de-AT': deAtCheck,
  'de-DE': deDeCheck,
  'dk-DK': dkDkCheck,
  'el-CY': elCyCheck,
  'el-GR': elGrCheck,
  'en-CA': isCanadianSIN,
  'en-IE': enIeCheck,
  'en-US': enUsCheck,
  'es-ES': esEsCheck,
  'et-EE': etEeCheck,
  'fi-FI': fiFiCheck,
  'fr-BE': frBeCheck,
  'fr-FR': frFrCheck,
  'fr-LU': frLuCheck,
  'hr-HR': hrHrCheck,
  'hu-HU': huHuCheck,
  'it-IT': itItCheck,
  'lv-LV': lvLvCheck,
  'mt-MT': mtMtCheck,
  'nl-NL': nlNlCheck,
  'pl-PL': plPlCheck,
  'pt-BR': ptBrCheck,
  'pt-PT': ptPtCheck,
  'ro-RO': roRoCheck,
  'sk-SK': skSkCheck,
  'sl-SI': slSiCheck,
  'sv-SE': svSeCheck
}; // taxIdCheck locale aliases

taxIdCheck['lb-LU'] = taxIdCheck['fr-LU'];
taxIdCheck['lt-LT'] = taxIdCheck['et-EE'];
taxIdCheck['nl-BE'] = taxIdCheck['fr-BE'];
taxIdCheck['fr-CA'] = taxIdCheck['en-CA']; // Regexes for locales where characters should be omitted before checking format

var allsymbols = /[-\\\/!@#$%\^&\*\(\)\+\=\[\]]+/g;
var sanitizeRegexes = {
  'de-AT': allsymbols,
  'de-DE': /[\/\\]/g,
  'fr-BE': allsymbols
}; // sanitizeRegexes locale aliases

sanitizeRegexes['nl-BE'] = sanitizeRegexes['fr-BE'];
/*
 * Validator function
 * Return true if the passed string is a valid tax identification number
 * for the specified locale.
 * Throw an error exception if the locale is not supported.
 */

function isTaxID(str) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-US';
  (0, _assertString.default)(str); // Copy TIN to avoid replacement if sanitized

  var strcopy = str.slice(0);

  if (locale in taxIdFormat) {
    if (locale in sanitizeRegexes) {
      strcopy = strcopy.replace(sanitizeRegexes[locale], '');
    }

    if (!taxIdFormat[locale].test(strcopy)) {
      return false;
    }

    if (locale in taxIdCheck) {
      return taxIdCheck[locale](strcopy);
    } // Fallthrough; not all locales have algorithmic checks


    return true;
  }

  throw new Error("Invalid locale '".concat(locale, "'"));
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isTime.js":
/*!**********************************************!*\
  !*** ./node_modules/validator/lib/isTime.js ***!
  \**********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isTime;

var _merge = _interopRequireDefault(__webpack_require__(/*! ./util/merge */ "./node_modules/validator/lib/util/merge.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_time_options = {
  hourFormat: 'hour24',
  mode: 'default'
};
var formats = {
  hour24: {
    default: /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/,
    withSeconds: /^([01]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/
  },
  hour12: {
    default: /^(0?[1-9]|1[0-2]):([0-5][0-9]) (A|P)M$/,
    withSeconds: /^(0?[1-9]|1[0-2]):([0-5][0-9]):([0-5][0-9]) (A|P)M$/
  }
};

function isTime(input, options) {
  options = (0, _merge.default)(options, default_time_options);
  if (typeof input !== 'string') return false;
  return formats[options.hourFormat][options.mode].test(input);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isURL.js":
/*!*********************************************!*\
  !*** ./node_modules/validator/lib/isURL.js ***!
  \*********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isURL;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _isFQDN = _interopRequireDefault(__webpack_require__(/*! ./isFQDN */ "./node_modules/validator/lib/isFQDN.js"));

var _isIP = _interopRequireDefault(__webpack_require__(/*! ./isIP */ "./node_modules/validator/lib/isIP.js"));

var _merge = _interopRequireDefault(__webpack_require__(/*! ./util/merge */ "./node_modules/validator/lib/util/merge.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/*
options for isURL method

require_protocol - if set as true isURL will return false if protocol is not present in the URL
require_valid_protocol - isURL will check if the URL's protocol is present in the protocols option
protocols - valid protocols can be modified with this option
require_host - if set as false isURL will not check if host is present in the URL
require_port - if set as true isURL will check if port is present in the URL
allow_protocol_relative_urls - if set as true protocol relative URLs will be allowed
validate_length - if set as false isURL will skip string length validation (IE maximum is 2083)

*/
var default_url_options = {
  protocols: ['http', 'https', 'ftp'],
  require_tld: true,
  require_protocol: false,
  require_host: true,
  require_port: false,
  require_valid_protocol: true,
  allow_underscores: false,
  allow_trailing_dot: false,
  allow_protocol_relative_urls: false,
  allow_fragments: true,
  allow_query_components: true,
  validate_length: true
};
var wrapped_ipv6 = /^\[([^\]]+)\](?::([0-9]+))?$/;

function isRegExp(obj) {
  return Object.prototype.toString.call(obj) === '[object RegExp]';
}

function checkHost(host, matches) {
  for (var i = 0; i < matches.length; i++) {
    var match = matches[i];

    if (host === match || isRegExp(match) && match.test(host)) {
      return true;
    }
  }

  return false;
}

function isURL(url, options) {
  (0, _assertString.default)(url);

  if (!url || /[\s<>]/.test(url)) {
    return false;
  }

  if (url.indexOf('mailto:') === 0) {
    return false;
  }

  options = (0, _merge.default)(options, default_url_options);

  if (options.validate_length && url.length >= 2083) {
    return false;
  }

  if (!options.allow_fragments && url.includes('#')) {
    return false;
  }

  if (!options.allow_query_components && (url.includes('?') || url.includes('&'))) {
    return false;
  }

  var protocol, auth, host, hostname, port, port_str, split, ipv6;
  split = url.split('#');
  url = split.shift();
  split = url.split('?');
  url = split.shift();
  split = url.split('://');

  if (split.length > 1) {
    protocol = split.shift().toLowerCase();

    if (options.require_valid_protocol && options.protocols.indexOf(protocol) === -1) {
      return false;
    }
  } else if (options.require_protocol) {
    return false;
  } else if (url.slice(0, 2) === '//') {
    if (!options.allow_protocol_relative_urls) {
      return false;
    }

    split[0] = url.slice(2);
  }

  url = split.join('://');

  if (url === '') {
    return false;
  }

  split = url.split('/');
  url = split.shift();

  if (url === '' && !options.require_host) {
    return true;
  }

  split = url.split('@');

  if (split.length > 1) {
    if (options.disallow_auth) {
      return false;
    }

    if (split[0] === '') {
      return false;
    }

    auth = split.shift();

    if (auth.indexOf(':') >= 0 && auth.split(':').length > 2) {
      return false;
    }

    var _auth$split = auth.split(':'),
        _auth$split2 = _slicedToArray(_auth$split, 2),
        user = _auth$split2[0],
        password = _auth$split2[1];

    if (user === '' && password === '') {
      return false;
    }
  }

  hostname = split.join('@');
  port_str = null;
  ipv6 = null;
  var ipv6_match = hostname.match(wrapped_ipv6);

  if (ipv6_match) {
    host = '';
    ipv6 = ipv6_match[1];
    port_str = ipv6_match[2] || null;
  } else {
    split = hostname.split(':');
    host = split.shift();

    if (split.length) {
      port_str = split.join(':');
    }
  }

  if (port_str !== null && port_str.length > 0) {
    port = parseInt(port_str, 10);

    if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) {
      return false;
    }
  } else if (options.require_port) {
    return false;
  }

  if (options.host_whitelist) {
    return checkHost(host, options.host_whitelist);
  }

  if (host === '' && !options.require_host) {
    return true;
  }

  if (!(0, _isIP.default)(host) && !(0, _isFQDN.default)(host, options) && (!ipv6 || !(0, _isIP.default)(ipv6, 6))) {
    return false;
  }

  host = host || ipv6;

  if (options.host_blacklist && checkHost(host, options.host_blacklist)) {
    return false;
  }

  return true;
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isUUID.js":
/*!**********************************************!*\
  !*** ./node_modules/validator/lib/isUUID.js ***!
  \**********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isUUID;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uuid = {
  1: /^[0-9A-F]{8}-[0-9A-F]{4}-1[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
  2: /^[0-9A-F]{8}-[0-9A-F]{4}-2[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
  3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
  4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
};

function isUUID(str, version) {
  (0, _assertString.default)(str);
  var pattern = uuid[![undefined, null].includes(version) ? version : 'all'];
  return !!pattern && pattern.test(str);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isUppercase.js":
/*!***************************************************!*\
  !*** ./node_modules/validator/lib/isUppercase.js ***!
  \***************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isUppercase;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isUppercase(str) {
  (0, _assertString.default)(str);
  return str === str.toUpperCase();
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isVAT.js":
/*!*********************************************!*\
  !*** ./node_modules/validator/lib/isVAT.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isVAT;
exports.vatMatchers = void 0;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var algorithms = _interopRequireWildcard(__webpack_require__(/*! ./util/algorithms */ "./node_modules/validator/lib/util/algorithms.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PT = function PT(str) {
  var match = str.match(/^(PT)?(\d{9})$/);

  if (!match) {
    return false;
  }

  var tin = match[2];
  var checksum = 11 - algorithms.reverseMultiplyAndSum(tin.split('').slice(0, 8).map(function (a) {
    return parseInt(a, 10);
  }), 9) % 11;

  if (checksum > 9) {
    return parseInt(tin[8], 10) === 0;
  }

  return checksum === parseInt(tin[8], 10);
};

var vatMatchers = {
  /**
   * European Union VAT identification numbers
   */
  AT: function AT(str) {
    return /^(AT)?U\d{8}$/.test(str);
  },
  BE: function BE(str) {
    return /^(BE)?\d{10}$/.test(str);
  },
  BG: function BG(str) {
    return /^(BG)?\d{9,10}$/.test(str);
  },
  HR: function HR(str) {
    return /^(HR)?\d{11}$/.test(str);
  },
  CY: function CY(str) {
    return /^(CY)?\w{9}$/.test(str);
  },
  CZ: function CZ(str) {
    return /^(CZ)?\d{8,10}$/.test(str);
  },
  DK: function DK(str) {
    return /^(DK)?\d{8}$/.test(str);
  },
  EE: function EE(str) {
    return /^(EE)?\d{9}$/.test(str);
  },
  FI: function FI(str) {
    return /^(FI)?\d{8}$/.test(str);
  },
  FR: function FR(str) {
    return /^(FR)?\w{2}\d{9}$/.test(str);
  },
  DE: function DE(str) {
    return /^(DE)?\d{9}$/.test(str);
  },
  EL: function EL(str) {
    return /^(EL)?\d{9}$/.test(str);
  },
  HU: function HU(str) {
    return /^(HU)?\d{8}$/.test(str);
  },
  IE: function IE(str) {
    return /^(IE)?\d{7}\w{1}(W)?$/.test(str);
  },
  IT: function IT(str) {
    return /^(IT)?\d{11}$/.test(str);
  },
  LV: function LV(str) {
    return /^(LV)?\d{11}$/.test(str);
  },
  LT: function LT(str) {
    return /^(LT)?\d{9,12}$/.test(str);
  },
  LU: function LU(str) {
    return /^(LU)?\d{8}$/.test(str);
  },
  MT: function MT(str) {
    return /^(MT)?\d{8}$/.test(str);
  },
  NL: function NL(str) {
    return /^(NL)?\d{9}B\d{2}$/.test(str);
  },
  PL: function PL(str) {
    return /^(PL)?(\d{10}|(\d{3}-\d{3}-\d{2}-\d{2})|(\d{3}-\d{2}-\d{2}-\d{3}))$/.test(str);
  },
  PT: PT,
  RO: function RO(str) {
    return /^(RO)?\d{2,10}$/.test(str);
  },
  SK: function SK(str) {
    return /^(SK)?\d{10}$/.test(str);
  },
  SI: function SI(str) {
    return /^(SI)?\d{8}$/.test(str);
  },
  ES: function ES(str) {
    return /^(ES)?\w\d{7}[A-Z]$/.test(str);
  },
  SE: function SE(str) {
    return /^(SE)?\d{12}$/.test(str);
  },

  /**
   * VAT numbers of non-EU countries
   */
  AL: function AL(str) {
    return /^(AL)?\w{9}[A-Z]$/.test(str);
  },
  MK: function MK(str) {
    return /^(MK)?\d{13}$/.test(str);
  },
  AU: function AU(str) {
    return /^(AU)?\d{11}$/.test(str);
  },
  BY: function BY(str) {
    return /^(УНП )?\d{9}$/.test(str);
  },
  CA: function CA(str) {
    return /^(CA)?\d{9}$/.test(str);
  },
  IS: function IS(str) {
    return /^(IS)?\d{5,6}$/.test(str);
  },
  IN: function IN(str) {
    return /^(IN)?\d{15}$/.test(str);
  },
  ID: function ID(str) {
    return /^(ID)?(\d{15}|(\d{2}.\d{3}.\d{3}.\d{1}-\d{3}.\d{3}))$/.test(str);
  },
  IL: function IL(str) {
    return /^(IL)?\d{9}$/.test(str);
  },
  KZ: function KZ(str) {
    return /^(KZ)?\d{9}$/.test(str);
  },
  NZ: function NZ(str) {
    return /^(NZ)?\d{9}$/.test(str);
  },
  NG: function NG(str) {
    return /^(NG)?(\d{12}|(\d{8}-\d{4}))$/.test(str);
  },
  NO: function NO(str) {
    return /^(NO)?\d{9}MVA$/.test(str);
  },
  PH: function PH(str) {
    return /^(PH)?(\d{12}|\d{3} \d{3} \d{3} \d{3})$/.test(str);
  },
  RU: function RU(str) {
    return /^(RU)?(\d{10}|\d{12})$/.test(str);
  },
  SM: function SM(str) {
    return /^(SM)?\d{5}$/.test(str);
  },
  SA: function SA(str) {
    return /^(SA)?\d{15}$/.test(str);
  },
  RS: function RS(str) {
    return /^(RS)?\d{9}$/.test(str);
  },
  CH: function CH(str) {
    return /^(CH)?(\d{6}|\d{9}|(\d{3}.\d{3})|(\d{3}.\d{3}.\d{3}))(TVA|MWST|IVA)$/.test(str);
  },
  TR: function TR(str) {
    return /^(TR)?\d{10}$/.test(str);
  },
  UA: function UA(str) {
    return /^(UA)?\d{12}$/.test(str);
  },
  GB: function GB(str) {
    return /^GB((\d{3} \d{4} ([0-8][0-9]|9[0-6]))|(\d{9} \d{3})|(((GD[0-4])|(HA[5-9]))[0-9]{2}))$/.test(str);
  },
  UZ: function UZ(str) {
    return /^(UZ)?\d{9}$/.test(str);
  },

  /**
   * VAT numbers of Latin American countries
   */
  AR: function AR(str) {
    return /^(AR)?\d{11}$/.test(str);
  },
  BO: function BO(str) {
    return /^(BO)?\d{7}$/.test(str);
  },
  BR: function BR(str) {
    return /^(BR)?((\d{2}.\d{3}.\d{3}\/\d{4}-\d{2})|(\d{3}.\d{3}.\d{3}-\d{2}))$/.test(str);
  },
  CL: function CL(str) {
    return /^(CL)?\d{8}-\d{1}$/.test(str);
  },
  CO: function CO(str) {
    return /^(CO)?\d{10}$/.test(str);
  },
  CR: function CR(str) {
    return /^(CR)?\d{9,12}$/.test(str);
  },
  EC: function EC(str) {
    return /^(EC)?\d{13}$/.test(str);
  },
  SV: function SV(str) {
    return /^(SV)?\d{4}-\d{6}-\d{3}-\d{1}$/.test(str);
  },
  GT: function GT(str) {
    return /^(GT)?\d{7}-\d{1}$/.test(str);
  },
  HN: function HN(str) {
    return /^(HN)?$/.test(str);
  },
  MX: function MX(str) {
    return /^(MX)?\w{3,4}\d{6}\w{3}$/.test(str);
  },
  NI: function NI(str) {
    return /^(NI)?\d{3}-\d{6}-\d{4}\w{1}$/.test(str);
  },
  PA: function PA(str) {
    return /^(PA)?$/.test(str);
  },
  PY: function PY(str) {
    return /^(PY)?\d{6,8}-\d{1}$/.test(str);
  },
  PE: function PE(str) {
    return /^(PE)?\d{11}$/.test(str);
  },
  DO: function DO(str) {
    return /^(DO)?(\d{11}|(\d{3}-\d{7}-\d{1})|[1,4,5]{1}\d{8}|([1,4,5]{1})-\d{2}-\d{5}-\d{1})$/.test(str);
  },
  UY: function UY(str) {
    return /^(UY)?\d{12}$/.test(str);
  },
  VE: function VE(str) {
    return /^(VE)?[J,G,V,E]{1}-(\d{9}|(\d{8}-\d{1}))$/.test(str);
  }
};
exports.vatMatchers = vatMatchers;

function isVAT(str, countryCode) {
  (0, _assertString.default)(str);
  (0, _assertString.default)(countryCode);

  if (countryCode in vatMatchers) {
    return vatMatchers[countryCode](str);
  }

  throw new Error("Invalid country code: '".concat(countryCode, "'"));
}

/***/ }),

/***/ "./node_modules/validator/lib/isVariableWidth.js":
/*!*******************************************************!*\
  !*** ./node_modules/validator/lib/isVariableWidth.js ***!
  \*******************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isVariableWidth;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _isFullWidth = __webpack_require__(/*! ./isFullWidth */ "./node_modules/validator/lib/isFullWidth.js");

var _isHalfWidth = __webpack_require__(/*! ./isHalfWidth */ "./node_modules/validator/lib/isHalfWidth.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isVariableWidth(str) {
  (0, _assertString.default)(str);
  return _isFullWidth.fullWidth.test(str) && _isHalfWidth.halfWidth.test(str);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/isWhitelisted.js":
/*!*****************************************************!*\
  !*** ./node_modules/validator/lib/isWhitelisted.js ***!
  \*****************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = isWhitelisted;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isWhitelisted(str, chars) {
  (0, _assertString.default)(str);

  for (var i = str.length - 1; i >= 0; i--) {
    if (chars.indexOf(str[i]) === -1) {
      return false;
    }
  }

  return true;
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/ltrim.js":
/*!*********************************************!*\
  !*** ./node_modules/validator/lib/ltrim.js ***!
  \*********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = ltrim;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ltrim(str, chars) {
  (0, _assertString.default)(str); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping

  var pattern = chars ? new RegExp("^[".concat(chars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "]+"), 'g') : /^\s+/g;
  return str.replace(pattern, '');
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/matches.js":
/*!***********************************************!*\
  !*** ./node_modules/validator/lib/matches.js ***!
  \***********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = matches;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function matches(str, pattern, modifiers) {
  (0, _assertString.default)(str);

  if (Object.prototype.toString.call(pattern) !== '[object RegExp]') {
    pattern = new RegExp(pattern, modifiers);
  }

  return !!str.match(pattern);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/normalizeEmail.js":
/*!******************************************************!*\
  !*** ./node_modules/validator/lib/normalizeEmail.js ***!
  \******************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = normalizeEmail;

var _merge = _interopRequireDefault(__webpack_require__(/*! ./util/merge */ "./node_modules/validator/lib/util/merge.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_normalize_email_options = {
  // The following options apply to all email addresses
  // Lowercases the local part of the email address.
  // Please note this may violate RFC 5321 as per http://stackoverflow.com/a/9808332/192024).
  // The domain is always lowercased, as per RFC 1035
  all_lowercase: true,
  // The following conversions are specific to GMail
  // Lowercases the local part of the GMail address (known to be case-insensitive)
  gmail_lowercase: true,
  // Removes dots from the local part of the email address, as that's ignored by GMail
  gmail_remove_dots: true,
  // Removes the subaddress (e.g. "+foo") from the email address
  gmail_remove_subaddress: true,
  // Conversts the googlemail.com domain to gmail.com
  gmail_convert_googlemaildotcom: true,
  // The following conversions are specific to Outlook.com / Windows Live / Hotmail
  // Lowercases the local part of the Outlook.com address (known to be case-insensitive)
  outlookdotcom_lowercase: true,
  // Removes the subaddress (e.g. "+foo") from the email address
  outlookdotcom_remove_subaddress: true,
  // The following conversions are specific to Yahoo
  // Lowercases the local part of the Yahoo address (known to be case-insensitive)
  yahoo_lowercase: true,
  // Removes the subaddress (e.g. "-foo") from the email address
  yahoo_remove_subaddress: true,
  // The following conversions are specific to Yandex
  // Lowercases the local part of the Yandex address (known to be case-insensitive)
  yandex_lowercase: true,
  // The following conversions are specific to iCloud
  // Lowercases the local part of the iCloud address (known to be case-insensitive)
  icloud_lowercase: true,
  // Removes the subaddress (e.g. "+foo") from the email address
  icloud_remove_subaddress: true
}; // List of domains used by iCloud

var icloud_domains = ['icloud.com', 'me.com']; // List of domains used by Outlook.com and its predecessors
// This list is likely incomplete.
// Partial reference:
// https://blogs.office.com/2013/04/17/outlook-com-gets-two-step-verification-sign-in-by-alias-and-new-international-domains/

var outlookdotcom_domains = ['hotmail.at', 'hotmail.be', 'hotmail.ca', 'hotmail.cl', 'hotmail.co.il', 'hotmail.co.nz', 'hotmail.co.th', 'hotmail.co.uk', 'hotmail.com', 'hotmail.com.ar', 'hotmail.com.au', 'hotmail.com.br', 'hotmail.com.gr', 'hotmail.com.mx', 'hotmail.com.pe', 'hotmail.com.tr', 'hotmail.com.vn', 'hotmail.cz', 'hotmail.de', 'hotmail.dk', 'hotmail.es', 'hotmail.fr', 'hotmail.hu', 'hotmail.id', 'hotmail.ie', 'hotmail.in', 'hotmail.it', 'hotmail.jp', 'hotmail.kr', 'hotmail.lv', 'hotmail.my', 'hotmail.ph', 'hotmail.pt', 'hotmail.sa', 'hotmail.sg', 'hotmail.sk', 'live.be', 'live.co.uk', 'live.com', 'live.com.ar', 'live.com.mx', 'live.de', 'live.es', 'live.eu', 'live.fr', 'live.it', 'live.nl', 'msn.com', 'outlook.at', 'outlook.be', 'outlook.cl', 'outlook.co.il', 'outlook.co.nz', 'outlook.co.th', 'outlook.com', 'outlook.com.ar', 'outlook.com.au', 'outlook.com.br', 'outlook.com.gr', 'outlook.com.pe', 'outlook.com.tr', 'outlook.com.vn', 'outlook.cz', 'outlook.de', 'outlook.dk', 'outlook.es', 'outlook.fr', 'outlook.hu', 'outlook.id', 'outlook.ie', 'outlook.in', 'outlook.it', 'outlook.jp', 'outlook.kr', 'outlook.lv', 'outlook.my', 'outlook.ph', 'outlook.pt', 'outlook.sa', 'outlook.sg', 'outlook.sk', 'passport.com']; // List of domains used by Yahoo Mail
// This list is likely incomplete

var yahoo_domains = ['rocketmail.com', 'yahoo.ca', 'yahoo.co.uk', 'yahoo.com', 'yahoo.de', 'yahoo.fr', 'yahoo.in', 'yahoo.it', 'ymail.com']; // List of domains used by yandex.ru

var yandex_domains = ['yandex.ru', 'yandex.ua', 'yandex.kz', 'yandex.com', 'yandex.by', 'ya.ru']; // replace single dots, but not multiple consecutive dots

function dotsReplacer(match) {
  if (match.length > 1) {
    return match;
  }

  return '';
}

function normalizeEmail(email, options) {
  options = (0, _merge.default)(options, default_normalize_email_options);
  var raw_parts = email.split('@');
  var domain = raw_parts.pop();
  var user = raw_parts.join('@');
  var parts = [user, domain]; // The domain is always lowercased, as it's case-insensitive per RFC 1035

  parts[1] = parts[1].toLowerCase();

  if (parts[1] === 'gmail.com' || parts[1] === 'googlemail.com') {
    // Address is GMail
    if (options.gmail_remove_subaddress) {
      parts[0] = parts[0].split('+')[0];
    }

    if (options.gmail_remove_dots) {
      // this does not replace consecutive dots like example..email@gmail.com
      parts[0] = parts[0].replace(/\.+/g, dotsReplacer);
    }

    if (!parts[0].length) {
      return false;
    }

    if (options.all_lowercase || options.gmail_lowercase) {
      parts[0] = parts[0].toLowerCase();
    }

    parts[1] = options.gmail_convert_googlemaildotcom ? 'gmail.com' : parts[1];
  } else if (icloud_domains.indexOf(parts[1]) >= 0) {
    // Address is iCloud
    if (options.icloud_remove_subaddress) {
      parts[0] = parts[0].split('+')[0];
    }

    if (!parts[0].length) {
      return false;
    }

    if (options.all_lowercase || options.icloud_lowercase) {
      parts[0] = parts[0].toLowerCase();
    }
  } else if (outlookdotcom_domains.indexOf(parts[1]) >= 0) {
    // Address is Outlook.com
    if (options.outlookdotcom_remove_subaddress) {
      parts[0] = parts[0].split('+')[0];
    }

    if (!parts[0].length) {
      return false;
    }

    if (options.all_lowercase || options.outlookdotcom_lowercase) {
      parts[0] = parts[0].toLowerCase();
    }
  } else if (yahoo_domains.indexOf(parts[1]) >= 0) {
    // Address is Yahoo
    if (options.yahoo_remove_subaddress) {
      var components = parts[0].split('-');
      parts[0] = components.length > 1 ? components.slice(0, -1).join('-') : components[0];
    }

    if (!parts[0].length) {
      return false;
    }

    if (options.all_lowercase || options.yahoo_lowercase) {
      parts[0] = parts[0].toLowerCase();
    }
  } else if (yandex_domains.indexOf(parts[1]) >= 0) {
    if (options.all_lowercase || options.yandex_lowercase) {
      parts[0] = parts[0].toLowerCase();
    }

    parts[1] = 'yandex.ru'; // all yandex domains are equal, 1st preferred
  } else if (options.all_lowercase) {
    // Any other address
    parts[0] = parts[0].toLowerCase();
  }

  return parts.join('@');
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/rtrim.js":
/*!*********************************************!*\
  !*** ./node_modules/validator/lib/rtrim.js ***!
  \*********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = rtrim;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function rtrim(str, chars) {
  (0, _assertString.default)(str);

  if (chars) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
    var pattern = new RegExp("[".concat(chars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "]+$"), 'g');
    return str.replace(pattern, '');
  } // Use a faster and more safe than regex trim method https://blog.stevenlevithan.com/archives/faster-trim-javascript


  var strIndex = str.length - 1;

  while (/\s/.test(str.charAt(strIndex))) {
    strIndex -= 1;
  }

  return str.slice(0, strIndex + 1);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/stripLow.js":
/*!************************************************!*\
  !*** ./node_modules/validator/lib/stripLow.js ***!
  \************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = stripLow;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

var _blacklist = _interopRequireDefault(__webpack_require__(/*! ./blacklist */ "./node_modules/validator/lib/blacklist.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stripLow(str, keep_new_lines) {
  (0, _assertString.default)(str);
  var chars = keep_new_lines ? '\\x00-\\x09\\x0B\\x0C\\x0E-\\x1F\\x7F' : '\\x00-\\x1F\\x7F';
  return (0, _blacklist.default)(str, chars);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/toBoolean.js":
/*!*************************************************!*\
  !*** ./node_modules/validator/lib/toBoolean.js ***!
  \*************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = toBoolean;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toBoolean(str, strict) {
  (0, _assertString.default)(str);

  if (strict) {
    return str === '1' || /^true$/i.test(str);
  }

  return str !== '0' && !/^false$/i.test(str) && str !== '';
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/toDate.js":
/*!**********************************************!*\
  !*** ./node_modules/validator/lib/toDate.js ***!
  \**********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = toDate;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toDate(date) {
  (0, _assertString.default)(date);
  date = Date.parse(date);
  return !isNaN(date) ? new Date(date) : null;
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/toFloat.js":
/*!***********************************************!*\
  !*** ./node_modules/validator/lib/toFloat.js ***!
  \***********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = toFloat;

var _isFloat = _interopRequireDefault(__webpack_require__(/*! ./isFloat */ "./node_modules/validator/lib/isFloat.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toFloat(str) {
  if (!(0, _isFloat.default)(str)) return NaN;
  return parseFloat(str);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/toInt.js":
/*!*********************************************!*\
  !*** ./node_modules/validator/lib/toInt.js ***!
  \*********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = toInt;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toInt(str, radix) {
  (0, _assertString.default)(str);
  return parseInt(str, radix || 10);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/trim.js":
/*!********************************************!*\
  !*** ./node_modules/validator/lib/trim.js ***!
  \********************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = trim;

var _rtrim = _interopRequireDefault(__webpack_require__(/*! ./rtrim */ "./node_modules/validator/lib/rtrim.js"));

var _ltrim = _interopRequireDefault(__webpack_require__(/*! ./ltrim */ "./node_modules/validator/lib/ltrim.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function trim(str, chars) {
  return (0, _rtrim.default)((0, _ltrim.default)(str, chars), chars);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/unescape.js":
/*!************************************************!*\
  !*** ./node_modules/validator/lib/unescape.js ***!
  \************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = unescape;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function unescape(str) {
  (0, _assertString.default)(str);
  return str.replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#x2F;/g, '/').replace(/&#x5C;/g, '\\').replace(/&#96;/g, '`').replace(/&amp;/g, '&'); // &amp; replacement has to be the last one to prevent
  // bugs with intermediate strings containing escape sequences
  // See: https://github.com/validatorjs/validator.js/issues/1827
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/util/algorithms.js":
/*!*******************************************************!*\
  !*** ./node_modules/validator/lib/util/algorithms.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.iso7064Check = iso7064Check;
exports.luhnCheck = luhnCheck;
exports.reverseMultiplyAndSum = reverseMultiplyAndSum;
exports.verhoeffCheck = verhoeffCheck;

/**
 * Algorithmic validation functions
 * May be used as is or implemented in the workflow of other validators.
 */

/*
 * ISO 7064 validation function
 * Called with a string of numbers (incl. check digit)
 * to validate according to ISO 7064 (MOD 11, 10).
 */
function iso7064Check(str) {
  var checkvalue = 10;

  for (var i = 0; i < str.length - 1; i++) {
    checkvalue = (parseInt(str[i], 10) + checkvalue) % 10 === 0 ? 10 * 2 % 11 : (parseInt(str[i], 10) + checkvalue) % 10 * 2 % 11;
  }

  checkvalue = checkvalue === 1 ? 0 : 11 - checkvalue;
  return checkvalue === parseInt(str[10], 10);
}
/*
 * Luhn (mod 10) validation function
 * Called with a string of numbers (incl. check digit)
 * to validate according to the Luhn algorithm.
 */


function luhnCheck(str) {
  var checksum = 0;
  var second = false;

  for (var i = str.length - 1; i >= 0; i--) {
    if (second) {
      var product = parseInt(str[i], 10) * 2;

      if (product > 9) {
        // sum digits of product and add to checksum
        checksum += product.toString().split('').map(function (a) {
          return parseInt(a, 10);
        }).reduce(function (a, b) {
          return a + b;
        }, 0);
      } else {
        checksum += product;
      }
    } else {
      checksum += parseInt(str[i], 10);
    }

    second = !second;
  }

  return checksum % 10 === 0;
}
/*
 * Reverse TIN multiplication and summation helper function
 * Called with an array of single-digit integers and a base multiplier
 * to calculate the sum of the digits multiplied in reverse.
 * Normally used in variations of MOD 11 algorithmic checks.
 */


function reverseMultiplyAndSum(digits, base) {
  var total = 0;

  for (var i = 0; i < digits.length; i++) {
    total += digits[i] * (base - i);
  }

  return total;
}
/*
 * Verhoeff validation helper function
 * Called with a string of numbers
 * to validate according to the Verhoeff algorithm.
 */


function verhoeffCheck(str) {
  var d_table = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 0, 6, 7, 8, 9, 5], [2, 3, 4, 0, 1, 7, 8, 9, 5, 6], [3, 4, 0, 1, 2, 8, 9, 5, 6, 7], [4, 0, 1, 2, 3, 9, 5, 6, 7, 8], [5, 9, 8, 7, 6, 0, 4, 3, 2, 1], [6, 5, 9, 8, 7, 1, 0, 4, 3, 2], [7, 6, 5, 9, 8, 2, 1, 0, 4, 3], [8, 7, 6, 5, 9, 3, 2, 1, 0, 4], [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]];
  var p_table = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 5, 7, 6, 2, 8, 3, 0, 9, 4], [5, 8, 0, 3, 7, 9, 6, 1, 4, 2], [8, 9, 1, 6, 0, 4, 3, 5, 2, 7], [9, 4, 5, 3, 1, 2, 6, 8, 7, 0], [4, 2, 8, 6, 5, 7, 3, 9, 0, 1], [2, 7, 9, 3, 8, 0, 6, 4, 1, 5], [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]]; // Copy (to prevent replacement) and reverse

  var str_copy = str.split('').reverse().join('');
  var checksum = 0;

  for (var i = 0; i < str_copy.length; i++) {
    checksum = d_table[checksum][p_table[i % 8][parseInt(str_copy[i], 10)]];
  }

  return checksum === 0;
}

/***/ }),

/***/ "./node_modules/validator/lib/util/assertString.js":
/*!*********************************************************!*\
  !*** ./node_modules/validator/lib/util/assertString.js ***!
  \*********************************************************/
/***/ ((module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = assertString;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function assertString(input) {
  var isString = typeof input === 'string' || input instanceof String;

  if (!isString) {
    var invalidType = _typeof(input);

    if (input === null) invalidType = 'null';else if (invalidType === 'object') invalidType = input.constructor.name;
    throw new TypeError("Expected a string but received a ".concat(invalidType));
  }
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/util/includes.js":
/*!*****************************************************!*\
  !*** ./node_modules/validator/lib/util/includes.js ***!
  \*****************************************************/
/***/ ((module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var includes = function includes(arr, val) {
  return arr.some(function (arrVal) {
    return val === arrVal;
  });
};

var _default = includes;
exports["default"] = _default;
module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/util/merge.js":
/*!**************************************************!*\
  !*** ./node_modules/validator/lib/util/merge.js ***!
  \**************************************************/
/***/ ((module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = merge;

function merge() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaults = arguments.length > 1 ? arguments[1] : undefined;

  for (var key in defaults) {
    if (typeof obj[key] === 'undefined') {
      obj[key] = defaults[key];
    }
  }

  return obj;
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/util/multilineRegex.js":
/*!***********************************************************!*\
  !*** ./node_modules/validator/lib/util/multilineRegex.js ***!
  \***********************************************************/
/***/ ((module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = multilineRegexp;

/**
 * Build RegExp object from an array
 * of multiple/multi-line regexp parts
 *
 * @param {string[]} parts
 * @param {string} flags
 * @return {object} - RegExp object
 */
function multilineRegexp(parts, flags) {
  var regexpAsStringLiteral = parts.join('');
  return new RegExp(regexpAsStringLiteral, flags);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/util/toString.js":
/*!*****************************************************!*\
  !*** ./node_modules/validator/lib/util/toString.js ***!
  \*****************************************************/
/***/ ((module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = toString;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function toString(input) {
  if (_typeof(input) === 'object' && input !== null) {
    if (typeof input.toString === 'function') {
      input = input.toString();
    } else {
      input = '[object Object]';
    }
  } else if (input === null || typeof input === 'undefined' || isNaN(input) && !input.length) {
    input = '';
  }

  return String(input);
}

module.exports = exports.default;
module.exports["default"] = exports.default;

/***/ }),

/***/ "./node_modules/validator/lib/whitelist.js":
/*!*************************************************!*\
  !*** ./node_modules/validator/lib/whitelist.js ***!
  \*************************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = whitelist;

var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function whitelist(str, chars) {
  (0, _assertString.default)(str);
  return str.replace(new RegExp("[^".concat(chars, "]+"), 'g'), '');
}

module.exports = exports.default;
module.exports["default"] = exports.default;

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/*!**************************!*\
  !*** ./src/edit-form.ts ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_edit_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/edit-form */ "./src/components/edit-form.ts");

const currentHref = new URL(window.location.href);
const searchParams = new URLSearchParams(currentHref.search);
const idSong = searchParams.get('id');
const Form = new _components_edit_form__WEBPACK_IMPORTED_MODULE_0__["default"](idSong);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBRTtBQUN4QixHQUFHO0FBQ0g7QUFDQSxxQkFBcUIsR0FBRztBQUN4QixHQUFHO0FBQ0g7QUFDQSxxQkFBcUIsS0FBSztBQUMxQixHQUFHO0FBQ0g7QUFDQSxxQkFBcUIsR0FBRztBQUN4QixHQUFHO0FBQ0g7QUFDQSxxQkFBcUIsRUFBRTtBQUN2QixHQUFHO0FBQ0g7QUFDQSxxQkFBcUIsS0FBSztBQUMxQixHQUFHO0FBQ0g7QUFDQSxxQkFBcUIsRUFBRTtBQUN2QixHQUFHO0FBQ0g7QUFDQSxxQkFBcUIsRUFBRTtBQUN2QixHQUFHO0FBQ0g7QUFDQSxxQkFBcUIsRUFBRTtBQUN2QixHQUFHO0FBQ0g7QUFDQSxxQkFBcUIsRUFBRSxHQUFHLEVBQUU7QUFDNUIsR0FBRztBQUNIO0FBQ0EscUJBQXFCLEVBQUU7QUFDdkIsR0FBRztBQUNIO0FBQ0EscUJBQXFCLEVBQUU7QUFDdkIsR0FBRztBQUNIO0FBQ0EscUJBQXFCLEVBQUU7QUFDdkIsR0FBRztBQUNIO0FBQ0EscUJBQXFCLEVBQUUsR0FBRyxFQUFFO0FBQzVCLEdBQUc7QUFDSDtBQUNBLHFCQUFxQixHQUFHO0FBQ3hCLEdBQUc7QUFDSDtBQUNBLHFCQUFxQixHQUFHO0FBQ3hCLEdBQUc7QUFDSDtBQUNBLHFCQUFxQixLQUFLO0FBQzFCLEdBQUc7QUFDSDtBQUNBLHFCQUFxQixFQUFFO0FBQ3ZCLEdBQUc7QUFDSDtBQUNBLHFCQUFxQixFQUFFO0FBQ3ZCLEdBQUc7QUFDSDtBQUNBLHFCQUFxQixFQUFFLElBQUksRUFBRTtBQUM3QixHQUFHO0FBQ0g7QUFDQSxzQkFBc0IsR0FBRyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQzVFLEdBQUc7QUFDSDtBQUNBO0FBQ0EscUJBQXFCLEtBQUs7QUFDMUIsR0FBRztBQUNIO0FBQ0EscUJBQXFCLEdBQUc7QUFDeEIsR0FBRztBQUNIO0FBQ0EscUJBQXFCLEVBQUU7QUFDdkIsR0FBRztBQUNIO0FBQ0Es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QUF3QixPQUFPLGtDQUFrQyxtSUFBbUk7O0FBRXBXO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EseUJBQXNCOzs7Ozs7Ozs7O0FDeEJUOztBQUViLDhDQUE2QztBQUM3QztBQUNBLENBQUMsRUFBQztBQUNGLGtCQUFlOztBQUVmLDJDQUEyQyxtQkFBTyxDQUFDLDhFQUFxQjs7QUFFeEUsdUNBQXVDLHVDQUF1Qzs7QUFFOUU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5QkFBc0I7Ozs7OztVQ2pCdEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ044QztBQUM5QztBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsNkRBQVEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sYWItMS8uL3NyYy9jb21wb25lbnRzL2VkaXQtZm9ybS50cyIsIndlYnBhY2s6Ly9sYWItMS8uL3NyYy9zZXJ2aWNlcy9hcGkudHMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2luZGV4LmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvYWxwaGEuanMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9ibGFja2xpc3QuanMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9jb250YWlucy5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2VxdWFscy5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2VzY2FwZS5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzQWZ0ZXIuanMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc0FscGhhLmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNBbHBoYW51bWVyaWMuanMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc0FzY2lpLmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNCSUMuanMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc0Jhc2UzMi5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzQmFzZTU4LmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNCYXNlNjQuanMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc0JlZm9yZS5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzQm9vbGVhbi5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzQnRjQWRkcmVzcy5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzQnl0ZUxlbmd0aC5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzQ3JlZGl0Q2FyZC5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzQ3VycmVuY3kuanMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc0RhdGFVUkkuanMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc0RhdGUuanMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc0RlY2ltYWwuanMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc0RpdmlzaWJsZUJ5LmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNFQU4uanMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc0VtYWlsLmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNFbXB0eS5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzRXRoZXJldW1BZGRyZXNzLmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNGUUROLmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNGbG9hdC5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzRnVsbFdpZHRoLmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNIU0wuanMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc0hhbGZXaWR0aC5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzSGFzaC5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzSGV4Q29sb3IuanMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc0hleGFkZWNpbWFsLmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNJQkFOLmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNJTUVJLmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNJUC5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzSVBSYW5nZS5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzSVNCTi5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzSVNJTi5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzSVNPMzE2NjFBbHBoYTIuanMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc0lTTzMxNjYxQWxwaGEzLmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNJU080MjE3LmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNJU082MzkxLmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNJU084NjAxLmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNJU1JDLmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNJU1NOLmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNJZGVudGl0eUNhcmQuanMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc0luLmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNJbnQuanMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc0pTT04uanMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc0pXVC5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzTGF0TG9uZy5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzTGVuZ3RoLmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNMaWNlbnNlUGxhdGUuanMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc0xvY2FsZS5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzTG93ZXJjYXNlLmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNMdWhuTnVtYmVyLmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNNQUNBZGRyZXNzLmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNNRDUuanMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc01hZ25ldFVSSS5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzTWltZVR5cGUuanMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc01vYmlsZVBob25lLmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNNb25nb0lkLmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNNdWx0aWJ5dGUuanMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc051bWVyaWMuanMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc09jdGFsLmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNQYXNzcG9ydE51bWJlci5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzUG9ydC5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzUG9zdGFsQ29kZS5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzUkZDMzMzOS5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzUmdiQ29sb3IuanMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc1NlbVZlci5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzU2x1Zy5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzU3Ryb25nUGFzc3dvcmQuanMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc1N1cnJvZ2F0ZVBhaXIuanMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc1RheElELmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNUaW1lLmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNVUkwuanMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc1VVSUQuanMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc1VwcGVyY2FzZS5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzVkFULmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNWYXJpYWJsZVdpZHRoLmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNXaGl0ZWxpc3RlZC5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2x0cmltLmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvbWF0Y2hlcy5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL25vcm1hbGl6ZUVtYWlsLmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvcnRyaW0uanMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9zdHJpcExvdy5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL3RvQm9vbGVhbi5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL3RvRGF0ZS5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL3RvRmxvYXQuanMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi90b0ludC5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL3RyaW0uanMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi91bmVzY2FwZS5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL3V0aWwvYWxnb3JpdGhtcy5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL3V0aWwvYXNzZXJ0U3RyaW5nLmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvdXRpbC9pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL3V0aWwvbWVyZ2UuanMiLCJ3ZWJwYWNrOi8vbGFiLTEvLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi91dGlsL211bHRpbGluZVJlZ2V4LmpzIiwid2VicGFjazovL2xhYi0xLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvdXRpbC90b1N0cmluZy5qcyIsIndlYnBhY2s6Ly9sYWItMS8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL3doaXRlbGlzdC5qcyIsIndlYnBhY2s6Ly9sYWItMS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9sYWItMS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9sYWItMS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbGFiLTEvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sYWItMS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2xhYi0xLy4vc3JjL2VkaXQtZm9ybS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbmltcG9ydCB2YWxpZGF0b3IgZnJvbSAndmFsaWRhdG9yJztcclxuaW1wb3J0IHsgZ2V0U29uZ0J5SWQgfSBmcm9tICcuLi9zZXJ2aWNlcy9hcGknO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0Rm9ybSB7XHJcbiAgICBjb25zdHJ1Y3RvcihpZFNvbmcpIHtcclxuICAgICAgICB0aGlzLmZvcm1FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybScpO1xyXG4gICAgICAgIHRoaXMubmFtZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cIm5hbWVcIl0nKTtcclxuICAgICAgICB0aGlzLmF1dGhvcklucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cImF1dGhvclwiXScpO1xyXG4gICAgICAgIHRoaXMudmlld0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cInZpZXdcIl0nKTtcclxuICAgICAgICB0aGlzLnRpbWVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJ0aW1lXCJdJyk7XHJcbiAgICAgICAgdGhpcy5pbWFnZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cImltYWdlXCJdJyk7XHJcbiAgICAgICAgdGhpcy5tdXNpY0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cIm11c2ljXCJdJyk7XHJcbiAgICAgICAgdGhpcy5pbWFnZVByZXZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW1hZ2UtcHJldmlldycpO1xyXG4gICAgICAgIHRoaXMuaWRTb25nID0gaWRTb25nO1xyXG4gICAgICAgIGNvbnN0IHJlbmRlckNvbnRlbnQgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gZ2V0U29uZ0J5SWQodGhpcy5pZFNvbmcpO1xyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KCdDw7MgbOG7l2kgeOG6o3kgcmEnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJlbmRlckNvbnRlbnRcclxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5uYW1lSW5wdXQudmFsdWUgPSBkYXRhLm5hbWVTb25nO1xyXG4gICAgICAgICAgICB0aGlzLmF1dGhvcklucHV0LnZhbHVlID0gZGF0YS5hdXRob3I7XHJcbiAgICAgICAgICAgIHRoaXMudmlld0lucHV0LnZhbHVlID0gZGF0YS52aWV3LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHRoaXMudGltZUlucHV0LnZhbHVlID0gZGF0YS50aW1lO1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlUHJldmlldy5zcmMgPSBgLi4vcHVibGljL2ltYWdlcy8ke2RhdGEuaW1hZ2V9YDtcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5sb2coZXJyKSk7XHJcbiAgICAgICAgdGhpcy5jb25maWdFdmVudCgpO1xyXG4gICAgfVxyXG4gICAgY29uZmlnRXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5pbWFnZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gZS50YXJnZXQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gaW5wdXQudmFsdWUuc3BsaXQoJ1xcXFwnKVsyXTtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZVByZXZpZXcuc3JjID0gYC4uL3B1YmxpYy9pbWFnZXMvJHt2YWx1ZX1gO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZm9ybUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWVTb25nID0gdGhpcy5uYW1lSW5wdXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhdXRob3IgPSB0aGlzLmF1dGhvcklucHV0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmlldyA9IHRoaXMudmlld0lucHV0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGltZSA9IHRoaXMudGltZUlucHV0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW1hZ2UgPSB0aGlzLmltYWdlSW5wdXQudmFsdWUuc3BsaXQoJ1xcXFwnKVsyXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG11c2ljID0gdGhpcy5tdXNpY0lucHV0LnZhbHVlLnNwbGl0KCdcXFxcJylbMl07XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZhbGlkYXRvci5pc0xlbmd0aChuYW1lU29uZywgeyBtaW46IDEsIG1heDogNTAgfSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWxlcnQoJ1TDqm4gYsOgaSBow6F0IHBo4bqjaSBjw7MgdOG7qyAxLTUwIGvDrSB04buxJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZhbGlkYXRvci5pc0xlbmd0aChhdXRob3IsIHsgbWluOiAxLCBtYXg6IDMwIH0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFsZXJ0KCdUw6puIHTDoWMgZ2nhuqMgcGjhuqNpIGPDsyB04burIDEtMzAga8OtIHThu7EnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghdmFsaWRhdG9yLmlzSW50KHZpZXcsIHsgbWluOiAwIH0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFsZXJ0KCdMxrDhu6N0IHhlbSBwaOG6o2kgbMOgIHPhu5EgISEhJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgcGF5bG9hZCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lU29uZyxcclxuICAgICAgICAgICAgICAgICAgICBhdXRob3IsXHJcbiAgICAgICAgICAgICAgICAgICAgdmlldzogTnVtYmVyKHZpZXcpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWUsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgaWYgKGltYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF5bG9hZCA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgcGF5bG9hZCksIHsgaW1hZ2UgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobXVzaWMpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwYXlsb2FkKSwgeyBtdXNpYyB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BBVENIJyxcclxuICAgICAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpLCB7IGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjMwMzAvc29uZ3MvJHt0aGlzLmlkU29uZ31gLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2Uub2sgfHwgcmVzdWx0LnN0YXR1cyA9PT0gJ2ZhaWxlZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWxlcnQocmVzdWx0Lm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL0NsaWVudC9zcmMvdmlld3MvaW5kZXguaHRtbCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxufVxyXG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRBbGxTb25nID0gKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKCdodHRwOi8vbG9jYWxob3N0OjMwMzAvc29uZ3MnKTtcclxuICAgIGNvbnN0IGRhdGEgPSB5aWVsZCByZXNwb25zZS5qc29uKCk7XHJcbiAgICByZXR1cm4gZGF0YS5kYXRhO1xyXG59KTtcclxuZXhwb3J0IGNvbnN0IGdldEFsbFNob3dTb25nID0gKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGZldGNoKCdodHRwOi8vbG9jYWxob3N0OjMwMzAvc29uZ3Mvc2hvdycpO1xyXG4gICAgY29uc3QgZGF0YSA9IHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcclxuICAgIHJldHVybiBkYXRhLmRhdGE7XHJcbn0pO1xyXG5leHBvcnQgY29uc3QgZ2V0QWxsTXlTb25nID0gKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICBsZXQgb3B0aW9ucyA9IHt9O1xyXG4gICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykpIHtcclxuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKSwgeyBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7c2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKX1gLFxyXG4gICAgICAgICAgICB9IH0pO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDozMDMwL3NvbmdzL215c29uZ2AsIG9wdGlvbnMpO1xyXG4gICAgY29uc3QgZGF0YSA9IHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcclxuICAgIHJldHVybiBkYXRhLmRhdGE7XHJcbn0pO1xyXG5leHBvcnQgY29uc3QgZ2V0U29uZ0J5SWQgPSAoaWRTb25nKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6MzAzMC9zb25ncy8ke2lkU29uZ31gKTtcclxuICAgIGNvbnN0IGRhdGEgPSB5aWVsZCByZXNwb25zZS5qc29uKCk7XHJcbiAgICByZXR1cm4gZGF0YS5kYXRhO1xyXG59KTtcclxuZXhwb3J0IGNvbnN0IGdldE15SW5mbyA9ICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgbGV0IG9wdGlvbnMgPSB7fTtcclxuICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpKSB7XHJcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyksIHsgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Nlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJyl9YCxcclxuICAgICAgICAgICAgfSB9KTtcclxuICAgIH1cclxuICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6MzAzMC91c2VyL215SW5mb2AsIG9wdGlvbnMpO1xyXG4gICAgY29uc3QgZGF0YSA9IHlpZWxkIHJlc3BvbnNlLmpzb24oKTtcclxuICAgIHJldHVybiBkYXRhLmRhdGE7XHJcbn0pO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiOyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG52YXIgX3RvRGF0ZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL3RvRGF0ZVwiKSk7XG5cbnZhciBfdG9GbG9hdCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL3RvRmxvYXRcIikpO1xuXG52YXIgX3RvSW50ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvdG9JbnRcIikpO1xuXG52YXIgX3RvQm9vbGVhbiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL3RvQm9vbGVhblwiKSk7XG5cbnZhciBfZXF1YWxzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvZXF1YWxzXCIpKTtcblxudmFyIF9jb250YWlucyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2NvbnRhaW5zXCIpKTtcblxudmFyIF9tYXRjaGVzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvbWF0Y2hlc1wiKSk7XG5cbnZhciBfaXNFbWFpbCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzRW1haWxcIikpO1xuXG52YXIgX2lzVVJMID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNVUkxcIikpO1xuXG52YXIgX2lzTUFDQWRkcmVzcyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzTUFDQWRkcmVzc1wiKSk7XG5cbnZhciBfaXNJUCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzSVBcIikpO1xuXG52YXIgX2lzSVBSYW5nZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzSVBSYW5nZVwiKSk7XG5cbnZhciBfaXNGUUROID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNGUUROXCIpKTtcblxudmFyIF9pc0RhdGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc0RhdGVcIikpO1xuXG52YXIgX2lzVGltZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzVGltZVwiKSk7XG5cbnZhciBfaXNCb29sZWFuID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNCb29sZWFuXCIpKTtcblxudmFyIF9pc0xvY2FsZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzTG9jYWxlXCIpKTtcblxudmFyIF9pc0FscGhhID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcIi4vbGliL2lzQWxwaGFcIikpO1xuXG52YXIgX2lzQWxwaGFudW1lcmljID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcIi4vbGliL2lzQWxwaGFudW1lcmljXCIpKTtcblxudmFyIF9pc051bWVyaWMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc051bWVyaWNcIikpO1xuXG52YXIgX2lzUGFzc3BvcnROdW1iZXIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc1Bhc3Nwb3J0TnVtYmVyXCIpKTtcblxudmFyIF9pc1BvcnQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc1BvcnRcIikpO1xuXG52YXIgX2lzTG93ZXJjYXNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNMb3dlcmNhc2VcIikpO1xuXG52YXIgX2lzVXBwZXJjYXNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNVcHBlcmNhc2VcIikpO1xuXG52YXIgX2lzSU1FSSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzSU1FSVwiKSk7XG5cbnZhciBfaXNBc2NpaSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzQXNjaWlcIikpO1xuXG52YXIgX2lzRnVsbFdpZHRoID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNGdWxsV2lkdGhcIikpO1xuXG52YXIgX2lzSGFsZldpZHRoID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNIYWxmV2lkdGhcIikpO1xuXG52YXIgX2lzVmFyaWFibGVXaWR0aCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzVmFyaWFibGVXaWR0aFwiKSk7XG5cbnZhciBfaXNNdWx0aWJ5dGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc011bHRpYnl0ZVwiKSk7XG5cbnZhciBfaXNTZW1WZXIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc1NlbVZlclwiKSk7XG5cbnZhciBfaXNTdXJyb2dhdGVQYWlyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNTdXJyb2dhdGVQYWlyXCIpKTtcblxudmFyIF9pc0ludCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzSW50XCIpKTtcblxudmFyIF9pc0Zsb2F0ID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcIi4vbGliL2lzRmxvYXRcIikpO1xuXG52YXIgX2lzRGVjaW1hbCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzRGVjaW1hbFwiKSk7XG5cbnZhciBfaXNIZXhhZGVjaW1hbCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzSGV4YWRlY2ltYWxcIikpO1xuXG52YXIgX2lzT2N0YWwgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc09jdGFsXCIpKTtcblxudmFyIF9pc0RpdmlzaWJsZUJ5ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNEaXZpc2libGVCeVwiKSk7XG5cbnZhciBfaXNIZXhDb2xvciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzSGV4Q29sb3JcIikpO1xuXG52YXIgX2lzUmdiQ29sb3IgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc1JnYkNvbG9yXCIpKTtcblxudmFyIF9pc0hTTCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzSFNMXCIpKTtcblxudmFyIF9pc0lTUkMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc0lTUkNcIikpO1xuXG52YXIgX2lzSUJBTiA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCIuL2xpYi9pc0lCQU5cIikpO1xuXG52YXIgX2lzQklDID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNCSUNcIikpO1xuXG52YXIgX2lzTUQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc01ENVwiKSk7XG5cbnZhciBfaXNIYXNoID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNIYXNoXCIpKTtcblxudmFyIF9pc0pXVCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzSldUXCIpKTtcblxudmFyIF9pc0pTT04gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc0pTT05cIikpO1xuXG52YXIgX2lzRW1wdHkgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc0VtcHR5XCIpKTtcblxudmFyIF9pc0xlbmd0aCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzTGVuZ3RoXCIpKTtcblxudmFyIF9pc0J5dGVMZW5ndGggPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc0J5dGVMZW5ndGhcIikpO1xuXG52YXIgX2lzVVVJRCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzVVVJRFwiKSk7XG5cbnZhciBfaXNNb25nb0lkID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNNb25nb0lkXCIpKTtcblxudmFyIF9pc0FmdGVyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNBZnRlclwiKSk7XG5cbnZhciBfaXNCZWZvcmUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc0JlZm9yZVwiKSk7XG5cbnZhciBfaXNJbiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzSW5cIikpO1xuXG52YXIgX2lzTHVobk51bWJlciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzTHVobk51bWJlclwiKSk7XG5cbnZhciBfaXNDcmVkaXRDYXJkID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNDcmVkaXRDYXJkXCIpKTtcblxudmFyIF9pc0lkZW50aXR5Q2FyZCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzSWRlbnRpdHlDYXJkXCIpKTtcblxudmFyIF9pc0VBTiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzRUFOXCIpKTtcblxudmFyIF9pc0lTSU4gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc0lTSU5cIikpO1xuXG52YXIgX2lzSVNCTiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzSVNCTlwiKSk7XG5cbnZhciBfaXNJU1NOID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNJU1NOXCIpKTtcblxudmFyIF9pc1RheElEID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNUYXhJRFwiKSk7XG5cbnZhciBfaXNNb2JpbGVQaG9uZSA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCIuL2xpYi9pc01vYmlsZVBob25lXCIpKTtcblxudmFyIF9pc0V0aGVyZXVtQWRkcmVzcyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzRXRoZXJldW1BZGRyZXNzXCIpKTtcblxudmFyIF9pc0N1cnJlbmN5ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNDdXJyZW5jeVwiKSk7XG5cbnZhciBfaXNCdGNBZGRyZXNzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNCdGNBZGRyZXNzXCIpKTtcblxudmFyIF9pc0lTTyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzSVNPNjM5MVwiKSk7XG5cbnZhciBfaXNJU08yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNJU084NjAxXCIpKTtcblxudmFyIF9pc1JGQyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzUkZDMzMzOVwiKSk7XG5cbnZhciBfaXNJU08zMTY2MUFscGhhID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNJU08zMTY2MUFscGhhMlwiKSk7XG5cbnZhciBfaXNJU08zMTY2MUFscGhhMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzSVNPMzE2NjFBbHBoYTNcIikpO1xuXG52YXIgX2lzSVNPMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzSVNPNDIxN1wiKSk7XG5cbnZhciBfaXNCYXNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNCYXNlMzJcIikpO1xuXG52YXIgX2lzQmFzZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc0Jhc2U1OFwiKSk7XG5cbnZhciBfaXNCYXNlMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzQmFzZTY0XCIpKTtcblxudmFyIF9pc0RhdGFVUkkgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc0RhdGFVUklcIikpO1xuXG52YXIgX2lzTWFnbmV0VVJJID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNNYWduZXRVUklcIikpO1xuXG52YXIgX2lzTWltZVR5cGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc01pbWVUeXBlXCIpKTtcblxudmFyIF9pc0xhdExvbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc0xhdExvbmdcIikpO1xuXG52YXIgX2lzUG9zdGFsQ29kZSA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCIuL2xpYi9pc1Bvc3RhbENvZGVcIikpO1xuXG52YXIgX2x0cmltID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvbHRyaW1cIikpO1xuXG52YXIgX3J0cmltID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvcnRyaW1cIikpO1xuXG52YXIgX3RyaW0gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi90cmltXCIpKTtcblxudmFyIF9lc2NhcGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9lc2NhcGVcIikpO1xuXG52YXIgX3VuZXNjYXBlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvdW5lc2NhcGVcIikpO1xuXG52YXIgX3N0cmlwTG93ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvc3RyaXBMb3dcIikpO1xuXG52YXIgX3doaXRlbGlzdCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL3doaXRlbGlzdFwiKSk7XG5cbnZhciBfYmxhY2tsaXN0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvYmxhY2tsaXN0XCIpKTtcblxudmFyIF9pc1doaXRlbGlzdGVkID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNXaGl0ZWxpc3RlZFwiKSk7XG5cbnZhciBfbm9ybWFsaXplRW1haWwgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9ub3JtYWxpemVFbWFpbFwiKSk7XG5cbnZhciBfaXNTbHVnID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNTbHVnXCIpKTtcblxudmFyIF9pc0xpY2Vuc2VQbGF0ZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzTGljZW5zZVBsYXRlXCIpKTtcblxudmFyIF9pc1N0cm9uZ1Bhc3N3b3JkID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNTdHJvbmdQYXNzd29yZFwiKSk7XG5cbnZhciBfaXNWQVQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc1ZBVFwiKSk7XG5cbmZ1bmN0aW9uIF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSgpIHsgaWYgKHR5cGVvZiBXZWFrTWFwICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsOyB2YXIgY2FjaGUgPSBuZXcgV2Vha01hcCgpOyBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUgPSBmdW5jdGlvbiBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUoKSB7IHJldHVybiBjYWNoZTsgfTsgcmV0dXJuIGNhY2hlOyB9XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gaWYgKG9iaiA9PT0gbnVsbCB8fCBfdHlwZW9mKG9iaikgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG9iaiAhPT0gXCJmdW5jdGlvblwiKSB7IHJldHVybiB7IGRlZmF1bHQ6IG9iaiB9OyB9IHZhciBjYWNoZSA9IF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSgpOyBpZiAoY2FjaGUgJiYgY2FjaGUuaGFzKG9iaikpIHsgcmV0dXJuIGNhY2hlLmdldChvYmopOyB9IHZhciBuZXdPYmogPSB7fTsgdmFyIGhhc1Byb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7IHZhciBkZXNjID0gaGFzUHJvcGVydHlEZXNjcmlwdG9yID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkgOiBudWxsOyBpZiAoZGVzYyAmJiAoZGVzYy5nZXQgfHwgZGVzYy5zZXQpKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuZXdPYmosIGtleSwgZGVzYyk7IH0gZWxzZSB7IG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyBpZiAoY2FjaGUpIHsgY2FjaGUuc2V0KG9iaiwgbmV3T2JqKTsgfSByZXR1cm4gbmV3T2JqOyB9XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciB2ZXJzaW9uID0gJzEzLjkuMCc7XG52YXIgdmFsaWRhdG9yID0ge1xuICB2ZXJzaW9uOiB2ZXJzaW9uLFxuICB0b0RhdGU6IF90b0RhdGUuZGVmYXVsdCxcbiAgdG9GbG9hdDogX3RvRmxvYXQuZGVmYXVsdCxcbiAgdG9JbnQ6IF90b0ludC5kZWZhdWx0LFxuICB0b0Jvb2xlYW46IF90b0Jvb2xlYW4uZGVmYXVsdCxcbiAgZXF1YWxzOiBfZXF1YWxzLmRlZmF1bHQsXG4gIGNvbnRhaW5zOiBfY29udGFpbnMuZGVmYXVsdCxcbiAgbWF0Y2hlczogX21hdGNoZXMuZGVmYXVsdCxcbiAgaXNFbWFpbDogX2lzRW1haWwuZGVmYXVsdCxcbiAgaXNVUkw6IF9pc1VSTC5kZWZhdWx0LFxuICBpc01BQ0FkZHJlc3M6IF9pc01BQ0FkZHJlc3MuZGVmYXVsdCxcbiAgaXNJUDogX2lzSVAuZGVmYXVsdCxcbiAgaXNJUFJhbmdlOiBfaXNJUFJhbmdlLmRlZmF1bHQsXG4gIGlzRlFETjogX2lzRlFETi5kZWZhdWx0LFxuICBpc0Jvb2xlYW46IF9pc0Jvb2xlYW4uZGVmYXVsdCxcbiAgaXNJQkFOOiBfaXNJQkFOLmRlZmF1bHQsXG4gIGlzQklDOiBfaXNCSUMuZGVmYXVsdCxcbiAgaXNBbHBoYTogX2lzQWxwaGEuZGVmYXVsdCxcbiAgaXNBbHBoYUxvY2FsZXM6IF9pc0FscGhhLmxvY2FsZXMsXG4gIGlzQWxwaGFudW1lcmljOiBfaXNBbHBoYW51bWVyaWMuZGVmYXVsdCxcbiAgaXNBbHBoYW51bWVyaWNMb2NhbGVzOiBfaXNBbHBoYW51bWVyaWMubG9jYWxlcyxcbiAgaXNOdW1lcmljOiBfaXNOdW1lcmljLmRlZmF1bHQsXG4gIGlzUGFzc3BvcnROdW1iZXI6IF9pc1Bhc3Nwb3J0TnVtYmVyLmRlZmF1bHQsXG4gIGlzUG9ydDogX2lzUG9ydC5kZWZhdWx0LFxuICBpc0xvd2VyY2FzZTogX2lzTG93ZXJjYXNlLmRlZmF1bHQsXG4gIGlzVXBwZXJjYXNlOiBfaXNVcHBlcmNhc2UuZGVmYXVsdCxcbiAgaXNBc2NpaTogX2lzQXNjaWkuZGVmYXVsdCxcbiAgaXNGdWxsV2lkdGg6IF9pc0Z1bGxXaWR0aC5kZWZhdWx0LFxuICBpc0hhbGZXaWR0aDogX2lzSGFsZldpZHRoLmRlZmF1bHQsXG4gIGlzVmFyaWFibGVXaWR0aDogX2lzVmFyaWFibGVXaWR0aC5kZWZhdWx0LFxuICBpc011bHRpYnl0ZTogX2lzTXVsdGlieXRlLmRlZmF1bHQsXG4gIGlzU2VtVmVyOiBfaXNTZW1WZXIuZGVmYXVsdCxcbiAgaXNTdXJyb2dhdGVQYWlyOiBfaXNTdXJyb2dhdGVQYWlyLmRlZmF1bHQsXG4gIGlzSW50OiBfaXNJbnQuZGVmYXVsdCxcbiAgaXNJTUVJOiBfaXNJTUVJLmRlZmF1bHQsXG4gIGlzRmxvYXQ6IF9pc0Zsb2F0LmRlZmF1bHQsXG4gIGlzRmxvYXRMb2NhbGVzOiBfaXNGbG9hdC5sb2NhbGVzLFxuICBpc0RlY2ltYWw6IF9pc0RlY2ltYWwuZGVmYXVsdCxcbiAgaXNIZXhhZGVjaW1hbDogX2lzSGV4YWRlY2ltYWwuZGVmYXVsdCxcbiAgaXNPY3RhbDogX2lzT2N0YWwuZGVmYXVsdCxcbiAgaXNEaXZpc2libGVCeTogX2lzRGl2aXNpYmxlQnkuZGVmYXVsdCxcbiAgaXNIZXhDb2xvcjogX2lzSGV4Q29sb3IuZGVmYXVsdCxcbiAgaXNSZ2JDb2xvcjogX2lzUmdiQ29sb3IuZGVmYXVsdCxcbiAgaXNIU0w6IF9pc0hTTC5kZWZhdWx0LFxuICBpc0lTUkM6IF9pc0lTUkMuZGVmYXVsdCxcbiAgaXNNRDU6IF9pc01ELmRlZmF1bHQsXG4gIGlzSGFzaDogX2lzSGFzaC5kZWZhdWx0LFxuICBpc0pXVDogX2lzSldULmRlZmF1bHQsXG4gIGlzSlNPTjogX2lzSlNPTi5kZWZhdWx0LFxuICBpc0VtcHR5OiBfaXNFbXB0eS5kZWZhdWx0LFxuICBpc0xlbmd0aDogX2lzTGVuZ3RoLmRlZmF1bHQsXG4gIGlzTG9jYWxlOiBfaXNMb2NhbGUuZGVmYXVsdCxcbiAgaXNCeXRlTGVuZ3RoOiBfaXNCeXRlTGVuZ3RoLmRlZmF1bHQsXG4gIGlzVVVJRDogX2lzVVVJRC5kZWZhdWx0LFxuICBpc01vbmdvSWQ6IF9pc01vbmdvSWQuZGVmYXVsdCxcbiAgaXNBZnRlcjogX2lzQWZ0ZXIuZGVmYXVsdCxcbiAgaXNCZWZvcmU6IF9pc0JlZm9yZS5kZWZhdWx0LFxuICBpc0luOiBfaXNJbi5kZWZhdWx0LFxuICBpc0x1aG5OdW1iZXI6IF9pc0x1aG5OdW1iZXIuZGVmYXVsdCxcbiAgaXNDcmVkaXRDYXJkOiBfaXNDcmVkaXRDYXJkLmRlZmF1bHQsXG4gIGlzSWRlbnRpdHlDYXJkOiBfaXNJZGVudGl0eUNhcmQuZGVmYXVsdCxcbiAgaXNFQU46IF9pc0VBTi5kZWZhdWx0LFxuICBpc0lTSU46IF9pc0lTSU4uZGVmYXVsdCxcbiAgaXNJU0JOOiBfaXNJU0JOLmRlZmF1bHQsXG4gIGlzSVNTTjogX2lzSVNTTi5kZWZhdWx0LFxuICBpc01vYmlsZVBob25lOiBfaXNNb2JpbGVQaG9uZS5kZWZhdWx0LFxuICBpc01vYmlsZVBob25lTG9jYWxlczogX2lzTW9iaWxlUGhvbmUubG9jYWxlcyxcbiAgaXNQb3N0YWxDb2RlOiBfaXNQb3N0YWxDb2RlLmRlZmF1bHQsXG4gIGlzUG9zdGFsQ29kZUxvY2FsZXM6IF9pc1Bvc3RhbENvZGUubG9jYWxlcyxcbiAgaXNFdGhlcmV1bUFkZHJlc3M6IF9pc0V0aGVyZXVtQWRkcmVzcy5kZWZhdWx0LFxuICBpc0N1cnJlbmN5OiBfaXNDdXJyZW5jeS5kZWZhdWx0LFxuICBpc0J0Y0FkZHJlc3M6IF9pc0J0Y0FkZHJlc3MuZGVmYXVsdCxcbiAgaXNJU082MzkxOiBfaXNJU08uZGVmYXVsdCxcbiAgaXNJU084NjAxOiBfaXNJU08yLmRlZmF1bHQsXG4gIGlzUkZDMzMzOTogX2lzUkZDLmRlZmF1bHQsXG4gIGlzSVNPMzE2NjFBbHBoYTI6IF9pc0lTTzMxNjYxQWxwaGEuZGVmYXVsdCxcbiAgaXNJU08zMTY2MUFscGhhMzogX2lzSVNPMzE2NjFBbHBoYTIuZGVmYXVsdCxcbiAgaXNJU080MjE3OiBfaXNJU08zLmRlZmF1bHQsXG4gIGlzQmFzZTMyOiBfaXNCYXNlLmRlZmF1bHQsXG4gIGlzQmFzZTU4OiBfaXNCYXNlMi5kZWZhdWx0LFxuICBpc0Jhc2U2NDogX2lzQmFzZTMuZGVmYXVsdCxcbiAgaXNEYXRhVVJJOiBfaXNEYXRhVVJJLmRlZmF1bHQsXG4gIGlzTWFnbmV0VVJJOiBfaXNNYWduZXRVUkkuZGVmYXVsdCxcbiAgaXNNaW1lVHlwZTogX2lzTWltZVR5cGUuZGVmYXVsdCxcbiAgaXNMYXRMb25nOiBfaXNMYXRMb25nLmRlZmF1bHQsXG4gIGx0cmltOiBfbHRyaW0uZGVmYXVsdCxcbiAgcnRyaW06IF9ydHJpbS5kZWZhdWx0LFxuICB0cmltOiBfdHJpbS5kZWZhdWx0LFxuICBlc2NhcGU6IF9lc2NhcGUuZGVmYXVsdCxcbiAgdW5lc2NhcGU6IF91bmVzY2FwZS5kZWZhdWx0LFxuICBzdHJpcExvdzogX3N0cmlwTG93LmRlZmF1bHQsXG4gIHdoaXRlbGlzdDogX3doaXRlbGlzdC5kZWZhdWx0LFxuICBibGFja2xpc3Q6IF9ibGFja2xpc3QuZGVmYXVsdCxcbiAgaXNXaGl0ZWxpc3RlZDogX2lzV2hpdGVsaXN0ZWQuZGVmYXVsdCxcbiAgbm9ybWFsaXplRW1haWw6IF9ub3JtYWxpemVFbWFpbC5kZWZhdWx0LFxuICB0b1N0cmluZzogdG9TdHJpbmcsXG4gIGlzU2x1ZzogX2lzU2x1Zy5kZWZhdWx0LFxuICBpc1N0cm9uZ1Bhc3N3b3JkOiBfaXNTdHJvbmdQYXNzd29yZC5kZWZhdWx0LFxuICBpc1RheElEOiBfaXNUYXhJRC5kZWZhdWx0LFxuICBpc0RhdGU6IF9pc0RhdGUuZGVmYXVsdCxcbiAgaXNUaW1lOiBfaXNUaW1lLmRlZmF1bHQsXG4gIGlzTGljZW5zZVBsYXRlOiBfaXNMaWNlbnNlUGxhdGUuZGVmYXVsdCxcbiAgaXNWQVQ6IF9pc1ZBVC5kZWZhdWx0LFxuICBpYmFuTG9jYWxlczogX2lzSUJBTi5sb2NhbGVzXG59O1xudmFyIF9kZWZhdWx0ID0gdmFsaWRhdG9yO1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmNvbW1hRGVjaW1hbCA9IGV4cG9ydHMuZG90RGVjaW1hbCA9IGV4cG9ydHMuYmVuZ2FsaUxvY2FsZXMgPSBleHBvcnRzLmZhcnNpTG9jYWxlcyA9IGV4cG9ydHMuYXJhYmljTG9jYWxlcyA9IGV4cG9ydHMuZW5nbGlzaExvY2FsZXMgPSBleHBvcnRzLmRlY2ltYWwgPSBleHBvcnRzLmFscGhhbnVtZXJpYyA9IGV4cG9ydHMuYWxwaGEgPSB2b2lkIDA7XG52YXIgYWxwaGEgPSB7XG4gICdlbi1VUyc6IC9eW0EtWl0rJC9pLFxuICAnYXotQVonOiAvXltBLVZYWVrDh8aPxJ7EsMSxw5bFnsOcXSskL2ksXG4gICdiZy1CRyc6IC9eW9CQLdCvXSskL2ksXG4gICdjcy1DWic6IC9eW0EtWsOBxIzEjsOJxJrDjcWHw5PFmMWgxaTDmsWuw53FvV0rJC9pLFxuICAnZGEtREsnOiAvXltBLVrDhsOYw4VdKyQvaSxcbiAgJ2RlLURFJzogL15bQS1aw4TDlsOcw59dKyQvaSxcbiAgJ2VsLUdSJzogL15bzpEtz45dKyQvaSxcbiAgJ2VzLUVTJzogL15bQS1aw4HDicONw5HDk8Oaw5xdKyQvaSxcbiAgJ2ZhLUlSJzogL15b2KfYqNm+2KrYq9is2obYrdiu2K/YsNix2LLamNiz2LTYtdi22LfYuNi52LrZgdmC2qnar9mE2YXZhtmI2YfbjF0rJC9pLFxuICAnZmktRkknOiAvXltBLVrDhcOEw5ZdKyQvaSxcbiAgJ2ZyLUZSJzogL15bQS1aw4DDgsOGw4fDicOIw4rDi8OPw47DlMWSw5nDm8OcxbhdKyQvaSxcbiAgJ2l0LUlUJzogL15bQS1aw4DDicOIw4zDjsOTw5LDmV0rJC9pLFxuICAnamEtSlAnOiAvXlvjgYEt44KT44KhLeODtu+9pi3vvp/kuIAt6b6g44O844O744CC44CBXSskL2ksXG4gICduYi1OTyc6IC9eW0EtWsOGw5jDhV0rJC9pLFxuICAnbmwtTkwnOiAvXltBLVrDgcOJw4vDj8OTw5bDnMOaXSskL2ksXG4gICdubi1OTyc6IC9eW0EtWsOGw5jDhV0rJC9pLFxuICAnaHUtSFUnOiAvXltBLVrDgcOJw43Dk8OWxZDDmsOcxbBdKyQvaSxcbiAgJ3BsLVBMJzogL15bQS1axITEhsSYxZrFgcWDw5PFu8W5XSskL2ksXG4gICdwdC1QVCc6IC9eW0EtWsODw4HDgMOCw4TDh8OJw4rDi8ONw4/DlcOTw5TDlsOaw5xdKyQvaSxcbiAgJ3J1LVJVJzogL15b0JAt0K/QgV0rJC9pLFxuICAnc2wtU0knOiAvXltBLVrEjMSGxJDFoMW9XSskL2ksXG4gICdzay1TSyc6IC9eW0EtWsOBxIzEjsOJw43Fh8OTxaDFpMOaw53FvcS5xZTEvcOEw5RdKyQvaSxcbiAgJ3NyLVJTQGxhdGluJzogL15bQS1axIzEhsW9xaDEkF0rJC9pLFxuICAnc3ItUlMnOiAvXlvQkC3Qr9CC0IjQidCK0IvQj10rJC9pLFxuICAnc3YtU0UnOiAvXltBLVrDhcOEw5ZdKyQvaSxcbiAgJ3RoLVRIJzogL15b4LiBLeC5kFxcc10rJC9pLFxuICAndHItVFInOiAvXltBLVrDh8SexLDEscOWxZ7DnF0rJC9pLFxuICAndWstVUEnOiAvXlvQkC3QqdCs0K7Qr9CESdCH0pDRll0rJC9pLFxuICAndmktVk4nOiAvXltBLVrDgMOB4bqg4bqiw4PDguG6puG6pOG6rOG6qOG6qsSC4bqw4bqu4bq24bqy4bq0xJDDiMOJ4bq44bq64bq8w4rhu4Dhur7hu4bhu4Lhu4TDjMON4buK4buIxKjDksOT4buM4buOw5XDlOG7kuG7kOG7mOG7lOG7lsag4buc4bua4bui4bue4bugw5nDmuG7pOG7psWoxq/hu6rhu6jhu7Dhu6zhu67hu7LDneG7tOG7tuG7uF0rJC9pLFxuICAna28tS1InOiAvXlvjhLEt44WO44WPLeOFo+qwgC3tnqNdKiQvLFxuICAna3UtSVEnOiAvXlvYptin2KjZvtiq2Kzahtit2K7Yr9ix2pXYstqY2LPYtNi52LrZgdqk2YLaqdqv2YTatdmF2YbZiNuG2r7blduM247Ziti32KTYq9ii2KXYo9mD2LbYtdip2LjYsF0rJC9pLFxuICBhcjogL15b2KHYotij2KTYpdim2KfYqNip2KrYq9is2K3Yrtiv2LDYsdiy2LPYtNi12LbYt9i42LnYutmB2YLZg9mE2YXZhtmH2YjZidmK2YvZjNmN2Y7Zj9mQ2ZHZktmwXSskLyxcbiAgaGU6IC9eW9eQLdeqXSskLyxcbiAgZmE6IC9eWyfYotin2KHYo9ik2KbYqNm+2KrYq9is2obYrdiu2K/YsNix2LLamNiz2LTYtdi22LfYuNi52LrZgdmC2qnar9mE2YXZhtmI2YfYqduMJ10rJC9pLFxuICBibjogL15bJ+CmgOCmgeCmguCmg+CmheCmhuCmh+CmiOCmieCmiuCmi+CmjOCmj+CmkOCmk+CmlOCmleCmluCml+CmmOCmmeCmmuCmm+CmnOCmneCmnuCmn+CmoOCmoeCmouCmo+CmpOCmpeCmpuCmp+CmqOCmquCmq+CmrOCmreCmruCmr+CmsOCmsuCmtuCmt+CmuOCmueCmvOCmveCmvuCmv+CngOCngeCnguCng+CnhOCnh+CniOCni+CnjOCnjeCnjuCnl+CnnOCnneCnn+CnoOCnoeCnouCno+CnsOCnseCnsuCns+CntOCnteCntuCnt+CnuOCnueCnuuCnuyddKyQvLFxuICAnaGktSU4nOiAvXltcXHUwOTAwLVxcdTA5NjFdK1tcXHUwOTcyLVxcdTA5N0ZdKiQvaSxcbiAgJ3NpLUxLJzogL15bXFx1MEQ4MC1cXHUwREZGXSskL1xufTtcbmV4cG9ydHMuYWxwaGEgPSBhbHBoYTtcbnZhciBhbHBoYW51bWVyaWMgPSB7XG4gICdlbi1VUyc6IC9eWzAtOUEtWl0rJC9pLFxuICAnYXotQVonOiAvXlswLTlBLVZYWVrDh8aPxJ7EsMSxw5bFnsOcXSskL2ksXG4gICdiZy1CRyc6IC9eWzAtOdCQLdCvXSskL2ksXG4gICdjcy1DWic6IC9eWzAtOUEtWsOBxIzEjsOJxJrDjcWHw5PFmMWgxaTDmsWuw53FvV0rJC9pLFxuICAnZGEtREsnOiAvXlswLTlBLVrDhsOYw4VdKyQvaSxcbiAgJ2RlLURFJzogL15bMC05QS1aw4TDlsOcw59dKyQvaSxcbiAgJ2VsLUdSJzogL15bMC05zpEtz4ldKyQvaSxcbiAgJ2VzLUVTJzogL15bMC05QS1aw4HDicONw5HDk8Oaw5xdKyQvaSxcbiAgJ2ZpLUZJJzogL15bMC05QS1aw4XDhMOWXSskL2ksXG4gICdmci1GUic6IC9eWzAtOUEtWsOAw4LDhsOHw4nDiMOKw4vDj8OOw5TFksOZw5vDnMW4XSskL2ksXG4gICdpdC1JVCc6IC9eWzAtOUEtWsOAw4nDiMOMw47Dk8OSw5ldKyQvaSxcbiAgJ2phLUpQJzogL15bMC0577yQLe+8meOBgS3jgpPjgqEt44O2772mLe++n+S4gC3pvqDjg7zjg7vjgILjgIFdKyQvaSxcbiAgJ2h1LUhVJzogL15bMC05QS1aw4HDicONw5PDlsWQw5rDnMWwXSskL2ksXG4gICduYi1OTyc6IC9eWzAtOUEtWsOGw5jDhV0rJC9pLFxuICAnbmwtTkwnOiAvXlswLTlBLVrDgcOJw4vDj8OTw5bDnMOaXSskL2ksXG4gICdubi1OTyc6IC9eWzAtOUEtWsOGw5jDhV0rJC9pLFxuICAncGwtUEwnOiAvXlswLTlBLVrEhMSGxJjFmsWBxYPDk8W7xbldKyQvaSxcbiAgJ3B0LVBUJzogL15bMC05QS1aw4PDgcOAw4LDhMOHw4nDisOLw43Dj8OVw5PDlMOWw5rDnF0rJC9pLFxuICAncnUtUlUnOiAvXlswLTnQkC3Qr9CBXSskL2ksXG4gICdzbC1TSSc6IC9eWzAtOUEtWsSMxIbEkMWgxb1dKyQvaSxcbiAgJ3NrLVNLJzogL15bMC05QS1aw4HEjMSOw4nDjcWHw5PFoMWkw5rDncW9xLnFlMS9w4TDlF0rJC9pLFxuICAnc3ItUlNAbGF0aW4nOiAvXlswLTlBLVrEjMSGxb3FoMSQXSskL2ksXG4gICdzci1SUyc6IC9eWzAtOdCQLdCv0ILQiNCJ0IrQi9CPXSskL2ksXG4gICdzdi1TRSc6IC9eWzAtOUEtWsOFw4TDll0rJC9pLFxuICAndGgtVEgnOiAvXlvguIEt4LmZXFxzXSskL2ksXG4gICd0ci1UUic6IC9eWzAtOUEtWsOHxJ7EsMSxw5bFnsOcXSskL2ksXG4gICd1ay1VQSc6IC9eWzAtOdCQLdCp0KzQrtCv0IRJ0IfSkNGWXSskL2ksXG4gICdrby1LUic6IC9eWzAtOeOEsS3jhY7jhY8t44Wj6rCALe2eo10qJC8sXG4gICdrdS1JUSc6IC9eW9mg2aHZotmj2aTZpdmm2afZqNmpMC052KbYp9io2b7Yqtis2obYrdiu2K/YsdqV2LLamNiz2LTYudi62YHapNmC2qnar9mE2rXZhdmG2Yjbhtq+25XbjNuO2YrYt9ik2KvYotil2KPZg9i22LXYqdi42LBdKyQvaSxcbiAgJ3ZpLVZOJzogL15bMC05QS1aw4DDgeG6oOG6osODw4LhuqbhuqThuqzhuqjhuqrEguG6sOG6ruG6tuG6suG6tMSQw4jDieG6uOG6uuG6vMOK4buA4bq+4buG4buC4buEw4zDjeG7iuG7iMSow5LDk+G7jOG7jsOVw5Thu5Lhu5Dhu5jhu5Thu5bGoOG7nOG7muG7ouG7nuG7oMOZw5rhu6Thu6bFqMav4buq4buo4buw4bus4buu4buyw53hu7Thu7bhu7hdKyQvaSxcbiAgYXI6IC9eW9mg2aHZotmj2aTZpdmm2afZqNmpMC052KHYotij2KTYpdim2KfYqNip2KrYq9is2K3Yrtiv2LDYsdiy2LPYtNi12LbYt9i42LnYutmB2YLZg9mE2YXZhtmH2YjZidmK2YvZjNmN2Y7Zj9mQ2ZHZktmwXSskLyxcbiAgaGU6IC9eWzAtOdeQLdeqXSskLyxcbiAgZmE6IC9eWycwLTnYotin2KHYo9ik2KbYqNm+2KrYq9is2obYrdiu2K/YsNix2LLamNiz2LTYtdi22LfYuNi52LrZgdmC2qnar9mE2YXZhtmI2YfYqduM27Hbstuz27Tbtdu227fbuNu527AnXSskL2ksXG4gIGJuOiAvXlsn4KaA4KaB4KaC4KaD4KaF4KaG4KaH4KaI4KaJ4KaK4KaL4KaM4KaP4KaQ4KaT4KaU4KaV4KaW4KaX4KaY4KaZ4Kaa4Kab4Kac4Kad4Kae4Kaf4Kag4Kah4Kai4Kaj4Kak4Kal4Kam4Kan4Kao4Kaq4Kar4Kas4Kat4Kau4Kav4Kaw4Kay4Ka24Ka34Ka44Ka54Ka84Ka94Ka+4Ka/4KeA4KeB4KeC4KeD4KeE4KeH4KeI4KeL4KeM4KeN4KeO4KeX4Kec4Ked4Kef4Keg4Keh4Kei4Kej4Kem4Ken4Keo4Kep4Keq4Ker4Kes4Ket4Keu4Kev4Kew4Kex4Key4Kez4Ke04Ke14Ke24Ke34Ke44Ke54Ke64Ke7J10rJC8sXG4gICdoaS1JTic6IC9eW1xcdTA5MDAtXFx1MDk2M10rW1xcdTA5NjYtXFx1MDk3Rl0qJC9pLFxuICAnc2ktTEsnOiAvXlswLTlcXHUwRDgwLVxcdTBERkZdKyQvXG59O1xuZXhwb3J0cy5hbHBoYW51bWVyaWMgPSBhbHBoYW51bWVyaWM7XG52YXIgZGVjaW1hbCA9IHtcbiAgJ2VuLVVTJzogJy4nLFxuICBhcjogJ9mrJ1xufTtcbmV4cG9ydHMuZGVjaW1hbCA9IGRlY2ltYWw7XG52YXIgZW5nbGlzaExvY2FsZXMgPSBbJ0FVJywgJ0dCJywgJ0hLJywgJ0lOJywgJ05aJywgJ1pBJywgJ1pNJ107XG5leHBvcnRzLmVuZ2xpc2hMb2NhbGVzID0gZW5nbGlzaExvY2FsZXM7XG5cbmZvciAodmFyIGxvY2FsZSwgaSA9IDA7IGkgPCBlbmdsaXNoTG9jYWxlcy5sZW5ndGg7IGkrKykge1xuICBsb2NhbGUgPSBcImVuLVwiLmNvbmNhdChlbmdsaXNoTG9jYWxlc1tpXSk7XG4gIGFscGhhW2xvY2FsZV0gPSBhbHBoYVsnZW4tVVMnXTtcbiAgYWxwaGFudW1lcmljW2xvY2FsZV0gPSBhbHBoYW51bWVyaWNbJ2VuLVVTJ107XG4gIGRlY2ltYWxbbG9jYWxlXSA9IGRlY2ltYWxbJ2VuLVVTJ107XG59IC8vIFNvdXJjZTogaHR0cDovL3d3dy5sb2NhbGVwbGFuZXQuY29tL2phdmEvXG5cblxudmFyIGFyYWJpY0xvY2FsZXMgPSBbJ0FFJywgJ0JIJywgJ0RaJywgJ0VHJywgJ0lRJywgJ0pPJywgJ0tXJywgJ0xCJywgJ0xZJywgJ01BJywgJ1FNJywgJ1FBJywgJ1NBJywgJ1NEJywgJ1NZJywgJ1ROJywgJ1lFJ107XG5leHBvcnRzLmFyYWJpY0xvY2FsZXMgPSBhcmFiaWNMb2NhbGVzO1xuXG5mb3IgKHZhciBfbG9jYWxlLCBfaSA9IDA7IF9pIDwgYXJhYmljTG9jYWxlcy5sZW5ndGg7IF9pKyspIHtcbiAgX2xvY2FsZSA9IFwiYXItXCIuY29uY2F0KGFyYWJpY0xvY2FsZXNbX2ldKTtcbiAgYWxwaGFbX2xvY2FsZV0gPSBhbHBoYS5hcjtcbiAgYWxwaGFudW1lcmljW19sb2NhbGVdID0gYWxwaGFudW1lcmljLmFyO1xuICBkZWNpbWFsW19sb2NhbGVdID0gZGVjaW1hbC5hcjtcbn1cblxudmFyIGZhcnNpTG9jYWxlcyA9IFsnSVInLCAnQUYnXTtcbmV4cG9ydHMuZmFyc2lMb2NhbGVzID0gZmFyc2lMb2NhbGVzO1xuXG5mb3IgKHZhciBfbG9jYWxlMiwgX2kyID0gMDsgX2kyIDwgZmFyc2lMb2NhbGVzLmxlbmd0aDsgX2kyKyspIHtcbiAgX2xvY2FsZTIgPSBcImZhLVwiLmNvbmNhdChmYXJzaUxvY2FsZXNbX2kyXSk7XG4gIGFscGhhbnVtZXJpY1tfbG9jYWxlMl0gPSBhbHBoYW51bWVyaWMuZmE7XG4gIGRlY2ltYWxbX2xvY2FsZTJdID0gZGVjaW1hbC5hcjtcbn1cblxudmFyIGJlbmdhbGlMb2NhbGVzID0gWydCRCcsICdJTiddO1xuZXhwb3J0cy5iZW5nYWxpTG9jYWxlcyA9IGJlbmdhbGlMb2NhbGVzO1xuXG5mb3IgKHZhciBfbG9jYWxlMywgX2kzID0gMDsgX2kzIDwgYmVuZ2FsaUxvY2FsZXMubGVuZ3RoOyBfaTMrKykge1xuICBfbG9jYWxlMyA9IFwiYm4tXCIuY29uY2F0KGJlbmdhbGlMb2NhbGVzW19pM10pO1xuICBhbHBoYVtfbG9jYWxlM10gPSBhbHBoYS5ibjtcbiAgYWxwaGFudW1lcmljW19sb2NhbGUzXSA9IGFscGhhbnVtZXJpYy5ibjtcbiAgZGVjaW1hbFtfbG9jYWxlM10gPSBkZWNpbWFsWydlbi1VUyddO1xufSAvLyBTb3VyY2U6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0RlY2ltYWxfbWFya1xuXG5cbnZhciBkb3REZWNpbWFsID0gWydhci1FRycsICdhci1MQicsICdhci1MWSddO1xuZXhwb3J0cy5kb3REZWNpbWFsID0gZG90RGVjaW1hbDtcbnZhciBjb21tYURlY2ltYWwgPSBbJ2JnLUJHJywgJ2NzLUNaJywgJ2RhLURLJywgJ2RlLURFJywgJ2VsLUdSJywgJ2VuLVpNJywgJ2VzLUVTJywgJ2ZyLUNBJywgJ2ZyLUZSJywgJ2lkLUlEJywgJ2l0LUlUJywgJ2t1LUlRJywgJ2hpLUlOJywgJ2h1LUhVJywgJ25iLU5PJywgJ25uLU5PJywgJ25sLU5MJywgJ3BsLVBMJywgJ3B0LVBUJywgJ3J1LVJVJywgJ3NpLUxLJywgJ3NsLVNJJywgJ3NyLVJTQGxhdGluJywgJ3NyLVJTJywgJ3N2LVNFJywgJ3RyLVRSJywgJ3VrLVVBJywgJ3ZpLVZOJ107XG5leHBvcnRzLmNvbW1hRGVjaW1hbCA9IGNvbW1hRGVjaW1hbDtcblxuZm9yICh2YXIgX2k0ID0gMDsgX2k0IDwgZG90RGVjaW1hbC5sZW5ndGg7IF9pNCsrKSB7XG4gIGRlY2ltYWxbZG90RGVjaW1hbFtfaTRdXSA9IGRlY2ltYWxbJ2VuLVVTJ107XG59XG5cbmZvciAodmFyIF9pNSA9IDA7IF9pNSA8IGNvbW1hRGVjaW1hbC5sZW5ndGg7IF9pNSsrKSB7XG4gIGRlY2ltYWxbY29tbWFEZWNpbWFsW19pNV1dID0gJywnO1xufVxuXG5hbHBoYVsnZnItQ0EnXSA9IGFscGhhWydmci1GUiddO1xuYWxwaGFudW1lcmljWydmci1DQSddID0gYWxwaGFudW1lcmljWydmci1GUiddO1xuYWxwaGFbJ3B0LUJSJ10gPSBhbHBoYVsncHQtUFQnXTtcbmFscGhhbnVtZXJpY1sncHQtQlInXSA9IGFscGhhbnVtZXJpY1sncHQtUFQnXTtcbmRlY2ltYWxbJ3B0LUJSJ10gPSBkZWNpbWFsWydwdC1QVCddOyAvLyBzZWUgIzg2MlxuXG5hbHBoYVsncGwtUGwnXSA9IGFscGhhWydwbC1QTCddO1xuYWxwaGFudW1lcmljWydwbC1QbCddID0gYWxwaGFudW1lcmljWydwbC1QTCddO1xuZGVjaW1hbFsncGwtUGwnXSA9IGRlY2ltYWxbJ3BsLVBMJ107IC8vIHNlZSAjMTQ1NVxuXG5hbHBoYVsnZmEtQUYnXSA9IGFscGhhLmZhOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gYmxhY2tsaXN0O1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBibGFja2xpc3Qoc3RyLCBjaGFycykge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICByZXR1cm4gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChcIltcIi5jb25jYXQoY2hhcnMsIFwiXStcIiksICdnJyksICcnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gY29udGFpbnM7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbnZhciBfdG9TdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvdG9TdHJpbmdcIikpO1xuXG52YXIgX21lcmdlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL21lcmdlXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGRlZmF1bENvbnRhaW5zT3B0aW9ucyA9IHtcbiAgaWdub3JlQ2FzZTogZmFsc2UsXG4gIG1pbk9jY3VycmVuY2VzOiAxXG59O1xuXG5mdW5jdGlvbiBjb250YWlucyhzdHIsIGVsZW0sIG9wdGlvbnMpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgb3B0aW9ucyA9ICgwLCBfbWVyZ2UuZGVmYXVsdCkob3B0aW9ucywgZGVmYXVsQ29udGFpbnNPcHRpb25zKTtcblxuICBpZiAob3B0aW9ucy5pZ25vcmVDYXNlKSB7XG4gICAgcmV0dXJuIHN0ci50b0xvd2VyQ2FzZSgpLnNwbGl0KCgwLCBfdG9TdHJpbmcuZGVmYXVsdCkoZWxlbSkudG9Mb3dlckNhc2UoKSkubGVuZ3RoID4gb3B0aW9ucy5taW5PY2N1cnJlbmNlcztcbiAgfVxuXG4gIHJldHVybiBzdHIuc3BsaXQoKDAsIF90b1N0cmluZy5kZWZhdWx0KShlbGVtKSkubGVuZ3RoID4gb3B0aW9ucy5taW5PY2N1cnJlbmNlcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZXF1YWxzO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBlcXVhbHMoc3RyLCBjb21wYXJpc29uKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIHJldHVybiBzdHIgPT09IGNvbXBhcmlzb247XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGVzY2FwZTtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gZXNjYXBlKHN0cikge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICByZXR1cm4gc3RyLnJlcGxhY2UoLyYvZywgJyZhbXA7JykucmVwbGFjZSgvXCIvZywgJyZxdW90OycpLnJlcGxhY2UoLycvZywgJyYjeDI3OycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC8+L2csICcmZ3Q7JykucmVwbGFjZSgvXFwvL2csICcmI3gyRjsnKS5yZXBsYWNlKC9cXFxcL2csICcmI3g1QzsnKS5yZXBsYWNlKC9gL2csICcmIzk2OycpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc0FmdGVyO1xuXG52YXIgX3RvRGF0ZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdG9EYXRlXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gaXNBZnRlcihkYXRlLCBvcHRpb25zKSB7XG4gIC8vIEZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eTpcbiAgLy8gaXNBZnRlcihzdHIgWywgZGF0ZV0pLCBpLmUuIGBvcHRpb25zYCBjb3VsZCBiZSB1c2VkIGFzIGFyZ3VtZW50IGZvciB0aGUgbGVnYWN5IGBkYXRlYFxuICB2YXIgY29tcGFyaXNvbkRhdGUgPSAob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmNvbXBhcmlzb25EYXRlKSB8fCBvcHRpb25zIHx8IERhdGUoKS50b1N0cmluZygpO1xuICB2YXIgY29tcGFyaXNvbiA9ICgwLCBfdG9EYXRlLmRlZmF1bHQpKGNvbXBhcmlzb25EYXRlKTtcbiAgdmFyIG9yaWdpbmFsID0gKDAsIF90b0RhdGUuZGVmYXVsdCkoZGF0ZSk7XG4gIHJldHVybiAhIShvcmlnaW5hbCAmJiBjb21wYXJpc29uICYmIG9yaWdpbmFsID4gY29tcGFyaXNvbik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzQWxwaGE7XG5leHBvcnRzLmxvY2FsZXMgPSB2b2lkIDA7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbnZhciBfYWxwaGEgPSByZXF1aXJlKFwiLi9hbHBoYVwiKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gaXNBbHBoYShfc3RyKSB7XG4gIHZhciBsb2NhbGUgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6ICdlbi1VUyc7XG4gIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiB7fTtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoX3N0cik7XG4gIHZhciBzdHIgPSBfc3RyO1xuICB2YXIgaWdub3JlID0gb3B0aW9ucy5pZ25vcmU7XG5cbiAgaWYgKGlnbm9yZSkge1xuICAgIGlmIChpZ25vcmUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKGlnbm9yZSwgJycpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGlnbm9yZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoXCJbXCIuY29uY2F0KGlnbm9yZS5yZXBsYWNlKC9bLVtcXF17fSgpKis/LixcXFxcXiR8I1xcXFxzXS9nLCAnXFxcXCQmJyksIFwiXVwiKSwgJ2cnKSwgJycpOyAvLyBlc2NhcGUgcmVnZXggZm9yIGlnbm9yZVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lnbm9yZSBzaG91bGQgYmUgaW5zdGFuY2Ugb2YgYSBTdHJpbmcgb3IgUmVnRXhwJyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGxvY2FsZSBpbiBfYWxwaGEuYWxwaGEpIHtcbiAgICByZXR1cm4gX2FscGhhLmFscGhhW2xvY2FsZV0udGVzdChzdHIpO1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBsb2NhbGUgJ1wiLmNvbmNhdChsb2NhbGUsIFwiJ1wiKSk7XG59XG5cbnZhciBsb2NhbGVzID0gT2JqZWN0LmtleXMoX2FscGhhLmFscGhhKTtcbmV4cG9ydHMubG9jYWxlcyA9IGxvY2FsZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc0FscGhhbnVtZXJpYztcbmV4cG9ydHMubG9jYWxlcyA9IHZvaWQgMDtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxudmFyIF9hbHBoYSA9IHJlcXVpcmUoXCIuL2FscGhhXCIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBpc0FscGhhbnVtZXJpYyhfc3RyKSB7XG4gIHZhciBsb2NhbGUgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6ICdlbi1VUyc7XG4gIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiB7fTtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoX3N0cik7XG4gIHZhciBzdHIgPSBfc3RyO1xuICB2YXIgaWdub3JlID0gb3B0aW9ucy5pZ25vcmU7XG5cbiAgaWYgKGlnbm9yZSkge1xuICAgIGlmIChpZ25vcmUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKGlnbm9yZSwgJycpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGlnbm9yZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoXCJbXCIuY29uY2F0KGlnbm9yZS5yZXBsYWNlKC9bLVtcXF17fSgpKis/LixcXFxcXiR8I1xcXFxzXS9nLCAnXFxcXCQmJyksIFwiXVwiKSwgJ2cnKSwgJycpOyAvLyBlc2NhcGUgcmVnZXggZm9yIGlnbm9yZVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lnbm9yZSBzaG91bGQgYmUgaW5zdGFuY2Ugb2YgYSBTdHJpbmcgb3IgUmVnRXhwJyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGxvY2FsZSBpbiBfYWxwaGEuYWxwaGFudW1lcmljKSB7XG4gICAgcmV0dXJuIF9hbHBoYS5hbHBoYW51bWVyaWNbbG9jYWxlXS50ZXN0KHN0cik7XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGxvY2FsZSAnXCIuY29uY2F0KGxvY2FsZSwgXCInXCIpKTtcbn1cblxudmFyIGxvY2FsZXMgPSBPYmplY3Qua2V5cyhfYWxwaGEuYWxwaGFudW1lcmljKTtcbmV4cG9ydHMubG9jYWxlcyA9IGxvY2FsZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc0FzY2lpO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb250cm9sLXJlZ2V4ICovXG52YXIgYXNjaWkgPSAvXltcXHgwMC1cXHg3Rl0rJC87XG4vKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnRyb2wtcmVnZXggKi9cblxuZnVuY3Rpb24gaXNBc2NpaShzdHIpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgcmV0dXJuIGFzY2lpLnRlc3Qoc3RyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNCSUM7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbnZhciBfaXNJU08zMTY2MUFscGhhID0gcmVxdWlyZShcIi4vaXNJU08zMTY2MUFscGhhMlwiKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLy8gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPXzkzNjJcbnZhciBpc0JJQ1JlZyA9IC9eW0EtWmEtel17Nn1bQS1aYS16MC05XXsyfShbQS1aYS16MC05XXszfSk/JC87XG5cbmZ1bmN0aW9uIGlzQklDKHN0cikge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpOyAvLyB0b1VwcGVyQ2FzZSgpIHNob3VsZCBiZSByZW1vdmVkIHdoZW4gYSBuZXcgbWFqb3IgdmVyc2lvbiBnb2VzIG91dCB0aGF0IGNoYW5nZXNcbiAgLy8gdGhlIHJlZ2V4IHRvIFtBLVpdIChwZXIgdGhlIHNwZWMpLlxuXG4gIHZhciBjb3VudHJ5Q29kZSA9IHN0ci5zbGljZSg0LCA2KS50b1VwcGVyQ2FzZSgpO1xuXG4gIGlmICghX2lzSVNPMzE2NjFBbHBoYS5Db3VudHJ5Q29kZXMuaGFzKGNvdW50cnlDb2RlKSAmJiBjb3VudHJ5Q29kZSAhPT0gJ1hLJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBpc0JJQ1JlZy50ZXN0KHN0cik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzQmFzZTMyO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG52YXIgX21lcmdlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL21lcmdlXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGJhc2UzMiA9IC9eW0EtWjItN10rPSokLztcbnZhciBjcm9ja2ZvcmRCYXNlMzIgPSAvXltBLUhKS01OUC1UVi1aMC05XSskLztcbnZhciBkZWZhdWx0QmFzZTMyT3B0aW9ucyA9IHtcbiAgY3JvY2tmb3JkOiBmYWxzZVxufTtcblxuZnVuY3Rpb24gaXNCYXNlMzIoc3RyLCBvcHRpb25zKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIG9wdGlvbnMgPSAoMCwgX21lcmdlLmRlZmF1bHQpKG9wdGlvbnMsIGRlZmF1bHRCYXNlMzJPcHRpb25zKTtcblxuICBpZiAob3B0aW9ucy5jcm9ja2ZvcmQpIHtcbiAgICByZXR1cm4gY3JvY2tmb3JkQmFzZTMyLnRlc3Qoc3RyKTtcbiAgfVxuXG4gIHZhciBsZW4gPSBzdHIubGVuZ3RoO1xuXG4gIGlmIChsZW4gJSA4ID09PSAwICYmIGJhc2UzMi50ZXN0KHN0cikpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNCYXNlNTg7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8vIEFjY2VwdGVkIGNoYXJzIC0gMTIzNDU2Nzg5QUJDREVGR0ggSktMTU4gUFFSU1RVVldYWVphYmNkZWZnaGlqayBtbm9wcXJzdHV2d3h5elxudmFyIGJhc2U1OFJlZyA9IC9eW0EtSEotTlAtWmEta20tejEtOV0qJC87XG5cbmZ1bmN0aW9uIGlzQmFzZTU4KHN0cikge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuXG4gIGlmIChiYXNlNThSZWcudGVzdChzdHIpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzQmFzZTY0O1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG52YXIgX21lcmdlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL21lcmdlXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIG5vdEJhc2U2NCA9IC9bXkEtWjAtOStcXC89XS9pO1xudmFyIHVybFNhZmVCYXNlNjQgPSAvXltBLVowLTlfXFwtXSokL2k7XG52YXIgZGVmYXVsdEJhc2U2NE9wdGlvbnMgPSB7XG4gIHVybFNhZmU6IGZhbHNlXG59O1xuXG5mdW5jdGlvbiBpc0Jhc2U2NChzdHIsIG9wdGlvbnMpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgb3B0aW9ucyA9ICgwLCBfbWVyZ2UuZGVmYXVsdCkob3B0aW9ucywgZGVmYXVsdEJhc2U2NE9wdGlvbnMpO1xuICB2YXIgbGVuID0gc3RyLmxlbmd0aDtcblxuICBpZiAob3B0aW9ucy51cmxTYWZlKSB7XG4gICAgcmV0dXJuIHVybFNhZmVCYXNlNjQudGVzdChzdHIpO1xuICB9XG5cbiAgaWYgKGxlbiAlIDQgIT09IDAgfHwgbm90QmFzZTY0LnRlc3Qoc3RyKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBmaXJzdFBhZGRpbmdDaGFyID0gc3RyLmluZGV4T2YoJz0nKTtcbiAgcmV0dXJuIGZpcnN0UGFkZGluZ0NoYXIgPT09IC0xIHx8IGZpcnN0UGFkZGluZ0NoYXIgPT09IGxlbiAtIDEgfHwgZmlyc3RQYWRkaW5nQ2hhciA9PT0gbGVuIC0gMiAmJiBzdHJbbGVuIC0gMV0gPT09ICc9Jztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNCZWZvcmU7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbnZhciBfdG9EYXRlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi90b0RhdGVcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBpc0JlZm9yZShzdHIpIHtcbiAgdmFyIGRhdGUgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IFN0cmluZyhuZXcgRGF0ZSgpKTtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgdmFyIGNvbXBhcmlzb24gPSAoMCwgX3RvRGF0ZS5kZWZhdWx0KShkYXRlKTtcbiAgdmFyIG9yaWdpbmFsID0gKDAsIF90b0RhdGUuZGVmYXVsdCkoc3RyKTtcbiAgcmV0dXJuICEhKG9yaWdpbmFsICYmIGNvbXBhcmlzb24gJiYgb3JpZ2luYWwgPCBjb21wYXJpc29uKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNCb29sZWFuO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgZGVmYXVsdE9wdGlvbnMgPSB7XG4gIGxvb3NlOiBmYWxzZVxufTtcbnZhciBzdHJpY3RCb29sZWFucyA9IFsndHJ1ZScsICdmYWxzZScsICcxJywgJzAnXTtcbnZhciBsb29zZUJvb2xlYW5zID0gW10uY29uY2F0KHN0cmljdEJvb2xlYW5zLCBbJ3llcycsICdubyddKTtcblxuZnVuY3Rpb24gaXNCb29sZWFuKHN0cikge1xuICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZGVmYXVsdE9wdGlvbnM7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG5cbiAgaWYgKG9wdGlvbnMubG9vc2UpIHtcbiAgICByZXR1cm4gbG9vc2VCb29sZWFucy5pbmNsdWRlcyhzdHIudG9Mb3dlckNhc2UoKSk7XG4gIH1cblxuICByZXR1cm4gc3RyaWN0Qm9vbGVhbnMuaW5jbHVkZXMoc3RyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNCdGNBZGRyZXNzO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgYmVjaDMyID0gL14oYmMxKVthLXowLTldezI1LDM5fSQvO1xudmFyIGJhc2U1OCA9IC9eKDF8MylbQS1ISi1OUC1aYS1rbS16MS05XXsyNSwzOX0kLztcblxuZnVuY3Rpb24gaXNCdGNBZGRyZXNzKHN0cikge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICByZXR1cm4gYmVjaDMyLnRlc3Qoc3RyKSB8fCBiYXNlNTgudGVzdChzdHIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc0J5dGVMZW5ndGg7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuLyogZXNsaW50LWRpc2FibGUgcHJlZmVyLXJlc3QtcGFyYW1zICovXG5mdW5jdGlvbiBpc0J5dGVMZW5ndGgoc3RyLCBvcHRpb25zKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIHZhciBtaW47XG4gIHZhciBtYXg7XG5cbiAgaWYgKF90eXBlb2Yob3B0aW9ucykgPT09ICdvYmplY3QnKSB7XG4gICAgbWluID0gb3B0aW9ucy5taW4gfHwgMDtcbiAgICBtYXggPSBvcHRpb25zLm1heDtcbiAgfSBlbHNlIHtcbiAgICAvLyBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eTogaXNCeXRlTGVuZ3RoKHN0ciwgbWluIFssIG1heF0pXG4gICAgbWluID0gYXJndW1lbnRzWzFdO1xuICAgIG1heCA9IGFyZ3VtZW50c1syXTtcbiAgfVxuXG4gIHZhciBsZW4gPSBlbmNvZGVVUkkoc3RyKS5zcGxpdCgvJS4ufC4vKS5sZW5ndGggLSAxO1xuICByZXR1cm4gbGVuID49IG1pbiAmJiAodHlwZW9mIG1heCA9PT0gJ3VuZGVmaW5lZCcgfHwgbGVuIDw9IG1heCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzQ3JlZGl0Q2FyZDtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxudmFyIF9pc0x1aG5OdW1iZXIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2lzTHVobk51bWJlclwiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBjYXJkcyA9IHtcbiAgYW1leDogL14zWzQ3XVswLTldezEzfSQvLFxuICBkaW5lcnNjbHViOiAvXjMoPzowWzAtNV18WzY4XVswLTldKVswLTldezExfSQvLFxuICBkaXNjb3ZlcjogL142KD86MDExfDVbMC05XVswLTldKVswLTldezEyLDE1fSQvLFxuICBqY2I6IC9eKD86MjEzMXwxODAwfDM1XFxkezN9KVxcZHsxMX0kLyxcbiAgbWFzdGVyY2FyZDogL141WzEtNV1bMC05XXsyfXwoMjIyWzEtOV18MjJbMy05XVswLTldfDJbMy02XVswLTldezJ9fDI3WzAxXVswLTldfDI3MjApWzAtOV17MTJ9JC8sXG4gIC8vIC9eWzI1XVsxLTddWzAtOV17MTR9JC87XG4gIHVuaW9ucGF5OiAvXig2WzI3XVswLTldezE0fXxeKDgxWzAtOV17MTQsMTd9KSkkLyxcbiAgdmlzYTogL14oPzo0WzAtOV17MTJ9KSg/OlswLTldezMsNn0pPyQvXG59O1xuLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuXG52YXIgYWxsQ2FyZHMgPSAvXig/OjRbMC05XXsxMn0oPzpbMC05XXszLDZ9KT98NVsxLTVdWzAtOV17MTR9fCgyMjJbMS05XXwyMlszLTldWzAtOV18MlszLTZdWzAtOV17Mn18MjdbMDFdWzAtOV18MjcyMClbMC05XXsxMn18Nig/OjAxMXw1WzAtOV1bMC05XSlbMC05XXsxMiwxNX18M1s0N11bMC05XXsxM318Myg/OjBbMC01XXxbNjhdWzAtOV0pWzAtOV17MTF9fCg/OjIxMzF8MTgwMHwzNVxcZHszfSlcXGR7MTF9fDZbMjddWzAtOV17MTR9fF4oODFbMC05XXsxNCwxN30pKSQvO1xuLyogZXNsaW50LWVuYWJsZSBtYXgtbGVuICovXG5cbmZ1bmN0aW9uIGlzQ3JlZGl0Q2FyZChjYXJkKSB7XG4gIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoY2FyZCk7XG4gIHZhciBwcm92aWRlciA9IG9wdGlvbnMucHJvdmlkZXI7XG4gIHZhciBzYW5pdGl6ZWQgPSBjYXJkLnJlcGxhY2UoL1stIF0rL2csICcnKTtcblxuICBpZiAocHJvdmlkZXIgJiYgcHJvdmlkZXIudG9Mb3dlckNhc2UoKSBpbiBjYXJkcykge1xuICAgIC8vIHNwZWNpZmljIHByb3ZpZGVyIGluIHRoZSBsaXN0XG4gICAgaWYgKCFjYXJkc1twcm92aWRlci50b0xvd2VyQ2FzZSgpXS50ZXN0KHNhbml0aXplZCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAocHJvdmlkZXIgJiYgIShwcm92aWRlci50b0xvd2VyQ2FzZSgpIGluIGNhcmRzKSkge1xuICAgIC8qIHNwZWNpZmljIHByb3ZpZGVyIG5vdCBpbiB0aGUgbGlzdCAqL1xuICAgIHRocm93IG5ldyBFcnJvcihcIlwiLmNvbmNhdChwcm92aWRlciwgXCIgaXMgbm90IGEgdmFsaWQgY3JlZGl0IGNhcmQgcHJvdmlkZXIuXCIpKTtcbiAgfSBlbHNlIGlmICghYWxsQ2FyZHMudGVzdChzYW5pdGl6ZWQpKSB7XG4gICAgLy8gbm8gc3BlY2lmaWMgcHJvdmlkZXJcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gKDAsIF9pc0x1aG5OdW1iZXIuZGVmYXVsdCkoY2FyZCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzQ3VycmVuY3k7XG5cbnZhciBfbWVyZ2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvbWVyZ2VcIikpO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBjdXJyZW5jeVJlZ2V4KG9wdGlvbnMpIHtcbiAgdmFyIGRlY2ltYWxfZGlnaXRzID0gXCJcXFxcZHtcIi5jb25jYXQob3B0aW9ucy5kaWdpdHNfYWZ0ZXJfZGVjaW1hbFswXSwgXCJ9XCIpO1xuICBvcHRpb25zLmRpZ2l0c19hZnRlcl9kZWNpbWFsLmZvckVhY2goZnVuY3Rpb24gKGRpZ2l0LCBpbmRleCkge1xuICAgIGlmIChpbmRleCAhPT0gMCkgZGVjaW1hbF9kaWdpdHMgPSBcIlwiLmNvbmNhdChkZWNpbWFsX2RpZ2l0cywgXCJ8XFxcXGR7XCIpLmNvbmNhdChkaWdpdCwgXCJ9XCIpO1xuICB9KTtcbiAgdmFyIHN5bWJvbCA9IFwiKFwiLmNvbmNhdChvcHRpb25zLnN5bWJvbC5yZXBsYWNlKC9cXFcvLCBmdW5jdGlvbiAobSkge1xuICAgIHJldHVybiBcIlxcXFxcIi5jb25jYXQobSk7XG4gIH0pLCBcIilcIikuY29uY2F0KG9wdGlvbnMucmVxdWlyZV9zeW1ib2wgPyAnJyA6ICc/JyksXG4gICAgICBuZWdhdGl2ZSA9ICctPycsXG4gICAgICB3aG9sZV9kb2xsYXJfYW1vdW50X3dpdGhvdXRfc2VwID0gJ1sxLTldXFxcXGQqJyxcbiAgICAgIHdob2xlX2RvbGxhcl9hbW91bnRfd2l0aF9zZXAgPSBcIlsxLTldXFxcXGR7MCwyfShcXFxcXCIuY29uY2F0KG9wdGlvbnMudGhvdXNhbmRzX3NlcGFyYXRvciwgXCJcXFxcZHszfSkqXCIpLFxuICAgICAgdmFsaWRfd2hvbGVfZG9sbGFyX2Ftb3VudHMgPSBbJzAnLCB3aG9sZV9kb2xsYXJfYW1vdW50X3dpdGhvdXRfc2VwLCB3aG9sZV9kb2xsYXJfYW1vdW50X3dpdGhfc2VwXSxcbiAgICAgIHdob2xlX2RvbGxhcl9hbW91bnQgPSBcIihcIi5jb25jYXQodmFsaWRfd2hvbGVfZG9sbGFyX2Ftb3VudHMuam9pbignfCcpLCBcIik/XCIpLFxuICAgICAgZGVjaW1hbF9hbW91bnQgPSBcIihcXFxcXCIuY29uY2F0KG9wdGlvbnMuZGVjaW1hbF9zZXBhcmF0b3IsIFwiKFwiKS5jb25jYXQoZGVjaW1hbF9kaWdpdHMsIFwiKSlcIikuY29uY2F0KG9wdGlvbnMucmVxdWlyZV9kZWNpbWFsID8gJycgOiAnPycpO1xuICB2YXIgcGF0dGVybiA9IHdob2xlX2RvbGxhcl9hbW91bnQgKyAob3B0aW9ucy5hbGxvd19kZWNpbWFsIHx8IG9wdGlvbnMucmVxdWlyZV9kZWNpbWFsID8gZGVjaW1hbF9hbW91bnQgOiAnJyk7IC8vIGRlZmF1bHQgaXMgbmVnYXRpdmUgc2lnbiBiZWZvcmUgc3ltYm9sLCBidXQgdGhlcmUgYXJlIHR3byBvdGhlciBvcHRpb25zIChiZXNpZGVzIHBhcmVucylcblxuICBpZiAob3B0aW9ucy5hbGxvd19uZWdhdGl2ZXMgJiYgIW9wdGlvbnMucGFyZW5zX2Zvcl9uZWdhdGl2ZXMpIHtcbiAgICBpZiAob3B0aW9ucy5uZWdhdGl2ZV9zaWduX2FmdGVyX2RpZ2l0cykge1xuICAgICAgcGF0dGVybiArPSBuZWdhdGl2ZTtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMubmVnYXRpdmVfc2lnbl9iZWZvcmVfZGlnaXRzKSB7XG4gICAgICBwYXR0ZXJuID0gbmVnYXRpdmUgKyBwYXR0ZXJuO1xuICAgIH1cbiAgfSAvLyBTb3V0aCBBZnJpY2FuIFJhbmQsIGZvciBleGFtcGxlLCB1c2VzIFIgMTIzIChzcGFjZSkgYW5kIFItMTIzIChubyBzcGFjZSlcblxuXG4gIGlmIChvcHRpb25zLmFsbG93X25lZ2F0aXZlX3NpZ25fcGxhY2Vob2xkZXIpIHtcbiAgICBwYXR0ZXJuID0gXCIoICg/IVxcXFwtKSk/XCIuY29uY2F0KHBhdHRlcm4pO1xuICB9IGVsc2UgaWYgKG9wdGlvbnMuYWxsb3dfc3BhY2VfYWZ0ZXJfc3ltYm9sKSB7XG4gICAgcGF0dGVybiA9IFwiID9cIi5jb25jYXQocGF0dGVybik7XG4gIH0gZWxzZSBpZiAob3B0aW9ucy5hbGxvd19zcGFjZV9hZnRlcl9kaWdpdHMpIHtcbiAgICBwYXR0ZXJuICs9ICcoICg/ISQpKT8nO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuc3ltYm9sX2FmdGVyX2RpZ2l0cykge1xuICAgIHBhdHRlcm4gKz0gc3ltYm9sO1xuICB9IGVsc2Uge1xuICAgIHBhdHRlcm4gPSBzeW1ib2wgKyBwYXR0ZXJuO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuYWxsb3dfbmVnYXRpdmVzKSB7XG4gICAgaWYgKG9wdGlvbnMucGFyZW5zX2Zvcl9uZWdhdGl2ZXMpIHtcbiAgICAgIHBhdHRlcm4gPSBcIihcXFxcKFwiLmNvbmNhdChwYXR0ZXJuLCBcIlxcXFwpfFwiKS5jb25jYXQocGF0dGVybiwgXCIpXCIpO1xuICAgIH0gZWxzZSBpZiAoIShvcHRpb25zLm5lZ2F0aXZlX3NpZ25fYmVmb3JlX2RpZ2l0cyB8fCBvcHRpb25zLm5lZ2F0aXZlX3NpZ25fYWZ0ZXJfZGlnaXRzKSkge1xuICAgICAgcGF0dGVybiA9IG5lZ2F0aXZlICsgcGF0dGVybjtcbiAgICB9XG4gIH0gLy8gZW5zdXJlIHRoZXJlJ3MgYSBkb2xsYXIgYW5kL29yIGRlY2ltYWwgYW1vdW50LCBhbmQgdGhhdFxuICAvLyBpdCBkb2Vzbid0IHN0YXJ0IHdpdGggYSBzcGFjZSBvciBhIG5lZ2F0aXZlIHNpZ24gZm9sbG93ZWQgYnkgYSBzcGFjZVxuXG5cbiAgcmV0dXJuIG5ldyBSZWdFeHAoXCJeKD8hLT8gKSg/PS4qXFxcXGQpXCIuY29uY2F0KHBhdHRlcm4sIFwiJFwiKSk7XG59XG5cbnZhciBkZWZhdWx0X2N1cnJlbmN5X29wdGlvbnMgPSB7XG4gIHN5bWJvbDogJyQnLFxuICByZXF1aXJlX3N5bWJvbDogZmFsc2UsXG4gIGFsbG93X3NwYWNlX2FmdGVyX3N5bWJvbDogZmFsc2UsXG4gIHN5bWJvbF9hZnRlcl9kaWdpdHM6IGZhbHNlLFxuICBhbGxvd19uZWdhdGl2ZXM6IHRydWUsXG4gIHBhcmVuc19mb3JfbmVnYXRpdmVzOiBmYWxzZSxcbiAgbmVnYXRpdmVfc2lnbl9iZWZvcmVfZGlnaXRzOiBmYWxzZSxcbiAgbmVnYXRpdmVfc2lnbl9hZnRlcl9kaWdpdHM6IGZhbHNlLFxuICBhbGxvd19uZWdhdGl2ZV9zaWduX3BsYWNlaG9sZGVyOiBmYWxzZSxcbiAgdGhvdXNhbmRzX3NlcGFyYXRvcjogJywnLFxuICBkZWNpbWFsX3NlcGFyYXRvcjogJy4nLFxuICBhbGxvd19kZWNpbWFsOiB0cnVlLFxuICByZXF1aXJlX2RlY2ltYWw6IGZhbHNlLFxuICBkaWdpdHNfYWZ0ZXJfZGVjaW1hbDogWzJdLFxuICBhbGxvd19zcGFjZV9hZnRlcl9kaWdpdHM6IGZhbHNlXG59O1xuXG5mdW5jdGlvbiBpc0N1cnJlbmN5KHN0ciwgb3B0aW9ucykge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICBvcHRpb25zID0gKDAsIF9tZXJnZS5kZWZhdWx0KShvcHRpb25zLCBkZWZhdWx0X2N1cnJlbmN5X29wdGlvbnMpO1xuICByZXR1cm4gY3VycmVuY3lSZWdleChvcHRpb25zKS50ZXN0KHN0cik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzRGF0YVVSSTtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIHZhbGlkTWVkaWFUeXBlID0gL15bYS16XStcXC9bYS16MC05XFwtXFwrXFwuX10rJC9pO1xudmFyIHZhbGlkQXR0cmlidXRlID0gL15bYS16XFwtXSs9W2EtejAtOVxcLV0rJC9pO1xudmFyIHZhbGlkRGF0YSA9IC9eW2EtejAtOSFcXCQmJ1xcKFxcKVxcKlxcKyw7PVxcLVxcLl9+OkBcXC9cXD8lXFxzXSokL2k7XG5cbmZ1bmN0aW9uIGlzRGF0YVVSSShzdHIpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgdmFyIGRhdGEgPSBzdHIuc3BsaXQoJywnKTtcblxuICBpZiAoZGF0YS5sZW5ndGggPCAyKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIGF0dHJpYnV0ZXMgPSBkYXRhLnNoaWZ0KCkudHJpbSgpLnNwbGl0KCc7Jyk7XG4gIHZhciBzY2hlbWVBbmRNZWRpYVR5cGUgPSBhdHRyaWJ1dGVzLnNoaWZ0KCk7XG5cbiAgaWYgKHNjaGVtZUFuZE1lZGlhVHlwZS5zbGljZSgwLCA1KSAhPT0gJ2RhdGE6Jykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBtZWRpYVR5cGUgPSBzY2hlbWVBbmRNZWRpYVR5cGUuc2xpY2UoNSk7XG5cbiAgaWYgKG1lZGlhVHlwZSAhPT0gJycgJiYgIXZhbGlkTWVkaWFUeXBlLnRlc3QobWVkaWFUeXBlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmICghKGkgPT09IGF0dHJpYnV0ZXMubGVuZ3RoIC0gMSAmJiBhdHRyaWJ1dGVzW2ldLnRvTG93ZXJDYXNlKCkgPT09ICdiYXNlNjQnKSAmJiAhdmFsaWRBdHRyaWJ1dGUudGVzdChhdHRyaWJ1dGVzW2ldKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIF9pID0gMDsgX2kgPCBkYXRhLmxlbmd0aDsgX2krKykge1xuICAgIGlmICghdmFsaWREYXRhLnRlc3QoZGF0YVtfaV0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzRGF0ZTtcblxudmFyIF9tZXJnZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9tZXJnZVwiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG5mdW5jdGlvbiBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlcihvLCBhbGxvd0FycmF5TGlrZSkgeyB2YXIgaXQ7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8IG9bU3ltYm9sLml0ZXJhdG9yXSA9PSBudWxsKSB7IGlmIChBcnJheS5pc0FycmF5KG8pIHx8IChpdCA9IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvKSkgfHwgYWxsb3dBcnJheUxpa2UgJiYgbyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHsgaWYgKGl0KSBvID0gaXQ7IHZhciBpID0gMDsgdmFyIEYgPSBmdW5jdGlvbiBGKCkge307IHJldHVybiB7IHM6IEYsIG46IGZ1bmN0aW9uIG4oKSB7IGlmIChpID49IG8ubGVuZ3RoKSByZXR1cm4geyBkb25lOiB0cnVlIH07IHJldHVybiB7IGRvbmU6IGZhbHNlLCB2YWx1ZTogb1tpKytdIH07IH0sIGU6IGZ1bmN0aW9uIGUoX2UyKSB7IHRocm93IF9lMjsgfSwgZjogRiB9OyB9IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gaXRlcmF0ZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfSB2YXIgbm9ybWFsQ29tcGxldGlvbiA9IHRydWUsIGRpZEVyciA9IGZhbHNlLCBlcnI7IHJldHVybiB7IHM6IGZ1bmN0aW9uIHMoKSB7IGl0ID0gb1tTeW1ib2wuaXRlcmF0b3JdKCk7IH0sIG46IGZ1bmN0aW9uIG4oKSB7IHZhciBzdGVwID0gaXQubmV4dCgpOyBub3JtYWxDb21wbGV0aW9uID0gc3RlcC5kb25lOyByZXR1cm4gc3RlcDsgfSwgZTogZnVuY3Rpb24gZShfZTMpIHsgZGlkRXJyID0gdHJ1ZTsgZXJyID0gX2UzOyB9LCBmOiBmdW5jdGlvbiBmKCkgeyB0cnkgeyBpZiAoIW5vcm1hbENvbXBsZXRpb24gJiYgaXQucmV0dXJuICE9IG51bGwpIGl0LnJldHVybigpOyB9IGZpbmFsbHkgeyBpZiAoZGlkRXJyKSB0aHJvdyBlcnI7IH0gfSB9OyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxudmFyIGRlZmF1bHRfZGF0ZV9vcHRpb25zID0ge1xuICBmb3JtYXQ6ICdZWVlZL01NL0REJyxcbiAgZGVsaW1pdGVyczogWycvJywgJy0nXSxcbiAgc3RyaWN0TW9kZTogZmFsc2Vcbn07XG5cbmZ1bmN0aW9uIGlzVmFsaWRGb3JtYXQoZm9ybWF0KSB7XG4gIHJldHVybiAvKF4oeXs0fXx5ezJ9KVsuXFwvLV0obXsxLDJ9KVsuXFwvLV0oZHsxLDJ9KSQpfCheKG17MSwyfSlbLlxcLy1dKGR7MSwyfSlbLlxcLy1dKCh5ezR9fHl7Mn0pJCkpfCheKGR7MSwyfSlbLlxcLy1dKG17MSwyfSlbLlxcLy1dKCh5ezR9fHl7Mn0pJCkpL2dpLnRlc3QoZm9ybWF0KTtcbn1cblxuZnVuY3Rpb24gemlwKGRhdGUsIGZvcm1hdCkge1xuICB2YXIgemlwcGVkQXJyID0gW10sXG4gICAgICBsZW4gPSBNYXRoLm1pbihkYXRlLmxlbmd0aCwgZm9ybWF0Lmxlbmd0aCk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIHppcHBlZEFyci5wdXNoKFtkYXRlW2ldLCBmb3JtYXRbaV1dKTtcbiAgfVxuXG4gIHJldHVybiB6aXBwZWRBcnI7XG59XG5cbmZ1bmN0aW9uIGlzRGF0ZShpbnB1dCwgb3B0aW9ucykge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgLy8gQWxsb3cgYmFja3dhcmQgY29tcGF0YmlsaXR5IGZvciBvbGQgZm9ybWF0IGlzRGF0ZShpbnB1dCBbLCBmb3JtYXRdKVxuICAgIG9wdGlvbnMgPSAoMCwgX21lcmdlLmRlZmF1bHQpKHtcbiAgICAgIGZvcm1hdDogb3B0aW9uc1xuICAgIH0sIGRlZmF1bHRfZGF0ZV9vcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICBvcHRpb25zID0gKDAsIF9tZXJnZS5kZWZhdWx0KShvcHRpb25zLCBkZWZhdWx0X2RhdGVfb3B0aW9ucyk7XG4gIH1cblxuICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJyAmJiBpc1ZhbGlkRm9ybWF0KG9wdGlvbnMuZm9ybWF0KSkge1xuICAgIHZhciBmb3JtYXREZWxpbWl0ZXIgPSBvcHRpb25zLmRlbGltaXRlcnMuZmluZChmdW5jdGlvbiAoZGVsaW1pdGVyKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5mb3JtYXQuaW5kZXhPZihkZWxpbWl0ZXIpICE9PSAtMTtcbiAgICB9KTtcbiAgICB2YXIgZGF0ZURlbGltaXRlciA9IG9wdGlvbnMuc3RyaWN0TW9kZSA/IGZvcm1hdERlbGltaXRlciA6IG9wdGlvbnMuZGVsaW1pdGVycy5maW5kKGZ1bmN0aW9uIChkZWxpbWl0ZXIpIHtcbiAgICAgIHJldHVybiBpbnB1dC5pbmRleE9mKGRlbGltaXRlcikgIT09IC0xO1xuICAgIH0pO1xuICAgIHZhciBkYXRlQW5kRm9ybWF0ID0gemlwKGlucHV0LnNwbGl0KGRhdGVEZWxpbWl0ZXIpLCBvcHRpb25zLmZvcm1hdC50b0xvd2VyQ2FzZSgpLnNwbGl0KGZvcm1hdERlbGltaXRlcikpO1xuICAgIHZhciBkYXRlT2JqID0ge307XG5cbiAgICB2YXIgX2l0ZXJhdG9yID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIoZGF0ZUFuZEZvcm1hdCksXG4gICAgICAgIF9zdGVwO1xuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAoX2l0ZXJhdG9yLnMoKTsgIShfc3RlcCA9IF9pdGVyYXRvci5uKCkpLmRvbmU7KSB7XG4gICAgICAgIHZhciBfc3RlcCR2YWx1ZSA9IF9zbGljZWRUb0FycmF5KF9zdGVwLnZhbHVlLCAyKSxcbiAgICAgICAgICAgIGRhdGVXb3JkID0gX3N0ZXAkdmFsdWVbMF0sXG4gICAgICAgICAgICBmb3JtYXRXb3JkID0gX3N0ZXAkdmFsdWVbMV07XG5cbiAgICAgICAgaWYgKGRhdGVXb3JkLmxlbmd0aCAhPT0gZm9ybWF0V29yZC5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBkYXRlT2JqW2Zvcm1hdFdvcmQuY2hhckF0KDApXSA9IGRhdGVXb3JkO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2l0ZXJhdG9yLmUoZXJyKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgX2l0ZXJhdG9yLmYoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IERhdGUoXCJcIi5jb25jYXQoZGF0ZU9iai5tLCBcIi9cIikuY29uY2F0KGRhdGVPYmouZCwgXCIvXCIpLmNvbmNhdChkYXRlT2JqLnkpKS5nZXREYXRlKCkgPT09ICtkYXRlT2JqLmQ7XG4gIH1cblxuICBpZiAoIW9wdGlvbnMuc3RyaWN0TW9kZSkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpID09PSAnW29iamVjdCBEYXRlXScgJiYgaXNGaW5pdGUoaW5wdXQpO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc0RlY2ltYWw7XG5cbnZhciBfbWVyZ2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvbWVyZ2VcIikpO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG52YXIgX2luY2x1ZGVzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2luY2x1ZGVzXCIpKTtcblxudmFyIF9hbHBoYSA9IHJlcXVpcmUoXCIuL2FscGhhXCIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBkZWNpbWFsUmVnRXhwKG9wdGlvbnMpIHtcbiAgdmFyIHJlZ0V4cCA9IG5ldyBSZWdFeHAoXCJeWy0rXT8oWzAtOV0rKT8oXFxcXFwiLmNvbmNhdChfYWxwaGEuZGVjaW1hbFtvcHRpb25zLmxvY2FsZV0sIFwiWzAtOV17XCIpLmNvbmNhdChvcHRpb25zLmRlY2ltYWxfZGlnaXRzLCBcIn0pXCIpLmNvbmNhdChvcHRpb25zLmZvcmNlX2RlY2ltYWwgPyAnJyA6ICc/JywgXCIkXCIpKTtcbiAgcmV0dXJuIHJlZ0V4cDtcbn1cblxudmFyIGRlZmF1bHRfZGVjaW1hbF9vcHRpb25zID0ge1xuICBmb3JjZV9kZWNpbWFsOiBmYWxzZSxcbiAgZGVjaW1hbF9kaWdpdHM6ICcxLCcsXG4gIGxvY2FsZTogJ2VuLVVTJ1xufTtcbnZhciBibGFja2xpc3QgPSBbJycsICctJywgJysnXTtcblxuZnVuY3Rpb24gaXNEZWNpbWFsKHN0ciwgb3B0aW9ucykge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICBvcHRpb25zID0gKDAsIF9tZXJnZS5kZWZhdWx0KShvcHRpb25zLCBkZWZhdWx0X2RlY2ltYWxfb3B0aW9ucyk7XG5cbiAgaWYgKG9wdGlvbnMubG9jYWxlIGluIF9hbHBoYS5kZWNpbWFsKSB7XG4gICAgcmV0dXJuICEoMCwgX2luY2x1ZGVzLmRlZmF1bHQpKGJsYWNrbGlzdCwgc3RyLnJlcGxhY2UoLyAvZywgJycpKSAmJiBkZWNpbWFsUmVnRXhwKG9wdGlvbnMpLnRlc3Qoc3RyKTtcbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgbG9jYWxlICdcIi5jb25jYXQob3B0aW9ucy5sb2NhbGUsIFwiJ1wiKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzRGl2aXNpYmxlQnk7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbnZhciBfdG9GbG9hdCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdG9GbG9hdFwiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIGlzRGl2aXNpYmxlQnkoc3RyLCBudW0pIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgcmV0dXJuICgwLCBfdG9GbG9hdC5kZWZhdWx0KShzdHIpICUgcGFyc2VJbnQobnVtLCAxMCkgPT09IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzRUFOO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIFRoZSBtb3N0IGNvbW1vbmx5IHVzZWQgRUFOIHN0YW5kYXJkIGlzXG4gKiB0aGUgdGhpcnRlZW4tZGlnaXQgRUFOLTEzLCB3aGlsZSB0aGVcbiAqIGxlc3MgY29tbW9ubHkgdXNlZCA4LWRpZ2l0IEVBTi04IGJhcmNvZGUgd2FzXG4gKiBpbnRyb2R1Y2VkIGZvciB1c2Ugb24gc21hbGwgcGFja2FnZXMuXG4gKiBBbHNvIEVBTi9VQ0MtMTQgaXMgdXNlZCBmb3IgR3JvdXBpbmcgb2YgaW5kaXZpZHVhbFxuICogdHJhZGUgaXRlbXMgYWJvdmUgdW5pdCBsZXZlbChJbnRlcm1lZGlhdGUsIENhcnRvbiBvciBQYWxsZXQpLlxuICogRm9yIG1vcmUgaW5mbyBhYm91dCBFQU4tMTQgY2hlY2tvdXQ6IGh0dHBzOi8vd3d3Lmd0aW4uaW5mby9pdGYtMTQtYmFyY29kZXMvXG4gKiBFQU4gY29uc2lzdHMgb2Y6XG4gKiBHUzEgcHJlZml4LCBtYW51ZmFjdHVyZXIgY29kZSwgcHJvZHVjdCBjb2RlIGFuZCBjaGVjayBkaWdpdFxuICogUmVmZXJlbmNlOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JbnRlcm5hdGlvbmFsX0FydGljbGVfTnVtYmVyXG4gKiBSZWZlcmVuY2U6IGh0dHBzOi8vd3d3Lmd0aW4uaW5mby9cbiAqL1xuXG4vKipcbiAqIERlZmluZSBFQU4gTGVuZ2h0czsgOCBmb3IgRUFOLTg7IDEzIGZvciBFQU4tMTM7IDE0IGZvciBFQU4tMTRcbiAqIGFuZCBSZWd1bGFyIEV4cHJlc3Npb24gZm9yIHZhbGlkIEVBTnMgKEVBTi04LCBFQU4tMTMsIEVBTi0xNCksXG4gKiB3aXRoIGV4YWN0IG51bWJlcmljIG1hdGNoaW5nIG9mIDggb3IgMTMgb3IgMTQgZGlnaXRzIFswLTldXG4gKi9cbnZhciBMRU5HVEhfRUFOXzggPSA4O1xudmFyIExFTkdUSF9FQU5fMTQgPSAxNDtcbnZhciB2YWxpZEVhblJlZ2V4ID0gL14oXFxkezh9fFxcZHsxM318XFxkezE0fSkkLztcbi8qKlxuICogR2V0IHBvc2l0aW9uIHdlaWdodCBnaXZlbjpcbiAqIEVBTiBsZW5ndGggYW5kIGRpZ2l0IGluZGV4L3Bvc2l0aW9uXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aFxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gKiBAcmV0dXJuIHtudW1iZXJ9XG4gKi9cblxuZnVuY3Rpb24gZ2V0UG9zaXRpb25XZWlnaHRUaHJvdWdoTGVuZ3RoQW5kSW5kZXgobGVuZ3RoLCBpbmRleCkge1xuICBpZiAobGVuZ3RoID09PSBMRU5HVEhfRUFOXzggfHwgbGVuZ3RoID09PSBMRU5HVEhfRUFOXzE0KSB7XG4gICAgcmV0dXJuIGluZGV4ICUgMiA9PT0gMCA/IDMgOiAxO1xuICB9XG5cbiAgcmV0dXJuIGluZGV4ICUgMiA9PT0gMCA/IDEgOiAzO1xufVxuLyoqXG4gKiBDYWxjdWxhdGUgRUFOIENoZWNrIERpZ2l0XG4gKiBSZWZlcmVuY2U6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0ludGVybmF0aW9uYWxfQXJ0aWNsZV9OdW1iZXIjQ2FsY3VsYXRpb25fb2ZfY2hlY2tzdW1fZGlnaXRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZWFuXG4gKiBAcmV0dXJuIHtudW1iZXJ9XG4gKi9cblxuXG5mdW5jdGlvbiBjYWxjdWxhdGVDaGVja0RpZ2l0KGVhbikge1xuICB2YXIgY2hlY2tzdW0gPSBlYW4uc2xpY2UoMCwgLTEpLnNwbGl0KCcnKS5tYXAoZnVuY3Rpb24gKGNoYXIsIGluZGV4KSB7XG4gICAgcmV0dXJuIE51bWJlcihjaGFyKSAqIGdldFBvc2l0aW9uV2VpZ2h0VGhyb3VnaExlbmd0aEFuZEluZGV4KGVhbi5sZW5ndGgsIGluZGV4KTtcbiAgfSkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHBhcnRpYWxTdW0pIHtcbiAgICByZXR1cm4gYWNjICsgcGFydGlhbFN1bTtcbiAgfSwgMCk7XG4gIHZhciByZW1haW5kZXIgPSAxMCAtIGNoZWNrc3VtICUgMTA7XG4gIHJldHVybiByZW1haW5kZXIgPCAxMCA/IHJlbWFpbmRlciA6IDA7XG59XG4vKipcbiAqIENoZWNrIGlmIHN0cmluZyBpcyB2YWxpZCBFQU46XG4gKiBNYXRjaGVzIEVBTi04L0VBTi0xMy9FQU4tMTQgcmVnZXhcbiAqIEhhcyB2YWxpZCBjaGVjayBkaWdpdC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5cblxuZnVuY3Rpb24gaXNFQU4oc3RyKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIHZhciBhY3R1YWxDaGVja0RpZ2l0ID0gTnVtYmVyKHN0ci5zbGljZSgtMSkpO1xuICByZXR1cm4gdmFsaWRFYW5SZWdleC50ZXN0KHN0cikgJiYgYWN0dWFsQ2hlY2tEaWdpdCA9PT0gY2FsY3VsYXRlQ2hlY2tEaWdpdChzdHIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc0VtYWlsO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG52YXIgX21lcmdlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL21lcmdlXCIpKTtcblxudmFyIF9pc0J5dGVMZW5ndGggPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2lzQnl0ZUxlbmd0aFwiKSk7XG5cbnZhciBfaXNGUUROID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9pc0ZRRE5cIikpO1xuXG52YXIgX2lzSVAgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2lzSVBcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgZGVmYXVsdF9lbWFpbF9vcHRpb25zID0ge1xuICBhbGxvd19kaXNwbGF5X25hbWU6IGZhbHNlLFxuICByZXF1aXJlX2Rpc3BsYXlfbmFtZTogZmFsc2UsXG4gIGFsbG93X3V0ZjhfbG9jYWxfcGFydDogdHJ1ZSxcbiAgcmVxdWlyZV90bGQ6IHRydWUsXG4gIGJsYWNrbGlzdGVkX2NoYXJzOiAnJyxcbiAgaWdub3JlX21heF9sZW5ndGg6IGZhbHNlLFxuICBob3N0X2JsYWNrbGlzdDogW10sXG4gIGhvc3Rfd2hpdGVsaXN0OiBbXVxufTtcbi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgbm8tY29udHJvbC1yZWdleCAqL1xuXG52YXIgc3BsaXROYW1lQWRkcmVzcyA9IC9eKFteXFx4MDAtXFx4MUZcXHg3Ri1cXHg5RlxcY1hdKyk8L2k7XG52YXIgZW1haWxVc2VyUGFydCA9IC9eW2EtelxcZCEjXFwkJSYnXFwqXFwrXFwtXFwvPVxcP1xcXl9ge1xcfH1+XSskL2k7XG52YXIgZ21haWxVc2VyUGFydCA9IC9eW2EtelxcZF0rJC87XG52YXIgcXVvdGVkRW1haWxVc2VyID0gL14oW1xcc1xceDAxLVxceDA4XFx4MGJcXHgwY1xceDBlLVxceDFmXFx4N2ZcXHgyMVxceDIzLVxceDViXFx4NWQtXFx4N2VdfChcXFxcW1xceDAxLVxceDA5XFx4MGJcXHgwY1xceDBkLVxceDdmXSkpKiQvaTtcbnZhciBlbWFpbFVzZXJVdGY4UGFydCA9IC9eW2EtelxcZCEjXFwkJSYnXFwqXFwrXFwtXFwvPVxcP1xcXl9ge1xcfH1+XFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSskL2k7XG52YXIgcXVvdGVkRW1haWxVc2VyVXRmOCA9IC9eKFtcXHNcXHgwMS1cXHgwOFxceDBiXFx4MGNcXHgwZS1cXHgxZlxceDdmXFx4MjFcXHgyMy1cXHg1YlxceDVkLVxceDdlXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXXwoXFxcXFtcXHgwMS1cXHgwOVxceDBiXFx4MGNcXHgwZC1cXHg3ZlxcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pKSokL2k7XG52YXIgZGVmYXVsdE1heEVtYWlsTGVuZ3RoID0gMjU0O1xuLyogZXNsaW50LWVuYWJsZSBtYXgtbGVuICovXG5cbi8qIGVzbGludC1lbmFibGUgbm8tY29udHJvbC1yZWdleCAqL1xuXG4vKipcbiAqIFZhbGlkYXRlIGRpc3BsYXkgbmFtZSBhY2NvcmRpbmcgdG8gdGhlIFJGQzI4MjI6IGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMyODIyI2FwcGVuZGl4LUEuMS4yXG4gKiBAcGFyYW0ge1N0cmluZ30gZGlzcGxheV9uYW1lXG4gKi9cblxuZnVuY3Rpb24gdmFsaWRhdGVEaXNwbGF5TmFtZShkaXNwbGF5X25hbWUpIHtcbiAgdmFyIGRpc3BsYXlfbmFtZV93aXRob3V0X3F1b3RlcyA9IGRpc3BsYXlfbmFtZS5yZXBsYWNlKC9eXCIoLispXCIkLywgJyQxJyk7IC8vIGRpc3BsYXkgbmFtZSB3aXRoIG9ubHkgc3BhY2VzIGlzIG5vdCB2YWxpZFxuXG4gIGlmICghZGlzcGxheV9uYW1lX3dpdGhvdXRfcXVvdGVzLnRyaW0oKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSAvLyBjaGVjayB3aGV0aGVyIGRpc3BsYXkgbmFtZSBjb250YWlucyBpbGxlZ2FsIGNoYXJhY3RlclxuXG5cbiAgdmFyIGNvbnRhaW5zX2lsbGVnYWwgPSAvW1xcLlwiOzw+XS8udGVzdChkaXNwbGF5X25hbWVfd2l0aG91dF9xdW90ZXMpO1xuXG4gIGlmIChjb250YWluc19pbGxlZ2FsKSB7XG4gICAgLy8gaWYgY29udGFpbnMgaWxsZWdhbCBjaGFyYWN0ZXJzLFxuICAgIC8vIG11c3QgdG8gYmUgZW5jbG9zZWQgaW4gZG91YmxlLXF1b3Rlcywgb3RoZXJ3aXNlIGl0J3Mgbm90IGEgdmFsaWQgZGlzcGxheSBuYW1lXG4gICAgaWYgKGRpc3BsYXlfbmFtZV93aXRob3V0X3F1b3RlcyA9PT0gZGlzcGxheV9uYW1lKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSAvLyB0aGUgcXVvdGVzIGluIGRpc3BsYXkgbmFtZSBtdXN0IHN0YXJ0IHdpdGggY2hhcmFjdGVyIHN5bWJvbCBcXFxuXG5cbiAgICB2YXIgYWxsX3N0YXJ0X3dpdGhfYmFja19zbGFzaCA9IGRpc3BsYXlfbmFtZV93aXRob3V0X3F1b3Rlcy5zcGxpdCgnXCInKS5sZW5ndGggPT09IGRpc3BsYXlfbmFtZV93aXRob3V0X3F1b3Rlcy5zcGxpdCgnXFxcXFwiJykubGVuZ3RoO1xuXG4gICAgaWYgKCFhbGxfc3RhcnRfd2l0aF9iYWNrX3NsYXNoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGlzRW1haWwoc3RyLCBvcHRpb25zKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIG9wdGlvbnMgPSAoMCwgX21lcmdlLmRlZmF1bHQpKG9wdGlvbnMsIGRlZmF1bHRfZW1haWxfb3B0aW9ucyk7XG5cbiAgaWYgKG9wdGlvbnMucmVxdWlyZV9kaXNwbGF5X25hbWUgfHwgb3B0aW9ucy5hbGxvd19kaXNwbGF5X25hbWUpIHtcbiAgICB2YXIgZGlzcGxheV9lbWFpbCA9IHN0ci5tYXRjaChzcGxpdE5hbWVBZGRyZXNzKTtcblxuICAgIGlmIChkaXNwbGF5X2VtYWlsKSB7XG4gICAgICB2YXIgZGlzcGxheV9uYW1lID0gZGlzcGxheV9lbWFpbFsxXTsgLy8gUmVtb3ZlIGRpc3BsYXkgbmFtZSBhbmQgYW5nbGUgYnJhY2tldHMgdG8gZ2V0IGVtYWlsIGFkZHJlc3NcbiAgICAgIC8vIENhbiBiZSBkb25lIGluIHRoZSByZWdleCBidXQgd2lsbCBpbnRyb2R1Y2UgYSBSZURPUyAoU2VlICAjMTU5NyBmb3IgbW9yZSBpbmZvKVxuXG4gICAgICBzdHIgPSBzdHIucmVwbGFjZShkaXNwbGF5X25hbWUsICcnKS5yZXBsYWNlKC8oXjx8PiQpL2csICcnKTsgLy8gc29tZXRpbWVzIG5lZWQgdG8gdHJpbSB0aGUgbGFzdCBzcGFjZSB0byBnZXQgdGhlIGRpc3BsYXkgbmFtZVxuICAgICAgLy8gYmVjYXVzZSB0aGVyZSBtYXkgYmUgYSBzcGFjZSBiZXR3ZWVuIGRpc3BsYXkgbmFtZSBhbmQgZW1haWwgYWRkcmVzc1xuICAgICAgLy8gZWcuIG15bmFtZSA8YWRkcmVzc0BnbWFpbC5jb20+XG4gICAgICAvLyB0aGUgZGlzcGxheSBuYW1lIGlzIGBteW5hbWVgIGluc3RlYWQgb2YgYG15bmFtZSBgLCBzbyBuZWVkIHRvIHRyaW0gdGhlIGxhc3Qgc3BhY2VcblxuICAgICAgaWYgKGRpc3BsYXlfbmFtZS5lbmRzV2l0aCgnICcpKSB7XG4gICAgICAgIGRpc3BsYXlfbmFtZSA9IGRpc3BsYXlfbmFtZS5zbGljZSgwLCAtMSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghdmFsaWRhdGVEaXNwbGF5TmFtZShkaXNwbGF5X25hbWUpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMucmVxdWlyZV9kaXNwbGF5X25hbWUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBpZiAoIW9wdGlvbnMuaWdub3JlX21heF9sZW5ndGggJiYgc3RyLmxlbmd0aCA+IGRlZmF1bHRNYXhFbWFpbExlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBwYXJ0cyA9IHN0ci5zcGxpdCgnQCcpO1xuICB2YXIgZG9tYWluID0gcGFydHMucG9wKCk7XG4gIHZhciBsb3dlcl9kb21haW4gPSBkb21haW4udG9Mb3dlckNhc2UoKTtcblxuICBpZiAob3B0aW9ucy5ob3N0X2JsYWNrbGlzdC5pbmNsdWRlcyhsb3dlcl9kb21haW4pKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuaG9zdF93aGl0ZWxpc3QubGVuZ3RoID4gMCAmJiAhb3B0aW9ucy5ob3N0X3doaXRlbGlzdC5pbmNsdWRlcyhsb3dlcl9kb21haW4pKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIHVzZXIgPSBwYXJ0cy5qb2luKCdAJyk7XG5cbiAgaWYgKG9wdGlvbnMuZG9tYWluX3NwZWNpZmljX3ZhbGlkYXRpb24gJiYgKGxvd2VyX2RvbWFpbiA9PT0gJ2dtYWlsLmNvbScgfHwgbG93ZXJfZG9tYWluID09PSAnZ29vZ2xlbWFpbC5jb20nKSkge1xuICAgIC8qXG4gICAgICBQcmV2aW91c2x5IHdlIHJlbW92ZWQgZG90cyBmb3IgZ21haWwgYWRkcmVzc2VzIGJlZm9yZSB2YWxpZGF0aW5nLlxuICAgICAgVGhpcyB3YXMgcmVtb3ZlZCBiZWNhdXNlIGl0IGFsbG93cyBgbXVsdGlwbGUuLmRvdHNAZ21haWwuY29tYFxuICAgICAgdG8gYmUgcmVwb3J0ZWQgYXMgdmFsaWQsIGJ1dCBpdCBpcyBub3QuXG4gICAgICBHbWFpbCBvbmx5IG5vcm1hbGl6ZXMgc2luZ2xlIGRvdHMsIHJlbW92aW5nIHRoZW0gZnJvbSBoZXJlIGlzIHBvaW50bGVzcyxcbiAgICAgIHNob3VsZCBiZSBkb25lIGluIG5vcm1hbGl6ZUVtYWlsXG4gICAgKi9cbiAgICB1c2VyID0gdXNlci50b0xvd2VyQ2FzZSgpOyAvLyBSZW1vdmluZyBzdWItYWRkcmVzcyBmcm9tIHVzZXJuYW1lIGJlZm9yZSBnbWFpbCB2YWxpZGF0aW9uXG5cbiAgICB2YXIgdXNlcm5hbWUgPSB1c2VyLnNwbGl0KCcrJylbMF07IC8vIERvdHMgYXJlIG5vdCBpbmNsdWRlZCBpbiBnbWFpbCBsZW5ndGggcmVzdHJpY3Rpb25cblxuICAgIGlmICghKDAsIF9pc0J5dGVMZW5ndGguZGVmYXVsdCkodXNlcm5hbWUucmVwbGFjZSgvXFwuL2csICcnKSwge1xuICAgICAgbWluOiA2LFxuICAgICAgbWF4OiAzMFxuICAgIH0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIF91c2VyX3BhcnRzID0gdXNlcm5hbWUuc3BsaXQoJy4nKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX3VzZXJfcGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICghZ21haWxVc2VyUGFydC50ZXN0KF91c2VyX3BhcnRzW2ldKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKG9wdGlvbnMuaWdub3JlX21heF9sZW5ndGggPT09IGZhbHNlICYmICghKDAsIF9pc0J5dGVMZW5ndGguZGVmYXVsdCkodXNlciwge1xuICAgIG1heDogNjRcbiAgfSkgfHwgISgwLCBfaXNCeXRlTGVuZ3RoLmRlZmF1bHQpKGRvbWFpbiwge1xuICAgIG1heDogMjU0XG4gIH0pKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICghKDAsIF9pc0ZRRE4uZGVmYXVsdCkoZG9tYWluLCB7XG4gICAgcmVxdWlyZV90bGQ6IG9wdGlvbnMucmVxdWlyZV90bGQsXG4gICAgaWdub3JlX21heF9sZW5ndGg6IG9wdGlvbnMuaWdub3JlX21heF9sZW5ndGhcbiAgfSkpIHtcbiAgICBpZiAoIW9wdGlvbnMuYWxsb3dfaXBfZG9tYWluKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCEoMCwgX2lzSVAuZGVmYXVsdCkoZG9tYWluKSkge1xuICAgICAgaWYgKCFkb21haW4uc3RhcnRzV2l0aCgnWycpIHx8ICFkb21haW4uZW5kc1dpdGgoJ10nKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHZhciBub0JyYWNrZXRkb21haW4gPSBkb21haW4uc2xpY2UoMSwgLTEpO1xuXG4gICAgICBpZiAobm9CcmFja2V0ZG9tYWluLmxlbmd0aCA9PT0gMCB8fCAhKDAsIF9pc0lQLmRlZmF1bHQpKG5vQnJhY2tldGRvbWFpbikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmICh1c2VyWzBdID09PSAnXCInKSB7XG4gICAgdXNlciA9IHVzZXIuc2xpY2UoMSwgdXNlci5sZW5ndGggLSAxKTtcbiAgICByZXR1cm4gb3B0aW9ucy5hbGxvd191dGY4X2xvY2FsX3BhcnQgPyBxdW90ZWRFbWFpbFVzZXJVdGY4LnRlc3QodXNlcikgOiBxdW90ZWRFbWFpbFVzZXIudGVzdCh1c2VyKTtcbiAgfVxuXG4gIHZhciBwYXR0ZXJuID0gb3B0aW9ucy5hbGxvd191dGY4X2xvY2FsX3BhcnQgPyBlbWFpbFVzZXJVdGY4UGFydCA6IGVtYWlsVXNlclBhcnQ7XG4gIHZhciB1c2VyX3BhcnRzID0gdXNlci5zcGxpdCgnLicpO1xuXG4gIGZvciAodmFyIF9pID0gMDsgX2kgPCB1c2VyX3BhcnRzLmxlbmd0aDsgX2krKykge1xuICAgIGlmICghcGF0dGVybi50ZXN0KHVzZXJfcGFydHNbX2ldKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGlmIChvcHRpb25zLmJsYWNrbGlzdGVkX2NoYXJzKSB7XG4gICAgaWYgKHVzZXIuc2VhcmNoKG5ldyBSZWdFeHAoXCJbXCIuY29uY2F0KG9wdGlvbnMuYmxhY2tsaXN0ZWRfY2hhcnMsIFwiXStcIiksICdnJykpICE9PSAtMSkgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzRW1wdHk7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbnZhciBfbWVyZ2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvbWVyZ2VcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgZGVmYXVsdF9pc19lbXB0eV9vcHRpb25zID0ge1xuICBpZ25vcmVfd2hpdGVzcGFjZTogZmFsc2Vcbn07XG5cbmZ1bmN0aW9uIGlzRW1wdHkoc3RyLCBvcHRpb25zKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIG9wdGlvbnMgPSAoMCwgX21lcmdlLmRlZmF1bHQpKG9wdGlvbnMsIGRlZmF1bHRfaXNfZW1wdHlfb3B0aW9ucyk7XG4gIHJldHVybiAob3B0aW9ucy5pZ25vcmVfd2hpdGVzcGFjZSA/IHN0ci50cmltKCkubGVuZ3RoIDogc3RyLmxlbmd0aCkgPT09IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzRXRoZXJldW1BZGRyZXNzO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgZXRoID0gL14oMHgpWzAtOWEtZl17NDB9JC9pO1xuXG5mdW5jdGlvbiBpc0V0aGVyZXVtQWRkcmVzcyhzdHIpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgcmV0dXJuIGV0aC50ZXN0KHN0cik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzRlFETjtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxudmFyIF9tZXJnZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9tZXJnZVwiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBkZWZhdWx0X2ZxZG5fb3B0aW9ucyA9IHtcbiAgcmVxdWlyZV90bGQ6IHRydWUsXG4gIGFsbG93X3VuZGVyc2NvcmVzOiBmYWxzZSxcbiAgYWxsb3dfdHJhaWxpbmdfZG90OiBmYWxzZSxcbiAgYWxsb3dfbnVtZXJpY190bGQ6IGZhbHNlLFxuICBhbGxvd193aWxkY2FyZDogZmFsc2UsXG4gIGlnbm9yZV9tYXhfbGVuZ3RoOiBmYWxzZVxufTtcblxuZnVuY3Rpb24gaXNGUUROKHN0ciwgb3B0aW9ucykge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICBvcHRpb25zID0gKDAsIF9tZXJnZS5kZWZhdWx0KShvcHRpb25zLCBkZWZhdWx0X2ZxZG5fb3B0aW9ucyk7XG4gIC8qIFJlbW92ZSB0aGUgb3B0aW9uYWwgdHJhaWxpbmcgZG90IGJlZm9yZSBjaGVja2luZyB2YWxpZGl0eSAqL1xuXG4gIGlmIChvcHRpb25zLmFsbG93X3RyYWlsaW5nX2RvdCAmJiBzdHJbc3RyLmxlbmd0aCAtIDFdID09PSAnLicpIHtcbiAgICBzdHIgPSBzdHIuc3Vic3RyaW5nKDAsIHN0ci5sZW5ndGggLSAxKTtcbiAgfVxuICAvKiBSZW1vdmUgdGhlIG9wdGlvbmFsIHdpbGRjYXJkIGJlZm9yZSBjaGVja2luZyB2YWxpZGl0eSAqL1xuXG5cbiAgaWYgKG9wdGlvbnMuYWxsb3dfd2lsZGNhcmQgPT09IHRydWUgJiYgc3RyLmluZGV4T2YoJyouJykgPT09IDApIHtcbiAgICBzdHIgPSBzdHIuc3Vic3RyaW5nKDIpO1xuICB9XG5cbiAgdmFyIHBhcnRzID0gc3RyLnNwbGl0KCcuJyk7XG4gIHZhciB0bGQgPSBwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXTtcblxuICBpZiAob3B0aW9ucy5yZXF1aXJlX3RsZCkge1xuICAgIC8vIGRpc2FsbG93IGZxZG5zIHdpdGhvdXQgdGxkXG4gICAgaWYgKHBhcnRzLmxlbmd0aCA8IDIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIW9wdGlvbnMuYWxsb3dfbnVtZXJpY190bGQgJiYgIS9eKFthLXpcXHUwMEExLVxcdTAwQThcXHUwMEFBLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdezIsfXx4blthLXowLTktXXsyLH0pJC9pLnRlc3QodGxkKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gLy8gZGlzYWxsb3cgc3BhY2VzXG5cblxuICAgIGlmICgvXFxzLy50ZXN0KHRsZCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0gLy8gcmVqZWN0IG51bWVyaWMgVExEc1xuXG5cbiAgaWYgKCFvcHRpb25zLmFsbG93X251bWVyaWNfdGxkICYmIC9eXFxkKyQvLnRlc3QodGxkKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBwYXJ0cy5ldmVyeShmdW5jdGlvbiAocGFydCkge1xuICAgIGlmIChwYXJ0Lmxlbmd0aCA+IDYzICYmICFvcHRpb25zLmlnbm9yZV9tYXhfbGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCEvXlthLXpfXFx1MDBhMS1cXHVmZmZmMC05LV0rJC9pLnRlc3QocGFydCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IC8vIGRpc2FsbG93IGZ1bGwtd2lkdGggY2hhcnNcblxuXG4gICAgaWYgKC9bXFx1ZmYwMS1cXHVmZjVlXS8udGVzdChwYXJ0KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gLy8gZGlzYWxsb3cgcGFydHMgc3RhcnRpbmcgb3IgZW5kaW5nIHdpdGggaHlwaGVuXG5cblxuICAgIGlmICgvXi18LSQvLnRlc3QocGFydCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIW9wdGlvbnMuYWxsb3dfdW5kZXJzY29yZXMgJiYgL18vLnRlc3QocGFydCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzRmxvYXQ7XG5leHBvcnRzLmxvY2FsZXMgPSB2b2lkIDA7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbnZhciBfYWxwaGEgPSByZXF1aXJlKFwiLi9hbHBoYVwiKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gaXNGbG9hdChzdHIsIG9wdGlvbnMpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBmbG9hdCA9IG5ldyBSZWdFeHAoXCJeKD86Wy0rXSk/KD86WzAtOV0rKT8oPzpcXFxcXCIuY29uY2F0KG9wdGlvbnMubG9jYWxlID8gX2FscGhhLmRlY2ltYWxbb3B0aW9ucy5sb2NhbGVdIDogJy4nLCBcIlswLTldKik/KD86W2VFXVtcXFxcK1xcXFwtXT8oPzpbMC05XSspKT8kXCIpKTtcblxuICBpZiAoc3RyID09PSAnJyB8fCBzdHIgPT09ICcuJyB8fCBzdHIgPT09ICcsJyB8fCBzdHIgPT09ICctJyB8fCBzdHIgPT09ICcrJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciB2YWx1ZSA9IHBhcnNlRmxvYXQoc3RyLnJlcGxhY2UoJywnLCAnLicpKTtcbiAgcmV0dXJuIGZsb2F0LnRlc3Qoc3RyKSAmJiAoIW9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ21pbicpIHx8IHZhbHVlID49IG9wdGlvbnMubWluKSAmJiAoIW9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ21heCcpIHx8IHZhbHVlIDw9IG9wdGlvbnMubWF4KSAmJiAoIW9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2x0JykgfHwgdmFsdWUgPCBvcHRpb25zLmx0KSAmJiAoIW9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2d0JykgfHwgdmFsdWUgPiBvcHRpb25zLmd0KTtcbn1cblxudmFyIGxvY2FsZXMgPSBPYmplY3Qua2V5cyhfYWxwaGEuZGVjaW1hbCk7XG5leHBvcnRzLmxvY2FsZXMgPSBsb2NhbGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNGdWxsV2lkdGg7XG5leHBvcnRzLmZ1bGxXaWR0aCA9IHZvaWQgMDtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGZ1bGxXaWR0aCA9IC9bXlxcdTAwMjAtXFx1MDA3RVxcdUZGNjEtXFx1RkY5RlxcdUZGQTAtXFx1RkZEQ1xcdUZGRTgtXFx1RkZFRTAtOWEtekEtWl0vO1xuZXhwb3J0cy5mdWxsV2lkdGggPSBmdWxsV2lkdGg7XG5cbmZ1bmN0aW9uIGlzRnVsbFdpZHRoKHN0cikge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICByZXR1cm4gZnVsbFdpZHRoLnRlc3Qoc3RyKTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzSFNMO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgaHNsQ29tbWEgPSAvXmhzbGE/XFwoKChcXCt8XFwtKT8oWzAtOV0rKFxcLlswLTldKyk/KGUoXFwrfFxcLSk/WzAtOV0rKT98XFwuWzAtOV0rKGUoXFwrfFxcLSk/WzAtOV0rKT8pKShkZWd8Z3JhZHxyYWR8dHVybik/KCwoXFwrfFxcLSk/KFswLTldKyhcXC5bMC05XSspPyhlKFxcK3xcXC0pP1swLTldKyk/fFxcLlswLTldKyhlKFxcK3xcXC0pP1swLTldKyk/KSUpezJ9KCwoKFxcK3xcXC0pPyhbMC05XSsoXFwuWzAtOV0rKT8oZShcXCt8XFwtKT9bMC05XSspP3xcXC5bMC05XSsoZShcXCt8XFwtKT9bMC05XSspPyklPykpP1xcKSQvaTtcbnZhciBoc2xTcGFjZSA9IC9eaHNsYT9cXCgoKFxcK3xcXC0pPyhbMC05XSsoXFwuWzAtOV0rKT8oZShcXCt8XFwtKT9bMC05XSspP3xcXC5bMC05XSsoZShcXCt8XFwtKT9bMC05XSspPykpKGRlZ3xncmFkfHJhZHx0dXJuKT8oXFxzKFxcK3xcXC0pPyhbMC05XSsoXFwuWzAtOV0rKT8oZShcXCt8XFwtKT9bMC05XSspP3xcXC5bMC05XSsoZShcXCt8XFwtKT9bMC05XSspPyklKXsyfVxccz8oXFwvXFxzKChcXCt8XFwtKT8oWzAtOV0rKFxcLlswLTldKyk/KGUoXFwrfFxcLSk/WzAtOV0rKT98XFwuWzAtOV0rKGUoXFwrfFxcLSk/WzAtOV0rKT8pJT8pXFxzPyk/XFwpJC9pO1xuXG5mdW5jdGlvbiBpc0hTTChzdHIpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTsgLy8gU3RyaXAgZHVwbGljYXRlIHNwYWNlcyBiZWZvcmUgY2FsbGluZyB0aGUgdmFsaWRhdGlvbiByZWdleCAoU2VlICAjMTU5OCBmb3IgbW9yZSBpbmZvKVxuXG4gIHZhciBzdHJpcHBlZFN0ciA9IHN0ci5yZXBsYWNlKC9cXHMrL2csICcgJykucmVwbGFjZSgvXFxzPyhoc2xhP1xcKHxcXCl8LClcXHM/L2lnLCAnJDEnKTtcblxuICBpZiAoc3RyaXBwZWRTdHIuaW5kZXhPZignLCcpICE9PSAtMSkge1xuICAgIHJldHVybiBoc2xDb21tYS50ZXN0KHN0cmlwcGVkU3RyKTtcbiAgfVxuXG4gIHJldHVybiBoc2xTcGFjZS50ZXN0KHN0cmlwcGVkU3RyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNIYWxmV2lkdGg7XG5leHBvcnRzLmhhbGZXaWR0aCA9IHZvaWQgMDtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGhhbGZXaWR0aCA9IC9bXFx1MDAyMC1cXHUwMDdFXFx1RkY2MS1cXHVGRjlGXFx1RkZBMC1cXHVGRkRDXFx1RkZFOC1cXHVGRkVFMC05YS16QS1aXS87XG5leHBvcnRzLmhhbGZXaWR0aCA9IGhhbGZXaWR0aDtcblxuZnVuY3Rpb24gaXNIYWxmV2lkdGgoc3RyKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIHJldHVybiBoYWxmV2lkdGgudGVzdChzdHIpO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNIYXNoO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgbGVuZ3RocyA9IHtcbiAgbWQ1OiAzMixcbiAgbWQ0OiAzMixcbiAgc2hhMTogNDAsXG4gIHNoYTI1NjogNjQsXG4gIHNoYTM4NDogOTYsXG4gIHNoYTUxMjogMTI4LFxuICByaXBlbWQxMjg6IDMyLFxuICByaXBlbWQxNjA6IDQwLFxuICB0aWdlcjEyODogMzIsXG4gIHRpZ2VyMTYwOiA0MCxcbiAgdGlnZXIxOTI6IDQ4LFxuICBjcmMzMjogOCxcbiAgY3JjMzJiOiA4XG59O1xuXG5mdW5jdGlvbiBpc0hhc2goc3RyLCBhbGdvcml0aG0pIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgdmFyIGhhc2ggPSBuZXcgUmVnRXhwKFwiXlthLWZBLUYwLTlde1wiLmNvbmNhdChsZW5ndGhzW2FsZ29yaXRobV0sIFwifSRcIikpO1xuICByZXR1cm4gaGFzaC50ZXN0KHN0cik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzSGV4Q29sb3I7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBoZXhjb2xvciA9IC9eIz8oWzAtOUEtRl17M318WzAtOUEtRl17NH18WzAtOUEtRl17Nn18WzAtOUEtRl17OH0pJC9pO1xuXG5mdW5jdGlvbiBpc0hleENvbG9yKHN0cikge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICByZXR1cm4gaGV4Y29sb3IudGVzdChzdHIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc0hleGFkZWNpbWFsO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgaGV4YWRlY2ltYWwgPSAvXigweHwwaCk/WzAtOUEtRl0rJC9pO1xuXG5mdW5jdGlvbiBpc0hleGFkZWNpbWFsKHN0cikge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICByZXR1cm4gaGV4YWRlY2ltYWwudGVzdChzdHIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc0lCQU47XG5leHBvcnRzLmxvY2FsZXMgPSB2b2lkIDA7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogTGlzdCBvZiBjb3VudHJ5IGNvZGVzIHdpdGhcbiAqIGNvcnJlc3BvbmRpbmcgSUJBTiByZWd1bGFyIGV4cHJlc3Npb25cbiAqIFJlZmVyZW5jZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSW50ZXJuYXRpb25hbF9CYW5rX0FjY291bnRfTnVtYmVyXG4gKi9cbnZhciBpYmFuUmVnZXhUaHJvdWdoQ291bnRyeUNvZGUgPSB7XG4gIEFEOiAvXihBRFswLTldezJ9KVxcZHs4fVtBLVowLTldezEyfSQvLFxuICBBRTogL14oQUVbMC05XXsyfSlcXGR7M31cXGR7MTZ9JC8sXG4gIEFMOiAvXihBTFswLTldezJ9KVxcZHs4fVtBLVowLTldezE2fSQvLFxuICBBVDogL14oQVRbMC05XXsyfSlcXGR7MTZ9JC8sXG4gIEFaOiAvXihBWlswLTldezJ9KVtBLVowLTldezR9XFxkezIwfSQvLFxuICBCQTogL14oQkFbMC05XXsyfSlcXGR7MTZ9JC8sXG4gIEJFOiAvXihCRVswLTldezJ9KVxcZHsxMn0kLyxcbiAgQkc6IC9eKEJHWzAtOV17Mn0pW0EtWl17NH1cXGR7Nn1bQS1aMC05XXs4fSQvLFxuICBCSDogL14oQkhbMC05XXsyfSlbQS1aXXs0fVtBLVowLTldezE0fSQvLFxuICBCUjogL14oQlJbMC05XXsyfSlcXGR7MjN9W0EtWl17MX1bQS1aMC05XXsxfSQvLFxuICBCWTogL14oQllbMC05XXsyfSlbQS1aMC05XXs0fVxcZHsyMH0kLyxcbiAgQ0g6IC9eKENIWzAtOV17Mn0pXFxkezV9W0EtWjAtOV17MTJ9JC8sXG4gIENSOiAvXihDUlswLTldezJ9KVxcZHsxOH0kLyxcbiAgQ1k6IC9eKENZWzAtOV17Mn0pXFxkezh9W0EtWjAtOV17MTZ9JC8sXG4gIENaOiAvXihDWlswLTldezJ9KVxcZHsyMH0kLyxcbiAgREU6IC9eKERFWzAtOV17Mn0pXFxkezE4fSQvLFxuICBESzogL14oREtbMC05XXsyfSlcXGR7MTR9JC8sXG4gIERPOiAvXihET1swLTldezJ9KVtBLVpdezR9XFxkezIwfSQvLFxuICBFRTogL14oRUVbMC05XXsyfSlcXGR7MTZ9JC8sXG4gIEVHOiAvXihFR1swLTldezJ9KVxcZHsyNX0kLyxcbiAgRVM6IC9eKEVTWzAtOV17Mn0pXFxkezIwfSQvLFxuICBGSTogL14oRklbMC05XXsyfSlcXGR7MTR9JC8sXG4gIEZPOiAvXihGT1swLTldezJ9KVxcZHsxNH0kLyxcbiAgRlI6IC9eKEZSWzAtOV17Mn0pXFxkezEwfVtBLVowLTldezExfVxcZHsyfSQvLFxuICBHQjogL14oR0JbMC05XXsyfSlbQS1aXXs0fVxcZHsxNH0kLyxcbiAgR0U6IC9eKEdFWzAtOV17Mn0pW0EtWjAtOV17Mn1cXGR7MTZ9JC8sXG4gIEdJOiAvXihHSVswLTldezJ9KVtBLVpdezR9W0EtWjAtOV17MTV9JC8sXG4gIEdMOiAvXihHTFswLTldezJ9KVxcZHsxNH0kLyxcbiAgR1I6IC9eKEdSWzAtOV17Mn0pXFxkezd9W0EtWjAtOV17MTZ9JC8sXG4gIEdUOiAvXihHVFswLTldezJ9KVtBLVowLTldezR9W0EtWjAtOV17MjB9JC8sXG4gIEhSOiAvXihIUlswLTldezJ9KVxcZHsxN30kLyxcbiAgSFU6IC9eKEhVWzAtOV17Mn0pXFxkezI0fSQvLFxuICBJRTogL14oSUVbMC05XXsyfSlbQS1aMC05XXs0fVxcZHsxNH0kLyxcbiAgSUw6IC9eKElMWzAtOV17Mn0pXFxkezE5fSQvLFxuICBJUTogL14oSVFbMC05XXsyfSlbQS1aXXs0fVxcZHsxNX0kLyxcbiAgSVI6IC9eKElSWzAtOV17Mn0pMFxcZHsyfTBcXGR7MTh9JC8sXG4gIElTOiAvXihJU1swLTldezJ9KVxcZHsyMn0kLyxcbiAgSVQ6IC9eKElUWzAtOV17Mn0pW0EtWl17MX1cXGR7MTB9W0EtWjAtOV17MTJ9JC8sXG4gIEpPOiAvXihKT1swLTldezJ9KVtBLVpdezR9XFxkezIyfSQvLFxuICBLVzogL14oS1dbMC05XXsyfSlbQS1aXXs0fVtBLVowLTldezIyfSQvLFxuICBLWjogL14oS1pbMC05XXsyfSlcXGR7M31bQS1aMC05XXsxM30kLyxcbiAgTEI6IC9eKExCWzAtOV17Mn0pXFxkezR9W0EtWjAtOV17MjB9JC8sXG4gIExDOiAvXihMQ1swLTldezJ9KVtBLVpdezR9W0EtWjAtOV17MjR9JC8sXG4gIExJOiAvXihMSVswLTldezJ9KVxcZHs1fVtBLVowLTldezEyfSQvLFxuICBMVDogL14oTFRbMC05XXsyfSlcXGR7MTZ9JC8sXG4gIExVOiAvXihMVVswLTldezJ9KVxcZHszfVtBLVowLTldezEzfSQvLFxuICBMVjogL14oTFZbMC05XXsyfSlbQS1aXXs0fVtBLVowLTldezEzfSQvLFxuICBNQzogL14oTUNbMC05XXsyfSlcXGR7MTB9W0EtWjAtOV17MTF9XFxkezJ9JC8sXG4gIE1EOiAvXihNRFswLTldezJ9KVtBLVowLTldezIwfSQvLFxuICBNRTogL14oTUVbMC05XXsyfSlcXGR7MTh9JC8sXG4gIE1LOiAvXihNS1swLTldezJ9KVxcZHszfVtBLVowLTldezEwfVxcZHsyfSQvLFxuICBNUjogL14oTVJbMC05XXsyfSlcXGR7MjN9JC8sXG4gIE1UOiAvXihNVFswLTldezJ9KVtBLVpdezR9XFxkezV9W0EtWjAtOV17MTh9JC8sXG4gIE1VOiAvXihNVVswLTldezJ9KVtBLVpdezR9XFxkezE5fVtBLVpdezN9JC8sXG4gIE1aOiAvXihNWlswLTldezJ9KVxcZHsyMX0kLyxcbiAgTkw6IC9eKE5MWzAtOV17Mn0pW0EtWl17NH1cXGR7MTB9JC8sXG4gIE5POiAvXihOT1swLTldezJ9KVxcZHsxMX0kLyxcbiAgUEs6IC9eKFBLWzAtOV17Mn0pW0EtWjAtOV17NH1cXGR7MTZ9JC8sXG4gIFBMOiAvXihQTFswLTldezJ9KVxcZHsyNH0kLyxcbiAgUFM6IC9eKFBTWzAtOV17Mn0pW0EtWjAtOV17NH1cXGR7MjF9JC8sXG4gIFBUOiAvXihQVFswLTldezJ9KVxcZHsyMX0kLyxcbiAgUUE6IC9eKFFBWzAtOV17Mn0pW0EtWl17NH1bQS1aMC05XXsyMX0kLyxcbiAgUk86IC9eKFJPWzAtOV17Mn0pW0EtWl17NH1bQS1aMC05XXsxNn0kLyxcbiAgUlM6IC9eKFJTWzAtOV17Mn0pXFxkezE4fSQvLFxuICBTQTogL14oU0FbMC05XXsyfSlcXGR7Mn1bQS1aMC05XXsxOH0kLyxcbiAgU0M6IC9eKFNDWzAtOV17Mn0pW0EtWl17NH1cXGR7MjB9W0EtWl17M30kLyxcbiAgU0U6IC9eKFNFWzAtOV17Mn0pXFxkezIwfSQvLFxuICBTSTogL14oU0lbMC05XXsyfSlcXGR7MTV9JC8sXG4gIFNLOiAvXihTS1swLTldezJ9KVxcZHsyMH0kLyxcbiAgU006IC9eKFNNWzAtOV17Mn0pW0EtWl17MX1cXGR7MTB9W0EtWjAtOV17MTJ9JC8sXG4gIFNWOiAvXihTVlswLTldezJ9KVtBLVowLTldezR9XFxkezIwfSQvLFxuICBUTDogL14oVExbMC05XXsyfSlcXGR7MTl9JC8sXG4gIFROOiAvXihUTlswLTldezJ9KVxcZHsyMH0kLyxcbiAgVFI6IC9eKFRSWzAtOV17Mn0pXFxkezV9W0EtWjAtOV17MTd9JC8sXG4gIFVBOiAvXihVQVswLTldezJ9KVxcZHs2fVtBLVowLTldezE5fSQvLFxuICBWQTogL14oVkFbMC05XXsyfSlcXGR7MTh9JC8sXG4gIFZHOiAvXihWR1swLTldezJ9KVtBLVowLTldezR9XFxkezE2fSQvLFxuICBYSzogL14oWEtbMC05XXsyfSlcXGR7MTZ9JC9cbn07XG4vKipcbiAqIENoZWNrIHdoZXRoZXIgc3RyaW5nIGhhcyBjb3JyZWN0IHVuaXZlcnNhbCBJQkFOIGZvcm1hdFxuICogVGhlIElCQU4gY29uc2lzdHMgb2YgdXAgdG8gMzQgYWxwaGFudW1lcmljIGNoYXJhY3RlcnMsIGFzIGZvbGxvd3M6XG4gKiBDb3VudHJ5IENvZGUgdXNpbmcgSVNPIDMxNjYtMSBhbHBoYS0yLCB0d28gbGV0dGVyc1xuICogY2hlY2sgZGlnaXRzLCB0d28gZGlnaXRzIGFuZFxuICogQmFzaWMgQmFuayBBY2NvdW50IE51bWJlciAoQkJBTiksIHVwIHRvIDMwIGFscGhhbnVtZXJpYyBjaGFyYWN0ZXJzLlxuICogTk9URTogUGVybWl0dGVkIElCQU4gY2hhcmFjdGVycyBhcmU6IGRpZ2l0cyBbMC05XSBhbmQgdGhlIDI2IGxhdGluIGFscGhhYmV0aWMgW0EtWl1cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gc3RyaW5nIHVuZGVyIHZhbGlkYXRpb25cbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cblxuZnVuY3Rpb24gaGFzVmFsaWRJYmFuRm9ybWF0KHN0cikge1xuICAvLyBTdHJpcCB3aGl0ZSBzcGFjZXMgYW5kIGh5cGhlbnNcbiAgdmFyIHN0cmlwcGVkU3RyID0gc3RyLnJlcGxhY2UoL1tcXHNcXC1dKy9naSwgJycpLnRvVXBwZXJDYXNlKCk7XG4gIHZhciBpc29Db3VudHJ5Q29kZSA9IHN0cmlwcGVkU3RyLnNsaWNlKDAsIDIpLnRvVXBwZXJDYXNlKCk7XG4gIHJldHVybiBpc29Db3VudHJ5Q29kZSBpbiBpYmFuUmVnZXhUaHJvdWdoQ291bnRyeUNvZGUgJiYgaWJhblJlZ2V4VGhyb3VnaENvdW50cnlDb2RlW2lzb0NvdW50cnlDb2RlXS50ZXN0KHN0cmlwcGVkU3RyKTtcbn1cbi8qKlxuICAgKiBDaGVjayB3aGV0aGVyIHN0cmluZyBoYXMgdmFsaWQgSUJBTiBDaGVja3N1bVxuICAgKiBieSBwZXJmb3JtaW5nIGJhc2ljIG1vZC05NyBvcGVyYXRpb24gYW5kXG4gICAqIHRoZSByZW1haW5kZXIgc2hvdWxkIGVxdWFsIDFcbiAgICogLS0gU3RhcnQgYnkgcmVhcnJhbmdpbmcgdGhlIElCQU4gYnkgbW92aW5nIHRoZSBmb3VyIGluaXRpYWwgY2hhcmFjdGVycyB0byB0aGUgZW5kIG9mIHRoZSBzdHJpbmdcbiAgICogLS0gUmVwbGFjZSBlYWNoIGxldHRlciBpbiB0aGUgc3RyaW5nIHdpdGggdHdvIGRpZ2l0cywgQSAtPiAxMCwgQiA9IDExLCBaID0gMzVcbiAgICogLS0gSW50ZXJwcmV0IHRoZSBzdHJpbmcgYXMgYSBkZWNpbWFsIGludGVnZXIgYW5kXG4gICAqIC0tIGNvbXB1dGUgdGhlIHJlbWFpbmRlciBvbiBkaXZpc2lvbiBieSA5NyAobW9kIDk3KVxuICAgKiBSZWZlcmVuY2U6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0ludGVybmF0aW9uYWxfQmFua19BY2NvdW50X051bWJlclxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuXG5cbmZ1bmN0aW9uIGhhc1ZhbGlkSWJhbkNoZWNrc3VtKHN0cikge1xuICB2YXIgc3RyaXBwZWRTdHIgPSBzdHIucmVwbGFjZSgvW15BLVowLTldKy9naSwgJycpLnRvVXBwZXJDYXNlKCk7IC8vIEtlZXAgb25seSBkaWdpdHMgYW5kIEEtWiBsYXRpbiBhbHBoYWJldGljXG5cbiAgdmFyIHJlYXJyYW5nZWQgPSBzdHJpcHBlZFN0ci5zbGljZSg0KSArIHN0cmlwcGVkU3RyLnNsaWNlKDAsIDQpO1xuICB2YXIgYWxwaGFDYXBzUmVwbGFjZWRXaXRoRGlnaXRzID0gcmVhcnJhbmdlZC5yZXBsYWNlKC9bQS1aXS9nLCBmdW5jdGlvbiAoY2hhcikge1xuICAgIHJldHVybiBjaGFyLmNoYXJDb2RlQXQoMCkgLSA1NTtcbiAgfSk7XG4gIHZhciByZW1haW5kZXIgPSBhbHBoYUNhcHNSZXBsYWNlZFdpdGhEaWdpdHMubWF0Y2goL1xcZHsxLDd9L2cpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCB2YWx1ZSkge1xuICAgIHJldHVybiBOdW1iZXIoYWNjICsgdmFsdWUpICUgOTc7XG4gIH0sICcnKTtcbiAgcmV0dXJuIHJlbWFpbmRlciA9PT0gMTtcbn1cblxuZnVuY3Rpb24gaXNJQkFOKHN0cikge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICByZXR1cm4gaGFzVmFsaWRJYmFuRm9ybWF0KHN0cikgJiYgaGFzVmFsaWRJYmFuQ2hlY2tzdW0oc3RyKTtcbn1cblxudmFyIGxvY2FsZXMgPSBPYmplY3Qua2V5cyhpYmFuUmVnZXhUaHJvdWdoQ291bnRyeUNvZGUpO1xuZXhwb3J0cy5sb2NhbGVzID0gbG9jYWxlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzSU1FSTtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGltZWlSZWdleFdpdGhvdXRIeXBlbnMgPSAvXlswLTldezE1fSQvO1xudmFyIGltZWlSZWdleFdpdGhIeXBlbnMgPSAvXlxcZHsyfS1cXGR7Nn0tXFxkezZ9LVxcZHsxfSQvO1xuXG5mdW5jdGlvbiBpc0lNRUkoc3RyLCBvcHRpb25zKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9OyAvLyBkZWZhdWx0IHJlZ2V4IGZvciBjaGVja2luZyBpbWVpIGlzIHRoZSBvbmUgd2l0aG91dCBoeXBoZW5zXG5cbiAgdmFyIGltZWlSZWdleCA9IGltZWlSZWdleFdpdGhvdXRIeXBlbnM7XG5cbiAgaWYgKG9wdGlvbnMuYWxsb3dfaHlwaGVucykge1xuICAgIGltZWlSZWdleCA9IGltZWlSZWdleFdpdGhIeXBlbnM7XG4gIH1cblxuICBpZiAoIWltZWlSZWdleC50ZXN0KHN0cikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHIgPSBzdHIucmVwbGFjZSgvLS9nLCAnJyk7XG4gIHZhciBzdW0gPSAwLFxuICAgICAgbXVsID0gMixcbiAgICAgIGwgPSAxNDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgIHZhciBkaWdpdCA9IHN0ci5zdWJzdHJpbmcobCAtIGkgLSAxLCBsIC0gaSk7XG4gICAgdmFyIHRwID0gcGFyc2VJbnQoZGlnaXQsIDEwKSAqIG11bDtcblxuICAgIGlmICh0cCA+PSAxMCkge1xuICAgICAgc3VtICs9IHRwICUgMTAgKyAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdW0gKz0gdHA7XG4gICAgfVxuXG4gICAgaWYgKG11bCA9PT0gMSkge1xuICAgICAgbXVsICs9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIG11bCAtPSAxO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjaGsgPSAoMTAgLSBzdW0gJSAxMCkgJSAxMDtcblxuICBpZiAoY2hrICE9PSBwYXJzZUludChzdHIuc3Vic3RyaW5nKDE0LCAxNSksIDEwKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc0lQO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbjExLjMuICBFeGFtcGxlc1xuXG4gICBUaGUgZm9sbG93aW5nIGFkZHJlc3Nlc1xuXG4gICAgICAgICAgICAgZmU4MDo6MTIzNCAob24gdGhlIDFzdCBsaW5rIG9mIHRoZSBub2RlKVxuICAgICAgICAgICAgIGZmMDI6OjU2NzggKG9uIHRoZSA1dGggbGluayBvZiB0aGUgbm9kZSlcbiAgICAgICAgICAgICBmZjA4Ojo5YWJjIChvbiB0aGUgMTB0aCBvcmdhbml6YXRpb24gb2YgdGhlIG5vZGUpXG5cbiAgIHdvdWxkIGJlIHJlcHJlc2VudGVkIGFzIGZvbGxvd3M6XG5cbiAgICAgICAgICAgICBmZTgwOjoxMjM0JTFcbiAgICAgICAgICAgICBmZjAyOjo1Njc4JTVcbiAgICAgICAgICAgICBmZjA4Ojo5YWJjJTEwXG5cbiAgIChIZXJlIHdlIGFzc3VtZSBhIG5hdHVyYWwgdHJhbnNsYXRpb24gZnJvbSBhIHpvbmUgaW5kZXggdG8gdGhlXG4gICA8em9uZV9pZD4gcGFydCwgd2hlcmUgdGhlIE50aCB6b25lIG9mIGFueSBzY29wZSBpcyB0cmFuc2xhdGVkIGludG9cbiAgIFwiTlwiLilcblxuICAgSWYgd2UgdXNlIGludGVyZmFjZSBuYW1lcyBhcyA8em9uZV9pZD4sIHRob3NlIGFkZHJlc3NlcyBjb3VsZCBhbHNvIGJlXG4gICByZXByZXNlbnRlZCBhcyBmb2xsb3dzOlxuXG4gICAgICAgICAgICBmZTgwOjoxMjM0JW5lMFxuICAgICAgICAgICAgZmYwMjo6NTY3OCVwdmMxLjNcbiAgICAgICAgICAgIGZmMDg6OjlhYmMlaW50ZXJmYWNlMTBcblxuICAgd2hlcmUgdGhlIGludGVyZmFjZSBcIm5lMFwiIGJlbG9uZ3MgdG8gdGhlIDFzdCBsaW5rLCBcInB2YzEuM1wiIGJlbG9uZ3NcbiAgIHRvIHRoZSA1dGggbGluaywgYW5kIFwiaW50ZXJmYWNlMTBcIiBiZWxvbmdzIHRvIHRoZSAxMHRoIG9yZ2FuaXphdGlvbi5cbiAqICogKi9cbnZhciBJUHY0U2VnbWVudEZvcm1hdCA9ICcoPzpbMC05XXxbMS05XVswLTldfDFbMC05XVswLTldfDJbMC00XVswLTldfDI1WzAtNV0pJztcbnZhciBJUHY0QWRkcmVzc0Zvcm1hdCA9IFwiKFwiLmNvbmNhdChJUHY0U2VnbWVudEZvcm1hdCwgXCJbLl0pezN9XCIpLmNvbmNhdChJUHY0U2VnbWVudEZvcm1hdCk7XG52YXIgSVB2NEFkZHJlc3NSZWdFeHAgPSBuZXcgUmVnRXhwKFwiXlwiLmNvbmNhdChJUHY0QWRkcmVzc0Zvcm1hdCwgXCIkXCIpKTtcbnZhciBJUHY2U2VnbWVudEZvcm1hdCA9ICcoPzpbMC05YS1mQS1GXXsxLDR9KSc7XG52YXIgSVB2NkFkZHJlc3NSZWdFeHAgPSBuZXcgUmVnRXhwKCdeKCcgKyBcIig/OlwiLmNvbmNhdChJUHY2U2VnbWVudEZvcm1hdCwgXCI6KXs3fSg/OlwiKS5jb25jYXQoSVB2NlNlZ21lbnRGb3JtYXQsIFwifDopfFwiKSArIFwiKD86XCIuY29uY2F0KElQdjZTZWdtZW50Rm9ybWF0LCBcIjopezZ9KD86XCIpLmNvbmNhdChJUHY0QWRkcmVzc0Zvcm1hdCwgXCJ8OlwiKS5jb25jYXQoSVB2NlNlZ21lbnRGb3JtYXQsIFwifDopfFwiKSArIFwiKD86XCIuY29uY2F0KElQdjZTZWdtZW50Rm9ybWF0LCBcIjopezV9KD86OlwiKS5jb25jYXQoSVB2NEFkZHJlc3NGb3JtYXQsIFwifCg6XCIpLmNvbmNhdChJUHY2U2VnbWVudEZvcm1hdCwgXCIpezEsMn18Oil8XCIpICsgXCIoPzpcIi5jb25jYXQoSVB2NlNlZ21lbnRGb3JtYXQsIFwiOil7NH0oPzooOlwiKS5jb25jYXQoSVB2NlNlZ21lbnRGb3JtYXQsIFwiKXswLDF9OlwiKS5jb25jYXQoSVB2NEFkZHJlc3NGb3JtYXQsIFwifCg6XCIpLmNvbmNhdChJUHY2U2VnbWVudEZvcm1hdCwgXCIpezEsM318Oil8XCIpICsgXCIoPzpcIi5jb25jYXQoSVB2NlNlZ21lbnRGb3JtYXQsIFwiOil7M30oPzooOlwiKS5jb25jYXQoSVB2NlNlZ21lbnRGb3JtYXQsIFwiKXswLDJ9OlwiKS5jb25jYXQoSVB2NEFkZHJlc3NGb3JtYXQsIFwifCg6XCIpLmNvbmNhdChJUHY2U2VnbWVudEZvcm1hdCwgXCIpezEsNH18Oil8XCIpICsgXCIoPzpcIi5jb25jYXQoSVB2NlNlZ21lbnRGb3JtYXQsIFwiOil7Mn0oPzooOlwiKS5jb25jYXQoSVB2NlNlZ21lbnRGb3JtYXQsIFwiKXswLDN9OlwiKS5jb25jYXQoSVB2NEFkZHJlc3NGb3JtYXQsIFwifCg6XCIpLmNvbmNhdChJUHY2U2VnbWVudEZvcm1hdCwgXCIpezEsNX18Oil8XCIpICsgXCIoPzpcIi5jb25jYXQoSVB2NlNlZ21lbnRGb3JtYXQsIFwiOil7MX0oPzooOlwiKS5jb25jYXQoSVB2NlNlZ21lbnRGb3JtYXQsIFwiKXswLDR9OlwiKS5jb25jYXQoSVB2NEFkZHJlc3NGb3JtYXQsIFwifCg6XCIpLmNvbmNhdChJUHY2U2VnbWVudEZvcm1hdCwgXCIpezEsNn18Oil8XCIpICsgXCIoPzo6KCg/OjpcIi5jb25jYXQoSVB2NlNlZ21lbnRGb3JtYXQsIFwiKXswLDV9OlwiKS5jb25jYXQoSVB2NEFkZHJlc3NGb3JtYXQsIFwifCg/OjpcIikuY29uY2F0KElQdjZTZWdtZW50Rm9ybWF0LCBcIil7MSw3fXw6KSlcIikgKyAnKSglWzAtOWEtekEtWi0uOl17MSx9KT8kJyk7XG5cbmZ1bmN0aW9uIGlzSVAoc3RyKSB7XG4gIHZhciB2ZXJzaW9uID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAnJztcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgdmVyc2lvbiA9IFN0cmluZyh2ZXJzaW9uKTtcblxuICBpZiAoIXZlcnNpb24pIHtcbiAgICByZXR1cm4gaXNJUChzdHIsIDQpIHx8IGlzSVAoc3RyLCA2KTtcbiAgfVxuXG4gIGlmICh2ZXJzaW9uID09PSAnNCcpIHtcbiAgICByZXR1cm4gSVB2NEFkZHJlc3NSZWdFeHAudGVzdChzdHIpO1xuICB9XG5cbiAgaWYgKHZlcnNpb24gPT09ICc2Jykge1xuICAgIHJldHVybiBJUHY2QWRkcmVzc1JlZ0V4cC50ZXN0KHN0cik7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzSVBSYW5nZTtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxudmFyIF9pc0lQID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9pc0lQXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIHN1Ym5ldE1heWJlID0gL15cXGR7MSwzfSQvO1xudmFyIHY0U3VibmV0ID0gMzI7XG52YXIgdjZTdWJuZXQgPSAxMjg7XG5cbmZ1bmN0aW9uIGlzSVBSYW5nZShzdHIpIHtcbiAgdmFyIHZlcnNpb24gPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6ICcnO1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoJy8nKTsgLy8gcGFydHNbMF0gLT4gaXAsIHBhcnRzWzFdIC0+IHN1Ym5ldFxuXG4gIGlmIChwYXJ0cy5sZW5ndGggIT09IDIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoIXN1Ym5ldE1heWJlLnRlc3QocGFydHNbMV0pKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IC8vIERpc2FsbG93IHByZWNlZGluZyAwIGkuZS4gMDEsIDAyLCAuLi5cblxuXG4gIGlmIChwYXJ0c1sxXS5sZW5ndGggPiAxICYmIHBhcnRzWzFdLnN0YXJ0c1dpdGgoJzAnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBpc1ZhbGlkSVAgPSAoMCwgX2lzSVAuZGVmYXVsdCkocGFydHNbMF0sIHZlcnNpb24pO1xuXG4gIGlmICghaXNWYWxpZElQKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IC8vIERlZmluZSB2YWxpZCBzdWJuZXQgYWNjb3JkaW5nIHRvIElQJ3MgdmVyc2lvblxuXG5cbiAgdmFyIGV4cGVjdGVkU3VibmV0ID0gbnVsbDtcblxuICBzd2l0Y2ggKFN0cmluZyh2ZXJzaW9uKSkge1xuICAgIGNhc2UgJzQnOlxuICAgICAgZXhwZWN0ZWRTdWJuZXQgPSB2NFN1Ym5ldDtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnNic6XG4gICAgICBleHBlY3RlZFN1Ym5ldCA9IHY2U3VibmV0O1xuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgZXhwZWN0ZWRTdWJuZXQgPSAoMCwgX2lzSVAuZGVmYXVsdCkocGFydHNbMF0sICc2JykgPyB2NlN1Ym5ldCA6IHY0U3VibmV0O1xuICB9XG5cbiAgcmV0dXJuIHBhcnRzWzFdIDw9IGV4cGVjdGVkU3VibmV0ICYmIHBhcnRzWzFdID49IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzSVNCTjtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIHBvc3NpYmxlSXNibjEwID0gL14oPzpbMC05XXs5fVh8WzAtOV17MTB9KSQvO1xudmFyIHBvc3NpYmxlSXNibjEzID0gL14oPzpbMC05XXsxM30pJC87XG52YXIgZmFjdG9yID0gWzEsIDNdO1xuXG5mdW5jdGlvbiBpc0lTQk4oaXNibiwgb3B0aW9ucykge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShpc2JuKTsgLy8gRm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5OlxuICAvLyBpc0lTQk4oc3RyIFssIHZlcnNpb25dKSwgaS5lLiBgb3B0aW9uc2AgY291bGQgYmUgdXNlZCBhcyBhcmd1bWVudCBmb3IgdGhlIGxlZ2FjeSBgdmVyc2lvbmBcblxuICB2YXIgdmVyc2lvbiA9IFN0cmluZygob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnZlcnNpb24pIHx8IG9wdGlvbnMpO1xuXG4gIGlmICghKG9wdGlvbnMgIT09IG51bGwgJiYgb3B0aW9ucyAhPT0gdm9pZCAwICYmIG9wdGlvbnMudmVyc2lvbiB8fCBvcHRpb25zKSkge1xuICAgIHJldHVybiBpc0lTQk4oaXNibiwge1xuICAgICAgdmVyc2lvbjogMTBcbiAgICB9KSB8fCBpc0lTQk4oaXNibiwge1xuICAgICAgdmVyc2lvbjogMTNcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBzYW5pdGl6ZWRJc2JuID0gaXNibi5yZXBsYWNlKC9bXFxzLV0rL2csICcnKTtcbiAgdmFyIGNoZWNrc3VtID0gMDtcblxuICBpZiAodmVyc2lvbiA9PT0gJzEwJykge1xuICAgIGlmICghcG9zc2libGVJc2JuMTAudGVzdChzYW5pdGl6ZWRJc2JuKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmVyc2lvbiAtIDE7IGkrKykge1xuICAgICAgY2hlY2tzdW0gKz0gKGkgKyAxKSAqIHNhbml0aXplZElzYm4uY2hhckF0KGkpO1xuICAgIH1cblxuICAgIGlmIChzYW5pdGl6ZWRJc2JuLmNoYXJBdCg5KSA9PT0gJ1gnKSB7XG4gICAgICBjaGVja3N1bSArPSAxMCAqIDEwO1xuICAgIH0gZWxzZSB7XG4gICAgICBjaGVja3N1bSArPSAxMCAqIHNhbml0aXplZElzYm4uY2hhckF0KDkpO1xuICAgIH1cblxuICAgIGlmIChjaGVja3N1bSAlIDExID09PSAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodmVyc2lvbiA9PT0gJzEzJykge1xuICAgIGlmICghcG9zc2libGVJc2JuMTMudGVzdChzYW5pdGl6ZWRJc2JuKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCAxMjsgX2krKykge1xuICAgICAgY2hlY2tzdW0gKz0gZmFjdG9yW19pICUgMl0gKiBzYW5pdGl6ZWRJc2JuLmNoYXJBdChfaSk7XG4gICAgfVxuXG4gICAgaWYgKHNhbml0aXplZElzYm4uY2hhckF0KDEyKSAtICgxMCAtIGNoZWNrc3VtICUgMTApICUgMTAgPT09IDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNJU0lOO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgaXNpbiA9IC9eW0EtWl17Mn1bMC05QS1aXXs5fVswLTldJC87IC8vIHRoaXMgbGluayBkZXRhaWxzIGhvdyB0aGUgY2hlY2sgZGlnaXQgaXMgY2FsY3VsYXRlZDpcbi8vIGh0dHBzOi8vd3d3LmlzaW4ub3JnL2lzaW4tZm9ybWF0Ly4gaXQgaXMgYSBsaXR0bGUgYml0XG4vLyBvZGQgaW4gdGhhdCBpdCB3b3JrcyB3aXRoIGRpZ2l0cywgbm90IG51bWJlcnMuIGluIG9yZGVyXG4vLyB0byBtYWtlIG9ubHkgb25lIHBhc3MgdGhyb3VnaCB0aGUgSVNJTiBjaGFyYWN0ZXJzLCB0aGVcbi8vIGVhY2ggYWxwaGEgY2hhcmFjdGVyIGlzIGhhbmRsZWQgYXMgMiBjaGFyYWN0ZXJzIHdpdGhpblxuLy8gdGhlIGxvb3AuXG5cbmZ1bmN0aW9uIGlzSVNJTihzdHIpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcblxuICBpZiAoIWlzaW4udGVzdChzdHIpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIGRvdWJsZSA9IHRydWU7XG4gIHZhciBzdW0gPSAwOyAvLyBjb252ZXJ0IHZhbHVlc1xuXG4gIGZvciAodmFyIGkgPSBzdHIubGVuZ3RoIC0gMjsgaSA+PSAwOyBpLS0pIHtcbiAgICBpZiAoc3RyW2ldID49ICdBJyAmJiBzdHJbaV0gPD0gJ1onKSB7XG4gICAgICB2YXIgdmFsdWUgPSBzdHJbaV0uY2hhckNvZGVBdCgwKSAtIDU1O1xuICAgICAgdmFyIGxvID0gdmFsdWUgJSAxMDtcbiAgICAgIHZhciBoaSA9IE1hdGgudHJ1bmModmFsdWUgLyAxMCk7IC8vIGxldHRlcnMgaGF2ZSB0d28gZGlnaXRzLCBzbyBoYW5kbGUgdGhlIGxvdyBvcmRlclxuICAgICAgLy8gYW5kIGhpZ2ggb3JkZXIgZGlnaXRzIHNlcGFyYXRlbHkuXG5cbiAgICAgIGZvciAodmFyIF9pID0gMCwgX2FyciA9IFtsbywgaGldOyBfaSA8IF9hcnIubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciBkaWdpdCA9IF9hcnJbX2ldO1xuXG4gICAgICAgIGlmIChkb3VibGUpIHtcbiAgICAgICAgICBpZiAoZGlnaXQgPj0gNSkge1xuICAgICAgICAgICAgc3VtICs9IDEgKyAoZGlnaXQgLSA1KSAqIDI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1bSArPSBkaWdpdCAqIDI7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1bSArPSBkaWdpdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvdWJsZSA9ICFkb3VibGU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBfZGlnaXQgPSBzdHJbaV0uY2hhckNvZGVBdCgwKSAtICcwJy5jaGFyQ29kZUF0KDApO1xuXG4gICAgICBpZiAoZG91YmxlKSB7XG4gICAgICAgIGlmIChfZGlnaXQgPj0gNSkge1xuICAgICAgICAgIHN1bSArPSAxICsgKF9kaWdpdCAtIDUpICogMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdW0gKz0gX2RpZ2l0ICogMjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3VtICs9IF9kaWdpdDtcbiAgICAgIH1cblxuICAgICAgZG91YmxlID0gIWRvdWJsZTtcbiAgICB9XG4gIH1cblxuICB2YXIgY2hlY2sgPSBNYXRoLnRydW5jKChzdW0gKyA5KSAvIDEwKSAqIDEwIC0gc3VtO1xuICByZXR1cm4gK3N0cltzdHIubGVuZ3RoIC0gMV0gPT09IGNoZWNrO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc0lTTzMxNjYxQWxwaGEyO1xuZXhwb3J0cy5Db3VudHJ5Q29kZXMgPSB2b2lkIDA7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8vIGZyb20gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPXzMxNjYtMV9hbHBoYS0yXG52YXIgdmFsaWRJU08zMTY2MUFscGhhMkNvdW50cmllc0NvZGVzID0gbmV3IFNldChbJ0FEJywgJ0FFJywgJ0FGJywgJ0FHJywgJ0FJJywgJ0FMJywgJ0FNJywgJ0FPJywgJ0FRJywgJ0FSJywgJ0FTJywgJ0FUJywgJ0FVJywgJ0FXJywgJ0FYJywgJ0FaJywgJ0JBJywgJ0JCJywgJ0JEJywgJ0JFJywgJ0JGJywgJ0JHJywgJ0JIJywgJ0JJJywgJ0JKJywgJ0JMJywgJ0JNJywgJ0JOJywgJ0JPJywgJ0JRJywgJ0JSJywgJ0JTJywgJ0JUJywgJ0JWJywgJ0JXJywgJ0JZJywgJ0JaJywgJ0NBJywgJ0NDJywgJ0NEJywgJ0NGJywgJ0NHJywgJ0NIJywgJ0NJJywgJ0NLJywgJ0NMJywgJ0NNJywgJ0NOJywgJ0NPJywgJ0NSJywgJ0NVJywgJ0NWJywgJ0NXJywgJ0NYJywgJ0NZJywgJ0NaJywgJ0RFJywgJ0RKJywgJ0RLJywgJ0RNJywgJ0RPJywgJ0RaJywgJ0VDJywgJ0VFJywgJ0VHJywgJ0VIJywgJ0VSJywgJ0VTJywgJ0VUJywgJ0ZJJywgJ0ZKJywgJ0ZLJywgJ0ZNJywgJ0ZPJywgJ0ZSJywgJ0dBJywgJ0dCJywgJ0dEJywgJ0dFJywgJ0dGJywgJ0dHJywgJ0dIJywgJ0dJJywgJ0dMJywgJ0dNJywgJ0dOJywgJ0dQJywgJ0dRJywgJ0dSJywgJ0dTJywgJ0dUJywgJ0dVJywgJ0dXJywgJ0dZJywgJ0hLJywgJ0hNJywgJ0hOJywgJ0hSJywgJ0hUJywgJ0hVJywgJ0lEJywgJ0lFJywgJ0lMJywgJ0lNJywgJ0lOJywgJ0lPJywgJ0lRJywgJ0lSJywgJ0lTJywgJ0lUJywgJ0pFJywgJ0pNJywgJ0pPJywgJ0pQJywgJ0tFJywgJ0tHJywgJ0tIJywgJ0tJJywgJ0tNJywgJ0tOJywgJ0tQJywgJ0tSJywgJ0tXJywgJ0tZJywgJ0taJywgJ0xBJywgJ0xCJywgJ0xDJywgJ0xJJywgJ0xLJywgJ0xSJywgJ0xTJywgJ0xUJywgJ0xVJywgJ0xWJywgJ0xZJywgJ01BJywgJ01DJywgJ01EJywgJ01FJywgJ01GJywgJ01HJywgJ01IJywgJ01LJywgJ01MJywgJ01NJywgJ01OJywgJ01PJywgJ01QJywgJ01RJywgJ01SJywgJ01TJywgJ01UJywgJ01VJywgJ01WJywgJ01XJywgJ01YJywgJ01ZJywgJ01aJywgJ05BJywgJ05DJywgJ05FJywgJ05GJywgJ05HJywgJ05JJywgJ05MJywgJ05PJywgJ05QJywgJ05SJywgJ05VJywgJ05aJywgJ09NJywgJ1BBJywgJ1BFJywgJ1BGJywgJ1BHJywgJ1BIJywgJ1BLJywgJ1BMJywgJ1BNJywgJ1BOJywgJ1BSJywgJ1BTJywgJ1BUJywgJ1BXJywgJ1BZJywgJ1FBJywgJ1JFJywgJ1JPJywgJ1JTJywgJ1JVJywgJ1JXJywgJ1NBJywgJ1NCJywgJ1NDJywgJ1NEJywgJ1NFJywgJ1NHJywgJ1NIJywgJ1NJJywgJ1NKJywgJ1NLJywgJ1NMJywgJ1NNJywgJ1NOJywgJ1NPJywgJ1NSJywgJ1NTJywgJ1NUJywgJ1NWJywgJ1NYJywgJ1NZJywgJ1NaJywgJ1RDJywgJ1REJywgJ1RGJywgJ1RHJywgJ1RIJywgJ1RKJywgJ1RLJywgJ1RMJywgJ1RNJywgJ1ROJywgJ1RPJywgJ1RSJywgJ1RUJywgJ1RWJywgJ1RXJywgJ1RaJywgJ1VBJywgJ1VHJywgJ1VNJywgJ1VTJywgJ1VZJywgJ1VaJywgJ1ZBJywgJ1ZDJywgJ1ZFJywgJ1ZHJywgJ1ZJJywgJ1ZOJywgJ1ZVJywgJ1dGJywgJ1dTJywgJ1lFJywgJ1lUJywgJ1pBJywgJ1pNJywgJ1pXJ10pO1xuXG5mdW5jdGlvbiBpc0lTTzMxNjYxQWxwaGEyKHN0cikge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICByZXR1cm4gdmFsaWRJU08zMTY2MUFscGhhMkNvdW50cmllc0NvZGVzLmhhcyhzdHIudG9VcHBlckNhc2UoKSk7XG59XG5cbnZhciBDb3VudHJ5Q29kZXMgPSB2YWxpZElTTzMxNjYxQWxwaGEyQ291bnRyaWVzQ29kZXM7XG5leHBvcnRzLkNvdW50cnlDb2RlcyA9IENvdW50cnlDb2RlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzSVNPMzE2NjFBbHBoYTM7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8vIGZyb20gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPXzMxNjYtMV9hbHBoYS0zXG52YXIgdmFsaWRJU08zMTY2MUFscGhhM0NvdW50cmllc0NvZGVzID0gbmV3IFNldChbJ0FGRycsICdBTEEnLCAnQUxCJywgJ0RaQScsICdBU00nLCAnQU5EJywgJ0FHTycsICdBSUEnLCAnQVRBJywgJ0FURycsICdBUkcnLCAnQVJNJywgJ0FCVycsICdBVVMnLCAnQVVUJywgJ0FaRScsICdCSFMnLCAnQkhSJywgJ0JHRCcsICdCUkInLCAnQkxSJywgJ0JFTCcsICdCTFonLCAnQkVOJywgJ0JNVScsICdCVE4nLCAnQk9MJywgJ0JFUycsICdCSUgnLCAnQldBJywgJ0JWVCcsICdCUkEnLCAnSU9UJywgJ0JSTicsICdCR1InLCAnQkZBJywgJ0JESScsICdLSE0nLCAnQ01SJywgJ0NBTicsICdDUFYnLCAnQ1lNJywgJ0NBRicsICdUQ0QnLCAnQ0hMJywgJ0NITicsICdDWFInLCAnQ0NLJywgJ0NPTCcsICdDT00nLCAnQ09HJywgJ0NPRCcsICdDT0snLCAnQ1JJJywgJ0NJVicsICdIUlYnLCAnQ1VCJywgJ0NVVycsICdDWVAnLCAnQ1pFJywgJ0ROSycsICdESkknLCAnRE1BJywgJ0RPTScsICdFQ1UnLCAnRUdZJywgJ1NMVicsICdHTlEnLCAnRVJJJywgJ0VTVCcsICdFVEgnLCAnRkxLJywgJ0ZSTycsICdGSkknLCAnRklOJywgJ0ZSQScsICdHVUYnLCAnUFlGJywgJ0FURicsICdHQUInLCAnR01CJywgJ0dFTycsICdERVUnLCAnR0hBJywgJ0dJQicsICdHUkMnLCAnR1JMJywgJ0dSRCcsICdHTFAnLCAnR1VNJywgJ0dUTScsICdHR1knLCAnR0lOJywgJ0dOQicsICdHVVknLCAnSFRJJywgJ0hNRCcsICdWQVQnLCAnSE5EJywgJ0hLRycsICdIVU4nLCAnSVNMJywgJ0lORCcsICdJRE4nLCAnSVJOJywgJ0lSUScsICdJUkwnLCAnSU1OJywgJ0lTUicsICdJVEEnLCAnSkFNJywgJ0pQTicsICdKRVknLCAnSk9SJywgJ0tBWicsICdLRU4nLCAnS0lSJywgJ1BSSycsICdLT1InLCAnS1dUJywgJ0tHWicsICdMQU8nLCAnTFZBJywgJ0xCTicsICdMU08nLCAnTEJSJywgJ0xCWScsICdMSUUnLCAnTFRVJywgJ0xVWCcsICdNQUMnLCAnTUtEJywgJ01ERycsICdNV0knLCAnTVlTJywgJ01EVicsICdNTEknLCAnTUxUJywgJ01ITCcsICdNVFEnLCAnTVJUJywgJ01VUycsICdNWVQnLCAnTUVYJywgJ0ZTTScsICdNREEnLCAnTUNPJywgJ01ORycsICdNTkUnLCAnTVNSJywgJ01BUicsICdNT1onLCAnTU1SJywgJ05BTScsICdOUlUnLCAnTlBMJywgJ05MRCcsICdOQ0wnLCAnTlpMJywgJ05JQycsICdORVInLCAnTkdBJywgJ05JVScsICdORksnLCAnTU5QJywgJ05PUicsICdPTU4nLCAnUEFLJywgJ1BMVycsICdQU0UnLCAnUEFOJywgJ1BORycsICdQUlknLCAnUEVSJywgJ1BITCcsICdQQ04nLCAnUE9MJywgJ1BSVCcsICdQUkknLCAnUUFUJywgJ1JFVScsICdST1UnLCAnUlVTJywgJ1JXQScsICdCTE0nLCAnU0hOJywgJ0tOQScsICdMQ0EnLCAnTUFGJywgJ1NQTScsICdWQ1QnLCAnV1NNJywgJ1NNUicsICdTVFAnLCAnU0FVJywgJ1NFTicsICdTUkInLCAnU1lDJywgJ1NMRScsICdTR1AnLCAnU1hNJywgJ1NWSycsICdTVk4nLCAnU0xCJywgJ1NPTScsICdaQUYnLCAnU0dTJywgJ1NTRCcsICdFU1AnLCAnTEtBJywgJ1NETicsICdTVVInLCAnU0pNJywgJ1NXWicsICdTV0UnLCAnQ0hFJywgJ1NZUicsICdUV04nLCAnVEpLJywgJ1RaQScsICdUSEEnLCAnVExTJywgJ1RHTycsICdUS0wnLCAnVE9OJywgJ1RUTycsICdUVU4nLCAnVFVSJywgJ1RLTScsICdUQ0EnLCAnVFVWJywgJ1VHQScsICdVS1InLCAnQVJFJywgJ0dCUicsICdVU0EnLCAnVU1JJywgJ1VSWScsICdVWkInLCAnVlVUJywgJ1ZFTicsICdWTk0nLCAnVkdCJywgJ1ZJUicsICdXTEYnLCAnRVNIJywgJ1lFTScsICdaTUInLCAnWldFJ10pO1xuXG5mdW5jdGlvbiBpc0lTTzMxNjYxQWxwaGEzKHN0cikge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICByZXR1cm4gdmFsaWRJU08zMTY2MUFscGhhM0NvdW50cmllc0NvZGVzLmhhcyhzdHIudG9VcHBlckNhc2UoKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzSVNPNDIxNztcbmV4cG9ydHMuQ3VycmVuY3lDb2RlcyA9IHZvaWQgMDtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLy8gZnJvbSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fNDIxN1xudmFyIHZhbGlkSVNPNDIxN0N1cnJlbmN5Q29kZXMgPSBuZXcgU2V0KFsnQUVEJywgJ0FGTicsICdBTEwnLCAnQU1EJywgJ0FORycsICdBT0EnLCAnQVJTJywgJ0FVRCcsICdBV0cnLCAnQVpOJywgJ0JBTScsICdCQkQnLCAnQkRUJywgJ0JHTicsICdCSEQnLCAnQklGJywgJ0JNRCcsICdCTkQnLCAnQk9CJywgJ0JPVicsICdCUkwnLCAnQlNEJywgJ0JUTicsICdCV1AnLCAnQllOJywgJ0JaRCcsICdDQUQnLCAnQ0RGJywgJ0NIRScsICdDSEYnLCAnQ0hXJywgJ0NMRicsICdDTFAnLCAnQ05ZJywgJ0NPUCcsICdDT1UnLCAnQ1JDJywgJ0NVQycsICdDVVAnLCAnQ1ZFJywgJ0NaSycsICdESkYnLCAnREtLJywgJ0RPUCcsICdEWkQnLCAnRUdQJywgJ0VSTicsICdFVEInLCAnRVVSJywgJ0ZKRCcsICdGS1AnLCAnR0JQJywgJ0dFTCcsICdHSFMnLCAnR0lQJywgJ0dNRCcsICdHTkYnLCAnR1RRJywgJ0dZRCcsICdIS0QnLCAnSE5MJywgJ0hSSycsICdIVEcnLCAnSFVGJywgJ0lEUicsICdJTFMnLCAnSU5SJywgJ0lRRCcsICdJUlInLCAnSVNLJywgJ0pNRCcsICdKT0QnLCAnSlBZJywgJ0tFUycsICdLR1MnLCAnS0hSJywgJ0tNRicsICdLUFcnLCAnS1JXJywgJ0tXRCcsICdLWUQnLCAnS1pUJywgJ0xBSycsICdMQlAnLCAnTEtSJywgJ0xSRCcsICdMU0wnLCAnTFlEJywgJ01BRCcsICdNREwnLCAnTUdBJywgJ01LRCcsICdNTUsnLCAnTU5UJywgJ01PUCcsICdNUlUnLCAnTVVSJywgJ01WUicsICdNV0snLCAnTVhOJywgJ01YVicsICdNWVInLCAnTVpOJywgJ05BRCcsICdOR04nLCAnTklPJywgJ05PSycsICdOUFInLCAnTlpEJywgJ09NUicsICdQQUInLCAnUEVOJywgJ1BHSycsICdQSFAnLCAnUEtSJywgJ1BMTicsICdQWUcnLCAnUUFSJywgJ1JPTicsICdSU0QnLCAnUlVCJywgJ1JXRicsICdTQVInLCAnU0JEJywgJ1NDUicsICdTREcnLCAnU0VLJywgJ1NHRCcsICdTSFAnLCAnU0xMJywgJ1NPUycsICdTUkQnLCAnU1NQJywgJ1NUTicsICdTVkMnLCAnU1lQJywgJ1NaTCcsICdUSEInLCAnVEpTJywgJ1RNVCcsICdUTkQnLCAnVE9QJywgJ1RSWScsICdUVEQnLCAnVFdEJywgJ1RaUycsICdVQUgnLCAnVUdYJywgJ1VTRCcsICdVU04nLCAnVVlJJywgJ1VZVScsICdVWVcnLCAnVVpTJywgJ1ZFUycsICdWTkQnLCAnVlVWJywgJ1dTVCcsICdYQUYnLCAnWEFHJywgJ1hBVScsICdYQkEnLCAnWEJCJywgJ1hCQycsICdYQkQnLCAnWENEJywgJ1hEUicsICdYT0YnLCAnWFBEJywgJ1hQRicsICdYUFQnLCAnWFNVJywgJ1hUUycsICdYVUEnLCAnWFhYJywgJ1lFUicsICdaQVInLCAnWk1XJywgJ1pXTCddKTtcblxuZnVuY3Rpb24gaXNJU080MjE3KHN0cikge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICByZXR1cm4gdmFsaWRJU080MjE3Q3VycmVuY3lDb2Rlcy5oYXMoc3RyLnRvVXBwZXJDYXNlKCkpO1xufVxuXG52YXIgQ3VycmVuY3lDb2RlcyA9IHZhbGlkSVNPNDIxN0N1cnJlbmN5Q29kZXM7XG5leHBvcnRzLkN1cnJlbmN5Q29kZXMgPSBDdXJyZW5jeUNvZGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNJU082MzkxO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgaXNJU082MzkxU2V0ID0gbmV3IFNldChbJ2FhJywgJ2FiJywgJ2FlJywgJ2FmJywgJ2FrJywgJ2FtJywgJ2FuJywgJ2FyJywgJ2FzJywgJ2F2JywgJ2F5JywgJ2F6JywgJ2F6JywgJ2JhJywgJ2JlJywgJ2JnJywgJ2JoJywgJ2JpJywgJ2JtJywgJ2JuJywgJ2JvJywgJ2JyJywgJ2JzJywgJ2NhJywgJ2NlJywgJ2NoJywgJ2NvJywgJ2NyJywgJ2NzJywgJ2N1JywgJ2N2JywgJ2N5JywgJ2RhJywgJ2RlJywgJ2R2JywgJ2R6JywgJ2VlJywgJ2VsJywgJ2VuJywgJ2VvJywgJ2VzJywgJ2V0JywgJ2V1JywgJ2ZhJywgJ2ZmJywgJ2ZpJywgJ2ZqJywgJ2ZvJywgJ2ZyJywgJ2Z5JywgJ2dhJywgJ2dkJywgJ2dsJywgJ2duJywgJ2d1JywgJ2d2JywgJ2hhJywgJ2hlJywgJ2hpJywgJ2hvJywgJ2hyJywgJ2h0JywgJ2h1JywgJ2h5JywgJ2h6JywgJ2lhJywgJ2lkJywgJ2llJywgJ2lnJywgJ2lpJywgJ2lrJywgJ2lvJywgJ2lzJywgJ2l0JywgJ2l1JywgJ2phJywgJ2p2JywgJ2thJywgJ2tnJywgJ2tpJywgJ2tqJywgJ2trJywgJ2tsJywgJ2ttJywgJ2tuJywgJ2tvJywgJ2tyJywgJ2tzJywgJ2t1JywgJ2t2JywgJ2t3JywgJ2t5JywgJ2xhJywgJ2xiJywgJ2xnJywgJ2xpJywgJ2xuJywgJ2xvJywgJ2x0JywgJ2x1JywgJ2x2JywgJ21nJywgJ21oJywgJ21pJywgJ21rJywgJ21sJywgJ21uJywgJ21yJywgJ21zJywgJ210JywgJ215JywgJ25hJywgJ25iJywgJ25kJywgJ25lJywgJ25nJywgJ25sJywgJ25uJywgJ25vJywgJ25yJywgJ252JywgJ255JywgJ29jJywgJ29qJywgJ29tJywgJ29yJywgJ29zJywgJ3BhJywgJ3BpJywgJ3BsJywgJ3BzJywgJ3B0JywgJ3F1JywgJ3JtJywgJ3JuJywgJ3JvJywgJ3J1JywgJ3J3JywgJ3NhJywgJ3NjJywgJ3NkJywgJ3NlJywgJ3NnJywgJ3NpJywgJ3NrJywgJ3NsJywgJ3NtJywgJ3NuJywgJ3NvJywgJ3NxJywgJ3NyJywgJ3NzJywgJ3N0JywgJ3N1JywgJ3N2JywgJ3N3JywgJ3RhJywgJ3RlJywgJ3RnJywgJ3RoJywgJ3RpJywgJ3RrJywgJ3RsJywgJ3RuJywgJ3RvJywgJ3RyJywgJ3RzJywgJ3R0JywgJ3R3JywgJ3R5JywgJ3VnJywgJ3VrJywgJ3VyJywgJ3V6JywgJ3ZlJywgJ3ZpJywgJ3ZvJywgJ3dhJywgJ3dvJywgJ3hoJywgJ3lpJywgJ3lvJywgJ3phJywgJ3poJywgJ3p1J10pO1xuXG5mdW5jdGlvbiBpc0lTTzYzOTEoc3RyKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIHJldHVybiBpc0lTTzYzOTFTZXQuaGFzKHN0cik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzSVNPODYwMTtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuLy8gZnJvbSBodHRwOi8vZ29vLmdsLzBlakhIV1xudmFyIGlzbzg2MDEgPSAvXihbXFwrLV0/XFxkezR9KD8hXFxkezJ9XFxiKSkoKC0/KSgoMFsxLTldfDFbMC0yXSkoXFwzKFsxMl1cXGR8MFsxLTldfDNbMDFdKSk/fFcoWzAtNF1cXGR8NVswLTNdKSgtP1sxLTddKT98KDAwWzEtOV18MFsxLTldXFxkfFsxMl1cXGR7Mn18MyhbMC01XVxcZHw2WzEtNl0pKSkoW1RcXHNdKCgoWzAxXVxcZHwyWzAtM10pKCg6PylbMC01XVxcZCk/fDI0Oj8wMCkoW1xcLixdXFxkKyg/ITopKT8pPyhcXDE3WzAtNV1cXGQoW1xcLixdXFxkKyk/KT8oW3paXXwoW1xcKy1dKShbMDFdXFxkfDJbMC0zXSk6PyhbMC01XVxcZCk/KT8pPyk/JC87IC8vIHNhbWUgYXMgYWJvdmUsIGV4Y2VwdCB3aXRoIGEgc3RyaWN0ICdUJyBzZXBhcmF0b3IgYmV0d2VlbiBkYXRlIGFuZCB0aW1lXG5cbnZhciBpc284NjAxU3RyaWN0U2VwYXJhdG9yID0gL14oW1xcKy1dP1xcZHs0fSg/IVxcZHsyfVxcYikpKCgtPykoKDBbMS05XXwxWzAtMl0pKFxcMyhbMTJdXFxkfDBbMS05XXwzWzAxXSkpP3xXKFswLTRdXFxkfDVbMC0zXSkoLT9bMS03XSk/fCgwMFsxLTldfDBbMS05XVxcZHxbMTJdXFxkezJ9fDMoWzAtNV1cXGR8NlsxLTZdKSkpKFtUXSgoKFswMV1cXGR8MlswLTNdKSgoOj8pWzAtNV1cXGQpP3wyNDo/MDApKFtcXC4sXVxcZCsoPyE6KSk/KT8oXFwxN1swLTVdXFxkKFtcXC4sXVxcZCspPyk/KFt6Wl18KFtcXCstXSkoWzAxXVxcZHwyWzAtM10pOj8oWzAtNV1cXGQpPyk/KT8pPyQvO1xuLyogZXNsaW50LWVuYWJsZSBtYXgtbGVuICovXG5cbnZhciBpc1ZhbGlkRGF0ZSA9IGZ1bmN0aW9uIGlzVmFsaWREYXRlKHN0cikge1xuICAvLyBzdHIgbXVzdCBoYXZlIHBhc3NlZCB0aGUgSVNPODYwMSBjaGVja1xuICAvLyB0aGlzIGNoZWNrIGlzIG1lYW50IHRvIGNhdGNoIGludmFsaWQgZGF0ZXNcbiAgLy8gbGlrZSAyMDA5LTAyLTMxXG4gIC8vIGZpcnN0IGNoZWNrIGZvciBvcmRpbmFsIGRhdGVzXG4gIHZhciBvcmRpbmFsTWF0Y2ggPSBzdHIubWF0Y2goL14oXFxkezR9KS0/KFxcZHszfSkoWyBUXXsxfVxcLip8JCkvKTtcblxuICBpZiAob3JkaW5hbE1hdGNoKSB7XG4gICAgdmFyIG9ZZWFyID0gTnVtYmVyKG9yZGluYWxNYXRjaFsxXSk7XG4gICAgdmFyIG9EYXkgPSBOdW1iZXIob3JkaW5hbE1hdGNoWzJdKTsgLy8gaWYgaXMgbGVhcCB5ZWFyXG5cbiAgICBpZiAob1llYXIgJSA0ID09PSAwICYmIG9ZZWFyICUgMTAwICE9PSAwIHx8IG9ZZWFyICUgNDAwID09PSAwKSByZXR1cm4gb0RheSA8PSAzNjY7XG4gICAgcmV0dXJuIG9EYXkgPD0gMzY1O1xuICB9XG5cbiAgdmFyIG1hdGNoID0gc3RyLm1hdGNoKC8oXFxkezR9KS0/KFxcZHswLDJ9KS0/KFxcZCopLykubWFwKE51bWJlcik7XG4gIHZhciB5ZWFyID0gbWF0Y2hbMV07XG4gIHZhciBtb250aCA9IG1hdGNoWzJdO1xuICB2YXIgZGF5ID0gbWF0Y2hbM107XG4gIHZhciBtb250aFN0cmluZyA9IG1vbnRoID8gXCIwXCIuY29uY2F0KG1vbnRoKS5zbGljZSgtMikgOiBtb250aDtcbiAgdmFyIGRheVN0cmluZyA9IGRheSA/IFwiMFwiLmNvbmNhdChkYXkpLnNsaWNlKC0yKSA6IGRheTsgLy8gY3JlYXRlIGEgZGF0ZSBvYmplY3QgYW5kIGNvbXBhcmVcblxuICB2YXIgZCA9IG5ldyBEYXRlKFwiXCIuY29uY2F0KHllYXIsIFwiLVwiKS5jb25jYXQobW9udGhTdHJpbmcgfHwgJzAxJywgXCItXCIpLmNvbmNhdChkYXlTdHJpbmcgfHwgJzAxJykpO1xuXG4gIGlmIChtb250aCAmJiBkYXkpIHtcbiAgICByZXR1cm4gZC5nZXRVVENGdWxsWWVhcigpID09PSB5ZWFyICYmIGQuZ2V0VVRDTW9udGgoKSArIDEgPT09IG1vbnRoICYmIGQuZ2V0VVRDRGF0ZSgpID09PSBkYXk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIGlzSVNPODYwMShzdHIpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICB2YXIgY2hlY2sgPSBvcHRpb25zLnN0cmljdFNlcGFyYXRvciA/IGlzbzg2MDFTdHJpY3RTZXBhcmF0b3IudGVzdChzdHIpIDogaXNvODYwMS50ZXN0KHN0cik7XG4gIGlmIChjaGVjayAmJiBvcHRpb25zLnN0cmljdCkgcmV0dXJuIGlzVmFsaWREYXRlKHN0cik7XG4gIHJldHVybiBjaGVjaztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNJU1JDO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vLyBzZWUgaHR0cDovL2lzcmMuaWZwaS5vcmcvZW4vaXNyYy1zdGFuZGFyZC9jb2RlLXN5bnRheFxudmFyIGlzcmMgPSAvXltBLVpdezJ9WzAtOUEtWl17M31cXGR7Mn1cXGR7NX0kLztcblxuZnVuY3Rpb24gaXNJU1JDKHN0cikge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICByZXR1cm4gaXNyYy50ZXN0KHN0cik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzSVNTTjtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGlzc24gPSAnXlxcXFxkezR9LT9cXFxcZHszfVtcXFxcZFhdJCc7XG5cbmZ1bmN0aW9uIGlzSVNTTihzdHIpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICB2YXIgdGVzdElzc24gPSBpc3NuO1xuICB0ZXN0SXNzbiA9IG9wdGlvbnMucmVxdWlyZV9oeXBoZW4gPyB0ZXN0SXNzbi5yZXBsYWNlKCc/JywgJycpIDogdGVzdElzc247XG4gIHRlc3RJc3NuID0gb3B0aW9ucy5jYXNlX3NlbnNpdGl2ZSA/IG5ldyBSZWdFeHAodGVzdElzc24pIDogbmV3IFJlZ0V4cCh0ZXN0SXNzbiwgJ2knKTtcblxuICBpZiAoIXRlc3RJc3NuLnRlc3Qoc3RyKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBkaWdpdHMgPSBzdHIucmVwbGFjZSgnLScsICcnKS50b1VwcGVyQ2FzZSgpO1xuICB2YXIgY2hlY2tzdW0gPSAwO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZGlnaXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRpZ2l0ID0gZGlnaXRzW2ldO1xuICAgIGNoZWNrc3VtICs9IChkaWdpdCA9PT0gJ1gnID8gMTAgOiArZGlnaXQpICogKDggLSBpKTtcbiAgfVxuXG4gIHJldHVybiBjaGVja3N1bSAlIDExID09PSAwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc0lkZW50aXR5Q2FyZDtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxudmFyIF9pc0ludCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vaXNJbnRcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgdmFsaWRhdG9ycyA9IHtcbiAgUEw6IGZ1bmN0aW9uIFBMKHN0cikge1xuICAgICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gICAgdmFyIHdlaWdodE9mRGlnaXRzID0ge1xuICAgICAgMTogMSxcbiAgICAgIDI6IDMsXG4gICAgICAzOiA3LFxuICAgICAgNDogOSxcbiAgICAgIDU6IDEsXG4gICAgICA2OiAzLFxuICAgICAgNzogNyxcbiAgICAgIDg6IDksXG4gICAgICA5OiAxLFxuICAgICAgMTA6IDMsXG4gICAgICAxMTogMFxuICAgIH07XG5cbiAgICBpZiAoc3RyICE9IG51bGwgJiYgc3RyLmxlbmd0aCA9PT0gMTEgJiYgKDAsIF9pc0ludC5kZWZhdWx0KShzdHIsIHtcbiAgICAgIGFsbG93X2xlYWRpbmdfemVyb2VzOiB0cnVlXG4gICAgfSkpIHtcbiAgICAgIHZhciBkaWdpdHMgPSBzdHIuc3BsaXQoJycpLnNsaWNlKDAsIC0xKTtcbiAgICAgIHZhciBzdW0gPSBkaWdpdHMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGRpZ2l0LCBpbmRleCkge1xuICAgICAgICByZXR1cm4gYWNjICsgTnVtYmVyKGRpZ2l0KSAqIHdlaWdodE9mRGlnaXRzW2luZGV4ICsgMV07XG4gICAgICB9LCAwKTtcbiAgICAgIHZhciBtb2R1bG8gPSBzdW0gJSAxMDtcbiAgICAgIHZhciBsYXN0RGlnaXQgPSBOdW1iZXIoc3RyLmNoYXJBdChzdHIubGVuZ3RoIC0gMSkpO1xuXG4gICAgICBpZiAobW9kdWxvID09PSAwICYmIGxhc3REaWdpdCA9PT0gMCB8fCBsYXN0RGlnaXQgPT09IDEwIC0gbW9kdWxvKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcbiAgRVM6IGZ1bmN0aW9uIEVTKHN0cikge1xuICAgICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gICAgdmFyIEROSSA9IC9eWzAtOVgtWl1bMC05XXs3fVtUUldBR01ZRlBEWEJOSlpTUVZITENLRV0kLztcbiAgICB2YXIgY2hhcnNWYWx1ZSA9IHtcbiAgICAgIFg6IDAsXG4gICAgICBZOiAxLFxuICAgICAgWjogMlxuICAgIH07XG4gICAgdmFyIGNvbnRyb2xEaWdpdHMgPSBbJ1QnLCAnUicsICdXJywgJ0EnLCAnRycsICdNJywgJ1knLCAnRicsICdQJywgJ0QnLCAnWCcsICdCJywgJ04nLCAnSicsICdaJywgJ1MnLCAnUScsICdWJywgJ0gnLCAnTCcsICdDJywgJ0snLCAnRSddOyAvLyBzYW5pdGl6ZSB1c2VyIGlucHV0XG5cbiAgICB2YXIgc2FuaXRpemVkID0gc3RyLnRyaW0oKS50b1VwcGVyQ2FzZSgpOyAvLyB2YWxpZGF0ZSB0aGUgZGF0YSBzdHJ1Y3R1cmVcblxuICAgIGlmICghRE5JLnRlc3Qoc2FuaXRpemVkKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gLy8gdmFsaWRhdGUgdGhlIGNvbnRyb2wgZGlnaXRcblxuXG4gICAgdmFyIG51bWJlciA9IHNhbml0aXplZC5zbGljZSgwLCAtMSkucmVwbGFjZSgvW1gsWSxaXS9nLCBmdW5jdGlvbiAoY2hhcikge1xuICAgICAgcmV0dXJuIGNoYXJzVmFsdWVbY2hhcl07XG4gICAgfSk7XG4gICAgcmV0dXJuIHNhbml0aXplZC5lbmRzV2l0aChjb250cm9sRGlnaXRzW251bWJlciAlIDIzXSk7XG4gIH0sXG4gIEZJOiBmdW5jdGlvbiBGSShzdHIpIHtcbiAgICAvLyBodHRwczovL2R2di5maS9lbi9wZXJzb25hbC1pZGVudGl0eS1jb2RlIzp+OnRleHQ9Y29udHJvbCUyMGNoYXJhY3RlciUyMGZvciUyMGEtLHBlcnNvbmFsLC1pZGVudGl0eSUyMGNvZGUlMjBjYWxjdWxhdGVkXG4gICAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcblxuICAgIGlmIChzdHIubGVuZ3RoICE9PSAxMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICghc3RyLm1hdGNoKC9eXFxkezZ9W1xcLUFcXCtdXFxkezN9WzAtOUFCQ0RFRkhKS0xNTlBSU1RVVldYWV17MX0kLykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgY2hlY2tEaWdpdHMgPSAnMDEyMzQ1Njc4OUFCQ0RFRkhKS0xNTlBSU1RVVldYWSc7XG4gICAgdmFyIGlkQXNOdW1iZXIgPSBwYXJzZUludChzdHIuc2xpY2UoMCwgNiksIDEwKSAqIDEwMDAgKyBwYXJzZUludChzdHIuc2xpY2UoNywgMTApLCAxMCk7XG4gICAgdmFyIHJlbWFpbmRlciA9IGlkQXNOdW1iZXIgJSAzMTtcbiAgICB2YXIgY2hlY2tEaWdpdCA9IGNoZWNrRGlnaXRzW3JlbWFpbmRlcl07XG4gICAgcmV0dXJuIGNoZWNrRGlnaXQgPT09IHN0ci5zbGljZSgxMCwgMTEpO1xuICB9LFxuICBJTjogZnVuY3Rpb24gSU4oc3RyKSB7XG4gICAgdmFyIEROSSA9IC9eWzEtOV1cXGR7M31cXHM/XFxkezR9XFxzP1xcZHs0fSQvOyAvLyBtdWx0aXBsaWNhdGlvbiB0YWJsZVxuXG4gICAgdmFyIGQgPSBbWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDldLCBbMSwgMiwgMywgNCwgMCwgNiwgNywgOCwgOSwgNV0sIFsyLCAzLCA0LCAwLCAxLCA3LCA4LCA5LCA1LCA2XSwgWzMsIDQsIDAsIDEsIDIsIDgsIDksIDUsIDYsIDddLCBbNCwgMCwgMSwgMiwgMywgOSwgNSwgNiwgNywgOF0sIFs1LCA5LCA4LCA3LCA2LCAwLCA0LCAzLCAyLCAxXSwgWzYsIDUsIDksIDgsIDcsIDEsIDAsIDQsIDMsIDJdLCBbNywgNiwgNSwgOSwgOCwgMiwgMSwgMCwgNCwgM10sIFs4LCA3LCA2LCA1LCA5LCAzLCAyLCAxLCAwLCA0XSwgWzksIDgsIDcsIDYsIDUsIDQsIDMsIDIsIDEsIDBdXTsgLy8gcGVybXV0YXRpb24gdGFibGVcblxuICAgIHZhciBwID0gW1swLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5XSwgWzEsIDUsIDcsIDYsIDIsIDgsIDMsIDAsIDksIDRdLCBbNSwgOCwgMCwgMywgNywgOSwgNiwgMSwgNCwgMl0sIFs4LCA5LCAxLCA2LCAwLCA0LCAzLCA1LCAyLCA3XSwgWzksIDQsIDUsIDMsIDEsIDIsIDYsIDgsIDcsIDBdLCBbNCwgMiwgOCwgNiwgNSwgNywgMywgOSwgMCwgMV0sIFsyLCA3LCA5LCAzLCA4LCAwLCA2LCA0LCAxLCA1XSwgWzcsIDAsIDQsIDYsIDksIDEsIDMsIDIsIDUsIDhdXTsgLy8gc2FuaXRpemUgdXNlciBpbnB1dFxuXG4gICAgdmFyIHNhbml0aXplZCA9IHN0ci50cmltKCk7IC8vIHZhbGlkYXRlIHRoZSBkYXRhIHN0cnVjdHVyZVxuXG4gICAgaWYgKCFETkkudGVzdChzYW5pdGl6ZWQpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGMgPSAwO1xuICAgIHZhciBpbnZlcnRlZEFycmF5ID0gc2FuaXRpemVkLnJlcGxhY2UoL1xccy9nLCAnJykuc3BsaXQoJycpLm1hcChOdW1iZXIpLnJldmVyc2UoKTtcbiAgICBpbnZlcnRlZEFycmF5LmZvckVhY2goZnVuY3Rpb24gKHZhbCwgaSkge1xuICAgICAgYyA9IGRbY11bcFtpICUgOF1bdmFsXV07XG4gICAgfSk7XG4gICAgcmV0dXJuIGMgPT09IDA7XG4gIH0sXG4gIElSOiBmdW5jdGlvbiBJUihzdHIpIHtcbiAgICBpZiAoIXN0ci5tYXRjaCgvXlxcZHsxMH0kLykpIHJldHVybiBmYWxzZTtcbiAgICBzdHIgPSBcIjAwMDBcIi5jb25jYXQoc3RyKS5zbGljZShzdHIubGVuZ3RoIC0gNik7XG4gICAgaWYgKHBhcnNlSW50KHN0ci5zbGljZSgzLCA5KSwgMTApID09PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgdmFyIGxhc3ROdW1iZXIgPSBwYXJzZUludChzdHIuc2xpY2UoOSwgMTApLCAxMCk7XG4gICAgdmFyIHN1bSA9IDA7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDk7IGkrKykge1xuICAgICAgc3VtICs9IHBhcnNlSW50KHN0ci5zbGljZShpLCBpICsgMSksIDEwKSAqICgxMCAtIGkpO1xuICAgIH1cblxuICAgIHN1bSAlPSAxMTtcbiAgICByZXR1cm4gc3VtIDwgMiAmJiBsYXN0TnVtYmVyID09PSBzdW0gfHwgc3VtID49IDIgJiYgbGFzdE51bWJlciA9PT0gMTEgLSBzdW07XG4gIH0sXG4gIElUOiBmdW5jdGlvbiBJVChzdHIpIHtcbiAgICBpZiAoc3RyLmxlbmd0aCAhPT0gOSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChzdHIgPT09ICdDQTAwMDAwQUEnKSByZXR1cm4gZmFsc2U7IC8vIGh0dHBzOi8vaXQud2lraXBlZGlhLm9yZy93aWtpL0NhcnRhX2QlMjdpZGVudGl0JUMzJUEwX2VsZXR0cm9uaWNhX2l0YWxpYW5hXG5cbiAgICByZXR1cm4gc3RyLnNlYXJjaCgvQ1tBLVpdWzAtOV17NX1bQS1aXXsyfS9pKSA+IC0xO1xuICB9LFxuICBOTzogZnVuY3Rpb24gTk8oc3RyKSB7XG4gICAgdmFyIHNhbml0aXplZCA9IHN0ci50cmltKCk7XG4gICAgaWYgKGlzTmFOKE51bWJlcihzYW5pdGl6ZWQpKSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChzYW5pdGl6ZWQubGVuZ3RoICE9PSAxMSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChzYW5pdGl6ZWQgPT09ICcwMDAwMDAwMDAwMCcpIHJldHVybiBmYWxzZTsgLy8gaHR0cHM6Ly9uby53aWtpcGVkaWEub3JnL3dpa2kvRiVDMyVCOGRzZWxzbnVtbWVyXG5cbiAgICB2YXIgZiA9IHNhbml0aXplZC5zcGxpdCgnJykubWFwKE51bWJlcik7XG4gICAgdmFyIGsxID0gKDExIC0gKDMgKiBmWzBdICsgNyAqIGZbMV0gKyA2ICogZlsyXSArIDEgKiBmWzNdICsgOCAqIGZbNF0gKyA5ICogZls1XSArIDQgKiBmWzZdICsgNSAqIGZbN10gKyAyICogZls4XSkgJSAxMSkgJSAxMTtcbiAgICB2YXIgazIgPSAoMTEgLSAoNSAqIGZbMF0gKyA0ICogZlsxXSArIDMgKiBmWzJdICsgMiAqIGZbM10gKyA3ICogZls0XSArIDYgKiBmWzVdICsgNSAqIGZbNl0gKyA0ICogZls3XSArIDMgKiBmWzhdICsgMiAqIGsxKSAlIDExKSAlIDExO1xuICAgIGlmIChrMSAhPT0gZls5XSB8fCBrMiAhPT0gZlsxMF0pIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgVEg6IGZ1bmN0aW9uIFRIKHN0cikge1xuICAgIGlmICghc3RyLm1hdGNoKC9eWzEtOF1cXGR7MTJ9JC8pKSByZXR1cm4gZmFsc2U7IC8vIHZhbGlkYXRlIGNoZWNrIGRpZ2l0XG5cbiAgICB2YXIgc3VtID0gMDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgc3VtICs9IHBhcnNlSW50KHN0cltpXSwgMTApICogKDEzIC0gaSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0clsxMl0gPT09ICgoMTEgLSBzdW0gJSAxMSkgJSAxMCkudG9TdHJpbmcoKTtcbiAgfSxcbiAgTEs6IGZ1bmN0aW9uIExLKHN0cikge1xuICAgIHZhciBvbGRfbmljID0gL15bMS05XVxcZHs4fVt2eF0kL2k7XG4gICAgdmFyIG5ld19uaWMgPSAvXlsxLTldXFxkezExfSQvaTtcbiAgICBpZiAoc3RyLmxlbmd0aCA9PT0gMTAgJiYgb2xkX25pYy50ZXN0KHN0cikpIHJldHVybiB0cnVlO2Vsc2UgaWYgKHN0ci5sZW5ndGggPT09IDEyICYmIG5ld19uaWMudGVzdChzdHIpKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG4gICdoZS1JTCc6IGZ1bmN0aW9uIGhlSUwoc3RyKSB7XG4gICAgdmFyIEROSSA9IC9eXFxkezl9JC87IC8vIHNhbml0aXplIHVzZXIgaW5wdXRcblxuICAgIHZhciBzYW5pdGl6ZWQgPSBzdHIudHJpbSgpOyAvLyB2YWxpZGF0ZSB0aGUgZGF0YSBzdHJ1Y3R1cmVcblxuICAgIGlmICghRE5JLnRlc3Qoc2FuaXRpemVkKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBpZCA9IHNhbml0aXplZDtcbiAgICB2YXIgc3VtID0gMCxcbiAgICAgICAgaW5jTnVtO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpZC5sZW5ndGg7IGkrKykge1xuICAgICAgaW5jTnVtID0gTnVtYmVyKGlkW2ldKSAqIChpICUgMiArIDEpOyAvLyBNdWx0aXBseSBudW1iZXIgYnkgMSBvciAyXG5cbiAgICAgIHN1bSArPSBpbmNOdW0gPiA5ID8gaW5jTnVtIC0gOSA6IGluY051bTsgLy8gU3VtIHRoZSBkaWdpdHMgdXAgYW5kIGFkZCB0byB0b3RhbFxuICAgIH1cblxuICAgIHJldHVybiBzdW0gJSAxMCA9PT0gMDtcbiAgfSxcbiAgJ2FyLUxZJzogZnVuY3Rpb24gYXJMWShzdHIpIHtcbiAgICAvLyBMaWJ5YSBOYXRpb25hbCBJZGVudGl0eSBOdW1iZXIgTklOIGlzIDEyIGRpZ2l0cywgdGhlIGZpcnN0IGRpZ2l0IGlzIGVpdGhlciAxIG9yIDJcbiAgICB2YXIgTklOID0gL14oMXwyKVxcZHsxMX0kLzsgLy8gc2FuaXRpemUgdXNlciBpbnB1dFxuXG4gICAgdmFyIHNhbml0aXplZCA9IHN0ci50cmltKCk7IC8vIHZhbGlkYXRlIHRoZSBkYXRhIHN0cnVjdHVyZVxuXG4gICAgaWYgKCFOSU4udGVzdChzYW5pdGl6ZWQpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gICdhci1UTic6IGZ1bmN0aW9uIGFyVE4oc3RyKSB7XG4gICAgdmFyIEROSSA9IC9eXFxkezh9JC87IC8vIHNhbml0aXplIHVzZXIgaW5wdXRcblxuICAgIHZhciBzYW5pdGl6ZWQgPSBzdHIudHJpbSgpOyAvLyB2YWxpZGF0ZSB0aGUgZGF0YSBzdHJ1Y3R1cmVcblxuICAgIGlmICghRE5JLnRlc3Qoc2FuaXRpemVkKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICAnemgtQ04nOiBmdW5jdGlvbiB6aENOKHN0cikge1xuICAgIHZhciBwcm92aW5jZXNBbmRDaXRpZXMgPSBbJzExJywgLy8g5YyX5LqsXG4gICAgJzEyJywgLy8g5aSp5rSlXG4gICAgJzEzJywgLy8g5rKz5YyXXG4gICAgJzE0JywgLy8g5bGx6KW/XG4gICAgJzE1JywgLy8g5YaF6JKZ5Y+kXG4gICAgJzIxJywgLy8g6L695a6BXG4gICAgJzIyJywgLy8g5ZCJ5p6XXG4gICAgJzIzJywgLy8g6buR6b6Z5rGfXG4gICAgJzMxJywgLy8g5LiK5rW3XG4gICAgJzMyJywgLy8g5rGf6IuPXG4gICAgJzMzJywgLy8g5rWZ5rGfXG4gICAgJzM0JywgLy8g5a6J5b69XG4gICAgJzM1JywgLy8g56aP5bu6XG4gICAgJzM2JywgLy8g5rGf6KW/XG4gICAgJzM3JywgLy8g5bGx5LicXG4gICAgJzQxJywgLy8g5rKz5Y2XXG4gICAgJzQyJywgLy8g5rmW5YyXXG4gICAgJzQzJywgLy8g5rmW5Y2XXG4gICAgJzQ0JywgLy8g5bm/5LicXG4gICAgJzQ1JywgLy8g5bm/6KW/XG4gICAgJzQ2JywgLy8g5rW35Y2XXG4gICAgJzUwJywgLy8g6YeN5bqGXG4gICAgJzUxJywgLy8g5Zub5bedXG4gICAgJzUyJywgLy8g6LS15beeXG4gICAgJzUzJywgLy8g5LqR5Y2XXG4gICAgJzU0JywgLy8g6KW/6JePXG4gICAgJzYxJywgLy8g6ZmV6KW/XG4gICAgJzYyJywgLy8g55SY6IKDXG4gICAgJzYzJywgLy8g6Z2S5rW3XG4gICAgJzY0JywgLy8g5a6B5aSPXG4gICAgJzY1JywgLy8g5paw55aGXG4gICAgJzcxJywgLy8g5Y+w5rm+XG4gICAgJzgxJywgLy8g6aaZ5rivXG4gICAgJzgyJywgLy8g5r6z6ZeoXG4gICAgJzkxJyAvLyDlm73lpJZcbiAgICBdO1xuICAgIHZhciBwb3dlcnMgPSBbJzcnLCAnOScsICcxMCcsICc1JywgJzgnLCAnNCcsICcyJywgJzEnLCAnNicsICczJywgJzcnLCAnOScsICcxMCcsICc1JywgJzgnLCAnNCcsICcyJ107XG4gICAgdmFyIHBhcml0eUJpdCA9IFsnMScsICcwJywgJ1gnLCAnOScsICc4JywgJzcnLCAnNicsICc1JywgJzQnLCAnMycsICcyJ107XG5cbiAgICB2YXIgY2hlY2tBZGRyZXNzQ29kZSA9IGZ1bmN0aW9uIGNoZWNrQWRkcmVzc0NvZGUoYWRkcmVzc0NvZGUpIHtcbiAgICAgIHJldHVybiBwcm92aW5jZXNBbmRDaXRpZXMuaW5jbHVkZXMoYWRkcmVzc0NvZGUpO1xuICAgIH07XG5cbiAgICB2YXIgY2hlY2tCaXJ0aERheUNvZGUgPSBmdW5jdGlvbiBjaGVja0JpcnRoRGF5Q29kZShiaXJEYXlDb2RlKSB7XG4gICAgICB2YXIgeXl5eSA9IHBhcnNlSW50KGJpckRheUNvZGUuc3Vic3RyaW5nKDAsIDQpLCAxMCk7XG4gICAgICB2YXIgbW0gPSBwYXJzZUludChiaXJEYXlDb2RlLnN1YnN0cmluZyg0LCA2KSwgMTApO1xuICAgICAgdmFyIGRkID0gcGFyc2VJbnQoYmlyRGF5Q29kZS5zdWJzdHJpbmcoNiksIDEwKTtcbiAgICAgIHZhciB4ZGF0YSA9IG5ldyBEYXRlKHl5eXksIG1tIC0gMSwgZGQpO1xuXG4gICAgICBpZiAoeGRhdGEgPiBuZXcgRGF0ZSgpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgICAgIH0gZWxzZSBpZiAoeGRhdGEuZ2V0RnVsbFllYXIoKSA9PT0geXl5eSAmJiB4ZGF0YS5nZXRNb250aCgpID09PSBtbSAtIDEgJiYgeGRhdGEuZ2V0RGF0ZSgpID09PSBkZCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICB2YXIgZ2V0UGFyaXR5Qml0ID0gZnVuY3Rpb24gZ2V0UGFyaXR5Qml0KGlkQ2FyZE5vKSB7XG4gICAgICB2YXIgaWQxNyA9IGlkQ2FyZE5vLnN1YnN0cmluZygwLCAxNyk7XG4gICAgICB2YXIgcG93ZXIgPSAwO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE3OyBpKyspIHtcbiAgICAgICAgcG93ZXIgKz0gcGFyc2VJbnQoaWQxNy5jaGFyQXQoaSksIDEwKSAqIHBhcnNlSW50KHBvd2Vyc1tpXSwgMTApO1xuICAgICAgfVxuXG4gICAgICB2YXIgbW9kID0gcG93ZXIgJSAxMTtcbiAgICAgIHJldHVybiBwYXJpdHlCaXRbbW9kXTtcbiAgICB9O1xuXG4gICAgdmFyIGNoZWNrUGFyaXR5Qml0ID0gZnVuY3Rpb24gY2hlY2tQYXJpdHlCaXQoaWRDYXJkTm8pIHtcbiAgICAgIHJldHVybiBnZXRQYXJpdHlCaXQoaWRDYXJkTm8pID09PSBpZENhcmROby5jaGFyQXQoMTcpLnRvVXBwZXJDYXNlKCk7XG4gICAgfTtcblxuICAgIHZhciBjaGVjazE1SWRDYXJkTm8gPSBmdW5jdGlvbiBjaGVjazE1SWRDYXJkTm8oaWRDYXJkTm8pIHtcbiAgICAgIHZhciBjaGVjayA9IC9eWzEtOV1cXGR7N30oKDBbMS05XSl8KDFbMC0yXSkpKCgwWzEtOV0pfChbMS0yXVswLTldKXwoM1swLTFdKSlcXGR7M30kLy50ZXN0KGlkQ2FyZE5vKTtcbiAgICAgIGlmICghY2hlY2spIHJldHVybiBmYWxzZTtcbiAgICAgIHZhciBhZGRyZXNzQ29kZSA9IGlkQ2FyZE5vLnN1YnN0cmluZygwLCAyKTtcbiAgICAgIGNoZWNrID0gY2hlY2tBZGRyZXNzQ29kZShhZGRyZXNzQ29kZSk7XG4gICAgICBpZiAoIWNoZWNrKSByZXR1cm4gZmFsc2U7XG4gICAgICB2YXIgYmlyRGF5Q29kZSA9IFwiMTlcIi5jb25jYXQoaWRDYXJkTm8uc3Vic3RyaW5nKDYsIDEyKSk7XG4gICAgICBjaGVjayA9IGNoZWNrQmlydGhEYXlDb2RlKGJpckRheUNvZGUpO1xuICAgICAgaWYgKCFjaGVjaykgcmV0dXJuIGZhbHNlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIHZhciBjaGVjazE4SWRDYXJkTm8gPSBmdW5jdGlvbiBjaGVjazE4SWRDYXJkTm8oaWRDYXJkTm8pIHtcbiAgICAgIHZhciBjaGVjayA9IC9eWzEtOV1cXGR7NX1bMS05XVxcZHszfSgoMFsxLTldKXwoMVswLTJdKSkoKDBbMS05XSl8KFsxLTJdWzAtOV0pfCgzWzAtMV0pKVxcZHszfShcXGR8eHxYKSQvLnRlc3QoaWRDYXJkTm8pO1xuICAgICAgaWYgKCFjaGVjaykgcmV0dXJuIGZhbHNlO1xuICAgICAgdmFyIGFkZHJlc3NDb2RlID0gaWRDYXJkTm8uc3Vic3RyaW5nKDAsIDIpO1xuICAgICAgY2hlY2sgPSBjaGVja0FkZHJlc3NDb2RlKGFkZHJlc3NDb2RlKTtcbiAgICAgIGlmICghY2hlY2spIHJldHVybiBmYWxzZTtcbiAgICAgIHZhciBiaXJEYXlDb2RlID0gaWRDYXJkTm8uc3Vic3RyaW5nKDYsIDE0KTtcbiAgICAgIGNoZWNrID0gY2hlY2tCaXJ0aERheUNvZGUoYmlyRGF5Q29kZSk7XG4gICAgICBpZiAoIWNoZWNrKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gY2hlY2tQYXJpdHlCaXQoaWRDYXJkTm8pO1xuICAgIH07XG5cbiAgICB2YXIgY2hlY2tJZENhcmRObyA9IGZ1bmN0aW9uIGNoZWNrSWRDYXJkTm8oaWRDYXJkTm8pIHtcbiAgICAgIHZhciBjaGVjayA9IC9eXFxkezE1fXwoXFxkezE3fShcXGR8eHxYKSkkLy50ZXN0KGlkQ2FyZE5vKTtcbiAgICAgIGlmICghY2hlY2spIHJldHVybiBmYWxzZTtcblxuICAgICAgaWYgKGlkQ2FyZE5vLmxlbmd0aCA9PT0gMTUpIHtcbiAgICAgICAgcmV0dXJuIGNoZWNrMTVJZENhcmRObyhpZENhcmRObyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjaGVjazE4SWRDYXJkTm8oaWRDYXJkTm8pO1xuICAgIH07XG5cbiAgICByZXR1cm4gY2hlY2tJZENhcmRObyhzdHIpO1xuICB9LFxuICAnemgtSEsnOiBmdW5jdGlvbiB6aEhLKHN0cikge1xuICAgIC8vIHNhbml0aXplIHVzZXIgaW5wdXRcbiAgICBzdHIgPSBzdHIudHJpbSgpOyAvLyBIS0lEIG51bWJlciBzdGFydHMgd2l0aCAxIG9yIDIgbGV0dGVycywgZm9sbG93ZWQgYnkgNiBkaWdpdHMsXG4gICAgLy8gdGhlbiBhIGNoZWNrc3VtIGNvbnRhaW5lZCBpbiBzcXVhcmUgLyByb3VuZCBicmFja2V0cyBvciBub3RoaW5nXG5cbiAgICB2YXIgcmVnZXhIS0lEID0gL15bQS1aXXsxLDJ9WzAtOV17Nn0oKFxcKFswLTlBXVxcKSl8KFxcW1swLTlBXVxcXSl8KFswLTlBXSkpJC87XG4gICAgdmFyIHJlZ2V4SXNEaWdpdCA9IC9eWzAtOV0kLzsgLy8gY29udmVydCB0aGUgdXNlciBpbnB1dCB0byBhbGwgdXBwZXJjYXNlIGFuZCBhcHBseSByZWdleFxuXG4gICAgc3RyID0gc3RyLnRvVXBwZXJDYXNlKCk7XG4gICAgaWYgKCFyZWdleEhLSUQudGVzdChzdHIpKSByZXR1cm4gZmFsc2U7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoL1xcW3xcXF18XFwofFxcKS9nLCAnJyk7XG4gICAgaWYgKHN0ci5sZW5ndGggPT09IDgpIHN0ciA9IFwiM1wiLmNvbmNhdChzdHIpO1xuICAgIHZhciBjaGVja1N1bVZhbCA9IDA7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8PSA3OyBpKyspIHtcbiAgICAgIHZhciBjb252ZXJ0ZWRDaGFyID0gdm9pZCAwO1xuICAgICAgaWYgKCFyZWdleElzRGlnaXQudGVzdChzdHJbaV0pKSBjb252ZXJ0ZWRDaGFyID0gKHN0cltpXS5jaGFyQ29kZUF0KDApIC0gNTUpICUgMTE7ZWxzZSBjb252ZXJ0ZWRDaGFyID0gc3RyW2ldO1xuICAgICAgY2hlY2tTdW1WYWwgKz0gY29udmVydGVkQ2hhciAqICg5IC0gaSk7XG4gICAgfVxuXG4gICAgY2hlY2tTdW1WYWwgJT0gMTE7XG4gICAgdmFyIGNoZWNrU3VtQ29udmVydGVkO1xuICAgIGlmIChjaGVja1N1bVZhbCA9PT0gMCkgY2hlY2tTdW1Db252ZXJ0ZWQgPSAnMCc7ZWxzZSBpZiAoY2hlY2tTdW1WYWwgPT09IDEpIGNoZWNrU3VtQ29udmVydGVkID0gJ0EnO2Vsc2UgY2hlY2tTdW1Db252ZXJ0ZWQgPSBTdHJpbmcoMTEgLSBjaGVja1N1bVZhbCk7XG4gICAgaWYgKGNoZWNrU3VtQ29udmVydGVkID09PSBzdHJbc3RyLmxlbmd0aCAtIDFdKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG4gICd6aC1UVyc6IGZ1bmN0aW9uIHpoVFcoc3RyKSB7XG4gICAgdmFyIEFMUEhBQkVUX0NPREVTID0ge1xuICAgICAgQTogMTAsXG4gICAgICBCOiAxMSxcbiAgICAgIEM6IDEyLFxuICAgICAgRDogMTMsXG4gICAgICBFOiAxNCxcbiAgICAgIEY6IDE1LFxuICAgICAgRzogMTYsXG4gICAgICBIOiAxNyxcbiAgICAgIEk6IDM0LFxuICAgICAgSjogMTgsXG4gICAgICBLOiAxOSxcbiAgICAgIEw6IDIwLFxuICAgICAgTTogMjEsXG4gICAgICBOOiAyMixcbiAgICAgIE86IDM1LFxuICAgICAgUDogMjMsXG4gICAgICBROiAyNCxcbiAgICAgIFI6IDI1LFxuICAgICAgUzogMjYsXG4gICAgICBUOiAyNyxcbiAgICAgIFU6IDI4LFxuICAgICAgVjogMjksXG4gICAgICBXOiAzMixcbiAgICAgIFg6IDMwLFxuICAgICAgWTogMzEsXG4gICAgICBaOiAzM1xuICAgIH07XG4gICAgdmFyIHNhbml0aXplZCA9IHN0ci50cmltKCkudG9VcHBlckNhc2UoKTtcbiAgICBpZiAoIS9eW0EtWl1bMC05XXs5fSQvLnRlc3Qoc2FuaXRpemVkKSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBBcnJheS5mcm9tKHNhbml0aXplZCkucmVkdWNlKGZ1bmN0aW9uIChzdW0sIG51bWJlciwgaW5kZXgpIHtcbiAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICB2YXIgY29kZSA9IEFMUEhBQkVUX0NPREVTW251bWJlcl07XG4gICAgICAgIHJldHVybiBjb2RlICUgMTAgKiA5ICsgTWF0aC5mbG9vcihjb2RlIC8gMTApO1xuICAgICAgfVxuXG4gICAgICBpZiAoaW5kZXggPT09IDkpIHtcbiAgICAgICAgcmV0dXJuICgxMCAtIHN1bSAlIDEwIC0gTnVtYmVyKG51bWJlcikpICUgMTAgPT09IDA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdW0gKyBOdW1iZXIobnVtYmVyKSAqICg5IC0gaW5kZXgpO1xuICAgIH0sIDApO1xuICB9XG59O1xuXG5mdW5jdGlvbiBpc0lkZW50aXR5Q2FyZChzdHIsIGxvY2FsZSkge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuXG4gIGlmIChsb2NhbGUgaW4gdmFsaWRhdG9ycykge1xuICAgIHJldHVybiB2YWxpZGF0b3JzW2xvY2FsZV0oc3RyKTtcbiAgfSBlbHNlIGlmIChsb2NhbGUgPT09ICdhbnknKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHZhbGlkYXRvcnMpIHtcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9nb3R3YXJsb3N0L2lzdGFuYnVsL2Jsb2IvbWFzdGVyL2lnbm9yaW5nLWNvZGUtZm9yLWNvdmVyYWdlLm1kI2lnbm9yaW5nLWNvZGUtZm9yLWNvdmVyYWdlLXB1cnBvc2VzXG4gICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgZWxzZVxuICAgICAgaWYgKHZhbGlkYXRvcnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICB2YXIgdmFsaWRhdG9yID0gdmFsaWRhdG9yc1trZXldO1xuXG4gICAgICAgIGlmICh2YWxpZGF0b3Ioc3RyKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBsb2NhbGUgJ1wiLmNvbmNhdChsb2NhbGUsIFwiJ1wiKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzSW47XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbnZhciBfdG9TdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvdG9TdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbmZ1bmN0aW9uIGlzSW4oc3RyLCBvcHRpb25zKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIHZhciBpO1xuXG4gIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob3B0aW9ucykgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICB2YXIgYXJyYXkgPSBbXTtcblxuICAgIGZvciAoaSBpbiBvcHRpb25zKSB7XG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZ290d2FybG9zdC9pc3RhbmJ1bC9ibG9iL21hc3Rlci9pZ25vcmluZy1jb2RlLWZvci1jb3ZlcmFnZS5tZCNpZ25vcmluZy1jb2RlLWZvci1jb3ZlcmFnZS1wdXJwb3Nlc1xuICAgICAgLy8gaXN0YW5idWwgaWdub3JlIGVsc2VcbiAgICAgIGlmICh7fS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9wdGlvbnMsIGkpKSB7XG4gICAgICAgIGFycmF5W2ldID0gKDAsIF90b1N0cmluZy5kZWZhdWx0KShvcHRpb25zW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYXJyYXkuaW5kZXhPZihzdHIpID49IDA7XG4gIH0gZWxzZSBpZiAoX3R5cGVvZihvcHRpb25zKSA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShzdHIpO1xuICB9IGVsc2UgaWYgKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMuaW5kZXhPZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBvcHRpb25zLmluZGV4T2Yoc3RyKSA+PSAwO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc0ludDtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGludCA9IC9eKD86Wy0rXT8oPzowfFsxLTldWzAtOV0qKSkkLztcbnZhciBpbnRMZWFkaW5nWmVyb2VzID0gL15bLStdP1swLTldKyQvO1xuXG5mdW5jdGlvbiBpc0ludChzdHIsIG9wdGlvbnMpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307IC8vIEdldCB0aGUgcmVnZXggdG8gdXNlIGZvciB0ZXN0aW5nLCBiYXNlZCBvbiB3aGV0aGVyXG4gIC8vIGxlYWRpbmcgemVyb2VzIGFyZSBhbGxvd2VkIG9yIG5vdC5cblxuICB2YXIgcmVnZXggPSBvcHRpb25zLmhhc093blByb3BlcnR5KCdhbGxvd19sZWFkaW5nX3plcm9lcycpICYmICFvcHRpb25zLmFsbG93X2xlYWRpbmdfemVyb2VzID8gaW50IDogaW50TGVhZGluZ1plcm9lczsgLy8gQ2hlY2sgbWluL21heC9sdC9ndFxuXG4gIHZhciBtaW5DaGVja1Bhc3NlZCA9ICFvcHRpb25zLmhhc093blByb3BlcnR5KCdtaW4nKSB8fCBzdHIgPj0gb3B0aW9ucy5taW47XG4gIHZhciBtYXhDaGVja1Bhc3NlZCA9ICFvcHRpb25zLmhhc093blByb3BlcnR5KCdtYXgnKSB8fCBzdHIgPD0gb3B0aW9ucy5tYXg7XG4gIHZhciBsdENoZWNrUGFzc2VkID0gIW9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2x0JykgfHwgc3RyIDwgb3B0aW9ucy5sdDtcbiAgdmFyIGd0Q2hlY2tQYXNzZWQgPSAhb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnZ3QnKSB8fCBzdHIgPiBvcHRpb25zLmd0O1xuICByZXR1cm4gcmVnZXgudGVzdChzdHIpICYmIG1pbkNoZWNrUGFzc2VkICYmIG1heENoZWNrUGFzc2VkICYmIGx0Q2hlY2tQYXNzZWQgJiYgZ3RDaGVja1Bhc3NlZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNKU09OO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG52YXIgX21lcmdlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL21lcmdlXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiOyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG52YXIgZGVmYXVsdF9qc29uX29wdGlvbnMgPSB7XG4gIGFsbG93X3ByaW1pdGl2ZXM6IGZhbHNlXG59O1xuXG5mdW5jdGlvbiBpc0pTT04oc3RyLCBvcHRpb25zKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG5cbiAgdHJ5IHtcbiAgICBvcHRpb25zID0gKDAsIF9tZXJnZS5kZWZhdWx0KShvcHRpb25zLCBkZWZhdWx0X2pzb25fb3B0aW9ucyk7XG4gICAgdmFyIHByaW1pdGl2ZXMgPSBbXTtcblxuICAgIGlmIChvcHRpb25zLmFsbG93X3ByaW1pdGl2ZXMpIHtcbiAgICAgIHByaW1pdGl2ZXMgPSBbbnVsbCwgZmFsc2UsIHRydWVdO1xuICAgIH1cblxuICAgIHZhciBvYmogPSBKU09OLnBhcnNlKHN0cik7XG4gICAgcmV0dXJuIHByaW1pdGl2ZXMuaW5jbHVkZXMob2JqKSB8fCAhIW9iaiAmJiBfdHlwZW9mKG9iaikgPT09ICdvYmplY3QnO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLyogaWdub3JlICovXG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzSldUO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG52YXIgX2lzQmFzZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vaXNCYXNlNjRcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBpc0pXVChzdHIpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgdmFyIGRvdFNwbGl0ID0gc3RyLnNwbGl0KCcuJyk7XG4gIHZhciBsZW4gPSBkb3RTcGxpdC5sZW5ndGg7XG5cbiAgaWYgKGxlbiA+IDMgfHwgbGVuIDwgMikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBkb3RTcGxpdC5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgY3VyckVsZW0pIHtcbiAgICByZXR1cm4gYWNjICYmICgwLCBfaXNCYXNlLmRlZmF1bHQpKGN1cnJFbGVtLCB7XG4gICAgICB1cmxTYWZlOiB0cnVlXG4gICAgfSk7XG4gIH0sIHRydWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc0xhdExvbmc7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbnZhciBfbWVyZ2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvbWVyZ2VcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgbGF0ID0gL15cXCg/WystXT8oOTAoXFwuMCspP3xbMS04XT9cXGQoXFwuXFxkKyk/KSQvO1xudmFyIGxvbmcgPSAvXlxccz9bKy1dPygxODAoXFwuMCspP3wxWzAtN11cXGQoXFwuXFxkKyk/fFxcZHsxLDJ9KFxcLlxcZCspPylcXCk/JC87XG52YXIgbGF0RE1TID0gL14oKFsxLThdP1xcZClcXEQrKFsxLTVdP1xcZHw2MClcXEQrKFsxLTVdP1xcZHw2MCkoXFwuXFxkKyk/fDkwXFxEKzBcXEQrMClcXEQrW05TbnNdPyQvaTtcbnZhciBsb25nRE1TID0gL15cXHMqKFsxLTddP1xcZHsxLDJ9XFxEKyhbMS01XT9cXGR8NjApXFxEKyhbMS01XT9cXGR8NjApKFxcLlxcZCspP3wxODBcXEQrMFxcRCswKVxcRCtbRVdld10/JC9pO1xudmFyIGRlZmF1bHRMYXRMb25nT3B0aW9ucyA9IHtcbiAgY2hlY2tETVM6IGZhbHNlXG59O1xuXG5mdW5jdGlvbiBpc0xhdExvbmcoc3RyLCBvcHRpb25zKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIG9wdGlvbnMgPSAoMCwgX21lcmdlLmRlZmF1bHQpKG9wdGlvbnMsIGRlZmF1bHRMYXRMb25nT3B0aW9ucyk7XG4gIGlmICghc3RyLmluY2x1ZGVzKCcsJykpIHJldHVybiBmYWxzZTtcbiAgdmFyIHBhaXIgPSBzdHIuc3BsaXQoJywnKTtcbiAgaWYgKHBhaXJbMF0uc3RhcnRzV2l0aCgnKCcpICYmICFwYWlyWzFdLmVuZHNXaXRoKCcpJykgfHwgcGFpclsxXS5lbmRzV2l0aCgnKScpICYmICFwYWlyWzBdLnN0YXJ0c1dpdGgoJygnKSkgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChvcHRpb25zLmNoZWNrRE1TKSB7XG4gICAgcmV0dXJuIGxhdERNUy50ZXN0KHBhaXJbMF0pICYmIGxvbmdETVMudGVzdChwYWlyWzFdKTtcbiAgfVxuXG4gIHJldHVybiBsYXQudGVzdChwYWlyWzBdKSAmJiBsb25nLnRlc3QocGFpclsxXSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzTGVuZ3RoO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbi8qIGVzbGludC1kaXNhYmxlIHByZWZlci1yZXN0LXBhcmFtcyAqL1xuZnVuY3Rpb24gaXNMZW5ndGgoc3RyLCBvcHRpb25zKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIHZhciBtaW47XG4gIHZhciBtYXg7XG5cbiAgaWYgKF90eXBlb2Yob3B0aW9ucykgPT09ICdvYmplY3QnKSB7XG4gICAgbWluID0gb3B0aW9ucy5taW4gfHwgMDtcbiAgICBtYXggPSBvcHRpb25zLm1heDtcbiAgfSBlbHNlIHtcbiAgICAvLyBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eTogaXNMZW5ndGgoc3RyLCBtaW4gWywgbWF4XSlcbiAgICBtaW4gPSBhcmd1bWVudHNbMV0gfHwgMDtcbiAgICBtYXggPSBhcmd1bWVudHNbMl07XG4gIH1cblxuICB2YXIgcHJlc2VudGF0aW9uU2VxdWVuY2VzID0gc3RyLm1hdGNoKC8oXFx1RkUwRnxcXHVGRTBFKS9nKSB8fCBbXTtcbiAgdmFyIHN1cnJvZ2F0ZVBhaXJzID0gc3RyLm1hdGNoKC9bXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZdL2cpIHx8IFtdO1xuICB2YXIgbGVuID0gc3RyLmxlbmd0aCAtIHByZXNlbnRhdGlvblNlcXVlbmNlcy5sZW5ndGggLSBzdXJyb2dhdGVQYWlycy5sZW5ndGg7XG4gIHJldHVybiBsZW4gPj0gbWluICYmICh0eXBlb2YgbWF4ID09PSAndW5kZWZpbmVkJyB8fCBsZW4gPD0gbWF4KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNMaWNlbnNlUGxhdGU7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciB2YWxpZGF0b3JzID0ge1xuICAnY3MtQ1onOiBmdW5jdGlvbiBjc0NaKHN0cikge1xuICAgIHJldHVybiAvXigoW0FCQ0RFRkhJSktMTU5QUlNUVVZYWVpdfFswLTldKS0/KXs1LDh9JC8udGVzdChzdHIpO1xuICB9LFxuICAnZGUtREUnOiBmdW5jdGlvbiBkZURFKHN0cikge1xuICAgIHJldHVybiAvXigoQXxBQXxBQnxBQ3xBRXxBSHxBS3xBTXxBTnxBw5Z8QVB8QVN8QVR8QVV8QVd8QVp8QnxCQXxCQnxCQ3xCRXxCRnxCSHxCSXxCS3xCTHxCTXxCTnxCT3xCw5Z8QlN8QlR8Qlp8Q3xDQXxDQnxDRXxDT3xDUnxDV3xEfERBfEREfERFfERIfERJfERMfERNfEROfERPfERVfERXfERafEV8RUF8RUJ8RUR8RUV8RUZ8RUd8RUh8RUl8RUx8RU18RU58RVJ8RVN8RVV8RVd8RnxGQnxGRHxGRnxGR3xGSXxGTHxGTnxGT3xGUnxGU3xGVHxGw5x8Rld8Rlp8R3xHQXxHQ3xHRHxHRXxHRnxHR3xHSXxHS3xHTHxHTXxHTnxHw5Z8R1B8R1J8R1N8R1R8R8OcfEdWfEdXfEdafEh8SEF8SEJ8SEN8SER8SEV8SEZ8SEd8SEh8SEl8SEt8SEx8SE18SE58SE98SFB8SFJ8SFN8SFV8SFZ8SFh8SFl8SFp8SUt8SUx8SU58SVp8SnxKRXxKTHxLfEtBfEtCfEtDfEtFfEtGfEtHfEtIfEtJfEtLfEtMfEtNfEtOfEtPfEtSfEtTfEtUfEtVfEtXfEtZfEx8TEF8TEJ8TEN8TER8TEZ8TEd8TEh8TEl8TEx8TE18TE58TMOWfExQfExSfExVfE18TUF8TUJ8TUN8TUR8TUV8TUd8TUh8TUl8TUt8TUx8TU18TU58TU98TVF8TVJ8TVN8TcOcfE1XfE1ZfE1afE58TkJ8TkR8TkV8TkZ8Tkh8Tkl8Tkt8Tk18TsOWfE5QfE5SfE5UfE5VfE5XfE5ZfE5afE9BfE9CfE9DfE9EfE9FfE9GfE9HfE9IfE9LfE9MfE9QfE9TfE9afFB8UEF8UEJ8UEV8UEZ8UEl8UEx8UE18UE58UFJ8UFN8UFd8UFp8UnxSQXxSQ3xSRHxSRXxSR3xSSHxSSXxSTHxSTXxSTnxST3xSUHxSU3xSVHxSVXxSVnxSV3xSWnxTfFNCfFNDfFNFfFNHfFNJfFNLfFNMfFNNfFNOfFNPfFNQfFNSfFNUfFNVfFNXfFNZfFNafFRFfFRGfFRHfFRPfFRQfFRSfFRTfFRUfFTDnHzDnEJ8VUV8VUh8VUx8VU18VU58VnxWQnxWR3xWS3xWUnxWU3xXfFdBfFdCfFdFfFdGfFdJfFdLfFdMfFdNfFdOfFdPfFdSfFdTfFdUfFfDnHxXV3xXWnxafFpFfFpJfFpQfFpSfFpXfFpaKVstIF0/W0EtWl17MSwyfVstIF0/XFxkezEsNH18KEFCR3xBQkl8QUlCfEFJQ3xBTEZ8QUxafEFOQXxBTkd8QU5LfEFQRHxBUk58QVJUfEFTTHxBU1p8QVVSfEFaRXxCQUR8QkFSfEJCR3xCQ0h8QkVEfEJFUnxCR0R8QkdMfEJJRHxCSU58QklSfEJJVHxCSVd8QktTfEJMQnxCTEt8Qk5BfEJPR3xCT0h8Qk9SfEJPVHxCUkF8QlJCfEJSR3xCUkt8QlJMfEJSVnxCU0J8QlNLfEJURnxCw5xEfEJVTHxCw5xSfELDnFN8QsOcWnxDQVN8Q0hBfENMUHxDTFp8Q09DfENPRXxDVVh8REFIfERBTnxEQVV8REJSfERFR3xERUx8REdGfERJTHxESU58RElafERLQnxETEd8RE9OfERVRHxEw5xXfEVCRXxFQk58RUJTfEVDS3xFSUN8RUlMfEVJTnxFSVN8RU1EfEVNU3xFUkJ8RVJIfEVSS3xFUlp8RVNCfEVTV3xGREJ8RkRTfEZFVXxGRkJ8RktCfEZMw5Z8Rk9SfEZSR3xGUkl8RlJXfEZUTHxGw5xTfEdBTnxHQVB8R0RCfEdFTHxHRU98R0VSfEdIQXxHSEN8R0xBfEdNTnxHTlR8R09BfEdPSHxHUkF8R1JIfEdSSXxHUk18R1JafEdUSHxHVUJ8R1VOfEdWTXxIQUJ8SEFMfEhBTXxIQVN8SEJOfEhCU3xIQ0h8SERIfEhETHxIRUJ8SEVGfEhFSXxIRVJ8SEVUfEhHTnxIR1d8SEhNfEhJR3xISVB8SE3DnHxIT0d8SE9IfEhPTHxIT018SE9SfEjDllN8SE9UfEhST3xIU0t8SFNUfEhWTHxIV0l8SUdCfElMTHxKw5xMfEtFSHxLRUx8S0VNfEtJQnxLTEV8S0xafEvDlk58S8OWVHxLw5ZafEtSVXxLw5xOfEtVU3xLWUZ8TEFOfExBVXxMQlN8TEJafExES3xMRFN8TEVPfExFUnxMRVZ8TElCfExJRnxMSVB8TMOWQnxMT1N8TFJPfExTWnxMw5xOfExVUHxMV0x8TUFCfE1BSXxNQUt8TUFMfE1FRHxNRUd8TUVJfE1FS3xNRUx8TUVSfE1FVHxNR0h8TUdOfE1ITHxNSUx8TUtLfE1PRHxNT0x8TU9OfE1PU3xNU0V8TVNIfE1TUHxNU1R8TVRLfE1UTHxNw5xCfE3DnFJ8TVlLfE1aR3xOQUJ8TkFJfE5BVXxOREh8TkVBfE5FQnxORUN8TkVOfE5FU3xORVd8Tk1CfE5NU3xOT0h8Tk9MfE5PTXxOT1J8TlZQfE5XTXxPQUx8T0JCfE9CR3xPQ0h8T0hBfMOWSFJ8T0hWfE9IWnxPUFJ8T1NMfE9WSXxPVkx8T1ZQfFBBRnxQQU58UEFSfFBDSHxQRUd8UElSfFBMw5Z8UFLDnHxRRlR8UUxCfFJER3xSRUd8UkVIfFJFSXxSSUR8UklFfFJPRHxST0Z8Uk9LfFJPTHxST1N8Uk9UfFJPV3xSU0x8UsOcRHxSw5xHfFNBQnxTQUR8U0FOfFNBV3xTQkd8U0JLfFNDWnxTREh8U0RMfFNEVHxTRUJ8U0VFfFNFRnxTRUx8U0ZCfFNGVHxTR0h8U0hBfFNIR3xTSEt8U0hMfFNJR3xTSU18U0xFfFNMRnxTTEt8U0xOfFNMU3xTTMOcfFNMWnxTTcOcfFNPQnxTT0d8U09LfFPDlk18U09OfFNQQnxTUE58U1JCfFNST3xTVEF8U1RCfFNURHxTVEV8U1RMfFNVTHxTw5xXfFNXQXxTWkJ8VEJCfFRET3xURVR8VElSfFTDlkx8VFVUfFVFTXxVRVJ8VUZGfFVTSXxWQUl8VkVDfFZFUnxWSUJ8VklFfFZJVHxWT0h8V0FGfFdBS3xXQU58V0FSfFdBVHxXQlN8V0RBfFdFTHxXRU58V0VSfFdFU3xXSFZ8V0lMfFdJU3xXSVR8V0lafFdMR3xXTVN8V05EfFdPQnxXT0h8V09MfFdPUnxXT1N8V1JOfFdTRnxXU1R8V1NXfFdUTHxXVE18V1VHfFfDnE18V1VOfFdVUnxXWkx8WkVMfFpJRylbLSBdPygoW0EtWl1bLSBdP1xcZHsxLDR9KXwoW0EtWl17Mn1bLSBdP1xcZHsxLDN9KSkpWy0gXT8oRXxIKT8kLy50ZXN0KHN0cik7XG4gIH0sXG4gICdkZS1MSSc6IGZ1bmN0aW9uIGRlTEkoc3RyKSB7XG4gICAgcmV0dXJuIC9eRkxbLSBdP1xcZHsxLDV9W1VaXT8kLy50ZXN0KHN0cik7XG4gIH0sXG4gICdlbi1JTic6IGZ1bmN0aW9uIGVuSU4oc3RyKSB7XG4gICAgcmV0dXJuIC9eW0EtWl17Mn1bIC1dP1swLTldezEsMn0oPzpbIC1dP1tBLVpdKSg/OlsgLV0/W0EtWl0qKT9bIC1dP1swLTldezR9JC8udGVzdChzdHIpO1xuICB9LFxuICAnZXMtQVInOiBmdW5jdGlvbiBlc0FSKHN0cikge1xuICAgIHJldHVybiAvXigoW0EtWl17Mn0gP1swLTldezN9ID9bQS1aXXsyfSl8KFtBLVpdezN9ID9bMC05XXszfSkpJC8udGVzdChzdHIpO1xuICB9LFxuICAnZmktRkknOiBmdW5jdGlvbiBmaUZJKHN0cikge1xuICAgIHJldHVybiAvXig/PS57NCw3fSkoKFtBLVpdezEsM318WzAtOV17MSwzfSlbXFxzLV0/KFtBLVpdezEsM318WzAtOV17MSw1fSkpJC8udGVzdChzdHIpO1xuICB9LFxuICAnaHUtSFUnOiBmdW5jdGlvbiBodUhVKHN0cikge1xuICAgIHJldHVybiAvXigoKCg/IUFBQSkoKFtBLU5QUlNUVlpXWFldezF9KShbQS1QUi1aXXsxfSkoW0EtSEotTlBSLVpdKSl8KEFbQUJDXUkpfEFbQUJDXU98QVtBLVddUXxCUEl8QlBPfFVDT3xVRE98WEFPKS0oPyEwMDApXFxkezN9KXwoTVxcZHs2fSl8KChDS3xEVHxDRHxIQ3xIW0FCRUZJS0xNTlBSU1RWWF18TUF8T1R8UltBLVpdKSBcXGR7Mn0tXFxkezJ9KXwoQ0QgXFxkezN9LVxcZHszfSl8KEMtKEN8WCkgXFxkezR9KXwoWC0oQXxCfEMpIFxcZHs0fSl8KChbRVBWWl0tXFxkezV9KSl8KFMgQVtBLVpdezJ9IFxcZHsyfSl8KFNQIFxcZHsyfS1cXGR7Mn0pKSQvLnRlc3Qoc3RyKTtcbiAgfSxcbiAgJ3B0LUJSJzogZnVuY3Rpb24gcHRCUihzdHIpIHtcbiAgICByZXR1cm4gL15bQS1aXXszfVsgLV0/WzAtOV1bQS1aXVswLTldezJ9fFtBLVpdezN9WyAtXT9bMC05XXs0fSQvLnRlc3Qoc3RyKTtcbiAgfSxcbiAgJ3B0LVBUJzogZnVuY3Rpb24gcHRQVChzdHIpIHtcbiAgICByZXR1cm4gL14oW0EtWl17Mn18WzAtOV17Mn0pWyAtwrddPyhbQS1aXXsyfXxbMC05XXsyfSlbIC3Ct10/KFtBLVpdezJ9fFswLTldezJ9KSQvLnRlc3Qoc3RyKTtcbiAgfSxcbiAgJ3NxLUFMJzogZnVuY3Rpb24gc3FBTChzdHIpIHtcbiAgICByZXR1cm4gL15bQS1aXXsyfVstIF0/KChcXGR7M31bLSBdPygoW0EtWl17Mn0pfFQpKXwoUlstIF0/XFxkezN9KSkkLy50ZXN0KHN0cik7XG4gIH0sXG4gICdzdi1TRSc6IGZ1bmN0aW9uIHN2U0Uoc3RyKSB7XG4gICAgcmV0dXJuIC9eW0EtSEotUFItVVctWl17M30gP1tcXGRdezJ9W0EtSEotUFItVVctWjEtOV0kfCheW0EtWsOFw4TDliBdezIsN30kKS8udGVzdChzdHIudHJpbSgpKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gaXNMaWNlbnNlUGxhdGUoc3RyLCBsb2NhbGUpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcblxuICBpZiAobG9jYWxlIGluIHZhbGlkYXRvcnMpIHtcbiAgICByZXR1cm4gdmFsaWRhdG9yc1tsb2NhbGVdKHN0cik7XG4gIH0gZWxzZSBpZiAobG9jYWxlID09PSAnYW55Jykge1xuICAgIGZvciAodmFyIGtleSBpbiB2YWxpZGF0b3JzKSB7XG4gICAgICAvKiBlc2xpbnQgZ3VhcmQtZm9yLWluOiAwICovXG4gICAgICB2YXIgdmFsaWRhdG9yID0gdmFsaWRhdG9yc1trZXldO1xuXG4gICAgICBpZiAodmFsaWRhdG9yKHN0cikpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBsb2NhbGUgJ1wiLmNvbmNhdChsb2NhbGUsIFwiJ1wiKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzTG9jYWxlO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgbG9jYWxlUmVnID0gL15bQS1aYS16XXsyLDR9KFtfLV0oW0EtWmEtel17NH18W1xcZF17M30pKT8oW18tXShbQS1aYS16XXsyfXxbXFxkXXszfSkpPyQvO1xuXG5mdW5jdGlvbiBpc0xvY2FsZShzdHIpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcblxuICBpZiAoc3RyID09PSAnZW5fVVNfUE9TSVgnIHx8IHN0ciA9PT0gJ2NhX0VTX1ZBTEVOQ0lBJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGxvY2FsZVJlZy50ZXN0KHN0cik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzTG93ZXJjYXNlO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBpc0xvd2VyY2FzZShzdHIpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgcmV0dXJuIHN0ciA9PT0gc3RyLnRvTG93ZXJDYXNlKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzTHVobk51bWJlcjtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gaXNMdWhuTnVtYmVyKHN0cikge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICB2YXIgc2FuaXRpemVkID0gc3RyLnJlcGxhY2UoL1stIF0rL2csICcnKTtcbiAgdmFyIHN1bSA9IDA7XG4gIHZhciBkaWdpdDtcbiAgdmFyIHRtcE51bTtcbiAgdmFyIHNob3VsZERvdWJsZTtcblxuICBmb3IgKHZhciBpID0gc2FuaXRpemVkLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgZGlnaXQgPSBzYW5pdGl6ZWQuc3Vic3RyaW5nKGksIGkgKyAxKTtcbiAgICB0bXBOdW0gPSBwYXJzZUludChkaWdpdCwgMTApO1xuXG4gICAgaWYgKHNob3VsZERvdWJsZSkge1xuICAgICAgdG1wTnVtICo9IDI7XG5cbiAgICAgIGlmICh0bXBOdW0gPj0gMTApIHtcbiAgICAgICAgc3VtICs9IHRtcE51bSAlIDEwICsgMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN1bSArPSB0bXBOdW07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1bSArPSB0bXBOdW07XG4gICAgfVxuXG4gICAgc2hvdWxkRG91YmxlID0gIXNob3VsZERvdWJsZTtcbiAgfVxuXG4gIHJldHVybiAhIShzdW0gJSAxMCA9PT0gMCA/IHNhbml0aXplZCA6IGZhbHNlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNNQUNBZGRyZXNzO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgbWFjQWRkcmVzczQ4ID0gL14oPzpbMC05YS1mQS1GXXsyfShbLTpcXHNdKSkoWzAtOWEtZkEtRl17Mn1cXDEpezR9KFswLTlhLWZBLUZdezJ9KSQvO1xudmFyIG1hY0FkZHJlc3M0OE5vU2VwYXJhdG9ycyA9IC9eKFswLTlhLWZBLUZdKXsxMn0kLztcbnZhciBtYWNBZGRyZXNzNDhXaXRoRG90cyA9IC9eKFswLTlhLWZBLUZdezR9XFwuKXsyfShbMC05YS1mQS1GXXs0fSkkLztcbnZhciBtYWNBZGRyZXNzNjQgPSAvXig/OlswLTlhLWZBLUZdezJ9KFstOlxcc10pKShbMC05YS1mQS1GXXsyfVxcMSl7Nn0oWzAtOWEtZkEtRl17Mn0pJC87XG52YXIgbWFjQWRkcmVzczY0Tm9TZXBhcmF0b3JzID0gL14oWzAtOWEtZkEtRl0pezE2fSQvO1xudmFyIG1hY0FkZHJlc3M2NFdpdGhEb3RzID0gL14oWzAtOWEtZkEtRl17NH1cXC4pezN9KFswLTlhLWZBLUZdezR9KSQvO1xuXG5mdW5jdGlvbiBpc01BQ0FkZHJlc3Moc3RyLCBvcHRpb25zKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG5cbiAgaWYgKG9wdGlvbnMgIT09IG51bGwgJiYgb3B0aW9ucyAhPT0gdm9pZCAwICYmIG9wdGlvbnMuZXVpKSB7XG4gICAgb3B0aW9ucy5ldWkgPSBTdHJpbmcob3B0aW9ucy5ldWkpO1xuICB9XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBgbm9fY29sb25zYCBUT0RPOiByZW1vdmUgaXQgaW4gdGhlIG5leHQgbWFqb3JcbiAgKi9cblxuXG4gIGlmIChvcHRpb25zICE9PSBudWxsICYmIG9wdGlvbnMgIT09IHZvaWQgMCAmJiBvcHRpb25zLm5vX2NvbG9ucyB8fCBvcHRpb25zICE9PSBudWxsICYmIG9wdGlvbnMgIT09IHZvaWQgMCAmJiBvcHRpb25zLm5vX3NlcGFyYXRvcnMpIHtcbiAgICBpZiAob3B0aW9ucy5ldWkgPT09ICc0OCcpIHtcbiAgICAgIHJldHVybiBtYWNBZGRyZXNzNDhOb1NlcGFyYXRvcnMudGVzdChzdHIpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmV1aSA9PT0gJzY0Jykge1xuICAgICAgcmV0dXJuIG1hY0FkZHJlc3M2NE5vU2VwYXJhdG9ycy50ZXN0KHN0cik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hY0FkZHJlc3M0OE5vU2VwYXJhdG9ycy50ZXN0KHN0cikgfHwgbWFjQWRkcmVzczY0Tm9TZXBhcmF0b3JzLnRlc3Qoc3RyKTtcbiAgfVxuXG4gIGlmICgob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmV1aSkgPT09ICc0OCcpIHtcbiAgICByZXR1cm4gbWFjQWRkcmVzczQ4LnRlc3Qoc3RyKSB8fCBtYWNBZGRyZXNzNDhXaXRoRG90cy50ZXN0KHN0cik7XG4gIH1cblxuICBpZiAoKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5ldWkpID09PSAnNjQnKSB7XG4gICAgcmV0dXJuIG1hY0FkZHJlc3M2NC50ZXN0KHN0cikgfHwgbWFjQWRkcmVzczY0V2l0aERvdHMudGVzdChzdHIpO1xuICB9XG5cbiAgcmV0dXJuIGlzTUFDQWRkcmVzcyhzdHIsIHtcbiAgICBldWk6ICc0OCdcbiAgfSkgfHwgaXNNQUNBZGRyZXNzKHN0ciwge1xuICAgIGV1aTogJzY0J1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNNRDU7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBtZDUgPSAvXlthLWYwLTldezMyfSQvO1xuXG5mdW5jdGlvbiBpc01ENShzdHIpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgcmV0dXJuIG1kNS50ZXN0KHN0cik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzTWFnbmV0VVJJO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgbWFnbmV0VVJJQ29tcG9uZW50ID0gLyg/Ol5tYWduZXQ6XFw/fFtePyZdJil4dCg/OlxcLjEpPz11cm46KD86KD86YWljaHxiaXRwcmludHxidGlofGVkMmt8ZWQya2hhc2h8a3poYXNofG1kNXxzaGExfHRyZWU6dGlnZXIpOlthLXowLTldezMyfSg/OlthLXowLTldezh9KT98YnRtaDoxMjIwW2EtejAtOV17NjR9KSg/OiR8JikvaTtcblxuZnVuY3Rpb24gaXNNYWduZXRVUkkodXJsKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHVybCk7XG5cbiAgaWYgKHVybC5pbmRleE9mKCdtYWduZXQ6PycpICE9PSAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIG1hZ25ldFVSSUNvbXBvbmVudC50ZXN0KHVybCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzTWltZVR5cGU7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qXG4gIENoZWNrcyBpZiB0aGUgcHJvdmlkZWQgc3RyaW5nIG1hdGNoZXMgdG8gYSBjb3JyZWN0IE1lZGlhIHR5cGUgZm9ybWF0IChNSU1FIHR5cGUpXG5cbiAgVGhpcyBmdW5jdGlvbiBvbmx5IGNoZWNrcyBpcyB0aGUgc3RyaW5nIGZvcm1hdCBmb2xsb3dzIHRoZVxuICBldGFibGlzaGVkIHJ1bGVzIGJ5IHRoZSBhY2NvcmRpbmcgUkZDIHNwZWNpZmljYXRpb25zLlxuICBUaGlzIGZ1bmN0aW9uIHN1cHBvcnRzICdjaGFyc2V0JyBpbiB0ZXh0dWFsIG1lZGlhIHR5cGVzXG4gIChodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjY1NykuXG5cbiAgVGhpcyBmdW5jdGlvbiBkb2VzIG5vdCBjaGVjayBhZ2FpbnN0IGFsbCB0aGUgbWVkaWEgdHlwZXMgbGlzdGVkXG4gIGJ5IHRoZSBJQU5BIChodHRwczovL3d3dy5pYW5hLm9yZy9hc3NpZ25tZW50cy9tZWRpYS10eXBlcy9tZWRpYS10eXBlcy54aHRtbClcbiAgYmVjYXVzZSBvZiBsaWdodG5lc3MgcHVycG9zZXMgOiBpdCB3b3VsZCByZXF1aXJlIHRvIGluY2x1ZGVcbiAgYWxsIHRoZXNlIE1JTUUgdHlwZXMgaW4gdGhpcyBsaWJyYWlyeSwgd2hpY2ggd291bGQgd2VpZ2ggaXRcbiAgc2lnbmlmaWNhbnRseS4gVGhpcyBraW5kIG9mIGVmZm9ydCBtYXliZSBpcyBub3Qgd29ydGggZm9yIHRoZSB1c2UgdGhhdFxuICB0aGlzIGZ1bmN0aW9uIGhhcyBpbiB0aGlzIGVudGlyZSBsaWJyYWlyeS5cblxuICBNb3JlIGluZm9ybWF0aW9ucyBpbiB0aGUgUkZDIHNwZWNpZmljYXRpb25zIDpcbiAgLSBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMjA0NVxuICAtIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMyMDQ2XG4gIC0gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzcyMzEjc2VjdGlvbi0zLjEuMS4xXG4gIC0gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzcyMzEjc2VjdGlvbi0zLjEuMS41XG4qL1xuLy8gTWF0Y2ggc2ltcGxlIE1JTUUgdHlwZXNcbi8vIE5CIDpcbi8vICAgU3VidHlwZSBsZW5ndGggbXVzdCBub3QgZXhjZWVkIDEwMCBjaGFyYWN0ZXJzLlxuLy8gICBUaGlzIHJ1bGUgZG9lcyBub3QgY29tcGx5IHRvIHRoZSBSRkMgc3BlY3MgKHdoYXQgaXMgdGhlIG1heCBsZW5ndGggPykuXG52YXIgbWltZVR5cGVTaW1wbGUgPSAvXihhcHBsaWNhdGlvbnxhdWRpb3xmb250fGltYWdlfG1lc3NhZ2V8bW9kZWx8bXVsdGlwYXJ0fHRleHR8dmlkZW8pXFwvW2EtekEtWjAtOVxcLlxcLVxcK19dezEsMTAwfSQvaTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBtYXgtbGVuXG4vLyBIYW5kbGUgXCJjaGFyc2V0XCIgaW4gXCJ0ZXh0LypcIlxuXG52YXIgbWltZVR5cGVUZXh0ID0gL150ZXh0XFwvW2EtekEtWjAtOVxcLlxcLVxcK117MSwxMDB9O1xccz9jaGFyc2V0PShcIlthLXpBLVowLTlcXC5cXC1cXCtcXHNdezAsNzB9XCJ8W2EtekEtWjAtOVxcLlxcLVxcK117MCw3MH0pKFxccz9cXChbYS16QS1aMC05XFwuXFwtXFwrXFxzXXsxLDIwfVxcKSk/JC9pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG1heC1sZW5cbi8vIEhhbmRsZSBcImJvdW5kYXJ5XCIgaW4gXCJtdWx0aXBhcnQvKlwiXG5cbnZhciBtaW1lVHlwZU11bHRpcGFydCA9IC9ebXVsdGlwYXJ0XFwvW2EtekEtWjAtOVxcLlxcLVxcK117MSwxMDB9KDtcXHM/KGJvdW5kYXJ5fGNoYXJzZXQpPShcIlthLXpBLVowLTlcXC5cXC1cXCtcXHNdezAsNzB9XCJ8W2EtekEtWjAtOVxcLlxcLVxcK117MCw3MH0pKFxccz9cXChbYS16QS1aMC05XFwuXFwtXFwrXFxzXXsxLDIwfVxcKSk/KXswLDJ9JC9pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG1heC1sZW5cblxuZnVuY3Rpb24gaXNNaW1lVHlwZShzdHIpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgcmV0dXJuIG1pbWVUeXBlU2ltcGxlLnRlc3Qoc3RyKSB8fCBtaW1lVHlwZVRleHQudGVzdChzdHIpIHx8IG1pbWVUeXBlTXVsdGlwYXJ0LnRlc3Qoc3RyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNNb2JpbGVQaG9uZTtcbmV4cG9ydHMubG9jYWxlcyA9IHZvaWQgMDtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xudmFyIHBob25lcyA9IHtcbiAgJ2FtLUFNJzogL14oXFwrPzM3NHwwKSgoMTB8Wzl8N11bMC05XSlcXGR7Nn0kfFsyLTRdXFxkezd9JCkvLFxuICAnYXItQUUnOiAvXigoXFwrPzk3MSl8MCk/NVswMjQ1NjhdXFxkezd9JC8sXG4gICdhci1CSCc6IC9eKFxcKz85NzMpPygzfDYpXFxkezd9JC8sXG4gICdhci1EWic6IC9eKFxcKz8yMTN8MCkoNXw2fDcpXFxkezh9JC8sXG4gICdhci1MQic6IC9eKFxcKz85NjEpPygoM3w4MSlcXGR7Nn18N1xcZHs3fSkkLyxcbiAgJ2FyLUVHJzogL14oKFxcKz8yMCl8MCk/MVswMTI1XVxcZHs4fSQvLFxuICAnYXItSVEnOiAvXihcXCs/OTY0fDApPzdbMC05XVxcZHs4fSQvLFxuICAnYXItSk8nOiAvXihcXCs/OTYyfDApPzdbNzg5XVxcZHs3fSQvLFxuICAnYXItS1cnOiAvXihcXCs/OTY1KShbNTY5XVxcZHs3fXw0MVxcZHs2fSkkLyxcbiAgJ2FyLUxZJzogL14oKFxcKz8yMTgpfDApPyg5WzEtNl1cXGR7N318WzEtOF1cXGR7Nyw5fSkkLyxcbiAgJ2FyLU1BJzogL14oPzooPzpcXCt8MDApMjEyfDApWzUtN11cXGR7OH0kLyxcbiAgJ2FyLU9NJzogL14oKFxcK3wwMCk5NjgpPyg5WzEtOV0pXFxkezZ9JC8sXG4gICdhci1QUyc6IC9eKFxcKz85NzB8MCk1WzZ8OV0oXFxkezd9KSQvLFxuICAnYXItU0EnOiAvXighPyhcXCs/OTY2KXwwKT81XFxkezh9JC8sXG4gICdhci1TWSc6IC9eKCE/KFxcKz85NjMpfDApPzlcXGR7OH0kLyxcbiAgJ2FyLVROJzogL14oXFwrPzIxNik/WzI0NTldXFxkezd9JC8sXG4gICdhei1BWic6IC9eKFxcKzk5NHwwKSgxMHw1WzAxNV18N1swN118OTkpXFxkezd9JC8sXG4gICdicy1CQSc6IC9eKCgoKFxcK3wwMCkzODc2KXwwNikpKCgoWzAtM118WzUtNl0pXFxkezZ9KXwoNFxcZHs3fSkpJC8sXG4gICdiZS1CWSc6IC9eKFxcKz8zNzUpPygyNHwyNXwyOXwzM3w0NClcXGR7N30kLyxcbiAgJ2JnLUJHJzogL14oXFwrPzM1OXwwKT84Wzc4OV1cXGR7N30kLyxcbiAgJ2JuLUJEJzogL14oXFwrPzg4MHwwKTFbMTM0NTY3ODldWzAtOV17OH0kLyxcbiAgJ2NhLUFEJzogL14oXFwrMzc2KT9bMzQ2XVxcZHs1fSQvLFxuICAnY3MtQ1onOiAvXihcXCs/NDIwKT8gP1sxLTldWzAtOV17Mn0gP1swLTldezN9ID9bMC05XXszfSQvLFxuICAnZGEtREsnOiAvXihcXCs/NDUpP1xccz9cXGR7Mn1cXHM/XFxkezJ9XFxzP1xcZHsyfVxccz9cXGR7Mn0kLyxcbiAgJ2RlLURFJzogL14oKFxcKzQ5fDApMSkoNVswLTI1LTldXFxkfDYoWzIzXXwwXFxkPyl8NyhbMC01Ny05XXw2XFxkKSlcXGR7Nyw5fSQvLFxuICAnZGUtQVQnOiAvXihcXCs0M3wwKVxcZHsxLDR9XFxkezMsMTJ9JC8sXG4gICdkZS1DSCc6IC9eKFxcKzQxfDApKFsxLTldKVxcZHsxLDl9JC8sXG4gICdkZS1MVSc6IC9eKFxcKzM1Mik/KCg2XFxkMSlcXGR7Nn0pJC8sXG4gICdkdi1NVic6IC9eKFxcKz85NjApPyg3WzItOV18OVsxLTldKVxcZHs1fSQvLFxuICAnZWwtR1InOiAvXihcXCs/MzB8MCk/Nig4WzUtOV18OSg/IVsyNl0pWzAtOV0pXFxkezd9JC8sXG4gICdlbC1DWSc6IC9eKFxcKz8zNTc/KT8oOSg5fDYpXFxkezZ9KSQvLFxuICAnZW4tQUknOiAvXihcXCs/MXwwKTI2NCg/OjIoMzV8OTIpfDQoPzo2WzEtMl18NzZ8OTcpfDUoPzozWzYtOV18OFsxLTRdKXw3KD86Mig0fDkpfDcyKSlcXGR7NH0kLyxcbiAgJ2VuLUFVJzogL14oXFwrPzYxfDApNFxcZHs4fSQvLFxuICAnZW4tQUcnOiAvXig/OlxcKzF8MSkyNjgoPzo0NjR8Nyg/OjFbMy05XXxbMjhdXFxkfDNbMDI0Nl18NjR8N1swLTY4OV0pKVxcZHs0fSQvLFxuICAnZW4tQk0nOiAvXihcXCs/MSk/NDQxKCgoM3w3KVxcZHs2fSQpfCg1WzAtM11bMC05XVxcZHs0fSQpfCg1OVxcZHs1fSQpKS8sXG4gICdlbi1CUyc6IC9eKFxcKz8xWy1cXHNdP3wwKT9cXCg/MjQyXFwpP1stXFxzXT9cXGR7M31bLVxcc10/XFxkezR9JC8sXG4gICdlbi1HQic6IC9eKFxcKz80NHwwKTdcXGR7OX0kLyxcbiAgJ2VuLUdHJzogL14oXFwrPzQ0fDApMTQ4MVxcZHs2fSQvLFxuICAnZW4tR0gnOiAvXihcXCsyMzN8MCkoMjB8NTB8MjR8NTR8Mjd8NTd8MjZ8NTZ8MjN8Mjh8NTV8NTkpXFxkezd9JC8sXG4gICdlbi1HWSc6IC9eKFxcKzU5MnwwKTZcXGR7Nn0kLyxcbiAgJ2VuLUhLJzogL14oXFwrPzg1MlstXFxzXT8pP1s0NTY3ODldXFxkezN9Wy1cXHNdP1xcZHs0fSQvLFxuICAnZW4tTU8nOiAvXihcXCs/ODUzWy1cXHNdPyk/WzZdXFxkezN9Wy1cXHNdP1xcZHs0fSQvLFxuICAnZW4tSUUnOiAvXihcXCs/MzUzfDApOFszNTY3ODldXFxkezd9JC8sXG4gICdlbi1JTic6IC9eKFxcKz85MXwwKT9bNjc4OV1cXGR7OX0kLyxcbiAgJ2VuLUpNJzogL14oXFwrPzg3Nik/XFxkezd9JC8sXG4gICdlbi1LRSc6IC9eKFxcKz8yNTR8MCkoN3wxKVxcZHs4fSQvLFxuICAnZW4tU1MnOiAvXihcXCs/MjExfDApKDlbMTI1N10pXFxkezd9JC8sXG4gICdlbi1LSSc6IC9eKChcXCs2ODZ8Njg2KT8pPyggKT8oKDZ8NykoMnwzfDgpWzAtOV17Nn0pJC8sXG4gICdlbi1LTic6IC9eKD86XFwrMXwxKTg2OSg/OjQ2XFxkfDQ4Wzg5XXw1NVs2LThdfDY2XFxkfDc2WzAyLTddKVxcZHs0fSQvLFxuICAnZW4tTFMnOiAvXihcXCs/MjY2KSgyMnwyOHw1N3w1OHw1OXwyN3w1MilcXGR7Nn0kLyxcbiAgJ2VuLU1UJzogL14oXFwrPzM1NnwwKT8oOTl8Nzl8Nzd8MjF8Mjd8MjJ8MjUpWzAtOV17Nn0kLyxcbiAgJ2VuLU1VJzogL14oXFwrPzIzMHwwKT9cXGR7OH0kLyxcbiAgJ2VuLU5BJzogL14oXFwrPzI2NHwwKSg2fDgpXFxkezd9JC8sXG4gICdlbi1ORyc6IC9eKFxcKz8yMzR8MCk/Wzc4OV1cXGR7OX0kLyxcbiAgJ2VuLU5aJzogL14oXFwrPzY0fDApWzI4XVxcZHs3LDl9JC8sXG4gICdlbi1QRyc6IC9eKFxcKz82NzV8MCk/KDdcXGR8OFsxOF0pXFxkezZ9JC8sXG4gICdlbi1QSyc6IC9eKCgwMHxcXCspPzkyfDApM1swLTZdXFxkezh9JC8sXG4gICdlbi1QSCc6IC9eKDA5fFxcKzYzOSlcXGR7OX0kLyxcbiAgJ2VuLVJXJzogL14oXFwrPzI1MHwwKT9bN11cXGR7OH0kLyxcbiAgJ2VuLVNHJzogL14oXFwrNjUpP1szNjg5XVxcZHs3fSQvLFxuICAnZW4tU0wnOiAvXihcXCs/MjMyfDApXFxkezh9JC8sXG4gICdlbi1UWic6IC9eKFxcKz8yNTV8MCk/WzY3XVxcZHs4fSQvLFxuICAnZW4tVUcnOiAvXihcXCs/MjU2fDApP1s3XVxcZHs4fSQvLFxuICAnZW4tVVMnOiAvXigoXFwrMXwxKT8oIHwtKT8pPyhcXChbMi05XVswLTldezJ9XFwpfFsyLTldWzAtOV17Mn0pKCB8LSk/KFsyLTldWzAtOV17Mn0oIHwtKT9bMC05XXs0fSkkLyxcbiAgJ2VuLVpBJzogL14oXFwrPzI3fDApXFxkezl9JC8sXG4gICdlbi1aTSc6IC9eKFxcKz8yNik/MDlbNTY3XVxcZHs3fSQvLFxuICAnZW4tWlcnOiAvXihcXCsyNjMpWzAtOV17OX0kLyxcbiAgJ2VuLUJXJzogL14oXFwrPzI2Nyk/KDdbMS04XXsxfSlcXGR7Nn0kLyxcbiAgJ2VzLUFSJzogL15cXCs/NTQ5KDExfFsyMzY4XVxcZClcXGR7OH0kLyxcbiAgJ2VzLUJPJzogL14oXFwrPzU5MSk/KDZ8NylcXGR7N30kLyxcbiAgJ2VzLUNPJzogL14oXFwrPzU3KT8zKDAoMHwxfDJ8NHw1KXwxXFxkfDJbMC00XXw1KDB8MSkpXFxkezd9JC8sXG4gICdlcy1DTCc6IC9eKFxcKz81NnwwKVsyLTldXFxkezF9XFxkezd9JC8sXG4gICdlcy1DUic6IC9eKFxcKzUwNik/WzItOF1cXGR7N30kLyxcbiAgJ2VzLUNVJzogL14oXFwrNTN8MDA1Myk/NVxcZHs3fS8sXG4gICdlcy1ETyc6IC9eKFxcKz8xKT84WzAyNF05XFxkezd9JC8sXG4gICdlcy1ITic6IC9eKFxcKz81MDQpP1s5fDh8M3wyXVxcZHs3fSQvLFxuICAnZXMtRUMnOiAvXihcXCs/NTkzfDApKFsyLTddfDlbMi05XSlcXGR7N30kLyxcbiAgJ2VzLUVTJzogL14oXFwrPzM0KT9bNnw3XVxcZHs4fSQvLFxuICAnZXMtUEUnOiAvXihcXCs/NTEpPzlcXGR7OH0kLyxcbiAgJ2VzLU1YJzogL14oXFwrPzUyKT8oMXwwMSk/XFxkezEwLDExfSQvLFxuICAnZXMtTkknOiAvXihcXCs/NTA1KVxcZHs3LDh9JC8sXG4gICdlcy1QQSc6IC9eKFxcKz81MDcpXFxkezcsOH0kLyxcbiAgJ2VzLVBZJzogL14oXFwrPzU5NXwwKTlbOTg3Nl1cXGR7N30kLyxcbiAgJ2VzLVNWJzogL14oXFwrPzUwMyk/WzY3XVxcZHs3fSQvLFxuICAnZXMtVVknOiAvXihcXCs1OTh8MCk5WzEtOV1bXFxkXXs2fSQvLFxuICAnZXMtVkUnOiAvXihcXCs/NTgpPygyfDQpXFxkezl9JC8sXG4gICdldC1FRSc6IC9eKFxcKz8zNzIpP1xccz8oNXw4WzEtNF0pXFxzPyhbMC05XVxccz8pezYsN30kLyxcbiAgJ2ZhLUlSJzogL14oXFwrPzk4W1xcLVxcc10/fDApOVswLTM5XVxcZFtcXC1cXHNdP1xcZHszfVtcXC1cXHNdP1xcZHs0fSQvLFxuICAnZmktRkknOiAvXihcXCs/MzU4fDApXFxzPyg0WzAtNl18NTApXFxzPyhcXGRcXHM/KXs0LDh9JC8sXG4gICdmai1GSic6IC9eKFxcKz82NzkpP1xccz9cXGR7M31cXHM/XFxkezR9JC8sXG4gICdmby1GTyc6IC9eKFxcKz8yOTgpP1xccz9cXGR7Mn1cXHM/XFxkezJ9XFxzP1xcZHsyfSQvLFxuICAnZnItQkYnOiAvXihcXCsyMjZ8MClbNjddXFxkezd9JC8sXG4gICdmci1CSic6IC9eKFxcKzIyOSlcXGR7OH0kLyxcbiAgJ2ZyLUNEJzogL14oXFwrPzI0M3wwKT8oOHw5KVxcZHs4fSQvLFxuICAnZnItQ00nOiAvXihcXCs/MjM3KTZbMC05XXs4fSQvLFxuICAnZnItRlInOiAvXihcXCs/MzN8MClbNjddXFxkezh9JC8sXG4gICdmci1HRic6IC9eKFxcKz81OTR8MHwwMDU5NClbNjddXFxkezh9JC8sXG4gICdmci1HUCc6IC9eKFxcKz81OTB8MHwwMDU5MClbNjddXFxkezh9JC8sXG4gICdmci1NUSc6IC9eKFxcKz81OTZ8MHwwMDU5NilbNjddXFxkezh9JC8sXG4gICdmci1QRic6IC9eKFxcKz82ODkpPzhbNzg5XVxcZHs2fSQvLFxuICAnZnItUkUnOiAvXihcXCs/MjYyfDB8MDAyNjIpWzY3XVxcZHs4fSQvLFxuICAnaGUtSUwnOiAvXihcXCs5NzJ8MCkoWzIzNDg5XXw1WzAxMjM0NTY4OV18NzcpWzEtOV1cXGR7Nn0kLyxcbiAgJ2h1LUhVJzogL14oXFwrPzM2fDA2KSgyMHwzMHwzMXw1MHw3MClcXGR7N30kLyxcbiAgJ2lkLUlEJzogL14oXFwrPzYyfDApOCgxWzEyMzQ1Njc4OV18MlsxMjM4XXwzWzEyMzhdfDVbMTIzNTY3ODldfDdbNzhdfDlbNTY3ODldfDhbMTIzNDU2Nzg5XSkoW1xccz98XFxkXXs1LDExfSkkLyxcbiAgJ2lyLUlSJzogL14oXFwrOTh8MCk/OVxcZHs5fSQvLFxuICAnaXQtSVQnOiAvXihcXCs/MzkpP1xccz8zXFxkezJ9ID9cXGR7Niw3fSQvLFxuICAnaXQtU00nOiAvXigoXFwrMzc4KXwoMDU0OSl8KFxcKzM5MDU0OSl8KFxcKzM3ODA1NDkpKT82XFxkezUsOX0kLyxcbiAgJ2phLUpQJzogL14oXFwrODFbIFxcLV0/KFxcKDBcXCkpP3wwKVs2Nzg5XTBbIFxcLV0/XFxkezR9WyBcXC1dP1xcZHs0fSQvLFxuICAna2EtR0UnOiAvXihcXCs/OTk1KT8oNzlcXGR7N318NVxcZHs4fSkkLyxcbiAgJ2trLUtaJzogL14oXFwrPzd8OCk/N1xcZHs5fSQvLFxuICAna2wtR0wnOiAvXihcXCs/Mjk5KT9cXHM/XFxkezJ9XFxzP1xcZHsyfVxccz9cXGR7Mn0kLyxcbiAgJ2tvLUtSJzogL14oKFxcKz84MilbIFxcLV0/KT8wPzEoWzB8MXw2fDd8OHw5XXsxfSlbIFxcLV0/XFxkezMsNH1bIFxcLV0/XFxkezR9JC8sXG4gICdreS1LRyc6IC9eKFxcKz83XFxzP1xcKz83fDApXFxzP1xcZHsyfVxccz9cXGR7M31cXHM/XFxkezR9JC8sXG4gICdsdC1MVCc6IC9eKFxcKzM3MHw4KVxcZHs4fSQvLFxuICAnbHYtTFYnOiAvXihcXCs/MzcxKTJcXGR7N30kLyxcbiAgJ21nLU1HJzogL14oKFxcKz8yNjF8MCkoMnwzKVxcZCk/XFxkezd9JC8sXG4gICdtbi1NTic6IC9eKFxcK3wwMHwwMTEpPzk3Nig3N3w4MXw4OHw5MXw5NHw5NXw5Nnw5OSlcXGR7Nn0kLyxcbiAgJ215LU1NJzogL14oXFwrPzk1OXwwOXw5KSgyWzUtN118M1sxLTJdfDRbMC01XXw2WzYtOV18N1s1LTldfDlbNi05XSlbMC05XXs3fSQvLFxuICAnbXMtTVknOiAvXihcXCs/NjB8MCkxKChbMDE0NV0oLXxcXHMpP1xcZHs3LDh9KXwoWzIzNi05XSgtfFxccyk/XFxkezd9KSkkLyxcbiAgJ216LU1aJzogL14oXFwrPzI1OCk/OFsyMzQ1NjddXFxkezd9JC8sXG4gICduYi1OTyc6IC9eKFxcKz80Nyk/WzQ5XVxcZHs3fSQvLFxuICAnbmUtTlAnOiAvXihcXCs/OTc3KT85Wzc4XVxcZHs4fSQvLFxuICAnbmwtQkUnOiAvXihcXCs/MzJ8MCk0XFxkezh9JC8sXG4gICdubC1OTCc6IC9eKCgoXFwrfDAwKT8zMVxcKDBcXCkpfCgoXFwrfDAwKT8zMSl8MCk2ezF9XFxkezh9JC8sXG4gICdubC1BVyc6IC9eKFxcKyk/Mjk3KDU2fDU5fDY0fDczfDc0fDk5KVxcZHs1fSQvLFxuICAnbm4tTk8nOiAvXihcXCs/NDcpP1s0OV1cXGR7N30kLyxcbiAgJ3BsLVBMJzogL14oXFwrPzQ4KT8gP1s1LThdXFxkID9cXGR7M30gP1xcZHsyfSA/XFxkezJ9JC8sXG4gICdwdC1CUic6IC9eKChcXCs/NTVcXCA/WzEtOV17Mn1cXCA/KXwoXFwrPzU1XFwgP1xcKFsxLTldezJ9XFwpXFwgPyl8KDBbMS05XXsyfVxcID8pfChcXChbMS05XXsyfVxcKVxcID8pfChbMS05XXsyfVxcID8pKSgoXFxkezR9XFwtP1xcZHs0fSl8KDlbMS05XXsxfVxcZHszfVxcLT9cXGR7NH0pKSQvLFxuICAncHQtUFQnOiAvXihcXCs/MzUxKT85WzEyMzZdXFxkezd9JC8sXG4gICdwdC1BTyc6IC9eKFxcKzI0NClcXGR7OX0kLyxcbiAgJ3JvLU1EJzogL14oXFwrPzM3M3wwKSgoNigwfDF8Mnw2fDd8OHw5KSl8KDcoNnw3fDh8OSkpKVxcZHs2fSQvLFxuICAncm8tUk8nOiAvXihcXCs/NDB8MClcXHM/N1xcZHsyfShcXC98XFxzfFxcLnwtKT9cXGR7M30oXFxzfFxcLnwtKT9cXGR7M30kLyxcbiAgJ3J1LVJVJzogL14oXFwrPzd8OCk/OVxcZHs5fSQvLFxuICAnc2ktTEsnOiAvXig/OjB8OTR8XFwrOTQpPyg3KDB8MXwyfDR8NXw2fDd8OCkoIHwtKT8pXFxkezd9JC8sXG4gICdzbC1TSSc6IC9eKFxcKzM4Nlxccz98MCkoXFxkezF9XFxzP1xcZHszfVxccz9cXGR7Mn1cXHM/XFxkezJ9fFxcZHsyfVxccz9cXGR7M31cXHM/XFxkezN9KSQvLFxuICAnc2stU0snOiAvXihcXCs/NDIxKT8gP1sxLTldWzAtOV17Mn0gP1swLTldezN9ID9bMC05XXszfSQvLFxuICAnc3EtQUwnOiAvXihcXCszNTV8MCk2Wzc4OV1cXGR7Nn0kLyxcbiAgJ3NyLVJTJzogL14oXFwrMzgxNnwwNilbLSBcXGRdezUsOX0kLyxcbiAgJ3N2LVNFJzogL14oXFwrPzQ2fDApW1xcc1xcLV0/N1tcXHNcXC1dP1swMjM2OV0oW1xcc1xcLV0/XFxkKXs3fSQvLFxuICAndGctVEonOiAvXihcXCs/OTkyKT9bNV1bNV1cXGR7N30kLyxcbiAgJ3RoLVRIJzogL14oXFwrNjZ8NjZ8MClcXGR7OX0kLyxcbiAgJ3RyLVRSJzogL14oXFwrPzkwfDApPzVcXGR7OX0kLyxcbiAgJ3RrLVRNJzogL14oXFwrOTkzfDk5M3w4KVxcZHs4fSQvLFxuICAndWstVUEnOiAvXihcXCs/Mzh8OCk/MFxcZHs5fSQvLFxuICAndXotVVonOiAvXihcXCs/OTk4KT8oNlsxMjUtNzldfDdbMS02OV18ODh8OVxcZClcXGR7N30kLyxcbiAgJ3ZpLVZOJzogL14oKFxcKz84NCl8MCkoKDMoWzItOV0pKXwoNShbMjU2ODldKSl8KDcoWzB8Ni05XSkpfCg4KFsxLTldKSl8KDkoWzAtOV0pKSkoWzAtOV17N30pJC8sXG4gICd6aC1DTic6IC9eKChcXCt8MDApODYpPygxWzMtOV18OVsyOF0pXFxkezl9JC8sXG4gICd6aC1UVyc6IC9eKFxcKz84ODZcXC0/fDApPzlcXGR7OH0kLyxcbiAgJ2R6LUJUJzogL14oXFwrPzk3NXwwKT8oMTd8MTZ8Nzd8MDIpXFxkezZ9JC8sXG4gICdhci1ZRSc6IC9eKCgoXFwrfDAwKTk2Nzd8MD83KVswMTM3XVxcZHs3fXwoKFxcK3wwMCk5Njd8MClbMS03XVxcZHs2fSkkLyxcbiAgJ2FyLUVIJzogL14oXFwrPzIxMnwwKVtcXHNcXC1dPyg1Mjg4fDUyODkpW1xcc1xcLV0/XFxkezV9JC8sXG4gICdmYS1BRic6IC9eKFxcKzkzfDApPygyezF9WzAtOF17MX18WzMtNV17MX1bMC00XXsxfSkoXFxkezd9KSQvXG59O1xuLyogZXNsaW50LWVuYWJsZSBtYXgtbGVuICovXG4vLyBhbGlhc2VzXG5cbnBob25lc1snZW4tQ0EnXSA9IHBob25lc1snZW4tVVMnXTtcbnBob25lc1snZnItQ0EnXSA9IHBob25lc1snZW4tQ0EnXTtcbnBob25lc1snZnItQkUnXSA9IHBob25lc1snbmwtQkUnXTtcbnBob25lc1snemgtSEsnXSA9IHBob25lc1snZW4tSEsnXTtcbnBob25lc1snemgtTU8nXSA9IHBob25lc1snZW4tTU8nXTtcbnBob25lc1snZ2EtSUUnXSA9IHBob25lc1snZW4tSUUnXTtcbnBob25lc1snZnItQ0gnXSA9IHBob25lc1snZGUtQ0gnXTtcbnBob25lc1snaXQtQ0gnXSA9IHBob25lc1snZnItQ0gnXTtcblxuZnVuY3Rpb24gaXNNb2JpbGVQaG9uZShzdHIsIGxvY2FsZSwgb3B0aW9ucykge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuXG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMuc3RyaWN0TW9kZSAmJiAhc3RyLnN0YXJ0c1dpdGgoJysnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KGxvY2FsZSkpIHtcbiAgICByZXR1cm4gbG9jYWxlLnNvbWUoZnVuY3Rpb24gKGtleSkge1xuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2dvdHdhcmxvc3QvaXN0YW5idWwvYmxvYi9tYXN0ZXIvaWdub3JpbmctY29kZS1mb3ItY292ZXJhZ2UubWQjaWdub3JpbmctY29kZS1mb3ItY292ZXJhZ2UtcHVycG9zZXNcbiAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBlbHNlXG4gICAgICBpZiAocGhvbmVzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgdmFyIHBob25lID0gcGhvbmVzW2tleV07XG5cbiAgICAgICAgaWYgKHBob25lLnRlc3Qoc3RyKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmIChsb2NhbGUgaW4gcGhvbmVzKSB7XG4gICAgcmV0dXJuIHBob25lc1tsb2NhbGVdLnRlc3Qoc3RyKTsgLy8gYWxpYXMgZmFsc2V5IGxvY2FsZSBhcyAnYW55J1xuICB9IGVsc2UgaWYgKCFsb2NhbGUgfHwgbG9jYWxlID09PSAnYW55Jykge1xuICAgIGZvciAodmFyIGtleSBpbiBwaG9uZXMpIHtcbiAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBlbHNlXG4gICAgICBpZiAocGhvbmVzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgdmFyIHBob25lID0gcGhvbmVzW2tleV07XG5cbiAgICAgICAgaWYgKHBob25lLnRlc3Qoc3RyKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBsb2NhbGUgJ1wiLmNvbmNhdChsb2NhbGUsIFwiJ1wiKSk7XG59XG5cbnZhciBsb2NhbGVzID0gT2JqZWN0LmtleXMocGhvbmVzKTtcbmV4cG9ydHMubG9jYWxlcyA9IGxvY2FsZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc01vbmdvSWQ7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbnZhciBfaXNIZXhhZGVjaW1hbCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vaXNIZXhhZGVjaW1hbFwiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIGlzTW9uZ29JZChzdHIpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgcmV0dXJuICgwLCBfaXNIZXhhZGVjaW1hbC5kZWZhdWx0KShzdHIpICYmIHN0ci5sZW5ndGggPT09IDI0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc011bHRpYnl0ZTtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyogZXNsaW50LWRpc2FibGUgbm8tY29udHJvbC1yZWdleCAqL1xudmFyIG11bHRpYnl0ZSA9IC9bXlxceDAwLVxceDdGXS87XG4vKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnRyb2wtcmVnZXggKi9cblxuZnVuY3Rpb24gaXNNdWx0aWJ5dGUoc3RyKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIHJldHVybiBtdWx0aWJ5dGUudGVzdChzdHIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc051bWVyaWM7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbnZhciBfYWxwaGEgPSByZXF1aXJlKFwiLi9hbHBoYVwiKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIG51bWVyaWNOb1N5bWJvbHMgPSAvXlswLTldKyQvO1xuXG5mdW5jdGlvbiBpc051bWVyaWMoc3RyLCBvcHRpb25zKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG5cbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5ub19zeW1ib2xzKSB7XG4gICAgcmV0dXJuIG51bWVyaWNOb1N5bWJvbHMudGVzdChzdHIpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBSZWdFeHAoXCJeWystXT8oWzAtOV0qW1wiLmNvbmNhdCgob3B0aW9ucyB8fCB7fSkubG9jYWxlID8gX2FscGhhLmRlY2ltYWxbb3B0aW9ucy5sb2NhbGVdIDogJy4nLCBcIl0pP1swLTldKyRcIikpLnRlc3Qoc3RyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNPY3RhbDtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIG9jdGFsID0gL14oMG8pP1swLTddKyQvaTtcblxuZnVuY3Rpb24gaXNPY3RhbChzdHIpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgcmV0dXJuIG9jdGFsLnRlc3Qoc3RyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNQYXNzcG9ydE51bWJlcjtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBSZWZlcmVuY2U6XG4gKiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvIC0tIFdpa2lwZWRpYVxuICogaHR0cHM6Ly9kb2NzLm1pY3Jvc29mdC5jb20vZW4tdXMvbWljcm9zb2Z0LTM2NS9jb21wbGlhbmNlL2V1LXBhc3Nwb3J0LW51bWJlciAtLSBFVSBQYXNzcG9ydCBOdW1iZXJcbiAqIGh0dHBzOi8vY291bnRyeWNvZGUub3JnLyAtLSBDb3VudHJ5IENvZGVzXG4gKi9cbnZhciBwYXNzcG9ydFJlZ2V4QnlDb3VudHJ5Q29kZSA9IHtcbiAgQU06IC9eW0EtWl17Mn1cXGR7N30kLyxcbiAgLy8gQVJNRU5JQVxuICBBUjogL15bQS1aXXszfVxcZHs2fSQvLFxuICAvLyBBUkdFTlRJTkFcbiAgQVQ6IC9eW0EtWl1cXGR7N30kLyxcbiAgLy8gQVVTVFJJQVxuICBBVTogL15bQS1aXVxcZHs3fSQvLFxuICAvLyBBVVNUUkFMSUFcbiAgQVo6IC9eW0EtWl17MiwzfVxcZHs3LDh9JC8sXG4gIC8vIEFaRVJCQUlKQU5cbiAgQkU6IC9eW0EtWl17Mn1cXGR7Nn0kLyxcbiAgLy8gQkVMR0lVTVxuICBCRzogL15cXGR7OX0kLyxcbiAgLy8gQlVMR0FSSUFcbiAgQlI6IC9eW0EtWl17Mn1cXGR7Nn0kLyxcbiAgLy8gQlJBWklMXG4gIEJZOiAvXltBLVpdezJ9XFxkezd9JC8sXG4gIC8vIEJFTEFSVVNcbiAgQ0E6IC9eW0EtWl17Mn1cXGR7Nn0kLyxcbiAgLy8gQ0FOQURBXG4gIENIOiAvXltBLVpdXFxkezd9JC8sXG4gIC8vIFNXSVRaRVJMQU5EXG4gIENOOiAvXkdcXGR7OH0kfF5FKD8hW0lPXSlbQS1aMC05XVxcZHs3fSQvLFxuICAvLyBDSElOQSBbRz1PcmRpbmFyeSwgRT1FbGVjdHJvbmljXSBmb2xsb3dlZCBieSA4LWRpZ2l0cywgb3IgRSBmb2xsb3dlZCBieSBhbnkgVVBQRVJDQVNFIGxldHRlciAoZXhjZXB0IEkgYW5kIE8pIGZvbGxvd2VkIGJ5IDcgZGlnaXRzXG4gIENZOiAvXltBLVpdKFxcZHs2fXxcXGR7OH0pJC8sXG4gIC8vIENZUFJVU1xuICBDWjogL15cXGR7OH0kLyxcbiAgLy8gQ1pFQ0ggUkVQVUJMSUNcbiAgREU6IC9eW0NGR0hKS0xNTlBSVFZXWFlaMC05XXs5fSQvLFxuICAvLyBHRVJNQU5ZXG4gIERLOiAvXlxcZHs5fSQvLFxuICAvLyBERU5NQVJLXG4gIERaOiAvXlxcZHs5fSQvLFxuICAvLyBBTEdFUklBXG4gIEVFOiAvXihbQS1aXVxcZHs3fXxbQS1aXXsyfVxcZHs3fSkkLyxcbiAgLy8gRVNUT05JQSAoSyBmb2xsb3dlZCBieSA3LWRpZ2l0cyksIGUtcGFzc3BvcnRzIGhhdmUgMiBVUFBFUkNBU0UgZm9sbG93ZWQgYnkgNyBkaWdpdHNcbiAgRVM6IC9eW0EtWjAtOV17Mn0oW0EtWjAtOV0/KVxcZHs2fSQvLFxuICAvLyBTUEFJTlxuICBGSTogL15bQS1aXXsyfVxcZHs3fSQvLFxuICAvLyBGSU5MQU5EXG4gIEZSOiAvXlxcZHsyfVtBLVpdezJ9XFxkezV9JC8sXG4gIC8vIEZSQU5DRVxuICBHQjogL15cXGR7OX0kLyxcbiAgLy8gVU5JVEVEIEtJTkdET01cbiAgR1I6IC9eW0EtWl17Mn1cXGR7N30kLyxcbiAgLy8gR1JFRUNFXG4gIEhSOiAvXlxcZHs5fSQvLFxuICAvLyBDUk9BVElBXG4gIEhVOiAvXltBLVpdezJ9KFxcZHs2fXxcXGR7N30pJC8sXG4gIC8vIEhVTkdBUllcbiAgSUU6IC9eW0EtWjAtOV17Mn1cXGR7N30kLyxcbiAgLy8gSVJFTEFORFxuICBJTjogL15bQS1aXXsxfS0/XFxkezd9JC8sXG4gIC8vIElORElBXG4gIElEOiAvXltBLUNdXFxkezd9JC8sXG4gIC8vIElORE9ORVNJQVxuICBJUjogL15bQS1aXVxcZHs4fSQvLFxuICAvLyBJUkFOXG4gIElTOiAvXihBKVxcZHs3fSQvLFxuICAvLyBJQ0VMQU5EXG4gIElUOiAvXltBLVowLTldezJ9XFxkezd9JC8sXG4gIC8vIElUQUxZXG4gIEpNOiAvXltBYV1cXGR7N30kLyxcbiAgLy8gSkFNQUlDQVxuICBKUDogL15bQS1aXXsyfVxcZHs3fSQvLFxuICAvLyBKQVBBTlxuICBLUjogL15bTVNdXFxkezh9JC8sXG4gIC8vIFNPVVRIIEtPUkVBLCBSRVBVQkxJQyBPRiBLT1JFQSwgW1M9UFMgUGFzc3BvcnRzLCBNPVBNIFBhc3Nwb3J0c11cbiAgS1o6IC9eW2EtekEtWl1cXGR7N30kLyxcbiAgLy8gS0FaQUtIU1RBTlxuICBMSTogL15bYS16QS1aXVxcZHs1fSQvLFxuICAvLyBMSUVDSFRFTlNURUlOXG4gIExUOiAvXltBLVowLTldezh9JC8sXG4gIC8vIExJVEhVQU5JQVxuICBMVTogL15bQS1aMC05XXs4fSQvLFxuICAvLyBMVVhFTUJVUkdcbiAgTFY6IC9eW0EtWjAtOV17Mn1cXGR7N30kLyxcbiAgLy8gTEFUVklBXG4gIExZOiAvXltBLVowLTldezh9JC8sXG4gIC8vIExJQllBXG4gIE1UOiAvXlxcZHs3fSQvLFxuICAvLyBNQUxUQVxuICBNWjogL14oW0EtWl17Mn1cXGR7N30pfChcXGR7Mn1bQS1aXXsyfVxcZHs1fSkkLyxcbiAgLy8gTU9aQU1CSVFVRVxuICBNWTogL15bQUhLXVxcZHs4fSQvLFxuICAvLyBNQUxBWVNJQVxuICBNWDogL15cXGR7MTAsMTF9JC8sXG4gIC8vIE1FWElDT1xuICBOTDogL15bQS1aXXsyfVtBLVowLTldezZ9XFxkJC8sXG4gIC8vIE5FVEhFUkxBTkRTXG4gIE5aOiAvXihbTGxdKFtBYV18W0RkXXxbRmZdfFtIaF0pfFtFZV0oW0FhXXxbUHBdKXxbTm5dKVxcZHs2fSQvLFxuICAvLyBORVcgWkVBTEFORFxuICBQSDogL14oW0EtWl0oXFxkezZ9fFxcZHs3fVtBLVpdKSl8KFtBLVpdezJ9KFxcZHs2fXxcXGR7N30pKSQvLFxuICAvLyBQSElMSVBQSU5FU1xuICBQSzogL15bQS1aXXsyfVxcZHs3fSQvLFxuICAvLyBQQUtJU1RBTlxuICBQTDogL15bQS1aXXsyfVxcZHs3fSQvLFxuICAvLyBQT0xBTkRcbiAgUFQ6IC9eW0EtWl1cXGR7Nn0kLyxcbiAgLy8gUE9SVFVHQUxcbiAgUk86IC9eXFxkezgsOX0kLyxcbiAgLy8gUk9NQU5JQVxuICBSVTogL15cXGR7OX0kLyxcbiAgLy8gUlVTU0lBTiBGRURFUkFUSU9OXG4gIFNFOiAvXlxcZHs4fSQvLFxuICAvLyBTV0VERU5cbiAgU0w6IC9eKFApW0EtWl1cXGR7N30kLyxcbiAgLy8gU0xPVkVOSUFcbiAgU0s6IC9eWzAtOUEtWl1cXGR7N30kLyxcbiAgLy8gU0xPVkFLSUFcbiAgVEg6IC9eW0EtWl17MSwyfVxcZHs2LDd9JC8sXG4gIC8vIFRIQUlMQU5EXG4gIFRSOiAvXltBLVpdXFxkezh9JC8sXG4gIC8vIFRVUktFWVxuICBVQTogL15bQS1aXXsyfVxcZHs2fSQvLFxuICAvLyBVS1JBSU5FXG4gIFVTOiAvXlxcZHs5fSQvIC8vIFVOSVRFRCBTVEFURVNcblxufTtcbi8qKlxuICogQ2hlY2sgaWYgc3RyIGlzIGEgdmFsaWQgcGFzc3BvcnQgbnVtYmVyXG4gKiByZWxhdGl2ZSB0byBwcm92aWRlZCBJU08gQ291bnRyeSBDb2RlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb3VudHJ5Q29kZVxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuXG5mdW5jdGlvbiBpc1Bhc3Nwb3J0TnVtYmVyKHN0ciwgY291bnRyeUNvZGUpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgLyoqIFJlbW92ZSBBbGwgV2hpdGVzcGFjZXMsIENvbnZlcnQgdG8gVVBQRVJDQVNFICovXG5cbiAgdmFyIG5vcm1hbGl6ZWRTdHIgPSBzdHIucmVwbGFjZSgvXFxzL2csICcnKS50b1VwcGVyQ2FzZSgpO1xuICByZXR1cm4gY291bnRyeUNvZGUudG9VcHBlckNhc2UoKSBpbiBwYXNzcG9ydFJlZ2V4QnlDb3VudHJ5Q29kZSAmJiBwYXNzcG9ydFJlZ2V4QnlDb3VudHJ5Q29kZVtjb3VudHJ5Q29kZV0udGVzdChub3JtYWxpemVkU3RyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNQb3J0O1xuXG52YXIgX2lzSW50ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9pc0ludFwiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIGlzUG9ydChzdHIpIHtcbiAgcmV0dXJuICgwLCBfaXNJbnQuZGVmYXVsdCkoc3RyLCB7XG4gICAgbWluOiAwLFxuICAgIG1heDogNjU1MzVcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzUG9zdGFsQ29kZTtcbmV4cG9ydHMubG9jYWxlcyA9IHZvaWQgMDtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLy8gY29tbW9uIHBhdHRlcm5zXG52YXIgdGhyZWVEaWdpdCA9IC9eXFxkezN9JC87XG52YXIgZm91ckRpZ2l0ID0gL15cXGR7NH0kLztcbnZhciBmaXZlRGlnaXQgPSAvXlxcZHs1fSQvO1xudmFyIHNpeERpZ2l0ID0gL15cXGR7Nn0kLztcbnZhciBwYXR0ZXJucyA9IHtcbiAgQUQ6IC9eQURcXGR7M30kLyxcbiAgQVQ6IGZvdXJEaWdpdCxcbiAgQVU6IGZvdXJEaWdpdCxcbiAgQVo6IC9eQVpcXGR7NH0kLyxcbiAgQkE6IC9eKFs3LThdXFxkezR9JCkvLFxuICBCRTogZm91ckRpZ2l0LFxuICBCRzogZm91ckRpZ2l0LFxuICBCUjogL15cXGR7NX0tXFxkezN9JC8sXG4gIEJZOiAvXjJbMS00XVxcZHs0fSQvLFxuICBDQTogL15bQUJDRUdISktMTU5QUlNUVlhZXVxcZFtBQkNFR0hKLU5QUlNUVi1aXVtcXHNcXC1dP1xcZFtBQkNFR0hKLU5QUlNUVi1aXVxcZCQvaSxcbiAgQ0g6IGZvdXJEaWdpdCxcbiAgQ046IC9eKDBbMS03XXwxWzAxMjM1Nl18MlswLTddfDNbMC02XXw0WzAtN118NVsxLTddfDZbMS03XXw3WzEtNV18OFsxMzQ1XXw5WzA5XSlcXGR7NH0kLyxcbiAgQ1o6IC9eXFxkezN9XFxzP1xcZHsyfSQvLFxuICBERTogZml2ZURpZ2l0LFxuICBESzogZm91ckRpZ2l0LFxuICBETzogZml2ZURpZ2l0LFxuICBEWjogZml2ZURpZ2l0LFxuICBFRTogZml2ZURpZ2l0LFxuICBFUzogL14oNVswLTJdezF9fFswLTRdezF9XFxkezF9KVxcZHszfSQvLFxuICBGSTogZml2ZURpZ2l0LFxuICBGUjogL15cXGR7Mn1cXHM/XFxkezN9JC8sXG4gIEdCOiAvXihnaXJcXHM/MGFhfFthLXpdezEsMn1cXGRbXFxkYS16XT9cXHM/KFxcZFthLXpdezJ9KT8pJC9pLFxuICBHUjogL15cXGR7M31cXHM/XFxkezJ9JC8sXG4gIEhSOiAvXihbMS01XVxcZHs0fSQpLyxcbiAgSFQ6IC9eSFRcXGR7NH0kLyxcbiAgSFU6IGZvdXJEaWdpdCxcbiAgSUQ6IGZpdmVEaWdpdCxcbiAgSUU6IC9eKD8hLiooPzpvKSlbQS1aYS16XVxcZFtcXGR3XVxcc1xcd3s0fSQvaSxcbiAgSUw6IC9eKFxcZHs1fXxcXGR7N30pJC8sXG4gIElOOiAvXigoPyExMHwyOXwzNXw1NHw1NXw2NXw2Nnw4Nnw4N3w4OHw4OSlbMS05XVswLTldezV9KSQvLFxuICBJUjogL14oPyEoXFxkKVxcMXszfSlbMTMtOV17NH1bMTM0Ni05XVswMTMtOV17NX0kLyxcbiAgSVM6IHRocmVlRGlnaXQsXG4gIElUOiBmaXZlRGlnaXQsXG4gIEpQOiAvXlxcZHszfVxcLVxcZHs0fSQvLFxuICBLRTogZml2ZURpZ2l0LFxuICBLUjogL14oXFxkezV9fFxcZHs2fSkkLyxcbiAgTEk6IC9eKDk0OFs1LTldfDk0OVswLTddKSQvLFxuICBMVDogL15MVFxcLVxcZHs1fSQvLFxuICBMVTogZm91ckRpZ2l0LFxuICBMVjogL15MVlxcLVxcZHs0fSQvLFxuICBMSzogZml2ZURpZ2l0LFxuICBNRzogdGhyZWVEaWdpdCxcbiAgTVg6IGZpdmVEaWdpdCxcbiAgTVQ6IC9eW0EtWmEtel17M31cXHN7MCwxfVxcZHs0fSQvLFxuICBNWTogZml2ZURpZ2l0LFxuICBOTDogL15cXGR7NH1cXHM/W2Etel17Mn0kL2ksXG4gIE5POiBmb3VyRGlnaXQsXG4gIE5QOiAvXigxMHwyMXwyMnwzMnwzM3wzNHw0NHw0NXw1Nnw1NylcXGR7M30kfF4oOTc3KSQvaSxcbiAgTlo6IGZvdXJEaWdpdCxcbiAgUEw6IC9eXFxkezJ9XFwtXFxkezN9JC8sXG4gIFBSOiAvXjAwWzY3OV1cXGR7Mn0oWyAtXVxcZHs0fSk/JC8sXG4gIFBUOiAvXlxcZHs0fVxcLVxcZHszfT8kLyxcbiAgUk86IHNpeERpZ2l0LFxuICBSVTogc2l4RGlnaXQsXG4gIFNBOiBmaXZlRGlnaXQsXG4gIFNFOiAvXlsxLTldXFxkezJ9XFxzP1xcZHsyfSQvLFxuICBTRzogc2l4RGlnaXQsXG4gIFNJOiBmb3VyRGlnaXQsXG4gIFNLOiAvXlxcZHszfVxccz9cXGR7Mn0kLyxcbiAgVEg6IGZpdmVEaWdpdCxcbiAgVE46IGZvdXJEaWdpdCxcbiAgVFc6IC9eXFxkezN9KFxcZHsyfSk/JC8sXG4gIFVBOiBmaXZlRGlnaXQsXG4gIFVTOiAvXlxcZHs1fSgtXFxkezR9KT8kLyxcbiAgWkE6IGZvdXJEaWdpdCxcbiAgWk06IGZpdmVEaWdpdFxufTtcbnZhciBsb2NhbGVzID0gT2JqZWN0LmtleXMocGF0dGVybnMpO1xuZXhwb3J0cy5sb2NhbGVzID0gbG9jYWxlcztcblxuZnVuY3Rpb24gaXNQb3N0YWxDb2RlKHN0ciwgbG9jYWxlKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG5cbiAgaWYgKGxvY2FsZSBpbiBwYXR0ZXJucykge1xuICAgIHJldHVybiBwYXR0ZXJuc1tsb2NhbGVdLnRlc3Qoc3RyKTtcbiAgfSBlbHNlIGlmIChsb2NhbGUgPT09ICdhbnknKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHBhdHRlcm5zKSB7XG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZ290d2FybG9zdC9pc3RhbmJ1bC9ibG9iL21hc3Rlci9pZ25vcmluZy1jb2RlLWZvci1jb3ZlcmFnZS5tZCNpZ25vcmluZy1jb2RlLWZvci1jb3ZlcmFnZS1wdXJwb3Nlc1xuICAgICAgLy8gaXN0YW5idWwgaWdub3JlIGVsc2VcbiAgICAgIGlmIChwYXR0ZXJucy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIHZhciBwYXR0ZXJuID0gcGF0dGVybnNba2V5XTtcblxuICAgICAgICBpZiAocGF0dGVybi50ZXN0KHN0cikpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgbG9jYWxlICdcIi5jb25jYXQobG9jYWxlLCBcIidcIikpO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNSRkMzMzM5O1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKiBCYXNlZCBvbiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzMzOSNzZWN0aW9uLTUuNiAqL1xudmFyIGRhdGVGdWxsWWVhciA9IC9bMC05XXs0fS87XG52YXIgZGF0ZU1vbnRoID0gLygwWzEtOV18MVswLTJdKS87XG52YXIgZGF0ZU1EYXkgPSAvKFsxMl1cXGR8MFsxLTldfDNbMDFdKS87XG52YXIgdGltZUhvdXIgPSAvKFswMV1bMC05XXwyWzAtM10pLztcbnZhciB0aW1lTWludXRlID0gL1swLTVdWzAtOV0vO1xudmFyIHRpbWVTZWNvbmQgPSAvKFswLTVdWzAtOV18NjApLztcbnZhciB0aW1lU2VjRnJhYyA9IC8oXFwuWzAtOV0rKT8vO1xudmFyIHRpbWVOdW1PZmZzZXQgPSBuZXcgUmVnRXhwKFwiWy0rXVwiLmNvbmNhdCh0aW1lSG91ci5zb3VyY2UsIFwiOlwiKS5jb25jYXQodGltZU1pbnV0ZS5zb3VyY2UpKTtcbnZhciB0aW1lT2Zmc2V0ID0gbmV3IFJlZ0V4cChcIihbelpdfFwiLmNvbmNhdCh0aW1lTnVtT2Zmc2V0LnNvdXJjZSwgXCIpXCIpKTtcbnZhciBwYXJ0aWFsVGltZSA9IG5ldyBSZWdFeHAoXCJcIi5jb25jYXQodGltZUhvdXIuc291cmNlLCBcIjpcIikuY29uY2F0KHRpbWVNaW51dGUuc291cmNlLCBcIjpcIikuY29uY2F0KHRpbWVTZWNvbmQuc291cmNlKS5jb25jYXQodGltZVNlY0ZyYWMuc291cmNlKSk7XG52YXIgZnVsbERhdGUgPSBuZXcgUmVnRXhwKFwiXCIuY29uY2F0KGRhdGVGdWxsWWVhci5zb3VyY2UsIFwiLVwiKS5jb25jYXQoZGF0ZU1vbnRoLnNvdXJjZSwgXCItXCIpLmNvbmNhdChkYXRlTURheS5zb3VyY2UpKTtcbnZhciBmdWxsVGltZSA9IG5ldyBSZWdFeHAoXCJcIi5jb25jYXQocGFydGlhbFRpbWUuc291cmNlKS5jb25jYXQodGltZU9mZnNldC5zb3VyY2UpKTtcbnZhciByZmMzMzM5ID0gbmV3IFJlZ0V4cChcIl5cIi5jb25jYXQoZnVsbERhdGUuc291cmNlLCBcIlsgdFRdXCIpLmNvbmNhdChmdWxsVGltZS5zb3VyY2UsIFwiJFwiKSk7XG5cbmZ1bmN0aW9uIGlzUkZDMzMzOShzdHIpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgcmV0dXJuIHJmYzMzMzkudGVzdChzdHIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc1JnYkNvbG9yO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgcmdiQ29sb3IgPSAvXnJnYlxcKCgoWzAtOV18WzEtOV1bMC05XXwxWzAtOV1bMC05XXwyWzAtNF1bMC05XXwyNVswLTVdKSwpezJ9KFswLTldfFsxLTldWzAtOV18MVswLTldWzAtOV18MlswLTRdWzAtOV18MjVbMC01XSlcXCkkLztcbnZhciByZ2JhQ29sb3IgPSAvXnJnYmFcXCgoKFswLTldfFsxLTldWzAtOV18MVswLTldWzAtOV18MlswLTRdWzAtOV18MjVbMC01XSksKXszfSgwP1xcLlxcZHwxKFxcLjApP3wwKFxcLjApPylcXCkkLztcbnZhciByZ2JDb2xvclBlcmNlbnQgPSAvXnJnYlxcKCgoWzAtOV0lfFsxLTldWzAtOV0lfDEwMCUpLCl7Mn0oWzAtOV0lfFsxLTldWzAtOV0lfDEwMCUpXFwpJC87XG52YXIgcmdiYUNvbG9yUGVyY2VudCA9IC9ecmdiYVxcKCgoWzAtOV0lfFsxLTldWzAtOV0lfDEwMCUpLCl7M30oMD9cXC5cXGR8MShcXC4wKT98MChcXC4wKT8pXFwpJC87XG5cbmZ1bmN0aW9uIGlzUmdiQ29sb3Ioc3RyKSB7XG4gIHZhciBpbmNsdWRlUGVyY2VudFZhbHVlcyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogdHJ1ZTtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcblxuICBpZiAoIWluY2x1ZGVQZXJjZW50VmFsdWVzKSB7XG4gICAgcmV0dXJuIHJnYkNvbG9yLnRlc3Qoc3RyKSB8fCByZ2JhQ29sb3IudGVzdChzdHIpO1xuICB9XG5cbiAgcmV0dXJuIHJnYkNvbG9yLnRlc3Qoc3RyKSB8fCByZ2JhQ29sb3IudGVzdChzdHIpIHx8IHJnYkNvbG9yUGVyY2VudC50ZXN0KHN0cikgfHwgcmdiYUNvbG9yUGVyY2VudC50ZXN0KHN0cik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzU2VtVmVyO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG52YXIgX211bHRpbGluZVJlZ2V4ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL211bHRpbGluZVJlZ2V4XCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBSZWd1bGFyIEV4cHJlc3Npb24gdG8gbWF0Y2hcbiAqIHNlbWFudGljIHZlcnNpb25pbmcgKFNlbVZlcilcbiAqIGJ1aWx0IGZyb20gbXVsdGktbGluZSwgbXVsdGktcGFydHMgcmVnZXhwXG4gKiBSZWZlcmVuY2U6IGh0dHBzOi8vc2VtdmVyLm9yZy9cbiAqL1xudmFyIHNlbWFudGljVmVyc2lvbmluZ1JlZ2V4ID0gKDAsIF9tdWx0aWxpbmVSZWdleC5kZWZhdWx0KShbJ14oMHxbMS05XVxcXFxkKilcXFxcLigwfFsxLTldXFxcXGQqKVxcXFwuKDB8WzEtOV1cXFxcZCopJywgJyg/Oi0oKD86MHxbMS05XVxcXFxkKnxcXFxcZCpbYS16LV1bMC05YS16LV0qKSg/OlxcXFwuKD86MHxbMS05XVxcXFxkKnxcXFxcZCpbYS16LV1bMC05YS16LV0qKSkqKSknLCAnPyg/OlxcXFwrKFswLTlhLXotXSsoPzpcXFxcLlswLTlhLXotXSspKikpPyQnXSwgJ2knKTtcblxuZnVuY3Rpb24gaXNTZW1WZXIoc3RyKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIHJldHVybiBzZW1hbnRpY1ZlcnNpb25pbmdSZWdleC50ZXN0KHN0cik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzU2x1ZztcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGNoYXJzZXRSZWdleCA9IC9eW15cXHMtX10oPyEuKj9bLV9dezIsfSlbYS16MC05LVxcXFxdW15cXHNdKlteLV9cXHNdJC87XG5cbmZ1bmN0aW9uIGlzU2x1ZyhzdHIpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgcmV0dXJuIGNoYXJzZXRSZWdleC50ZXN0KHN0cik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzU3Ryb25nUGFzc3dvcmQ7XG5cbnZhciBfbWVyZ2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvbWVyZ2VcIikpO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgdXBwZXJDYXNlUmVnZXggPSAvXltBLVpdJC87XG52YXIgbG93ZXJDYXNlUmVnZXggPSAvXlthLXpdJC87XG52YXIgbnVtYmVyUmVnZXggPSAvXlswLTldJC87XG52YXIgc3ltYm9sUmVnZXggPSAvXlstIyEkQMKjJV4mKigpXyt8fj1ge31cXFtcXF06XCI7Jzw+PywuXFwvIF0kLztcbnZhciBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgbWluTGVuZ3RoOiA4LFxuICBtaW5Mb3dlcmNhc2U6IDEsXG4gIG1pblVwcGVyY2FzZTogMSxcbiAgbWluTnVtYmVyczogMSxcbiAgbWluU3ltYm9sczogMSxcbiAgcmV0dXJuU2NvcmU6IGZhbHNlLFxuICBwb2ludHNQZXJVbmlxdWU6IDEsXG4gIHBvaW50c1BlclJlcGVhdDogMC41LFxuICBwb2ludHNGb3JDb250YWluaW5nTG93ZXI6IDEwLFxuICBwb2ludHNGb3JDb250YWluaW5nVXBwZXI6IDEwLFxuICBwb2ludHNGb3JDb250YWluaW5nTnVtYmVyOiAxMCxcbiAgcG9pbnRzRm9yQ29udGFpbmluZ1N5bWJvbDogMTBcbn07XG4vKiBDb3VudHMgbnVtYmVyIG9mIG9jY3VycmVuY2VzIG9mIGVhY2ggY2hhciBpbiBhIHN0cmluZ1xuICogY291bGQgYmUgbW92ZWQgdG8gdXRpbC8gP1xuKi9cblxuZnVuY3Rpb24gY291bnRDaGFycyhzdHIpIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBBcnJheS5mcm9tKHN0cikuZm9yRWFjaChmdW5jdGlvbiAoY2hhcikge1xuICAgIHZhciBjdXJWYWwgPSByZXN1bHRbY2hhcl07XG5cbiAgICBpZiAoY3VyVmFsKSB7XG4gICAgICByZXN1bHRbY2hhcl0gKz0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2NoYXJdID0gMTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuLyogUmV0dXJuIGluZm9ybWF0aW9uIGFib3V0IGEgcGFzc3dvcmQgKi9cblxuXG5mdW5jdGlvbiBhbmFseXplUGFzc3dvcmQocGFzc3dvcmQpIHtcbiAgdmFyIGNoYXJNYXAgPSBjb3VudENoYXJzKHBhc3N3b3JkKTtcbiAgdmFyIGFuYWx5c2lzID0ge1xuICAgIGxlbmd0aDogcGFzc3dvcmQubGVuZ3RoLFxuICAgIHVuaXF1ZUNoYXJzOiBPYmplY3Qua2V5cyhjaGFyTWFwKS5sZW5ndGgsXG4gICAgdXBwZXJjYXNlQ291bnQ6IDAsXG4gICAgbG93ZXJjYXNlQ291bnQ6IDAsXG4gICAgbnVtYmVyQ291bnQ6IDAsXG4gICAgc3ltYm9sQ291bnQ6IDBcbiAgfTtcbiAgT2JqZWN0LmtleXMoY2hhck1hcCkuZm9yRWFjaChmdW5jdGlvbiAoY2hhcikge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKHVwcGVyQ2FzZVJlZ2V4LnRlc3QoY2hhcikpIHtcbiAgICAgIGFuYWx5c2lzLnVwcGVyY2FzZUNvdW50ICs9IGNoYXJNYXBbY2hhcl07XG4gICAgfSBlbHNlIGlmIChsb3dlckNhc2VSZWdleC50ZXN0KGNoYXIpKSB7XG4gICAgICBhbmFseXNpcy5sb3dlcmNhc2VDb3VudCArPSBjaGFyTWFwW2NoYXJdO1xuICAgIH0gZWxzZSBpZiAobnVtYmVyUmVnZXgudGVzdChjaGFyKSkge1xuICAgICAgYW5hbHlzaXMubnVtYmVyQ291bnQgKz0gY2hhck1hcFtjaGFyXTtcbiAgICB9IGVsc2UgaWYgKHN5bWJvbFJlZ2V4LnRlc3QoY2hhcikpIHtcbiAgICAgIGFuYWx5c2lzLnN5bWJvbENvdW50ICs9IGNoYXJNYXBbY2hhcl07XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGFuYWx5c2lzO1xufVxuXG5mdW5jdGlvbiBzY29yZVBhc3N3b3JkKGFuYWx5c2lzLCBzY29yaW5nT3B0aW9ucykge1xuICB2YXIgcG9pbnRzID0gMDtcbiAgcG9pbnRzICs9IGFuYWx5c2lzLnVuaXF1ZUNoYXJzICogc2NvcmluZ09wdGlvbnMucG9pbnRzUGVyVW5pcXVlO1xuICBwb2ludHMgKz0gKGFuYWx5c2lzLmxlbmd0aCAtIGFuYWx5c2lzLnVuaXF1ZUNoYXJzKSAqIHNjb3JpbmdPcHRpb25zLnBvaW50c1BlclJlcGVhdDtcblxuICBpZiAoYW5hbHlzaXMubG93ZXJjYXNlQ291bnQgPiAwKSB7XG4gICAgcG9pbnRzICs9IHNjb3JpbmdPcHRpb25zLnBvaW50c0ZvckNvbnRhaW5pbmdMb3dlcjtcbiAgfVxuXG4gIGlmIChhbmFseXNpcy51cHBlcmNhc2VDb3VudCA+IDApIHtcbiAgICBwb2ludHMgKz0gc2NvcmluZ09wdGlvbnMucG9pbnRzRm9yQ29udGFpbmluZ1VwcGVyO1xuICB9XG5cbiAgaWYgKGFuYWx5c2lzLm51bWJlckNvdW50ID4gMCkge1xuICAgIHBvaW50cyArPSBzY29yaW5nT3B0aW9ucy5wb2ludHNGb3JDb250YWluaW5nTnVtYmVyO1xuICB9XG5cbiAgaWYgKGFuYWx5c2lzLnN5bWJvbENvdW50ID4gMCkge1xuICAgIHBvaW50cyArPSBzY29yaW5nT3B0aW9ucy5wb2ludHNGb3JDb250YWluaW5nU3ltYm9sO1xuICB9XG5cbiAgcmV0dXJuIHBvaW50cztcbn1cblxuZnVuY3Rpb24gaXNTdHJvbmdQYXNzd29yZChzdHIpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IG51bGw7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIHZhciBhbmFseXNpcyA9IGFuYWx5emVQYXNzd29yZChzdHIpO1xuICBvcHRpb25zID0gKDAsIF9tZXJnZS5kZWZhdWx0KShvcHRpb25zIHx8IHt9LCBkZWZhdWx0T3B0aW9ucyk7XG5cbiAgaWYgKG9wdGlvbnMucmV0dXJuU2NvcmUpIHtcbiAgICByZXR1cm4gc2NvcmVQYXNzd29yZChhbmFseXNpcywgb3B0aW9ucyk7XG4gIH1cblxuICByZXR1cm4gYW5hbHlzaXMubGVuZ3RoID49IG9wdGlvbnMubWluTGVuZ3RoICYmIGFuYWx5c2lzLmxvd2VyY2FzZUNvdW50ID49IG9wdGlvbnMubWluTG93ZXJjYXNlICYmIGFuYWx5c2lzLnVwcGVyY2FzZUNvdW50ID49IG9wdGlvbnMubWluVXBwZXJjYXNlICYmIGFuYWx5c2lzLm51bWJlckNvdW50ID49IG9wdGlvbnMubWluTnVtYmVycyAmJiBhbmFseXNpcy5zeW1ib2xDb3VudCA+PSBvcHRpb25zLm1pblN5bWJvbHM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzU3Vycm9nYXRlUGFpcjtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIHN1cnJvZ2F0ZVBhaXIgPSAvW1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXS87XG5cbmZ1bmN0aW9uIGlzU3Vycm9nYXRlUGFpcihzdHIpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgcmV0dXJuIHN1cnJvZ2F0ZVBhaXIudGVzdChzdHIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzVGF4SUQ7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbnZhciBhbGdvcml0aG1zID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcIi4vdXRpbC9hbGdvcml0aG1zXCIpKTtcblxudmFyIF9pc0RhdGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2lzRGF0ZVwiKSk7XG5cbmZ1bmN0aW9uIF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSgpIHsgaWYgKHR5cGVvZiBXZWFrTWFwICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsOyB2YXIgY2FjaGUgPSBuZXcgV2Vha01hcCgpOyBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUgPSBmdW5jdGlvbiBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUoKSB7IHJldHVybiBjYWNoZTsgfTsgcmV0dXJuIGNhY2hlOyB9XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gaWYgKG9iaiA9PT0gbnVsbCB8fCBfdHlwZW9mKG9iaikgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG9iaiAhPT0gXCJmdW5jdGlvblwiKSB7IHJldHVybiB7IGRlZmF1bHQ6IG9iaiB9OyB9IHZhciBjYWNoZSA9IF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSgpOyBpZiAoY2FjaGUgJiYgY2FjaGUuaGFzKG9iaikpIHsgcmV0dXJuIGNhY2hlLmdldChvYmopOyB9IHZhciBuZXdPYmogPSB7fTsgdmFyIGhhc1Byb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7IHZhciBkZXNjID0gaGFzUHJvcGVydHlEZXNjcmlwdG9yID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkgOiBudWxsOyBpZiAoZGVzYyAmJiAoZGVzYy5nZXQgfHwgZGVzYy5zZXQpKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuZXdPYmosIGtleSwgZGVzYyk7IH0gZWxzZSB7IG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyBpZiAoY2FjaGUpIHsgY2FjaGUuc2V0KG9iaiwgbmV3T2JqKTsgfSByZXR1cm4gbmV3T2JqOyB9XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHsgcmV0dXJuIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBfbm9uSXRlcmFibGVTcHJlYWQoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHsgaWYgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChpdGVyKSkgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkoYXJyKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuLyoqXG4gKiBUSU4gVmFsaWRhdGlvblxuICogVmFsaWRhdGVzIFRheCBJZGVudGlmaWNhdGlvbiBOdW1iZXJzIChUSU5zKSBmcm9tIHRoZSBVUywgRVUgbWVtYmVyIHN0YXRlcyBhbmQgdGhlIFVuaXRlZCBLaW5nZG9tLlxuICpcbiAqIEVVLVVLOlxuICogTmF0aW9uYWwgVElOIHZhbGlkaXR5IGlzIGNhbGN1bGF0ZWQgdXNpbmcgcHVibGljIGFsZ29yaXRobXMgYXMgbWFkZSBhdmFpbGFibGUgYnkgREcgVEFYVUQuXG4gKlxuICogU2VlIGBodHRwczovL2VjLmV1cm9wYS5ldS90YXhhdGlvbl9jdXN0b21zL3Rpbi9zcGVjcy9GUy1USU4lMjBBbGdvcml0aG1zLVB1YmxpYy5kb2N4YCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiBVUzpcbiAqIEFuIEVtcGxveWVyIElkZW50aWZpY2F0aW9uIE51bWJlciAoRUlOKSwgYWxzbyBrbm93biBhcyBhIEZlZGVyYWwgVGF4IElkZW50aWZpY2F0aW9uIE51bWJlcixcbiAqICBpcyB1c2VkIHRvIGlkZW50aWZ5IGEgYnVzaW5lc3MgZW50aXR5LlxuICpcbiAqIE5PVEVTOlxuICogIC0gUHJlZml4IDQ3IGlzIGJlaW5nIHJlc2VydmVkIGZvciBmdXR1cmUgdXNlXG4gKiAgLSBQcmVmaXhlcyAyNiwgMjcsIDQ1LCA0NiBhbmQgNDcgd2VyZSBwcmV2aW91c2x5IGFzc2lnbmVkIGJ5IHRoZSBQaGlsYWRlbHBoaWEgY2FtcHVzLlxuICpcbiAqIFNlZSBgaHR0cDovL3d3dy5pcnMuZ292L0J1c2luZXNzZXMvU21hbGwtQnVzaW5lc3Nlcy0mLVNlbGYtRW1wbG95ZWQvSG93LUVJTnMtYXJlLUFzc2lnbmVkLWFuZC1WYWxpZC1FSU4tUHJlZml4ZXNgXG4gKiBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqL1xuLy8gTG9jYWxlIGZ1bmN0aW9uc1xuXG4vKlxuICogYmctQkcgdmFsaWRhdGlvbiBmdW5jdGlvblxuICogKEVkaW5lbiBncmHFvmRhbnNraSBub21lciAoRUdOL9CV0JPQnSksIHBlcnNvbnMgb25seSlcbiAqIENoZWNrcyBpZiBiaXJ0aCBkYXRlIChmaXJzdCBzaXggZGlnaXRzKSBpcyB2YWxpZCBhbmQgY2FsY3VsYXRlcyBjaGVjayAobGFzdCkgZGlnaXRcbiAqL1xuZnVuY3Rpb24gYmdCZ0NoZWNrKHRpbikge1xuICAvLyBFeHRyYWN0IGZ1bGwgeWVhciwgbm9ybWFsaXplIG1vbnRoIGFuZCBjaGVjayBiaXJ0aCBkYXRlIHZhbGlkaXR5XG4gIHZhciBjZW50dXJ5X3llYXIgPSB0aW4uc2xpY2UoMCwgMik7XG4gIHZhciBtb250aCA9IHBhcnNlSW50KHRpbi5zbGljZSgyLCA0KSwgMTApO1xuXG4gIGlmIChtb250aCA+IDQwKSB7XG4gICAgbW9udGggLT0gNDA7XG4gICAgY2VudHVyeV95ZWFyID0gXCIyMFwiLmNvbmNhdChjZW50dXJ5X3llYXIpO1xuICB9IGVsc2UgaWYgKG1vbnRoID4gMjApIHtcbiAgICBtb250aCAtPSAyMDtcbiAgICBjZW50dXJ5X3llYXIgPSBcIjE4XCIuY29uY2F0KGNlbnR1cnlfeWVhcik7XG4gIH0gZWxzZSB7XG4gICAgY2VudHVyeV95ZWFyID0gXCIxOVwiLmNvbmNhdChjZW50dXJ5X3llYXIpO1xuICB9XG5cbiAgaWYgKG1vbnRoIDwgMTApIHtcbiAgICBtb250aCA9IFwiMFwiLmNvbmNhdChtb250aCk7XG4gIH1cblxuICB2YXIgZGF0ZSA9IFwiXCIuY29uY2F0KGNlbnR1cnlfeWVhciwgXCIvXCIpLmNvbmNhdChtb250aCwgXCIvXCIpLmNvbmNhdCh0aW4uc2xpY2UoNCwgNikpO1xuXG4gIGlmICghKDAsIF9pc0RhdGUuZGVmYXVsdCkoZGF0ZSwgJ1lZWVkvTU0vREQnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSAvLyBzcGxpdCBkaWdpdHMgaW50byBhbiBhcnJheSBmb3IgZnVydGhlciBwcm9jZXNzaW5nXG5cblxuICB2YXIgZGlnaXRzID0gdGluLnNwbGl0KCcnKS5tYXAoZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoYSwgMTApO1xuICB9KTsgLy8gQ2FsY3VsYXRlIGNoZWNrc3VtIGJ5IG11bHRpcGx5aW5nIGRpZ2l0cyB3aXRoIGZpeGVkIHZhbHVlc1xuXG4gIHZhciBtdWx0aXBfbG9va3VwID0gWzIsIDQsIDgsIDUsIDEwLCA5LCA3LCAzLCA2XTtcbiAgdmFyIGNoZWNrc3VtID0gMDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IG11bHRpcF9sb29rdXAubGVuZ3RoOyBpKyspIHtcbiAgICBjaGVja3N1bSArPSBkaWdpdHNbaV0gKiBtdWx0aXBfbG9va3VwW2ldO1xuICB9XG5cbiAgY2hlY2tzdW0gPSBjaGVja3N1bSAlIDExID09PSAxMCA/IDAgOiBjaGVja3N1bSAlIDExO1xuICByZXR1cm4gY2hlY2tzdW0gPT09IGRpZ2l0c1s5XTtcbn1cbi8qKlxuICogQ2hlY2sgaWYgYW4gaW5wdXQgaXMgYSB2YWxpZCBDYW5hZGlhbiBTSU4gKFNvY2lhbCBJbnN1cmFuY2UgTnVtYmVyKVxuICpcbiAqIFRoZSBTb2NpYWwgSW5zdXJhbmNlIE51bWJlciAoU0lOKSBpcyBhIDkgZGlnaXQgbnVtYmVyIHRoYXRcbiAqIHlvdSBuZWVkIHRvIHdvcmsgaW4gQ2FuYWRhIG9yIHRvIGhhdmUgYWNjZXNzIHRvIGdvdmVybm1lbnQgcHJvZ3JhbXMgYW5kIGJlbmVmaXRzLlxuICpcbiAqIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1NvY2lhbF9JbnN1cmFuY2VfTnVtYmVyXG4gKiBodHRwczovL3d3dy5jYW5hZGEuY2EvZW4vZW1wbG95bWVudC1zb2NpYWwtZGV2ZWxvcG1lbnQvc2VydmljZXMvc2luLmh0bWxcbiAqIGh0dHBzOi8vd3d3LmNvZGVyY3J1bmNoLmNvbS9jaGFsbGVuZ2UvODE5MzAyNDg4L3Npbi12YWxpZGF0b3JcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cblxuXG5mdW5jdGlvbiBpc0NhbmFkaWFuU0lOKGlucHV0KSB7XG4gIHZhciBkaWdpdHNBcnJheSA9IGlucHV0LnNwbGl0KCcnKTtcbiAgdmFyIGV2ZW4gPSBkaWdpdHNBcnJheS5maWx0ZXIoZnVuY3Rpb24gKF8sIGlkeCkge1xuICAgIHJldHVybiBpZHggJSAyO1xuICB9KS5tYXAoZnVuY3Rpb24gKGkpIHtcbiAgICByZXR1cm4gTnVtYmVyKGkpICogMjtcbiAgfSkuam9pbignJykuc3BsaXQoJycpO1xuICB2YXIgdG90YWwgPSBkaWdpdHNBcnJheS5maWx0ZXIoZnVuY3Rpb24gKF8sIGlkeCkge1xuICAgIHJldHVybiAhKGlkeCAlIDIpO1xuICB9KS5jb25jYXQoZXZlbikubWFwKGZ1bmN0aW9uIChpKSB7XG4gICAgcmV0dXJuIE51bWJlcihpKTtcbiAgfSkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGN1cikge1xuICAgIHJldHVybiBhY2MgKyBjdXI7XG4gIH0pO1xuICByZXR1cm4gdG90YWwgJSAxMCA9PT0gMDtcbn1cbi8qXG4gKiBjcy1DWiB2YWxpZGF0aW9uIGZ1bmN0aW9uXG4gKiAoUm9kbsOpIMSNw61zbG8gKFLEjCksIHBlcnNvbnMgb25seSlcbiAqIENoZWNrcyBpZiBiaXJ0aCBkYXRlIChmaXJzdCBzaXggZGlnaXRzKSBpcyB2YWxpZCBhbmQgZGl2aXNpYmlsaXR5IGJ5IDExXG4gKiBNYXRlcmlhbCBub3QgaW4gREcgVEFYVUQgZG9jdW1lbnQgc291cmNlZCBmcm9tOlxuICogLWBodHRwczovL2xvcmVuYy5pbmZvLzNNQTM4MS9vdmVyZW5pLXNwcmF2bm9zdGktcm9kbmVoby1jaXNsYS5odG1gXG4gKiAtYGh0dHBzOi8vd3d3Lm12Y3IuY3ovY2xhbmVrL3JhZHktYS1zbHV6YnktZG9rdW1lbnR5LXJvZG5lLWNpc2xvLmFzcHhgXG4gKi9cblxuXG5mdW5jdGlvbiBjc0N6Q2hlY2sodGluKSB7XG4gIHRpbiA9IHRpbi5yZXBsYWNlKC9cXFcvLCAnJyk7IC8vIEV4dHJhY3QgZnVsbCB5ZWFyIGZyb20gVElOIGxlbmd0aFxuXG4gIHZhciBmdWxsX3llYXIgPSBwYXJzZUludCh0aW4uc2xpY2UoMCwgMiksIDEwKTtcblxuICBpZiAodGluLmxlbmd0aCA9PT0gMTApIHtcbiAgICBpZiAoZnVsbF95ZWFyIDwgNTQpIHtcbiAgICAgIGZ1bGxfeWVhciA9IFwiMjBcIi5jb25jYXQoZnVsbF95ZWFyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZnVsbF95ZWFyID0gXCIxOVwiLmNvbmNhdChmdWxsX3llYXIpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAodGluLnNsaWNlKDYpID09PSAnMDAwJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gLy8gVGhyZWUtemVybyBzZXJpYWwgbm90IGFzc2lnbmVkIGJlZm9yZSAxOTU0XG5cblxuICAgIGlmIChmdWxsX3llYXIgPCA1NCkge1xuICAgICAgZnVsbF95ZWFyID0gXCIxOVwiLmNvbmNhdChmdWxsX3llYXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7IC8vIE5vIDE4WFggeWVhcnMgc2VlbiBpbiBhbnkgb2YgdGhlIHJlc291cmNlc1xuICAgIH1cbiAgfSAvLyBBZGQgbWlzc2luZyB6ZXJvIGlmIG5lZWRlZFxuXG5cbiAgaWYgKGZ1bGxfeWVhci5sZW5ndGggPT09IDMpIHtcbiAgICBmdWxsX3llYXIgPSBbZnVsbF95ZWFyLnNsaWNlKDAsIDIpLCAnMCcsIGZ1bGxfeWVhci5zbGljZSgyKV0uam9pbignJyk7XG4gIH0gLy8gRXh0cmFjdCBtb250aCBmcm9tIFRJTiBhbmQgbm9ybWFsaXplXG5cblxuICB2YXIgbW9udGggPSBwYXJzZUludCh0aW4uc2xpY2UoMiwgNCksIDEwKTtcblxuICBpZiAobW9udGggPiA1MCkge1xuICAgIG1vbnRoIC09IDUwO1xuICB9XG5cbiAgaWYgKG1vbnRoID4gMjApIHtcbiAgICAvLyBNb250aC1wbHVzLXR3ZW50eSB3YXMgb25seSBpbnRyb2R1Y2VkIGluIDIwMDRcbiAgICBpZiAocGFyc2VJbnQoZnVsbF95ZWFyLCAxMCkgPCAyMDA0KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbW9udGggLT0gMjA7XG4gIH1cblxuICBpZiAobW9udGggPCAxMCkge1xuICAgIG1vbnRoID0gXCIwXCIuY29uY2F0KG1vbnRoKTtcbiAgfSAvLyBDaGVjayBkYXRlIHZhbGlkaXR5XG5cblxuICB2YXIgZGF0ZSA9IFwiXCIuY29uY2F0KGZ1bGxfeWVhciwgXCIvXCIpLmNvbmNhdChtb250aCwgXCIvXCIpLmNvbmNhdCh0aW4uc2xpY2UoNCwgNikpO1xuXG4gIGlmICghKDAsIF9pc0RhdGUuZGVmYXVsdCkoZGF0ZSwgJ1lZWVkvTU0vREQnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSAvLyBWZXJpZnkgZGl2aXNpYmlsaXR5IGJ5IDExXG5cblxuICBpZiAodGluLmxlbmd0aCA9PT0gMTApIHtcbiAgICBpZiAocGFyc2VJbnQodGluLCAxMCkgJSAxMSAhPT0gMCkge1xuICAgICAgLy8gU29tZSBudW1iZXJzIHVwIHRvIGFuZCBpbmNsdWRpbmcgMTk4NSBhcmUgc3RpbGwgdmFsaWQgaWZcbiAgICAgIC8vIGNoZWNrIChsYXN0KSBkaWdpdCBlcXVhbHMgMCBhbmQgbW9kdWxvIG9mIGZpcnN0IDkgZGlnaXRzIGVxdWFscyAxMFxuICAgICAgdmFyIGNoZWNrZGlnaXQgPSBwYXJzZUludCh0aW4uc2xpY2UoMCwgOSksIDEwKSAlIDExO1xuXG4gICAgICBpZiAocGFyc2VJbnQoZnVsbF95ZWFyLCAxMCkgPCAxOTg2ICYmIGNoZWNrZGlnaXQgPT09IDEwKSB7XG4gICAgICAgIGlmIChwYXJzZUludCh0aW4uc2xpY2UoOSksIDEwKSAhPT0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuLypcbiAqIGRlLUFUIHZhbGlkYXRpb24gZnVuY3Rpb25cbiAqIChBYmdhYmVua29udG9udW1tZXIsIHBlcnNvbnMvZW50aXRpZXMpXG4gKiBWZXJpZnkgVElOIHZhbGlkaXR5IGJ5IGNhbGxpbmcgbHVobkNoZWNrKClcbiAqL1xuXG5cbmZ1bmN0aW9uIGRlQXRDaGVjayh0aW4pIHtcbiAgcmV0dXJuIGFsZ29yaXRobXMubHVobkNoZWNrKHRpbik7XG59XG4vKlxuICogZGUtREUgdmFsaWRhdGlvbiBmdW5jdGlvblxuICogKFN0ZXVlcmlkZW50aWZpa2F0aW9uc251bW1lciAoU3RldWVyLUlkTnIuKSwgcGVyc29ucyBvbmx5KVxuICogVGVzdHMgZm9yIHNpbmdsZSBkdXBsaWNhdGUvdHJpcGxpY2F0ZSB2YWx1ZSwgdGhlbiBjYWxjdWxhdGVzIElTTyA3MDY0IGNoZWNrIChsYXN0KSBkaWdpdFxuICogUGFydGlhbCBpbXBsZW1lbnRhdGlvbiBvZiBzcGVjIChzYW1lIHJlc3VsdCB3aXRoIGJvdGggYWxnb3JpdGhtcyBhbHdheXMpXG4gKi9cblxuXG5mdW5jdGlvbiBkZURlQ2hlY2sodGluKSB7XG4gIC8vIFNwbGl0IGRpZ2l0cyBpbnRvIGFuIGFycmF5IGZvciBmdXJ0aGVyIHByb2Nlc3NpbmdcbiAgdmFyIGRpZ2l0cyA9IHRpbi5zcGxpdCgnJykubWFwKGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KGEsIDEwKTtcbiAgfSk7IC8vIEZpbGwgYXJyYXkgd2l0aCBzdHJpbmdzIG9mIG51bWJlciBwb3NpdGlvbnNcblxuICB2YXIgb2NjdXJlbmNlcyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZGlnaXRzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgIG9jY3VyZW5jZXMucHVzaCgnJyk7XG5cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRpZ2l0cy5sZW5ndGggLSAxOyBqKyspIHtcbiAgICAgIGlmIChkaWdpdHNbaV0gPT09IGRpZ2l0c1tqXSkge1xuICAgICAgICBvY2N1cmVuY2VzW2ldICs9IGo7XG4gICAgICB9XG4gICAgfVxuICB9IC8vIFJlbW92ZSBkaWdpdHMgd2l0aCBvbmUgb2NjdXJlbmNlIGFuZCB0ZXN0IGZvciBvbmx5IG9uZSBkdXBsaWNhdGUvdHJpcGxpY2F0ZVxuXG5cbiAgb2NjdXJlbmNlcyA9IG9jY3VyZW5jZXMuZmlsdGVyKGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuIGEubGVuZ3RoID4gMTtcbiAgfSk7XG5cbiAgaWYgKG9jY3VyZW5jZXMubGVuZ3RoICE9PSAyICYmIG9jY3VyZW5jZXMubGVuZ3RoICE9PSAzKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IC8vIEluIGNhc2Ugb2YgdHJpcGxpY2F0ZSB2YWx1ZSBvbmx5IHR3byBkaWdpdHMgYXJlIGFsbG93ZWQgbmV4dCB0byBlYWNoIG90aGVyXG5cblxuICBpZiAob2NjdXJlbmNlc1swXS5sZW5ndGggPT09IDMpIHtcbiAgICB2YXIgdHJpcF9sb2NhdGlvbnMgPSBvY2N1cmVuY2VzWzBdLnNwbGl0KCcnKS5tYXAoZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiBwYXJzZUludChhLCAxMCk7XG4gICAgfSk7XG4gICAgdmFyIHJlY3VycmVudCA9IDA7IC8vIEFtb3VudCBvZiBuZWlnaGJvdXIgb2NjdXJlbmNlc1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IHRyaXBfbG9jYXRpb25zLmxlbmd0aCAtIDE7IF9pKyspIHtcbiAgICAgIGlmICh0cmlwX2xvY2F0aW9uc1tfaV0gKyAxID09PSB0cmlwX2xvY2F0aW9uc1tfaSArIDFdKSB7XG4gICAgICAgIHJlY3VycmVudCArPSAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZWN1cnJlbnQgPT09IDIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYWxnb3JpdGhtcy5pc283MDY0Q2hlY2sodGluKTtcbn1cbi8qXG4gKiBkay1ESyB2YWxpZGF0aW9uIGZ1bmN0aW9uXG4gKiAoQ1BSLW51bW1lciAocGVyc29ubnVtbWVyKSwgcGVyc29ucyBvbmx5KVxuICogQ2hlY2tzIGlmIGJpcnRoIGRhdGUgKGZpcnN0IHNpeCBkaWdpdHMpIGlzIHZhbGlkIGFuZCBhc3NpZ25lZCB0byBjZW50dXJ5IChzZXZlbnRoKSBkaWdpdCxcbiAqIGFuZCBjYWxjdWxhdGVzIGNoZWNrIChsYXN0KSBkaWdpdFxuICovXG5cblxuZnVuY3Rpb24gZGtEa0NoZWNrKHRpbikge1xuICB0aW4gPSB0aW4ucmVwbGFjZSgvXFxXLywgJycpOyAvLyBFeHRyYWN0IHllYXIsIGNoZWNrIGlmIHZhbGlkIGZvciBnaXZlbiBjZW50dXJ5IGRpZ2l0IGFuZCBhZGQgY2VudHVyeVxuXG4gIHZhciB5ZWFyID0gcGFyc2VJbnQodGluLnNsaWNlKDQsIDYpLCAxMCk7XG4gIHZhciBjZW50dXJ5X2RpZ2l0ID0gdGluLnNsaWNlKDYsIDcpO1xuXG4gIHN3aXRjaCAoY2VudHVyeV9kaWdpdCkge1xuICAgIGNhc2UgJzAnOlxuICAgIGNhc2UgJzEnOlxuICAgIGNhc2UgJzInOlxuICAgIGNhc2UgJzMnOlxuICAgICAgeWVhciA9IFwiMTlcIi5jb25jYXQoeWVhcik7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJzQnOlxuICAgIGNhc2UgJzknOlxuICAgICAgaWYgKHllYXIgPCAzNykge1xuICAgICAgICB5ZWFyID0gXCIyMFwiLmNvbmNhdCh5ZWFyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHllYXIgPSBcIjE5XCIuY29uY2F0KHllYXIpO1xuICAgICAgfVxuXG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICBpZiAoeWVhciA8IDM3KSB7XG4gICAgICAgIHllYXIgPSBcIjIwXCIuY29uY2F0KHllYXIpO1xuICAgICAgfSBlbHNlIGlmICh5ZWFyID4gNTgpIHtcbiAgICAgICAgeWVhciA9IFwiMThcIi5jb25jYXQoeWVhcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuICB9IC8vIEFkZCBtaXNzaW5nIHplcm8gaWYgbmVlZGVkXG5cblxuICBpZiAoeWVhci5sZW5ndGggPT09IDMpIHtcbiAgICB5ZWFyID0gW3llYXIuc2xpY2UoMCwgMiksICcwJywgeWVhci5zbGljZSgyKV0uam9pbignJyk7XG4gIH0gLy8gQ2hlY2sgZGF0ZSB2YWxpZGl0eVxuXG5cbiAgdmFyIGRhdGUgPSBcIlwiLmNvbmNhdCh5ZWFyLCBcIi9cIikuY29uY2F0KHRpbi5zbGljZSgyLCA0KSwgXCIvXCIpLmNvbmNhdCh0aW4uc2xpY2UoMCwgMikpO1xuXG4gIGlmICghKDAsIF9pc0RhdGUuZGVmYXVsdCkoZGF0ZSwgJ1lZWVkvTU0vREQnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSAvLyBTcGxpdCBkaWdpdHMgaW50byBhbiBhcnJheSBmb3IgZnVydGhlciBwcm9jZXNzaW5nXG5cblxuICB2YXIgZGlnaXRzID0gdGluLnNwbGl0KCcnKS5tYXAoZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoYSwgMTApO1xuICB9KTtcbiAgdmFyIGNoZWNrc3VtID0gMDtcbiAgdmFyIHdlaWdodCA9IDQ7IC8vIE11bHRpcGx5IGJ5IHdlaWdodCBhbmQgYWRkIHRvIGNoZWNrc3VtXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCA5OyBpKyspIHtcbiAgICBjaGVja3N1bSArPSBkaWdpdHNbaV0gKiB3ZWlnaHQ7XG4gICAgd2VpZ2h0IC09IDE7XG5cbiAgICBpZiAod2VpZ2h0ID09PSAxKSB7XG4gICAgICB3ZWlnaHQgPSA3O1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrc3VtICU9IDExO1xuXG4gIGlmIChjaGVja3N1bSA9PT0gMSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBjaGVja3N1bSA9PT0gMCA/IGRpZ2l0c1s5XSA9PT0gMCA6IGRpZ2l0c1s5XSA9PT0gMTEgLSBjaGVja3N1bTtcbn1cbi8qXG4gKiBlbC1DWSB2YWxpZGF0aW9uIGZ1bmN0aW9uXG4gKiAoQXJpdGhtb3MgRm9yb2xvZ2lrb3UgTWl0cm9vdSAoQUZNL86RzqbOnCksIHBlcnNvbnMgb25seSlcbiAqIFZlcmlmeSBUSU4gdmFsaWRpdHkgYnkgY2FsY3VsYXRpbmcgQVNDSUkgdmFsdWUgb2YgY2hlY2sgKGxhc3QpIGNoYXJhY3RlclxuICovXG5cblxuZnVuY3Rpb24gZWxDeUNoZWNrKHRpbikge1xuICAvLyBzcGxpdCBkaWdpdHMgaW50byBhbiBhcnJheSBmb3IgZnVydGhlciBwcm9jZXNzaW5nXG4gIHZhciBkaWdpdHMgPSB0aW4uc2xpY2UoMCwgOCkuc3BsaXQoJycpLm1hcChmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybiBwYXJzZUludChhLCAxMCk7XG4gIH0pO1xuICB2YXIgY2hlY2tzdW0gPSAwOyAvLyBhZGQgZGlnaXRzIGluIGV2ZW4gcGxhY2VzXG5cbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBkaWdpdHMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICBjaGVja3N1bSArPSBkaWdpdHNbaV07XG4gIH0gLy8gYWRkIGRpZ2l0cyBpbiBvZGQgcGxhY2VzXG5cblxuICBmb3IgKHZhciBfaTIgPSAwOyBfaTIgPCBkaWdpdHMubGVuZ3RoOyBfaTIgKz0gMikge1xuICAgIGlmIChkaWdpdHNbX2kyXSA8IDIpIHtcbiAgICAgIGNoZWNrc3VtICs9IDEgLSBkaWdpdHNbX2kyXTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2hlY2tzdW0gKz0gMiAqIChkaWdpdHNbX2kyXSAtIDIpICsgNTtcblxuICAgICAgaWYgKGRpZ2l0c1tfaTJdID4gNCkge1xuICAgICAgICBjaGVja3N1bSArPSAyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGNoZWNrc3VtICUgMjYgKyA2NSkgPT09IHRpbi5jaGFyQXQoOCk7XG59XG4vKlxuICogZWwtR1IgdmFsaWRhdGlvbiBmdW5jdGlvblxuICogKEFyaXRobW9zIEZvcm9sb2dpa291IE1pdHJvb3UgKEFGTS/Okc6mzpwpLCBwZXJzb25zL2VudGl0aWVzKVxuICogVmVyaWZ5IFRJTiB2YWxpZGl0eSBieSBjYWxjdWxhdGluZyBjaGVjayAobGFzdCkgZGlnaXRcbiAqIEFsZ29yaXRobSBub3QgaW4gREcgVEFYVUQgZG9jdW1lbnQtIHNvdXJjZWQgZnJvbTpcbiAqIC0gYGh0dHA6Ly9lcGl4ZWlyaXNpLmdyLyVDRSU5QSVDRSVBMSVDRSU5OSVDRSVBMyVDRSU5OSVDRSU5QyVDRSU5MS0lQ0UlOTglQ0UlOTUlQ0UlOUMlQ0UlOTElQ0UlQTQlQ0UlOTEtJUNFJUE2JUNFJTlGJUNFJUExJUNFJTlGJUNFJTlCJUNFJTlGJUNFJTkzJUNFJTk5JUNFJTkxJUNFJUEzLSVDRSU5QSVDRSU5MSVDRSU5OS0lQ0UlOUIlQ0UlOUYlQ0UlOTMlQ0UlOTklQ0UlQTMlQ0UlQTQlQ0UlOTklQ0UlOUElQ0UlOTclQ0UlQTMvMjM3OTEvJUNFJTkxJUNGJTgxJUNFJUI5JUNFJUI4JUNFJUJDJUNGJThDJUNGJTgyLSVDRSVBNiVDRSVCRiVDRiU4MSVDRSVCRiVDRSVCQiVDRSVCRiVDRSVCMyVDRSVCOSVDRSVCQSVDRSVCRiVDRiU4RC0lQ0UlOUMlQ0UlQjclQ0YlODQlQ0YlODElQ0YlOEUlQ0UlQkYlQ0YlODVgXG4gKi9cblxuXG5mdW5jdGlvbiBlbEdyQ2hlY2sodGluKSB7XG4gIC8vIHNwbGl0IGRpZ2l0cyBpbnRvIGFuIGFycmF5IGZvciBmdXJ0aGVyIHByb2Nlc3NpbmdcbiAgdmFyIGRpZ2l0cyA9IHRpbi5zcGxpdCgnJykubWFwKGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KGEsIDEwKTtcbiAgfSk7XG4gIHZhciBjaGVja3N1bSA9IDA7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICBjaGVja3N1bSArPSBkaWdpdHNbaV0gKiBNYXRoLnBvdygyLCA4IC0gaSk7XG4gIH1cblxuICByZXR1cm4gY2hlY2tzdW0gJSAxMSAlIDEwID09PSBkaWdpdHNbOF07XG59XG4vKlxuICogZW4tR0IgdmFsaWRhdGlvbiBmdW5jdGlvbiAoc2hvdWxkIGdvIGhlcmUgaWYgbmVlZGVkKVxuICogKE5hdGlvbmFsIEluc3VyYW5jZSBOdW1iZXIgKE5JTk8pIG9yIFVuaXF1ZSBUYXhwYXllciBSZWZlcmVuY2UgKFVUUiksXG4gKiBwZXJzb25zL2VudGl0aWVzIHJlc3BlY3RpdmVseSlcbiAqL1xuXG4vKlxuICogZW4tSUUgdmFsaWRhdGlvbiBmdW5jdGlvblxuICogKFBlcnNvbmFsIFB1YmxpYyBTZXJ2aWNlIE51bWJlciAoUFBTIE5vKSwgcGVyc29ucyBvbmx5KVxuICogVmVyaWZ5IFRJTiB2YWxpZGl0eSBieSBjYWxjdWxhdGluZyBjaGVjayAoc2Vjb25kIHRvIGxhc3QpIGNoYXJhY3RlclxuICovXG5cblxuZnVuY3Rpb24gZW5JZUNoZWNrKHRpbikge1xuICB2YXIgY2hlY2tzdW0gPSBhbGdvcml0aG1zLnJldmVyc2VNdWx0aXBseUFuZFN1bSh0aW4uc3BsaXQoJycpLnNsaWNlKDAsIDcpLm1hcChmdW5jdGlvbiAoYSkge1xuICAgIHJldHVybiBwYXJzZUludChhLCAxMCk7XG4gIH0pLCA4KTtcblxuICBpZiAodGluLmxlbmd0aCA9PT0gOSAmJiB0aW5bOF0gIT09ICdXJykge1xuICAgIGNoZWNrc3VtICs9ICh0aW5bOF0uY2hhckNvZGVBdCgwKSAtIDY0KSAqIDk7XG4gIH1cblxuICBjaGVja3N1bSAlPSAyMztcblxuICBpZiAoY2hlY2tzdW0gPT09IDApIHtcbiAgICByZXR1cm4gdGluWzddLnRvVXBwZXJDYXNlKCkgPT09ICdXJztcbiAgfVxuXG4gIHJldHVybiB0aW5bN10udG9VcHBlckNhc2UoKSA9PT0gU3RyaW5nLmZyb21DaGFyQ29kZSg2NCArIGNoZWNrc3VtKTtcbn0gLy8gVmFsaWQgVVMgSVJTIGNhbXB1cyBwcmVmaXhlc1xuXG5cbnZhciBlblVzQ2FtcHVzUHJlZml4ID0ge1xuICBhbmRvdmVyOiBbJzEwJywgJzEyJ10sXG4gIGF0bGFudGE6IFsnNjAnLCAnNjcnXSxcbiAgYXVzdGluOiBbJzUwJywgJzUzJ10sXG4gIGJyb29raGF2ZW46IFsnMDEnLCAnMDInLCAnMDMnLCAnMDQnLCAnMDUnLCAnMDYnLCAnMTEnLCAnMTMnLCAnMTQnLCAnMTYnLCAnMjEnLCAnMjInLCAnMjMnLCAnMjUnLCAnMzQnLCAnNTEnLCAnNTInLCAnNTQnLCAnNTUnLCAnNTYnLCAnNTcnLCAnNTgnLCAnNTknLCAnNjUnXSxcbiAgY2luY2lubmF0aTogWyczMCcsICczMicsICczNScsICczNicsICczNycsICczOCcsICc2MSddLFxuICBmcmVzbm86IFsnMTUnLCAnMjQnXSxcbiAgaW50ZXJuZXQ6IFsnMjAnLCAnMjYnLCAnMjcnLCAnNDUnLCAnNDYnLCAnNDcnXSxcbiAga2Fuc2FzOiBbJzQwJywgJzQ0J10sXG4gIG1lbXBoaXM6IFsnOTQnLCAnOTUnXSxcbiAgb2dkZW46IFsnODAnLCAnOTAnXSxcbiAgcGhpbGFkZWxwaGlhOiBbJzMzJywgJzM5JywgJzQxJywgJzQyJywgJzQzJywgJzQ2JywgJzQ4JywgJzYyJywgJzYzJywgJzY0JywgJzY2JywgJzY4JywgJzcxJywgJzcyJywgJzczJywgJzc0JywgJzc1JywgJzc2JywgJzc3JywgJzgxJywgJzgyJywgJzgzJywgJzg0JywgJzg1JywgJzg2JywgJzg3JywgJzg4JywgJzkxJywgJzkyJywgJzkzJywgJzk4JywgJzk5J10sXG4gIHNiYTogWyczMSddXG59OyAvLyBSZXR1cm4gYW4gYXJyYXkgb2YgYWxsIFVTIElSUyBjYW1wdXMgcHJlZml4ZXNcblxuZnVuY3Rpb24gZW5Vc0dldFByZWZpeGVzKCkge1xuICB2YXIgcHJlZml4ZXMgPSBbXTtcblxuICBmb3IgKHZhciBsb2NhdGlvbiBpbiBlblVzQ2FtcHVzUHJlZml4KSB7XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2dvdHdhcmxvc3QvaXN0YW5idWwvYmxvYi9tYXN0ZXIvaWdub3JpbmctY29kZS1mb3ItY292ZXJhZ2UubWQjaWdub3JpbmctY29kZS1mb3ItY292ZXJhZ2UtcHVycG9zZXNcbiAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgZWxzZVxuICAgIGlmIChlblVzQ2FtcHVzUHJlZml4Lmhhc093blByb3BlcnR5KGxvY2F0aW9uKSkge1xuICAgICAgcHJlZml4ZXMucHVzaC5hcHBseShwcmVmaXhlcywgX3RvQ29uc3VtYWJsZUFycmF5KGVuVXNDYW1wdXNQcmVmaXhbbG9jYXRpb25dKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHByZWZpeGVzO1xufVxuLypcbiAqIGVuLVVTIHZhbGlkYXRpb24gZnVuY3Rpb25cbiAqIFZlcmlmeSB0aGF0IHRoZSBUSU4gc3RhcnRzIHdpdGggYSB2YWxpZCBJUlMgY2FtcHVzIHByZWZpeFxuICovXG5cblxuZnVuY3Rpb24gZW5Vc0NoZWNrKHRpbikge1xuICByZXR1cm4gZW5Vc0dldFByZWZpeGVzKCkuaW5kZXhPZih0aW4uc2xpY2UoMCwgMikpICE9PSAtMTtcbn1cbi8qXG4gKiBlcy1FUyB2YWxpZGF0aW9uIGZ1bmN0aW9uXG4gKiAoRG9jdW1lbnRvIE5hY2lvbmFsIGRlIElkZW50aWRhZCAoRE5JKVxuICogb3IgTsO6bWVybyBkZSBJZGVudGlmaWNhY2nDs24gZGUgRXh0cmFuamVybyAoTklFKSwgcGVyc29ucyBvbmx5KVxuICogVmVyaWZ5IFRJTiB2YWxpZGl0eSBieSBjYWxjdWxhdGluZyBjaGVjayAobGFzdCkgY2hhcmFjdGVyXG4gKi9cblxuXG5mdW5jdGlvbiBlc0VzQ2hlY2sodGluKSB7XG4gIC8vIFNwbGl0IGNoYXJhY3RlcnMgaW50byBhbiBhcnJheSBmb3IgZnVydGhlciBwcm9jZXNzaW5nXG4gIHZhciBjaGFycyA9IHRpbi50b1VwcGVyQ2FzZSgpLnNwbGl0KCcnKTsgLy8gUmVwbGFjZSBpbml0aWFsIGxldHRlciBpZiBuZWVkZWRcblxuICBpZiAoaXNOYU4ocGFyc2VJbnQoY2hhcnNbMF0sIDEwKSkgJiYgY2hhcnMubGVuZ3RoID4gMSkge1xuICAgIHZhciBsZWFkX3JlcGxhY2UgPSAwO1xuXG4gICAgc3dpdGNoIChjaGFyc1swXSkge1xuICAgICAgY2FzZSAnWSc6XG4gICAgICAgIGxlYWRfcmVwbGFjZSA9IDE7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdaJzpcbiAgICAgICAgbGVhZF9yZXBsYWNlID0gMjtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgfVxuXG4gICAgY2hhcnMuc3BsaWNlKDAsIDEsIGxlYWRfcmVwbGFjZSk7IC8vIEZpbGwgd2l0aCB6ZXJvcyBpZiBzbWFsbGVyIHRoYW4gcHJvcGVyXG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKGNoYXJzLmxlbmd0aCA8IDkpIHtcbiAgICAgIGNoYXJzLnVuc2hpZnQoMCk7XG4gICAgfVxuICB9IC8vIENhbGN1bGF0ZSBjaGVja3N1bSBhbmQgY2hlY2sgYWNjb3JkaW5nIHRvIGxvb2t1cFxuXG5cbiAgdmFyIGxvb2t1cCA9IFsnVCcsICdSJywgJ1cnLCAnQScsICdHJywgJ00nLCAnWScsICdGJywgJ1AnLCAnRCcsICdYJywgJ0InLCAnTicsICdKJywgJ1onLCAnUycsICdRJywgJ1YnLCAnSCcsICdMJywgJ0MnLCAnSycsICdFJ107XG4gIGNoYXJzID0gY2hhcnMuam9pbignJyk7XG4gIHZhciBjaGVja3N1bSA9IHBhcnNlSW50KGNoYXJzLnNsaWNlKDAsIDgpLCAxMCkgJSAyMztcbiAgcmV0dXJuIGNoYXJzWzhdID09PSBsb29rdXBbY2hlY2tzdW1dO1xufVxuLypcbiAqIGV0LUVFIHZhbGlkYXRpb24gZnVuY3Rpb25cbiAqIChJc2lrdWtvb2QgKElLKSwgcGVyc29ucyBvbmx5KVxuICogQ2hlY2tzIGlmIGJpcnRoIGRhdGUgKGNlbnR1cnkgZGlnaXQgYW5kIHNpeCBmb2xsb3dpbmcpIGlzIHZhbGlkIGFuZCBjYWxjdWxhdGVzIGNoZWNrIChsYXN0KSBkaWdpdFxuICogTWF0ZXJpYWwgbm90IGluIERHIFRBWFVEIGRvY3VtZW50IHNvdXJjZWQgZnJvbTpcbiAqIC0gYGh0dHBzOi8vd3d3Lm9lY2Qub3JnL3RheC9hdXRvbWF0aWMtZXhjaGFuZ2UvY3JzLWltcGxlbWVudGF0aW9uLWFuZC1hc3Npc3RhbmNlL3RheC1pZGVudGlmaWNhdGlvbi1udW1iZXJzL0VzdG9uaWEtVElOLnBkZmBcbiAqL1xuXG5cbmZ1bmN0aW9uIGV0RWVDaGVjayh0aW4pIHtcbiAgLy8gRXh0cmFjdCB5ZWFyIGFuZCBhZGQgY2VudHVyeVxuICB2YXIgZnVsbF95ZWFyID0gdGluLnNsaWNlKDEsIDMpO1xuICB2YXIgY2VudHVyeV9kaWdpdCA9IHRpbi5zbGljZSgwLCAxKTtcblxuICBzd2l0Y2ggKGNlbnR1cnlfZGlnaXQpIHtcbiAgICBjYXNlICcxJzpcbiAgICBjYXNlICcyJzpcbiAgICAgIGZ1bGxfeWVhciA9IFwiMThcIi5jb25jYXQoZnVsbF95ZWFyKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnMyc6XG4gICAgY2FzZSAnNCc6XG4gICAgICBmdWxsX3llYXIgPSBcIjE5XCIuY29uY2F0KGZ1bGxfeWVhcik7XG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICBmdWxsX3llYXIgPSBcIjIwXCIuY29uY2F0KGZ1bGxfeWVhcik7XG4gICAgICBicmVhaztcbiAgfSAvLyBDaGVjayBkYXRlIHZhbGlkaXR5XG5cblxuICB2YXIgZGF0ZSA9IFwiXCIuY29uY2F0KGZ1bGxfeWVhciwgXCIvXCIpLmNvbmNhdCh0aW4uc2xpY2UoMywgNSksIFwiL1wiKS5jb25jYXQodGluLnNsaWNlKDUsIDcpKTtcblxuICBpZiAoISgwLCBfaXNEYXRlLmRlZmF1bHQpKGRhdGUsICdZWVlZL01NL0REJykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gLy8gU3BsaXQgZGlnaXRzIGludG8gYW4gYXJyYXkgZm9yIGZ1cnRoZXIgcHJvY2Vzc2luZ1xuXG5cbiAgdmFyIGRpZ2l0cyA9IHRpbi5zcGxpdCgnJykubWFwKGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KGEsIDEwKTtcbiAgfSk7XG4gIHZhciBjaGVja3N1bSA9IDA7XG4gIHZhciB3ZWlnaHQgPSAxOyAvLyBNdWx0aXBseSBieSB3ZWlnaHQgYW5kIGFkZCB0byBjaGVja3N1bVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgIGNoZWNrc3VtICs9IGRpZ2l0c1tpXSAqIHdlaWdodDtcbiAgICB3ZWlnaHQgKz0gMTtcblxuICAgIGlmICh3ZWlnaHQgPT09IDEwKSB7XG4gICAgICB3ZWlnaHQgPSAxO1xuICAgIH1cbiAgfSAvLyBEbyBhZ2FpbiBpZiBtb2R1bG8gMTEgb2YgY2hlY2tzdW0gaXMgMTBcblxuXG4gIGlmIChjaGVja3N1bSAlIDExID09PSAxMCkge1xuICAgIGNoZWNrc3VtID0gMDtcbiAgICB3ZWlnaHQgPSAzO1xuXG4gICAgZm9yICh2YXIgX2kzID0gMDsgX2kzIDwgMTA7IF9pMysrKSB7XG4gICAgICBjaGVja3N1bSArPSBkaWdpdHNbX2kzXSAqIHdlaWdodDtcbiAgICAgIHdlaWdodCArPSAxO1xuXG4gICAgICBpZiAod2VpZ2h0ID09PSAxMCkge1xuICAgICAgICB3ZWlnaHQgPSAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjaGVja3N1bSAlIDExID09PSAxMCkge1xuICAgICAgcmV0dXJuIGRpZ2l0c1sxMF0gPT09IDA7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNoZWNrc3VtICUgMTEgPT09IGRpZ2l0c1sxMF07XG59XG4vKlxuICogZmktRkkgdmFsaWRhdGlvbiBmdW5jdGlvblxuICogKEhlbmtpbMO2dHVubnVzIChIRVRVKSwgcGVyc29ucyBvbmx5KVxuICogQ2hlY2tzIGlmIGJpcnRoIGRhdGUgKGZpcnN0IHNpeCBkaWdpdHMgcGx1cyBjZW50dXJ5IHN5bWJvbCkgaXMgdmFsaWRcbiAqIGFuZCBjYWxjdWxhdGVzIGNoZWNrIChsYXN0KSBkaWdpdFxuICovXG5cblxuZnVuY3Rpb24gZmlGaUNoZWNrKHRpbikge1xuICAvLyBFeHRyYWN0IHllYXIgYW5kIGFkZCBjZW50dXJ5XG4gIHZhciBmdWxsX3llYXIgPSB0aW4uc2xpY2UoNCwgNik7XG4gIHZhciBjZW50dXJ5X3N5bWJvbCA9IHRpbi5zbGljZSg2LCA3KTtcblxuICBzd2l0Y2ggKGNlbnR1cnlfc3ltYm9sKSB7XG4gICAgY2FzZSAnKyc6XG4gICAgICBmdWxsX3llYXIgPSBcIjE4XCIuY29uY2F0KGZ1bGxfeWVhcik7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJy0nOlxuICAgICAgZnVsbF95ZWFyID0gXCIxOVwiLmNvbmNhdChmdWxsX3llYXIpO1xuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgZnVsbF95ZWFyID0gXCIyMFwiLmNvbmNhdChmdWxsX3llYXIpO1xuICAgICAgYnJlYWs7XG4gIH0gLy8gQ2hlY2sgZGF0ZSB2YWxpZGl0eVxuXG5cbiAgdmFyIGRhdGUgPSBcIlwiLmNvbmNhdChmdWxsX3llYXIsIFwiL1wiKS5jb25jYXQodGluLnNsaWNlKDIsIDQpLCBcIi9cIikuY29uY2F0KHRpbi5zbGljZSgwLCAyKSk7XG5cbiAgaWYgKCEoMCwgX2lzRGF0ZS5kZWZhdWx0KShkYXRlLCAnWVlZWS9NTS9ERCcpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IC8vIENhbGN1bGF0ZSBjaGVjayBjaGFyYWN0ZXJcblxuXG4gIHZhciBjaGVja3N1bSA9IHBhcnNlSW50KHRpbi5zbGljZSgwLCA2KSArIHRpbi5zbGljZSg3LCAxMCksIDEwKSAlIDMxO1xuXG4gIGlmIChjaGVja3N1bSA8IDEwKSB7XG4gICAgcmV0dXJuIGNoZWNrc3VtID09PSBwYXJzZUludCh0aW4uc2xpY2UoMTApLCAxMCk7XG4gIH1cblxuICBjaGVja3N1bSAtPSAxMDtcbiAgdmFyIGxldHRlcnNfbG9va3VwID0gWydBJywgJ0InLCAnQycsICdEJywgJ0UnLCAnRicsICdIJywgJ0onLCAnSycsICdMJywgJ00nLCAnTicsICdQJywgJ1InLCAnUycsICdUJywgJ1UnLCAnVicsICdXJywgJ1gnLCAnWSddO1xuICByZXR1cm4gbGV0dGVyc19sb29rdXBbY2hlY2tzdW1dID09PSB0aW4uc2xpY2UoMTApO1xufVxuLypcbiAqIGZyL25sLUJFIHZhbGlkYXRpb24gZnVuY3Rpb25cbiAqIChOdW3DqXJvIG5hdGlvbmFsIChOLk4uKSwgcGVyc29ucyBvbmx5KVxuICogQ2hlY2tzIGlmIGJpcnRoIGRhdGUgKGZpcnN0IHNpeCBkaWdpdHMpIGlzIHZhbGlkIGFuZCBjYWxjdWxhdGVzIGNoZWNrIChsYXN0IHR3bykgZGlnaXRzXG4gKi9cblxuXG5mdW5jdGlvbiBmckJlQ2hlY2sodGluKSB7XG4gIC8vIFplcm8gbW9udGgvZGF5IHZhbHVlIGlzIGFjY2VwdGFibGVcbiAgaWYgKHRpbi5zbGljZSgyLCA0KSAhPT0gJzAwJyB8fCB0aW4uc2xpY2UoNCwgNikgIT09ICcwMCcpIHtcbiAgICAvLyBFeHRyYWN0IGRhdGUgZnJvbSBmaXJzdCBzaXggZGlnaXRzIG9mIFRJTlxuICAgIHZhciBkYXRlID0gXCJcIi5jb25jYXQodGluLnNsaWNlKDAsIDIpLCBcIi9cIikuY29uY2F0KHRpbi5zbGljZSgyLCA0KSwgXCIvXCIpLmNvbmNhdCh0aW4uc2xpY2UoNCwgNikpO1xuXG4gICAgaWYgKCEoMCwgX2lzRGF0ZS5kZWZhdWx0KShkYXRlLCAnWVkvTU0vREQnKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjaGVja3N1bSA9IDk3IC0gcGFyc2VJbnQodGluLnNsaWNlKDAsIDkpLCAxMCkgJSA5NztcbiAgdmFyIGNoZWNrZGlnaXRzID0gcGFyc2VJbnQodGluLnNsaWNlKDksIDExKSwgMTApO1xuXG4gIGlmIChjaGVja3N1bSAhPT0gY2hlY2tkaWdpdHMpIHtcbiAgICBjaGVja3N1bSA9IDk3IC0gcGFyc2VJbnQoXCIyXCIuY29uY2F0KHRpbi5zbGljZSgwLCA5KSksIDEwKSAlIDk3O1xuXG4gICAgaWYgKGNoZWNrc3VtICE9PSBjaGVja2RpZ2l0cykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuLypcbiAqIGZyLUZSIHZhbGlkYXRpb24gZnVuY3Rpb25cbiAqIChOdW3DqXJvIGZpc2NhbCBkZSByw6lmw6lyZW5jZSAobnVtw6lybyBTUEkpLCBwZXJzb25zIG9ubHkpXG4gKiBWZXJpZnkgVElOIHZhbGlkaXR5IGJ5IGNhbGN1bGF0aW5nIGNoZWNrIChsYXN0IHRocmVlKSBkaWdpdHNcbiAqL1xuXG5cbmZ1bmN0aW9uIGZyRnJDaGVjayh0aW4pIHtcbiAgdGluID0gdGluLnJlcGxhY2UoL1xccy9nLCAnJyk7XG4gIHZhciBjaGVja3N1bSA9IHBhcnNlSW50KHRpbi5zbGljZSgwLCAxMCksIDEwKSAlIDUxMTtcbiAgdmFyIGNoZWNrZGlnaXRzID0gcGFyc2VJbnQodGluLnNsaWNlKDEwLCAxMyksIDEwKTtcbiAgcmV0dXJuIGNoZWNrc3VtID09PSBjaGVja2RpZ2l0cztcbn1cbi8qXG4gKiBmci9sYi1MVSB2YWxpZGF0aW9uIGZ1bmN0aW9uXG4gKiAobnVtw6lybyBk4oCZaWRlbnRpZmljYXRpb24gcGVyc29ubmVsbGUsIHBlcnNvbnMgb25seSlcbiAqIFZlcmlmeSBiaXJ0aCBkYXRlIHZhbGlkaXR5IGFuZCBydW4gTHVobiBhbmQgVmVyaG9lZmYgY2hlY2tzXG4gKi9cblxuXG5mdW5jdGlvbiBmckx1Q2hlY2sodGluKSB7XG4gIC8vIEV4dHJhY3QgZGF0ZSBhbmQgY2hlY2sgdmFsaWRpdHlcbiAgdmFyIGRhdGUgPSBcIlwiLmNvbmNhdCh0aW4uc2xpY2UoMCwgNCksIFwiL1wiKS5jb25jYXQodGluLnNsaWNlKDQsIDYpLCBcIi9cIikuY29uY2F0KHRpbi5zbGljZSg2LCA4KSk7XG5cbiAgaWYgKCEoMCwgX2lzRGF0ZS5kZWZhdWx0KShkYXRlLCAnWVlZWS9NTS9ERCcpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IC8vIFJ1biBMdWhuIGNoZWNrXG5cblxuICBpZiAoIWFsZ29yaXRobXMubHVobkNoZWNrKHRpbi5zbGljZSgwLCAxMikpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IC8vIFJlbW92ZSBMdWhuIGNoZWNrIGRpZ2l0IGFuZCBydW4gVmVyaG9lZmYgY2hlY2tcblxuXG4gIHJldHVybiBhbGdvcml0aG1zLnZlcmhvZWZmQ2hlY2soXCJcIi5jb25jYXQodGluLnNsaWNlKDAsIDExKSkuY29uY2F0KHRpblsxMl0pKTtcbn1cbi8qXG4gKiBoci1IUiB2YWxpZGF0aW9uIGZ1bmN0aW9uXG4gKiAoT3NvYm5pIGlkZW50aWZpa2FjaWpza2kgYnJvaiAoT0lCKSwgcGVyc29ucy9lbnRpdGllcylcbiAqIFZlcmlmeSBUSU4gdmFsaWRpdHkgYnkgY2FsbGluZyBpc283MDY0Q2hlY2soZGlnaXRzKVxuICovXG5cblxuZnVuY3Rpb24gaHJIckNoZWNrKHRpbikge1xuICByZXR1cm4gYWxnb3JpdGhtcy5pc283MDY0Q2hlY2sodGluKTtcbn1cbi8qXG4gKiBodS1IVSB2YWxpZGF0aW9uIGZ1bmN0aW9uXG4gKiAoQWTDs2F6b25vc8OtdMOzIGplbCwgcGVyc29ucyBvbmx5KVxuICogVmVyaWZ5IFRJTiB2YWxpZGl0eSBieSBjYWxjdWxhdGluZyBjaGVjayAobGFzdCkgZGlnaXRcbiAqL1xuXG5cbmZ1bmN0aW9uIGh1SHVDaGVjayh0aW4pIHtcbiAgLy8gc3BsaXQgZGlnaXRzIGludG8gYW4gYXJyYXkgZm9yIGZ1cnRoZXIgcHJvY2Vzc2luZ1xuICB2YXIgZGlnaXRzID0gdGluLnNwbGl0KCcnKS5tYXAoZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoYSwgMTApO1xuICB9KTtcbiAgdmFyIGNoZWNrc3VtID0gODtcblxuICBmb3IgKHZhciBpID0gMTsgaSA8IDk7IGkrKykge1xuICAgIGNoZWNrc3VtICs9IGRpZ2l0c1tpXSAqIChpICsgMSk7XG4gIH1cblxuICByZXR1cm4gY2hlY2tzdW0gJSAxMSA9PT0gZGlnaXRzWzldO1xufVxuLypcbiAqIGx0LUxUIHZhbGlkYXRpb24gZnVuY3Rpb24gKHNob3VsZCBnbyBoZXJlIGlmIG5lZWRlZClcbiAqIChBc21lbnMga29kYXMsIHBlcnNvbnMvZW50aXRpZXMgcmVzcGVjdGl2ZWx5KVxuICogQ3VycmVudCB2YWxpZGF0aW9uIGNoZWNrIGlzIGFsaWFzIG9mIGV0RWVDaGVjay0gc2FtZSBmb3JtYXQgYXBwbGllc1xuICovXG5cbi8qXG4gKiBpdC1JVCBmaXJzdC9sYXN0IG5hbWUgdmFsaWRpdHkgY2hlY2tcbiAqIEFjY2VwdHMgaXQtSVQgVElOLWVuY29kZWQgbmFtZXMgYXMgYSB0aHJlZS1lbGVtZW50IGNoYXJhY3RlciBhcnJheSBhbmQgY2hlY2tzIHRoZWlyIHZhbGlkaXR5XG4gKiBEdWUgdG8gbGFjayBvZiBjbGFyaXR5IGJldHdlZW4gcmVzb3VyY2VzIChcIkFyZSBvbmx5IEl0YWxpYW4gY29uc29uYW50cyB1c2VkP1xuICogV2hhdCBoYXBwZW5zIGlmIGEgcGVyc29uIGhhcyBYIGluIHRoZWlyIG5hbWU/XCIgZXRjLikgb25seSB0d28gdGVzdCBjb25kaXRpb25zXG4gKiBoYXZlIGJlZW4gaW1wbGVtZW50ZWQ6XG4gKiBWb3dlbHMgbWF5IG9ubHkgYmUgZm9sbG93ZWQgYnkgb3RoZXIgdm93ZWxzIG9yIGFuIFggY2hhcmFjdGVyXG4gKiBhbmQgWCBjaGFyYWN0ZXJzIGFmdGVyIHZvd2VscyBtYXkgb25seSBiZSBmb2xsb3dlZCBieSBvdGhlciBYIGNoYXJhY3RlcnMuXG4gKi9cblxuXG5mdW5jdGlvbiBpdEl0TmFtZUNoZWNrKG5hbWUpIHtcbiAgLy8gdHJ1ZSBhdCB0aGUgZmlyc3Qgb2NjdXJlbmNlIG9mIGEgdm93ZWxcbiAgdmFyIHZvd2VsZmxhZyA9IGZhbHNlOyAvLyB0cnVlIGF0IHRoZSBmaXJzdCBvY2N1cmVuY2Ugb2YgYW4gWCBBRlRFUiB2b3dlbFxuICAvLyAodG8gcHJvcGVybHkgaGFuZGxlIGxhc3QgbmFtZXMgd2l0aCBYIGFzIGNvbnNvbmFudClcblxuICB2YXIgeGZsYWcgPSBmYWxzZTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgIGlmICghdm93ZWxmbGFnICYmIC9bQUVJT1VdLy50ZXN0KG5hbWVbaV0pKSB7XG4gICAgICB2b3dlbGZsYWcgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoIXhmbGFnICYmIHZvd2VsZmxhZyAmJiBuYW1lW2ldID09PSAnWCcpIHtcbiAgICAgIHhmbGFnID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGkgPiAwKSB7XG4gICAgICBpZiAodm93ZWxmbGFnICYmICF4ZmxhZykge1xuICAgICAgICBpZiAoIS9bQUVJT1VdLy50ZXN0KG5hbWVbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh4ZmxhZykge1xuICAgICAgICBpZiAoIS9YLy50ZXN0KG5hbWVbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG4vKlxuICogaXQtSVQgdmFsaWRhdGlvbiBmdW5jdGlvblxuICogKENvZGljZSBmaXNjYWxlIChUSU4tSVQpLCBwZXJzb25zIG9ubHkpXG4gKiBWZXJpZnkgbmFtZSwgYmlydGggZGF0ZSBhbmQgY29kaWNlIGNhdGFzdGFsZSB2YWxpZGl0eVxuICogYW5kIGNhbGN1bGF0ZSBjaGVjayBjaGFyYWN0ZXIuXG4gKiBNYXRlcmlhbCBub3QgaW4gREctVEFYVUQgZG9jdW1lbnQgc291cmNlZCBmcm9tOlxuICogYGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0l0YWxpYW5fZmlzY2FsX2NvZGVgXG4gKi9cblxuXG5mdW5jdGlvbiBpdEl0Q2hlY2sodGluKSB7XG4gIC8vIENhcGl0YWxpemUgYW5kIHNwbGl0IGNoYXJhY3RlcnMgaW50byBhbiBhcnJheSBmb3IgZnVydGhlciBwcm9jZXNzaW5nXG4gIHZhciBjaGFycyA9IHRpbi50b1VwcGVyQ2FzZSgpLnNwbGl0KCcnKTsgLy8gQ2hlY2sgZmlyc3QgYW5kIGxhc3QgbmFtZSB2YWxpZGl0eSBjYWxsaW5nIGl0SXROYW1lQ2hlY2soKVxuXG4gIGlmICghaXRJdE5hbWVDaGVjayhjaGFycy5zbGljZSgwLCAzKSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoIWl0SXROYW1lQ2hlY2soY2hhcnMuc2xpY2UoMywgNikpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IC8vIENvbnZlcnQgbGV0dGVycyBpbiBudW1iZXIgc3BhY2VzIGJhY2sgdG8gbnVtYmVycyBpZiBhbnlcblxuXG4gIHZhciBudW1iZXJfbG9jYXRpb25zID0gWzYsIDcsIDksIDEwLCAxMiwgMTMsIDE0XTtcbiAgdmFyIG51bWJlcl9yZXBsYWNlID0ge1xuICAgIEw6ICcwJyxcbiAgICBNOiAnMScsXG4gICAgTjogJzInLFxuICAgIFA6ICczJyxcbiAgICBROiAnNCcsXG4gICAgUjogJzUnLFxuICAgIFM6ICc2JyxcbiAgICBUOiAnNycsXG4gICAgVTogJzgnLFxuICAgIFY6ICc5J1xuICB9O1xuXG4gIGZvciAodmFyIF9pNCA9IDAsIF9udW1iZXJfbG9jYXRpb25zID0gbnVtYmVyX2xvY2F0aW9uczsgX2k0IDwgX251bWJlcl9sb2NhdGlvbnMubGVuZ3RoOyBfaTQrKykge1xuICAgIHZhciBpID0gX251bWJlcl9sb2NhdGlvbnNbX2k0XTtcblxuICAgIGlmIChjaGFyc1tpXSBpbiBudW1iZXJfcmVwbGFjZSkge1xuICAgICAgY2hhcnMuc3BsaWNlKGksIDEsIG51bWJlcl9yZXBsYWNlW2NoYXJzW2ldXSk7XG4gICAgfVxuICB9IC8vIEV4dHJhY3QgbW9udGggYW5kIGRheSwgYW5kIGNoZWNrIGRhdGUgdmFsaWRpdHlcblxuXG4gIHZhciBtb250aF9yZXBsYWNlID0ge1xuICAgIEE6ICcwMScsXG4gICAgQjogJzAyJyxcbiAgICBDOiAnMDMnLFxuICAgIEQ6ICcwNCcsXG4gICAgRTogJzA1JyxcbiAgICBIOiAnMDYnLFxuICAgIEw6ICcwNycsXG4gICAgTTogJzA4JyxcbiAgICBQOiAnMDknLFxuICAgIFI6ICcxMCcsXG4gICAgUzogJzExJyxcbiAgICBUOiAnMTInXG4gIH07XG4gIHZhciBtb250aCA9IG1vbnRoX3JlcGxhY2VbY2hhcnNbOF1dO1xuICB2YXIgZGF5ID0gcGFyc2VJbnQoY2hhcnNbOV0gKyBjaGFyc1sxMF0sIDEwKTtcblxuICBpZiAoZGF5ID4gNDApIHtcbiAgICBkYXkgLT0gNDA7XG4gIH1cblxuICBpZiAoZGF5IDwgMTApIHtcbiAgICBkYXkgPSBcIjBcIi5jb25jYXQoZGF5KTtcbiAgfVxuXG4gIHZhciBkYXRlID0gXCJcIi5jb25jYXQoY2hhcnNbNl0pLmNvbmNhdChjaGFyc1s3XSwgXCIvXCIpLmNvbmNhdChtb250aCwgXCIvXCIpLmNvbmNhdChkYXkpO1xuXG4gIGlmICghKDAsIF9pc0RhdGUuZGVmYXVsdCkoZGF0ZSwgJ1lZL01NL0REJykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gLy8gQ2FsY3VsYXRlIGNoZWNrIGNoYXJhY3RlciBieSBhZGRpbmcgdXAgZXZlbiBhbmQgb2RkIGNoYXJhY3RlcnMgYXMgbnVtYmVyc1xuXG5cbiAgdmFyIGNoZWNrc3VtID0gMDtcblxuICBmb3IgKHZhciBfaTUgPSAxOyBfaTUgPCBjaGFycy5sZW5ndGggLSAxOyBfaTUgKz0gMikge1xuICAgIHZhciBjaGFyX3RvX2ludCA9IHBhcnNlSW50KGNoYXJzW19pNV0sIDEwKTtcblxuICAgIGlmIChpc05hTihjaGFyX3RvX2ludCkpIHtcbiAgICAgIGNoYXJfdG9faW50ID0gY2hhcnNbX2k1XS5jaGFyQ29kZUF0KDApIC0gNjU7XG4gICAgfVxuXG4gICAgY2hlY2tzdW0gKz0gY2hhcl90b19pbnQ7XG4gIH1cblxuICB2YXIgb2RkX2NvbnZlcnQgPSB7XG4gICAgLy8gTWFwcyBvZiBjaGFyYWN0ZXJzIGF0IG9kZCBwbGFjZXNcbiAgICBBOiAxLFxuICAgIEI6IDAsXG4gICAgQzogNSxcbiAgICBEOiA3LFxuICAgIEU6IDksXG4gICAgRjogMTMsXG4gICAgRzogMTUsXG4gICAgSDogMTcsXG4gICAgSTogMTksXG4gICAgSjogMjEsXG4gICAgSzogMixcbiAgICBMOiA0LFxuICAgIE06IDE4LFxuICAgIE46IDIwLFxuICAgIE86IDExLFxuICAgIFA6IDMsXG4gICAgUTogNixcbiAgICBSOiA4LFxuICAgIFM6IDEyLFxuICAgIFQ6IDE0LFxuICAgIFU6IDE2LFxuICAgIFY6IDEwLFxuICAgIFc6IDIyLFxuICAgIFg6IDI1LFxuICAgIFk6IDI0LFxuICAgIFo6IDIzLFxuICAgIDA6IDEsXG4gICAgMTogMFxuICB9O1xuXG4gIGZvciAodmFyIF9pNiA9IDA7IF9pNiA8IGNoYXJzLmxlbmd0aCAtIDE7IF9pNiArPSAyKSB7XG4gICAgdmFyIF9jaGFyX3RvX2ludCA9IDA7XG5cbiAgICBpZiAoY2hhcnNbX2k2XSBpbiBvZGRfY29udmVydCkge1xuICAgICAgX2NoYXJfdG9faW50ID0gb2RkX2NvbnZlcnRbY2hhcnNbX2k2XV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBtdWx0aXBsaWVyID0gcGFyc2VJbnQoY2hhcnNbX2k2XSwgMTApO1xuICAgICAgX2NoYXJfdG9faW50ID0gMiAqIG11bHRpcGxpZXIgKyAxO1xuXG4gICAgICBpZiAobXVsdGlwbGllciA+IDQpIHtcbiAgICAgICAgX2NoYXJfdG9faW50ICs9IDI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tzdW0gKz0gX2NoYXJfdG9faW50O1xuICB9XG5cbiAgaWYgKFN0cmluZy5mcm9tQ2hhckNvZGUoNjUgKyBjaGVja3N1bSAlIDI2KSAhPT0gY2hhcnNbMTVdKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG4vKlxuICogbHYtTFYgdmFsaWRhdGlvbiBmdW5jdGlvblxuICogKFBlcnNvbmFzIGtvZHMgKFBLKSwgcGVyc29ucyBvbmx5KVxuICogQ2hlY2sgdmFsaWRpdHkgb2YgYmlydGggZGF0ZSBhbmQgY2FsY3VsYXRlIGNoZWNrIChsYXN0KSBkaWdpdFxuICogU3VwcG9ydCBvbmx5IGZvciBvbGQgZm9ybWF0IG51bWJlcnMgKG5vdCBzdGFydGluZyB3aXRoICczMicsIGlzc3VlZCBiZWZvcmUgMjAxNy8wNy8wMSlcbiAqIE1hdGVyaWFsIG5vdCBpbiBERyBUQVhVRCBkb2N1bWVudCBzb3VyY2VkIGZyb206XG4gKiBgaHR0cHM6Ly9ib290LnJpdGFrYWZpamEubHYvZm9ydW1zL2luZGV4LnBocD8vdG9waWMvODgzMTQtcGVyc29uYXMta29kYS1hbGdvcml0bXMtJUM0JThEZWtzdW1tYS9gXG4gKi9cblxuXG5mdW5jdGlvbiBsdkx2Q2hlY2sodGluKSB7XG4gIHRpbiA9IHRpbi5yZXBsYWNlKC9cXFcvLCAnJyk7IC8vIEV4dHJhY3QgZGF0ZSBmcm9tIFRJTlxuXG4gIHZhciBkYXkgPSB0aW4uc2xpY2UoMCwgMik7XG5cbiAgaWYgKGRheSAhPT0gJzMyJykge1xuICAgIC8vIE5vIGRhdGUvY2hlY2tzdW0gY2hlY2sgaWYgbmV3IGZvcm1hdFxuICAgIHZhciBtb250aCA9IHRpbi5zbGljZSgyLCA0KTtcblxuICAgIGlmIChtb250aCAhPT0gJzAwJykge1xuICAgICAgLy8gTm8gZGF0ZSBjaGVjayBpZiB1bmtub3duIG1vbnRoXG4gICAgICB2YXIgZnVsbF95ZWFyID0gdGluLnNsaWNlKDQsIDYpO1xuXG4gICAgICBzd2l0Y2ggKHRpbls2XSkge1xuICAgICAgICBjYXNlICcwJzpcbiAgICAgICAgICBmdWxsX3llYXIgPSBcIjE4XCIuY29uY2F0KGZ1bGxfeWVhcik7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnMSc6XG4gICAgICAgICAgZnVsbF95ZWFyID0gXCIxOVwiLmNvbmNhdChmdWxsX3llYXIpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgZnVsbF95ZWFyID0gXCIyMFwiLmNvbmNhdChmdWxsX3llYXIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfSAvLyBDaGVjayBkYXRlIHZhbGlkaXR5XG5cblxuICAgICAgdmFyIGRhdGUgPSBcIlwiLmNvbmNhdChmdWxsX3llYXIsIFwiL1wiKS5jb25jYXQodGluLnNsaWNlKDIsIDQpLCBcIi9cIikuY29uY2F0KGRheSk7XG5cbiAgICAgIGlmICghKDAsIF9pc0RhdGUuZGVmYXVsdCkoZGF0ZSwgJ1lZWVkvTU0vREQnKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSAvLyBDYWxjdWxhdGUgY2hlY2sgZGlnaXRcblxuXG4gICAgdmFyIGNoZWNrc3VtID0gMTEwMTtcbiAgICB2YXIgbXVsdGlwX2xvb2t1cCA9IFsxLCA2LCAzLCA3LCA5LCAxMCwgNSwgOCwgNCwgMl07XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRpbi5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIGNoZWNrc3VtIC09IHBhcnNlSW50KHRpbltpXSwgMTApICogbXVsdGlwX2xvb2t1cFtpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyc2VJbnQodGluWzEwXSwgMTApID09PSBjaGVja3N1bSAlIDExO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG4vKlxuICogbXQtTVQgdmFsaWRhdGlvbiBmdW5jdGlvblxuICogKElkZW50aXR5IENhcmQgTnVtYmVyIG9yIFVuaXF1ZSBUYXhwYXllciBSZWZlcmVuY2UsIHBlcnNvbnMvZW50aXRpZXMpXG4gKiBWZXJpZnkgSWRlbnRpdHkgQ2FyZCBOdW1iZXIgc3RydWN0dXJlIChubyBvdGhlciB0ZXN0cyBmb3VuZClcbiAqL1xuXG5cbmZ1bmN0aW9uIG10TXRDaGVjayh0aW4pIHtcbiAgaWYgKHRpbi5sZW5ndGggIT09IDkpIHtcbiAgICAvLyBObyB0ZXN0cyBmb3IgVVRSXG4gICAgdmFyIGNoYXJzID0gdGluLnRvVXBwZXJDYXNlKCkuc3BsaXQoJycpOyAvLyBGaWxsIHdpdGggemVyb3MgaWYgc21hbGxlciB0aGFuIHByb3BlclxuXG4gICAgd2hpbGUgKGNoYXJzLmxlbmd0aCA8IDgpIHtcbiAgICAgIGNoYXJzLnVuc2hpZnQoMCk7XG4gICAgfSAvLyBWYWxpZGF0ZSBmb3JtYXQgYWNjb3JkaW5nIHRvIGxhc3QgY2hhcmFjdGVyXG5cblxuICAgIHN3aXRjaCAodGluWzddKSB7XG4gICAgICBjYXNlICdBJzpcbiAgICAgIGNhc2UgJ1AnOlxuICAgICAgICBpZiAocGFyc2VJbnQoY2hhcnNbNl0sIDEwKSA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB7XG4gICAgICAgICAgdmFyIGZpcnN0X3BhcnQgPSBwYXJzZUludChjaGFycy5qb2luKCcnKS5zbGljZSgwLCA1KSwgMTApO1xuXG4gICAgICAgICAgaWYgKGZpcnN0X3BhcnQgPiAzMjAwMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBzZWNvbmRfcGFydCA9IHBhcnNlSW50KGNoYXJzLmpvaW4oJycpLnNsaWNlKDUsIDcpLCAxMCk7XG5cbiAgICAgICAgICBpZiAoZmlyc3RfcGFydCA9PT0gc2Vjb25kX3BhcnQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cbi8qXG4gKiBubC1OTCB2YWxpZGF0aW9uIGZ1bmN0aW9uXG4gKiAoQnVyZ2Vyc2VydmljZW51bW1lciAoQlNOKSBvciBSZWNodHNwZXJzb25lbiBTYW1lbndlcmtpbmdzdmVyYmFuZGVuIEluZm9ybWF0aWUgTnVtbWVyIChSU0lOKSxcbiAqIHBlcnNvbnMvZW50aXRpZXMgcmVzcGVjdGl2ZWx5KVxuICogVmVyaWZ5IFRJTiB2YWxpZGl0eSBieSBjYWxjdWxhdGluZyBjaGVjayAobGFzdCkgZGlnaXQgKHZhcmlhbnQgb2YgTU9EIDExKVxuICovXG5cblxuZnVuY3Rpb24gbmxObENoZWNrKHRpbikge1xuICByZXR1cm4gYWxnb3JpdGhtcy5yZXZlcnNlTXVsdGlwbHlBbmRTdW0odGluLnNwbGl0KCcnKS5zbGljZSgwLCA4KS5tYXAoZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoYSwgMTApO1xuICB9KSwgOSkgJSAxMSA9PT0gcGFyc2VJbnQodGluWzhdLCAxMCk7XG59XG4vKlxuICogcGwtUEwgdmFsaWRhdGlvbiBmdW5jdGlvblxuICogKFBvd3N6ZWNobnkgRWxla3Ryb25pY3pueSBTeXN0ZW0gRXdpZGVuY2ppIEx1ZG5vxZtjaSAoUEVTRUwpXG4gKiBvciBOdW1lciBpZGVudHlmaWthY2ppIHBvZGF0a293ZWogKE5JUCksIHBlcnNvbnMvZW50aXRpZXMpXG4gKiBWZXJpZnkgVElOIHZhbGlkaXR5IGJ5IHZhbGlkYXRpbmcgYmlydGggZGF0ZSAoUEVTRUwpIGFuZCBjYWxjdWxhdGluZyBjaGVjayAobGFzdCkgZGlnaXRcbiAqL1xuXG5cbmZ1bmN0aW9uIHBsUGxDaGVjayh0aW4pIHtcbiAgLy8gTklQXG4gIGlmICh0aW4ubGVuZ3RoID09PSAxMCkge1xuICAgIC8vIENhbGN1bGF0ZSBsYXN0IGRpZ2l0IGJ5IG11bHRpcGx5aW5nIHdpdGggbG9va3VwXG4gICAgdmFyIGxvb2t1cCA9IFs2LCA1LCA3LCAyLCAzLCA0LCA1LCA2LCA3XTtcbiAgICB2YXIgX2NoZWNrc3VtID0gMDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG9va3VwLmxlbmd0aDsgaSsrKSB7XG4gICAgICBfY2hlY2tzdW0gKz0gcGFyc2VJbnQodGluW2ldLCAxMCkgKiBsb29rdXBbaV07XG4gICAgfVxuXG4gICAgX2NoZWNrc3VtICU9IDExO1xuXG4gICAgaWYgKF9jaGVja3N1bSA9PT0gMTApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gX2NoZWNrc3VtID09PSBwYXJzZUludCh0aW5bOV0sIDEwKTtcbiAgfSAvLyBQRVNFTFxuICAvLyBFeHRyYWN0IGZ1bGwgeWVhciB1c2luZyBtb250aFxuXG5cbiAgdmFyIGZ1bGxfeWVhciA9IHRpbi5zbGljZSgwLCAyKTtcbiAgdmFyIG1vbnRoID0gcGFyc2VJbnQodGluLnNsaWNlKDIsIDQpLCAxMCk7XG5cbiAgaWYgKG1vbnRoID4gODApIHtcbiAgICBmdWxsX3llYXIgPSBcIjE4XCIuY29uY2F0KGZ1bGxfeWVhcik7XG4gICAgbW9udGggLT0gODA7XG4gIH0gZWxzZSBpZiAobW9udGggPiA2MCkge1xuICAgIGZ1bGxfeWVhciA9IFwiMjJcIi5jb25jYXQoZnVsbF95ZWFyKTtcbiAgICBtb250aCAtPSA2MDtcbiAgfSBlbHNlIGlmIChtb250aCA+IDQwKSB7XG4gICAgZnVsbF95ZWFyID0gXCIyMVwiLmNvbmNhdChmdWxsX3llYXIpO1xuICAgIG1vbnRoIC09IDQwO1xuICB9IGVsc2UgaWYgKG1vbnRoID4gMjApIHtcbiAgICBmdWxsX3llYXIgPSBcIjIwXCIuY29uY2F0KGZ1bGxfeWVhcik7XG4gICAgbW9udGggLT0gMjA7XG4gIH0gZWxzZSB7XG4gICAgZnVsbF95ZWFyID0gXCIxOVwiLmNvbmNhdChmdWxsX3llYXIpO1xuICB9IC8vIEFkZCBsZWFkaW5nIHplcm8gdG8gbW9udGggaWYgbmVlZGVkXG5cblxuICBpZiAobW9udGggPCAxMCkge1xuICAgIG1vbnRoID0gXCIwXCIuY29uY2F0KG1vbnRoKTtcbiAgfSAvLyBDaGVjayBkYXRlIHZhbGlkaXR5XG5cblxuICB2YXIgZGF0ZSA9IFwiXCIuY29uY2F0KGZ1bGxfeWVhciwgXCIvXCIpLmNvbmNhdChtb250aCwgXCIvXCIpLmNvbmNhdCh0aW4uc2xpY2UoNCwgNikpO1xuXG4gIGlmICghKDAsIF9pc0RhdGUuZGVmYXVsdCkoZGF0ZSwgJ1lZWVkvTU0vREQnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSAvLyBDYWxjdWxhdGUgbGFzdCBkaWdpdCBieSBtdWxpdHBseWluZyB3aXRoIG9kZCBvbmUtZGlnaXQgbnVtYmVycyBleGNlcHQgNVxuXG5cbiAgdmFyIGNoZWNrc3VtID0gMDtcbiAgdmFyIG11bHRpcGxpZXIgPSAxO1xuXG4gIGZvciAodmFyIF9pNyA9IDA7IF9pNyA8IHRpbi5sZW5ndGggLSAxOyBfaTcrKykge1xuICAgIGNoZWNrc3VtICs9IHBhcnNlSW50KHRpbltfaTddLCAxMCkgKiBtdWx0aXBsaWVyICUgMTA7XG4gICAgbXVsdGlwbGllciArPSAyO1xuXG4gICAgaWYgKG11bHRpcGxpZXIgPiAxMCkge1xuICAgICAgbXVsdGlwbGllciA9IDE7XG4gICAgfSBlbHNlIGlmIChtdWx0aXBsaWVyID09PSA1KSB7XG4gICAgICBtdWx0aXBsaWVyICs9IDI7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tzdW0gPSAxMCAtIGNoZWNrc3VtICUgMTA7XG4gIHJldHVybiBjaGVja3N1bSA9PT0gcGFyc2VJbnQodGluWzEwXSwgMTApO1xufVxuLypcbiogcHQtQlIgdmFsaWRhdGlvbiBmdW5jdGlvblxuKiAoQ2FkYXN0cm8gZGUgUGVzc29hcyBGw61zaWNhcyAoQ1BGLCBwZXJzb25zKVxuKiBDYWRhc3RybyBOYWNpb25hbCBkZSBQZXNzb2FzIEp1csOtZGljYXMgKENOUEosIGVudGl0aWVzKVxuKiBCb3RoIGlucHV0cyB3aWxsIGJlIHZhbGlkYXRlZFxuKi9cblxuXG5mdW5jdGlvbiBwdEJyQ2hlY2sodGluKSB7XG4gIGlmICh0aW4ubGVuZ3RoID09PSAxMSkge1xuICAgIHZhciBfc3VtO1xuXG4gICAgdmFyIHJlbWFpbmRlcjtcbiAgICBfc3VtID0gMDtcbiAgICBpZiAoIC8vIFJlamVjdCBrbm93biBpbnZhbGlkIENQRnNcbiAgICB0aW4gPT09ICcxMTExMTExMTExMScgfHwgdGluID09PSAnMjIyMjIyMjIyMjInIHx8IHRpbiA9PT0gJzMzMzMzMzMzMzMzJyB8fCB0aW4gPT09ICc0NDQ0NDQ0NDQ0NCcgfHwgdGluID09PSAnNTU1NTU1NTU1NTUnIHx8IHRpbiA9PT0gJzY2NjY2NjY2NjY2JyB8fCB0aW4gPT09ICc3Nzc3Nzc3Nzc3NycgfHwgdGluID09PSAnODg4ODg4ODg4ODgnIHx8IHRpbiA9PT0gJzk5OTk5OTk5OTk5JyB8fCB0aW4gPT09ICcwMDAwMDAwMDAwMCcpIHJldHVybiBmYWxzZTtcblxuICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IDk7IGkrKykge1xuICAgICAgX3N1bSArPSBwYXJzZUludCh0aW4uc3Vic3RyaW5nKGkgLSAxLCBpKSwgMTApICogKDExIC0gaSk7XG4gICAgfVxuXG4gICAgcmVtYWluZGVyID0gX3N1bSAqIDEwICUgMTE7XG4gICAgaWYgKHJlbWFpbmRlciA9PT0gMTApIHJlbWFpbmRlciA9IDA7XG4gICAgaWYgKHJlbWFpbmRlciAhPT0gcGFyc2VJbnQodGluLnN1YnN0cmluZyg5LCAxMCksIDEwKSkgcmV0dXJuIGZhbHNlO1xuICAgIF9zdW0gPSAwO1xuXG4gICAgZm9yICh2YXIgX2k4ID0gMTsgX2k4IDw9IDEwOyBfaTgrKykge1xuICAgICAgX3N1bSArPSBwYXJzZUludCh0aW4uc3Vic3RyaW5nKF9pOCAtIDEsIF9pOCksIDEwKSAqICgxMiAtIF9pOCk7XG4gICAgfVxuXG4gICAgcmVtYWluZGVyID0gX3N1bSAqIDEwICUgMTE7XG4gICAgaWYgKHJlbWFpbmRlciA9PT0gMTApIHJlbWFpbmRlciA9IDA7XG4gICAgaWYgKHJlbWFpbmRlciAhPT0gcGFyc2VJbnQodGluLnN1YnN0cmluZygxMCwgMTEpLCAxMCkpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmICggLy8gUmVqZWN0IGtub3cgaW52YWxpZCBDTlBKc1xuICB0aW4gPT09ICcwMDAwMDAwMDAwMDAwMCcgfHwgdGluID09PSAnMTExMTExMTExMTExMTEnIHx8IHRpbiA9PT0gJzIyMjIyMjIyMjIyMjIyJyB8fCB0aW4gPT09ICczMzMzMzMzMzMzMzMzMycgfHwgdGluID09PSAnNDQ0NDQ0NDQ0NDQ0NDQnIHx8IHRpbiA9PT0gJzU1NTU1NTU1NTU1NTU1JyB8fCB0aW4gPT09ICc2NjY2NjY2NjY2NjY2NicgfHwgdGluID09PSAnNzc3Nzc3Nzc3Nzc3NzcnIHx8IHRpbiA9PT0gJzg4ODg4ODg4ODg4ODg4JyB8fCB0aW4gPT09ICc5OTk5OTk5OTk5OTk5OScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgbGVuZ3RoID0gdGluLmxlbmd0aCAtIDI7XG4gIHZhciBpZGVudGlmaWVycyA9IHRpbi5zdWJzdHJpbmcoMCwgbGVuZ3RoKTtcbiAgdmFyIHZlcmlmaWNhdG9ycyA9IHRpbi5zdWJzdHJpbmcobGVuZ3RoKTtcbiAgdmFyIHN1bSA9IDA7XG4gIHZhciBwb3MgPSBsZW5ndGggLSA3O1xuXG4gIGZvciAodmFyIF9pOSA9IGxlbmd0aDsgX2k5ID49IDE7IF9pOS0tKSB7XG4gICAgc3VtICs9IGlkZW50aWZpZXJzLmNoYXJBdChsZW5ndGggLSBfaTkpICogcG9zO1xuICAgIHBvcyAtPSAxO1xuXG4gICAgaWYgKHBvcyA8IDIpIHtcbiAgICAgIHBvcyA9IDk7XG4gICAgfVxuICB9XG5cbiAgdmFyIHJlc3VsdCA9IHN1bSAlIDExIDwgMiA/IDAgOiAxMSAtIHN1bSAlIDExO1xuXG4gIGlmIChyZXN1bHQgIT09IHBhcnNlSW50KHZlcmlmaWNhdG9ycy5jaGFyQXQoMCksIDEwKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGxlbmd0aCArPSAxO1xuICBpZGVudGlmaWVycyA9IHRpbi5zdWJzdHJpbmcoMCwgbGVuZ3RoKTtcbiAgc3VtID0gMDtcbiAgcG9zID0gbGVuZ3RoIC0gNztcblxuICBmb3IgKHZhciBfaTEwID0gbGVuZ3RoOyBfaTEwID49IDE7IF9pMTAtLSkge1xuICAgIHN1bSArPSBpZGVudGlmaWVycy5jaGFyQXQobGVuZ3RoIC0gX2kxMCkgKiBwb3M7XG4gICAgcG9zIC09IDE7XG5cbiAgICBpZiAocG9zIDwgMikge1xuICAgICAgcG9zID0gOTtcbiAgICB9XG4gIH1cblxuICByZXN1bHQgPSBzdW0gJSAxMSA8IDIgPyAwIDogMTEgLSBzdW0gJSAxMTtcblxuICBpZiAocmVzdWx0ICE9PSBwYXJzZUludCh2ZXJpZmljYXRvcnMuY2hhckF0KDEpLCAxMCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cbi8qXG4gKiBwdC1QVCB2YWxpZGF0aW9uIGZ1bmN0aW9uXG4gKiAoTsO6bWVybyBkZSBpZGVudGlmaWNhw6fDo28gZmlzY2FsIChOSUYpLCBwZXJzb25zL2VudGl0aWVzKVxuICogVmVyaWZ5IFRJTiB2YWxpZGl0eSBieSBjYWxjdWxhdGluZyBjaGVjayAobGFzdCkgZGlnaXQgKHZhcmlhbnQgb2YgTU9EIDExKVxuICovXG5cblxuZnVuY3Rpb24gcHRQdENoZWNrKHRpbikge1xuICB2YXIgY2hlY2tzdW0gPSAxMSAtIGFsZ29yaXRobXMucmV2ZXJzZU11bHRpcGx5QW5kU3VtKHRpbi5zcGxpdCgnJykuc2xpY2UoMCwgOCkubWFwKGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KGEsIDEwKTtcbiAgfSksIDkpICUgMTE7XG5cbiAgaWYgKGNoZWNrc3VtID4gOSkge1xuICAgIHJldHVybiBwYXJzZUludCh0aW5bOF0sIDEwKSA9PT0gMDtcbiAgfVxuXG4gIHJldHVybiBjaGVja3N1bSA9PT0gcGFyc2VJbnQodGluWzhdLCAxMCk7XG59XG4vKlxuICogcm8tUk8gdmFsaWRhdGlvbiBmdW5jdGlvblxuICogKENvZCBOdW1lcmljIFBlcnNvbmFsIChDTlApIG9yIENvZCBkZSDDrm5yZWdpc3RyYXJlIGZpc2NhbMSDIChDSUYpLFxuICogcGVyc29ucyBvbmx5KVxuICogVmVyaWZ5IENOUCB2YWxpZGl0eSBieSBjYWxjdWxhdGluZyBjaGVjayAobGFzdCkgZGlnaXQgKHRlc3Qgbm90IGZvdW5kIGZvciBDSUYpXG4gKiBNYXRlcmlhbCBub3QgaW4gREcgVEFYVUQgZG9jdW1lbnQgc291cmNlZCBmcm9tOlxuICogYGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL05hdGlvbmFsX2lkZW50aWZpY2F0aW9uX251bWJlciNSb21hbmlhYFxuICovXG5cblxuZnVuY3Rpb24gcm9Sb0NoZWNrKHRpbikge1xuICBpZiAodGluLnNsaWNlKDAsIDQpICE9PSAnOTAwMCcpIHtcbiAgICAvLyBObyB0ZXN0IGZvdW5kIGZvciB0aGlzIGZvcm1hdFxuICAgIC8vIEV4dHJhY3QgZnVsbCB5ZWFyIHVzaW5nIGNlbnR1cnkgZGlnaXQgaWYgcG9zc2libGVcbiAgICB2YXIgZnVsbF95ZWFyID0gdGluLnNsaWNlKDEsIDMpO1xuXG4gICAgc3dpdGNoICh0aW5bMF0pIHtcbiAgICAgIGNhc2UgJzEnOlxuICAgICAgY2FzZSAnMic6XG4gICAgICAgIGZ1bGxfeWVhciA9IFwiMTlcIi5jb25jYXQoZnVsbF95ZWFyKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJzMnOlxuICAgICAgY2FzZSAnNCc6XG4gICAgICAgIGZ1bGxfeWVhciA9IFwiMThcIi5jb25jYXQoZnVsbF95ZWFyKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJzUnOlxuICAgICAgY2FzZSAnNic6XG4gICAgICAgIGZ1bGxfeWVhciA9IFwiMjBcIi5jb25jYXQoZnVsbF95ZWFyKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgfSAvLyBDaGVjayBkYXRlIHZhbGlkaXR5XG5cblxuICAgIHZhciBkYXRlID0gXCJcIi5jb25jYXQoZnVsbF95ZWFyLCBcIi9cIikuY29uY2F0KHRpbi5zbGljZSgzLCA1KSwgXCIvXCIpLmNvbmNhdCh0aW4uc2xpY2UoNSwgNykpO1xuXG4gICAgaWYgKGRhdGUubGVuZ3RoID09PSA4KSB7XG4gICAgICBpZiAoISgwLCBfaXNEYXRlLmRlZmF1bHQpKGRhdGUsICdZWS9NTS9ERCcpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCEoMCwgX2lzRGF0ZS5kZWZhdWx0KShkYXRlLCAnWVlZWS9NTS9ERCcpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSAvLyBDYWxjdWxhdGUgY2hlY2sgZGlnaXRcblxuXG4gICAgdmFyIGRpZ2l0cyA9IHRpbi5zcGxpdCgnJykubWFwKGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnQoYSwgMTApO1xuICAgIH0pO1xuICAgIHZhciBtdWx0aXBsaWVycyA9IFsyLCA3LCA5LCAxLCA0LCA2LCAzLCA1LCA4LCAyLCA3LCA5XTtcbiAgICB2YXIgY2hlY2tzdW0gPSAwO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtdWx0aXBsaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgY2hlY2tzdW0gKz0gZGlnaXRzW2ldICogbXVsdGlwbGllcnNbaV07XG4gICAgfVxuXG4gICAgaWYgKGNoZWNrc3VtICUgMTEgPT09IDEwKSB7XG4gICAgICByZXR1cm4gZGlnaXRzWzEyXSA9PT0gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGlnaXRzWzEyXSA9PT0gY2hlY2tzdW0gJSAxMTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuLypcbiAqIHNrLVNLIHZhbGlkYXRpb24gZnVuY3Rpb25cbiAqIChSb2Ruw6kgxI3DrXNsbyAoUsSMKSBvciBiZXp2w716bmFtb3bDqSBpZGVudGlmaWthxI1uw6kgxI3DrXNsbyAoQknEjCksIHBlcnNvbnMgb25seSlcbiAqIENoZWNrcyB2YWxpZGl0eSBvZiBwcmUtMTk1NCBiaXJ0aCBudW1iZXJzIChyb2Ruw6kgxI3DrXNsbykgb25seVxuICogRHVlIHRvIHRoZSBpbnRyb2R1Y3Rpb24gb2YgdGhlIHBzZXVkby1yYW5kb20gQknEjCBpdCBpcyBub3QgcG9zc2libGUgdG8gdGVzdFxuICogcG9zdC0xOTU0IGJpcnRoIG51bWJlcnMgd2l0aG91dCBrbm93aW5nIHdoZXRoZXIgdGhleSBhcmUgQknEjCBvciBSxIwgYmVmb3JlaGFuZFxuICovXG5cblxuZnVuY3Rpb24gc2tTa0NoZWNrKHRpbikge1xuICBpZiAodGluLmxlbmd0aCA9PT0gOSkge1xuICAgIHRpbiA9IHRpbi5yZXBsYWNlKC9cXFcvLCAnJyk7XG5cbiAgICBpZiAodGluLnNsaWNlKDYpID09PSAnMDAwJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gLy8gVGhyZWUtemVybyBzZXJpYWwgbm90IGFzc2lnbmVkIGJlZm9yZSAxOTU0XG4gICAgLy8gRXh0cmFjdCBmdWxsIHllYXIgZnJvbSBUSU4gbGVuZ3RoXG5cblxuICAgIHZhciBmdWxsX3llYXIgPSBwYXJzZUludCh0aW4uc2xpY2UoMCwgMiksIDEwKTtcblxuICAgIGlmIChmdWxsX3llYXIgPiA1Mykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChmdWxsX3llYXIgPCAxMCkge1xuICAgICAgZnVsbF95ZWFyID0gXCIxOTBcIi5jb25jYXQoZnVsbF95ZWFyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZnVsbF95ZWFyID0gXCIxOVwiLmNvbmNhdChmdWxsX3llYXIpO1xuICAgIH0gLy8gRXh0cmFjdCBtb250aCBmcm9tIFRJTiBhbmQgbm9ybWFsaXplXG5cblxuICAgIHZhciBtb250aCA9IHBhcnNlSW50KHRpbi5zbGljZSgyLCA0KSwgMTApO1xuXG4gICAgaWYgKG1vbnRoID4gNTApIHtcbiAgICAgIG1vbnRoIC09IDUwO1xuICAgIH1cblxuICAgIGlmIChtb250aCA8IDEwKSB7XG4gICAgICBtb250aCA9IFwiMFwiLmNvbmNhdChtb250aCk7XG4gICAgfSAvLyBDaGVjayBkYXRlIHZhbGlkaXR5XG5cblxuICAgIHZhciBkYXRlID0gXCJcIi5jb25jYXQoZnVsbF95ZWFyLCBcIi9cIikuY29uY2F0KG1vbnRoLCBcIi9cIikuY29uY2F0KHRpbi5zbGljZSg0LCA2KSk7XG5cbiAgICBpZiAoISgwLCBfaXNEYXRlLmRlZmF1bHQpKGRhdGUsICdZWVlZL01NL0REJykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cbi8qXG4gKiBzbC1TSSB2YWxpZGF0aW9uIGZ1bmN0aW9uXG4gKiAoRGF2xI1uYSDFoXRldmlsa2EsIHBlcnNvbnMvZW50aXRpZXMpXG4gKiBWZXJpZnkgVElOIHZhbGlkaXR5IGJ5IGNhbGN1bGF0aW5nIGNoZWNrIChsYXN0KSBkaWdpdCAodmFyaWFudCBvZiBNT0QgMTEpXG4gKi9cblxuXG5mdW5jdGlvbiBzbFNpQ2hlY2sodGluKSB7XG4gIHZhciBjaGVja3N1bSA9IDExIC0gYWxnb3JpdGhtcy5yZXZlcnNlTXVsdGlwbHlBbmRTdW0odGluLnNwbGl0KCcnKS5zbGljZSgwLCA3KS5tYXAoZnVuY3Rpb24gKGEpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoYSwgMTApO1xuICB9KSwgOCkgJSAxMTtcblxuICBpZiAoY2hlY2tzdW0gPT09IDEwKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KHRpbls3XSwgMTApID09PSAwO1xuICB9XG5cbiAgcmV0dXJuIGNoZWNrc3VtID09PSBwYXJzZUludCh0aW5bN10sIDEwKTtcbn1cbi8qXG4gKiBzdi1TRSB2YWxpZGF0aW9uIGZ1bmN0aW9uXG4gKiAoUGVyc29ubnVtbWVyIG9yIHNhbW9yZG5pbmdzbnVtbWVyLCBwZXJzb25zIG9ubHkpXG4gKiBDaGVja3MgdmFsaWRpdHkgb2YgYmlydGggZGF0ZSBhbmQgY2FsbHMgbHVobkNoZWNrKCkgdG8gdmFsaWRhdGUgY2hlY2sgKGxhc3QpIGRpZ2l0XG4gKi9cblxuXG5mdW5jdGlvbiBzdlNlQ2hlY2sodGluKSB7XG4gIC8vIE1ha2UgY29weSBvZiBUSU4gYW5kIG5vcm1hbGl6ZSB0byB0d28tZGlnaXQgeWVhciBmb3JtXG4gIHZhciB0aW5fY29weSA9IHRpbi5zbGljZSgwKTtcblxuICBpZiAodGluLmxlbmd0aCA+IDExKSB7XG4gICAgdGluX2NvcHkgPSB0aW5fY29weS5zbGljZSgyKTtcbiAgfSAvLyBFeHRyYWN0IGRhdGUgb2YgYmlydGhcblxuXG4gIHZhciBmdWxsX3llYXIgPSAnJztcbiAgdmFyIG1vbnRoID0gdGluX2NvcHkuc2xpY2UoMiwgNCk7XG4gIHZhciBkYXkgPSBwYXJzZUludCh0aW5fY29weS5zbGljZSg0LCA2KSwgMTApO1xuXG4gIGlmICh0aW4ubGVuZ3RoID4gMTEpIHtcbiAgICBmdWxsX3llYXIgPSB0aW4uc2xpY2UoMCwgNCk7XG4gIH0gZWxzZSB7XG4gICAgZnVsbF95ZWFyID0gdGluLnNsaWNlKDAsIDIpO1xuXG4gICAgaWYgKHRpbi5sZW5ndGggPT09IDExICYmIGRheSA8IDYwKSB7XG4gICAgICAvLyBFeHRyYWN0IGZ1bGwgeWVhciBmcm9tIGNlbnRlbmFyaWFuIHN5bWJvbFxuICAgICAgLy8gU2hvdWxkIHdvcmsganVzdCBmaW5lIHVudGlsIHllYXIgMTAwMDAgb3Igc29cbiAgICAgIHZhciBjdXJyZW50X3llYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkudG9TdHJpbmcoKTtcbiAgICAgIHZhciBjdXJyZW50X2NlbnR1cnkgPSBwYXJzZUludChjdXJyZW50X3llYXIuc2xpY2UoMCwgMiksIDEwKTtcbiAgICAgIGN1cnJlbnRfeWVhciA9IHBhcnNlSW50KGN1cnJlbnRfeWVhciwgMTApO1xuXG4gICAgICBpZiAodGluWzZdID09PSAnLScpIHtcbiAgICAgICAgaWYgKHBhcnNlSW50KFwiXCIuY29uY2F0KGN1cnJlbnRfY2VudHVyeSkuY29uY2F0KGZ1bGxfeWVhciksIDEwKSA+IGN1cnJlbnRfeWVhcikge1xuICAgICAgICAgIGZ1bGxfeWVhciA9IFwiXCIuY29uY2F0KGN1cnJlbnRfY2VudHVyeSAtIDEpLmNvbmNhdChmdWxsX3llYXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZ1bGxfeWVhciA9IFwiXCIuY29uY2F0KGN1cnJlbnRfY2VudHVyeSkuY29uY2F0KGZ1bGxfeWVhcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bGxfeWVhciA9IFwiXCIuY29uY2F0KGN1cnJlbnRfY2VudHVyeSAtIDEpLmNvbmNhdChmdWxsX3llYXIpO1xuXG4gICAgICAgIGlmIChjdXJyZW50X3llYXIgLSBwYXJzZUludChmdWxsX3llYXIsIDEwKSA8IDEwMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSAvLyBOb3JtYWxpemUgZGF5IGFuZCBjaGVjayBkYXRlIHZhbGlkaXR5XG5cblxuICBpZiAoZGF5ID4gNjApIHtcbiAgICBkYXkgLT0gNjA7XG4gIH1cblxuICBpZiAoZGF5IDwgMTApIHtcbiAgICBkYXkgPSBcIjBcIi5jb25jYXQoZGF5KTtcbiAgfVxuXG4gIHZhciBkYXRlID0gXCJcIi5jb25jYXQoZnVsbF95ZWFyLCBcIi9cIikuY29uY2F0KG1vbnRoLCBcIi9cIikuY29uY2F0KGRheSk7XG5cbiAgaWYgKGRhdGUubGVuZ3RoID09PSA4KSB7XG4gICAgaWYgKCEoMCwgX2lzRGF0ZS5kZWZhdWx0KShkYXRlLCAnWVkvTU0vREQnKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSBlbHNlIGlmICghKDAsIF9pc0RhdGUuZGVmYXVsdCkoZGF0ZSwgJ1lZWVkvTU0vREQnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBhbGdvcml0aG1zLmx1aG5DaGVjayh0aW4ucmVwbGFjZSgvXFxXLywgJycpKTtcbn0gLy8gTG9jYWxlIGxvb2t1cCBvYmplY3RzXG5cbi8qXG4gKiBUYXggaWQgcmVnZXggZm9ybWF0cyBmb3IgdmFyaW91cyBsb2NhbGVzXG4gKlxuICogV2hlcmUgbm90IGV4cGxpY2l0bHkgc3BlY2lmaWVkIGluIERHLVRBWFVEIGRvY3VtZW50IGJvdGhcbiAqIHVwcGVyY2FzZSBhbmQgbG93ZXJjYXNlIGxldHRlcnMgYXJlIGFjY2VwdGFibGUuXG4gKi9cblxuXG52YXIgdGF4SWRGb3JtYXQgPSB7XG4gICdiZy1CRyc6IC9eXFxkezEwfSQvLFxuICAnY3MtQ1onOiAvXlxcZHs2fVxcL3swLDF9XFxkezMsNH0kLyxcbiAgJ2RlLUFUJzogL15cXGR7OX0kLyxcbiAgJ2RlLURFJzogL15bMS05XVxcZHsxMH0kLyxcbiAgJ2RrLURLJzogL15cXGR7Nn0tezAsMX1cXGR7NH0kLyxcbiAgJ2VsLUNZJzogL15bMDldXFxkezd9W0EtWl0kLyxcbiAgJ2VsLUdSJzogL14oWzAtNF18WzctOV0pXFxkezh9JC8sXG4gICdlbi1DQSc6IC9eXFxkezl9JC8sXG4gICdlbi1HQic6IC9eXFxkezEwfSR8Xig/IUdCfE5LfFROfFpaKSg/IVtERklRVVZdKVtBLVpdKD8hW0RGSVFVVk9dKVtBLVpdXFxkezZ9W0FCQ0QgXSQvaSxcbiAgJ2VuLUlFJzogL15cXGR7N31bQS1XXVtBLUlXXXswLDF9JC9pLFxuICAnZW4tVVMnOiAvXlxcZHsyfVstIF17MCwxfVxcZHs3fSQvLFxuICAnZXMtRVMnOiAvXihcXGR7MCw4fXxbWFlaS0xNXVxcZHs3fSlbQS1ISi1OUC1UVi1aXSQvaSxcbiAgJ2V0LUVFJzogL15bMS02XVxcZHs2fSgwMFsxLTldfDBbMS05XVswLTldfFsxLTZdWzAtOV17Mn18NzBbMC05XXw3MTApXFxkJC8sXG4gICdmaS1GSSc6IC9eXFxkezZ9Wy0rQV1cXGR7M31bMC05QS1GSEotTlBSLVldJC9pLFxuICAnZnItQkUnOiAvXlxcZHsxMX0kLyxcbiAgJ2ZyLUZSJzogL15bMC0zXVxcZHsxMn0kfF5bMC0zXVxcZFxcc1xcZHsyfShcXHNcXGR7M30pezN9JC8sXG4gIC8vIENvbmZvcm1zIGJvdGggdG8gb2ZmaWNpYWwgc3BlYyBhbmQgcHJvdmlkZWQgZXhhbXBsZVxuICAnZnItTFUnOiAvXlxcZHsxM30kLyxcbiAgJ2hyLUhSJzogL15cXGR7MTF9JC8sXG4gICdodS1IVSc6IC9eOFxcZHs5fSQvLFxuICAnaXQtSVQnOiAvXltBLVpdezZ9W0wtTlAtVjAtOV17Mn1bQS1FSExNUFJTVF1bTC1OUC1WMC05XXsyfVtBLUlMTVpdW0wtTlAtVjAtOV17M31bQS1aXSQvaSxcbiAgJ2x2LUxWJzogL15cXGR7Nn0tezAsMX1cXGR7NX0kLyxcbiAgLy8gQ29uZm9ybXMgYm90aCB0byBERyBUQVhVRCBzcGVjIGFuZCBvcmlnaW5hbCByZXNlYXJjaFxuICAnbXQtTVQnOiAvXlxcZHszLDd9W0FQTUdMSEJaXSR8XihbMS04XSlcXDFcXGR7N30kL2ksXG4gICdubC1OTCc6IC9eXFxkezl9JC8sXG4gICdwbC1QTCc6IC9eXFxkezEwLDExfSQvLFxuICAncHQtQlInOiAvKD86XlxcZHsxMX0kKXwoPzpeXFxkezE0fSQpLyxcbiAgJ3B0LVBUJzogL15cXGR7OX0kLyxcbiAgJ3JvLVJPJzogL15cXGR7MTN9JC8sXG4gICdzay1TSyc6IC9eXFxkezZ9XFwvezAsMX1cXGR7Myw0fSQvLFxuICAnc2wtU0knOiAvXlsxLTldXFxkezd9JC8sXG4gICdzdi1TRSc6IC9eKFxcZHs2fVstK117MCwxfVxcZHs0fXwoMTh8MTl8MjApXFxkezZ9Wy0rXXswLDF9XFxkezR9KSQvXG59OyAvLyB0YXhJZEZvcm1hdCBsb2NhbGUgYWxpYXNlc1xuXG50YXhJZEZvcm1hdFsnbGItTFUnXSA9IHRheElkRm9ybWF0Wydmci1MVSddO1xudGF4SWRGb3JtYXRbJ2x0LUxUJ10gPSB0YXhJZEZvcm1hdFsnZXQtRUUnXTtcbnRheElkRm9ybWF0WydubC1CRSddID0gdGF4SWRGb3JtYXRbJ2ZyLUJFJ107XG50YXhJZEZvcm1hdFsnZnItQ0EnXSA9IHRheElkRm9ybWF0Wydlbi1DQSddOyAvLyBBbGdvcml0aG1pYyB0YXggaWQgY2hlY2sgZnVuY3Rpb25zIGZvciB2YXJpb3VzIGxvY2FsZXNcblxudmFyIHRheElkQ2hlY2sgPSB7XG4gICdiZy1CRyc6IGJnQmdDaGVjayxcbiAgJ2NzLUNaJzogY3NDekNoZWNrLFxuICAnZGUtQVQnOiBkZUF0Q2hlY2ssXG4gICdkZS1ERSc6IGRlRGVDaGVjayxcbiAgJ2RrLURLJzogZGtEa0NoZWNrLFxuICAnZWwtQ1knOiBlbEN5Q2hlY2ssXG4gICdlbC1HUic6IGVsR3JDaGVjayxcbiAgJ2VuLUNBJzogaXNDYW5hZGlhblNJTixcbiAgJ2VuLUlFJzogZW5JZUNoZWNrLFxuICAnZW4tVVMnOiBlblVzQ2hlY2ssXG4gICdlcy1FUyc6IGVzRXNDaGVjayxcbiAgJ2V0LUVFJzogZXRFZUNoZWNrLFxuICAnZmktRkknOiBmaUZpQ2hlY2ssXG4gICdmci1CRSc6IGZyQmVDaGVjayxcbiAgJ2ZyLUZSJzogZnJGckNoZWNrLFxuICAnZnItTFUnOiBmckx1Q2hlY2ssXG4gICdoci1IUic6IGhySHJDaGVjayxcbiAgJ2h1LUhVJzogaHVIdUNoZWNrLFxuICAnaXQtSVQnOiBpdEl0Q2hlY2ssXG4gICdsdi1MVic6IGx2THZDaGVjayxcbiAgJ210LU1UJzogbXRNdENoZWNrLFxuICAnbmwtTkwnOiBubE5sQ2hlY2ssXG4gICdwbC1QTCc6IHBsUGxDaGVjayxcbiAgJ3B0LUJSJzogcHRCckNoZWNrLFxuICAncHQtUFQnOiBwdFB0Q2hlY2ssXG4gICdyby1STyc6IHJvUm9DaGVjayxcbiAgJ3NrLVNLJzogc2tTa0NoZWNrLFxuICAnc2wtU0knOiBzbFNpQ2hlY2ssXG4gICdzdi1TRSc6IHN2U2VDaGVja1xufTsgLy8gdGF4SWRDaGVjayBsb2NhbGUgYWxpYXNlc1xuXG50YXhJZENoZWNrWydsYi1MVSddID0gdGF4SWRDaGVja1snZnItTFUnXTtcbnRheElkQ2hlY2tbJ2x0LUxUJ10gPSB0YXhJZENoZWNrWydldC1FRSddO1xudGF4SWRDaGVja1snbmwtQkUnXSA9IHRheElkQ2hlY2tbJ2ZyLUJFJ107XG50YXhJZENoZWNrWydmci1DQSddID0gdGF4SWRDaGVja1snZW4tQ0EnXTsgLy8gUmVnZXhlcyBmb3IgbG9jYWxlcyB3aGVyZSBjaGFyYWN0ZXJzIHNob3VsZCBiZSBvbWl0dGVkIGJlZm9yZSBjaGVja2luZyBmb3JtYXRcblxudmFyIGFsbHN5bWJvbHMgPSAvWy1cXFxcXFwvIUAjJCVcXF4mXFwqXFwoXFwpXFwrXFw9XFxbXFxdXSsvZztcbnZhciBzYW5pdGl6ZVJlZ2V4ZXMgPSB7XG4gICdkZS1BVCc6IGFsbHN5bWJvbHMsXG4gICdkZS1ERSc6IC9bXFwvXFxcXF0vZyxcbiAgJ2ZyLUJFJzogYWxsc3ltYm9sc1xufTsgLy8gc2FuaXRpemVSZWdleGVzIGxvY2FsZSBhbGlhc2VzXG5cbnNhbml0aXplUmVnZXhlc1snbmwtQkUnXSA9IHNhbml0aXplUmVnZXhlc1snZnItQkUnXTtcbi8qXG4gKiBWYWxpZGF0b3IgZnVuY3Rpb25cbiAqIFJldHVybiB0cnVlIGlmIHRoZSBwYXNzZWQgc3RyaW5nIGlzIGEgdmFsaWQgdGF4IGlkZW50aWZpY2F0aW9uIG51bWJlclxuICogZm9yIHRoZSBzcGVjaWZpZWQgbG9jYWxlLlxuICogVGhyb3cgYW4gZXJyb3IgZXhjZXB0aW9uIGlmIHRoZSBsb2NhbGUgaXMgbm90IHN1cHBvcnRlZC5cbiAqL1xuXG5mdW5jdGlvbiBpc1RheElEKHN0cikge1xuICB2YXIgbG9jYWxlID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAnZW4tVVMnO1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpOyAvLyBDb3B5IFRJTiB0byBhdm9pZCByZXBsYWNlbWVudCBpZiBzYW5pdGl6ZWRcblxuICB2YXIgc3RyY29weSA9IHN0ci5zbGljZSgwKTtcblxuICBpZiAobG9jYWxlIGluIHRheElkRm9ybWF0KSB7XG4gICAgaWYgKGxvY2FsZSBpbiBzYW5pdGl6ZVJlZ2V4ZXMpIHtcbiAgICAgIHN0cmNvcHkgPSBzdHJjb3B5LnJlcGxhY2Uoc2FuaXRpemVSZWdleGVzW2xvY2FsZV0sICcnKTtcbiAgICB9XG5cbiAgICBpZiAoIXRheElkRm9ybWF0W2xvY2FsZV0udGVzdChzdHJjb3B5KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChsb2NhbGUgaW4gdGF4SWRDaGVjaykge1xuICAgICAgcmV0dXJuIHRheElkQ2hlY2tbbG9jYWxlXShzdHJjb3B5KTtcbiAgICB9IC8vIEZhbGx0aHJvdWdoOyBub3QgYWxsIGxvY2FsZXMgaGF2ZSBhbGdvcml0aG1pYyBjaGVja3NcblxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGxvY2FsZSAnXCIuY29uY2F0KGxvY2FsZSwgXCInXCIpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNUaW1lO1xuXG52YXIgX21lcmdlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL21lcmdlXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGRlZmF1bHRfdGltZV9vcHRpb25zID0ge1xuICBob3VyRm9ybWF0OiAnaG91cjI0JyxcbiAgbW9kZTogJ2RlZmF1bHQnXG59O1xudmFyIGZvcm1hdHMgPSB7XG4gIGhvdXIyNDoge1xuICAgIGRlZmF1bHQ6IC9eKFswMV0/WzAtOV18MlswLTNdKTooWzAtNV1bMC05XSkkLyxcbiAgICB3aXRoU2Vjb25kczogL14oWzAxXT9bMC05XXwyWzAtM10pOihbMC01XVswLTldKTooWzAtNV1bMC05XSkkL1xuICB9LFxuICBob3VyMTI6IHtcbiAgICBkZWZhdWx0OiAvXigwP1sxLTldfDFbMC0yXSk6KFswLTVdWzAtOV0pIChBfFApTSQvLFxuICAgIHdpdGhTZWNvbmRzOiAvXigwP1sxLTldfDFbMC0yXSk6KFswLTVdWzAtOV0pOihbMC01XVswLTldKSAoQXxQKU0kL1xuICB9XG59O1xuXG5mdW5jdGlvbiBpc1RpbWUoaW5wdXQsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9ICgwLCBfbWVyZ2UuZGVmYXVsdCkob3B0aW9ucywgZGVmYXVsdF90aW1lX29wdGlvbnMpO1xuICBpZiAodHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJykgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gZm9ybWF0c1tvcHRpb25zLmhvdXJGb3JtYXRdW29wdGlvbnMubW9kZV0udGVzdChpbnB1dCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzVVJMO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG52YXIgX2lzRlFETiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vaXNGUUROXCIpKTtcblxudmFyIF9pc0lQID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9pc0lQXCIpKTtcblxudmFyIF9tZXJnZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9tZXJnZVwiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8ICEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbi8qXG5vcHRpb25zIGZvciBpc1VSTCBtZXRob2RcblxucmVxdWlyZV9wcm90b2NvbCAtIGlmIHNldCBhcyB0cnVlIGlzVVJMIHdpbGwgcmV0dXJuIGZhbHNlIGlmIHByb3RvY29sIGlzIG5vdCBwcmVzZW50IGluIHRoZSBVUkxcbnJlcXVpcmVfdmFsaWRfcHJvdG9jb2wgLSBpc1VSTCB3aWxsIGNoZWNrIGlmIHRoZSBVUkwncyBwcm90b2NvbCBpcyBwcmVzZW50IGluIHRoZSBwcm90b2NvbHMgb3B0aW9uXG5wcm90b2NvbHMgLSB2YWxpZCBwcm90b2NvbHMgY2FuIGJlIG1vZGlmaWVkIHdpdGggdGhpcyBvcHRpb25cbnJlcXVpcmVfaG9zdCAtIGlmIHNldCBhcyBmYWxzZSBpc1VSTCB3aWxsIG5vdCBjaGVjayBpZiBob3N0IGlzIHByZXNlbnQgaW4gdGhlIFVSTFxucmVxdWlyZV9wb3J0IC0gaWYgc2V0IGFzIHRydWUgaXNVUkwgd2lsbCBjaGVjayBpZiBwb3J0IGlzIHByZXNlbnQgaW4gdGhlIFVSTFxuYWxsb3dfcHJvdG9jb2xfcmVsYXRpdmVfdXJscyAtIGlmIHNldCBhcyB0cnVlIHByb3RvY29sIHJlbGF0aXZlIFVSTHMgd2lsbCBiZSBhbGxvd2VkXG52YWxpZGF0ZV9sZW5ndGggLSBpZiBzZXQgYXMgZmFsc2UgaXNVUkwgd2lsbCBza2lwIHN0cmluZyBsZW5ndGggdmFsaWRhdGlvbiAoSUUgbWF4aW11bSBpcyAyMDgzKVxuXG4qL1xudmFyIGRlZmF1bHRfdXJsX29wdGlvbnMgPSB7XG4gIHByb3RvY29sczogWydodHRwJywgJ2h0dHBzJywgJ2Z0cCddLFxuICByZXF1aXJlX3RsZDogdHJ1ZSxcbiAgcmVxdWlyZV9wcm90b2NvbDogZmFsc2UsXG4gIHJlcXVpcmVfaG9zdDogdHJ1ZSxcbiAgcmVxdWlyZV9wb3J0OiBmYWxzZSxcbiAgcmVxdWlyZV92YWxpZF9wcm90b2NvbDogdHJ1ZSxcbiAgYWxsb3dfdW5kZXJzY29yZXM6IGZhbHNlLFxuICBhbGxvd190cmFpbGluZ19kb3Q6IGZhbHNlLFxuICBhbGxvd19wcm90b2NvbF9yZWxhdGl2ZV91cmxzOiBmYWxzZSxcbiAgYWxsb3dfZnJhZ21lbnRzOiB0cnVlLFxuICBhbGxvd19xdWVyeV9jb21wb25lbnRzOiB0cnVlLFxuICB2YWxpZGF0ZV9sZW5ndGg6IHRydWVcbn07XG52YXIgd3JhcHBlZF9pcHY2ID0gL15cXFsoW15cXF1dKylcXF0oPzo6KFswLTldKykpPyQvO1xuXG5mdW5jdGlvbiBpc1JlZ0V4cChvYmopIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBSZWdFeHBdJztcbn1cblxuZnVuY3Rpb24gY2hlY2tIb3N0KGhvc3QsIG1hdGNoZXMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXRjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIG1hdGNoID0gbWF0Y2hlc1tpXTtcblxuICAgIGlmIChob3N0ID09PSBtYXRjaCB8fCBpc1JlZ0V4cChtYXRjaCkgJiYgbWF0Y2gudGVzdChob3N0KSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBpc1VSTCh1cmwsIG9wdGlvbnMpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkodXJsKTtcblxuICBpZiAoIXVybCB8fCAvW1xcczw+XS8udGVzdCh1cmwpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHVybC5pbmRleE9mKCdtYWlsdG86JykgPT09IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBvcHRpb25zID0gKDAsIF9tZXJnZS5kZWZhdWx0KShvcHRpb25zLCBkZWZhdWx0X3VybF9vcHRpb25zKTtcblxuICBpZiAob3B0aW9ucy52YWxpZGF0ZV9sZW5ndGggJiYgdXJsLmxlbmd0aCA+PSAyMDgzKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKCFvcHRpb25zLmFsbG93X2ZyYWdtZW50cyAmJiB1cmwuaW5jbHVkZXMoJyMnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICghb3B0aW9ucy5hbGxvd19xdWVyeV9jb21wb25lbnRzICYmICh1cmwuaW5jbHVkZXMoJz8nKSB8fCB1cmwuaW5jbHVkZXMoJyYnKSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgcHJvdG9jb2wsIGF1dGgsIGhvc3QsIGhvc3RuYW1lLCBwb3J0LCBwb3J0X3N0ciwgc3BsaXQsIGlwdjY7XG4gIHNwbGl0ID0gdXJsLnNwbGl0KCcjJyk7XG4gIHVybCA9IHNwbGl0LnNoaWZ0KCk7XG4gIHNwbGl0ID0gdXJsLnNwbGl0KCc/Jyk7XG4gIHVybCA9IHNwbGl0LnNoaWZ0KCk7XG4gIHNwbGl0ID0gdXJsLnNwbGl0KCc6Ly8nKTtcblxuICBpZiAoc3BsaXQubGVuZ3RoID4gMSkge1xuICAgIHByb3RvY29sID0gc3BsaXQuc2hpZnQoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaWYgKG9wdGlvbnMucmVxdWlyZV92YWxpZF9wcm90b2NvbCAmJiBvcHRpb25zLnByb3RvY29scy5pbmRleE9mKHByb3RvY29sKSA9PT0gLTEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAob3B0aW9ucy5yZXF1aXJlX3Byb3RvY29sKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2UgaWYgKHVybC5zbGljZSgwLCAyKSA9PT0gJy8vJykge1xuICAgIGlmICghb3B0aW9ucy5hbGxvd19wcm90b2NvbF9yZWxhdGl2ZV91cmxzKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgc3BsaXRbMF0gPSB1cmwuc2xpY2UoMik7XG4gIH1cblxuICB1cmwgPSBzcGxpdC5qb2luKCc6Ly8nKTtcblxuICBpZiAodXJsID09PSAnJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHNwbGl0ID0gdXJsLnNwbGl0KCcvJyk7XG4gIHVybCA9IHNwbGl0LnNoaWZ0KCk7XG5cbiAgaWYgKHVybCA9PT0gJycgJiYgIW9wdGlvbnMucmVxdWlyZV9ob3N0KSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzcGxpdCA9IHVybC5zcGxpdCgnQCcpO1xuXG4gIGlmIChzcGxpdC5sZW5ndGggPiAxKSB7XG4gICAgaWYgKG9wdGlvbnMuZGlzYWxsb3dfYXV0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChzcGxpdFswXSA9PT0gJycpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBhdXRoID0gc3BsaXQuc2hpZnQoKTtcblxuICAgIGlmIChhdXRoLmluZGV4T2YoJzonKSA+PSAwICYmIGF1dGguc3BsaXQoJzonKS5sZW5ndGggPiAyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIF9hdXRoJHNwbGl0ID0gYXV0aC5zcGxpdCgnOicpLFxuICAgICAgICBfYXV0aCRzcGxpdDIgPSBfc2xpY2VkVG9BcnJheShfYXV0aCRzcGxpdCwgMiksXG4gICAgICAgIHVzZXIgPSBfYXV0aCRzcGxpdDJbMF0sXG4gICAgICAgIHBhc3N3b3JkID0gX2F1dGgkc3BsaXQyWzFdO1xuXG4gICAgaWYgKHVzZXIgPT09ICcnICYmIHBhc3N3b3JkID09PSAnJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGhvc3RuYW1lID0gc3BsaXQuam9pbignQCcpO1xuICBwb3J0X3N0ciA9IG51bGw7XG4gIGlwdjYgPSBudWxsO1xuICB2YXIgaXB2Nl9tYXRjaCA9IGhvc3RuYW1lLm1hdGNoKHdyYXBwZWRfaXB2Nik7XG5cbiAgaWYgKGlwdjZfbWF0Y2gpIHtcbiAgICBob3N0ID0gJyc7XG4gICAgaXB2NiA9IGlwdjZfbWF0Y2hbMV07XG4gICAgcG9ydF9zdHIgPSBpcHY2X21hdGNoWzJdIHx8IG51bGw7XG4gIH0gZWxzZSB7XG4gICAgc3BsaXQgPSBob3N0bmFtZS5zcGxpdCgnOicpO1xuICAgIGhvc3QgPSBzcGxpdC5zaGlmdCgpO1xuXG4gICAgaWYgKHNwbGl0Lmxlbmd0aCkge1xuICAgICAgcG9ydF9zdHIgPSBzcGxpdC5qb2luKCc6Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHBvcnRfc3RyICE9PSBudWxsICYmIHBvcnRfc3RyLmxlbmd0aCA+IDApIHtcbiAgICBwb3J0ID0gcGFyc2VJbnQocG9ydF9zdHIsIDEwKTtcblxuICAgIGlmICghL15bMC05XSskLy50ZXN0KHBvcnRfc3RyKSB8fCBwb3J0IDw9IDAgfHwgcG9ydCA+IDY1NTM1KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9IGVsc2UgaWYgKG9wdGlvbnMucmVxdWlyZV9wb3J0KSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuaG9zdF93aGl0ZWxpc3QpIHtcbiAgICByZXR1cm4gY2hlY2tIb3N0KGhvc3QsIG9wdGlvbnMuaG9zdF93aGl0ZWxpc3QpO1xuICB9XG5cbiAgaWYgKGhvc3QgPT09ICcnICYmICFvcHRpb25zLnJlcXVpcmVfaG9zdCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKCEoMCwgX2lzSVAuZGVmYXVsdCkoaG9zdCkgJiYgISgwLCBfaXNGUUROLmRlZmF1bHQpKGhvc3QsIG9wdGlvbnMpICYmICghaXB2NiB8fCAhKDAsIF9pc0lQLmRlZmF1bHQpKGlwdjYsIDYpKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGhvc3QgPSBob3N0IHx8IGlwdjY7XG5cbiAgaWYgKG9wdGlvbnMuaG9zdF9ibGFja2xpc3QgJiYgY2hlY2tIb3N0KGhvc3QsIG9wdGlvbnMuaG9zdF9ibGFja2xpc3QpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzVVVJRDtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIHV1aWQgPSB7XG4gIDE6IC9eWzAtOUEtRl17OH0tWzAtOUEtRl17NH0tMVswLTlBLUZdezN9LVswLTlBLUZdezR9LVswLTlBLUZdezEyfSQvaSxcbiAgMjogL15bMC05QS1GXXs4fS1bMC05QS1GXXs0fS0yWzAtOUEtRl17M30tWzAtOUEtRl17NH0tWzAtOUEtRl17MTJ9JC9pLFxuICAzOiAvXlswLTlBLUZdezh9LVswLTlBLUZdezR9LTNbMC05QS1GXXszfS1bMC05QS1GXXs0fS1bMC05QS1GXXsxMn0kL2ksXG4gIDQ6IC9eWzAtOUEtRl17OH0tWzAtOUEtRl17NH0tNFswLTlBLUZdezN9LVs4OUFCXVswLTlBLUZdezN9LVswLTlBLUZdezEyfSQvaSxcbiAgNTogL15bMC05QS1GXXs4fS1bMC05QS1GXXs0fS01WzAtOUEtRl17M30tWzg5QUJdWzAtOUEtRl17M30tWzAtOUEtRl17MTJ9JC9pLFxuICBhbGw6IC9eWzAtOUEtRl17OH0tWzAtOUEtRl17NH0tWzAtOUEtRl17NH0tWzAtOUEtRl17NH0tWzAtOUEtRl17MTJ9JC9pXG59O1xuXG5mdW5jdGlvbiBpc1VVSUQoc3RyLCB2ZXJzaW9uKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIHZhciBwYXR0ZXJuID0gdXVpZFshW3VuZGVmaW5lZCwgbnVsbF0uaW5jbHVkZXModmVyc2lvbikgPyB2ZXJzaW9uIDogJ2FsbCddO1xuICByZXR1cm4gISFwYXR0ZXJuICYmIHBhdHRlcm4udGVzdChzdHIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc1VwcGVyY2FzZTtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gaXNVcHBlcmNhc2Uoc3RyKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIHJldHVybiBzdHIgPT09IHN0ci50b1VwcGVyQ2FzZSgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzVkFUO1xuZXhwb3J0cy52YXRNYXRjaGVycyA9IHZvaWQgMDtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxudmFyIGFsZ29yaXRobXMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiLi91dGlsL2FsZ29yaXRobXNcIikpO1xuXG5mdW5jdGlvbiBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUoKSB7IGlmICh0eXBlb2YgV2Vha01hcCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDsgdmFyIGNhY2hlID0gbmV3IFdlYWtNYXAoKTsgX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlID0gZnVuY3Rpb24gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKCkgeyByZXR1cm4gY2FjaGU7IH07IHJldHVybiBjYWNoZTsgfVxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGlmIChvYmogPT09IG51bGwgfHwgX3R5cGVvZihvYmopICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiBvYmogIT09IFwiZnVuY3Rpb25cIikgeyByZXR1cm4geyBkZWZhdWx0OiBvYmogfTsgfSB2YXIgY2FjaGUgPSBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUoKTsgaWYgKGNhY2hlICYmIGNhY2hlLmhhcyhvYmopKSB7IHJldHVybiBjYWNoZS5nZXQob2JqKTsgfSB2YXIgbmV3T2JqID0ge307IHZhciBoYXNQcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkgJiYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgeyB2YXIgZGVzYyA9IGhhc1Byb3BlcnR5RGVzY3JpcHRvciA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpIDogbnVsbDsgaWYgKGRlc2MgJiYgKGRlc2MuZ2V0IHx8IGRlc2Muc2V0KSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkobmV3T2JqLCBrZXksIGRlc2MpOyB9IGVsc2UgeyBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgaWYgKGNhY2hlKSB7IGNhY2hlLnNldChvYmosIG5ld09iaik7IH0gcmV0dXJuIG5ld09iajsgfVxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgUFQgPSBmdW5jdGlvbiBQVChzdHIpIHtcbiAgdmFyIG1hdGNoID0gc3RyLm1hdGNoKC9eKFBUKT8oXFxkezl9KSQvKTtcblxuICBpZiAoIW1hdGNoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIHRpbiA9IG1hdGNoWzJdO1xuICB2YXIgY2hlY2tzdW0gPSAxMSAtIGFsZ29yaXRobXMucmV2ZXJzZU11bHRpcGx5QW5kU3VtKHRpbi5zcGxpdCgnJykuc2xpY2UoMCwgOCkubWFwKGZ1bmN0aW9uIChhKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KGEsIDEwKTtcbiAgfSksIDkpICUgMTE7XG5cbiAgaWYgKGNoZWNrc3VtID4gOSkge1xuICAgIHJldHVybiBwYXJzZUludCh0aW5bOF0sIDEwKSA9PT0gMDtcbiAgfVxuXG4gIHJldHVybiBjaGVja3N1bSA9PT0gcGFyc2VJbnQodGluWzhdLCAxMCk7XG59O1xuXG52YXIgdmF0TWF0Y2hlcnMgPSB7XG4gIC8qKlxyXG4gICAqIEV1cm9wZWFuIFVuaW9uIFZBVCBpZGVudGlmaWNhdGlvbiBudW1iZXJzXHJcbiAgICovXG4gIEFUOiBmdW5jdGlvbiBBVChzdHIpIHtcbiAgICByZXR1cm4gL14oQVQpP1VcXGR7OH0kLy50ZXN0KHN0cik7XG4gIH0sXG4gIEJFOiBmdW5jdGlvbiBCRShzdHIpIHtcbiAgICByZXR1cm4gL14oQkUpP1xcZHsxMH0kLy50ZXN0KHN0cik7XG4gIH0sXG4gIEJHOiBmdW5jdGlvbiBCRyhzdHIpIHtcbiAgICByZXR1cm4gL14oQkcpP1xcZHs5LDEwfSQvLnRlc3Qoc3RyKTtcbiAgfSxcbiAgSFI6IGZ1bmN0aW9uIEhSKHN0cikge1xuICAgIHJldHVybiAvXihIUik/XFxkezExfSQvLnRlc3Qoc3RyKTtcbiAgfSxcbiAgQ1k6IGZ1bmN0aW9uIENZKHN0cikge1xuICAgIHJldHVybiAvXihDWSk/XFx3ezl9JC8udGVzdChzdHIpO1xuICB9LFxuICBDWjogZnVuY3Rpb24gQ1ooc3RyKSB7XG4gICAgcmV0dXJuIC9eKENaKT9cXGR7OCwxMH0kLy50ZXN0KHN0cik7XG4gIH0sXG4gIERLOiBmdW5jdGlvbiBESyhzdHIpIHtcbiAgICByZXR1cm4gL14oREspP1xcZHs4fSQvLnRlc3Qoc3RyKTtcbiAgfSxcbiAgRUU6IGZ1bmN0aW9uIEVFKHN0cikge1xuICAgIHJldHVybiAvXihFRSk/XFxkezl9JC8udGVzdChzdHIpO1xuICB9LFxuICBGSTogZnVuY3Rpb24gRkkoc3RyKSB7XG4gICAgcmV0dXJuIC9eKEZJKT9cXGR7OH0kLy50ZXN0KHN0cik7XG4gIH0sXG4gIEZSOiBmdW5jdGlvbiBGUihzdHIpIHtcbiAgICByZXR1cm4gL14oRlIpP1xcd3syfVxcZHs5fSQvLnRlc3Qoc3RyKTtcbiAgfSxcbiAgREU6IGZ1bmN0aW9uIERFKHN0cikge1xuICAgIHJldHVybiAvXihERSk/XFxkezl9JC8udGVzdChzdHIpO1xuICB9LFxuICBFTDogZnVuY3Rpb24gRUwoc3RyKSB7XG4gICAgcmV0dXJuIC9eKEVMKT9cXGR7OX0kLy50ZXN0KHN0cik7XG4gIH0sXG4gIEhVOiBmdW5jdGlvbiBIVShzdHIpIHtcbiAgICByZXR1cm4gL14oSFUpP1xcZHs4fSQvLnRlc3Qoc3RyKTtcbiAgfSxcbiAgSUU6IGZ1bmN0aW9uIElFKHN0cikge1xuICAgIHJldHVybiAvXihJRSk/XFxkezd9XFx3ezF9KFcpPyQvLnRlc3Qoc3RyKTtcbiAgfSxcbiAgSVQ6IGZ1bmN0aW9uIElUKHN0cikge1xuICAgIHJldHVybiAvXihJVCk/XFxkezExfSQvLnRlc3Qoc3RyKTtcbiAgfSxcbiAgTFY6IGZ1bmN0aW9uIExWKHN0cikge1xuICAgIHJldHVybiAvXihMVik/XFxkezExfSQvLnRlc3Qoc3RyKTtcbiAgfSxcbiAgTFQ6IGZ1bmN0aW9uIExUKHN0cikge1xuICAgIHJldHVybiAvXihMVCk/XFxkezksMTJ9JC8udGVzdChzdHIpO1xuICB9LFxuICBMVTogZnVuY3Rpb24gTFUoc3RyKSB7XG4gICAgcmV0dXJuIC9eKExVKT9cXGR7OH0kLy50ZXN0KHN0cik7XG4gIH0sXG4gIE1UOiBmdW5jdGlvbiBNVChzdHIpIHtcbiAgICByZXR1cm4gL14oTVQpP1xcZHs4fSQvLnRlc3Qoc3RyKTtcbiAgfSxcbiAgTkw6IGZ1bmN0aW9uIE5MKHN0cikge1xuICAgIHJldHVybiAvXihOTCk/XFxkezl9QlxcZHsyfSQvLnRlc3Qoc3RyKTtcbiAgfSxcbiAgUEw6IGZ1bmN0aW9uIFBMKHN0cikge1xuICAgIHJldHVybiAvXihQTCk/KFxcZHsxMH18KFxcZHszfS1cXGR7M30tXFxkezJ9LVxcZHsyfSl8KFxcZHszfS1cXGR7Mn0tXFxkezJ9LVxcZHszfSkpJC8udGVzdChzdHIpO1xuICB9LFxuICBQVDogUFQsXG4gIFJPOiBmdW5jdGlvbiBSTyhzdHIpIHtcbiAgICByZXR1cm4gL14oUk8pP1xcZHsyLDEwfSQvLnRlc3Qoc3RyKTtcbiAgfSxcbiAgU0s6IGZ1bmN0aW9uIFNLKHN0cikge1xuICAgIHJldHVybiAvXihTSyk/XFxkezEwfSQvLnRlc3Qoc3RyKTtcbiAgfSxcbiAgU0k6IGZ1bmN0aW9uIFNJKHN0cikge1xuICAgIHJldHVybiAvXihTSSk/XFxkezh9JC8udGVzdChzdHIpO1xuICB9LFxuICBFUzogZnVuY3Rpb24gRVMoc3RyKSB7XG4gICAgcmV0dXJuIC9eKEVTKT9cXHdcXGR7N31bQS1aXSQvLnRlc3Qoc3RyKTtcbiAgfSxcbiAgU0U6IGZ1bmN0aW9uIFNFKHN0cikge1xuICAgIHJldHVybiAvXihTRSk/XFxkezEyfSQvLnRlc3Qoc3RyKTtcbiAgfSxcblxuICAvKipcclxuICAgKiBWQVQgbnVtYmVycyBvZiBub24tRVUgY291bnRyaWVzXHJcbiAgICovXG4gIEFMOiBmdW5jdGlvbiBBTChzdHIpIHtcbiAgICByZXR1cm4gL14oQUwpP1xcd3s5fVtBLVpdJC8udGVzdChzdHIpO1xuICB9LFxuICBNSzogZnVuY3Rpb24gTUsoc3RyKSB7XG4gICAgcmV0dXJuIC9eKE1LKT9cXGR7MTN9JC8udGVzdChzdHIpO1xuICB9LFxuICBBVTogZnVuY3Rpb24gQVUoc3RyKSB7XG4gICAgcmV0dXJuIC9eKEFVKT9cXGR7MTF9JC8udGVzdChzdHIpO1xuICB9LFxuICBCWTogZnVuY3Rpb24gQlkoc3RyKSB7XG4gICAgcmV0dXJuIC9eKNCj0J3QnyApP1xcZHs5fSQvLnRlc3Qoc3RyKTtcbiAgfSxcbiAgQ0E6IGZ1bmN0aW9uIENBKHN0cikge1xuICAgIHJldHVybiAvXihDQSk/XFxkezl9JC8udGVzdChzdHIpO1xuICB9LFxuICBJUzogZnVuY3Rpb24gSVMoc3RyKSB7XG4gICAgcmV0dXJuIC9eKElTKT9cXGR7NSw2fSQvLnRlc3Qoc3RyKTtcbiAgfSxcbiAgSU46IGZ1bmN0aW9uIElOKHN0cikge1xuICAgIHJldHVybiAvXihJTik/XFxkezE1fSQvLnRlc3Qoc3RyKTtcbiAgfSxcbiAgSUQ6IGZ1bmN0aW9uIElEKHN0cikge1xuICAgIHJldHVybiAvXihJRCk/KFxcZHsxNX18KFxcZHsyfS5cXGR7M30uXFxkezN9LlxcZHsxfS1cXGR7M30uXFxkezN9KSkkLy50ZXN0KHN0cik7XG4gIH0sXG4gIElMOiBmdW5jdGlvbiBJTChzdHIpIHtcbiAgICByZXR1cm4gL14oSUwpP1xcZHs5fSQvLnRlc3Qoc3RyKTtcbiAgfSxcbiAgS1o6IGZ1bmN0aW9uIEtaKHN0cikge1xuICAgIHJldHVybiAvXihLWik/XFxkezl9JC8udGVzdChzdHIpO1xuICB9LFxuICBOWjogZnVuY3Rpb24gTlooc3RyKSB7XG4gICAgcmV0dXJuIC9eKE5aKT9cXGR7OX0kLy50ZXN0KHN0cik7XG4gIH0sXG4gIE5HOiBmdW5jdGlvbiBORyhzdHIpIHtcbiAgICByZXR1cm4gL14oTkcpPyhcXGR7MTJ9fChcXGR7OH0tXFxkezR9KSkkLy50ZXN0KHN0cik7XG4gIH0sXG4gIE5POiBmdW5jdGlvbiBOTyhzdHIpIHtcbiAgICByZXR1cm4gL14oTk8pP1xcZHs5fU1WQSQvLnRlc3Qoc3RyKTtcbiAgfSxcbiAgUEg6IGZ1bmN0aW9uIFBIKHN0cikge1xuICAgIHJldHVybiAvXihQSCk/KFxcZHsxMn18XFxkezN9IFxcZHszfSBcXGR7M30gXFxkezN9KSQvLnRlc3Qoc3RyKTtcbiAgfSxcbiAgUlU6IGZ1bmN0aW9uIFJVKHN0cikge1xuICAgIHJldHVybiAvXihSVSk/KFxcZHsxMH18XFxkezEyfSkkLy50ZXN0KHN0cik7XG4gIH0sXG4gIFNNOiBmdW5jdGlvbiBTTShzdHIpIHtcbiAgICByZXR1cm4gL14oU00pP1xcZHs1fSQvLnRlc3Qoc3RyKTtcbiAgfSxcbiAgU0E6IGZ1bmN0aW9uIFNBKHN0cikge1xuICAgIHJldHVybiAvXihTQSk/XFxkezE1fSQvLnRlc3Qoc3RyKTtcbiAgfSxcbiAgUlM6IGZ1bmN0aW9uIFJTKHN0cikge1xuICAgIHJldHVybiAvXihSUyk/XFxkezl9JC8udGVzdChzdHIpO1xuICB9LFxuICBDSDogZnVuY3Rpb24gQ0goc3RyKSB7XG4gICAgcmV0dXJuIC9eKENIKT8oXFxkezZ9fFxcZHs5fXwoXFxkezN9LlxcZHszfSl8KFxcZHszfS5cXGR7M30uXFxkezN9KSkoVFZBfE1XU1R8SVZBKSQvLnRlc3Qoc3RyKTtcbiAgfSxcbiAgVFI6IGZ1bmN0aW9uIFRSKHN0cikge1xuICAgIHJldHVybiAvXihUUik/XFxkezEwfSQvLnRlc3Qoc3RyKTtcbiAgfSxcbiAgVUE6IGZ1bmN0aW9uIFVBKHN0cikge1xuICAgIHJldHVybiAvXihVQSk/XFxkezEyfSQvLnRlc3Qoc3RyKTtcbiAgfSxcbiAgR0I6IGZ1bmN0aW9uIEdCKHN0cikge1xuICAgIHJldHVybiAvXkdCKChcXGR7M30gXFxkezR9IChbMC04XVswLTldfDlbMC02XSkpfChcXGR7OX0gXFxkezN9KXwoKChHRFswLTRdKXwoSEFbNS05XSkpWzAtOV17Mn0pKSQvLnRlc3Qoc3RyKTtcbiAgfSxcbiAgVVo6IGZ1bmN0aW9uIFVaKHN0cikge1xuICAgIHJldHVybiAvXihVWik/XFxkezl9JC8udGVzdChzdHIpO1xuICB9LFxuXG4gIC8qKlxyXG4gICAqIFZBVCBudW1iZXJzIG9mIExhdGluIEFtZXJpY2FuIGNvdW50cmllc1xyXG4gICAqL1xuICBBUjogZnVuY3Rpb24gQVIoc3RyKSB7XG4gICAgcmV0dXJuIC9eKEFSKT9cXGR7MTF9JC8udGVzdChzdHIpO1xuICB9LFxuICBCTzogZnVuY3Rpb24gQk8oc3RyKSB7XG4gICAgcmV0dXJuIC9eKEJPKT9cXGR7N30kLy50ZXN0KHN0cik7XG4gIH0sXG4gIEJSOiBmdW5jdGlvbiBCUihzdHIpIHtcbiAgICByZXR1cm4gL14oQlIpPygoXFxkezJ9LlxcZHszfS5cXGR7M31cXC9cXGR7NH0tXFxkezJ9KXwoXFxkezN9LlxcZHszfS5cXGR7M30tXFxkezJ9KSkkLy50ZXN0KHN0cik7XG4gIH0sXG4gIENMOiBmdW5jdGlvbiBDTChzdHIpIHtcbiAgICByZXR1cm4gL14oQ0wpP1xcZHs4fS1cXGR7MX0kLy50ZXN0KHN0cik7XG4gIH0sXG4gIENPOiBmdW5jdGlvbiBDTyhzdHIpIHtcbiAgICByZXR1cm4gL14oQ08pP1xcZHsxMH0kLy50ZXN0KHN0cik7XG4gIH0sXG4gIENSOiBmdW5jdGlvbiBDUihzdHIpIHtcbiAgICByZXR1cm4gL14oQ1IpP1xcZHs5LDEyfSQvLnRlc3Qoc3RyKTtcbiAgfSxcbiAgRUM6IGZ1bmN0aW9uIEVDKHN0cikge1xuICAgIHJldHVybiAvXihFQyk/XFxkezEzfSQvLnRlc3Qoc3RyKTtcbiAgfSxcbiAgU1Y6IGZ1bmN0aW9uIFNWKHN0cikge1xuICAgIHJldHVybiAvXihTVik/XFxkezR9LVxcZHs2fS1cXGR7M30tXFxkezF9JC8udGVzdChzdHIpO1xuICB9LFxuICBHVDogZnVuY3Rpb24gR1Qoc3RyKSB7XG4gICAgcmV0dXJuIC9eKEdUKT9cXGR7N30tXFxkezF9JC8udGVzdChzdHIpO1xuICB9LFxuICBITjogZnVuY3Rpb24gSE4oc3RyKSB7XG4gICAgcmV0dXJuIC9eKEhOKT8kLy50ZXN0KHN0cik7XG4gIH0sXG4gIE1YOiBmdW5jdGlvbiBNWChzdHIpIHtcbiAgICByZXR1cm4gL14oTVgpP1xcd3szLDR9XFxkezZ9XFx3ezN9JC8udGVzdChzdHIpO1xuICB9LFxuICBOSTogZnVuY3Rpb24gTkkoc3RyKSB7XG4gICAgcmV0dXJuIC9eKE5JKT9cXGR7M30tXFxkezZ9LVxcZHs0fVxcd3sxfSQvLnRlc3Qoc3RyKTtcbiAgfSxcbiAgUEE6IGZ1bmN0aW9uIFBBKHN0cikge1xuICAgIHJldHVybiAvXihQQSk/JC8udGVzdChzdHIpO1xuICB9LFxuICBQWTogZnVuY3Rpb24gUFkoc3RyKSB7XG4gICAgcmV0dXJuIC9eKFBZKT9cXGR7Niw4fS1cXGR7MX0kLy50ZXN0KHN0cik7XG4gIH0sXG4gIFBFOiBmdW5jdGlvbiBQRShzdHIpIHtcbiAgICByZXR1cm4gL14oUEUpP1xcZHsxMX0kLy50ZXN0KHN0cik7XG4gIH0sXG4gIERPOiBmdW5jdGlvbiBETyhzdHIpIHtcbiAgICByZXR1cm4gL14oRE8pPyhcXGR7MTF9fChcXGR7M30tXFxkezd9LVxcZHsxfSl8WzEsNCw1XXsxfVxcZHs4fXwoWzEsNCw1XXsxfSktXFxkezJ9LVxcZHs1fS1cXGR7MX0pJC8udGVzdChzdHIpO1xuICB9LFxuICBVWTogZnVuY3Rpb24gVVkoc3RyKSB7XG4gICAgcmV0dXJuIC9eKFVZKT9cXGR7MTJ9JC8udGVzdChzdHIpO1xuICB9LFxuICBWRTogZnVuY3Rpb24gVkUoc3RyKSB7XG4gICAgcmV0dXJuIC9eKFZFKT9bSixHLFYsRV17MX0tKFxcZHs5fXwoXFxkezh9LVxcZHsxfSkpJC8udGVzdChzdHIpO1xuICB9XG59O1xuZXhwb3J0cy52YXRNYXRjaGVycyA9IHZhdE1hdGNoZXJzO1xuXG5mdW5jdGlvbiBpc1ZBVChzdHIsIGNvdW50cnlDb2RlKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKGNvdW50cnlDb2RlKTtcblxuICBpZiAoY291bnRyeUNvZGUgaW4gdmF0TWF0Y2hlcnMpIHtcbiAgICByZXR1cm4gdmF0TWF0Y2hlcnNbY291bnRyeUNvZGVdKHN0cik7XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGNvdW50cnkgY29kZTogJ1wiLmNvbmNhdChjb3VudHJ5Q29kZSwgXCInXCIpKTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzVmFyaWFibGVXaWR0aDtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxudmFyIF9pc0Z1bGxXaWR0aCA9IHJlcXVpcmUoXCIuL2lzRnVsbFdpZHRoXCIpO1xuXG52YXIgX2lzSGFsZldpZHRoID0gcmVxdWlyZShcIi4vaXNIYWxmV2lkdGhcIik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIGlzVmFyaWFibGVXaWR0aChzdHIpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgcmV0dXJuIF9pc0Z1bGxXaWR0aC5mdWxsV2lkdGgudGVzdChzdHIpICYmIF9pc0hhbGZXaWR0aC5oYWxmV2lkdGgudGVzdChzdHIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc1doaXRlbGlzdGVkO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBpc1doaXRlbGlzdGVkKHN0ciwgY2hhcnMpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcblxuICBmb3IgKHZhciBpID0gc3RyLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgaWYgKGNoYXJzLmluZGV4T2Yoc3RyW2ldKSA9PT0gLTEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gbHRyaW07XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIGx0cmltKHN0ciwgY2hhcnMpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTsgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9HdWlkZS9SZWd1bGFyX0V4cHJlc3Npb25zI0VzY2FwaW5nXG5cbiAgdmFyIHBhdHRlcm4gPSBjaGFycyA/IG5ldyBSZWdFeHAoXCJeW1wiLmNvbmNhdChjaGFycy5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZywgJ1xcXFwkJicpLCBcIl0rXCIpLCAnZycpIDogL15cXHMrL2c7XG4gIHJldHVybiBzdHIucmVwbGFjZShwYXR0ZXJuLCAnJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IG1hdGNoZXM7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIG1hdGNoZXMoc3RyLCBwYXR0ZXJuLCBtb2RpZmllcnMpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcblxuICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHBhdHRlcm4pICE9PSAnW29iamVjdCBSZWdFeHBdJykge1xuICAgIHBhdHRlcm4gPSBuZXcgUmVnRXhwKHBhdHRlcm4sIG1vZGlmaWVycyk7XG4gIH1cblxuICByZXR1cm4gISFzdHIubWF0Y2gocGF0dGVybik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IG5vcm1hbGl6ZUVtYWlsO1xuXG52YXIgX21lcmdlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL21lcmdlXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGRlZmF1bHRfbm9ybWFsaXplX2VtYWlsX29wdGlvbnMgPSB7XG4gIC8vIFRoZSBmb2xsb3dpbmcgb3B0aW9ucyBhcHBseSB0byBhbGwgZW1haWwgYWRkcmVzc2VzXG4gIC8vIExvd2VyY2FzZXMgdGhlIGxvY2FsIHBhcnQgb2YgdGhlIGVtYWlsIGFkZHJlc3MuXG4gIC8vIFBsZWFzZSBub3RlIHRoaXMgbWF5IHZpb2xhdGUgUkZDIDUzMjEgYXMgcGVyIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzk4MDgzMzIvMTkyMDI0KS5cbiAgLy8gVGhlIGRvbWFpbiBpcyBhbHdheXMgbG93ZXJjYXNlZCwgYXMgcGVyIFJGQyAxMDM1XG4gIGFsbF9sb3dlcmNhc2U6IHRydWUsXG4gIC8vIFRoZSBmb2xsb3dpbmcgY29udmVyc2lvbnMgYXJlIHNwZWNpZmljIHRvIEdNYWlsXG4gIC8vIExvd2VyY2FzZXMgdGhlIGxvY2FsIHBhcnQgb2YgdGhlIEdNYWlsIGFkZHJlc3MgKGtub3duIHRvIGJlIGNhc2UtaW5zZW5zaXRpdmUpXG4gIGdtYWlsX2xvd2VyY2FzZTogdHJ1ZSxcbiAgLy8gUmVtb3ZlcyBkb3RzIGZyb20gdGhlIGxvY2FsIHBhcnQgb2YgdGhlIGVtYWlsIGFkZHJlc3MsIGFzIHRoYXQncyBpZ25vcmVkIGJ5IEdNYWlsXG4gIGdtYWlsX3JlbW92ZV9kb3RzOiB0cnVlLFxuICAvLyBSZW1vdmVzIHRoZSBzdWJhZGRyZXNzIChlLmcuIFwiK2Zvb1wiKSBmcm9tIHRoZSBlbWFpbCBhZGRyZXNzXG4gIGdtYWlsX3JlbW92ZV9zdWJhZGRyZXNzOiB0cnVlLFxuICAvLyBDb252ZXJzdHMgdGhlIGdvb2dsZW1haWwuY29tIGRvbWFpbiB0byBnbWFpbC5jb21cbiAgZ21haWxfY29udmVydF9nb29nbGVtYWlsZG90Y29tOiB0cnVlLFxuICAvLyBUaGUgZm9sbG93aW5nIGNvbnZlcnNpb25zIGFyZSBzcGVjaWZpYyB0byBPdXRsb29rLmNvbSAvIFdpbmRvd3MgTGl2ZSAvIEhvdG1haWxcbiAgLy8gTG93ZXJjYXNlcyB0aGUgbG9jYWwgcGFydCBvZiB0aGUgT3V0bG9vay5jb20gYWRkcmVzcyAoa25vd24gdG8gYmUgY2FzZS1pbnNlbnNpdGl2ZSlcbiAgb3V0bG9va2RvdGNvbV9sb3dlcmNhc2U6IHRydWUsXG4gIC8vIFJlbW92ZXMgdGhlIHN1YmFkZHJlc3MgKGUuZy4gXCIrZm9vXCIpIGZyb20gdGhlIGVtYWlsIGFkZHJlc3NcbiAgb3V0bG9va2RvdGNvbV9yZW1vdmVfc3ViYWRkcmVzczogdHJ1ZSxcbiAgLy8gVGhlIGZvbGxvd2luZyBjb252ZXJzaW9ucyBhcmUgc3BlY2lmaWMgdG8gWWFob29cbiAgLy8gTG93ZXJjYXNlcyB0aGUgbG9jYWwgcGFydCBvZiB0aGUgWWFob28gYWRkcmVzcyAoa25vd24gdG8gYmUgY2FzZS1pbnNlbnNpdGl2ZSlcbiAgeWFob29fbG93ZXJjYXNlOiB0cnVlLFxuICAvLyBSZW1vdmVzIHRoZSBzdWJhZGRyZXNzIChlLmcuIFwiLWZvb1wiKSBmcm9tIHRoZSBlbWFpbCBhZGRyZXNzXG4gIHlhaG9vX3JlbW92ZV9zdWJhZGRyZXNzOiB0cnVlLFxuICAvLyBUaGUgZm9sbG93aW5nIGNvbnZlcnNpb25zIGFyZSBzcGVjaWZpYyB0byBZYW5kZXhcbiAgLy8gTG93ZXJjYXNlcyB0aGUgbG9jYWwgcGFydCBvZiB0aGUgWWFuZGV4IGFkZHJlc3MgKGtub3duIHRvIGJlIGNhc2UtaW5zZW5zaXRpdmUpXG4gIHlhbmRleF9sb3dlcmNhc2U6IHRydWUsXG4gIC8vIFRoZSBmb2xsb3dpbmcgY29udmVyc2lvbnMgYXJlIHNwZWNpZmljIHRvIGlDbG91ZFxuICAvLyBMb3dlcmNhc2VzIHRoZSBsb2NhbCBwYXJ0IG9mIHRoZSBpQ2xvdWQgYWRkcmVzcyAoa25vd24gdG8gYmUgY2FzZS1pbnNlbnNpdGl2ZSlcbiAgaWNsb3VkX2xvd2VyY2FzZTogdHJ1ZSxcbiAgLy8gUmVtb3ZlcyB0aGUgc3ViYWRkcmVzcyAoZS5nLiBcIitmb29cIikgZnJvbSB0aGUgZW1haWwgYWRkcmVzc1xuICBpY2xvdWRfcmVtb3ZlX3N1YmFkZHJlc3M6IHRydWVcbn07IC8vIExpc3Qgb2YgZG9tYWlucyB1c2VkIGJ5IGlDbG91ZFxuXG52YXIgaWNsb3VkX2RvbWFpbnMgPSBbJ2ljbG91ZC5jb20nLCAnbWUuY29tJ107IC8vIExpc3Qgb2YgZG9tYWlucyB1c2VkIGJ5IE91dGxvb2suY29tIGFuZCBpdHMgcHJlZGVjZXNzb3JzXG4vLyBUaGlzIGxpc3QgaXMgbGlrZWx5IGluY29tcGxldGUuXG4vLyBQYXJ0aWFsIHJlZmVyZW5jZTpcbi8vIGh0dHBzOi8vYmxvZ3Mub2ZmaWNlLmNvbS8yMDEzLzA0LzE3L291dGxvb2stY29tLWdldHMtdHdvLXN0ZXAtdmVyaWZpY2F0aW9uLXNpZ24taW4tYnktYWxpYXMtYW5kLW5ldy1pbnRlcm5hdGlvbmFsLWRvbWFpbnMvXG5cbnZhciBvdXRsb29rZG90Y29tX2RvbWFpbnMgPSBbJ2hvdG1haWwuYXQnLCAnaG90bWFpbC5iZScsICdob3RtYWlsLmNhJywgJ2hvdG1haWwuY2wnLCAnaG90bWFpbC5jby5pbCcsICdob3RtYWlsLmNvLm56JywgJ2hvdG1haWwuY28udGgnLCAnaG90bWFpbC5jby51aycsICdob3RtYWlsLmNvbScsICdob3RtYWlsLmNvbS5hcicsICdob3RtYWlsLmNvbS5hdScsICdob3RtYWlsLmNvbS5icicsICdob3RtYWlsLmNvbS5ncicsICdob3RtYWlsLmNvbS5teCcsICdob3RtYWlsLmNvbS5wZScsICdob3RtYWlsLmNvbS50cicsICdob3RtYWlsLmNvbS52bicsICdob3RtYWlsLmN6JywgJ2hvdG1haWwuZGUnLCAnaG90bWFpbC5kaycsICdob3RtYWlsLmVzJywgJ2hvdG1haWwuZnInLCAnaG90bWFpbC5odScsICdob3RtYWlsLmlkJywgJ2hvdG1haWwuaWUnLCAnaG90bWFpbC5pbicsICdob3RtYWlsLml0JywgJ2hvdG1haWwuanAnLCAnaG90bWFpbC5rcicsICdob3RtYWlsLmx2JywgJ2hvdG1haWwubXknLCAnaG90bWFpbC5waCcsICdob3RtYWlsLnB0JywgJ2hvdG1haWwuc2EnLCAnaG90bWFpbC5zZycsICdob3RtYWlsLnNrJywgJ2xpdmUuYmUnLCAnbGl2ZS5jby51aycsICdsaXZlLmNvbScsICdsaXZlLmNvbS5hcicsICdsaXZlLmNvbS5teCcsICdsaXZlLmRlJywgJ2xpdmUuZXMnLCAnbGl2ZS5ldScsICdsaXZlLmZyJywgJ2xpdmUuaXQnLCAnbGl2ZS5ubCcsICdtc24uY29tJywgJ291dGxvb2suYXQnLCAnb3V0bG9vay5iZScsICdvdXRsb29rLmNsJywgJ291dGxvb2suY28uaWwnLCAnb3V0bG9vay5jby5ueicsICdvdXRsb29rLmNvLnRoJywgJ291dGxvb2suY29tJywgJ291dGxvb2suY29tLmFyJywgJ291dGxvb2suY29tLmF1JywgJ291dGxvb2suY29tLmJyJywgJ291dGxvb2suY29tLmdyJywgJ291dGxvb2suY29tLnBlJywgJ291dGxvb2suY29tLnRyJywgJ291dGxvb2suY29tLnZuJywgJ291dGxvb2suY3onLCAnb3V0bG9vay5kZScsICdvdXRsb29rLmRrJywgJ291dGxvb2suZXMnLCAnb3V0bG9vay5mcicsICdvdXRsb29rLmh1JywgJ291dGxvb2suaWQnLCAnb3V0bG9vay5pZScsICdvdXRsb29rLmluJywgJ291dGxvb2suaXQnLCAnb3V0bG9vay5qcCcsICdvdXRsb29rLmtyJywgJ291dGxvb2subHYnLCAnb3V0bG9vay5teScsICdvdXRsb29rLnBoJywgJ291dGxvb2sucHQnLCAnb3V0bG9vay5zYScsICdvdXRsb29rLnNnJywgJ291dGxvb2suc2snLCAncGFzc3BvcnQuY29tJ107IC8vIExpc3Qgb2YgZG9tYWlucyB1c2VkIGJ5IFlhaG9vIE1haWxcbi8vIFRoaXMgbGlzdCBpcyBsaWtlbHkgaW5jb21wbGV0ZVxuXG52YXIgeWFob29fZG9tYWlucyA9IFsncm9ja2V0bWFpbC5jb20nLCAneWFob28uY2EnLCAneWFob28uY28udWsnLCAneWFob28uY29tJywgJ3lhaG9vLmRlJywgJ3lhaG9vLmZyJywgJ3lhaG9vLmluJywgJ3lhaG9vLml0JywgJ3ltYWlsLmNvbSddOyAvLyBMaXN0IG9mIGRvbWFpbnMgdXNlZCBieSB5YW5kZXgucnVcblxudmFyIHlhbmRleF9kb21haW5zID0gWyd5YW5kZXgucnUnLCAneWFuZGV4LnVhJywgJ3lhbmRleC5reicsICd5YW5kZXguY29tJywgJ3lhbmRleC5ieScsICd5YS5ydSddOyAvLyByZXBsYWNlIHNpbmdsZSBkb3RzLCBidXQgbm90IG11bHRpcGxlIGNvbnNlY3V0aXZlIGRvdHNcblxuZnVuY3Rpb24gZG90c1JlcGxhY2VyKG1hdGNoKSB7XG4gIGlmIChtYXRjaC5sZW5ndGggPiAxKSB7XG4gICAgcmV0dXJuIG1hdGNoO1xuICB9XG5cbiAgcmV0dXJuICcnO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVFbWFpbChlbWFpbCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gKDAsIF9tZXJnZS5kZWZhdWx0KShvcHRpb25zLCBkZWZhdWx0X25vcm1hbGl6ZV9lbWFpbF9vcHRpb25zKTtcbiAgdmFyIHJhd19wYXJ0cyA9IGVtYWlsLnNwbGl0KCdAJyk7XG4gIHZhciBkb21haW4gPSByYXdfcGFydHMucG9wKCk7XG4gIHZhciB1c2VyID0gcmF3X3BhcnRzLmpvaW4oJ0AnKTtcbiAgdmFyIHBhcnRzID0gW3VzZXIsIGRvbWFpbl07IC8vIFRoZSBkb21haW4gaXMgYWx3YXlzIGxvd2VyY2FzZWQsIGFzIGl0J3MgY2FzZS1pbnNlbnNpdGl2ZSBwZXIgUkZDIDEwMzVcblxuICBwYXJ0c1sxXSA9IHBhcnRzWzFdLnRvTG93ZXJDYXNlKCk7XG5cbiAgaWYgKHBhcnRzWzFdID09PSAnZ21haWwuY29tJyB8fCBwYXJ0c1sxXSA9PT0gJ2dvb2dsZW1haWwuY29tJykge1xuICAgIC8vIEFkZHJlc3MgaXMgR01haWxcbiAgICBpZiAob3B0aW9ucy5nbWFpbF9yZW1vdmVfc3ViYWRkcmVzcykge1xuICAgICAgcGFydHNbMF0gPSBwYXJ0c1swXS5zcGxpdCgnKycpWzBdO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmdtYWlsX3JlbW92ZV9kb3RzKSB7XG4gICAgICAvLyB0aGlzIGRvZXMgbm90IHJlcGxhY2UgY29uc2VjdXRpdmUgZG90cyBsaWtlIGV4YW1wbGUuLmVtYWlsQGdtYWlsLmNvbVxuICAgICAgcGFydHNbMF0gPSBwYXJ0c1swXS5yZXBsYWNlKC9cXC4rL2csIGRvdHNSZXBsYWNlcik7XG4gICAgfVxuXG4gICAgaWYgKCFwYXJ0c1swXS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5hbGxfbG93ZXJjYXNlIHx8IG9wdGlvbnMuZ21haWxfbG93ZXJjYXNlKSB7XG4gICAgICBwYXJ0c1swXSA9IHBhcnRzWzBdLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgcGFydHNbMV0gPSBvcHRpb25zLmdtYWlsX2NvbnZlcnRfZ29vZ2xlbWFpbGRvdGNvbSA/ICdnbWFpbC5jb20nIDogcGFydHNbMV07XG4gIH0gZWxzZSBpZiAoaWNsb3VkX2RvbWFpbnMuaW5kZXhPZihwYXJ0c1sxXSkgPj0gMCkge1xuICAgIC8vIEFkZHJlc3MgaXMgaUNsb3VkXG4gICAgaWYgKG9wdGlvbnMuaWNsb3VkX3JlbW92ZV9zdWJhZGRyZXNzKSB7XG4gICAgICBwYXJ0c1swXSA9IHBhcnRzWzBdLnNwbGl0KCcrJylbMF07XG4gICAgfVxuXG4gICAgaWYgKCFwYXJ0c1swXS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5hbGxfbG93ZXJjYXNlIHx8IG9wdGlvbnMuaWNsb3VkX2xvd2VyY2FzZSkge1xuICAgICAgcGFydHNbMF0gPSBwYXJ0c1swXS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChvdXRsb29rZG90Y29tX2RvbWFpbnMuaW5kZXhPZihwYXJ0c1sxXSkgPj0gMCkge1xuICAgIC8vIEFkZHJlc3MgaXMgT3V0bG9vay5jb21cbiAgICBpZiAob3B0aW9ucy5vdXRsb29rZG90Y29tX3JlbW92ZV9zdWJhZGRyZXNzKSB7XG4gICAgICBwYXJ0c1swXSA9IHBhcnRzWzBdLnNwbGl0KCcrJylbMF07XG4gICAgfVxuXG4gICAgaWYgKCFwYXJ0c1swXS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5hbGxfbG93ZXJjYXNlIHx8IG9wdGlvbnMub3V0bG9va2RvdGNvbV9sb3dlcmNhc2UpIHtcbiAgICAgIHBhcnRzWzBdID0gcGFydHNbMF0udG9Mb3dlckNhc2UoKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoeWFob29fZG9tYWlucy5pbmRleE9mKHBhcnRzWzFdKSA+PSAwKSB7XG4gICAgLy8gQWRkcmVzcyBpcyBZYWhvb1xuICAgIGlmIChvcHRpb25zLnlhaG9vX3JlbW92ZV9zdWJhZGRyZXNzKSB7XG4gICAgICB2YXIgY29tcG9uZW50cyA9IHBhcnRzWzBdLnNwbGl0KCctJyk7XG4gICAgICBwYXJ0c1swXSA9IGNvbXBvbmVudHMubGVuZ3RoID4gMSA/IGNvbXBvbmVudHMuc2xpY2UoMCwgLTEpLmpvaW4oJy0nKSA6IGNvbXBvbmVudHNbMF07XG4gICAgfVxuXG4gICAgaWYgKCFwYXJ0c1swXS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5hbGxfbG93ZXJjYXNlIHx8IG9wdGlvbnMueWFob29fbG93ZXJjYXNlKSB7XG4gICAgICBwYXJ0c1swXSA9IHBhcnRzWzBdLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHlhbmRleF9kb21haW5zLmluZGV4T2YocGFydHNbMV0pID49IDApIHtcbiAgICBpZiAob3B0aW9ucy5hbGxfbG93ZXJjYXNlIHx8IG9wdGlvbnMueWFuZGV4X2xvd2VyY2FzZSkge1xuICAgICAgcGFydHNbMF0gPSBwYXJ0c1swXS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cblxuICAgIHBhcnRzWzFdID0gJ3lhbmRleC5ydSc7IC8vIGFsbCB5YW5kZXggZG9tYWlucyBhcmUgZXF1YWwsIDFzdCBwcmVmZXJyZWRcbiAgfSBlbHNlIGlmIChvcHRpb25zLmFsbF9sb3dlcmNhc2UpIHtcbiAgICAvLyBBbnkgb3RoZXIgYWRkcmVzc1xuICAgIHBhcnRzWzBdID0gcGFydHNbMF0udG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIHJldHVybiBwYXJ0cy5qb2luKCdAJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHJ0cmltO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBydHJpbShzdHIsIGNoYXJzKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG5cbiAgaWYgKGNoYXJzKSB7XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9HdWlkZS9SZWd1bGFyX0V4cHJlc3Npb25zI0VzY2FwaW5nXG4gICAgdmFyIHBhdHRlcm4gPSBuZXcgUmVnRXhwKFwiW1wiLmNvbmNhdChjaGFycy5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZywgJ1xcXFwkJicpLCBcIl0rJFwiKSwgJ2cnKTtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UocGF0dGVybiwgJycpO1xuICB9IC8vIFVzZSBhIGZhc3RlciBhbmQgbW9yZSBzYWZlIHRoYW4gcmVnZXggdHJpbSBtZXRob2QgaHR0cHM6Ly9ibG9nLnN0ZXZlbmxldml0aGFuLmNvbS9hcmNoaXZlcy9mYXN0ZXItdHJpbS1qYXZhc2NyaXB0XG5cblxuICB2YXIgc3RySW5kZXggPSBzdHIubGVuZ3RoIC0gMTtcblxuICB3aGlsZSAoL1xccy8udGVzdChzdHIuY2hhckF0KHN0ckluZGV4KSkpIHtcbiAgICBzdHJJbmRleCAtPSAxO1xuICB9XG5cbiAgcmV0dXJuIHN0ci5zbGljZSgwLCBzdHJJbmRleCArIDEpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBzdHJpcExvdztcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxudmFyIF9ibGFja2xpc3QgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2JsYWNrbGlzdFwiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIHN0cmlwTG93KHN0ciwga2VlcF9uZXdfbGluZXMpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgdmFyIGNoYXJzID0ga2VlcF9uZXdfbGluZXMgPyAnXFxcXHgwMC1cXFxceDA5XFxcXHgwQlxcXFx4MENcXFxceDBFLVxcXFx4MUZcXFxceDdGJyA6ICdcXFxceDAwLVxcXFx4MUZcXFxceDdGJztcbiAgcmV0dXJuICgwLCBfYmxhY2tsaXN0LmRlZmF1bHQpKHN0ciwgY2hhcnMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB0b0Jvb2xlYW47XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIHRvQm9vbGVhbihzdHIsIHN0cmljdCkge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuXG4gIGlmIChzdHJpY3QpIHtcbiAgICByZXR1cm4gc3RyID09PSAnMScgfHwgL150cnVlJC9pLnRlc3Qoc3RyKTtcbiAgfVxuXG4gIHJldHVybiBzdHIgIT09ICcwJyAmJiAhL15mYWxzZSQvaS50ZXN0KHN0cikgJiYgc3RyICE9PSAnJztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdG9EYXRlO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiB0b0RhdGUoZGF0ZSkge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShkYXRlKTtcbiAgZGF0ZSA9IERhdGUucGFyc2UoZGF0ZSk7XG4gIHJldHVybiAhaXNOYU4oZGF0ZSkgPyBuZXcgRGF0ZShkYXRlKSA6IG51bGw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHRvRmxvYXQ7XG5cbnZhciBfaXNGbG9hdCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vaXNGbG9hdFwiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIHRvRmxvYXQoc3RyKSB7XG4gIGlmICghKDAsIF9pc0Zsb2F0LmRlZmF1bHQpKHN0cikpIHJldHVybiBOYU47XG4gIHJldHVybiBwYXJzZUZsb2F0KHN0cik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHRvSW50O1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiB0b0ludChzdHIsIHJhZGl4KSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIHJldHVybiBwYXJzZUludChzdHIsIHJhZGl4IHx8IDEwKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdHJpbTtcblxudmFyIF9ydHJpbSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vcnRyaW1cIikpO1xuXG52YXIgX2x0cmltID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9sdHJpbVwiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIHRyaW0oc3RyLCBjaGFycykge1xuICByZXR1cm4gKDAsIF9ydHJpbS5kZWZhdWx0KSgoMCwgX2x0cmltLmRlZmF1bHQpKHN0ciwgY2hhcnMpLCBjaGFycyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHVuZXNjYXBlO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiB1bmVzY2FwZShzdHIpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC8mcXVvdDsvZywgJ1wiJykucmVwbGFjZSgvJiN4Mjc7L2csIFwiJ1wiKS5yZXBsYWNlKC8mbHQ7L2csICc8JykucmVwbGFjZSgvJmd0Oy9nLCAnPicpLnJlcGxhY2UoLyYjeDJGOy9nLCAnLycpLnJlcGxhY2UoLyYjeDVDOy9nLCAnXFxcXCcpLnJlcGxhY2UoLyYjOTY7L2csICdgJykucmVwbGFjZSgvJmFtcDsvZywgJyYnKTsgLy8gJmFtcDsgcmVwbGFjZW1lbnQgaGFzIHRvIGJlIHRoZSBsYXN0IG9uZSB0byBwcmV2ZW50XG4gIC8vIGJ1Z3Mgd2l0aCBpbnRlcm1lZGlhdGUgc3RyaW5ncyBjb250YWluaW5nIGVzY2FwZSBzZXF1ZW5jZXNcbiAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vdmFsaWRhdG9yanMvdmFsaWRhdG9yLmpzL2lzc3Vlcy8xODI3XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuaXNvNzA2NENoZWNrID0gaXNvNzA2NENoZWNrO1xuZXhwb3J0cy5sdWhuQ2hlY2sgPSBsdWhuQ2hlY2s7XG5leHBvcnRzLnJldmVyc2VNdWx0aXBseUFuZFN1bSA9IHJldmVyc2VNdWx0aXBseUFuZFN1bTtcbmV4cG9ydHMudmVyaG9lZmZDaGVjayA9IHZlcmhvZWZmQ2hlY2s7XG5cbi8qKlxuICogQWxnb3JpdGhtaWMgdmFsaWRhdGlvbiBmdW5jdGlvbnNcbiAqIE1heSBiZSB1c2VkIGFzIGlzIG9yIGltcGxlbWVudGVkIGluIHRoZSB3b3JrZmxvdyBvZiBvdGhlciB2YWxpZGF0b3JzLlxuICovXG5cbi8qXG4gKiBJU08gNzA2NCB2YWxpZGF0aW9uIGZ1bmN0aW9uXG4gKiBDYWxsZWQgd2l0aCBhIHN0cmluZyBvZiBudW1iZXJzIChpbmNsLiBjaGVjayBkaWdpdClcbiAqIHRvIHZhbGlkYXRlIGFjY29yZGluZyB0byBJU08gNzA2NCAoTU9EIDExLCAxMCkuXG4gKi9cbmZ1bmN0aW9uIGlzbzcwNjRDaGVjayhzdHIpIHtcbiAgdmFyIGNoZWNrdmFsdWUgPSAxMDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGggLSAxOyBpKyspIHtcbiAgICBjaGVja3ZhbHVlID0gKHBhcnNlSW50KHN0cltpXSwgMTApICsgY2hlY2t2YWx1ZSkgJSAxMCA9PT0gMCA/IDEwICogMiAlIDExIDogKHBhcnNlSW50KHN0cltpXSwgMTApICsgY2hlY2t2YWx1ZSkgJSAxMCAqIDIgJSAxMTtcbiAgfVxuXG4gIGNoZWNrdmFsdWUgPSBjaGVja3ZhbHVlID09PSAxID8gMCA6IDExIC0gY2hlY2t2YWx1ZTtcbiAgcmV0dXJuIGNoZWNrdmFsdWUgPT09IHBhcnNlSW50KHN0clsxMF0sIDEwKTtcbn1cbi8qXG4gKiBMdWhuIChtb2QgMTApIHZhbGlkYXRpb24gZnVuY3Rpb25cbiAqIENhbGxlZCB3aXRoIGEgc3RyaW5nIG9mIG51bWJlcnMgKGluY2wuIGNoZWNrIGRpZ2l0KVxuICogdG8gdmFsaWRhdGUgYWNjb3JkaW5nIHRvIHRoZSBMdWhuIGFsZ29yaXRobS5cbiAqL1xuXG5cbmZ1bmN0aW9uIGx1aG5DaGVjayhzdHIpIHtcbiAgdmFyIGNoZWNrc3VtID0gMDtcbiAgdmFyIHNlY29uZCA9IGZhbHNlO1xuXG4gIGZvciAodmFyIGkgPSBzdHIubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBpZiAoc2Vjb25kKSB7XG4gICAgICB2YXIgcHJvZHVjdCA9IHBhcnNlSW50KHN0cltpXSwgMTApICogMjtcblxuICAgICAgaWYgKHByb2R1Y3QgPiA5KSB7XG4gICAgICAgIC8vIHN1bSBkaWdpdHMgb2YgcHJvZHVjdCBhbmQgYWRkIHRvIGNoZWNrc3VtXG4gICAgICAgIGNoZWNrc3VtICs9IHByb2R1Y3QudG9TdHJpbmcoKS5zcGxpdCgnJykubWFwKGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGEsIDEwKTtcbiAgICAgICAgfSkucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgcmV0dXJuIGEgKyBiO1xuICAgICAgICB9LCAwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNoZWNrc3VtICs9IHByb2R1Y3Q7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoZWNrc3VtICs9IHBhcnNlSW50KHN0cltpXSwgMTApO1xuICAgIH1cblxuICAgIHNlY29uZCA9ICFzZWNvbmQ7XG4gIH1cblxuICByZXR1cm4gY2hlY2tzdW0gJSAxMCA9PT0gMDtcbn1cbi8qXG4gKiBSZXZlcnNlIFRJTiBtdWx0aXBsaWNhdGlvbiBhbmQgc3VtbWF0aW9uIGhlbHBlciBmdW5jdGlvblxuICogQ2FsbGVkIHdpdGggYW4gYXJyYXkgb2Ygc2luZ2xlLWRpZ2l0IGludGVnZXJzIGFuZCBhIGJhc2UgbXVsdGlwbGllclxuICogdG8gY2FsY3VsYXRlIHRoZSBzdW0gb2YgdGhlIGRpZ2l0cyBtdWx0aXBsaWVkIGluIHJldmVyc2UuXG4gKiBOb3JtYWxseSB1c2VkIGluIHZhcmlhdGlvbnMgb2YgTU9EIDExIGFsZ29yaXRobWljIGNoZWNrcy5cbiAqL1xuXG5cbmZ1bmN0aW9uIHJldmVyc2VNdWx0aXBseUFuZFN1bShkaWdpdHMsIGJhc2UpIHtcbiAgdmFyIHRvdGFsID0gMDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGRpZ2l0cy5sZW5ndGg7IGkrKykge1xuICAgIHRvdGFsICs9IGRpZ2l0c1tpXSAqIChiYXNlIC0gaSk7XG4gIH1cblxuICByZXR1cm4gdG90YWw7XG59XG4vKlxuICogVmVyaG9lZmYgdmFsaWRhdGlvbiBoZWxwZXIgZnVuY3Rpb25cbiAqIENhbGxlZCB3aXRoIGEgc3RyaW5nIG9mIG51bWJlcnNcbiAqIHRvIHZhbGlkYXRlIGFjY29yZGluZyB0byB0aGUgVmVyaG9lZmYgYWxnb3JpdGhtLlxuICovXG5cblxuZnVuY3Rpb24gdmVyaG9lZmZDaGVjayhzdHIpIHtcbiAgdmFyIGRfdGFibGUgPSBbWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDldLCBbMSwgMiwgMywgNCwgMCwgNiwgNywgOCwgOSwgNV0sIFsyLCAzLCA0LCAwLCAxLCA3LCA4LCA5LCA1LCA2XSwgWzMsIDQsIDAsIDEsIDIsIDgsIDksIDUsIDYsIDddLCBbNCwgMCwgMSwgMiwgMywgOSwgNSwgNiwgNywgOF0sIFs1LCA5LCA4LCA3LCA2LCAwLCA0LCAzLCAyLCAxXSwgWzYsIDUsIDksIDgsIDcsIDEsIDAsIDQsIDMsIDJdLCBbNywgNiwgNSwgOSwgOCwgMiwgMSwgMCwgNCwgM10sIFs4LCA3LCA2LCA1LCA5LCAzLCAyLCAxLCAwLCA0XSwgWzksIDgsIDcsIDYsIDUsIDQsIDMsIDIsIDEsIDBdXTtcbiAgdmFyIHBfdGFibGUgPSBbWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDldLCBbMSwgNSwgNywgNiwgMiwgOCwgMywgMCwgOSwgNF0sIFs1LCA4LCAwLCAzLCA3LCA5LCA2LCAxLCA0LCAyXSwgWzgsIDksIDEsIDYsIDAsIDQsIDMsIDUsIDIsIDddLCBbOSwgNCwgNSwgMywgMSwgMiwgNiwgOCwgNywgMF0sIFs0LCAyLCA4LCA2LCA1LCA3LCAzLCA5LCAwLCAxXSwgWzIsIDcsIDksIDMsIDgsIDAsIDYsIDQsIDEsIDVdLCBbNywgMCwgNCwgNiwgOSwgMSwgMywgMiwgNSwgOF1dOyAvLyBDb3B5ICh0byBwcmV2ZW50IHJlcGxhY2VtZW50KSBhbmQgcmV2ZXJzZVxuXG4gIHZhciBzdHJfY29weSA9IHN0ci5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpO1xuICB2YXIgY2hlY2tzdW0gPSAwO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyX2NvcHkubGVuZ3RoOyBpKyspIHtcbiAgICBjaGVja3N1bSA9IGRfdGFibGVbY2hlY2tzdW1dW3BfdGFibGVbaSAlIDhdW3BhcnNlSW50KHN0cl9jb3B5W2ldLCAxMCldXTtcbiAgfVxuXG4gIHJldHVybiBjaGVja3N1bSA9PT0gMDtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGFzc2VydFN0cmluZztcblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiOyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG5mdW5jdGlvbiBhc3NlcnRTdHJpbmcoaW5wdXQpIHtcbiAgdmFyIGlzU3RyaW5nID0gdHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJyB8fCBpbnB1dCBpbnN0YW5jZW9mIFN0cmluZztcblxuICBpZiAoIWlzU3RyaW5nKSB7XG4gICAgdmFyIGludmFsaWRUeXBlID0gX3R5cGVvZihpbnB1dCk7XG5cbiAgICBpZiAoaW5wdXQgPT09IG51bGwpIGludmFsaWRUeXBlID0gJ251bGwnO2Vsc2UgaWYgKGludmFsaWRUeXBlID09PSAnb2JqZWN0JykgaW52YWxpZFR5cGUgPSBpbnB1dC5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJFeHBlY3RlZCBhIHN0cmluZyBidXQgcmVjZWl2ZWQgYSBcIi5jb25jYXQoaW52YWxpZFR5cGUpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBpbmNsdWRlcyA9IGZ1bmN0aW9uIGluY2x1ZGVzKGFyciwgdmFsKSB7XG4gIHJldHVybiBhcnIuc29tZShmdW5jdGlvbiAoYXJyVmFsKSB7XG4gICAgcmV0dXJuIHZhbCA9PT0gYXJyVmFsO1xuICB9KTtcbn07XG5cbnZhciBfZGVmYXVsdCA9IGluY2x1ZGVzO1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBtZXJnZTtcblxuZnVuY3Rpb24gbWVyZ2UoKSB7XG4gIHZhciBvYmogPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICB2YXIgZGVmYXVsdHMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcblxuICBmb3IgKHZhciBrZXkgaW4gZGVmYXVsdHMpIHtcbiAgICBpZiAodHlwZW9mIG9ialtrZXldID09PSAndW5kZWZpbmVkJykge1xuICAgICAgb2JqW2tleV0gPSBkZWZhdWx0c1trZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IG11bHRpbGluZVJlZ2V4cDtcblxuLyoqXG4gKiBCdWlsZCBSZWdFeHAgb2JqZWN0IGZyb20gYW4gYXJyYXlcbiAqIG9mIG11bHRpcGxlL211bHRpLWxpbmUgcmVnZXhwIHBhcnRzXG4gKlxuICogQHBhcmFtIHtzdHJpbmdbXX0gcGFydHNcbiAqIEBwYXJhbSB7c3RyaW5nfSBmbGFnc1xuICogQHJldHVybiB7b2JqZWN0fSAtIFJlZ0V4cCBvYmplY3RcbiAqL1xuZnVuY3Rpb24gbXVsdGlsaW5lUmVnZXhwKHBhcnRzLCBmbGFncykge1xuICB2YXIgcmVnZXhwQXNTdHJpbmdMaXRlcmFsID0gcGFydHMuam9pbignJyk7XG4gIHJldHVybiBuZXcgUmVnRXhwKHJlZ2V4cEFzU3RyaW5nTGl0ZXJhbCwgZmxhZ3MpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB0b1N0cmluZztcblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiOyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG5mdW5jdGlvbiB0b1N0cmluZyhpbnB1dCkge1xuICBpZiAoX3R5cGVvZihpbnB1dCkgPT09ICdvYmplY3QnICYmIGlucHV0ICE9PSBudWxsKSB7XG4gICAgaWYgKHR5cGVvZiBpbnB1dC50b1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgaW5wdXQgPSBpbnB1dC50b1N0cmluZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbnB1dCA9ICdbb2JqZWN0IE9iamVjdF0nO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpbnB1dCA9PT0gbnVsbCB8fCB0eXBlb2YgaW5wdXQgPT09ICd1bmRlZmluZWQnIHx8IGlzTmFOKGlucHV0KSAmJiAhaW5wdXQubGVuZ3RoKSB7XG4gICAgaW5wdXQgPSAnJztcbiAgfVxuXG4gIHJldHVybiBTdHJpbmcoaW5wdXQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB3aGl0ZWxpc3Q7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIHdoaXRlbGlzdChzdHIsIGNoYXJzKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIHJldHVybiBzdHIucmVwbGFjZShuZXcgUmVnRXhwKFwiW15cIi5jb25jYXQoY2hhcnMsIFwiXStcIiksICdnJyksICcnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgRWRpdEZvcm0gZnJvbSAnLi9jb21wb25lbnRzL2VkaXQtZm9ybSc7XHJcbmNvbnN0IGN1cnJlbnRIcmVmID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbmNvbnN0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoY3VycmVudEhyZWYuc2VhcmNoKTtcclxuY29uc3QgaWRTb25nID0gc2VhcmNoUGFyYW1zLmdldCgnaWQnKTtcclxuY29uc3QgRm9ybSA9IG5ldyBFZGl0Rm9ybShpZFNvbmcpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=