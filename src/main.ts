import * as core from '@actions/core'
import {createHash} from 'crypto'

async function run(): Promise<void> {
  try {
    const workspacePath = core.getInput('workspace-path')

    if (!workspacePath) {
      throw new Error('workspace-path is required')
    }

    const relisioDomain = core.getInput('relisio-domain')
    if (!relisioDomain) {
      throw new Error('relisio-domain is required')
    }

    const now = new Date().getTime()

    let productId = core.getInput('product-id')

    if (!productId) {
      core.debug('product-id is not set, a new product will be created')

      productId = createHash('sha256')
        .update(`${workspacePath}/products/${now}`)
        .digest('hex')
    }

    const publicUrl = `https://relisio.com/${workspacePath}/products/${productId}`

    core.setOutput('product-id', productId)
    core.setOutput('public-url', publicUrl)
  } catch (error) {
    core.debug(`Deployment Failed with Error: ${error}`)
    core.setFailed(`Deployment Failed with Error: ${error}`)
  }
}

run()
