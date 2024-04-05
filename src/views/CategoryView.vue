<template>
  <v-container>
    <v-card>
      <v-card-title>Jokes Category</v-card-title>
      <v-card-text>
        <v-chip-group>
          <v-chip v-for="category in categories" :key="category" @click="toggleCategory(category)">
            {{ category }}
          </v-chip>
        </v-chip-group>
        <br>
        <v-card-text v-if="selectedCategory">
          Selected category: {{ selectedCategory }}
        </v-card-text>
        <v-btn :disabled="!selectedCategory || loading" @click="addJoke" color="primary">
          Get a new Joke from Category
        </v-btn>
        <v-progress-circular v-if="loading" color="amber" indeterminate></v-progress-circular>
      </v-card-text>
      <v-card-text v-if="jokes.length > 0">
        <v-list v-for="joke in jokes" :key="joke.id">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-list-item-subtitle v-if="joke.url">
                  <v-btn :href="joke.url" target="blank" rel="noopener noreferrer" color="text">
                    {{ joke.value }}
                  </v-btn>
                </v-list-item-subtitle>
                <v-list-item-subtitle v-else>
                  {{ joke.value }}
                </v-list-item-subtitle>
              </v-list-item-title>
              <v-list-item-action>
                <v-btn icon @click="deleteJoke(joke.id)" color="error">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-text v-else>
        <p>No jokes here!</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      selectedCategory: '',
      categories: [],
      jokes: [],
      loading: false, // Added loading variable
    }
  },
  async beforeMount() {
    this.loading = true;
    try {
      const res = await axios.get('https://api.chucknorris.io/jokes/categories')
      this.categories = res.data
    } catch (error) {
      console.log(error)
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async addJoke() {
      this.loading = true;
      try {
        const res = await axios.get(`https://api.chucknorris.io/jokes/random?category=${this.selectedCategory}`)
        this.jokes.push(res.data)
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false;
      }
    },
    deleteJoke(id) {
      this.jokes = this.jokes.filter(j => j.id !== id)
    },
    toggleCategory(category) {
      this.selectedCategory = category
    },
  },
}
</script>

<style scoped>
/* Optional styling for the chips */
.v-chip--active {
  background-color: #007bff;
  color: #fff;
}
</style>
