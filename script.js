

    loadData();


    var form1 = document.getElementById('form1');

    form1.addEventListener('submit', function (e) {
        e.preventDefault();

        var name = form1.name.value;
        var email = form1.email.value;
        var address = form1.address.value;

        if ('' == name) {
            alert('The name field is required');
        } else if ('' == email) {
            alert('The email field is required');
        } else if ('' == address) {
            alert('The address field is required');
        } else {
            if (form1.index == undefined) {
                if (localStorage.getItem('infos')) {
                    var parsedData = JSON.parse(localStorage.getItem('infos'));
                    parsedData.push({ name, email, address });
                    var data = JSON.stringify(parsedData);
                    localStorage.setItem('infos', data);
                } else {
                    var data = JSON.stringify([{ name, email, address }]);
                    localStorage.setItem('infos', data);
                }
                alert('Information saved successfully');
            } else {
                if (localStorage.getItem('infos')) {
                    var parsedData = JSON.parse(localStorage.getItem('infos'));
                    var existData = parsedData[form1.index.value];
                    if (existData != undefined) {
                        Object.keys(existData).map(function (key) {
                            existData[key] = form1[key].value;
                        });
                        var data = JSON.stringify(parsedData);
                        localStorage.setItem('infos', data);
                        document.getElementById('sBtn').textContent = 'Save';
                        alert('Information updated successfully');
                    }
                }
            }
            form1.reset();
            loadData();
        }
    });


    document.addEventListener('click', function(e) {

        switch (e.target.className) {

            case 'delete':
                deleteInfo(e.target.dataset.id);
                break;

            case 'edit':
                editInfo(e.target.dataset.id);
                break;
        
            default:
                break;
        }
    });


    function editInfo(ind) {
        if (localStorage.getItem('infos')) {
            var parsedData = JSON.parse(localStorage.getItem('infos'));
            if (parsedData.length) {
                Object.keys(parsedData[ind]).map(function(key) {
                    form1[key].value = parsedData[ind][key];
                });
                document.getElementById('sBtn').textContent = 'Update';
                if (form1.index == undefined) {
                    var idField = document.createElement('input');
                    idField.setAttribute('type', 'hidden');
                    idField.setAttribute('name', 'index');
                    idField.setAttribute('value', ind);
                    form1.appendChild(idField);
                } else {
                    form1.index.value = ind;
                }
            }
        }
    }


    function deleteInfo(ind) {
        var msg = "Are you sure to delete this?";
        if (confirm(msg) && localStorage.getItem('infos')) {
            var parsedData = JSON.parse(localStorage.getItem('infos'));
            parsedData.splice(ind, 1);
            var data = JSON.stringify(parsedData);
            localStorage.setItem('infos', data);
            loadData();
        }
    }


    function loadData() {
        if (localStorage.getItem('infos')) {
            var infoTable = document.getElementById('info-table');
            var data = JSON.parse(localStorage.getItem('infos'));
            var rows = `
            <tr>
                <th>SL</th>
                <th>Name</th>
                <th>E-Mail</th>
                <th>Address</th>
                <th>Actions</th>
            </tr>
        `;
            data.forEach((el, ind) => {
                rows += `
                <tr>
                    <td>${ind + 1}</td>
                    <td>${el.name}</td>
                    <td>${el.email}</td>
                    <td>${el.address}</td>
                    <td>
                        <button class="edit" data-id="${ind}">Edit</button>
                        <button class="delete" data-id="${ind}">Delete</button>
                    </td>
                </tr>
            `;
            });
            infoTable.innerHTML = rows;
        }
    }


function filterDataInTable() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("info-table");
    tr = table.getElementsByTagName("tr");
    for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (var j = 0; j < td.length; j++) {
            cell = tr[i].getElementsByTagName("td")[j];
            if (cell) {
                if (cell.textContent.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    break;
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}