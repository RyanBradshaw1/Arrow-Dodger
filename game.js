const log = args => console.log(args)
const ui = {}
const game = {}

const createSprite = ({x, y, width, height, color, active}) => {
    const sprite = {
        x,
        y,
        active,
        visible: true,
        draw (ctx) {
            ctx.save()
            ctx.fillStyle = color
            ctx.fillRect(sprite.x, sprite.y, width, height)
            ctx.restore()
        },
        update() {
            sprite.x -= 20
        }
    }
    return sprite
}

const createPlayer = ({x, y, width, height, color, active}) => {
    const playerSprite = {
        x,
        y,
        active,
        visible: true,
        draw (ctx) {
            ctx.save()
            ctx.fillStyle = color
            ctx.beginPath()
            ctx.arc(playerSprite.x, playerSprite.y, height, 0, 2 * Math.PI)
            ctx.fill()
        },
        update() {
            if(playerSprite.y <= 414) {
                playerSprite.y += 1
            }
            document.body.onkeydown = function(e){
                if((e.keyCode === 32) && (playerSprite.y >= 75)) {
                    playerSprite.y -= 60
                } else if((e.keyCode === 40) && (playerSprite.y <= 350)) {
                    playerSprite.y += 40
                }
            }
            
        }
    }
    return playerSprite
}

const boot = () => {
    ui.canvas = document.querySelector('.game')
    ui.ctx = ui.canvas.getContext('2d')

    game.obstacles = []

    game.player = []


    game.colors = ['red', 'blue', 'green', 'yellow']

    const playerOne = createPlayer({
        x: 40,
        y: 185,
        width: 25,
        height: 25,
        color: 'cyan',
        active: true
    })

    game.player.push(playerOne)

    
    setInterval(function() {
        const obstacle = createSprite({
            x: 959,
            y: ~~((Math.random() * 425) + 1),
            width: 100,
            height: 15,
            color: game.colors[~~(Math.random() * 4)],
            active: true
        })

        game.obstacles.push(obstacle)
        
    }, 300)



    

    const update = (delta) => {
        // log('updating')
        game.obstacles.forEach(obstacle => {
            obstacle && obstacle.active && obstacle.update && obstacle.update(delta)
        })

        game.player.forEach(playerOne => {
            playerOne && playerOne.active && playerOne.update && playerOne.update(delta)
        })

    }

    const draw = () => {
        // log('drawing')
        ui.ctx.clearRect(0, 0, ui.canvas.width, ui.canvas.height)

        game.obstacles.forEach(obstacle => {
            obstacle && obstacle.visible && obstacle.draw && obstacle.draw(ui.ctx)

        })

        game.player.forEach(playerOne => {
            playerOne && playerOne.visible && playerOne.draw && playerOne.draw(ui.ctx)
        })
    }

    const mainLoop = (delta) => {
        update(delta * .001)
        draw()
        window.requestAnimationFrame(mainLoop)
    }

    mainLoop(0)
}
document.addEventListener('DOMContentLoaded', boot, false)