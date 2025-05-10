import { Box, Typography, Button, Card, CardContent, Grid, IconButton, Stack, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useState } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
// import placeHolderImage from '../assets/images/placeholder_400x400.svg';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
}

const initialItems: CartItem[] = [
    {
        id: 1,
        name: "Laptop",
        price: 999.99,
        quantity: 1,
        imageUrl: "https://bankofelectronics.com/905-medium_default/macbook.jpg"
    },
    {
        id: 2,
        name: "Headphones",
        price: 199.99,
        quantity: 1,
        imageUrl: "https://m.media-amazon.com/images/I/41kW26ceLtL.jpg"
    }
];

const CartItem = ({ item, onUpdateQuantity, onRemove }: {
    item: CartItem;
    onUpdateQuantity: (id: number, newQuantity: number) => void;
    onRemove: (id: number) => void;
}) => (
    <Card sx={{ mb: 2, borderRadius: 2 }}>
        <CardContent>
            <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 3, sm: 2 }}>
                    <Box
                        component="img"
                        src={item.imageUrl}
                        alt={item.name}
                        sx={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'cover',
                            borderRadius: 1
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 9, sm: 4 }}>
                    <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 500 }}>
                        {item.name}
                    </Typography>
                    <Typography color="primary.main" sx={{ fontWeight: 600 }}>
                        ${item.price.toFixed(2)}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 7, sm: 4 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <IconButton
                            size="small"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                        >
                            <RemoveIcon />
                        </IconButton>
                        <Typography sx={{ minWidth: '40px', textAlign: 'center' }}>
                            {item.quantity}
                        </Typography>
                        <IconButton
                            size="small"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                            <AddIcon />
                        </IconButton>
                    </Stack>
                </Grid>
                <Grid size={{ xs: 5, sm: 2 }} textAlign="right">
                    <IconButton
                        color="error"
                        onClick={() => onRemove(item.id)}
                    >
                        <DeleteOutlineIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);

const CartPage = () => {
    useDocumentTitle('Cart');
    const [cartItems, setCartItems] = useState<CartItem[]>(initialItems);

    const handleUpdateQuantity = (id: number, newQuantity: number) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const handleRemoveItem = (id: number) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 10;
    const discount = 10; // 10% discount
    const discountAmount = (subtotal + shipping) * (discount / 100);
    const total = subtotal + shipping - discountAmount;

    return (
        <Box sx={{ py: 4, px: { xs: 2, sm: 4 }, maxWidth: 'lg', mx: 'auto' }}>
            <Typography
                variant="h4"
                component="h1"
                sx={{
                    mb: 4,
                    textAlign: 'center',
                    color: 'primary.main',
                    fontWeight: 600
                }}
            >
                Shopping Cart
            </Typography>

            {cartItems.length > 0 ? (
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, sm: 8 }}>
                        {cartItems.map(item => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onUpdateQuantity={handleUpdateQuantity}
                                onRemove={handleRemoveItem}
                            />
                        ))}
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Card sx={{ borderRadius: 2 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Order Summary
                                </Typography>
                                <Stack spacing={2}>
                                    <Box display="flex" justifyContent="space-between">
                                        <Typography color="text.secondary">Subtotal</Typography>
                                        <Typography>${subtotal.toFixed(2)}</Typography>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between">
                                        <Typography color="text.secondary">Shipping</Typography>
                                        <Typography>${shipping.toFixed(2)}</Typography>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between">
                                        <Typography color="text.secondary">Discount</Typography>
                                        <Typography color="success.main">-${discountAmount.toFixed(2)}</Typography>
                                    </Box>
                                    <Divider />
                                    <Box display="flex" justifyContent="space-between">
                                        <Typography variant="h6">Total</Typography>
                                        <Typography variant="h6" color="primary.main">
                                            ${total.toFixed(2)}
                                        </Typography>
                                    </Box>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        sx={{
                                            mt: 2,
                                            py: 1.5,
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            fontSize: '1rem'
                                        }}
                                    >
                                        Proceed to Checkout
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            ) : (
                <Box textAlign="center" py={8}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        Your cart is empty
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        href="/products"
                        sx={{
                            mt: 2,
                            py: 1.5,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontSize: '1rem'
                        }}
                    >
                        Continue Shopping
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default CartPage;
