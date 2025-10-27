import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Offer, OfferPreview} from '../models/offers';
import {Observable} from 'rxjs';
import {APIRoute} from '../constants/const';

@Injectable(
  {
    providedIn: 'root',
  }
)
export class OfferService {
  private http: HttpClient = inject(HttpClient);

  public getOffers(): Observable<OfferPreview[]> {
    return this.http.get<OfferPreview[]>(APIRoute.OFFERS);
  }

  public getOffer(offerId: string): Observable<Offer> {
    return this.http.get<Offer>(`${APIRoute.OFFERS}/${offerId}`)
  }

  public getNearbyOffers(offerId: string): Observable<OfferPreview[]> {
    return this.http.get<OfferPreview[]>(`${APIRoute.OFFERS}/${offerId}/nearby`);
  }
}
