const { CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE, CanvasClient } = require('@uniformdev/canvas')
const fetch = require('isomorphic-fetch')

module.exports = async function (context, req) {
    const isPreview = req.query.preview;
    const canvasState = (isPreview) ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE
    const canvasSlug = req.query.canvasSlug;

    const canvasClient = new CanvasClient({
        apiKey: process.env.UNIFORM_API_KEY,
        projectId: process.env.UNIFORM_PROJECT_ID,
        fetch,
    });

    const { composition } = await canvasClient.getCompositionBySlug({
        slug: canvasSlug,
        state: canvasState,
    });

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: { composition }
    };
}