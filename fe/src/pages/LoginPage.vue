<template>
  <q-page class="flex flex-center login-page">
    <div class="login-container">
      <q-card class="login-card q-pa-lg shadow-10">
        <q-card-section class="text-center q-pb-md">
          <div class="text-h4 text-weight-bold text-primary q-mb-xs">
            Đăng nhập
          </div>
          <div class="text-grey-6">
            Chào mừng bạn quay trở lại
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="login" class="q-gutter-md">
            <q-input
              v-model="email"
              type="email"
              label="Email"
              outlined
              dense
              :rules="[val => !!val || 'Email là bắt buộc', val => /.+@.+\..+/.test(val) || 'Email không hợp lệ']"
              lazy-rules
              class="q-mb-md"
            >
              <template v-slot:prepend>
                <q-icon name="email" color="primary" />
              </template>
            </q-input>

            <q-input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              label="Mật khẩu"
              outlined
              dense
              :rules="[val => !!val || 'Mật khẩu là bắt buộc']"
              lazy-rules
              class="q-mb-lg"
            >
              <template v-slot:prepend>
                <q-icon name="lock" color="primary" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="showPassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="showPassword = !showPassword"
                />
              </template>
            </q-input>

            <div class="row justify-between items-center q-mb-md">
              <q-checkbox
                v-model="rememberMe"
                label="Ghi nhớ đăng nhập"
                color="primary"
              />
              <q-btn
                flat
                no-caps
                color="primary"
                label="Quên mật khẩu?"
                class="text-caption"
              />
            </div>

            <q-btn
              type="submit"
              color="primary"
              label="Đăng nhập"
              no-caps
              rounded
              size="md"
              class="full-width q-py-sm"
              :loading="loading"
            >
              <template v-slot:loading>
                <q-spinner-hourglass class="on-left" />
                Đang đăng nhập...
              </template>
            </q-btn>
          </q-form>
        </q-card-section>

        <q-separator class="q-my-md" />

        <q-card-section class="text-center q-pt-none">
          <div class="text-grey-6 q-mb-sm">
            Chưa có tài khoản?
          </div>
          <q-btn
            flat
            no-caps
            color="secondary"
            label="Đăng ký ngay"
            @click="$router.push('/auth/register')"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useAuthStore } from 'src/stores/Auth'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useMeta } from 'quasar'

export default {
  setup() {
    const $q = useQuasar()
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const showPassword = ref(false)
    const rememberMe = ref(false)
    const loading = ref(false)
    const authStore = useAuthStore()
    useMeta({
      title: 'Login',
      titleTemplate: title => `${title} - My Website`,
    })

    const login = async () => {
      loading.value = true
      try {
        const success = await authStore.login({
          identifier: email.value,
          password: password.value
        })

        if (success) {
          // Redirect to home page after successful login
          setTimeout(() => {
            void router.push('/')
          }, 1000)
        }
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: 'Đăng nhập thất bại. Vui lòng thử lại.',
          position: 'top'
        })
        console.log(error)
      } finally {
        loading.value = false
      }
    }

    return {
      email,
      password,
      showPassword,
      rememberMe,
      loading,
      login
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.login-container {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.login-card {
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

@media (max-width: 600px) {
  .login-container {
    padding: 16px;
  }

  .login-card {
    margin: 0;
  }
}
</style>
