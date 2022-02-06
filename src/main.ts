import * as core from '@actions/core'
import {createHash} from 'crypto'
import fetch from 'node-fetch'

async function run(): Promise<void> {
  try {
    const apiKey = core.getInput('api-key')
    if (!apiKey) {
      throw new Error('api-key is required')
    }

    const workspacePath = core.getInput('workspace-path')

    if (!workspacePath) {
      throw new Error('workspace-path is required')
    }

    const relisoUrl = core.getInput('relisio-url')
    if (!relisoUrl) {
      throw new Error('relisio-url is required')
    }

    const now = new Date().getTime()

    let productId = core.getInput('product-id')

    if (!productId) {
      core.debug('product-id is not set, a new product will be created')

      productId = createHash('sha256')
        .update(`${workspacePath}/products/${now}`)
        .digest('hex')
    }

    const publicUrl = `https://${relisoUrl}/api/v1/workspaces/${workspacePath}/products/${productId}`

    const response = await fetch(publicUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({})
    })

    if (!response.ok) {
      core.setFailed(`could not create product: ${response.statusText}`)
      return
    }
    core.setOutput('product-id', productId)
    core.setOutput('public-url', publicUrl)
  } catch (error) {
    core.debug(`Deployment Failed with Error: ${error}`)
    core.setFailed(`Deployment Failed with Error: ${error}`)
  }
}

run()
