import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Home = ({ auth }) => {
  if (auth.isAuthenticated) {
    return <Redirect to="/main" />;
  }

  return (
    <div>
      <div className="container mt-5">
        <h1 className="h3">Log in or Register to start tracking issues! </h1>
        <div>Guest Email: guest@gmail.com</div>
        <div>Guest Password: guest123</div>
        <footer>
          <div className="py-3">© 2020 Schade Media, Inc.</div>
        </footer>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Home);
