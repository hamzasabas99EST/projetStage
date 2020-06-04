import React, { Component } from 'react';
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from
"mdbreact";
import home from '../images/home.jpg'
import centre from '../images/centre.jpg'
import terrain from "../images/terrains.jpg" 


export default class Home extends Component {
    render() {
        return (
            <div >
               <MDBContainer>
                  <MDBCarousel activeItem={1} length={3} showControls={true} showIndicators={true} className="z-depth-1" >
                    <MDBCarouselInner>
                      <MDBCarouselItem itemId="1">
                        <MDBView>
                            <img className="d-block w-100" src={centre} alt="First slide" width={1097} height={484} />
                          <MDBMask overlay="black-light" />
                        </MDBView>
                        <MDBCarouselCaption>
                            <h3 className="h3-responsive">Gallerie</h3>
                            <p>1/3</p>
                        </MDBCarouselCaption>
                      </MDBCarouselItem>

                      <MDBCarouselItem itemId="2">
                        <MDBView>
                            <img
                              className="d-block w-100"
                              src={terrain}
                              alt="Second slide"
                            />
                           <MDBMask overlay="black-strong" />
                        </MDBView>
                        <MDBCarouselCaption>
                          <h3 className="h3-responsive">Gallerie</h3>
                          <p>2/3</p>
                        </MDBCarouselCaption>
                      </MDBCarouselItem>
                      
                      <MDBCarouselItem itemId="3">
                        <MDBView>
                        <img
                            className="d-block w-100"
                            src={home}
                            alt=""
                            width={1097}
                            height={484}  
                         
                          />
                        <MDBMask overlay="black-slight" />
                        </MDBView>
                        <MDBCarouselCaption>
                          <h3 className="h3-responsive">Gallerie</h3>
                          <p>3/3</p>
                        </MDBCarouselCaption>
                      </MDBCarouselItem>
                   
                    </MDBCarouselInner>

                   </MDBCarousel>

                </MDBContainer>
            </div>
        )
    }
}
