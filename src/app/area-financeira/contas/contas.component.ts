import { Component, input, output } from '@angular/core';
import { ContaComponent } from "./conta/conta.component";
import { Conta } from '../compartilhados/conta.model';
import { CardComponent } from "../compartilhados/card/card.component";
import { BotaoAdicionarContaComponent } from "./botao-adicionar-conta/botao-adicionar-conta.component";

@Component({
  selector: 'app-contas',
  imports: [ContaComponent, CardComponent, BotaoAdicionarContaComponent],
  templateUrl: './contas.component.html',
  styleUrl: './contas.component.css'
})
export class ContasComponent {
  contas = input.required<Conta[]>();

  contaCriada = output<Conta>();
}
