<template>
  <div class="container-componentes">

    <!-- Details view component -->
    <div v-if="show" class="detail-general">
      <button
        type="button"
        style="font-size: 2rem; align-items: flex-end;"
        class="btn btn-link"
        @click="closeDetails"
      >x</button>
      <details-box :username="participantName"></details-box>
    </div>

    <!-- Observer panel view -->
    <div class="container-general">
      <h1>Observatorio de participantes</h1>

      <!-- Buttons to change boxes size  -->
      <div>
        <button
          @click="() => (this.len = 'participant-box-small')"
          class="btn btn-secondary"
          type="button"
        >Bajo</button>
        <button
          @click="() => (this.len = 'participant-box')"
          class="btn btn-secondary"
          type="button"
        >Medio</button>
        <button
          @click="() => (this.len = 'participant-box-big')"
          class="btn btn-secondary"
          type="button"
        >Alto</button>
      </div>
      <!-- Display all participants boxes -->
      <div v-if="participants.length > 0" class="participants-container">
        <div class="participant" v-for="(participant, i) in this.participants" :key="i">
          <participant-box
            @show="showDetail"
            :len="len"
            :username="participant.username"
            :results="participant.results"
            :principal="principal"
            :option="option"
            :limit="limit"
          ></participant-box>
        </div>
      </div>

      <!-- End connection or Finish session -->
      <div class="button-contaner">
        <button type="button" class="btn btn-primary" @click="endSession()">Finalizar Sesión</button>
        <button type="button" class="btn btn-primary" @click="endConextion()">Terminar conexión</button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ParticipantBox from "@/components/ParticipantBox.vue";
import DetailsBox from "@/components/DetailsBox.vue";
import axios from "axios";
export default {
  name: "general",
  components: {
    ParticipantBox,  // Participant box component
    DetailsBox  // Details panel component
  },
  data() {
    return {
      eventSource: null,  // Eventsource for Server-Sent Event
      participants: [],  // Participants list
      previous: "",  // Previous boxes length
      show: false,   // Flag to control detail view deploy
      len: "participant-box",  // Variable to control participant box length style
      participantName: "", // Selected participant name
      metrics: [], // Metrics values
      principal: "", // Principl metric
      option: "",  // Option parameter
      limit: 0,  // Limit number
    };
  },
  methods: {

    // Function to end client connection
    endConextion() {
      (this.participants = []), this.eventSource.close();
      axios.get(`${process.env.VUE_APP_API_URL}/end`).then(response => {
        this.alertSuccess("Conexión terminada");
        this.$router.push("/end");
      });
    },

    //Function to finish session
    endSession() {
      (this.participants = []), this.eventSource.close();
      axios.get(`${process.env.VUE_APP_API_URL}/endsession`).then(response => {
        this.alertSuccess("Sesión terminada");
        this.$router.push("/end");
      });
    },
    //Function to update metrics 
    updateMetrics(newMetrics, metric) {
      if (this.participants.length == 0) {
        this.participants = [...newMetrics];
      } else {
        newMetrics.map((metric, i) => {
          this.participants[i].results = Object.assign(
            {},
            this.participants[i].results,
            metric.results
          );
        });
      }
    },
    // Function to send http request for the initTime
    getInitTime() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/inittime`)
        .then(response => {
          console.log("response", response);
          this.$store.commit("setInitTime", {
            initTime: response.data.initTime
          });
        })
        .catch(error => {
          console.log(error);
        });
    },

    // Function to display detail view
    showDetail(id) {
      this.show = true;
      this.participantName = id;
      this.previous = this.len;
      this.len = "participant-box-small";
    },
    //Function to close detail view
    closeDetails() {
      this.show = false;
      this.len = this.previous;
    }
  },
  // Function called before rendering view
  created() {

    // Get configuration of global storage (vuex)
    let configuration = this.$store.getters.getConfiguration;
    // Define parameters
    this.metrics = configuration.metrics || [];
    this.principal = configuration.principal;
    this.limit = configuration.limit;
    this.option = configuration.option;
    // Init streaming connection
    this.eventSource = new EventSource(`${process.env.VUE_APP_API_URL}/init`);
    this.getInitTime();
    // Set listeners for SSe events
    this.metrics.map(metric => {
      this.eventSource.addEventListener(metric, e => {
        this.updateMetrics(JSON.parse(e.data), metric);
      });
    });
  }
};
</script>
