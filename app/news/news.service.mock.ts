import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";

import { Languages } from "../common/languages.enum";
import { NewsService } from "./news.service";
import { NewsTranslationModel, NewsModel } from "./news.model";

export class NewsServiceMock implements NewsService {
    private static mockedNews: Array<NewsModel> = [
        new NewsModel("31/01/01", "artworks", [
            new NewsTranslationModel(
            Languages.English,
            "English Title",
            `ENGLISH Laborum ut duis eu sunt amet ad officia.
            Irure ex inlaboris laborum anim sint ullamco laboris nostrud ea.
            Sint excepteur ad ipsum Lorem deserunt incididunt mollit velit officia velit enim.`),
            new NewsTranslationModel(
            Languages.French,
            "French Title",
            `FRENCH Laborum ut duis eu sunt amet ad officia.
            Irure ex inlaboris laborum anim sint ullamco laboris nostrud ea.
            Sint excepteur ad ipsum Lorem deserunt incididunt mollit velit officia velit enim.`),
        ], []),
        new NewsModel("02/03/01", "anouncement", [
            new NewsTranslationModel(
            Languages.English,
            "English Title - news 2",
            `ENGLISH Laborum ut duis eu sunt amet ad officia.
            Irure ex inlaboris laborum anim sint ullamco laboris nostrud ea.
            Sint excepteur ad ipsum Lorem deserunt incididunt mollit velit officia velit enim.`),
            new NewsTranslationModel(
            Languages.French,
            "French Title - news 2",
            `FRENCH Laborum ut duis eu sunt amet ad officia.
            Irure ex inlaboris laborum anim sint ullamco laboris nostrud ea.
            Sint excepteur ad ipsum Lorem deserunt incididunt mollit velit officia velit enim.`),
        ], [])];



    public getNews(): Observable<Array<NewsModel>> {
        return Observable.of(NewsServiceMock.mockedNews);
    }
}
