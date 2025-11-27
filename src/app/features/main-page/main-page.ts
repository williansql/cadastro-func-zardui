import { Component } from '@angular/core';
import { ContentComponent } from '@shared/components/layout/content.component';
import { FooterComponent } from '@shared/components/layout/footer.component';
import { HeaderComponent } from '@shared/components/layout/header.component';
import { LayoutComponent } from "@shared/components/layout/layout.component";
import { SidebarComponent } from '@shared/components/layout/sidebar.component';
import { Cadastro } from "./funcionario/cadastro/cadastro";
import { ZardToastComponent } from '@shared/components/zard-toast-component/zard-toast-component';
import { ListaFuncionario } from "./funcionario/lista-funcionario/lista-funcionario";
import { RouterLinkWithHref, RouterOutlet } from "@angular/router";


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
    RouterLinkWithHref
],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {}
