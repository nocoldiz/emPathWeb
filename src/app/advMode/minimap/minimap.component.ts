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


export default class MainScene extends Phaser.Scene {
  place$: any
  map: Phaser.Tilemaps.Tilemap;
  wfc: IWaveFunctionCollapse | undefined;
  tileset: any;
  tiles: any;
  layer: any;
  player: any;

  constructor() {
    //super(config)
    super({ key: 'main' });
    console.log(this);

  }
  helloWorld: Phaser.GameObjects.Text

  init() {
    this.cameras.main.setBackgroundColor('#24252A');
    console.log("## iNIT")
    console.log(this);

  }



  setAngle(angle: number) {
    this.helloWorld.angle = angle;
  }
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
    let map = [];
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
    //this.mapContainer.nativeElement.append(canvas);

    this.getImageData('./assets/img/wfc/' + img + '.png').then((image) => {
      /*
      this.wfc = this.mapService && this.mapService.createWaveFunctionCollapse(
        image,
        wfcOptions,
        'test',
        map
      );*/
    });
  }
  create() {
    this.helloWorld = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "Hello World", {
      font: "40px Arial",
      color: "#ffffff"
    }
    );
    this.helloWorld.setOrigin(0.5);


    this.place$.subscribe(() => {
      console.log("## place has changed00");

    });
    var level = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 2, 3, 0, 0, 0, 1, 2, 3, 0],
      [0, 5, 6, 7, 0, 0, 0, 5, 6, 7, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 14, 13, 14, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 14, 14, 14, 14, 14, 0, 0, 0, 15],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15],
      [35, 36, 37, 0, 0, 0, 0, 0, 15, 15, 15],
      [39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39]
    ]

    //console.log('create method');
    this.map = this.make.tilemap({ data: level, tileWidth: 16, tileHeight: 16 });
    //this.tileset = this.map.addTilesetImage('tiles', null, 32, 32, 1, 2);
    this.tiles = this.map.addTilesetImage('mario-tiles');
    this.player = this.add.image(32 + 16, 32 + 16, '');
    this.layer = this.map.createLayer(0, this.tiles, 0, 0);
    console.log(this.layer);
    var size = 15;
    this.generateMap(32, 'Village')

    //  Left
    this.input.keyboard.on('keydown-A', function (event) {

      var tile = this.layer.getTileAtWorldXY(this.player.x - 32, this.player.y, true);

      if (tile.index === 2) {
        //  Blocked, we can't move
      }
      else {
        this.player.x -= 32;
        this.player.angle = 180;
      }

    });

    //  Right
    this.input.keyboard.on('keydown-D', function (event) {

      var tile = this.layer.getTileAtWorldXY(this.player.x + 32, this.player.y, true);

      if (tile.index === 2) {
        //  Blocked, we can't move
      }
      else {
        this.player.x += 32;
        this.player.angle = 0;
      }

    });

    //  Up
    this.input.keyboard.on('keydown-W', function (event) {

      var tile = this.layer.getTileAtWorldXY(this.player.x, this.player.y - 32, true);

      if (tile.index === 2) {
        //  Blocked, we can't move
      }
      else {
        this.player.y -= 32;
        this.player.angle = -90;
      }

    });

    //  Down
    this.input.keyboard.on('keydown-S', function (event) {

      var tile = this.layer.getTileAtWorldXY(this.player.x, this.player.y + 32, true);

      if (tile.index === 2) {
        //  Blocked, we can't move
      }
      else {
        this.player.y += 32;
        this.player.angle = 90;
      }

    });
  }
  preload() {
    // console.log('preload method');
    this.load.image('mario-tiles', 'assets/tileset/super-mario.png');

  }
  update() {
    // console.log('update method');
    // this.mapService && this.mapService.getEventMap();
  }
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

  @ViewChild('mapContainer', { static: true })
  mapContainer: ElementRef<HTMLCanvasElement>;
  initialize: boolean;


  phaserGame: Phaser.Game;


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

  constructor(private store: Store<AppState>, private mapService: MapService) {
    this.place$ = this.store.select(getPlace);


    this.config = {
      type: Phaser.AUTO,
      height: 512,
      test: this.place$,
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
