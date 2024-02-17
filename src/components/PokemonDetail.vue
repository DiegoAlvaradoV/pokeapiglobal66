<template>

  <div class="detailContainer">

    <div class="detailContainer__Modal" v-if="pokemon">

      <div class="detailContainer__Modal--Head" :style="{ backgroundImage: 'url(' + require('@/assets/background.png') + ')' }">

        <div class="detailContainer__Modal--HeadBanner">

          <img :src="pokemon.sprites.front_default" :alt="pokemon.name" class="detailContainer__Modal--HeadBannerImg">

        </div>

        <div class="detailContainer__Modal--HeadClose">

          <v-icon name="ri-close-circle-fill" class='detailContainer__Modal--HeadCloseIcon' @click="$emit('close')" scale  ="2"/>

        </div>

      </div>

      <div class="detailContainer__Modal--Content">

        <div class="detailContainer__Modal--Content__Section">

          <p class="detailContainer__Modal--Content__SectionPTitle lato-bold">Name:</p>

          <p class="detailContainer__Modal--Content__SectionP lato-regular">{{ pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) }}</p>

        </div>

        <div class="detailContainer__Modal--Content__Section">

          <p class="detailContainer__Modal--Content__SectionPTitle lato-bold">Weight:</p>

          <p class="detailContainer__Modal--Content__SectionP lato-regular">{{ pokemon.weight }}</p>

        </div>

        <div class="detailContainer__Modal--Content__Section">

          <p class="detailContainer__Modal--Content__SectionPTitle lato-bold">Height:</p>

          <p class="detailContainer__Modal--Content__SectionP lato-regular">{{ pokemon.height }}</p>

        </div>

        <div class="detailContainer__Modal--Content__Section">

          <p class="detailContainer__Modal--Content__SectionPTitle lato-bold">Types:</p>

          <div class="detailContainer__Modal--Content__SectionTypes">

            <p class="detailContainer__Modal--Content__SectionP lato-regular">{{ pokemon.types.map(typeDetail => typeDetail.type.name.charAt(0).toUpperCase() + typeDetail.type.name.slice(1)).join(', ') }}</p>

          </div>

        </div>

        <div class="detailContainer__Modal--Content__SectionButtons">

          <div class="detailContainer__Modal--Content__SectionButtonsFriends">

            <button type="button" class="detailContainer__Modal--Content__SectionButtonsFriendsBtn lato-bold" @click="copyPokemonInfo">Share to my friends</button>

          </div>

          <div class="detailContainer__Modal--Content__SectionButtonsFavorites">

            <v-icon :class="{ 'detailContainer__Modal--Content__SectionButtonsFavoritesIcon': true, 'favorite': isFavorite(pokemon), 'disabled': !isFavorite(pokemon) }" name="fa-star" @click="toggleFavorite(pokemon)" scale="2"/>
          
          </div>

        </div>

      </div>

    </div>

  </div>

</template>
  
<script setup>
import { defineProps, onMounted } from 'vue';
import Swal from 'sweetalert2'
import PokemonService from '@/services/PokemonService.js'
import { usePokemonStore } from '@/store/pokemon';

const service = new PokemonService();
const pokemon = service.getPokemon();

const store = usePokemonStore();

const props = defineProps({
    pokemonName: String
});

const toggleFavorite = (pokemon) => {
    store.toggleFavorite(pokemon);
};

const isFavorite = (pokemon) => {
    return store.isFavorite(pokemon);
};

const copyPokemonInfo = () => {
  const pokemonInfo = generatePokemonInfo(pokemon.value);
  copyToClipboard(pokemonInfo);
}

const generatePokemonInfo = (pokemon) => {
  const attributes = [
    `Name: ${pokemon.name}`,
    `Weight: ${pokemon.weight}`,
    `Height: ${pokemon.height}`,
    `Types: ${pokemon.types.map(typeDetail => typeDetail.type.name).join(', ')}`
  ];
  return attributes.join(', ');
}

const copyToClipboard = (text) => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  Swal.fire("Captured Pokémon")
}

onMounted(async () => {
    await service.fetchPokemon(props.pokemonName);
});

</script>
  
<style lang="scss" scoped>
  .detailContainer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;

    .detailContainer__Modal {
      background-color: $firstwhite;
      border-radius: 5px;
      width: 60vw;
      height: 70vh;

      .detailContainer__Modal--Head{
        height: 40%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-size: 100% 100%;
        background-position: center;
        position: relative;
        margin-bottom: 10px;
        .detailContainer__Modal--HeadBanner{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          .detailContainer__Modal--HeadBannerImg{
            width: 80%; 
            max-width: 200px; 
            height: auto; 
            margin: 0 auto; 
          }
        }

        .detailContainer__Modal--HeadClose{
          position: absolute; 
          top: 10px; 
          right: 10px;

          .detailContainer__Modal--HeadCloseIcon{
            color: $firstwhite;
            cursor: pointer;
            padding: 2px;
            font-size: 2.4em;
            border-radius: 50%;
          }
          
        }

      }

      .detailContainer__Modal--Content{
        display: flex;
        justify-content: center;
        align-items: start;
        flex-direction: column;
        margin-left: 20px;

        .detailContainer__Modal--Content__Section{
          display: flex;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1); 
          width: 90%;
          padding-bottom: 10px; 

          .detailContainer__Modal--Content__SectionPTitle{
            margin-right: 5px;
          }

          .detailContainer__Modal--Content__SectionP .detailContainer__Modal--Content__SectionPTitle{
            font-size: 18px;
            line-height: 27px;
          }

        }

        .detailContainer__Modal--Content__SectionButtons{
          margin-top: 20px;
          width: 100%;
          display: flex;
          justify-content: space-between;

          .detailContainer__Modal--Content__SectionButtonsFriends{
            .detailContainer__Modal--Content__SectionButtonsFriendsBtn{
              cursor: pointer;
              color: $primarywhite;
              background-color: $primary;
              border: none;
              border-radius: 60px;
              width: 150px;
              height: 44px;
              display: flex;
              justify-content: center;
              align-items: center;
            }

          }

          .detailContainer__Modal--Content__SectionButtonsFavorites{

            .detailContainer__Modal--Content__SectionButtonsFavoritesIcon {
              color: $disabled;
              cursor: pointer;
              padding: 2px;
              background-color: $bgapp;
              font-size: 2.4em;
              border-radius: 50%;
              margin-right: 20px;
            }

            .disabled{
              color: $disabled;
            }

            .favorite{
              color: $favorite;
            }
              
          }
          
        }

      }

    }

  }
  
</style>