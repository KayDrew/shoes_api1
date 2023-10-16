document.addEventListener("alpine:init", () => {

      Alpine.data("shoes", () => {

            return {
                allShoes:[],
                allBrand:[],
                allSize:[],
               allBrandSize:[],
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
                qty:0,           
                price:0,
                image:"",
              
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

               }, 


               addStock(){
                
                let addBrand= document.querySelector('#addBrand').value;
                let addSize=document.querySelector('#addSize').value;
                let addColor=document.querySelector('#addColor').value;
                let quantity= Number(this.qty);
                let cost= Number(this.price);
               
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



                console.log(this.image);


               
                axios.post("https://shoes-catalogue-api.onrender.com/api/shoes",{'color':addColor,'brand':addBrand,'price':cost,'size':addSize,'in_stock':quantity,'image':this.image}).then((result)=>{
                
                console.log(result.status);
                });
                

               },
               
               
    addToCart(){
          this.totalItems+=1;
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




   

     }  

});
});
