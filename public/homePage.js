const logoutButton = new LogoutButton();  

logoutButton.action = function () {
	ApiConnector.logout (response => {
		if (response.success) {
			location.reload();
		} 
	});
}


ApiConnector.current (response => {
	if (response.success) {
		ProfileWidget.showProfile(response.data); 
	}
});


const ratesBoard = new RatesBoard();  

function getCurrentRatesBoard () {
	ApiConnector.getStocks (response => {
		if (response.success) {
			ratesBoard.clearTable(); //очищает таблицу
			ratesBoard.fillTable (response.data); //принимает объект и заполняет таблицу данными
		} 
	});
}
getCurrentRatesBoard();
setInterval(getCurrentRatesBoard, 60000);


/*--------------пополнение баланса-----------------*/
const moneyManager = new MoneyManager(); 

moneyManager.addMoneyCallback = function (data) {
  ApiConnector.addMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage (true, 'Пополнение баланса успешно');
		}
		else {
			 moneyManager.setMessage(false, response.error);
		} 
	});
}

/*---------------конвертирование валюты------------*/
moneyManager.conversionMoneyCallback = function (data) {
  ApiConnector.convertMoney (data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage (true, 'Конвертирование валюты прошло успешно');
		}
		else {
			 moneyManager.setMessage(false, response.error);
		} 
	});
}

/*--------------перевод валюты------------*/
moneyManager.sendMoneyCallback = function (data) {
  ApiConnector.transferMoney (data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage (true, 'Перевод средств прошел успешно');
		}
		else {
			 moneyManager.setMessage(false, response.error);
		} 
	});
}


/*-------------работа с избранным //начальный список избранного//------------*/
const favoritesWidget = new FavoritesWidget(); 

ApiConnector.getFavorites (response => {
	if (response.success) {
		favoritesWidget.clearTable(); 
		favoritesWidget.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
	}
});

/*-------------добавление пользователя в список избранных----------*/
favoritesWidget.addUserCallback = function (data) {
  ApiConnector.addUserToFavorites (data, response => {
		if (response.success) {
			favoritesWidget.clearTable(); 
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoritesWidget.setMessage (true, 'Пользователь добавлен в список');
		}
		else {
			favoritesWidget.setMessage(false, response.error);
		} 
	});
}

/*-------------удаление пользователя из списка избранных----------*/
favoritesWidget.removeUserCallback = function (data) {
  ApiConnector.removeUserFromFavorites (data, response => {
		if (response.success) {
			favoritesWidget.clearTable(); 
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoritesWidget.setMessage (true, 'Пользователь удален из списка');
		}
		else {
			favoritesWidget.setMessage(false, response.error);
		} 
	});
}
