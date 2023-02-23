using AutoMapper;
using GestaoComercio.Application.Models.Pedido.Commands;
using GestaoComercio.Application.Services;
using GestaoComercio.Domain.Entities;
using GestaoComercio.Domain.Interfaces;
using GestaoComercio.WebUI.Models;
using GestaoComercio.WebUI.Models.Pedido.Commands;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace GestaoComercio.WebUI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PedidoController : ControllerBase
    {
        private readonly ILogger<PedidoController> _logger;
        private readonly PedidoService _pedidoService;
        private readonly IMapper _mapper;
        private readonly ProdutoService _produtoService;
        private readonly EspecificacoesProdutoService _especificacoesProdutoService;
        private readonly IGenericRepository<EspecificacaoProduto> _especificacaoProdutoRepository;
        private readonly IGenericRepository<Pedido> _pedidoRepository;
        private readonly IGenericRepository<Produto> _produtoRepository;

        public PedidoController(ILogger<PedidoController> logger, IMapper mapper, IGenericRepository<Pedido> pedidoRepository, IGenericRepository<Produto> produtoRepository, IGenericRepository<EspecificacaoProduto> especificacaoProdutoRepository)
        {
            _logger = logger;
            _mapper = mapper;
            _especificacoesProdutoService = new EspecificacoesProdutoService(especificacaoProdutoRepository, mapper);
            _produtoService = new ProdutoService(produtoRepository, _especificacoesProdutoService, mapper);
            _pedidoService = new PedidoService(_produtoService, mapper, _especificacoesProdutoService, pedidoRepository);
        }

        [HttpPost]
        //public async Task<IActionResult> PostPedido(PostPedidoModel request)
        //{
        //    await _pedidoService.InserirPedido(_mapper.Map<PostPedidoCommand>(request));
        //    return Ok();
        //}

        public async Task<IActionResult> PostPedido(PostPedidoModel request) =>
            Ok(await _pedidoService.InserirPedido(_mapper.Map<PostPedidoCommand>(request)));

        [HttpGet]
        public async Task<IActionResult> GetPedidos() =>
            Ok(await _pedidoService.ConsultaPedidos());

        [HttpDelete]
        public async Task<IActionResult> DeletePedido(PostPedidoModel request) =>
            Ok(await _pedidoService.DeletePedido(_mapper.Map<PostPedidoCommand>(request)));

        [HttpGet("getEstoque")]
        public IActionResult GetEstoque() =>
            Ok(_produtoService.ConsultaEstoque());
    }
}
