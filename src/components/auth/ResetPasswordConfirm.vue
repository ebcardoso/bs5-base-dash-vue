<template>
  <div class="row g-0 app-auth-wrapper">
    <div class="col-12 col-md-7 col-lg-6 auth-main-col text-center p-5">
      <div class="d-flex flex-column align-content-end">
        <div class="app-auth-body mx-auto">
          <div class="app-auth-branding mb-4">
            <router-link to="/auth/login" class="app-logo">
              <img class="logo-icon me-2" src="/images/app-logo.svg" alt="logo">
            </router-link>
          </div>
          <h2 class="auth-heading text-center mb-5">Reset Password Confirmation</h2>
          <div class="auth-form-container text-start">
            <form @submit.prevent="resetPasswordConfirm" class="auth-form login-form">
              <div class="email mb-3">
                <label class="sr-only" for="signin-email">New Password</label>
                <input v-model="new_password" id="signin-password" name="signin-password" type="password" class="form-control signin-password" placeholder="Password" required>
              </div>
              <!--//form-group-->
              <div class="password mb-3">
                <label class="sr-only" for="signin-password">New Password Confirm</label>
                <input v-model="re_new_password" id="signin-password-confirmation" name="signin-password" type="password" class="form-control signin-password" placeholder="Password Confirmation" required>
              </div>
              <!--//form-group-->
              <div class="text-center">
                <button type="submit" class="btn app-btn-primary w-100 theme-btn mx-auto">Reset Password</button>
              </div>
            </form>
            <!-- <div class="auth-option text-center pt-5">No Account? Sign up <a class="text-link" href="signup.html" >here</a>.</div> -->
          </div>
          <!--//auth-form-container-->	
        </div>
        <!--//auth-body-->
        <footer class="app-auth-footer">
          <div class="container text-center py-3">
            <!--/* This template is free as long as you keep the footer attribution link. If you'd like to use the template without the attribution link, you can buy the commercial license via our website: themes.3rdwavemedia.com Thank you for your support. :) */-->
            <!-- <small class="copyright">Designed with <span class="sr-only">love</span><i class="fas fa-heart" style="color: #fb866a;"></i> by <a class="app-link" href="http://themes.3rdwavemedia.com" target="_blank">Xiaoying Riley</a> for developers</small> -->
          </div>
        </footer>
        <!--//app-auth-footer-->	
      </div>
      <!--//flex-column-->   
    </div>
    <!--//auth-main-col-->
    <div class="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
      <div class="auth-background-holder">
      </div>
    </div>
    <!--//auth-background-col-->
  </div>
  <!--//row-->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AuthService from '@/services/AuthService';

export default defineComponent({
  name: 'ResetPasswordConfirm',
  props: {
    uid:String,
    token:String 
  },
  data() {
    return {
      new_password: '',
      re_new_password: ''
    }
  },
  mounted() {
    document.body.classList.add('app-reset-password', 'p-0'); 
  },
  unmounted() {
    document.body.classList.remove('app-login');
    document.body.classList.remove('p-0');
  },
  methods: {
    async resetPasswordConfirm() {
      if (this.new_password.length < 8) {
        alert("Password should have at least 8 characters");
        return;
      }
      if (this.new_password != this.re_new_password) {
        alert("Password and Confirmation don't match");
        return;
      }
      
      await AuthService.resetPasswordConfirm(this.uid as string, this.token as string, 
                                             this.new_password, this.re_new_password)
            .then(response => {
              alert('Password reseted successfully.');
              this.$router.push({name: 'authLoginPath'});
            })
            .catch(e => {
              alert('Failure on reset password.');
            });
    }
  }
})
</script>
