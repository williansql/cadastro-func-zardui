import { Route, Routes } from "@angular/router";
import { Cadastro } from "./funcionario/cadastro/cadastro";
import { ListaFuncionario } from "./funcionario/lista-funcionario/lista-funcionario";

export const mainRoute: Routes = [
  { path: '', component: ListaFuncionario },
  { path: 'cadastro', component: Cadastro }
]
