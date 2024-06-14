const AuthRoutes = {
    path: '/auth/login',
    component: () => import('@/views/authentication/Login.vue'),
    meta: {
        requiresAuth: false
    },
    children: [

        {
            name: 'Login',
            path: '/auth/login',
            component: () => import('@/views/authentication/Login.vue')
        },
        // {
        //     name: 'Register',
        //     path: '/auth/register',
        //     component: () => import('@/views/authentication/BoxedRegister.vue')
        // }
    ]
};

export default AuthRoutes;
