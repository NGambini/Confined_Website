import { Observable } from "rxjs/Observable";
import { MediaModel } from "./media.model";

/* Service responsible for fetching screenshots URL */
export interface MediaService {
    getMedias(): Observable<Array<MediaModel>>;
}
