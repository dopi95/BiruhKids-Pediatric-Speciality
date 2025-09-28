// Mixed Language Keywords for comprehensive search coverage
export const mixedLanguageVariations = {
  // Brand name variations
  brandNames: [
    'BiruhKids',
    'Biruh Kids', 
    'biruhኪድስ',
    'biruh ኪድስ',
    'ብሩህkids',
    'ብሩህ kids',
    'ብሩህኪድስ',
    'BiruhKids',
    'BIRUHKIDS',
    'biruhkids',
    'Biruh-Kids',
    'biruh-kids',
    'ብሩህ-ኪድስ',
    'biruh_kids',
    'ብሩህ_ኪድስ'
  ],

  // Clinic variations
  clinicNames: [
    'BiruhKids clinic',
    'biruhኪድስ clinic',
    'ብሩህkids clinic',
    'BiruhKids ክሊኒክ',
    'biruhኪድስ ክሊኒክ',
    'ብሩህkids ክሊኒክ',
    'Biruh Kids clinic',
    'biruh kids ክሊኒክ',
    'ብሩህ kids clinic',
    'BiruhKids pediatric',
    'biruhኪድስ pediatric',
    'ብሩህkids pediatric'
  ],

  // Location combinations
  locationMix: [
    'BiruhKids አዲስ አበባ',
    'biruhኪድስ Addis Ababa',
    'ብሩህkids addis ababa',
    'BiruhKids ኢትዮጵያ',
    'biruhኪድስ Ethiopia',
    'ብሩህkids ethiopia',
    'Biruh Kids አዲስ አበባ',
    'biruh kids Addis Ababa',
    'ብሩህ kids ኢትዮጵያ'
  ],

  // Service combinations
  serviceMix: [
    'pediatric የህፃናት',
    'የህፃናት pediatric',
    'children ህፃናት',
    'ህፃናት children',
    'doctor ዶክተር',
    'ዶክተር doctor',
    'hospital ሆስፒታል',
    'ሆስፒታል hospital',
    'clinic ክሊኒክ',
    'ክሊኒክ clinic',
    'appointment ቀጠሮ',
    'ቀጠሮ appointment',
    'booking ማስያዝ',
    'ማስያዝ booking'
  ],

  // Common misspellings and variations
  misspellings: [
    'biruhkids',
    'birhkids',
    'biruh-kids',
    'biruhkid',
    'biruhkidz',
    'birukids',
    'birukhids',
    'biruhkides',
    'biruhkidss',
    'biruhkiids',
    'biruhkkids',
    'birruhkids',
    'biruhkidds'
  ],

  // Phonetic variations
  phoneticVariations: [
    'biruh kids',
    'biruhe kids',
    'biruh kidz',
    'biruhe kidz',
    'biruh kides',
    'biruhe kides'
  ]
};

// Generate all possible combinations
export const generateMixedKeywords = () => {
  const combinations = [];
  
  // Add all brand variations
  combinations.push(...mixedLanguageVariations.brandNames);
  
  // Add clinic combinations
  combinations.push(...mixedLanguageVariations.clinicNames);
  
  // Add location combinations
  combinations.push(...mixedLanguageVariations.locationMix);
  
  // Add service combinations
  combinations.push(...mixedLanguageVariations.serviceMix);
  
  // Add misspellings
  combinations.push(...mixedLanguageVariations.misspellings);
  
  // Add phonetic variations
  combinations.push(...mixedLanguageVariations.phoneticVariations);
  
  // Generate cross combinations
  const crossCombinations = [];
  
  // Brand + Location
  mixedLanguageVariations.brandNames.forEach(brand => {
    ['Addis Ababa', 'አዲስ አበባ', 'Ethiopia', 'ኢትዮጵያ'].forEach(location => {
      crossCombinations.push(`${brand} ${location}`);
    });
  });
  
  // Brand + Service
  mixedLanguageVariations.brandNames.forEach(brand => {
    ['pediatric', 'የህፃናት', 'clinic', 'ክሊኒክ', 'hospital', 'ሆስፒታል'].forEach(service => {
      crossCombinations.push(`${brand} ${service}`);
    });
  });
  
  combinations.push(...crossCombinations);
  
  return [...new Set(combinations)]; // Remove duplicates
};

// Common search patterns users might use
export const searchPatterns = {
  // Question-based searches
  questions: [
    'where is BiruhKids',
    'የት ነው BiruhKids',
    'how to book BiruhKids',
    'እንዴት BiruhKids ቀጠሮ',
    'BiruhKids phone number',
    'BiruhKids ስልክ ቁጥር',
    'best pediatric clinic addis ababa',
    'ምርጥ የህፃናት ክሊኒክ አዲስ አበባ'
  ],
  
  // Intent-based searches
  intents: [
    'book pediatric appointment',
    'የህፃናት ቀጠሮ ማስያዝ',
    'children doctor near me',
    'በአቅራቢያዬ የህፃናት ዶክተር',
    'pediatric emergency',
    'የህፃናት አስቸኳይ',
    'child vaccination',
    'የህፃናት ክትባት'
  ],
  
  // Local searches
  localSearches: [
    'pediatric clinic in addis ababa',
    'በአዲስ አበባ የህፃናት ክሊኒክ',
    'children hospital ethiopia',
    'ኢትዮጵያ የህፃናት ሆስፒታል',
    'best child doctor addis',
    'አዲስ አበባ ምርጥ የህፃናት ዶክተር'
  ]
};

// Generate comprehensive keyword list for SEO
export const generateComprehensiveKeywords = () => {
  const allKeywords = [];
  
  // Add mixed language variations
  allKeywords.push(...generateMixedKeywords());
  
  // Add search patterns
  Object.values(searchPatterns).forEach(patternArray => {
    allKeywords.push(...patternArray);
  });
  
  // Add common combinations with mixed languages
  const commonTerms = {
    english: ['pediatric', 'children', 'clinic', 'hospital', 'doctor', 'appointment', 'booking', 'care', 'health'],
    amharic: ['የህፃናት', 'ክሊኒክ', 'ሆስፒታል', 'ዶክተር', 'ቀጠሮ', 'ማስያዝ', 'እንክብካቤ', 'ጤንነት']
  };
  
  // Create mixed combinations
  commonTerms.english.forEach(enTerm => {
    commonTerms.amharic.forEach(amTerm => {
      mixedLanguageVariations.brandNames.slice(0, 5).forEach(brand => {
        allKeywords.push(`${brand} ${enTerm} ${amTerm}`);
        allKeywords.push(`${brand} ${amTerm} ${enTerm}`);
      });
    });
  });
  
  return [...new Set(allKeywords)].join(', ');
};