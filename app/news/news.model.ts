import * as _ from "lodash";

import { Languages } from "../common/languages.enum";

export class NewsTranslationModel {
    public constructor(
        public locale: string,
        public title: string,
        public content: string) {}
}

export class ImageModel {
    public constructor(
        public title: string,
        public url: string,
        public thumbUrl: string
    ) {}
}

export class NewsModel {
    public constructor(
        public id: number,
        public date: string,
        public category: string,
        public translations: Array<NewsTranslationModel>,
        public imagesUrl: Array<ImageModel>) { }

    public getTranslation(lang: Languages): NewsTranslationModel {
        return _.find(this.translations, { locale: lang });
    }
}
