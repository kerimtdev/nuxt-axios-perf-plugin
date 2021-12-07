# Axios Performance Logger 

This plugin created for monitoring requests performance on NuxtJS.


## Installation 

```
npm install nuxt-axios-perf-plugin --save
```

## Usage

`plugins/axiosPerf.js`

```js
import applyPerformanceLogger from 'nuxt-axios-perf-plugin'

export default function (context) {
  applyPerformanceLogger(context)
}
```