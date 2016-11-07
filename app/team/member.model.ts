import * as _ from "lodash";

import { Languages } from "../common/languages.enum";

export class BioModel {
        public constructor(
        public locale: Languages,
        public content: string) {}
}

export class MemberModel {
    constructor (
        public name: string,
        public school: string,
        public jobTitles: Array<string>,
        public bios: Array<BioModel>) {}

    public getTranslation(lang: Languages): BioModel {
        return _.find(this.bios, { locale: lang });
    }
}
