import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';

export const Market: React.FC = () => {
  const { t } = useLanguage();

  const marketData = {
    recommendedCrop: t('market.sample.crop'),
    currentPrice: t('market.sample.price'),
    advice: t('market.sample.advice'),
    priceHistory: [
      { month: 'Jan', price: 2800 },
      { month: 'Feb', price: 2950 },
      { month: 'Mar', price: 3100 },
      { month: 'Apr', price: 3250 },
      { month: 'May', price: 3100 },
      { month: 'Jun', price: 3400 },
    ],
    crops: [
      { name: 'Sugarcane', price: '₹3,100', change: '+12%', trend: 'up' },
      { name: 'Rice', price: '₹2,850', change: '-3%', trend: 'down' },
      { name: 'Wheat', price: '₹2,200', change: '+8%', trend: 'up' },
      { name: 'Cotton', price: '₹5,500', change: '+15%', trend: 'up' },
      { name: 'Maize', price: '₹1,950', change: '-1%', trend: 'down' },
      { name: 'Soybean', price: '₹4,200', change: '+5%', trend: 'up' },
    ]
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Navigation />
      
      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-secondary shadow-secondary flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold">{t('market.title')}</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('market.subtitle')}
            </p>
          </div>

          {/* Key Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-primary text-primary-foreground shadow-primary">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <BarChart3 className="h-8 w-8 mx-auto opacity-80" />
                  <div className="text-sm opacity-90">{t('market.best.crop')}</div>
                  <div className="text-2xl font-bold">{marketData.recommendedCrop}</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-secondary text-secondary-foreground shadow-secondary">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <DollarSign className="h-8 w-8 mx-auto opacity-80" />
                  <div className="text-sm opacity-90">{t('market.current.price')}</div>
                  <div className="text-2xl font-bold">{marketData.currentPrice}</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-brand text-white">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <TrendingUp className="h-8 w-8 mx-auto opacity-80" />
                  <div className="text-sm opacity-90">Price Trend</div>
                  <div className="text-2xl font-bold">+12%</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Market Advice */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                {t('market.advice')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {marketData.advice}
              </p>
            </CardContent>
          </Card>

          {/* Price Trends Chart (Mock) */}
          <Card>
            <CardHeader>
              <CardTitle>Price Trends - Last 6 Months</CardTitle>
              <CardDescription>Sugarcane prices per quintal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between gap-4">
                {marketData.priceHistory.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-primary rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer"
                      style={{ height: `${(data.price / 3500) * 200}px` }}
                      title={`${data.month}: ₹${data.price}`}
                    ></div>
                    <div className="text-sm mt-2 font-medium">{data.month}</div>
                    <div className="text-xs text-muted-foreground">₹{data.price}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Crop Prices Grid */}
          <Card>
            <CardHeader>
              <CardTitle>Current Market Prices</CardTitle>
              <CardDescription>Latest prices from major mandis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {marketData.crops.map((crop, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{crop.name}</h3>
                      <Badge variant={crop.trend === 'up' ? 'default' : 'secondary'}>
                        {crop.trend === 'up' ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {crop.change}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-primary">{crop.price}</div>
                    <div className="text-sm text-muted-foreground">per quintal</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Market Centers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Nearby Market Centers
              </CardTitle>
              <CardDescription>Find the best places to sell your crops</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-accent/50">
                  <h4 className="font-semibold mb-2">Central Mandi</h4>
                  <p className="text-sm text-muted-foreground mb-2">Distance: 12 km</p>
                  <p className="text-sm">High volume trading, best for bulk sales</p>
                  <Button variant="outline" size="sm" className="mt-3">
                    Get Directions
                  </Button>
                </div>
                
                <div className="p-4 rounded-lg bg-accent/50">
                  <h4 className="font-semibold mb-2">Farmers Market</h4>
                  <p className="text-sm text-muted-foreground mb-2">Distance: 8 km</p>
                  <p className="text-sm">Direct to consumer, premium prices</p>
                  <Button variant="outline" size="sm" className="mt-3">
                    Get Directions
                  </Button>
                </div>
                
                <div className="p-4 rounded-lg bg-accent/50">
                  <h4 className="font-semibold mb-2">Wholesale Hub</h4>
                  <p className="text-sm text-muted-foreground mb-2">Distance: 25 km</p>
                  <p className="text-sm">Large scale operations, competitive rates</p>
                  <Button variant="outline" size="sm" className="mt-3">
                    Get Directions
                  </Button>
                </div>
                
                <div className="p-4 rounded-lg bg-accent/50">
                  <h4 className="font-semibold mb-2">Online Platform</h4>
                  <p className="text-sm text-muted-foreground mb-2">Digital trading</p>
                  <p className="text-sm">Sell from home, transparent pricing</p>
                  <Button variant="outline" size="sm" className="mt-3">
                    Register Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};