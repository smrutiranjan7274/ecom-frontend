import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

// Constants
const FEATURES = [
    {
        icon: '🛒',
        title: 'Quality Products',
        description: 'We source only the best products for our customers.'
    },
    {
        icon: '🚚',
        title: 'Fast Shipping',
        description: 'Quick and reliable delivery to your doorstep.'
    },
    {
        icon: '💬',
        title: '24/7 Support',
        description: 'Our customer service team is always here to help.'
    }
];

// Types
interface FeatureCardProps {
    icon: string;
    title: string;
    description: string;
}

// Components
const HeroSection = () => (
    <Box
        sx={{
            width: '100vw',
            position: 'relative',
            left: '50%',
            right: '50%',
            ml: '-50vw',
            mr: '-50vw',
            mt: 0,
            pt: { xs: 12, md: 12 },
            pb: 10,
            px: 3,
            textAlign: 'center',
        }}
    >
        <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
                fontWeight: 700,
                letterSpacing: 1,
                color: 'primary.main',
                mb: 2,
            }}
        >
            Welcome to Our Store
        </Typography>
        <Typography
            variant="h5"
            component="h2"
            color="text.secondary"
            paragraph
            sx={{ mb: 4 }}
        >
            Discover amazing products at great prices
        </Typography>
        <Button
            component={Link}
            to="/products"
            variant="contained"
            size="large"
            sx={{
                mt: 2,
                px: 5,
                py: 1.5,
                fontSize: '1.1rem',
                borderRadius: 3,
                boxShadow: 2,
            }}
        >
            Shop Now
        </Button>
    </Box>
);

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
    <Box
        sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 3,
            transition: 'transform 0.2s',
            '&:hover': { transform: 'scale(1.04)' },
        }}
    >
        <Box sx={{ fontSize: 48, mb: 2 }}>{icon}</Box>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
        </Typography>
        <Typography color="text.secondary">
            {description}
        </Typography>
    </Box>
);

const FeaturesSection = () => (
    <Container maxWidth="lg">
        <Grid
            container
            spacing={4}
            sx={{
                mt: 2,
                mb: 8,
                justifyContent: 'center',
            }}
        >
            {FEATURES.map((feature, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                    <FeatureCard {...feature} />
                </Grid>
            ))}
        </Grid>
    </Container>
);

// Main Component
const HomePage = () => {
    useDocumentTitle('Home');

    return (
        <>
            <HeroSection />
            <FeaturesSection />
        </>
    );
};

export default HomePage;