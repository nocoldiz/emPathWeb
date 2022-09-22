import { barBackground } from './../../../@youpez/data/charts';
import { IAction } from '../../interfaces/events.interface';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { updateLog } from '../../store/scene/scene.actions';
import { IItem } from 'src/app/interfaces/inventory.interface';
import { INpc } from 'src/app/interfaces/npc.interface';
import { Field } from './sketch/wfc/wfc.js';
import { IPlace } from 'src/app/interfaces/places.interface';
import {
  IWaveFunctionCollapse,
  createWaveFunctionCollapse,
} from '../wfc/wfc/run';
import { createWfcOptions } from '../wfc/components/wfcOptions';

@Component({
  selector: 'app-actions-panel',
  templateUrl: './actions-panel.component.html',
  styleUrls: ['./actions-panel.component.scss'],
})
export class ActionsPanelComponent implements OnInit {
  @Input() actions: IAction[];
  @Input() items: IItem[];
  @Input() npc: INpc[];
  @Input() place: IPlace[];

  img: string = '';
  sampleImage;
  mapWidth: 32;
  mapHeight: 32;
  map: Array<Array<string>> = [
    ['🌱', '🟦', 'c', '🌱', '🟦', 'c', '🌱', '🟦', 'c', 'c'],
    ['🌱', '🟦', 'c', '🌱', '🟦', 'c', '🌱', '🟦', 'c', 'c'],
    ['🌱', '🟦', 'c', '🌱', '🟦', 'c', '🌱', '🟦', 'c', 'c'],
    ['🌱', '🟦', 'c', '🌱', '🟦', 'c', '🌱', '🟦', 'c', 'c'],
    ['🌱', '🟦', 'c', '🌱', '🟦', 'c', '🌱', '🟦', 'c', 'c'],
    ['🌱', '🟦', 'c', '🌱', '🟦', 'c', '🌱', '🟦', 'c', 'c'],
  ];
  @ViewChild('mapContainer') mapContainer: ElementRef;

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

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    const canvas = document.createElement('canvas');
    const size = 32;
    const wfcOptions = {
      N: 3,
      symmetry: 8,
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

    this.getImageData('./assets/img/wfc/Qud.png').then((image) => {
      this.wfc = createWaveFunctionCollapse(image, canvas, wfcOptions);
    });
  }
}
