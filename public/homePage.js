//## Выход из личного кабинета
const exit = new LogoutButton();
exit.action = () => {
  ApiConnector.logout((callback) => {
    if (callback.success) {
      location.reload();
    }
  });
};

//## Получение информации о пользователе
ApiConnector.current((response) => {
  //console.log(response);
  if (response.success) {
    ProfileWidget.showProfile(response.data)
  }
});

//## Получение текущих курсов валюты
const exchangeRates = new RatesBoard();
const updateStocks = () => {
  ApiConnector.getStocks(response => {
    if (response.success) {
      exchangeRates.clearTable();
      exchangeRates.fillTable(response.data);
    };
  });
}

updateStocks();
setInterval(updateStocks, 3600);

// ## Операции с деньгами
const moneyTransactions = new MoneyManager();
moneyTransactions.addMoneyCallback = (data) =>  {
  ApiConnector.addMoney(data,(response) => {
      //console.log(response);
      if (response.success) {
        ProfileWidget.showProfile(response.data);
        moneyTransactions.setMessage(false, `Счёт пополнен успешно на ${data.amount} ${data.currency}`);
        return
      }
      moneyTransactions.setMessage(response.success, response.data);      
  })
}

//3. Реализуйте конвертирование валюты:
moneyTransactions.conversionMoneyCallback = (data) =>  {
  ApiConnector.convertMoney(data,(response) => {
      //console.log(response);
      if (response.success) {
        ProfileWidget.showProfile(response.data);
        moneyTransactions.setMessage(false, `Конвертирование валюты - успешно.`);
        return
      }
      moneyTransactions.setMessage(response.success, response.data);      
  })
}

//4. Реализуйте перевод валюты:
   moneyTransactions.sendMoneyCallback = (data) =>  {
    ApiConnector.transferMoney(data,(response) => {
        if (response.success) {
          ProfileWidget.showProfile(response.data);
          console.log('Перевод средств - успешно.');
          moneyTransactions.setMessage(false, `Перевод средств - успешно.`);
        return
        }
        moneyTransactions.setMessage(response.success, response.data);      
    })
  }

  //1. Создайте объект типа `FavoritesWidget`
  const workWithTheChosenOne = new FavoritesWidget();
  //2. Запросите начальный список избранного:
   workWithTheChosenOne.constructor = () => {
    ApiConnector.getFavorites((response) => {
        if (response.success) {
          workWithTheChosenOne.clearTable();
          workWithTheChosenOne.fillTable(response.data);
          moneyTransactions.updateUsersList(response.data);
          moneyTransactions.setMessage(false, 'Начальный список избранного запрошен');  
          return
        }
      moneyTransactions.setMessage(response.success, response.data);   
    })
}

workWithTheChosenOne.constructor();

//*3. Реализуйте добавления пользователя в список избранных:
workWithTheChosenOne.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
      if (response.success) {
        workWithTheChosenOne.clearTable();
        workWithTheChosenOne.fillTable(response.data);
        moneyTransactions.updateUsersList(response.data);
        moneyTransactions.setMessage(false, 'Пользователь добавлен в список избранных');  
        return 
      }
      moneyTransactions.setMessage(response.success, response.data);      
  })
}
//*4. Реализуйте удаление пользователя из избранного
workWithTheChosenOne.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (response) => {
      if (response.success) {
        workWithTheChosenOne.clearTable();
        workWithTheChosenOne.fillTable(response.data);
        moneyTransactions.updateUsersList(response.data);
        moneyTransactions.setMessage(false, 'Пользователь удален из списка избранных');  
        return    
      }
      moneyTransactions.setMessage(response.success, response.data);      
  })
}


