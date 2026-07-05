import React from 'react';
import { FileText, CheckCircle, ExternalLink, Users, CreditCard, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

export const Schemes: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const schemes = [
    {
      id: 1,
      name: t('schemes.sample.scheme'),
      category: 'Income Support',
      amount: '₹6,000/year',
      eligibility: t('schemes.sample.eligibility'),
      guidance: t('schemes.sample.guidance'),
      icon: CreditCard,
      status: 'Active',
      deadline: 'No deadline',
      color: 'bg-gradient-primary'
    },
    {
      id: 2,
      name: 'Pradhan Mantri Crop Insurance Scheme',
      category: 'Insurance',
      amount: 'Coverage up to ₹2 lakhs',
      eligibility: 'All farmers with cultivable land',
      guidance: 'Apply through insurance companies or common service centers',
      icon: Leaf,
      status: 'Active',
      deadline: '31st December 2024',
      color: 'bg-gradient-secondary'
    },
    {
      id: 3,
      name: 'Soil Health Card Scheme',
      category: 'Technical Support',
      amount: 'Free soil testing',
      eligibility: 'All farmers across India',
      guidance: 'Visit nearest Krishi Vigyan Kendra or agriculture office',
      icon: FileText,
      status: 'Active',
      deadline: 'Ongoing',
      color: 'bg-gradient-brand'
    },
    {
      id: 4,
      name: 'Kisan Credit Card',
      category: 'Credit Support',
      amount: 'Flexible loan limit',
      eligibility: 'Farmers with land records',
      guidance: 'Apply through any nationalized bank with land documents',
      icon: CreditCard,
      status: 'Active',
      deadline: 'No deadline',
      color: 'bg-gradient-primary'
    },
    {
      id: 5,
      name: 'National Agriculture Market (eNAM)',
      category: 'Marketing Support',
      amount: 'Better price discovery',
      eligibility: 'Farmers selling in registered mandis',
      guidance: 'Register on eNAM portal with mobile number and Aadhaar',
      icon: Users,
      status: 'Active',
      deadline: 'No deadline',
      color: 'bg-gradient-secondary'
    },
    {
      id: 6,
      name: 'Organic Farming Scheme',
      category: 'Sustainability',
      amount: '₹50,000/hectare',
      eligibility: 'Farmers adopting organic farming practices',
      guidance: 'Apply through District Collector office with farming plan',
      icon: Leaf,
      status: 'Active',
      deadline: '31st March 2025',
      color: 'bg-gradient-brand'
    }
  ];

  const handleApplyScheme = (schemeName: string) => {
    toast({
      title: "Application Started",
      description: `Redirecting to ${schemeName} application portal...`,
    });
  };

  const handleLearnMore = (schemeName: string) => {
    toast({
      title: "More Information",
      description: `Opening detailed information for ${schemeName}`,
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Navigation />
      
      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-brand shadow-elegant flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold">{t('schemes.title')}</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('schemes.subtitle')}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-primary text-primary-foreground">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold">15+</div>
                  <div className="text-sm opacity-90">Active Schemes</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-secondary text-secondary-foreground">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold">₹2L+</div>
                  <div className="text-sm opacity-90">Max Benefit</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-brand text-white">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm opacity-90">Online Apply</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Free Guidance</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Featured Scheme */}
          <Card className="bg-gradient-primary text-primary-foreground shadow-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-8 w-8" />
                  <div>
                    <CardTitle className="text-2xl">{t('schemes.sample.scheme')}</CardTitle>
                    <CardDescription className="text-primary-foreground/80">
                      Most Popular Scheme - Direct Income Support
                    </CardDescription>
                  </div>
                </div>
                <Badge className="bg-white/20 text-white">Featured</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Benefit Amount</h4>
                  <p className="text-2xl font-bold">₹6,000/year</p>
                  <p className="text-sm opacity-80">Paid in 3 installments</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{t('schemes.eligibility')}</h4>
                  <p className="text-sm opacity-90">{t('schemes.sample.eligibility')}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{t('schemes.guidance')}</h4>
                  <p className="text-sm opacity-90">{t('schemes.sample.guidance')}</p>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  variant="outline"
                  onClick={() => handleApplyScheme(t('schemes.sample.scheme'))}
                >
                  Apply Now
                </Button>
                <Button
                  className="bg-white/10 hover:bg-white/20 text-white"
                  variant="outline"
                  onClick={() => handleLearnMore(t('schemes.sample.scheme'))}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* All Schemes Grid */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">All Available Schemes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {schemes.map((scheme) => {
                const Icon = scheme.icon;
                
                return (
                  <Card key={scheme.id} className="hover:shadow-elegant transition-all duration-300 border-border/50">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg ${scheme.color} flex items-center justify-center`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg leading-tight">{scheme.name}</CardTitle>
                            <CardDescription className="mt-1">{scheme.category}</CardDescription>
                          </div>
                        </div>
                        <Badge variant="secondary">{scheme.status}</Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 gap-3">
                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground mb-1">Benefit</h4>
                          <p className="font-semibold text-primary">{scheme.amount}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground mb-1">{t('schemes.eligibility')}</h4>
                          <p className="text-sm">{scheme.eligibility}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground mb-1">Deadline</h4>
                          <p className="text-sm font-medium">{scheme.deadline}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => handleApplyScheme(scheme.name)}
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Apply
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleLearnMore(scheme.name)}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Application Help */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle>Need Help with Applications?</CardTitle>
              <CardDescription>
                Our team is here to guide you through the application process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Document Assistance</h4>
                  <p className="text-sm text-muted-foreground">Help with required documents and forms</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-secondary/10 rounded-full flex items-center justify-center mb-3">
                    <Users className="h-6 w-6 text-secondary" />
                  </div>
                  <h4 className="font-semibold mb-2">Expert Guidance</h4>
                  <p className="text-sm text-muted-foreground">Connect with agriculture experts</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Application Tracking</h4>
                  <p className="text-sm text-muted-foreground">Track your application status</p>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <Button className="bg-gradient-brand hover:opacity-90">
                  Get Help Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};