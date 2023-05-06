const monsters = {
    Emby: {
        position: {
            x: 280,
            y: 325
        },
        image: {
            src: './img/embySprite.png'
        },
        frames: {
            max: 11,
            hold: 5
        },
        animate: true,
        name: 'Emby',
        attacks: [attacks.Tackle, attacks.Chainsaw, attacks.AquaJet, attacks.HeatCrash]
    },
    Draggle: {
        position: {
            x: 800,
            y: 130
        },
        image: {
            src: './img/draggleSprite.png'
        },
        frames: {
            max: 10,
            hold: 5
        },
        animate: true,
        isEnemy: true,
        name: 'Draggle',
        attacks: [attacks.Tackle, attacks.Slime, attacks.AquaJet]
    }
}

