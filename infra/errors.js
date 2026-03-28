export class InternalServerError extends Error {
  constructor({ cause }) {
    super("Um erro interno não esperado aconteceu.", { cause });

    this.name = "InternalServerError";
    this.action = "Entre em contato com o suporte.";
    this.statusCode = 500;
  }

  /**
   * SOBRESCREVER O COMPORTAMENTO QUANDO É PEDIDO PARA TRANSFORMAR
   * ESSE OBJETO EM UM JSON. E PARA ISSO DECLARAMOS UM NOVO MÉTODO
   * NESSA CLASSE CHAMADO toJSON(). E O QUE FOR DEVOLVIDO DENTRO,
   * É O QUE VAI APARECER NO RESULTADO DO STRINGFY.
   *
   * this.name -> VAI RETORNAR O VALOR QUE FOI HERDADO, NESSE CASO
   * 'Error'. MAS SE QUISERMOS DEFINIR 'InternalServerError' PRECISAMOS
   * SOBRESCREVER ESSA PROPRIEDADE
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
