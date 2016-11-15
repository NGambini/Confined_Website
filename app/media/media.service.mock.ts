import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";
import { Inject, Injectable } from "@angular/core";
import "rxjs/add/observable/of";

import { MediaService } from "./media.service";
import { MediaModel } from "./media.model";

export class MediaServiceMock implements MediaService {
   constructor(@Inject(Http) private http: Http) { }

    public getMedias(): Observable<Array<MediaModel>> {
        return this.http.request("content/jsondata/media.json")
                 .map(res => res.json());
    }
}
