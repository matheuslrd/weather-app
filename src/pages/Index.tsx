
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import SearchInput from '@/components/SearchInput';
import CurrentWeather from '@/components/CurrentWeather';
import ForecastCard from '@/components/ForecastCard';
import HourlyForecast from '@/components/HourlyForecast';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { useCurrentWeather, useForecastWeather, useGeolocation } from '@/hooks/useWeather';

const Index = () => {
  const [location, setLocation] = useState('London');
  const { toast } = useToast();
  const { getCurrentLocation, isLoading: geoLoading } = useGeolocation();
  
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
    <div className="min-h-screen bg-weather-gradient">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
            Weather App
          </h1>
          <p className="text-white/80 text-lg mb-8 animate-slide-up">
            Get real-time weather information for any location
          </p>
          
          <div className="flex justify-center animate-slide-up">
            <SearchInput
              onLocationSelect={handleLocationSelect}
              onCurrentLocation={handleCurrentLocation}
              isLoadingLocation={geoLoading}
            />
          </div>
        </div>
        
        {isLoading && (
          <div className="flex flex-col items-center gap-4 py-12">
            <LoadingSpinner size="lg" />
            <p className="text-white/80">Loading weather data...</p>
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
          <div className="space-y-6 max-w-4xl mx-auto">
            <CurrentWeather data={currentWeather} />
            
            {forecastWeather?.forecast?.forecastday && (
              <div className="grid md:grid-cols-2 gap-6">
                <ForecastCard forecast={forecastWeather.forecast.forecastday} />
                
                {forecastWeather.forecast.forecastday[0]?.hour && (
                  <HourlyForecast hourlyData={forecastWeather.forecast.forecastday[0].hour} />
                )}
              </div>
            )}
          </div>
        )}
        
        <footer className="text-center mt-12 pt-8 border-t border-white/20">
          <p className="text-white/60 text-sm">
            Weather data provided by WeatherAPI
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
