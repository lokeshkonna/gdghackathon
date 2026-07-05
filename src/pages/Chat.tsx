import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Mic, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation } from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with sample conversation
  useEffect(() => {
    const initialMessages: Message[] = [
      {
        id: '1',
        type: 'bot',
        content: `Hello! I'm your AI farming assistant. Ask me anything about crops, weather, pests, or farming techniques. How can I help you today?`,
        timestamp: new Date()
      }
    ];
    setMessages(initialMessages);
  }, []);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('crop') || lowerMessage.includes('grow') || lowerMessage.includes('plant')) {
      return t('chat.sample.answer');
    } else if (lowerMessage.includes('pest') || lowerMessage.includes('disease') || lowerMessage.includes('bug')) {
      return "Based on the symptoms you described, this could be a pest issue. I recommend uploading images to our Pest Control feature for accurate identification and treatment recommendations.";
    } else if (lowerMessage.includes('weather') || lowerMessage.includes('rain') || lowerMessage.includes('sun')) {
      return "Current weather conditions are favorable for farming. Check our Weather Assistant for detailed forecasts and farming recommendations based on upcoming weather patterns.";
    } else if (lowerMessage.includes('price') || lowerMessage.includes('market') || lowerMessage.includes('sell')) {
      return "Current market prices are strong for sugarcane at ₹3,100/quintal. Visit our Market Intelligence section for detailed price trends and selling recommendations.";
    } else if (lowerMessage.includes('soil') || lowerMessage.includes('fertilizer') || lowerMessage.includes('nutrient')) {
      return "For soil analysis and fertilizer recommendations, upload soil images in our Soil Analysis feature. I can help determine the best crops and nutrients for your land.";
    } else if (lowerMessage.includes('government') || lowerMessage.includes('scheme') || lowerMessage.includes('subsidy')) {
      return "There are several government schemes available for farmers. Check out our Government Schemes section for eligibility criteria and application guidance for programs like PM-Kisan.";
    } else {
      return "I'm here to help with all your farming questions! You can ask me about crops, weather, pests, soil analysis, market prices, or government schemes. What specific farming topic interests you?";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateBotResponse(inputValue),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceInput = () => {
    toast({
      title: "Voice Input",
      description: "Voice input feature coming soon!",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Navigation />
      
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 lg:p-6 border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary shadow-primary flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold">{t('chat.title')}</h1>
                <p className="text-muted-foreground">{t('chat.subtitle')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground'
                }`}>
                  {message.type === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                
                <div className={`max-w-[70%] ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                  <Card className={`${
                    message.type === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-card border-border/50'
                  }`}>
                    <CardContent className="p-3">
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className={`text-xs mt-2 opacity-70 ${
                        message.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4" />
                </div>
                <Card className="bg-card border-border/50">
                  <CardContent className="p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 lg:p-6 border-t border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t('chat.placeholder')}
                  className="pr-12 h-12 bg-background border-border/50 focus:border-primary"
                  disabled={isTyping}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1 h-10 w-10"
                  onClick={handleVoiceInput}
                >
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
              
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="h-12 px-6 bg-gradient-primary hover:opacity-90 shadow-primary"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Quick Suggestions */}
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInputValue(t('chat.sample.question'))}
                className="text-xs"
              >
                {t('chat.sample.question')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInputValue('How to control pests in my crops?')}
                className="text-xs"
              >
                Pest control tips
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInputValue('Current market prices for vegetables')}
                className="text-xs"
              >
                Market prices
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};