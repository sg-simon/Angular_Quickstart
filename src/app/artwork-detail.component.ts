/**
 * Created by simonletort on 2/20/17.
 */
// Keep the Input import for now, we'll remove it later:
import 'rxjs/add/operator/switchMap';

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { Artwork } from "./artwork";
import { ArtworkService } from './artwork.service';


@Component({
  moduleId: module.id,
  selector: 'my-artwork-detail',
  templateUrl: 'artwork-detail.component.html',
  styleUrls: [ 'artwork-detail.component.css' ]
})

export class ArtworkDetailComponent implements OnInit{
  artwork: Artwork;

  constructor(
    private artworkService: ArtworkService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.artworkService.getArtwork(+params['id']))
      .subscribe(artwork => this.artwork = artwork);
  }

  save(): void {
    this.artworkService.update(this.artwork)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
