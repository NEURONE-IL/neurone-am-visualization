<template>
  <div class="success">
    <h3>Sesión terminada</h3>
    <!-- Button to return to configuration view after finish session -->
    <button @click="$router.push('/')" class="btn btn-primary" type="button">Reiniciar sesión</button>
  </div>
</template>
