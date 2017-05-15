import { SonicComponent } from 'src/constants.js'

export default {
  [SonicComponent.MASK]: [
    'Cafe_large_crowd_02.m4a',
    'Cafe_med_crowd.m4a',
    'Street_low_traffic_footway_01.m4a',
    'Street_med_traffic_footway_01.m4a',
  ],
  [SonicComponent.TARGET]: [
    'Robert_Burriss_open_podcast_excerpt_Psychology_of_Attractiveness_part_01.m4a',
    'Robert_Burriss_open_podcast_excerpt_Psychology_of_Attractiveness_part_02.m4a',
  ],
}

export const getFileUrl = filename => {
  return `${location.origin}/assets/audio/${filename}`
}
