import {Component, OnInit} from '@angular/core';
import Phaser from 'phaser';
import {GameService} from './game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  constructor(private mainScene: GameService) {
    this.config = {
      type: Phaser.AUTO,
      scene: [mainScene],
      //pixelArt: true,
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
    this.phaserGame = new Phaser.Game(this.config);
  }

}
