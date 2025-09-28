// Comprehensive fuzzy search keywords for misspellings and variations
export const fuzzySearchKeywords = {
  // Brand misspellings
  brandMisspellings: [
    'biruhkids', 'birhkids', 'birukids', 'biruhkidz', 'birukhids', 
    'biruhkides', 'biruhkidss', 'biruhkiids', 'biruhkkids', 'birruhkids', 
    'biruhkidds', 'biruh-kids', 'biruh_kids', 'BIRUHKIDS', 'Biruhkids',
    'biruhkid', 'biruhkides', 'biruhkidz', 'biruhkidzs', 'biruhkidss',
    'birhukids', 'biruhkids', 'biruhkidz', 'biruhkides', 'biruhkidss'
  ],

  // Phonetic variations
  phoneticVariations: [
    'biruhe kids', 'biruh kidz', 'biruhe kidz', 'biruh kides', 'biruhe kides',
    'biroo kids', 'biruh keedz', 'biruhe keedz', 'biruh keeds', 'biruhe keeds'
  ],

  // Common typos
  commonTypos: [
    'biruhkids clinic', 'birhkids clinic', 'birukids clinic', 'biruhkidz clinic',
    'biruhkids pediatric', 'birhkids pediatric', 'birukids pediatric', 'biruhkidz pediatric',
    'biruhkids hospital', 'birhkids hospital', 'birukids hospital', 'biruhkidz hospital',
    'biruhkids addis ababa', 'birhkids addis ababa', 'birukids addis ababa', 'biruhkidz addis ababa',
    'biruhkids ethiopia', 'birhkids ethiopia', 'birukids ethiopia', 'biruhkidz ethiopia'
  ],

  // Mixed language typos
  mixedLanguageTypos: [
    'biruhኪድስ', 'birhኪድስ', 'birukኪድስ', 'biruhkidስ', 'biruhኪds',
    'ብሩህkids', 'ብሩህkidz', 'ብሩህkides', 'ብሩህkidss', 'ብሩህkiids',
    'biruhኪድስ clinic', 'ብሩህkids clinic', 'biruhኪድስ ክሊኒክ', 'ብሩህkids ክሊኒክ'
  ],

  // Location variations with typos
  locationTypos: [
    'biruhkids adis ababa', 'biruhkids addis abeba', 'biruhkids addis abbaba',
    'biruhkids ethiopia', 'biruhkids ethopia', 'biruhkids etiopia',
    'birhkids addis ababa', 'birukids addis ababa', 'biruhkidz addis ababa'
  ]
};

// Generate all fuzzy search combinations
export const generateFuzzyKeywords = () => {
  const allFuzzy = [];
  
  Object.values(fuzzySearchKeywords).forEach(category => {
    allFuzzy.push(...category);
  });
  
  return [...new Set(allFuzzy)].join(', ');
};