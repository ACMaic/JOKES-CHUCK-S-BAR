<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Search a Joke</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field v-model="search" label="Search for term" dense outlined clearable></v-text-field>
              <v-btn color="primary" :disabled="!search || loading" @click="searchJoke">
                Search
              </v-btn>
              <v-progress-circular v-if="loading" color="amber" indeterminate></v-progress-circular>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-alert v-if="jokes.length === 0 && !loading" type="info">No jokes found for your search!</v-alert>
        <v-row v-else>
          <v-col v-for="joke in jokes" :key="joke.id" cols="12">
            <v-card class="mx-auto" color="#26c6da" max-width="400" theme="dark">
              <template v-slot:prepend>
                <v-icon size="x-large">mdi-twitter</v-icon>
              </template>
              <v-card-text class="text-h5 py-2">{{ joke.value }}</v-card-text>
              <v-card-actions>
                <v-list-item class="w-100">
                  <template v-slot:prepend>
                    <v-avatar color="grey-darken-3" :image="joke.avatar"></v-avatar>
                  </template>
                  <v-list-item-title>{{ joke.author }}</v-list-item-title>
                  <v-list-item-subtitle>{{ joke.subtitle }}</v-list-item-subtitle>
                  <template v-slot:append>
                    <div class="justify-self-end">
                      <v-icon class="me-1" icon="mdi-heart"></v-icon>
                      <span class="subheading me-2">256</span>
                      <span class="me-1">·</span>
                      <v-icon class="me-1" icon="mdi-share-variant"></v-icon>
                      <span class="subheading">45</span>
                    </div>
                  </template>
                </v-list-item>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      search: '',
      jokes: [],
      loading: false,
    };
  },
  methods: {
    async searchJoke() {
      this.loading = true;
      try {
        const res = await axios.get(`https://api.chucknorris.io/jokes/search?query=${this.search}`);
        this.jokes = res.data.result.map(joke => ({
          id: joke.id,
          value: joke.value,
          avatar: 'https://avataaars.io/?avatarStyle=Transparent&topType=Hat&accessoriesType=Blank&facialHairType=BeardLight&facialHairColor=Red&clotheType=Overall&clotheColor=Heather&eyeType=Default&eyebrowType=AngryNatural&mouthType=Serious&skinColor=Tanned',
          author: 'BIG Chuck',
          subtitle: 'THE BEST',
        }));
      } catch (error) {
        console.error('Error fetching jokes:', error);
      } finally {
        this.loading = false;
      }
    },
    deleteJoke(id) {
      this.jokes = this.jokes.filter(joke => joke.id !== id);
    },
  },
};
</script>

<style scoped>
/* Estilos específicos para o seu componente, se necessário */
</style>
