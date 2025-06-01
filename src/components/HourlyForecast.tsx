
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import WeatherIcon from './WeatherIcon';
import { HourlyWeather } from '@/types/weather';

interface HourlyForecastProps {
  hourlyData: HourlyWeather[];
}

const HourlyForecast = ({ hourlyData }: HourlyForecastProps) => {
  const next24Hours = hourlyData.slice(0, 24);
  
  return (
    <Card className="glass-effect border-white/20 animate-slide-up">
      <CardHeader>
        <CardTitle className="text-gray-800">Hourly Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full">
          <div className="flex gap-4 pb-4">
            {next24Hours.map((hour, index) => (
              <div
                key={hour.time_epoch}
                className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white/30 min-w-[80px] hover:bg-white/40 transition-colors"
              >
                <p className="text-xs text-gray-600 font-medium">
                  {index === 0 
                    ? 'Now' 
                    : new Date(hour.time).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        hour12: true,
                      })
                  }
                </p>
                
                <WeatherIcon
                  condition={hour.condition.text}
                  isDay={hour.is_day}
                  size={24}
                  className="text-primary"
                />
                
                <p className="font-semibold text-gray-800">
                  {Math.round(hour.temp_c)}°
                </p>
                
                {hour.chance_of_rain > 0 && (
                  <p className="text-xs text-blue-600">
                    {hour.chance_of_rain}%
                  </p>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default HourlyForecast;
