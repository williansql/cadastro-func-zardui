import { Component } from '@angular/core';
import { ContentComponent } from '@shared/components/layout/content.component';
import { FooterComponent } from '@shared/components/layout/footer.component';
import { HeaderComponent } from '@shared/components/layout/header.component';
import { LayoutComponent } from '@shared/components/layout/layout.component';
import { SidebarComponent } from '@shared/components/layout/sidebar.component';

@Component({
  selector: 'app-main-page',
  imports: [
    LayoutComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    SidebarComponent
  ],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {}
