# SplashScreen Component

A beautiful, animated splash screen component for the Russian Translator website with multilingual support and smooth animations.

## Features

- ✨ **Animated Background**: Gradient shifting background with floating orb elements
- 🌐 **Multilingual Support**: English and Russian text content
- 🎯 **Language Icons**: Interactive Russian (РУ) ⟷ English (EN) transition icons
- 📊 **Progress Animation**: Smooth loading progress bar with percentage
- 🎨 **Modern Animations**: Sophisticated entrance and exit animations
- 📱 **Mobile Responsive**: Optimized for all screen sizes
- ⚡ **Performance Optimized**: Efficient animations and cleanup

## Usage

### Basic Implementation

```jsx
import SplashScreen from './components/SplashScreen';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <div>
      {showSplash && (
        <SplashScreen
          onComplete={handleSplashComplete}
          duration={3000}
          currentLanguage="en"
          isVisible={showSplash}
        />
      )}
      {!showSplash && <YourMainContent />}
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onComplete` | `function` | `undefined` | Callback function called when splash animation completes |
| `duration` | `number` | `3000` | Total duration of splash screen in milliseconds |
| `currentLanguage` | `string` | `'en'` | Language for content display (`'en'` or `'ru'`) |
| `isVisible` | `boolean` | `true` | Controls splash screen visibility |

## Content Structure

The component supports bilingual content:

### English (`en`)
- Welcome: "Welcome to"
- Brand: "Russian Translators" 
- Tagline: "Professional Russian-English Translation Services"
- Loading: "Loading..."

### Russian (`ru`)
- Welcome: "Добро пожаловать в"
- Brand: "Русские переводчики"
- Tagline: "Профессиональные услуги русско-английского перевода"
- Loading: "Загрузка..."

## Animation Sequence

1. **Initial Fade In** (300ms) - Background and structure appear
2. **Brand Reveal** (800ms) - Language icons animate in with bounce effect
3. **Tagline Reveal** (1200ms) - Welcome text and tagline fade in
4. **Progress Start** (1600ms) - Loading bar begins animation
5. **Complete** (duration) - Exit animation triggers and calls onComplete

## CSS Classes Used

The component relies on CSS classes defined in `App.css`:

- `.splash-screen` - Main container with gradient background
- `.splash-content` - Content wrapper with center alignment
- `.splash-icon` - Language icon container
- `.icon-russian`, `.icon-english` - Individual language icons
- `.icon-arrow` - Bidirectional arrow between icons
- `.splash-text` - Text content wrapper
- `.brand-name` - Main brand text with shimmer effect
- `.splash-loader` - Progress bar container
- `.gradient-orb` - Floating background elements
- `.float-element` - Animated floating icons

## Customization

### Changing Duration
```jsx
<SplashScreen duration={5000} /> // 5 seconds
```

### Language Detection
```jsx
const [currentLanguage, setCurrentLanguage] = useState(() => {
  const browserLang = navigator.language.toLowerCase();
  return browserLang.startsWith('ru') ? 'ru' : 'en';
});
```

### Custom Content
Modify the `content` object inside the component to add new languages or change text.

## Performance Notes

- Uses `useEffect` cleanup to prevent memory leaks
- Implements proper timer management
- Optimized animations using CSS transforms
- Responsive design with mobile-first approach

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- CSS Animation and Transform support required
- Tested on Chrome, Firefox, Safari, and Edge

## Example Integration

See `SplashScreenDemo.js` for a complete example with language switching and demo reset functionality.
