// import React from 'react';

// import { useAuthContext } from '../../store/contexts';
// import { useGetAuthQuery } from '../../store/queries/auth';
// import { SplashScreen } from '../../utils/components';
// import type { LoginResponseType } from '../../types';

// export default function CheckAuth({
//   children,
//   initialData,
// }: {
//   children: React.ReactNode;
//   initialData?: LoginResponseType;
// }) {
//   const [loading, setLoading] = React.useState(true);

//   const { login, logout, } = useAuthContext();

//   const {
//     data: response,
//     status,
//     isLoading,
//   } = useGetAuthQuery({
//     initialData,
//   });

//   React.useEffect(() => {
//     if (!isLoading) {
//       if (status === 'success' && response?.data) {
//         login(response.data);
//       } else logout();
//       setLoading(false);
//     }
//   }, [login, logout, response, status, isLoading]);

//   return loading ? <SplashScreen /> : children;
// }
import React from 'react';

//import Layout from '../index';
import { useAuthContext } from '../../store/contexts';
//import Dynamic from '../../utils/components/dynamic';
import SplashScreen from '../../utils/components/splash-screen';
// START: Modified for Netlify CSRF handling - Import useGetCsrfTokenQuery
import { useGetAuthQuery, useGetCsrfTokenQuery } from '../../store/queries/auth';
// END: Modified for Netlify CSRF handling
import type { LoginResponseType } from '../../types';


export default function CheckAuth({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData?: LoginResponseType;
}) {
  // START: Modified for Netlify CSRF handling - Renamed loading state for clarity
  const [loadingAuthProcess, setLoadingAuthProcess] = React.useState(true);
  // END: Modified for Netlify CSRF handling

  // START: Modified for Netlify CSRF handling - Added changeCSRFToken to destructuring
  const { login, logout, changeCSRFToken } = useAuthContext();
  // END: Modified for Netlify CSRF handling

  // START: Added for Netlify CSRF handling - First, fetch the CSRF token
  const {
    data: csrfResponse,
    isLoading: isLoadingCsrf,
    isSuccess: isSuccessCsrf,
    isError: isErrorCsrf,
    error: csrfError,
  } = useGetCsrfTokenQuery();
  // END: Added for Netlify CSRF handling

  // START: Modified for Netlify CSRF handling - Conditionally enable useGetAuthQuery
  const {
    data: response,
    status,
    isLoading,
  } = useGetAuthQuery({
    initialData,
    enabled: isSuccessCsrf, // Only run this query if CSRF token is successfully fetched
  });
  // END: Modified for Netlify CSRF handling

  // START: Added for Netlify CSRF handling - Effect to update CSRF token in context
  React.useEffect(() => {
    if (isSuccessCsrf && csrfResponse?.csrfToken) {
      changeCSRFToken(csrfResponse.csrfToken);
    } else if (isErrorCsrf) {
      // Handle CSRF fetch error, maybe show a global error or redirect to an error page
      console.error("Failed to fetch CSRF token:", csrfError);
      // If CSRF fails, we might still proceed, but login/logout will likely fail.
      // A more robust solution might involve showing an error screen or retrying.
      setLoadingAuthProcess(false); // Allow app to render, but auth will likely fail
    }
  }, [isSuccessCsrf, csrfResponse, changeCSRFToken, isErrorCsrf, csrfError]);
  // END: Added for Netlify CSRF handling

  // START: Modified for Netlify CSRF handling - Updated dependencies and logic
  React.useEffect(() => {
    // Only proceed if CSRF token is successfully loaded AND auth query is not loading
    if (!isLoading && isSuccessCsrf) {
      if (status === 'success' && response?.data) {
        login(response.data);
      } else {
        logout(); // This will clear existing auth state but keep CSRF if it was set
      }
      setLoadingAuthProcess(false);
    }
  }, [login, logout, response, status, isLoading, isSuccessCsrf]); // Added isSuccessCsrf to dependencies
  // END: Modified for Netlify CSRF handling

  // START: Modified for Netlify CSRF handling - Show splash screen while either CSRF or Auth is loading
  return (isLoadingCsrf || loadingAuthProcess) ? <SplashScreen /> : children;
  // END: Modified for Netlify CSRF handling
}
// export default function CheckAuth({
// children,
// initialData,
// }: {
// children: React.ReactNode;
// initialData?: LoginResponseType;
// }) {
// const [loadingAuth, setLoadingAuth] = React.useState(true);
// const { login, logout, changeCSRFToken } = useAuthContext();

// // First, fetch the CSRF token
// const {
//   data: csrfResponse,
//   isLoading: isLoadingCsrf,
//   isSuccess: isSuccessCsrf,
//   isError: isErrorCsrf,
//   error: csrfError,
// } = useGetCsrfTokenQuery();

// // Then, if CSRF is loaded, attempt to get auth status
// const {
//   data: authResponse,
//   status: authStatus,
//   isLoading: isLoadingAuthQuery,
// } = useGetAuthQuery({
//   initialData,
//   //enabled: isSuccessCsrf, // Only run this query if CSRF token is successfully fetched
// });

// React.useEffect(() => {
//   if (isSuccessCsrf && csrfResponse?.csrfToken) {
//     changeCSRFToken(csrfResponse.csrfToken);
//   } else if (isErrorCsrf) {
//     // Handle CSRF fetch error, maybe show a global error or redirect to an error page
//     console.error("Failed to fetch CSRF token:", csrfError);
//     // For now, we'll just proceed, but this might lead to auth issues.
//     // A more robust solution might involve showing an error screen or retrying.
//     setLoadingAuth(false); // Allow app to render, but auth will likely fail
//   }
// }, [isSuccessCsrf, csrfResponse, changeCSRFToken, isErrorCsrf, csrfError]);


// React.useEffect(() => {
//   if (!isLoadingAuthQuery && isSuccessCsrf) { // Ensure CSRF is loaded before evaluating auth
//     if (authStatus === 'success' && authResponse?.data) {
//       login(authResponse.data);
//     } else {
//       logout(); // This will clear existing auth state but keep CSRF if it was set
//     }
//     setLoadingAuth(false);
//   }
// }, [login, logout, authResponse, authStatus, isLoadingAuthQuery, isSuccessCsrf]);

// // Show splash screen while either CSRF or Auth is loading
// if (isLoadingCsrf || loadingAuth) {
//   return <SplashScreen />;
// }

// return children;
// }
