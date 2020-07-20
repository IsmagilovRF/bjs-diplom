//## Выход из личного кабинета
//Создайте объект класса `LogoutButton`. 
//В свойство `action` запишите функцию, которая будет вызывать запрос деавторизации (`logout`). 
//В колбек запроса добавьте проверку: если запрос выполнился успешно, то обновите страницу (с помощью `location.reload();`).
const exit = new LogoutButton();
exit.action = () => {
    ApiConnector.logout((callback) => {
      if (callback.success) {
        location.reload();
      }
    });
  };

//## Получение информации о пользователе
//Выполните запрос на получение текущего пользователя (`current`), в колбеке которого проверьте ответ: 
//если ответ успешный, то вызовите метод отображения данных профиля (`ProfileWidget.showProfile`) в который передавайте данные ответа от сервера.
ApiConnector.current((response) => {
    console.log(response);
    if (response.success) {
        ProfileWidget.showProfile(response.data)
    }
  });
  //## Получение текущих курсов валюты
  //1. Создайте объект типа `RatesBoard`.
  //2. Напишите функцию, которая будет выполнять запрос получения курсов валют.
  //3. В случае успешного запроса, очищайте таблицу с данными (`clearTable`) и заполняйте её (`fillTable`) полученными данными.
  //4. Вызовите данную функцию для получения текущих валют.
  //5. Напишите интервал, который будет многократно выполняться (раз в минуту) и вызывать вашу функцию с получением валют.

const exchangeRates = new RatesBoard();

exchangeRates.constructor = () => {
    ApiConnector.getStocks((response) => {
        console.log(response);
        //exchangeRates.constructor();
        if (response.success) {
            exchangeRates.clearTable();
            exchangeRates.fillTable(response.data);
        }
    })
}

//exchangeRates.constructor();
setInterval(exchangeRates.constructor(),1000);

/* ## Операции с деньгами
1. Создайте объект типа `MoneyManager`
2. Реализуйте пополнение баланса:
    1. Запишите в свойство `addMoneyCallback` функцию, которая будет выполнять запрос.
    2. Внутри функции выполните запрос на пополнение баланса (`addMoney`).
    3. Используйте аргумент функции свойства `addMoneyCallback` для передачи данных `data` в запрос.
    4. После выполнения запроса выполните проверку успешности запроса.
    5. В случае неудачного запроса отобразите *ошибку* в окне отображения сообщения (`setMessage`).
    6. В случае успешного запроса отобразите в профиле новые данные о пользователе из данных ответа от сервера (`showProfile`).
    7. Также выведите сообщение об успешном пополнении баланса в окне отображения сообщения (`setMessage`).
*/
const moneyTransactions = new MoneyManager();

moneyTransactions.addMoneyCallback = (data) =>  {
  ApiConnector.addMoney(data,(response) => {
      console.log(response);
      if (response.success) {
        ProfileWidget.showProfile(response.data);
        console.log('Баланс пополнен  - успешно.')
      }
      console.log('    response.data =   ');
      console.log(response.data);

      moneyTransactions.setMessage(response.success, response.data);      
  })
}

/*3. Реализуйте конвертирование валюты:
    1. Запишите в свойство `conversionMoneyCallback` функцию, которая будет выполнять запрос.
    2. Внутри функции выполните запрос на пополнение баланса (`convertMoney`)
    3. Используйте аргумент функции свойства `conversionMoneyCallback` для передачи данных в запрос.
    4. Повторите пункты 2.4-2.7
*/
moneyTransactions.conversionMoneyCallback = (data) =>  {
  ApiConnector.convertMoney(data,(response) => {
      console.log(response);
      if (response.success) {
        ProfileWidget.showProfile(response.data);
        console.log('Конвертирование валюты - успешно.')
      }
      moneyTransactions.setMessage(response.success, response.data);      
  })
}

/*4. Реализуйте перевод валюты:
    1. Запишите в свойство `sendMoneyCallback` функцию, которая будет выполнять запрос.
    2. Внутри функции выполните запрос на пополнение баланса (`transferMoney`).
    3. Используйте аргумент функции свойства `sendMoneyCallback` для передачи данных в запрос.
    4. Повторите пункты 2.4-2.7
    */
   moneyTransactions.sendMoneyCallback = (data) =>  {
    ApiConnector.transferMoney(data,(response) => {
        console.log(response);
        if (response.success) {
          ProfileWidget.showProfile(response.data);
          console.log('Перевод средств - успешно.')
        }
        moneyTransactions.setMessage(response.success, response.data);      
    })
  }

  //1. Создайте объект типа `FavoritesWidget`
  const workWithTheChosenOne = new FavoritesWidget();
  /*2. Запросите начальный список избранного:
    1. Выполните запрос на получение списка избранного (`getFavorites`).
    2. В колбеке запроса проверяйте успешность запроса.
    3. При успешном запросе очистите текущий список избранного (`clearTable`).
    4. Отрисуйте полученные данные (`fillTable`).
    5. Заполните выпадающий список для перевода денег (`updateUsersList`).
    */
   workWithTheChosenOne.constructor = () => {
    ApiConnector.getFavorites((response) => {
      console.log('запрос на получение списка избранного ==> response:');
      console.log(response);
        if (response.success) {
          workWithTheChosenOne.clearTable();
          workWithTheChosenOne.fillTable(response.data);
          moneyTransactions.updateUsersList(response.data);
        }

    })
}

workWithTheChosenOne.constructor();

/*3. Реализуйте добавления пользователя в список избранных:
    1. Запишите в свойство `addUserCallback` функцию, которая будет выполнять запрос.
    2. Внутри функции выполните запрос на добавление пользователя (`addUserToFavorites`).
    3. Используйте аргумент функции свойства `addUserCallback` для передачи данных пользователя в запрос.
    4. После выполнения запроса выполните проверку успешности запроса.
    5. В случае неудачного запроса отобразите *ошибку* в окне отображения сообщения (`setMessage`).
    6. В случае успеха запроса выполните пункты 2.3-2.5
    7. Также выведите сообщение об успешном добавлении пользователя в окне отображения сообщения (`setMessage`).
*/
workWithTheChosenOne.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    console.log('workWithTheChosenOne == response:');
    console.log(response);
      if (response.success) {
        workWithTheChosenOne.clearTable();
        workWithTheChosenOne.fillTable(response.data);
        moneyTransactions.updateUsersList(response.data);

      }
      //moneyTransactions.setMessage(response.success, response.data);      
  })
}
/*4. Реализуйте удаление пользователя из избранного
    1. Запишите в свойство `removeUserCallback` функцию, которая будет выполнять запрос.
    2. Внутри функции выполните запрос на удаление пользователя (`removeUserFromFavorites`).
    3. Используйте аргумент функции свойства `removeUserCallback` для передачи данных пользователя в запрос.
    4. После запроса выполните пункты 3.4-3.7
*/
workWithTheChosenOne.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    console.log('removeUserFromFavorites == response:');
    console.log(response);
      if (response.success) {
        workWithTheChosenOne.clearTable();
        workWithTheChosenOne.fillTable(response.data);
        moneyTransactions.updateUsersList(response.data);
      }
      moneyTransactions.setMessage(response.success, response.data);      
  })
}


