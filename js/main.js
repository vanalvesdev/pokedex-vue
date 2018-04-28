Vue.config.devtools = true;
//Vue.use(VueResource);

var app_poke = new Vue({
    el: "#app-poke",
    data:{
        pokes: [],
        types: []
    },
    ready(){

        this.types = JSON.parse(localStorage.getItem('types'));
        if(this.types === null){
           this.types = [];
           let result = httpGet('https://pokeapi.co/api/v2/type/');
            let simpleTypes = result.results;
            simpleTypes.forEach(type => {
                let complexType = httpGet('https://pokeapi.co/api/v2/type/'+type.name+'/');
                Array.prototype.push.call(this.types, complexType);
                console.log(complexType);
            });

            this.types.forEach(type => {
                type.pokemon.sort((a,b) => {return a.slot - b.slot});
            });

            localStorage.setItem('types', JSON.stringify(this.types));
        }

        console.log(this.types);

        axios.get('https://pokeapi.co/api/v2/pokemon/').then((response) => {
            this.pokes = response.data.results;
            this.pokes.forEach((item) => {
                item.id = item.url.slice(34, item.url.length - 1);
                item.image = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/".concat(item.id < 100 ? item.id < 10 ?'00'+ item.id : '0'+ item.id : item.id).concat(".png");
                item.types = [];
                this.types.forEach(element => {
                    var pokeTypes = element.pokemon.filter((type) => {return type.pokemon.name === item.name});
                    if(pokeTypes.length > 0){
                        Array.prototype.push.call(item.types, element.name);
                    }
                });
            })
            
        })
        

        /*this.$http.get('https://pokeapi.co/api/v2/pokemon/').then((response) => {
            this.pokes = response.body.results;
            this.pokes.forEach((item) => {
                item.id = item.url.slice(34, item.url.length - 1);
                item.image = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/".concat(item.id < 100 ? item.id < 10 ?'00'+ item.id : '0'+ item.id : item.id).concat(".png");
            })
            next = response.body.next;
            prev = response.body.prev;
        })*/
    }
});


function httpGet(theUrl)
{
    var result = null;
     $.ajax({
        url: theUrl,
        type: 'get',
        async: false,
        success: function(data) {
            result = data;
        } 
     });
     return result;
}

