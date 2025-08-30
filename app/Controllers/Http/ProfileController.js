'use strict'

class ProfileController {
    async profile({ view }) {
        return view.render('profile')
    }
}

module.exports = ProfileController
