<template>
  <v-app id="inspire">
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Chuck Norris Jokes</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item v-for="(menu, index) in routes" :key="index" :to="menu.route" :title="menu.name"/>
      </v-list>

    </v-navigation-drawer>
      <v-main class="bg-grey-lighten-2">
        <v-container>
          <v-row>
            <router-view></router-view>
          </v-row>
        </v-container>
      </v-main>
  </v-app>
</template>

<script>
export default {
    data: () => ({
      drawer: false,
      routes: [
        { route: '/', name: 'home'},
        { route: '/categories', name: 'category'},
        { route: '/search', name: 'search'},
        { route: '/about', name: 'about'}

      ]
     }),
  }
</script>

