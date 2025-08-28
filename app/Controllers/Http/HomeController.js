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
      paketData: {
        xl: [
          { name: '1GB 30 Hari', price: 15000, provider: 'XL' },
          { name: '3GB 30 Hari', price: 35000, provider: 'XL' },
          { name: '5GB 30 Hari', price: 50000, provider: 'XL' }
        ],
        telkomsel: [
          { name: '1.5GB 30 Hari', price: 18000, provider: 'Telkomsel' },
          { name: '3.5GB 30 Hari', price: 38000, provider: 'Telkomsel' },
          { name: '6GB 30 Hari', price: 55000, provider: 'Telkomsel' }
        ],
        smartfren: [
          { name: '2GB 30 Hari', price: 16000, provider: 'Smartfren' },
          { name: '4GB 30 Hari', price: 32000, provider: 'Smartfren' },
          { name: '8GB 30 Hari', price: 48000, provider: 'Smartfren' }
        ],
        indosat: [
          { name: '1GB 30 Hari', price: 14000, provider: 'Indosat' },
          { name: '3GB 30 Hari', price: 34000, provider: 'Indosat' },
          { name: '5GB 30 Hari', price: 49000, provider: 'Indosat' }
        ],
        byu: [
          { name: '1.5GB 30 Hari', price: 17000, provider: 'by.U' },
          { name: '3.5GB 30 Hari', price: 36000, provider: 'by.U' },
          { name: '7GB 30 Hari', price: 52000, provider: 'by.U' }
        ],
        axis: [
          { name: '2GB 30 Hari', price: 15500, provider: 'Axis' },
          { name: '4GB 30 Hari', price: 33000, provider: 'Axis' },
          { name: '6GB 30 Hari', price: 47000, provider: 'Axis' }
        ],
        tri: [
          { name: '1GB 30 Hari', price: 13000, provider: 'Tri' },
          { name: '3GB 30 Hari', price: 31000, provider: 'Tri' },
          { name: '5GB 30 Hari', price: 45000, provider: 'Tri' }
        ]
      },
      ewallet: {
        ovo: [
          { amount: 102000, price: 100980, fee: 300 },
          { amount: 82000, price: 81180, fee: 180 },
          { amount: 52000, price: 50960, fee: 250 }
        ],
        gopay: [
          { amount: 102000, price: 100980, fee: 300 },
          { amount: 82300, price: 81477, fee: 200 },
          { amount: 52000, price: 51480, fee: 480 }
        ],
        dana: [
          { amount: 100000, price: 100000, fee: '-' },
          { amount: 81900, price: 81081, fee: 200 },
          { amount: 52100, price: 51058, fee: 300 }
        ],
        shopeepay: [
          { amount: 101000, price: 101000, fee: '-' },
          { amount: 82600, price: 81774, fee: 300 },
          { amount: 50000, price: 50000, fee: '-' }
        ]
      },
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
}

module.exports = HomeController