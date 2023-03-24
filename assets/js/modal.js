class Modal {
    constructor(container) {
        this.container = container;
        this.modal = container.querySelector('.modal');
        this.modalBody = container.querySelector('.modal-body');
        this.modalWindow = container.querySelector('.modal-window');
        this.close = this.close.bind(this);
    }

    

    showForm(content) {
        this.modalBody.innerHTML = '';
        this.modalBody.append(content);
    }
    getModal() {
        return this.modal;
    }

    getModalWindow() {
        return this.modalWindow;
    }

    getModalBody() {
        return this.modalBody;
    }

    open() {
        this.container.style.display = 'block';
    }

    close() {
        this.container.style.display = 'none';
    }
}

export default Modal;