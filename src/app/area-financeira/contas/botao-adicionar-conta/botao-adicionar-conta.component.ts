import { Component, input, output, signal } from '@angular/core';
import { BotaoComponent } from "../../../compartilhados/botao/botao.component";
import { Conta } from '../../compartilhados/conta.model';
import { ModalBaseComponent } from "../../compartilhados/modal-base/modal-base.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-botao-adicionar-conta',
  imports: [BotaoComponent, ModalBaseComponent, FormsModule],
  templateUrl: './botao-adicionar-conta.component.html',
  styleUrl: './botao-adicionar-conta.component.css'
})
export class BotaoAdicionarContaComponent {

  modalAberto = signal(false);
  contas = input.required<Conta[]>();

  novaContaForm = {
    nome: '',
    saldoInicial: ''
  }
  contaCriada = output<Conta>();

  abrirModal() {
    this.modalAberto.set(true);
  }

  aoSubmeter() {
    this.verificarContaDuplicada();
    const novaConta = new Conta(
      this.novaContaForm.nome,
      Number(this.novaContaForm.saldoInicial)
    );

    this.contaCriada.emit(novaConta);
    this.modalAberto.set(false);

    // Limpar os campos do formulário
    this.limparFormulario();
  }

  verificarContaDuplicada() {
    const contaExistente = this.contas().find(conta => conta.nome === this.novaContaForm.nome);
    if (contaExistente) {
      alert('Conta já existe! Favor cadastrar outra conta.');
      throw new Error('Conta '+ contaExistente.nome +' já existe!');
    }
  }

  limparFormulario() {
    this.novaContaForm = {
      nome: '',
      saldoInicial: ''
    };
  }

}
