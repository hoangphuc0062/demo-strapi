<template>
  <q-page class="flex flex-center register-page">
    <div class="register-container">
      <q-card class="register-card q-pa-lg shadow-10">
        <q-card-section class="text-center q-pb-md">
          <div class="text-h4 text-weight-bold text-primary q-mb-xs">
            Đăng ký
          </div>
          <div class="text-grey-6">
            Tạo tài khoản mới để bắt đầu
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="register" class="q-gutter-md">
            <q-input
              v-model="ho"
              label="Họ"
              outlined
              dense
              lazy-rules
              class="q-mb-md"
            >
              <template v-slot:prepend>
                <q-icon name="person" color="primary" />
              </template>
            </q-input>
            <q-input
              v-model="ten"
              label="Tên người dùng"
              outlined
              dense
              :rules="[(val: string) => !!val || 'Tên người dùng là bắt buộc', (val: string) => val.length >= 3 || 'Tên người dùng phải có ít nhất 3 ký tự']"
              lazy-rules
              class="q-mb-md"
            >
              <template v-slot:prepend>
                <q-icon name="person" color="primary" />
              </template>
            </q-input>

            <q-input
              v-model="email"
              type="email"
              label="Email"
              outlined
              dense
              :rules="[(val: string) => !!val || 'Email là bắt buộc', (val: string) => /.+@.+\..+/.test(val) || 'Email không hợp lệ']"
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
              :rules="[
                (val: string) => !!val || 'Mật khẩu là bắt buộc',
                (val: string) => val.length >= 6 || 'Mật khẩu phải có ít nhất 6 ký tự'
              ]"
              lazy-rules
              class="q-mb-md"
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

            <q-input
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              label="Xác nhận mật khẩu"
              outlined
              dense
              :rules="[
                (val: string) => !!val || 'Xác nhận mật khẩu là bắt buộc',
                (val: string) => val === password || 'Mật khẩu xác nhận không khớp'
              ]"
              lazy-rules
              class="q-mb-lg"
            >
              <template v-slot:prepend>
                <q-icon name="lock_outline" color="primary" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="showConfirmPassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="showConfirmPassword = !showConfirmPassword"
                />
              </template>
            </q-input>

            <div class="q-mb-md">
              <q-checkbox
                v-model="agreeTerms"
                color="primary"
                :rules="[(val: boolean) => !!val || 'Bạn phải đồng ý với điều khoản sử dụng']"
              >
                <span class="text-body2">
                  Tôi đồng ý với
                  <q-btn flat no-caps color="primary" label="Điều khoản sử dụng" class="text-caption q-pa-none" />
                  và
                  <q-btn flat no-caps color="primary" label="Chính sách bảo mật" class="text-caption q-pa-none" />
                </span>
              </q-checkbox>
            </div>

            <q-btn
              type="submit"
              color="primary"
              label="Đăng ký"
              no-caps
              rounded
              size="md"
              class="full-width q-py-sm"
              :loading="loading"
              :disable="!agreeTerms"
            >
              <template v-slot:loading>
                <q-spinner-hourglass class="on-left" />
                Đang đăng ký...
              </template>
            </q-btn>
          </q-form>
        </q-card-section>

        <q-separator class="q-my-md" />

        <q-card-section class="text-center q-pt-none">
          <div class="text-grey-6 q-mb-sm">
            Đã có tài khoản?
          </div>
          <q-btn
            flat
            no-caps
            color="secondary"
            label="Đăng nhập ngay"
            @click="$router.push('/auth/login')"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/Auth'
import { useMeta } from 'quasar'

export default {
  setup() {
    const $q = useQuasar()
    const router = useRouter()
    const authStore = useAuthStore()

    const ho = ref('')
    const ten = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const showPassword = ref(false)
    const showConfirmPassword = ref(false)
    const agreeTerms = ref(false)
    const loading = ref(false)

    useMeta({
      title: 'Register',
      titleTemplate: title => `${title} - My Website`,
    })

    const register = async () => {
      if (!agreeTerms.value) {
        $q.notify({
          type: 'negative',
          message: 'Bạn phải đồng ý với điều khoản sử dụng',
          position: 'top'
        })
        return
      }

      if (password.value !== confirmPassword.value) {
        $q.notify({
          type: 'negative',
          message: 'Mật khẩu xác nhận không khớp',
          position: 'top'
        })
        return
      }

      loading.value = true
      try {
        const success = await authStore.register({
          ho: ho.value,
          ten: ten.value,
          email: email.value,
          matKhau: password.value,
          soDienThoai: '',
        })

        if (success) {
          // Redirect to main page after successful registration and login
          setTimeout(() => {
            void router.push('/')
          }, 1500)
        }

      } catch (error) {
        console.log(error)
        $q.notify({
          type: 'negative',
          message: 'Đăng ký thất bại. Vui lòng thử lại.',
          position: 'top'
        })
      } finally {
        loading.value = false
      }
    }

    return {
      ho,
      ten,
      email,
      password,
      confirmPassword,
      showPassword,
      showConfirmPassword,
      agreeTerms,
      loading,
      register
    }
  }
}
</script>

<style lang="scss" scoped>
.register-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.register-container {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.register-card {
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

@media (max-width: 600px) {
  .register-container {
    padding: 16px;
  }

  .register-card {
    margin: 0;
  }
}
</style>