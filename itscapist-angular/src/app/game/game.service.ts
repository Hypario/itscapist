import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService extends Phaser.Scene {

  joueur;
  speed: number;
  zoomUp: boolean;
  zoomDown: boolean;


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

    this.anims.create({
      key: 'walk_D',
      frames: this.anims.generateFrameNames('joueur',{start: 0, end: 1})
    });
    this.anims.create({
      key: 'walk_R',
      frames: this.anims.generateFrameNames('joueur', {start: 2, end: 3})
    });
    this.anims.create({
      key: 'walk_L',
      frames: this.anims.generateFrameNames('joueur', {start: 4, end: 5})
    });
    this.anims.create({
      key: 'walk_U',
      frames: this.anims.generateFrameNames('joueur', {start: 6, end: 7})
    });
  }

  update(time: number, delta: number): void {

  }

}
