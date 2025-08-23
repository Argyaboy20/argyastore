'use strict'

class GameController {
    async game({ view }) {
        const gameData = {
            'mobile-legends': {
                title: 'Mobile Legends: Bang Bang',
                icon: '🏆',
                packages: [
                    { amount: '86 Diamonds', price: 20000, bonus: '+4 Diamonds' },
                    { amount: '172 Diamonds', price: 39000, bonus: '+8 Diamonds' },
                    { amount: '257 Diamonds', price: 58000, bonus: '+12 Diamonds' },
                    { amount: '429 Diamonds', price: 95000, bonus: '+21 Diamonds' },
                    { amount: '716 Diamonds', price: 155000, bonus: '+36 Diamonds' },
                    { amount: '1446 Diamonds', price: 310000, bonus: '+74 Diamonds' }
                ]
            },
            'free-fire': {
                title: 'Free Fire',
                icon: '🔥',
                packages: [
                    { amount: '70 Diamonds', price: 18000, bonus: '+2 Diamonds' },
                    { amount: '140 Diamonds', price: 35000, bonus: '+5 Diamonds' },
                    { amount: '355 Diamonds', price: 89000, bonus: '+15 Diamonds' },
                    { amount: '720 Diamonds', price: 178000, bonus: '+30 Diamonds' },
                    { amount: '1450 Diamonds', price: 355000, bonus: '+65 Diamonds' },
                    { amount: '2180 Diamonds', price: 532000, bonus: '+100 Diamonds' }
                ]
            },
            'pubg': {
                title: 'PUBG Mobile',
                icon: '🎯',
                packages: [
                    { amount: '60 UC', price: 15000, bonus: '' },
                    { amount: '325 UC', price: 75000, bonus: '+25 UC' },
                    { amount: '660 UC', price: 150000, bonus: '+60 UC' },
                    { amount: '1800 UC', price: 405000, bonus: '+200 UC' },
                    { amount: '3850 UC', price: 810000, bonus: '+450 UC' },
                    { amount: '8100 UC', price: 1620000, bonus: '+1000 UC' }
                ]
            },
            'genshin': {
                title: 'Genshin Impact',
                icon: '⚔️',
                packages: [
                    { amount: '60 Genesis Crystal', price: 15000, bonus: '' },
                    { amount: '300 Genesis Crystal', price: 73000, bonus: '+30 Crystal' },
                    { amount: '980 Genesis Crystal', price: 235000, bonus: '+110 Crystal' },
                    { amount: '1980 Genesis Crystal', price: 468000, bonus: '+260 Crystal' },
                    { amount: '3280 Genesis Crystal', price: 780000, bonus: '+500 Crystal' },
                    { amount: '6480 Genesis Crystal', price: 1560000, bonus: '+1600 Crystal' }
                ]
            },
            'valorant': {
                title: 'Valorant',
                icon: '🎪',
                packages: [
                    { amount: '525 VP', price: 70000, bonus: '' },
                    { amount: '1100 VP', price: 140000, bonus: '+100 VP' },
                    { amount: '2050 VP', price: 280000, bonus: '+250 VP' },
                    { amount: '3325 VP', price: 420000, bonus: '+425 VP' },
                    { amount: '5350 VP', price: 700000, bonus: '+750 VP' },
                    { amount: '11000 VP', price: 1400000, bonus: '+1500 VP' }
                ]
            },
            'coc': {
                title: 'Clash of Clans',
                icon: '🏰',
                packages: [
                    { amount: '80 Gems', price: 15000, bonus: '' },
                    { amount: '500 Gems', price: 89000, bonus: '+50 Gems' },
                    { amount: '1200 Gems', price: 189000, bonus: '+150 Gems' },
                    { amount: '2500 Gems', price: 379000, bonus: '+350 Gems' },
                    { amount: '6500 Gems', price: 949000, bonus: '+1000 Gems' },
                    { amount: '14000 Gems', price: 1899000, bonus: '+2500 Gems' }
                ]
            }
        };

        return view.render('game', { gameData })
    }
}

module.exports = GameController
