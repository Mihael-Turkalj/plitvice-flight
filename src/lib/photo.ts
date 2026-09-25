import credits from '../data/credits.json'

type Credit = { file: string; author: string; license: string; source: string; w: number; h: number }

/** Wikimedia Commons credits for every real photo used on the site (flight keyframes and sections). */
export const photoCredits = credits as Record<string, Credit>

const base = import.meta.env.BASE_URL

export const photoUrl = (slug: string, width: 1024 | 1920 = 1920) => `${base}photos/${slug}-${width}.webp`

export const photoSrcSet = (slug: string) => `${photoUrl(slug, 1024)} 1024w, ${photoUrl(slug, 1920)} 1920w`
