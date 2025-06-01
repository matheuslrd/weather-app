
import { Cloud, CloudDrizzle, CloudRain, CloudSnow, Sun, Moon, CloudLightning, Wind } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WeatherIconProps {
  condition: string;
  isDay: number;
  size?: number;
  className?: string;
}

const WeatherIcon = ({ condition, isDay, size = 24, className }: WeatherIconProps) => {
  const getWeatherIcon = () => {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
      return isDay ? Sun : Moon;
    }
    
    if (conditionLower.includes('rain') || conditionLower.includes('shower')) {
      return CloudRain;
    }
    
    if (conditionLower.includes('drizzle')) {
      return CloudDrizzle;
    }
    
    if (conditionLower.includes('snow') || conditionLower.includes('blizzard')) {
      return CloudSnow;
    }
    
    if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
      return CloudLightning;
    }
    
    if (conditionLower.includes('wind')) {
      return Wind;
    }
    
    if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
      return Cloud;
    }
    
    return isDay ? Sun : Moon;
  };
  
  const IconComponent = getWeatherIcon();
  
  return (
    <IconComponent 
      size={size} 
      className={cn('text-current', className)} 
    />
  );
};

export default WeatherIcon;
