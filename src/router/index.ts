import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '../views/Layout/index.vue';
import jwt_decode from 'jwt-decode';

Vue.use(VueRouter);

export const asyncRouterMap = [
    {
        path: '/',
        name: 'dashboard',
        component: Layout,
        hidden: true,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'home',
                meta: {title: '首页', icon: 'fa fa-home'},
                component: () => import('../views/Home.vue'),
            },
        ],
    },
    {
        path: '/dataManage',
        name: 'dataManage',
        hidden: true,
        meta: {title: '数据管理', icon: 'fa fa-database'},
        component: Layout,
        redirect: '/TableData',
        children: [
            {
                path: '/tableData',
                name: 'tableData',
                meta: {title: '表格管理', icon: 'fa fa-table'},
                component: () => import('../views/DataManage/TableData.vue'),
            },
            {
                path: '/formData',
                name: 'formData',
                meta: {title: '表单管理', icon: 'fa fa-file-text-o', roles: ['admin', 'editor']},
                component: () => import('../views/DataManage/FormData.vue'),
            },
            {
                path: '/chartsData',
                name: 'chartsData',
                meta: {title: '图表管理', icon: 'fa fa-bar-chart'},
                component: () => import('../views/DataManage/ChartsData.vue'),
            },
        ],
    },
    {
        path: '/userManage',
        name: 'userManage',
        hidden: true,
        component: Layout,
        redirect: '/accountData',
        children: [
            {
                path: '/accountData',
                name: 'accountData',
                meta: {title: '账户管理', icon: 'fa fa-user-plus', roles: ['admin']},
                component: () => import('../views/UserManage/AccountData.vue'),
            },
        ],
    },
    {
        path: '/user',
        hidden: false,
        component: Layout,
        redirect: '/userInfo',
        children: [
            {
                path: '/userInfo',
                name: 'userInfo',
                meta: {title: '个人中心'},
                component: () => import('../views/UserManage/UserInfo.vue'),
            },
        ],
    },
    {
        path: '/404',
        name: '404',
        hidden: false,
        meta: {title: '404'},
        component: () => import('../views/404.vue'),
    },
    {
        path: '/login',
        name: 'login',
        hidden: false,
        meta: {title: '系统登陆'},
        component: () => import('@/views/Login/Login.vue'),
    },
    {
        path: '/password',
        name: 'password',
        hidden: false,
        meta: {title: '忘记密码'},
        component: () => import('@/views/Login/Password.vue'),
    },
    {
        path: '*',
        redirect: '/404',
    },
];

const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
  },
  {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/Login.vue'),
  },
    {
        path: '/password',
        name: 'password',
        component: () => import('@/views/Login/Password.vue'),
    },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: asyncRouterMap,
});

router.beforeEach((to: any, from: any, next: any) => {
    const isLogin = localStorage.tsToken ? true : false;
    if (to.path == '/login' || to.path == '/password') {
        next();
    } else {
        if (isLogin) {
            const decoded: any = jwt_decode(localStorage.tsToken);
            const { key } = decoded;
            // 权限判断
            if (hasPermission(key, to)) {
                next();
            } else {
                next('/404'); // 没有权限进入
            }
        } else {
            next('/login');
        }
    }
});

/**
 * 判断是否有权限
 * @param roles 当前角色
 * @param route 当前路由对象
 * */
function hasPermission(roles: string, route: any) {
    if (route.meta && route.meta.roles) {
        // 如果meta.roles是否包含角色的key值,如果包含那么就是有权限,否则无权限
        return route.meta.roles.some((role: string) => role.indexOf(roles) >= 0);
    } else {
        // 默认不设置有权限
        return true;
    }
}

export default router;
