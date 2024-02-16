<template>
    <div class="loadContainer">
      <img :src="load" alt="Loader Pokémon" class="loadContainer__Loader">
    </div>
  </template>
  
  <script setup>
  const load = require('@/assets/loader.png')
  </script>
  
  <style lang="scss" scoped>
  .loadContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  
    .loadContainer__Loader {
      width: 106px;
      height: 106px;
      animation: pulse 0.5s infinite alternate, rotateLeftRight 1.5s linear infinite; /* Agrega la animación rotateLeftRight */
    }
  
    @keyframes pulse {
      0% {
        opacity: 0.5; 
      }
      100% {
        opacity: 1;
      }
    }
  
    @keyframes rotateLeftRight {
      0%, 100% {
        transform: rotate(-10deg); 
      }
      50% {
        transform: rotate(10deg);
      }
    }
  }
  </style>
  