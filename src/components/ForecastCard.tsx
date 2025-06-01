
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import WeatherIcon from './WeatherIcon';
import { ForecastDay } from '@/types/weather';

interface ForecastCardProps {
  forecast: ForecastDay[];
}

const ForecastCard = ({ forecast }: ForecastCardProps) => {
  return (
    <Card className="glass-effect border-white/20 animate-slide-up">
      <CardHeader>
        <CardTitle className="text-light">5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {forecast.map((day) => (
            <div
              key={day.date}
              className="flex items-center justify-between p-3 rounded-lg bg-white/30 dark:bg-white/10 hover:bg-white/40 dark:hover:bg-white/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <WeatherIcon
                  condition={day.day.condition.text}
                  isDay={1}
                  size={32}
                  className="text-primary"
                />
                <div>
                  <p className="font-medium text-light">
                    {new Date(day.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-sm text-muted-light capitalize">
                    {day.day.condition.text}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-light">
                    {Math.round(day.day.maxtemp_c)}°
                  </span>
                  <span className="text-muted-light">
                    {Math.round(day.day.mintemp_c)}°
                  </span>
                </div>
                {day.day.daily_chance_of_rain > 0 && (
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    {day.day.daily_chance_of_rain}% rain
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastCard;
