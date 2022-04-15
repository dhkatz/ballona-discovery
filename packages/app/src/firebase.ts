import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyC0qrvZUCD08bOv4O9v7BEkUIrlFSTK4ds',
	authDomain: 'ballona-discovery-fcdaf.firebaseapp.com',
	projectId: 'ballona-discovery-fcdaf',
	storageBucket: 'ballona-discovery-fcdaf.appspot.com',
	messagingSenderId: '496021059821',
	appId: '1:496021059821:web:04b1602145ac7b30bd74e4',
	measurementId: 'G-847JQ34415',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

connectFirestoreEmulator(firestore, 'localhost', 8080);
connectAuthEmulator(auth, 'http://localhost:9099');

export { analytics, firestore, auth };
export default app;
