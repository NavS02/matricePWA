<template>
  <div class="container">
        <div class="content">

    <img src="/logoFiore2.svg" alt="IMAGE" class="main-image" />

    <div class="cards-wrapper">
      <div class="card1" @click="selectOption('storia')">
        <div class="icon"></div>
        <strong class="language">{{
          currentTranslations.storia || "STORIA"
        }}</strong>
      </div>

      <div class="card2" @click="selectOption('mappa')">
        <div class="icon"></div>
        <strong class="language">{{
          currentTranslations.mappa || "MAPPA"
        }}</strong>
      </div>
    </div>

    <div class="cards-wrapper">
      <div class="card3" @click="selectOption('lista')">
        <div class="icon"></div>
        <strong class="language">{{
          currentTranslations.lista_opere || "LISTA OPERE"
        }}</strong>
      </div>

      <div class="card4" @click="selectOption('informazione')">
        <div class="icon"></div>
        <strong class="language">{{
          currentTranslations.informazione || "INFORMAZIONE"
        }}</strong>
      </div>
    </div>

    <br />
    <div
      style="text-align: center; padding-top: 20px"
      @click="selectOption('crediti')"
    >
      {{ currentTranslations.crediti || "CREDITI" }}
    </div>
        </div>
    <div class="footer-images">
      <img src="/logo-fsc.png" alt="FSC Logo" style="max-width: 40%" />
      <img
        src="/a-emblema-2.png"
        alt="Emblema"
        style="max-width: 15%; padding-left: 25px"
      />
      <img
        src="/Matrice-Stemma-bg.png"
        alt="Stemma"
        style="max-width: 15%; padding-left: 25px"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const currentLanguage = ref("italiano");
const currentTranslations = ref({});
let hasLoadedTranslations = false;

const loadTranslations = async () => {
  try {
    let data;
    const stored = localStorage.getItem("translations");

    if (stored) {
      data = JSON.parse(stored);
    } else {
      const response = await fetch("/translations.json");
      data = await response.json();
      localStorage.setItem("translations", JSON.stringify(data));
    }

    currentLanguage.value = route.params.lingua || "italiano";
    currentTranslations.value = data[currentLanguage.value];
  } catch (error) {
    console.error("Error loading translations:", error);
  }
};
watch(
  () => route.params.lingua,
  async (newLang, oldLang) => {
    if (newLang !== oldLang) {
      await loadTranslations();
    }
  },
  { immediate: true }
);

onMounted(async () => {
  currentLanguage.value = route.params.lingua || "italiano";

  const storedTranslations = localStorage.getItem("translations");
  if (storedTranslations) {
    const parsed = JSON.parse(storedTranslations);
    currentTranslations.value = parsed[currentLanguage.value];
  } else {
    await loadTranslations();
  }
});

function selectOption(option) {
  switch (option) {
    case "mappa":
      router.push({ name: "Mappa", params: { lingua: route.params.lingua } });
      break;
    case "storia":
      router.push({
        name: "Storia",
        params: { lingua: route.params.lingua },
      });
      break;
    case "lista":
      router.push({ name: "Elenco", params: { lingua: route.params.lingua } });
      break;
    case "informazione":
      router.push({
        name: "Informazione",
        params: { lingua: route.params.lingua },
      });
      break;
       case "crediti":
      router.push({
        name: "Crediti",
        params: { lingua: route.params.lingua },
      });
      break;
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

.footer-images {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  margin-top: 40px;
  padding: 20px;
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

.card1,
.card2,
.card3,
.card4 {
  width: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.card1 .icon,
.card2 .icon,
.card3 .icon,
.card4 .icon {
  width: 118px;
  height: 92px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 60%;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
}

.card1 .icon {
  background-image: url("data:image/svg+xml,%3Csvg width='20px' height='20px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.0002 8L8.79795 9.5611C8.14576 9.87904 7.81967 10.038 7.58124 10.278C7.37041 10.4903 7.20988 10.7471 7.11148 11.0297C7.0002 11.3492 7.0002 11.7119 7.0002 12.4375V21H17.0002V12.4375C17.0002 11.7119 17.0002 11.3492 16.8889 11.0297C16.7905 10.7471 16.63 10.4903 16.4192 10.278C16.1807 10.038 15.8546 9.87904 15.2024 9.5611L12.0002 8ZM12.0002 8V3M14.0002 5H10.0002M7.0002 13L4.76897 14.1156C4.12683 14.4366 3.80576 14.5971 3.57118 14.8366C3.36374 15.0484 3.20598 15.3037 3.10931 15.5839C3 15.9009 3 16.2598 3 16.9778V21H21V16.9777C21 16.2598 21 15.9008 20.8907 15.5839C20.794 15.3037 20.6363 15.0484 20.4289 14.8366C20.1943 14.5971 19.8732 14.4366 19.2311 14.1155L17.0002 13M14.0002 21V17C14.0002 15.8954 13.1048 15 12.0002 15C10.8956 15 10.0002 15.8954 10.0002 17V21H14.0002Z' stroke='%23b57171' stroke-opacity='0.5' stroke-width='0.48' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
}

.card2 .icon {
  background-image: url("data:image/svg+xml,%3Csvg width='20px' height='20px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 6H12.01M9 20L3 17V4L5 5M9 20L15 17M9 20V14M15 17L21 20V7L19 6M15 17V14M15 6.2C15 7.96731 13.5 9.4 12 11C10.5 9.4 9 7.96731 9 6.2C9 4.43269 10.3431 3 12 3C13.6569 3 15 4.43269 15 6.2Z' stroke='%23b57171' stroke-opacity='0.5' stroke-width='0.48' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
}

.card3 .icon {
  background-image: url("data:image/svg+xml,%3Csvg width='40px' height='40px' viewBox='-2.4 0 39.9 39.9' xmlns='http://www.w3.org/2000/svg' fill='none'%3E%3Cg id='Group_57' data-name='Group 57' transform='translate(-223 -130.1)'%3E%3Cpath d='M251,144v25m-21,0V144m7,2v23m7-23v23m-16,0h25' fill='none' stroke='%23b57171' stroke-linecap='round' stroke-linejoin='round' stroke-width='0.798' stroke-opacity='0.5'/%3E%3Cpath d='M227.5,138.1a2.689,2.689,0,0,1,2.7-2.7,3.372,3.372,0,0,1,3.4,3.4,4.268,4.268,0,0,1-4.3,4.3,5.335,5.335,0,0,1-5.3-5.3,6.7,6.7,0,0,1,6.7-6.7h19.7a6.7,6.7,0,0,1,6.7,6.7,5.335,5.335,0,0,1-5.3,5.3,4.268,4.268,0,0,1-4.3-4.3,3.372,3.372,0,0,1,3.4-3.4,2.689,2.689,0,0,1,2.7,2.7' fill='none' stroke='%23b57171' stroke-linecap='round' stroke-linejoin='round' stroke-width='0.798' stroke-opacity='0.5'/%3E%3Cpath d='M234,139h13' fill='none' stroke='%23b57171' stroke-linecap='square' stroke-width='0.798' stroke-opacity='0.5'/%3E%3C/g%3E%3C/svg%3E");
}

.card4 .icon {
  background-image: url("data:image/svg+xml,%3Csvg width='40px' height='40px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='10' stroke='%23b57171' stroke-width='0.48' stroke-opacity='0.5'/%3E%3Cpath d='M12 17V11' stroke='%23b57171' stroke-width='0.48' stroke-linecap='round' stroke-opacity='0.5'/%3E%3Ccircle cx='1' cy='1' r='1' transform='matrix(1 0 0 -1 11 9)' fill='%23b57171' fill-opacity='0.5'/%3E%3C/svg%3E");
}

.language {
  font-size: 18px !important;
  color: #b57171;
  margin-top: 8px; 
  text-align: center;
}

.flag {
  width: 46px;
  margin-bottom: 10px;
}

.language {
  font-size: 18px !important;
  color: #b57171;
  margin-top: 8px;
  text-align: center;
}

</style>
