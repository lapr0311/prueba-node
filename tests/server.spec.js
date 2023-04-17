const request = require("supertest");
const server = require("../index");

describe("tests ruta cafe", () => {
    it("Obteniendo un 200", async () => {
        const response = await request(server).get("/cafes").send();
        const status = response.statusCode;
        expect(status).toBe(200);
    });


    it("obteniendo un 404 id no existe", async () => {
        const jwt = "token";
        const elimarProducto = 99
        const {statusCode } = await request(server)
            .delete(`/cafes/${elimarProducto}`)
            .set("Authorization", jwt)
            .send();
        //const ids = cafes.map(cafes => cafes.id)
        expect(statusCode).toBe(404);
    });




    it("Obteniendo 201 producto agregado", async () => {
        const id = Math.floor(Math.random() * 999);
        const productoNuevos = { id, nombre: "Nuevo producto" };

        const respode = await request(server)
            .post("/cafes")
            .send(productoNuevos);
       
        expect(respode.status).toBe(201);
        expect(respode.body).toContainEqual(productoNuevos);

    });


    it("Obteniendo error 400 id no corresponde", async () => {
        const id = 3
        const payload = {
            id: 49,
            nombre: "Mocacino"
        }
        const response = await request(server)
            .put(`"/cafes"${id}`)
            .send(payload);

        expect(response.status).toBe(400);

    });



});


