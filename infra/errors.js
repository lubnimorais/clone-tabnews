export class InternalServerError extends Error {
  constructor({ cause, statusCode }) {
    super("Um erro interno não esperado aconteceu.", { cause });

    this.name = "InternalServerError";
    this.action = "Entre em contato com o suporte.";
    this.statusCode = statusCode || 500;
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

export class ServiceError extends Error {
  constructor({ cause, message }) {
    super(message || "Serviço indisponível no momento.", { cause });

    this.name = "ServiceError";
    this.action = "Verifique se o serviço está disponível.";
    this.statusCode = 503;
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

export class ValidationError extends Error {
  constructor({ cause, message, action }) {
    super(message || "Um erro de validação ocorreu.", { cause });

    this.name = "ValidationError";
    this.action = action || "Ajuste os dados enviados e tente novamente.";
    this.statusCode = 400;
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

export class MethodNotAllowedError extends Error {
  constructor() {
    super("Método não permitido para este endpoint.");

    this.name = "MethodNotAllowedError";
    this.action =
      "Verifique se o método HTTP enviado é válido para este endpoint.";
    this.statusCode = 405;
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
