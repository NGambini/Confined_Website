import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";
import { Inject, Injectable } from "@angular/core";

import "rxjs/add/observable/of";

import { Languages } from "../common/languages.enum";
import { NewsService } from "./news.service";
import { NewsTranslationModel, NewsModel, ImageModel } from "./news.model";

export class NewsServiceMock implements NewsService {
    constructor(@Inject(Http) private http: Http) { }

    public getNews(): Observable<Array<NewsModel>> {
        return this.http.request("content/jsondata/news.json")
                 .map(res => res.json());
    }
}
