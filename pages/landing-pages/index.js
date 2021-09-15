import Layout from "../../components/layout";
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

export async function getServerSideProps() {
  let data2 = await client.getEntry('ABbhJhQVxkLl5eZcA717j');
  let navbar = await client.getEntry('3He6MS7dqakcFZgWJrFoWs');
  let data = await client.getEntry('19AHxeW8m4Oz4TtBLa6oXS');
  return {
    props: {
      data: data,
      data2: data2,
      navbar: navbar
    },
  };
}

export default function Blog({ data, data2, navbar }) {
  {console.log(data.fields.heroSection[0].fields.carouselItem)}
  return (
    <Layout navbar={navbar}>
 
    {/* External Scripts */}
    <Helmet>
      <script src='../static/script.js' type="text/javascript" />
    </Helmet>
    {console.log(data)}

    {/*!-- Hero Slider */}
    <Carousel className="owl-carousel owl-theme owl-dots-modern home-full-slider owl-loaded owl-drag pt-0 pl-0 pr-0">
      {data.fields.heroSection[0].fields.carouselItem.map((edge, i) => 
      <Carousel.Item key={i} style={{ height: '600px'}}>

        <img src={edge.fields.image.fields.file.url} alt={edge.fields.altText} style={{height: '100%', width: '100%', position: 'absolute'}}/>
        <div className="container-fluid h-100 py-5 absolute">
          <div className="row align-items-center h-100">
            <div className="col-lg-8 col-xl-6 mx-auto text-white text-center">
              <h1 className="mb-4 display-2 text-uppercase font-weight-bold">{edge.fields.name}</h1>
              <p className="lead mb-4">{edge.fields.headline}</p>
              <a className="btn btn-light" href={'/category/'+edge.fields.slug}>Collection</a>
            </div>
          </div>
        </div>
   
    </Carousel.Item>
      )}
    </Carousel>

       {/* News Container */}
       <section className="py-4">
      <div className="container">   
      {/* Content */}
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
    {/*!-- Hero Categories 
    <section>
      <div className="container px-5px pt-5 pb-5">
        <div className="row mx-0">
          {data.topSection.map((edge, i) => 
            <div key={i} node={edge}>
              <h4 className="cursive-style">{edge.fields.name}</h4>
              <div className="content-style">{edge.fields.content}</div>
            </div>
          )}
        </div>
      </div>
    </section>  */}

    {console.log(data.fields.heroSection[0].fields)}
    {console.log(data2)}
    {/*!-- Hero Slider 
    <div className="mt-n2 owl-carousel owl-theme owl-dots-modern home-full-slider owl-loaded owl-drag pt-0 pl-0 pr-0">
      {data.heroSection.map((edge, i) => 
      <div key={i} style={{ height: '600px'}}>

        <iframe className="video-100" src={edge.fields.url} alt={edge.fields.name}/>
   
    </div>
      )}
    </div>*/}

  
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