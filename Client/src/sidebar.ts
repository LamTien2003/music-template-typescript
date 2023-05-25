import { Sidebar } from "./components/sidebar";
import { getMyInfo } from "./services/api";


const fetch = async() => {
    try{
        const currentUser = await getMyInfo()
        if(currentUser) {
            const sideBar = new Sidebar(currentUser)
            return;
        }
        const sideBar = new Sidebar()
    }catch(err) {
        console.log(err)
    }
}
fetch()
