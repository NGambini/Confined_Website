import * as _ from "lodash";

export class MediaModel {
    public constructor(
        public title: string,
        public url: string,
        public thumbUrl: string,
        public isVideo: boolean
    ) {}
}