'use strict'

class HomeController {
  async index({ request, response, view }) {
    const products = {
      pulsa: {
        indosat: [
          { amount: 100500, price: 99495, discount: '1%' },
          { amount: 80730, price: 79923, discount: '1%' },
          { amount: 50500, price: 49995, discount: '1%' }
        ],
        simpati: [
          { amount: 100900, price: 99891, discount: '1%' },
          { amount: 80100, price: 80100, discount: '0%' },
          { amount: 51000, price: 49980, discount: '2%' }
        ],
        smartfren: [
          { amount: 100800, price: 99792, discount: '1%' },
          { amount: 80100, price: 80100, discount: '0%' },
          { amount: 50000, price: 49500, discount: '1%' }
        ],
        telkomsel: [
          { amount: 101000, price: 99990, discount: '1%' },
          { amount: 80100, price: 80100, discount: '0%' },
          { amount: 51000, price: 49980, discount: '2%' }
        ],
        tri: [
          { amount: 100000, price: 99000, discount: '1%' },
          { amount: 80200, price: 79398, discount: '1%' },
          { amount: 50500, price: 49995, discount: '1%' }
        ],
        xl: [
          { amount: 101000, price: 99990, discount: '1%' },
          { amount: 85000, price: 84950, discount: '0.06%' },
          { amount: 50600, price: 50094, discount: '1%' }
        ],
        byu: [
          { amount: 101250, price: 99225, discount: '2%' },
          { amount: 80000, price: 80000, discount: '0%' },
          { amount: 50350, price: 49847, discount: '1%' }
        ]
      },
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

  async support({ view }) {

  }
}

module.exports = HomeController