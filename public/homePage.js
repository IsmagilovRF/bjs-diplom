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
exchangeRates.tableBody = () => {
    ApiConnector.getStocks((response) => {
        console.log(response);
        if (response.success) {
            exchangeRates.clearTable();
            exchangeRates.fillTable(response);
        }
    })
}
exchangeRates.tableBody()
setInterval(exchangeRates.tableBody(),1000);

