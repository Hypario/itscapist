import {CST} from './CST';
import {GameService} from './game.service';

export class Menu extends Phaser.Scene {

  constructor() {
    super({
      key: CST.SCENES.MENU
    });
  }

  preload() {
    this.load.audio('wild_boys', 'assets/sounds/music/wild_boys.ogg');
    this.load.image('playbtn', 'assets/images/playbtn.png');
  }

  create() {
    const bgMusic = this.sound.add('wild_boys');
    bgMusic.play();

    const playbutton = this.add.image(0, this.game.renderer.height - 24, 'playbtn').setOrigin(0).setDepth(1);

    this.scene.add(CST.SCENES.GAME, GameService, false);
    playbutton.setInteractive({useHandCursor: true});
    playbutton.on('pointerover', () => {
      console.log('passé au dessus');
    });
    playbutton.on('pointerout', () => {
      console.log('retrait souris');
    });
    playbutton.on('pointerup', () => {
      bgMusic.stop();
      this.scene.start(CST.SCENES.GAME);
    });
  }
}
