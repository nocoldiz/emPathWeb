import {
  IWaveFunctionCollapse,
  MapService,
} from '../../services/map.service';
import { barBackground } from '../../../@youpez/data/charts';
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
import MainScene from "./game.service"
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { IItem } from 'src/app/interfaces/inventory.interface';
import { INpc } from 'src/app/interfaces/npc.interface';
import { IPlace } from 'src/app/interfaces/places.interface';
import { getPlace } from 'src/app/store/scene/scene.selectors';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { defineCustomElements as defineIonPhaser } from '@ion-phaser/core/loader';
interface GameInstance extends Phaser.Types.Core.GameConfig {
  instance: Phaser.Game
}

@Component({
  selector: 'app-minimap',
  templateUrl: './minimap.component.html',
  styleUrls: ['./minimap.component.scss'],
})
export class MinimapComponent implements OnInit {
  @Input() actions: IAction[];
  @Input() items: IItem[];
  @Input() npc: INpc[];
  @Input() place: IPlace;

  phaser: GameInstance = {
    width: 512,
    height: 512,
    type: Phaser.AUTO,
    scene: [MainScene],
    instance: null,
    pixelArt: true,
  };

  positionY: number = 0;
  positionX: number = 0;
  tileSize = 16;
  img: string = '';
  place$: any

  sampleImage;
  inputBitmap: ImageData | undefined;
  wfc: IWaveFunctionCollapse | undefined;
  eventMap: string[][]
  config: any;
  game: Phaser.Game

  @ViewChild('mapContainer', { static: true })
  mapContainer: ElementRef<HTMLCanvasElement>;

  initialize: boolean;
  phaserGame: any


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
    //const canvas = this.mapContainer.nativeElement;
    const canvas = null;
    let map = [[]];
    const wfcOptions = {
      N: 3,
      symmetry: 8,
      ground: 0,
      periodicInput: true,
      periodicOutput: true,
      outputWidth: size,
      outputHeight: size,
    };

    // canvas.className = 'wfcOutput';
    // this.ctx.canvas.width = size;
    // this.ctx.canvas.height = size;
    //this.mapContainer.nativeElement.append(canvas);

    this.getImageData('./assets/img/wfc/' + img + '.png').then((image) => {
      /*
      this.wfc = this.mapService.createWaveFunctionCollapse(
        image,
        wfcOptions,
        this.place.id,
        map
      );*/
    });
  }
  initializeGame() {
    const context = this
    context.initialize = true
    context.phaserGame = {
      width: 512,
      height: 512,
      type: Phaser.AUTO,
      parent: 'map-container',
      scene: {
        create() {
          console.log("##")
          this.helloWorld = this.add.text(0, 0, 'Hello World')
        },
        update() {
          this.helloWorld.angle += 1;
          console.log(this.helloWorld.angle)
        },
        saveGame() {
          const { angle } = this.helloWorld
          // context.api.saveAngle(angle)
        }
      }
    }
    // this.phaserGame = new Phaser.Game();
  }
  constructor(private store: Store<AppState>, private mapService: MapService) {
    this.config = {
      type: Phaser.AUTO,
      height: 512,
      pixelArt: true,
      width: 512,
      scene: [MainScene],
      parent: 'map-container',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 100 }
        }
      }
    }
  }

  ngOnInit(): void {



  }


  ngOnChanges(changes: SimpleChanges): void {
    /*
    if (changes.place) {
      //this.wfc.stop();
      this.tileSize = 512 / this.place.size;
      this.positionX = 512 * 0.5
      this.positionY = 512 * 0.5

      this.generateMap(
        changes.place.currentValue.size || 32,
        changes.place.currentValue.map || 'Town'
      );
    }*/
  }

  testFunction() {
    console.log("test");
  }

  ngAfterViewInit() {
    this.tileSize = 512 / this.place.size;
    this.positionX = 512 * 0.5
    this.positionY = 512 * 0.5
    this.initializeGame();

    const context = this
    context.initialize = true

    context.phaserGame = new Phaser.Game(this.config);
    context.initialize = true;

    this.generateMap(this.place?.size || 32, this.place?.map || 'Town');
    // this.eventMap = this.mapService.getEventMap();

    // this.phaserGame = new Phaser.Game();
    // this.generateMap(this.place?.size || 32, this.place?.map || 'Town');
    // this.eventMap = this.mapService.getEventMap();
  }
}
