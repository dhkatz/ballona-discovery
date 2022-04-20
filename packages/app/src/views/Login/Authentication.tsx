import { StyledFirebaseAuth } from 'react-firebaseui';
import { GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth';

import { useFirebase } from '../../hooks';

const uiConfig = {
	signInFlow: 'popup',
	signInOptions: [EmailAuthProvider.PROVIDER_ID, GoogleAuthProvider.PROVIDER_ID],
	signInSuccessUrl: '/',
};

export const Authentication = () => {
	const { auth } = useFirebase();

	return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />;
};
