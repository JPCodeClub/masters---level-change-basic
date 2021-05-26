controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currentLevel == 0) {
        changeToNextLevel()
    }
})
function loadLevelData () {
    if (currentLevel == 0) {
        scene.setBackgroundColor(9)
        game.showLongText("Level 0 can be an Intro Scene", DialogLayout.Bottom)
        person.say("Press A :)", 1000)
    } else if (currentLevel == 1) {
        scene.setBackgroundImage(assets.image`bg2`)
        tiles.setTilemap(tilemap`level1`)
    } else if (currentLevel == 2) {
        scene.setBackgroundImage(assets.image`bg1`)
        tiles.setTilemap(tilemap`level2`)
    } else if (currentLevel == 3) {
        scene.setBackgroundImage(assets.image`bg3`)
        tiles.setTilemap(tilemap`level3`)
    }
    for (let value of tiles.getTilesByType(assets.tile`coinLocation`)) {
        coin = sprites.create(assets.image`coin`, SpriteKind.Food)
        tiles.placeOnTile(coin, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    tiles.placeOnRandomTile(person, assets.tile`start`)
}
function changeToNextLevel () {
    for (let value of sprites.allOfKind(SpriteKind.Food)) {
        value.destroy()
    }
    currentLevel += 1
    loadLevelData()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`end`, function (sprite, location) {
    changeToNextLevel()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
})
let coin: Sprite = null
let currentLevel = 0
let person: Sprite = null
person = sprites.create(assets.image`person`, SpriteKind.Player)
person.ay = 200
controller.moveSprite(person, 100, 0)
currentLevel = 0
loadLevelData()
scene.cameraFollowSprite(person)
