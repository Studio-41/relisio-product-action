This Github action is an official [Relisio](https://www.relisio.com/) deploy utility.<br />

Before you start using this action:

 1. consider that Relisio is currently in Beta, and breaking changes may occur at any time,
 2. the `api-key` can be generated (and destroyed) from your workspace settings,
 3. if you intend to update a product (instead of creating a new one), you must specify the `product-id` input,

## Configure Github repository's action

### Basic Example

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
