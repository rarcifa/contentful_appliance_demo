import Layout from "../../components/layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const element = <FontAwesomeIcon icon={faStar} />

const contentful = require('contentful');

let client = contentful.createClient({
  space: process.env.NEXT_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_CONTENTFUL_PREVIEW_TOKEN,
  host: 'preview.contentful.com'
});

const product = 'product';

export async function getServerSideProps({ params }) {
  let navbar = await client.getEntry('3He6MS7dqakcFZgWJrFoWs');
  let data = await client.getEntries({
    content_type: 'product',
    'fields.slug': params.slug,
  })
  let space = await client.getEntries({
    content_type: 'product',
    'fields.slug': params.slug,
  })
  return {
    props: {
      data: data.items[0].fields,
      space: space,
      navbar: navbar
    },
  };
}

export default function Product({ data, space, navbar }) {

  return (
    <Layout navbar={navbar}>
      {console.log(space)}
      <section className="container-fluid">
        <div className="row">
          <div className="col-lg-5 py-3 order-2 order-lg-1">
            <div className="item">
              <div className="container">
                <img src={data.featuredImage.fields.mediaReference[0].fields.file.url+'?'} alt="test" />
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center col-lg-6 col-xl-5 pl-lg-5 mb-5 order-1 order-lg-2 mt-n5">
            <div>
              <div className="col-12 pl-0">
                <ul className="breadcrumb justify-content-start">
                  <li className="breadcrumb-item"><a href="/">Home</a></li>
                  <li className="breadcrumb-item"><a href={"/category/" + data.category[0].fields.slug}>{data.category[0].fields.title}</a></li>
                  <li className="breadcrumb-item active">{data.title}</li>
                </ul>
                <h1 className="mb-4">{data.title}</h1>
                <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between mb-4">
                  <div className="list-inline mb-2 mb-sm-0">
                    <li className="list-inline-item h4 font-weight-light mb-0">EUR{data.discountedPrice}</li>
                    <li className="list-inline-item text-muted font-weight-light">
                      <del>EUR{data.price}</del>
                    </li>
                  </div>
                  <div className="d-flex align-items-center">
                    <ul className="list-inline mr-2 mb-0">
                      <li className="list-inline-item mr-0"><span className="purple">{element}</span></li>
                      <li className="list-inline-item mr-0"><span className="purple">{element}</span></li>
                      <li className="list-inline-item mr-0"><span className="purple">{element}</span></li>
                      <li className="list-inline-item mr-0"><span className="purple">{element}</span></li>
                      <li className="list-inline-item mr-0"><span className="light-grey">{element}</span></li>
                    </ul><span className="text-muted text-uppercase text-sm">{data.numberReviews} review</span>
                  </div>
                </div>
                <p className="mb-4 text-muted">{data.description.description}</p>
              </div>
              <div className="row">
                <div className="col-sm-6 col-lg-12 detail-option mb-3">
                  <h6 className="detail-option-heading">Size <span>(required)</span></h6>
                  <label className="btn btn-sm btn-outline-secondary detail-option-btn-label mr-1" htmlFor="size_0"> Small
                                        <input className="input-invisible" type="radio" name="size" defaultValue="value_0" id="size_0" required="" />
                  </label>
                  <label className="btn btn-sm btn-outline-secondary detail-option-btn-label mr-1" htmlFor="size_1"> Medium
                                        <input className="input-invisible" type="radio" name="size" defaultValue="value_1" id="size_1" required="" />
                  </label>
                  <label className="btn btn-sm btn-outline-secondary detail-option-btn-label" htmlFor="size_2"> Large
                                        <input className="input-invisible" type="radio" name="size" defaultValue="value_2" id="size_2" required="" />
                  </label>
                </div>
                <div className="col-sm-6 col-lg-12 detail-option mb-3">
                  <h6 className="detail-option-heading">Type <span>(required)</span></h6>
                  <label className="btn btn-sm btn-outline-secondary detail-option-btn-label mr-1" htmlFor="material_0"> Hoodie
                                        <input className="input-invisible" type="radio" name="material" defaultValue="value_0" id="material_0" required="" />
                  </label>
                  <label className="btn btn-sm btn-outline-secondary detail-option-btn-label mr-1" htmlFor="material_1"> College
                                        <input className="input-invisible" type="radio" name="material" defaultValue="value_1" id="material_1" required="" />
                  </label>
                </div>
                <div className="col-12 detail-option mb-3">
                  <h6 className="detail-option-heading">Colour <span>(required)</span></h6>
                  <ul className="list-inline mb-0 colours-wrapper">
                    <li className="list-inline-item">
                      <label className="btn-colour for-blue">
                        <input className="input-invisible" type="radio" name="colour" required="" />
                      </label>
                    </li>
                    <li className="list-inline-item">
                      <label className="btn-colour for-white">
                        <input className="input-invisible" type="radio" name="colour" required="" />
                      </label>
                    </li>
                    <li className="list-inline-item">
                      <label className="btn-colour for-violet">
                        <input className="input-invisible" type="radio" name="colour" required="" />
                      </label>
                    </li>
                    <li className="list-inline-item">
                      <label htmlFor="for-red" className="btn-colour for-red">
                        <input className="input-invisible" type="radio" name="colour" required="" />
                      </label>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-lg-6 detail-option mb-5">
                  <label htmlFor="quantity" className="detail-option-heading font-weight-bold">Items <span>(required)</span></label>
                  <input className="form-control detail-quantity" name="items" type="number" defaultValue="1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>

  );

}