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
Route.get('/support', 'SupportController.support')
Route.get('/profile', 'ProfileController.profile')
Route.get('/nomor', 'NomorController.nomor')
Route.get('/riwayat', 'RiwayatController.riwayat')
Route.get('/voucher', 'VoucherController.voucher')
Route.get('/aboutus', 'AboutUsController.aboutus')
Route.get('/faq', 'FaqController.faq')
Route.get('/privacypolicy', 'PrivacyPolicyController.privacypolicy')

Route.get('/dashboard', 'AdminStoreController.adminstore')