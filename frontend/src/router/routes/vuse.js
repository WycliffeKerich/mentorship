// Authentication Pages

export default [
  {
    params: {
      path: '/authentication/login',
      name: 'Login'
    },
    defaultComponentPath: 'Pages/Authentication/Login/Login'
  },
  {
    params: {
      path: '/authentication/signup',
      name: 'Signup'
    },
    defaultComponentPath: 'Pages/Authentication/Signup/Signup'
  },
  {
    params: {
      path: '/authentication/forgot-password',
      name: 'ForgotPassword'
    },
    defaultComponentPath: 'Pages/Authentication/ForgotPassword/ForgotPassword'
  },
  {
    params: {
      path: '/home',
      name: 'Home'
    },
    defaultComponentPath: 'Pages/Dashboards/AnalyticalDashboard',
    navs: true
  },
  {
    params: {
      path: '/counties-and-subcounties/counties',
      name: 'counties-and-subcounties/Counties'
    },
    defaultComponentPath: 'Pages/Counties/Counties',
    navs: true
  },
  {
    params: {
      path: '/counties-and-subcounties/subcounties',
      name: 'counties-and-subcounties/SubCounties'
    },
    defaultComponentPath: 'Pages/SubCounties/SubCounties',
    navs: true
  },
  {
    params: {
      path: '/facilities',
      name: 'Facilities'
    },
    defaultComponentPath: 'Pages/Facilities/Facilities',
    navs: true
  },
  {
    params: {
      path: '/signal-functions',
      name: 'SignalFunctions'
    },
    defaultComponentPath: 'Pages/SignalFunctions/SignalFunctions',
    navs: true
  },
  {
    params: {
      path: '/mentors',
      name: 'Mentors'
    },
    defaultComponentPath: 'Pages/Mentors/Mentors',
    navs: true
  },
  {
    params: {
      path: '/mentees',
      name: 'Mentees'
    },
    defaultComponentPath: 'Pages/Mentees/Mentees',
    navs: true
  },
  {
    params: {
      path: '/scores',
      name: 'Scores'
    },
    defaultComponentPath: 'Pages/Scores/Scores',
    navs: true
  },
  {
    params: {
      path: '/sessions',
      name: 'Sessions'
    },
    defaultComponentPath: 'Pages/Sessions/Sessions',
    navs: true
  },
  {
    params: {
      path: '*',
      name: 'PageNotFound',
      meta: { layout: 'full' }
    },
    defaultComponentPath: 'Pages/Errors/Error404'
  }
]
