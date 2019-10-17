import Vue from 'vue';

// 使用VueRouter步骤
// 1.引入vue-router
import VueRouter from 'vue-router';

// 2.使用(安装)vue-router（VueRouter是作为插件增强Vue的功能）
Vue.use(VueRouter);

// 引入页面组件
import Home from '../pages/Home.vue';
<<<<<<< HEAD
import management from '../pages/management.vue';
=======
import Goods from '../pages/Goods.vue';
<<<<<<< HEAD
import Management from '../pages/management.vue'
=======
import Management from '../pages/Management.vue'
>>>>>>> b2e8774b2246b3d46015e5e663bbcd838ef75d5d
>>>>>>> b0e439da88c14d22b298d662024958f4b5b8df5f


// 3. 实例化router并配置参数
let router = new VueRouter({
    // mode:'hash',
    // 配置参数：不同的 URL 显示不同的内容
    routes: [
        // 首页
        {
            name: 'home',
            path: '/home',  //当浏览器地址为/home时，显示Home组件的内容
            component: Home
        },
        {
            path: '/',  //当浏览器地址为/home时，显示Home组件的内容
            redirect: '/home'
        },
        // 购物车
        {
<<<<<<< HEAD
            name: 'management',
            path: '/management',
            component: management
=======
            name: 'goods',
            path: '/Goods',
            component: Goods
        },
        // 购物车
        {
            name: 'management',
            path: '/management',
            component: Management
>>>>>>> b2e8774b2246b3d46015e5e663bbcd838ef75d5d
        }
    ]
});

// 5.在组件中使用VueRouter

export default router;