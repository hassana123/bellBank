import { createBrowserRouter, ScrollRestoration, Outlet, type RouteObject } from 'react-router-dom';

import * as pageRoutes from './config/routes';

// Auth pages
import LoginPage from './pages/auth/Login';
import RegisterPage from './pages/auth/Registration';
import VerifyOtpPage from './pages/auth/VerifyOtp';

// Dashboard pages
import DashboardPage from './pages/dashboard/Index';
import WalletPage from './pages/dashboard/WalletPage';
import TransactionsPage from './pages/dashboard/TransactionPage';

// Error handling
import ErrorPage from './pages/error';
import NotFoundPage from './pages/404';

// Protections
import CheckAuth from './layout/protections/check-auth';
import Authenticated from './layout/protections/authenticated';
import NotAuthenticated from './layout/protections/unauthenticated';

const routes: RouteObject[] = [
  {
    element: (
      <>
        <CheckAuth><Outlet /></CheckAuth>
        <ScrollRestoration />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        element: <NotAuthenticated><Outlet /></NotAuthenticated>,
        children: [
          {
            path: pageRoutes.LOGIN_PAGE,
            element: <LoginPage />,
          },
          {
            path: pageRoutes.HOME_PAGE,
            element: <LoginPage />,
          },
          {
            path: pageRoutes.REGISTER_PAGE,
            element: <RegisterPage />,
          },
          {
            path: pageRoutes.VERIFY_OTP_PAGE,
            element: <VerifyOtpPage />,
          },
        ],
      },
      {
        element: <Authenticated><Outlet /></Authenticated>,
        children: [
          {
            path: pageRoutes.DASHBOARD_PAGE,
            element: <DashboardPage />
          },
          {
            path: pageRoutes.DASHBOARD_WALLET_PAGE,
            element: <WalletPage />
          },
          {
            path: pageRoutes.DASHBOARD_TRANSACTIONS_PAGE,
            element: <TransactionsPage />
          }
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;
