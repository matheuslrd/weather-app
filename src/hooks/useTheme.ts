
import { useState, useEffect } from 'react';

export type WeatherTheme = 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'snowy' | 'clear';

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [weatherTheme, setWeatherTheme] = useState<WeatherTheme>('sunny');

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const updateWeatherTheme = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      setWeatherTheme('sunny');
    } else if (conditionLower.includes('rain') || conditionLower.includes('shower')) {
      setWeatherTheme('rainy');
    } else if (conditionLower.includes('storm') || conditionLower.includes('thunder')) {
      setWeatherTheme('stormy');
    } else if (conditionLower.includes('snow') || conditionLower.includes('blizzard')) {
      setWeatherTheme('snowy');
    } else if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
      setWeatherTheme('cloudy');
    } else {
      setWeatherTheme('clear');
    }
  };

  return {
    isDarkMode,
    toggleDarkMode,
    weatherTheme,
    updateWeatherTheme,
  };
};
