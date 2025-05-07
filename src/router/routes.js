import SelectLingua from "../components/SelectLingua.vue";
import MainLayout from "../components/MainLayout.vue";
import HomePage from "../components/HomePage.vue";
import Mappa from "../components/Mappa.vue";
import Elenco from "../components/Elenco.vue";
import Scheda from "../components/Scheda.vue";
import Informazione from "../components/Informazione.vue";


const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", name: "SelectLingua", component: SelectLingua, props: true },
      { path: "/:lingua/home", name: "HomePage", component: HomePage, props: true },
      { path: "/:lingua/map", name: "Mappa", component: Mappa, props: true },
      { path: "/:lingua/info", name: "Informazione", component: Informazione, props: true },
      { path: "/:lingua/elenco", name: "Elenco", component: Elenco, props: true },
      { path: "/:lingua/scheda/:item", name: "Scheda", component: Scheda, props: true },
    
    ],
  },
];

export default routes;
