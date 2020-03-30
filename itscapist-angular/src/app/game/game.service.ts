import {Injectable} from '@angular/core';
import {Player} from './Player';
import {GameComponent} from './game.component';
import {CST} from './CST';

@Injectable({
  providedIn: 'root'
})
export class GameService extends Phaser.Scene {

  private joueur;
  private keyboard;
  private attack = false;
  private currentMap;
  private currentWorldLayer;
  private score = 100000;
  private scoreText;
  private EnergyText;
  private intelText;
  private strenghText;
  constructor() {
    super({key: CST.SCENES.GAME});
  }

  preload() {

    this.load.spritesheet('joueur', 'assets/images/Condoto.png', {
      frameWidth: 16,
      frameHeight: 16
    });
    // here we get our tilesets
    this.load.image('tiles_lvl1', 'assets/maps/tiles/tiles_cus_perks_mod.png'); // tiles_cus_perk_mod.png in cache under the name tiles_lvl1
    this.load.tilemapTiledJSON('lvl_1', 'assets/maps/levels/sousSol.json'); // lvl_1
    this.load.audio('never', 'assets/sounds/music/never.ogg');

    // barre de chargement
    const loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xfefefe
      }
    });
    this.load.on('progress', (percent) => {
      loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
    });



  }

  create() {
    // this.scene.start(CST.SCENES.GAME)
    const map = this.make.tilemap({key: 'lvl_1'});
    // here, we link our tileset in the json file with the tileset selected in the preload
    const tilesetLvl1 = map.addTilesetImage('Itscapist_tiles', 'tiles_lvl1', 16, 16, 1, 2); // like Itscapist_tiles == tiles_lvl1
    // Associating layer with their tileset
    // lvl_1
    const musique = this.sound.add('never');
    musique.play();
    const belowLayer = map.createStaticLayer('Below Player', tilesetLvl1, 0, 0);
    const walkableLayer = map.createStaticLayer('Walkable', tilesetLvl1, 0, 0);
    const worldLayer = map.createStaticLayer('World', tilesetLvl1, 0, 0);
    const objectLayer = map.createStaticLayer('Objects', tilesetLvl1, 0, 0);
    this.currentMap = map;
    this.currentWorldLayer = worldLayer;
    // lvl_2 *later*

    // Collisions
    worldLayer.setCollisionByProperty({ collides: true });

    // Setting the spawn Point
    const spawnPointX: number = 16 * 16;
    const spawnPointY: number = 41 * 16;

    this.joueur = this.physics.add.sprite(spawnPointX, spawnPointY, 'joueur', 0);
    this.joueur.setCollideWorldBounds(false);
    this.keyboard = this.input.keyboard.addKeys('Z,Q,S,D');
    // animations gestion
    this.anims.create({
      key: 'down',
      repeat: -1,
      frameRate: 3,
      frames: this.anims.generateFrameNames('joueur', {start: 0, end: 1})
    });
    this.anims.create({
      key: 'right',
      repeat: -1,
      frameRate: 3,
      frames: this.anims.generateFrameNames('joueur', {start: 2, end: 3})
    });
    this.anims.create({
      key: 'left',
      repeat: -1,
      frameRate: 3,
      frames: this.anims.generateFrameNames('joueur', {start: 4, end: 5})
    });
    this.anims.create({
      key: 'up',
      repeat: -1,
      frameRate: 3,
      frames: this.anims.generateFrameNames('joueur', {start: 6, end: 7})
    });

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (pointer.isDown) {
        this.attack = true;
      }
    });
    // fix the camera to the player
    const camera = this.cameras.main;
    camera.startFollow(this.joueur);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Initialize collision with player
    this.physics.add.collider(this.joueur, worldLayer);

    this.scoreText = this.add.text(2, 2 , 'Score: 100000', {
      font: '10px Arial',
      fill: '#ffffff',
      padding: {x: 3, y: 3},
    }).setScrollFactor(0);
    this.EnergyText = this.add.text(2, 100 , 'Energy: 100', {
      font: '10px Arial',
      fill: '#ffffff',
      padding: {x: 3, y: 3},
    }).setScrollFactor(0);
    this.strenghText = this.add.text(2, 110 , 'Strengh: 10', {
      font: '10px Arial',
      fill: '#ffffff',
      padding: {x: 3, y: 3},
    }).setScrollFactor(0);
    this.intelText = this.add.text(2, 120 , 'Intelligence: 10', {
      font: '10px Arial',
      fill: '#ffffff',
      padding: {x: 3, y: 3},
    }).setScrollFactor(0);
  }

  update(time: number, delta: number): void {
    if (this.keyboard.D.isDown) {
      gestionAnims(this.keyboard, this.joueur);
      this.joueur.setVelocityX(64);
      console.log(lookTileAt(this.currentMap, this.joueur, 'right'));
      this.score -= 5;
      this.scoreText.setText('Score: ' + this.score);
    }

    if (this.keyboard.Q.isDown) {
      gestionAnims(this.keyboard, this.joueur);
      this.joueur.setVelocityX(-64);
      console.log(lookTileAt(this.currentMap, this.joueur, 'left'));
      this.score -= 5;
      this.scoreText.setText('Score: ' + this.score);
    }
    if (this.keyboard.Q.isUp && this.keyboard.D.isUp) {
      this.joueur.setVelocityX(0);
    }
    if (this.keyboard.Z.isDown) {
      gestionAnims(this.keyboard, this.joueur);
      this.joueur.setVelocityY(-64);
      console.log(lookTileAt(this.currentMap, this.joueur, 'up'));
      this.score -= 5;
      this.scoreText.setText('Score: ' + this.score);
    }

    if (this.keyboard.S.isDown) {
      this.joueur.setVelocityY(64);
      gestionAnims(this.keyboard, this.joueur);
      console.log(lookTileAt(this.currentMap, this.joueur, 'down'));
      this.score -= 5;
      this.scoreText.setText('Score: ' + this.score);
    }
    if (this.keyboard.Z.isUp && this.keyboard.S.isUp) {
      this.joueur.setVelocityY(0);
    }
    if (this.score === 0) {
      console.log('losed');
    }
  }
}

// @ts-ignore
function gestionAnims(keyboard, joueur) {
  if (keyboard.Z.isDown && keyboard.Q.isDown || keyboard.Z.isDown && keyboard.D.isDown) {
    joueur.anims.play('up', true);
  }
  if (keyboard.S.isDown && keyboard.Q.isDown || keyboard.S.isDown && keyboard.D.isDown) {
    joueur.anims.play('down', true);
  }
  if (keyboard.S.isDown && keyboard.Q.isUp && keyboard.D.isUp && keyboard.Z.isUp) {
    joueur.anims.play('down', true);
  }
  if (keyboard.D.isDown && keyboard.Q.isUp && keyboard.S.isUp && keyboard.Z.isUp) {
    joueur.anims.play('right', true);
  }
  if (keyboard.Z.isDown && keyboard.Q.isUp && keyboard.D.isUp && keyboard.S.isUp) {
    joueur.anims.play('up', true);
  }
  if (keyboard.Q.isDown && keyboard.S.isUp && keyboard.D.isUp && keyboard.Z.isUp) {
    joueur.anims.play('left', true);
  }
}

// Functions used to get the coordinates of the player in tile unit
// joueur: object sprite used as the player

function joueurPositionX(joueur) {
  const joueurPosX: integer = Math.round((joueur.x / 16) - 1 );
  return joueurPosX;
}

function joueurPositionY(joueur) {
  const joueurPosY: integer = Math.round((joueur.y / 16) - 1);
  return joueurPosY;
}

// Functions to get the tiles next to the player
// map: map you want tu check the tiles for
// joueur: object sprite used as the player
// direction: direction you wanna look
function lookTileAt(map, joueur, direction) {
  console.log(joueurPositionX(joueur), joueurPositionY(joueur));
  if (direction === 'up') {
    return map.getTileAt(joueurPositionX(joueur), joueurPositionY(joueur) + 1, true, 2);
  }
  if (direction === 'down') {
    return map.getTileAt(joueurPositionX(joueur), joueurPositionY(joueur) - 1, true, 2);
  }
  if (direction === 'left') {
    return map.getTileAt(joueurPositionX(joueur) - 1, joueurPositionY(joueur), true, 2);
  }
  if (direction === 'right') {
    return map.getTileAt(joueurPositionX(joueur) + 1, joueurPositionY(joueur), true, 2);
  } else {
    return null;
  }
}
