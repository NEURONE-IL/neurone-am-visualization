<template>
    <main class="login">
            <form class="form login-form">
              <h3>Inicio de sesión</h3>
                <label for="login-user">Usuario</label>
                <input type="text" id="login-user" v-model="email" v-on:keyup.enter="login()">
                <label for="login-password">Contraseña</label>
                <input type="password" id="login-password" v-model="password" v-on:keyup.enter="login()">
                <div class="buttons-container">
                    <button type="button" class="btn btn-primary" @click="login()">Iniciar sesión</button>
                </div>
                <!--<span>¿No tiene una cuenta? <a href="">Regístrese</a></span>-->
            </form>
    </main>
</template>

<script>
export default {
    data(){
        return {
            email:'',
            password:'',
            errorMsg:''
        }
    },
    components:{
    },
    methods:{
        login: async function() {
          try {
            let loginData = { 'email': this.email, 'password': this.password }
            let response = await this.$http.post('/login', loginData)
            //TODO: almacenar datos de usuario
            this.$store.commit('setJwtToken', { jwt: response.data })
            this.$store.commit('setUserData', { data: response.data })
            //redirige al Inicio
            this.$router.push('/')
          } catch (error) {
            if (error.response && error.response.data){ //error de autenticación
              let message = error.response.data.message
              this.alertError(message)
            }else{//error de serivdor
              this.alertError(this.$strings.error.general)
            }
          }
        }
    }
}
</script>
