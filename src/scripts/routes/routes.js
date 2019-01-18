import HomeComp from 'comp/screens/home/HomeComp';
import Header from 'comp/shared/Header';
import Footer from 'comp/shared/Footer';
import InterestingComp from "comp/screens/interesting/InterestingComp";
import Literature from "comp/screens/interesting/Literature";
import Sport from "comp/screens/interesting/Sport";
import Games from "comp/screens/interesting/Games";
import Technology from "comp/screens/technology/Technology";
import Contacts from "comp/screens/contacts/Contacts";
import ErrorPage from "comp/screens/error/ErrorPage";

export const routes = [{
        path: '/',
        exact: true,
        component: HomeComp,
    },
    {
        path: '/technology',
        exact: true,
        component: Technology,
    },
    {
        path: '/interesting',
        exact: true,
        component: InterestingComp,
    },
    {
        path: '/interesting/literature',
        exact: true,
        component: Literature,
    },
    {
        path: '/interesting/sport',
        exact: true,
        component: Sport,
    },
    {
        path: '/interesting/games',
        exact: true,
        component: Games,
    },
    {
        path: '/contacts',
        exact: true,
        component: Contacts,
    },
    {
        path: '*',
        component: ErrorPage
    }
];
