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
      scale: {
        mode: Phaser.Scale.FIT,
        parent: 'gameContainer',
        height: 600,
        width: 800
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: {y: 0}
        }
      },
      backgroundColor: '#5faaff'
    };
  }

  ngOnInit(): void {
    this.phaserGame = new Phaser.Game(this.config);
  }

}
