import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {VgApiService, VgCoreModule} from "@videogular/ngx-videogular/core";
import {VgControlsModule} from "@videogular/ngx-videogular/controls";
import {VgOverlayPlayModule} from "@videogular/ngx-videogular/overlay-play";
import {VgBufferingModule} from "@videogular/ngx-videogular/buffering";
import {VgSnapshotComponent} from "./vg-snapshot/vg-snapshot.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, VgCoreModule, VgControlsModule, VgOverlayPlayModule, VgBufferingModule, VgSnapshotComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'videoular';
  public source = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  private vgService = inject(VgApiService);

  public play (){
    this.vgService.play();
    console.log('pausing',this.vgService.state)

  }

  public change (){
    this.source = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  }
}
