@namespace
class SpriteKind:
    Key = SpriteKind.create()
    heartt = SpriteKind.create()
    GrassEnemy = SpriteKind.create()
    DunEnemy = SpriteKind.create()
    Attack = SpriteKind.create()
@namespace
class StatusBarKind:
    EyeHealth = StatusBarKind.create()
    SnekHealth = StatusBarKind.create()

def on_overlap_tile(sprite62, location42):
    if controller.B.is_pressed():
        Map(0)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile14
    """),
    on_overlap_tile)

def on_overlap_tile2(sprite2, location):
    if controller.A.is_pressed():
        if tiles.tile_at_location_equals(tiles.get_tile_location(5, 4),
            sprites.dungeon.door_open_north):
            Map(1)
            pause(500)
        elif info.score() >= 1:
            info.change_score_by(-1)
            tiles.set_tile_at(tiles.get_tile_location(5, 4),
                sprites.dungeon.door_open_north)
            pause(500)
        else:
            game.show_long_text("A Key is needed to enter", DialogLayout.BOTTOM)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile15
    """),
    on_overlap_tile2)

def on_overlap_tile3(sprite322, location222):
    global Strength
    if controller.B.is_pressed():
        if info.score() >= 1:
            Strength += -1
            info.change_score_by(-1)
            tiles.set_tile_at(location222, sprites.dungeon.chest_open)
            game.show_long_text("Damage Increase", DialogLayout.BOTTOM)
            sprite322.start_effect(effects.bubbles, 1000)
        else:
            game.show_long_text("A Key is needed to open the chest", DialogLayout.BOTTOM)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile
    """),
    on_overlap_tile3)

def on_on_overlap(sprite4, otherSprite2):
    sprites.destroy(otherSprite2, effects.spray, 500)
    info.change_score_by(1)
sprites.on_overlap(SpriteKind.player, SpriteKind.Key, on_on_overlap)

def on_on_zero(status2):
    game.game_over(False)
statusbars.on_zero(StatusBarKind.health, on_on_zero)

def on_overlap_tile4(sprite5, location3):
    global slowed
    slowed = False
scene.on_overlap_tile(SpriteKind.player,
    sprites.castle.tile_path5,
    on_overlap_tile4)

def on_a_pressed():
    global Player_Slash
    Player_Slash = sprites.create(img("""
            . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . 3 . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . .
        """),
        SpriteKind.Attack)
    Player_Slash.set_position(Duck.x, Duck.y)
    Player_Slash.set_flag(SpriteFlag.AUTO_DESTROY, True)
    if not (left):
        Player_Slash.x += 20
        animation.run_image_animation(Player_Slash,
            [img("""
                    . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . .
                """),
                img("""
                    . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . f f f . . . . . . . . . . . 
                                . f 4 5 f . . . . . . . . . . . 
                                f 4 1 5 f . . . . . . . . . . . 
                                f 4 5 f . . . . . . . . . . . . 
                                . f f . . . . . . . . . . . . .
                """),
                img("""
                    . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . f f . . . . . . . . 
                                . . . . . f 4 f . . . . . . . . 
                                . . . . f 4 1 4 f . . . . . . . 
                                . . . . f 5 1 5 f . . . . . . . 
                                . . . f 4 1 5 f . . . . . . . . 
                                . . f f 5 1 5 f . . . . . . . . 
                                . f 4 5 1 1 5 f . . . . . . . . 
                                f 4 1 1 5 5 f . . . . . . . . . 
                                f 4 5 5 f f . . . . . . . . . . 
                                f f f f . . . . . . . . . . . .
                """),
                img("""
                    f f f f . . . . . . . . . . . . 
                                f 4 5 5 f f . . . . . . . . . . 
                                f 4 1 1 5 5 f . . . . . . . . . 
                                . f 4 5 1 1 4 f . . . . . . . . 
                                . . f f 5 1 5 f . . . . . . . . 
                                . . . f 4 1 4 f . . . . . . . . 
                                . . . . f 4 1 4 f . . . . . . . 
                                . . . . f 4 1 4 f . . . . . . . 
                                . . . . . f 4 1 4 f . . . . . . 
                                . . . . f 4 1 4 f . . . . . . . 
                                . . . . f 5 1 4 f . . . . . . . 
                                . . . f 4 1 4 f . . . . . . . . 
                                . . f f 5 1 5 f . . . . . . . . 
                                . f 4 5 1 1 4 f . . . . . . . . 
                                f 4 1 1 5 5 f . . . . . . . . . 
                                f 4 5 5 f f . . . . . . . . . .
                """),
                img("""
                    f f f f . . . . . . . . . . . . 
                                f 4 5 5 f f . . . . . . . . . . 
                                f 4 1 1 5 5 f . . . . . . . . . 
                                f f 4 5 1 1 5 f . . . . . . . . 
                                . . f f 5 1 5 f . . . . . . . . 
                                . . . f 4 1 5 f . . . . . . . . 
                                . . . . f 5 1 f . . . . . . . . 
                                . . . . . f f . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . .
                """),
                img("""
                    f f f . . . . . . . . . . . . . 
                                f 4 5 f . . . . . . . . . . . . 
                                f 4 1 5 f . . . . . . . . . . . 
                                . f 4 5 f . . . . . . . . . . . 
                                . . f f . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . .
                """),
                img("""
                    . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . .
                """)],
            80,
            False)
    else:
        Player_Slash.x += -20
        animation.run_image_animation(Player_Slash,
            [img("""
                    . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . .
                """),
                img("""
                    . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . f f f . . 
                                . . . . . . . . . . . f 5 4 f . 
                                . . . . . . . . . . . f 5 1 4 f 
                                . . . . . . . . . . . . f 5 4 f 
                                . . . . . . . . . . . . . f f .
                """),
                img("""
                    . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . f f . . . . . . 
                                . . . . . . . . f 4 f . . . . . 
                                . . . . . . . f 4 1 4 f . . . . 
                                . . . . . . . f 5 1 5 f . . . . 
                                . . . . . . . . f 5 1 4 f . . . 
                                . . . . . . . . f 5 1 5 f f . . 
                                . . . . . . . . f 5 1 1 5 4 f . 
                                . . . . . . . . . f 5 5 1 1 4 f 
                                . . . . . . . . . . f f 5 5 4 f 
                                . . . . . . . . . . . . f f f f
                """),
                img("""
                    . . . . . . . . . . . . f f f f 
                                . . . . . . . . . . f f 5 5 4 f 
                                . . . . . . . . . f 5 5 1 1 4 f 
                                . . . . . . . . f 4 1 1 5 4 f . 
                                . . . . . . . . f 5 1 5 f f . . 
                                . . . . . . . . f 4 1 4 f . . . 
                                . . . . . . . f 4 1 4 f . . . . 
                                . . . . . . . f 4 1 4 f . . . . 
                                . . . . . . f 4 1 4 f . . . . . 
                                . . . . . . . f 4 1 4 f . . . . 
                                . . . . . . . f 4 1 5 f . . . . 
                                . . . . . . . . f 4 1 4 f . . . 
                                . . . . . . . . f 5 1 5 f f . . 
                                . . . . . . . . f 4 1 1 5 4 f . 
                                . . . . . . . . . f 5 5 1 1 4 f 
                                . . . . . . . . . . f f 5 5 4 f
                """),
                img("""
                    . . . . . . . . . . . . f f f f 
                                . . . . . . . . . . f f 5 5 4 f 
                                . . . . . . . . . f 5 5 1 1 4 f 
                                . . . . . . . . f 5 1 1 5 4 f f 
                                . . . . . . . . f 5 1 5 f f . . 
                                . . . . . . . . f 5 1 4 f . . . 
                                . . . . . . . . f 1 5 f . . . . 
                                . . . . . . . . . f f f . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . .
                """),
                img("""
                    . . . . . . . . . . . . . f f f 
                                . . . . . . . . . . . . f 5 4 f 
                                . . . . . . . . . . . f 5 1 4 f 
                                . . . . . . . . . . . f 5 4 f . 
                                . . . . . . . . . . . . f f . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . .
                """),
                img("""
                    . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . . 
                                . . . . . . . . . . . . . . . .
                """)],
            80,
            False)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_overlap_tile5(sprite7, location5):
    global heart
    tiles.set_tile_at(location5, sprites.castle.tile_grass1)
    tiles.set_wall_at(location5, False)
    if Math.percent_chance(20):
        heart = sprites.create(img("""
                ....................
                            ....................
                            ....................
                            ....................
                            ....................
                            ....................
                            .......22...22......
                            ......2322.2222.....
                            ......232222222.....
                            ......222222222.....
                            .......22222b2......
                            ........222b2.......
                            .........222........
                            ..........2.........
                            ....................
                            ....................
                            ....................
                            ....................
                            ....................
                            ....................
            """),
            SpriteKind.heartt)
        heart.start_effect(effects.cool_radial, 200)
        tiles.place_on_tile(heart, location5)
scene.on_overlap_tile(SpriteKind.Attack, sprites.castle.shrub, on_overlap_tile5)

def on_overlap_tile6(sprite6, location4):
    if controller.A.is_pressed():
        Map(2)
scene.on_overlap_tile(SpriteKind.player,
    sprites.builtin.forest_tiles18,
    on_overlap_tile6)

def on_left_pressed():
    global left
    left = True
    if Watery:
        Duck.set_image(img("""
            . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . f f . . . . . . 
                        . . . . . . . f 5 5 f . . . . . 
                        . . . . . . . f 8 5 5 f . . . . 
                        . . . . . . f 4 5 5 5 f f . . . 
                        . . . . . . . f 5 5 5 5 5 f . . 
                        . . . . . . 1 1 1 1 5 5 1 1 1 . 
                        . . . . . . . . . . 1 1 . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . .
        """))
    else:
        Duck.set_image(img("""
            . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . f f . . . . . . 
                        . . . . . . . f 5 5 f . . . . . 
                        . . . . . . . f 8 5 5 f . . . . 
                        . . . . . . f 4 5 5 5 f f . . . 
                        . . . . . . . f 5 5 5 5 5 f . . 
                        . . . . . . . . f 5 5 5 f . . . 
                        . . . . . . . . f f f f . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . .
        """))
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_overlap_tile7(sprite9, location7):
    if controller.B.is_pressed():
        Map(3)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile11
    """),
    on_overlap_tile7)

def on_on_overlap2(sprite52, otherSprite22):
    sprite52.set_flag(SpriteFlag.GHOST, True)
    statusbars.get_status_bar_attached_to(StatusBarKind.SnekHealth, otherSprite22).value += Strength
sprites.on_overlap(SpriteKind.Attack, SpriteKind.GrassEnemy, on_on_overlap2)

def on_on_overlap3(sprite622, otherSprite32):
    sprites.destroy(otherSprite32, effects.disintegrate, 500)
    Player_Health.value += -1
sprites.on_overlap(SpriteKind.player, SpriteKind.GrassEnemy, on_on_overlap3)

def Summon_Eye():
    global EyeSpawn, EyeDemon, EyeHealth2
    EyeSpawn = True
    for value in tiles.get_tiles_by_type(sprites.dungeon.floor_dark_diamond):
        EyeDemon = sprites.create(img("""
                ................................
                            ................................
                            ............fffffffff...........
                            ..........ff222222222ff.........
                            .........f2222444444222f........
                            ........f222224444444422f.......
                            .......f22222444444544444f......
                            ......f2222244444455555544f.....
                            ......f2222244444555555544f.....
                            .....f222224444455555555555f....
                            .....f222224444455551115555f....
                            .....f222224444455551111555f....
                            .....f222224444455511111555f....
                            .....f222224444445511111155f....
                            .....f222224444445551111555f....
                            .....f222222444444555111555f....
                            .....f222222444444555555554f....
                            .....f222222244444455555544f....
                            ......f2222224444444445544f.....
                            ......f2222222444444444444f.....
                            .....f4f22222224444444424f4f....
                            .....f45f222222224444222f54f....
                            .....f555f2222222222222f555f....
                            ....f45f55ff222222222ff55f54f...
                            ....f5f.f554fffffffff455f.f5f...
                            ...f45f..ff54f.....f45ff..f54f..
                            ...f5f.....f4f.....f4f.....f5f..
                            ....f.....f55f.....f55f.....f...
                            ...........ff.......ff..........
                            ................................
                            ................................
                            ................................
            """),
            SpriteKind.DunEnemy)
        tiles.place_on_random_tile(EyeDemon, sprites.dungeon.floor_dark_diamond)
        EyeHealth2 = statusbars.create(20, 4, StatusBarKind.EyeHealth)
        EyeHealth2.set_bar_border(1, 15)
        EyeHealth2.max = 30
        EyeHealth2.attach_to_sprite(EyeDemon)

def on_on_overlap4(sprite32, otherSprite4):
    if not (Player_Health.value == Player_Health.max):
        sprites.destroy(otherSprite4, effects.hearts, 500)
        Player_Health.value += 2
sprites.on_overlap(SpriteKind.player, SpriteKind.heartt, on_on_overlap4)

def on_on_overlap5(sprite3, otherSprite):
    otherSprite.set_flag(SpriteFlag.GHOST, True)
    sprites.destroy(otherSprite, effects.none, 100)
    statusbars.get_status_bar_attached_to(StatusBarKind.health, sprite3).value += -1
sprites.on_overlap(SpriteKind.player, SpriteKind.projectile, on_on_overlap5)

def Map(num: number):
    global SnakeSpawn, EyeSpawn
    tiles.set_current_tilemap(MapArray[num])
    if num == 0:
        tiles.place_on_random_tile(Duck, assets.tile("""
            myTile15
        """))
        scene.set_background_color(7)
        SnakeSpawn = True
        EyeSpawn = False
        sprites.destroy_all_sprites_of_kind(SpriteKind.DunEnemy)
    elif num == 1:
        tiles.place_on_random_tile(Duck, assets.tile("""
            myTile14
        """))
        scene.set_background_color(13)
        SnakeSpawn = False
        sprites.destroy_all_sprites_of_kind(SpriteKind.GrassEnemy)
        Summon_Eye()
    elif num == 2:
        tiles.place_on_random_tile(Duck, sprites.builtin.forest_tiles6)
        scene.set_background_color(6)
        SnakeSpawn = False
        EyeSpawn = False
        sprites.destroy_all_sprites_of_kind(SpriteKind.GrassEnemy)
    elif num == 3:
        tiles.place_on_random_tile(Duck, sprites.builtin.ocean_depths9)
        scene.set_background_color(9)
        SnakeSpawn = False
        EyeSpawn = False
        sprites.destroy_all_sprites_of_kind(SpriteKind.GrassEnemy)

def on_overlap_tile8(sprite10, location22):
    global slowed
    slowed = True
    if left:
        Duck.set_image(img("""
            . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . f f . . . . . . 
                        . . . . . . . f 5 5 f . . . . . 
                        . . . . . . . f 8 5 5 f . . . . 
                        . . . . . . f 4 5 5 5 f f . . . 
                        . . . . . . . f 5 5 5 5 5 f . . 
                        . . . . . . 1 1 1 1 5 5 1 1 1 . 
                        . . . . . . . . . . 1 1 . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . .
        """))
    else:
        Duck.set_image(img("""
            . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . f f . . . . . . . . 
                        . . . . . f 5 5 f . . . . . . . 
                        . . . . f 5 5 8 f . . . . . . . 
                        . . . f f 5 5 5 4 f . . . . . . 
                        . . f 5 5 5 5 5 f . . . . . . . 
                        . 1 1 1 5 5 1 1 1 1 . . . . . . 
                        . . . . 1 1 . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . .
        """))
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile10
    """),
    on_overlap_tile8)

def on_on_zero2(status3):
    global Keys, KeyImg
    sprites.destroy(status3.sprite_attached_to(), effects.fire, 500)
    Keys += 1
    if Keys >= 3:
        if Math.percent_chance(55):
            KeyImg = sprites.create(img("""
                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . . . . . . . . . . 
                                    . . . . . . . f f f . . . . . . 
                                    . . . . . . f 5 5 5 f . . . . . 
                                    . . . . . f 5 4 4 4 5 f . . . . 
                                    . . . . . f 5 4 . 4 5 f . . . . 
                                    . . . . . f 5 4 4 4 5 f . . . . 
                                    . . . . . . f 5 4 5 f . . . . . 
                                    . . . . . . . f 5 f . . . . . . 
                                    . . . . . . . f 5 f . . . . . . 
                                    . . . . . . . f 5 f . . . . . . 
                                    . . . . . . f 5 5 f . . . . . . 
                                    . . . . . . . f 5 f . . . . . . 
                                    . . . . . . f 5 5 f . . . . . . 
                                    . . . . . . . f 5 f . . . . . . 
                                    . . . . . . . . f f . . . . . .
                """),
                SpriteKind.Key)
            KeyImg.set_position(status3.x, status3.y)
            Keys += Keys * -1
statusbars.on_zero(StatusBarKind.SnekHealth, on_on_zero2)

def on_overlap_tile9(sprite, location2):
    global slowed
    slowed = True
    if left:
        Duck.set_image(img("""
            . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . f f . . . . . . 
                        . . . . . . . f 5 5 f . . . . . 
                        . . . . . . . f 8 5 5 f . . . . 
                        . . . . . . f 4 5 5 5 f f . . . 
                        . . . . . . . f 5 5 5 5 5 f . . 
                        . . . . . . 1 1 1 1 5 5 1 1 1 . 
                        . . . . . . . . . . 1 1 . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . .
        """))
    else:
        Duck.set_image(img("""
            . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . f f . . . . . . . . 
                        . . . . . f 5 5 f . . . . . . . 
                        . . . . f 5 5 8 f . . . . . . . 
                        . . . f f 5 5 5 4 f . . . . . . 
                        . . f 5 5 5 5 5 f . . . . . . . 
                        . 1 1 1 5 5 1 1 1 1 . . . . . . 
                        . . . . 1 1 . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . .
        """))
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile5
    """),
    on_overlap_tile9)

def on_right_pressed():
    global left
    left = False
    if Watery:
        Duck.set_image(img("""
            . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . f f . . . . . . . . 
                        . . . . . f 5 5 f . . . . . . . 
                        . . . . f 5 5 8 f . . . . . . . 
                        . . . f f 5 5 5 4 f . . . . . . 
                        . . f 5 5 5 5 5 f . . . . . . . 
                        . 1 1 1 5 5 1 1 1 1 . . . . . . 
                        . . . . 1 1 . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . .
        """))
    else:
        Duck.set_image(img("""
            . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . f f . . . . . . . . 
                        . . . . . f 5 5 f . . . . . . . 
                        . . . . f 5 5 8 f . . . . . . . 
                        . . . f f 5 5 5 4 f . . . . . . 
                        . . f 5 5 5 5 5 f . . . . . . . 
                        . . . f 5 5 5 f . . . . . . . . 
                        . . . . f f f f . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . .
        """))
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def on_on_overlap6(sprite8, otherSprite3):
    sprite8.set_flag(SpriteFlag.GHOST, True)
    statusbars.get_status_bar_attached_to(StatusBarKind.EyeHealth, otherSprite3).value += Strength
sprites.on_overlap(SpriteKind.Attack, SpriteKind.DunEnemy, on_on_overlap6)

def on_overlap_tile10(sprite14, location26):
    global slowed
    slowed = True
    if left:
        Duck.set_image(img("""
            . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . f f . . . . . . 
                        . . . . . . . f 5 5 f . . . . . 
                        . . . . . . . f 8 5 5 f . . . . 
                        . . . . . . f 4 5 5 5 f f . . . 
                        . . . . . . . f 5 5 5 5 5 f . . 
                        . . . . . . 1 1 1 1 5 5 1 1 1 . 
                        . . . . . . . . . . 1 1 . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . .
        """))
    else:
        Duck.set_image(img("""
            . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . f f . . . . . . . . 
                        . . . . . f 5 5 f . . . . . . . 
                        . . . . f 5 5 8 f . . . . . . . 
                        . . . f f 5 5 5 4 f . . . . . . 
                        . . f 5 5 5 5 5 f . . . . . . . 
                        . 1 1 1 5 5 1 1 1 1 . . . . . . 
                        . . . . 1 1 . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . .
        """))
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile2
    """),
    on_overlap_tile10)

def on_on_zero3(status):
    sprites.destroy(status.sprite_attached_to(), effects.fire, 500)
statusbars.on_zero(StatusBarKind.EyeHealth, on_on_zero3)

def on_overlap_tile11(sprite11, location23):
    global slowed
    slowed = True
    if left:
        Duck.set_image(img("""
            . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . f f . . . . . . 
                        . . . . . . . f 5 5 f . . . . . 
                        . . . . . . . f 8 5 5 f . . . . 
                        . . . . . . f 4 5 5 5 f f . . . 
                        . . . . . . . f 5 5 5 5 5 f . . 
                        . . . . . . 1 1 1 1 5 5 1 1 1 . 
                        . . . . . . . . . . 1 1 . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . .
        """))
    else:
        Duck.set_image(img("""
            . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . f f . . . . . . . . 
                        . . . . . f 5 5 f . . . . . . . 
                        . . . . f 5 5 8 f . . . . . . . 
                        . . . f f 5 5 5 4 f . . . . . . 
                        . . f 5 5 5 5 5 f . . . . . . . 
                        . 1 1 1 5 5 1 1 1 1 . . . . . . 
                        . . . . 1 1 . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . .
        """))
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile4
    """),
    on_overlap_tile11)

def on_overlap_tile12(sprite13, location25):
    global slowed
    slowed = True
    if left:
        Duck.set_image(img("""
            . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . f f . . . . . . 
                        . . . . . . . f 5 5 f . . . . . 
                        . . . . . . . f 8 5 5 f . . . . 
                        . . . . . . f 4 5 5 5 f f . . . 
                        . . . . . . . f 5 5 5 5 5 f . . 
                        . . . . . . 1 1 1 1 5 5 1 1 1 . 
                        . . . . . . . . . . 1 1 . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . .
        """))
    else:
        Duck.set_image(img("""
            . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . f f . . . . . . . . 
                        . . . . . f 5 5 f . . . . . . . 
                        . . . . f 5 5 8 f . . . . . . . 
                        . . . f f 5 5 5 4 f . . . . . . 
                        . . f 5 5 5 5 5 f . . . . . . . 
                        . 1 1 1 5 5 1 1 1 1 . . . . . . 
                        . . . . 1 1 . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . .
        """))
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile9
    """),
    on_overlap_tile12)

def on_on_overlap7(sprite12, otherSprite5):
    tiles.place_on_random_tile(EyeDemon, sprites.dungeon.floor_dark_diamond)
sprites.on_overlap(SpriteKind.DunEnemy, SpriteKind.DunEnemy, on_on_overlap7)

Snake_Health: StatusBarSprite = None
Snakes: Sprite = None
EyeBullets: Sprite = None
KeyImg: Sprite = None
Keys = 0
SnakeSpawn = False
EyeHealth2: StatusBarSprite = None
EyeDemon: Sprite = None
EyeSpawn = False
Watery = False
heart: Sprite = None
left = False
Player_Slash: Sprite = None
slowed = False
Strength = 0
MapArray: List[tiles.TileMapData] = []
Player_Health: StatusBarSprite = None
Duck: Sprite = None
Duck = sprites.create(img("""
        . . . . . . . . . b 5 b . . . . 
            . . . . . . . . . b 5 b . . . . 
            . . . . . . b b b b b b . . . . 
            . . . . . b b 5 5 5 5 5 b . . . 
            . . . . b b 5 b c 5 5 d 4 c . . 
            . b b b b 5 5 5 b f d d 4 4 4 b 
            . b d 5 b 5 5 b c b 4 4 4 4 b . 
            . . b 5 5 b 5 5 5 4 4 4 4 b . . 
            . . b d 5 5 b 5 5 5 5 5 5 b . . 
            . b d b 5 5 5 d 5 5 5 5 5 5 b . 
            b d d c d 5 5 b 5 5 5 5 5 5 b . 
            c d d d c c b 5 5 5 5 5 5 5 b . 
            c b d d d d d 5 5 5 5 5 5 5 b . 
            . c d d d d d d 5 5 5 5 5 d b . 
            . . c b d d d d d 5 5 5 b b . . 
            . . . c c c c c c c c b b . . .
    """),
    SpriteKind.player)
Player_Health = statusbars.create(20, 4, StatusBarKind.health)
scene.set_background_color(7)
Player_Health.set_bar_border(1, 15)
Player_Health.max = 6
Player_Health.set_label("HP")
Player_Health.attach_to_sprite(Duck)
scene.camera_follow_sprite(Duck)
controller.move_sprite(Duck)
MapArray = [tilemap("""
        level1
    """),
    tilemap("""
        level4
    """),
    tilemap("""
        level7
    """),
    tilemap("""
        level16
    """)]
Map(0)
tiles.place_on_tile(Duck, tiles.get_tile_location(3, 20))
Strength = -1
info.set_score(2)

def on_update_interval():
    global EyeBullets
    if EyeSpawn:
        for value2 in sprites.all_of_kind(SpriteKind.DunEnemy):
            for index in range(6):
                EyeBullets = sprites.create_projectile_from_sprite(img("""
                        . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . 2 2 . . . . . . . 
                                            . . . . . . 3 1 1 3 . . . . . . 
                                            . . . . . 2 1 1 1 1 2 . . . . . 
                                            . . . . . 2 1 1 1 1 2 . . . . . 
                                            . . . . . . 3 1 1 3 . . . . . . 
                                            . . . . . . . 2 2 . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . . 
                                            . . . . . . . . . . . . . . . .
                    """),
                    value2,
                    randint(-50, 50),
                    randint(-50, 50))
game.on_update_interval(1000, on_update_interval)

def on_forever():
    global Watery
    if slowed:
        Watery = True
        controller.move_sprite(Duck, 35, 35)
    else:
        Watery = False
        controller.move_sprite(Duck, 100, 100)
forever(on_forever)

def on_update_interval2():
    global Snakes, Snake_Health
    if SnakeSpawn:
        Snakes = sprites.create(img("""
                . . . . c c c c c c . . . . . . 
                            . . . c 6 7 7 7 7 6 c . . . . . 
                            . . c 7 7 7 7 7 7 7 7 c . . . . 
                            . c 6 7 7 7 7 7 7 7 7 6 c . . . 
                            . c 7 c 6 6 6 6 c 7 7 7 c . . . 
                            . f 7 6 f 6 6 f 6 7 7 7 f . . . 
                            . f 7 7 7 7 7 7 7 7 7 7 f . . . 
                            . . f 7 7 7 7 6 c 7 7 6 f c . . 
                            . . . f c c c c 7 7 6 f 7 7 c . 
                            . . c 7 2 7 7 7 6 c f 7 7 7 7 c 
                            . c 7 7 2 7 7 c f c 6 7 7 6 c c 
                            c 1 1 1 1 7 6 f c c 6 6 6 c . . 
                            f 1 1 1 1 1 6 6 c 6 6 6 6 f . . 
                            f 6 1 1 1 1 1 6 6 6 6 6 c f . . 
                            . f 6 1 1 1 1 1 1 6 6 6 f . . . 
                            . . c c c c c c c c c f . . . .
            """),
            SpriteKind.GrassEnemy)
        tiles.place_on_random_tile(Snakes, sprites.swamp.swamp_tile3)
        Snakes.set_flag(SpriteFlag.AUTO_DESTROY, True)
        Snakes.follow(Duck, 50)
        Snake_Health = statusbars.create(16, 3, StatusBarKind.SnekHealth)
        Snake_Health.max = 3
        Snake_Health.set_bar_border(1, 15)
        Snake_Health.attach_to_sprite(Snakes)
game.on_update_interval(3500, on_update_interval2)
