<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const myLingua = ref();

function selectLingua(lingua) {
  switch (lingua) {
    case "english":
      router.push({ name: "HomePage", params: { lingua: "english" } });

      break;
    case "italiano":
      router.push({ name: "HomePage", params: { lingua: "italiano" } });

      break;
  }
}
</script>

<template>
  <div class="container">
    <img src="/logo3rige.png" alt="IMAGE" class="main-image" />

    <!-- <h1 class="title">SELEZIONA UNA LINGUA</h1> -->

    <div class="cards-wrapper">
      <div class="card" @click="selectLingua('italiano')">
        <img src="/italy-flag-round-large.png" alt="ITALIANO" class="flag" />
        <strong class="language">ITALIANO</strong>
      </div>
      <div class="card" @click="selectLingua('english')">
        <img
          src="/United-kingdom_flag_icon_round.svg.png"
          alt="ENGLISH"
          class="flag"
        />
        <strong class="language">ENGLISH</strong>
      </div>

   
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;     
  min-height: 100vh;
  text-align: center;
  box-sizing: border-box;
  background-image: url("/Mediamodifier-Design.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 4000px;
  background-position-x: -900px;
  background-position-y: -900px;
  
}

.main-image {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  display: block;
}

.title {
  margin-top: 20px;
  font-size: 24px;
}

.cards-wrapper {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.card {
  background-color: #f5f5f5;
  padding: 30px 20px;
  width: 118px;
  height: 92px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color:black;
}

.flag {
  width: 46px;
  margin-bottom: 10px;
}

.language {
  font-size: 16px;
}
</style>
