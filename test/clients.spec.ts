import 'whatwg-fetch'
import clients from '../src/clients'

describe('get the client data from the endpoint', () => {

  const endpoint = 'http://www.mocky.io/v2/5808862710000087232b75ac'

  it('should return client data from the given endpoint', async () => {
    const data = await clients(endpoint)
    expect(data).toBeTruthy()
    expect(data.clients).toBeTruthy()
    expect(data.clients.length).toBeGreaterThan(0)    
  })

})