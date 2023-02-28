import React, { useState, useEffect } from "react";
import { FaUser, FaChartBar, FaMapMarkedAlt, FaClipboardList, FaBox, FaMoneyBillWave, FaCashRegister, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import LogoCompre from "../../LogoCompre.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Table, Button, Col, Row, Container, Modal, Form } from 'react-bootstrap';
import './styleDespesa.css';
import axios from "axios";

const Despesas = () => {

  const [despesas, setDespesas] = useState([]);
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    axios.get('https://localhost:44334/Despesa')
      .then(response => {
        setDespesas(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const userToken = localStorage.getItem("user_token");

  const editarDespesa = (item) => {
    setItemSelecionado(item);
    setModalAberto(true);
  };

  const removerDespesa = (item) => {
    console.log(JSON.stringify(item))
    axios.delete("https://localhost:44334/Despesa/", JSON.stringify(item))
      .then(response => {
        const novasDespesas = despesas.filter(despesa => despesa.id !== item.id);
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
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>N°</th>
              <th>Funcionários</th>
              <th>Função</th>
              <th>Valor</th>
              <th>Dia Pagamento</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {despesas.map((item, index) => (
              <tr key={item.id}>
                <td>{index}</td>
                <td>{item.descricao}</td>
                <td>{item.tipo}</td>
                <td>R$ {item.valor.toFixed(2)}</td>
                <td>{item.diaVencimento}</td>
                <td>
                  <Button variant="primary" onClick={() => editarDespesa(item)}>
                    Editar
                  </Button>
                  <Button variant="danger" onClick={() => removerDespesa(item)}>
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      <Modal show={modalAberto} onHide={() => setModalAberto(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{itemSelecionado ? "Editar Despesa" : "Nova Despesa"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="descricao">
              <Form.Label>Descrição</Form.Label>
              <Form.Control type="text" placeholder="Digite a descrição da despesa" defaultValue={itemSelecionado ? itemSelecionado.descricao : ""}/>
            </Form.Group>
            <Form.Group controlId="valor">
              <Form.Label>Valor</Form.Label>
              <Form.Control type="number" step="0.01" placeholder="Digite o valor da despesa" defaultValue={itemSelecionado ? itemSelecionado.valor.toFixed(2) : ""}/>
            </Form.Group>
            <Form.Group controlId="data">
              <Form.Label>Data</Form.Label>
              <Form.Control type="text" placeholder="Digite a data da despesa" defaultValue={itemSelecionado ? itemSelecionado.data : ""}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalAberto(false)}>Fechar</Button>
        </Modal.Footer>
      </Modal>
    </Container>  
  );
};

export default Despesas;
