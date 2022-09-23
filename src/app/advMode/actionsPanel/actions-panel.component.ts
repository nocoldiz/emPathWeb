import {
  IWaveFunctionCollapse,
  MapService,
} from './../../services/map.service';
import { barBackground } from './../../../@youpez/data/charts';
import { IAction } from '../../interfaces/events.interface';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { updateLog } from '../../store/scene/scene.actions';
import { IItem } from 'src/app/interfaces/inventory.interface';
import { INpc } from 'src/app/interfaces/npc.interface';
import { IPlace } from 'src/app/interfaces/places.interface';
import { Console } from 'console';

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
  private ctx: CanvasRenderingContext2D;
  private key: string;
  positionY: number = 0;
  positionX: number = 0;
  tileSize = 16;
  img: string = '';
  sampleImage;
  inputBitmap: ImageData | undefined;
  wfc: IWaveFunctionCollapse | undefined;

  @ViewChild('mapContainer', { static: true })
  mapContainer: ElementRef<HTMLCanvasElement>;

  @ViewChild('eventContainer') eventContainer: ElementRef;

  @HostListener('document:keypress', ['$event'])

  /**
   * Description
   * @param {KeyboardEvent} event
   * @returns {any}
   */
  handleKeyboardEvent(event: KeyboardEvent) {
    let collisionMap = this.mapService.getCollisionMap();
    // console.log(collisionMap);
    //TODO: cycle collisionMap before moving if this.positionX && this.positionY
    switch (event.key) {
      case 'a':
        this.positionX -= this.tileSize;
        break;
      case 'd':
        this.positionX += this.tileSize;
        break;
      case 's':
        this.positionY += this.tileSize;
        break;
      case 'w':
        this.positionY -= this.tileSize;
        break;
    }
    console.log(this.positionX, this.positionY);
    this.mapService.movePlayer(
      this.eventContainer.nativeElement,
      this.positionX,
      this.positionY
    );
    //player position
  }

  /**
   * getImageData
   * @param {string} url
   * @returns {any}
   */
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
    const canvas = this.mapContainer.nativeElement;
    let map = [[]];
    const wfcOptions = {
      N: 3,
      symmetry: 1,
      ground: 0,
      periodicInput: true,
      periodicOutput: true,
      outputWidth: size,
      outputHeight: size,
    };

    // canvas.className = 'wfcOutput';
    this.ctx.canvas.width = size;
    this.ctx.canvas.height = size;
    //this.mapContainer.nativeElement.append(canvas);

    this.getImageData('./assets/img/wfc/' + img + '.png').then((image) => {
      this.wfc = this.mapService.createWaveFunctionCollapse(
        image,
        canvas,
        wfcOptions,
        this.place.id,
        map
      );
    });
  }

  constructor(private store: Store<AppState>, private mapService: MapService) {}

  ngOnInit(): void {
    this.ctx = this.mapContainer.nativeElement.getContext('2d');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.place) {
      this.wfc.stop();
      this.generateMap(
        changes.place.currentValue.size || 32,
        changes.place.currentValue.map || 'Town'
      );
    }
  }

  ngAfterViewInit() {
    this.generateMap(this.place?.size || 32, this.place?.map || 'Town');
    let collisionMap = this.mapService.getCollisionMap();
    console.log(collisionMap);
  }
}
