# Joi Relative Date Validator

[![CircleCI](https://circleci.com/gh/Ninad89/joi-relative-date-validator/tree/master.svg?style=shield)](https://circleci.com/gh/Ninad89/joi-relative-date-validator/tree/master)
[![NPM](https://nodei.co/npm/joi-relative-date-validator.png?compact=true)](https://nodei.co/npm/joi-relative-date-validator/)

## Install

```
npm install joi-relative-date-validator
```

## How to use

1. First import @hapi/Joi
```
import Joi from @hapi/Joi
```
*Note: This module does not install `Joi` automatically. You need to add it to your dependency.*

2. Import module
```
import relativeDateValidator from 'joi-relative-date-validator'
```

3. Extend Joi
```
const custom = Joi.extend(relativeDateValidator());
const schema: Schema = custom.relativeDate().within(2, 'd');
```


4. Generate Schema
```
const schema: Schema = custom.relativeDate().within(2, 'd');
```

5. And finally validate 
```
schema.validate('2018-10-31');

schema.validate(new Date(2018-10-31T00:00:00));

schema.validate(moment());

```
> More examples in src/index.test.ts file.

### Points good to note
- Joi.Date is base type of this validator.
- Internally it uses Moment.js, so you can pass any moment parsable date to validator function
