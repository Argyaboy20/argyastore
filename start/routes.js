'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'HomeController.index')
Route.get('/game', 'GameController.game')
Route.get('/entertainment', 'EntertainmentController.entertainment')
Route.get('/support', 'HomeController.support')

// Health check endpoint (untuk external monitoring)
Route.get('/health', ({ response }) => {
  return response.json({
    service: 'ArgyaStore',
    status: 'online',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    memory: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
    version: '1.0.0'
  })
})

// Keep-alive endpoint (untuk internal ping)
Route.get('/api/keepalive', ({ response }) => {
  return response.json({
    message: '🏪 ArgyaStore is alive!',
    status: 'active',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    services: {
      games: 'online',
      payment: 'online',
      topup: 'ready'
    }
  })
})

// Status page untuk monitoring (optional)
Route.get('/status', ({ response }) => {
  const uptimeSeconds = Math.floor(process.uptime())
  const days = Math.floor(uptimeSeconds / 86400)
  const hours = Math.floor((uptimeSeconds % 86400) / 3600)
  const minutes = Math.floor((uptimeSeconds % 3600) / 60)
  
  return response.json({
    service: 'ArgyaStore Gaming Platform',
    status: 'operational',
    uptime: `${days}d ${hours}h ${minutes}m`,
    last_check: new Date().toISOString(),
    endpoints: {
      games: '/game',
      api: '/api/keepalive',
      health: '/health'
    },
    metrics: {
      memory_usage: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
      cpu_usage: 'N/A',
      requests_served: 'N/A'
    }
  })
}) 