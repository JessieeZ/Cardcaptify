'use client'

import Image from "next/image"
import getStripe from "@/utils/get-stripe"
import Head from 'next/head';
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs"
import { Container, AppBar, Toolbar, Typography, Button, Box, Grid, Paper, Card, CardContent, CardActions } from "@mui/material"
import { styled } from '@mui/system';
import logo from '@/public/images/card.png'
import StudyImage from '@/public/images/study.png' 
import BulbImage from '@/public/images/lightbulb.gif' 
import divider from '@/public/images/divider.png'


const StyledAppBar = styled(AppBar)({
  boxShadow: 'none',
  backgroundColor: '#fff',
  color: '#000',
});

const StyledButton = styled(Button)({
  borderRadius: '20px',
  textTransform: 'none',
  padding: '10px 20px',
});

const PricingCard = styled(Card)({
  textAlign: 'center',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const FeatureCard = styled(Paper)({
  padding: '20px',
  textAlign: 'center',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const BackgroundBox = styled(Box)({
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundColor: '#B2C3D3',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

export default function Home() {
  
  const { isLoaded, isSignedIn, user } = useUser()

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000' },
    })
    
    const checkoutSessionJson = await checkoutSession.json()
  
    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })
  
    if (error) {
      console.warn(error.message)
    }
  }
  
  return (
    <BackgroundBox>
      <Container maxWidth="lg">
        <div id="home">
          <Head>
            <title>Cardcaptify</title>
            <meta name="description" content="Create flashcards from your text" />
          </Head>
          <StyledAppBar position="static" sx={{ backgroundColor: '#B2C3D3' }}>
            <Toolbar>
              <Image src={logo} alt="Cardcaptify Logo" width={100} height={100} />
              <Typography variant="h6" style={{flexGrow: 1, fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem'}}>
                Cardcaptify
              </Typography>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <StyledButton color="inherit" href={isSignedIn ? "/flashcards" : "/sign-in"} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem' }}>
                {isSignedIn ? 'My Decks' : 'Login'}
              </StyledButton>
            </Toolbar>
          </StyledAppBar>

          <Box sx={{textAlign: 'center', my: 0}}>
            <Typography variant="h2" component="h1" gutterBottom style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '4rem' }}>
              Welcome to Cardcaptify!
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem' }}>
              Allows the creation of flashcards to be simplified.
            </Typography>
            <StyledButton variant="contained" color="primary" sx={{mt: 2, mr: 2}} href={isSignedIn ? "/generate" : "/sign-in"} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem' }}>
              Get Started
            </StyledButton>
            <StyledButton href="#features" variant="outlined" color="primary" sx={{mt: 2}} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem' }}>
              Learn More
            </StyledButton>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Image src={StudyImage} alt="Study Image" width={350} height={375} />
            </Box>
            
          </Box>
        </div>

        <div id="features">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',   
              mt: 10,
            }}
          >
            <Typography 
              variant="h6" 
              component="h6" 
              style={{ 
                fontFamily: 'Cormorant Garamond, serif', 
                fontSize: '2rem', 
                fontWeight: '700', 
                textAlign:'center'
              }}
            >
              Cardcaptify is an intuitive and user-friendly platform designed to simplify the process of creating and managing flashcards. Whether you're a student looking to enhance your study routine or a professional aiming to streamline your learning, Cardcaptify offers a range of features to meet your needs:
            </Typography>
          </Box>
          <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Image src={BulbImage} alt="lightbulb" width={225} height={175} />
          </Box>
          <Box sx={{my: 6}}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <Typography 
                    variant="h6" 
                    component="h6" 
                    style={{ 
                      fontFamily: 'Cormorant Garamond, serif', 
                      fontSize: '2rem', 
                      fontWeight: '700', 
                    }}
                  >
                    Easy Text Input
                  </Typography>
                </Box>
                <FeatureCard sx={{ backgroundColor: '#d4dee7'}}>
                  <Typography style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem' }}>
                    Effortless Data Entry: Simply paste or type your text into our intuitive input field, and let our advanced algorithms handle the rest.
                  </Typography>
                </FeatureCard>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <Typography 
                    variant="h6" 
                    component="h6" 
                    style={{ 
                      fontFamily: 'Cormorant Garamond, serif', 
                      fontSize: '2rem', 
                      fontWeight: '700', 
                    }}
                  >
                    Automated Organization
                  </Typography>
                </Box>
                <FeatureCard sx={{ backgroundColor: '#d4dee7'}}>
                  <Typography style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem' }}>
                    Our system seamlessly processes your input, converting it into well-organized flashcards ready for study.
                  </Typography>
                </FeatureCard>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <Typography 
                    variant="h6" 
                    component="h6" 
                    style={{ 
                      fontFamily: 'Cormorant Garamond, serif', 
                      fontSize: '2rem', 
                      fontWeight: '700', 
                    }}
                  >
                    Secure and Simple Login
                  </Typography>
                </Box>
                <FeatureCard sx={{ backgroundColor: '#d4dee7'}}>
                  <Typography style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem' }}>
                    Effortless Access: Our login feature ensures a seamless and secure entry into your account. With just a few clicks, you can access your personalized dashboard and start managing your flashcards.
                  </Typography>
                </FeatureCard>
              </Grid>
            </Grid>
          </Box>
        </div>

        <div id="plans">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Image src={divider} alt="divider" width={225} height={175} />
          </Box>
          <Box sx={{my: 6, textAlign: 'center'}}>
            <Typography variant="h4" component="h2" gutterBottom style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem' }}>
              Select a plan that best fits your needs.
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={6}>
                <PricingCard sx={{ backgroundColor: '#d4dee7'}}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem' }}>
                      Basic Plan
                    </Typography>
                    <Typography variant="h6" gutterBottom style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.75rem' }}>
                      Price: Free
                    </Typography>
                    <Typography style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem' }}>
                      The Basic Plan offers a cost-effective solution for users who need essential flashcard features. With this plan, you’ll gain access to:
                    </Typography>
                    <ul style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', paddingLeft: '20px' }}>
                      <li>Core Flashcard Features: Create and manage flashcards with fundamental functionalities.
                      </li>
                      <li>Limited Storage: Store a modest number of flashcards to keep your study sessions organized.
                      </li>
                      <li>Standard Support: Access our standard customer support for any questions or issues.
                      </li>
                    </ul>
                  </CardContent>
                  <CardActions sx={{justifyContent: 'center', padding: '16px'}}>
                    <StyledButton variant="contained" color="primary" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem' }}>
                      Choose Basic
                    </StyledButton>
                  </CardActions>
                </PricingCard>
              </Grid>
              <Grid item xs={12} md={6}>
                <PricingCard sx={{ backgroundColor: '#d4dee7'}}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem' }}>
                      Pro Plan
                    </Typography>
                    <Typography variant="h6" gutterBottom style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.75rem' }}>
                      Price: $5 / Month
                    </Typography>
                    <Typography style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem' }}>
                      The Pro Plan provides an enhanced experience with additional features and benefits designed for users who require more flexibility and support. This plan includes:
                    </Typography>
                    <ul style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', paddingLeft: '20px' }}>
                      <li>Unlimited Flashcards: Create and store as many flashcards as you need without limitations.</li>
                      <li>Expanded Storage: Enjoy ample storage space for all your flashcard needs.</li>
                      <li>Priority Support: Receive priority customer support to quickly address any questions or concerns.</li>
                      <li>Advanced Features: Access premium features for advanced customization and organization.</li>
                    </ul>
                  </CardContent>
                  <CardActions sx={{justifyContent: 'center', padding: '16px'}}>
                    <StyledButton variant="contained" color="primary" onClick={handleSubmit} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem' }}>
                      Choose Pro
                    </StyledButton>
                  </CardActions>
                </PricingCard>
              </Grid>
            </Grid>
          </Box>
        </div>

        <div id="generate">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Image src={divider} alt="divider" width={225} height={175} />
          </Box>
          <Box sx={{my: 6, textAlign: 'center'}}>
            <Typography variant="h4" component="h2" gutterBottom style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem' }}>
              Start Generating Flashcards!
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={6}>
                <PricingCard sx={{ backgroundColor: '#d4dee7'}}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem' }}>
                      Flashcard Generation Process:
                    </Typography>
                    <Typography style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem' }}>
                      1. Generate Flashcards:
                    </Typography>
                    <ul style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', paddingLeft: '20px' }}>
                      <li>Input Your Topic: Enter the subject or topic you want to create flashcards for. Our AI will generate flashcards based on your input instantly.</li>
                    </ul>
                    <Typography style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem' }}>
                      2. Review and Edit:
                    </Typography>
                    <ul style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', paddingLeft: '20px' }}>
                      <li>Examine Flashcards: Go through the generated flashcards to ensure accuracy and relevance and modify any content as needed to better fit your study requirements.
                      </li>
                    </ul>
                    <Typography style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem' }}>
                      3. Save the Study Set:
                    </Typography>
                    <ul style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', paddingLeft: '20px' }}>
                      <li>Finalize and Save: Once you're satisfied with the flashcards, save the study set to your account for future access and use.</li>
                    </ul>
                  </CardContent>
                  <CardActions sx={{justifyContent: 'center', padding: '16px'}}>
                    <StyledButton href="/generate" variant="contained" color="primary" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem' }}>
                      Generate Flashcards
                    </StyledButton>
                  </CardActions>
                </PricingCard>
              </Grid>
            </Grid>
          </Box>
        </div>
        
      </Container>
    </BackgroundBox>
  )
}
