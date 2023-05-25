var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import MusicTemplate from './components/musicTemplate';
import { getAllSong } from './services/api';
const fetch = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listSong = yield getAllSong();
        const MusicTemplate2 = new MusicTemplate('content-main-body', 'content-main', listSong);
    }
    catch (err) {
        console.log(err);
    }
});
fetch();
