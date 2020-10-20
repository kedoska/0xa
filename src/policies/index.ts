export interface Policy {
  id:                 string;
  amountInsured:      number;
  email:              string;
  inceptionDate:      string;
  installmentPayment: boolean;
  clientId:           string;
}

export default (endpoint: string): Promise<{policies: Policy[]}> =>
  new Promise(async (resolve, reject)=> {
    const response = await fetch(endpoint)
    const json = await response.json()
    resolve(json)
  })
