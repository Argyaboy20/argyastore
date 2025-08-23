'use strict'

class EntertainmentController {
    async entertainment({ view }) {
        const appData = {
            'netflix': {
                title: 'Netflix Premium',
                icon: '📺',
                description: 'Tonton ribuan film dan serial TV tanpa batas dengan kualitas HD dan 4K.',
                features: ['4K Ultra HD', '4 Akun Simultan', 'Download Offline', 'No Ads'],
                options: [
                    { duration: '1 Bulan', price: 54000, popular: false },
                    { duration: '3 Bulan', price: 150000, popular: true, discount: '7%' },
                    { duration: '6 Bulan', price: 290000, popular: false, discount: '10%' },
                    { duration: '12 Bulan', price: 550000, popular: false, discount: '15%' }
                ]
            },
            'spotify': {
                title: 'Spotify Premium',
                icon: '🎵',
                description: 'Streaming musik tanpa iklan dengan kualitas audio terbaik.',
                features: ['No Ads', 'Offline Download', 'High Quality Audio', 'Unlimited Skips'],
                options: [
                    { duration: '1 Bulan', price: 17000, popular: false },
                    { duration: '3 Bulan', price: 45000, popular: true, discount: '12%' },
                    { duration: '6 Bulan', price: 85000, popular: false, discount: '17%' },
                    { duration: '12 Bulan', price: 150000, popular: false, discount: '26%' }
                ]
            },
            'youtube': {
                title: 'YouTube Premium',
                icon: '📹',
                description: 'Nonton YouTube tanpa iklan, background play, dan download offline.',
                features: ['Ad-Free Videos', 'Background Play', 'YouTube Music', 'Download Videos'],
                options: [
                    { duration: '1 Bulan', price: 35000, popular: false },
                    { duration: '3 Bulan', price: 95000, popular: true, discount: '10%' },
                    { duration: '6 Bulan', price: 180000, popular: false, discount: '14%' },
                    { duration: '12 Bulan', price: 350000, popular: false, discount: '17%' }
                ]
            },
            'disney': {
                title: 'Disney+ Hotstar',
                icon: '🏰',
                description: 'Konten Disney, Marvel, Star Wars, dan Hotstar Originals.',
                features: ['Disney Content', 'Marvel Movies', 'Star Wars', 'Local Content'],
                options: [
                    { duration: '1 Bulan', price: 39000, popular: false },
                    { duration: '3 Bulan', price: 109000, popular: true, discount: '7%' },
                    { duration: '6 Bulan', price: 199000, popular: false, discount: '15%' },
                    { duration: '12 Bulan', price: 359000, popular: false, discount: '23%' }
                ]
            },
            'vidio': {
                title: 'Vidio Premier',
                icon: '📺',
                description: 'Konten lokal Indonesia, live sports, dan film eksklusif.',
                features: ['Indonesian Content', 'Live Sports', 'Local Movies', 'Original Series'],
                options: [
                    { duration: '1 Bulan', price: 29000, popular: false },
                    { duration: '3 Bulan', price: 79000, popular: true, discount: '9%' },
                    { duration: '6 Bulan', price: 149000, popular: false, discount: '14%' },
                    { duration: '12 Bulan', price: 279000, popular: false, discount: '20%' }
                ]
            },
            'wetv': {
                title: 'WeTV VIP',
                icon: '📱',
                description: 'Drama Asia, anime, dan konten eksklusif dari WeTV.',
                features: ['Asian Drama', 'Anime Content', 'No Ads', 'HD Quality'],
                options: [
                    { duration: '1 Bulan', price: 25000, popular: false },
                    { duration: '3 Bulan', price: 69000, popular: true, discount: '8%' },
                    { duration: '6 Bulan', price: 129000, popular: false, discount: '14%' },
                    { duration: '12 Bulan', price: 239000, popular: false, discount: '20%' }
                ]
            }
        };

        return view.render('entertainment', { appData })
    }
}

module.exports = EntertainmentController
