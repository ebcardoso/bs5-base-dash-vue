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
          <h2 class="auth-heading text-center mb-5">Log in to Portal</h2>
          <div class="auth-form-container text-start">
            <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="alertMessage">
              <strong>Failure:</strong> {{alertMessage}}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>

            <form @submit.prevent="signin" class="auth-form login-form">
              <div class="email mb-3">
                <label class="sr-only" for="signin-email">Email</label>
                <input v-model="username" id="signin-email" name="signin-email" type="text" class="form-control signin-email" placeholder="Username" required>
              </div>
              <!--//form-group-->
              <div class="password mb-3">
                <label class="sr-only" for="signin-password">Password</label>
                <input v-model="password" id="signin-password" name="signin-password" type="password" class="form-control signin-password" placeholder="Password" required>
                <div class="extra mt-3 row justify-content-between">
                  <div class="col-6">
                    <!-- <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="RememberPassword">
                      <label class="form-check-label" for="RememberPassword">
                        Remember me
                      </label>
                    </div> -->
                  </div>
                  <!--//col-6-->
                  <div class="col-6">
                    <div class="forgot-password text-end">
                      <router-link :to="{name:'authForgotPasswordPath'}">Forgot password?</router-link>
                    </div>
                  </div>
                  <!--//col-6-->
                </div>
                <!--//extra-->
              </div>
              <!--//form-group-->
              <div class="text-center">
                <button type="submit" class="btn app-btn-primary w-100 theme-btn mx-auto">Log In</button>
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
  import AuthService from '@/services/AuthService';
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'LoginPage',
    data() {
      return {
        alertMessage: '',
        username:'',
        password:''
      }
    },
    mounted() {
      document.body.classList.add('app-login');
      document.body.classList.add('p-0');
    },
    methods: {
      async signin() {
        await AuthService.signin(this.username, this.password).then(response => {
          this.username='';
          this.password='';
          localStorage.setItem('access_token', response.data.access);
          localStorage.setItem('refresh_token', response.data.refresh);
          this.$router.push({ name: "root" });
        }).catch(errors => {
          if ((errors.code == 'ERR_NETWORK') || (errors.response.status >= 500)) {
            this.alertMessage = 'Network error'
          } else {
            this.alertMessage = 'Wrong user or password'
          }
        });
      }
    }
  })
</script>
