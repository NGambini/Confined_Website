import { Component, OnInit, Input } from "@angular/core";
import { TranslateService } from "ng2-translate/ng2-translate";

import { Languages } from "../common/languages.enum";
import { MemberModel } from "./member.model";
import { TeamServiceMock } from "./team.service.mock";

declare var __moduleName: string;

@Component({
    moduleId: __moduleName,
    providers: [TeamServiceMock],
    selector: "team-page",
    templateUrl: "team.component.html"
})

export class TeamComponent implements OnInit {
    @Input()
    private selectedLanguage: Languages;
    private members: Array<MemberModel>;
    constructor(
        private _translateService: TranslateService,
        private _teamService: TeamServiceMock) {}

    public ngOnInit() {
        this.selectedLanguage = Languages.English;
        this._teamService.getMembers().subscribe(members => this.members = members,
                                              error => { console.log(error); },
                                              () => undefined);
    }

    public isSelectedLanguage(locale: string) {
        if (this._translateService.currentLang == 'en' && locale == 'English' || this._translateService.currentLang == 'fr' && locale == 'French')
            return true;
        return false;
    }
}