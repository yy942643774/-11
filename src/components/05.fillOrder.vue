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
                                <li class="active">
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
                    <div class="cart-box">
                        <el-form status-icon :model="orderForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <h2 class="slide-tit">
                                <span>1、收货地址</span>
                            </h2>
                            <div id="orderForm" name="orderForm" url="">
                                <div class="form-box address-info">
                                     <el-form-item label="收货人姓名" prop="accept_name">
                                            <el-input v-model="orderForm.accept_name" style="width:500px"></el-input>
                                        </el-form-item>
                                        <el-form-item label="所属地区" prop="">
                                            <v-distpicker @selected="selected" :province="orderForm.area.province.value" :city="orderForm.area.city.value" :area="orderForm.area.area.value"></v-distpicker>
                                            <!-- <v-distpicker province="广东省" city="广州市" area="海珠区"></v-distpicker> -->
                                           </el-form-item>
                                        <el-form-item label="详细地址" prop="address">
                                            <el-input v-model="orderForm.address" style="width:500px"></el-input>
                                        </el-form-item>
                                        <el-form-item label="手机号码" prop="mobile">
                                            <el-input v-model="orderForm.mobile" style="width:500px"></el-input>
                                        </el-form-item>
                                        <el-form-item label="联系电话">
                                            <el-input v-model="orderForm.phone" style="width:500px"></el-input>
                                        </el-form-item>
                                        <el-form-item label="电子邮箱" prop="email">
                                           <el-input v-model="orderForm.email" style="width:500px"></el-input>
                                        </el-form-item>
                                        <el-form-item label="邮政编码" prop="post_code">
                                           <el-input v-model="orderForm.post_code" style="width:500px"></el-input>
                                        </el-form-item>
                                    <!-- 原始的模板 -->
                                    <!-- <dl class="form-group">
                                    <dt>收货人姓名：</dt>
                                    <dd>
                                        <input name="book_id" id="book_id" type="hidden" value="0">
                                        <input name="accept_name" id="accept_name" type="text" class="input" value="" datatype="s2-20" sucmsg=" ">
                                        <span class="Validform_checktip">*收货人姓名</span>
                                    </dd>
                                    </dl>
                                    <dl class="form-group">
                                    <dt>所属地区：</dt>
                                    <dd>
                                        <select id="province" name="province" class="select">
                                            <option value="">所属省份</option>
                                            <option value="北京市">北京市</option>
                                            <option value="天津市">天津市</option>
                                            <option value="河北省">河北省</option>
                                            <option value="山西省">山西省</option>
                                            <option value="内蒙古自治区">内蒙古自治区</option>
                                            <option value="辽宁省">辽宁省</option>
                                            <option value="吉林省">吉林省</option>
                                            <option value="黑龙江省">黑龙江省</option>
                                            <option value="上海市">上海市</option>
                                            <option value="江苏省">江苏省</option>
                                            <option value="浙江省">浙江省</option>
                                            <option value="安徽省">安徽省</option>
                                            <option value="福建省">福建省</option>
                                            <option value="江西省">江西省</option>
                                            <option value="山东省">山东省</option>
                                            <option value="河南省">河南省</option>
                                            <option value="湖北省">湖北省</option>
                                            <option value="湖南省">湖南省</option>
                                            <option value="广东省">广东省</option>
                                            <option value="广西壮族自治区">广西壮族自治区</option>
                                            <option value="海南省">海南省</option>
                                            <option value="重庆市">重庆市</option>
                                            <option value="四川省">四川省</option>
                                            <option value="贵州省">贵州省</option>
                                            <option value="云南省">云南省</option>
                                            <option value="西藏自治区">西藏自治区</option>
                                            <option value="陕西省">陕西省</option>
                                            <option value="甘肃省">甘肃省</option>
                                            <option value="青海省">青海省</option>
                                            <option value="宁夏回族自治区">宁夏回族自治区</option>
                                            <option value="新疆维吾尔自治区">新疆维吾尔自治区</option>
                                            <option value="香港特别行政区">香港特别行政区</option>
                                            <option value="澳门特别行政区">澳门特别行政区</option>
                                            <option value="台湾省">台湾省</option>
                                            <option value="其它">其它</option>
                                        </select>
                                        <select id="city" name="city" class="select">
                                            <option value="">所属城市</option>
                                        </select>
                                        <select id="area" name="area" class="select" datatype="*" sucmsg=" ">
                                            <option value="">所属地区</option>
                                        </select>
                                        <span class="Validform_checktip">*请选择您所在的地区</span>
                                    </dd>
                                    </dl>
                                    <dl class="form-group">
                                    <dt>详细地址：</dt>
                                    <dd>
                                        <input name="address" id="address" type="text" class="input" value="" datatype="*2-100" sucmsg=" ">
                                        <span class="Validform_checktip">*除上面所属地区外的详细地址</span>
                                    </dd>
                                    </dl>
                                    <dl class="form-group">
                                    <dt>手机号码：</dt>
                                    <dd>
                                        <input name="mobile" id="mobile" type="text" class="input" value="" datatype="m" sucmsg=" ">
                                        <span class="Validform_checktip">*收货人的手机号码</span>
                                    </dd>
                                    </dl>
                                    <dl class="form-group">
                                    <dt>联系电话：</dt>
                                    <dd>
                                        <input name="telphone" id="telphone" type="text" class="input" value="">
                                        <span class="Validform_checktip">收货人的联系电话，非必填</span>
                                    </dd>
                                    </dl>
                                    <dl class="form-group">
                                    <dt>电子邮箱：</dt>
                                    <dd>
                                        <input name="email" id="email" type="text" class="input" value="">
                                        <span class="Validform_checktip">方便通知订单状态，非必填</span>
                                    </dd>
                                    </dl>
                                    <dl class="form-group">
                                    <dt>邮政编码：</dt>
                                    <dd>
                                        <input name="post_code" id="post_code" type="txt" class="input code">
                                        <span class="Validform_checktip">所在地区的邮政编码，非必填</span>
                                    </dd>
                                    </dl> -->
                                </div>
                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <el-radio v-model="orderForm.payment_id" label="1">在线支付</el-radio>
                                        <span style="color:#666">手续费：0.00元</span>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <!-- <label>
                                            <input name="express_id" type="radio" onclick="freightAmountTotal(this);" value="1" datatype="*" sucmsg=" ">
                                            <input name="express_price" type="hidden" value="20.00">顺丰快递
                                            <em>费用：20.00元</em>
                                            <span class="Validform_checktip"></span>
                                        </label> -->
                                         <el-radio @change="expressChange(20)" v-model="orderForm.express_id" label="1">顺丰快递(20元)</el-radio>
                                         <el-radio @change="expressChange(10)" v-model="orderForm.express_id" label="2">圆通快递(10元)</el-radio>
                                         <el-radio @change="expressChange(8)" v-model="orderForm.express_id" label="3">韵达快递(8元)</el-radio>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                         <tr v-for="(item, index) in message" :key="item.id">
                                            <td width="68">
                                                <!-- <a target="_blank" href="/goods/show-89.html"> -->
                                                <router-link :to="'/detail/'+item.id">
                                                    <img :src="item.img_url" class="img">
                                                </router-link>
                                                <!-- </a> -->
                                            </td>
                                            <td>
                                                <router-link :to="'/detail/'+item.id">{{item.title}} </router-link>
                                            </td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.sell_price}}
                                                </span>
                                            </td>
                                            <td align="center">{{item.buycount}}</td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.totalamount}}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <dt>订单备注(100字符以内)</dt>
                                            <dd>
                                                <!-- <textarea name="message" resize="none" class="input" style="height:35px;"></textarea> -->
                                            <el-form-item label="" prop="message">
                                                <el-input type="textarea" resize="none" :row="2" v-model="orderForm.message" style="width:500px"></el-input>
                                            </el-form-item>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">{{orderForm.goodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">{{orderForm.expressMoment}}</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">{{orderForm.goodsAmount+orderForm.expressMoment}}</label>
                                        </p>
                                        <p class="btn-box">
                                            <a class="btn button" href="/cart.html">返回购物车</a>
                                            <a id="btnSubmit" @click="sureOrder" class="btn submit">确认提交</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                         </el-form>
                    </div>
                </div>
            </div>
        </div>


</div>
</template>
<script>
//导入省市联动的插件
import VDistpicker from "v-distpicker";
export default {
  name: "order",
  components: { VDistpicker },
  //方法
  methods: {
    selected(value) {
    //   console.log(value);
      this.orderForm.area = value;
    },
    expressChange(price) {
      // console.log(price);
      this.orderForm.expressMoment = price;
    },
    //提交订单
    sureOrder(){
        //调用接口
        this.$axios.post("site/validate/order/setorder",this.orderForm)
        .then(response=>{
            console.log(response);
            //获取订单ID
            let orderid=response.data.orderid;
            //带着订单ID去支付页
            this.$route.push('/payOrder/'+orderid);
            // 删除购物车数据 删除购物车中 提交订单的数据
            this.message.forEach(v=>{
                //删除Vuex中的数据
                this.$store.commit('deleteGoods',v.id);
            })
        })
    }
  },
  //一创建就要去获取
  //生命周期函数
  created() {
    // 保存goodsids
    this.orderForm.goodsids = this.$route.params.ids;
    //获取数据渲染购物车数据
    this.$axios
      .get(`site/validate/order/getgoodslist/${this.$route.params.ids}`)
      .then(response => {
        // console.log(response);
        // 赋值数据
        this.message = response.data.message;
        // 计算总金额
        let total = 0;
        // 准备 商品id对象
        let cargoodsobj = {};
        //拼接数据
        response.data.message.forEach(v => {
          //修改数量
          v.buycount = this.$store.state.cartDate[v.id];
          //修改总金额
          v.totalamount = v.buycount * v.sell_price;
          //累加总金额
          total += v.totalamount;
          //增加一个键值对
          cargoodsobj[v.id] = v.buycount;
        });
        //赋值到数据
        this.orderForm.goodsAmount = total;
        //添加到orderForm 中
        this.orderForm.cargoodsobj = cargoodsobj;
      });
  },
  //计算属性
  computed: {
    //总数量
    totalCount() {
      let totalCount = 0;
      this.message.forEach(v => {
        totalCount += v.buycount;
      });
      return totalCount;
    }
  },
  data: function() {
    //自定义验证
    var checkMobile = (rule, value, callback) => {
      setTimeout(() => {
        // 定义正则规则
        let exec = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (exec.test(value) == true) {
          // 正确的时候干的事情
          callback();
        } else {
          callback(new Error("你的手机号不对"));
        }
      }, 1000);
    };
    //邮箱验证
    var checkEmail = (rule, value, callback) => {
      // 如果value 不为空 格式验证
      if (value.trim().length != 0) {
        //验证 邮箱规则
        let exec = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (exec.test(value) == true) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱"));
        }
      }
    };
    //邮编验证
    var checkPostCode = (rule, value, callback) => {
      // 如果value 不为空 格式验证
      if (value.trim().length != 0) {
        //验证 邮编规则
        let exec = /^[1-9]\d{5}(?!\d)$/;
        if (exec.test(value) == true) {
          callback();
        } else {
          callback(new Error("请输入正确的邮编"));
        }
      }
    };
    return {
      orderForm: {
        goodsAmount: 0,
        accept_name: "", // 收货人姓名,
        expressMoment: 20,
        address: "", // 详细地址
        mobile: "", // 手机号
        phone: "", // 联系电话
        email: "", // 邮箱
        post_code: "", // 邮编
        area: {
          province: { code: "440000", value: "广东省" },
          city: { code: "440300", value: "深圳市" },
          area: { code: "440306", value: "宝安区" }
        }, //省市区
        payment_id: "6", // 支付方式
        express_id: "1", // 快递
        message: "速度发货", //备注信息
        goodsids: "", //商品ID
        cargoodsobj: {} //购买的商品ID跟件数的关系
      },
      //服务器返回的数据
      message: [],
      rules: {
        //   需要跟字段相对应
        accept_name: [
          // required 是否必须  message 提示消息 trigger 触发的方式
          { required: true, message: "请输入收货人姓名", trigger: "blur" },
          // min 最短 max 最长 少数民族
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "change"
          }
        ],
        // 地址的验证规则
        address: [
          {
            required: true,
            message: "请输入正确的地址",
            trigger: "blur"
          }
        ],
        // 手机号验证
        mobile: [{ validator: checkMobile, trigger: "blur" }],
        // 邮箱验证
        email: [{ validator: checkEmail, trigger: "blur" }],
        // 邮编验证
        post_code: [{ validator: checkPostCode, trigger: "blur" }]
      }
    };
  },

  // 生命周期函数中判断是否登陆
  beforeCreate() {
    //
    this.$axios.get("site/account/islogin").then(response => {
      //   console.log(response);
      //如果没有打到登录页面,去到登录页面
      if (response.data.code == "nologin") {
        //编程式导航
        this.$router.push("/login");
      }
    });
  }
};
</script>
<style>
</style>


