# Reason Mui Binding Generator

This library generates bindings for
[material-ui](https://material-ui-1dab0.firebaseapp.com/). It's automatically generated by an adaption of  [reason-rt-binding-generator](https://github.com/astrada/reason-rt-binding-generator) (created by [astrada](https://github.com/astrada)).

## Prerequisites

Clone & rename the `env.example.js` in the `scripts` folder and enter the path to your `material-ui` **master clone** (this is **not** the NPM version!!).

1. Install
   [reason-cli](https://reasonml.github.io/guide/editor-tools/global-installation#recommended-through-npmyarn).

2. Install JS dependencies:

       yarn install

## How to (re)generate bindings
    yarn extract
    yarn parse
    
## Todo
- [ ] Implement the whole `Theme` structure & create a converter for it
- [x] ~~Write a code extension for conveniently using a typesafe `withStyles`~~ (2018-02-08)
- [ ] Make the code extension work with `theme => object` function
- [x] ~~Expose a nested `Colors` module~~ (2017-11-15)
- [x] ~~Think of a way to use `theme => object` pattern as `withStyles` argument~~(2017-11-25)
- [ ] Add `WithTheme` component
- [ ] Add `ThemeProvider` component
- [x] ~~Implement classname overrides~~ (2017-11-15)
- [ ] Implement ref function signatures