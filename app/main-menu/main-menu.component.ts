import { Component, OnInit } from '@angular/core';

import { PageModel } from './page.model';

declare var __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'main-menu',
  templateUrl: 'main-menu.component.html'
})

// TODO masquer la page non active

export class MainMenuComponent implements OnInit {
  pages: Array<PageModel>;
  
  ngOnInit() {
    this.pages = [
      new PageModel("Home", "/home"),
      new PageModel("News", "/news"),
      new PageModel("Concept", "/concept"),
      new PageModel("Media", "/media"),
      new PageModel("Team", "/team"),
      new PageModel("Contact", "/contact")
    ];
  }
}