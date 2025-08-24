'use strict'

class HomeController {
  async index ({ request, response, view }) {
    const products = {
      pulsa: [
        { amount: 100000, price: 99000, discount: '1%' },
        { amount: 80000, price: 79000, discount: '1.25%' },
        { amount: 50000, price: 49500, discount: '1%' }
      ],
      paketData: [
        { name: '1GB 30 Hari', price: 15000, provider: 'Telkomsel' },
        { name: '3GB 30 Hari', price: 35000, provider: 'XL' },
        { name: '5GB 30 Hari', price: 50000, provider: 'Indosat' }
      ],
      ewallet: [
        { amount: 100000, price: 99500, fee: 500 },
        { amount: 50000, price: 49750, fee: 250 },
        { amount: 20000, price: 19900, fee: 100 }
      ],
      tokenListrik: [
        { amount: 200000, price: 201000, admin: 1000 },
        { amount: 100000, price: 101000, admin: 1000 },
        { amount: 50000, price: 51000, admin: 1000 },
        { amount: 20000, price: 21000, admin: 1000 }
      ],
       esim: [
        { provider: 'Telkomsel E-SIM 3GB', price: 36531 },
        { provider: 'Indosat E-SIM 3GB 30hr', price: 35145 }
      ]
    }

    return view.render('welcome', { products })
  }

 async support ({ view }) {

 }
}

module.exports = HomeController