<template>
  <div id="app" class="wrapper">
    <!-- Display notifications -->
    <notifications :max="10" :width="450" ></notifications>
    <!-- Router component -->
    <router-view/>
     
  </div>

</template>
<script>
export default{
  data(){
    return{

    }
  },
  methods:{
  },
  mounted:function(){
    // Notifications
    window.EventBus.$on('notify',(event)=>{
      console.log('event', event)
      this.$notify({
        type:event.type,
        text:event.text
      })
    })
  }
}
</script>
