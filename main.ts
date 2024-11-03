radio.onReceivedNumber(function (receivedNumber) {
    sendPosition = false
    positionPinned = false
    music.play(music.createSoundExpression(WaveShape.Square, 5000, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
})
function calcMinY () {
    if (a == 1 || b == 1) {
        minY = 0
    } else {
        minY = -1
    }
}
input.onButtonPressed(Button.A, function () {
    if (wait == false) {
        if (gameStarted == false) {
            basic.showIcon(IconNames.Sword)
            player = "attack"
        } else {
            if (sendPosition == false) {
                positionPinned = false
            }
        }
    }
})
function zeichne (x: number, y: number) {
    if (a == 1) {
        led.plot(x, y)
    }
    if (b == 1) {
        led.plot(x + 1, y)
    }
    if (c == 1) {
        led.plot(x + 1, y + 1)
    }
    if (d == 1) {
        led.plot(x, y + 1)
    }
}
function calcMinX () {
    if (a == 1 || b == 1) {
        minX = 0
    } else {
        minX = -1
    }
}
input.onButtonPressed(Button.AB, function () {
    if (wait == false) {
        if (gameStarted == false) {
            radio.sendString(player)
            wait = true
            music.play(music.createSoundExpression(WaveShape.Noise, 500, 499, 255, 0, 750, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        } else {
            if (player == "attack") {
                if (sendPosition == false) {
                    if (positionPinned == true) {
                        sendPosition = true
                        radio.sendValue("x", x)
                        radio.sendValue("y", y)
                        music.play(music.createSoundExpression(WaveShape.Noise, 500, 499, 255, 0, 750, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
                        basic.showIcon(IconNames.Yes)
                    }
                }
            } else {
                sendPosition = true
            }
        }
    }
})
radio.onReceivedString(function (receivedString) {
    enemy = receivedString
})
function loescheTreffer () {
    if (x == opponentX) {
        if (y == opponentY) {
            basic.clearScreen()
            a = 0
            b = 0
            c = 0
            d = 0
        } else if (y == opponentY - 1) {
            led.unplot(x, y + 1)
            c = 0
            led.unplot(x + 1, y + 1)
            d = 0
        } else if (y == opponentY + 1) {
            led.unplot(x, y)
            a = 0
            led.unplot(x + 1, y)
            b = 0
        }
    } else if (x == opponentX - 1) {
        if (y == opponentY) {
            b = 0
            led.unplot(x + 1, y)
            d = 0
            led.unplot(x + 1, y + 1)
        } else if (y == opponentY - 1) {
            d = 0
            led.unplot(x + 1, y + 1)
        } else if (y == opponentY + 1) {
            led.unplot(x + 1, y)
            b = 0
        }
    } else if (x == opponentX + 1) {
        if (y == opponentY) {
            a = 0
            led.unplot(x, y)
            c = 0
            led.unplot(x, y + 1)
        } else if (y == opponentY - 1) {
            c = 0
            led.unplot(x, y + 1)
        } else if (y == opponentY + 1) {
            led.unplot(x, y)
            a = 0
        }
    }
}
input.onButtonPressed(Button.B, function () {
    if (wait == false) {
        if (gameStarted == false) {
            basic.showIcon(IconNames.Target)
            player = "defense"
        } else {
            if (sendPosition == false) {
                positionPinned = true
            }
        }
    }
})
function calcMaxY () {
    if (c == 1 || d == 1) {
        maxY = 3
    } else {
        maxY = 4
    }
}
radio.onReceivedValue(function (name, value) {
    if (name == "x") {
        opponentX = value
        receivedX = true
    }
    if (name == "y") {
        opponentY = value
        receivedY = true
    }
})
function calcMaxX () {
    if (b == 1 || d == 1) {
        maxX = 3
    } else {
        maxX = 4
    }
}
let maxX = 0
let receivedX = false
let maxY = 0
let opponentY = 0
let opponentX = 0
let enemy = ""
let minX = 0
let y = 0
let minY = 0
let positionPinned = false
let x = 0
let gameStarted = false
let player = ""
let wait = false
let sendPosition = false
let receivedY = false
let d = 0
let c = 0
let b = 0
let a = 0
a = 1
b = 1
c = 1
d = 1
receivedY = false
receivedY = false
sendPosition = false
wait = false
basic.showIcon(IconNames.Sword)
player = "attack"
gameStarted = false
radio.setGroup(1)
x = 0
let timer = 0
positionPinned = false
basic.forever(function () {
    if (sendPosition == true && (receivedX == true && receivedY == true)) {
        basic.showIcon(IconNames.Chessboard)
        basic.showIcon(IconNames.Diamond)
        basic.showIcon(IconNames.SmallDiamond)
        basic.clearScreen()
        zeichne(x, y)
        basic.pause(1000)
        basic.clearScreen()
        zeichne(opponentX, opponentY)
        basic.pause(1000)
        basic.clearScreen()
        zeichne(x, y)
        zeichne(opponentX, opponentY)
        loescheTreffer()
        basic.pause(2000)
        radio.sendNumber(0)
        sendPosition = false
        positionPinned = false
        receivedX = false
        receivedY = false
        music.play(music.createSoundExpression(WaveShape.Square, 1600, 1, 255, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    }
    if (wait) {
        basic.showString("WAIT")
        if (player == enemy) {
            wait = false
            music.play(music.stringPlayable("G C - - - - - - ", 180), music.PlaybackMode.UntilDone)
            basic.showIcon(IconNames.Sword)
        } else {
            wait = false
            gameStarted = true
        }
    }
    if (gameStarted == false) {
    	
    } else {
        if (a == 0 && (b == 0 && (c == 0 && d == 0))) {
            basic.showIcon(IconNames.Skull)
            music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Funeral), music.PlaybackMode.UntilDone)
        } else {
            calcMaxX()
            calcMaxY()
            calcMinX()
            calcMinY()
            if (positionPinned == false) {
                timer += 1
                basic.clearScreen()
                zeichne(x, y)
                if (timer > 20) {
                    timer = 0
                    if (input.acceleration(Dimension.Y) > -200) {
                        if (y < maxY) {
                            y += 1
                        }
                    }
                    if (input.acceleration(Dimension.Y) < 200) {
                        if (y > minY) {
                            y += -1
                        }
                    }
                    if (input.acceleration(Dimension.X) < -200) {
                        if (x > minX) {
                            x += -1
                        }
                    }
                    if (input.acceleration(Dimension.X) > 200) {
                        if (x < maxX) {
                            x += 1
                        }
                    }
                }
            }
        }
    }
})
