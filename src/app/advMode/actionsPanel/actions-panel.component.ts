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

import * as p5 from 'p5';

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
  private p5;

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

  clickOnAction(action: IAction): void {
    console.log('## click on action ', action);
    this.store.dispatch(
      updateLog({ logEntry: { text: 'test', action: 'you made x' } })
    );
  }
  private onWindowResize = (e) => {
    this.p5.resizeCanvas(this.p5.windowWidth, this.p5.windowHeight);
  };

  private createCanvas = () => {
    console.log('creating canvas');
    this.p5 = new p5(this.drawing);
  };
  private drawing = function (p: any) {
    // f5 setup
    p.setup = () => {
      p.createCanvas(300, 500).parent('gear-clock-canvas');
      p.angleMode(p.DEGREES);
      p.rectMode(p.CENTER);
      p.background(0);
    };
    p.center = { x: 0, y: 0 };
    // f5 draw
    p.draw = () => {
      p.background(0);
      p.center.x = p.width / 2;
      p.center.y = p.height / 2;

      let hr = p.hour();
      let mn = p.minute();
      let sc = p.second();
      let ms = p.millis();

      p.push();

      p.translate(p.center.x, p.center.y);
      p.rotate(-90);

      p.strokeWeight(8);
      p.noFill();

      // dail
      p.stroke(175);
      p.arc(0, 0, 210, 210, 0, 360);

      // second
      let sc_end = p.map(sc % 60, 0, 60, 0, 360);

      p.push();
      p.rotate(sc_end);
      p.stroke(255, 0, 0);
      p.line(0, 0, 90, 0);
      p.pop();

      // minute
      let mn_end = p.map(mn % 60, 0, 60, 0, 360);
      p.push();
      p.rotate(mn_end);
      p.stroke(0, 230, 0);
      p.line(0, 0, 70, 0);
      p.pop();

      // hour
      let hr_end = p.map(hr % 12, 0, 12, 0, 360);
      p.push();
      p.rotate(hr_end);
      p.stroke(0, 0, 230);
      p.line(0, 0, 50, 0);
      p.pop();

      // center
      p.fill(255);
      p.noStroke();
      p.ellipse(0, 0, 8, 8);

      p.pop();

      let clock = hr + ':' + mn + ':' + sc;
      p.fill(255);
      p.noStroke();
      p.textSize(14);
      p.text(clock, 100, 50);
    };
  };
  private destroyCanvas = () => {
    console.log('destroying canvas');
    this.p5.noCanvas();
  };
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.createCanvas();
  }
}
