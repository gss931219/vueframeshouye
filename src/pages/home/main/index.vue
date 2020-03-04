<template>
    <div>
        <router-view></router-view>
        <div class="buttom-nav">
             <ul :class="{nav:true, home:true, active:homeActive}" @click="goPage('/index')">
                 <li></li>
                 <li>首页</li>
             </ul>
            <ul :class="{nav:true,cart:true, active:cartActive}" @click="goPage('/cart')">
                <li></li>
                <li>购物车</li>
                <li class="spot"></li>
            </ul>
            <ul :class="{nav:true,my: true,active:myActive}" @click="goPage('/my')">
                <li></li>
                <li>我的</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "home",
        data(){
            return {
                homeActive:true,
                cartActive:false,
                myActive:false,

            }
        },
        created(){
          this.changeStyle(this.$route.path)
        },
        methods:{
            goPage(url){
                this.$router.replace(url)
                this.changeStyle(url)
            },
            changeStyle(url){
                console.log(this.$route)
                switch (url) {
                    case '/index':
                       this.homeActive=true
                       this.cartActive=false
                       this. myActive=false
                   break;

                    case '/cart':
                        this.homeActive=false
                        this.cartActive=true
                        this. myActive=false
                        break

                    case '/my':
                        this.homeActive=false
                        this.cartActive=false
                        this. myActive=true
                        break;

                    default:
                        this.homeActive=true
                        this.cartActive=false
                        this. myActive=false
                }
            }

        },
        //清除keepalive缓存
        activated(){
            this.changeStyle(this.$route.path)
            //网页的标题显示首页二字
            document.title=this.$route.meta.title
        }
    }
</script>

<style scoped>
    .buttom-nav{
        width: 100%;
        height:1.2rem;
        background-color: #ffffff;
        border-top:1px solid #cccccc;
        position: fixed;
        left:0;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 0.7rem;
        padding-right: 0.7rem;
        box-sizing: border-box;
    }
    .buttom-nav .nav{
        width: 0.9rem;
        position: relative;
    }
    .buttom-nav .nav li:nth-child(1){
        width: 0.6rem;
        height: 0.6rem;
        margin: 0 auto;
    }
    .buttom-nav .nav.active li:nth-child(2){
       color:#ff0000;

    }
    .buttom-nav .nav li:nth-child(2){
        width: 100%;
        text-align: center;
        font-size: 0.28rem;
    }
    .buttom-nav .nav.home li:nth-child(1){
         background-image:url("../../../assets/images/common/home1.png") ;
         background-size:100% ;
         background-position: center;
     }
    .buttom-nav .nav.home.active li:nth-child(1){
        background-image:url("../../../assets/images/common/home2.png") ;
        background-size:100% ;
        background-position: center;
    }

    .buttom-nav .nav.cart li:nth-child(1){
        background-image:url("../../../assets/images/common/cart1.png") ;
        background-size:100% ;
        background-position: center;
    }
    .buttom-nav .nav.cart.active li:nth-child(1){
        background-image:url("../../../assets/images/common/cart2.png") ;
        background-size:100% ;
        background-position: center;
    }

    .buttom-nav .nav .spot{
        width:0.2rem ;
        height:0.2rem ;
        background-color: red;
        border-radius: 100%;
        position:absolute;
        right: 0;
        top: 0;
    }

    .buttom-nav .nav.my li:nth-child(1){
        background-image:url("../../../assets/images/common/my1.png") ;
        background-size:100% ;
        background-position: center;
    }
    .buttom-nav .nav.my.active li:nth-child(1){
        background-image:url("../../../assets/images/common/my2.png") ;
        background-size:100% ;
        background-position: center;
    }
</style>