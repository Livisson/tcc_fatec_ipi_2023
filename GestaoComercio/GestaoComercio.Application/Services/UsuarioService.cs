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
    public class UsuarioService
    {

        private readonly IGenericRepository<Usuario> _usuarioRepository;
        private readonly IMapper _mapper;

        public UsuarioService(IGenericRepository<Usuario> usuarioRepository, IMapper mapper)
        {
            _usuarioRepository = usuarioRepository;
            _mapper = mapper;
        }

        public UsuarioDTO GetUsuarioByIndex(string nome, string senha)
        {
            return _mapper.Map<UsuarioDTO>(_usuarioRepository.Get(x => x.Nome == nome && x.Senha == senha));
        }
        public async Task<IEnumerable<UsuarioDTO>> ConsultaUsuarios()
        {
            return _mapper.Map<IEnumerable<UsuarioDTO>>(await _usuarioRepository.GetAsync());
        }
    }
}
