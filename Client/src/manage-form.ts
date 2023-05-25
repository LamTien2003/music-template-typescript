import { ManageForm } from './components/manage-form';
import { getAllSong } from './services/api';


const fetch = async() => {
    try{
        const listSong = await getAllSong()
        const manageForm = new ManageForm(listSong);
    }catch(err) {
        console.log(err)
    }
}
fetch()
