import { Injectable } from '@angular/core';

import { materialColors } from '../../constants/materilal-colors';

@Injectable()
export class ColorService {
  private availableShades: string[] = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
  private materialWhite: string = 'rgba(255, 255, 255, 1)';
  private materialBlack: string = 'rgba(0, 0, 0, 0.87)';
  private materialColors: any[];

  constructor() {
    this.materialColors = materialColors;
  }

  private stringHash(str: string): number {
    let hash = 5381;
    let i = str.length;
    while(i) {
      hash = (hash * 33) ^ str.charCodeAt(--i);
    }
    /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
     * integers. Since we want the results to be always positive, convert the
     * signed int to an unsigned by doing an unsigned bitshift. */
    return hash >>> 0;
  }

  private getColorObj(text: string) {
    let hashedText = (0, this.stringHash)(text);
    let colorIndex = hashedText % this.materialColors.length;

    return this.materialColors[colorIndex];
  }

  public getColor(text: string, shade?: string) {
    let shadeStr = '' + shade;
    if (!this.availableShades.includes(shadeStr)) {
      shadeStr = '500';
    }

    let colorObj = this.getColorObj(text);

    return {
      backgroundColor: colorObj.shades[shadeStr],
      color: parseInt(shadeStr, 10) >= colorObj.whiteBreakpoint ? this.materialWhite : this.materialBlack
    };
  }

  public getMaterialBlack() {
    return this.materialBlack;
  }

  public getMaterialWhite() {
    return this.materialWhite;
  }

}
