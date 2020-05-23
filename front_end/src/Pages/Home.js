import React, { Component } from 'react';
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from
"mdbreact";
import home from '../images/home.jpg'
import centre from '../images/centre.jpg'


export default class Home extends Component {
    render() {
        return (
            <div >
               <MDBContainer>
                  <MDBCarousel activeItem={1} length={4} showControls={true} showIndicators={true} className="z-depth-1" >
                    <MDBCarouselInner>
                      <MDBCarouselItem itemId="1">
                        <MDBView>
                            <img
                              className="d-block w-100"
                              src={centre}
                              alt="First slide"
                              width={1097}
                              height={484} 
                            />
                          <MDBMask overlay="black-light" />
                        </MDBView>
                        <MDBCarouselCaption>
                            <h3 className="h3-responsive">Light mask</h3>
                            <p>First text</p>
                        </MDBCarouselCaption>
                      </MDBCarouselItem>

                      <MDBCarouselItem itemId="2">
                        <MDBView>
                            <img
                              className="d-block w-100"
                              src="https://mdbootstrap.com/img/Photos/Slides/img%20(6).jpg"
                              alt="Second slide"
                            />
                           <MDBMask overlay="black-strong" />
                        </MDBView>
                        <MDBCarouselCaption>
                          <h3 className="h3-responsive">Strong mask</h3>
                          <p>Second text</p>
                        </MDBCarouselCaption>
                      </MDBCarouselItem>
                      
                      <MDBCarouselItem itemId="3">
                        <MDBView>
                          <img
                            className="d-block w-100"
                            src="https://kech24.com/wp-content/uploads/2019/10/%D9%85%D9%84%D8%A7%D8%B9%D8%A8-700x410.jpg"
                            alt="Third slide"
                            width={1097}
                            height={484}  
                          
                          />
                        <MDBMask overlay="black-slight" />
                        </MDBView>
                        <MDBCarouselCaption>
                          <h3 className="h3-responsive">Slight Mast</h3>
                          <p>Third text</p>
                        </MDBCarouselCaption>
                      </MDBCarouselItem>
                      <MDBCarouselItem itemId="4">
                        <MDBView>
                          <img
                            className="d-block w-100"
                            src={home}
                            alt="fourth slide"
                            width={1097}
                            height={484}  
                         
                          />
                        <MDBMask overlay="black-slight" />
                        </MDBView>
                        <MDBCarouselCaption>
                          <h3 className="h3-responsive">Slight Mast</h3>
                          <p>Third text</p>
                        </MDBCarouselCaption>
                      </MDBCarouselItem>
                    
                    </MDBCarouselInner>

                   </MDBCarousel>

                </MDBContainer>
            </div>
        )
    }
}
