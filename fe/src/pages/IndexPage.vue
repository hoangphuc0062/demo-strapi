<template>
  <q-page class="row items-center justify-evenly">
   <h1>Hello World</h1>
  </q-page>
</template>
<script lang="ts">
import { useMeta } from 'quasar'
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  setup() {
    onMounted(() => {
      useMeta({
        title: 'Home',
        titleTemplate: title => `${title} - My Website`,
      })
    })

    return {}
  }
})
</script>

