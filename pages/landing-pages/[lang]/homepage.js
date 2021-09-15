import Layout from "../../../components/layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel'
import Helmet from "react-helmet"
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as moment from 'moment'

const element = <FontAwesomeIcon icon={faClock} />
const contentful = require('contentful');

let client = contentful.createClient({
  space: process.env.NEXT_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_CONTENTFUL_PREVIEW_TOKEN,
  host: 'preview.contentful.com',
  resolveLinks: true,
  include: 10,
});

export async function getServerSideProps({ params }) {
  let navbar = await client.getEntry('3He6MS7dqakcFZgWJrFoWs');
  let data = await client.getEntries({
    content_type: 'pageLandingPage',
    'fields.lang': params.lang,
  })
  return {
    props: {
      data: data.items[0],
      navbar: navbar
    },
  };
}

export default function Blog({ data, navbar }) {
  {console.log(data.fields.heroSection[0].fields)}
  return (
    <Layout navbar={navbar}>
 
    {/* External Scripts */}
    <Helmet>
      <script src='../static/script.js' type="text/javascript" />
    </Helmet>


    {/*!-- Hero Slider   */}
    <Carousel className="owl-carousel owl-theme owl-dots-modern home-full-slider owl-loaded owl-drag pt-0 pl-0 pr-0">
      {data.fields.heroSection[0].fields.carouselItem.map((edge, i) => 
      <Carousel.Item key={i} style={{ height: '800px'}}>

        <img src={edge.fields.image.fields.file.url} alt={edge.fields.altText} style={{height: '100%', width: '100%', position: 'absolute'}}/>
        <div className="container-fluid h-100 py-5 absolute">
          <div className="row align-items-center h-100">
            <div className="col-lg-8 col-xl-6 mx-auto text-white text-center">
              <h1 className="mb-4 display-3 font-weight-bold">{edge.fields.name}</h1>
              <p className="lead mb-4">{edge.fields.headline}</p>
              <a className="btn btn-light" href={'/category/'+edge.fields.slug}>Read</a>
            </div>
          </div>
        </div>
   
    </Carousel.Item>
      )}
    </Carousel> 

       {/* News Container  */}
       <section className="py-4">
      <div className="container">   
      {/* Content   */}
      <div className="container mt-3">
        <div className="col-xl-8 mx-auto text-center mt-2">
          <h2 className="text-uppercase">FROM OUR BLOG</h2>
          <p className="lead text-muted">This is an example of how blog posts can be used in Contentful</p>
        </div>
      </div>
      <div className="row">
        {data.fields.thirdSection.map((edge, i) => 
          <BlogPost key={i} node={edge}/>
        )}
      </div>
    </div>

    </section>


  
    </Layout>

  );

}

/* Latest News Component */
const BlogPost = ({node}) => {

  return (
    <div className="col-4">
        <div className="top">
  
         <img alt={node.fields.title} src={(node.fields.featuredImage.fields.file.url+"?fit=crop&w=600&h=500")}/>
          <div className="card-text"><small><span className="tiny light-grey mr-1">{element}</span><span className="text-muted">{moment(node.fields.publicationDate).format("MMM Do YY")}</span></small></div>
          <a className="text-dark" href={"/blog-post/"+ node.sys.id}><b>{node.fields.title}</b></a>
          <div className="grey"><small>{node.fields.content}</small></div>
        </div>
    </div>
  )
}