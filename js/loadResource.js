function loadTypes(){
    var types;
    axios.get('https://pokeapi.co/api/v2/type/').then((response) => {
        types = response.data.results;
        types.forEach(element => {
            axios.get('https://pokeapi.co/api/v2/type/'+element.name+'/').then((response) => {
                element.pokemon = response.data.pokemon;
                element.pokemon.sort((t1, t2) => {return t1.slot - t2.slot});
            });
        });
    })

    return types;
}

