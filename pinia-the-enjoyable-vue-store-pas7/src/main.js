import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

// Importar el plugin de historia de Pinia
import { piniaHistoryPlugin } from "@/plugins/PiniaHistoryPlugin";

// Crear la instancia de Pinia
const pinia = createPinia();
pinia.use(piniaHistoryPlugin); // ✅ Registrar el plugin correctamente

// Hacer Pinia accesible globalmente para pruebas en consola
window.pinia = pinia; 

import FontAwesomePlugin from "./plugins/FontAwesome";
import "./assets/main.pcss";

// App Wide Components
import AppButton from "./components/AppButton.vue";
import AppCountInput from "./components/AppCountInput.vue";
import AppModalOverlay from "./components/AppModalOverlay.vue";

// Crear la aplicación con Vue
const app = createApp(App);
app.use(pinia)  // ✅ Aquí se usa la misma instancia de Pinia
   .use(FontAwesomePlugin)
   .component("AppButton", AppButton)
   .component("AppCountInput", AppCountInput)
   .component("AppModalOverlay", AppModalOverlay)
   .mount("#app");
