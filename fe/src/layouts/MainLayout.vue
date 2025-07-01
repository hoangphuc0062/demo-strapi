<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn flat dense round @click="toggleLeftDrawer" aria-label="Menu" icon="menu" />

        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
          <q-icon :name="fabYoutube" color="red" size="28px" />
          <q-toolbar-title shrink class="text-weight-bold"> duc004 </q-toolbar-title>
        </q-btn>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="grey-8" icon="video_call" v-if="$q.screen.gt.sm">
            <q-tooltip>Create a video or post</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="apps" v-if="$q.screen.gt.sm">
            <q-tooltip>Apps</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="message" v-if="$q.screen.gt.sm">
            <q-tooltip>Messages</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating> 2 </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
          <q-btn round flat @click="toggleDarkMode">
            <q-icon :name="isDarkMode ? 'dark_mode' : 'light_mode'" />
            <q-tooltip>{{ isDarkMode ? 'Light mode' : 'Dark mode' }}</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-2" :width="240">
      <q-scroll-area class="fit">
        <q-list padding>
          <template v-for="link in menu" :key="link.text">
            <q-item v-ripple clickable @click="toggleChildren(link.text)" :to="link.link">
              <q-item-section avatar>
                <q-icon :color="link.color" :name="link.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ link.text }}</q-item-label>
              </q-item-section>
              <q-item-section side v-if="link.children">
                <q-icon :name="expandedItems.includes(link.text) ? 'expand_less' : 'expand_more'" />
              </q-item-section>
            </q-item>

            <!-- Render children if they exist and are expanded -->
            <template v-if="link.children && expandedItems.includes(link.text)">
              <q-item
                v-for="child in link.children"
                :key="child.text"
                v-ripple
                clickable
                class="q-ml-md"
                :to="child.link"
              >
                <q-item-section avatar>
                  <q-icon :color="child.color" :name="child.icon" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ child.text }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import { fabYoutube } from '@quasar/extras/fontawesome-v6';
import { useQuasar } from 'quasar';

export default {
  name: 'MyLayout',
  setup() {
    const $q = useQuasar();
    const leftDrawerOpen = ref(false);
    const search = ref('');
    const expandedItems = ref<string[]>([]);

    // Initialize dark mode from localStorage
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      $q.dark.set(savedDarkMode === 'true');
    }

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    function toggleDarkMode() {
      $q.dark.toggle();
      localStorage.setItem('darkMode', $q.dark.isActive ? 'true' : 'false');
    }
    const isDarkMode = computed(() => $q.dark.isActive);

    function toggleChildren(text: string) {
      if (expandedItems.value.includes(text)) {
        expandedItems.value = expandedItems.value.filter((item) => item !== text);
      } else {
        expandedItems.value.push(text);
      }
    }

    return {
      fabYoutube,
      leftDrawerOpen,
      search,
      toggleLeftDrawer,
      expandedItems,
      toggleChildren,
      toggleDarkMode,
      isDarkMode,
      menu: [
        { icon: 'home', color: 'primary', text: 'Home', link: '/' },
        { icon: 'whatshot', color: 'primary', text: 'Trending', link: '/trending' },
        { icon: 'subscriptions', color: 'primary', text: 'Subscriptions', link: '/subscriptions' },
        {
          icon: 'explore',
          color: 'primary',
          text: 'Explore',
          children: [
            { icon: 'music_note', color: 'primary', text: 'Music', link: '/music' },
            { icon: 'sports_esports', color: 'primary', text: 'Gaming', link: '/gaming' },
            { icon: 'newspaper', color: 'primary', text: 'News', link: '/news' },
            { icon: 'school', color: 'primary', text: 'Learning', link: '/learning' },
            { icon: 'sports_soccer', color: 'primary', text: 'Sports', link: '/sports' },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="sass">
.YL
  &__toolbar-input-container
    min-width: 100px
    width: 55%

  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%

  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem

    &:hover
      color: #000
</style>
