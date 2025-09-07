'use strict'

class VoucherController {
    async voucher ({ view }) {
        return view.render('voucher')
    }
}

module.exports = VoucherController
