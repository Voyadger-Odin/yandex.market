import {createRouter, createWebHistory} from "vue-router";
import UserPage from "@/pages/UserPage.vue";
import RegistrationPage from "@/pages/RegistrationPage.vue";

// Pages
import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import Page404 from "@/pages/Error/Page404.vue";
import FavoritesPage from "@/pages/FavoritesPage.vue";
import BasketPage from "@/pages/BasketPage.vue";
import OrdersPage from "@/pages/OrdersPage.vue";
import ItemDetailPage from "@/pages/ItemDetailPage.vue";
import ShopPage from "@/pages/ShopPage.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
        meta: {
            auth: false,
            title: 'Яндекс маркет'
        },
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage,
        meta: {
            auth: false
        },
    },
    {
        path: '/registration',
        name: 'registration',
        component: RegistrationPage,
        meta: {
            auth: false
        },
    },
    {
        path: '/profile',
        name: 'profile',
        component: UserPage,
        meta: {
            auth: true
        },
    },
    {
        path: '/orders',
        name: 'orders',
        component: OrdersPage,
        meta: {
            auth: true
        },
    },
    {
        path: '/favorites',
        name: 'favorites',
        component: FavoritesPage,
        meta: {
            auth: true
        },
    },
    {
        path: '/basket',
        name: 'basket',
        component: BasketPage,
        meta: {
            auth: true
        },
    },
    {
        path: '/shop/:id',
        name: 'shop',
        component: ShopPage,
        meta: {
            auth: false,
            title: 'Яндекс маркет'
        },
    },
    {
        path: '/:id',
        name: 'item_detail',
        component: ItemDetailPage,
        meta: {
            auth: false,
            title: 'Яндекс маркет'
        },
    },


    // 404 Page
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: Page404,
        meta: {
            auth: false
        },
    },
]

const router = createRouter({
    history: createWebHistory('/yandex.market/'),
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta?.title ?? 'Яндекс маркет'

    const accessToken = localStorage.getItem('access_token')
    if (to.meta.auth && !accessToken){
        return next({
            name: 'login'
        })
    }

    if (to.name === 'login' && accessToken){
        return next({
            name: 'profile'
        })
    }
    next()
})

export default router