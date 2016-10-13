import { Component, OnInit } from '@angular/core';

import { MediaModel } from './media.model';
import { MediaServiceMock } from './media.service.mock';

import * as _ from "lodash";

declare var __moduleName: string;

@Component({
    moduleId: __moduleName,
    selector: 'media-page',
    templateUrl: 'media.component.html',
    providers: [MediaServiceMock]
})

export class MediaComponent implements OnInit {
    private medias: Array<MediaModel>;
    private screensInRow = 3;

    constructor(private _mediaService: MediaServiceMock) {}

    public ngOnInit() {
        this._mediaService.getNews().subscribe(medias => this.medias = medias,
                                                    error => { console.log(error); },
                                                    () => undefined);
    }

    public get screenshotsAsRows(): Array<Array<MediaModel>> {
        return _.chunk(_.filter(this.medias, function(m)  { return m.isVideo === false}), this.screensInRow);
    }
}