<template>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
  <form >
    <h4 style=" padding-bottom: 2px; text-align: center; color: green;">CHECKOUT FORM</h4>
    <div class="row">
      <div class="col-75">
        <div class="container">
        <div class="row">
          <div class="col-50">
            <h3>Billing Address</h3>
            <label for="fname"><i class="fa fa-user"></i> Full Name</label>
            <input type="text" v-model="b_name" id="fname" name="firstname" placeholder="John M. Doe" required>
            <label for="email"><i class="fa fa-envelope"></i> Email</label>
            <input type="text" v-model="b_email" id="email" name="email" placeholder="john@example.com">
            <label for="phone"><i class="fa fa-phone"></i> Phone Number</label>
            <input type="text" v-model="b_mobile" id="phone" name="phone" placeholder="9874561232">
            <label for="adr"><i class="fa fa-address-card-o"></i> Address</label>
            <input type="text" v-model="b_address" id="adr" name="address" placeholder="542 W. 15th Street">
            <label for="city"><i class="fa fa-institution"></i> City</label>
            <input type="text" v-model="b_city" id="city" name="city" placeholder="New York">
            <div class="row">
              <div class="col-50">
                <label for="state">State</label>
                <input type="text" v-model="b_state" id="state" name="state" placeholder="NY">
              </div>
              <div class="col-50">
                <label for="zip">Zip</label>
                <input type="text" v-model="b_zipcode" id="zip" name="zip" placeholder="10001">
              </div>
            </div>
          </div>
          <div class="col-50">
            <h3>Shipping Address</h3>
            <label for="fname"><i class="fa fa-user"></i> Full Name</label>
            <input type="text" v-model="s_name" id="fname" name="firstname" placeholder="John M. Doe">
            <label for="email"><i class="fa fa-envelope"></i> Email</label>
            <input type="text" v-model="s_email" id="email" name="email" placeholder="john@example.com">
            <label for="phone"><i class="fa fa-phone"></i> Phone Number</label>
            <input type="text" v-model="s_mobile" id="phone" name="phone" placeholder="9874561232">
            <label for="adr"><i class="fa fa-address-card-o"></i> Address</label>
            <input type="text" v-model="s_address" id="adr" name="address" placeholder="542 W. 15th Street">
            <label for="city"><i class="fa fa-institution"></i> City</label>
            <input type="text" v-model="s_city" id="city" name="city" placeholder="New York">
            <div class="row">
              <div class="col-50">
                <label for="state">State</label>
                <input type="text" v-model="s_state" id="state" name="state" placeholder="NY">
              </div>
              <div class="col-50">
                <label for="zip">Zip</label>
                <input type="text" v-model="s_zipcode" id="zip" name="zip" placeholder="10001">
              </div>
            </div>
          </div>       
        </div>
        <label>
          <input type="checkbox" @change="handleChecked()" name="sameadr"> Shipping address same as billing
        </label>
        </div>
        </div>
        <div class="col-25">
          <div class="container">
            <h4 style="text-align:center;">Cart Recap<span class="price" style="color:black"></span></h4>
            <p>Merchandise: <span class="price" style="color:black"><b>{{ merchandise[0].total_amount }}</b></span></p>
            <p>Shipping: <span class="price" style="color:black"><b>$0</b></span></p>
            <p>Discount: <span class="price" style="color:black"><b>$0</b></span></p>  
            <hr>
            <p>Total Amount: <span class="price" style="color:black"><b>{{ merchandise[0].total_amount }}</b></span></p>
          </div>
          <div style="margin-top: 20px;" class="container">
            <h3 style="text-align:center;">Payment Details</h3>
            <label for="fname">Accepted Cards</label>
            <div class="icon-container">
              <i class="fa fa-cc-visa" style="color:navy;"></i>
              <i class="fa fa-cc-amex" style="color:blue;"></i>
              <i class="fa fa-cc-mastercard" style="color:red;"></i>
              <i class="fa fa-cc-discover" style="color:orange;"></i>
            </div>
            <label for="cname">Name on Card</label>
            <input type="text" v-model="name_in_card" id="cname" name="cardname" placeholder="John More Doe">
            <label for="ccnum">Credit card number</label>
            <input type="text" v-model="card_type" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444">
            <div class="row">
              <div class="col-50">
                <label for="expyear">Exp Year</label>
                <input type="text" v-model="exp_year" id="expyear" name="expyear" placeholder="2018">
              </div>
              <div class="col-50">
                <label for="cvv">CVV</label>
                <input type="text" id="cvv"  v-model="cvv" name="cvv" placeholder="3552">
              </div>
            </div>
          </div>
        </div>
        <div class="col-50" align="center">
          <button class="btn" type="button" @click="checkout()">Continue to checkout</button>
        </div>
    </div>
  </form>
</body>
</html>
</template>

<script>
import axios from 'axios';
import router from '../router';
import Successorder from './Successorder.vue';
export default {
  data () {
    return {
      b_name: '',
      b_email: '',
      b_mobile: '',
      b_address: '',
      b_city: '',
      b_state: '',
      b_zipcode: '',
      s_name: '',
      s_email: '',
      s_mobile: '',
      s_address: '',
      s_city: '',
      s_state: '',
      s_zipcode: '',
      name_in_card: '',
      card_type: '',
      exp_year: '',
      cvv: '',
      merchandise:'',
      isChecked: '',
    }
  },
  mounted(){
    this.total();
  },
  methods: {
    total() {
      var token = localStorage.getItem('usertoken');
      axios.get('http://localhost:4000/carts/get-merchandise-amount',
        { headers: { Authorization: `Bearer ${token}` }
          
        }) 
      .then((response) => {
            console.log(response.data);
            this.merchandise = response.data;
        })
        .catch((error) =>{
            console.log(error);
        });
      },
    checkout () {
    this.Validation();
    var token = localStorage.getItem('usertoken');
    axios.post('http://localhost:4000/orders/placeorder',
      {
        b_name: this.b_name,
        b_email: this.b_email,
        b_mobile: this.b_mobile,
        b_house_no: this.b_address,
        b_city: this.b_city,
        b_state: this.b_state,
        b_zipcode: this.b_zipcode,
        s_name: this.s_name,
        s_email: this.s_email,
        s_mobile: this.s_mobile,
        s_house_no: this.s_address,
        s_city: this.s_city,
        s_state: this.s_state,
        s_zipcode: this.s_zipcode,
        total_amount: this.total_amount,
        name_in_card: this.name_in_card,
        card_type: this.card_type,
        exp_year: this.exp_year
      },
      { headers: { Authorization: `Bearer ${token}` }
        
      }) 
    .then((response) => {
          console.log(response.data);
          router.push({ name:'Successorder', path: '/successorder' });
          this.total();
      })
      .catch((error) =>{
          console.log(error);
      });
    },
    copyData() {
      if(this.isChecked) {
        this.s_name    = this.b_name,
        this.s_address = this.b_address,
        this.s_city    = this.b_city,
        this.s_state  = this.b_state,
        this.s_zipcode = this.b_zipcode,
        this.s_mobile  = this.b_mobile,
        this.s_email   = this.b_email
      } else {
        this.s_name    = '',
        this.s_address = '',
        this.s_city    = '',
        this.s_state   = '',
        this.s_zipcode = '',
        this.s_mobile  = '',
        this.s_email   = ''
      }
    },
    handleChecked() {
      this.isChecked = !(this.isChecked);
      this.copyData();
    },
    Validation() {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if(!(isNaN(this.b_name)) || !(isNaN(this.s_name)) || this.b_name.length<0 ) {
        console.log("Invalid Name, Please Enter proper Name");
        return false;
      }
      if((reg.test(this.b_email) === false) ||(reg.test(this.s_email) === false)) {
        console.log("Invalid Email, Please Enter proper Email Address..");
        return false;
      }
      if(!(isNaN(this.b_city)) || !(isNaN(this.s_city))) {
        console.log("Invalid City Name, Please Enter proper city Name");
        return false;
      }
      if(!(isNaN(this.b_state)) || !(isNaN(this.s_state))) {
        console.log("Invalid State Name, Please Enter proper State Name");
        return false;
      }
      if((isNaN(this.b_zipcode)) || (isNaN(this.s_zipcode))) {
        console.log("Invalid zipcode , Please Enter proper zipcode ");
        return false;
      }
      if((isNaN(this.b_mobile)) || (isNaN(this.s_mobile))) {
        console.log("Invalid Mobile number, Please Enter proper Mobile Number");
        return false;
      }
      if(!(isNaN(this.b_city)) || !(isNaN(this.s_city))) {
        console.log("Invalid City Name, Please Enter proper city Name");
        return false;
      }
      if(!(isNaN(this.name_in_card)) || !(isNaN(this.name_in_card))) {
        console.log("Invalid Name in card, Please Enter your Name properly.");
        return false;
      }
      if((this.card_type.length < 16) || (this.card_type.length > 16) || (isNaN(this.card_type)) ) {
        console.log("Invalid Card Number, Length must must be 16 and it contains only numbers..");
        return false;
      }
      if((this.exp_year.length < 4 ) || (isNaN(this.exp_year)) || (isNaN(this.exp_year))) {
        console.log("Invalid Expiry year");
        return false;
      }
      if((this.cvv.length < 0) || (isNaN(this.cvv))) {
        console.log("Invalid Cvv value");
        return false;
      }
      return true;
    }
  }
}
</script>

<style scoped>
body {
  font-family: Arial;
  font-size: 17px;
  padding: 8px;
}

* {
  box-sizing: border-box;
}

.row {
  display: -ms-flexbox; /* IE10 */
  display: flex;
  -ms-flex-wrap: wrap; /* IE10 */
  flex-wrap: wrap;
  margin: 0 -16px;
}

.col-25 {
  -ms-flex: 25%; /* IE10 */
  flex: 25%;
}

.col-50 {
  -ms-flex: 50%; /* IE10 */
  flex: 50%;
}

.col-75 {
  -ms-flex: 75%; /* IE10 */
  flex: 75%;
}

.col-25,
.col-50,
.col-75 {
  padding: 0 16px;
}

.container {
  background-color: #f2f2f2;
  padding: 5px 20px 15px 20px;
  border: 1px solid lightgrey;
  border-radius: 3px;
}

input[type=text] {
  width: 100%;
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

label {
  margin-bottom: 10px;
  display: block;
}

.icon-container {
  margin-bottom: 20px;
  padding: 7px 0;
  font-size: 24px;
}

.btn {
  background-color: #4CAF50;
  color: white;
  padding: 12px;
  margin: 10px 0;
  border: none;
  width: 50%;
  border-radius: 3px;
  cursor: pointer;
  font-size: 17px;
}

.btn:hover {
  background-color: #45a049;
}

a {
  color: #2196F3;
}

hr {
  border: 1px solid lightgrey;
}

span.price {
  float: right;
  color: grey;
}

/* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other (also change the direction - make the "cart" column go on top) */
@media (max-width: 800px) {
  .row {
    flex-direction: column-reverse;
  }
  .col-25 {
    margin-bottom: 20px;
  }
}
</style>