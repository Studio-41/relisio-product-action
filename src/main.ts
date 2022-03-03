import * as core from '@actions/core'
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

    const originalId = core.getInput('product-template-id')

    const publicUrl = `https://${relisoUrl}/api/v1/workspaces/${workspacePath}/products`

    const response = await fetch(publicUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        originalId
      })
    })

    if (!response.ok) {
      core.setFailed(`could not create product: ${response.statusText}`)
      return
    }

    const {_id = ''} = (await response.json()) as {_id: string}

    core.setOutput('product-id', _id)
    core.setOutput('public-url', publicUrl)
  } catch (error) {
    core.debug(`Deployment Failed with Error: ${error}`)
    core.setFailed(`Deployment Failed with Error: ${error}`)
  }
}

run()
