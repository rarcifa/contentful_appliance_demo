import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import Helmet from "react-helmet"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
const element = <FontAwesomeIcon icon={faHeart} />

export function Layout ({ children, navbar}) {
  console.log(navbar)
  return (
    <>
      <Header navbar={navbar}/>
      <Helmet>
          <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"></script>
          <script src="https://kit.fontawesome.com/b9cd0203fc.js" type="text/javascript" />
          <script src="../static/brands.js" type="text/javascript" />
          <script src="../static/solid.js" type="text/javascript" />
      </Helmet>
      <div
        style={{
          marginTop: '1rem'
        }}
      >
        <main>{children}</main>
        <footer className="pt-4 my-md-5 pt-md-5 border-top">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md">
                <span className="mb-2 logo-brand" width="24" height="24">D.</span> <span>Demo</span>
                <small className="d-block mb-3 mt-3 text-muted">© {new Date().getFullYear()}, Built with
            {` `}
                  <span className="purple">{element}</span>
                  <a className="ml-1" href="#">Contentful</a></small>
              </div>
              <div className="col-6 col-md">
                <h5>Features</h5>
                <ul className="list-unstyled text-small ml-0">
                  <li><a className="text-muted" href="#">Cool stuff</a></li>
                  <li><a className="text-muted" href="#">Random feature</a></li>
                  <li><a className="text-muted" href="#">Team feature</a></li>
                  <li><a className="text-muted" href="#">Stuff for developers</a></li>
                  <li><a className="text-muted" href="#">Another one</a></li>
                  <li><a className="text-muted" href="#">Last time</a></li>
                </ul>
              </div>
              <div className="col-6 col-md">
                <h5>Resources</h5>
                <ul className="list-unstyled text-small ml-0">
                  <li><a className="text-muted" href="#">Resource</a></li>
                  <li><a className="text-muted" href="#">Resource name</a></li>
                  <li><a className="text-muted" href="#">Another resource</a></li>
                  <li><a className="text-muted" href="#">Final resource</a></li>
                </ul>
              </div>
              <div className="col-6 col-md">
                <h5>About</h5>
                <ul className="list-unstyled text-small ml-0">
                  <li><a className="text-muted" href="#">Team</a></li>
                  <li><a className="text-muted" href="#">Locations</a></li>
                  <li><a className="text-muted" href="#">Privacy</a></li>
                  <li><a className="text-muted" href="#">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
