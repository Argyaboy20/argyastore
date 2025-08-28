'use strict'

class SupportController {
    async support({ view }) {
        return view.render('support')
    }
}

module.exports = SupportController
