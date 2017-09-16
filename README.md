# w3c-link-validator

[![Join the chat at https://gitter.im/w3c-link-validator/Lobby](https://badges.gitter.im/w3c-link-validator/Lobby.svg)](https://gitter.im/w3c-link-validator/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/99xt/w3c-link-validator/master/LICENSE)


A Command line tool, identifying broken links, validate basic html standards and reporting 


##Installation

TODO


##Tutorial

####Test for a complete project.

`
$ localw3c check <url> [options]
`

This command will start validation service for specific local url. URLs per each page will be tested recursively.

**Options**

- `verbose` will show you anything during the validation. Eg hyperlinks per page.
- `singlepage` will block the deep url traversing. Use if if you want to validate single page. 

Example 

`
$ locaw3c check http://localhost/htmlproject/ -v
`


##Contributing

###Installation
Fork and clone it 

`
$ git clone https://github.com/<username>/w3c-link-validator.git
`

Install dependencies

`
$ npm install
`






