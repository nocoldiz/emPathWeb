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
import Phaser from 'phaser';
class MainScene extends Phaser.Scene {
  map: Phaser.Tilemaps.Tilemap;
  wfc: IWaveFunctionCollapse | undefined;
  tileset: any;
  layer: any;
  player: any;

  constructor(private mapService: MapService) {
    super({ key: 'main' });
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
      console.log("##imageData", image)
      this.wfc = this.mapService && this.mapService.createWaveFunctionCollapse(
        image,
        wfcOptions,
        'test',
        map
      );
    });
  }
  create() {
    //console.log('create method');
    this.map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });
    //this.tileset = this.map.addTilesetImage('tiles', null, 32, 32, 1, 2);
    this.layer = this.map.createLayer(0, this.tileset, 0, 0);
    this.player = this.add.image(32 + 16, 32 + 16, '');
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
  }
  update() {
    // console.log('update method');
    this.mapService && this.mapService.getEventMap();
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
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  private ctx: CanvasRenderingContext2D;
  private key: string;
  positionY: number = 0;
  positionX: number = 0;
  tileSize = 16;
  img: string = '';
  sampleImage;
  inputBitmap: ImageData | undefined;
  wfc: IWaveFunctionCollapse | undefined;
  eventMap: string[][]

  @ViewChild('mapContainer', { static: true })
  mapContainer: ElementRef<HTMLCanvasElement>;


  @HostListener('document:keypress', ['$event'])

  /**
   * Description
   * @param {KeyboardEvent} event
   * @returns {any}
   */
  handleKeyboardEvent(event: KeyboardEvent) {
    let eventMap = this.mapService.getEventMap();
    console.log(this.positionY, this.positionX)
    console.log(eventMap[this.positionY] && eventMap[this.positionY][this.positionX])
    if (this.positionX) {
    }

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
      this.wfc = this.mapService.createWaveFunctionCollapse(
        image,
        wfcOptions,
        this.place.id,
        map
      );
    });
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
    if (changes.place) {
      this.wfc.stop();
      this.tileSize = 512 / this.place.size;
      this.positionX = 512 * 0.5
      this.positionY = 512 * 0.5

      this.generateMap(
        changes.place.currentValue.size || 32,
        changes.place.currentValue.map || 'Town'
      );
    }
  }

  ngAfterViewInit() {
    this.tileSize = 512 / this.place.size;
    this.positionX = 512 * 0.5
    this.positionY = 512 * 0.5
    this.phaserGame = new Phaser.Game(this.config);
    this.generateMap(this.place?.size || 32, this.place?.map || 'Town');
    this.eventMap = this.mapService.getEventMap();
  }
}
