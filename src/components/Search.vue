<template>
<div>
  <input v-model="search" placeholder="search products by name">      
  <button type="button" class= "button" v-on:click="searchsubmit(search)" >Search</button>
  <ul v-bind:key="item.id" v-for="item in list">
    <div align="center" style="cursor: pointer;padding:5;text-align=center;" @click="productdetailpage(item.id)">
        <div style="width:31%;min-height:400px;float:left;position:relative;border:2px solid #ccc;margin:10px;">
          <img v-if="item.image" :src="require(`@/assets/${item.image}`)" style="width:100%;height:350px;" />
          <p> {{ item.name }}</p>
          <p> {{ item.price }}</p>
        </div>
    </div>
  </ul>    
</div>
</template>
<script>
import axios from 'axios';
import router from '../router';
import Productdetail from './Productdetail';
export default {
  name: 'Search',
  data() {
    return {    
      term: '',
      search: '',
      list: [],
      productid:'',
      id: ''
    }
  },
  components: {
    Productdetail
  },
  created() {
    this.search = this.term = this.$route.params.term;
  },
    mounted()
  {
    axios.get('http://localhost:4000/search/' + this.search)
    .then((response) => {
      console.log(response.data);
      this.list = response.data;
    }).finally(() => this.loading = true)
    .catch((error) =>{
      console.log(error);
    });
  },
  methods: 
  { 
    productdetailpage (id) {    
    this.productid = id;
    console.log("productid:"+ this.product);
    this.$router.push(
      {
        path: '/productdetail/'+id,
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
      axios.get('http://localhost:4000/search/' + search)
      .then((response) => {
        console.log(response.data);
        this.list = response.data;
      })
      .catch((error) =>{
        console.log(error);
      });
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>