<template>
  <!-- Participant box -->
  <div :style="color" :class="this.local_len">
    
    <!-- Button to enlarge/reduce the participant box -->
    <button
      @click="changeSize"
      style=" align-self: flex-end;"
      type="button"
      :class="'btn btn-link '+ this.btn"
    >{{sizeButton}}</button>
    <div style="text-align: center;" class="box-username">
      <h4>{{this.username}}</h4>
    </div>

    <!-- Selected metrics values -->
    <div class="box-metric-general">

      <!-- Principal metric -->
      <div class="box-metric-principal">
        <div class="principal-content-text">{{this.principal}}</div>
        <div class="principal-content-num">{{this.results[principal]}}</div>
      </div>

      <!-- Others selected metrics -->
      <transition name="fadeHeight" made="out-in">
        <div v-show="collapse">
          <div v-for="(value,metric,index) in this.results" :key="index">
            <div v-if="metric!==principal" class="box-metric-principal">
              <div class="principal-content-text">{{metric}}</div>
              <div class="principal-content-num">{{value}}</div>
            </div>
          </div>
        </div>
      </transition>
      <!-- Button to display other metrics -->
      <button :class="'btn btn-link '+ this.btn" @click="collapseItem">Ver más</button>
    </div>
    <!-- Button to display details view -->
    <button
      @click="showDetails"
      style=" align-self: flex-end;"
      type="button"
      class="btn btn-link"
    >Detalles</button>
  </div>
</template>

<script>
export default {
  props: {
    username: String,  // Participant username
    results: {},   //Contains the metrics values
    len: String,  // Participant box length
    option: String,  //Option to control participant box color
    limit: Number,  // Limit number to control participant box color
    principal: String //Principal metric
  },
  data() {
    return {
      local_len: this.len,  // participant box length style
      sizeButton: "+",  // Size button symbol
      btn: "btn-small",  // Style to control the button symbol to resize the box
      collapse: false, // Flag to display other metrics
    };
  },
  methods: {
    // Display and hiding other metrics
    collapseItem() {
      this.collapse = !this.collapse;
    },
    // Emit function to display details view for a specific participant
    showDetails() {
      // this.len="participant-box-small"
      this.$emit("show", this.username);
    },

    // Function to change the size of participant box
    changeSize() {
      if (this.sizeButton === "+") {
        this.local_len = "participant-box-big";    
      } else {
        this.local_len = this.len;
      }
    },
    // Function to change de button size
    evaluateBtnSize() {
      if (this.local_len === "participant-box") {
        this.btn = "btn-small";
      } else if (this.local_len === "participant-box-small") {
        this.btn = "btn-small-small";
      } else {
        this.btn = "btn-small-big";
      }
    }
  },
  computed: {

    // Computed property to control the box color
    color: function() {
      let principal = this.results[this.principal];
      switch (this.option) {
        case "":
          return "";
          break;
        case "1":
          return principal >= this.limit ? "background-color: red;" : "";
          break;
        case "2":
          return principal <= this.limit ? "background-color: red;" : "";
        default:
          return "";
          break;
      }
    }
  },
  watch: {

    // Control de button size
    len: function() {
      this.local_len = this.len;
      this.evaluateBtnSize();
    },
    // Control the button symbol
    local_len: function() {
      if (this.local_len !== "participant-box-big") {
        this.sizeButton = "+";
      } else {
        this.sizeButton = "-";
      }
      this.evaluateBtnSize();
    }
  },
  created() {}
};
</script>