Vue.config.devtools = true;
Vue.config.performance = true;

var app_poke = new Vue({
    el: "body",
    data:{
        poke: {},
        loading: true
    },
    ready(){
        let uri = window.location.href;
        let url = new URL(uri);
        let parameter = url.searchParams.get("n");
        axios.get("https://pokeapi.co/api/v2/pokemon/".concat(parameter).concat("/")).then((response)=>{
            this.poke = response.data;
            this.loading = false;
        })
    },
    computed: {
        completeId(){
            const id = this.poke.id;
            return id < 100 ? id < 10 ?'00'+ id : '0'+ id : id;
        },
        image(){
            return "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/".concat(this.completeId).concat(".png");
        }
    }
    
});