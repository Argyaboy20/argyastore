'use strict'

class NomorController {
    async nomor({ view }) {
        return view.render('nomor')
    }
}

module.exports = NomorController
