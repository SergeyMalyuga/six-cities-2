import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {OfferPreview} from '../../core/models/offers';
import {CapitalizePipe} from '../pipes/capitalize.pipe';

@Component({
  selector: 'app-card',
  imports: [
    CapitalizePipe
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input({required: true}) offer!: OfferPreview;
  protected readonly Math = Math;
}
