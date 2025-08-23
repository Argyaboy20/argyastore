'use strict'

/*
|--------------------------------------------------------------------------
| Http server
|--------------------------------------------------------------------------
|
| This file bootstrap Adonisjs to start the HTTP server. You are free to
| customize the process of booting the http server.
|
| """ Loading ace commands """
|     At times you may want to load ace commands when starting the HTTP server.
|     Same can be done by chaining `loadCommands()` method after
|
| """ Preloading files """
|     Also you can preload files by calling `preLoad('path/to/file')` method.
|     Make sure to pass relative path from the project root.
*/

const { Ignitor } = require('@adonisjs/ignitor')

new Ignitor(require('@adonisjs/fold'))
  .appRoot(__dirname)
  .fireHttpServer()
  .catch(console.error)

const Env = use('Env')

class ArgyaStoreKeepAlive {
  static init() {
    // Hanya jalan di production (Render)
    if (Env.get('NODE_ENV') === 'production') {
      this.startAntiSleep()
      this.logStatus()
    }
  }

  static startAntiSleep() {
    const appUrl = Env.get('APP_URL') || 'http://localhost:3333'
    const pingInterval = 14 * 60 * 1000 // 14 menit (sebelum sleep di 15 menit)

    console.log('🚀 ArgyaStore Anti-Sleep Service Started!')
    console.log(`📍 Monitoring URL: ${appUrl}`)
    
    // Ping pertama setelah 1 menit (untuk testing)
    setTimeout(() => {
      this.pingServer(appUrl)
    }, 60000)

    // Ping regular setiap 14 menit
    setInterval(() => {
      this.pingServer(appUrl)
    }, pingInterval)
  }

  static pingServer(url) {
    try {
      const https = require('https')
      const http = require('http')
      const protocol = url.startsWith('https') ? https : http
      
      const startTime = Date.now()
      
      protocol.get(`${url}/api/keepalive`, (res) => {
        const responseTime = Date.now() - startTime
        console.log(`✅ Keep-Alive Success | Response: ${responseTime}ms | ${new Date().toLocaleString()}`)
        
        // Log status untuk monitoring
        res.on('data', (chunk) => {
          try {
            const data = JSON.parse(chunk.toString())
            console.log(`📊 Server Status: ${data.status} | Uptime: ${Math.floor(data.uptime/3600)}h`)
          } catch (e) {
            // Silent error untuk response yang bukan JSON
          }
        })
      }).on('error', (err) => {
        console.log(`❌ Keep-Alive Failed: ${err.message}`)
      }).setTimeout(30000, () => {
        console.log('⏰ Keep-Alive Timeout (30s)')
      })
    } catch (error) {
      console.log('🚨 Keep-Alive Service Error:', error.message)
    }
  }

  static logStatus() {
    // Log status setiap 30 menit untuk monitoring
    setInterval(() => {
      const memUsage = process.memoryUsage()
      console.log(`💓 ArgyaStore Status Check:`)
      console.log(`   Memory: ${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`)
      console.log(`   Uptime: ${Math.floor(process.uptime() / 3600)}h ${Math.floor((process.uptime() % 3600) / 60)}m`)
    }, 30 * 60 * 1000)
  }
}

// Start service
ArgyaStoreKeepAlive.init() 