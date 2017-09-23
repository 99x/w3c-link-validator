# w3c-link-validator

[![Join the chat at https://gitter.im/w3c-link-validator/Lobby](https://badges.gitter.im/w3c-link-validator/Lobby.svg)](https://gitter.im/w3c-link-validator/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/99xt/w3c-link-validator/master/LICENSE)
[![Build Status](https://travis-ci.org/shalithasuranga/w3c-link-validator.svg?branch=master)](https://travis-ci.org/shalithasuranga/w3c-link-validator)
[![Coverage Status](https://coveralls.io/repos/github/shalithasuranga/w3c-link-validator/badge.svg?branch=master)](https://coveralls.io/github/shalithasuranga/w3c-link-validator?branch=master)

Very good command line tool for W3C validation and broken link detection of your local development or production URL.
Validation errors,warnings or suggestions will be reported to terminal.


## Installation


Install with the terminal.

```bash
$ npm install w3c-link-validator -g
```

After installation `w3clink` command will be available globally.


## Tutorial

#### Get started

See the command line help first.

```bash
$ w3clink --help
```


```bash

  Usage: w3clink [options]


  Options:

    -V, --version                                            output the version number
    check, --check <url> [verbose] [onlyhtml] [suggestions]  Validate links and html both
    -h, --help                                               output usage information

```

#### Validation command


```bash
$ w3clink check <url> [options]
```


This command will start validation service for specific URL. URLs per each page will be tested recursively.

**Options**

- `verbose` will show you anything during the validation. Eg hyperlinks per page.
- `onlyhtml` will block the deep url traversing. Use if you want to validate html standards only. 
- `suggestions` will log the suggestions also.

Example 

```bash
$ w3clink check http://localhost/w3ctest/ suggestions
```


## Contributing

#### Development setup

Fork and clone repo 

```bash
$ git clone https://github.com/<username>/w3c-link-validator.git
```

Install dependencies

```bash
$ npm install
```


#### Crawling algorithm



## License

MIT © [99XT](https://github.com/99xt)




