
import React from "react"

export function Header (navbar) {
  return (
    <header>
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 1100,
        padding: `1rem 1rem`,
      }}
    >
    <nav style={{ margin: 0 }} className="navbar navbar-expand-lg navbar-sticky navbar-airy navbar-light bg-light-1 bg-fixed-dark fixed-top">
        <div className="container">  
          {/* Navbar Header */}
          <span width="24" height="24" className="mr-5 pr-3"><img src={navbar.navbar.fields.logo.fields.file.url} style={{width: "170px"}}/></span>


          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation"><i className="fa fa-bars"></i></button>
          {/* Navbar Collapse */} 
          <div className="collapse navbar-collapse" id="navbarToggleExternalContent">
            {/*N avbar Menue */} 
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {navbar.navbar.fields.menuElements.map(MenuItem => 

              <li className="nav-item mr-2">
                <a className="nav-link text-dark active nav-font" aria-current="page" href={MenuItem.fields.slug}><b>{MenuItem.fields.name}</b></a>
              </li>
              )}

            </ul>
            {/* Right Navbar Area */}
            <ul className="navbar-nav ml-auto">
            <div className="d-flex align-items-center justify-content-between justify-content-lg-end mt-1 mb-2 my-lg-0">
              {/* Icon 1 */}
              <a className="ml-1 mr-2 text-dark text-sm" href="#">
                <i className="fas fa-hashtag"></i>
              </a>
              <a className="ml-1 mr-2 text-dark text-sm"  href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a className="ml-1 mr-1 text-dark text-sm" href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a className="ml-4 mr-4 text-dark text-sm" href="#">
                 <i className="far fa-shopping-cart"></i>
              </a>
              <div className="nav-item na vbar-icon-link" data-toggle="search">
                <div className="dropdown text-sm">
                  <button className="btn btn-nav dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-user mr-2"></i>
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item text-dark text-sm" href="#"><i className="grey-light fas fa-sign-in-alt mr-2"></i><span className="text-dark">Login</span></a>
                    <a className="dropdown-item text-dark text-sm" href="#"><i className="grey-light fas fa-users-medical mr-2"></i><span className="text-dark">Sign Up</span></a>
                  </div>
                </div>
              </div>
            </div>

            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>
)
}

export default Header

