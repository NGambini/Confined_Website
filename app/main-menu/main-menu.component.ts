import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
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

  public ngOnInit() {
    this.pages = [
      new PageModel("Home", "/home", true),
      new PageModel("News", "/news"),
      new PageModel("Concept", "/concept"),
      new PageModel("Media", "/media"),
      new PageModel("Team", "/team"),
      new PageModel("Contact", "/contact")
    ];
  }

  public get menuIcon(): string {
    return this.isCollapsed ? "☰" : "✖";
  }

  public get isMenuVisible(): Boolean {
    return this.mobileMenuElement.nativeElement.offsetWidth > 0 || this.mobileMenuElement.nativeElement.offsetHeight > 0;
  }

  public isHidden(page: PageModel): Boolean {
    return this.isMenuVisible && page.selected;
  }

  public getSelectedPage(): PageModel {
    return this.pages.find(page => page.selected === true);
  }

  public onPageSelected(selectedPage: PageModel) {
    this.pages.forEach(page => {
      page.selected = false;
    });
    selectedPage.selected = true;
  }
}
