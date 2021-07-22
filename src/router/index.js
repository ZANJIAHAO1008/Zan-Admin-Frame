import { createRouter, createWebHashHistory } from 'vue-router'
import { ElLoading } from "element-plus";
import { getToken } from '../util/auth.js';

//默认不需要权限的页面
const constantRouterMap = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: "/login",
        meta: {
            title: '登录'
        },
        component: () => import("../views/Login.vue")
    },
    {
        path: "/404",
        meta: {
            title: '404'
        },
        component: () => import("../views/404.vue")
    },
    {
        path: "/403",
        meta: {
            title: '403'
        },
        component: () => import("../views/403.vue")
    }, {
        path: "/home",
        meta: {
            title: '首页'
        },
        component: () => import("../views/Home.vue"),
        children: [
            {
                path: "/homePage",
                meta: {
                    title: '个人中心'
                },
                component: () => import("../views/homePage.vue")
            },
            {
                path: "/userList",
                meta: {
                    title: '用户列表'
                },
                component: () => import("../views/user/userList.vue")
            },
            {
                path: "/table",
                meta: {
                    title: '基础表格'
                },
                component: () => import("../views/Table.vue")
            },
            {
                path: "/form",
                meta: {
                    title: '基础表单'
                },
                component: () => import("../views/Form.vue")
            },
            {
                path: "/messageCenter",
                meta: {
                    title: '消息中心'
                },
                component: () => import("../views/messageCenter.vue")
            },
        ]
    }
]

const asyncRouterMap = []

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRouterMap,
})

//手动跳转的页面白名单
const whiteList = ['/login', '/404', '/403'];

router.beforeEach((to, from, next) => {
    document.title = `后台管理系统 - ${to.meta.title} `; //添加title
    const user = getToken();//获取token to.path !== '/login'
    if (user) {
        if (to.path === '/') {
            next();
        } else {
            next();
        }
    }
    else {
        if (whiteList.includes(to.path)) {  //如果是白名单无须token则直接进入
            next();
        } else {
            ElLoading.error("无token信息 请登陆")
            next('/login')
        }

    }
});

export default router;