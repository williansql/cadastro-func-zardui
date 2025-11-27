import { Route, Routes } from "@angular/router";
import { Cadastro } from "./funcionario/cadastro/cadastro";
import { ListaFuncionario } from "./funcionario/lista-funcionario/lista-funcionario";

export const mainRoute: Routes = [
  { path: 'home', pathMatch: 'full', redirectTo: 'home/lista' },
  { path: 'home/lista', component: ListaFuncionario },
  { path: 'home/cadastro', component: Cadastro }
];
