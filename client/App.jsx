import React from 'react';
import { Route, Link, Switch, useLocation } from 'react-router-dom';
import HomePage from './containers/HomePage';
import CatalogPage from './containers/CatalogPage';
import CategoryPage from './containers/CategoryPage';
import ProductPage from './containers/ProductPage';
import NotFound from './components/NotFound';
import ProductCreator from './components/ProductCreator';

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
      <Route exact={true} path="/" component={HomePage} />
      <Route exact={true} path="/catalog" component={CatalogPage} />

      <Route
        exact={true}
        path="/catalog/product/:pid"
        // render={({ match }) => <ProductPage match={match} />}
        component={ProductPage}
      />
      <Route
        exact={true}
        path="/catalog/:catName/:catId"
        // render={({ match }) => <CategoryPage match={match} />}
        component={CategoryPage}
      />
      <Route path="/*" children={<NotFound />} />
    </Switch>
    {/* footer */}
    <footer className="footer">
      <p>Footer</p>
    </footer>
  </div>
);

export default App;
