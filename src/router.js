import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import IndexPage from  './pages/home/main/index'
import HomeIndex from  './pages/home/index/index'
import cartIndex from  './pages/home/cart/index'
import myIndex from './pages/user/my/index'
import loginPage from './pages/home/login/index'
import regPage from './pages/home/reg/index'
import classifyIndex from './pages/home/goods/classify'




export default new Router({
    mode:"hash", //1、hash哈希：有#号。2、history历史：没有#号
    base:process.env.BASE_URL, //自动获取根目录路径
    routes:[
        {
            path:"/",
            name:"home",
            component:IndexPage,
            redirect:"index",
            children:[
                {
                    path:"index",
                    name:"index",
                    component:HomeIndex,
                    meta:{keepAlive:true,title:"首页"}
                },
                {
                    path:"cart",
                    name:"cart",
                    component:cartIndex,
                    meta:{keepAlive:false,title:"购物车"}

                },
                {
                    path:"my",
                    name:"my",
                    component:myIndex,
                    meta:{keepAlive:false,auth:false,title:"我的"}
                },
                {
                    path:"goods/classify",
                    name:"classify",
                    component:classifyIndex

                },
            ]
        },
        {
            path:"/login",
            name:"login",
            component:loginPage,
            meta:{keepAlive:true}
        },
        {
            path:"/reg",
            name:"reg",
            component:regPage,
            meta:{keepAlive:false}

        }

    ]
})
