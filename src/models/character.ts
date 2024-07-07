export interface Character {
    id: number;
    name: string;
    status: 'Alive' | 'Dead' | 'unknown';
    species: string;
    type: string;
    gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
    origin: {
        name: string;
        url: string; // URL endpoint
    };
    location: {
        name: string;
        url: string; // URL endpoint
    };
    image: string; // URL
    episode: string[]; // Массив URL на эпизоды
    url: string; // URL на собственный endpoint
    created: string; // Дата создания
}