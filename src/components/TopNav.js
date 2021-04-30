import React, { useState } from 'react'
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const TopNav = ({ user, signIn, signUp, signOut }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  function emptyInput(e, type){
    if(!e){
      document.querySelectorAll(`.input-item.${type}`).forEach(i => i.value = '')
      setUsername('')
      setPassword('')
    }
  }

  return (
    <>
      <Navbar bg="primary" className='justify-content-between'>
        <LinkContainer exact to="/">
          <Navbar.Brand>RecipeApp</Navbar.Brand>
        </LinkContainer>
        {"username" in user ? (
          <Nav>
            <button onClick={signOut} className='btn btn-primary'>Sign Out</button>
          </Nav>
        ) : (
          <Nav>
            <Dropdown onToggle={e => emptyInput(e, 'sign-in')}>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Sign In
              </Dropdown.Toggle>
              <Dropdown.Menu align="right">
                <div className='login-div'>
                  <input onChange={e => setUsername(e.target.value)} className='input-item sign-in' placeholder='username'/>
                  <input onChange={e => setPassword(e.target.value)} className='input-item sign-in' placeholder='password' type='password'/>
                  <button onClick={() => signIn(username, password)} className='btn'>Submit</button>
                </div>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown onToggle={e => emptyInput(e, 'sign-up')}>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Sign Up
              </Dropdown.Toggle>
              <Dropdown.Menu align="right">
                <div className='login-div'>
                  <input onChange={e => setUsername(e.target.value)} className='input-item sign-up' placeholder='username'/>
                  <input onChange={e => setPassword(e.target.value)} className='input-item sign-up' placeholder='password' type='password'/>
                  <button onClick={() => signUp(username, password)} className='btn'>Submit</button>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        )}
      </Navbar>
    </>
  );
};

export default TopNav;
