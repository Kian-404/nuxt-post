# post

## Build Setup

### 前端
```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```
### 后端

```bash

$ cd server

$ node app.js
```

```bash
Note  
  node_modules/mockjs/dist/mock.js 3807行 手动添加 				
  MockXMLHttpRequest.prototype.upload = createNativeXMLHttpRequest().upload;
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
