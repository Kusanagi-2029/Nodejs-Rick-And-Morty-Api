import { Client } from 'pg';
import { initDatabase, insertCharacters } from '../../services/databaseService';
import { TABLE_NAME } from '../../config/database';
import { characters } from '../mocks/mockCharacters';

jest.mock('pg', () => {
    const mockClient = {
        connect: jest.fn(),
        end: jest.fn(),
        query: jest.fn()
    };
    return { Client: jest.fn(() => mockClient) };
});

describe('Database Service Functions', () => {
    let mockedClient: jest.Mocked<Client>;

    beforeEach(() => {
        mockedClient = new Client() as jest.Mocked<Client>;
        jest.clearAllMocks(); // Очищаем все моки перед каждым тестом
    });

    it('should initialize the database', async () => {
        await initDatabase(mockedClient);

        expect(mockedClient.connect).toHaveBeenCalledTimes(1);
        expect(mockedClient.query).toHaveBeenNthCalledWith(1, `DROP TABLE IF EXISTS ${TABLE_NAME}`);
        expect(mockedClient.query).toHaveBeenNthCalledWith(2, expect.stringContaining(`CREATE TABLE ${TABLE_NAME}`));
    });

    it('should insert characters into the database', async () => {
        await insertCharacters(mockedClient, characters);

        expect(mockedClient.query).toHaveBeenCalledTimes(characters.length); // Проверяем вызов query для каждого персонажа
        for (let i = 0; i < characters.length; i++) {
            const expectedQuery = `INSERT INTO ${TABLE_NAME} (name, data) VALUES ($1, $2)`;
            const expectedValues = [characters[i].name, characters[i]];
            expect(mockedClient.query).toHaveBeenNthCalledWith(i + 1, expectedQuery, expectedValues);
        }
    });
});
