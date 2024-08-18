import React from 'react'
import Image from "next/image"
import { Container, Box, Typography, AppBar, Toolbar, Button } from '@mui/material'
import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'
import logo from '@/public/images/card.png'


export default function SignUpPage() {

    return (
        <Container maxWidth="sm"> 
            <AppBar position="static" sx={{backgroundColor: '#B2C3D3'}}>
                <Toolbar>
                    <Image src={logo} alt="Cardcaptify Logo" width={100} height={100} />
                    <Typography variant="h6" style={{flexGrow: 1, fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem'}}>
                        Cardcaptify
                    </Typography>
                    <Button color="inherit"style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', borderRadius: '20px',
                        textTransform: 'none',
                        padding: '10px 20px', }}>
                        <Link href="/" passHref>
                            Home
                        </Link>
                    </Button>
                    <Button color="inherit"style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', borderRadius: '20px',
                        textTransform: 'none',
                        padding: '10px 20px', }}>
                        <Link href="/sign-up" passHref>
                            Sign Up
                        </Link>
                    </Button>
                </Toolbar>
            </AppBar>

            <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{textAlign: 'center', my: 4}}
            >
                <Typography variant="h4" component="h1" gutterBottom style={{flexGrow: 1, fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem'}}>
                    Sign In
                </Typography>
                <SignIn />
            </Box>
            
        </Container>
    )
}