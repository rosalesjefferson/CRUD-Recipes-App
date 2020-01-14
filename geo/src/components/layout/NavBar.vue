<template>
    <div class="navbar">
        <nav class="brown darken-3">
            <div class="container">
                     <router-link :to="{ name: 'Home' }">
                         <span class="brand-logo left">Recipes</span>
                    </router-link>
                     
                    <ul class="right">
                        <li v-if="!user"><router-link :to="{ name: 'Signup'}">Signup</router-link></li>
                        <li v-if="!user"><router-link :to="{ name: 'Login'}">Login</router-link></li>
                        <li v-if="user"><a class="nav-link text-primary">{{ user.email }}</a></li>
                        <li v-if="user"><a @click="logOut">Logout</a></li>
                    </ul>
            </div>
        </nav>
    </div>
</template>


<script>
import firebase from 'firebase'
export default {
    name: 'NavBar',
    data(){
        return{
            user: null,
            admin: null
        }
    },
    methods: {
        logOut(){
            firebase.auth().signOut().then(() => {
                this.$router.push({ name: 'Login'})
            })
        }
    },
    created(){
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                this.user = user
                if(firebase.auth().currentUser.uid == '3z0WU02sY8MdPcXPSCUuzt7285h1'){
                this.admin = user
            } else {
                this.admin = null
            }
            } else {
                this.user = null
            }

        })       
    }
    
}
</script>


<style scoped>

</style>


  