const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');

const firebaseConfig = {
  apiKey: "AIzaSyAru4IFHn19f2RQB3z8LFiGHr4PYynUkd8",
  authDomain: "russiantranslator-aa708.firebaseapp.com",
  databaseURL: "https://russiantranslator-aa708-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "russiantranslator-aa708",
  storageBucket: "russiantranslator-aa708.firebasestorage.app",
  messagingSenderId: "631900278460",
  appId: "1:631900278460:web:ac2ed8da7da1b856fc8ab9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function createAdmin() {
  try {
    const email = 'prabhatprabhakr918@gmail.com';
    const password = 'klj206king';
    
    console.log('🔐 Creating admin user...');
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email:', email);
    console.log('🔑 Password:', password);
    console.log('🆔 UID:', userCredential.user.uid);
    
    process.exit(0);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('✅ Admin user already exists');
      console.log('📧 Email: prabhatprabhakr918@gmail.com');
      console.log('🔑 Password: klj206king');
    } else {
      console.error('❌ Error creating admin:', error.message);
    }
    process.exit(0);
  }
}

createAdmin();