import {
  IWaveFunctionCollapse,
  MapService,
} from './../../services/map.service';
import { IAction } from '../../interfaces/events.interface';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { IItem } from 'src/app/interfaces/inventory.interface';
import { INpc } from 'src/app/interfaces/npc.interface';
import { IPlace } from 'src/app/interfaces/places.interface';

@Component({
  selector: 'app-actions-panel',
  templateUrl: './actions-panel.component.html',
  styleUrls: ['./actions-panel.component.scss'],
})
export class ActionsPanelComponent implements OnInit {
  @Input() actions: IAction[];
  @Input() items: IItem[];
  @Input() npc: INpc[];
  @Input() place: IPlace;

  img: string = '';
  sampleImage;
  @ViewChild('mapContainer') mapContainer: ElementRef;
  @ViewChild('eventContainer') eventContainer: ElementRef;

  inputBitmap: ImageData | undefined;

  wfc: IWaveFunctionCollapse | undefined;
  getImageData(url: string): Promise<ImageData> {
    const img = document.createElement('img');
    img.src = url;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    return new Promise((resolve, reject) => {
      img.addEventListener('load', () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        resolve(ctx.getImageData(0, 0, canvas.width, canvas.height));
      });
    });
  }

  generateMap(size: number, img: string) {
    const canvas = document.createElement('canvas');
    let map = [[]];
    const wfcOptions = {
      N: 3,
      symmetry: 2,
      ground: 0,
      periodicInput: true,
      periodicOutput: true,
      outputWidth: size,
      outputHeight: size,
    };

    canvas.className = 'wfcOutput';
    canvas.width = size;
    canvas.height = size;
    this.mapContainer.nativeElement.append(canvas);

    this.getImageData('./assets/img/wfc/' + img + '.png').then((image) => {
      this.mapService.createWaveFunctionCollapse(
        image,
        canvas,
        wfcOptions,
        this.place.id,
        map
      );
    });
  }

  constructor(private store: Store<AppState>, private mapService: MapService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.place) {
      this.generateMap(
        changes.place.currentValue.size || 32,
        changes.place.currentValue.map || 'Town'
      );
    }
  }

  ngAfterViewInit() {
    this.generateMap(this.place?.size || 32, this.place?.map || 'Town');
  }
}
