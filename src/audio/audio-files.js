/* global location */
import { Ear, SonicComponent } from 'src/constants.js'

export default {
  [SonicComponent.MASK]: [
    {
      title: 'Large cafe',
      filename: {
        [Ear.LEFT]: 'Cafe_large_crowd_02_LEFT.m4a',
        [Ear.RIGHT]: 'Cafe_large_crowd_02_RIGHT.m4a',
      },
    },
    {
      title: 'Medium cafe',
      filename: {
        [Ear.LEFT]: 'Cafe_med_crowd_LEFT.m4a',
        [Ear.RIGHT]: 'Cafe_med_crowd_RIGHT.m4a',
      },
    },
    {
      title: 'Street - low traffic',
      filename: {
        [Ear.LEFT]: 'Street_low_traffic_footway_01_LEFT.m4a',
        [Ear.RIGHT]: 'Street_low_traffic_footway_01_RIGHT.m4a',
      },
    },
    {
      title: 'Street - medium traffic',
      filename: {
        [Ear.LEFT]: 'Street_med_traffic_footway_01_LEFT.m4a',
        [Ear.RIGHT]: 'Street_med_traffic_footway_01_RIGHT.m4a',
      },
    },
  ],
  [SonicComponent.TARGET]: [
    {
      title: 'Robert Burriss #1',
      filename:
        'Robert_Burriss_open_podcast_excerpt_Psychology_of_Attractiveness_part_01.m4a',
    },
    {
      title: 'Robert Burriss #2',
      filename:
        'Robert_Burriss_open_podcast_excerpt_Psychology_of_Attractiveness_part_02.m4a',
    },
  ],
}

export const getFileUrl = filename =>
  `${location.origin}/assets/audio/${filename}`
