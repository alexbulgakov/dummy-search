# Dummy Search - People finder app solution

In this challenge, it is necessary to implement a people search using a fake json data provider and the fetch API. In addition to the main task, I used typing with TypeScript, the VK UI library for a better user experience, and optimization. I added error handling in case of data loading failure, as well as a data loading indicator. Also, I optimized network interactions through pagination and partial data loading, and introduced debouncing to reduce the number of server requests.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Useful resources](#useful-resources)

## Overview

### The challenge

Users should be able to:

- Enter a person's last name and first name in the search bar
- Receive relevant search results in response to their query
- Interact with a responsive interface
- See the loading status and an error message in case it occurs

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [github.com/alexbulgakov/dummy-search](https://github.com/alexbulgakov/dummy-search)
- Live Site URL: [dummy-search.vercel.app](https://dummy-search.vercel.app/)

## My process

### Built with

- [VK UI](https://vkcom.github.io/VKUI/#/About) - This is a library of adaptive React components for building web applications
- [React](https://reactjs.org/) - JS library
- [Dummy JSON](https://dummyjson.com/) - Fake JSON data provider

### Useful resources

- [plural-ru](https://www.npmjs.com/package/plural-ru) - This library helped me to accurately inform the user about how many friends were found in the search. It provides correct declension of nouns and verbs in Russian.
