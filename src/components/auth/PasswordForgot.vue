<template>
  <div class="row g-0 app-auth-wrapper">
    <div class="col-12 col-md-7 col-lg-6 auth-main-col text-center p-5">
      <div class="d-flex flex-column align-content-end">
        <div class="app-auth-body mx-auto">
          <div class="app-auth-branding mb-4">
            <a class="app-logo" href="index.html">
              <img class="logo-icon me-2" src="/images/app-logo.svg" alt="logo">
            </a>
          </div>
          <h2 class="auth-heading text-center mb-4">Password Reset</h2>
          <div class="auth-intro mb-4 text-center">Enter your email address below. We'll email you a link to a page where you can easily create a new password.</div>
          <div class="auth-form-container text-left">
            <div v-for="(alert, index) in alertMessages.slice(alertMessages.length-5, alertMessages.length)" :key="index" :class="['alert', `alert-${alert?.type}`, 'alert-dismissible', 'fade', 'show']" role="alert">
              <strong>Failure:</strong> {{alert?.message}}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <form @submit.prevent="resetPassword" class="auth-form resetpass-form">
              <div class="email mb-3">
                <label class="sr-only" for="reg-email">Your Email</label>
                <input v-model="email" id="reg-email" name="reg-email" type="email" class="form-control login-email" placeholder="Your Email" required>
              </div>
              <!--//form-group-->
              <div class="text-center">
                <button type="submit" class="btn app-btn-primary btn-block theme-btn mx-auto">Reset Password</button>
              </div>
            </form>
            <div class="auth-option text-center pt-5">
              <router-link to="/" class="app-link">Sign In</router-link>
            </div>
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
      <div class="auth-background-mask"></div>
    </div>
    <!--//auth-background-col-->
  </div>
  <!--//row-->
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import AuthService from '@/services/AuthService';

  export default defineComponent({
    name: 'PasswordForgot',
    data() {
      return {
        alertMessages: [] as Array<Object>,
        email: ''
      }
    },
    mounted() {
      document.body.classList.add('app-reset-password', 'p-0');
    },
    methods: {
      async resetPassword() {
        await AuthService.resetPassword(this.email).then(response => {
          this.email = '';
          this.$router.push({name: 'authLoginPath'});
        }).catch(a => {
          this.alertMessages.push({
            message: 'Error on reset password',
            type: 'danger' //success, warning or danger
          });
        });
      }
    },
  });
</script>
