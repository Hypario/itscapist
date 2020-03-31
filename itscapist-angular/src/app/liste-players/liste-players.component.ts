import { Component, OnInit } from '@angular/core';
import {Player} from '../game/Player';
//import {PlayersService} from '../../players.service';


@Component({
  selector: 'app-liste-players',
  templateUrl: './liste-players.component.html',
  styleUrls: ['./liste-players.component.scss']
})
export class ListePlayersComponent implements OnInit {
  loading = false;
  players: Player[];
  constructor() { }

  ngOnInit() {
    this.loading = true;
  /*  this.playersService.getPlayers().subscribe(rep => {
//      console.log(rep);
      this.players = rep;
      this.loading = false;
    });*/
    this.loading=false;
  }

}
