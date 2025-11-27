import { Component, inject } from '@angular/core';
import { ContentComponent } from '@shared/components/layout/content.component';
import { FooterComponent } from '@shared/components/layout/footer.component';
import { HeaderComponent } from '@shared/components/layout/header.component';
import { LayoutComponent } from "@shared/components/layout/layout.component";
import { SidebarComponent } from '@shared/components/layout/sidebar.component';
import { Cadastro } from "./funcionario/cadastro/cadastro";
import { ZardToastComponent } from '@shared/components/zard-toast-component/zard-toast-component';
import { ListaFuncionario } from "./funcionario/lista-funcionario/lista-funcionario";
import { RouterLinkWithHref, RouterOutlet } from "@angular/router";
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardIconComponent } from '@shared/components/icon/icon.component';
import { ZardSheetService } from '@shared/components/sheet/sheet.service';
import { SideMenuContentComponent } from './side-menu/side-menu-content.component';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    LayoutComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    ZardToastComponent,
    RouterOutlet,
    RouterLinkWithHref,
    ZardButtonComponent,
    ZardIconComponent,
    DatePipe
],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {

  year = new Date()

  private sheetService = inject(ZardSheetService);

  openSideMenu() {
    this.sheetService.create({
      zTitle: 'Menu',
      zContent: SideMenuContentComponent,
      zSide: 'left',
      zSize: 'default',
      zClosable: true,
      zMaskClosable: true,
      zHideFooter: true,
    });
  }
}
