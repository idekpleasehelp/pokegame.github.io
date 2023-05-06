// To change the position of the image or the background whhile pressing the keys (to reference the components)
class Sprite {
    constructor({
        position,
        velocity,
        image,
        frames = { max: 1, hold: 10 },
        sprites,
        animate = false,
        rotation = 0

    }) {
        this.position = position
        this.image = new Image()
        this.frames = { ...frames, val: 0, elapsed: 0 }
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.image.src = image.src
        this.animate = animate
        this.sprites = sprites
        this.opacity = 1
        this.rotation = rotation

    }
    draw() {
        c.save()
        c.translate(
            this.position.x + this.width / 2,
            this.position.y + this.height / 2
        )
        c.rotate(this.rotation)
        c.translate(
            -this.position.x - this.width / 2,
            -this.position.y - this.height / 2
        )
        c.globalAlpha = this.opacity
        c.drawImage(
            this.image,
            this.frames.val * this.width,   // x coordinate of the image
            0,   // y coordinate of the image
            this.image.width / this.frames.max,   // how far the image should be cropped to (crop width)
            this.image.height,   // crop height 
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )
        c.restore()
        if (!this.animate) return
        if (this.frames.max > 1) {
            this.frames.elapsed++
        }
        if (this.frames.elapsed % this.frames.hold === 0) {
            if (this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0
        }
    }

}

class Monster extends Sprite {
    constructor({
        position,
        velocity,
        image,
        frames = { max: 1, hold: 10 },
        sprites,
        animate = false,
        rotation = 0,
        isEnemy = false,
        name,
        attacks
    }) {
        super({
            position,
            velocity,
            image,
            frames,
            sprites,
            animate,
            rotation,
        })
        this.health = 100
        this.isEnemy = isEnemy
        this.name = name
        this.attacks = attacks
    }

    faint() {
        document.querySelector('#dialogueBox').innerHTML = this.name + ' fainted! '
        gsap.to(this.position, {
            y: this.position.y + 20
        })
        gsap.to(this, {
            opacity: 0
        })
        audio.battle.stop()
        audio.victory.play() 
    }

    attack({ attack, recipient, renderedSprites }) {
        document.querySelector('#dialogueBox').style.display = 'block'
        document.querySelector('#dialogueBox').innerHTML = this.name + ' used ' + attack.name

        let healthBar = '#enemyHealthBar'
        if (this.isEnemy) healthBar = '#playerHealthBar'

        let rotation = 1
        if (this.isEnemy) rotation = -1

        recipient.health -= attack.damage

        switch (attack.name) {
            case 'SlimeShoot':
                audio.initSlimeShoot.play()
                const slimeShootImage = new Image()
                slimeShootImage.src = './img/slimeShoot.png'
                const slime = new Sprite({
                    position: {
                        x: this.position.x,
                        y: this.position.y
                    },
                    image: slimeShootImage,
                    frames: {
                        max: 4,
                        hold: 2
                    },
                    animate: true,
                    rotation
                })
                renderedSprites.splice(1, 0, slime)

                gsap.to(slime.position, {
                    x: recipient.position.x,
                    y: recipient.position.y,
                    onComplete: () => {
                        // enemy hit
                        audio.slimeShootHit.play()
                        gsap.to(healthBar, {
                            width: recipient.health + '%'
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                        renderedSprites.splice(1, 1)
                    }
                })

                break
            case 'Chainsaw':
                audio.initChainsaw.play()
                const chainsawImage = new Image()
                chainsawImage.src = './img/chainsaw.png'
                const chainsaw = new Sprite({
                    position: {
                        x: this.position.x,
                        y: this.position.y
                    },
                    image: chainsawImage,
                    frames: {
                        max: 8,
                        hold: 4
                    },
                    animate: true,
                    rotation
                })
                renderedSprites.splice(1, 0, chainsaw)

                gsap.to(chainsaw.position, {
                    x: recipient.position.x,
                    y: recipient.position.y,
                    onComplete: () => {
                        // enemy hit
                        audio.chainsawHit.play()
                        gsap.to(healthBar, {
                            width: recipient.health + '%'
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                        renderedSprites.splice(1, 1)
                    }
                })

                break
            case 'HeatCrash':
                audio.initFireball.play()
                const fireBallImage = new Image()
                fireBallImage.src = './img/fireBall.png'
                const fireBall = new Sprite({
                    position: {
                        x: this.position.x,
                        y: this.position.y
                    },
                    image: fireBallImage,
                    frames: {
                        max: 4,
                        hold: 10
                    },
                    animate: true,
                    rotation
                })
                renderedSprites.splice(1, 0, fireBall)

                gsap.to(fireBall.position, {
                    x: recipient.position.x,
                    y: recipient.position.y,
                    onComplete: () => {
                        // enemy hit
                        audio.fireballHit.play()
                        gsap.to(healthBar, {
                            width: recipient.health + '%'
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                        renderedSprites.splice(1, 1)
                    }
                })

                break
            case 'AquaJet':
                audio.initAquaJet.play()
                const aquaJetImage = new Image()
                aquaJetImage.src = './img/aquaJet.png'
                const aquaJet = new Sprite({
                    position: {
                        x: this.position.x,
                        y: this.position.y
                    },
                    image: aquaJetImage,
                    frames: {
                        max: 5,
                        hold: 10
                    },
                    animate: true,
                    // rotation
                })
                renderedSprites.splice(1, 0, aquaJet)

                gsap.to(aquaJet.position, {
                    x: recipient.position.x,
                    y: recipient.position.y,
                    onComplete: () => {
                        // enemy hit
                        gsap.to(healthBar, {
                            width: recipient.health + '%'
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                        renderedSprites.splice(1, 1)
                    }
                })

                break
            case 'Tackle':
                const tl = gsap.timeline()
                let movementDistane = 20
                if (this.isEnemy) movementDistane = -20
                tl.to(this.position, {
                    x: this.position.x - movementDistane
                }).to(this.position, {
                    x: this.position.x + movementDistane * 2,
                    duration: 0.1,
                    onComplete: () => {
                        // enemy hit
                        audio.tackleHit.play()
                        gsap.to(healthBar, {
                            width: recipient.health + '%'
                        })
                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })
                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                    }
                }).to(this.position, {
                    x: this.position.x
                })

                break
        }
    }

}

// to place the canvas objects as per the array
class Boundary {
    static width = 48
    static height = 48
    constructor({ position }) {
        this.position = position
        this.width = 48
        this.height = 48
    }
    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0.0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}