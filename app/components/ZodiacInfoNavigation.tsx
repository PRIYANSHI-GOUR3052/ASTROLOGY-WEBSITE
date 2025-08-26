
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { zodiacInfoData, universalNavigationItems } from '../../data/zodiacInfoData';

interface ZodiacInfoNavigationProps {
  zodiacSign: keyof typeof zodiacInfoData;
}


const tabContentMap = {
  about: (data: any) => (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full mb-4">
          {(() => {
            const Icon = universalNavigationItems[0].icon;
            return <Icon className="w-8 h-8 text-orange-600" />;
          })()}
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{data.about.title}</h2>
        {data.about.description && <p className="text-gray-600 max-w-2xl mx-auto">{data.about.description}</p>}
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {data.about.cards && data.about.cards.map((item: any, index: number) => (
          <div key={index} className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
            <p className="text-gray-600 leading-relaxed">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  ),
  daily: (data: any) => (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full mb-4">
          {(() => {
            const Icon = universalNavigationItems[1].icon;
            return <Icon className="w-8 h-8 text-orange-600" />;
          })()}
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{data.daily.title || 'Daily Insights'}</h2>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-gray-800">Today's Forecast</h3>
          <p className="text-gray-600 leading-relaxed">{data.daily.forecast?.description}</p>
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-orange-100">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{data.daily.forecast?.luckyNumber}</p>
                <p className="text-sm text-gray-600">Lucky Number</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-orange-600">{data.daily.forecast?.bestTime}</p>
                <p className="text-sm text-gray-600">Best Time</p>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-gray-800">Weekly Focus</h3>
          <p className="text-gray-600 leading-relaxed">{data.daily.weekly?.description}</p>
          {data.daily.weekly?.keyThemes && (
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-100">
              <h4 className="font-semibold text-gray-800 mb-2">Key Themes</h4>
              <ul className="space-y-2 text-gray-600">
                {data.daily.weekly.keyThemes.map((theme: string, i: number) => <li key={i}>• {theme}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  ),
  lucky: (data: any) => (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full mb-4">
          {(() => {
            const Icon = universalNavigationItems[2].icon;
            return <Icon className="w-8 h-8 text-orange-600" />;
          })()}
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{data.lucky.title || 'Lucky Elements'}</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.lucky.categories && data.lucky.categories.map((category: any, index: number) => (
          <div key={index} className="text-center bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Lucky {category.title}</h3>
            <div className="space-y-2">
              {category.items.map((item: string, i: number) => (
                <div key={i} className="bg-white/60 px-3 py-1 rounded-lg text-sm text-gray-700">{item}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  compatibility: (data: any) => (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full mb-4">
          {(() => {
            const Icon = universalNavigationItems[3].icon;
            return <Icon className="w-8 h-8 text-orange-600" />;
          })()}
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{data.compatibility.title || 'Compatibility'}</h2>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Best Matches</h3>
          <div className="space-y-3">
            {data.compatibility.bestMatches && data.compatibility.bestMatches.map((sign: string, i: number) => (
              <div key={i} className="bg-white/60 px-4 py-2 rounded-lg text-center font-medium text-gray-700">{sign}</div>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Challenging</h3>
          <div className="space-y-3">
            {data.compatibility.challenging && data.compatibility.challenging.map((sign: string, i: number) => (
              <div key={i} className="bg-white/60 px-4 py-2 rounded-lg text-center font-medium text-gray-700">{sign}</div>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-xl border border-amber-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Friendship</h3>
          <p className="text-gray-600 text-center">{data.compatibility.friendship}</p>
        </div>
      </div>
    </div>
  ),
  growth: (data: any) => (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full mb-4">
          {(() => {
            const Icon = universalNavigationItems[4].icon;
            return <Icon className="w-8 h-8 text-orange-600" />;
          })()}
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{data.growth.title || 'Growth & Challenges'}</h2>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-xl border border-amber-100">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Areas for Growth</h3>
          <ul className="space-y-3 text-gray-600">
            {data.growth.areasForGrowth && data.growth.areasForGrowth.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-xl border border-orange-100">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Common Challenges</h3>
          <ul className="space-y-3 text-gray-600">
            {data.growth.commonChallenges && data.growth.commonChallenges.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ),
  uranus: (data: any) => (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full mb-4">
          {(() => {
            const Icon = universalNavigationItems[5].icon;
            return <Icon className="w-8 h-8 text-orange-600" />;
          })()}
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{data.uranus?.title || 'Uranus Influence'}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">{data.uranus?.description}</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        {data.uranus?.cards && data.uranus.cards.map((item: any, i: number) => (
          <div key={i} className="bg-gradient-to-br from-orange-50 to-amber-50 p-8 rounded-xl border border-orange-100">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">{item.title}</h3>
            <p className="text-gray-600 leading-relaxed">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  ),
  faq: (data: any) => (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full mb-4">
          {(() => {
            const Icon = universalNavigationItems[6].icon;
            return <Icon className="w-8 h-8 text-orange-600" />;
          })()}
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{data.faq?.title || 'Frequently Asked Questions'}</h2>
      </div>
      <div className="space-y-6">
        {data.faq?.faqs && data.faq.faqs.map((faq: any, index: number) => (
          <div key={index} className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{faq.question}</h3>
            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
};

export default function ZodiacInfoNavigation({ zodiacSign }: ZodiacInfoNavigationProps) {
  const [activeTab, setActiveTab] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const data = zodiacInfoData[zodiacSign];
  const navigationItems = data.navigationItems;
  const activeItem = navigationItems.find((item: any) => item.id === activeTab);

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
            <nav className="grid grid-cols-7 gap-0">
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
            {tabContentMap[activeTab as keyof typeof tabContentMap]
              ? tabContentMap[activeTab as keyof typeof tabContentMap](data)
              : <div>Section not available.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}