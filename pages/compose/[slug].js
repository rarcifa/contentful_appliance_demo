import Layout from "../../components/layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import * as moment from 'moment'

// Contentful Client Initializer
const contentful = require('contentful');

let client = contentful.createClient({
  space: process.env.NEXT_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_CONTENTFUL_PREVIEW_TOKEN,
  host: 'preview.contentful.com'
});

// Content Types
const blog = 'pageComposeBlogPost';
const metadata = 'page';

// Server Side Props from API
export async function getServerSideProps( {params}) {
  let navbar = await client.getEntry('3He6MS7dqakcFZgWJrFoWs');
  let data = await client.getEntries({
    content_type: blog,
  })
  let page = await client.getEntries({
    content_type: metadata,
    'fields.id': params.id,
  })
  return {
    props: {
      data: data.items[0].fields,
      page: page.items[0].fields,
      navbar: navbar
    },
  };
}

// Main Function for Compose Page
export default function Blog({ data, page, navbar }) {
  
  // Richtext Options
  const document = data.richText;
  const options = {
    renderNode: {

      // Embedded Assets
      [BLOCKS.EMBEDDED_ASSET]: (node) => (
        <img className="rounded mb-3 mt-3 mx-auto d-block"
          src={node.data?.target?.fields?.file?.url}
          alt={node.data?.target?.fields?.title}
        />
      ),
      // Embedded Entries for Dailymotion
      [BLOCKS.EMBEDDED_ENTRY]: (node) => (
        <div className="dailymotion-div mb-3"> 
          <iframe className="dailymotion-iframe" frameBorder="0" type="text/html" src={node.data?.target?.fields?.url} width="100%" height="100%" allowFullScreen false="autoplay">  
          </iframe> 
        </div>
      ),
    },
  };

  return (
    <Layout navbar={navbar}>
      {console.log(data)}
      {console.log(page)}
      {/* First Section */}
      <section className="hero">
        <div className="container">
          {/* Breadcrumbs */}
          <ol className="breadcrumb justify-content-center tiny mt-4 pt-4">
            <li className="breadcrumb-item"><a className="text-dark" href="/">Home</a></li>
            <li className="breadcrumb-item"><a className="text-dark" href="/">Blog</a></li>
            <li className="breadcrumb-item active">{data.title}</li>
          </ol>
          {/* Hero Content */}
          <div className="hero-content pb-5 text-center">
            <h1 className="mb-5">{data.title}</h1>
            <div className="row">
              <div className="col-xl-8 offset-xl-2">
                <p className="text-muted mb-0">
                  <img src={data.reference.fields.avatar.fields.file.url} alt={data.reference.name} className="img-avatar rounded-circle mr-2" />
                     By <b className="text-dark">{data.reference.fields.name}</b>
                  <span className="mx-1"> | </span> {moment(data.publicationDate).format("MMM Do YY")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Second Section */}
      <section>
        <div className="container">
          <div className="row">
            <div className="col-xl-10 mx-auto">
          
              <img className="img-fluid rounded mx-auto d-block" src={data.featuredImage.fields.file.url} alt={data.title} />

            </div>
          </div>
          <br></br>
          <div className="row">
            <div className="col-xl-8 col-lg-8 mx-auto text-justify">
              {/* RichText */}
              {documentToReactComponents(document, options)}
              {data.extraSection
              ?
              <iframe className="container blog-video " src={data.extraSection[0].fields.url} alt={data.extraSection[0].fields.name}/>
                :
                <>
                </>
            }
            </div>
          </div>
        </div>
      </section>
    </Layout>

  );

}