<template>
<!-- Details view -->
  <div class="detail-parameters">
    <!-- Details view title, with participant username -->
    <h1>Detalles {{this.username}}</h1>
    <!-- Metric component to select desired metric -->
    <metrics @updateFunction="updateMetrics" />

    <!-- Checkbox to disable/enable range time option through slider -->
    <div v-if="flag" style="text-align: center;">
      <input v-model="withRange" type="checkbox" />
      <label>Consultar por rango de tiempo</label>
    </div>
    <!-- Slider to define range time -->
    <div v-if="withRange" class="filter-parameters">
      <h1>Rango de tiempo</h1>
      <vue-slider
        v-model="value"
        :width="380"
        :min="0"
        :max="max"
        :marks="mark"
        :interval="1"
        :tooltip-placement="['top', 'bottom']"
        :tooltip="'always'"
        :enableCross="false"
      ></vue-slider>
    </div>

    <!-- Button to query selected metrics -->
    <div class="query-button">
      <button @click="makeQuery" type="button" class="btn btn-primary">Consultar</button>
    </div>
    <!-- Container to show results -->
    <div class="metric-parameters">
      <div class="parameters-title">
        <h5>Resultados</h5>
      </div>
      <div v-if="this.results.length>0" class="metric-options">
        <div v-for="(result,i) in results" :key="i" class="metric-container">
          <div class="option-continer">{{result.type}}</div>
          <div style=" font-weight: bold;">{{result.value}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
import Metrics from "@/components/Metrics.vue";
import axios from "axios";
export default {
  name: "details",
  props: ["username"],  //Participant username
  components: {
    VueSlider,
    Metrics
  },
  data() {
    return {
      value: [0, 0], // Define slider range
      max: 100,  // Define slider max value
      metrics: [],  //  Contains selected metrics
      flag: false,  // Conditional to slider
      results: [],  // Contains metrics values
      withRange: false,  // Conditio to show slider
      tftag: {               // Json to define slider TF tag
        label: "TF",
        style: {
          width: "8px",
          height: "8px",
          display: "block",
          backgroundColor: "red",
          transform: "translate(-2px, -2px)"
        },
        labelStyle: {
          color: "red"
        }
      },
      titag: {      // Json to define slider TI tag
        label: "TI",
        style: {
          width: "8px",
          height: "8px",
          display: "block",
          backgroundColor: "#69c0ff",
          transform: "translate(-2px, -2px)"
        },
        labelStyle: {
          color: "#69c0ff"
        }
      },
      mark: {    // Json to define slider marks
        0: {
          label: "TI",
          style: {
            width: "8px",
            height: "8px",
            display: "block",
            backgroundColor: "#69c0ff",
            transform: "translate(-2px, -2px)"
          },
          labelStyle: {
            color: "#69c0ff"
          }
        },
        100: {
          label: "TF",
          style: {
            width: "8px",
            height: "8px",
            display: "block",
            backgroundColor: "red",
            transform: "translate(-2px, -2px)"
          },
          labelStyle: {
            color: "red"
          }
        }
      }
    };
  },
  methods: {
    // Function to capture selected metrics
    updateMetrics(chekedMetrics) {
      this.metrics = [...chekedMetrics];
    },

    // Function to format query url for range time
    formatUrl(url) {
      let value = this.value;
      let ti = value[0],
        tf = value[1];
      if (ti == 0 && tf == 0) {
        return url;
      }
      //(tf,0)
      if (ti == 0 && tf > 0) {
        return url + `ti=${tf}`;
      }
      //(0,ti)
      if (ti > 0 && tf == this.max) {
        return url + `tf=${tf - ti}`;
      }
      //(ti,tf)
      else {
        return url + `ti=${ti}&tf=${this.max - tf}`;
      }
    },

    //Function to emit http request for metrics values
    makeQuery() {

      let username = this.username;
      let query_string_metrics = "";
      this.metrics.map(metric => {
        query_string_metrics = query_string_metrics + `metrics=${metric}&`;
      });

      let url = `${username}?${query_string_metrics}`;
      if (this.withRange) {
        url = this.formatUrl(url);
      }

      axios
        .get(`${process.env.VUE_APP_API_URL}/detail/${url}`)
        .then(response => {
          let results = response.data;
          results.map(r => {
            r["value"] = Math.round(r["value"] * 100) / 100;
          });
          this.results = results;
        });
    },

    // Function to get participant stage init time
    getInitTime() {
      this.flag = false;
      axios
        .get(`${process.env.VUE_APP_API_URL}/initstage/${this.username}`)
        .then(response => {
          console.log("response", response.data);
          let actualTime = Date.now();
          let initTime = response.data.value;
          let seconds = Math.round((actualTime - initTime) / 1000);
          this.max = seconds;
          this.value = [0, seconds];

          seconds = seconds.toString();
          let mark = {};
          mark["0"] = this.titag;
          mark[seconds] = this.tftag;
          this.mark = mark;
          this.flag = true;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getInitTime();
  }
};
</script>
