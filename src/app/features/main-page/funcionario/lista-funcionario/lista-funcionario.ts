import { Component, inject } from '@angular/core';
import { ZardTableComponent } from '@shared/components/table/table.component';
import { Iuser } from '../interfaces/iuser.interface';
import { FuncionarioService } from '../services/funcionario.service';
import { toast } from 'ngx-sonner';
import { ZardCardComponent } from '@shared/components/card/card.component';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardAvatarComponent } from '@shared/components/avatar/avatar.component';

@Component({
  selector: 'app-lista-funcionario',
  imports: [
    ZardTableComponent,
    ZardCardComponent,
    ZardButtonComponent,
    ZardAvatarComponent

  ],
  templateUrl: './lista-funcionario.html',
  styleUrl: './lista-funcionario.css',
})
export class ListaFuncionario {
  listOfData: any[] = [];

  private readonly funcionarioService = inject(FuncionarioService);

  ngOnInit() {
    this.getAllFuncionario();
  }

  getAllFuncionario() {
    this.funcionarioService.getUser().subscribe({
      next: (req: any) => {
        this.listOfData = req;
        console.log('Lista de usuarios', req);
      },
      error: (err: any) => {
        this.showToast('error', 'Erro', err);
      },
    });
  }

  showToast(type: string, title: string, description: string) {
    toast(title, {
      description: description,
      class: type,
      position: 'top-right',
      action: {
        label: 'fechar',
        onClick: () => console.log('fechado'),
      },
    });
  }
}
