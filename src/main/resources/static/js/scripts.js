'use strict';

fetch("/api/users").then(
    res => {
        res.json().then(
            data => {
                if (data.length > 0) {
                    let temp = "";

                    data.forEach((elem) => {
                        temp += "<tr>";
                        console.log(temp);
                        temp += "<td>" + elem.id + "</td>";
                        console.log(temp);
                        temp += "<td>" + elem.name + "</td>";
                        console.log(temp);
                        temp += "<td>" + elem.lastName + "</td>";
                        console.log(temp);
                        temp += "<td>" + elem.age + "</td>";
                        console.log(temp);
                        // forEach((el) => {console.log(el.role)});
                        console.log(temp);
                        temp += "<td>";
                        console.log(temp);
                        elem.authorities.forEach((t) => {temp += t.role + " ";})
                        temp += "</td>";
                        console.log(temp);
                    })
                    document.getElementById("data").innerHTML = temp;
                }
            }
        )
    }
);