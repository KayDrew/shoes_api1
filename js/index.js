document.addEventListener("alpine:init", () => {

  Alpine.data("shoes", () => {

        return {
          
            allShoes:[],
           cartItems:[],
            brand:"",
            size:0,
            color:"",
            adminPassword:'',
            displayShoes:true,
            totalItems:0,
            showCheckout:true,
            empty:false,
            cartTotal:0,
            message:"",
            showInput:false,
            payAmount:0,
            qty1:0,
            price1:0,
            qty:1,           
            price:0,
            image:"",
            cart_code:localStorage.getItem("code"),
            username:localStorage.getItem("name"),
            addMessage:"",
            historyOrders:[],
            showAmount:true,
            adminError:"",
            regex :/^([a-zA-Z]{2,})$/,
            stock:[],
            loginError:"",
            addAlert:"",
            count:0,
            name:"",
            resultItems:[],
            stockItems:[],
            isAbove:false,
            id:localStorage.getItem("id"),
        
           
         


            
        
    createCart(){


    localStorage.clear();


  if(this.name){

    this.name=this.name.trim();

    if(this.regex.test(this.name)){

      this.username=this.name[0].toUpperCase();

      for(let i=1;i<this.name.length;++i){
this.username+=this.name[i].toLowerCase();

      }
console.log(this.username);                                                                                                                                                      
      
      localStorage.setItem("name",this.username);

      console.log(this.username);

      axios.get('https://shoes-catalogue-api.onrender.com/api/shoes/create?username='+this.username).then(result=>{

      let res=result.data.cart_code;

      this.cart_code=res;  
  
    localStorage.setItem("code",res);
    location.href="index.html";
   
         
         });
      



    }
    else{
  
      this.loginError="Please enter a valid name";
    }

    }
    else{
      
    
      this.loginError="Please enter a name";
    }


},


logout(){

  localStorage.clear();
  location.href="index.html";
},

getPassword(){

  
if(this.adminPassword){
  axios.get('https://shoes-catalogue-api.onrender.com/api/shoes/admin/Admin').then(result=>{

let password=result.data.password;



  if(this.adminPassword==password){

    this.adminError="";
    location.href="stock.html";

  }

  else{
    this.adminError="Your password is incorrect";
  }
}

  );

}


else{
  
  this.adminError="Please enter a password";
}

},


async addToCart(shoesId){




  if(!this.cart_code){

    this.cart_code=0;
    location.href="user.html"
 

  }

  else{

    
    this.cart_code=Number(this.cart_code);

    
    var result=[];

      result= await axios.get('https://shoes-catalogue-api.onrender.com/api/shoes/id/'+shoesId);
     let res=result.data.result;

     if(res==true || res==false){

      this.isAbove=res;
   }

   else{

     this.isAbove=false;
   }


    this.getCart()


    if(this.cartItems.length==0){

      axios.post('https://shoes-catalogue-api.onrender.com/api/shoes/addToCart',{'cart_code':this.cart_code,'shoesId':shoesId,'qty':1}).then((result)=>{

      this.getCart();
      
      this.addTotal();
      
        });

    }

    else{

      if(!this.isAbove){

        axios.post('https://shoes-catalogue-api.onrender.com/api/shoes/addToCart',{'cart_code':this.cart_code,'shoesId':shoesId,'qty':1}).then((result)=>{

        this.getCart();
        
        this.addTotal();
        
          });

      }
      else{

        swal({title:"Sorry",
        text:  "Not enough stock available",
        dangerMode:true,
      className:"sweet"})
      }


    
      }

    



}
},


addTotal(){
 
  let arr= this.cartItems;

  let shoe={};
  let total=0;
  let itemCost=0;
  let quan=0;
  
  for(let i=0;i<arr.length;++i){
  
  shoe= arr[i];
  itemCost=shoe.qty*shoe.price;
  quan+=shoe.qty;
  
  total=total+itemCost;
  
  }
  
  this.cartTotal=total;
  this.totalItems=quan;
},


pastOrders(shoesId){

  axios.post('https://shoes-catalogue-api.onrender.com/api/shoes/history',{'shoesId':shoesId,'cart_code':this.cart_code}).then(result=>{

  console.log(result)

  });


},


deleteSold(shoesId){



  axios.post('https://shoes-catalogue-api.onrender.com/api/shoes/sold',{'id':shoesId}).then(result=>{

  });
},



showHistory(){


  if(this.cart_code){

  axios.get('https://shoes-catalogue-api.onrender.com/api/shoes/showHistory/cart/'+this.cart_code).then(result=>{
 
let res= result.data.items;
this.historyOrders=res;
  


}


);
  }

},




getCart(){

  if(this.cart_code==null){
    
  this.empty=true;
  this.showCheckout=false;

  }

  else{

  axios.get('https://shoes-catalogue-api.onrender.com/api/shoes/cartItems/cart/'+this.cart_code).then(result=>{
  

  this.cartItems=result.data.items;

 // console.log(result)
  let quan=0;

  for(let i=0;i<this.cartItems.length;++i){

    var shoe= this.cartItems[i];
    quan+=shoe.qty;
   

  }
  this.count=quan;

if(isNaN(quan)){
  this.count=0;
}
  

this.addTotal();

if(this.cartItems.length<1){

  this.empty=true;
  this.showCheckout=false;
}

   
  });
}




},



remove(shoesId,price){

  
  axios.post('https://shoes-catalogue-api.onrender.com/api/shoes/removeItem',{'shoesId':shoesId,'cart_code':this.cart_code}).then(result=>{

console.log(result.data);
  this.getCart();

  this.cartTotal-=price;



  


  });




},

     async  showStock(){

      
      let result=await  axios.get('https://shoes-catalogue-api.onrender.com/api/shoes');

      this.stock=result.data.shoes;

     },

          
        async  showShoes(){

            this.brand= document.querySelector('#brand').value;
            this.size=document.querySelector('#size').value;
            this.color=document.querySelector('#color').value;

                  
            if(this.brand=="All" && this.size=="All" && this.color=="All"){

             
            let result=await  axios.get('https://shoes-catalogue-api.onrender.com/api/shoes');

                let res=result.data.shoes;
                this.resultItems=[];

                for(let i=0;i<res.length;++i){

                  var shoe=res[i];
                   

                  if(shoe.in_stock>0){

                    this.resultItems.push(shoe);
                  
                  }                 
             
                  
           
                }


                this.allShoes=this.resultItems;
              
           
              }

              else if(this.brand!="All" && this.size=="All" && this.color=="All"){

                axios.get('https://shoes-catalogue-api.onrender.com/api/shoes/brand/'+this.brand
                ).then(result => {
                  let res=result.data.shoes;
                  this.resultItems=[];
                  for(let i=0;i<res.length;++i){
  
                    var shoe=res[i];
                     
  
                    if(shoe.in_stock>0){
  
                      this.resultItems.push(shoe);
                    
                    }                 
               
                    
             
                  }


                this.allShoes=this.resultItems;
      
           
                 } );

              }
              
              else if(this.brand=="All" && this.size!="All" && this.color=="All"){

                axios.get('https://shoes-catalogue-api.onrender.com/api/shoes/size/'+this.size
                ).then(result => {

                  let res=result.data.shoes;
                  this.resultItems=[];

                for(let i=0;i<res.length;++i){

                  var shoe=res[i];
                   

                  if(shoe.in_stock>0){

                    this.resultItems.push(shoe);
                  
                  }                 
             
                  
           
                }
  
  
                  this.allShoes=this.resultItems;
           
                 } );

         

              }
           
              
              else if(this.brand=="All" && this.size=="All" && this.color!="All"){

                axios.get('https://shoes-catalogue-api.onrender.com/api/shoes/color/'+this.color
                ).then(result => {

                  
                  let res=result.data.shoes;
                  this.resultItems=[];
                  
                  for(let i=0;i<res.length;++i){
  
                    var shoe=res[i];
                     
  
                    if(shoe.in_stock>0){
  
                      this.resultItems.push(shoe);
                    
                    }                 
               
                    
             
                  }
  
  
                  this.allShoes=this.resultItems;

                  console.log(this.allShoes)
                 
                 } );

              }

              
              else if(this.brand!="All" && this.size!="All" && this.color=="All"){

                axios.get('https://shoes-catalogue-api.onrender.com/api/shoes/brand/'+this.brand+'/size/'+this.size
                ).then(result => {

                  let res=result.data.shoes;
                  this.resultItems=[];
                  for(let i=0;i<res.length;++i){
  
                    var shoe=res[i];
                     
  
                    if(shoe.in_stock>0){
  
                      this.resultItems.push(shoe);
                    
                    }                 
               
                    
             
                  }
  
  
                  this.allShoes=this.resultItems;
                  
                  console.log(this.allShoes)
           
                 } )
   

              }


              
              else if(this.brand!="All" && this.size=="All" && this.color!="All"){

                axios.get('https://shoes-catalogue-api.onrender.com/api/shoes/brand/'+this.brand+'/color/'+this.color
                ).then(result => {
                  let res=result.data.shoes;
                  this.resultItems=[];
                  for(let i=0;i<res.length;++i){
  
                    var shoe=res[i];
                     
  
                    if(shoe.in_stock>0){
  
                      this.resultItems.push(shoe);
                    
                    }                 
               
                    
             
                  }
  
  
                  this.allShoes=this.resultItems;
           
                  console.log(this.allShoes)
                 } );

              }

              
              else if(this.brand=="All" && this.size!="All" && this.color!="All"){

                axios.get('https://shoes-catalogue-api.onrender.com/api/shoes/size/'+this.size+'/color/'+this.color
                ).then(result => {
                  let res=result.data.shoes;
                  this.resultItems=[];
                  for(let i=0;i<res.length;++i){
  
                    var shoe=res[i];
                     
  
                    if(shoe.in_stock>0){
  
                      this.resultItems.push(shoe);
                    
                    }                 
               
                    
             
                  }
  
  
                  this.allShoes=this.resultItems;
           
                  console.log(this.allShoes)
                 } );

              }   
              else{
                axios.get('https://shoes-catalogue-api.onrender.com/api/shoes/brand/'+this.brand+'/size/'+this.size+'/color/'+this.color

                ).then(result => {

                  let res=result.data.shoes;

                  this.resultItems=[];

                  for(let i=0;i<res.length;++i){
  
                    var shoe=res[i];
                     
  
                    if(shoe.in_stock>0){
  
                      this.resultItems.push(shoe);
                    
                    }                 
               
                    
             
                  }
  
  
                  this.allShoes=this.resultItems;
           
                  console.log(this.allShoes)
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

          let currentItem=[];
          let itemId=0;
              
          axios.get('https://shoes-catalogue-api.onrender.com/api/shoes/brand/'+addBrand+'/size/'+addSize+'/color/'+addColor

          ).then(result => {

            currentItem=result.data.shoes;

            for(let i=0;i<currentItem.length;++i){
            
              var item=currentItem[i];

              itemId=item.id;
         

            }
            
            localStorage.setItem("id",itemId);
   
          });
          

          

          if(currentItem.length<0){
           
            axios.post("https://shoes-catalogue-api.onrender.com/api/shoes",{'color':addColor,'brand':addBrand,'price':cost,'size':postSize,'in_stock':quantity,'image':this.image}).then((result)=>{
           
            this.addMessage=result.data.message;
           
           this.showStock();
            });
          }

          else{

            axios.post('https://shoes-catalogue-api.onrender.com/api/shoes/update',{qty:this.qty,shoesId:this.id}).then(result=>{

            this.addMessage=result.data.message;
          
          
            });
            
          }
            
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
      
this.showAmount=true;
       this.empty=false;
    }

  else{

    this.empty=true;
}

},

checkoutClicked(){

this.showInput=true;
this.showCheckout=false;

this.showAmount=true;
},


pay(){
  
  
var paymentAmount=Number(this.payAmount);  	


 if(paymentAmount<this.cartTotal){

    this.message="The amount is insufficient";


}

else{
                  
  for(let i=0;i<this.cartItems.length;++i){

    var shoe=this.cartItems[i];
    var id=shoe.id;
   
    this.pastOrders(id);
  console.log(this.cart_code+'id '+id)
    this.deleteSold(id);
  }
            
  axios.post('https://shoes-catalogue-api.onrender.com/api/shoes/pay').then(result=>{

  this.message=result.data.message;
  this.cartTotal=0;
  this.showInput=false;
  this.empty=true;

  this.getCart();


  }); 
    
                  
    }

    


},


async updateStock(shoesId,qty){

  if(this.qty1<qty){

    swal({title:"Forbidden",
    text:  "New quantity cannot be less than stock on hand",
    dangerMode:true,
  className:"sweet"})
  }


  else{
  axios.post('https://shoes-catalogue-api.onrender.com/api/shoes/update',{qty:this.qty1,shoesId:shoesId}).then(result=>{

swal({
 text: "Updated stock!",
className:'sweet'}
)

this.showStock();

  });

}

},


init(){
  this.getCart();
}
  


 }  

 
});
});
