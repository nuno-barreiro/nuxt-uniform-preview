import {
  createEventBus,
  subscribeToComposition,
  CANVAS_DRAFT_STATE,
  CANVAS_PUBLISHED_STATE,
} from '@uniformdev/canvas'

export const useComposition = async (slug, { query, $axios, env, nuxtState }) => {
  const compositionUrl = `${env.COMPOSITION_API_URL}/?canvasSlug=${slug}&preview=${query.preview || false}`;
  const result = await $axios.get(compositionUrl)

  let goodbye

  const loadEffect = async () => {
    if (query.preview) {
      const eventBus = await createEventBus()

      if (eventBus) {
        goodbye = subscribeToComposition({
          eventBus,
          compositionId: nuxtState.data[0].composition._id,
          compositionState: query.preview
            ? CANVAS_DRAFT_STATE
            : CANVAS_PUBLISHED_STATE,
          projectId: env.UNIFORM_PROJECT_ID,
          callback: () => {
            console.log('[canvas]: change detected')
            $nuxt.refresh()
          },
          event: 'updated',
        })
      }
    }
  }

  await loadEffect()

  if (goodbye) {
    goodbye()
  }

  return { composition: result.data.composition }
}
