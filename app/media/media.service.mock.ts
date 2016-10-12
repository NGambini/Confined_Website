import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";

import { Languages } from "../common/languages.enum";
import { MediaService } from "./media.service";
import { MediaModel } from "./media.model";

export class MediaServiceMock implements MediaService {
    private static mockedNews: Array<MediaModel> = [
            new MediaModel("retard fish",
            "content/images/media/images/1.jpg",
            "content/images/media/images/1_thumb.jpg",
            false),
            new MediaModel("retard fish",
            "content/images/media/images/2.jpg",
            "content/images/media/images/2_thumb.jpg",
            false),
            new MediaModel("retard fish",
            "content/images/media/images/3.jpg",
            "content/images/media/images/3_thumb.jpg",
            false),
            new MediaModel("retard fish",
            "content/images/media/images/4.jpg",
            "content/images/media/images/4_thumb.jpg",
            false),
        ];

    public getNews(): Observable<Array<MediaModel>> {
        return Observable.of(MediaServiceMock.mockedNews);
    }
}
