<template>
  <div class="page-container" v-if="info">
    <h3>{{ info.titolo }}</h3>
    <br />

    <div v-if="info.gallery?.length" class="gallery">
      <div ref="scrollContainer" class="gallery-scroll" @scroll="onScroll">
        <img
          v-for="(item, index) in info.gallery"
          :key="index"
          :src="
            'http://195.231.23.205:8079/assets/' + item.directus_files_id.id
          "
          :alt="item.directus_files_id.title || 'Immagine galleria'"
          class="gallery-image"
        />
      </div>

      <div class="dots">
        <span
          v-for="(item, index) in info.gallery"
          :key="index"
          class="dot"
          :class="{ active: index === currentIndex }"
          @click="scrollToIndex(index)"
        ></span>
      </div>
    </div>
    <p v-html="info.introduzione" style="text-align: justify"></p>
    <p v-html="info.storia" style="text-align: justify"></p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const info = ref();
const currentIndex = ref(0);
const scrollContainer = ref(null);

onMounted(async () => {
  try {
    const response = await fetch(
      "http://195.231.23.205:8079/items/APP/1?fields=*,gallery.*.*"
    );
    const json = await response.json();
    info.value = json.data;
  } catch (error) {
    console.error("Error al obtener los POI:", error);
  }
});

const scrollToIndex = (index) => {
  currentIndex.value = index;
  const container = scrollContainer.value;
  if (container) {
    const childWidth = container.offsetWidth;
    container.scrollTo({
      left: index * childWidth,
      behavior: "smooth",
    });
  }
};

const onScroll = () => {
  const container = scrollContainer.value;
  if (container) {
    const scrollLeft = container.scrollLeft;
    const width = container.offsetWidth;
    const index = Math.round(scrollLeft / width);
    currentIndex.value = index;
  }
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  font-family: Arial, sans-serif;
  box-sizing: border-box;
  padding: 5%;
}

.gallery-scroll {
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  width: 100%;
}

.gallery-scroll::-webkit-scrollbar {
  display: none;
}

.gallery-image {
  scroll-snap-align: center;
  flex: 0 0 100%;
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

/* Dots de navegación */
.dots {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.dot {
  height: 12px;
  width: 12px;
  margin: 0 5px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.3s;
  cursor: pointer;
}

.dot.active {
  background-color: #333;
}
</style>
