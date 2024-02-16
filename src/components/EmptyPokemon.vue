<template>

    <div class="emptyContainer">

        <div class="emptyContainer__Title lato-bold">

            <h1 class="emptyContainer__Title--Content">Uh-oh!</h1>

        </div>

        <div class="emptyContainer__Content lato-regular">

            <p class="emptyContainer__Content--Text">You look lost on your journey!</p>

        </div>

        <div class="emptyContainer__Link">

            <router-link :to="{name:'home'}" class="emptyContainer__Link--Anchor lato-bold">Go back home</router-link>

        </div>

    </div>

</template>

<style lang="scss" scoped>
.emptyContainer{
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;

    .emptyContainer__Title{
        .emptyContainer__Title--Content{
            margin: 0;
            line-height: 43.2px;
            font-size: 36px;
        }
        
    }

    .emptyContainer__Content{
        margin-bottom: 30px;

        .emptyContainer__Content--Text{
            line-height: 30px;
            font-size: 20px;
        }
    }

    .emptyContainer__Link{
    
    .emptyContainer__Link--Anchor{
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