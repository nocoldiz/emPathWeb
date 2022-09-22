// We import not only "Injectable", but "Inject" too, from @angular/core
import { Injectable, Inject } from '@angular/core';
// We import DOCUMENT from @angular/common
import { DOCUMENT } from '@angular/common';

@Injectable()
export class MapService {
  constructor(@Inject(DOCUMENT) private document: HTMLDocument) {}

  createImage() {
    let cv = this.document.createElement('canvas');
    cv.id = 'mycanvas';
    cv.width = 300;
    cv.height = 200;

    console.log('the canvas:' + cv);
    console.log(cv);
    let ctx: CanvasRenderingContext2D = cv.getContext(
      '2d'
    ) as CanvasRenderingContext2D;

    console.log(this.document.body, ctx);

    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'black';
    ctx.fillRect(10, 5, 200, 50);
    ctx.fillStyle = 'yellow';
    ctx.fillRect(60, 35, 100, 40);
    return ctx.canvas.toDataURL();
  }
}
