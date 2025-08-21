"use client";
import React from "react";
import Marquee from "react-fast-marquee";
import { useLanguage } from "../../contexts/useLanguage";

const meanings: Record<string, string> = {
  en: 'May all beings be happy. May all be free from illness. May all see what is auspicious. May none suffer in any way.',
  hi: 'सभी सुखी रहें। सभी निरोगी रहें। सभी शुभ देखें। और कोई भी दुख का भागी न बने।',
  bn: 'সবাই সুখী হোক। সবাই রোগমুক্ত হোক। সবাই শুভ দেখুক। কেউ যেন কোনোভাবে দুঃখ না পায়।',
  ta: 'அனைவரும் சந்தோஷமாக இருப்பார்களாக. அனைவரும் நோயற்றவர்களாக இருப்பார்களாக. அனைவரும் நன்மையைக் காண்பார்களாக. யாரும் எந்த வகையிலும் துன்பப்பட வேண்டாம்.',
  te: 'అందరూ సుఖంగా ఉండాలి. అందరూ రోగరహితులుగా ఉండాలి. అందరూ శుభాన్ని చూస్తారుగా. ఎవరూ ఏ విధంగానూ బాధపడకుండా ఉండాలి.',
  mr: 'सर्व सुखी असोत. सर्व निरोगी असोत. सर्व शुभ पहावोत. कोणीही कोणत्याही प्रकारे दुःख भोगू नये.',
  gu: 'બધા સુખી રહો. બધા નિરોગી રહો. બધા શુભ જુઓ. કોઈ પણ કોઈપણ રીતે દુઃખ ન ભોગવે.',
  ml: 'എല്ലാവരും സുഖമായിരിക്കട്ടെ. എല്ലാവരും രോഗരഹിതരായിരിക്കട്ടെ. എല്ലാവരും ശുഭം കാണട്ടെ. ആരും യാതൊരു വിധത്തിലും കഷ്ടപ്പെടരുത്.',
  kn: 'ಎಲ್ಲರೂ ಸುಖಿಯಾಗಿರಲಿ. ಎಲ್ಲರೂ ರೋಗರಹಿತರಾಗಿರಲಿ. ಎಲ್ಲರೂ ಶುಭವನ್ನು ನೋಡಲಿ. ಯಾರೂ ಯಾವುದೇ ರೀತಿಯಲ್ಲಿ ದುಃಖವನ್ನು ಅನುಭವಿಸಬಾರದು.',
  or: 'ସମସ୍ତେ ସୁଖୀ ହୁଅନ୍ତୁ। ସମସ୍ତେ ନିରୋଗୀ ହୁଅନ୍ତୁ। ସମସ୍ତେ ଶୁଭ ଦେଖନ୍ତୁ। କେହି କୌଣସି ଭାବରେ ଦୁଃଖ ଭୋଗନ୍ତୁ ନାହିଁ।',
  pa: 'ਸਾਰੇ ਸੁਖੀ ਹੋਣ। ਸਾਰੇ ਨਿਰੋਗੀ ਹੋਣ। ਸਾਰੇ ਸ਼ੁਭ ਦੇਖਣ। ਕੋਈ ਵੀ ਕਿਸੇ ਵੀ ਤਰੀਕੇ ਨਾਲ ਦੁੱਖ ਨਾ ਭੋਗੇ।',
  es: 'Que todos sean felices. Que todos estén libres de enfermedad. Que todos vean lo auspicioso. Que nadie sufra de ninguna manera.',
  fr: 'Que tous soient heureux. Que tous soient exempts de maladie. Que tous voient ce qui est de bon augure. Que personne ne souffre en aucune façon.',
  de: 'Mögen alle glücklich sein. Mögen alle frei von Krankheit sein. Mögen alle das Glückliche sehen. Möge niemand auf irgendeine Weise leiden.',
  zh: '愿众生幸福。愿众生无病。愿众生见吉祥。愿无人受苦。',
  ru: 'Пусть все будут счастливы. Пусть все будут свободны от болезней. Пусть все видят благоприятное. Пусть никто не страдает.',
  ar: 'ليكن الجميع سعداء. ليكن الجميع خاليين من المرض. ليكن الجميع يرون ما هو خير. لا يعاني أحد بأي شكل من الأشكال.',
};

export default function SpiritualTicker() {
  const { lang } = useLanguage();
  return (
    <div className="w-full py-6 px-2 flex items-center justify-center min-h-[72px]" style={{ background: '#FEFBF2', color: '#232323' }}>
      <Marquee gradient={false} speed={40} pauseOnHover={true} direction="right" className="w-full">
        <div className="flex flex-row items-center w-full gap-4">
          <div className="flex flex-col justify-center items-end min-w-[220px] mr-8">
            <span className="font-['Noto Serif Devanagari',serif] text-base md:text-lg font-semibold leading-tight tracking-wide" style={{ fontFamily: 'Noto Serif Devanagari, serif', color: '#232323' }}>
              ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः।
            </span>
            <span className="font-['Noto Serif Devanagari',serif] text-base md:text-lg font-semibold leading-tight tracking-wide" style={{ fontFamily: 'Noto Serif Devanagari, serif', color: '#232323' }}>
              सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत्॥
            </span>
          </div>
          <div className="flex flex-col justify-center items-start min-w-[260px] ml-8">
            <span className="font-serif text-sm md:text-base font-medium leading-tight tracking-wide italic" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#77A656' }}>
              {meanings[lang]?.split('. ').slice(0,2).join('. ')}
            </span>
            <span className="font-serif text-sm md:text-base font-medium leading-tight tracking-wide italic" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#77A656' }}>
              {meanings[lang]?.split('. ').slice(2).join('. ')}
            </span>
          </div>
        </div>
      </Marquee>
    </div>
  );
} 