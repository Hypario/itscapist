import {Injectable} from '@angular/core';
import Image = Phaser.GameObjects.Image;

@Injectable({
  providedIn: 'root'
})
export class GameService extends Phaser.Scene {

  joueur: Image;
  haut: Image;
  bas: Image;
  zoomUp: boolean;
  zoomDown: boolean;


  constructor() {
    super({key: 'scene'});
  }

  preload() {
    console.log('preload method');
  }

  create() {
    console.log('create method');
    const centreX = this.cameras.main.centerX;
    const centreY = this.cameras.main.centerY;
    const policeTexte = {
      fontSize: '52px',
      color: '#FF0000'
    };
    this.add.text(50, 60, 'Bonjour Monde du jeu !', policeTexte);
  }

  update(time: number, delta: number): void {
    console.log('update method');
  }

}
