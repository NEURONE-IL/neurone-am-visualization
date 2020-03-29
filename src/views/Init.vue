<template>
  <!-- intermediate view to init the session -->
  <div class="success">
    <h3>Observatorio preparado</h3>
    <!-- Button to init the session -->
    <button @click="$router.push('/general')" class="btn btn-primary" type="button">Iniciar sesión</button>
    <!-- Button to return to configuration view -->
    <button @click="$router.push('/')" class="btn btn-primary" type="button">Volver a Configuración</button>
  </div>
</template>
