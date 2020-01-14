<template>
 <div v-if="recipes" class="edit-recipes container">
        <h2 class="center-align brown-text">Edit: {{ recipes.title }}</h2>
        <p class=" black-text">Press tab to add more ingredients</p>

         <form @submit.prevent="editRecipes">
            <div class="field title">
                <label for="title">Title:</label> 
                <input type="text" name="title" v-model="recipes.title">
            </div>
            <div v-for="(ingredient, index) in recipes.ingredients" :key="index" class="field ingredient">
                <label for="ingredient"> Ingredient:</label>
                <input type="text" name="ingredient" v-model="recipes.ingredients[index]">
                <i class="material-icons delete" @click="deleteIngredients(ingredient)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Edit Ingredients:</label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="editIngredients" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn brown darken-4">Update Recipes </button>
            </div>
        </form>
    </div>
</template>


<script>
import firebase from 'firebase'
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'Edit',
    data(){
        return{
            recipes: null,
            feedback: null,
            another: null,
            slug: null
        }
    },
     methods: {
            editRecipes(){
                 if(this.recipes.title){
                     this.feedback = null
                        this.slug = slugify(this.recipes.title, {
                        replacement: '-',
                        remove: /[$*_+~.()'"!\-:@]/g,
                        lower: true
                        })
                    db.collection('recipes').doc(this.recipes.id).update({
                        title: this.recipes.title,
                        slug: this.slug,
                        ingredients: this.recipes.ingredients
                    }).then(() => {
                        this.$router.push({ name: 'Home'})
                    }).catch((error) => {
                        console.log(error);
                    })
                } else{
                    this.feedback = 'Please fill in both fields'
                }
            },
            editIngredients(){
                 if(this.another){
                    this.recipes.ingredients.push(this.another)
                    this.another = null 
                    this.feedback = null
                 } else{
                     this.feedback = 'You must enter a value to add ingredients'
                 }
            },
            deleteIngredients(ing){
                this.recipes.ingredients = this.recipes.ingredients.filter(ingredient =>{
                    return ingredient != ing
                })
            }
        },
        created(){
            let reference = db.collection('recipes').where('slug', '==', this.$route.params.edit_recipe)
                reference.get().then(snapshot => {
                snapshot.forEach(doc => {
                    this.recipes = doc.data()
                    this.recipes.id = doc.id
                    console.log(doc.data());
                })
            })
        }
}
</script>


<style scoped>
.edit-recipes{
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-recipes h2{
  font-size: 2em;
  margin: 20px auto;
}
.edit-recipes .field{
  margin: 20px auto;
  position: relative;
}
.edit-recipes .delete{
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>