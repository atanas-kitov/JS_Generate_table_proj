import Table from "./table.js";
import Modal from "./modal.js";

const container = document.querySelector('#container');
const modalContainer = document.querySelector('.modal');

let modal = new Modal(modalContainer);

// fetch('https://raw.githubusercontent.com/vega/vega/master/docs/data/movies.json')    16
// fetch('https://jsonplaceholder.typicode.com/posts')

fetch('https://raw.githubusercontent.com/vega/vega/master/docs/data/movies.json')
.then(response => response.json())
.then(data => {
    new Table(container, data, rowClick(modal, data));
})

function generateForm(obj, index) {
    const form = document.createElement('form');
    form.setAttribute('row-index', index);

    for (let key in obj) {
        const div = document.createElement('div');
        const id = `modal_${key.split(' ').join('_')}`;
        console.log(id)

        const label = document.createElement('label');
        label.for = id;
        label.textContent = key;

        const input = document.createElement('input');
        input.type = 'text';
        input.id = id;
        input.name = key;
        input.value = obj[key];

        div.append(label);
        div.append(input);
        form.append(div);
    }
    return form;
}

function saveData(e) {
    const modalBody = modal.getModalBody();
    const form = modalBody.querySelector('form');
    const rowIndex = form.getAttribute('row-index');
    const tr = container.querySelector(`tr[data-index="${rowIndex}"]`);
    const cells = Array.from(tr.querySelectorAll('td'));

    cells.forEach(cell => {
        let selector = `#modal_${cell.getAttribute('data-cell').split(' ').join('_')}`;
        let input = form.querySelector(selector);
        cell.textContent = input.value;
        // console.log(input)
    })

    this.removeEventListener('click', saveData);
    modal.close();
}

function rowClick(modal, data) {

    return function (e) {

        const { target } = e;
        let tr = target.nodeName === 'TR' ? target : target.closest('tr');

        if (!tr) {
            return;

        } else {
            let index = tr.dataset.index;
            let dataObj = data[index];
            const form = generateForm(dataObj, index);
            modal.showForm(form);
            modal.open();
            const modalWindow = modal.getModalWindow();
            const closeBtn = modalWindow.querySelector('.close-button');
            const saveBtn = modalWindow.querySelector('.save-button');
            closeBtn.addEventListener('click', modal.close);
            saveBtn.addEventListener('click', saveData);
        }
    }
}


