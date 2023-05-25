
import MusicTemplate from './components/musicTemplate';

import { getAllShowSong } from './services/api';

const fetch = async() => {
    try{
        const listSong = await getAllShowSong()
        const MusicTemplate2 = new MusicTemplate('content-main-body', 'content-main',listSong);
    }catch(err) {
        console.log(err)
    }
}
fetch()



