'use strict'

class AdminStoreController {
    async adminstore ({ view }) {
        return view.render('adminstore')
    }
}

module.exports = AdminStoreController
