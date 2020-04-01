import {CST} from './CST';
import {Menu} from './Menu';
import { ApiService } from '../api/api.service';

export class Load extends Phaser.Scene {
  constructor(private api: ApiService) {
    super({
      key: CST.SCENES.LOAD
    });
  }

  init() {
    const loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff
      }
    });
    this.load.on('progress', (percent) => {
      loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50)
    });
    

  }

  preload() {

  }

  create() {
    this.scene.add(CST.SCENES.MENU, new Menu(this.api), true);
    // this.scene.start(CST.SCENES.MENU);
  }
}
