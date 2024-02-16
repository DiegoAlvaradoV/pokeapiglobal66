import { defineStore } from "pinia";

export const usePokemonStore = defineStore('pokemon',{
    state:() => ({
        favoritePokemons: []
    }),
    getters: {
        isFavorite: (state) => (pokemon) => {
            return state.favoritePokemons.includes(pokemon.name);
        }
    },
    actions: {
        toggleFavorite(pokemon) {
            if (this.isFavorite(pokemon)) {
                this.removeFavorite(pokemon.name);
            } else {
                this.addFavorite(pokemon.name);
            }
        },
        addFavorite(pokemonName) {
            if (!this.isFavorite(pokemonName)) {
                this.favoritePokemons.push(pokemonName);
            }
        },
        removeFavorite(pokemonName) {
            const index = this.favoritePokemons.indexOf(pokemonName);
            if (index !== -1) {
                this.favoritePokemons.splice(index, 1);
            }
        }
    }
});
