import { Component } from '@angular/core';
import { ContentComponent } from '@shared/components/layout/content.component';
import { FooterComponent } from '@shared/components/layout/footer.component';
import { HeaderComponent } from '@shared/components/layout/header.component';
import { LayoutComponent } from "@shared/components/layout/layout.component";
import { SidebarComponent } from '@shared/components/layout/sidebar.component';
import { Cadastro } from "./funcionario/cadastro/cadastro";


@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    LayoutComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    Cadastro
],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {}
