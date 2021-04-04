const XmlConvert = require('xml2js');

class Convert {
  constructor(data) {
    this.data = data;
    this.options = { compact: true, ignoreComment: true, spaces: 4 };
  }

  // eslint-disable-next-line class-methods-use-this
  async jsonToxml() {
    const builder = new XmlConvert.Builder();
    const arrPedido = [];

    this.data.forEach(async (opportunity) => {
      const xmlobj = {
        pedido: {
          cliente: opportunity.cliente,
          data: opportunity.data,
          descricao: opportunity.descricao,
          nome: opportunity.nome,
          qtde: opportunity.qtde,
          servico: opportunity.servico,
          vlr: opportunity.vlr,
          vlr_unit: opportunity.vlr_unit,
          itens: {
            item: [
              {
                codigo: opportunity.pedido,
                descricao: opportunity.descricao,
                un: 'Pç',
                qtde: opportunity.qtde,
                vlr_unit: opportunity.vlr_unit,
              },
            ],
          },
        },
      };

      const xmldata = builder.buildObject(xmlobj);
      arrPedido.push(encodeURI(xmldata));
    });

    return arrPedido;
  }
}

module.exports = Convert;
