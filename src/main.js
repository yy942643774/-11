import Vue from 'vue'
//导入路由
import VueRouter from 'vue-router'
//导入APP根组件
import App from './App.vue'
// 导入首页的组件
import Index from './components/01.index.vue';
// 导入详情页的组件
import Detail from './components/02.productDetail.vue';
//导入购物车的组件
import ShoppingCart from './components/03.shopingCart.vue';
//引入登录页的组件 
import Login from './components/04.login.vue';
import FillOrder from './components/05.fillOrder.vue';

//引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入iView
import iView from 'iview';
import 'iview/dist/styles/iview.css';
//注册到路由
Vue.use(iView);

//导入放大镜
import ProductZoomer from 'vue-product-zoomer';
//注册到路由 
Vue.use(ProductZoomer);

//注册ElementUI到路由
Vue.use(ElementUI);

//注册VueRouter
Vue.use(VueRouter);

// 全局导入axios
import axios from 'axios';
// 配置全局基地址
// 使用axios发送请求让ajax请求头部携带cookie
axios.defaults.withCredentials=true;
axios.defaults.baseURL = 'http://47.106.148.205:8899';

// 增加到Vue的原型中
Vue.prototype.$axios = axios;

// 导入 懒加载 vue插件
import VueLazyload from 'vue-lazyload';
//注册VueLazyload到路由
Vue.use(VueLazyload, {
  preLoad: 1.3,
  //错误提示
  // error: 'dist/error.png',
  // loading: 'dist/loading.gif',
  // 图片也要当做模块导入
  loading: require('./assets/img/loadingDog.gif'),
  attempt: 1
})

// 整合 Vuex 统一进行数据管理
//导入Vuex
import Vuex from 'vuex'
//注册到路由
Vue.use(Vuex)

//实例化一个仓库来保存数据
const store = new Vuex.Store({
  //这里是我们需要的数据
  state: {
    // count: 998
    cartDate:JSON.parse(localStorage.getItem('goodkey'))||{},
    //是否已经登录
    isLogin:false,
    //来时的地址
    fromPath:''
  },
  //这个是暴露的修改方法
  mutations: {
    // increment(state,n) {
    //   // 变更状态
    //   state.count+=n
    // }
    // 增加购物车数据获取到 id 以及数量
    // 传入的数据是一个对象 格式{goodId:商品id,goodNum:数量}
    addGoods(state, goodInfo) {
      // console.log(goodInfo);
      // 保存数据[]只有用中括号对象取值 才可以 传入变量 用.语法是固定的属性名
      if (state.cartDate[goodInfo.goodId] == undefined) {
        // 传过来的id 不存在 新增这个id作为属性
        // 直接增加这个属性即可
        // state.cartDate[goodInfo.goodId] = goodInfo.goodNum;
        // 为了要让Vue检测到数据的改变同步修改页面显示 需要调用Vue.set方法
        Vue.set(state.cartDate, goodInfo.goodId, goodInfo.goodNum);
      } else {
        // 传过来的id 已经存在 累加
        state.cartDate[goodInfo.goodId] += goodInfo.goodNum;
      }
    },
    //额外的增加一个修改的方法
    // 格式约定 格式{goodId:商品id,goodNum:数量} 同上
    updateGoodsNum(state,goodInfo){
      // 直接替换
      state.cartDate[goodInfo.goodId]=goodInfo.goodNum;
    },
    //额外的增加一个修改的方法
    // 格式约定 格式{goodId:商品id,goodNum:数量} 同上
    deleteGoods(state,goodId){
      // 直接替换
      //需要调用vue.delete方法
       Vue.delete(state.cartDate,goodId);
       
    },
    //切换登录状态
    changeLoginStatus(state,isLogin){
       state.isLogin=isLogin;
    },
    // 增加一个保存来时地址的方法
    saveFromPath(state,fromPath){
      state.fromPath=fromPath;
    }
  },
  // getters vuex的计算属性
  getters: {
    goodsCount: state => {
      // 临时num
      let num = 0;
      //  循环数据对象
      for (const key in state.cartDate) {
        // console.log(key);
        num += state.cartDate[key]
      }
      // 累加总数
      // 返回总数
      return num;
    }
  }
})
//关闭浏览器时，保存到locastorage中
window.onbeforeunload=function(){
  window.localStorage.setItem('goodkey',JSON.stringify(store.state.cartDate));
}

//定义路由规则们
let routes = [
  // 默认首页也打开index
  {
    path: '/',
    // component: Index,
    // 解析到/ 直接修改路由地址为/index
    redirect: '/index'
  },
  //首页规则
  {
    path: '/index',
    component: Index,
  },
  //详情页规则
  {
    path: '/detail/:id',
    component: Detail,
  },
  //购物车规则
  {
    path:'/cart',
    component:ShoppingCart
  },
  //登录页规则
  {
    path:'/login',
    component:Login
  },
  //登录页路由(订单信息)
  {
    path:'/order/:ids',
    component:FillOrder
  }
]

// 实例化路由对象
//routes key 是固定的
let router = new VueRouter({
  routes: routes
})

//增加导航守卫
router.beforeEach((to, from, next) => {
  //每次保存呢一来时的地址
  //提交载荷 保存数据
  store.commit('saveFromPath',from.path);
  //如果访问的是order页面，判断登录
  if(to.path.indexOf('/order/')!=-1){
    //调用接口
    axios.get('/site/account/islogin').then(response=>{
      console.log(response);
      //登陆了继续访问
      if(response.data.code!='nologin'){
         //直接放在即可
         next();
      }else{
        //如果没有登录就打到登录页面
        next('/login');
      }
    })
  }else{
    //如果访问的不是订单页，直接访问即可
    next();
  }
})

Vue.config.productionTip = false

// 挂在到 Vue示例上面
new Vue({
  render: h => h(App),
  // 路由对象
  router,
  //仓库对象， 仓库的名字叫store
  store,
  //最高级别的Vue组件
  beforeCreate(){
    // console.log('你爷爷被创建了');
    axios.get("/site/account/islogin").then(response=>{
      // console.log(response);
      if(response.data.code=='logined'){
        // 登陆成功了
        store.state.isLogin = true;
      }else{
        // 没有登陆
      }
    })
  }
}).$mount('#app')