const readline = require('readline-sync');

/**
 * Обработка рискованности хранения Connection String напрямую в config-файле в репозитории.
 * Лучше вводить пароль конкретного пользователя каждый раз, чем оставить данные для подключения в открытом виде.
 */

function getPassword(password: string) {
    return readline.question(password);
}



export { getPassword };
