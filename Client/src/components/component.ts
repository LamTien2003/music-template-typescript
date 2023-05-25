export default abstract class Component<T extends HTMLElement> {
    element: HTMLDivElement;
    hostElement!: T;
    constructor(elementClass: string, hostElementClass: string | HTMLElement) {
        const box = document.createElement('div');
        box.className = elementClass;
        this.element = box;
        if (typeof hostElementClass === 'string') {
            this.hostElement = document.querySelector(`.${hostElementClass}`)! as T;
        } else if (hostElementClass instanceof HTMLElement) {
            this.hostElement = hostElementClass! as T;
        }
    }

    abstract configure(): void;
    abstract renderContent(data?: any[]): void;
}
