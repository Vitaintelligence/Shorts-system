# Rendering

Render the picture with Remotion.

**Input:** `RenderProps` (`id`, title card, caption cues, duration) written to `media/render-props.json`.

**Output:** `media/picture.mp4`, H.264, yuv420p, 1080×1920, 30 fps. Metadata is `render.json`.

Entry: `index.ts` registers `Root.tsx`. Composition id: `SampleShort`. `npm run produce:sample` shells out to:

```bash
npx remotion render engine/rendering/index.ts SampleShort <picture.mp4> --props=<render-props.json>
```

`npm run studio` opens the same composition for preview. Preview still reads the sample fixture. It is not a product UI.

The composition draws only strings it is given, plus the frame-size line from `format.ts`. It does not name LIVI.

Audio is muxed in [audio](../audio/README.md), not inside this composition, so a silent Remotion audio track cannot become the master by accident.
