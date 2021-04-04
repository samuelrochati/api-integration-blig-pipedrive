const mongoose = require('mongoose');

const OpportunitySchema = new mongoose.Schema(
  {
    vlr: {
      type: Number,
      required: true,
    },
    vlr_unit: {
      type: Number,
      required: true,
    },
    qtde: {
      type: Number,
      required: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    servico: {
      type: String,
      required: true,
    },
    nome: {
      type: String,
      required: true,
    },
    cliente: {
      type: String,
      required: true,
    },
    pedido: {
      type: Number,
      required: true,
    },
    data: {
      type: Date,
      required: true,
    },
    wasuploaded: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Opportunity = mongoose.model('Opportunity', OpportunitySchema);

module.exports = Opportunity;
