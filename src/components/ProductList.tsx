import { useEffect, useState } from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    Alert,
    CircularProgress,
    Stack
} from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import 'react-lazy-load-image-component/src/effects/blur.css';
import apiClient from '../api/client';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import placeholderImage from '../assets/placeholder_400x400.svg';

// Types
interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl?: string;
}

// Constants
const CARD_STYLES = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease',
    border: '1px solid #eee',
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 12px 20px rgba(0,0,0,0.1)'
    }
};

const IMAGE_CONTAINER_STYLES = {
    position: 'relative',
    pt: '100%',
    bgcolor: '#fafafa'
};

const IMAGE_STYLES = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    padding: '1rem'
};

// Components
const ProductCard = ({ product }: { product: Product }) => (
    <Card elevation={0} sx={CARD_STYLES}>
        <Box sx={IMAGE_CONTAINER_STYLES}>
            <LazyLoadImage
                src={product.imageUrl || placeholderImage}
                alt={product.name}
                effect="opacity"
                placeholderSrc={placeholderImage}
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = placeholderImage;
                }}
                style={IMAGE_STYLES as React.CSSProperties}
            />
        </Box>

        <CardContent sx={{
            flexGrow: 1,
            p: 2,
            '&:last-child': { pb: 2 }
        }}>
            <Typography
                variant="h6"
                component="h2"
                sx={{
                    fontWeight: 500,
                    mb: 1,
                    lineHeight: 1.4,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                }}
            >
                {product.name}
            </Typography>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    color: 'primary.main'
                }}
            >
                ${product.price.toFixed(2)}
            </Typography>

            <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{
                    mt: 2,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 500,
                    '&:hover': {
                        transform: 'scale(1.02)',
                    }
                }}
            >
                <Stack direction="row" spacing={1} alignItems="center">
                    <ShoppingCartIcon sx={{ fontSize: 20 }} />
                    <span>Add to Cart</span>
                </Stack>
            </Button>
        </CardContent>
    </Card>
);

const LoadingState = () => (
    <Grid container justifyContent="center" sx={{ py: 4 }}>
        <CircularProgress />
    </Grid>
);

const ErrorState = ({ error }: { error: string }) => (
    <Grid container justifyContent="center" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
    </Grid>
);

// Main Component
const ProductList = () => {
    useDocumentTitle('Products');

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchProducts = async () => {
            try {
                const response = await apiClient.get('/products');
                if (isMounted) {
                    setProducts(response.data);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setError('Failed to load products. Please try again later.');
                    console.error('API Error:', err);
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchProducts();

        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) return <LoadingState />;
    if (error) return <ErrorState error={error} />;

    return (
        <Box
            sx={{
                py: 4,
                px: { xs: 2, sm: 4 },
                width: '100%',
                boxSizing: 'border-box' // Ensures padding is included in width calculation
            }}
        >
            <Typography
                variant="h4"
                component="h1"
                sx={{
                    mb: 4,
                    textAlign: 'center',
                    color: 'primary.main',
                    fontWeight: 600,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                }}
            >
                Our Products
            </Typography>

            <Grid
                container
                spacing={2}
                sx={{
                    margin: 0,
                    width: '100%',
                    maxWidth: '100%', // Ensures grid doesn't exceed container width
                    boxSizing: 'border-box'
                }}
            >
                {products.map((product) => (
                    <Grid
                        size={{ xs: 12, md: 4, sm: 6 }}
                        key={product.id}
                        sx={{
                            boxSizing: 'border-box',
                            maxWidth: '100% !important', // Force max-width
                            padding: '8px !important' // Override any default padding
                        }}
                    >
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ProductList;