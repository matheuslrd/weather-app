
import { Card, CardContent } from '@/components/ui/card';
import WeatherIcon from './WeatherIcon';
import { WeatherData } from '@/types/weather';
import { Wind, Droplets, Eye, Thermometer } from 'lucide-react';

interface CurrentWeatherProps {
  data: WeatherData;
}

const CurrentWeather = ({ data }: CurrentWeatherProps) => {
  const { location, current } = data;
  
  return (
    <Card className="glass-effect border-white/20 animate-fade-in">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{location.name}</h1>
            <p className="text-gray-600">{location.region}, {location.country}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">
              {new Date(location.localtime).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(location.localtime).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <WeatherIcon
              condition={current.condition.text}
              isDay={current.is_day}
              size={64}
              className="text-primary"
            />
            <div>
              <div className="text-4xl font-bold text-gray-800">
                {Math.round(current.temp_c)}°C
              </div>
              <p className="text-gray-600 capitalize">{current.condition.text}</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-500">Feels like</p>
            <p className="text-xl font-semibold text-gray-700">
              {Math.round(current.feelslike_c)}°C
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-white/30">
            <Wind className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-gray-500">Wind</p>
              <p className="font-semibold">{current.wind_kph} km/h</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 rounded-lg bg-white/30">
            <Droplets className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-gray-500">Humidity</p>
              <p className="font-semibold">{current.humidity}%</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 rounded-lg bg-white/30">
            <Eye className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-gray-500">Visibility</p>
              <p className="font-semibold">{current.vis_km} km</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 rounded-lg bg-white/30">
            <Thermometer className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-gray-500">UV Index</p>
              <p className="font-semibold">{current.uv}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
