import {ref} from 'vue'
import { pokeapi } from '@/api/pokeapi'

class PokemonService {

    pokemon

    pokemons

    constructor(){
        this.pokemon = ref(null)
        this.pokemons = ref([])
    }

    getPokemons() {
        return this.pokemons
    }

    getPokemon() {
        return this.pokemon
    }

    async fetchPokemons() {
        try{
            const response = await fetch(pokeapi)
            const pokemons = await response.json()
            this.pokemons.value = await pokemons.results
        }catch(error){
            console.log(error)
        }
    }

    async fetchPokemon(id) {
        try{
            const response = await fetch(`${pokeapi}/${id}`)
            const pokemon = await response.json()
            this.pokemon.value = pokemon
            return pokemon
        }catch(error){
            console.log(error)
        }
    }
}

export default PokemonService