'use strict';

const userForm = new UserForm(); 

userForm.loginFormCallback = (data) => {
    ApiConnector.login (data, response => {
        if (response.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(response.error);
        }
    });
}

userForm.registerFormCallback = (data) => {
    ApiConnector.register (data, response => {
        if (response.success) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage(response.error);
        }
    });
}

/*Подключите строгий режим выполнения кода.
Создайте объект класса UserForm.
Присвойте свойству loginFormCallback созданного объекта значение функции, 
которая в качестве аргумента принимает объект data (объект, который содержит логин и пароль, 
введённые в форму, и который будет передаваться внутри loginFormAction).
Функция должна выполнять запрос на сервер для попытки авторизации пользователя 
(авторизацию пользователя выполняйте с помощью ApiConnector.login).
Передайте в запрос авторизации функцию, которая будет выполняться при попытке авторизации.
Посмотрите в консоли, какой объект возвращает сервер.
Проверьте успешность запроса.
В случае успеха запроса обновите страницу (с помощью location.reload();).
В случае провала запроса выведите ошибку в окно для ошибок.
Проделайте аналогичные действия со свойством registerFormCallback.
Передайте запрос на регистрацию.
Напишите колбек, который будет выполняться после запроса.
Выведите ошибку или обновите страницу.*/