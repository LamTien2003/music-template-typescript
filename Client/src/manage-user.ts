import { ManageForm } from './components/manage-form';
import { getAllMySong } from './services/api';

const fetch = async() => {
    try{
        const listSong = await getAllMySong()
        const manageForm = new ManageForm(listSong);
    }catch(err) {
        console.log(err)
    }
}
fetch()
