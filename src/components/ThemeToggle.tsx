
import { Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/hooks/useTheme';

const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <Sun className="h-4 w-4 text-yellow-500" />
      <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
      <Moon className="h-4 w-4 text-blue-300" />
    </div>
  );
};

export default ThemeToggle;
