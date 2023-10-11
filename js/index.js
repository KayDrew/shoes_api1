document.addEventListener("alpine:init", () => {

      Alpine.data("shoes", () => {

            return {
                allShoes:[],
                allBrand:[],
                allSize:[],
               allBrandSize:[],
                brand:"",
                size:0,
                displayShoes: false,
              
              
              
              showShoes(){
                this.displayShoes= true;
                console.log(this.displayShoes)
               },
              
                     init(){

                        axios.get('https://shoes-catalogue-api.onrender.com/api/shoes').then(result => {

                          this.shoes=result.data;
                          console.log(shoes);
                          } );
    
     },


     }

});
});