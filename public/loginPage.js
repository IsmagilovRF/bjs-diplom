"use strict";
const loginForm = new UserForm();

loginForm.loginFormCallback = data => ApiConnector.login(data, (response) => {
    console.log(response);
    if (response.success) {
        location.reload();
    } else {
        loginForm.setLoginErrorMessage(response.data);
    }
  })
  

loginForm.registerFormCallback = data => ApiConnector.register(data, (response) => {
    console.log(response);
    if (response.success) {
        location.reload();
    } else {
        loginForm.setRegisterErrorMessage(response.data);
    }
  })
  

  

//loginForm.loginFormCallback = (data) => console.log(data);
//loginForm.loginFormCallback = (data) => alert(data);
//ApiConnector.login({login: "oleg@demo.ru", password: "demo"}, (response) => {console.log(response); });

/*loginForm.loginFormCallback = data => ApiConnector.login(data, (response) => {
    console.log(response);
    });
*/




/* userForm.registerFormCallback = (data) => ApiConnector.register(data,callback);
userForm.loginFormCallback = (data) => console.log(data);
userForm.registerFormCallback = (data) => console.log(data);
*/
/*
const loginForm = new UserForm();
undefined
loginForm.loginFormCallback = (data) => console.log(data);
(data) => console.log(data)
VM123:1 {login: "oleg@demo.ru", password: "demo"}login: "oleg@demo.ru"password: "demo"__proto__: Object
VM123:1 {login: "oleg@demo.ru", password: "ddddddd"}
loginForm.loginFormCallback = (data) => alert(data);
(data) => alert(data)
loginForm.loginFormCallback = (data) => alert(JSON.stringify(data));
(data) => alert(JSON.stringify(data))
*/