import {CST} from "./CST";
import { GameService } from './game.service';

export class Menu extends Phaser.Scene {

    constructor() {
        super({
            key: CST.SCENES.MENU
        })
    }
    init(data) {
        console.log(data)
        console.log("menu !")
    }
    preload() {
        let audiomanage = this.game.sound;

        this.load.audio("wild_boys","assets/sounds/music/wild_boys.ogg");
        console.log(audiomanage); 

    }
    create() {
        this.sound.add("wild_boys").play();

        //this.add.image()
        

        
        let playbutton = this.add.text(this.game.renderer.width/2, this.game.renderer.height/2, "Jouer au jeu").setDepth(1)

        this.scene.add(CST.SCENES.GAME, GameService, false);
        playbutton.setInteractive({ useHandCursor: true })
        playbutton.on("pointerover", ()=> {
            console.log("passé au dessus")
        })
        playbutton.on("pointerout",() => {
            console.log("retrait souris")
        })
        playbutton.on("pointerup",() => {
            this.scene.start(CST.SCENES.GAME);
        })
        //
    }
}