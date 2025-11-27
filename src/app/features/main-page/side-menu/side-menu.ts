import { Component, inject } from '@angular/core';
import { ZardSheetService } from '@shared/components/sheet/sheet.service';
import { SideMenuContentComponent } from './side-menu-content.component';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  template: '',
})
export class SideMenu {
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
