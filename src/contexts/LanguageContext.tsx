import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'te' | 'hi' | 'ml';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Common
    'app.title': 'KISANAI',
    'app.tagline': 'Smart Farming Assistant',
    'login': 'Login',
    'logout': 'Logout',
    'username': 'Username',
    'password': 'Password',
    'dashboard': 'Dashboard',
    'upload': 'Upload Images',
    'analyze': 'Analyze',
    'back': 'Back',
    'next': 'Next',
    'submit': 'Submit',
    'cancel': 'Cancel',
    
    // Navigation
    'nav.home': 'Home',
    'nav.soil': 'Soil Analysis',
    'nav.pest': 'Pest Control',
    'nav.weather': 'Weather',
    'nav.market': 'Market',
    'nav.chat': 'Ask AI',
    'nav.schemes': 'Schemes',
    
    // Login Page
    'login.title': 'Welcome to KISANAI',
    'login.subtitle': 'Your AI-powered farming companion',
    'login.placeholder.username': 'Enter your username',
    'login.placeholder.password': 'Enter your password',
    'login.button': 'Login to Dashboard',
    
    // Dashboard
    'dashboard.welcome': 'Welcome, Farmer!',
    'dashboard.subtitle': 'Your smart farming dashboard',
    'dashboard.features': 'Quick Access Features',
    
    // Soil Analysis
    'soil.title': 'Soil Analysis',
    'soil.subtitle': 'Upload soil images for crop recommendations',
    'soil.upload.text': 'Upload 3-5 soil/farm images',
    'soil.result.title': 'Analysis Results',
    'soil.result.crop': 'Recommended Crop',
    'soil.result.explanation': 'Based on soil quality, farm size, and weather conditions, Sugarcane is the best crop for your land.',
    
    // Pest Control
    'pest.title': 'Pest & Disease Control',
    'pest.subtitle': 'Upload crop images for pest identification',
    'pest.upload.text': 'Upload diseased crop photo',
    'pest.result.title': 'Diagnosis & Treatment',
    'pest.result.pest': 'Identified Pest',
    'pest.result.solution': 'Treatment Solution',
    'pest.result.supplier': 'Find Nearest Supplier',
    'pest.sample.pest': 'Brown Plant Hopper',
    'pest.sample.solution': 'Use Pesticide XYZ, 2ml per liter of water. Spray in the evening for best results.',
    
    // Weather
    'weather.title': 'Weather Assistant',
    'weather.subtitle': 'AI-powered weather insights',
    'weather.today': 'Today\'s Weather',
    'weather.alert': 'Smart Alert',
    'weather.voice.call': 'Get Voice Call',
    'weather.sample.today': 'Sunny with light winds',
    'weather.sample.alert': 'Possible rainfall tomorrow evening. Take necessary precautions.',
    
    // Market Intelligence
    'market.title': 'Market Intelligence',
    'market.subtitle': 'Crop prices and market trends',
    'market.best.crop': 'Best Crop for Next Season',
    'market.current.price': 'Current Mandi Price',
    'market.advice': 'Market Advice',
    'market.sample.crop': 'Sugarcane',
    'market.sample.price': '₹3,100/quintal',
    'market.sample.advice': 'Sell now for stable returns or store for higher demand in upcoming months.',
    
    // Chatbot
    'chat.title': '24×7 AI Assistant',
    'chat.subtitle': 'Ask anything about farming',
    'chat.placeholder': 'Type your farming question...',
    'chat.sample.question': 'What should I grow this season?',
    'chat.sample.answer': 'Based on your location and soil conditions, you should grow Sugarcane for better returns this season.',
    
    // Government Schemes
    'schemes.title': 'Government Schemes',
    'schemes.subtitle': 'Subsidies and assistance programs',
    'schemes.eligibility': 'Eligibility',
    'schemes.guidance': 'How to Apply',
    'schemes.sample.scheme': 'PM-Kisan Samman Nidhi',
    'schemes.sample.eligibility': 'Small & marginal farmers with landholding up to 2 hectares',
    'schemes.sample.guidance': 'Apply via official government portal or visit nearest CSC center',
  },
  
  te: {
    // Common
    'app.title': 'కిసాన్ఏఐ',
    'app.tagline': 'స్మార్ట్ వ్యవసాయ సహాయకుడు',
    'login': 'లాగిన్',
    'logout': 'లాగ్అవుట్',
    'username': 'వినియోగదారు పేరు',
    'password': 'పాస్‌వర్డ్',
    'dashboard': 'డ్యాష్‌బోర్డ్',
    'upload': 'చిత్రాలను అప్లోడ్ చేయండి',
    'analyze': 'విశ్లేషించండి',
    'back': 'వెనుకకు',
    'next': 'తరువాత',
    'submit': 'సమర్పించండి',
    'cancel': 'రద్దు చేయండి',
    
    // Navigation
    'nav.home': 'హోమ్',
    'nav.soil': 'మట్టి విశ్లేషణ',
    'nav.pest': 'కీటక నియంత్రణ',
    'nav.weather': 'వాతావరణం',
    'nav.market': 'మార్కెట్',
    'nav.chat': 'AI ని అడగండి',
    'nav.schemes': 'పథకాలు',
    
    // Login Page
    'login.title': 'కిసాన్ఏఐ కి స్వాగతం',
    'login.subtitle': 'మీ AI-ఆధారిత వ్యవసాయ సహచరుడు',
    'login.placeholder.username': 'మీ వినియోగదారు పేరు నమోదు చేయండి',
    'login.placeholder.password': 'మీ పాస్‌వర్డ్ నమోదు చేయండి',
    'login.button': 'డ్యాష్‌బోర్డ్‌కు లాగిన్ చేయండి',
    
    // Dashboard
    'dashboard.welcome': 'స్వాగతం, రైతు గారు!',
    'dashboard.subtitle': 'మీ స్మార్ట్ వ్యవసాయ డ్యాష్‌బోర్డ్',
    'dashboard.features': 'త్వరిత ప్రాప్యత లక్షణాలు',
    
    // Soil Analysis
    'soil.title': 'మట్టి విశ్లేషణ',
    'soil.subtitle': 'పంట సిఫార్సుల కోసం మట్టి చిత్రాలను అప్లోడ్ చేయండి',
    'soil.upload.text': '3-5 మట్టి/వ్యవసాయ చిత్రాలను అప్లోడ్ చేయండి',
    'soil.result.title': 'విశ్లేషణ ఫలితాలు',
    'soil.result.crop': 'సిఫార్సు చేయబడిన పంట',
    'soil.result.explanation': 'మట్టి నాణ్యత, వ్యవసాయ భూమి పరిమాణం మరియు వాతావరణ పరిస్థితుల ఆధారంగా, మీ భూమికి చెరకు ఉత్తమ పంట.',
    
    // Pest Control
    'pest.title': 'కీటక మరియు వ్యాధి నియంత్రణ',
    'pest.subtitle': 'కీటక గుర్తింపు కోసం పంట చిత్రాలను అప్లోడ్ చేయండి',
    'pest.upload.text': 'వ్యాధిగ్రస్త పంట ఫోటోను అప్లోడ్ చేయండి',
    'pest.result.title': 'నిర్ధారణ మరియు చికిత్స',
    'pest.result.pest': 'గుర్తించబడిన కీటకం',
    'pest.result.solution': 'చికిత్స పరిష్కారం',
    'pest.result.supplier': 'సమీప సరఫరాదారుని కనుగొనండి',
    'pest.sample.pest': 'గోధుమ రంగు మొక్కల గొల్లభామ',
    'pest.sample.solution': 'పురుగుమందు XYZ ఉపయోగించండి, లీటరు నీటికి 2ml. ఉత్తమ ఫలితాల కోసం సాయంత్రం స్ప్రే చేయండి.',
    
    // Weather
    'weather.title': 'వాతావరణ సహాయకుడు',
    'weather.subtitle': 'AI-ఆధారిత వాతావరణ అంతర్దృష్టులు',
    'weather.today': 'నేటి వాతావరణం',
    'weather.alert': 'స్మార్ట్ హెచ్చరిక',
    'weather.voice.call': 'వాయిస్ కాల్ పొందండి',
    'weather.sample.today': 'తేలికపాటి గాలులతో ఎండగా ఉంది',
    'weather.sample.alert': 'రేపు సాయంత్రం వర్షం పడే అవకాశం ఉంది. అవసరమైన జాగ్రత్తలు తీసుకోండి.',
    
    // Market Intelligence
    'market.title': 'మార్కెట్ ఇంటెలిజెన్స్',
    'market.subtitle': 'పంట ధరలు మరియు మార్కెట్ ట్రెండ్‌లు',
    'market.best.crop': 'తదుపరి సీజన్‌కు ఉత్తమ పంట',
    'market.current.price': 'ప్రస్తుత మండీ ధర',
    'market.advice': 'మార్కెట్ సలహా',
    'market.sample.crop': 'చెరకు',
    'market.sample.price': '₹3,100/క్వింటల్',
    'market.sample.advice': 'స్థిర రాబడుల కోసం ఇప్పుడే అమ్మండి లేదా రాబోయే నెలల్లో ఎక్కువ డిమాండ్ కోసం నిల్వ చేయండి.',
    
    // Chatbot
    'chat.title': '24×7 AI సహాయకుడు',
    'chat.subtitle': 'వ్యవసాయం గురించి ఏదైనా అడగండి',
    'chat.placeholder': 'మీ వ్యవసాయ ప్రశ్నను టైప్ చేయండి...',
    'chat.sample.question': 'ఈ సీజన్‌లో నేను ఏమి పెంచాలి?',
    'chat.sample.answer': 'మీ స్థానం మరియు మట్టి పరిస్థితుల ఆధారంగా, ఈ సీజన్‌లో మంచి రాబడుల కోసం మీరు చెరకు పెంచాలి.',
    
    // Government Schemes
    'schemes.title': 'ప్రభుత్వ పథకాలు',
    'schemes.subtitle': 'సబ్సిడీలు మరియు సహాయ కార్యక్రమాలు',
    'schemes.eligibility': 'అర్హత',
    'schemes.guidance': 'ఎలా దరఖాస్తు చేయాలి',
    'schemes.sample.scheme': 'పిఎం-కిసాన్ సమ్మాన్ నిధి',
    'schemes.sample.eligibility': '2 హెక్టార్లకు మించని భూమి ఉన్న చిన్న మరియు సిమాంత రైతులు',
    'schemes.sample.guidance': 'అధికారిక ప్రభుత్వ పోర్టల్ ద్వారా దరఖాస్తు చేసుకోండి లేదా సమీప CSC కేంద్రాన్ని సందర్శించండి',
  },
  
  hi: {
    // Common
    'app.title': 'किसानAI',
    'app.tagline': 'स्मार्ट कृषि सहायक',
    'login': 'लॉगिन',
    'logout': 'लॉगआउट',
    'username': 'उपयोगकर्ता नाम',
    'password': 'पासवर्ड',
    'dashboard': 'डैशबोर्ड',
    'upload': 'चित्र अपलोड करें',
    'analyze': 'विश्लेषण करें',
    'back': 'वापस',
    'next': 'अगला',
    'submit': 'जमा करें',
    'cancel': 'रद्द करें',
    
    // Navigation
    'nav.home': 'होम',
    'nav.soil': 'मिट्टी विश्लेषण',
    'nav.pest': 'कीट नियंत्रण',
    'nav.weather': 'मौसम',
    'nav.market': 'मार्केट',
    'nav.chat': 'AI से पूछें',
    'nav.schemes': 'योजनाएं',
    
    // Login Page
    'login.title': 'किसानAI में आपका स्वागत है',
    'login.subtitle': 'आपका AI-संचालित कृषि साथी',
    'login.placeholder.username': 'अपना उपयोगकर्ता नाम दर्ज करें',
    'login.placeholder.password': 'अपना पासवर्ड दर्ज करें',
    'login.button': 'डैशबोर्ड में लॉगिन करें',
    
    // Dashboard
    'dashboard.welcome': 'स्वागत है, किसान जी!',
    'dashboard.subtitle': 'आपका स्मार्ट कृषि डैशबोर्ड',
    'dashboard.features': 'त्वरित पहुंच सुविधाएं',
    
    // Soil Analysis
    'soil.title': 'मिट्टी विश्लेषण',
    'soil.subtitle': 'फसल की सिफारिशों के लिए मिट्टी की तस्वीरें अपलोड करें',
    'soil.upload.text': '3-5 मिट्टी/खेत की तस्वीरें अपलोड करें',
    'soil.result.title': 'विश्लेषण परिणाम',
    'soil.result.crop': 'अनुशंसित फसल',
    'soil.result.explanation': 'मिट्टी की गुणवत्ता, खेत का आकार और मौसम की स्थिति के आधार पर, आपकी भूमि के लिए गन्ना सबसे अच्छी फसल है।',
    
    // Pest Control
    'pest.title': 'कीट और रोग नियंत्रण',
    'pest.subtitle': 'कीट पहचान के लिए फसल की तस्वीरें अपलोड करें',
    'pest.upload.text': 'रोगग्रस्त फसल की तस्वीर अपलोड करें',
    'pest.result.title': 'निदान और उपचार',
    'pest.result.pest': 'पहचाना गया कीट',
    'pest.result.solution': 'उपचार समाधान',
    'pest.result.supplier': 'निकटतम आपूर्तिकर्ता खोजें',
    'pest.sample.pest': 'भूरा पौधा फुदका',
    'pest.sample.solution': 'कीटनाशक XYZ का उपयोग करें, प्रति लीटर पानी में 2ml। सर्वोत्तम परिणामों के लिए शाम को स्प्रे करें।',
    
    // Weather
    'weather.title': 'मौसम सहायक',
    'weather.subtitle': 'AI-संचालित मौसम अंतर्दृष्टि',
    'weather.today': 'आज का मौसम',
    'weather.alert': 'स्मार्ट अलर्ट',
    'weather.voice.call': 'वॉइस कॉल प्राप्त करें',
    'weather.sample.today': 'हल्की हवाओं के साथ धूप',
    'weather.sample.alert': 'कल शाम बारिश की संभावना है। आवश्यक सावधानी बरतें।',
    
    // Market Intelligence
    'market.title': 'बाजार बुद्धिमत्ता',
    'market.subtitle': 'फसल की कीमतें और बाजार के रुझान',
    'market.best.crop': 'अगले सीजन के लिए सबसे अच्छी फसल',
    'market.current.price': 'वर्तमान मंडी मूल्य',
    'market.advice': 'बाजार सलाह',
    'market.sample.crop': 'गन्ना',
    'market.sample.price': '₹3,100/क्विंटल',
    'market.sample.advice': 'स्थिर रिटर्न के लिए अभी बेचें या आगामी महीनों में उच्च मांग के लिए स्टोर करें।',
    
    // Chatbot
    'chat.title': '24×7 AI सहायक',
    'chat.subtitle': 'कृषि के बारे में कुछ भी पूछें',
    'chat.placeholder': 'अपना कृषि प्रश्न टाइप करें...',
    'chat.sample.question': 'इस सीजन में मुझे क्या उगाना चाहिए?',
    'chat.sample.answer': 'आपके स्थान और मिट्टी की स्थिति के आधार पर, आपको इस सीजन में बेहतर रिटर्न के लिए गन्ना उगाना चाहिए।',
    
    // Government Schemes
    'schemes.title': 'सरकारी योजनाएं',
    'schemes.subtitle': 'सब्सिडी और सहायता कार्यक्रम',
    'schemes.eligibility': 'पात्रता',
    'schemes.guidance': 'आवेदन कैसे करें',
    'schemes.sample.scheme': 'पीएम-किसान सम्मान निधि',
    'schemes.sample.eligibility': '2 हेक्टेयर तक की भूमि वाले छोटे और सीमांत किसान',
    'schemes.sample.guidance': 'आधिकारिक सरकारी पोर्टल के माध्यम से आवेदन करें या निकटतम CSC केंद्र पर जाएं',
  },
  
  ml: {
    // Common
    'app.title': 'കിസാന്‍AI',
    'app.tagline': 'സ്മാര്‍ട്ട് കൃഷി സഹായി',
    'login': 'ലോഗിന്‍',
    'logout': 'ലോഗൗട്ട്',
    'username': 'ഉപയോക്തൃനാമം',
    'password': 'പാസ്‌വേഡ്',
    'dashboard': 'ഡാഷ്‌ബോര്‍ഡ്',
    'upload': 'ചിത്രങ്ങള്‍ അപ്‌ലോഡ് ചെയ്യുക',
    'analyze': 'വിശകലനം ചെയ്യുക',
    'back': 'പിന്നോട്ട്',
    'next': 'അടുത്തത്',
    'submit': 'സമര്‍പ്പിക്കുക',
    'cancel': 'റദ്ദാക്കുക',
    
    // Navigation
    'nav.home': 'ഹോം',
    'nav.soil': 'മണ്ണ് വിശകലനം',
    'nav.pest': 'കീട നിയന്ത്രണം',
    'nav.weather': 'കാലാവസ്ഥ',
    'nav.market': 'മാര്‍ക്കറ്റ്',
    'nav.chat': 'AI-യോട് ചോദിക്കുക',
    'nav.schemes': 'പദ്ധതികള്‍',
    
    // Login Page
    'login.title': 'കിസാന്‍AI-യിലേക്ക് സ്വാഗതം',
    'login.subtitle': 'നിങ്ങളുടെ AI-ആധാരിത കൃഷി സഹചാരി',
    'login.placeholder.username': 'നിങ്ങളുടെ ഉപയോക്തൃനാമം നല്‍കുക',
    'login.placeholder.password': 'നിങ്ങളുടെ പാസ്‌വേഡ് നല്‍കുക',
    'login.button': 'ഡാഷ്‌ബോര്‍ഡിലേക്ക് ലോഗിന്‍ ചെയ്യുക',
    
    // Dashboard
    'dashboard.welcome': 'സ്വാഗതം, കൃഷിക്കാരാ!',
    'dashboard.subtitle': 'നിങ്ങളുടെ സ്മാര്‍ട്ട് കൃഷി ഡാഷ്‌ബോര്‍ഡ്',
    'dashboard.features': 'പെട്ടെന്നുള്ള പ്രവേശന സവിശേഷതകള്‍',
    
    // Soil Analysis
    'soil.title': 'മണ്ണ് വിശകലനം',
    'soil.subtitle': 'വിള ശുപാര്‍ശകള്‍ക്കായി മണ്ണിന്റെ ചിത്രങ്ങള്‍ അപ്‌ലോഡ് ചെയ്യുക',
    'soil.upload.text': '3-5 മണ്ണ്/കൃഷി ചിത്രങ്ങള്‍ അപ്‌ലോഡ് ചെയ്യുക',
    'soil.result.title': 'വിശകലന ഫലങ്ങള്‍',
    'soil.result.crop': 'ശുപാര്‍ശ ചെയ്യുന്ന വിള',
    'soil.result.explanation': 'മണ്ണിന്റെ ഗുണനിലവാരം, കൃഷിയിടത്തിന്റെ വലുപ്പം, കാലാവസ്ഥാ സാഹചര്യങ്ങള്‍ എന്നിവയുടെ അടിസ്ഥാനത്തില്‍, നിങ്ങളുടെ ഭൂമിക്ക് കരിമ്പ് ആണ് ഏറ്റവും നല്ല വിള.',
    
    // Pest Control
    'pest.title': 'കീടങ്ങളും രോഗങ്ങളും നിയന്ത്രണം',
    'pest.subtitle': 'കീട തിരിച്ചറിയലിനായി വിള ചിത്രങ്ങള്‍ അപ്‌ലോഡ് ചെയ്യുക',
    'pest.upload.text': 'രോഗബാധിത വിള ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക',
    'pest.result.title': 'രോഗനിര്‍ണയവും ചികിത്സയും',
    'pest.result.pest': 'തിരിച്ചറിഞ്ഞ കീടം',
    'pest.result.solution': 'ചികിത്സാ പരിഹാരം',
    'pest.result.supplier': 'അടുത്തുള്ള വിതരണക്കാരനെ കണ്ടെത്തുക',
    'pest.sample.pest': 'തവിട്ട് നിറമുള്ള ചെടി വെട്ടുകിളി',
    'pest.sample.solution': 'കീടനാശിനി XYZ ഉപയോഗിക്കുക, ഒരു ലിറ്റര്‍ വെള്ളത്തിന് 2ml. മികച്ച ഫലങ്ങള്‍ക്കായി വൈകുന്നേരം തളിക്കുക.',
    
    // Weather
    'weather.title': 'കാലാവസ്ഥാ സഹായി',
    'weather.subtitle': 'AI-ആധാരിത കാലാവസ്ഥാ ഉള്‍ക്കാഴ്ചകള്‍',
    'weather.today': 'ഇന്നത്തെ കാലാവസ്ഥ',
    'weather.alert': 'സ്മാര്‍ട്ട് അലേര്‍ട്ട്',
    'weather.voice.call': 'വോയ്‌സ് കോള്‍ നേടുക',
    'weather.sample.today': 'മിതമായ കാറ്റോടെ വെയില്‍',
    'weather.sample.alert': 'നാളെ വൈകുന്നേരം മഴയ്ക്ക് സാധ്യത. ആവശ്യമായ മുന്‍കരുതലുകള്‍ എടുക്കുക.',
    
    // Market Intelligence
    'market.title': 'മാര്‍ക്കറ്റ് ഇന്റലിജന്‍സ്',
    'market.subtitle': 'വിള വിലകളും മാര്‍ക്കറ്റ് ട്രെന്‍ഡുകളും',
    'market.best.crop': 'അടുത്ത സീസണിലെ മികച്ച വിള',
    'market.current.price': 'നിലവിലെ മണ്ഡി വില',
    'market.advice': 'മാര്‍ക്കറ്റ് ഉപദേശം',
    'market.sample.crop': 'കരിമ്പ്',
    'market.sample.price': '₹3,100/ക്വിന്റല്‍',
    'market.sample.advice': 'സ്ഥിരമായ വരുമാനത്തിനായി ഇപ്പോള്‍ വില്‍ക്കുക അല്ലെങ്കില്‍ വരാനിരിക്കുന്ന മാസങ്ങളില്‍ കൂടുതല്‍ ഡിമാന്‍ഡിനായി സംഭരിക്കുക.',
    
    // Chatbot
    'chat.title': '24×7 AI സഹായി',
    'chat.subtitle': 'കൃഷിയെക്കുറിച്ച് എന്തും ചോദിക്കുക',
    'chat.placeholder': 'നിങ്ങളുടെ കൃഷി ചോദ്യം ടൈപ്പ് ചെയ്യുക...',
    'chat.sample.question': 'ഈ സീസണില്‍ ഞാന്‍ എന്ത് വളര്‍ത്തണം?',
    'chat.sample.answer': 'നിങ്ങളുടെ സ്ഥലവും മണ്ണിന്റെ അവസ്ഥയും അടിസ്ഥാനമാക്കി, ഈ സീസണില്‍ മികച്ച വരുമാനത്തിനായി നിങ്ങള്‍ കരിമ്പ് വളര്‍ത്തണം.',
    
    // Government Schemes
    'schemes.title': 'സര്‍ക്കാര്‍ പദ്ധതികള്‍',
    'schemes.subtitle': 'സബ്‌സിഡികളും സഹായ പരിപാടികളും',
    'schemes.eligibility': 'യോഗ്യത',
    'schemes.guidance': 'എങ്ങനെ അപേക്ഷിക്കാം',
    'schemes.sample.scheme': 'പിഎം-കിസാന്‍ സമ്മാന്‍ നിധി',
    'schemes.sample.eligibility': '2 ഹെക്ടര്‍ വരെ ഭൂമിയുള്ള ചെറുകിട, നാമമാത്ര കര്‍ഷകര്‍',
    'schemes.sample.guidance': 'ഔദ്യോഗിക സര്‍ക്കാര്‍ പോര്‍ട്ടലിലൂടെ അപേക്ഷിക്കുക അല്ലെങ്കില്‍ അടുത്തുള്ള CSC കേന്ദ്രം സന്ദര്‍ശിക്കുക',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};