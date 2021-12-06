

function calculateResult() {
    let a = document.getElementById('aCoeff').value;
    let b = document.getElementById('bCoeff').value;
    let c = document.getElementById('cCoeff').value;
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        alert("неверный ввод")
    }

    res = {};
    a = parseFloat(a);
    b = parseFloat(b);
    c = parseFloat(c);

    if (a == 0) {
        if (b == 0) {
            if (c == 0) {
                addInTable(a, b, c, Infinity);
            }
            else {
                addInTable(a, b, c);
            }
        }
        else {
            if (c == 0) {
                addInTable(a, b, c, 0);
            }
            else {
                x1 = -c / b;
                addInTable(a, b, c, x1);
            }
        }
        return;
    }


    d = b * b - 4 * a * c;
    if (d > 0) {
        let x1, x2;
        x1 = (-b - Math.sqrt(d)) / (2 * a);
        x2 = (-b + Math.sqrt(d)) / (2 * a);
        addInTable(a, b, c, x1, x2);
    }
    else if (d == 0) {
        let x1 = -b / (2 * a);
        addInTable(a, b, c, x1);
    }
    else {
        addInTable(a, b, c);
    }

}

function addInTable(a, b, c, x1, x2) {
    let table = document.getElementById("table");
    let args = []
    args.push(a);
    args.push(b);
    args.push(c);
    args.push(x1);
    args.push(x2);

    let tr = document.createElement('tr');
    let td;

    for (let i = 0; i < 3; i++) {
        td = document.createElement('td');
        td.innerHTML = args[i];
        tr.appendChild(td);
    }

    if (x1 == undefined && x2 == undefined) {
        td = document.createElement('td');
        td.colSpan = 2;
        td.innerHTML = "нет решений";
        tr.appendChild(td);
    }
    else if (x1 == Infinity) {
        td = document.createElement('td');
        td.colSpan = 2;
        td.innerHTML = "бесконечное множество решений";
        tr.appendChild(td);
    }
    else if (x2 == undefined) {
        td = document.createElement('td');
        td.colSpan = 2;
        td.innerHTML = x1;
        tr.appendChild(td);
    }
    else {
        for (let i = 3; i < 5; i++) {
            td = document.createElement('td');
            td.innerHTML = args[i];
            tr.appendChild(td);
        }
    }

    tr.onclick = deleteRow;
    table.appendChild(tr);

    changeBGColors();
}

function changeBGColors() {
    let tds = document.querySelectorAll('tr');
    for (let i = 1; i < tds.length; i++) {
        if (i % 2 == 0)
            tds[i].className = "bg-white";
        else
            tds[i].className = "bg-grey";
    }
}



function deleteRow() {
    this.style.opacity = 0;
    this.addEventListener('transitionend', function () {
        this.remove();
        changeBGColors();
    });
}