<template>
<div>
  <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                 <!-- 购物车没有商品时 -->
                                <tr v-if="message.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <!-- 购物车有商品时显示的列表 -->
                               <tr v-for="(item, index) in message" :key="item.id">
                                    <td>
                                        <el-switch v-model="item.selected" active-color="black" inactive-color="hotpink">
                                        </el-switch>
                                    </td>
                                    <td>
                                        <img style="width:65px" :src="item.img_url" alt="">
                                    </td>
                                    <td>
                                         {{item.title}}
                                    </td>
                                    <td>{{item.sell_price}}</td>
                                    <td><el-input-number size="mini" :min='1' v-model="item.buycount" @change="numChange($event,item.id)"></el-input-number></td>
                                    <td>{{item.buycount*item.sell_price}}</td>
                                    <td>
                                        <el-button @click="delOne(item.id)" type="danger" icon="el-icon-delete" circle></el-button>
                                    </td>
                                </tr>

                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{totalCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <router-link to="/index">
                              <button class="button">继续购物</button>
                            </router-link>
                            <button class="submit" @click="checkAndSubmit">立即结算</button>
                            <!-- <router-link to="/order">
                             <button class="submit" @click="checkAndSubmit">立即结算</button>
                              </router-link> -->
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>


</div>
</template>
<script>
export default {
  name: "shoppingCart",
  data: function() {
    return {
      message: []
    };
  },
  //生命周期函数
  created() {
    // 定义变量暂存一个
    //console.log(this.$store.state.cartDate);
    let cartDate = this.$store.state.cartDate;
    //定义接口得数据
    let ids = "";
    //定义拼接的数据
    for (const key in cartDate) {
      ids += key;
      ids += ",";
    }
    //去掉最后一个多余的逗号 -1,代表截取最后一个
    ids = ids.slice(0, -1);
    //调用接口获取数据
    this.$axios
      .get(`http://47.106.148.205:8899/site/comment/getshopcargoods/${ids}`)
      .then(response => {
        // console.log(response);
        response.data.message.forEach(v => {
          // 获取 Vuex中的 id对应的值
          v.buycount = cartDate[v.id];
          //设置是否被选中的状态
          v.selected = true;
        });
        //再赋值给message
        this.message = response.data.message;
      });
  },
  //计算属性
  computed: {
    //总金额
    totalPrice() {
      let totalPrice = 0;
      this.message.forEach(v => {
        if (v.selected == true) {
          totalPrice += v.sell_price * v.buycount;
        }
      });
      return totalPrice;
    },
    //总个数
    totalCount() {
      let totalCount = 0;
      this.message.forEach(v => {
        if (v.selected == true) {
          totalCount += parseInt(v.buycount);
        }
      });
      return totalCount;
    }
  },
  //方法
  methods: {
    numChange(num, id) {
      // console.log(num,id);
      //调用仓库的方法（提交载荷）
      this.$store.commit("updateGoodsNum", {
        goodId: id,
        goodNum: num
      });
    },
    //删除的方法
    delOne(id) {
      //提交载荷
      this.$store.commit("deleteGoods", id);
      this.message.forEach((v, index) => {
        if (v.id == id) {
          this.message.splice(index, 1);
        }
      });
    },
    //验证登录，跳转登录页
    checkAndSubmit() {
      //判断是否有钱
      if (this.totalCount == 0) {
        this.$message.error("哥们，你好歹买点东西啊！");
        return;
      }
      //在上面改用导航守卫去实现
      let ids = "";
      this.message.forEach(v => {
        if (v.selected == true) {
          ids += v.id;
          ids += ",";
        }
      });
      //去掉最后一个逗号
      ids = ids.slice(0, -1);
      
      this.$router.push(`/order/${ids}`);
     

      /******************************/

      // 弹框提示 loading框
      //    this.loading=true;
      //   //判断是否登录
      //   this.$axios.get("site/account/islogin").then(response => {
      //     console.log(response);
      //     if (response.data.code == "nologin") {
      //       //没有登录去登录页
      //       this.$router.push("/login");
      //     } else {
      //       //有登录去结算页
      //       this.$router.push("/order");
      //     }
      //   });
    }
  }
};
</script>
<style>
</style>


