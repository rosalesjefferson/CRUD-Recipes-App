<template>
    <div class="signup container">
      <form @submit.prevent="signup" class="card-panel"> 
        <h2 class="center brown-text">Signup</h2>
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

            <div class="row">
                <div class="input-field col s6"> 
                    <i class="material-icons prefix">account_circle</i>  
                <input placeholder="Enter First Name" name="firstName" type="text" class="validate" v-model="firstName">  
                </div>
                <div class="input-field col s6">
                    <input placeholder="Enter Last Name" name="lastName" type="text" class="validate" v-model="lastName">        
                </div>
            </div>
            <div class="field center">
                <button class="btn brown">Signup</button>
            </div>
    </form>
    </div>
</template>

<script>
import database from '@/firebase/init'
import firebase from 'firebase' 
const db = database.collection('users')
const auth = firebase.auth()
export default {
    name: 'Signup',
    data(){
        return{
            email: null,
            password: null,
            firstName: null,
            lastName: null,
            feedback: null
        }
    },
    methods: {
        signup(){
            if(this.firstName && this.lastName && this.email && this.password){       
                    auth.createUserWithEmailAndPassword(this.email, this.password) //firebase library
                        .then(cred =>{
                            let user = cred.user                      
                            let reference = db.doc(user.uid)                     
                            reference.set({ 
                                firstName: this.firstName,
                                lastName: this.lastName,
                                email: this.email,
                                user_ids: user.uid
                            })
                        }).then(() => {
                            this.$router.push({ name: 'Home'})
                        }).catch(error => {
                            console.log(error)
                            this.feedback = error.message
                        })
            } else{
                this.feedback = "You must enter all fields"
            }  
    }            
    }     
}
</script>

<style scoped>
    .signup{
        max-width: 500px;
        margin-top: 60px;
    }
    .signup h2{
        font-size: 2.4em;
    }
    .signup .field{
        margin-bottom: 16px;
    }








/* 
     <h2 class="center brown-text">Signup</h2>
            <div class="field">
                <label for="firstName">First Name:</label>
                <input type="text" name="firstName" v-model="firstName">       
            </div>
            <div class="field">
                <label for="lastName">Last Name:</label>
                <input type="text" name="lastName" v-model="lastName">       
            </div>
            <div class="field">
                <label for="bio">Bio:</label>
                <input type="text" name="bio" v-model="bio">       
            </div>
             <div class="field">
                <label for="email">Email:</label>
                <input type="text" name="email" v-model="email">       
            </div>
            <div class="field">
                <label for="password">Password:</label>
                <input type="password" name="password" v-model="password">       
            </div>
            <p class="red-text center" v-if="feedback">{{ feedback }}</p>
            <div class="field center">
                <button class="btn brown">Signup</button>
            </div> */
</style>






