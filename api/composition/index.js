const {
  CANVAS_DRAFT_STATE,
  CANVAS_PUBLISHED_STATE,
  CanvasClient,
  enhance,
  EnhancerBuilder
} = require('@uniformdev/canvas')

const fetch = require('isomorphic-fetch')

const {
  ContentfulClientList,
  createContentfulEnhancer,
  createContentfulQueryEnhancer,
  CANVAS_CONTENTFUL_PARAMETER_TYPES,
  CANVAS_CONTENTFUL_QUERY_PARAMETER_TYPES,
} = require('@uniformdev/canvas-contentful')

const {
    createClient
} = require('contentful')

module.exports = async function (context, req) {
  const isPreview = req.query.preview
  const canvasState = isPreview ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE
  const canvasSlug = req.query.canvasSlug

  const canvasClient = new CanvasClient({
    apiKey: process.env.UNIFORM_API_KEY,
    projectId: process.env.UNIFORM_PROJECT_ID,
    fetch,
  })

  const pageDataEnhancer = async ({ context }) => {
    const entries = await context.client.getEntries({
      content_type: 'contentPage',
    })
    return entries.items || []
  }

  const enhanceDefaultComposition = async (composition, isPreview) => {
    const ctfSpace = process.env.CONTENTFUL_SPACE_ID || ''

    // instantiate a standard Contentful client
    const client = createClient({
      space: ctfSpace,
      environment: 'master',
      accessToken: process.env.CONTENTFUL_DELIVERY_API_KEY || '',
      host: 'cdn.contentful.com',
    })

    const previewClient = createClient({
      space: ctfSpace,
      environment: 'master',
      accessToken: process.env.CONTENTFUL_PREVIEW_API_KEY || '',
      host: 'preview.contentful.com',
    })

    const clientList = new ContentfulClientList({
      source: ctfSpace,
      client,
      previewClient,
    })
    const contentfulEnhancer = createContentfulEnhancer({
      client,
      previewClient,
    })
    const contentfulQueryEnhancer = createContentfulQueryEnhancer({
      clients: clientList,
    })

    const enhancerContext = {
      preview: isPreview,
      client: isPreview ? previewClient : client,
    }

    await enhance({
      composition,
      enhancers: new EnhancerBuilder()
        .component('page', (page) => page.data('page', pageDataEnhancer))
        .parameterType(CANVAS_CONTENTFUL_PARAMETER_TYPES, contentfulEnhancer)
        .parameterType(
          CANVAS_CONTENTFUL_QUERY_PARAMETER_TYPES,
          contentfulQueryEnhancer
        ),
      context: enhancerContext,
    })
  }

  const { composition } = await canvasClient.getCompositionBySlug({
    slug: canvasSlug,
    state: canvasState,
  })

  await enhanceDefaultComposition(composition, isPreview)

  context.res = { 
    // status: 200, /* Defaults to 200 */
    body: { composition },
  }
}
