/* global location */
import { SonicComponent } from 'src/constants.js'

export default {
  [SonicComponent.MASK]: [
    { title: 'Large cafe', filename: 'Cafe_large_crowd_02.m4a' },
    { title: 'Medium cafe', filename: 'Cafe_med_crowd.m4a' },
    {
      title: 'Street - low traffic',
      filename: 'Street_low_traffic_footway_01.m4a',
    },
    {
      title: 'Street - medium traffic',
      filename: 'Street_med_traffic_footway_01.m4a',
    },
  ],
  [SonicComponent.TARGET]: [
    {
      title: 'Robert Burriss #1',
      filename: 'Robert_Burriss_open_podcast_excerpt_Psychology_of_Attractiveness_part_01.m4a',
    },
    {
      title: 'Robert Burriss #2',
      filename: 'Robert_Burriss_open_podcast_excerpt_Psychology_of_Attractiveness_part_02.m4a',
    },
  ],
}

export const getFileUrl = filename => {
  return `${location.origin}/assets/audio/${filename}`
}
