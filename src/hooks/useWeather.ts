
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { WeatherData, SearchLocation } from '@/types/weather';
import { getRandomMockData } from '@/data/mockWeatherData';

const API_BASE_URL = 'https://api.weatherapi.com/v1';
const API_KEY = 'demo';
const USE_MOCK_DATA = true;

export const useCurrentWeather = (location: string) => {
  return useQuery({
    queryKey: ['weather', 'current', location],
    queryFn: async (): Promise<WeatherData> => {
      if (!location) throw new Error('Location is required');
      
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return getRandomMockData();
      }
      
      const response = await fetch(
        `${API_BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(location)}&aqi=no`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      return response.json();
    },
    enabled: !!location,
    staleTime: 10 * 60 * 1000,
    retry: 2,
  });
};

export const useForecastWeather = (location: string, days: number = 5) => {
  return useQuery({
    queryKey: ['weather', 'forecast', location, days],
    queryFn: async (): Promise<WeatherData> => {
      if (!location) throw new Error('Location is required');
      
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return getRandomMockData();
      }
      
      const response = await fetch(
        `${API_BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(location)}&days=${days}&aqi=no&alerts=no`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch forecast data');
      }
      
      return response.json();
    },
    enabled: !!location,
    staleTime: 30 * 60 * 1000,
    retry: 2,
  });
};

export const useSearchLocations = (query: string) => {
  return useQuery({
    queryKey: ['weather', 'search', query],
    queryFn: async (): Promise<SearchLocation[]> => {
      if (!query || query.length < 3) return [];
      
      const response = await fetch(
        `${API_BASE_URL}/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to search locations');
      }
      
      return response.json();
    },
    enabled: !!query && query.length >= 3,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGeolocation = () => {
  const [location, setLocation] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const getCurrentLocation = () => {
    setIsLoading(true);
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`${latitude},${longitude}`);
        setIsLoading(false);
      },
      (error) => {
        setError('Unable to retrieve your location');
        setIsLoading(false);
        console.error('Geolocation error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  return {
    location,
    isLoading,
    error,
    getCurrentLocation,
  };
};
