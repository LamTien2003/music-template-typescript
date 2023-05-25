interface User {
    _id: string;
    username: string;
    password: string;
    role: string;
}
export class Sidebar {
    private sidebarHead: HTMLDivElement;
    private sidebarMenu: HTMLDivElement;
    private sidebarFoot: HTMLDivElement;
    private user?: User
    constructor(user?: User) {
        this.sidebarHead = document.querySelector('.sidebar-head')! as HTMLDivElement
        this.sidebarMenu = document.querySelector('.sidebar-menu')! as HTMLDivElement
        this.sidebarFoot = document.querySelector('.sidebar-foot')! as HTMLDivElement
        this.user = user
        this.renderContent()
        this.config()
    }
    config() {
        const quitBtn = document.querySelector('.quit-btn') as HTMLDivElement
        quitBtn?.addEventListener('click',(e) => {
            e.preventDefault()
            sessionStorage.removeItem('token')
            window.location.href = '/Client/src/views/index.html'
        })
    }
    renderContent() {
        if(this?.user) {
            if(this?.user?.role === 'admin') {
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
                </a>`
            }else {
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
                </a>`
            }
            this.sidebarFoot.innerHTML = `
            <a href="#" class="sidebar-menu-item  quit-btn">
                <span><i class="fa-solid fa-right-from-bracket"></i></span>
                Đăng xuất
            </a>`
        }else {
            this.sidebarMenu.innerHTML = `
            <a href="./index.html" class="sidebar-menu-item">
                <span><i class="fa-solid fa-house"></i></span>
                Trang chủ
            </a>
            `
            this.sidebarFoot.innerHTML = `
            <a href="/Client/src/views/login.html" class="sidebar-menu-item">
                <span><i class="fa-solid fa-right-from-bracket"></i></span>
                Đăng nhập
            </a>
            <a href="/Client/src/views/register.html" class="sidebar-menu-item">
                <span><i class="fa-solid fa-right-from-bracket"></i></span>
                Đăng ký
            </a>
            `
        }
        
    }
}