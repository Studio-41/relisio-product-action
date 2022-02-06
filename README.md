This Github action is an official [Relisio](https://www.relisio.com/) deploy utility.<br />

Before you start using this action, consider that Relisio is currently in Beta, and breaking changes may occur at any time.

## Configure Github repository's action

### Basic Example

The following example publishes a new product into your workspace every time a Tag (having `v` prefix) is created.

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
        workspace-path: ${{ secrets.RELISIO_WORKSPACE }}
        visibility: private
        token: ${{ secrets.RELISIO_API_TOKEN }}
```
