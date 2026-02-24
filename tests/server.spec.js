const request = require('supertest');
const server = require('../index');

describe('Operaciones CRUD de cafes', () => {
  it('Obtener Status Code 200 y Array con almenos 1 objeto en la ruta GET /cafes', async () => {
    const { body, statusCode } = await request(server).get('/cafes').send();
    expect(statusCode).toBe(200);
    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBeGreaterThan(0);
  });

  it('Obtener Status Code 404 al eliminar un café con id que no existe', async () => {
    const jwt = 'testing_token';
    const { statusCode } = await request(server)
      .delete('/cafes/999')
      .set('Authorization', jwt)
      .send();
    expect(statusCode).toBe(404);
  });

  it('Agregar un nuevo café y obtener Status Code 201 en ruta POST /cafes', async () => {
    const cafe = {
      id: 5,
      nombre: 'Latte',
    };
    const { body, statusCode } = await request(server)
      .post('/cafes')
      .send(cafe);
    expect(statusCode).toBe(201);
    expect(body).toContainEqual(cafe);
  });

  it('Obtener Status Code 400 al intentar actualizar un café con id en parámetros diferente al id del payload', async () => {
    const payload = {
      id: 2,
      nombre: 'Latte',
    };
    const { statusCode } = await request(server).put('/cafes/1').send(payload);
    expect(statusCode).toBe(400);
  });
});
