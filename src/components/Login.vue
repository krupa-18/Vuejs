<template>
   <div>
   <form v-on:submit.prevent="login">
        <div class="container">
            <h1>Login</h1>          
            <hr>
            
            <label for="username"><b>Username</b></label>
            <input type="text"  v-model="username" placeholder="user name" name="email" required>
            <hr>
           
            <label for="psw"><b>Password</b></label>
            <input type="password"  v-model="password" placeholder="Enter Password" name="psw" required>
            
            <hr>   
            <button type="submit" class="registerbtn">Login</button>
        </div>
        <div class="container signin">
            <p>Account doesn't exist? <a href="" @click="register()">Register</a>.</p>
        </div>      
        </form>
   </div>
</template>

<script>
import Register from './Register.vue';
import Productdetail from './Productdetail.vue'
import axios from 'axios';
import router from '../router';
import EventBus from './EventBus';

export default {
  data () {
    return {
      username: '',
      password: '',
      debug: false,
      id: 0,
    }
  },
  created() {
    this.id = this.$route.params.id;
    if(this.$route.query.debug) {
      this.debug = this.$route.query.debug;
    }
  },
  methods: {
    login () { 
    axios.post('http://localhost:4000/users/login',
    {
      username: this.username,
      password: this.password
    })
    .then((res) => {
    localStorage.setItem('usertoken', res.data)
    this.username = ''
    this.password = ''
    router.go(-1);
    // TODO: identify previous history & redirect
    // navigate() {
    //             router.go(-1);
    //         }
    // router.push({ name: 'Productdetail', params: { id: $route.params.id }});
    }).catch((err) => {
      console.log(err)
    })
    this.emitMethod()
    },
    emitMethod () {
      EventBus.$emit('logged-in', 'loggedin')
    },
    register() {    
      this.$router.push(
      {
      path: '/register',
      component: Register,
      
      })
    }
  }
}
</script>
<style>
/* body {
  font-family: Arial, Helvetica, sans-serif;
  background-color: black;
}

* {
  box-sizing: border-box;
} */

/* Add padding to containers */
.container {
  padding: 16px;
  background-color: white;
}

/* Full-width input fields */
input[type=text], input[type=password] {
  width: 50%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type=text]:focus, input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

/* Overwrite default styles of hr */
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* Set a style for the submit button */
.registerbtn {
  background-color: #4CAF50;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 50%;
  opacity: 0.9;
}

.registerbtn:hover {
  opacity: 1;
}

/* Add a blue text color to links */
a {
  color: dodgerblue;
}

/* Set a grey background color and center the text of the "sign in" section */
.signin {
  background-color: #f1f1f1;
  text-align: center;
}
</style>