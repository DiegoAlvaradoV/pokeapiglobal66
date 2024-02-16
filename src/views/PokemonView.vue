<template>

    <main v-if="pokemons.length === 0 && !pokemonsLoaded">

        <LoadPokemon/>
        
    </main>

    <main  v-else class="pokemonContainer">

        <div class="pokemonContainer__Search">

            <v-icon name="hi-solid-search" scale="2" class="pokemonContainer__Search--Icon"/>

            <input type="text" placeholder="Search" class="pokemonContainer__Search--Input montserrat-search">

        </div>
       
        <div v-if="pokemons.length === 0 && pokemonsLoaded" class="pokemonContainer__Empty">

            <EmptyPokemon/>

        </div>

        <div v-else class="pokemonContainer__List">

            <PokemonLayout>

                <ul v-if="!isFavoritePage" class="pokemonContainer__List--Ul">

                    <div  v-for="(pokemon, index) in pokemons" :key="index" class="pokemonContainer__List--UlContainer">

                        <li class="pokemonContainer__List--UlLi">

                            <p class="pokemonContainer__List--UlLi__Pokemon lato-regular" @click="openModal(pokemon)">{{ pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) }}</p>

                            <v-icon name="fa-star" :class="{ 'pokemonContainer__List--UlLi__Favorite': isFavorite(pokemon), 'pokemonContainer__List--UlLi__Normal': !isFavorite(pokemon) }" @click="toggleFavorite(pokemon)" scale="2"/>
                            
                        </li>

                    </div>

                </ul>

                <ul v-else class="pokemonContainer__List--Ul">

                    <div  v-for="(pokemon, index) in store.favoritePokemons" :key="index" class="pokemonContainer__List--UlContainer">

                        <li class="pokemonContainer__List--UlLi">

                            <p v-if="pokemon" class="pokemonContainer__List--UlLi__Pokemon lato-regular" @click="openModal({ name: pokemon })">{{ pokemon.charAt(0).toUpperCase() + pokemon.slice(1) }}</p>

                            <v-icon name="fa-star" class='pokemonContainer__List--UlLi__Favorite' @click="toggleFavorite({ name: pokemon })" scale  ="2"/>
                            
                        </li>

                    </div>

                </ul>

            </PokemonLayout>

            <div class="pokemonContainer__List--Links">

                <router-link :to="{name:'pokemon'}" class="pokemonContainer__List--LinksAnchor fix lato-bold"><img :src="menuUrl" alt="Menu"/>All</router-link>

                <router-link :to="{name:'favPokemon'}" class="pokemonContainer__List--LinksAnchor lato-bold"><v-icon name="fa-star" class="pokemonContainer__List--LinksIcon"/>Favorites</router-link>

            </div>

        </div>  

    </main>

    <PokemonDetail v-if="showModal" :pokemonName="selectedPokemonName" @close="closeModal" />

</template>
  
<script setup>
    import LoadPokemon from '@/components/LoadPokemon.vue'
    import EmptyPokemon from '@/components/EmptyPokemon.vue'
    import PokemonDetail from '@/components/PokemonDetail.vue';
    import PokemonLayout from '@/layout/PokemonLayout.vue'
    import PokemonService from '@/services/PokemonService.js'
    import { ref, onMounted, watch } from 'vue';
    import { usePokemonStore } from '@/store/pokemon';
    import { useRoute } from 'vue-router';

    const showModal = ref(false);
    const selectedPokemonName = ref('');
    const pokemonsLoaded = ref(false);

    const menuUrl = require('@/assets/menu.png')
    
    const service = new PokemonService();
    const store = usePokemonStore();
    const pokemons = service.getPokemons();

    const route = useRoute();
    const isFavoritePage = ref(route.name === 'favPokemon');

    const openModal = (pokemon) => {
        selectedPokemonName.value = pokemon.name;
        showModal.value = true;
    };

    const closeModal = () => {
        showModal.value = false;
    };

    const toggleFavorite = (pokemon) => {
    if (isFavoritePage.value) {
        store.toggleFavorite(pokemon);
    } else {
        store.toggleFavorite({ name: pokemon.name });
    }
};

    const isFavorite = (pokemon) => {
        return store.isFavorite(pokemon);
    };

    onMounted(async () => {
        await service.fetchPokemons();
    });

    watch(() => route.name, (newRouteName) => {
        isFavoritePage.value = newRouteName === 'favPokemon';
    });
</script>
  
<style lang="scss">
    .pokemonContainer{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .pokemonContainer__Search {
            position: relative;

            .pokemonContainer__Search--Icon {
                position: absolute;
                left: 10px;
                top: 70%;
                transform: translateY(-50%);
                color: $disabled;
                z-index: 1;
            }

            .pokemonContainer__Search--Input {
                margin-top: 30px;
                background-color: $firstwhite;
                width: calc(60vw - 65px); 
                height: 50px;
                border-radius: 5px;
                box-shadow: 0px 2px 10px 0px #0000000A;
                border-width: 0;
                padding-left: 65px;
                line-height: 22.4px;
                font-size: 16px;
            }
        }

        .pokemonContainer__Empty{
           margin-top: 50px
        }

        .pokemonContainer__List{
            width: 60vw;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            .pokemonContainer__List--Ul{
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                padding: 0;
                width: 100%;

                .pokemonContainer__List--UlContainer{
                    width: 100%;
                    background-color: $firstwhite;
                    margin-bottom: 10px;

                    .pokemonContainer__List--UlLi{
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        width: 100%;

                        .pokemonContainer__List--UlLi__Pokemon{
                            width: 70px;
                            height: 26px;
                            font-size: 22px;
                            line-height: 26.4px;
                            cursor: pointer;
                        }

                        .pokemonContainer__List--UlLi__Normal{
                            color: $disabled;
                            cursor: pointer;
                            padding: 2px;
                            background-color: $bgapp;
                            font-size: 2.4em;
                            border-radius: 50%;
                        }

                        .pokemonContainer__List--UlLi__Favorite {
                            color: $favorite;
                            cursor: pointer;
                            padding: 2px;
                            background-color: $bgapp;
                            font-size: 2.4em;
                            border-radius: 50%;
                        }

                    }
                }
            }

            .pokemonContainer__List--Links{
                background-color: $firstwhite;
                width: 100vw;
                display: flex;
                align-content: center;
                justify-content: center;
                align-items: center;
                flex-wrap: nowrap;
                flex-direction: row;
                height: 100px;
                box-shadow: 0px -5px 4px 0px #0000000D;

    
                .pokemonContainer__List--LinksAnchor{
                background-color: $disabled;
                color: $primarywhite;
                gap: 10px;
                border-radius: 60px;
                text-decoration: none;
                width: 150px;
                height: 44px;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 200px;

                    img{
                        width: 15px;
                    }

                    .pokemonContainer__List--LinksIcon{
                        width: 22px;
                        height: 22px;
                    }
                }

                .fix{
                    margin-right: 20px;
                }

                .router-link-active{
                    background-color: $primary;
                }
                
            }
        }

    }

    
</style>