<template>
  <div>
    <composition :key="key" :composition="composition"> 
      <h1>{{ composition.data.page[0].fields.title }}</h1>
      <slot-content slotName="navigation" />
    </composition>
  </div>
</template>

<script>
let key = 1

export default {
  async asyncData(nuxtContext) {
    const { useComposition } = await import('~/composables')
    const { composition } = await useComposition('/home', nuxtContext)

    key++
    
    return { composition, key }
  },
}
</script>
