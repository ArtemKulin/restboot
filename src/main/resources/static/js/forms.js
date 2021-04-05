'use strict';
const form = document.forms.newUserForm;

const dataForm = new FormData(form);
console.log(dataForm);
dataForm.append('firstName', 'test');

console.log(dataForm);
const json = JSON.stringify(Object.fromEntries(dataForm.entries()));
console.log(json);


console.log(form.elements["firstName"]);
console.log(form.elements.firstName);

let input = form.elements.firstName;
input.value("lol");
console.log(input);

formData.append('name', form.elements['firstName'].value)
console.log(form);

bindPostData(form);

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

function bindPostData (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        console.log(formData);
        const json = JSON.stringify(Object.fromEntries(formData.entries()));
        console.log(json);

        postData('/api/users', json)
            .then(data => {
                console.log(data);
            });
    });
}





