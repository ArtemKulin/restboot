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
                        "href='/api/edit/" + elem.id + "' data-target='" + elem.id + "'>Edit</a>" +
                        "</td>";
                    table += "<td>" +
                        "<a data-modal type='button' class='btn btn-danger deleteButton' " +
                        "data-toggle='modal' " +
                        "href='/api/delete/" + elem.id + "' data-target='" + elem.id + "'>Delete</a>" +
                        "</td>";
                });
            } else {
                table += drawTable(data);
                table += "<td>" +
                    "<a data-modal class='btn btn-info editButton' " +
                    "data-toggle='modal' " +
                    "href='/api/edit/" + data.id + "' data-target='" + data.id + "'>Edit</a>" +
                    "</td>";
                table += "<td>" +
                    "<a data-modal class='btn btn-danger deleteButton' " +
                    "data-toggle='modal' " +
                    "href='/api/delete/" + data.id + "' data-target='" + data.id + "'>Delete</a>" +
                    "</td>";
            }
            let tableContent = document.getElementById("tableContent");
            if (tableContent !== null) {
                tableContent.innerHTML = table;
            }
        }).then(() => {

        $('.editButton').on('click', function (event) {
            event.preventDefault();
            var href = $(this).attr('href');
            console.log(href);
            var text = $(this).text();
            console.log(text);

            jQuery.get(href, function (user) {
                $('.editModalForm #id').val(user.editId);
                $('.editModalForm #name').val(user.editName);
                $('.editModalForm #lastName').val(user.editLastName);
            });
            $('.editModalForm #exampleModal').modal();
        });

        const modalTrigger = document.querySelectorAll('[data-modal]'),
            modal = document.querySelector('.modal'),
            modalClose = document.querySelector('.close');
        //console.log(modalTrigger);
        //console.log(modal);

        modalTrigger.forEach((e) => {
            console.log(modalTrigger);
            e.addEventListener('click', function (event) {
                event.preventDefault();
                modal.classList.add('show');
                modal.classList.remove('fade');

                console.log(e);
                console.log(modal);
                // modal.classList.toggle('show');
                // modal.classList.remove('hide')
            })
        })
    })
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
    tab.setAttribute('name', '/api/user/' + userId);

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
            let roleValue = obj.role.valueOf();
            obj.role = {
                'role': roleValue,
                'authority': roleValue
            }

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