'use strict'

class RiwayatController {
     async riwayat({ view }) {
        return view.render('riwayat')
    }
}

module.exports = RiwayatController
