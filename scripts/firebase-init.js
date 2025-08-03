const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, doc, setDoc, Timestamp } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyAru4IFHn19f2RQB3z8LFiGHr4PYynUkd8",
  authDomain: "russiantranslator-aa708.firebaseapp.com",
  projectId: "russiantranslator-aa708",
  storageBucket: "russiantranslator-aa708.firebasestorage.app",
  messagingSenderId: "631900278460",
  appId: "1:631900278460:web:ac2ed8da7da1b856fc8ab9",
  measurementId: "G-E9JL6VQHG6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample data to initialize collections
const sampleFeedback = [
  {
    name: "Rajesh Kumar",
    rating: 5,
    message: "Excellent Russian interpretation service! Sabrina helped us close a major deal with Moscow partners.",
    timestamp: Timestamp.now(),
    language: "en"
  },
  {
    name: "Priya Sharma", 
    rating: 5,
    message: "Professional document translation. Fast and accurate. Highly recommended!",
    timestamp: Timestamp.now(),
    language: "en"
  },
  {
    name: "Михаил Петров",
    rating: 5,
    message: "Отличная поддержка для наших артистов в Мумбаи. Сабрина знает индустрию развлечений.",
    timestamp: Timestamp.now(),
    language: "ru"
  }
];

async function initializeFirestore() {
  try {
    console.log('Initializing Firestore with sample data...');
    
    // Create initial document to ensure database exists
    await setDoc(doc(db, 'init', 'setup'), {
      initialized: true,
      timestamp: Timestamp.now()
    });
    
    // Add sample feedback
    for (const feedback of sampleFeedback) {
      await addDoc(collection(db, 'feedback'), feedback);
      console.log('Added feedback from:', feedback.name);
    }
    
    // Create contacts collection placeholder
    await setDoc(doc(db, 'contacts', 'placeholder'), {
      note: 'Collection initialized',
      timestamp: Timestamp.now()
    });
    
    console.log('✅ Firestore initialized successfully!');
    console.log('🔥 Firebase project ready for real-time feedback!');
    
  } catch (error) {
    console.error('❌ Error initializing Firestore:', error);
    console.log('Make sure Firestore is enabled in Firebase Console');
  }
}

initializeFirestore();