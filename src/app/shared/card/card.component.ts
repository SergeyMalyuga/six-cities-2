import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {OfferPreview} from '../../core/models/offers';
import {CapitalizePipe} from '../pipes/capitalize.pipe';
import {RouterLink} from '@angular/router';
import {AppRoute} from '../../core/constants/const';

@Component({
  selector: 'app-card',
  imports: [
    CapitalizePipe,
    RouterLink
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input({required: true}) offer!: OfferPreview;
  public readonly Math = Math;
  public readonly AppRoute = AppRoute;
}
