import { Component, OnInit } from "@angular/core";

import { MediaModel } from "./media.model";
import { MediaServiceMock } from "./media.service.mock";

import * as _ from "lodash";

declare var $:any;

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
        let nativeElem = $("#video_" + id).get(0);

        if (nativeElem.paused) {
            nativeElem.play();
        }
        else {
            nativeElem.pause();
        }
    }

    public toggleFullScreenVideo(id: number) {
        let nativeElem = $("#video_" + id).get(0);

        if (nativeElem.requestFullscreen) {
            nativeElem.requestFullscreen();
        } else if (nativeElem.mozRequestFullScreen) {
            nativeElem.mozRequestFullScreen();
        } else if (nativeElem.webkitRequestFullscreen) {
            nativeElem.webkitRequestFullscreen();
        }
    }

    public toggleMute(id: number) {
        let nativeElem = $("#video_" + id).get(0);

        nativeElem.muted = !nativeElem.muted;
    }

    public setVolume(id: number) {
        let nativeElem = $("#video_" + id).get(0);
        let val = $("#video_sound_slider_" + id).get(0).value;

        nativeElem.volume = parseInt(val, 10);
    }

    public setPosition(id: number) {
        let nativeElem = $("#video_" + id).get(0);
        let sliderVal = $("#video_pos_slider_" + id).get(0).value;

        nativeElem.currentTime = nativeElem.duration * parseFloat(sliderVal);
    }
}
