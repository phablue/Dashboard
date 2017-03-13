const InitializeState =  {
  status_total: {
    new:
    {
      ho: null,
      tmc: null
    },

    solved:
    {
      ho: null,
      tmc: null
    }
  },

  status_daily: {
    new:
    {
      ho: null,
      tmc: null
    },

    solved:
    {
      ho: null,
      tmc: null
    }
  },

  satisfaction_total: {
    ho:
    {
      bad: null,
      good: null ,
      offered: null
    },

    tmc:
    { bad: null,
      good: null,
      offered: null
    }
  },

  first_reply_status: {
    ho:
    {
      '0-1': null,
      '1-8': null,
      '8-24': null,
      '24+': null
    },

    tmc:
    {
      '0-1': null,
      '1-8': null,
      '8-24': null,
      '24+': null
    }
  },

  ho: null,

  tmc: null,

  comments: null
}

export default InitializeState
