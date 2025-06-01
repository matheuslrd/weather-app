
import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSearchLocations } from '@/hooks/useWeather';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  onLocationSelect: (location: string) => void;
  onCurrentLocation: () => void;
  isLoadingLocation?: boolean;
}

const SearchInput = ({ onLocationSelect, onCurrentLocation, isLoadingLocation }: SearchInputProps) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { data: locations = [], isLoading } = useSearchLocations(query);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleInputChange = (value: string) => {
    setQuery(value);
    setIsOpen(value.length >= 3);
  };
  
  const handleLocationClick = (locationName: string) => {
    setQuery(locationName);
    setIsOpen(false);
    onLocationSelect(locationName);
    inputRef.current?.blur();
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onLocationSelect(query.trim());
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };
  
  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search for a city..."
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            className="pl-10 glass-effect border-white/20"
          />
          {isLoading && (
            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
          )}
        </div>
        
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onCurrentLocation}
          disabled={isLoadingLocation}
          className="glass-effect border-white/20 hover:bg-white/20"
        >
          {isLoadingLocation ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MapPin className="h-4 w-4" />
          )}
        </Button>
      </form>
      
      {isOpen && locations.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm rounded-lg border border-white/20 shadow-lg z-50 max-h-60 overflow-y-auto">
          {locations.map((location) => (
            <button
              key={`${location.id}-${location.name}`}
              type="button"
              className="w-full text-left px-4 py-3 hover:bg-white/50 transition-colors border-b border-white/10 last:border-b-0 flex items-center gap-2"
              onClick={() => handleLocationClick(location.name)}
            >
              <MapPin className="h-4 w-4 text-primary" />
              <div>
                <div className="font-medium">{location.name}</div>
                <div className="text-sm text-muted-foreground">
                  {location.region}, {location.country}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
