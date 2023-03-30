namespace SpriteKind {
    export const Key = SpriteKind.create()
    export const heartt = SpriteKind.create()
    export const GrassEnemy = SpriteKind.create()
    export const DunEnemy = SpriteKind.create()
    export const Attack = SpriteKind.create()
    export const SwampEnemy = SpriteKind.create()
    export const WaterEnemy = SpriteKind.create()
    export const Boss = SpriteKind.create()
    export const turret = SpriteKind.create()
}
namespace StatusBarKind {
    export const EyeHealth = StatusBarKind.create()
    export const SnekHealth = StatusBarKind.create()
    export const ClamHealth = StatusBarKind.create()
    export const SharkHealth = StatusBarKind.create()
    export const BossBar = StatusBarKind.create()
}
// Creates win condition which is to kill the boss.
statusbars.onZero(StatusBarKind.BossBar, function (status) {
    game.setGameOverEffect(true, effects.slash)
    game.setGameOverMessage(true, "You've won")
    game.gameOver(true)
})
// A function that spawns in the shark enemies whenever the player enters the water tile map along with their respective health point bars.
function Summon_Shark () {
    SharkSpawn = true
    for (let value of tiles.getTilesByType(assets.tile`myTile25`)) {
        Sharks = sprites.create(img`
            ....................................
            ....................................
            ....................................
            ...............ccffff...............
            ..............cddbbbf...............
            .......ffffffcddbbbf................
            .....ffbbbbbbbbbbbbbcfff.......ccccc
            ...ffbbbbbbbbcbcbbbbbcccff....cdbbbc
            ..fbbbbbbbbbbcbbcbbbbcccccfffcddbbc.
            .fbcbbbbbbbbbbcbcbbbbccccccccbdbbf..
            .fbbbbbbbfffbbcbbbbbccccccccccbbcf..
            .ffbb1111fffbbcbbbbcccccccbcffbccf..
            ..ff111111111bbbbccccccbbbcc..fbbcf.
            ....ccccccc111bdbbbfddbccc.....ffbbf
            ........ccccccfbdbbbfcc..........fff
            ...............ffffff...............
            `, SpriteKind.WaterEnemy)
        tiles.placeOnRandomTile(Sharks, assets.tile`myTile25`)
        Shark_BAr = statusbars.create(16, 3, StatusBarKind.SharkHealth)
        Shark_BAr.setBarBorder(1, 15)
        Shark_BAr.max = 6
        Shark_BAr.attachToSprite(Sharks)
        Sharks.follow(Duck, randint(45, 50))
    }
}
// Changes the dungeon map to the plains map.
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile14`, function (sprite62, location42) {
    if (controller.B.isPressed()) {
        Map(0)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile15`, function (sprite2, location) {
    if (controller.A.isPressed()) {
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(5, 4), sprites.dungeon.doorOpenNorth)) {
            Map(1)
            pause(500)
        } else if (info.score() >= 1) {
            info.changeScoreBy(-1)
            tiles.setTileAt(tiles.getTileLocation(5, 4), sprites.dungeon.doorOpenNorth)
            pause(500)
        } else {
            game.showLongText("A Key is needed to enter", DialogLayout.Bottom)
        }
    }
})
// Allows for score to be used in order to gain a damages boost when overlapped with a locked chest.
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile`, function (sprite322, location222) {
    if (controller.B.isPressed()) {
        if (info.score() >= 1) {
            Strength += -1
            info.changeScoreBy(-1)
            tiles.setTileAt(location222, sprites.dungeon.chestOpen)
            game.showLongText("Damage Increase", DialogLayout.Bottom)
            sprite322.startEffect(effects.bubbles, 1000)
        } else {
            game.showLongText("A Key is needed to open the chest", DialogLayout.Bottom)
        }
    }
})
// Allows the player to pick up the key
sprites.onOverlap(SpriteKind.Player, SpriteKind.Key, function (sprite4, otherSprite2) {
    sprites.destroy(otherSprite2, effects.spray, 500)
    info.changeScoreBy(1)
})
// Allows player to attack the boss
sprites.onOverlap(SpriteKind.Attack, SpriteKind.Boss, function (sprite, otherSprite) {
    sprite.setFlag(SpriteFlag.Ghost, true)
    BossBar.value += Strength
})
// You lose at 0 hp.
statusbars.onZero(StatusBarKind.Health, function (status2) {
    game.gameOver(false)
})
// Changes the player back to their original disposition when outside of water, 
scene.onOverlapTile(SpriteKind.Player, sprites.castle.tilePath5, function (sprite5, location3) {
    slowed = false
    if (left) {
        Duck.setImage(img`
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
            `)
    } else {
        Duck.setImage(img`
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
            `)
    }
})
// Starts the boss' phase 2
statusbars.onStatusReached(StatusBarKind.BossBar, statusbars.StatusComparison.LTE, statusbars.ComparisonType.Percentage, 50, function (status) {
    Phase_2 = true
    effects.blizzard.startScreenEffect()
    SummonTurrets(tiles.getTilesByType(assets.tile`myTile19`))
})
// Creates the players attack on A press and changes direction in accordance to the players last inputted direction. 
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    Player_Slash = sprites.create(img`
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
        `, SpriteKind.Attack)
    Player_Slash.setPosition(Duck.x, Duck.y)
    Player_Slash.setFlag(SpriteFlag.AutoDestroy, true)
    if (!(left)) {
        if (Strength <= -12) {
            Player_Slash.x += 12
            animation.runImageAnimation(
            Player_Slash,
            [img`
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
                `,img`
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
                . f 8 9 f . . . . . . . . . . . 
                f 8 1 9 f . . . . . . . . . . . 
                f 8 9 f . . . . . . . . . . . . 
                . f f . . . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . f f . . . . . . . . 
                . . . . . f 8 f . . . . . . . . 
                . . . . f 8 1 8 f . . . . . . . 
                . . . . f 9 1 9 f . . . . . . . 
                . . . f 8 1 9 f . . . . . . . . 
                . . f f 9 1 9 f . . . . . . . . 
                . f 8 9 1 1 9 f . . . . . . . . 
                f 8 1 1 9 9 f . . . . . . 1 . . 
                f 8 9 9 f f . . . . . . . 9 . . 
                f f f f . . . . . . . . . . . . 
                `,img`
                f f f f . . . . . . . . . . . . 
                f 8 9 9 f f . . . . . . . 9 . . 
                f 8 1 1 9 9 f . . . . . . 1 8 . 
                . f 8 9 1 1 8 f . . . . . . . . 
                . . f f 9 1 9 f . . . . . . . . 
                . . . f 8 1 8 f . . . . . . . . 
                . . . . f 8 1 8 f . . . . . . . 
                . . . . f 8 1 8 f . . . . . . . 
                . . . . . f 8 1 8 f . . . . . . 
                . . . . f 8 1 8 f . . . . . . . 
                . . . . f 9 1 8 f . . . . . . . 
                . . . f 8 1 8 f . . . . . . . . 
                . . f f 9 1 9 f . . . . . . . . 
                . f 8 9 1 1 8 f . . . . . 1 8 . 
                f 8 1 1 9 9 f . . . . . . 9 . . 
                f 8 9 9 f f . . . . . . . . . . 
                `,img`
                f f f f . . . . . . . . . . . . 
                f 8 9 9 f f . . . . . . . 9 . . 
                f 8 1 1 9 9 f . . . . . . 1 . . 
                f f 8 9 1 1 9 f . . . . . . . . 
                . . f f 9 1 9 f . . . . . . . . 
                . . . f 8 1 9 f . . . . . . . . 
                . . . . f 9 1 f . . . . . . . . 
                . . . . . f f . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                f f f . . . . . . . . . . . . . 
                f 8 9 f . . . . . . . . . . . . 
                f 8 1 9 f . . . . . . . . . . . 
                . f 8 9 f . . . . . . . . . . . 
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
                `,img`
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
                `],
            80,
            false
            )
            Advanced_Attack = true
        } else {
            Player_Slash.x += 20
            animation.runImageAnimation(
            Player_Slash,
            [img`
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
                `,img`
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
                `,img`
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
                `,img`
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
                `,img`
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
                `,img`
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
                `,img`
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
                `],
            80,
            false
            )
            Advanced_Attack = false
        }
    } else {
        if (Strength <= -12) {
            Player_Slash.x += -12
            animation.runImageAnimation(
            Player_Slash,
            [img`
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
                `,img`
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
                . . . . . . . . . . . f 9 8 f . 
                . . . . . . . . . . . f 9 1 8 f 
                . . . . . . . . . . . . f 9 8 f 
                . . . . . . . . . . . . . f f . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . f f . . . . . . 
                . . . . . . . . f 8 f . . . . . 
                . . . . . . . f 8 1 8 f . . . . 
                . . . . . . . f 9 1 9 f . . . . 
                . . . . . . . . f 9 1 8 f . . . 
                . . . . . . . . f 9 1 9 f f . . 
                . . . . . . . . f 9 1 1 9 8 f . 
                . . 1 . . . . . . f 9 9 1 1 8 f 
                . . 9 . . . . . . . f f 9 9 8 f 
                . . . . . . . . . . . . f f f f 
                `,img`
                . . . . . . . . . . . . f f f f 
                . . 9 . . . . . . . f f 9 9 8 f 
                . 8 1 . . . . . . f 9 9 1 1 8 f 
                . . . . . . . . f 8 1 1 9 8 f . 
                . . . . . . . . f 9 1 9 f f . . 
                . . . . . . . . f 8 1 8 f . . . 
                . . . . . . . f 8 1 8 f . . . . 
                . . . . . . . f 8 1 8 f . . . . 
                . . . . . . f 8 1 8 f . . . . . 
                . . . . . . . f 8 1 8 f . . . . 
                . . . . . . . f 8 1 9 f . . . . 
                . . . . . . . . f 8 1 8 f . . . 
                . . . . . . . . f 9 1 9 f f . . 
                . 8 1 . . . . . f 8 1 1 9 8 f . 
                . . 9 . . . . . . f 9 9 1 1 8 f 
                . . . . . . . . . . f f 9 9 8 f 
                `,img`
                . . . . . . . . . . . . f f f f 
                . . 9 . . . . . . . f f 9 9 8 f 
                . . 1 . . . . . . f 9 9 1 1 8 f 
                . . . . . . . . f 9 1 1 9 8 f f 
                . . . . . . . . f 9 1 9 f f . . 
                . . . . . . . . f 9 1 8 f . . . 
                . . . . . . . . f 1 9 f . . . . 
                . . . . . . . . . f f f . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . . . . . . . . . f f f 
                . . . . . . . . . . . . f 9 8 f 
                . . . . . . . . . . . f 9 1 8 f 
                . . . . . . . . . . . f 9 8 f . 
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
                `,img`
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
                `],
            80,
            false
            )
            Advanced_Attack = true
        } else {
            Player_Slash.x += -20
            animation.runImageAnimation(
            Player_Slash,
            [img`
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
                `,img`
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
                `,img`
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
                `,img`
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
                `,img`
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
                `,img`
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
                `,img`
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
                `],
            80,
            false
            )
            Advanced_Attack = false
        }
    }
})
// Allows the visible sprite to be destructible and have a chance to heal the player. 
scene.onOverlapTile(SpriteKind.Attack, sprites.castle.shrub, function (sprite7, location5) {
    if (!(ClamSpawn)) {
        tiles.setTileAt(location5, sprites.castle.tileGrass1)
    } else {
        tiles.setTileAt(location5, sprites.castle.tileDarkGrass1)
    }
    tiles.setWallAt(location5, false)
    if (Math.percentChance(20)) {
        heart = sprites.create(img`
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
            `, SpriteKind.heartt)
        heart.startEffect(effects.coolRadial, 200)
        tiles.placeOnTile(heart, location5)
    }
})
// Changes location the forest.
scene.onOverlapTile(SpriteKind.Player, sprites.builtin.forestTiles18, function (sprite6, location4) {
    if (controller.A.isPressed()) {
        Map(2)
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    left = true
    if (Watery) {
        Duck.setImage(img`
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
            `)
    } else {
        Duck.setImage(img`
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
            `)
    }
})
// Changes location to the water map
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile11`, function (sprite9, location7) {
    if (controller.A.isPressed()) {
        Map(3)
    }
})
// Allows the player to attack the snake enemy.
sprites.onOverlap(SpriteKind.Attack, SpriteKind.GrassEnemy, function (sprite52, otherSprite22) {
    sprite52.setFlag(SpriteFlag.Ghost, true)
    statusbars.getStatusBarAttachedTo(StatusBarKind.SnekHealth, otherSprite22).value += Strength
})
// Hurts the player on overlap with a snake.
sprites.onOverlap(SpriteKind.Player, SpriteKind.GrassEnemy, function (sprite622, otherSprite32) {
    sprites.destroy(otherSprite32, effects.disintegrate, 500)
    Player_Health.value += -1
})
// A function that spawns a dungeon enemy for every diamond tile, along with setting the variable that allows for them to summon bullets to true. Also creates their HP Bars.
function Summon_Eye (num: number) {
    EyeSpawn = true
    for (let value of tiles.getTilesByType(sprites.dungeon.floorDarkDiamond)) {
        if (Switch) {
            EyeDemon = sprites.create(img`
                .1....199..19...99....19........
                ..19...19.9...........199..9.91.
                ..99....9.9.fffffffff...9....91.
                ...19..99.ff222222222ff..9...91.
                ...19..9.f2222144444222f.99..99.
                ...19.99f229291444194422f.9..991
                ....999f22229914444514444f99.991
                ...999f2222294444455915544f9999.
                ..999.f2222294444555995544f..9..
                9.9.9f222229444455555555555f.91.
                ..9..f222294444455551199155f.9..
                ..99.f221991444455551119995f91..
                ..19.f299924444455511111591f91..
                ..19.999222444444551111115999...
                ..199922222444444555111155599...
                .1999f222222444444555111555f9...
                .19..f222222444444555555554f..91
                .....f222222244444455555544f....
                ......f2222224444444445544f.....
                ......f2222222444444444444f...91
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
                `, SpriteKind.DunEnemy)
        } else {
            EyeDemon = sprites.create(img`
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
                `, SpriteKind.DunEnemy)
        }
        tiles.placeOnRandomTile(EyeDemon, sprites.dungeon.floorDarkDiamond)
        EyeHealth2 = statusbars.create(20, 4, StatusBarKind.EyeHealth)
        EyeHealth2.setBarBorder(1, 15)
        EyeHealth2.max = num
        EyeHealth2.attachToSprite(EyeDemon)
    }
}
// Allows player to heal on overlap with heart if HP isn't full
sprites.onOverlap(SpriteKind.Player, SpriteKind.heartt, function (sprite32, otherSprite4) {
    if (!(Player_Health.value == Player_Health.max)) {
        sprites.destroy(otherSprite4, effects.hearts, 500)
        Player_Health.value += 2
    } else {
        otherSprite4.x += sprite32.x
    }
})
// Player takes damage from enemy attacks
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite3, otherSprite) {
    otherSprite.setFlag(SpriteFlag.Ghost, true)
    sprites.destroy(otherSprite, effects.none, 100)
    statusbars.getStatusBarAttachedTo(StatusBarKind.Health, sprite3).value += -1
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile18`, function (sprite, location) {
    Map(4)
})
// This is the function that controls what map the player is on and which enemies are able to spawn. 
function Map (num: number) {
    tiles.setCurrentTilemap(MapArray[num])
    if (num == 0) {
        tiles.placeOnRandomTile(Duck, assets.tile`myTile15`)
        scene.setBackgroundColor(7)
        SnakeSpawn = true
        EyeSpawn = false
        ClamSpawn = false
        SharkSpawn = false
        sprites.destroyAllSpritesOfKind(SpriteKind.DunEnemy)
        sprites.destroyAllSpritesOfKind(SpriteKind.SwampEnemy)
        sprites.destroyAllSpritesOfKind(SpriteKind.WaterEnemy)
    } else if (num == 1) {
        tiles.placeOnRandomTile(Duck, assets.tile`myTile14`)
        scene.setBackgroundColor(13)
        SnakeSpawn = false
        sprites.destroyAllSpritesOfKind(SpriteKind.GrassEnemy)
        if (Switch) {
            ChangeDungeon()
            Summon_Eye(37)
        } else {
            Summon_Eye(24)
        }
    } else if (num == 2) {
        tiles.placeOnRandomTile(Duck, sprites.builtin.forestTiles6)
        scene.setBackgroundColor(6)
        Summon_Clam()
        sprites.destroyAllSpritesOfKind(SpriteKind.GrassEnemy)
    } else if (num == 3) {
        tiles.placeOnRandomTile(Duck, sprites.builtin.oceanDepths9)
        scene.setBackgroundColor(9)
        SnakeSpawn = false
        Summon_Shark()
        sprites.destroyAllSpritesOfKind(SpriteKind.GrassEnemy)
    } else if (num == 4) {
        tiles.placeOnRandomTile(Duck, sprites.dungeon.floorDarkDiamond)
        scene.setBackgroundColor(11)
        sprites.destroyAllSpritesOfKind(SpriteKind.DunEnemy)
    } else if (num == 5) {
        tiles.placeOnRandomTile(Duck, assets.tile`myTile28`)
        sprites.destroyAllSpritesOfKind(SpriteKind.DunEnemy)
    }
}
// Changes the water map to the plain map.
scene.onOverlapTile(SpriteKind.Player, sprites.builtin.oceanDepths9, function (sprite, location) {
    if (controller.B.isPressed()) {
        Map(0)
        tiles.placeOnRandomTile(sprite, assets.tile`myTile11`)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile10`, function (sprite10, location22) {
    slowed = true
    if (left) {
        Duck.setImage(img`
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
            `)
    } else {
        Duck.setImage(img`
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
            `)
    }
})
// Makes sure turrets don't overlap and each location has a turret. 
sprites.onOverlap(SpriteKind.turret, SpriteKind.turret, function (sprite, otherSprite) {
    tiles.placeOnRandomTile(sprite, assets.tile`myTile19`)
})
// When Snake's Hp bar is at 0, kills the snake and has a chance to drop a key or heal player.
statusbars.onZero(StatusBarKind.SnekHealth, function (status3) {
    sprites.destroy(status3.spriteAttachedTo(), effects.fire, 500)
    Keys += 1
    if (Keys >= 3) {
        if (Math.percentChance(55)) {
            KeyImg = sprites.create(img`
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
                `, SpriteKind.Key)
            KeyImg.setPosition(status3.x, status3.y)
            Keys += Keys * -1
        }
    }
    if (Math.percentChance(10)) {
        heart = sprites.create(img`
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
            `, SpriteKind.heartt)
        heart.setPosition(status3.x, status3.y)
    }
})
// The function spawning in the clam enemy when the player enters the forest. Also creates their HP Bars and allows them to fire bullets by setting a variable to true. 
function Summon_Clam () {
    ClamSpawn = true
    for (let value of tiles.getTilesByType(sprites.swamp.swampTile13)) {
        Clam = sprites.create(img`
            . . . . . f c c c c f . . . . . 
            . . c c f b b 3 3 b b f c c . . 
            . c b 3 3 b b c c b b 3 3 b c . 
            . f 3 c c c b c c b c c c 3 f . 
            f c b b c c b c c b c c b b c f 
            c 3 c c b c c c c c c b c c 3 c 
            c 3 c c c c c c c c c c c c 3 c 
            . f b b c c c c c c c c b b f . 
            . . f b b c 8 9 9 8 c b b f . . 
            . . c c c f 9 3 1 9 f c c c . . 
            . c 3 f f f 9 3 3 9 f f f 3 c . 
            c 3 f f f f 8 9 9 8 f f f f 3 c 
            f 3 c c f f f f f f f f c c 3 f 
            f b 3 c b b f b b f b b c 3 b f 
            . c b b 3 3 b 3 3 b 3 3 b b c . 
            . . f f f f f f f f f f f f . . 
            `, SpriteKind.SwampEnemy)
        tiles.placeOnRandomTile(Clam, sprites.swamp.swampTile9)
        ClamBar = statusbars.create(16, 3, StatusBarKind.ClamHealth)
        ClamBar.max = 15
        ClamBar.setBarBorder(1, 15)
        ClamBar.attachToSprite(Clam)
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile5`, function (sprite, location2) {
    slowed = true
    if (left) {
        Duck.setImage(img`
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
            `)
    } else {
        Duck.setImage(img`
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
            `)
    }
})
// If all chests are collected, makes player attack block projectiles.
sprites.onOverlap(SpriteKind.Attack, SpriteKind.Projectile, function (sprite, otherSprite) {
    if (Advanced_Attack) {
        sprites.destroy(otherSprite, effects.warmRadial, 100)
    }
})
// Whenever the player is on the visible tile, and has an up switch above them, sets the switch down and opens up a path in the dungeon map by setting a variable to true,
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile21`, function (sprite, location) {
    if (controller.A.isPressed()) {
        if (sprite.tileKindAt(TileDirection.Top, sprites.dungeon.purpleSwitchUp)) {
            tiles.setTileAt(location.getNeighboringLocation(CollisionDirection.Top), sprites.dungeon.purpleSwitchDown)
            scene.cameraShake(3, 1000)
            Switch = true
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile16`, function (sprite, location) {
    if (controller.B.isPressed()) {
        game.showLongText("Flip the Switch to access deeper.         \\/\\/\\/", DialogLayout.Bottom)
    }
})
// Summons a turret for each tile listed in the array
function SummonTurrets (list: any[]) {
    for (let value of list) {
        Turrets = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . 4 4 . . . . . 4 4 . . . . 
            . . 4 2 f . . . . . f 2 4 . . . 
            . . 4 f f f f . f f f f 4 . . . 
            . . . . f 2 2 f 2 2 f . . . . . 
            . . . . f 2 3 4 3 2 f . . . . . 
            . . . . . f 4 5 4 f . . . . . . 
            . . . . f 2 3 4 3 2 f . . . . . 
            . . . . f 2 2 f 2 2 f . . . . . 
            . . 4 f f f f . f f f f 4 . . . 
            . . 4 2 f . . . . . f 2 4 . . . 
            . . . 4 4 . . . . . 4 4 . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.turret)
        tiles.placeOnRandomTile(Turrets, assets.tile`myTile19`)
    }
}
sprites.onOverlap(SpriteKind.Attack, SpriteKind.WaterEnemy, function (sprite, otherSprite) {
    sprite.setFlag(SpriteFlag.Ghost, true)
    statusbars.getStatusBarAttachedTo(StatusBarKind.SharkHealth, otherSprite).value += Strength
})
// Changes direction of spite along with movement to simulate animation, 
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    left = false
    if (Watery) {
        Duck.setImage(img`
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
            `)
    } else {
        Duck.setImage(img`
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
            `)
    }
})
// Lets the player hit the Dungeon enemy
sprites.onOverlap(SpriteKind.Attack, SpriteKind.DunEnemy, function (sprite8, otherSprite3) {
    sprite8.setFlag(SpriteFlag.Ghost, true)
    statusbars.getStatusBarAttachedTo(StatusBarKind.EyeHealth, otherSprite3).value += Strength
})
// Changes a segment of the dungeon map after a certain event is triggered.
function ChangeDungeon () {
    tiles.setWallAt(tiles.getTileLocation(34, 12), false)
    tiles.setWallAt(tiles.getTileLocation(34, 13), false)
    tiles.setWallAt(tiles.getTileLocation(34, 14), false)
    tiles.setTileAt(tiles.getTileLocation(34, 11), sprites.dungeon.greenInnerSouthWest)
    tiles.setTileAt(tiles.getTileLocation(34, 12), sprites.dungeon.floorLight0)
    tiles.setTileAt(tiles.getTileLocation(34, 13), sprites.dungeon.floorLight0)
    tiles.setTileAt(tiles.getTileLocation(34, 14), sprites.dungeon.floorLight0)
    tiles.setTileAt(tiles.getTileLocation(34, 15), sprites.dungeon.greenInnerNorthWest)
    tiles.setTileAt(tiles.getTileLocation(35, 11), sprites.dungeon.greenOuterNorth0)
    tiles.setTileAt(tiles.getTileLocation(35, 12), sprites.dungeon.floorLight0)
    tiles.setTileAt(tiles.getTileLocation(35, 13), sprites.dungeon.floorLight0)
    tiles.setTileAt(tiles.getTileLocation(35, 14), sprites.dungeon.floorLight0)
    tiles.setTileAt(tiles.getTileLocation(35, 15), sprites.dungeon.greenOuterSouth1)
    tiles.setTileAt(tiles.getTileLocation(36, 11), sprites.dungeon.greenOuterNorth0)
    tiles.setTileAt(tiles.getTileLocation(36, 12), sprites.dungeon.floorLight0)
    tiles.setTileAt(tiles.getTileLocation(36, 13), sprites.dungeon.floorLight0)
    tiles.setTileAt(tiles.getTileLocation(36, 14), sprites.dungeon.floorLight0)
    tiles.setTileAt(tiles.getTileLocation(36, 15), sprites.dungeon.greenOuterSouth1)
}
// Makes player slow on water.
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile2`, function (sprite14, location26) {
    slowed = true
    if (left) {
        Duck.setImage(img`
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
            `)
    } else {
        Duck.setImage(img`
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
            `)
    }
})
function Arena () {
    tiles.setTileAt(tiles.getTileLocation(27, 31), sprites.dungeon.hazardHole)
    tiles.setTileAt(tiles.getTileLocation(28, 31), sprites.dungeon.hazardHole)
    tiles.setTileAt(tiles.getTileLocation(28, 30), assets.tile`myTile19`)
    tiles.setTileAt(tiles.getTileLocation(29, 31), sprites.dungeon.hazardHole)
    tiles.setWallAt(tiles.getTileLocation(27, 31), true)
    tiles.setWallAt(tiles.getTileLocation(28, 31), true)
    tiles.setWallAt(tiles.getTileLocation(29, 31), true)
}
// Dungeon enemies is killed at 0 HP and has a chance to drop a key.
statusbars.onZero(StatusBarKind.EyeHealth, function (status) {
    sprites.destroy(status.spriteAttachedTo(), effects.fire, 500)
    Keys += 1
    if (Keys >= 3) {
        if (Math.percentChance(75)) {
            KeyImg = sprites.create(img`
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
                `, SpriteKind.Key)
            KeyImg.setPosition(status.x, status.y)
            Keys += Keys * -1
        }
    }
})
statusbars.onZero(StatusBarKind.ClamHealth, function (status) {
    sprites.destroy(status.spriteAttachedTo(), effects.fire, 500)
    Keys += 1
    if (Keys >= 3) {
        if (Math.percentChance(60)) {
            KeyImg = sprites.create(img`
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
                `, SpriteKind.Key)
            KeyImg.setPosition(status.x, status.y)
            Keys += Keys * -1
        }
    }
})
sprites.onOverlap(SpriteKind.Attack, SpriteKind.SwampEnemy, function (sprite, otherSprite) {
    sprite.setFlag(SpriteFlag.Ghost, true)
    statusbars.getStatusBarAttachedTo(StatusBarKind.ClamHealth, otherSprite).value += Strength
})
// Hurts the player on overlap with a shark.
sprites.onOverlap(SpriteKind.Player, SpriteKind.WaterEnemy, function (sprite622, otherSprite32) {
    sprites.destroy(otherSprite32, effects.disintegrate, 500)
    Player_Health.value += -3
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile4`, function (sprite11, location23) {
    slowed = true
    if (left) {
        Duck.setImage(img`
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
            `)
    } else {
        Duck.setImage(img`
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
            `)
    }
})
// Changes location from the forest to the plains
scene.onOverlapTile(SpriteKind.Player, sprites.builtin.forestTiles6, function (sprite6, location4) {
    if (controller.B.isPressed()) {
        Map(0)
        tiles.placeOnRandomTile(sprite6, sprites.builtin.forestTiles18)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile9`, function (sprite13, location25) {
    slowed = true
    if (left) {
        Duck.setImage(img`
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
            `)
    } else {
        Duck.setImage(img`
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
            `)
    }
})
// Player hitting A overlapped with an orb increases max health and increases the orb variable by 1 which is needed to unlock the boss room. 
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleRedCrystal, function (sprite, location) {
    if (controller.A.isPressed()) {
        tiles.setTileAt(location, sprites.dungeon.floorDark0)
        scene.cameraShake(2, 500)
        pause(200)
        Orbs += 1
        Player_Health.max += 3
        Player_Health.value += Player_Health.max
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.stairLarge, function (sprite, location) {
    Map(1)
    tiles.placeOnRandomTile(sprite, assets.tile`myTile13`)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.floorMixed, function (sprite, location) {
    if (controller.A.isPressed()) {
        tiles.setTileAt(location.getNeighboringLocation(CollisionDirection.Top), sprites.dungeon.purpleSwitchDown)
        tiles.setTileAt(location, assets.tile`myTile27`)
        Arena()
        Summon_Boss()
        pause(100)
    }
})
// Makes it so Dungeon enemies don't overlap and theres one set on every diamond tile.
sprites.onOverlap(SpriteKind.DunEnemy, SpriteKind.DunEnemy, function (sprite, otherSprite) {
    tiles.placeOnRandomTile(sprite, sprites.dungeon.floorDarkDiamond)
})
// Summons the boss and creates its HP Bar which sits at the bottom of the screen
function Summon_Boss () {
    BossSpawn = true
    BossMob = sprites.create(img`
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
        `, SpriteKind.Boss)
    tiles.placeOnRandomTile(BossMob, sprites.dungeon.floorDarkDiamond)
    scene.cameraShake(2, 500)
    BossBar = statusbars.create(80, 5, StatusBarKind.BossBar)
    BossBar.setLabel("Dragon Jr.", 0)
    BossBar.setBarBorder(1, 15)
    BossBar.max = 100
    BossBar.positionDirection(CollisionDirection.Bottom)
    BossBar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    BossMob.follow(Duck, 7)
    Phase_2 = false
}
// Signpost giver player information on A press.
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile23`, function (sprite, location) {
    if (controller.A.isPressed()) {
        game.showLongText("Red and Green orbs need to be destroyed in order to open.", DialogLayout.Bottom)
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleInsignia, function (sprite, location) {
    if (controller.A.isPressed()) {
        if (Orbs == 2) {
            Map(5)
        } else {
            game.showLongText("Passage is blocked", DialogLayout.Bottom)
        }
    }
})
let FireBall = false
let EyeBullets: Sprite = null
let Snake_Health: StatusBarSprite = null
let Snakes: Sprite = null
let BossMob: Sprite = null
let Orbs = 0
let Turrets: Sprite = null
let ClamBar: StatusBarSprite = null
let Clam: Sprite = null
let KeyImg: Sprite = null
let Keys = 0
let SnakeSpawn = false
let EyeHealth2: StatusBarSprite = null
let EyeDemon: Sprite = null
let EyeSpawn = false
let Watery = false
let heart: Sprite = null
let ClamSpawn = false
let Advanced_Attack = false
let Player_Slash: Sprite = null
let Phase_2 = false
let left = false
let slowed = false
let BossBar: StatusBarSprite = null
let Shark_BAr: StatusBarSprite = null
let Sharks: Sprite = null
let SharkSpawn = false
let Strength = 0
let Switch = false
let BossSpawn = false
let MapArray: tiles.TileMapData[] = []
let Player_Health: StatusBarSprite = null
let Duck: Sprite = null
Duck = sprites.create(img`
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
    `, SpriteKind.Player)
game.showLongText("A Bird's Journey", DialogLayout.Bottom)
game.showLongText("Use Arrow keys to move.  Use (A) to attack.   Interact with both (A) and (B).", DialogLayout.Bottom)
Player_Health = statusbars.create(20, 4, StatusBarKind.Health)
scene.setBackgroundColor(7)
Player_Health.setBarBorder(1, 15)
Player_Health.max = 6
Player_Health.setLabel("HP", 1)
Player_Health.attachToSprite(Duck)
MapArray = [
tilemap`level1`,
tilemap`level4`,
tilemap`level7`,
tilemap`level16`,
tilemap`level20`,
tilemap`level25`
]
scene.cameraFollowSprite(Duck)
controller.moveSprite(Duck)
Map(0)
tiles.placeOnTile(Duck, tiles.getTileLocation(3, 20))
BossSpawn = false
Switch = false
Strength = -1
info.setScore(1)
// Every 2 seconds, spawns in a snake enemy onto a random grass tile, but if that grass tile wasn't in frame, the enemy respawns.
game.onUpdateInterval(2000, function () {
    if (SnakeSpawn) {
        Snakes = sprites.create(img`
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
            `, SpriteKind.GrassEnemy)
        tiles.placeOnRandomTile(Snakes, sprites.swamp.swampTile3)
        Snakes.setFlag(SpriteFlag.AutoDestroy, true)
        Snakes.follow(Duck, 50)
        Snake_Health = statusbars.create(16, 3, StatusBarKind.SnekHealth)
        Snake_Health.max = 3
        Snake_Health.setBarBorder(1, 15)
        Snake_Health.attachToSprite(Snakes)
    }
})
// Creates the attack pattern of the Dungeon enemies whenever the EyeSpawn variable is true. 
// Becomes more challenging when the map changes.
game.onUpdateInterval(1000, function () {
    if (EyeSpawn) {
        if (Switch) {
            for (let value of sprites.allOfKind(SpriteKind.DunEnemy)) {
                for (let index = 0; index < 7; index++) {
                    EyeBullets = sprites.createProjectileFromSprite(img`
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
                        `, value, randint(-50, 50), randint(-50, 50))
                }
            }
        } else {
            for (let value of sprites.allOfKind(SpriteKind.DunEnemy)) {
                for (let index = 0; index < 5; index++) {
                    EyeBullets = sprites.createProjectileFromSprite(img`
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
                        `, value, randint(-50, 50), randint(-50, 50))
                }
            }
        }
    }
})
game.onUpdateInterval(1000, function () {
    if (BossSpawn) {
        if (Duck.x < BossMob.x) {
            EyeBullets = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . 2 2 4 4 4 . . . . . . 
                . . 2 . 2 d 5 5 d 5 4 4 . . . . 
                . 2 2 2 4 5 5 5 d 5 5 d 4 . . . 
                . 2 2 2 d 5 5 1 1 5 5 5 4 . . . 
                2 4 2 4 d d d 1 1 1 1 d 4 4 . . 
                2 4 2 d 5 1 1 5 5 1 1 5 5 4 . . 
                2 4 4 5 5 1 1 1 5 1 1 5 5 4 . . 
                2 4 4 5 5 1 1 1 5 5 d 5 5 4 . . 
                2 4 4 d 5 5 5 5 1 1 d d d 4 . . 
                2 4 2 d d 1 1 5 1 1 5 d 4 . . . 
                . 2 2 4 d 1 1 d 5 5 5 d 4 . . . 
                . 2 2 4 5 5 5 d 5 5 5 4 4 . . . 
                . . . . 4 5 5 d d 4 4 4 4 . . . 
                . . . . . 2 2 4 4 4 . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, BossMob, randint(-96, -102), 0)
            EyeBullets.startEffect(effects.fire)
            FireBall = false
        } else {
            EyeBullets = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 4 4 4 2 2 . . . . . 
                . . . 4 4 4 4 d d 5 5 4 . . . . 
                . . . 4 4 5 5 5 d 5 5 5 4 2 2 . 
                . . . 4 d 5 5 5 d 1 1 d 4 2 2 . 
                . . . 4 d 5 1 1 5 1 1 d d 2 4 2 
                . . 4 d d d 1 1 5 5 5 5 d 4 4 2 
                . . 4 5 5 d 5 5 1 1 1 5 5 4 4 2 
                . . 4 5 5 1 1 5 1 1 1 5 5 4 4 2 
                . . 4 5 5 1 1 5 5 1 1 5 d 2 4 2 
                . . 4 4 d 1 1 1 1 d d d 4 2 4 2 
                . . . 4 5 5 5 1 1 5 5 d 2 2 2 . 
                . . . 4 d 5 5 d 5 5 5 4 2 2 2 . 
                . . . . 4 4 5 d 5 5 d 2 . 2 . . 
                . . . . . . 4 4 4 2 2 . . . . . 
                . . . . . . . . . . . . . . . . 
                `, BossMob, randint(96, 102), 0)
            EyeBullets.startEffect(effects.fire)
            FireBall = false
        }
    }
})
// Makes the boss' environmental fire faster in phase 2
game.onUpdateInterval(400, function () {
    if (BossSpawn) {
        if (Phase_2) {
            EyeBullets = sprites.createProjectileFromSide(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . 4 4 . . . . . . . 
                . . . . . . 4 5 5 4 . . . . . . 
                . . . . . . 2 5 5 2 . . . . . . 
                . . . . . . . 2 2 . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, randint(-55, 55), randint(-55, 55))
        }
    }
})
// Changes the direction the boss faces based on the player
forever(function () {
    if (BossSpawn) {
        if (Duck.x < BossMob.x) {
            if (Phase_2) {
                BossMob.setImage(img`
                    ........................
                    ........................
                    ...........cc...........
                    .........cccc...........
                    .....ccccccc...cc.......
                    ...cc555555cccccc.......
                    ..c5555555555bcc........
                    .c555555555555b..cc.....
                    c555551ff555555bccc.....
                    c55d55ff55555555bcc.....
                    c5555555555555555b......
                    .cbb31bb55555d555b..c...
                    .c5333bb55ddddd55dccc...
                    .c533b55ddddddddddbc....
                    .c5555ddddb55bdddddccc..
                    ..ccccbbbb555bdddddccc..
                    ...cdcbc5555bddddddcc...
                    ....ccbc55bcdddddddbcccc
                    .....cbbccbd55dddddddddc
                    .....ccbbbd555ddddddddbc
                    ...ccbdcbb555ddbbdddbcc.
                    ...cbdddcc55ddbbbbccc...
                    ...cccccccbdddbccc......
                    ........cd555ddc........
                    `)
            } else {
                BossMob.setImage(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . c c c c . . . . . . . . 
                    . . c c 5 5 5 5 c c . . . . . . 
                    . c 5 5 5 5 5 5 5 5 c . . . . . 
                    c 5 5 5 5 5 1 f 5 5 5 c . . . . 
                    c 5 5 5 5 5 f f 5 5 5 5 c . . . 
                    c c b b 1 b 5 5 5 5 5 5 c . . . 
                    c c 3 3 b b 5 5 5 5 5 5 d c . . 
                    c 5 3 3 3 5 5 5 5 5 d d d c . . 
                    . b 5 5 5 5 5 5 5 5 d d d c . . 
                    . . c b b c 5 5 b d d d d c . . 
                    . c b b c 5 5 b b d d d d c c c 
                    . c c c c c c d d d d d d d d c 
                    . . . c c c c d 5 5 b d d d c c 
                    . . . c b c c b 5 5 b c c c . . 
                    . . . c c c d 5 5 b c . . . . . 
                    `)
            }
        } else {
            if (Phase_2) {
                BossMob.setImage(img`
                    ........................
                    ........................
                    ...........cc...........
                    ...........cccc.........
                    .......cc...ccccccc.....
                    .......cccccc555555cc...
                    ........ccb5555555555c..
                    .....cc..b555555555555c.
                    .....cccb555555ff155555c
                    .....ccb55555555ff55d55c
                    ......b5555555555555555c
                    ...c..b555d55555bb13bbc.
                    ...cccd55ddddd55bb3335c.
                    ....cbdddddddddd55b335c.
                    ..cccdddddb55bdddd5555c.
                    ..cccdddddb555bbbbcccc..
                    ...ccddddddb5555cbcdc...
                    ccccbdddddddcb55cbcc....
                    cddddddddd55dbccbbc.....
                    cbdddddddd555dbbbcc.....
                    .ccbdddbbdd555bbcdbcc...
                    ...cccbbbbdd55ccdddbc...
                    ......cccbdddbccccccc...
                    ........cdd555dc........
                    `)
            } else {
                BossMob.setImage(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . c c c c . . . . 
                    . . . . . . c c 5 5 5 5 c c . . 
                    . . . . . c 5 5 5 5 5 5 5 5 c . 
                    . . . . c 5 5 5 f 1 5 5 5 5 5 c 
                    . . . c 5 5 5 5 f f 5 5 5 5 5 c 
                    . . . c 5 5 5 5 5 5 b 1 b b c c 
                    . . c d 5 5 5 5 5 5 b b 3 3 c c 
                    . . c d d d 5 5 5 5 5 3 3 3 5 c 
                    . . c d d d 5 5 5 5 5 5 5 5 b . 
                    . . c d d d d b 5 5 c b b c . . 
                    c c c d d d d b b 5 5 c b b c . 
                    c d d d d d d d d c c c c c c . 
                    c c d d d b 5 5 d c c c c . . . 
                    . . c c c b 5 5 b c c b c . . . 
                    . . . . . c b 5 5 d c c c . . . 
                    `)
            }
        }
    }
})
// Makes it so when the player is on a water tile, the sprite is changed and the controls are slowed.
forever(function () {
    if (slowed) {
        Watery = true
        controller.moveSprite(Duck, 35, 35)
    } else {
        Watery = false
        controller.moveSprite(Duck, 100, 100)
    }
})
// Creates environmental fire attacks while fighting the boss
game.onUpdateInterval(900, function () {
    if (BossSpawn) {
        EyeBullets = sprites.createProjectileFromSide(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . 4 5 5 4 . . . . . . 
            . . . . . . 2 5 5 2 . . . . . . 
            . . . . . . . 2 2 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, randint(-55, 55), randint(-55, 55))
    }
})
// When in the forest, creates the attack pattern of the clam enemies. 
game.onUpdateInterval(3000, function () {
    if (ClamSpawn) {
        for (let value of sprites.allOfKind(SpriteKind.SwampEnemy)) {
            for (let index = 0; index < 2; index++) {
                EyeBullets = sprites.createProjectileFromSprite(img`
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
                    `, value, randint(-40, 40), randint(-40, 40))
                EyeBullets.follow(Duck, randint(39, 43))
                EyeBullets.setFlag(SpriteFlag.AutoDestroy, true)
            }
        }
    }
})
// Creates the turrets attack pattern. 
game.onUpdateInterval(3000, function () {
    for (let value of sprites.allOfKind(SpriteKind.turret)) {
        for (let index = 0; index < 4; index++) {
            EyeBullets = sprites.createProjectileFromSprite(img`
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
                `, value, randint(-60, 60), randint(-60, 60))
        }
    }
})
