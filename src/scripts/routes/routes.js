import HomeComp from 'comp/home/HomeComp';
import InterestingComp from "comp/interesting/InterestingComp";
import Literature from "comp/interesting/Literature";
import Sport from "comp/interesting/Sport";
import Games from "comp/interesting/Games";
import Technology from "comp/technology/Technology";
import Contacts from "comp/contacts/Contacts";
import ErrorPage from "comp/error/ErrorPage";

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
