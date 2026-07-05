import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  TestTube2, 
  Bug, 
  CloudSun, 
  TrendingUp, 
  MessageCircle, 
  FileText,
  LogOut,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BrandLogo } from '@/components/BrandLogo';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

export const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { toast } = useToast();

  const navigationItems = [
    { path: '/dashboard', icon: Home, label: t('nav.home') },
    { path: '/soil-analysis', icon: TestTube2, label: t('nav.soil') },
    { path: '/pest-control', icon: Bug, label: t('nav.pest') },
    { path: '/weather', icon: CloudSun, label: t('nav.weather') },
    { path: '/market', icon: TrendingUp, label: t('nav.market') },
    { path: '/chat', icon: MessageCircle, label: t('nav.chat') },
    { path: '/schemes', icon: FileText, label: t('nav.schemes') },
      { path: '/firebase', icon: TestTube2, label: 'Firebase' },
  ];

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

  const NavItems = () => (
    <>
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <Button
            key={item.path}
            variant={isActive ? "default" : "ghost"}
            className={`w-full justify-start gap-3 h-12 transition-all duration-200 ${
              isActive 
                ? 'bg-gradient-primary shadow-primary text-primary-foreground' 
                : 'hover:bg-primary/10 hover:text-primary'
            }`}
            onClick={() => navigate(item.path)}
          >
            <Icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </Button>
        );
      })}
      
      <Button
        variant="outline"
        className="w-full justify-start gap-3 h-12 mt-4 border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground"
        onClick={handleLogout}
      >
        <LogOut className="h-5 w-5" />
        <span className="font-medium">{t('logout')}</span>
      </Button>
    </>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex flex-col w-64 bg-card/95 backdrop-blur-sm border-r border-border/50 p-4 space-y-4">
        <div className="flex items-center justify-between">
          <BrandLogo size="md" />
        </div>
        
        <div className="flex-1 space-y-2">
          <NavItems />
        </div>
        
        <div className="pt-4 border-t border-border/50">
          <LanguageSwitcher />
        </div>
      </nav>

      {/* Mobile Navigation */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-card/95 backdrop-blur-sm border-b border-border/50">
        <BrandLogo size="sm" />
        
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-card/95 backdrop-blur-sm">
              <div className="flex flex-col h-full">
                <div className="pb-4">
                  <BrandLogo size="md" />
                </div>
                
                <div className="flex-1 space-y-2">
                  <NavItems />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
};