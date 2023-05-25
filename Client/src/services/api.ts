export const getAllSong = async () => {
    const response = await fetch('http://localhost:3030/songs');
    const data = await response.json();
    return data.data;
};
export const getAllShowSong = async () => {
    const response = await fetch('http://localhost:3030/songs/show');
    const data = await response.json();
    return data.data;
};
export const getAllMySong = async () => {
    let options: RequestInit  = {};
    if (sessionStorage.getItem('token')) {
        options = {
            ...options,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
        };
    }
    const response = await fetch(`http://localhost:3030/songs/mysong`,options);
    const data = await response.json();
    return data.data;
};
export const getSongById = async (idSong: string) => {
    const response = await fetch(`http://localhost:3030/songs/${idSong}`);
    const data = await response.json();
    return data.data;
};
export const getMyInfo = async () => {
    let options: RequestInit  = {};
    if (sessionStorage.getItem('token')) {
        options = {
            ...options,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
        };
    }
    const response = await fetch(`http://localhost:3030/user/myInfo`,options);
    const data = await response.json();
    return data.data;
};
