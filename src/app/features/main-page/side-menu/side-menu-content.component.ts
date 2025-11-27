import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardIconComponent } from '@shared/components/icon/icon.component';
import { ZardSheetRef } from '@shared/components/sheet/sheet-ref';

@Component({
  selector: 'app-side-menu-content',
  standalone: true,
  imports: [ZardButtonComponent, ZardIconComponent],
  template: `
    <div class="flex flex-col gap-3 p-4">
      <button
        z-button
        zType="outline"
        class="w-full justify-start"
        (click)="navigateTo('lista')"
      >
        <i z-icon zType="list-filter-plus"></i>
        Lista
      </button>
      <button
        z-button
        zType="outline"
        class="w-full justify-start"
        (click)="navigateTo('cadastro')"
      >
        <i z-icon zType="plus"></i>
        Cadastro
      </button>
    </div>
  `,
})
export class SideMenuContentComponent {
  private router = inject(Router);
  private sheetRef = inject(ZardSheetRef);

  navigateTo(route: string) {
    this.router.navigate(['/home', route]);
    this.sheetRef.close();
  }
}

