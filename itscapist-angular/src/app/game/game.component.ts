import {Component, OnInit} from '@angular/core';
import Phaser from 'phaser';
import {GameService} from './game.service';
import {Menu} from './Menu';
import {Load} from './Load';
import {NavigationStart, Router} from '@angular/router';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  constructor(private router: Router, private api: ApiService) {
    this.config = {
      type: Phaser.AUTO,
      scene: [new Load(this.api)],
      // @ts-ignore
      pixelArt: true,
      scale: {
        mode: Phaser.Scale.FIT,
        parent: 'gameContainer',
        height: 144,
        width: 256,
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: {y: 0}
        }
      }
    };
  }

  ngOnInit(): void {
    if (!this.phaserGame) {
      this.phaserGame = new Phaser.Game(this.config);
    }
    const canv = document.getElementsByTagName('canvas');

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (canv.length > 0) {
          this.phaserGame.destroy(true);
        }
      }
    });
  }


}
