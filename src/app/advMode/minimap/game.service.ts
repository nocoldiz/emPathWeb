import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { IWaveFunctionCollapse, MapService } from "src/app/services/map.service";
import { AppState } from "src/app/store/app.state";
import { getPlace } from "src/app/store/scene/scene.selectors";

@Injectable()
export default class MainScene extends Phaser.Scene {
    map: Phaser.Tilemaps.Tilemap;
    wfc: IWaveFunctionCollapse | undefined;
    tileset: any;
    tiles: any;
    layer: any;
    player: any;
    place$;

    constructor(private store: Store<AppState>, private mapService: MapService) {
        //super(config)
        super({ key: 'main' });
        console.log(this)

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