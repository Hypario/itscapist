import {Injectable} from '@angular/core';
import {Player} from './Player';
import {GameComponent} from './game.component';
@Injectable({
  providedIn: 'root'
})
export class GameService extends Phaser.Scene {

  private joueur;
  private keyboard;
  private attack = false;

  constructor() {
    super({key: 'scene'});
  }

  preload() {
    console.log('preload');
    this.load.spritesheet('joueur', 'assets/images/Condoto.png', {
      frameWidth: 16,
      frameHeight: 16
    });
    // here we get our tilesets
    this.load.image('tiles_lvl1', 'assets/maps/tiles/tiles_cus_perks.gif'); // tiles_cus_perk.gif in cache under the name tiles_lvl1
    this.load.tilemapTiledJSON('lvl_1', 'assets/maps/levels/sousSol.json'); // lvl_1
  }

  create() {
    const map = this.make.tilemap({ key: 'lvl_1'});
    // here, we link our tileset in the json file with the tileset selected in the preload
    const tilesetLvl1 = map.addTilesetImage('Itscapist_tiles', 'tiles_lvl1'); // like Itscapist_tiles == tiles_lvl1
    // Associating layer with their tileset
    // lvl_1
    const belowLayer = map.createStaticLayer('Below Player', tilesetLvl1, 0, 0);
    const walkableLayer = map.createStaticLayer('Walkable', tilesetLvl1, 0, 0);
    const worldLayer = map.createStaticLayer('World', tilesetLvl1, 0, 0);
    const objectLayer = map.createStaticLayer('Objects', tilesetLvl1, 0, 0);
    // lvl_2 *later*

    // Collisions
    worldLayer.setCollisionByProperty({ collides: true });

    // Getting the spawn Point
    const spawnPointX: number = 16 * 16;
    const spawnPointY: number = 41 * 16;

    this.joueur = this.physics.add.sprite(spawnPointX, spawnPointY, 'joueur', 0);
    this.joueur.setCollideWorldBounds(false);
    this.keyboard = this.input.keyboard.addKeys('Z,Q,S,D');
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
    camera.setBounds( 0, 0, map.widthInPixels, map.heightInPixels);

    // Initialize collision with player
    this.physics.add.collider(this.joueur, worldLayer);
  }

  update(time: number, delta: number): void {
    if (this.keyboard.D.isDown) {
      gestionAnims(this.keyboard, this.joueur);
      this.joueur.setVelocityX(64);
    }

    if (this.keyboard.Q.isDown) {
      gestionAnims(this.keyboard, this.joueur);
      this.joueur.setVelocityX(-64);
    }
    if (this.keyboard.Q.isUp && this.keyboard.D.isUp) {
      this.joueur.setVelocityX(0);
    }
    if (this.keyboard.Z.isDown) {
      gestionAnims(this.keyboard, this.joueur);
      this.joueur.setVelocityY(-64);
    }

    if (this.keyboard.S.isDown) {
      this.joueur.setVelocityY(64);
      gestionAnims(this.keyboard, this.joueur);
    }
    if (this.keyboard.Z.isUp && this.keyboard.S.isUp) {
      this.joueur.setVelocityY(0);
    }
  }
}

// @ts-ignore
function gestionAnims(keyboard, joueur) {
  if (keyboard.Z.isDown && keyboard.Q.isDown || keyboard.Z.isDown && keyboard.D.isDown ) {
    joueur.anims.play('up', true);
  }
  if (keyboard.S.isDown && keyboard.Q.isDown || keyboard.S.isDown && keyboard.D.isDown ) {
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
