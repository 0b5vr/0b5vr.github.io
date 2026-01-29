import { HistoryMeanCalculator } from '@0b5vr/experimental';

export class FpsCounter {
  private _deltaMean = new HistoryMeanCalculator(60);

  public get fps(): string {
    const averageDelta = this._deltaMean.mean;

    if (averageDelta === 0) {
      return '--.--';
    } else {
      return (1.0 / averageDelta).toFixed(2);
    }
  }

  public update(delta: number): void {
    this._deltaMean.push(delta);
  }
}
