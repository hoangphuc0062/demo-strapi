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
          <!-- Auth buttons for non-authenticated users -->
          <template v-if="!authStore.isAuthenticated">
            <q-btn round flat @click="$router.push('/auth/login')">
              <q-icon name="login" />
              <q-tooltip>Đăng nhập</q-tooltip>
            </q-btn>
            <q-btn round flat @click="$router.push('/auth/register')">
              <q-icon name="person_add" />
              <q-tooltip>Đăng ký</q-tooltip>
            </q-btn>
          </template>

          <!-- User menu for authenticated users -->
          <template v-else>
            <q-btn round flat>
              <q-avatar size="26px">
                <img :src="userAvatar" />
              </q-avatar>

              <!-- Dropdown Menu -->
              <q-menu
                anchor="bottom right"
                self="top right"
                class="q-mt-xs"
                :offset="[0, 8]"
              >
                <q-list class="q-py-sm" style="min-width: 200px">
                  <!-- User Info -->
                  <q-item class="q-px-md q-py-sm">
                    <q-item-section avatar>
                      <q-avatar size="40px">
                        <img :src="userAvatar" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-weight-medium">{{ authStore.userDisplayName }}</q-item-label>
                      <q-item-label caption class="text-grey-6">{{ authStore.user?.email }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator class="q-my-sm" />

                  <!-- Menu Items -->
                  <q-item clickable v-close-popup @click="goToProfile">
                    <q-item-section avatar>
                      <q-icon name="person" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Hồ sơ của tôi</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="goToSettings">
                    <q-item-section avatar>
                      <q-icon name="settings" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Cài đặt</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator class="q-my-sm" />

                  <!-- Logout -->
                  <q-item clickable v-close-popup @click="logout" class="text-negative">
                    <q-item-section avatar>
                      <q-icon name="logout" color="negative" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Đăng xuất</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </template>

          <q-btn round flat @click="toggleDarkMode">
            <q-icon :name="isDarkMode ? 'dark_mode' : 'light_mode'" />
            <q-tooltip>{{ isDarkMode ? 'Chế độ sáng' : 'Chế độ tối' }}</q-tooltip>
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
import { useAuthStore } from 'src/stores/Auth';
import { useRouter } from 'vue-router';

export default {
  name: 'MyLayout',
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const authStore = useAuthStore();
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

    // User avatar - use default if no avatar in user data
    const userAvatar = computed(() => {
      return authStore.user?.avatar || 'https://cdn.quasar.dev/img/boy-avatar.png';
    });

    // Menu functions
    function goToProfile() {
      console.log('Đi tới trang hồ sơ');
      // Add routing logic here
      // router.push('/profile');
    }

    function goToSettings() {
      console.log('Đi tới trang cài đặt');
      // Add routing logic here
      // router.push('/settings');
    }

    function logout() {
      $q.dialog({
        title: 'Xác nhận đăng xuất',
        message: 'Bạn có chắc chắn muốn đăng xuất?',
        cancel: {
          label: 'Hủy',
          color: 'grey'
        },
        ok: {
          label: 'Đăng xuất',
          color: 'negative'
        },
        persistent: true
      }).onOk(() => {
        authStore.logout();
        void router.push('/auth/login');
      });
    }

    return {
      fabYoutube,
      authStore,
      leftDrawerOpen,
      search,
      toggleLeftDrawer,
      expandedItems,
      toggleChildren,
      toggleDarkMode,
      isDarkMode,
      userAvatar,
      goToProfile,
      goToSettings,
      logout,
      menu: [
        { icon: 'home', color: 'primary', text: 'Trang chủ', link: '/' },
        {
          icon: 'person', color: 'primary', text: 'Người dùng',
          children: [
            { icon: 'list', color: 'primary', text: 'Danh sách', link: '/user/list' },
            { icon: 'add', color: 'primary', text: 'Thêm', link: '/user/create' },
          ],
        },
        {
          icon: 'article',
          color: 'primary',
          text: 'Bài viết',
          children: [
            { icon: 'list', color: 'primary', text: 'Danh sách', link: '/article/list' },
            { icon: 'add', color: 'primary', text: 'Thêm', link: '/article/create' },
          ],
        },
        {
          icon: 'category',
          color: 'primary',
          text: 'Danh mục',
          children: [
            { icon: 'list', color: 'primary', text: 'Danh sách', link: '/category/list' },
            { icon: 'add', color: 'primary', text: 'Thêm', link: '/category/create' },
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
