<!-- --------------------------------------
 * 登录页面
 * @author zhoufei
 * @date 2020/3/15
-------------------------------------- --->
<template>
  <el-dialog
    width="350px"
    :visible="visible"
    @close="$emit('close')"
    append-to-body
    :close-on-click-modal="false"
    class="login"
  >
    <div slot="title">
      <el-tooltip
        placement="right-start"
        effect="light"
        :value="true"
        manual
        popper-class="login-scan-tips"
        v-if="loginWay === PHONE_LOGIN"
      >
        <div slot="content">扫码登录更安全</div>
        <div class="scan-code" @click="handleScanLoginClick">
          <img src="~@/assets/img/login_OR_code.png" alt="" />
        </div>
      </el-tooltip>

      <span
        v-else
        @click="loginWay = PHONE_LOGIN"
        class="cursor-p el-icon-arrow-left"
      >
        返回其他登录
      </span>
    </div>

    <!-- body -->
    <div v-if="loginWay === PHONE_LOGIN">
      <div class="phone-pane">
        <i class="iconfont icon-shouji"></i>
      </div>

      <!-- 表单  -->
      <el-form ref="form" :model="dataForm" :rules="rules" size="medium">
        <el-form-item prop="mobile">
          <el-input v-model="dataForm.mobile" placeholder="请输入手机号">
            <div slot="prepend">
              <i class="iconfont icon-shouji"></i>
              <el-dropdown
                size="medium"
                placement="bottom-start"
                trigger="click"
              >
                <span class="phone-prefix">
                  +{{ dataForm.phonePrefix }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>

                <el-dropdown-menu slot="dropdown" style="width:243px;">
                  <el-scrollbar style="height: 240px;">
                    <div v-for="(item, index) in 20" :key="index">
                      <el-dropdown-item flex="main:justify">
                        <span>中国</span>
                        <span>+86</span>
                      </el-dropdown-item>
                      <el-dropdown-item flex="main:justify">
                        <span>中国香港</span>
                        <span>+852</span>
                      </el-dropdown-item>
                      <el-dropdown-item flex="main:justify">
                        <span>中国澳门</span>
                        <span>+853</span>
                      </el-dropdown-item>
                      <el-dropdown-item flex="main:justify">
                        <span>中国台湾</span>
                        <span>+886</span>
                      </el-dropdown-item>
                    </div>
                  </el-scrollbar>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="dataForm.password"
            type="password"
            :show-password="false"
            placeholder="请输入密码"
            prefix-icon="icon-mima iconfont"
            class="password-input"
          >
            <span slot="suffix" class="reset-password">重设密码</span>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="autoLogin">自动登录</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="w-full" @click="handleMobileLogin" type="primary">{{
            logging ? '登录中...' : '登录'
          }}</el-button>
        </el-form-item>
        <el-form-item class="tc">
          <a href="javascript:;" class="register" @click="handleRegister"
            >注册</a
          >
        </el-form-item>
      </el-form>
      <!-- 表单  -->

      <!-- 第三方登录 -->
      <ul class="other-login" flex="main:justify cross:center">
        <li
          class="other-login-item weixin"
          title="微信"
          @click="handleOtherLogin"
        >
          <i class="iconfont icon-weixin"></i>
        </li>
        <a
          href="https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=100495085&response_type=code&redirect_uri=http://localhost:8080/#/discover&checkToken=9ca17ae2e6ffcda170e2e6eeadc75b89ee9cd2c46eaeb48ea2c85b939f8faeb5548396aad0ea73edb98d93d22af0feaec3b92a93a68dadeb7d97baf78cd84a829f9ab7d54e8eae9ca2c948f6e7f7d7c55fb4a6ee9e"
          target="_blank"
        >
          <li class="other-login-item QQ" title="QQ">
            <i class="iconfont icon-QQ"></i></li
        ></a>

        <li class="other-login-item weibo" title="微博">
          <i class="iconfont icon-weibo"></i>
        </li>
        <li class="other-login-item wangyi" title="网易">
          <i class="iconfont icon-douban"></i>
        </li>
      </ul>
      <!-- 第三方登录 #end -->
    </div>
    <!-- body #end -->

    <!-- 扫码登录 -->
    <ScanCodeLogin v-if="loginWay === SCAN_CODE_LOGIN" />

    <!-- Terms 服务条款 -->
    <div class="clause" slot="footer" v-if="loginWay === PHONE_LOGIN">
      <el-checkbox v-model="agree">同意</el-checkbox>
      <a href="https://st.music.163.com/official-terms/service" target="_blank"
        >《服务条款》</a
      >
      <a href="https://st.music.163.com/official-terms/privacy" target="_blank"
        >《隐私政策》</a
      >
      <a href="https://st.music.163.com/official-terms/children" target="_blank"
        >《儿童隐私政策》</a
      >
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form } from 'element-ui'
import { phoneLogin } from '@/api'
import { setAccessToken } from '@/utils'
import ScanCodeLogin from './ScanCodeLogin.vue'

@Component({
  components: { ScanCodeLogin }
})
export default class Login extends Vue {
  // @ts-ignore
  $refs: {
    form: Form
  }
  SCAN_CODE_LOGIN = 'scan_code_login'
  PHONE_LOGIN = 'phone_login'
  loginWay = 'phone_login' // 主页手机登录

  visible = true
  autoLogin = false
  agree = false
  logging = false // 登录中

  dataForm = {
    mobile: '18385328739',
    // mobile: '',
    password: 'zhoufei@703669',
    // password: '',
    phonePrefix: '86'
  }
  rules = {
    mobile: [
      {
        required: true,
        message: '请输入手机号',
        trgger: 'blur'
      }
    ],
    password: []
  }

  // 手机登录
  handleMobileLogin() {
    this.$refs.form.validate(v => {
      if (this.logging) return
      if (v) {
        this.logging = true
        phoneLogin(this.dataForm.mobile, this.dataForm.password)
          .then(res => {
            console.log('登录 res: ', res)
            if (res.code === 200) {
              setAccessToken(res.token)
              this.$notify({
                title: '提示',
                message: '登录成功',
                type: 'success'
              })
              setTimeout(() => {
                this.visible = false
              }, 0)
            }
          })
          .finally(() => {
            this.logging = false
          })
      }
    })
  }

  // 扫码登录
  handleScanLoginClick() {
    this.loginWay = this.SCAN_CODE_LOGIN
  }

  // 其他方式登录
  handleOtherLogin() {}

  // 注册
  handleRegister() {}
}
</script>
