describe('environment', () => {
  const minimalVars = ['PORT', 'CLIENT_ENDPOINT', 'POLICY_ENDPOINT']

  minimalVars.forEach((x) => {
    it(`should define ${x}`, () => {
      expect(process.env[x]).toBeDefined()
    })
  })
})
