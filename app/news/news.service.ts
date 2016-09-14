import { Observable } from "rxjs/Observable";
import { NewsModel } from "./news.model";

/* Service responsible for fetching news */
export interface NewsService {
    getNews(): Observable<Array<NewsModel>>;
}
