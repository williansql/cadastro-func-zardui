import { Component, inject, OnInit } from '@angular/core';
import { ZardTableComponent } from '@shared/components/table/table.component';
import { Iuser } from '../interfaces/iuser.interface';
import { FuncionarioService } from '../services/funcionario.service';
import { toast } from 'ngx-sonner';
import { ZardCardComponent } from '@shared/components/card/card.component';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardAvatarComponent } from '@shared/components/avatar/avatar.component';
import { DatePipe } from '@angular/common';
import { ZardDialogModule } from '@shared/components/dialog/dialog.component';
import { ZardDialogService } from '@shared/components/dialog/dialog.service';
import { Edit } from '../edit/edit';

@Component({
  selector: 'app-lista-funcionario',
  imports: [
    ZardTableComponent,
    ZardCardComponent,
    ZardButtonComponent,
    ZardAvatarComponent,
    ZardButtonComponent,
    ZardDialogModule,
    DatePipe
  ],
  templateUrl: './lista-funcionario.html',
  styleUrl: './lista-funcionario.css',
})
export class ListaFuncionario implements OnInit {
  listOfData: Iuser[] = [];
  initialValue: string = '';
  hideInfo?: number | null;

  private readonly funcionarioService = inject(FuncionarioService);
  private readonly dialogService = inject(ZardDialogService);

  ngOnInit() {
    this.getAllFuncionario();
    this.funcionarioService.funcionarioEvent.subscribe(() => this.getAllFuncionario)
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

  getInitials(card: Iuser): string {
    const firstName = card.nome?.charAt(0) || '';
    const lastName = card.sobrenome?.charAt(0) || '';

    if (!firstName && !lastName) {
      return '?';
    }

    return `${firstName}${lastName}`.toUpperCase();
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

  openInfo(i: number) {
    this.hideInfo = this.hideInfo === i ? null : i;
  }

  openDialog(i: number) {
    const dialogRef = this.dialogService.create({
      zTitle: 'Editar Usuário',
      zDescription: `Realize a edição do usuário.`,
      zContent: Edit,
      zData: this.listOfData[i],
      zOkText: 'Salvar',
      zOnOk: (instance: Edit) => {
        const funcionarioData = instance.validateAndGetData();

        if (funcionarioData === false) {
          return false;
        }

        this.funcionarioService.putUser(funcionarioData).subscribe({
          next: (response) => {
            console.log('Funcionário atualizado com sucesso:', response);
            this.showToast('success', 'Sucesso', 'Usuário atualizado com sucesso');
            this.getAllFuncionario();
            dialogRef.close(response);
          },
          error: (error) => {
            console.error('Erro ao atualizar funcionário:', error);
            this.showToast('error', 'Erro', 'Erro ao atualizar usuário. Tente novamente.');
          }
        });

        return false;
      },
      zWidth: '320px',
    });
  }

  openDeleteDialog(i: number) {
    const usuario = this.listOfData[i];
    const nomeCompleto = `${usuario.nome} ${usuario.sobrenome}`;

    const dialogRef = this.dialogService.create({
      zTitle: 'Confirmar Exclusão',
      zDescription: `Tem certeza que deseja excluir o usuário "${nomeCompleto}"? Esta ação não pode ser desfeita.`,
      zContent: '',
      zOkText: 'Excluir',
      zCancelText: 'Cancelar',
      zOkDestructive: true,
      zOnOk: () => {
        if (!usuario.id) {
          this.showToast('error', 'Erro', 'ID do usuário não encontrado.');
          return false;
        }

        this.funcionarioService.deleteUser(usuario.id).subscribe({
          next: () => {
            console.log('Funcionário excluído com sucesso');
            this.showToast('success', 'Sucesso', 'Usuário excluído com sucesso');
            this.getAllFuncionario();
            dialogRef.close();
            this.funcionarioService.funcionarioEvent.emit(true);
          },
          error: (error) => {
            console.error('Erro ao excluir funcionário:', error);
            this.showToast('error', 'Erro', 'Erro ao excluir usuário. Tente novamente.');
            return false;
          }
        });

        return false;
      },
      zWidth: '320px',
    });
  }

}
