<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app>
            <v-card class="mx-auto" max-width="400">
                <v-list>
                    <v-list-item-group v-model="model" mandatory color="red">
                        <v-list-item v-for="(item, i) in items" :key="i" :to="item.link">
                            <v-list-item-icon>
                                <v-icon v-text="item.icon"></v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title v-text="item.text"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-card>
        </v-navigation-drawer>

        <v-app-bar app>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>Manage your leads</v-toolbar-title>
        </v-app-bar>

        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: 'App',

    data: () => ({
        drawer: null,
        items: [
            {
                icon: 'mdi-home',
                text: 'Home',
                link: '/',
            },
            {
                icon: 'mdi-phone',
                text: 'Leads',
                link: 'leads/',
            },
        ],
        model: 1,
    }),
};
</script>
