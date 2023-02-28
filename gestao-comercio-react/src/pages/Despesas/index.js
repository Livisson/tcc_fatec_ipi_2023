import React, { useState, useEffect } from "react";
import { FaUser, FaChartBar, FaMapMarkedAlt, FaClipboardList, FaBox, FaMoneyBillWave, FaCashRegister, FaCog, FaSignOutAlt, FaTrash, FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import LogoCompre from "../../LogoCompre.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Table, Button, Col, Row, Container, Modal, Form } from 'react-bootstrap';
import './styleDespesa.css';
import axios from "axios";

const Despesas = () => {

  const [despesas, setDespesas] = useState([]);
  const [despesasGerais, setDespesasGerais] = useState([]);
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [modoEditar, setModoEditar] = useState(false);

  const [descricao, setDescricao] = useState("");
  const [funcao, setFuncao] = useState("");
  const [valor, setValor] = useState("");
  const [diaVencimento, setDiaVencimento] = useState("");
  const [tipoDespesa, setTipoDespesa] = useState("Funcionário");

  function handleDescricaoChange(event) {
    setDescricao(event.target.value);
  }

  function handleFuncaoChange(event) {
    setFuncao(event.target.value);
  }

  function handleValorChange(event) {
    setValor(event.target.value);
  }

  function handleDiaVencimentoChange(event) {
    setDiaVencimento(event.target.value);
  }

  function getDespesas() {
    axios.get('https://localhost:44334/Despesa')
    .then(response => {
      setDespesas(response.data.filter(despesa => despesa.tipo !== "Geral"));
      setDespesasGerais(response.data.filter(despesa => despesa.tipo === "Geral"));
    })
    .catch(error => {
      console.log(error);
    });
  }

  const handleAdicionar = (event) => {
    event.preventDefault();


    const novaDespesa = {
      tipo: tipoDespesa,
      descricao: descricao,
      funcao: funcao,
      valor: parseFloat(valor),
      diaVencimento: parseInt(diaVencimento),
    };

    axios.post("https://localhost:44334/Despesa/", novaDespesa)
    .then(response => {
      getDespesas();
    })
    .catch(error => {
      console.log(error);
    });

    setDescricao("");
    setFuncao("");
    setValor("");
    setDiaVencimento("");
    setTipoDespesa("");
    setModalAberto(false);
  }

  const handleEditar = (event) => {
    event.preventDefault();

    console.log(tipoDespesa)
    const despesaEditada = {
      id: itemSelecionado.id,
      tipo: tipoDespesa,
      descricao: descricao,
      funcao: funcao,
      valor: parseFloat(valor),
      diaVencimento: parseInt(diaVencimento),
    };
  
    axios.put("https://localhost:44334/Despesa/", despesaEditada)
    .then(response => {
      getDespesas();
    })
    .catch(error => {
      console.log(error);
    });
  
    setDescricao("");
    setFuncao("");
    setValor("");
    setDiaVencimento("");
    setTipoDespesa("");
    setItemSelecionado(null);
    setModalAberto(false);
  }
  
  useEffect(() => {
    axios.get('https://localhost:44334/Despesa')
      .then(response => {
        setDespesas(response.data.filter(despesa => despesa.tipo !== "Geral"));
        setDespesasGerais(response.data.filter(despesa => despesa.tipo === "Geral"));
      })
      .catch(error => {
        console.log(error);
      });
      //getDespesas();
  }, []);

  const userToken = localStorage.getItem("user_token");

  const adicionarDespesa = () => {
    setDescricao("");
    setFuncao("");
    setValor("");
    setDiaVencimento("");
    setTipoDespesa("");
    setItemSelecionado(null);
    setModalAberto(true);
    setModoEditar(false);
  };

  const editarDespesa = (item) => {
    console.log(item.tipo)
    setItemSelecionado(item);
    setDescricao(item.descricao);
    setFuncao(item.funcao);
    setValor(item.valor);
    setDiaVencimento(item.diaVencimento);
    setTipoDespesa(item.tipo);
    setModalAberto(true);
    setModoEditar(true);
  };

  const removerDespesa = (id) => {
    axios.delete(`https://localhost:44334/Despesa/${id}`)
      .then(response => {
        const novasDespesas = despesas.filter(despesa => despesa.id !== id);
        setDespesas(novasDespesas);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Container style={{ backgroundColor: "white" }}>
      <Row className="justify-content-md-center">
        <Col style={{textAlign: "left", verticalAlign: "middle", alignSelf: "center"}}>
          <img src={LogoCompre} alt="Logo" height="80" style={{borderRadius: 7}}/>
        </Col>
        <Col style={{textAlign: "left", verticalAlign: "middle", alignSelf: "center"}} xs={6}><label style={{fontSize:22, fontWeight: "bold", color: "gray"}}>MAPA DE CUSTOS</label></Col>
        <Col style={{textAlign: "right", verticalAlign: "middle", alignSelf: "center"}}>
          <Row style={{ height: '50px'}}>
            <Link 
              to="/" 
              style={{
                color: 'grey',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                justifyContent: "flex-end"
              }}
            >
              {JSON.parse(userToken).name}
              <FaUser className="me-2" />
            </Link>
          </Row>
          <Row>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link 
                to="/" 
                style={{
                  color: 'grey',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <FaCog  className="me-2" />
                CONFIG
              </Link>
              <Link 
                to="/" 
                style={{
                  color: 'grey',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginLeft: "40px"
                }}
              >
                Sair
                <FaSignOutAlt  className="me-2" />
              </Link>
            </div>
          </Row>
        </Col>
      </Row>
      <br/>
      <Row className="justify-content-md-center">
        <div className="d-flex justify-content-between">
          <Button variant="light" className="custom-button-menu"><Link style={{color: 'grey'}} className="nav-link" to="/"><FaChartBar className="me-2" />Consolidado</Link></Button>
          <Button variant="light" className="custom-button-menu-selected" style={{color: 'grey'}}><FaMapMarkedAlt className="me-2" />Mapa de Custos</Button>
          <Button variant="light" className="custom-button-menu"><Link style={{color: 'grey'}} className="nav-link" to="/"><FaClipboardList className="me-2" />Pedidos</Link></Button>
          <Button variant="light" className="custom-button-menu"><Link style={{color: 'grey'}} className="nav-link" to="/"><FaBox className="me-2" />Estoque</Link></Button>
          <Button variant="light" className="custom-button-menu"><Link style={{color: 'grey'}} className="nav-link" to="/"><FaMoneyBillWave className="me-2" />Precificação</Link></Button>
          <Button variant="light" className="custom-button-menu-last"><Link style={{color: 'grey'}} className="nav-link" to="/"><FaCashRegister className="me-2" />Caixa</Link></Button>
        </div>
      </Row>
      <br/>
      <br/>
      <Row className="justify-content-md-center">
        <div className="d-flex justify-content-between">
          <label style={{fontWeight: "bold", color: "Green"}}>Despesas Fixas</label>
          <Button variant="warning" className="custom-button-add" style={{ height: "35px", width: "100px", marginBottom: "5px", color:"grey" }} onClick={() => adicionarDespesa()}>Adicionar</Button>
        </div>
      </Row>
      <Row>
        <Table striped hover>
          <thead>
            <tr>
              <th className="text-center">N°</th>
              <th>Funcionários</th>
              <th>Função</th>
              <th className="text-center">Valor</th>
              <th className="text-center">Dia Pagamento</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {despesas.map((item, index) => (
              <tr key={item.id}>
                <td className="text-center" style={{ verticalAlign: "middle"}}>{index}</td>
                <td style={{ verticalAlign: "middle"}}>{item.descricao}</td>
                <td style={{ verticalAlign: "middle"}}>{item.funcao}</td>
                <td className="text-center" style={{ verticalAlign: "middle"}}>R$ {item.valor.toFixed(2)}</td>
                <td className="text-center" style={{ verticalAlign: "middle"}}>{item.diaVencimento}</td>
                <td className="text-center" style={{ verticalAlign: "middle"}}>
                  <Button variant="outline-secondary" style={{ border: "none"}} onClick={() => editarDespesa(item)}>
                    <FaPencilAlt />
                  </Button>
                  <Button variant="outline-secondary" style={{ border: "none"}} onClick={() => removerDespesa(item.id)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      <br/>
      <Row>
        <Table striped hover>
          <thead>
            <tr>
              <th className="text-center">N°</th>
              <th>Geral</th>
              <th></th>
              <th className="text-center">Valor</th>
              <th className="text-center">Dia Pagamento</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {despesasGerais.map((item, index) => (
              <tr key={item.id}>
                <td className="text-center" style={{ verticalAlign: "middle"}}>{index}</td>
                <td style={{ verticalAlign: "middle"}}>{item.descricao}</td>
                <td></td>
                <td className="text-center" style={{ verticalAlign: "middle"}}>R$ {item.valor.toFixed(2)}</td>
                <td className="text-center" style={{ verticalAlign: "middle"}}>{item.diaVencimento}</td>
                <td className="text-center" style={{ verticalAlign: "middle"}}>
                  <Button variant="outline-secondary" style={{ border: "none"}} onClick={() => editarDespesa(item)}>
                    <FaPencilAlt />
                  </Button>
                  <Button variant="outline-secondary" style={{ border: "none"}} onClick={() => removerDespesa(item.id)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      <Modal show={modalAberto} onHide={() => setModalAberto(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{fontWeight: "bold", color: "Grey"}}>{itemSelecionado ? "Editar Despesa" : "Nova Despesa"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={modoEditar ? handleEditar : handleAdicionar}>
            <Form.Group controlId="tipoDespesa" style={{marginBottom: "20px"}}>
              <Form.Label>Tipo de Despesa</Form.Label>
              <Form.Select value={tipoDespesa} onChange={(e) => setTipoDespesa(e.target.value)}>
                <option value="Funcionário">Funcionário</option>
                <option value="Geral">Geral</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="descricao" style={{marginBottom: "20px"}}>
              <Form.Label>Descrição</Form.Label>
              <Form.Control type="text" placeholder="Digite o nome da despesa" value={descricao} onChange={handleDescricaoChange}/>
            </Form.Group>
            <Form.Group controlId="funcao" style={{marginBottom: "20px"}}>
              <Form.Label>Função</Form.Label>
              <Form.Control type="text" placeholder="Digite a função do despesa" value={funcao} onChange={handleFuncaoChange} disabled={tipoDespesa === "Geral"}/>
            </Form.Group>
            <Form.Group controlId="valor" style={{marginBottom: "20px"}}>
              <Form.Label>Valor</Form.Label>
              <Form.Control type="number" step="0.01" placeholder="Digite o valor da despesa" value={valor} onChange={handleValorChange}/>
            </Form.Group>
            <Form.Group controlId="data" style={{marginBottom: "20px"}}>
              <Form.Label>Dia Pagamento</Form.Label>
              <Form.Control type="number" min="1" max="31" step="1" placeholder="Digite o dia de vencimento" value={diaVencimento} onChange={handleDiaVencimentoChange}/>
            </Form.Group>
            <Modal.Footer>
              <Button variant="success" type="submit">
                Salvar
              </Button>
              <Button variant="secondary" onClick={() => setModalAberto(false)}>Fechar</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>  
      </Modal>
    </Container>  
  );
};

export default Despesas;
