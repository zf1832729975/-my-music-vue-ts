<!-- --------------------------------------
 * 登录页面
 * @author zhoufei
 * @date 2020/3/15
-------------------------------------- --->
<template>
  <el-dialog :visible="true" @close="$emit('close')" append-to-body>
    <el-form ref="form" :model="dataForm" :rules="rules">
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="dataForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="dataForm.password"
          type="password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item class="tr">
        <el-button @click="handleLogin" type="primary">登录</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form } from 'element-ui'
import { phoneLogin } from '@/api'
import { setAccessToken } from '@/utils'

@Component
export default class Login extends Vue {
  // @ts-ignore
  $refs: {
    form: Form
  }
  dataForm = {
    mobile: '18385328739',
    password: 'zhoufei@703669'
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

  handleLogin() {
    this.$refs.form.validate(v => {
      if (v) {
        // this.
        phoneLogin(this.dataForm.mobile, this.dataForm.password).then(res => {
          console.log('登录 res: ', res)
          if (res.code === 200) {
            setAccessToken(res.token)
          }
          // if ()
        })
      }
    })
  }
}
</script>
