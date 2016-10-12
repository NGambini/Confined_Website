import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { TranslateService } from "ng2-translate/ng2-translate";

import _ from "lodash";

import { PageModel } from "./page.model";

declare var __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: "main-menu",
  templateUrl: "main-menu.component.html",
})

export class MainMenuComponent implements OnInit {
  @ViewChild("mobileMenu")
  private mobileMenuElement: ElementRef;
  private pages: Array<PageModel>;
  private isCollapsed = true;

  constructor(
    private _translateService: TranslateService,
    private _router: Router
  ) {}

  public ngOnInit() {
    this.pages = [
      new PageModel("MENU.HOME", "/home", true, true),
      new PageModel("MENU.NEWS", "/news"),
      new PageModel("MENU.CONCEPT", "/concept"),
      new PageModel("MENU.MEDIA", "/media"),
      new PageModel("MENU.TEAM", "/team")
    ];
  }

  public get menuIcon(): string {
    return this.isCollapsed ? "☰" : "✖";
  }

  public getVisiblePages(): Array<PageModel> {
    return _.filter(this.pages, function(p) {return !p.hideInMenu; });
  }

  public get isMenuVisible(): Boolean {
    return this.mobileMenuElement.nativeElement.offsetWidth > 0 || this.mobileMenuElement.nativeElement.offsetHeight > 0;
  }

  public isLocale(locale: string) {
    return this._translateService.currentLang === locale;
  }

  public isHidden(page: PageModel): Boolean {
    return this.isMenuVisible && page.selected;
  }

  public getSelectedPage(): PageModel {
    return this.pages.find(page => page.selected === true);
  }

  public setLocale(locale: string) {
    switch (locale) {
      case "en":
        this._translateService.use("en");
        break;
      case "fr":
        this._translateService.use("fr");
        break;
    }

    this.isCollapsed = true;
  }

  public onPageSelected(selectedPage: PageModel) {
    this.pages.forEach(page => {
      page.selected = false;
    });
    selectedPage.selected = true;
  }
}
