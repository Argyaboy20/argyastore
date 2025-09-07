'use strict'

class AboutUsController {
    async aboutus ({ view }) {
        return view.render('aboutus')
    }
}

module.exports = AboutUsController
