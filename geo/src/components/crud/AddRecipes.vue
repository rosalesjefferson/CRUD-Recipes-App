<template>
    <div class="add-recipes container AddRecipes">
        <h2 class="center-align brown-text">Add New Recipes</h2>
        <label for="title">Press tab to add more:</label> 
        <form @submit.prevent="AddRecipes">
             <div class="field title">
                <label for="title">Title:</label> 
                <input type="text" name="title" v-model="title">
            </div>
            <div v-for="(ingredient, index) in ingredients" :key="index" class="field">
                <label for="ingredient"> Ingredients:</label>
                <input type="text" name="ingredient" v-model="ingredients[index]">
                <i class="material-icons delete" @click="deleteIngredient(ingredient)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add Ingredient</label>
                <input type="text" name="ingredient" @keydown.tab.prevent="addIngredient" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn brown darken-4"> Add Ingredients </button>
            </div>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
    name: 'AddRecipes',
        data(){
            return{
                title: null,
                ingredients: [],
                another: null,
                feedback: null,
                slug: null,
            }
        },
        methods:{
            AddRecipes(){
                let ref = db.collection('recipes')
                if(this.title){
                     this.feedback = null
                        // create a slug
                        this.slug = slugify(this.title, {
                        replacement: '-',
                        remove: /[$*_+~.()'"!\-:@]/g,
                        lower: true
                        })
                    //save ingredients to firestore             
                    ref.add({
                        title: this.title,
                        ingredients: this.ingredients,
                        slug: this.slug,
                        email: firebase.auth().currentUser.email,
                        user_id: firebase.auth().currentUser.uid,
                    }).then(() => {
                        this.$router.push({ name: 'Home'})
                    }).catch((error) => {
                        console.log(error);
                    })
                } else{
                    this.feedback = 'Please fill in both fields'
                }
            },
            addIngredient(){
                //Add Tasks
                if(this.another){
                    this.ingredients.push(this.another)
                    this.another = null
                    this.feedback = null
                }else {
                    this.feedback = 'You must enter a value to add another ingredients'
                }               
            },
            deleteIngredient(ing){
                this.ingredients = this.ingredients.filter(ingredient =>{
                    return ingredient != ing
                })
            }
        }
    }
</script>

<style scoped>
.add-recipes{
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-recipes h2{
  font-size: 2em;
  margin: 20px auto;
}
.add-recipes .field{
  margin: 20px auto;
  position: relative;
}
.add-recipes .delete{
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
} 
</style>