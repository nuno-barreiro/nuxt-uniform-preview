<template>
  <a :href="uniformData.parameters.address.value" style="padding: 5px; margin: 2px; background-color: aqua;">
    {{ uniformData.parameters.text.value }}
  </a>
</template>

<script>
export default {
  name: 'NavigationLink',
  props: {
    uniformData: {
      type: Object,
      required: true,
    },
  },
}
</script>