import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'bootstrap/dist/css/bootstrap.min.css';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import "@fortawesome/fontawesome-svg-core/styles.css";
import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';

const contentful = require('contentful');

let client = contentful.createClient({
  space: process.env.NEXT_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_CONTENTFUL_PREVIEW_TOKEN,
  host: 'preview.contentful.com'
});

/* get static paths for blogs based on slug
export async function getStaticPaths() {
    let data = await client.getEntries({
        content_type: 'componentProductComponent',
    });

    // return blogs by slug loop
    return {
        paths: data.items.map((item) => ({   
            params: { id: item.sys.id },
        })),
        fallback: false,
    };
} */

export async function getServerSideProps({ params }) {
    let navbar = await client.getEntry('3He6MS7dqakcFZgWJrFoWs');
    let data = await client.getEntries({
        content_type: 'componentProductComponent',
        'sys.id': params.id,
    })
    return {
        props: {
          data: data.items[0].fields,
          navbar: navbar,
        },
    };
}



export default function ProductComponent({data,navbar}) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
    return (
    <div class="yarn">

        <main>
        {/* ccntent type  */}
        <div className="row py-4">
          <div className="container">
            <div className="row">
              <div className="brand-col mt-3 mr-2 pr-1">
                <img className="img-size brand-adidas" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/2880px-Adidas_Logo.svg.png"></img>
              </div>
              <div className="col-10">
                <h4>{data.title}</h4>
                <span>{data.shortDescription}</span>
              </div>
            </div>
       
          </div>
          <div className="container">
            <div className="row">
              <div className="col-7 pt-4 pl-0">
              <button className="btn btn-light border-black" onClick={() => window.location.reload(false)}>Refresh this page</button>
              </div>
              <div className="col-5 pt-4">
                <a href="http://localhost:3000/product-component/7FLPwcgPDIQ68N0bqmNjpm" target="_blank" className="text-muted">
                  <FontAwesomeIcon icon={faExternalLinkAlt}/><span className="ml-2">Open in new window</span>
                </a>     
                <a href="https://www.contentful.com/developers/docs/extensibility/app-framework/" target="_blank" className="text-muted ml-3">
                  <FontAwesomeIcon icon={faExternalLinkAlt}/><span className="ml-2">Open full documentation</span>
                </a>     
              </div>
            </div>
          </div>
        </div>
        {/* content preview  */}
        <div className="container">
          <div className="row pb-5">
          <div className="container mt-4">
          <span className="font-weight-bold previewbox">Live Preview</span>
            <div className="container background-product pt-5 pb-5 box-shadow">
           
                <ItemsCarousel
                  requestToChangeActive={setActiveItemIndex}
                  activeItemIndex={activeItemIndex}
                  numberOfCards={5}
                  gutter={20}
                  leftChevron={<button className="btn btn-light border-black">{<FontAwesomeIcon icon={faChevronLeft}/>}</button>}
                  rightChevron={<button className="btn btn-light border-black">{<FontAwesomeIcon icon={faChevronRight}/>}</button>}
                  outsideChevron
                  chevronWidth={chevronWidth}
                >
                {data.products.map((edge, i) => 

                  <a key={i} className="card" href="#">
                 
                    <img className="img" src={edge.fields.image.fields.file.url} alt="test"/>
                    <div className="container pl-2">
                      <div className="text-grey-adidas-sm pt-2 mb-2">{edge.fields.categoryName}</div>
                      <span className="text-grey-adidas">{edge.fields.name}</span>
                      <div className="text-grey-adidas mb-4 pb-2">{edge.fields.price}</div>
                    </div>
       
         
                  </a>
      
                )}      
                </ItemsCarousel>      
    
            </div>
            </div>
          </div>
        </div>
      </main>
    </div> 

    );

}