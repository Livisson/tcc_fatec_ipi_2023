import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Home from "../pages/Home";
import Despesas from "../pages/Despesas";
import Produtos from "../pages/Produtos";

const Private = ({ Item }) => {
  const { signed } = useAuth();
  console.log(Item)
  return signed > 0 ? <Item /> : <Home />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route exact path="/despesas" element={<Private Item={Despesas} />} />
          <Route exact path="/produtos" element={<Private Item={Produtos} />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;