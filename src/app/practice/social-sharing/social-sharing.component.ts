import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-social-sharing',
  templateUrl: './social-sharing.component.html',
  styleUrls: ['./social-sharing.component.scss'],
})
export class SocialSharingComponent implements OnInit {

  
  range = new FormGroup({
    // start: new FormControl<Date | null>(null),
    // end: new FormControl<Date | null>(null),
    start: new FormControl(null),
    end: new FormControl(null),
  });

  
  constructor(private _title: Title, private _metaTagsSvc: Meta) {}

  ngOnInit(): void {
    this._title.setTitle('A test title');
    // this._metaTagsSvc.addTags([
    //   {name:'keywords', content: 'Angular social sharing'},
    //   {name:'description', content: 'test description for this project'}
    // ])
    this._metaTagsSvc.updateTag({
      name: 'keywords',
      content: 'Angular social sharing',
    });
    this._metaTagsSvc.updateTag({
      name: 'description',
      content: 'test description for this project',
    });
    this._metaTagsSvc.updateTag({
      property: 'og:url',
      content: 'http://www.dosgamesworld.com/game/pop',
    });

    //   meta property="fb:app_id" content="1596858517136240">
    //   <meta property="og:url" content="http://www.dosgamesworld.com/game/pop">
    //   <meta property="og:type" content="website">
    //   <meta property="og:title" content="DOS Games World - Prince of Persia">
    //   <meta property="og:description" content="Prince of Persia is one of the most famous and entertaining games of all time. The game is a fantasy cinematic platformer, which takes place in Ancient Persia. ">
    //   <meta property="og:image" content="http://www.dosgamesworld.com/assets/images/pop.png">
    // <meta property="og:image:type" content="image/png">
    // <meta property="og:image:width" content="320">
    // <meta property="og:image:height" content="200">
  }
}
