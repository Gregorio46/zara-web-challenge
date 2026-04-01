import request from 'supertest';
import app from '../server';

const mockProducts = [
  { id: '1', brand: 'Zara', name: 'Black T-Shirt', basePrice: 19.99, imageUrl: 'https://example.com/1.jpg' },
  { id: '2', brand: 'Massimo Dutti', name: 'White Shirt', basePrice: 49.99, imageUrl: 'https://example.com/2.jpg' },
  { id: '3', brand: 'Zara', name: 'Blue Jeans', basePrice: 39.99, imageUrl: 'https://example.com/3.jpg' },
  { id: '4', brand: 'Pull&Bear', name: 'Zara Style Hoodie', basePrice: 29.99, imageUrl: 'https://example.com/4.jpg' },
];

beforeEach(() => {
  jest.restoreAllMocks();
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('GET /products', () => {
  it('should return all products with default pagination', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    } as Response);

    const res = await request(app).get('/products');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(4);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('brand');
    expect(res.body[0]).toHaveProperty('name');
  });

  it('should filter products by search query on brand', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    } as Response);

    const res = await request(app).get('/products?search=massimo');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].brand).toBe('Massimo Dutti');
  });

  it('should filter products by search query on name', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    } as Response);

    const res = await request(app).get('/products?search=jeans');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe('Blue Jeans');
  });

  it('should search across both brand and name fields', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    } as Response);

    const res = await request(app).get('/products?search=zara');

    expect(res.status).toBe(200);
    // "Zara" matches brand on items 1,3 and name on item 4
    expect(res.body).toHaveLength(3);
  });

  it('should paginate results with limit and offset', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    } as Response);

    const res = await request(app).get('/products?limit=2&offset=1');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0].id).toBe('2');
    expect(res.body[1].id).toBe('3');
  });

  it('should return empty array when search has no matches', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    } as Response);

    const res = await request(app).get('/products?search=nonexistent');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(0);
  });

  it('should return 500 when external API fails', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 503,
    } as Response);

    const res = await request(app).get('/products');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Failed to fetch products' });
  });

  it('should return 500 when fetch throws', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));

    const res = await request(app).get('/products');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Failed to fetch products' });
  });
});

describe('GET /products/:id', () => {
  it('should return a single product by id', async () => {
    const product = mockProducts[0];
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => product,
    } as Response);

    const res = await request(app).get('/products/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(product);
  });

  it('should return 500 when external API fails for single product', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 404,
    } as Response);

    const res = await request(app).get('/products/999');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Failed to fetch product' });
  });

  it('should return 500 when fetch throws for single product', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));

    const res = await request(app).get('/products/1');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Failed to fetch product' });
  });
});
