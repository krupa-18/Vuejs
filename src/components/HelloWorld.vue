<template>
  <div class="HelloWorld">
    <div align='center'>
      <div id="search" style=" margin-top: 60px; ">
        <input v-model="search" placeholder="search products by name">      
          <router-link  :to="{ name: 'Search', params: { term: search }}">
             <button type="button" class= "button" v-on:click="searchsubmit(search)" >Search</button>
          </router-link>          
      </div>
      <ul v-bind:key="item.id" v-for="item in list">
        <div align="center" style="cursor: pointer;padding:5;text-align=center;" @click="productdetailpage(item.id)">
            <div style="width:31%;min-height:400px;float:left;position:relative;border:2px solid #ccc;margin:10px;">
              <img v-if="item.image" :src="require(`@/assets/${item.image}`)" style="width:100%;height:250px;" />
               <p> {{ item.name }}</p>
               <p> {{ item.price }}</p>
            </div>
        </div>
      </ul>    
      </div>
  </div>
  </template>
  
<script>
  import Productdetail from './Productdetail'; 
  import Search from './Search';
  import axios from 'axios';
  
  export default {
  name: 'HelloWorld',
  data () {
    return {
      list: {},
      search: '',
      id:'',
      productid:''
    }
  },
  components: {
    Search,
    Productdetail
  },
  methods:{
  productdetailpage (id) {    
  this.productid = id;
  this.$router.push(
    {
      path: '/product-detail/'+id,
      component: Productdetail,
      props: true,
      params: {
        inputId: this.$router.id
      }
    })
    },
  searchsubmit(search) {
    if (search == '') {
      alert("please search by entering product names");
    }
    }
  },
  mounted()
  {
    axios.get('http://localhost:4000/mostpopular')
    .then((response) => {
      console.log(response.data);
      this.list = response.data;
    })
    .catch((error) =>{
      console.log(error);
    });
  }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
img {
  max-width: 300px;
  height: auto;
}
.button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 5px 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>