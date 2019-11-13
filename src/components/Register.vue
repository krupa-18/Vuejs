<template>
    <div>
        <form v-on:submit.prevent="register">
        <div class="container">
            <h1>Register</h1>          
            <hr>
            <label for="name"><b>Name</b></label>
            <input type="text"  v-model="name" placeholder="name" name="email   " required>
            <hr>
            <label for="username"><b>Username</b></label>
            <input type="text"  v-model="username" placeholder="user name" name="email" required>
            <hr>
            <label for="email"><b>Email</b></label>
            <input type="text"  v-model="email" placeholder="Enter Email" name="email" required>
            <hr>
            <label for="psw"><b>Password</b></label>
            <input type="password"  v-model="password" placeholder="Enter Password" name="psw" required>
         
            <hr>   
            <button type="submit" class="registerbtn">Register</button>
        </div>
        </form>
    </div>   
</template>


<script>
import Login from './Login.vue';
import axios from 'axios';
import router from '../router';
export default {
   components: {
      Login   
    },
  data () {
    return {
      name: '',
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      axios.post('http://localhost:4000/users/register',
        {
          name: this.name,
          username: this.username,
          email: this.email,
          password: this.password
        }
      ).then((res) => {
        router.push({ name: 'Login' })
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
body {
  font-family: Arial, Helvetica, sans-serif;
  background-color: black;
}

* {
  box-sizing: border-box;
}

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