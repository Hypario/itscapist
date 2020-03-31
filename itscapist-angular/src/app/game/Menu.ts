import {CST} from './CST';
import {GameService} from './game.service';
import { ApiService } from '../api/api.service';

export class Menu extends Phaser.Scene {
  

  constructor(private api: ApiService) {
    super({
      key: CST.SCENES.MENU
    });
  }

  preload() {
    this.load.audio('wild_boys', ['assets/sounds/music/champions.ogg', "assets/sounds/music/champions.mp3"]);    
    this.load.image('logo_jeu', 'assets/images/logo_jeu.png');
    this.load.image('playbtn', 'assets/images/playbtn.png');
    
  }

  create() {
    let userdata = undefined;
    const bgMusic = this.sound.add('wild_boys');
    bgMusic.play();
    const gamelogo = this.add.image(this.game.renderer.width / 2 - (118 / 2), 0, 'logo_jeu').setOrigin(0).setDepth(1);
    const playbutton = this.add.image(0, this.game.renderer.height - 24, 'playbtn').setOrigin(0).setDepth(1);

    this.scene.add(CST.SCENES.GAME, new GameService(this.api), false);
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
  
    /*
    * Données du client, s'il est connecté :
    */
    if (this.api.isConnected()) {
      this.api.sendWithToken("GET", "/save", undefined).then((response) => {
        return response.json();
      }).then((json) => {
        userdata=json;
      })
    }
  
  
  }

}
