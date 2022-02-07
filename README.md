<img src="https://user-images.githubusercontent.com/11739105/152799348-e70d55f4-3914-43cd-866f-f2b979071be2.svg" alt="Relisio Product"  width="128" />

This Github action is an official [Relisio](https://www.relisio.com/) deploy utility.<br />
Use it to create/update products inside your portfolio.

### Prerequisites
 1. an active workspace at [www.resisio.com](https://www.relisio.com);
 2. configure an `api-key` for the workspace;
 3. have a GitHub workflow that produces one or more artefacts that you want to publish;

### Before you start

 1. consider that Relisio is currently in Beta, and breaking changes may occur at any time,
 2. the `api-key` can be generated (and destroyed) from your workspace settings,
 3. if you intend to update a product (instead of creating a new one), you must specify the `product-id` input,
 4. optionally you may use this action together with 
    - `Studio-41/relisio-project-action@v1`

### Available inputs

|input|description|required|default|
|---|---|:---:|:---:|
|relisio-url|description Relisio base url (only for enterprise installations)|false|https://relisio.com|
|api-key|description API key to authorize the deployment|true|
|workspace-path|description Path of the Workspace where to publish the Product|true|
|product-template-id|description ID of an existing product withing the workspace to clone as the base for this new product|false|
|product-id|description ID of an existing product (only if you want to update the existing product)|false|
|product-name|description Name of the product|true|
|visibility|description Visibility of the product withing the workspace (private, internal or public)|true|internal|

## Basic Example

The following example publishes a new product into your workspace every time a Tag (having `v` prefix) is created.<br/>

 - A new product will be created as the `product-id` isn't specified.
 - The product will be created inside the Workspace `workspace-path`.
 - As the `visibility` is `internal`, the product will be visible by the users at the workspace only.
 - As the `product-template-id` is specified, Relisio will clone the content from that product (withing the workspace).

```yaml
on:
  push:
    tags:
      - "v*"

jobs:
  deloy:
    runs-on: ubuntu-latest
    steps:
    - name: Deploy As Relisio Product 
      uses: Studio-41/relisio-product-action@v1
      with:
        api-key: ${{ secrets.RELISIO_API_KEY }}
        workspace-path: ${{ secrets.RELISIO_WORKSPACE }}
        visibility: internal
        product-name: The Name of The Product
        product-template-id: ${{ secrets.RELISIO_PRODUCT_TEMPLATE_ID }}
```

<hr/>

### <img src="https://user-images.githubusercontent.com/11739105/152801493-cb6ccd69-7968-45a1-a422-01e2ea9a9e48.svg" alt="Artifact" width="32"> Work with Relisio Artefacts

You can optionally configure your GitHub Workflow to upload **any artefact** as part of the new product using `Studio-41/relisio-artefact-action@v1`, [more details](https://github.com/Studio-41/relisio-artefact-action).


### <img src="https://user-images.githubusercontent.com/11739105/152803355-69bfce13-e6ee-4f7b-a53e-6cee391e0273.svg" alt="Project" width="32"> Work with Relisio Projects

If you want to publish this product as part of a new Release for a specific Relisio Environment, you can combine this action with `Studio-41/relisio-project-action@v1`, [more details](https://github.com/Studio-41/relisio-project-action).

<hr/>

### <img src="https://user-images.githubusercontent.com/11739105/152805812-261613f7-1357-4f01-b3e8-ed6d613c3577.svg" alt="Project" width="32"> Professional support is available
 Relisio is a Studio 41 Software Design S.L. product.<br/><br/>
Enterprise service is available for privates and organizations that want to implement Relisio into their current CI pipeline.<br/><br/>
Contact us at <a href="mailto:info@41.studio">info@41.studio</a>. We will do our best to assist you with Relisio's related automation or queries.