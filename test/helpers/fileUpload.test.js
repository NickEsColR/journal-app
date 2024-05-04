import { v2 as cloudinary } from "cloudinary";
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: "dmuhagilf",
    api_key: "myApiKey",
    api_secret: "mySecretKey",
    secure: true,
});

describe("Pruebas en fileUpload", () => {
    test("debe de subir el archivo correctamente", async () => {
        const imageUrl = "";
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], "foto.jpg");

        const url = await fileUpload(file);
        expect(typeof url).toBe("string");

        // Borrar imagen por ID
        const segments = url.split("/");
        const imageId = segments[segments.length - 1].replace(".jpg", "");
        await cloudinary.api.delete_resources(['journal/'+imageId],{
            resource_type: 'image'
        });
    });

    test("debe de retornar null", async () => {
        const file = new File([], "foto.jpg");
        const url = await fileUpload(file);
        expect(url).toBe(null);
    });
});
