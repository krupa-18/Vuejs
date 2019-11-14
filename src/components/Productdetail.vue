<template> 
<div>
  <div align="center">
    <table align="center" border="1" style=" margin-top: 60px; text-align: center;"> 
      <tr> 
        <td align="center" width="30%">
          <h1 align="center">
            <img v-if="list.image" :src="require(`@/assets/${list.image}`)" style="width:100%;height:250px;" />
          </h1>
        </td>
        <td>
          <table align="center" border="1" width="100%">
            <tr>
              <td align="center" colSpan = "2">
                <h1 align="center">Product Details</h1>
              </td>
            </tr>
            <tr>
              <td align="right"  width="40%">Product Name : </td>
              <td align="left"><h4>{{list.name}}</h4> </td>
            </tr>
            <tr>
              <td align="right">Product Description : </td>
              <td align="left"><h4>{{list.description}}</h4> </td>
            </tr>
            <tr>
              <td align="right">Product Amount : </td>
              <td align="left"><h4>{{list.price}}</h4> </td>
            </tr>
            <tr>
              <td align="right">Select Quantity : </td>
              <td align="left"><h4><input type="number" style="width:15%;" v-model.number="quantity" min="1"></h4> </td>
            </tr>
            <tr>
              <td align="center" colSpan = "2">
                 <div v-if="auth=='' && (token==null || token==undefined)" class="nav-item">
                  <router-link class="nav-link" to="/login" type="button" id="btn" >Login</router-link>
                  <span>Please login to add to Cart</span>
                </div>
                <div v-else>
                <Button class= "button"  @click="Addtocart()" >Add to Cart</Button>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>  
  </div>
</div>  
</template>
<script>

import axios from 'axios';
import router from '../router';
import Search from './Search';

export default {
  name: 'Productdetail',
  data() {   
    return{
      auth: '',
      token: localStorage.usertoken,
      list : {},
      cart: {},
      productid: '',
      id:'',
      auth: '',
      user: '',
      quantity: ''
    }
  },
  created() {
    this.productid = this.id = this.$route.params.id;
  },
  mounted()
  { 
    axios.get('http://localhost:4000/productdetail/'+ this.productid)
    .then((response) => {
        console.log(response.data);
        this.list = response.data;
    })
    .catch((error) =>{
        console.log(error);
    });
  },
  methods: {
  Addtocart() {
    var token = localStorage.getItem('usertoken');
    axios.post('http://localhost:4000/carts/addtocart/',
    {
      "product_id" : this.list.id,
      "product_title" : this.list.name,
      "product_description" : this.list.description,
      "product_price" : this.list.price,
      "no_of_items" : this.quantity,
      "product_logo" : this.list.image
    },
    { headers: { Authorization: `Bearer ${token}` }  
    }) 
    .then((response) => {
      console.log(response.data);
      this.cart = response.data;
      alert(response.data);
    })
    .catch((error) =>{
      console.log(error);
    });    
    },
  }   
}
</script>

<style scoped>
img {
  max-width: 300px;
  height: auto;
}
#btn {
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
