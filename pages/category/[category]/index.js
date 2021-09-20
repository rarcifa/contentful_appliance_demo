import Layout from "../../../components/layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Parallax } from 'react-parallax';

// CTF props
const contentful = require('contentful');

let client = contentful.createClient({
  space: process.env.NEXT_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_CONTENTFUL_PREVIEW_TOKEN,
  host: 'preview.contentful.com'

});

const category = 'categories';
const product = 'product';
const commerceTools = 'topicCommerceToolProduct';

export async function getServerSideProps({ params }) {
  let navbar = await client.getEntry('3He6MS7dqakcFZgWJrFoWs');
  let data = await client.getEntries({
    content_type: category,
    'fields.slug': params.category,
  });
  // Pass the category into the second getEntries call
  let products = await client.getEntries({
    content_type: product,
    'fields.category.sys.id': data.items[0].sys.id
    // Alternative using slug insteas
    //'fields.category.fields.slug': data.slug
  });

  let commerceToolsItems = await client.getEntries({
    content_type: commerceTools,
    'fields.category.sys.id': data.items[0].sys.id
    // Alternative using slug insteas
    //'fields.category.fields.slug': data.slug
  });
    // Pass the category into the second getEntries call
    // let commerceToolProduct = await client.getEntries({
      // content_type: 'topicCommerceToolProduct',
      //'fields.category.sys.id': data.items[0].sys.id
      // Alternative using slug insteas
      //'fields.category.fields.slug': data.slug
   // });

  return {
    props: {
      data: data.items[0].fields,
      products: products.items,
      commerceToolsItems: commerceToolsItems,
      navbar: navbar
      // commerceToolProduct: commerceToolProduct.items
    },
  };
};

export default function Category({ data, products, commerceToolsItems, navbar}) {
  return (
    <Layout navbar={navbar}>
      {/* Paralax */}
      <Parallax
        bgClassName="dark-background bg-white"
        strength={200}
        bgImage={data.featuredImage.fields.file.url} bgImageAlt={data.title}>
        <div className="container overlay-content hero hero-page">
          {/* Breadcrumbs */}
          <ul className="breadcrumb justify-content-center no-border mt-3 mb-0 tiny">
            <li className="breadcrumb-item"><a className="text-white" href="/">Home</a></li>
            <li className="breadcrumb-item"><a className="text-white" href="/">Categories</a></li>
            <li className="breadcrumb-item text-white active">{data.title}</li>
          </ul>
          <br></br>
          <div className="hero-content pb-5 text-center text-white pt-5 mt-5">
            <h1 className="hero-heading">{data.title}</h1><p className="lead">{data.shortDescription.shortDescription}</p>
          </div>
        </div>
      </Parallax>
      {/* Right Grid */}
      {console.log(commerceToolsItems)}

      <div className="container mt-5">
        <div className="row">
          <div className="products-grid col-xl-9 col-lg-8 order-lg-2">
            <header className="product-grid-header">
              <div className="mr-3 mb-3">
                Showing <strong>1-5</strong> of <strong>5 </strong>loyalty Programs</div>
              <div className="mr-3 mb-3"><span className="mr-2">Show</span><a className="product-grid-header-show active" href="/">12 </a><a className="product-grid-header-show " href="/">24    </a><a className="product-grid-header-show " href="/">All    </a>
              </div>
              <div className="mb-3 d-flex align-items-center"><span className="d-inline-block mr-1">Sort by</span>
                <select className="custom-select w-auto border-0">
                  <option value="orderby_0">Default</option>
                  <option value="orderby_1">Popularity</option>
                  <option value="orderby_2">Rating</option>
                  <option value="orderby_3">Newest first</option>
                </select>
              </div>
            </header>
            {/* Product Grid */}
            <div className="row">
              {products.map((edge, i) =>
                <Products key={i} node={edge} />
              )}

              {/* Commerce Tools Integration */}

            </div>
          </div>
          <div className="sidebar col-xl-3 col-lg-4 order-lg-1">
            <div className="sidebar-block px-3 px-lg-0 mr-lg-4"><a className="d-lg-none block-toggler" data-toggle="collapse" href="#categoriesMenu" aria-expanded="false" aria-controls="categoriesMenu">Product Categories</a>
              <div className="expand-lg collapse" id="categoriesMenu">
                <div className="nav nav-pills flex-column mt-4 mt-lg-0">
                  <a className="nav-link d-flex justify-content-between mb-2 " href="/">
                    <span>Kitchen</span><span className="sidebar-badge"> 120</span>
                  </a>
                  <div className="nav nav-pills flex-column ml-3"><a className="nav-link mb-2" href="/">Lorem ipsum</a><a className="nav-link mb-2" href="/">Dolor</a><a className="nav-link mb-2" href="/">Sit amet</a><a className="nav-link mb-2" href="/">Donec vitae</a>
                  </div><a className="nav-link d-flex justify-content-between mb-2 active" href="/"><span>Appliances</span><span className="sidebar-badge"> 55</span></a>
                  <div className="nav nav-pills flex-column ml-3"><a className="nav-link mb-2" href="/">Lorem ipsum</a><a className="nav-link mb-2" href="/">Dolor</a><a className="nav-link mb-2" href="/">Sit amet</a><a className="nav-link mb-2" href="/">Donec vitae</a>
                  </div><a className="nav-link d-flex justify-content-between mb-2 " href="/"><span>Accessories</span><span className="sidebar-badge"> 80</span></a>
                  <div className="nav nav-pills flex-column ml-3"><a className="nav-link mb-2" href="/">Sit amet</a><a className="nav-link mb-2" href="/">Donec vitae</a><a className="nav-link mb-2" href="/">Lorem ipsum</a><a className="nav-link mb-2" href="/">Dolor</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>

  );
}
/* Product Component */
const Products = ({ node }) => {
  return (
    <div className="col-6 col-xl-4 col-sm-6">
      <div className="product">
        <div className="product-image">
          {node.fields.newArrival === "Yes" &&
            <div className="ribbon ribbon-warning">
              New
              </div>
          }
          <img className="img-fluid" src={node.fields.featuredImage.fields.mediaReference[0].fields.file.url} alt={node.fields.title} />
          <div className="product-hover-overlay">
            <a href={'../product/' + node.fields.slug} className="product-hover-overlay-link"></a>
            <div className="product-hover-overlay-buttons">
              <a href={'../product/' + node.fields.slug} className="btn btn-dark btn-buy">
                <i className="fa-search fa"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="py-2">
          <p className="text-muted text-sm mb-1">{node.fields.category[0].fields.title}</p>
          <h3 className="h6 mb-1">
            <a className="text-dark" href={'../product/' + node.fields.slug}>{node.fields.title}</a>
          </h3><span className="text-muted"> {node.fields.discountedPrice}</span>
        </div>
      </div>
    </div>
  )
}


/* Product Component
const ProductsCommercetools = ({ node }) => {
  return (
    <div className="col-6 col-xl-4 col-sm-6">
      <div className="product">
        <div className="product-image">

          <img className="img-fluid" src={node.masterVariant.images[0].url} alt={node.masterVariant.name} />
          <div className="product-hover-overlay">
            <a href={'../product/' + (node.masterVariant.slug)} className="product-hover-overlay-link"></a>
            <div className="product-hover-overlay-buttons">
              <a href={'../product/' + node.masterVariant.slug} className="btn btn-dark btn-buy">
                <i className="fa-search fa"></i>
              </a>
            </div>
          </div>

        </div>
        <div className="py-2">
          <p className="text-muted text-sm mb-1">{(node.name.en)}</p>
          <h3 className="h6 mb-1">
            <a className="text-dark" href={'../product/' + node.masterVariant.slug}>{node.masterVariant.name}</a>
          </h3><span className="text-muted"> {node.masterVariant.prices[0].value.centAmount}</span>
        </div>
      </div>
    </div>
  )
*/