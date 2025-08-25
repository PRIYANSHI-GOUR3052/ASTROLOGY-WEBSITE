import { useState } from 'react';
import { Sparkles, Heart, Zap, Shield, Star, Gem, TrendingUp, HelpCircle, ChevronDown } from 'lucide-react';

const navigationItems = [
  { id: 'about', label: 'About', shortLabel: 'About', icon: Sparkles },
  { id: 'daily', label: 'Daily Insights', shortLabel: 'Daily', icon: Star },
  { id: 'lucky', label: 'Lucky Elements', shortLabel: 'Lucky', icon: Gem },
  { id: 'compatibility', label: 'Compatibility', shortLabel: 'Match', icon: Heart },
  { id: 'growth', label: 'Growth', shortLabel: 'Growth', icon: TrendingUp },
  { id: 'products', label: 'Products', shortLabel: 'Shop', icon: Shield },
  { id: 'uranus', label: 'Uranus', shortLabel: 'Uranus', icon: Zap },
  { id: 'faq', label: 'FAQ', shortLabel: 'FAQ', icon: HelpCircle },
];

export default function AquariusInfoNavigation() {
  const [activeTab, setActiveTab] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeItem = navigationItems.find(item => item.id === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-r from-amber-50 via-white to-orange-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        
        {/* Mobile Dropdown Navigation */}
        <div className="block sm:hidden mb-6">
          <div className="relative">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-full flex items-center justify-between bg-white rounded-xl shadow-md px-4 py-3 text-left border border-orange-100"
            >
              <div className="flex items-center gap-3">
                {activeItem && <activeItem.icon className="w-5 h-5 text-orange-600" />}
                <span className="font-medium text-gray-800">{activeItem?.label}</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {mobileMenuOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-orange-100 z-10">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-orange-50 first:rounded-t-xl last:rounded-b-xl transition-colors ${
                        activeTab === item.id ? 'bg-orange-100 text-orange-700' : 'text-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Tab Navigation */}
        <div className="hidden sm:block mb-8">
          <div className="bg-white rounded-2xl shadow-md p-2 border border-orange-100">
            <nav className="grid grid-cols-4 lg:grid-cols-8 gap-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-gradient-to-br from-orange-100 to-amber-100 text-orange-700 shadow-sm' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-orange-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.shortLabel}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content Panel */}
        <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden">
          <div className="p-6 sm:p-8">
            
            {activeTab === 'about' && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full mb-4">
                    <Sparkles className="w-8 h-8 text-orange-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">About Aquarius</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">The innovative water bearer, bringing revolutionary ideas and humanitarian spirit to the world.</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Element & Quality",
                      content: "Air sign with Fixed quality. Aquarius represents innovation, humanitarianism, and a unique perspective on the world."
                    },
                    {
                      title: "Ruling Planet", 
                      content: "Uranus, the planet of innovation, rebellion, and sudden change. This gives Aquarius their revolutionary spirit and originality."
                    },
                    {
                      title: "Natural Strengths",
                      content: "Innovation, independence, humanitarianism, intellectual curiosity, and thinking outside the box."
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-100">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'daily' && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full mb-4">
                    <Star className="w-8 h-8 text-orange-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Daily Insights</h2>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-gray-800">Today&apos;s Forecast</h3>
                    <p className="text-gray-600 leading-relaxed">Uranus aligns with Mercury today, bringing innovative ideas and opportunities for intellectual breakthroughs. Embrace your unique perspective.</p>
                    
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-orange-100">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-orange-600">11</p>
                          <p className="text-sm text-gray-600">Lucky Number</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-orange-600">3-5 PM</p>
                          <p className="text-sm text-gray-600">Best Time</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-gray-800">Weekly Focus</h3>
                    <p className="text-gray-600 leading-relaxed">This week emphasizes innovation and humanitarian efforts. Perfect time to share your unique ideas and work toward positive change.</p>
                    
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-100">
                      <h4 className="font-semibold text-gray-800 mb-2">Key Themes</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Innovation and creativity</li>
                        <li>• Community connections</li>
                        <li>• Progressive thinking</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'lucky' && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full mb-4">
                    <Gem className="w-8 h-8 text-orange-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Lucky Elements</h2>
                </div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { title: "Colors", items: ["Electric Blue", "Turquoise", "Silver", "Purple"] },
                    { title: "Numbers", items: ["4", "7", "11", "22", "29"] },
                    { title: "Days", items: ["Saturday", "Wednesday"] },
                    { title: "Stones", items: ["Amethyst", "Aquamarine", "Clear Quartz", "Fluorite"] }
                  ].map((category, index) => (
                    <div key={index} className="text-center bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-100">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Lucky {category.title}</h3>
                      <div className="space-y-2">
                        {category.items.map((item, i) => (
                          <div key={i} className="bg-white/60 px-3 py-1 rounded-lg text-sm text-gray-700">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'compatibility' && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full mb-4">
                    <Heart className="w-8 h-8 text-orange-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Compatibility</h2>
                </div>
                
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-100">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Best Matches</h3>
                    <div className="space-y-3">
                      {["Gemini", "Libra", "Sagittarius", "Aries"].map((sign, i) => (
                        <div key={i} className="bg-white/60 px-4 py-2 rounded-lg text-center font-medium text-gray-700">
                          {sign}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-100">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Challenging</h3>
                    <div className="space-y-3">
                      {["Taurus", "Scorpio"].map((sign, i) => (
                        <div key={i} className="bg-white/60 px-4 py-2 rounded-lg text-center font-medium text-gray-700">
                          {sign}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-xl border border-amber-100">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Friendship</h3>
                    <p className="text-gray-600 text-center">Excellent with Air and Fire signs who value intellectual connection and independence.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'growth' && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full mb-4">
                    <TrendingUp className="w-8 h-8 text-orange-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Growth & Challenges</h2>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-xl border border-amber-100">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Areas for Growth</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Learning emotional expression</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Developing patience</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Balancing independence with connection</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-xl border border-orange-100">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Common Challenges</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Being too detached emotionally</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Fixed opinions and stubbornness</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Sometimes too idealistic</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full mb-4">
                    <Shield className="w-8 h-8 text-orange-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Aquarius Power Collection</h2>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      name: "Amethyst Innovation Crystal",
                      description: "Enhances innovation and intuition",
                      gradient: "from-orange-50 to-amber-50",
                      border: "border-orange-100",
                      button: "from-orange-100 to-amber-100"
                    },
                    {
                      name: "Aquamarine Vision Stone", 
                      description: "Promotes vision and clarity",
                      gradient: "from-amber-50 to-orange-50",
                      border: "border-amber-100", 
                      button: "from-amber-100 to-orange-100"
                    },
                    {
                      name: "Clear Quartz Amplifier",
                      description: "Amplifies energy and clarity", 
                      gradient: "from-orange-50 to-yellow-50",
                      border: "border-orange-100",
                      button: "from-orange-100 to-yellow-100"
                    }
                  ].map((product, index) => (
                    <div key={index} className={`bg-gradient-to-br ${product.gradient} p-6 rounded-xl border ${product.border} hover:shadow-lg transition-shadow`}>
                      <div className="text-center mb-4">
                        <Gem className="w-12 h-12 mx-auto text-gray-600 mb-3" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                        <p className="text-gray-600">{product.description}</p>
                      </div>
                      <button className={`w-full bg-gradient-to-r ${product.button} text-gray-800 font-semibold py-3 px-6 rounded-lg hover:shadow-md transition-shadow`}>
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'uranus' && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full mb-4">
                    <Zap className="w-8 h-8 text-orange-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Uranus Influence</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">The revolutionary planet that shapes Aquarius&apos; innovative spirit and desire for change.</p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-xl border border-orange-100">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Innovation & Rebellion</h3>
                    <p className="text-gray-600 leading-relaxed">Uranus gives Aquarius a revolutionary spirit, love for innovation, and desire to break free from traditional norms and create positive change in the world.</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-xl border border-amber-100">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Originality & Independence</h3>
                    <p className="text-gray-600 leading-relaxed">Aquarius&apos; Uranian influence brings unique perspectives, intellectual curiosity, and a strong need for personal freedom and authentic self-expression.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full mb-4">
                    <HelpCircle className="w-8 h-8 text-orange-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Frequently Asked Questions</h2>
                </div>
                
                <div className="space-y-6">
                  {[
                    {
                      question: "Why are Aquarius so innovative?",
                      answer: "Aquarius' ruling planet Uranus brings a revolutionary spirit and love for innovation. They are naturally drawn to new ideas and progressive thinking."
                    },
                    {
                      question: "What careers suit Aquarius?", 
                      answer: "Technology, science, humanitarian work, social activism, research, and any field requiring innovation, originality, and progressive thinking."
                    },
                    {
                      question: "How can Aquarius improve relationships?",
                      answer: "By being more emotionally expressive, developing patience, and balancing their need for independence with emotional connection and intimacy."
                    }
                  ].map((faq, index) => (
                    <div key={index} className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-100">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">{faq.question}</h3>
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}