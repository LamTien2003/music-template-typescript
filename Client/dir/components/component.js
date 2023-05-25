export default class Component {
    constructor(elementClass, hostElementClass) {
        const box = document.createElement('div');
        box.className = elementClass;
        this.element = box;
        if (typeof hostElementClass === 'string') {
            this.hostElement = document.querySelector(`.${hostElementClass}`);
        }
        else if (hostElementClass instanceof HTMLElement) {
            this.hostElement = hostElementClass;
        }
    }
}
