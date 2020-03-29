
<template>
  <!-- Configuration interface -->
  <div class="configuration">
    <h1>Configuracion de la sesión</h1>

    <!-- Metrics selection box -->
    <div class="configuration-field">
      <metrics @updateFunction="updateMetrics" />
    </div>
    <!-- Principal metric -->
    <div v-if="metrics.length>0" class="configuration-field">
      <div>Métrica principal</div>
      <select v-model="select">
        <option v-for="(metric,i) in metrics" :value="metric" :key="i">{{metric}}</option>
      </select>
    </div>

    <!-- Limit activation option -->
    <div v-if="metrics.length>0 && select" class="configuration-field">
      <div>Alertas</div>
      <input v-model="metricAlert" type="checkbox" />
    </div>
    <!-- Limit option -->
    <div v-if="metricAlert" class="configuration-field">
      <div>Opción</div>
      <div class="configuration-field">
        <input v-model="option" value="1" name="option" type="radio" />
        <label>Mayor</label>
        <input v-model="option" value="2" id="uno" name="option" type="radio" />
        <label>Menor</label>
      </div>
    </div>
    <!-- Limit number -->
    <div v-if="option" class="configuration-field">
      <div>Límite</div>
      <input type="number" min="0" step="0.01" v-model="limit" />
    </div>

    <!-- Update interval -->
    <div class="configuration-field">
      <div>Intervalo de actualización</div>
      <select v-model="interval">
        <option value="5">5 seg</option>
        <option value="10">10 seg</option>
        <option value="20">30 seg</option>
        <option value="30">60 seg</option>
      </select>
    </div>

    <!-- Send parameters to coordinator -->
    <button @click="sendConfiguration()" class="btn btn-primary" type="button">Crear sesión</button>
  </div>
</template>

<script>
// @ is an alias to /src

// Axios to send http request
import axios from "axios";
import Metrics from "@/components/Metrics.vue";

export default {
  name: "configuration",
  components: {
    Metrics // Component to select metrics
  },
  data() {
    return {
      metrics: [],    // Array with selected metrics
      select: 0,      // Index for principal metric
      option: "",     // Option for limit number
      limit: 0,       // Limit number
      metricAlert: false, // Boolean to enable/diable limit option
      interval: "10", // Update interval
     
    };
  },
  methods: {

    // Function to capture selected metrics of Metric componente. Called by emit.
    updateMetrics(chekedMetrics) {
      this.metrics = [...chekedMetrics];
    },

    // Function to sends http request and save parameters
    sendConfiguration() {
      let metrics = this.metrics;
      let interval = Number(this.interval) * 1000;
      let principal = this.select;
      let option = this.option;
      let limit = this.limit;
      let configuration = {
        metrics,
        interval,
        principal,
        option,
        limit
      };

      axios
        .post(`${process.env.VUE_APP_API_URL}/configure`, configuration)
        .then(response => {
          console.log("response", response);

          // Save parameters in global storage with Vuex
          this.$store.commit("setMetrics", {
            configuration: {
              metrics: response.data.metrics,
              principal: principal,
              option: option,
              limit: limit
            }
          });
          
          this.alertSuccess("Configuración cargada");

          // Go to init view
          this.$router.push("/init");
        })
        .catch(error => this.alertError(error));
    }
  },
  created() {
    
  }
};
</script>
