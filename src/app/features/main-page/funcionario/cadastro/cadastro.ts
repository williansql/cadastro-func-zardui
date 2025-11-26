import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardIconComponent } from '@shared/components/icon/icon.component';
import { ZardInputGroupComponent } from "@shared/components/input-group/input-group.component";
import { ZardInputDirective } from '@shared/components/input/input.directive';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-cadastro',
  imports: [
    ZardInputGroupComponent,
    ZardInputDirective,
    ZardButtonComponent,
    ZardIconComponent,
    FormsModule,
    ReactiveFormsModule,


],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {

  private readonly fb = inject(FormBuilder);

  protected cadastroFuncForm = this.fb.group({
    nome: ['', [Validators.required, Validators.min(3)]],
    sobrenome: ['', [Validators.required, Validators.min(3)]],
    email: ['', [Validators.required, Validators.email, Validators.min(3)]],
    registro: [''],
    endereco: ['', [Validators.required, Validators.min(5)]]
  })

  onSubmit(){
    if (this.cadastroFuncForm.invalid){
      this.cadastroFuncForm.markAllAsTouched();
      this.erroCadastro();
    } else {
      console.log(this.cadastroFuncForm.value);
      this.clearForm()
      this.showToast()
    }
  }

  clearForm(){
    this.cadastroFuncForm.reset();
  }

  showToast() {
    toast('Cadastro', {
      description: 'Cadastro realizado com sucesso',
      action: {
        label: 'Fechar',
        onClick: () => console.log('fechar'),
      },
    });
  }

  erroCadastro(){
    toast('Erro', {
      description: 'Verifique todos os campos e tente novamente',
      action: {
        label: 'Fechar',
        onClick: () => console.log('fechar'),
      }
    })
  }

}
