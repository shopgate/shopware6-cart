## Shopgate Connect Shopware 6 Cart Extension by Apite, Maintained By Shopgate

### Development

#### Setup

```shell
cd extension && npm i && cd ..
cd frontend && npm i && cd ..
```

#### Utility extension modification

If you need to add to the Utility extension, you will need to download it separately & install it locally:

```shell
cd ..
git clone git@github.com:shopgate/shopware6-utility.git
cd shopware6-user/extension
npm run utility:develop
```

#### Configurations

You can set up the ENV variables when running `sgconnect` or use a local `.env` file.

##### For inline, the command will look like this:

```shell
SW_ENDPOINT=http://localhost SW_ACCESS_KEY=SWSCMMJTYL... node $(which sgconnect) backend start
```

##### As an `.env` file.

In `[root]/extension` create an `.env` file with content like this:

```dotenv
SW_ENDPOINT: "http://localhost"
SW_ACCESS_KEY: "SWSCMMJTYL..."
SW_LANG_ID: "fa964a97a1..."
```

Run:

```shell
node -r dotenv/config $(which sgconnect) backend start
```
