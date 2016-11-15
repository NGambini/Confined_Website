import { Component, OnInit, Input } from "@angular/core";
import { TranslateService } from "ng2-translate/ng2-translate";

import { Languages } from "../common/languages.enum";
import { NewsModel } from "./news.model";
import { NewsServiceMock } from "./news.service.mock";

declare var __moduleName: string;

@Component({
    moduleId: __moduleName,
    providers: [NewsServiceMock],
    selector: "news-page",
    templateUrl: "news.component.html"
})

export class NewsComponent implements OnInit {
    @Input()
    private selectedLanguage: Languages;
    private news: Array<NewsModel>;
    constructor(private _translateService: TranslateService,
                private _newsService: NewsServiceMock) {}

    public ngOnInit() {
        this.selectedLanguage = Languages.English;
        this._newsService.getNews().subscribe(news => this.news = news,
                                              error => { console.log(error); },
                                              () => undefined);
    }

    public isSelectedLanguage(locale: string) {
    if (this._translateService.currentLang === "en" && locale === "English" ||
        this._translateService.currentLang === "fr" && locale === "French") {
        return true;
    }

        return false;
    }
}
