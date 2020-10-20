import 'whatwg-fetch'
import policies from '../src/policies'

describe('get the client data from the endpoint', () => {

  const endpoint = 'http://www.mocky.io/v2/580891a4100000e8242b75c5'

  it('should return policy data from the given endpoint', async () => {
    const data = await policies(endpoint)
    expect(data).toBeTruthy()
    expect(data.policies).toBeTruthy()
    expect(data.policies.length).toBeGreaterThan(0)    
  })

})