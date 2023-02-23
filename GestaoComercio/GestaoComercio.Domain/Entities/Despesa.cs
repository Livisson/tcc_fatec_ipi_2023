using GestaoComercio.Domain.Validation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoComercio.Domain.Entities
{
    public sealed class Despesa
    {
        public int Id { get; private set; }
        public string Tipo { get; private set; }
        public string Descricao { get; private set; }
        public double Valor { get; private set; }
        public string Funcao { get; private set; }
        public DateTime? DataVencimento { get; private set; }

        public Despesa(int id, string tipo, string descricao, double valor, string funcao, DateTime? dataVencimento)
        {
            DomainExceptionValidation.When(id < 0, "Invalid Id value");
            Id = id;
            ValidateDomain(tipo, descricao, valor, funcao, dataVencimento);
        }
        public void Update(string tipo, string descricao, double valor, string funcao, DateTime? dataVencimento)
        {
            ValidateDomain(tipo, descricao, valor, funcao, dataVencimento);
        }
        private void ValidateDomain(string tipo, string descricao, double valor, string funcao, DateTime? dataVencimento)
        {
            DomainExceptionValidation.When(string.IsNullOrEmpty(tipo),
                "Nome inválido. O nome é obrigatorio");

            DomainExceptionValidation.When(tipo.Length < 3,
                "Nome invalido. Muito pequeno, minimo 3 caracteres");

            DomainExceptionValidation.When(string.IsNullOrEmpty(descricao),
                "Descricao inválida. A Descricao é obrigatoria");

            DomainExceptionValidation.When(descricao.Length < 3,
                "Descricao invalida. Muito pequeno, minimo 3 caracteres");

            DomainExceptionValidation.When(double.IsNaN(valor),
                "Valor inválida. O Valor é obrigatorio");

            DomainExceptionValidation.When(valor < 0,
                "Valor inválido. O Valor não pode ser negativo");

            Tipo = tipo;
            Descricao = descricao;
            Valor = valor;
            Funcao = funcao;
            DataVencimento = dataVencimento;
        }
    }
}
