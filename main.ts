function xPosLStepRight () {
    led.unplot(x_pos, y_pos)
    x_pos += 1
    if (x_pos > 4) {
        x_pos = 0
    }
}
function joystickMovingPoint () {
    x_pos = Math.round(Math.map(pins.analogReadPin(AnalogPin.P2), 0, 1023, 4, 0))
    y_pos = Math.round(Math.map(pins.analogReadPin(AnalogPin.P1), 0, 1023, 4, 0))
    led.plot(x_pos, y_pos)
    basic.pause(100)
    led.unplot(x_pos, y_pos)
}
function xPosLStepLeft () {
    led.unplot(x_pos, y_pos)
    x_pos += -1
    if (x_pos < 0) {
        x_pos = 4
    }
}
function yPosLStepDown () {
    led.unplot(x_pos, y_pos)
    y_pos += 1
    if (y_pos > 4) {
        y_pos = 0
    }
}
input.onButtonPressed(Button.A, function () {
    xPosLStepRight()
})
function afterPullBtnPlot () {
    led.plot(x_pos, y_pos)
    basic.pause(BTN_PAUSE)
}
function pullButoonsMoveXY () {
    if (pins.digitalReadPin(DigitalPin.P13) == 0) {
        xPosLStepLeft()
        afterPullBtnPlot()
    } else if (pins.digitalReadPin(DigitalPin.P14) == 0) {
        yPosLStepUp()
        afterPullBtnPlot()
    } else if (pins.digitalReadPin(DigitalPin.P15) == 0) {
        xPosLStepRight()
        afterPullBtnPlot()
    } else if (pins.digitalReadPin(DigitalPin.P16) == 0) {
        yPosLStepDown()
        afterPullBtnPlot()
    } else {
        led.plot(x_pos, y_pos)
    }
}
function yPosLStepUp () {
    led.unplot(x_pos, y_pos)
    y_pos += -1
    if (y_pos < 0) {
        y_pos = 4
    }
}
input.onButtonPressed(Button.AB, function () {
    led.unplot(x_pos, y_pos)
    x_pos = 0
    y_pos = 4
})
input.onButtonPressed(Button.B, function () {
    yPosLStepUp()
})
function buttonsMovingPoint () {
    led.plot(x_pos, y_pos)
}
function pullButtonsShowIcons () {
    if (pins.digitalReadPin(DigitalPin.P13) == 0) {
        basic.showLeds(`
            . . . . .
            . # . . .
            # # . . .
            . # . . .
            . . . . .
            `)
        basic.pause(BTN_PAUSE)
        basic.clearScreen()
    } else if (pins.digitalReadPin(DigitalPin.P14) == 0) {
        basic.showLeds(`
            . . # . .
            . # # # .
            . . . . .
            . . . . .
            . . . . .
            `)
        basic.pause(BTN_PAUSE)
        basic.clearScreen()
    } else if (pins.digitalReadPin(DigitalPin.P15) == 0) {
        basic.showLeds(`
            . . . . .
            . . . # .
            . . . # #
            . . . # .
            . . . . .
            `)
        basic.pause(BTN_PAUSE)
        basic.clearScreen()
    } else if (pins.digitalReadPin(DigitalPin.P16) == 0) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . # # # .
            . . # . .
            `)
        basic.pause(BTN_PAUSE)
        basic.clearScreen()
    }
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    led.unplot(x_pos, y_pos)
    MODE += 1
    if (MODE > 2) {
        MODE = 0
    }
    if (MODE == 0) {
        x_pos = 0
        y_pos = 4
        led.plot(x_pos, y_pos)
    }
    if (MODE == 2) {
        x_pos = 2
        y_pos = 2
        led.plot(x_pos, y_pos)
    }
})
let BTN_PAUSE = 0
let y_pos = 0
let x_pos = 0
let MODE = 0
basic.showIcon(IconNames.SmallDiamond)
basic.pause(2000)
basic.clearScreen()
MODE = 0
x_pos = 0
y_pos = 4
pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
pins.setPull(DigitalPin.P14, PinPullMode.PullUp)
pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
pins.setPull(DigitalPin.P16, PinPullMode.PullUp)
BTN_PAUSE = 200
basic.forever(function () {
    if (MODE == 0) {
        buttonsMovingPoint()
    }
    if (MODE == 1) {
        joystickMovingPoint()
        pullButtonsShowIcons()
    }
    if (MODE == 2) {
        pullButoonsMoveXY()
    }
})
