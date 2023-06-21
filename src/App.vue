<template>  
  <div v-if="currentRouteName == 'error404Path'">
    <router-view/>
  </div>
  <div v-else-if="currentRouteName == 'authLoginPath'">
    <router-view/>
  </div>
  <div v-else-if="currentRouteName == 'authForgotPasswordPath'">
    <router-view/>
  </div>
  <div v-else-if="currentRouteName == 'authResetPasswordConfirmPath'">
    <router-view/>
  </div>
  <div v-else>    
    <Header />
    <div class="app-wrapper">
      <div class="app-content pt-3 p-md-3 p-lg-4">
        <div class="container-xl">
          <div class="row g-3 mb-4 align-items-center justify-content-between">
            <div class="col-auto">
              <h1 class="app-page-title mb-0">{{pageTitle}}</h1>
            </div>
          </div> <!--//row-->

          <router-view 
            @update:setPageTitle="newValue => pageTitle = newValue" />
        </div> <!--//container-fluid-->
      </div> <!--//app-content--> 
      <Footer />
    </div> <!--//app-wrapper-->
  </div>
</template>

<script lang="ts">
  import Header from "@/components/layout/Header.vue"
  import Footer from "@/components/layout/Footer.vue"
  import { defineComponent } from "vue"

  export default defineComponent({
    components:{
      Header,
      Footer
    },
    data() {
      return {
        pageTitle:'',
      }
    },
    computed: {
      currentRouteName() {
        return this.$route.name;
      }
    }
  })
</script>
