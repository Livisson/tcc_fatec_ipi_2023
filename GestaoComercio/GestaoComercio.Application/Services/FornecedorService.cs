using AutoMapper;
using GestaoComercio.Application.Models.Fornecedor.Commands;
using GestaoComercio.Application.Models.Pedido.Commands;
using GestaoComercio.Domain.Entities;
using GestaoComercio.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoComercio.Application.Services
{
    public class FornecedorService
    {

        private readonly IGenericRepository<Fornecedor> _fornecedorRepository;
        private readonly IMapper _mapper;

        public FornecedorService(IGenericRepository<Fornecedor> fornecedorRepository, IMapper mapper)
        {
            _fornecedorRepository = fornecedorRepository;
            _mapper = mapper;
        }
        public async Task<FornecedorDTO> InserirFornecedor(PostFornecedorCommand request)
        {
            var teste = _mapper.Map<Fornecedor>(request);
            return _mapper.Map<FornecedorDTO>(await _fornecedorRepository.CreateAsync(_mapper.Map<Fornecedor>(request)));
        }

        public async Task<FornecedorDTO> AtualizarFornecedor(PostFornecedorCommand request)
        {
            return _mapper.Map<FornecedorDTO>(await _fornecedorRepository.UpdateAsync(_mapper.Map<Fornecedor>(request)));
        }

        public async Task<FornecedorDTO> DeletarFornecedor(PostFornecedorCommand request)
        {
            return _mapper.Map<FornecedorDTO>(await _fornecedorRepository.RemoveAsync(_mapper.Map<Fornecedor>(request)));
        }

        public async Task<IEnumerable<FornecedorDTO>> ConsultaFornecedores()
        {
            return _mapper.Map<IEnumerable<FornecedorDTO>>(await _fornecedorRepository.GetAsync());
        }
    }
}
