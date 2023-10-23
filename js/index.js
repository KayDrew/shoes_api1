document.addEventListener("alpine:init", () => {

  Alpine.data("shoes", () => {

        return {
            allShoes:[],
           cartItems:[],
            brand:"",
            size:0,
            color:"",
            displayShoes: false,
            totalItems:0,
            showCheckout:false,
            empty:true,
            cartTotal:0,
            message:"",
            showInput:false,
            amount:0,
            qty:1,           
            price:0,
            image:"",
            cart_id:0,
            username:"Kabelo",
            addMessage:"",


            
        
createCart(){

axios.get('https://shoes-catalogue-api.onrender.com/api/shoes/create?username=${this.username}').then(result=>{

this.cart_id=result.data.cart_code;


});



},

addToCart(shoesId,qty){

  axios.post('https://shoes-catalogue-api.onrender.com/api/shoes/addToCart',{'cart_code':this.cart_id,'shoesId':shoesId,'qty':this.qty}).then((result)=>{


  this.totalItems++;
    
  const cartNum= document.querySelector('#itemCount');
  cartNum.innerText=this.totalItems;

  this.cartItems=result.data.items;
 
  });
},


getCart(){

  axios.get('https://shoes-catalogue-api.onrender.com/api/shoes/cartItems').then(result=>{


  this.cartItems=result.data.items;

   
  });

},


remove(shoesId){

},

          
          showShoes(){
            this.displayShoes= true;
            this.brand= document.querySelector('#brand').value;
            this.size=document.querySelector('#size').value;
            this.color=document.querySelector('#color').value;

                  
            if(this.brand=="All" && this.size=="All" && this.color=="All"){

              axios.get('https://shoes-catalogue-api.onrender.com/api/shoes'
               ).then(result => {

              this.allShoes=result.data.shoes;

          
                } );
              }

              else if(this.brand!="All" && this.size=="All" && this.color=="All"){

                axios.get('https://shoes-catalogue-api.onrender.com/api/shoes/brand/'+this.brand
                ).then(result => {

               this.allShoes=result.data.shoes;
      
           
                 } );

              }
              
              else if(this.brand=="All" && this.size!="All" && this.color=="All"){

                axios.get('https://shoes-catalogue-api.onrender.com/api/shoes/size/'+this.size
                ).then(result => {

               this.allShoes=result.data.shoes;
          
           
                 } );

              }
           
              
              else if(this.brand=="All" && this.size=="All" && this.color!="All"){

                axios.get('https://shoes-catalogue-api.onrender.com/api/shoes/color/'+this.color
                ).then(result => {

               this.allShoes=result.data.shoes;

                 
                 } );

              }

              
              else if(this.brand!="All" && this.size!="All" && this.color=="All"){

                axios.get('https://shoes-catalogue-api.onrender.com/api/shoes/brand/'+this.brand+'/size/'+this.size
                ).then(result => {

               this.allShoes=result.data.shoes;
         
          
           
                 } );

              }


              
              else if(this.brand!="All" && this.size=="All" && this.color!="All"){

                axios.get('https://shoes-catalogue-api.onrender.com/api/shoes/brand/'+this.brand+'/color/'+this.color
                ).then(result => {

               this.allShoes=result.data.shoes;
              
           
                 } );

              }

              
              else if(this.brand=="All" && this.size!="All" && this.color!="All"){

                axios.get('https://shoes-catalogue-api.onrender.com/api/shoes/size/'+this.size+'/color/'+this.color
                ).then(result => {

               this.allShoes=result.data.shoes;
             
           
                 } );

              }   
              else{
                axios.get('https://shoes-catalogue-api.onrender.com/api/shoes/brand/'+this.brand+'/size/'+this.size+'/color/'+this.color
                ).then(result => {

               this.allShoes=result.data.shoes;
             
           
                 } );
              }

           }, 


           addStock(){
            
            let addBrand= document.querySelector('#addBrand').value;
            let addSize=document.querySelector('#addSize').value;
            let addColor=document.querySelector('#addColor').value;
            let quantity= Number(this.qty);
            let cost= Number(this.price);
            let postSize=Number(addSize);
            
           
           if(addColor=="Black"){
              this.image="black.png";
           }

          else if(addColor=="Blue"){
                this.image="blue.jpeg";
          }
         else if(addColor=="Orange"){
                this.image="brown.jpeg";
          }
      else{
            this.image="green.jpeg";
      }

       if(cost>0 && quantity>0){
        
        if(Number.isInteger(quantity)){
           
            axios.post("https://shoes-catalogue-api.onrender.com/api/shoes",{'color':addColor,'brand':addBrand,'price':cost,'size':postSize,'in_stock':quantity,'image':this.image}).then((result)=>{
           this.addMessage=result.data.message;
           
            });
            
            }
            else{
            	
            this.addMessage="Please enter  only whole numbers for quantity ";
            }
            
          }

          else {

            this.addMessage="Cost and quantity cannot be Zero";

          }     
          
          const addMess= document.querySelector("#addMessage");
          
          if(this.addMessage!=""){
          	
              setTimeout(function(){
          	addMess.style.visibility="hidden";
                               },

                              3000);
                              
                              
               addMess.style.visibility="visible";     
          
       }
          
          
           },
           
           



           updateCart(){
            
  const cartNum= document.querySelector('#itemCount');
  cartNum.innerText=this.totalItems;
           },

displayCart(){

   if(this.cartTotal>0){
      this.showCheckout=true;
       this.empty=false;
    }

  else{

    this.empty=true;
}

},

checkoutClicked(){

this.showInput=true;
},

pay(){
  
  
var paymentAmount=Number(this.amount);  	

 if(this.amount<this.cartTotal){

    this.message="The amount is insufficient"

}

else{
                  
            
     this.message="Payment successful!";      
                  
    }

},



init(){

this.createCart();
this.updateCart();
this.getCart;
},



 }  

});
});
