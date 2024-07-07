import { fetchCharacters } from '../../services/characterService';

describe('Character Service', () => {
    it('fetchCharacters should return an array of characters', async () => {
        const characters = await fetchCharacters();
        expect(Array.isArray(characters)).toBe(true);
        expect(characters.length).toBeGreaterThan(0);
        expect(characters[0]).toHaveProperty('id');
        expect(characters[0]).toHaveProperty('name');
        expect(characters[0]).toHaveProperty('status');
    }, 20000); // Устанавливаем время ожидания в 20 секунд
});

