export class PageModel {
    constructor (
        public title: string,
        public route: string,
        public selected: Boolean = false,
        public hideInMenu: Boolean = false) {}
}