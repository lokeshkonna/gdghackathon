import React from 'react';
import { CloudSun, Phone, Zap, Droplets, Wind, Thermometer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Navigation } from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

export const Weather: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleVoiceCall = () => {
    toast({
      title: "Voice Call Initiated",
      description: "Connecting you with our AI weather assistant...",
    });
  };

  const weatherData = {
    current: {
      temperature: 28,
      humidity: 65,
      windSpeed: 12,
      condition: t('weather.sample.today')
    },
    forecast: [
      { day: 'Today', temp: '28°C', condition: 'Sunny', icon: '☀️' },
      { day: 'Tomorrow', temp: '26°C', condition: 'Partly Cloudy', icon: '⛅' },
      { day: 'Day 3', temp: '24°C', condition: 'Light Rain', icon: '🌦️' },
      { day: 'Day 4', temp: '25°C', condition: 'Cloudy', icon: '☁️' },
      { day: 'Day 5', temp: '27°C', condition: 'Sunny', icon: '☀️' },
    ]
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Navigation />
      
      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary shadow-primary flex items-center justify-center">
                <CloudSun className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold">{t('weather.title')}</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('weather.subtitle')}
            </p>
          </div>

          {/* Smart Alert */}
          <Alert className="border-orange-200 bg-orange-50">
            <Zap className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>{t('weather.alert')}:</strong> {t('weather.sample.alert')}
            </AlertDescription>
          </Alert>

          {/* Current Weather */}
          <Card className="bg-gradient-primary text-primary-foreground shadow-primary">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <CloudSun className="h-6 w-6" />
                {t('weather.today')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-2">☀️</div>
                  <div className="text-3xl font-bold">{weatherData.current.temperature}°C</div>
                  <div className="text-sm opacity-80">{weatherData.current.condition}</div>
                </div>
                
                <div className="text-center">
                  <Droplets className="h-8 w-8 mx-auto mb-2 opacity-80" />
                  <div className="text-xl font-semibold">{weatherData.current.humidity}%</div>
                  <div className="text-sm opacity-80">Humidity</div>
                </div>
                
                <div className="text-center">
                  <Wind className="h-8 w-8 mx-auto mb-2 opacity-80" />
                  <div className="text-xl font-semibold">{weatherData.current.windSpeed} km/h</div>
                  <div className="text-sm opacity-80">Wind Speed</div>
                </div>
                
                <div className="text-center">
                  <Thermometer className="h-8 w-8 mx-auto mb-2 opacity-80" />
                  <div className="text-xl font-semibold">Ideal</div>
                  <div className="text-sm opacity-80">For Crops</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 5-Day Forecast */}
          <Card>
            <CardHeader>
              <CardTitle>5-Day Weather Forecast</CardTitle>
              <CardDescription>Plan your farming activities ahead</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="text-center p-4 rounded-lg bg-accent/50 hover:bg-accent transition-colors">
                    <div className="font-semibold text-sm mb-2">{day.day}</div>
                    <div className="text-3xl mb-2">{day.icon}</div>
                    <div className="font-bold text-lg">{day.temp}</div>
                    <div className="text-xs text-muted-foreground mt-1">{day.condition}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Voice Assistant */}
          <Card className="bg-gradient-secondary text-secondary-foreground shadow-secondary">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
                <Phone className="h-8 w-8" />
              </div>
              <CardTitle className="text-2xl">AI Voice Weather Assistant</CardTitle>
              <CardDescription className="text-secondary-foreground/80">
                Get personalized farming advice based on weather conditions
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-4">
                <p className="text-sm opacity-90">
                  Our AI assistant can provide voice guidance on:
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>• Irrigation timing</div>
                  <div>• Pesticide application</div>
                  <div>• Harvesting advice</div>
                  <div>• Storm preparations</div>
                </div>
                
                <Button
                  onClick={handleVoiceCall}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 mt-6"
                  variant="outline"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  {t('weather.voice.call')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Weather Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Farming Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-sm text-muted-foreground">Perfect weather for field preparation and planting</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-sm text-muted-foreground">Light irrigation recommended in the evening</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-sm text-muted-foreground">Good conditions for pesticide application</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Weekly Outlook</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                  <p className="text-sm text-muted-foreground">Rain expected on Day 3 - plan harvesting accordingly</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                  <p className="text-sm text-muted-foreground">Temperature drop midweek - protect sensitive crops</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                  <p className="text-sm text-muted-foreground">Weekend looks ideal for outdoor farm activities</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};