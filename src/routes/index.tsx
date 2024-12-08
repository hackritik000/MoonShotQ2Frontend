import NotFound from '@/pages/not-found';
import { Suspense, lazy } from 'react';
import SignUpPage from '@/pages/auth/signup';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { AuthLayout } from '@/components/layout/AuthLayout';
import SignOutPage from '@/pages/auth/signout';
import SharedPage from '@/pages/dashboard/shared';
const SignInPage = lazy(() => import('@/pages/auth/signin'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));

export default function AppRouter() {
  const dashboardRoutes = [
    {
      path: '/',
      element: (
        <Suspense fallback={<div>Loading ...</div>}>
          <Outlet />
        </Suspense>
      ),
      children: [
        {
          element: (
            <AuthLayout authentication>
              <DashboardPage />
            </AuthLayout>
          ),
          index: true
        },
        {
          path: '/id/:id',
          element: (
            <AuthLayout authentication={true}>
              <SharedPage />
            </AuthLayout>
          ),
          index: true
        }
      ]
    }
  ];

  const publicRoutes = [
    {
      path: '/login',
      element: (
        <AuthLayout authentication={false}>
          <SignInPage />
        </AuthLayout>
      ),
      index: true
    },
    {
      path: '/logout',
      element: (
        <AuthLayout authentication>
          <SignOutPage />
        </AuthLayout>
      ),
      index: true
    },
    {
      path: '/signup',
      element: (
        <AuthLayout authentication={false}>
          <SignUpPage />
        </AuthLayout>
      ),
      index: true
    },
    {
      path: '/404',
      element: <NotFound />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ];

  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);

  return routes;
}
