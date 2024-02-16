<template>

  <main class="homeContainer">

    <div class="homeContainer__Welcome">

      <img :src="welcomeUrl" alt="Welcome banner" class="homeContainer__Welcome--Pokemon">

    </div>

    <div class="homeContainer__Content">

      <h1 class="homeContainer__Content--Title lato-bold">Welcome to Pokédex</h1>

      <p class="homeContainer__Content--Text lato-regular">The digital encyclopedia created by Profesor Oak is an invaluable tool to Trainers in the Pokémon world.</p>

    </div>

    <div class="homeContainer__Link">
        
      <router-link :to="{name:'pokemon'}" class="homeContainer__Link--Anchor lato-bold">Get started</router-link>
        
    </div>

  </main>

</template>

<script setup>
  
  const welcomeUrl = require('@/assets/welcome.png')

</script>

<style lang="scss" scoped>

.homeContainer{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;

  .homeContainer__Welcome{
    margin-left: 40px;
    .homeContainer__Welcome--Pokemon{
      width: 325px;
      height: 288px;
    }
  }
  .homeContainer__Content{
    margin: 5vw auto 3vw auto;

    .homeContainer__Content--Title{
      font-size: 26px;
      line-height: 31.2px;
      margin-bottom: 2vw;
    }
    .homeContainer__Content--Text{
      font-size: 18px;
      line-height: 27px;
      width: 70vw;
    }
  }

  .homeContainer__Link{
    
    .homeContainer__Link--Anchor{
      background-color: $primary;
      color: $primarywhite;
      width: 131px;
      height: 44px;
      gap: 10px;
      border-radius: 60px;
      text-decoration: none;
      padding: 11px 20px 11px 20px;
    }

  }

}

</style>
