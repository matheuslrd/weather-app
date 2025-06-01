import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/hooks/useTheme';
import SearchInput from '@/components/SearchInput';
import CurrentWeather from '@/components/CurrentWeather';
import ForecastCard from '@/components/ForecastCard';
import HourlyForecast from '@/components/HourlyForecast';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import ThemeToggle from '@/components/ThemeToggle';
import { useCurrentWeather, useForecastWeather, useGeolocation } from '@/hooks/useWeather';
import DefaultLocationCards from '@/components/DefaultLocationCards';

const Index = () => {
  const [location, setLocation] = useState('London');
  const { toast } = useToast();
  const { getCurrentLocation, isLoading: geoLoading } = useGeolocation();
  const { weatherTheme, updateWeatherTheme } = useTheme();
  
  const {
    data: currentWeather,
    isLoading: currentLoading,
    error: currentError,
    refetch: refetchCurrent,
  } = useCurrentWeather(location);
  
  const {
    data: forecastWeather,
    isLoading: forecastLoading,
    error: forecastError,
    refetch: refetchForecast,
  } = useForecastWeather(location, 5);

  useEffect(() => {
    if (currentWeather?.current?.condition?.text) {
      updateWeatherTheme(currentWeather.current.condition.text);
    }
  }, [currentWeather, updateWeatherTheme]);
  
  const handleLocationSelect = (newLocation: string) => {
    setLocation(newLocation);
    toast({
      title: 'Location updated',
      description: `Weather data for ${newLocation} is being loaded.`,
    });
  };
  
  const handleCurrentLocation = async () => {
    try {
      await getCurrentLocation();
      if (location) {
        setLocation(location);
        toast({
          title: 'Location detected',
          description: 'Using your current location for weather data.',
        });
      }
    } catch (error) {
      toast({
        title: 'Location Error',
        description: 'Unable to get your current location. Please search manually.',
        variant: 'destructive',
      });
    }
  };
  
  const handleRetry = () => {
    refetchCurrent();
    refetchForecast();
  };
  
  const isLoading = currentLoading || forecastLoading;
  const hasError = currentError || forecastError;
  
  return (
    <div className={`min-h-screen weather-bg-${weatherTheme} transition-all duration-1000 relative overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12">
          <div className="flex justify-between items-start mb-8">
            <div />
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-6 animate-fade-in drop-shadow-lg">
                Weather App
              </h1>
              <p className="text-light text-xl mb-8 animate-slide-up font-medium">
                Beautiful weather forecasts for anywhere in the world
              </p>
            </div>
            <div className="mt-4">
              <ThemeToggle />
            </div>
          </div>
          
          <div className="flex justify-center animate-slide-up">
            <SearchInput
              onLocationSelect={handleLocationSelect}
              onCurrentLocation={handleCurrentLocation}
              isLoadingLocation={geoLoading}
            />
          </div>
        </div>
        
        {!currentWeather && !isLoading && !hasError && (
          <DefaultLocationCards onLocationSelect={handleLocationSelect} />
        )}
        
        {isLoading && (
          <div className="flex flex-col items-center gap-6 py-16">
            <LoadingSpinner size="lg" />
            <p className="text-light text-lg font-medium">Loading weather data...</p>
          </div>
        )}
        
        {hasError && (
          <div className="max-w-md mx-auto">
            <ErrorMessage
              message={currentError?.message || forecastError?.message || 'Failed to load weather data'}
              onRetry={handleRetry}
            />
          </div>
        )}
        
        {currentWeather && !isLoading && (
          <div className="space-y-8 max-w-5xl mx-auto">
            <CurrentWeather data={currentWeather} />
            
            {forecastWeather?.forecast?.forecastday && (
              <div className="grid lg:grid-cols-2 gap-8">
                <ForecastCard forecast={forecastWeather.forecast.forecastday} />
                
                {forecastWeather.forecast.forecastday[0]?.hour && (
                  <HourlyForecast hourlyData={forecastWeather.forecast.forecastday[0].hour} />
                )}
              </div>
            )}
          </div>
        )}
        
        <footer className="text-center mt-16 pt-8 border-t border-white/20">
          <div className="space-y-2">
            <p className="footer-text text-sm">
              Weather data provided by WeatherAPI
            </p>
            <p className="footer-text text-sm">
              Desenvolvido por{' '}
              <a 
                href="https://www.matheuslaurindo.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-link font-medium underline hover:no-underline"
              >
                Matheus Laurindo
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
