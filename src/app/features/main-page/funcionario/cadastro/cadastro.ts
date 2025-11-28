import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardIconComponent } from '@shared/components/icon/icon.component';
import { ZardInputGroupComponent } from '@shared/components/input-group/input-group.component';
import { ZardInputDirective } from '@shared/components/input/input.directive';
import { toast } from 'ngx-sonner';
import { FuncionarioService } from '../services/funcionario.service';
import { Iuser } from '../interfaces/iuser.interface';
import { ZardSelectComponent } from '@shared/components/select/select.component';
import { ZardSelectItemComponent } from '@shared/components/select/select-item.component';
import { ZardFormModule } from '@shared/components/form/form.module';
import { ZardTooltipModule } from '@shared/components/tooltip/tooltip';
import {
  ZardPopoverComponent,
  ZardPopoverDirective,
} from '@shared/components/popover/popover.component';

@Component({
  selector: 'app-cadastro',
  imports: [
    ZardInputGroupComponent,
    ZardInputDirective,
    ZardButtonComponent,
    ZardIconComponent,
    FormsModule,
    ReactiveFormsModule,
    ZardSelectComponent,
    ZardSelectItemComponent,
    ZardFormModule,
    ZardTooltipModule,
    ZardPopoverDirective,
    ZardPopoverComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly funcionarioService = inject(FuncionarioService);

  protected cadastroFuncForm = this.fb.group({
    nome: ['', [Validators.required]],
    sobrenome: ['', [Validators.required]],
    email: ['', [Validators.required]],
    registro: ['', [Validators.required]],
    endereco: ['', [Validators.required]],
    dataCriacao: [Date.now().toString()],
    criadoPor: ['Fofinho'],
    setor: ['', [Validators.required]],
  });

  ngOnInit() {}

  onSubmit() {
    console.log('Formulario de cadastro', this.cadastroFuncForm.value);
    // this.loading = true;

    if (this.cadastroFuncForm.invalid) {
      this.cadastroFuncForm.markAllAsTouched();
      this.showToast(
        'error',
        'Erro ao salvar o Funcionário',
        'Verifique todos os campos e preencha corretamente'
      );
    } else {
      // Preparar os dados para enviar
      const funcionarioData: Iuser = {
        nome: this.cadastroFuncForm.value.nome!,
        sobrenome: this.cadastroFuncForm.value.sobrenome!,
        email: this.cadastroFuncForm.value.email!,
        registro: this.cadastroFuncForm.value.registro || '',
        endereco: this.cadastroFuncForm.value.endereco!,
        dataCriacao: this.cadastroFuncForm.value.dataCriacao!,
        criadoPor: this.cadastroFuncForm.value.criadoPor!,
        setor: this.cadastroFuncForm.value.setor || '',
      };

      // Chamar o serviço
      this.funcionarioService.postUser(funcionarioData).subscribe({
        next: (response) => {
          console.log('Funcionário criado com sucesso:', response);
          // this.loading = false;
          this.clearForm();
          this.showToast('success', 'Sucesso', 'Usuario cadastrado com sucesso');
          this.funcionarioService.funcionarioEvent.emit(true);
          console.log(response);
        },
        error: (error) => {
          console.error('Erro ao criar funcionário:', error);
          // this.loading = false;
        },
      });
    }
  }

  clearForm() {
    this.cadastroFuncForm.reset();
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

  isFieldInvalid(fieldName: keyof Iuser): boolean {
    const field = this.cadastroFuncForm.get(fieldName);
    return !!(field?.invalid && (field?.dirty || field?.touched));
  }
}
