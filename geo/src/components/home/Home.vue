<template>
<div class="prnt">
  <div class="Entry card-content container ">
        <h2 class="brown-text center titles">List of Recipes</h2>
      </div>
  <div class="home container">
    <div class="card" v-for="recipe in recipes" :key="recipe.id">
      <div class="card-content">
        <i class="material-icons delete " @click="deleteTask(recipe.id)">delete</i>
        <h2 class="brown-text titles">{{ recipe.title }}</h2>
        <ul class="tasks">
          <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
             <span class="chip">{{ ingredient }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab brown">
        <router-link :to="{ name: 'Edit', params: {edit_recipe: recipe.slug}}">
              <i class="material-icons">edit</i>
        </router-link>
      </span>
    </div>
</div>
      <a href="" class="btn-floating btn-large brown addING">
        <router-link :to="{ name: 'AddRecipes'}">
            <i class="material-icons">add</i>
        </router-link>
      </a>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'
export default {
    name: 'Home',
    data(){
        return{
            recipes: [],
            searchTerm: null
        }
    },
    methods: {
      //delete doc from firestore
      deleteTask(recipeID){
        db.collection('recipes').doc(recipeID).delete()
          .then(() =>{
            this.recipes = this.recipes.filter(recipe => {
            return recipe.id != recipeID 
          })
        })
     }
    },
     created(){
      //  fetch data from firestore
      const data = db.collection('recipes')
      data.where('user_id', '==', firebase.auth().currentUser.uid).get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              let data = doc.data()
              data.id = doc.id
              this.recipes.push(data)
            })
          })
    }
}
</script>


<style scoped>
 .home{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
    margin-top: 60px;
  }
  .home h2{
    font-size: 1.8em;
    text-align: center;
    margin-top: 0;
  }
  .home .tasks{
    margin: 30px auto;
  }
  .home .tasks li{
    display: inline-block;
  }
  .home .delete{
    position: absolute;
    top: 4px;
    right: 3px;
    cursor: pointer;
    color: #aaa;
    font-size: 2em;
  }
  .Entry .entries{
    color:  brown;
  }
  .prnt{
    position: relative;
  }
  .addING{
    position: absolute;
    right: 500px;
    top: 10px
    
  }
</style>





