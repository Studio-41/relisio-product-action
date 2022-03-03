import https from 'https'

export const post = async <T>(
  hostname: string,
  path: string,
  apiKey: string,
  body: string
): Promise<T> =>
  new Promise((resolve, reject) => {
    const options = {
      hostname,
      path,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Content-Length': body.length
      }
    }

    const req = https
      .request(options, res => {
        let r = ''

        res.on('data', chunk => {
          r += chunk
        })

        res.on('end', () => {
          resolve(JSON.parse(r))
        })
      })
      .on('error', err => {
        reject(err)
      })

    req.write(body)
    req.end()
  })
