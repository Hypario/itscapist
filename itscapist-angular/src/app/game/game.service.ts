import {Injectable} from '@angular/core';
import {Player} from './Player';
import {GameComponent} from './game.component';

@Injectable({
  providedIn: 'root'
})
export class GameService extends Phaser.Scene {

  private joueur;
  private map;
  private keyboard;
  private attack = false;

  constructor() {
    super({key: 'scene'});
  }

  preload() {
    this.load.spritesheet('joueur', 'assets/images/Condoto.png', {
      frameWidth: 16,
      frameHeight: 16
    });
  }

  create() {
    this.joueur = this.physics.add.sprite(100, 100, 'joueur', 0);
    this.joueur.setCollideWorldBounds(true);
    this.joueur.setScale(2);
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
      frames: this.anims.generateFrameNames('joueur', {start: 7, end: 6})
    });

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (pointer.isDown) {
        this.attack = true;
      }
    });
  }

  update(time: number, delta: number): void {
    if (this.keyboard.D.isDown) {
      this.joueur.anims.play('right', true);
      this.joueur.setVelocityX(64);
    }

    if (this.keyboard.Q.isDown) {
      this.joueur.anims.play('left', true);
      this.joueur.setVelocityX(-64);
    }
    if (this.keyboard.Q.isUp && this.keyboard.D.isUp) {
      this.joueur.setVelocityX(0);
      this.joueur.anims.stop();
    }
    if (this.keyboard.Z.isDown) {
      this.joueur.anims.play('up', true);
      this.joueur.setVelocityY(-64);
    }

    if (this.keyboard.S.isDown) {
      this.joueur.anims.play('down', true);
      this.joueur.setVelocityY(64);
    }
    if (this.keyboard.Z.isUp && this.keyboard.S.isUp) {
      this.joueur.setVelocityY(0);
    }


  }
}
