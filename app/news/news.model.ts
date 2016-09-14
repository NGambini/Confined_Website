import * as _ from "lodash";

import { Languages } from "../common/languages.enum";

export class NewsTranslationModel {
    public constructor(
        public locale: Languages,
        public title: string,
        public content: string) {}
}

export class NewsModel {
    public constructor(
        public date: string,
        public category: string,
        public translations: Array<NewsTranslationModel>,
        public imagesUrl: Array<string>) { }

    public getTranslation(lang: Languages): NewsTranslationModel {
        return _.find(this.translations, { locale: lang });
    }
}
