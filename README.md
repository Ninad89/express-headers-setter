# express-headers-setter
Middleware to set response headers in express app

[![NPM](https://nodei.co/npm/express-set-headers-mw.png?compact=true)](https://nodei.co/npm/express-set-headers-mw/)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FNinad89%2Fexpress-headers-setter.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FNinad89%2Fexpress-headers-setter?ref=badge_shield)

[![Node.js CI](https://github.com/Ninad89/express-headers-setter/actions/workflows/node.js.yml/badge.svg)](https://github.com/Ninad89/express-headers-setter/actions/workflows/node.js.yml)
![GitHub](https://img.shields.io/github/license/Ninad89/express-headers-setter?style=plastic)

This middleware will help you to set up response headers in 3 different way.
1. Static Headers (Value is fixed while configuring this Middleware)
2. Dynamically calculated headers (Value is calculated dynamically)
3. Copying value from response object

### Configuring middleware

Middleware can be configured using following method which accepts [`IConfig`](#IConfig) parameter

### `createSetHeadersMiddleware(config:IConfig)` 
This method will return configured middleware function that sets headers on the response based on configurations.
    
#### `IConfig`
This is interface for configuration parameters

```javascript
interface IConfig {
    staticHeaders?: IStaticValues;
    dynamicHeaders?: IDynamicValues;
    copyFromRequestHeaders?: string[];
}
```    
- `staticHeaders` : This param is of type [`IStaticValues`](#IStaticValues) and can be used to configure header with static values.
 - `dynamicHeaders` : This param is of type [`IDynamicValues`](#IDynamicValues) and can be used to configure headers with dynamic values.
 - `copyFromRequestHeaders` : This parameter is array of string and values from request headers will be copied to response headers.

 #### `IStaticValues`
```javascript
interface IStaticValues {
    [key: string]: string;
}
```  
`key` is header key and value will be header value.. plain and simple.

#### `IDynamicValues`
```javascript
interface IDynamicValues {
    [key: string]: (arg0: Request) => string;
}
```
`key` is header key, `value` is of type `function`, it will evaluated and `request` object and return string value will be assigned to header key.
 
### Usage/Example

[Here](./samples/sample.ts)

*Happy codding*

## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FNinad89%2Fexpress-headers-setter.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FNinad89%2Fexpress-headers-setter?ref=badge_large)