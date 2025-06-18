// Case-sensitivity check: forced update for Netlify build issues
'use client'
import { useState, useEffect } from 'react';
import { Send, MessageSquare, X, Globe, MessageCircle } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface PredefinedQuestion {
    en: string;
    hi: string;
}

interface Service {
    titleHi: string;
    titleEn: string;
    descriptionHi: string;
    descriptionEn: string;
}

const translations = {
    en: {
        title: 'Astrology Assistant',
        placeholder: 'Ask about astrology...',
        thinking: 'Thinking...',
        error: 'Sorry, I encountered an error. Please try again.',
        greeting: 'Hello! I\'m your Astrology Assistant. How can I help you today?',
        randomChat: 'Ask Custom Question',
        predefinedQuestions: 'Suggested Questions',
        generalChat: 'General Chat',
        services: 'Services'
    },
    hi: {
        title: 'ज्योतिष सहायक',
        placeholder: 'ज्योतिष के बारे में पूछें...',
        thinking: 'विचार कर रहा हूं...',
        error: 'क्षमा करें, एक त्रुटि हुई। कृपया पुनः प्रयास करें।',
        greeting: 'नमस्ते! मैं आपका ज्योतिष सहायक हूं। मैं आपकी कैसे मदद कर सकता हूं?',
        randomChat: 'कस्टम प्रश्न पूछें',
        predefinedQuestions: 'सुझाए गए प्रश्न',
        generalChat: 'सामान्य चैट',
        services: 'सेवाएं'
    }
};

const services: Service[] = [
    {
        titleHi: 'करियर (Career)',
        titleEn: 'Career',
        descriptionHi: 'छात्रों को परीक्षाओं के बाद क्या करना है, नौकरियों और भविष्य के बारे में जानने की जरूरत होती है। ज्योतिषी अरुण जी आपकी जन्म कुंडली का विश्लेषण करके सही करियर चुनने में मदद करेंगे।',
        descriptionEn: 'Many students get confused about what to do after exams, jobs, and the future. Talk to astrologer Arun ji who can assist you in making the right career choices by analyzing your birth chart.'
    },
    {
        titleHi: 'प्रेम और रिश्ते (Love & Relationship)',
        titleEn: 'Love & Relationship',
        descriptionHi: 'अपने साथी के साथ सर्वश्रेष्ठ प्रेम राशिफल संगतता की तलाश में हैं? एक परामर्श कॉल आपके रिश्ते की संभावनाओं को उजागर कर सकती है।',
        descriptionEn: 'Looking for the best love horoscope compatibility with your partner? One counseling call can reveal the potential of your relationship.'
    },
    {
        titleHi: 'स्वास्थ्य (Health)',
        titleEn: 'Health',
        descriptionHi: 'वैदिक ज्योतिष भविष्यवाणियां स्वास्थ्य समस्याओं की पूर्व सूचना दे सकती हैं। शीघ्र परामर्श के लिए ज्योतिषी से बात करें।',
        descriptionEn: 'Vedic astrology predictions can forecast health issues before they appear. Seek early consultation by talking to the astrologer.'
    },
    {
        titleHi: 'व्यापार (Business)',
        titleEn: 'Business',
        descriptionHi: 'व्यापार शुरू करते समय या बड़े निर्णय लेते समय, ज्योतिष से सटीक मार्गदर्शन महत्वपूर्ण है। एक ज्योतिषी से परामर्श आपकी व्यावसायिक समस्याओं को हल कर सकता है।',
        descriptionEn: 'When starting a business or facing big choices, getting accurate insights from astrology is important. Consulting an astrologer can help solve your business problems.'
    },
    {
        titleHi: 'विवाह (Marriage)',
        titleEn: 'Marriage',
        descriptionHi: 'भारत में विवाह के लिए कुंडली मिलान की प्रथा बहुत महत्वपूर्ण है। गुण मिलान, मंगल दोष और संगतता विश्लेषण प्राप्त करें।',
        descriptionEn: 'In India, the practice of Kundli Milan for marriage is very important. Get Gun Milan, Mangal Dosha, & compatibility analysis.'
    },
    {
        titleHi: 'संतान (Child)',
        titleEn: 'Child',
        descriptionHi: 'प्राचीन भारतीय वैदिक ज्योतिष दोनों साथियों की कुंडली का परीक्षण करता है, विशेष रूप से बच्चों के बारे में जानने के इच्छुक लोगों के लिए। ज्योतिषी आपको संतान से संबंधित समस्याओं के लिए सटीक समाधान प्रदान करेंगे।',
        descriptionEn: 'The ancient Indian Vedic astrology examines the horoscopes of both partners, especially for those interested in knowing about children. The astrologer will provide accurate solutions for issues related to childbirth.'
    }
];

type Language = 'en' | 'hi';

export default function Chatbot() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState<Language>('en');
    const [predefinedQuestions, setPredefinedQuestions] = useState<PredefinedQuestion[]>([]);
    const [showCustomChat, setShowCustomChat] = useState(false);
    const [viewMode, setViewMode] = useState<'chat' | 'services'>('chat'); // New state for toggling views

    useEffect(() => {
        if (isOpen && viewMode === 'chat') {
            setMessages([{
                role: 'assistant',
                content: translations[currentLang].greeting
            }]);
            fetchPredefinedQuestions();
        }
    }, [isOpen, currentLang, viewMode]);

    const fetchPredefinedQuestions = async () => {
        try {
            const response = await fetch('http://localhost:5100/api/predefined-questions');
            const data = await response.json();
            setPredefinedQuestions(data.questions);
        } catch (error) {
            console.error('Error fetching predefined questions:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5100/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    message: input,
                    language: currentLang
                }),
            });

            const data = await response.json();
            const botMessage: Message = { role: 'assistant', content: data.response };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Error:', error);
            const errorMessage: Message = {
                role: 'assistant',
                content: translations[currentLang].error,
            };
            setMessages((prev) => [...prev, errorMessage]);
        }

        setIsLoading(false);
    };

    const handlePredefinedQuestion = async (question: string) => {
        setInput(question);
        await handleSubmit({ preventDefault: () => {} } as React.FormEvent);
    };

    const toggleLanguage = () => {
        const newLang = currentLang === 'en' ? 'hi' : 'en';
        setCurrentLang(newLang);
        setShowCustomChat(false);
    };

    return (
        <div className="fixed bottom-4 right-4">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-black text-white p-4 rounded-full hover:bg-gray-800 shadow-lg"
                >
                    <MessageSquare size={24} />
                </button>
            )}

            {isOpen && (
                <div className="w-96 h-[600px] bg-white rounded-lg shadow-lg flex flex-col">
                    <div className="p-4 bg-black text-white rounded-t-lg flex justify-between items-center">
                        <h2 className="text-xl font-semibold">{translations[currentLang].title}</h2>
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={toggleLanguage}
                                className="text-white hover:text-gray-200 p-1"
                                title={currentLang === 'en' ? 'Switch to Hindi' : 'Switch to English'}
                            >
                                <Globe size={20} />
                            </button>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:text-gray-200"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {viewMode === 'chat' && (
                            <div className="p-4 space-y-4">
                                {!showCustomChat && (
                                    <div className="space-y-3">
                                        <h3 className="font-medium text-gray-700">
                                            {translations[currentLang].predefinedQuestions}
                                        </h3>
                                        {predefinedQuestions.map((q, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handlePredefinedQuestion(q[currentLang])}
                                                className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                                            >
                                                {q[currentLang]}
                                            </button>
                                        ))}
                                    </div>
                                )}
                                <div className="space-y-4">
                                    {messages.map((message, index) => (
                                        <div
                                            key={index}
                                            className={`${
                                                message.role === 'user' ? 'text-right' : 'text-left'
                                            }`}
                                        >
                                            <div
                                                className={`inline-block p-3 rounded-lg ${
                                                    message.role === 'user'
                                                        ? 'bg-black text-white'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}
                                            >
                                                {message.content}
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="text-left">
                                            <div className="inline-block p-3 rounded-lg bg-gray-100">
                                                {translations[currentLang].thinking}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {viewMode === 'services' && (
                            <div className="p-4 space-y-4">
                                {services.map((service, idx) => (
                                    <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {currentLang === 'en' ? service.titleEn : service.titleHi}
                                        </h3>
                                        <p className="mt-2 text-gray-600">
                                            {currentLang === 'en' ? service.descriptionEn : service.descriptionHi}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t space-y-3">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setViewMode('chat')}
                                className={`flex-1 p-2 rounded-lg ${viewMode === 'chat' ? 'bg-black text-white' : 'bg-gray-100 text-black'} hover:bg-gray-200`}
                            >
                                {translations[currentLang].generalChat}
                            </button>
                            <button
                                onClick={() => setViewMode('services')}
                                className={`flex-1 p-2 rounded-lg ${viewMode === 'services' ? 'bg-black text-white' : 'bg-gray-100 text-black'} hover:bg-gray-200`}
                            >
                                {translations[currentLang].services}
                            </button>
                        </div>

                        {viewMode === 'chat' && (
                            <>
                                <button
                                    onClick={() => setShowCustomChat(!showCustomChat)}
                                    className="w-full flex items-center justify-center gap-2 p-2 bg-gray-100 text-black rounded-lg hover:bg-gray-200"
                                >
                                    <MessageCircle size={20} />
                                    {translations[currentLang].randomChat}
                                </button>
                                {showCustomChat && (
                                    <form onSubmit={handleSubmit} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            placeholder={translations[currentLang].placeholder}
                                            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                        />
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="p-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400"
                                        >
                                            <Send size={20} />
                                        </button>
                                    </form>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}