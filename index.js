module.exports = function (context) {
  const { $axios } = context
  context.$perf = {
    data: {
      logs: [],
      subscribeMode: false,
    },
  
    /**
     * If you want to follow request performance immediately, pass true to the parameter.
     * When subscribeMode is true, performance log will be printed on the console after the request.
     * @param {Boolean} option 
     */
    setSubscribeMode(option) {
      this.data.subscribeMode = Boolean(option)
    },
  
    /**
     * When this function is called, previously created logs will be removed.
     */
    clearPerformanceLogs() {
      this.data.logs = []
    },
  
    /**
     * When this function is called, previously created logs will be returns as an array.
     * @returns Array
     */
    getPerformanceLogs() {
      return this.data.logs || []
    },
  
    /**
     * When this function is called, previously created logs will be printed on console.
     */
    printPerformanceLogs() {
      console.log(this.data.logs)
    },
  
    /**
     * When this function is called, previously created logs will be printed on console.
     */
    printPerformanceLogs() {
      console.log(this.data.logs)
    },
  
    /**
     * This function used on Axios interceptors.
     * @param {*} res 
     * @returns 
     */
    _generateLog(res) {
      const start = response.config.perfStart
      const diff = new Date().getTime() - start
  
      if (!start) {
        return res
      }
  
      if (this.data.logs.some(
        (curr) =>
          curr.url === res.config.url &&
          curr.method === res.config.method
      )) {
        const logObject = {
          method: res.config.method,
          url: res.config.url,
          start: start.toString(),
          duration: (diff / 1000).toFixed(2),
        }
        this.data.logs.push(logObject)
  
        if(this.data.subscribeMode) {
          console.log(logObject)
        }
      }
    },
  }

  $axios.onRequest((config) => {
    config.perfStart = new Date().getTime()
    return config
  })

  $axios.onResponse((response) => {
    context.$perf._generateLog(response)
    return response
  })

  $axios.onError((err) => {
    context.$perf._generateLog(err.response)
  })
}