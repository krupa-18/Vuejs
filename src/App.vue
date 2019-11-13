<template>
  <div id="app">
      <navbar></navbar>
   <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue';
import router from './router';
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    'Navbar': Navbar
  },
}
const app = new Vue({
  router,
}).$mount('#app')
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
 
}
.input-group--text-field input {
  border-bottom: 1px solid black; 
}
</style>