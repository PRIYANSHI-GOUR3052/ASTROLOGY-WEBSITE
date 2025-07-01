const fs = require('fs/promises');
const path = require('path');
const translate = require('translate-google');

const LANGS_TO_TRANSLATE = {
  'es': 'es', 
  'fr': 'fr', 
  'de': 'de', 
  'zh': 'zh-cn', // Use 'zh-cn' for Simplified Chinese
  'ar': 'ar', 
  'ru': 'ru'
};
const TRANSLATIONS_DIR = path.join(__dirname, '../translations');
const EN_FILE_PATH = path.join(TRANSLATIONS_DIR, 'en.json');

// Helper function to recursively translate an object
async function translateObject(obj, targetLang) {
  const newObj = {};
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      // Recursively translate nested objects
      newObj[key] = await translateObject(obj[key], targetLang);
    } else if (typeof obj[key] === 'string') {
      // Translate string values
      try {
        const translatedText = await translate(obj[key], { from: 'en', to: targetLang });
        newObj[key] = translatedText;
        console.log(`Translated "${obj[key]}" to "${translatedText}" [${targetLang}]`);
      } catch (err) {
        console.error(`Could not translate "${obj[key]}". Error: ${err.message}`);
        newObj[key] = obj[key]; // Keep original text on error
      }
    } else {
      newObj[key] = obj[key]; // Keep non-string values as is
    }
  }
  return newObj;
}

async function main() {
  try {
    console.log('Starting translation process...');
    
    // Read the master English translation file
    const enContent = await fs.readFile(EN_FILE_PATH, 'utf8');
    const enJson = JSON.parse(enContent);

    console.log(`Translating into: ${Object.keys(LANGS_TO_TRANSLATE).join(', ')}`);

    for (const lang of Object.keys(LANGS_TO_TRANSLATE)) {
      console.log(`--- Translating to ${lang.toUpperCase()} ---`);
      
      const googleLangCode = LANGS_TO_TRANSLATE[lang];
      const translatedJson = await translateObject(enJson, googleLangCode);
      
      const targetFilePath = path.join(TRANSLATIONS_DIR, `${lang}.json`);
      await fs.writeFile(targetFilePath, JSON.stringify(translatedJson, null, 2), 'utf8');
      
      console.log(`Successfully created ${lang}.json file.`);
    }

    console.log('All translations completed successfully!');

  } catch (error) {
    console.error('An error occurred during the translation process:', error);
  }
}

main(); 