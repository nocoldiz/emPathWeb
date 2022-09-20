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
  createCanvas,
  strokeWeight,
  background,
  rect,
  noStroke,
  line,
} from 'p5';
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
  private ctx: CanvasRenderingContext2D;

  img: string = '';
  sampleImage;
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  WFC;

  readyToGenerate = false;
  finished = false;

  steps = 100;
  avg_steps = 0;
  rendered_frames = 0;
  url_params;
  tileH;
  tileW;
  tileSpacing;
  tileBorderRadius;
  sw;
  widthDivider;
  heightDivider;
  background_color = '#0f0f25';
  displayBackgroundTiles = true;
  main_timer = 0;
  total_collapse_count = 0;
  width = 200;
  height = 300;

  drawCell;

  setup() {
    this.canvas = createCanvas(100, 200);
    // randomSeed(0);
    this.displayBackgroundTiles = true;
    //  this.createDrawCell();

    const imagePath = `data/${this.url_params.pattern || 'demo-3'}.png`;
    /*
    this.sampleImage = loadImage(imagePath, this.createField, () => {
      alert("Image couldn't be loaded );");
    });*/
  }
  draw() {
    if (this.readyToGenerate) {
      let time_start = performance.now();

      for (let row of this.WFC.grid) for (let elt of row) elt.display();

      let i = 0;
      if (!this.finished)
        while (i++ < 1000) {
          this.WFC.updateStep();

          if (i % 10 == 0) if (performance.now() - time_start > 33.3) break;
        }
      this.avg_steps += i;
      // WFC.updateChunk();/

      this.rendered_frames++;

      // if (finished) {
      //   randomSeed(0);
      //   createField();
      //   finished = !finished;
      // }
    } else {
      background(0, 10, 60);
    }
  }
  createField = async (_) => {
    const N = Number(this.url_params.n || '3');
    const symmetry = Number(this.url_params.symmetry || '1');
    Field.createFromImage(
      this.sampleImage,
      N,
      symmetry,
      Math.floor(
        Math.floor(this.width / this.widthDivider) / this.sampleImage.width + 1
      ) * this.sampleImage.width,
      Math.floor(this.height / this.heightDivider)
    ).then((field) => {
      this.WFC = field;
      this.WFC.seed();

      this.readyToGenerate = true;
      background(this.background_color);

      this.tileW = this.width / Math.floor(this.width / this.widthDivider);
      this.tileH = this.height / Math.floor(this.height / this.heightDivider);
      this.tileSpacing = Math.min(this.tileH, this.tileW) / 8;
      this.tileBorderRadius = this.tileSpacing * 1.3;
      this.sw = (this.tileW - this.tileSpacing) / 4;

      console.log('Succesfully finished loading...');
      console.log({ width: this.WFC.W, height: this.WFC.H });
      this.main_timer -= performance.now();
    });
  };

  createDrawCell = (): void => {
    if (Number(this.url_params.stitches || '0')) {
      this.widthDivider = 28;
      this.heightDivider = 22;
      this.drawCell = (x, y, w, h, b = false) => {
        x = x + this.tileSpacing / 2;
        y = y + this.tileSpacing / 2;
        w = w - this.tileSpacing;
        strokeWeight(b ? this.sw + 1 : this.sw);
        line(
          x + this.sw / 2 - w / 32,
          y + this.sw / 2,
          x - this.sw / 2 + w / 2 - this.sw / 16,
          y + h
        );
        line(
          x - this.sw / 2 + w + w / 32,
          y + this.sw / 2,
          x + this.sw / 2 + w / 2 + this.sw / 16,
          y + h
        );
      };
    } else {
      this.widthDivider = 24;
      this.heightDivider = 24;
      this.drawCell = (x, y, w, h, b = false) => {
        noStroke();
        b
          ? rect(x, y, w, h, this.tileBorderRadius)
          : rect(
              x + this.tileSpacing / 2,
              y + this.tileSpacing / 2,
              w - this.tileSpacing,
              h - this.tileSpacing,
              this.tileBorderRadius
            );
      };
    }
  };

  // public actions: IAction[] = [];
  /*
  public sceneUpdate$ = this.store.select(getScene);
  public actions$ = this.store.select(getScene);

  public place$ = this.store.select(getPlace).subscribe((place: IPlace) => {
    console.log(place);
    this.title = place.name;

    this.text = place.description;
    this.store.dispatch(
      setScene({ title: place.name, text: place.description })
    );
    place?.actions.forEach((actionId) => {
      let placeAction = actions.find((action) => action.id === actionId);
      this.actions.push(placeAction);
      //this.store.dispatch(pushAction({ action: placeAction }));

      console.log('place?.actions', actionId, placeAction);
    });
  });
  public activeAction$ = this.store.select(getActiveAction).subscribe((id) => {
    console.log('## active action', id);
  });
*/
  clickOnAction(action: IAction): void {
    console.log('## click on action ', action);
    this.store.dispatch(
      updateLog({ logEntry: { text: 'test', action: 'you made x' } })
    );
  }

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(0, 0, 5, 5);

    this.setup();
  }
}
