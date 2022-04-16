import { analytics, auth, firestore } from '../firebase';

export const useFirebase = () => ({ firestore, auth, analytics });
