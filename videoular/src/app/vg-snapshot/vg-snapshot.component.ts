import {Component, inject, ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';
import {IPlayable, VgApiService} from "@videogular/ngx-videogular/core";
import {firstValueFrom} from "rxjs";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'vg-snapshot',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './vg-snapshot.component.html',
  styleUrls: ['./vg-snapshot.component.scss'],
})
export class VgSnapshotComponent {

  private vgService = inject(VgApiService);

  public captureImage() {
    const player: IPlayable = this.vgService.getDefaultMedia()
    console.log('media', player);
    const width = player.elem.videoWidth as number;
    const height = (player.elem.videoHeight as number);
    const canvas = Object.assign(document.createElement('canvas'), {width, height});

    const img = new Image();
    //Security! See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image#security_and_tainted_canvases
    img.crossOrigin = 'Anonymous';
    img.onload = this.drawCanvasImage(canvas, width, height, player, img);
  }

  private drawCanvasImage(canvas: HTMLCanvasElement, width: number, height: number, player: any, img: HTMLImageElement): null {
    const canvasCtx = canvas.getContext('2d');
    canvasCtx?.drawImage(player.elem, 0, 0, width, height + 20);
    img.src = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const screenShotImg = img.src.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
    this.saveScreenshot(screenShotImg);
    //To circumvent type errors
    return null;
  }

  private async saveScreenshot(image: any) {
    //TODO: This does not work with this.gameInfo as intended as it keeps the old data from the first watched video
    // and therefore this.gameInfo points on the wrong data giving the wrong filename for the taken screenshot
    const videoFileName = "xy"
    const saveLink = document.createElement('a');
    saveLink.href = image;
    saveLink.download = videoFileName + '_snapshot.png';
    const event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null as any);
    saveLink.dispatchEvent(event);
  }
}
