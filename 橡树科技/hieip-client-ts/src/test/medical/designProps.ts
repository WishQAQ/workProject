
export const equationProps = {
  type: 'Equation',
  name: '公式输入框',
  equationType: 'positionTooth',
  required: true,
  readonly: false,
  cannotDelete: false,
  description: '控件描述',
  equationData: [
    {
      type: 'menstrual',
      data: {
        menstrualAge: 14,
        menstrualPeriod: 20,
        menstrualCycle: 22,
        lastMenstrual: Date.now()
      }
    },
    {
      type: 'toothPosition',
      data: {
        upperTooth: {
          A: [],
          B: [],
          C: [],
          D: []
        },
        underTooth: {
          A: [],
          B: [],
          C: [],
          D: []
        }
      }
    }
  ]
}
