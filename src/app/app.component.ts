import { Component } from "@angular/core";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Platform } from "@ionic/angular";
import { StreamState } from "./interfaces/stream-state";
import { AudioService } from "./services/audio.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private audioService: AudioService
  ) {
    this.initializeApp();

    this.audioService.getState().subscribe((state) => {
      this.state = state;
    });
    this.loadAudio();
  }

  public state: StreamState;

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  loadAudio() {
    this.audioService.playStream("../assets/music.mp3").subscribe();
  }

  public play() {
    this.audioService.play();
  }

  public pauseAudio() {
    this.audioService.pause();
  }

  public rewind() {
    this.audioService.seekTo(this.state.currentTime - 10);
  }
}
