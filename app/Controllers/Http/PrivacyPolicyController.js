'use strict'

class PrivacyPolicyController {
    async privacypolicy ({ view }) {
        return view.render('privacypolicy')
    }
}

module.exports = PrivacyPolicyController
