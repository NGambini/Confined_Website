import { Observable } from "rxjs/Observable";
import { Http } from "@angular/http";
import { Inject, Injectable } from "@angular/core";
import "rxjs/add/observable/of";

import * as _ from "lodash";

import { TeamService } from "./team.service";
import { MemberModel } from "./member.model";

@Injectable()
export class TeamServiceMock implements TeamService {
    constructor(@Inject(Http) private http: Http) { }

    public getMembers(): Observable<Array<MemberModel>> {
        return this.http.request("content/jsondata/team.json")
                 .map(res => res.json());
    }
}
