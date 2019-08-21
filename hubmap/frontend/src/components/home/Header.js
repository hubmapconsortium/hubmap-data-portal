import React from 'react';

function Header() {
  /* eslint jsx-a11y/anchor-is-valid: 0 */
  // TODO: Change <a> to <button>?
  return (
    <nav>
      <span style={{ display: 'inline-block' }}>
        <h2 className="headingclass">Welcome HuBMAP Data Portal!</h2>
        <span className="spanclass"><a className="aclass" to="/experiments" style={{ textDecoration: 'none', color: 'white' }}>Studies</a></span>
        <span className="spanclass"><a className="aclass" to="/about" style={{ textDecoration: 'none', color: 'white' }}> About</a></span>
        <span className="spanclass"><a className="aclass" to="/about" style={{ textDecoration: 'none', color: 'white' }}> Home</a></span>
      </span>
    </nav>
  );
}

export default Header;
