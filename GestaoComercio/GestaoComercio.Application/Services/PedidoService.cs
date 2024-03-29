﻿using AutoMapper;
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
    public class PedidoService
    {
        private readonly ProdutoService _produtoService;
        private readonly EspecificacoesProdutoService _especificacoesProdutoService;
        private readonly IGenericRepository<Pedido> _pedidoRepository;
        private readonly IMapper _mapper;

        public PedidoService(ProdutoService produtoService, IMapper mapper, EspecificacoesProdutoService especificacoesProdutoService, IGenericRepository<Pedido> pedidoRepository)
        {
            _produtoService = produtoService;
            _especificacoesProdutoService = especificacoesProdutoService;
            _pedidoRepository = pedidoRepository;
            _mapper = mapper;
        }
        public async Task<PedidoDTO> InserirPedido(PostPedidoCommand request)
        {
            var pedido = new PedidoDTO();
            var produto = _produtoService.GetProdutoByIndex(request.CodigoBarras, request.CodigoFornecedor);

            if (produto == null)
            {
                var produtoParaInserir = new ProdutoDTO
                {
                    CodigoBarras = request.CodigoBarras,
                    FornecedorCpnj = request.CodigoFornecedor,
                    Nome = request.NomeProduto,
                    PerDesconto = 5,
                    PerMargem = 10,
                    QtdEstoqueTotal = request.Quantidade,
                    ValorSugerido = request.ValorCompra + (request.ValorCompra * 0.1),
                    ValorVenda = request.ValorCompra + (request.ValorCompra * 0.1),

                    EspecificacoesDeProduto = new List<EspecificacaoProdutoDTO> { { new EspecificacaoProdutoDTO {

                        ValorCompraProduto = request.ValorCompra,
                        QtdEstoque = request.Quantidade,
                        EmEstoque = true

                    } } }
                };

                produto = _produtoService.Inserir(produtoParaInserir);
            }
            else
            {

                var especificacao = _especificacoesProdutoService.GetEspecificacaoProdutoByIndex(request.CodigoBarras, request.CodigoFornecedor, request.ValorCompra);

                if (especificacao == null)
                {
                    especificacao = _especificacoesProdutoService.Inserir(new EspecificacaoProdutoDTO
                    {
                        CodigoBarrasProduto = produto.CodigoBarras,
                        CodigoFornecedorProduto = produto.FornecedorCpnj,
                        ValorCompraProduto = request.ValorCompra,
                        QtdEstoque = request.Quantidade,
                        EmEstoque = true
                    });
                }
                else
                {
                    especificacao.QtdEstoque += request.Quantidade;
                    especificacao.EmEstoque = true;
                    _especificacoesProdutoService.Update(especificacao);
                }
            }

            produto = _produtoService.GetProdutoByIndex(request.CodigoBarras, request.CodigoFornecedor);
            produto.RegraNegocio();
            //produto.Fornecedor = null;
            //produto.EspecificacoesDeProduto = null;
            //produto.PedidosDeProduto = null;
            //produto.ProdutosVenda = null;
            _produtoService.Update(produto);

            pedido.CodigoBarrasProduto = produto.CodigoBarras;
            pedido.CodigoFornecedorProduto = produto.FornecedorCpnj;
            pedido.ValorCompra = request.ValorCompra;
            pedido.Quantidade = request.Quantidade;
            pedido.DataVencimento = request.DataPagamento;
            pedido.DataCompra = DateTime.Now;

            return _mapper.Map<PedidoDTO>(await _pedidoRepository.CreateAsync(_mapper.Map<Pedido>(pedido)));
        }

        public async Task<IEnumerable<PedidoDTO>> ConsultaPedidos()
        {
            return _mapper.Map<IEnumerable<PedidoDTO>>(await _pedidoRepository.GetAsync());
        }

        public PedidoDTO GetPedidoByIndex(string codigoBarras, string codigoFornecedor, double valorCompra)
        {
            return _mapper.Map<PedidoDTO>(_pedidoRepository.Get(x => x.CodigoBarrasProduto == codigoBarras && x.CodigoFornecedorProduto == codigoFornecedor && x.ValorCompra == valorCompra));
        }

        public async Task<PedidoDTO> DeletePedido(PostPedidoCommand request)
        {
            var especificacoesProdutos = _especificacoesProdutoService.GetEspecificacaoProdutos(request.CodigoBarras, request.CodigoFornecedor);
            var pedido = GetPedidoByIndex(request.CodigoBarras, request.CodigoFornecedor, request.ValorCompra);

            if (especificacoesProdutos.Count() > 1)
            {
                var especificacaoParaDeletar = _especificacoesProdutoService.GetEspecificacaoProdutoByIndex(request.CodigoBarras, request.CodigoFornecedor, request.ValorCompra);

                if (especificacaoParaDeletar != null)
                {
                    _especificacoesProdutoService.Delete(especificacaoParaDeletar);
                    var produto = _produtoService.GetProdutoByIndex(request.CodigoBarras, request.CodigoFornecedor);
                    produto.RegraNegocio();
                    _produtoService.Update(produto);
                }

                return _mapper.Map<PedidoDTO>(await _pedidoRepository.RemoveAsync(_mapper.Map<Pedido>(pedido)));
            }
            else
            {
                var produto = _produtoService.GetProdutoByIndex(request.CodigoBarras, request.CodigoFornecedor);
                await _produtoService.DeletarProduto(produto);
            }

            return pedido;

            //return _mapper.Map<PedidoDTO>(request);
        }
    }
}
