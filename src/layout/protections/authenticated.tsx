import React from 'react';

import Layout from '../index';
import { useAuthContext } from '../../store/contexts';
import Dynamic from '../../utils/components/dynamic';
import SplashScreen from '../../utils/components/splash-screen';

const Authenticated = ({ children }: { children: React.ReactNode }) => {
	const { auth: isAuthenticated, loading: isLoading } = useAuthContext();

	if (isLoading === false && isAuthenticated)
		return (
			<Layout>
				{children}
			</Layout>
		);

	if (isLoading === false && isAuthenticated === false)
		return (
			<Dynamic
				fallback={<SplashScreen />}
				component={React.lazy(() => import('../../pages/auth/Login'))}
			/>
		);

	throw {
		title: 'Internal Server Error.',
		status: 500,
		message: 'An error occurred. Please try again later.',
	};
};

export default Authenticated;
