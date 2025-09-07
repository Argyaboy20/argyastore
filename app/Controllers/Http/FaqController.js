'use strict'

class FaqController {
    async faq ({ view }) {
        return view.render('faq')
    }
}

module.exports = FaqController
