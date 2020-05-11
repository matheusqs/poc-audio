import { Component } from '@angular/core';
import { AudioService } from './services/audio.service';
import { StreamState } from './interfaces/stream-state';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public audio = new Audio();
  private state: StreamState;

  constructor(private audioService: AudioService) {
    this.audioService.getState().subscribe((state) => {
      this.state = state;
    });
    this.playStream();
  }

  playStream() {
    this.audioService.playStream('../../assets/music.mp3').subscribe(events => {
    });
  }

  public play() {
    if (this.state.playing) {
      this.audioService.pause();
    } else {
      this.audioService.play();
    }
  }

  public rewind() {
    this.audioService.seekTo(this.state.currentTime - 10);
  }

  public delete() {
    this.audio.src = '';
  }

  // public load() {
  //   this.audio.src =  ;
  //   this.audio.load();
  // }
}
