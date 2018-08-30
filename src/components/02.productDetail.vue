<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
       
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                 <ProductZoomer v-if="images.normal_size.length!=0" :base-images="images" :base-zoomer-options="zoomerOptions" ></ProductZoomer>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <!-- 使用element计数器 -->
                                                <el-input-number v-model="buyCount" @change="handleChange" :min="0" :max="goodsinfo.stock_quantity" size="mini" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt"> 
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="cartAdd" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <!-- tab区域 -->
                            <!-- iView的图钉组件 -->
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a href="javascript:;" @click="showissue=false" :class="{selected:!showissue}">商品介绍</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" @click="showissue=true" :class="{selected:showissue}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <!-- 内容区域 -->
                            <div class="tab-content entry" v-show="!showissue" v-html="goodsinfo.content">
                            </div>
                            <div class="tab-content" v-show="showissue">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" v-model.trim="commentInfo" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" @click="submitCommit" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="comments.length==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.reply_time|filterDate}}</span>
                                                    <Rate v-model="value" />
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                       
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <Page :total="totalCount" show-elevator show-sizer placement="top" :page-size-opts="[5,10,20,30]" @on-change="pageChange" @on-page-size-change="pageSizeChange"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                           
                                        </div>
                                        <div class="txt-box">
                                            <router-link to="'/detail/'+item.id">
                                                 {{item.title}}
                                            </router-link>
                                           
                                            <span>{{item.add_time|filterDate}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 回到顶部 -->
        <BackTop :height="100" :bottom="200">
           <div class="top">返回顶端</div>
        </BackTop>
        <!-- 移动的小图片 -->
        <img v-if="imglist.length!=0" class="moveImg" :src="imglist[0].original_path" alt="">
    </div>
</template>
<script>
//引入jQuery
import $ from "jquery";
// 引入 axios 不是插件 不需要use
// import axios from "axios";// 
//引入moment
import moment from "moment";
export default {
  name: "detail",
  data: function() {
    return {
      productId: undefined, //产品ID
      goodsinfo: {}, //商品信息
      hotgoodslist: [], //热卖列表
      imglist: [], //图片列表
        buyCount: 0, // 购买数量: 0, //默认初始的购买数量
      showissue: false, //默认为显示商品介绍
      //放大镜设置
      zoomerOptions: {
        zoomFactor: 5, // 放大倍数
        pane: "container-round", // container-round 小放大镜
        hoverDelay: 300,
        namespace: "container-zoomer",
        move_by_click: true, // true 点击切换
        scroll_items: 7,
        choosed_thumb_border_color: "yellowgreen" // 框的颜色
      },
      // 轮播图用的图片 默认的数据格式 不支持
      // 这里的数据 需要在接口调用完毕之后 才能够获取
      images: {
        normal_size: []
      },
      //页码
      pageNum: 1,
      //页容量
      pageSize: 10,
      // 评论数据
      comments: [],
      // 总条数
      totalCount: 0,
      // 评论内容 双向数据绑定
      commentInfo: ""
    };
  },
  methods: {
    handleChange() {
      console.log("变了");
    },
    // 这里可以写抽取的方法
    getProductDetail() {
      //保存ID
      this.productId = this.$route.params.id;
      //请求网络数据 然后在页面上渲染出来
       this.$axios
        .get(
          `http://47.106.148.205:8899/site/goods/getgoodsinfo/${this.productId}`
        )
        .then(response => {
          // console.log(response);
          //保存数据
          this.goodsinfo = response.data.message.goodsinfo;
          this.hotgoodslist = response.data.message.hotgoodslist;
          this.imglist = response.data.message.imglist;
          // 处理 放大镜数据
          let temArr = [];
          //循环处理数据
          this.imglist.forEach((v, i) => {
            temArr.push({
              id: v.id,
              url: v.original_path
            });
            //把临时数组给到 images.normal_size
            this.images.normal_size = temArr;
          });
        });
    },
    // 获取评论的方法
    getComments() {
       this.$axios
        .get(`http://47.106.148.205:8899/site/comment/getbypage/goods/${this.productId}?pageIndex=${this.pageNum}&pageSize=${this.pageSize}`)
        .then(response => {
          //   console.log(response);
          this.comments = response.data.message;
          this.totalCount = response.data.totalCount;
        });
    },
    //页码的改变
    pageChange(page) {
      // console.log(page);
      // 页码改变时 重新获取数据即可
      this.pageNum = page;
      this.getComments();
    },
    //页条数的改变
    pageSizeChange(size) {
      //   console.log(size);
      this.pageSize = size;
      //如果是第一页就重新渲染数据
      if (pageNum == 1) {
        this.getComments();
      }
    },
    //发表评论提示
    submitCommit(){
        //非空判断
         if(this.commentInfo==''){
            // 直接弹框
             this.$Message.error('哥们,写点啥呗, 前端程序员不想理你 并且跑出了一个异常!!');
            return;
        }
        //发表评论
        //调用接口  site/validate/comment/post/goods/102
          this.$axios.post(`http://47.106.148.205:8899/site/validate/comment/post/goods/${this.productId}`,{
              "commenttxt":this.commentInfo 
         })
         .then(response=>{
            //  console.log(response);
             //提示用户评论成功
             this.$Message.success(response.data.message);
             //发表成功后刷新
             this.getComments();
             //清空输入框的评论
             this.commentInfo="";
         })
    },

    // 加入购物车的逻辑
    cartAdd() {
         //   数量为0提示
      if (this.buyCount == 0) {
        this.$Message.error("请输入购买数量");
        return;
      }
      // 获取加入购物车位置
      let cartOffset = $('.add').offset();
    //   console.log(cartOffset);
      // 获取购物车位置
      let targetOffset = $('.icon-cart').offset();
    //   console.log(targetOffset);
      // 使用动画的方式 移动图片
      // 移动到按钮位置 显示出来 动画移动到目标位置
      $(".moveImg").show().css(cartOffset).animate(targetOffset,function(){
          $(this).hide();
      });
      // 动画完结以后
      // 	隐藏图片
      // 	增加购物车中的显示内容

      //测试增加数据
    //   this.$store.commit('increment', 10)
     // 直接修改购物车商品数据
     this.$store.commit('addGoods', {
          goodId: this.productId,
          goodNum: this.buyCount
     })
    }
  },
  //生命周期函数
  created() {
    //调用获取的数据
    this.getProductDetail();
    //调用获取评论
    this.getComments();
  },
  watch: {
    $route(val, oldVal) {
      //   console.log('改变啦');
      // 认为让他 强制生成 v-if 数组长度
      // 数组长度为0 直接销毁
      this.images.normal_size = [];

      // 重新调用接口 获取数据 渲染页面
      // 回调函数中重新复制 再次 生成
      this.getProductDetail();
    }
  },
  //过滤器
  filters: {
    //过滤日期
    filterDate(val) {
      return moment(val).format("YYYY年MM月DD");
    }
  }
};
</script>
<style lang="less">
/* 设置 内容区域 图片样式 */
.tab-content img {
  width: 100%;
  /* 去除图片底部的 间隙 */
  display: block;
}
/*iView的样式 */
.top {
  padding: 10px;
  background: rgba(0, 153, 229, 0.7);
  color: #fff;
  text-align: center;
  border-radius: 2px;
}
/*放大镜样式*/
.pic-box {
  width: 395px;
  .control-box .thumb-list {
    display: flex;
    justify-content: center;
    img {
      width: 80px;
      height: 80px;
      margin: 2px;
    }
  }
  .control {
    //   text-align:center;
    display: flex;
    // 主轴
    justify-content: center;
    // 纵轴 副轴 侧轴
    align-items: center;
  }
}
//移动图片的样式
// 移动图片的样式
.moveImg {
  position: absolute;
  width: 50px;
  display: none;
  // top:0;
  // left:0;
}
.moveImg.move{
    transition: all 1s;
    transform: rotate(720deg);
}
</style>


