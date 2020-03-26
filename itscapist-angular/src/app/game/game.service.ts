import {Injectable} from '@angular/core';
import {Player} from './Player';
@Injectable({
  providedIn: 'root'
})
export class GameService extends Phaser.Scene {

  private joueur;
  private map;
  private keyboard;


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
    this.joueur = this.add.sprite(100, 100, 'joueur', 0);
    this.keyboard = this.input.keyboard.addKeys('Z,Q,S,D');
    this.anims.create({
      key: 'down',
      repeat: -1,
      frameRate: 2,
      frames: this.anims.generateFrameNames('joueur', {start: 0, end: 1})
    });
    this.anims.create({
      key: 'right',
      repeat: -1,
      frameRate: 2,
      frames: this.anims.generateFrameNames('joueur', {start: 2, end: 3})
    });
    this.anims.create({
      key: 'left',
      repeat: -1,
      frameRate: 2,
      frames: this.anims.generateFrameNames('joueur', {start: 4, end: 5})
    });
    this.anims.create({
      key: 'up',
      repeat: -1,
      frameRate: 2,
      frames: this.anims.generateFrameNames('joueur', {start: 6, end: 7})
    });
  }

  update(time: number, delta: number): void {
    if (this.keyboard.D.isDown) {
      this.joueur.anims.play('right');
      this.joueur.x = this.joueur.x + 64 * (delta / 1000);
    }
    if (this.keyboard.S.isDown) {
      this.joueur.anims.play('down');
      this.joueur.y = this.joueur.y + 64 * (delta / 1000);
    }
    if (this.keyboard.Q.isDown) {
      this.joueur.anims.play('left');
      this.joueur.x = this.joueur.x - 64 * (delta / 1000);
    }
    if (this.keyboard.Z.isDown) {
      this.joueur.anims.play('up');
      this.joueur.y = this.joueur.y - 64 * (delta / 1000);
    }
  }
}
