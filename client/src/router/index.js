import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/pages/Login.vue';
import Home from '@/pages/Home.vue';
import User from '@/pages/User.vue';
import UserHome from '@/components/UserHome.vue';
import UserList from '@/components/UserList.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      isPublic: true,
    },
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/user',
    component: User,
    children: [
      {
        path: '',
        name: 'userHome',
        component: UserHome,
      },
      {
        path: 'all',
        name: 'userList',
        component: UserList,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

// ログイン後リロードしてもユーザー情報が保持されるようになる
// ログインしていない状態で/userや/homeにはアクセスできずに/loginにリダイレクトされる
router.beforeEach(async (to, from, next) => {
  // 初回アクセスの場合
  // アクセス先が/loginかつ、初回なのでfrom.nameがない場合、next()につなげる
  if (to.name === 'login' && !from.name) {
    return next();
  }

  // console.log(store);
  // 下記２行でユーザーが認証済かどうかを取得
  await store.dispatch('user/checkAuthenticated');
  const isAuthenticated = store.getters['user/isAuthenticated'];
  // console.log(store.getters);

  // isPublic でない場合(=認証が必要な場合)、かつ、ログインしていない場合
  if (!to.meta.isPublic && !isAuthenticated) {
    return next({
      name: 'login',
    });
  }

  // ログイン済みのユーザーはログインページにアクセスできないようにする
  if (to.name === 'login' && isAuthenticated) {
    return next({
      name: 'home',
    });
  }
  return next();
});


export default router;
