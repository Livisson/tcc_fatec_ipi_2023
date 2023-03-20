﻿// <auto-generated />
using System;
using GestaoComercio.Infra.Data.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace GestaoComercio.Infra.Data.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20230320150843_criacaoNomeProdutos")]
    partial class criacaoNomeProdutos
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.4")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("GestaoComercio.Domain.Entities.Caixa", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DataVenda")
                        .HasColumnType("datetime2");

                    b.Property<double>("ValorVenda")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.ToTable("Caixa");
                });

            modelBuilder.Entity("GestaoComercio.Domain.Entities.Despesa", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Descricao")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("DiaVencimento")
                        .HasColumnType("int");

                    b.Property<string>("Funcao")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Tipo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Valor")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.ToTable("Despesa");
                });

            modelBuilder.Entity("GestaoComercio.Domain.Entities.DespesaHistorico", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DataHistorico")
                        .HasColumnType("datetime2");

                    b.Property<string>("Descricao")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("DiaVencimento")
                        .HasColumnType("int");

                    b.Property<string>("Funcao")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Tipo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Valor")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.ToTable("DespesaHistorico");
                });

            modelBuilder.Entity("GestaoComercio.Domain.Entities.EspecificacaoProduto", b =>
                {
                    b.Property<string>("CodigoBarrasProduto")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("CodigoFornecedorProduto")
                        .HasColumnType("nvarchar(450)");

                    b.Property<double>("ValorCompraProduto")
                        .HasColumnType("float");

                    b.Property<bool>("EmEstoque")
                        .HasColumnType("bit");

                    b.Property<int>("QtdEstoque")
                        .HasColumnType("int");

                    b.HasKey("CodigoBarrasProduto", "CodigoFornecedorProduto", "ValorCompraProduto");

                    b.ToTable("EspecificacaoProduto");
                });

            modelBuilder.Entity("GestaoComercio.Domain.Entities.Fornecedor", b =>
                {
                    b.Property<string>("Cnpj")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Nome")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Cnpj");

                    b.ToTable("Fornecedor");
                });

            modelBuilder.Entity("GestaoComercio.Domain.Entities.NomeProdutos", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("NomeProduto")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("NomeProdutos");
                });

            modelBuilder.Entity("GestaoComercio.Domain.Entities.Pedido", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CodigoBarrasProduto")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("CodigoFornecedorProduto")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("DataCompra")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DataVencimento")
                        .HasColumnType("datetime2");

                    b.Property<int>("Quantidade")
                        .HasColumnType("int");

                    b.Property<double>("ValorCompra")
                        .HasColumnType("float");

                    b.HasKey("Id", "CodigoBarrasProduto", "CodigoFornecedorProduto");

                    b.HasIndex("CodigoBarrasProduto", "CodigoFornecedorProduto");

                    b.ToTable("Pedido");
                });

            modelBuilder.Entity("GestaoComercio.Domain.Entities.Produto", b =>
                {
                    b.Property<string>("CodigoBarras")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("FornecedorCpnj")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Nome")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("PerDesconto")
                        .HasColumnType("float");

                    b.Property<double>("PerMargem")
                        .HasColumnType("float");

                    b.Property<int>("QtdEstoqueTotal")
                        .HasColumnType("int");

                    b.Property<double>("ValorSugerido")
                        .HasColumnType("float");

                    b.Property<double>("ValorVenda")
                        .HasColumnType("float");

                    b.HasKey("CodigoBarras", "FornecedorCpnj");

                    b.HasIndex("FornecedorCpnj");

                    b.ToTable("Produto");
                });

            modelBuilder.Entity("GestaoComercio.Domain.Entities.ProdutosVenda", b =>
                {
                    b.Property<string>("CodigoBarrasProduto")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("CodigoFornecedorProduto")
                        .HasColumnType("nvarchar(450)");

                    b.Property<double>("ValorVendaProduto")
                        .HasColumnType("float");

                    b.Property<int>("CaixaId")
                        .HasColumnType("int");

                    b.Property<DateTime>("DataVenda")
                        .HasColumnType("datetime2");

                    b.Property<double>("Lucro")
                        .HasColumnType("float");

                    b.Property<int>("Quantidade")
                        .HasColumnType("int");

                    b.HasKey("CodigoBarrasProduto", "CodigoFornecedorProduto", "ValorVendaProduto", "CaixaId");

                    b.HasIndex("CaixaId");

                    b.ToTable("ProdutosVenda");
                });

            modelBuilder.Entity("GestaoComercio.Domain.Entities.Usuario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nome")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Senha")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Usuario");
                });

            modelBuilder.Entity("GestaoComercio.Domain.Entities.EspecificacaoProduto", b =>
                {
                    b.HasOne("GestaoComercio.Domain.Entities.Produto", "Produto")
                        .WithMany("EspecificacoesDeProduto")
                        .HasForeignKey("CodigoBarrasProduto", "CodigoFornecedorProduto")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Produto");
                });

            modelBuilder.Entity("GestaoComercio.Domain.Entities.Pedido", b =>
                {
                    b.HasOne("GestaoComercio.Domain.Entities.Produto", "Produto")
                        .WithMany("PedidosDeProduto")
                        .HasForeignKey("CodigoBarrasProduto", "CodigoFornecedorProduto")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Produto");
                });

            modelBuilder.Entity("GestaoComercio.Domain.Entities.Produto", b =>
                {
                    b.HasOne("GestaoComercio.Domain.Entities.Fornecedor", "Fornecedor")
                        .WithMany("ProdutosDoFornecedor")
                        .HasForeignKey("FornecedorCpnj")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Fornecedor");
                });

            modelBuilder.Entity("GestaoComercio.Domain.Entities.ProdutosVenda", b =>
                {
                    b.HasOne("GestaoComercio.Domain.Entities.Caixa", "Caixa")
                        .WithMany("ProdutosVenda")
                        .HasForeignKey("CaixaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GestaoComercio.Domain.Entities.Produto", "Produto")
                        .WithMany("ProdutosVenda")
                        .HasForeignKey("CodigoBarrasProduto", "CodigoFornecedorProduto")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Caixa");

                    b.Navigation("Produto");
                });

            modelBuilder.Entity("GestaoComercio.Domain.Entities.Caixa", b =>
                {
                    b.Navigation("ProdutosVenda");
                });

            modelBuilder.Entity("GestaoComercio.Domain.Entities.Fornecedor", b =>
                {
                    b.Navigation("ProdutosDoFornecedor");
                });

            modelBuilder.Entity("GestaoComercio.Domain.Entities.Produto", b =>
                {
                    b.Navigation("EspecificacoesDeProduto");

                    b.Navigation("PedidosDeProduto");

                    b.Navigation("ProdutosVenda");
                });
#pragma warning restore 612, 618
        }
    }
}
