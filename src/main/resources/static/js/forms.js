// 'use strict';
//
// const form = document.forms.newUserForm;
//
// const postData = async (url, data) => {
//     let res = await fetch(url, {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json; charset=utf-8'
//         },
//         body: data
//     });
//
//     return await res.json();
// }
//
// function bindPostData (form) {
//     form.addEventListener('submit', (e) => {
//         e.preventDefault();
//
//         const formData = new FormData(form);
//
//         let obj = Object.fromEntries(formData.entries());
//         let roleValue = obj.role.valueOf();
//         obj.role = {
//             'role': roleValue,
//             'authority': roleValue
//         }
//
//         const json = JSON.stringify(obj);
//
//         postData('/api/users', json).then((r) => {
//
//           console.log(r);
//         }).then()
//     }
//
//     )
// }
//
// bindPostData(form);



