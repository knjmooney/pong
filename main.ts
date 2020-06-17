function draw_screen () {
    basic.clearScreen()
    draw_paddle()
    draw_ball()
}
function draw_ball () {
    led.plot(Ball_x, Ball_y)
}
input.onButtonPressed(Button.A, function () {
    Paddle += -1
})
function draw_paddle () {
    led.plot(Paddle - 1, 0)
    led.plot(Paddle, 0)
    led.plot(Paddle + 1, 0)
}
function ball_has_hit_paddle () {
    if (Paddle - 1 <= Ball_x && Paddle + 1 >= Ball_x) {
        return true
    } else {
        return false
    }
}
function init () {
    music.startMelody(music.builtInMelody(Melodies.Punchline), MelodyOptions.Once)
    basic.pause(2000)
    Paddle = 2
    Ball_x = 2
    Ball_y = 1
    Ball_direction = "down"
}
input.onButtonPressed(Button.B, function () {
    Paddle += 1
})
function update_balls_direction () {
    if (Ball_y == 1 && !(ball_has_hit_paddle())) {
        state = "dead"
    } else if (Ball_y == 1) {
        Ball_direction = "down"
        music.playTone(262, music.beat(BeatFraction.Sixteenth))
    } else if (Ball_y == 5) {
        Ball_direction = "up"
        Ball_x = randint(0, 4)
    }
}
function update_balls_position () {
    update_balls_direction()
    if (Ball_direction == "down") {
        Ball_y += 1
    } else {
        Ball_y += -1
    }
}
let Ball_direction = ""
let Paddle = 0
let Ball_y = 0
let Ball_x = 0
let state = ""
state = "startup"
basic.forever(function () {
    if (state == "startup") {
        init()
        state = "playing"
    } else if (state == "dead") {
        music.startMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once)
        basic.pause(5000)
        state = "startup"
    } else if (state == "playing") {
        draw_screen()
        basic.pause(200)
        update_balls_position()
    }
})
