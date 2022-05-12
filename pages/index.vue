<template>
  <div>
    <h1>Homepage</h1>
  </div>
</template>

<script>
export default {
  async asyncData(nuxtContext) {
    const { useComposition } = await import('~/composables')
    return useComposition('/home', nuxtContext)
  },
}
</script>
