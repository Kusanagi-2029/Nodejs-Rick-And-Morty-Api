import axios from 'axios';

/**
 * Функция для загрузки персонажей из API "Рик и Морти".
 * @returns {Promise<any[]>} Массив объектов персонажей.
 */
const fetchCharacters = async () => {
    const characters = [];
    let nextUrl = 'https://rickandmortyapi.com/api/character';

    while (nextUrl) {
        const response = await axios.get(nextUrl);
        characters.push(...response.data.results);
        nextUrl = response.data.info.next;
    }

    return characters;
};

export { fetchCharacters };