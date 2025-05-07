<template>
  <div class="container">
    <img src="/logoFiore2.svg" alt="IMAGE" class="main-image" />


    <div class="cards-wrapper">
      <div class="card" @click="selectOption('storia')">

        <strong class="language">STORIA (Attivo)</strong>
      </div>

      <div class="card" @click="selectOption('mappa')">
        <strong class="language">MAPPA (Attivo)</strong>

      </div>
    </div>
    <div class="cards-wrapper">
      <div class="card" @click="selectOption('informazione')">

        <strong class="language">LISTA OPERE</strong>
      </div>

      <div class="card" @click="selectOption('contatti')">
        <strong class="language">INFORMAZIONE</strong>

      </div>
    </div>
    <br>
    <br>
    <div style="text-align:center">CREDITI</div>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

function selectOption(option) {
  switch (option) {
    case "mappa":
      router.push({ name: "Mappa", params: { lingua: route.params.lingua } });

      break; case "storia":
      router.push({ name: "Informazione", params: { lingua: route.params.lingua } });

      break;

  }
}
</script>
<style scoped>
.container {
  text-align: center;
  min-height: 90vh;
  box-sizing: border-box;
  background-image: url("/Mediamodifier-Design.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 4000px;
  background-position-x: -900px;
  background-position-y: -900px;
  
}

.main-image {
  width: 400px;
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
  color: black;
}

.flag {
  width: 46px;
  margin-bottom: 10px;
}

.language {
  font-size: 16px;
}
</style>
