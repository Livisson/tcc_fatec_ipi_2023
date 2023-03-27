using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoComercio.Application.Models.Responses
{
    public class TelaConsolidadoResponse
    {
        public string Data { get; set; }
        public double Receitas { get; set; }
        public double Despesas { get; set; }
        public double Resumo { get; set; }
    }
}
