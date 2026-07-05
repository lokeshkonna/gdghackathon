import React, { useState } from 'react';
import { TestTube2, CheckCircle, Sprout, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation } from '@/components/Navigation';
import { ImageUpload } from '@/components/ImageUpload';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

export const SoilAnalysis: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (selectedImages.length === 0) {
      toast({
        title: "No images selected",
        description: "Please upload at least one soil image",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResult({
        crop: t('market.sample.crop'),
        confidence: 94,
        explanation: t('soil.result.explanation'),
        soilType: 'Clay Loam',
        ph: 6.8,
        nutrients: {
          nitrogen: 'High',
          phosphorus: 'Medium',
          potassium: 'High'
        }
      });
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete",
        description: "Your soil analysis is ready!",
      });
    }, 3000);
  };

  const handleReset = () => {
    setSelectedImages([]);
    setAnalysisResult(null);
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
                <TestTube2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold">{t('soil.title')}</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('soil.subtitle')}
            </p>
          </div>

          {!analysisResult ? (
            <>
              {/* Upload Section */}
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sprout className="h-5 w-5 text-primary" />
                    {t('soil.upload.text')}
                  </CardTitle>
                  <CardDescription>
                    Upload clear images of your soil and farm area for accurate analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ImageUpload
                    onImagesChange={setSelectedImages}
                    maxImages={5}
                    uploadText={t('soil.upload.text')}
                  />
                </CardContent>
              </Card>

              {/* Analyze Button */}
              {selectedImages.length > 0 && (
                <div className="text-center">
                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="h-12 px-8 bg-gradient-primary hover:opacity-90 shadow-primary transition-all duration-300 transform hover:scale-105"
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        <span>Analyzing Soil...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <TestTube2 className="h-4 w-4" />
                        <span>{t('analyze')}</span>
                      </div>
                    )}
                  </Button>
                </div>
              )}
            </>
          ) : (
            /* Results Section */
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-primary">{t('soil.result.title')}</span>
                </div>
              </div>

              {/* Main Result */}
              <Card className="bg-gradient-primary text-primary-foreground shadow-primary">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                      <Sprout className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold opacity-90">{t('soil.result.crop')}</h3>
                      <div className="text-3xl font-bold mt-2">{analysisResult.crop}</div>
                      <div className="text-sm opacity-80 mt-2">
                        Confidence: {analysisResult.confidence}%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Soil Properties</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Soil Type:</span>
                      <span className="font-semibold">{analysisResult.soilType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">pH Level:</span>
                      <span className="font-semibold">{analysisResult.ph}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Nutrient Levels</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Nitrogen:</span>
                      <span className="font-semibold text-primary">{analysisResult.nutrients.nitrogen}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phosphorus:</span>
                      <span className="font-semibold text-yellow-600">{analysisResult.nutrients.phosphorus}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Potassium:</span>
                      <span className="font-semibold text-primary">{analysisResult.nutrients.potassium}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Explanation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Recommendation Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {analysisResult.explanation}
                  </p>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="h-12 px-6"
                >
                  Analyze New Soil
                </Button>
                <Button
                  className="h-12 px-6 bg-gradient-secondary hover:opacity-90"
                  onClick={() => window.open('/market', '_self')}
                >
                  View Market Prices
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};