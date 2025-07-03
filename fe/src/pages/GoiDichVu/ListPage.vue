<template>
  <q-page class="q-pa-md bg-grey-1">
    <!-- Header Section -->
    <div class="text-center q-py-xl">
      <h2 class="text-h3 text-weight-light text-grey-8 q-mb-md">Gói dịch vụ</h2>
      <p class="text-h6 text-grey-6 q-mb-none">Chọn gói dịch vụ phù hợp với nhu cầu của bạn.</p>
      <p class="text-body1 text-grey-5">Chọn gói dịch vụ phù hợp với nhu cầu của bạn.</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center q-py-xl">
      <q-spinner-dots size="3em" color="primary" />
      <div class="text-h6 q-mt-md text-grey-6">Đang tải gói dịch vụ...</div>
    </div>

    <!-- No Data State -->


    <!-- Pricing Cards -->
    <div v-else-if="goiDichVus.length > 0" class="row justify-center q-gutter-lg q-px-md q-pb-xl">
      <div
        v-for="(plan, index) in goiDichVus"
        :key="plan.documentId"
        class="col-12 col-md-4 col-lg-3"
        style="max-width: 350px;"
      >
        <q-card
          class="pricing-card full-height"
          :class="{ 'popular-card': index === 1 }"
        >
          <!-- Popular Badge -->
          <div v-if="index === 1" class="popular-badge">
            <q-chip
              color="blue"
              text-color="white"
              label="Popular"
              size="sm"
            />
          </div>

          <q-card-section class="text-center q-pt-xl q-pb-lg">
            <!-- Icon -->
            <div class="plan-icon q-mb-lg">
              <q-avatar
                :color="getPlanColor(index)"
                size="80px"
                class="plan-avatar"
              >
                <q-icon
                  :name="getPlanIcon(index)"
                  size="40px"
                  color="white"
                />
              </q-avatar>
            </div>

            <!-- Plan Name -->
            <div class="text-h5 text-weight-medium text-grey-8 q-mb-sm">
              {{ plan.tenGoi }}
            </div>


            <!-- Price -->
            <div class="price-section q-mb-lg">
              <div class="price-main">
                <span class="currency">$</span>
                <span class="amount">{{ plan.gia ? Math.floor(plan.gia / 25000) : '0' }}</span>
                <span class="period">/month</span>
              </div>
              <div class="price-details text-caption text-grey-6">
                <div v-if="plan.gia">
                  {{ formatCurrency(plan.gia) }}/Year
                </div>
                <div v-else>free</div>
              </div>
            </div>
          </q-card-section>

          <!-- Features -->
          <q-card-section class="q-pt-none q-pb-lg">
            <q-list class="features-list">
              <q-item class="q-px-none">
                <q-item-section avatar class="q-pr-sm">
                  <q-icon name="radio_button_unchecked" size="xs" color="grey-4" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-body2 text-grey-7">
                    {{ plan.soLuongPublic }} bài viết
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item class="q-px-none">
                <q-item-section avatar class="q-pr-sm">
                  <q-icon name="radio_button_unchecked" size="xs" color="grey-4" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-body2 text-grey-7">
                    {{ plan.soLuongDaft === -1 ? 'Không giới hạn' : plan.soLuongDaft }} bài viết
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item class="q-px-none">
                <q-item-section avatar class="q-pr-sm">
                  <q-icon name="radio_button_unchecked" size="xs" color="grey-4" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-body2 text-grey-7">
                    {{ plan.gia ? formatCurrency(plan.gia) : 'Miễn phí' }}
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item class="q-px-none">
                <q-item-section avatar class="q-pr-sm">
                  <q-icon name="radio_button_unchecked" size="xs" color="grey-4" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-body2 text-grey-7">
                    {{ plan.thoiHanNgay ? plan.thoiHanNgay : 'Không giới hạn' }} ngày
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item class="q-px-none">
                <q-item-section avatar class="q-pr-sm">
                  <q-icon name="radio_button_unchecked" size="xs" color="grey-4" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-body2 text-grey-7">
                    {{ plan.trangThai ? 'Hoạt động' : 'Không hoạt động' }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>

          <!-- Action Button -->
          <q-card-section class="q-pt-none text-center">
            <q-btn
              :color="getButtonColor(index)"
              :label="getButtonLabel(index)"
              size="md"
              class="full-width upgrade-btn"
              :class="{ 'current-plan': index === 0 }"
              @click="selectPlan(plan)"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>

  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useGoiDichVuStore } from 'src/stores/GoiDichVu'
import type { GoiDichVu } from 'src/types'
import { Notify } from 'quasar'

const goiDichVuStore = useGoiDichVuStore()

// State

// Computed
const goiDichVus = computed(() => goiDichVuStore.goiDichVus)
const loading = computed(() => goiDichVuStore.loading)
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

// Plan styling methods
const getPlanColor = (index: number): string => {
  const colors = ['pink', 'blue', 'deep-purple']
  return colors[index] || 'grey'
}

const getPlanIcon = (index: number): string => {
  const icons = ['savings', 'settings', 'rocket_launch']
  return icons[index] || 'star'
}



const getButtonColor = (index: number): string => {
  if (index === 0) return 'grey-3'
  if (index === 1) return 'blue'
  return 'deep-purple'
}

const getButtonLabel = (index: number): string => {
  if (index === 0) return 'Your Current Plan'
  return 'Upgrade'
}

const selectPlan = (plan: GoiDichVu) => {
  console.log('Selected plan:', plan)

  if (plan.gia === null || plan.gia === 0) {
    Notify.create({
      type: 'info',
      message: `You selected the free plan: ${plan.tenGoi}`,
      position: 'top'
    })
  } else {
    Notify.create({
      type: 'positive',
      message: `You selected: ${plan.tenGoi} - ${formatCurrency(plan.gia)}`,
      position: 'top'
    })
  }
}

onMounted(async () => {
  // Tự động load test data nếu chưa có dữ liệu
  if (goiDichVuStore.goiDichVus.length === 0) {
    await goiDichVuStore.fetchGoiDichVus()
    // Nếu API không trả về dữ liệu, load test data
    if (goiDichVuStore.goiDichVus.length === 0) {
      // goiDichVuStore.loadTestData()
    }
  }
})
</script>

<style scoped>

.pricing-card {
  position: relative;
  border-radius: 16px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.pricing-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.popular-card {
  border: 2px solid #2196f3;
  transform: scale(1.05);
}

.popular-card:hover {
  transform: scale(1.05) translateY(-8px);
}

.popular-badge {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.plan-icon {
  display: flex;
  justify-content: center;
}

.plan-avatar {
  background: linear-gradient(135deg, var(--q-primary) 0%, var(--q-secondary) 100%);
}

.price-section {
  padding: 16px 0;
}

.price-main {
  display: flex;
  align-items: baseline;
  justify-content: center;
  line-height: 1;
}

.currency {
  font-size: 24px;
  font-weight: 600;
  color: #2196f3;
  margin-right: 4px;
  align-self: flex-start;
  margin-top: 8px;
}

.amount {
  font-size: 72px;
  font-weight: 300;
  color: #2196f3;
  line-height: 0.8;
}

.period {
  font-size: 18px;
  color: #666;
  margin-left: 4px;
}

.price-details {
  margin-top: 8px;
  min-height: 20px;
}

.features-list {
  padding: 0;
}

.features-list .q-item {
  padding: 8px 0;
  min-height: auto;
}

.upgrade-btn {
  border-radius: 12px;
  padding: 12px 24px;
  font-weight: 600;
  text-transform: none;
  font-size: 16px;
}

.current-plan {
  background-color: #e8f5e8 !important;
  color: #2e7d32 !important;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .pricing-card {
    margin-bottom: 24px;
  }

  .popular-card {
    transform: none;
  }

  .popular-card:hover {
    transform: translateY(-4px);
  }

  .amount {
    font-size: 56px;
  }
}

/* Animation for loading */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.pricing-card {
  animation: fadeInUp 0.6s ease-out;
}

.pricing-card:nth-child(2) {
  animation-delay: 0.1s;
}

.pricing-card:nth-child(3) {
  animation-delay: 0.2s;
}
</style>
