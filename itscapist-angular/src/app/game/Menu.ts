import {CST} from './CST';
import { GameService } from './game.service';

export class Menu extends Phaser.Scene {

    constructor() {
        super({
            key: CST.SCENES.MENU
        });
    }
    init(data) {
        console.log(data);
        console.log('menu !');
    }
    preload() {
        const audiomanage = this.game.sound;

        this.load.audio('wild_boys', 'assets/sounds/music/wild_boys.ogg');
        this.load.image('playbtn',  'assets/images/playbtn.png');
        console.log(audiomanage);

    }
    create() {
        const bg_music = this.sound.add('wild_boys');
        bg_music.play();
        // this.add.image()



        const playbutton = this.add.image(0, this.game.renderer.height - 24, 'playbtn').setOrigin(0).setDepth(1);

        this.scene.add(CST.SCENES.GAME, GameService, false);
        playbutton.setInteractive({ useHandCursor: true });
        playbutton.on('pointerover', () => {
            console.log('passé au dessus');
        });
        playbutton.on('pointerout', () => {
            console.log('retrait souris');
        });
        playbutton.on('pointerup', () => {
            bg_music.stop();
            this.scene.start(CST.SCENES.GAME);
        });
        //
    }
}
