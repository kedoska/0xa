import 'whatwg-fetch'
import policies from '../src/policies'

describe('get the client data from the endpoint', () => {

  const endpoint = process.env['POLICY_ENDPOINT'] || ''

  it('should return policy data from the given endpoint', async () => {
    const data = await policies(endpoint)
    expect(data).toBeTruthy()
    expect(data.policies).toBeTruthy()
    expect(data.policies.length).toBeGreaterThan(0)    
  })

})