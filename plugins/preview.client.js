export default function ({ query, enablePreview }) {
  if (query.preview) {
    console.log("[nuxt] Preview mode enabled");
    enablePreview()
  }
}
