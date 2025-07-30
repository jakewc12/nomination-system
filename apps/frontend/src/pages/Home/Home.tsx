import React,  { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowDown } from 'react-icons/fa'; // Import the arrow icon
import frontPageImage from '../../assets/front-page.jpg';
import {
  Hero,
  BackgroundImageContainer,
  Overlay,
  ContentOverlay,
  HomeH1,
  HomeH2,
  Line,
  HomeButton,
  InfoSection,
  HomeP,
  SenatorSection,
  SGASection,
  Arrow,
  ButtonsContainer,
} from './Styles';

import SubmitPopUp from '../../components/SubmitPopUp';

const Home: React.FC = () => {
  const navigate = useNavigate(); // Hook to handle navigation
  const location = useLocation();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); 
  const [popupName, setPopupName] = useState('');

  useEffect(() => {
    if (location.state?.formSubmissionSuccess) {
      setShowSuccessPopup(true); 
      setPopupName(location.state?.formName || ''); 
      window.history.replaceState({}, document.title) 
    }
  }, [location.state]); 

  const handleScrollToSGA = () => {
    const sgaSection = document.getElementById('sga-section');
    if (sgaSection) {
      sgaSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div>
        <SubmitPopUp
          open={showSuccessPopup}
          setOpen={setShowSuccessPopup}
          name={popupName}
        />
  
        {/* Hero Section */}
        <Hero>
          {/* Background Image */}
          <BackgroundImageContainer>
            <img
              src={frontPageImage}
              alt="Front Page"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </BackgroundImageContainer>
  
          {/* Overlay */}
          <Overlay />
  
          {/* Content Overlay */}
          <ContentOverlay>
            <HomeH1>SENATE NOMINATIONS & APPLICATIONS</HomeH1>
            <HomeH2>NORTHEASTERN'S STUDENT GOVERNMENT ASSOCIATION</HomeH2>
  
            {/* Buttons Container */}
            <ButtonsContainer>
              <HomeButton
                variant="contained"
                size="large"
                onClick={() => navigate('/applications')}
              >
                Apply
              </HomeButton>
              <HomeButton
                variant="contained"
                onClick={() => navigate('/nominations')}
                size="large"
              >
                Nominate
              </HomeButton>
            </ButtonsContainer>
          </ContentOverlay>
  
          {/* Arrow Icon at the Bottom */}
          <Arrow onClick={handleScrollToSGA}>
            <FaArrowDown size={30} color="white" />
          </Arrow>
        </Hero>
  
        {/* What is SGA and Why Senator */}
        <InfoSection id="sga-section">
          <SGASection>
            <HomeH1 style={{ textShadow: '0px 0px 0px rgba(0, 0, 0, 0)' }}>
              WHAT IS SGA?
            </HomeH1>
            <Line style={{ marginRight: '0px', marginLeft: '15px' }} />
          </SGASection>
          <HomeP>
            The Northeastern University Student Government Association (or SGA for
            short)...
          </HomeP>
          <HomeButton
            href="https://www.northeasternsga.com/senate"
            variant="contained"
          >
            About the Senate
          </HomeButton>
  
          <SenatorSection>
            <Line />
            <HomeH1 style={{ textShadow: '0px 0px 0px rgba(0, 0, 0, 0)' }}>
              WHY BE A SENATOR?
            </HomeH1>
          </SenatorSection>
          <HomeP>
            Becoming a senator offers the chance to represent the student body...
          </HomeP>
          <HomeButton
            href="https://www.northeasternsga.com/become-a-senator"
            variant="contained"
            style={{ height: '9vh' }}
          >
            Requirements & <br />
            Responsibilities
          </HomeButton>
        </InfoSection>
      </div>
    </>
  );
  
};

export default Home;
