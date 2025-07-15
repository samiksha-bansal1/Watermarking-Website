import io
import json
import numpy as np
import cv2
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from embed import embed_image_watermark

app = FastAPI(
    title="Image Watermark Embedding API",
    description="API to embed watermark into images using DWT-SVD",
    version="1.0.0",
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, replace with frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/embed")
async def embed_watermark_api(
    image: UploadFile = File(...),
    watermark_length: int = Form(...),
    watermark_bits: str = Form(...),
    wavelet_type: str = Form("haar")
):
    try:
        watermark_bits_list = json.loads(watermark_bits)
        if not isinstance(watermark_bits_list, list) or not all(b in [0, 1] for b in watermark_bits_list):
            raise HTTPException(status_code=400, detail="Watermark bits must be JSON array of 0s and 1s")

        contents = await image.read()
        nparr = np.frombuffer(contents, np.uint8)
        img_bgr = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if img_bgr is None:
            raise HTTPException(status_code=400, detail="Invalid image file")

        img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)

        watermarked_rgb = embed_image_watermark(
            original_img_rgb_np=img_rgb,
            watermark_bit_length=watermark_length,
            watermark_bits_list=watermark_bits_list,
            wavelet_type=wavelet_type
        )

        if watermarked_rgb is None:
            raise HTTPException(status_code=500, detail="Watermark embedding failed")

        is_success, buffer = cv2.imencode(".png", cv2.cvtColor(watermarked_rgb, cv2.COLOR_RGB2BGR))
        if not is_success:
            raise HTTPException(status_code=500, detail="Failed to encode watermarked image")

        return StreamingResponse(
            io.BytesIO(buffer.tobytes()),
            media_type="image/png",
            headers={"Content-Disposition": "attachment; filename=watermarked_image.png"}
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")


@app.get("/")
async def root():
    return {"message": "Watermark API is running"}
