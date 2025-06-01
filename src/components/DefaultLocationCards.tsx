
import { MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface DefaultLocationCardsProps {
  onLocationSelect: (location: string) => void;
}

const defaultLocations = [
  {
    name: 'Porto Alegre',
    region: 'Rio Grande do Sul',
    country: 'Brasil',
    description: 'Capital gaúcha',
  },
  {
    name: 'Londres',
    region: 'Inglaterra',
    country: 'Reino Unido',
    description: 'Capital britânica',
  },
  {
    name: 'Barcelona',
    region: 'Catalunha',
    country: 'Espanha',
    description: 'Cidade mediterrânea',
  },
];

const DefaultLocationCards = ({ onLocationSelect }: DefaultLocationCardsProps) => {
  return (
    <div className="max-w-4xl mx-auto mb-8">
      <h2 className="text-xl font-semibold text-light mb-4 text-center">
        Locais populares
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {defaultLocations.map((location) => (
          <Card
            key={location.name}
            className="modern-card cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => onLocationSelect(location.name)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-light">{location.name}</h3>
                  <p className="text-sm text-muted-light">
                    {location.region}, {location.country}
                  </p>
                  <p className="text-xs text-muted-light mt-1">
                    {location.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DefaultLocationCards;
