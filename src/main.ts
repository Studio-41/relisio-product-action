import * as core from '@actions/core'
import {post} from './net'

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

    const productName = core.getInput('product-name')

    const productScope = core.getInput('product-scope')

    const relisoUrl = core.getInput('relisio-url')
    if (!relisoUrl) {
      throw new Error('relisio-url is required')
    }

    const originalId = core.getInput('product-template-id')

    if (!originalId && !productName) {
      throw new Error('product-template-id or product-name is required')
    }

    const url = `${relisoUrl}/api/v1/workspaces/${workspacePath}/products`

    const {_id, name = ''} = await post<{_id: string; name: string}>(
      url,
      apiKey,
      JSON.stringify({
        originalId,
        productName,
        productScope
      })
    )

    const apiUrl = `${relisoUrl}/workspaces/${workspacePath}/products/${name}`
    const publicUrl = `${relisoUrl}/${workspacePath}/${name}`

    core.setOutput('product-id', _id)
    core.setOutput('api-url', apiUrl)
    core.setOutput('public-url', publicUrl)
  } catch (error) {
    core.debug(`Deployment Failed with Error: ${error}`)
    core.setFailed(`Deployment Failed with Error: ${error}`)
  }
}

run()
