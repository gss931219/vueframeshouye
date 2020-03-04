<template>
   <div>
       <div class="page">
           <!--头部部分  +  搜索 +登录  点击-->
           <header :class="{header:true,red:isHeadRed}">
               <div class="classify-icon" @click="goPage('/goods/classify')"></div>
               <div class="search-wrap">
                   <div class="search-icon"></div>
                   <div class="search-input">请输入宝贝名称</div>
               </div>
               <div class="login">登录</div>
               <!--<div class="my"></div>-->
           </header>
           <!--轮播图部分  运用 swiper 插件-->
           <div class="swiper-main">
               <div ref="swiper-container" class="swiper-container">
                   <div class="swiper-wrapper">
                       <div class="swiper-slide" v-for="(item,index) in slides" :key="index"><img :src="item.image" :alt="item.title"></div>
                   </div>
                   <div ref="swiper-pagination" class="swiper-pagination"></div>
               </div>
           </div>
            <!--菜单部分 潮流女装-->
           <div class="quick-nav">
               <ul v-for="(item,index) in navs" :key="index">
                   <li><img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item.image" :alt="item.title"></li>
                   <li>{{item.title}}</li>
               </ul>
           </div>
           <!--潮流女装-->
           <template v-for="(item,index) in goods">
               <div class="goods-wrap" :key="index" v-if="(index+1)%2==1">
                   <!--潮流女装大标题-->
                  <div :class="'goods-name-'+index">—— {{item.title}} ——</div>
                    <!--内容部分-->
                   <div class="goods-level-1">
                       <!--左边部分-->
                       <div class="goods-list" @click="goPage('/goods/details')">
                           <div class="goods-title">{{item.items && item.items[0].title}}</div>
                           <div class="tip">火爆开售</div>
                           <div :class="'price-'+(index+1)">{{item.items && item.items[0].price}}元</div>
                           <div class="image"><img :src="item.items[0].image" :data-echo="item.items && item.items[0].image" alt=""></div>
                       </div>
                       <!--右边部分-->
                       <div class="goods-list-2">
                           <!--判断线 :class="index2==1?'goods-row noline':'goods-row'"-->
                           <div :class="index2==1?'goods-row noline':'goods-row'" v-for="(item2,index2) in item.items.slice(1,3)" :key="index2">
                               <div class="goods-title">{{item2.title}}</div>
                               <div class="tip">品质精挑</div>
                               <div class="image"><img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item2.image" alt=""></div>
                           </div>
                       </div>
                   </div>
                        <!--下面小白鞋部分-->
                   <div class="goods-level-2">
                       <div class="goods-list" v-for="(item2,index2) in item.items.slice(3)" :key="index2">
                           <div class="goods-title">{{item2.title}}</div>
                           <div class="image"><img src="../../../assets/images/common/lazyImg.jpg"  :data-echo="item2.image"  :alt="item2.title"></div>
                           <div class="price">¥{{item2.price}}</div>
                           <div class="line-price">¥{{item2.price*2}}</div>
                       </div>
                   </div>
               </div>
                <!--品牌男装部分-->
               <div class="goods-wrap" :key="index" v-else>
                   <div class="goods-name-1">—— {{item.title}} ——</div>
                   <!--品牌男装上面部分-->
                   <div class="goods-level-1">
                       <div class="goods-column" v-for="(item2,index2) in item.items.slice(0,2)" :key="index2">
                           <div class="goods-title">{{item2.title}}</div>
                           <div class="tip">精品打折</div>
                           <div class="image"><img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item2.image" :alt="item2.title"></div>
                       </div>
                   </div>
                   <!--品牌男装下面部分-->
                   <div class="goods-level-2">
                       <div class="goods-list" v-for="(item2,index2) in item.items.slice(2)" :key="index2">
                           <div class="goods-title">{{item2.title}}</div>
                           <div class="image"><img  src="../../../assets/images/common/lazyImg.jpg"  :data-echo="item2.image"  alt=""></div>
                           <div class="price">¥{{item2.price}}</div>
                           <div class="line-price">¥{{item2.price*2}}</div>
                       </div>
                   </div>
               </div>
           </template>
           <!--为你推荐部分-->
           <div class="reco-wrap">
               <div class="reco-title">
                   <div class="reco-icon"></div>
                   <div class="reco-text">为你推荐</div>
               </div>
           </div>
            <div class="goods-recom">
                <div class="goods-list" v-for="(item,index) in recoGoods" :key="index">
                    <div class="image"><img src="../../../assets/images/common/lazyImg.jpg"  :data-echo="item.image" alt=""></div>
                    <div class="goods-title">{{item.title}}</div>
                    <div class="price">¥{{item.price}}</div>
                </div>
            </div>
       </div>
       <!-- 首页<br/>
        <span @click="$router.push('/login')">会员登录</span><br/>
        <span @click="$router.push('/reg')">会员注册</span>-->
    </div>

</template>
<script>
    import Swiper from '../../../components/swiper/swiper'
    import {lazyImg} from '../../../assets/js/utils'
    export default {
        name: "index",
        data(){
            return {
                isHeadRed:false,
                slides:[],
                navs:[],
                goods:[],
                recoGoods:[]

            }
        },
        methods:{
            goPage(url){
                this.$router.push(url);
            },
            setScrollTop(){
                let scrollTop= document.body.scrollTop ||document.documentElement.scrollTop;
                if(scrollTop>100){
                    this.isHeadRed=true;
                }else{
                    this.isHeadRed=false
                }
            },
            getSwiper(){
                this.$request(this.$config.baseApi+"/home/index/slide?token="+this.$config.token).then(res=>{
                    if(res.code==200){
                        this.slides=res.data;
                        //this.$nextTick获取dom
                        this.$nextTick(()=>{
                            new Swiper(this.$refs['swiper-container'], {
                                autoplay: 3000,//可选选项，自动滑动
                                pagination : this.$refs['swiper-pagination'],
                                paginationClickable :true, //
                                autoplayDisableOnInteraction : false  //自动滑动
                            })
                        });
                    }
                })
            },
            getNav(){
                this.$request(this.$config.baseApi+"/home/index/nav?token="+this.$config.token).then(res=>{
                    if(res.code==200){
                        this.navs=res.data;
                        this.$nextTick(()=>{
                            lazyImg();
                        });
                    }
                })
            },
            //获取商品
            getGoods(){
                this.$request(this.$config.baseApi+"/home/index/goodsLevel?token="+this.$config.token).then(res=>{
                    if(res.code==200){
                        this.goods=res.data;
                        this.$nextTick(()=>{
                            lazyImg();
                        });
                    }
                })
            },
            getRecoGoods(){
                this.$request(this.$config.baseApi+"/home/index/recom?token="+this.$config.token).then(res=>{
                    console.log(res)
                    if(res.code==200){
                        this.recoGoods=res.data;
                        this.$nextTick(()=>{
                            lazyImg();
                        });
                    }
                })

            }



        },
        created(){
            this.getSwiper();
            this.getNav();
            this.getGoods();
            this.getRecoGoods();

        },
        mounted(){
            document.title=this.$route.meta.title
           /* window.onscroll=()=>{
               let scrollTop= document.body.scrollTop ||document.documentElement.scrollTop;
               if(scrollTop>100){
                   this.isHeadRed=true;
               }else{
                   this.isHeadRed=false
               }
            }*/
           window.addEventListener("scroll",this.setScrollTop)
        },
        destroyed(){
            window.removeEventListener("scroll",this.setScrollTop)

        }
    }
</script>

<style scoped>

    @import "../../../components/swiper/swiper.css";

    .page{width:100%;min-height:100vh;margin-bottom:1.2rem;}
    .header{width:100%;height:1rem;background:linear-gradient(rgba(1, 1, 1, 0.2) 0%, rgba(255, 255, 255, 0) 100%);position: fixed;z-index:5;left:0;top:0;display:flex;padding-top:0.1rem;}
    .header.red{background:linear-gradient(rgb(235, 22, 37) 0%, rgba(255, 255, 255, 0) 100%)}
    .header .classify-icon{width:0.6rem;height:0.6rem;background-image:url("../../../assets/images/common/class.png");background-size:100%;background-repeat: no-repeat;background-position: center;margin-left:0.2rem;margin-right:0.3rem;}
    .header .search-wrap{width:70%;height:0.52rem;background-color:rgba(255,255,255,0.6);margin-right:0.2rem;border-radius: 5px;display:flex;}
    .header .login{font-size:0.32rem;color:#FFFFFF;}
    .header .my{width:0.6rem;height:0.6rem;background-image:url("../../../assets/images/home/index/my.png");background-position: center;background-size:100%;}
    .header .search-icon{width:0.68rem;height:0.52rem;background-image:url("../../../assets/images/common/search.png");background-size:70%;background-repeat: no-repeat;background-position: center;}
    .header .search-input{width:85%;height:100%;color:#FFFFFF;font-size:0.28rem;line-height:0.52rem;}
    /*轮播图*/
    .swiper-main{width:100%;height:3.64rem;}
    .swiper-main,.swiper-main img{width:100%;height:100%;}
    /*菜单部分*/
    .quick-nav{width:100%;height:1.6rem;background-color:#FFFFFF;margin-top:0.2rem;align-items: center;display:flex;justify-content: space-between;}
    .quick-nav ul{width:1.4rem;}
    .quick-nav ul li:nth-child(1){width:0.8rem;height:0.8rem;margin:0 auto;}
    .quick-nav ul li:nth-child(1) img{width:100%;height:100%;}
    .quick-nav ul li:nth-child(2){width:100%;text-align:center;font-size:0.28rem;color:#7b7f82;margin-top:0.1rem;}
    /*商品内容部分 潮流女装  男装 电脑 */
    .goods-wrap{width:100%;height:7.36rem;background-color:#FFFFFF;margin-top:0.3rem;}
    .goods-wrap .goods-name-0{width:100%;height:0.62rem;color:#f73b61;font-size:0.32rem;text-align:center;line-height:0.62rem;}
    .goods-wrap .goods-level-1{width:100%;height:3.5rem;border-top:#CCCCCC 1px solid;border-bottom:1px solid #CCCCCC;display:flex;}

    .goods-wrap .goods-level-1 .goods-list{width:50%;height:100%;border-right:1px solid #CCCCCC;position:relative;}
    .goods-wrap .goods-level-1 .goods-list .goods-title{width:95%;height:0.4rem;position: absolute;z-index:1;left:0.1rem;top:0.2rem;overflow:hidden;font-size:0.28rem;font-weight: bold;}
    .goods-wrap .goods-level-1 .goods-list .tip{width:auto;height:auto;position: absolute;left:0.1rem;top:0.6rem;font-size:0.24rem;color:#cb385d}
    .goods-wrap .goods-level-1 .goods-list .price-1{width:0.8rem;height:0.4rem;border-radius: 10px;color:#FFFFFF;font-size:0.24rem;text-align:center;line-height:0.4rem;background-color:#f21d4f;position:absolute;right:0.7rem;top:0.6rem;}
    .goods-wrap .goods-level-1 .goods-list .price-3{width:0.8rem;height:0.4rem;border-radius: 10px;color:#FFFFFF;font-size:0.24rem;text-align:center;line-height:0.4rem;background-color:#5fc600;position:absolute;right:0.7rem;top:0.6rem;}
    .goods-wrap .goods-level-1 .goods-list .image{width:3rem;height:2rem;position: absolute;left:0.4rem;bottom:0.3rem;}
    .goods-wrap .goods-level-1 .goods-list .image img{width:100%;height:100%;}
    .goods-wrap .goods-level-1 .goods-list-2{width:50%;height:100%;}
    .goods-wrap .goods-list-2 .goods-row{width:100%;height:49.5%;border-bottom: 1px solid #CCCCCC;position: relative;z-index:1;}
    .goods-wrap .goods-list-2 .goods-row.noline{border-bottom: 0px;}
    .goods-wrap .goods-list-2 .goods-row .goods-title{width:55%;height:0.4rem;font-size:0.28rem;overflow:hidden;position:absolute;top:0.2rem;left:0.2rem;font-weight: bold;}
    .goods-wrap .goods-list-2 .goods-row .tip{font-size:0.28rem;color:#7b7f82;position:absolute;left:0.2rem;top:0.6rem;}
    .goods-wrap .goods-list-2 .goods-row .image{width:1.2rem;height:1.2rem;position:absolute;right:0.2rem;top:0.3rem;}
    .goods-wrap .goods-list-2 .goods-row .image img{width:100%;height:100%}
    .goods-wrap .goods-level-2{width:100%;display:flex;}
    .goods-wrap .goods-level-2 .goods-list{width:25%;height:3.2rem;border-right:1px solid #CCCCCC;}
    .goods-wrap .goods-level-2 .goods-title{width:100%;height:0.4rem;font-size:0.28rem;overflow:hidden;font-weight: bold;text-align: center;margin-bottom:0.2rem;margin-top:0.1rem;}
    .goods-wrap .goods-level-2 .goods-list .image{width:1.5rem;height:1.5rem;margin:0 auto;margin-bottom:0.2rem;}
    .goods-wrap .goods-level-2 .goods-list .image img{width:100%;height:100%;}
    .goods-wrap .goods-level-2 .goods-list .price{color:#d32a4e;font-size:0.28rem;text-align:center;}
    .goods-wrap .goods-level-2 .goods-list .line-price{color:#7b7f82;font-size:0.28rem;text-align:center;text-decoration: line-through;}

    .goods-wrap .goods-name-1{width:100%;height:0.62rem;font-size:0.32rem;text-align:center;line-height:0.62rem;color:#fe6719}

    .goods-wrap .goods-level-1 .goods-column{width:50%;border-right:1px solid #CCCCCC;}
    .goods-wrap .goods-level-1 .goods-column .goods-title{width:90%;height:0.4rem;text-align:center;font-size:0.28rem;font-weight: bold;overflow:hidden;margin:0 auto;margin-top:0.2rem;}
    .goods-wrap .goods-level-1 .goods-column .tip{width:100%;color:#7b7f82;font-size:0.24rem;text-align:center;margin-top:0.1rem;}
    .goods-wrap .goods-level-1 .goods-column .image{width:1.8rem;height:2rem;margin:0 auto;margin-top:0.2rem;}
    .goods-wrap .goods-level-1 .goods-column .image img{width:100%;height:100%;}

    .goods-wrap .goods-name-2{width:100%;height:0.62rem;font-size:0.32rem;text-align:center;line-height:0.62rem;color:#5fc600}
        /*为你推荐*/
    .reco-wrap{width:100%;height:1rem;display: flex;align-items: center;justify-content: space-between;}
    .reco-wrap:before{display:block;content:'';width:31%;height:1px;background:#CCCCCC;}
    .reco-wrap:after{display:block;content:'';width:31%;height:1px;background:#CCCCCC;}
    .reco-wrap .reco-title{width:2.36rem;display:flex;margin-left:0.4rem;}
    .reco-wrap .reco-icon{width:0.4rem;height:0.4rem;background-image:url("../../../assets/images/home/index/recom.png");background-size:100%;background-position: center;background-repeat: no-repeat;margin-right:0.2rem;}
    .reco-wrap .reco-text{font-size:0.34rem;}

    .goods-recom{width:100%;display:flex;flex-wrap: wrap;justify-content: space-between;box-sizing: border-box;padding-left:2%;padding-right:2%;}
    .goods-recom .goods-list{width:48%;height:4.5rem;background-color:#FFFFFF;margin-bottom:0.3rem;}
    .goods-recom .goods-list .goods-title{width:95%;height:0.7rem;font-size:0.28rem;overflow:hidden;margin-top:0.2rem;}
    .goods-recom .goods-list .image{width:2.8rem;height:2.8rem;margin:0 auto;margin-top:0.3rem;}
    .goods-recom .goods-list .image img{width:100%;height:100%;}
    .goods-recom .goods-list .price{font-size:0.32rem;color:#d32a4e;margin-top:0.1rem;}


</style>
