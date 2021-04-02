'use strict';

async function getData (url) {
    let res = await fetch(url);

    if(!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }
    return await res.json();
}

getData("/api/users")
    .then(data => {

        let tbody = "";

        if(data.length >0) {

            data.forEach((elem) => {
                tbody += "<tr>";
                tbody += "<td>" + elem.id + "</td>";
                tbody += "<td>" + elem.name + "</td>";
                tbody += "<td>" + elem.lastName + "</td>";
                tbody += "<td>" + elem.age + "</td>";
                tbody += "<td>" + elem.email + "</td>";
                tbody += "<td>"
                if(elem.role !== null){
                elem.authorities.reverse();
                elem.authorities
                    .forEach(
                        (t) => {
                            tbody += t.role.substr(5) + " ";
                        })
                }
                tbody += "</td>";
                tbody += "<td>" +
                    "<a type='button' class='btn btn-info editButton' " +
                    "data-toggle='modal' " +
                    "th:href='@{/api/edit/" + elem.id + "}'" + ">Edit</a>" +
                    "</td>";
                tbody += "<td>" +
                    "<a type='button' class='btn btn-danger deleteButton' " +
                    "data-toggle='modal' " +
                    "th:href='@{/api/delete/" + elem.id + "}'" + ">Edit</a>" +
                    "</td>";
            });
            let tableContent = document.getElementById("tableContent");
            if(tableContent !== null) {
            document.getElementById("tableContent").innerHTML = tbody;
            }
        }
    });

getData ("/api/security").then(data => {
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
    let href= tab.getAttribute('name');

    getData(href).then(user => {
        let userTbody = "";
            userTbody += "<td>" + user.id + "</td>";
            userTbody += "<td>" + user.name + "</td>";
            userTbody += "<td>" + user.lastName + "</td>";
            userTbody += "<td>" + user.age + "</td>";
            userTbody += "<td>" + user.email + "</td>";
            userTbody += "<td>"
        if(user.role !== null) {
            user.authorities.reverse();
            user.authorities
                .forEach(
                    (t) => {
                        userTbody += t.role.substr(5) + " ";
                    })
        }
            userTbody += "</td>";
            document.getElementById("userContent").innerHTML = userTbody;
    })
});
