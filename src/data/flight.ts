// The flight: one video file per shot, played back to back and scrubbed by scroll. Card and stop
// times are seconds into the whole flight. Facts are from the park's own pages
// (np-plitvicka-jezera.hr) and Croatian Wikipedia; see content.ts.
import data from './flight-segments.json'

export const FPS = data.fps

export type Segment = { id: string; frames: number; start: number; duration: number; track: number[] }

export const segments: Segment[] = (() => {
  let start = 0
  return data.segments.map((s) => {
    const seg = { id: s.id, frames: s.frames, start, duration: s.frames / FPS, track: (data.track as Record<string, number[]>)[s.id] }
    start += seg.duration
    return seg
  })
})()

export const TOTAL = segments.reduce((t, s) => t + s.duration, 0)

export const segmentFile = (id: string, hd: boolean) => `flight/${id}-${hd ? 'hd' : 'sd'}.mp4`
export const segmentPoster = (id: string) => `flight/${id}-poster.jpg`

export type Card = {
  id: string
  /** Visible between these two flight times. */
  from: number
  to: number
  side: 'left' | 'right'
  label: string
  title: string
  body: string
}

export const cards: Card[] = [
  {
    id: 'proscansko',
    from: 0.3,
    to: 2.3,
    side: 'left',
    label: 'Upper Lakes · 636 m',
    title: 'Prošćansko jezero',
    body: 'The first and highest of the 16 lakes. It is fed by two small rivers, the Black and the White.',
  },
  {
    id: 'kingfisher',
    from: 2.5,
    to: 4.6,
    side: 'right',
    label: 'Your guide',
    title: 'The kingfisher',
    body: 'Vodomar in Croatian. It dives for small fish along the lakes and streams, and the park has studied it alongside the dipper.',
  },
  {
    id: 'galovac',
    from: 4.9,
    to: 7.1,
    side: 'left',
    label: 'Upper Lakes · 582 m',
    title: 'Galovac',
    body: 'The water spills over tufa: stone built by moss and algae out of the calcite in the water. The barriers grow about 13.5 mm a year.',
  },
  {
    id: 'black-queen',
    from: 7.2,
    to: 9.2,
    side: 'right',
    label: 'Legend',
    title: 'The Black Queen',
    body: 'When a drought dried the rivers, the Black Queen answered the people’s prayers with rain that fell until the valley filled, lake above lake.',
  },
  {
    id: 'prstavac',
    from: 9.4,
    to: 11.6,
    side: 'left',
    label: 'Upper Lakes · Galovac barrier',
    title: 'Veliki prštavac',
    body: 'At 28 metres, the tallest waterfall of the Upper Lakes. Its name comes from prštati, to spray.',
  },
  {
    id: 'kozjak',
    from: 12.4,
    to: 16.4,
    side: 'right',
    label: 'Upper Lakes · 534 m',
    title: 'Kozjak',
    body: 'The largest and deepest lake: 82 hectares and 47 metres deep. Six metres below its surface lies a drowned tufa barrier.',
  },
  {
    id: 'goats',
    from: 16.6,
    to: 18.8,
    side: 'left',
    label: 'Legend',
    title: 'Goats on the ice',
    body: 'Kozjak means goat lake. The story goes that a herd fleeing wolves ran onto the frozen lake, and the ice gave way.',
  },
  {
    id: 'milka',
    from: 19.1,
    to: 21.5,
    side: 'left',
    label: 'Lower Lakes · below Milanovac',
    title: 'Milka Trnina falls',
    body: 'Named after the opera singer who gave the takings of her 1898 farewell concert to protect the lakes. No other falls here were named after someone in their lifetime.',
  },
  {
    id: 'two-halves',
    from: 21.7,
    to: 23.9,
    side: 'right',
    label: 'Upper and Lower Lakes',
    title: 'Two kinds of stone',
    body: 'The 12 Upper Lakes sit on dolomite, with gentle wooded shores. The 4 Lower Lakes lie in a narrow limestone canyon.',
  },
  {
    id: 'canyon',
    from: 24.1,
    to: 26.5,
    side: 'right',
    label: 'Lower Lakes · 505 m',
    title: 'Into the canyon',
    body: 'Kaluđerovac and Novakovića brod are the last two steps down, turquoise between white cliffs.',
  },
  {
    id: 'monk',
    from: 26.7,
    to: 28.4,
    side: 'left',
    label: 'Legend',
    title: 'The hermit monk',
    body: 'Kaluđerovac is named after a kaluđer, a hermit monk said to have lived alone in a cave in the cliffs above the lake.',
  },
  {
    id: 'veliki-slap',
    from: 28.6,
    to: 30.4,
    side: 'left',
    label: 'Veliki slap',
    title: 'Croatia’s tallest waterfall',
    body: 'Ahead, the Plitvica stream, which gave the park its name, drops straight off the cliff instead of spilling over tufa.',
  },
  {
    id: 'sastavci',
    from: 35.0,
    to: 37.2,
    side: 'left',
    label: 'Sastavci',
    title: 'Where the waters meet',
    body: 'At the foot of Veliki slap, the water of all sixteen lakes and the Plitvica stream finally join.',
  },
  {
    id: 'korana',
    from: 37.4,
    to: 99,
    side: 'right',
    label: 'The end of the lakes',
    title: 'The Korana',
    body: 'From here the water leaves the park as the Korana river, heading north through its own canyon.',
  },
]

const at = (id: string) => segments.find((s) => s.id === id)!.start

export const stops = [
  { name: 'Prošćansko', at: 0 },
  { name: 'Galovac', at: at('s2') },
  { name: 'Veliki prštavac', at: at('s3') },
  { name: 'Kozjak', at: at('s4') },
  { name: 'Milka Trnina', at: at('s5') },
  { name: 'The canyon', at: at('s6') },
  { name: 'Veliki slap', at: at('s7') },
  { name: 'Sastavci', at: at('s8') },
  { name: 'The Korana', at: TOTAL },
]

/** The dive down Veliki slap: a metres-fallen counter runs between these times within its shot. */
export const DIVE = { segment: 's7', from: 0.6, to: 4.3, metres: 78 }

/** Real Commons photos the flight's keyframes were made from (credited in the footer). */
export const flightSources = ['proscansko-boardwalk', 'galovac', 'veliki-prstavac', 'kozjak', 'milka-trnina-falls', 'kaluderovac', 'veliki-slap-lower-lakes', 'korana']
