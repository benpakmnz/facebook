export default class RemoveEl {
    constructor(el) {   
        this.el =el;
    this.removeButton = this.el.querySelectorAll('li')[1];
    this.removeButton.addEventListener('click', () => this.remove());
    }
    remove() {
        this.el.parentNode.removeChild(this.el);
    }
}