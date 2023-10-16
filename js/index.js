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
               
               
               addToCart(){
              this.totalItems+=1;
               },


     }  

});
});
