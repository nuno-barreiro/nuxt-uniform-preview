<template>
  <div>
    <composition :composition="composition"> 
      <h1>{{ composition.data.page[0].fields.title }}</h1>
    </composition>
  </div>
</template>

<script>
export default {
  async asyncData(nuxtContext) {
    const { useComposition } = await import('~/composables')
    const { composition } = await useComposition('/home', nuxtContext)

    return {
      composition,
    }
  },
}
</script>
