// export function getColorByStat(stat: string) {
//     stat = stat.toLocaleLowerCase();
//     switch (stat) {
//       case 'hp':
//         return '#FF0000'; 
//       case 'attack':
//         return '#FFA500'; 
//       case 'defense':
//         return '#FFFF00'; 
//       case 'specialAttack':
//         return '#0000FF'; 
//       case 'specialDefense':
//         return '#008000'; 
//       case 'speed':
//         return '#800080'; 
//       default:
//         return '#808080'; 
//     }
//   }
  
export function getColorByStat(stat: string) {
    switch (stat) {
      case 'hp':
        return 'red.500';
      case 'attack':
        return 'orange.500';
      case 'defense':
        return 'yellow.500';
      case 'specialAttack':
        return 'blue.500';
      case 'specialDefense':
        return 'green.500';
      case 'speed':
        return 'purple.500';
      default:
        return 'gray.500';
    }
  }
  