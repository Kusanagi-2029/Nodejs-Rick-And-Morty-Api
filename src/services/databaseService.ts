import { Client } from 'pg';
import { TABLE_NAME } from '../config/database';
import { Character } from '../models/character';

/**
 * Инициализация базы данных. Создает таблицу для хранения персонажей.
 * @param {Client} client Объект клиента PostgreSQL.
 * @returns {Promise<void>}
 */
const initDatabase = async (client: Client): Promise<void> => {
    try {
        await client.connect();
        await client.query(`DROP TABLE IF EXISTS ${TABLE_NAME}`);
        await client.query(`
            CREATE TABLE ${TABLE_NAME} (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                data JSONB NOT NULL
            )
        `);
    } catch (error) {
        console.error('Error during database initialization:', error);
        throw error; // Пробрасываем ошибку выше для обработки в вызывающем коде
    }
};

/**
 * Вставка персонажей в базу данных.
 * @param {Client} client Объект клиента PostgreSQL.
 * @param {Character[]} characters Массив объектов персонажей.
 * @returns {Promise<void>}
 */
const insertCharacters = async (client: Client, characters: Character[]): Promise<void> => {
    const insertQuery = `INSERT INTO ${TABLE_NAME} (name, data) VALUES ($1, $2)`;
    for (const character of characters) {
        await client.query(insertQuery, [character.name, character]);
    }
};

export { initDatabase, insertCharacters };
