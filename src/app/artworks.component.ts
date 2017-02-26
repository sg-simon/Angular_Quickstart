import {Component, OnInit} from '@angular/core';
import { Router }            from '@angular/router';

import {Artwork} from './artwork';
import {ArtworkService} from './artwork.service';

@Component({
  moduleId: module.id,
  selector: 'my-artworks',
  providers: [ArtworkService],
  templateUrl: 'artworks.component.html',
  styleUrls: [ 'artworks.component.css' ]
})

export class ArtworksComponent implements OnInit{
  title = "Family";
  artworks: Artwork[];
  selectedArtwork: Artwork;

  constructor(
    private router: Router,
    private artworkService: ArtworkService) { }

  getArtworks(): void {
    this.artworkService.getArtworks().then(artworks => this.artworks = artworks); //promise from artwork.service
  }

  ngOnInit(): void {
    this.getArtworks();
  }

  onSelect(artwork: Artwork): void {
    this.selectedArtwork = artwork;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedArtwork.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.artworkService.create(name)
      .then(artwork => {
        this.artworks.push(artwork);
        this.selectedArtwork = null;
      });
  }

  delete(artwork: Artwork): void {
    this.artworkService
      .delete(artwork.id)
      .then(() => {
        this.artworks = this.artworks.filter(h => h !== artwork);
        if (this.selectedArtwork === artwork) { this.selectedArtwork = null; }
      });
  }

}



