<template>
  <div class="container">
    <img src="/logoFiore2.svg" alt="IMAGE" class="main-image" />

    <div class="cards-wrapper">
      <div class="card1" @click="selectOption('storia')" style="">
        <strong class="language">{{
          currentTranslations.storia || "STORIA"
        }}</strong>
      </div>

      <div class="card2" @click="selectOption('mappa')">
        <strong class="language">{{
          currentTranslations.mappa || "MAPPA"
        }}</strong>
      </div>
    </div>
    <div class="cards-wrapper">
      <div class="card" @click="selectOption('lista')">
        <strong class="language">{{
          currentTranslations.lista_opere || "LISTA OPERE"
        }}</strong>
      </div>

      <div class="card" @click="selectOption('contatti')">
        <strong class="language">{{
          currentTranslations.informazione || "INFORMAZIONE"
        }}</strong>
      </div>
    </div>
    <br>
    <div style="text-align: center;padding-top:20px">
      {{ currentTranslations.crediti || "CREDITI" }}
    </div>
<div class="footer-images" >
  <img src="/logo-fsc.png" alt="FSC Logo" style="  max-width: 40%;">
  <img src="/a-emblema-2.png" alt="Emblema" style="  max-width: 15%;padding-left:25px">
  <img src="/Matrice-Stemma-bg.png" alt="Stemma" style="  max-width: 15%;padding-left:25px">
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
        name: "Informazione",
        params: { lingua: route.params.lingua },
      });
      break;
    case "lista":
      router.push({ name: "Elenco", params: { lingua: route.params.lingua } });
      break;
  }
}
</script>

<style scoped>
.container {
  text-align: center;
  min-height: 100vh;
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
.card1 {
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
  background-image: url("data:image/svg+xml,%3Csvg%20height%3D%22800px%22%20width%3D%22800px%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20512%20512%22%3E%3Cstyle%3E.st0%7Bfill%3A%23000000%3Bopacity%3A0.3%7D%3C/style%3E%3Cg%3E%3Cpath%20class%3D%22st0%22%20d%3D%22M390.305%2C235.134H237.759v-12.689l-93.676-107.348V72.594h35.682V33.46h-35.682V0h-39.142v33.46H69.26v39.134h35.681v42.518L11.265%2C222.444V512h93.782v-88.388c0.03-10.748%2C8.732-19.45%2C19.473-19.465c10.741%2C0.015%2C19.442%2C8.717%2C19.457%2C19.465V512h71.575h16.028h6.178h149.737h113.239V361.667L390.305%2C235.134z%20M225.387%2C287.939v211.682h-9.835h-59.203v-76.009c0-17.584-14.246-31.837-31.829-31.837c-17.584%2C0-31.845%2C14.253-31.845%2C31.837v76.009H23.637V227.09l93.676-107.34V60.214H81.632V45.833l35.681%2C0.008V12.372h14.397V45.84h35.682v14.374h-35.682v59.528l93.676%2C107.348v20.417h159.299L480.93%2C357.8H237.759v-69.86H225.387z%20M488.362%2C499.621H387.495H237.759V370.18h250.604V499.621z%22/%3E%3Cpath%20class%3D%22st0%22%20d%3D%22M349.351%2C460.676v-52.601h-51.045v58.787h51.045V460.676z%20M336.979%2C454.482h-26.3v-34.035h26.3V454.482z%22/%3E%3Cpath%20class%3D%22st0%22%20d%3D%22M430.564%2C460.676v-52.601h-51.045v58.787h51.045V460.676z%20M418.192%2C454.482h-26.301v-34.035h26.301V454.482z%22/%3E%3Cpath%20class%3D%22st0%22%20d%3D%22M97.493%2C305.274h54.913v-6.186v-48.726H97.493V305.274z%20M109.867%2C262.734h30.167v30.168h-30.167V262.734z%22/%3E%3C/g%3E%3C/svg%3E");
  background-size: cover;
}
.card2 {
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
  background-image: url("data:image/svg+xml,%3Csvg%20width%3D%22800px%22%20height%3D%22800px%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20opacity%3D%220.3%22%3E%3Cg%20id%3D%22SVGRepo_bgCarrier%22%20stroke-width%3D%220%22/%3E%3Cg%20id%3D%22SVGRepo_tracerCarrier%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3Cg%20id%3D%22SVGRepo_iconCarrier%22%3E%3Cpath%20d%3D%22M3%208.70938C3%207.23584%203%206.49907%203.39264%206.06935C3.53204%205.91678%203.70147%205.79466%203.89029%205.71066C4.42213%205.47406%205.12109%205.70705%206.51901%206.17302C7.58626%206.52877%208.11989%206.70665%208.6591%206.68823C8.85714%206.68147%209.05401%206.65511%209.24685%206.60952C9.77191%206.48541%2010.2399%206.1734%2011.176%205.54937L12.5583%204.62778C13.7574%203.82843%2014.3569%203.42876%2015.0451%203.3366C15.7333%203.24444%2016.4168%203.47229%2017.7839%203.92799L18.9487%204.31624C19.9387%204.64625%2020.4337%204.81126%2020.7169%205.20409C21%205.59692%2021%206.11871%2021%207.16229V15.2907C21%2016.7642%2021%2017.501%2020.6074%2017.9307C20.468%2018.0833%2020.2985%2018.2054%2020.1097%2018.2894C19.5779%2018.526%2018.8789%2018.293%2017.481%2017.827C16.4137%2017.4713%2015.8801%2017.2934%2015.3409%2017.3118C15.1429%2017.3186%2014.946%2017.3449%2014.7532%2017.3905C14.2281%2017.5146%2013.7601%2017.8266%2012.824%2018.4507L11.4417%2019.3722C10.2426%2020.1716%209.64311%2020.5713%208.95493%2020.6634C8.26674%2020.7556%207.58319%2020.5277%206.21609%2020.072L5.05132%2019.6838C4.06129%2019.3538%203.56627%2019.1888%203.28314%2018.7959C3%2018.4031%203%2017.8813%203%2016.8377V8.70938Z%22%20stroke%3D%22%231C274C%22%20stroke-width%3D%220.408%22/%3E%3Cpath%20opacity%3D%220.5%22%20d%3D%22M9%206.63867V20.5%22%20stroke%3D%22%231C274C%22%20stroke-width%3D%220.408%22/%3E%3Cpath%20opacity%3D%220.5%22%20d%3D%22M15%203V17%22%20stroke%3D%22%231C274C%22%20stroke-width%3D%220.408%22/%3E%3C/g%3E%3C/svg%3E");
  background-size: cover;
}
.flag {
  width: 46px;
  margin-bottom: 10px;
}

.language {
  font-size: 16px;
}
.footer-images {
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  margin:30px
}

.footer-images img {
  flex: 1;
  height: auto;
  object-fit: contain;
}

</style>
