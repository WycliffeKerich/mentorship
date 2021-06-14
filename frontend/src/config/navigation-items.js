export default [
  { icon: 'dashboard', title: 'Home', name: 'Home', i18n: 'Home' },
  {
    title: 'Counties & SubCounties',
    group: 'counties-and-subcounties',
    icon: 'map',
    i18n: 'CountiesSubcounties',
    items: [
      {
        name: 'Counties',
        title: 'Counties',
        prependIcon: 'pin_drop',
        i18n: 'Counties'
      },
      {
        name: 'SubCounties',
        title: 'SubCounties',
        prependIcon: 'pin_drop',
        i18n: 'SubCounties'
      }
    ]
  },
  {
    icon: 'local_hospital',
    title: 'Facilities',
    name: 'Facilities',
    i18n: 'Facilities'
  },
  {
    icon: 'collections_bookmark',
    title: 'Signal Functions',
    name: 'SignalFunctions',
    i18n: 'Signal Functions'
  },
  { header: 'Mentors & Mentees', i18n: 'MentorsMentees' },
  {
    icon: 'person',
    title: 'Mentors',
    name: 'Mentors',
    i18n: 'Mentors'
  },
  {
    icon: 'person_outline',
    title: 'Mentees',
    name: 'Mentees',
    i18n: 'Mentees'
  },
  { header: 'Scores & Sessions', i18n: 'ScoreSessions' },
  {
    icon: 'insert_chart',
    title: 'Scores',
    name: 'Scores',
    i18n: 'Scores'
  },
  {
    icon: 'date_range',
    title: 'Sessions',
    name: 'Sessions',
    i18n: 'Sessions'
  }
]
