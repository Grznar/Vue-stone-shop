import { createRouter, createWebHistory } from 'vue-router'
import AccessDenied from '@/views/Auth/AccessDenied.vue'
import NotFound from '@/views/Auth/NotFound.vue'
import SignUp from '@/views/Auth/SignUp.vue'
import SignIn from '@/views/Auth/SignIn.vue'
import Home from '@/views/Home/Home.vue'
import ContactUs from '@/views/Home/ContactUs.vue'
import ProductUpsert from '@/views/Product/ProductUpsert.vue'
import ProductList from '@/views/Product/ProductList.vue'

import { APP_ROUTE_NAMES } from '@/constants/routeNames.js'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home, name: APP_ROUTE_NAMES.HOME },
    { path: '/sign-up', component: SignUp, name: APP_ROUTE_NAMES.SIGN_UP },
    { path: '/sign-in', component: SignIn, name: APP_ROUTE_NAMES.SIGN_IN },
    { path: '/access-denied', component: AccessDenied, name: APP_ROUTE_NAMES.ACCESS_DENIED },
    { path: '/contact-us', component: ContactUs, name: APP_ROUTE_NAMES.CONTACT_US },
    { path: '/not-found', component: NotFound, name: APP_ROUTE_NAMES.NOT_FOUND },
    { path: '/product-list', component: ProductList, name: APP_ROUTE_NAMES.PRODUCT_LIST },
    { path: '/product-list', component: ProductUpsert, name: APP_ROUTE_NAMES.PRODUCT_CREATE },
    { path: '/product-', component: ProductUpsert, name: APP_ROUTE_NAMES.PRODUCT_CREATE },
    { path: '/product-update/:id', component: ProductUpsert, name: APP_ROUTE_NAMES.PRODUCT_UPDATE },
  ],
})

export default router
