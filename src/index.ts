import { Client } from 'pg';
import dbConfig, { TABLE_NAME } from './config/database';
import { fetchCharacters } from './services/characterService';
import { initDatabase, insertCharacters } from './services/databaseService';
import { handleServerError } from './utils/errorHandler';

/**
 * Основная функция приложения. Запускает загрузку персонажей и их сохранение в базу данных.
 * @returns {Promise<void>} - Промис без возвращаемого значения.
 */
export const main = async () => {
    // Инициализация клиента PostgreSQL с конфигурацией из файла database.ts
    const client = new Client(dbConfig);

    try {
        // Инициализация базы данных: создание таблицы, если она не существует
        await initDatabase(client);

        // Загрузка персонажей с внешнего API (например, Rick and Morty API)
        const characters = await fetchCharacters();

        // Вставка загруженных персонажей в базу данных
        await insertCharacters(client, characters);

        // Вывод информации о количестве вставленных персонажей в консоль
        console.log(`${characters.length} персонажей вставлено в таблицу ${TABLE_NAME}`);
    } catch (error) {
        // Обработка ошибки: преобразование ошибки в строку и передача в функцию обработки ошибок
        const errorMessage = typeof error === 'string' ? error : String(error);
        handleServerError(new Error(errorMessage)); // Создаем экземпляр Error с текстом ошибки
    } finally {
        // Завершение работы с клиентом PostgreSQL
        await client.end();
    }
};

// Вызов основной функции для запуска приложения
main();
