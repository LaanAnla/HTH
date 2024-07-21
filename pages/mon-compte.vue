<script setup lang="ts">
  definePageMeta({
    layout: 'dashboard',
  })
  //   import { sub } from 'date-fns'
  //   import type { Period, Range } from '~/types'

  //   const { isNotificationsSlideoverOpen } = useDashboard()

  //   const items = [
  //     [
  //       {
  //         label: 'New mail',
  //         icon: 'i-heroicons-paper-airplane',
  //         to: '/inbox',
  //       },
  //       {
  //         label: 'New user',
  //         icon: 'i-heroicons-user-plus',
  //         to: '/users',
  //       },
  //     ],
  //   ]

  //   const range = ref<Range>({ start: sub(new Date(), { days: 14 }), end: new Date() })
  //   const period = ref<Period>('daily')
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar
        title="Mon dashboard"
        class="font-bold text-xl">
        <template #right>
          <UTooltip
            text="Notifications"
            :shortcuts="['N']">
            <UButton
              color="gray"
              variant="ghost"
              square
              @click="isNotificationsSlideoverOpen = true">
              <UChip
                color="red"
                inset>
                <UIcon
                  name="i-heroicons-bell"
                  class="w-5 h-5" />
              </UChip>
            </UButton>
          </UTooltip>

          <UDropdown :items="items">
            <UButton
              icon="i-heroicons-plus"
              size="md"
              class="ml-1.5 rounded-full" />
          </UDropdown>
        </template>
      </UDashboardNavbar>

      <UDashboardPanelContent>
        <!-- ~/components/home/HomeChart.vue -->
        <div>
          <h1>Les entreprises qui recrutent</h1>
          <UDashboardCard
            title="Recent sales"
            description="You made 265 sales this month."
            icon="i-heroicons-chart-bar">
            <UProgress />
          </UDashboardCard>
        </div>
        <HomeChart
          :period="period"
          :range="range" />

        <div class="grid lg:grid-cols-2 lg:items-start gap-8 mt-8">
          <!-- ~/components/home/HomeSales.vue -->
          <HomeSales />
          <!-- ~/components/home/HomeCountries.vue -->
          <HomeCountries />
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
