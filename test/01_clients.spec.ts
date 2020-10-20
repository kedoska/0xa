import 'whatwg-fetch'
import clients from '../src/clients'

describe('get the client data from the endpoint', () => {

  const endpoint = process.env['CLIENT_ENDPOINT'] || ''
  
  it('should return client data from the given endpoint', async () => {
    const data = await clients(endpoint)
    expect(data).toBeTruthy()
    expect(data.clients).toBeTruthy()
    expect(data.clients.length).toBeGreaterThan(0)    
  })

})