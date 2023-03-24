class Table {
    constructor(container, data, onRowClick){
        this.container = container;
        this.data = data;
        
        const table = document.createElement('table');
        const tableHead = this.createHead(Object.keys(data[0]));
        const tableBody= this.createBody(data);

        if (onRowClick) {
            tableBody.addEventListener('click', onRowClick)
        }

        table.append(tableHead);
        table.append(tableBody);        
        container.append(table);
    }

    createHead(data) {
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');

        for (let key of data) {
            const th = document.createElement('th');
            th.innerText = key;

            tr.append(th);
        }
        thead.append(tr);
        return thead;
    }

    createBody(data) {
        const tbody = document.createElement('tbody');

        data.forEach((obj, index) => {
            const tr = document.createElement('tr');
            tr.setAttribute('data-index', index);

            for (let key in obj) {
                const td = document.createElement('td');
                td.innerText = `${obj[key]}`;
                td.setAttribute('data-cell', key)

                tr.append(td);
            }
            tbody.append(tr);
        })
        return tbody;
    }

}

export default Table;