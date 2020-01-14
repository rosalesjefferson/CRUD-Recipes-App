<template>
    <div class="login container">
        <form @submit.prevent="login" class="card-panel">
            <h2 class="center brown-text">Login</h2>
            <div class="row">
                <div class="input-field col s12">
                <i class="material-icons prefix">email</i>  
                <input placeholder="Enter Email" id="email" type="email" class="validate" v-model="email">
                </div>
            </div>

            <div class="row">
                <div class="input-field col s12">
                    <i class="material-icons prefix">lock</i>  
                <input placeholder="Enter Password" id="password" type="password" class="validate" v-model="password">
                </div>
            </div>

            <p v-if="feedback" class="red-text center">{{ feedback }}</p>
            <div class="field center">
                <button class="btn brown">Login</button>       
            </div>
        </form> 
    </div>
</template>


<script>
import firebase from 'firebase'
    export default {
        name: 'Login',
        data(){
            return{
                email: null,
                password: null,
                feedback: null
            }
        },
        methods: {
            login(){
                if(this.email && this.password){               
                    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                        .then(cred => {
                            this.$router.push({ name: 'Home'})
                        }).catch(error => {
                            this.feedback = error.message
                        })
                    this.feedback = null
                    
                } else{
                    this.feedback = "Please fill in both fields"
                }
            }
        }
    }
</script>


<style scoped>
    .login{
        max-width: 500px;
        margin-top: 60px;
    }
    .login h2{
        font-size: 2.4em;
    }
    .login .field{
        margin-bottom: 16px;
    }
</style>