<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-btn color="primary" @click="addJoke">Get a new Joke</v-btn>
        <v-btn color="error" @click="clearJokes">Clear all Jokes</v-btn>
      </v-col>
      <v-col cols="12" md="6">
        <v-alert v-if="loading" type="info">Loading...</v-alert>
        <v-alert v-else-if="jokes.length === 0" type="info">No jokes here!</v-alert>
        <v-row v-else>
          <v-col v-for="joke in jokes" :key="joke.id" cols="12">
            <v-card class="mx-auto" color="#26c6da" max-width="400" theme="dark">
              <template v-slot:prepend>
                <v-icon size="x-large">mdi-karate</v-icon>
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
      jokes: [],
      loading: false,
    };
  },
  methods: {
    async addJoke() {
      this.loading = true;
      try {
        const res = await axios.get('https://api.chucknorris.io/jokes/random');
        const joke = {
          id: res.data.id,
          value: res.data.value,
          avatar: 'https://avataaars.io/?avatarStyle=Transparent&topType=Hat&accessoriesType=Blank&facialHairType=BeardLight&facialHairColor=Red&clotheType=Overall&clotheColor=Heather&eyeType=Default&eyebrowType=AngryNatural&mouthType=Serious&skinColor=Tanned',
          author: 'BIG Chuck',
          subtitle: 'THE BEST',
        };
        this.jokes.push(joke);
      } catch (error) {
        console.error('Error fetching joke:', error);
      } finally {
        this.loading = false;
      }
    },
    clearJokes() {
      this.jokes = [];
    },
  },
};
</script>

<style scoped>

</style>
