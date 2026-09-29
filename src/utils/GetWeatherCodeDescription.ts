export const getWeathercodeDescription = (weathercode: number): string => {
    switch (weathercode) {
      case 0:
        return 'Clear Sky';
      case 1:
        return 'Mainly Clear';
      case 2:
        return 'Partly Cloudy';
      case 3:
        return 'Cloudy';
      case 4:
        return 'Overcast';
      case 5:
        return 'Foggy';
      case 6:
        return 'Light Rain';
      default:
        return 'Unknown';
    }
  }