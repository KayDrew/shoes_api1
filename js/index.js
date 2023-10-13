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
                imgUrl:"",
              
              
              
              showShoes(){
                this.displayShoes= true;
                this.brand= document.querySelector('#brand').value;
                this.size=document.querySelector('#size').value;
                this.color=document.querySelector('#color').value;

                      
                if(this.brand=="All" && this.size=="All" && this.color=="All"){

                  axios.get('https://shoes-catalogue-api.onrender.com/api/shoes'
                   ).then(result => {

                  this.allShoes=result.data.shoes;

                  this.getColor();
                    } );
                  }

                  else if(this.brand!="All" && this.size=="All" && this.color=="All"){

                    axios.get('https://shoes-catalogue-api.onrender.com/api/shoes/brand/'+this.brand
                    ).then(result => {

                   this.allShoes=result.data.shoes;
                 this.getColor();
               
                     } );

                  }
                  
                  else if(this.brand=="All" && this.size!="All" && this.color=="All"){

                    axios.get('https://shoes-catalogue-api.onrender.com/api/shoes/size/'+this.size
                    ).then(result => {

                   this.allShoes=result.data.shoes;
                this.getColor();
               
                     } );

                  }
               
                  
                  else if(this.brand=="All" && this.size=="All" && this.color!="All"){

                    axios.get('https://shoes-catalogue-api.onrender.com/api/shoes/color/'+this.color
                    ).then(result => {

                   this.allShoes=result.data.shoes;

                   this.getColor();
                  
               
                     } );

                  }

                  
                  else if(this.brand!="All" && this.size!="All" && this.color=="All"){

                    axios.get('https://shoes-catalogue-api.onrender.com/api/shoes/brand/'+this.brand+'/size/'+this.size
                    ).then(result => {

                   this.allShoes=result.data.shoes;
                  this.getColor();
              
               
                     } );

                  }


                  
                  else if(this.brand!="All" && this.size=="All" && this.color!="All"){

                    axios.get('https://shoes-catalogue-api.onrender.com/api/shoes/brand/'+this.brand+'/color/'+this.color
                    ).then(result => {

                   this.allShoes=result.data.shoes;
                   this.getColor();

               
               
                     } );

                  }

                  
                  else if(this.brand=="All" && this.size!="All" && this.color!="All"){

                    axios.get('https://shoes-catalogue-api.onrender.com/api/shoes/size/'+this.size+'/color/'+this.color
                    ).then(result => {

                   this.allShoes=result.data.shoes;
                  this.getColor();
               
                     } );

                  }


          

               },


               getColor(){

                for(let i=0;i<this.allShoes.length;++i){

  
                  if(this.allShoes[i].color=='Green') {

                    this.imgUrl='green.jpeg';
                  }

                  else if(this.allShoes[i].color=='Blue') {

                    this.imgUrl='blue.jpeg';
                  }

                  else if(this.allShoes[i].color=='Black') {

                    this.imgUrl='black.png';
                  }

                  else if(this.allShoes[i].color=='Orange') {

                    this.imgUrl='brown.jpeg';
                  }
                }
               },


              init(){

                axios.get('https://shoes-catalogue-api.onrender.com/api/shoes'
                ).then(result => {

               this.allShoes=result.data.shoes;
              this.getColor();
           
                 } );
              }
              


     }


     

});
});
