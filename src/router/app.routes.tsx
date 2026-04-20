import { createHashRouter, Navigate } from "react-router";

import { AdminLayout } from "@/admin/layout/AdminLayout";
import { AdminPage } from "@/admin/pages/AdminPage";
import { HomePages } from "@/heroes/home/HomePages";
import { HeroesLayout } from "@/heroes/layouts/HeroesLayout";
import { HeroPages } from "@/heroes/pages/HeroPages";
import { lazy } from "react";
// import { SearchPage } from "@/heroes/search/SearchPage";

const SearchPage = lazy(() => import('@/heroes/search/SearchPage'))

// export const appRouter = createBrowserRouter([

export const appRouter = createHashRouter([
    {
        path: '/',
        element: <HeroesLayout />,
        children: [{
            index: true,
            element: <HomePages />
        },
        {
            path: 'heroes/:idSlug',
            element: <HeroPages />
        },
        {
            path: 'search',
            element: <SearchPage />
        }],

    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [{
            index: true,
            element: <AdminPage />
        }]
    },
    {
        path: '*',
        element: <Navigate to="/" />
    }
])