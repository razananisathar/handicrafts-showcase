import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import HomePage from './containers/HomePage';
import CatalogPage from './containers/CatalogPage';
import ProductPage from './containers/ProductPage';

const App = (props) => (
  <div id="app">
    {/* Header */}
    <header>
      <nav className="navbar">
        <div className="logo">
          <p>Handicrafts</p>
        </div>
        <div className="nav-menu">
          <Link to="/">Home</Link>
          <Link to="/catalog">Catalog</Link>
        </div>
      </nav>
    </header>

    {/* containers */}
    <Switch>
      <Route exact path="/" children={<HomePage />} />
      <Route exact path="/catalog" children={<CatalogPage />} />
      <Route
        exact
        path="/catalog/:categoryName"
        render={({ match }) => <CategoryPage match={match} />}
      />
      <Route
        exact
        path="/catalog/product/:pid"
        render={({ match }) => <ProductPage match={match} />}
      />
    </Switch>
    {/* footer */}
    <footer className="footer">
      <p>Footer</p>
    </footer>
  </div>
);

export default App;
