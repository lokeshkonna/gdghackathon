import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TestTube2, 
  Bug, 
  CloudSun, 
  TrendingUp, 
  MessageCircle, 
  FileText,
  ArrowRight,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation } from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const features = [
    {
      icon: TestTube2,
      title: t('nav.soil'),
      description: t('soil.subtitle'),
      path: '/soil-analysis'
    },
    {
      icon: Bug,
      title: t('nav.pest'),
      description: t('pest.subtitle'),
      path: '/pest-control'
    },
    {
      icon: CloudSun,
      title: t('nav.weather'),
      description: t('weather.subtitle'),
      path: '/weather'
    },
    {
      icon: TrendingUp,
      title: t('nav.market'),
      description: t('market.subtitle'),
      path: '/market'
    },
    {
      icon: MessageCircle,
      title: t('nav.chat'),
      description: t('chat.subtitle'),
      path: '/chat'
    },
    {
      icon: FileText,
      title: t('nav.schemes'),
      description: t('schemes.subtitle'),
      path: '/schemes'
    },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <Navigation />
      
      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('dashboard.welcome')}
              </h1>
              <div className="absolute -top-2 -right-2 opacity-20">
                <Zap className="h-8 w-8 text-primary animate-pulse" />
              </div>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('dashboard.subtitle')}
            </p>
          </div>

          {/* Features Grid */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">{t('dashboard.features')}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                
                return (
                  <Card 
                    key={feature.path}
                    className="group hover:scale-105 transition-all duration-300 cursor-pointer bg-card border-border/50 hover:shadow-elegant"
                    onClick={() => navigate(feature.path)}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader className="space-y-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                      index % 2 === 0 
                        ? 'bg-primary shadow-primary text-primary-foreground' 
                        : 'bg-secondary shadow-secondary text-secondary-foreground'
                    }`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      
                      <div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {feature.title}
                        </CardTitle>
                        <CardDescription className="text-sm mt-2">
                          {feature.description}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-between group-hover:bg-primary/10 group-hover:text-primary transition-all duration-200"
                      >
                        <span>Get Started</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="bg-primary text-primary-foreground shadow-primary">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold">15+</div>
                  <div className="text-sm opacity-90">AI Models</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary text-secondary-foreground shadow-secondary">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-sm opacity-90">Support</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-primary to-secondary text-white shadow-elegant">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold">98%</div>
                  <div className="text-sm opacity-90">Accuracy</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};