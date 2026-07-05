import React, { useState } from 'react';
import { Bug, CheckCircle, AlertTriangle, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Navigation } from '@/components/Navigation';
import { ImageUpload } from '@/components/ImageUpload';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

export const PestControl: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (selectedImages.length === 0) {
      toast({
        title: "No images selected",
        description: "Please upload a diseased crop image",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResult({
        pest: t('pest.sample.pest'),
        confidence: 89,
        solution: t('pest.sample.solution'),
        severity: 'Medium',
        affectedArea: '15-20%',
        treatment: {
          pesticide: 'Pesticide XYZ',
          dosage: '2ml per liter',
          frequency: 'Every 7 days',
          duration: '3 weeks'
        }
      });
      setIsAnalyzing(false);
      toast({
        title: "Pest Identified",
        description: "Treatment recommendation ready!",
      });
    }, 2500);
  };

  const handleReset = () => {
    setSelectedImages([]);
    setAnalysisResult(null);
  };

  const handleFindSupplier = () => {
    toast({
      title: "Finding Suppliers",
      description: "Searching for pesticide suppliers near you...",
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Navigation />
      
      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-secondary shadow-secondary flex items-center justify-center">
                <Bug className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold">{t('pest.title')}</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('pest.subtitle')}
            </p>
          </div>

          {!analysisResult ? (
            <>
              {/* Upload Section */}
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bug className="h-5 w-5 text-secondary" />
                    {t('pest.upload.text')}
                  </CardTitle>
                  <CardDescription>
                    Upload clear images showing pest damage or disease symptoms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ImageUpload
                    onImagesChange={setSelectedImages}
                    maxImages={3}
                    uploadText={t('pest.upload.text')}
                  />
                </CardContent>
              </Card>

              {/* Analyze Button */}
              {selectedImages.length > 0 && (
                <div className="text-center">
                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="h-12 px-8 bg-gradient-secondary hover:opacity-90 shadow-secondary transition-all duration-300 transform hover:scale-105"
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        <span>Identifying Pest...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Bug className="h-4 w-4" />
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
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full">
                  <CheckCircle className="h-5 w-5 text-secondary" />
                  <span className="font-semibold text-secondary">{t('pest.result.title')}</span>
                </div>
              </div>

              {/* Alert for severity */}
              <Alert className="border-yellow-200 bg-yellow-50">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  <strong>Pest Severity: {analysisResult.severity}</strong> - Immediate treatment recommended
                </AlertDescription>
              </Alert>

              {/* Main Result */}
              <Card className="bg-gradient-secondary text-secondary-foreground shadow-secondary">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                      <Bug className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold opacity-90">{t('pest.result.pest')}</h3>
                      <div className="text-3xl font-bold mt-2">{analysisResult.pest}</div>
                      <div className="text-sm opacity-80 mt-2">
                        Confidence: {analysisResult.confidence}% | Affected: {analysisResult.affectedArea}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Treatment Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('pest.result.solution')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground leading-relaxed">
                      {analysisResult.solution}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Treatment Schedule</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pesticide:</span>
                      <span className="font-semibold">{analysisResult.treatment.pesticide}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dosage:</span>
                      <span className="font-semibold">{analysisResult.treatment.dosage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Frequency:</span>
                      <span className="font-semibold">{analysisResult.treatment.frequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-semibold">{analysisResult.treatment.duration}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="h-12 px-6"
                >
                  Analyze Another Image
                </Button>
                <Button
                  onClick={handleFindSupplier}
                  className="h-12 px-6 bg-gradient-primary hover:opacity-90"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  {t('pest.result.supplier')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};