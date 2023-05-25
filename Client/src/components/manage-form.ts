import Component from './component';
interface SongData {
    _id: number;
    nameSong: string;
    author: string;
    view: number;
    time: string;
    image: string;
    music: string;
    show: boolean
}
export class ManageForm extends Component<HTMLDivElement> {
    constructor(data: SongData[]) {
        super('content-main-body', 'content-main');
        this.renderContent(data);
        this.configure()
        this.hostElement.appendChild(this.element);
    }
    configure() {
        const listUpdateShowBtn = this.element.querySelectorAll('.updateShow')
        const listDeleteBtn = this.element.querySelectorAll('.delete-btn')


        listDeleteBtn.forEach(btn => btn.addEventListener('click',async(e:Event) => {
            e.preventDefault()
            try {
                const btnElement = (e.target) as HTMLParagraphElement
                const idSong = btnElement.getAttribute('data-id')
                if(!confirm("Bạn có chắc chắn muốn xóa bài hát này ?")) {
                    return;
                }
                let options: RequestInit  = {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
                };
                if (sessionStorage.getItem('token')) {
                    options = {
                        ...options,
                        headers: {
                            'Content-Type': 'application/json', 
                            Accept: 'application/json',
                            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                        },
                    };
                }
                const response = await fetch(`http://localhost:3030/songs/${idSong}`, options);
                const result = await response.json()
                if(!response.ok || result.status === 'failed') {
                    return alert(result.message)
                }
                alert("Xóa thành công")
                window.location.href = '/Client/src/views/index.html'
            }catch(err) {
                console.log(err)
            }
        }))
        listUpdateShowBtn.forEach(btn => btn.addEventListener('click',async (e:Event) => {
            e.preventDefault()
            const btn = e.target as HTMLButtonElement
            const id = btn.getAttribute('data-id')
            let options: RequestInit  = {
                method: 'PATCH',
                body: JSON.stringify({show: true}),
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
            };
            if (sessionStorage.getItem('token')) {
                options = {
                    ...options,
                    headers: {
                        'Content-Type': 'application/json', 
                        Accept: 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    },
                };
            }
            const response = await fetch(`http://localhost:3030/songs/updateshow/${id}`, options);
            const result = await response.json();
            if(!response.ok || result.status === 'failed') {
                return alert(result.message)
            }
            window.location.href = '/Client/src/views/index.html';
        } ))
    }
    renderContent(data: SongData[]) {
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
                <p>${item.show ? "Đang được hiển thị": `<button class='updateShow' data-id=${item._id}> Duyệt bài hát </button>`}</p>
            </div>
        </div>`;
            })
            .join(' ');
        this.element.innerHTML = html;

    }
}
