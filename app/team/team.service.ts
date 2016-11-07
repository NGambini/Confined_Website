import { Observable } from "rxjs/Observable";
import { MemberModel } from "./member.model";

/* Service responsible for fetching screenshots URL */
export interface TeamService {
    getMembers(): Observable<Array<MemberModel>>;
}
