'use strict';

function drawTable(elem) {
    let tbody = "<tr>";
    tbody += "<td>" + elem.id + "</td>";
    tbody += "<td>" + elem.name + "</td>";
    tbody += "<td>" + elem.lastName + "</td>";
    tbody += "<td>" + elem.age + "</td>";
    tbody += "<td>" + elem.email + "</td>";
    tbody += "<td>"
    if (elem.role !== null) {
        elem.authorities.reverse();
        elem.authorities
            .forEach(
                (t) => {
                    tbody += t.role.substr(5) + " ";
                    if (t.role.includes('ROLE_ADMIN')) {
                    }
                })
    }
    tbody += "</td>";
    return tbody;
}

async function getData(url) {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }
    return await res.json();
}

function getRoles () {
    let arr = [];
    let i = 0;
    getData('/api/roles').then((data) => {
        data.forEach((e) => {
            arr[i] = e.valueOf();
            i++;
        })
    })
    return arr;
}

const roles = getRoles();


const putData = async (url, data) => {
    let res = await fetch (url, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: data
    });

    return await res.json();
}

const deleteData = async (url) => {
    let res = await fetch (url, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
    });
    return res;
}

function renderMainPage() {
    getData("/api/users")
        .then(data => {
            let table = "";

            if (data.length > 0) {
                data.forEach((elem) => {
                    table += drawTable(elem);
                    table += "<td>" +
                        "<a data-modal type='button' class='btn btn-info editButton' " +
                        "data-toggle='modal' " +
                        "href='/api/users/" + elem.id + "' data-target='" + elem.id + "'>Edit</a>" +
                        "</td>";
                    table += "<td>" +
                        "<a data-modal type='button' class='btn btn-danger deleteButton' " +
                        "data-toggle='modal' " +
                        "href='/api/users/" + elem.id + "' data-target='" + elem.id + "'>Delete</a>" +
                        "</td>";
                });
            } else {
                table += drawTable(data);
                table += "<td>" +
                    "<a data-modal class='btn btn-info editButton' " +
                    "data-toggle='modal' " +
                    "href='/api/users/" + data.id + "' data-target='" + data.id + "'>Edit</a>" +
                    "</td>";
                table += "<td>" +
                    "<a data-modal class='btn btn-danger deleteButton' " +
                    "data-toggle='modal' " +
                    "href='/api/users/" + data.id + "' data-target='" + data.id + "'>Delete</a>" +
                    "</td>";
            }
            let tableContent = document.getElementById("tableContent");
            if (tableContent !== null) {
                tableContent.innerHTML = table;
            }
        }).then(() => {

        $('.editButton').on('click', function (event) {
            event.preventDefault();
            let href = $(this).attr('href');
            console.log(href);
            getData(href).then((data) => {
                const editForm = document.forms.editForm;
                const user = data.valueOf();

                $('.editModalForm').modal();

                $('.editModalForm #editId').val(user.id);
                $('.editModalForm #editName').val(user.name);
                $('.editModalForm #editLastName').val(user.lastName);
                $('.editModalForm #editAge').val(user.age);
                $('.editModalForm #editEmail').val(user.email);

                editForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const editFormData = new FormData(editForm);
                    let editUser = Object.fromEntries(editFormData.entries());
                    roles.forEach((role) => {
                        if (role.role.valueOf === editUser.role.valueOf) {
                            editUser.role = role;
                        }
                    })
                    const json = JSON.stringify(editUser);
                    putData('/api/users/', json).then(async () => {
                        $('.editModalForm').modal('hide');
                        await renderMainPage();
                    })
                })
            })
        })

            $('.deleteButton').on('click', function (event) {
                event.preventDefault();
                let href = $(this).attr('href');
                getData(href).then((data) => {
                    const deleteForm = document.forms.deleteForm;
                    const user = data.valueOf();

                    $('.deleteModalForm').modal();

                    $('.deleteModalForm #deleteId').val(user.id);
                    $('.deleteModalForm #deleteName').val(user.name);
                    $('.deleteModalForm #deleteLastName').val(user.lastName);
                    $('.deleteModalForm #deleteAge').val(user.age);
                    $('.deleteModalForm #deleteEmail').val(user.email);

                    deleteForm.addEventListener('submit', (e) => {
                        e.preventDefault();
                        deleteData(href).then(async () => {
                            $('.deleteModalForm').modal('hide');
                            await renderMainPage();
                        })
                    })
                })
            })
        });
}

getData("/api/security").then(data => {
    let navItem = "<li class='nav-item' style='color: white'>";
    navItem += "<strong>" + data.email + "</strong>";
    navItem += " with roles ";

    let role = null;
    data.authorities.reverse();
    data.authorities
        .forEach((a) => {
            navItem += a.role.substr(5) + " ";
            if (a.role.includes("ROLE_ADMIN")) {
                role = "admin";
            }
        });
    navItem += "<li>";
    document.getElementById("currentUser").innerHTML = navItem;

    let tab = document.getElementById('v-pills-profile-tab');
    let div = document.getElementById('v-pills-profile');

    if (role == null) {
        tab.classList.add('active');
        div.classList.add('show');
        div.classList.add('active');
    }

    let userId = data.id;
    tab.setAttribute('name', '/api/users/' + userId);

}).then(() => {
    let tab = document.getElementById('v-pills-profile-tab');
    let href = tab.getAttribute('name');

    getData(href).then(user => {
        let tableContent = document.getElementById("userContent");
        tableContent.innerHTML = drawTable(user);
    })
});


renderMainPage();

const form = document.forms.newUserForm;

const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: data
    });

    return await res.json();
}

function bindPostData(form) {
    form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            let obj = Object.fromEntries(formData.entries());
                        roles.forEach((role) => {
                if (role.role === obj.role) {
                    obj.role = role;
                }
            })

            const json = JSON.stringify(obj);

            postData('/api/users', json).then(async (r) => {
                console.log(r);
                await renderMainPage();

                let tab = document.getElementById('home');
                let currentTab = document.getElementById('profile')

                let link = document.getElementById('home-tab');
                let currentLink = document.getElementById('profile-tab')

                currentTab.classList.remove('show');
                currentTab.classList.remove('active');
                currentLink.classList.remove('active')
                tab.classList.add('show');
                tab.classList.add('active');
                link.classList.add('active')
            })
        }
    )
}

bindPostData(form);