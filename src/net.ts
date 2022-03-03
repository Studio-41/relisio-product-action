import http from 'http'
import https from 'https'

export const post = async <T>(
  url: string,
  apiKey: string,
  body: string
): Promise<T> =>
  new Promise((resolve, reject) => {
    const urlObject = new URL(url)

    const request = urlObject.protocol === 'https:' ? https : http

    const options = {
      hostname: urlObject.hostname,
      path: urlObject.pathname,
      port: urlObject.port,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Content-Length': body.length
      }
    }

    const req = request
      .request(options, res => {
        if (res.statusCode !== 200) {
          reject(new Error(`${res.statusCode} ${res.statusMessage}`))
          return
        }

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
