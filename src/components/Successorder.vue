<template>
    <div>
        <br/>
        <div class="success">
            <h1>Order Placed Successfully!</h1> 
        </div>
        <br/>
        <br/>
        <div align="center" class="img">
            <img :src="require('@/assets/success.gif')" style="width:50%;height:400px;" />
        </div>
    </div>
</template>
<style>
.success {
  width: 50%;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
  position: relative; 
}
</style>