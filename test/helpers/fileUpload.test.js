import { v2 as cloudinary } from "cloudinary";

import { getEnvs } from "../../src/helpers";
import { fileUpload } from "../../src/helpers/fileUpload";

const {
    VITE_CLOUD_NAME_CLOUDINARY,
    VITE_API_KEY_CLOUDINARY,
    VITE_API_SECRET_CLOUDINARY,
    VITE_SECURE_CLOUDINARY,
} = getEnvs();

cloudinary.config({
    cloud_name: VITE_CLOUD_NAME_CLOUDINARY,
    api_key: VITE_API_KEY_CLOUDINARY,
    api_secret: VITE_API_SECRET_CLOUDINARY,
    secure: VITE_SECURE_CLOUDINARY,
});

const deleteImage = async (imageId) => {
    await cloudinary.api.delete_resources(["journal-app/" + imageId], {
        resource_type: "image",
    });
};

describe("Pruebas en fileUpload", () => {
    test("debe de subir el archivo correctamente", async () => {
        
        const resp = await fetch("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwg0ljoWaCLWz88fHhWVkqwckULN7LPepSSg&s")
        const blob = await resp.blob();
        const file = new File([blob], "foto.jpg");

        const url = await fileUpload(file);
        expect(typeof url).toBe("string");

        // Borrar imagen por ID
        const segments = url.split("/");
        const imageId = segments[segments.length - 1].replace(".jpg", "");
        console.log(imageId)
        await deleteImage(imageId);
    });

    test("debe de retornar null", async () => {
        const file = new File([], "foto.jpg");
        const url = await fileUpload(file);
        expect(url).toBe(null);
    });
});
