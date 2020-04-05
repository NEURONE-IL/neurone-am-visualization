<template>

  <!-- Metric component to select metrics -->
  <div style=" border: 2px solid rgb(187, 176, 176);" class="metric-parameters">
    <div class="parameters-title">
      <h5>Métricas</h5>
    </div>
    <!-- List all availables metrics -->
    <div class="metric-options">
      <div v-for="(metric,i) in metrics" :key="i" class="metric-container">
        <div class="option-continer">{{metric}}</div>
        <div>
          <input v-model="chekedMetrics" :value="metric" type="checkbox" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

      chekedMetrics:[], // Contains selected metrics
      metrics: [           // Contains all availables metrics
        "totalcover", 
        "bmrelevant",
        "precision",
        "recall",
        "f1",
        "usfcover",
        "numqueries",
        "ceffectiveness",
        "qeffectiveness",
        "activebm",
        "score",
        "pagestay",
        "writingtime",
        "modquery",
        "entropy"
        // "mousecliks",
        // "mousecoordinates",
        // "scrollmoves",
        // "writingtime"
      ]
    };
  },
  methods: {

    // Emit function to update selected metrics
    updateSelectedMetrics() {
      this.$emit("updateFunction", this.chekedMetrics);
    }
  },
  watch: {
    // Control metrics selection
    chekedMetrics: function() {
      this.updateSelectedMetrics();
    }
  }
};
</script>