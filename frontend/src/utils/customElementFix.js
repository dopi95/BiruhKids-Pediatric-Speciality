// Fix for CustomElementRegistry duplicate definition error
export const preventDuplicateCustomElements = () => {
  // Check if custom elements are already defined
  const definedElements = new Set();
  
  // Override customElements.define to prevent duplicates
  const originalDefine = customElements.define;
  customElements.define = function(name, constructor, options) {
    if (definedElements.has(name)) {
      console.warn(`Custom element "${name}" is already defined. Skipping redefinition.`);
      return;
    }
    
    try {
      originalDefine.call(this, name, constructor, options);
      definedElements.add(name);
    } catch (error) {
      if (error.message.includes('already been used')) {
        console.warn(`Custom element "${name}" already exists:`, error.message);
      } else {
        throw error;
      }
    }
  };
};

// Call this early in your app
preventDuplicateCustomElements();