This Github action is an official [Relisio](https://www.relisio.com/) deploy utility.<br />

### Prerequisites
 1. an active workspace at [www.resisio.com](https://www.relisio.com);
 2. configure an `api-key` for the workspace;
 3. have a GitHub workflow that produces one or more artefacts that you want to publish;

### Before you start

 1. consider that Relisio is currently in Beta, and breaking changes may occur at any time,
 2. the `api-key` can be generated (and destroyed) from your workspace settings,
 3. if you intend to update a product (instead of creating a new one), you must specify the `product-id` input,
 4. optionally you may use this action together with 
    - `Studio-41/relisio-artefact-action@v1`
    - `Studio-41/relisio-project-action@v1`

### Available inputs

|input|description|required|default|
|---|---|:---:|:---:|
|relisio-url|description Relisio base url (only for enterprise installations)|false|https//relisio.com|
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
