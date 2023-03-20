import React, { useState, useEffect } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FaUser, FaChartBar, FaMapMarkedAlt, FaClipboardList, FaBox, FaMoneyBillWave, FaCashRegister, FaCog, FaSignOutAlt, FaTrash, FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import LogoCompre from "../../LogoCompre.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Table, Button, Col, Row, Container, Modal, Form, Toast, InputGroup } from 'react-bootstrap';
import './styleCaixa.css';
import axios from "axios";

const Caixa = () => {

  const [fornecedor, setFornecedor] = useState([]);
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [modoEditar, setModoEditar] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [cnpj, setCNPJ] = useState("");
  const [nome, setNome] = useState("");

  function handleCNPJChange(event) {
    setCNPJ(event.target.value);
  }

  function handleNomeChange(event) {
    setNome(event.target.value);
  }

  function getFornecedor() {
    axios.get('https://localhost:44334/Fornecedor')
    .then(response => {
      setFornecedor(response.data.filter(fornecedor => fornecedor.tipo !== "Geral"));
    })
    .catch(error => {
      console.log(error);
    });
  }

  const handleAdicionar = (event) => {
    event.preventDefault();


    const novoFornecedor = {
      cnpj: cnpj,
      nome: nome,
    };

    axios.post("https://localhost:44334/Fornecedor/", novoFornecedor)
    .then(response => {
      getFornecedor();
      setSuccessMessage("Fornecedor inserido com Sucesso!")
      setShowSuccessToast(true)
    })
    .catch(error => {
      console.log(error);
      setErrorMessage("Erro ao salvar fornecedor.")
      setShowErrorToast(true)
    });

    setCNPJ("");
    setNome("");
    setModalAberto(false);
  }

  const handleEditar = (event) => {
    event.preventDefault();

    console.log(fornecedor)
    const fornecedorEditado = {
      cnpj: itemSelecionado.cnpj,
      nome: nome,
    };
  
    axios.put("https://localhost:44334/Fornecedor/", fornecedorEditado)
    .then(response => {
      getFornecedor();
      setSuccessMessage("Fornecedor editado com sucesso!")
      setShowSuccessToast(true)
    })
    .catch(error => {
      console.log(error);
      setErrorMessage(error.message || "Erro ao editar fornecedor.")
      setShowErrorToast(true)
    });
  
    setCNPJ("");
    setNome("");
    setItemSelecionado(null);
    setModalAberto(false);
  }
  
  function handleCloseDeleteConfirmation(confirmed) {
    if (confirmed) {

      axios.delete(`https://localhost:44334/Fornecedor/${itemToDelete.id}`)
        .then(response => {
          getFornecedor();
          setSuccessMessage("Fornecedor excluído com sucesso!")
          setShowSuccessToast(true)
        })
        .catch(error => {
          console.log(error);
          setErrorMessage(error.message || "Erro ao excluir Fornecedor.")
          setShowErrorToast(true)
        });
    }
    setShowDeleteConfirmation(false);
    setItemToDelete(null);
  }
  
  useEffect(() => {
    axios.get('https://localhost:44334/Fornecedor')
      .then(response => {
        setFornecedor(response.data.filter(fornecedor => fornecedor.tipo !== "Geral"));
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const userToken = localStorage.getItem("user_token");

  const adicionarFornecedor = () => {
    setCNPJ("");
    setNome("");
    setModalAberto(true);
    setModoEditar(false);
  };

  const editarFornecedor = (item) => {
    setItemSelecionado(item);
    setCNPJ(item.cnpj);
    setNome(item.nome);
    setModalAberto(true);
    setModoEditar(true);
  };

  const removerFornecedor = (item) => {
    setItemToDelete(item);
    setShowDeleteConfirmation(true);
  };

  return (
    <Container style={{ backgroundColor: "white" }}>
      <Row className="justify-content-md-center">
        <Col style={{textAlign: "left", verticalAlign: "middle", alignSelf: "center"}}>
          <img src={LogoCompre} alt="Logo" height="80" style={{borderRadius: 7}}/>
        </Col>
        <Col style={{textAlign: "left", verticalAlign: "middle", alignSelf: "center"}} xs={6}><label style={{fontSize:22, fontWeight: "bold", color: "gray"}}>CAIXA</label></Col>
        <Col style={{textAlign: "right", verticalAlign: "middle", alignSelf: "center"}}>
          <Row style={{ height: '50px'}}>
            <div className="mb-2">
              <DropdownButton
                key="start"
                id={`dropdown-button-drop-start`}
                drop="start"
                variant="outline-secondary"
                title={
                  <>
                    <span style={{marginLeft: "10px", marginRight: "10px"}}>{JSON.parse(userToken).name}</span>
                    <FaUser className="me-2" />
                  </>
                }
              >
                <Dropdown.Item eventKey="1"><Link to="/config" style={{color: 'grey', textDecoration: 'none', display: 'flex', alignItems: 'center'}}><FaCog  className="me-2" />Configurações</Link></Dropdown.Item>
                <Dropdown.Item eventKey="2"><Link to="/" style={{color: 'grey', textDecoration: 'none', display: 'flex', alignItems: 'center'}}><FaSignOutAlt  className="me-2" />Sair</Link></Dropdown.Item>
              </DropdownButton>
            </div>
          </Row>
        </Col>
      </Row>
      <br/>
      <Row className="justify-content-md-center">
        <div className="d-flex justify-content-between">
          <Button variant="light" className="custom-button-menu"><Link style={{color: 'grey'}} className="nav-link" to="/consolidado"><FaChartBar className="me-2" />Consolidado</Link></Button>
          <Button variant="light" className="custom-button-menu"><Link style={{color: 'grey'}} className="nav-link" to="/despesas"><FaMapMarkedAlt className="me-2" />Mapa de Custos</Link></Button>
          <Dropdown className="d-inline-block">
            <Dropdown.Toggle style={{color: 'grey'}} className="custom-button-menu" variant="light" id="dropdown-basic">
              <FaClipboardList className="me-2" />Pedidos
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item style={{color: 'grey'}}><Link style={{color: 'grey'}} className="nav-link" to="/pedidos">Pedidos</Link></Dropdown.Item>
              <Dropdown.Item style={{color: 'grey'}}><Link style={{color: 'grey'}} className="nav-link" to="/fornecedores">Fornecedores</Link></Dropdown.Item>
              <Dropdown.Item style={{color: 'grey'}}><Link style={{color: 'grey'}} className="nav-link" to="/produtos">Produtos</Link></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="light" className="custom-button-menu"><Link style={{color: 'grey'}} className="nav-link" to="/estoque"><FaBox className="me-2" />Estoque</Link></Button>
          <Button variant="light" className="custom-button-menu"><Link style={{color: 'grey'}} className="nav-link" to="/precificar"><FaMoneyBillWave className="me-2" />Precificação</Link></Button>
          <Button variant="light" className="custom-button-menu-selected"><Link style={{color: 'grey'}} className="nav-link" to="/caixa"><FaCashRegister className="me-2" />Caixa</Link></Button>
        </div>
      </Row>
      <br/>
      <br/>
      <Row>
        <Col>
          <Table striped hover>
            <thead>
              <tr>
                <th className="text-center">ITEM</th>
                <th className="text-center">EAN</th>
                <th className="text-center">DESCRIÇÃO</th>
                <th className="text-center">QUANT.</th>
                <th className="text-center">UNIT.</th>
                <th className="text-center">DESC. %</th>
                <th className="text-center">R$ FINAL</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {fornecedor.map((item, index) => (
                <tr key={item.id}>
                  <td style={{ verticalAlign: "middle", textAlign: "center"}}>{item.cnpj}</td>
                  <td style={{ verticalAlign: "middle"}}>{item.nome}</td>
                  <td className="text-center" style={{ verticalAlign: "middle"}}>
                    <Button variant="outline-secondary" style={{ border: "none"}} onClick={() => editarFornecedor(item)}>
                      <FaPencilAlt />
                    </Button>
                    <Button variant="outline-secondary" style={{ border: "none"}} onClick={() => removerFornecedor(item)}>
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col xs={3}>
          <Form.Label>Nome</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control placeholder="Username"/>
          </InputGroup>
          <Form.Label>Nome</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control placeholder="Username"/>
          </InputGroup>
          <Row>
            <Col>
              <Form.Label>Nome</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control placeholder="Username"/>
              </InputGroup>
            </Col>
            <Col>
              <Form.Label>Nome</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control placeholder="Username"/>
              </InputGroup>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* <Row className="justify-content-md-center">
        <div className="d-flex justify-content-between">
          <label style={{fontWeight: "bold", color: "Green"}}>Fornecedores</label>
          <Button variant="warning" className="custom-button-add" style={{ height: "35px", width: "100px", marginBottom: "5px", color:"grey" }} onClick={() => adicionarFornecedor()}>Adicionar</Button>
        </div>
      </Row>
      <Row>
        <Table striped hover>
          <thead>
            <tr>
              <th className="text-center">CNPJ</th>
              <th>Fornecedor</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {fornecedor.map((item, index) => (
              <tr key={item.id}>
                <td style={{ verticalAlign: "middle", textAlign: "center"}}>{item.cnpj}</td>
                <td style={{ verticalAlign: "middle"}}>{item.nome}</td>
                <td className="text-center" style={{ verticalAlign: "middle"}}>
                  <Button variant="outline-secondary" style={{ border: "none"}} onClick={() => editarFornecedor(item)}>
                    <FaPencilAlt />
                  </Button>
                  <Button variant="outline-secondary" style={{ border: "none"}} onClick={() => removerFornecedor(item)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      <br/>
      <Modal show={modalAberto} onHide={() => setModalAberto(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{fontWeight: "bold", color: "Grey"}}>{itemSelecionado ? "Editar Fornecedor" : "Novo Fornecedor"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={modoEditar ? handleEditar : handleAdicionar}>
            <Form.Group controlId="CNPJ" style={{marginBottom: "20px"}}>
              <Form.Label>CNPJ</Form.Label>
              <Form.Control type="text" placeholder="Digite o CNPJ do fornecedor" value={cnpj} onChange={handleCNPJChange}/>
            </Form.Group>
            <Form.Group controlId="nome" style={{marginBottom: "20px"}}>
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" placeholder="Digite o nome do fornecedor" value={nome} onChange={handleNomeChange} />
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
      {showDeleteConfirmation && (
        <Modal show={showDeleteConfirmation} onHide={() => handleCloseDeleteConfirmation(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmação de exclusão</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tem certeza que deseja excluir o fornecedor "{itemToDelete.nome}"?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => handleCloseDeleteConfirmation(true)}>
              Confirmar
            </Button>
            <Button variant="secondary" onClick={() => handleCloseDeleteConfirmation(false)}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <Toast show={showErrorToast} onClose={() => setShowErrorToast(false)} bg="danger" delay={3000} autohide>
        <Toast.Body className="text-white">{errorMessage}</Toast.Body>
      </Toast>
      <Toast show={showSuccessToast} onClose={() => setShowSuccessToast(false)} bg="success" delay={3000} autohide>
        <Toast.Body className="text-white">{successMessage}</Toast.Body>
      </Toast>   */}
    </Container>
  );
};

export default Caixa;