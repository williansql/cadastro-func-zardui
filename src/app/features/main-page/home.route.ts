import { Route, Routes } from "@angular/router";
import { Cadastro } from "./funcionario/cadastro/cadastro";
import { ListaFuncionario } from "./funcionario/lista-funcionario/lista-funcionario";
import { CalendarClock } from "lucide-angular";

export const mainRoute: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'lista' },
  { path: 'lista', component: ListaFuncionario },
  { path: 'cadastro', component: Cadastro }
];
