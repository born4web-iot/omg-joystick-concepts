def joystickMovingPoint():
    global x_pos, y_pos
    x_pos = Math.round(Math.map(pins.analog_read_pin(AnalogPin.P2), 0, 1023, 4, 0))
    y_pos = Math.round(Math.map(pins.analog_read_pin(AnalogPin.P1), 0, 1023, 4, 0))
    led.plot(x_pos, y_pos)
    basic.pause(100)
    led.unplot(x_pos, y_pos)

def on_button_pressed_a():
    global x_pos
    led.unplot(x_pos, y_pos)
    x_pos += 1
    if x_pos > 4:
        x_pos = 0
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    global x_pos, y_pos
    led.unplot(x_pos, y_pos)
    x_pos = 0
    y_pos = 4
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    global y_pos
    led.unplot(x_pos, y_pos)
    y_pos += -1
    if y_pos < 0:
        y_pos = 4
input.on_button_pressed(Button.B, on_button_pressed_b)

def buttonsMovingPoint():
    led.plot(x_pos, y_pos)

def on_logo_pressed():
    global MODE, x_pos, y_pos
    MODE += 1
    if MODE > 1:
        MODE = 0
    led.unplot(x_pos, y_pos)
    if MODE == 0:
        x_pos = 0
        y_pos = 4
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_pressed)

y_pos = 0
x_pos = 0
MODE = 0
basic.show_icon(IconNames.NO)
basic.pause(2000)
basic.clear_screen()
MODE = 0
x_pos = 0
y_pos = 4
pins.set_pull(DigitalPin.P13, PinPullMode.PULL_UP)
pins.set_pull(DigitalPin.P14, PinPullMode.PULL_UP)
pins.set_pull(DigitalPin.P15, PinPullMode.PULL_UP)
pins.set_pull(DigitalPin.P16, PinPullMode.PULL_UP)

def pullButtonsActions():
    if pins.digital_read_pin(DigitalPin.P13) == 0:
        basic.show_leds("""
            # . . . .
            # # . . .
            # # # . .
            # # . . .
            # . . . .
            """)
    elif pins.digital_read_pin(DigitalPin.P14) == 0:
        basic.show_leds("""
            # # # # #
            . # # # .
            . . # . .
            . . . . .
            . . . . .
            """)
    elif pins.digital_read_pin(DigitalPin.P15) == 0:
        basic.show_leds("""
            . . . . #
            . . . # #
            . . # # #
            . . . # #
            . . . . #
            """)
    elif pins.digital_read_pin(DigitalPin.P16) == 0:
        basic.show_leds("""
            . . . . .
            . . . . .
            . . # . .
            . # # # .
            # # # # #
            """)
    else:
        basic.clear_screen()

def on_forever():
    if MODE == 0:
        buttonsMovingPoint()
    if MODE == 1:
        joystickMovingPoint()
basic.forever(on_forever)
