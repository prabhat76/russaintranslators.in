// Run this in browser console to force refresh styles
console.log('🔄 Forcing CSS refresh...');

// Remove all stylesheets and re-add them
const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
stylesheets.forEach(sheet => {
  const newSheet = sheet.cloneNode();
  newSheet.href = sheet.href + '?v=' + Date.now();
  sheet.parentNode.insertBefore(newSheet, sheet.nextSibling);
  sheet.remove();
});

// Force style recalculation
document.body.style.display = 'none';
document.body.offsetHeight; // Trigger reflow
document.body.style.display = '';

console.log('✅ CSS refresh complete - styles should now be updated!');
