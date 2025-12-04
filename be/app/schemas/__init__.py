from pydantic import BaseModel


class RecommendationRequest(BaseModel):
    avg_data_usage_gb: float
    pct_video_usage: float
    avg_call_duration: float
    sms_freq: float
    monthly_spend: float
    topup_freq: float
    travel_score: float
    complaint_count: float
    device_brand: str
    plan_type: str


class RecommendationResponse(BaseModel):
    recommended_offer: str
    confidence: float
