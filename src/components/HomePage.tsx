import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <Container>
            <Box sx={{ mt: 8, mb: 4, textAlign: 'center' }}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Welcome to Our Store
                </Typography>
                <Typography variant="h5" component="h2" color="text.secondary" paragraph>
                    Discover amazing products at great prices
                </Typography>
                <Button
                    component={Link}
                    to="/products"
                    variant="contained"
                    size="large"
                    sx={{ mt: 4 }}
                >
                    Shop Now
                </Button>
            </Box>

            <Grid container spacing={4} sx={{ mt: 4, px: { xs: 2, sm: 0 } }}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Typography variant="h6">Quality Products</Typography>
                    <Typography color="text.secondary">
                        We source only the best products for our customers.
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Typography variant="h6">Fast Shipping</Typography>
                    <Typography color="text.secondary">
                        Quick and reliable delivery to your doorstep.
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Typography variant="h6">24/7 Support</Typography>
                    <Typography color="text.secondary">
                        Our customer service team is always here to help.
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HomePage;
