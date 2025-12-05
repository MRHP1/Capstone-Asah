# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.services.ml_services import predict_recommendation
from app.schemas import RecommendationRequest, RecommendationResponse

app = FastAPI(
    title="Telco Product Recommendation API",
    version="1.0.0",
)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Hello World from Backend with XGBoost!"}


@app.post("/api/v1/recommend", response_model=RecommendationResponse)
def recommend(req: RecommendationRequest):
    label, conf = predict_recommendation(req.dict())
    return {"recommended_offer": label, "confidence": conf}
