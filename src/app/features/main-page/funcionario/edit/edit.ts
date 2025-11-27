import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FuncionarioService } from '../services/funcionario.service';
import { toast } from 'ngx-sonner';
import { Iuser } from '../interfaces/iuser.interface';
import { Z_MODAL_DATA } from '@shared/components/dialog/dialog.service';
import { ZardInputDirective } from '@shared/components/input/input.directive';

@Component({
  selector: 'app-edit',
  imports: [
    ReactiveFormsModule,
    ZardInputDirective,
    FormsModule,
  ],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class Edit {

  private usuarioId: string | number | undefined;

  // injetar os dados do modal
  private modalData: Iuser = inject(Z_MODAL_DATA);

  private readonly fb = inject(FormBuilder);
  private readonly funcionarioService = inject(FuncionarioService);

  protected cadastroFuncForm = this.fb.group({
    nome: ['', [Validators.required]],
    sobrenome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    registro: [''],
    endereco: ['', [Validators.required]],
    dataCriacao: [''],
    criadoPor: [''],
    setor: ['']
  });

  constructor(){
    if (this.modalData) {
      this.usuarioId = this.modalData.id;
      this.cadastroFuncForm.patchValue(this.modalData as any);
    }
  }

  ngOnInit(){
    // aplicar valores recebidos via zData, se houver
    if (this.modalData) {
      this.usuarioId = this.modalData.id;
      this.cadastroFuncForm.patchValue(this.modalData as any);
    }
  }

  get form() {
    return this.cadastroFuncForm;
  }

  validateAndGetData(): Iuser | false {
    if (this.cadastroFuncForm.invalid) {
      this.cadastroFuncForm.markAllAsTouched();
      this.showToast('error', 'Erro', 'Por favor, preencha todos os campos obrigatórios');
      return false;
    }

    const funcionarioData: Iuser = {
      id: this.usuarioId,
      nome: this.cadastroFuncForm.value.nome!,
      sobrenome: this.cadastroFuncForm.value.sobrenome!,
      email: this.cadastroFuncForm.value.email!,
      registro: this.cadastroFuncForm.value.registro || '',
      endereco: this.cadastroFuncForm.value.endereco!,
      dataCriacao: this.cadastroFuncForm.value.dataCriacao || this.modalData.dataCriacao,
      criadoPor: this.cadastroFuncForm.value.criadoPor || this.modalData.criadoPor,
      setor: this.cadastroFuncForm.value.setor || ''
    };

    return funcionarioData;
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
        onClick: () => console.log('fechado')
      }
    })
  }

}
