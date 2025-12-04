from fastapi import FastAPI, HTTPException

from app.schemas import RecommendationRequest, RecommendationResponse
from app.services.ml_services import predict_recommendation

app = FastAPI(
    title="Telco Product Recommendation API",
    version="1.0.0",
    description="Backend untuk capstone Asah – rekomendasi produk telco berbasis XGBoost.",
)


@app.get("/")
def root():
    return {"message": "Hello from Winno Backend with XGBoost pipeline"}


@app.post("/api/v1/recommend", response_model=RecommendationResponse)
def recommend(req: RecommendationRequest):
    try:
        label, conf = predict_recommendation(req.dict())
        return RecommendationResponse(
            recommended_offer=label,
            confidence=conf,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
