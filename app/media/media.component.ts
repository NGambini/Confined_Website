import { Component, OnInit } from "@angular/core";

import { MediaModel } from "./media.model";
import { MediaServiceMock } from "./media.service.mock";

import * as _ from "lodash";
import * as $ from "jquery";

declare var __moduleName: string;

@Component({
    moduleId: __moduleName,
    selector: "media-page",
    templateUrl: "media.component.html",
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

    public get screenshots(): Array<MediaModel> {
        return _.filter(this.medias, function(m)  { return m.isVideo === false; });
    }

    public get videos(): Array<MediaModel> {
        return _.filter(this.medias, function(m)  { return m.isVideo === true; });
    }

    public playPauseVideo(id: number) {
        $("#video_" + id).get(0).play();
    }
}
