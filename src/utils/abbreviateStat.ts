export function abbreviateStat(stat: string): string {
    switch (stat.toLowerCase()) {
        case 'hp':
            return 'HP';
        case 'attack':
            return 'ATK';
        case 'defense':
            return 'DEF';
        case 'specialattack':
            return 'SATK';
        case 'specialdefense':
            return 'SDEF';
        case 'speed':
            return 'SPD';
        default:
            return stat.toUpperCase();
    }
}
